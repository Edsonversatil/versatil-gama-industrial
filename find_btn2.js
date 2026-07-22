const fs = require('fs');
let txt = fs.readFileSync('crm_dashboard.html', 'utf8');
const idx = txt.indexOf('const isVerified = c.status_verificacao');
console.log(txt.substring(idx, idx + 800));
