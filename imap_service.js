const Imap = require('imap');
const { simpleParser } = require('mailparser');

// Configuração baseada nas variáveis de ambiente (suporta múltiplas contas)
const getImapConfigs = () => {
    const configs = [];
    // Formato esperado em IMAP_ACCOUNTS: "dp.tecnico@versatilservices.com.br:senha1, andre@versatilservices.com.br:senha2"
    if (process.env.IMAP_ACCOUNTS) {
        const accounts = process.env.IMAP_ACCOUNTS.split(',').map(s => s.trim());
        for (const acc of accounts) {
            const [user, password] = acc.split(':');
            if (user && password) {
                configs.push({
                    user: user.trim(),
                    password: password.trim(),
                    host: process.env.IMAP_HOST || 'imap.uhserver.com',
                    port: parseInt(process.env.IMAP_PORT || '993', 10),
                    tls: true,
                    tlsOptions: { rejectUnauthorized: false },
                    authTimeout: 10000,
                    connTimeout: 15000
                });
            }
        }
    } else if (process.env.IMAP_USER && process.env.IMAP_PASS) {
        // Fallback genérico para 1 conta
        configs.push({
            user: process.env.IMAP_USER,
            password: process.env.IMAP_PASS,
            host: process.env.IMAP_HOST || 'imap.uhserver.com',
            port: parseInt(process.env.IMAP_PORT || '993', 10),
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 10000,
            connTimeout: 15000
        });
    }
    return configs;
};

/**
 * Busca os e-mails usando uma configuração específica
 */
