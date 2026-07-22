# -*- coding: utf-8 -*-
import os

with open('crm_dashboard.html.backup_20260624_1048', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Decode Mojibake
win1252ToBytes = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87,
  0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91,
  0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98,
  0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F
}

decoded_bytes = bytearray()
for char in text:
    c = ord(char)
    if c <= 255:
        decoded_bytes.append(c)
    elif c in win1252ToBytes:
        decoded_bytes.append(win1252ToBytes[c])
    else:
        # Ignore or fallback for other unknown characters
        pass

text = decoded_bytes.decode('utf-8', errors='ignore')

# 2. Add Filter UI
old_ui = '''                    <div class="panel-title">
                        <h2>V-Bot Hunter — Robô de Enriquecimento</h2>
                        <p>Realize varreduras nas pastas locais e internet para preencher dados faltantes automaticamente.</p>
                    </div>
                    <button class="btn btn-primary" onclick="loadVbotClients()">🔄 Recarregar Fila Pendente</button>
                </div>'''
new_ui = '''                    <div class="panel-title">
                        <h2>V-Bot Hunter — Robô de Enriquecimento</h2>
                        <p>Realize varreduras nas pastas locais e internet para preencher dados faltantes automaticamente.</p>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <div style="display:flex; background:rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; border:1px solid var(--border);">
                            <button id="btn-vbot-pendentes" class="btn" style="background:var(--blue); border-radius:0; border:none; padding:8px 16px;" onclick="setVbotFilter('pendentes')">Pendentes</button>
                            <button id="btn-vbot-aprovados" class="btn" style="background:transparent; border-radius:0; border:none; padding:8px 16px; color:var(--text-muted);" onclick="setVbotFilter('aprovados')">Concluídos</button>
                        </div>
                        <button class="btn btn-primary" onclick="loadVbotClients()">🔄 Recarregar</button>
                    </div>
                </div>'''
text = text.replace(old_ui, new_ui)

# 3. Add Logic Definition
old_logic_def = '''        // V-BOT HUNTER ENGINE
        // ==========================================================================
        let vbotResults = {}; // Armazena resultados por id_cliente

        async function loadVbotClients() {'''
new_logic_def = '''        // V-BOT HUNTER ENGINE
        // ==========================================================================
        let vbotResults = {}; // Armazena resultados por id_cliente
        let currentVbotFilter = 'pendentes';

        function setVbotFilter(filter) {
            currentVbotFilter = filter;
            document.getElementById('btn-vbot-pendentes').style.background = filter === 'pendentes' ? 'var(--blue)' : 'transparent';
            document.getElementById('btn-vbot-pendentes').style.color = filter === 'pendentes' ? '#fff' : 'var(--text-muted)';
            
            document.getElementById('btn-vbot-aprovados').style.background = filter === 'aprovados' ? 'var(--blue)' : 'transparent';
            document.getElementById('btn-vbot-aprovados').style.color = filter === 'aprovados' ? '#fff' : 'var(--text-muted)';
            
            loadVbotClients();
        }

        async function loadVbotClients() {'''
text = text.replace(old_logic_def, new_logic_def)

# 4. Add Logic Body
old_body = '''            // Pega clientes (mostra todos, mas pendentes primeiro)
            let pending = [...clientes];
            
            pending.sort((a, b) => {
                const aVerified = a.verificado === true || a.status_verificacao === 'verificado' || a.status_verificacao === 'homologacao';
                const bVerified = b.verificado === true || b.status_verificacao === 'verificado' || b.status_verificacao === 'homologacao';
                if (aVerified && !bVerified) return 1;
                if (!aVerified && bVerified) return -1;
                return 0;
            });
            
            if (pending.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--green);">🎯 Parabéns! Não há clientes na base.</td></tr>';
                return;
            }'''
new_body = '''            let pending = clientes.filter(c => {
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
                pending.sort((a, b) => {
                    const d1 = new Date(b.data_verificacao || 0).getTime();
                    const d2 = new Date(a.data_verificacao || 0).getTime();
                    return d1 - d2;
                });
            }
            
            if (pending.length === 0) {
                const msg = currentVbotFilter === 'pendentes' ? 'Parabéns! Inbox Zero. Não há clientes pendentes.' : 'Nenhum cliente concluído ainda.';
                tbody.innerHTML = <tr><td colspan="5" style="text-align:center; color:var(--green);">🎯 </td></tr>;
                return;
            }'''
text = text.replace(old_body, new_body)

# 5. /12 to /10 Score and EVIDENCIAS DO SCORE UI
old_score = '''                    // 🌟🌟🌟 EVIDÊNCIAS DO SCORE 🌟🌟🌟
                    html += <div style="margin-bottom:14px; padding:14px; background:rgba(255,255,255,0.03); border-radius:10px; border-left:4px solid #2ecc71;">
                        <div style="color:#2ecc71; font-size:0.72rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:8px;">📊 Evidências do Score (/12)</div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:3px 12px;">;'''
new_score = '''                    // 🌟🌟🌟 EVIDÊNCIAS DO SCORE 🌟🌟🌟
                    html += <div style="margin-bottom:14px; padding:14px; background:rgba(255,255,255,0.03); border-radius:10px; border-left:4px solid #2ecc71;">
                        <div style="color:#2ecc71; font-size:0.72rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:8px;">📊 Evidências do Score (/10)</div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:3px 12px;">;'''
text = text.replace(old_score, new_score)

# 6. /12 to /10 header in executive summary
text = text.replace('/12 evidências', '/10 evidências')

# 7. IMAP Emails logic
old_imap = '''            // Montar emails adicionais (todos exceto o primeiro)
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
            }'''
new_imap = '''            // Montar emails adicionais (todos exceto o primeiro)
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
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
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
            }'''
text = text.replace(old_imap, new_imap)

with open('crm_dashboard.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Full restore and patch applied successfully!")
