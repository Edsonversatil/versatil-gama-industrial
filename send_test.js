const http = require('http');

const data = JSON.stringify({
  leads: [{
    to: 'dp.tecnico@versatilservices.com.br',
    subject: '[TESTE v2] Usinagem de Campo - Nova Foto Faceadeira com Cavaco',
    body: 'Prezado Gestor,\n\nSomos referência em USINAGEM DE CAMPO (in-situ) para o segmento Industrial.\n\nRealizamos faceamento de flanges, retífica de sedes, mandrilhamento e torneamento direto na planta.\n\nTambém atuamos com Troca Térmica ASME, Caldeiraria e END.\n\nAtt, Eng. Edson - (13) 99150-9140',
    clientId: 'TESTE',
    nome: 'Teste Nova Foto'
  }]
});

const req = http.request({
  hostname: 'localhost',
  port: 8080,
  path: '/api/crm/campanha-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Resultado:', body));
});

req.on('error', e => console.log('Erro:', e.message));
req.write(data);
req.end();
