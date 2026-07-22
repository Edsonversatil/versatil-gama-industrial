const fs = require('fs');
const txt = fs.readFileSync('crm_dashboard.html', 'utf8');
const idx = txt.indexOf('loadVbotClients()');
console.log(txt.substring(idx - 150, idx + 150));
