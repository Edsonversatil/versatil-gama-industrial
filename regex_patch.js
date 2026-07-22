const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');

// 1. Fix IMAP block
const imapRegex = /\/\/ Montar emails adicionais \(todos exceto o primeiro\)[\s\S]*?payload\.emails_adicionais\.push\(\{ email, departamento: dept \}\);\n\s*\}\n\s*\}/;

const newImap = `// Montar emails adicionais (todos exceto o primeiro)
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
            }`;

txt = txt.replace(imapRegex, newImap);

// 2. Fix Score /12 to /10 (two places, UI label and Executive Header label)
txt = txt.replace(/\$\{fontesCount\}\/12/g, '${fontesCount}/10');

fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
console.log('Regex patch applied!');
