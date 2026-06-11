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

// Simular envio para cliente YARA (enviando para dp.tecnico como teste)
const nomeCliente = 'Yara Brasil';
const segmento = 'Agronegócio / Sucroenergético';

const htmlEmail = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #e94560; margin: 0; font-size: 24px; letter-spacing: 1px;">VERSÁTIL</h1>
        <p style="color: #a0a0b0; margin: 5px 0 0; font-size: 12px; letter-spacing: 3px;">GLOBAL SERVICES</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 30px; background: #f8f9fa; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
            Prezado(a) Gestor de <strong>${nomeCliente}</strong>,
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
            A <strong>Versátil Services</strong> é referência em <strong style="color: #e94560;">USINAGEM DE CAMPO (In-Situ)</strong> para o segmento de <strong>${segmento}</strong>.
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
            Já atendemos a <strong>${nomeCliente.toUpperCase()}</strong> em demandas anteriores e gostaríamos de apresentar nossas soluções atualizadas.
        </p>
        
        <!-- Serviços -->
        <div style="background: #fff; border-left: 4px solid #e94560; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <h3 style="color: #1a1a2e; margin: 0 0 10px; font-size: 14px;">NOSSOS SERVIÇOS ESPECIALIZADOS:</h3>
            <ul style="color: #555; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
                <li>✅ Faceamento de flanges em campo</li>
                <li>✅ Retífica de sedes de válvulas</li>
                <li>✅ Mandrilhamento e torneamento in-situ</li>
                <li>✅ Troca Térmica (ASME) e Retubagem</li>
                <li>✅ Caldeiraria e END (Ensaios Não Destrutivos)</li>
            </ul>
        </div>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
            Atuamos em <strong>paradas programadas e emergenciais</strong>, com equipe própria certificada e mobilização em até 48h para qualquer região do Brasil.
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
            Posso agendar uma apresentação técnica ou enviar nosso portfólio atualizado?
        </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #1a1a2e; padding: 25px 30px; border-radius: 0 0 8px 8px;">
        <p style="color: #e94560; font-weight: bold; margin: 0; font-size: 14px;">
            Eng. Edson de Oliveira Silva
        </p>
        <p style="color: #a0a0b0; margin: 3px 0; font-size: 12px;">
            Gerente Técnico Comercial — Versátil Services
        </p>
        <p style="color: #a0a0b0; margin: 3px 0; font-size: 12px;">
            📞 (13) 3221-8000 &nbsp;|&nbsp; 📧 dp.tecnico@versatilservices.com.br
        </p>
        <p style="color: #a0a0b0; margin: 3px 0; font-size: 12px;">
            🌐 www.versatilservices.com.br
        </p>
    </div>
</div>
`;

const whatsappMsg = `Olá, Gestor! Aqui é o Eng. Edson da Versátil Services.

Somos referência em *USINAGEM DE CAMPO (in-situ)* para ${segmento}.

Já atendemos a *${nomeCliente.toUpperCase()}* em demandas anteriores.

Nossos serviços:
✅ Faceamento de flanges
✅ Retífica de sedes de válvulas
✅ Mandrilhamento e torneamento in-situ
✅ Troca Térmica ASME e Retubagem
✅ Caldeiraria e END

Há demandas de paradas programadas? Posso enviar nosso portfólio atualizado?

Att, Eng. Edson - (13) 3221-8000
www.versatilservices.com.br`;

// Enviar email teste
transport.sendMail({
    from: 'Versatil Services <dp.tecnico@versatilservices.com.br>',
    to: 'dp.tecnico@versatilservices.com.br',
    subject: `Usinagem de Campo (In-Situ) — Versatil Services para ${nomeCliente}`,
    html: htmlEmail
}).then(info => {
    console.log('✅ EMAIL TESTE ENVIADO!');
    console.log('MessageId:', info.messageId);
    console.log('\n=== MENSAGEM WHATSAPP (preview) ===');
    console.log(whatsappMsg);
    console.log('\n=== LINK WHATSAPP ===');
    console.log('https://wa.me/5511999999999?text=' + encodeURIComponent(whatsappMsg).substring(0, 200) + '...');
}).catch(e => console.log('ERRO:', e.message));
