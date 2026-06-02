const Imap = require('imap');

// Testar conexão IMAP
const imap = new Imap({
    user: 'dp.tecnico@versatilservices.com.br',
    password: '221Edson@#',
    host: 'imap.versatilservices.com.br',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    connTimeout: 10000,
    authTimeout: 10000
});

imap.once('ready', function() {
    console.log('=== IMAP CONECTADO! ===');
    
    // Listar todas as pastas
    imap.getBoxes(function(err, boxes) {
        if (err) { console.log('Erro boxes:', err.message); }
        else {
            console.log('Pastas encontradas:');
            function listBoxes(boxes, prefix) {
                for (const name in boxes) {
                    console.log('  ' + prefix + name);
                    if (boxes[name].children) listBoxes(boxes[name].children, prefix + name + '/');
                }
            }
            listBoxes(boxes, '');
        }
        
        // Abrir INBOX e contar mensagens
        imap.openBox('INBOX', true, function(err, box) {
            if (err) { console.log('Erro INBOX:', err.message); imap.end(); return; }
            console.log('\n=== INBOX ===');
            console.log('Total mensagens:', box.messages.total);
            console.log('Novas:', box.messages.new);
            console.log('Não lidas:', box.messages.unseen);
            imap.end();
        });
    });
});

imap.once('error', function(err) {
    console.log('=== ERRO IMAP ===');
    console.log(err.message);
});

imap.once('end', function() {
    console.log('\nConexão encerrada.');
});

imap.connect();
