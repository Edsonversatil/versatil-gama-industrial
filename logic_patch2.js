const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');
const oldBlockRegex = /\/\/ Pega clientes que nao estao[\s\S]*?pending\.forEach\(c => \{/;
const newBlock = `// Pega clientes (mostra todos, mas pendentes primeiro)
            let pending = [...clientes];
            
            pending.sort((a, b) => {
                const aVerified = a.verificado === true || a.status_verificacao === 'verificado' || a.status_verificacao === 'homologacao';
                const bVerified = b.verificado === true || b.status_verificacao === 'verificado' || b.status_verificacao === 'homologacao';
                
                // Coloca não verificados primeiro
                if (aVerified && !bVerified) return 1;
                if (!aVerified && bVerified) return -1;
                
                // Entre os não verificados, prioriza os que precisam de revisão
                if (!aVerified && !bVerified) {
                    const aRevisao = a.status_verificacao === 'revisao';
                    const bRevisao = b.status_verificacao === 'revisao';
                    if (aRevisao && !bRevisao) return -1;
                    if (!aRevisao && bRevisao) return 1;
                }
                
                return 0;
            });
            
            if (pending.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--green);">🎯 Parabéns! Não há clientes na base.</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            pending.forEach(c => {`;
const match = txt.match(oldBlockRegex);
if(match) {
    txt = txt.replace(match[0], newBlock);
    fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
    console.log('Logic restored to show ALL clients!');
} else {
    console.log('Match failed');
}
