const fs = require('fs');

const win1252ToBytes = {
  0x20AC: 0x80, // €
  0x201A: 0x82, // ‚
  0x0192: 0x83, // ƒ
  0x201E: 0x84, // „
  0x2026: 0x85, // …
  0x2020: 0x86, // †
  0x2021: 0x87, // ‡
  0x02C6: 0x88, // ˆ
  0x2030: 0x89, // ‰
  0x0160: 0x8A, // Š
  0x2039: 0x8B, // ‹
  0x0152: 0x8C, // Œ
  0x017D: 0x8E, // Ž
  0x2018: 0x91, // ‘
  0x2019: 0x92, // ’
  0x201C: 0x93, // “
  0x201D: 0x94, // ”
  0x2022: 0x95, // •
  0x2013: 0x96, // –
  0x2014: 0x97, // —
  0x02DC: 0x98, // ˜
  0x2122: 0x99, // ™
  0x0161: 0x9A, // š
  0x203A: 0x9B, // ›
  0x0153: 0x9C, // œ
  0x017E: 0x9E, // ž
  0x0178: 0x9F  // Ÿ
};

function decode(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const bytes = [];
    for(let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code <= 255) {
            bytes.push(code);
        } else if (win1252ToBytes[code] !== undefined) {
            bytes.push(win1252ToBytes[code]);
        } else {
            console.warn('Unknown character > 255 at index ' + i + ': ' + code + ' ' + text[i]);
            // Just push the lower byte as fallback, but this might be destructive for real unicode
            bytes.push(code & 0xFF); 
        }
    }
    const buf = Buffer.from(bytes);
    const decoded = buf.toString('utf8');
    fs.writeFileSync(filePath, decoded, 'utf8');
    console.log('Fixed: ' + filePath);
}

decode('crm_dashboard.html');
