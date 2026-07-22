const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');

const idx = txt.indexOf('if (data.emails && data.emails.length > 1)');
const endIdx = txt.indexOf('// E', idx);

if (idx !== -1 && endIdx !== -1) {
    const block = txt.substring(idx, endIdx);
    
    const newImap = `if (data.emails && data.emails.length > 1) {
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
            }

            `;
    txt = txt.replace(block, newImap);

    // Also inject addedEmails definition right before `if (data.emails...`
    if (!txt.includes('const addedEmails = new Set();')) {
        txt = txt.replace('// Montar emails adicionais (todos exceto o primeiro)', `// Montar emails adicionais (todos exceto o primeiro)\n            const addedEmails = new Set();\n            if (payload.contato_email) addedEmails.add(payload.contato_email.toLowerCase());`);
    }

    // Fix /12 to /10
    txt = txt.replace(/\$\{fontesCount\}\/12/g, '${fontesCount}/10');

    fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
    console.log('Fixed IMAP and Score in dashboard!');
} else {
    console.log('Indices not found:', idx, endIdx);
}
