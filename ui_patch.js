const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');

const oldBtn = '<button class="btn btn-primary" onclick="loadVbotClients()"> Recarregar Fila Pendente</button>';
const newBtn = `<div style="display:flex; gap:10px; align-items:center;">
                        <div style="display:flex; background:rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; border:1px solid var(--border);">
                            <button id="btn-vbot-pendentes" class="btn" style="background:var(--blue); border-radius:0; border:none; padding:8px 16px; color:#fff;" onclick="setVbotFilter('pendentes')">Pendentes</button>
                            <button id="btn-vbot-aprovados" class="btn" style="background:transparent; border-radius:0; border:none; padding:8px 16px; color:var(--text-muted);" onclick="setVbotFilter('aprovados')">Concluídos</button>
                        </div>
                        <button class="btn btn-primary" onclick="loadVbotClients()">🔄 Recarregar</button>
                    </div>`;

if (txt.includes(oldBtn)) {
    txt = txt.replace(oldBtn, newBtn);
    fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
    console.log('UI Filter Patch Applied!');
} else {
    console.log('Could not find old button exactly. Searching for fallback...');
    const btnIdx = txt.indexOf('onclick="loadVbotClients()"');
    if (btnIdx !== -1) {
        const startIdx = txt.lastIndexOf('<button', btnIdx);
        const endIdx = txt.indexOf('</button>', btnIdx);
        if (startIdx !== -1 && endIdx !== -1) {
            const block = txt.substring(startIdx, endIdx + 9);
            txt = txt.replace(block, newBtn);
            fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
            console.log('UI Filter Patch Applied via fallback!');
        }
    }
}