function fetchFromAccount(config, domain, limit) {
    return new Promise((resolve) => {
        let isResolved = false;
        
        // Absolute timeout of 45 seconds to guarantee it never hangs
        const timeout = setTimeout(() => {
            if (!isResolved) {
                console.error(`[IMAP] Timeout fatal após 45s na conta ${config.user}`);
                isResolved = true;
                resolve([]);
                try { imap.destroy(); } catch(e) {}
            }
        }, 45000);

        const safeResolve = (data) => {
            if (!isResolved) {
                isResolved = true;
                clearTimeout(timeout);
                resolve(data);
            }
        };

        const imap = new Imap(config);
        let results = [];
        let parsedCount = 0;
        let totalToParse = 0;
        let ended = false;

        function finish() {
            if (ended && parsedCount >= totalToParse) {
                safeResolve(results); // RESOLVE IMEDIATAMENTE!
                try { imap.end(); } catch (e) {}
            }
        }

        imap.once('ready', () => {
            console.log(`[IMAP] Conectado em ${config.user}. Abrindo INBOX...`);
            imap.openBox('INBOX', true, (err, box) => {
                if (err) {
                    console.error(`[IMAP] Erro INBOX ${config.user}:`, err);
                    imap.end();
                    return safeResolve([]);
                }

                // Extrair apenas o nome base da empresa para busca mais ampla (ex: onesubsea.com -> onesubsea)
                // Isso permite encontrar onesubsea.slb.com
                let baseSearch = domain;
                const parts = domain.split('.');
                if (parts.length > 1) {
                    // Pega a primeira parte se for algo como google.com, ou a parte mais longa
                    baseSearch = parts.reduce((a, b) => a.length > b.length ? a : b);
                }

                // Usando OR(FROM, TO) para performance extrema (1s vs 15s do TEXT)
                imap.search([['OR', ['FROM', baseSearch], ['TO', baseSearch]]], (err, searchResults) => {
                    if (err || !searchResults || searchResults.length === 0) {
                        imap.end();
                        return safeResolve([]);
                    }

                    const uidsToFetch = searchResults.slice(-limit);
                    totalToParse = uidsToFetch.length;
                    
                    if (totalToParse === 0) {
                        imap.end();
                        return safeResolve([]);
                    }

                    const fetch = imap.fetch(uidsToFetch, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'] });

                    fetch.on('message', (msg, seqno) => {
                        let header = '';
                        msg.on('body', (stream, info) => {
                            let buffer = '';
                            stream.on('data', chunk => buffer += chunk.toString('utf8'));
                            stream.once('end', () => header = buffer);
                        });
                        msg.once('end', () => {
                            console.log(`[IMAP] MSG END. Parsing header (tamanho: ${header.length})...`);
                            simpleParser(header, (err, parsed) => {
                                console.log(`[IMAP] simpleParser terminou. Err:`, !!err);
                                if (!err && parsed) {
                                    // Filtrar ESTRITO: só aceitar se o REMETENTE (FROM) 
                                    // pertence ao domínio buscado (ex: @siemens.com)
                                    // NÃO filtrar por TO — evita e-mails em massa/CC
                                    const fromText = (parsed.from ? parsed.from.text : '').toLowerCase();
                                    const domainLower = '@' + domain.toLowerCase();
                                    
                                    // Extrair e-mails apenas do FROM
                                    const emailRegex = /[\w.+-]+@[\w.-]+\.\w+/g;
                                    const fromEmails = fromText.match(emailRegex) || [];
                                    
                                    // Verificar se o remetente pertence ao domínio do cliente
                                    const isFromTargetDomain = fromEmails.some(email => email.endsWith(domainLower));
                                    
                                    if (isFromTargetDomain) {
                                        results.push({
                                            subject: parsed.subject || '',
                                            from: parsed.from ? parsed.from.text : '',
                                            to: parsed.to ? parsed.to.text : '',
                                            date: parsed.date || new Date(),
                                            text: '' 
                                        });
                                        console.log(`[IMAP] ✅ E-mail aceito (FROM @${domain}): ${fromEmails.join(', ')}`);
                                    } else {
                                        console.log(`[IMAP] ❌ E-mail filtrado (FROM não é @${domain}): ${fromEmails.join(', ')}`);
                                    }
                                }
                                parsedCount++;
                                console.log(`[IMAP] parsedCount: ${parsedCount}/${totalToParse}`);
                                finish();
                            });
                        });
                    });

                    fetch.once('error', (err) => console.error(`[IMAP] Erro no fetch ${config.user}:`, err));
                    fetch.once('end', () => { 
                        console.log(`[IMAP] FETCH END. parsedCount: ${parsedCount}, total: ${totalToParse}`);
                        ended = true; 
                        // Fallback in case parsedCount never reaches totalToParse
                        setTimeout(() => {
                            console.log(`[IMAP] Fallback timeout atingido no fetch. Terminating...`);
                            safeResolve(results);
                            try { imap.end(); } catch(e) {}
                        }, 5000);
                        finish(); 
                    });
                });
            });
        });

        imap.once('error', (err) => {
            console.error(`[IMAP] Erro conexão ${config.user}:`, err);
            safeResolve(results);
        });

        imap.once('end', () => {
            safeResolve(results);
        });

        try {
            imap.connect();
        } catch (e) {
            console.error(`[IMAP] Exceção ao conectar ${config.user}:`, e);
            safeResolve([]);
        }
    });
}

/**
 * Busca os últimos e-mails trocados com um determinado domínio em TODAS as contas de forma concorrente.
 * @param {string} domain O domínio do cliente (ex: onesubsea.com)
 * @param {number} limit Quantidade máxima de e-mails para retornar POR CONTA
 * @returns {Promise<Array<{subject: string, from: string, date: Date, text: string}>>}
 */
async function searchEmailsByDomain(domain, limit = 10) {
    const configs = getImapConfigs();
    
    if (configs.length === 0) {
        console.log(`[IMAP] Serviço IMAP não configurado. Pulando busca para ${domain}.`);
        return [];
    }

    if (!domain || domain.length < 4) return [];

    console.log(`[IMAP] Iniciando busca sequencial em ${configs.length} conta(s) para o domínio ${domain}`);
    
    let allResults = [];
    for (const config of configs) {
        try {
            const res = await fetchFromAccount(config, domain, limit);
            if (res && res.length > 0) {
                allResults = allResults.concat(res);
            }
        } catch (e) {
            console.error(`[IMAP] Erro na busca sequencial para ${config.user}:`, e);
        }
    }
    
    return allResults;
}

module.exports = { searchEmailsByDomain };
