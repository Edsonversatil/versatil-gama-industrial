const nodemailer = require('nodemailer');

const users = [
    'dp.tecnico@versatilservices.com.br',
    'dp.tecnico',
    'dp.tecnico@versatilservices.com',
];

async function test(user) {
    try {
        const t = nodemailer.createTransport({
            host: 'smtp.uhserver.com',
            port: 587,
            secure: false,
            auth: { user, pass: '221Edson@#' },
            tls: { rejectUnauthorized: false },
            connectionTimeout: 8000
        });
        await t.verify();
        console.log('OK COM: ' + user);
    } catch(e) {
        console.log('FALHA: ' + user + ' -> ' + e.message.substring(0, 50));
    }
}

(async () => {
    for (const u of users) await test(u);
    console.log('\nTestando STARTTLS obrigatorio...');
    try {
        const t = nodemailer.createTransport({
            host: 'smtp.uhserver.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: { user: 'dp.tecnico@versatilservices.com.br', pass: '221Edson@#' },
            tls: { rejectUnauthorized: false },
            connectionTimeout: 8000
        });
        await t.verify();
        console.log('OK COM STARTTLS!');
    } catch(e) {
        console.log('FALHA STARTTLS: ' + e.message.substring(0, 50));
    }
})();
