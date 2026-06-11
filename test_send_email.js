const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.uhserver.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dp.tecnico@versatilservices.com.br',
        pass: '221Edson@#'
    },
    tls: { rejectUnauthorized: false }
});

transport.sendMail({
    from: 'Versatil Services <dp.tecnico@versatilservices.com.br>',
    to: 'dp.tecnico@versatilservices.com.br',
    subject: 'TESTE CRM - SMTP Funcionando!',
    html: '<h2>SMTP Operacional!</h2><p>Este e-mail de teste foi enviado pelo CRM Versatil.</p><p>Data: ' + new Date().toLocaleString('pt-BR') + '</p><p><strong>O sistema esta pronto para disparar campanhas.</strong></p>'
}).then(info => {
    console.log('E-MAIL ENVIADO COM SUCESSO!');
    console.log('MessageId:', info.messageId);
    console.log('Response:', info.response);
}).catch(e => {
    console.log('ERRO:', e.message);
});
