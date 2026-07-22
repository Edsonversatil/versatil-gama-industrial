const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');
const oldBlockRegex = /\/\/ Pega clientes que nao estao[\s\S]*?pending\.forEach\(c => \{/;
const match = txt.match(oldBlockRegex);
if(match) {
    console.log('Match length:', match[0].length);
    const newBlock = `let pending = clientes.filter(c => {
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
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--green);">🎯 ' + msg + '</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            pending.forEach(c => {`;
    txt = txt.replace(match[0], newBlock);
    fs.writeFileSync('crm_dashboard.html', txt, 'utf8');
    console.log('Logic Patched!');
} else {
    console.log('No match found!');
}
