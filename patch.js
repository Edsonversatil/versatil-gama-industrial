const fs = require('fs');
let t = fs.readFileSync('crm_dashboard.html', 'utf8');

// Fix 1: Filter tabs UI
t = t.replace(
    '<button class="btn btn-primary" onclick="loadVbotClients()">?? Recarregar Fila Pendente</button>',
    \<div style="display:flex; gap:10px; align-items:center;">
                        <div style="display:flex; background:rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; border:1px solid var(--border);">
                            <button id="btn-vbot-pendentes" class="btn" style="background:var(--blue); border-radius:0; border:none; padding:8px 16px;" onclick="setVbotFilter('pendentes')">Pendentes</button>
                            <button id="btn-vbot-aprovados" class="btn" style="background:transparent; border-radius:0; border:none; padding:8px 16px; color:var(--text-muted);" onclick="setVbotFilter('aprovados')">Concluídos</button>
                        </div>
                        <button class="btn btn-primary" onclick="loadVbotClients()">?? Recarregar</button>
                    </div>\
);

// Fix 2: Filter logic
t = t.replace(
    'let vbotResults = {}; // Armazena resultados por id_cliente\\n\\n        async function loadVbotClients() {',
    \let vbotResults = {}; // Armazena resultados por id_cliente
        let currentVbotFilter = 'pendentes';

        function setVbotFilter(filter) {
            currentVbotFilter = filter;
            document.getElementById('btn-vbot-pendentes').style.background = filter === 'pendentes' ? 'var(--blue)' : 'transparent';
            document.getElementById('btn-vbot-pendentes').style.color = filter === 'pendentes' ? '#fff' : 'var(--text-muted)';
            
            document.getElementById('btn-vbot-aprovados').style.background = filter === 'aprovados' ? 'var(--blue)' : 'transparent';
            document.getElementById('btn-vbot-aprovados').style.color = filter === 'aprovados' ? '#fff' : 'var(--text-muted)';
            
            loadVbotClients();
        }

        async function loadVbotClients() {\
);

// Fix 3: Filter logic body
t = t.replace(
    \            // Pega clientes (mostra todos, mas pendentes primeiro)
            let pending = [...clientes];
            
            pending.sort((a, b) => {
                const aVerified = a.verificado === true || a.status_verificacao === 'verificado' || a.status_verificacao === 'homologacao';
                const bVerified = b.verificado === true || b.status_verificacao === 'verificado' || b.status_verificacao === 'homologacao';
                if (aVerified && !bVerified) return 1;
                if (!aVerified && bVerified) return -1;
                return 0;
            });
            
            if (pending.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--green);">?? Parabéns! Não há clientes na base.</td></tr>';
                return;
            }\,
    \            let pending = clientes.filter(c => {
                const isVerified = c.verificado === true || c.status_verificacao === 'verificado' || c.status_verificacao === 'homologacao';
                if (currentVbotFilter === 'pendentes') return !isVerified;
                return isVerified;
            });
            
            if (currentVbotFilter === 'pendentes') {
                // Ordenar revisao primeiro
                pending.sort((a, b) => {
                    const aRevisao = a.status_verificacao === 'revisao';
                    const bRevisao = b.status_verificacao === 'revisao';
                    if (aRevisao && !bRevisao) return -1;
                    if (!aRevisao && bRevisao) return 1;
                    return 0;
                });
            } else {
                // Ordenar aprovados por data desc
                pending.sort((a, b) => new Date(b.data_verificacao || 0) - new Date(a.data_verificacao || 0));
            }
            
            if (pending.length === 0) {
                tbody.innerHTML = \\\<tr><td colspan="5" style="text-align:center; color:var(--green);">?? \\\</td></tr>\\\;
                return;
            }\
);

// Fix 4: /12 to /10 (replacing all occurrences safely)
t = t.replaceAll('\/12', '\/10');

// Fix 5: IMAP Emails
t = t.replace(
    \            // Montar emails adicionais (todos exceto o primeiro)
            if (data.emails && data.emails.length > 1) {
                for (let i = 1; i < data.emails.length; i++) {
                    const email = data.emails[i];
                    const local = email.split('@')[0].toLowerCase();
                    let dept = 'Comercial';
                    if (local.includes('compra') || local.includes('suprimento')) dept = 'Compras';
                    else if (local.includes('tecnic') || local.includes('engenhar') || local.includes('manut')) dept = 'Técnico';
                    else if (local.includes('diretor') || local.includes('gerencia')) dept = 'Diretoria';
                    else if (local.includes('nf') || local.includes('fiscal') || local.includes('financ')) dept = 'Outro';
                    else if (local.includes('manutencao') || local.includes('pcm')) dept = 'Manutenção';
                    
                    payload.emails_adicionais.push({ email, departamento: dept });
                }
            }\,
    \            // Montar emails adicionais (todos exceto o primeiro)
            const addedEmails = new Set();
            if (payload.contato_email) addedEmails.add(payload.contato_email.toLowerCase());

            if (data.emails && data.emails.length > 1) {
                for (let i = 1; i < data.emails.length; i++) {
                    const email = data.emails[i];
                    if (addedEmails.has(email.toLowerCase())) continue;
                    addedEmails.add(email.toLowerCase());

                    const local = email.split('@')[0].toLowerCase();
                    let dept = 'Comercial';
                    if (local.includes('compra') || local.includes('suprimento')) dept = 'Compras';
                    else if (local.includes('tecnic') || local.includes('engenhar') || local.includes('manut')) dept = 'Técnico';
                    else if (local.includes('diretor') || local.includes('gerencia')) dept = 'Diretoria';
                    else if (local.includes('nf') || local.includes('fiscal') || local.includes('financ')) dept = 'Outro';
                    else if (local.includes('manutencao') || local.includes('pcm')) dept = 'Manutenção';
                    
                    payload.emails_adicionais.push({ email, departamento: dept });
                }
            }

            // EXTRAÇÃO DOS E-MAILS DO IMAP (INBOX DA DIRETORIA)
            if (data.imap_emails && data.imap_emails.length > 0) {
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)/gi;
                data.imap_emails.forEach(msg => {
                    const strToSearch = (msg.from + ' ' + msg.to).toLowerCase();
                    const matches = strToSearch.match(emailRegex);
                    if (matches) {
                        matches.forEach(email => {
                            if (!addedEmails.has(email) && email.includes('@')) {
                                addedEmails.add(email);
                                payload.emails_adicionais.push({ email: email, departamento: 'Diretoria (IMAP)' });
                            }
                        });
                    }
                });
            }\
);

fs.writeFileSync('crm_dashboard.html', t, 'utf8');
console.log('Patch applied successfully.');
