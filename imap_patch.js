const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');

const startStr = '// Montar emails adicionais (todos exceto o primeiro)';
const endStr = 'payload.emails_adicionais.push({ email, departamento: dept });\n                }\n            }';

const idxStart = txt.indexOf(startStr);
const idxEnd = txt.indexOf(endStr, idxStart);

if (idxStart !== -1 && idxEnd !== -1) {
    const fullBlock = txt.substring(idxStart, idxEnd + endStr.length);
    
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
            
    txt = txt.replace(fullBlock, newImap);
    fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
    console.log('IMAP patched using indexOf!');
} else {
    console.log('Could not find block. start:', idxStart, 'end:', idxEnd);
}
