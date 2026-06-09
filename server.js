/* =============================================
   VERSATIL SERVICES — Backend Server
   Proxy seguro para API Asaas (Cartão de Crédito)
   API Key NUNCA exposta no frontend
   ============================================= */

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;

// =============================================
// CONFIGURAÇÃO ASAAS
// =============================================
const ASAAS_API_KEY = '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFkZDg3YzMyLThkOGMtNDc0Yy1hYzE2LWYzZWEwYmJlZDNmYTo6JGFhY2hfYzY5ZDBmMjQtZTFmYy00NTA2LWFjNWMtMzFiNGQ4ZDFhNTUw';
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

// =============================================
// MIDDLEWARE
// =============================================
app.use(express.json());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});
app.use(express.static(path.join(__dirname)));

// =============================================
// HELPER: Chamada à API Asaas
// =============================================
async function asaasRequest(endpoint, method, body) {
    const url = `${ASAAS_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'access_token': ASAAS_API_KEY
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return { status: response.status, data };
}

// =============================================
// ROTA: Criar cliente no Asaas
// =============================================
app.post('/api/asaas/customers', async (req, res) => {
    try {
        const { name, cpfCnpj, email, mobilePhone } = req.body;

        if (!name || !cpfCnpj) {
            return res.status(400).json({
                success: false,
                error: 'Nome e CPF/CNPJ são obrigatórios.'
            });
        }

        const result = await asaasRequest('/customers', 'POST', {
            name,
            cpfCnpj: cpfCnpj.replace(/\D/g, ''),
            email: email || undefined,
            mobilePhone: mobilePhone ? mobilePhone.replace(/\D/g, '') : undefined
        });

        if (result.status >= 200 && result.status < 300) {
            res.json({ success: true, customer: result.data });
        } else {
            res.status(result.status).json({
                success: false,
                error: result.data.errors ? result.data.errors[0].description : 'Erro ao criar cliente.'
            });
        }
    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
});

// =============================================
// ROTA: Criar pagamento com cartão de crédito
// =============================================
app.post('/api/asaas/payments', async (req, res) => {
    try {
        const {
            customerId,
            value,
            description,
            creditCard,
            creditCardHolderInfo
        } = req.body;

        if (!customerId || !value || !creditCard || !creditCardHolderInfo) {
            return res.status(400).json({
                success: false,
                error: 'Dados incompletos para pagamento.'
            });
        }

        // Data de vencimento = hoje
        const today = new Date().toISOString().split('T')[0];

        const paymentBody = {
            customer: customerId,
            billingType: 'CREDIT_CARD',
            value: parseFloat(value),
            dueDate: today,
            description: description || 'Compra VERSATIL SERVICES',
            creditCard: {
                holderName: creditCard.holderName,
                number: creditCard.number.replace(/\s/g, ''),
                expiryMonth: creditCard.expiryMonth,
                expiryYear: creditCard.expiryYear,
                ccv: creditCard.ccv
            },
            creditCardHolderInfo: {
                name: creditCardHolderInfo.name,
                email: creditCardHolderInfo.email,
                cpfCnpj: creditCardHolderInfo.cpfCnpj.replace(/\D/g, ''),
                postalCode: creditCardHolderInfo.postalCode.replace(/\D/g, ''),
                addressNumber: creditCardHolderInfo.addressNumber,
                phone: creditCardHolderInfo.phone ? creditCardHolderInfo.phone.replace(/\D/g, '') : undefined
            }
        };

        const result = await asaasRequest('/payments', 'POST', paymentBody);

        if (result.status >= 200 && result.status < 300) {
            const status = result.data.status;
            const confirmed = status === 'CONFIRMED' || status === 'RECEIVED';

            res.json({
                success: true,
                approved: confirmed,
                status: status,
                paymentId: result.data.id,
                value: result.data.value,
                message: confirmed
                    ? 'Pagamento aprovado com sucesso!'
                    : status === 'PENDING'
                        ? 'Pagamento em processamento.'
                        : 'Pagamento não aprovado.'
            });
        } else {
            const errorMsg = result.data.errors
                ? result.data.errors.map(e => e.description).join('; ')
                : 'Erro ao processar pagamento.';
            res.status(result.status).json({
                success: false,
                error: errorMsg
            });
        }
    } catch (err) {
        console.error('Erro ao processar pagamento:', err);
        res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
});

// =============================================
// NODEMAILER — Email de confirmação
// =============================================
const nodemailer = require('nodemailer');

// SMTP Configuration — Carregado de smtp_config.json
let SMTP_CONFIG = { host: '', port: 587, secure: false, auth: { user: '', pass: '' } };
const smtpConfigPath = path.join(__dirname, '..', 'smtp_config.json');
try { if (fs.existsSync(smtpConfigPath)) SMTP_CONFIG = JSON.parse(fs.readFileSync(smtpConfigPath, 'utf8')); } catch(e) { console.log('[SMTP] Erro ao carregar config:', e.message); }

async function sendOrderConfirmationEmail(clienteEmail, clienteNome, produtos, valorPago, paymentId) {
    // Não enviar se SMTP não configurado
    if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
        console.log('[EMAIL] SMTP não configurado. Email não enviado.');
        return { sent: false, reason: 'SMTP não configurado' };
    }

    try {
        const transporter = nodemailer.createTransport(SMTP_CONFIG);

        const produtosHtml = produtos.map(p =>
            `<tr><td style="padding:8px;border-bottom:1px solid #333;">${p.name}</td><td style="padding:8px;border-bottom:1px solid #333;">${p.qty} un</td><td style="padding:8px;border-bottom:1px solid #333;">R$ ${p.price.toFixed(2).replace('.', ',')}</td></tr>`
        ).join('');

        const htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:30px;border-radius:12px;">
            <div style="text-align:center;margin-bottom:24px;">
                <h1 style="color:#25D366;margin:0;">✓ Pagamento Confirmado</h1>
                <p style="color:#aaa;margin-top:8px;">VERSATIL SERVICES</p>
            </div>
            <div style="background:#111;border-radius:10px;padding:20px;margin-bottom:20px;">
                <p style="margin:0 0 8px;">Olá <strong>${clienteNome}</strong>,</p>
                <p style="margin:0;color:#aaa;">Seu pagamento foi confirmado com sucesso!</p>
            </div>
            <div style="background:#111;border-radius:10px;padding:20px;margin-bottom:20px;">
                <h3 style="color:#25D366;margin:0 0 12px;">Produtos</h3>
                <table style="width:100%;border-collapse:collapse;color:#ccc;">
                    <thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #25D366;">Produto</th><th style="padding:8px;border-bottom:2px solid #25D366;">Qtd</th><th style="padding:8px;border-bottom:2px solid #25D366;">Preço</th></tr></thead>
                    <tbody>${produtosHtml}</tbody>
                </table>
                <div style="text-align:right;margin-top:12px;font-size:20px;font-weight:800;color:#25D366;">Total: R$ ${valorPago.toFixed(2).replace('.', ',')}</div>
            </div>
            <div style="background:#111;border-radius:10px;padding:20px;margin-bottom:20px;">
                <p style="margin:0;color:#aaa;font-size:13px;">ID do pagamento: <strong>${paymentId}</strong></p>
                <p style="margin:8px 0 0;color:#aaa;font-size:13px;">Forma de pagamento: <strong>PIX</strong></p>
            </div>
            <div style="text-align:center;padding:20px 0;border-top:1px solid #222;">
                <p style="color:#666;font-size:12px;margin:0;">VERSATIL SERVICES — Sorocaba/SP</p>
                <p style="color:#666;font-size:12px;margin:4px 0 0;">WhatsApp: (13) 99150-9140</p>
            </div>
        </div>`;

        const info = await transporter.sendMail({
            from: `"Versatil Services" <${SMTP_CONFIG.auth.user}>`,
            to: clienteEmail,
            subject: 'Pagamento confirmado - Versatil Services',
            html: htmlBody
        });

        console.log(`[EMAIL] Enviado para ${clienteEmail}: ${info.messageId}`);
        return { sent: true, messageId: info.messageId };
    } catch (err) {
        console.error('[EMAIL] Erro ao enviar:', err.message);
        return { sent: false, reason: err.message };
    }
}

// =============================================
// ROTA: POST /api/pix/create — Criar cobrança PIX real
// =============================================
app.post('/api/pix/create', async (req, res) => {
    try {
        const { name, cpfCnpj, email, phone, value, description } = req.body;

        if (!name || !cpfCnpj || !value) {
            return res.status(400).json({
                success: false,
                error: 'Nome, CPF/CNPJ e valor são obrigatórios.'
            });
        }

        console.log(`[PIX] Criando cobrança: ${name} / ${cpfCnpj} / R$ ${value}`);

        // 1. Criar/buscar cliente
        let customerId;
        const customerResult = await asaasRequest('/customers', 'POST', {
            name,
            cpfCnpj: cpfCnpj.replace(/\D/g, ''),
            email: email || undefined,
            mobilePhone: phone ? phone.replace(/\D/g, '') : undefined
        });

        if (customerResult.status >= 400) {
            // Tentar buscar cliente existente pelo CPF
            const searchResult = await asaasRequest(`/customers?cpfCnpj=${cpfCnpj.replace(/\D/g, '')}`, 'GET');
            if (searchResult.status >= 200 && searchResult.status < 300 && searchResult.data.data && searchResult.data.data.length > 0) {
                customerId = searchResult.data.data[0].id;
                console.log(`[PIX] Cliente existente: ${customerId}`);
            } else {
                console.error('[PIX] Erro ao criar cliente:', customerResult.data);
                return res.status(customerResult.status).json({
                    success: false,
                    error: customerResult.data.errors ? customerResult.data.errors[0].description : 'Erro ao criar cliente.'
                });
            }
        } else {
            customerId = customerResult.data.id;
            console.log(`[PIX] Cliente criado: ${customerId}`);
        }

        // 2. Criar cobrança PIX
        const today = new Date().toISOString().split('T')[0];
        const paymentResult = await asaasRequest('/payments', 'POST', {
            customer: customerId,
            billingType: 'PIX',
            value: parseFloat(value),
            dueDate: today,
            description: description || 'Pedido Versatil Services'
        });

        if (paymentResult.status >= 400) {
            const errorMsg = paymentResult.data.errors
                ? paymentResult.data.errors.map(e => e.description).join('; ')
                : 'Erro ao criar cobrança PIX.';
            console.error('[PIX] Erro ao criar pagamento:', errorMsg);
            return res.status(paymentResult.status).json({ success: false, error: errorMsg });
        }

        const paymentId = paymentResult.data.id;
        console.log(`[PIX] Pagamento criado: ${paymentId}`);

        // 3. Buscar QR Code
        const qrResult = await asaasRequest(`/payments/${paymentId}/pixQrCode`, 'GET');

        if (qrResult.status >= 200 && qrResult.status < 300) {
            console.log(`[PIX] QR Code gerado com sucesso`);
            res.json({
                success: true,
                paymentId: paymentId,
                status: paymentResult.data.status,
                value: paymentResult.data.value,
                pixQrCode: qrResult.data.encodedImage,
                pixCopyPaste: qrResult.data.payload,
                expirationDate: qrResult.data.expirationDate
            });
        } else {
            console.warn('[PIX] QR Code indisponível, retornando dados parciais');
            res.json({
                success: true,
                paymentId: paymentId,
                status: paymentResult.data.status,
                value: paymentResult.data.value,
                pixQrCode: null,
                pixCopyPaste: null
            });
        }

    } catch (err) {
        console.error('[PIX] Erro crítico:', err);
        res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
});

// =============================================
// ROTA: GET /api/pix/status/:paymentId — Consultar status
// =============================================
// Rastrear emails já enviados para não duplicar
const emailsSent = new Set();

app.get('/api/pix/status/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId || req.query.paymentId;
        const result = await asaasRequest(`/payments/${paymentId}`, 'GET');

        if (result.status >= 200 && result.status < 300) {
            const status = result.data.status;
            const confirmed = status === 'RECEIVED' || status === 'CONFIRMED';

            console.log(`[PIX STATUS] ${paymentId}: ${status}`);

            // Enviar email automaticamente quando confirmado (uma vez)
            if (confirmed && !emailsSent.has(paymentId)) {
                emailsSent.add(paymentId);
                // Email será enviado pelo frontend passando os dados do pedido
                console.log(`[PIX STATUS] Pagamento ${paymentId} CONFIRMADO!`);
            }

            res.json({
                success: true,
                paymentId: paymentId,
                status: confirmed ? 'CONFIRMED' : 'PENDING',
                rawStatus: status,
                confirmedDate: result.data.confirmedDate || null
            });
        } else {
            res.status(result.status).json({ success: false, error: 'Pagamento não encontrado.' });
        }
    } catch (err) {
        console.error('[PIX STATUS] Erro:', err);
        res.status(500).json({ success: false, error: 'Erro interno.' });
    }
});

// Also handle query-param format: /api/pix/status?paymentId=xxx (Vercel serverless compat)
app.get('/api/pix/status', async (req, res) => {
    try {
        const paymentId = req.query.paymentId;
        if (!paymentId) {
            return res.status(400).json({ success: false, error: 'paymentId é obrigatório.' });
        }
        const result = await asaasRequest(`/payments/${paymentId}`, 'GET');

        if (result.status >= 200 && result.status < 300) {
            const status = result.data.status;
            const confirmed = status === 'RECEIVED' || status === 'CONFIRMED';
            console.log(`[PIX STATUS] ${paymentId}: ${status}`);
            res.json({
                success: true,
                paymentId: paymentId,
                status: confirmed ? 'CONFIRMED' : 'PENDING',
                rawStatus: status,
                confirmedDate: result.data.confirmedDate || null
            });
        } else {
            res.status(result.status).json({ success: false, error: 'Pagamento não encontrado.' });
        }
    } catch (err) {
        console.error('[PIX STATUS] Erro:', err);
        res.status(500).json({ success: false, error: 'Erro interno.' });
    }
});

// =============================================
// ROTA: POST /api/email/confirmation — Enviar email de confirmação
// =============================================
app.post('/api/email/confirmation', async (req, res) => {
    try {
        const { email, nome, produtos, valorPago, paymentId } = req.body;

        if (!email || !nome) {
            return res.status(400).json({ success: false, error: 'Email e nome são obrigatórios.' });
        }

        const result = await sendOrderConfirmationEmail(email, nome, produtos || [], valorPago || 0, paymentId || '');
        res.json({ success: result.sent, ...result });
    } catch (err) {
        console.error('[EMAIL] Erro:', err);
        res.status(500).json({ success: false, error: 'Erro ao enviar email.' });
    }
});

// =============================================
// ROTAS DO ECOSSISTEMA CRM VERSATIL SERVICES
// =============================================
const parentDir = path.join(__dirname, '..');

app.get('/crm', (req, res) => {
    res.sendFile(path.join(__dirname, 'crm_dashboard.html'));
});

app.get('/api/crm/clientes', (req, res) => {
    try {
        const filePath = path.join(parentDir, 'clientes_database.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'Database de clientes não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/crm/contatos', (req, res) => {
    try {
        const filePath = path.join(parentDir, 'contatos_database.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'Database de contatos não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/crm/reativacao', (req, res) => {
    try {
        const filePath = path.join(parentDir, 'reativacao_clientes.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'Database de reativação não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/crm/leads', (req, res) => {
    try {
        const { nome_cliente, segmento_industrial, porte_empresa, potencial_comercial, prioridade_comercial, cidade, estado, contato_nome, contato_email, contato_telefone } = req.body;
        
        if (!nome_cliente || !segmento_industrial) {
            return res.status(400).json({ error: 'Nome do cliente e segmento são obrigatórios.' });
        }

        const clientesPath = path.join(parentDir, 'clientes_database.json');
        const contatosPath = path.join(parentDir, 'contatos_database.json');

        let dbClientes = [];
        if (fs.existsSync(clientesPath)) {
            dbClientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
        }

        // Generate next ID
        let maxId = 0;
        dbClientes.forEach(c => {
            const num = parseInt(c.id_cliente);
            if (!isNaN(num) && num > maxId) maxId = num;
        });
        const nextId = String(maxId + 1).padStart(4, '0');

        // Text templates for the lead
        const wa = `Olá, ${contato_nome || 'Gestor'}! Tudo bem? Sou o Eng. Edson da Versátil Global Services. Concluímos recentemente uma campanha de alta performance em ${segmento_industrial} e lembrei da ${nome_cliente}. Como estão as demandas de manutenção por aí?`;
        const emailMsg = `Prezado(a) ${contato_nome || 'Gestor'},\n\nEspero que esta mensagem o encontre bem.\n\nA Versátil Global Services é especialista em soluções industriais de troca térmica e usinagem in-situ para o segmento de ${segmento_industrial}.\n\nGostaríamos de apresentar nosso portfólio para a ${nome_cliente}. Podemos alinhar uma conversa técnica?\n\nAtenciosamente,\n\nEng. Edson de Oliveira Silva\nGerente Técnico Comercial — Versátil Global Services`;
        const linkedin = `Olá, ${contato_nome || 'Gestor'}! Muito prazer. Acompanho seus projetos na ${nome_cliente}. Somos da Versátil e atuamos em manutenção térmica de alta complexidade. Seria um prazer conectar-me.`;

        const newClient = {
            id_cliente: nextId,
            nome_cliente: nome_cliente,
            segmento_industrial: segmento_industrial,
            porte_empresa: porte_empresa || 'Médio',
            potencial_comercial: potencial_comercial || 'Médio Potencial',
            prioridade_comercial: prioridade_comercial || 'C - Manter cadastro',
            qtd_propostas: 0,
            qtd_relatorios: 0,
            qtd_contratos: 0,
            data_ultima_atividade: new Date().toISOString().split('T')[0],
            dias_inativo: 0,
            requer_reativacao: false,
            roteiro_comercial: {
                servico_destaque: "caldeiraria e manutenção de alta performance",
                mensagem_whatsapp: wa,
                mensagem_email: emailMsg,
                mensagem_linkedin: linkedin
            }
        };

        dbClientes.unshift(newClient); // Add to the top
        fs.writeFileSync(clientesPath, JSON.stringify(dbClientes, null, 2), 'utf8');

        // Add contact to contatos_database.json if provided
        if (contato_nome) {
            let dbContatos = [];
            if (fs.existsSync(contatosPath)) {
                dbContatos = JSON.parse(fs.readFileSync(contatosPath, 'utf8'));
            }
            
            const nextContId = `cont_${String(dbContatos.length + 1).padStart(4, '0')}`;
            const newContact = {
                id_contato: nextContId,
                id_cliente: nextId,
                nome: contato_nome,
                cargo: 'Gestor de Contatos',
                email: contato_email || '',
                telefone: contato_telefone || '',
                celular: contato_telefone || '',
                cidade: cidade || '',
                estado: estado || '',
                arquivo_origem: 'Lead Manual',
                data_aproximada: new Date().toISOString().split('T')[0]
            };
            dbContatos.unshift(newContact);
            fs.writeFileSync(contatosPath, JSON.stringify(dbContatos, null, 2), 'utf8');
        }

        res.json({ success: true, client: newClient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =============================================
// ROTAS DE CAMPANHA DE EMAIL — CRM
// =============================================

// Caminho do log de campanhas
const campanhaLogPath = path.join(parentDir, 'campanha_log.json');

// Helper: Gerar template HTML profissional para emails
function gerarEmailHtml(bodyText) {
    const bodyHtml = bodyText.replace(/\n/g, '<br>').replace(/\(13\) 3221-8000/g, '(13) 99150-9140').replace(/3221-8000/g, '99150-9140');
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4;">
            <tr><td align="center" style="padding:20px 10px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr><td style="background:#BF2026;padding:28px 32px;text-align:center;">
                        <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;letter-spacing:1px;">VERSATIL GLOBAL SERVICES</h1>
                        <p style="margin:6px 0 0;font-size:12px;color:#f8d0d2;letter-spacing:0.5px;">Usinagem de Campo & Serviços Industriais</p>
                    </td></tr>
                    <!-- Hero Images 2x2 Grid -->
                    <tr><td style="padding:8px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="50%" style="padding:4px;">
                                    <img src="https://raw.githubusercontent.com/Edsonversatil/versatil-gama-industrial/stable/global-premium-v1/Fotos/email_faceamento.png" alt="Faceamento de Flange" width="280" style="width:100%;height:auto;display:block;border-radius:6px;">
                                    <p style="margin:4px 0 0;font-size:11px;color:#BF2026;font-weight:700;text-align:center;">Faceamento de Flange</p>
                                </td>
                                <td width="50%" style="padding:4px;">
                                    <img src="https://raw.githubusercontent.com/Edsonversatil/versatil-gama-industrial/stable/global-premium-v1/Fotos/email_mandrilhamento.png" alt="Mandrilhamento em Campo" width="280" style="width:100%;height:auto;display:block;border-radius:6px;">
                                    <p style="margin:4px 0 0;font-size:11px;color:#BF2026;font-weight:700;text-align:center;">Mandrilhamento em Campo</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" style="padding:4px;">
                                    <img src="https://raw.githubusercontent.com/Edsonversatil/versatil-gama-industrial/stable/global-premium-v1/Fotos/email_torneamento.png" alt="Usinagem em Eixo In-Situ" width="280" style="width:100%;height:auto;display:block;border-radius:6px;">
                                    <p style="margin:4px 0 0;font-size:11px;color:#BF2026;font-weight:700;text-align:center;">Usinagem em Eixo In-Situ</p>
                                </td>
                                <td width="50%" style="padding:4px;">
                                    <img src="https://raw.githubusercontent.com/Edsonversatil/versatil-gama-industrial/stable/global-premium-v1/Fotos/email_corte_tubos.png" alt="Corte e Biselamento" width="280" style="width:100%;height:auto;display:block;border-radius:6px;">
                                    <p style="margin:4px 0 0;font-size:11px;color:#BF2026;font-weight:700;text-align:center;">Corte e Biselamento</p>
                                </td>
                            </tr>
                        </table>
                    </td></tr>
                    <!-- Body -->
                    <tr><td style="padding:32px;color:#333333;font-size:15px;line-height:1.7;">
                        ${bodyHtml}
                    </td></tr>
                    <!-- CTA Button -->
                    <tr><td style="padding:0 32px 28px;" align="center">
                        <a href="https://wa.me/5513991509140" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">📱 Falar via WhatsApp</a>
                    </td></tr>
                    <!-- Footer -->
                    <tr><td style="background:#f9f9f9;padding:24px 32px;border-top:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:13px;color:#555;"><strong>Eng. Edson de Oliveira Silva</strong></p>
                        <p style="margin:4px 0 0;font-size:12px;color:#888;">Gerente Técnico Comercial — Versatil Global Services</p>
                        <p style="margin:4px 0 0;font-size:12px;color:#888;">📱 (13) 99150-9140 | dp.tecnico@versatilservices.com.br</p>
                    </td></tr>
                    <!-- Bottom bar -->
                    <tr><td style="background:#BF2026;padding:10px;text-align:center;">
                        <p style="margin:0;font-size:10px;color:#f8d0d2;">© ${new Date().getFullYear()} Versatil Global Services — Todos os direitos reservados</p>
                    </td></tr>
                </table>
            </td></tr>
        </table>
    </body>
    </html>`;
}

// Helper: Ler/Salvar log de campanhas
function lerCampanhaLog() {
    try {
        if (fs.existsSync(campanhaLogPath)) return JSON.parse(fs.readFileSync(campanhaLogPath, 'utf8'));
    } catch(e) {}
    return [];
}
function salvarCampanhaLog(log) {
    fs.writeFileSync(campanhaLogPath, JSON.stringify(log, null, 2), 'utf8');
}

// GET /api/crm/smtp-config — Retorna configuração SMTP (sem senha)
app.get('/api/crm/smtp-config', (req, res) => {
    res.json({
        host: SMTP_CONFIG.host || '',
        port: SMTP_CONFIG.port || 587,
        secure: SMTP_CONFIG.secure || false,
        user: (SMTP_CONFIG.auth && SMTP_CONFIG.auth.user) || ''
    });
});

// POST /api/crm/smtp-config — Salva configuração SMTP
app.post('/api/crm/smtp-config', (req, res) => {
    try {
        const body = req.body;
        // Aceita tanto { user, pass } quanto { auth: { user, pass } }
        const host = body.host;
        const port = body.port;
        const secure = body.secure;
        const user = body.user || (body.auth && body.auth.user) || '';
        const pass = body.pass || (body.auth && body.auth.pass) || '';
        
        if (!host || !user || !pass) {
            return res.status(400).json({ error: 'Host, user e pass são obrigatórios.' });
        }
        const newConfig = {
            host,
            port: parseInt(port) || 587,
            secure: secure === true || secure === 'true' || parseInt(port) === 465,
            auth: { user, pass }
        };
        fs.writeFileSync(smtpConfigPath, JSON.stringify(newConfig, null, 2), 'utf8');
        // Recarregar configuração em memória
        SMTP_CONFIG = newConfig;
        console.log('[SMTP] Configuração salva com sucesso.');
        res.json({ success: true, message: 'Configuração SMTP salva.' });
    } catch (err) {
        console.error('[SMTP] Erro ao salvar config:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/crm/smtp-test — Enviar email de teste
app.post('/api/crm/smtp-test', async (req, res) => {
    try {
        if (!SMTP_CONFIG.auth || !SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
            return res.status(400).json({ error: 'SMTP não configurado. Salve a configuração primeiro.' });
        }
        const testTo = req.body.to || SMTP_CONFIG.auth.user;
        const transporter = nodemailer.createTransport(SMTP_CONFIG);
        const htmlBody = gerarEmailHtml('Este é um <strong>email de teste</strong> enviado pelo CRM Versatil Global Services.\n\nSe você recebeu esta mensagem, a configuração SMTP está funcionando corretamente!');
        const info = await transporter.sendMail({
            from: `Eng. Edson - Versatil Global Services <${SMTP_CONFIG.auth.user}>`,
            to: testTo,
            subject: '[TESTE] CRM Versatil — Verificação SMTP',
            html: htmlBody
        });
        console.log(`[SMTP TEST] Email de teste enviado para ${testTo}: ${info.messageId}`);
        res.json({ success: true, messageId: info.messageId, to: testTo });
    } catch (err) {
        console.error('[SMTP TEST] Erro:', err.message);
        res.status(500).json({ error: `Falha no envio: ${err.message}` });
    }
});

// POST /api/crm/enviar-email — Enviar email individual personalizado
app.post('/api/crm/enviar-email', async (req, res) => {
    try {
        const { to, subject, body, clientId } = req.body;
        if (!to || !subject || !body) {
            return res.status(400).json({ error: 'Campos to, subject e body são obrigatórios.' });
        }
        if (!SMTP_CONFIG.auth || !SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
            return res.status(400).json({ error: 'SMTP não configurado.' });
        }
        const transporter = nodemailer.createTransport(SMTP_CONFIG);
        const htmlBody = gerarEmailHtml(body);
        const info = await transporter.sendMail({
            from: `Eng. Edson - Versatil Global Services <${SMTP_CONFIG.auth.user}>`,
            to,
            subject,
            html: htmlBody
        });
        // Registrar no log
        const logEntry = {
            id: `email_${Date.now()}`,
            tipo: 'individual',
            to, subject, clientId: clientId || null,
            status: 'enviado',
            messageId: info.messageId,
            data: new Date().toISOString()
        };
        const log = lerCampanhaLog();
        log.unshift(logEntry);
        salvarCampanhaLog(log);
        console.log(`[EMAIL CRM] Enviado para ${to}: ${info.messageId}`);
        res.json({ success: true, messageId: info.messageId });
    } catch (err) {
        console.error('[EMAIL CRM] Erro:', err.message);
        // Registrar falha no log
        const logEntry = {
            id: `email_${Date.now()}`,
            tipo: 'individual',
            to: req.body.to, subject: req.body.subject, clientId: req.body.clientId || null,
            status: 'erro',
            erro: err.message,
            data: new Date().toISOString()
        };
        const log = lerCampanhaLog();
        log.unshift(logEntry);
        salvarCampanhaLog(log);
        res.status(500).json({ error: `Falha no envio: ${err.message}` });
    }
});

// POST /api/crm/campanha-email — Enviar campanha em lote (com delay de 30s)
app.post('/api/crm/campanha-email', (req, res) => {
    const { leads } = req.body;
    if (!leads || !Array.isArray(leads) || leads.length === 0) {
        return res.status(400).json({ error: 'Lista de leads é obrigatória.' });
    }
    if (!SMTP_CONFIG.auth || !SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
        return res.status(400).json({ error: 'SMTP não configurado.' });
    }
    const campanhaId = `campanha_${Date.now()}`;
    const totalLeads = leads.length;
    console.log(`[CAMPANHA] Iniciando ${campanhaId} com ${totalLeads} leads`);

    // Retornar imediatamente com o ID da campanha
    res.json({ success: true, campanhaId, total: totalLeads, message: `Campanha iniciada. ${totalLeads} emails serão enviados com intervalo de 30s.` });

    // Processar envios em background com delay de 30 segundos
    const transporter = nodemailer.createTransport(SMTP_CONFIG);
    let enviados = 0;
    let erros = 0;

    async function enviarProximo(index) {
        if (index >= leads.length) {
            console.log(`[CAMPANHA] ${campanhaId} finalizada: ${enviados} enviados, ${erros} erros.`);
            // Registrar resumo final
            const log = lerCampanhaLog();
            log.unshift({
                id: campanhaId + '_resumo',
                tipo: 'campanha_resumo',
                campanhaId,
                total: totalLeads,
                enviados,
                erros,
                status: 'finalizada',
                data: new Date().toISOString()
            });
            salvarCampanhaLog(log);
            return;
        }
        const lead = leads[index];
        try {
            const htmlBody = gerarEmailHtml(lead.body);
            const info = await transporter.sendMail({
                from: `Eng. Edson - Versatil Global Services <${SMTP_CONFIG.auth.user}>`,
                to: lead.to,
                subject: lead.subject,
                html: htmlBody
            });
            enviados++;
            console.log(`[CAMPANHA] ${campanhaId} [${index+1}/${totalLeads}] ✅ ${lead.to}`);
            // Registrar sucesso no log
            const log = lerCampanhaLog();
            log.unshift({
                id: `${campanhaId}_${index}`,
                tipo: 'campanha',
                campanhaId,
                to: lead.to,
                subject: lead.subject,
                clientId: lead.clientId || null,
                nome: lead.nome || '',
                status: 'enviado',
                messageId: info.messageId,
                posicao: `${index+1}/${totalLeads}`,
                data: new Date().toISOString()
            });
            salvarCampanhaLog(log);
        } catch (err) {
            erros++;
            console.error(`[CAMPANHA] ${campanhaId} [${index+1}/${totalLeads}] ❌ ${lead.to}: ${err.message}`);
            const log = lerCampanhaLog();
            log.unshift({
                id: `${campanhaId}_${index}`,
                tipo: 'campanha',
                campanhaId,
                to: lead.to,
                subject: lead.subject,
                clientId: lead.clientId || null,
                nome: lead.nome || '',
                status: 'erro',
                erro: err.message,
                posicao: `${index+1}/${totalLeads}`,
                data: new Date().toISOString()
            });
            salvarCampanhaLog(log);
        }
        // Aguardar 30 segundos antes do próximo envio
        if (index < leads.length - 1) {
            setTimeout(() => enviarProximo(index + 1), 30000);
        } else {
            enviarProximo(index + 1); // Chamar para registrar resumo final
        }
    }
    // Iniciar envio do primeiro email
    enviarProximo(0);
});

// GET /api/crm/campanha-log — Retorna log de campanhas
app.get('/api/crm/campanha-log', (req, res) => {
    res.json(lerCampanhaLog());
});

// PUT /api/crm/clientes/:id — Atualizar dados de um cliente
app.put('/api/crm/clientes/:id', (req, res) => {
    try {
        const clientesPath = path.join(parentDir, 'clientes_database.json');
        let dbClientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
        const idx = dbClientes.findIndex(c => c.id_cliente === req.params.id);
        if (idx === -1) return res.status(404).json({ error: 'Cliente não encontrado.' });

        // Atualiza apenas os campos enviados
        const campos = req.body;
        Object.keys(campos).forEach(key => {
            if (key === 'roteiro_comercial' && typeof campos[key] === 'object') {
                dbClientes[idx].roteiro_comercial = { ...dbClientes[idx].roteiro_comercial, ...campos[key] };
            } else {
                dbClientes[idx][key] = campos[key];
            }
        });

        fs.writeFileSync(clientesPath, JSON.stringify(dbClientes, null, 2), 'utf8');
        console.log(`[CRM] Cliente ${req.params.id} atualizado.`);
        res.json({ success: true, client: dbClientes[idx] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/crm/clientes/:id — Remover cliente da base
app.delete('/api/crm/clientes/:id', (req, res) => {
    try {
        const clientesPath = path.join(parentDir, 'clientes_database.json');
        let dbClientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
        const antes = dbClientes.length;
        dbClientes = dbClientes.filter(c => c.id_cliente !== req.params.id);
        if (dbClientes.length === antes) return res.status(404).json({ error: 'Cliente não encontrado.' });

        fs.writeFileSync(clientesPath, JSON.stringify(dbClientes, null, 2), 'utf8');
        console.log(`[CRM] Cliente ${req.params.id} removido.`);
        res.json({ success: true, removido: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/crm/cnpj/:cnpj — Busca dados da empresa via múltiplas APIs (fallback)
app.get('/api/crm/cnpj/:cnpj', async (req, res) => {
    try {
        const cnpj = req.params.cnpj.replace(/\D/g, '');
        if (cnpj.length !== 14) return res.status(400).json({ error: 'CNPJ deve ter 14 dígitos.' });
        
        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };
        let data = null;
        
        // Tentativa 1: BrasilAPI
        try {
            const r1 = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, { headers });
            if (r1.ok) {
                const text = await r1.text();
                data = JSON.parse(text);
                if (data.message) data = null;
            }
        } catch (e) { console.log('[CNPJ] BrasilAPI falhou:', e.message); }
        
        // Tentativa 2: ReceitaWS
        if (!data) {
            try {
                const r2 = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`, { headers });
                if (r2.ok) {
                    const text = await r2.text();
                    const rw = JSON.parse(text);
                    if (rw.status !== 'ERROR') {
                        data = {
                            razao_social: rw.nome || '',
                            nome_fantasia: rw.fantasia || '',
                            cnpj: rw.cnpj ? rw.cnpj.replace(/\D/g, '') : cnpj,
                            ddd_telefone_1: rw.telefone || '',
                            email: rw.email || '',
                            municipio: rw.municipio || '',
                            uf: rw.uf || '',
                            logradouro: rw.logradouro || '',
                            numero: rw.numero || '',
                            bairro: rw.bairro || '',
                            cep: rw.cep ? rw.cep.replace(/\D/g, '') : '',
                            porte: rw.porte || '',
                            descricao_situacao_cadastral: rw.situacao || '',
                            cnae_fiscal_descricao: rw.atividade_principal && rw.atividade_principal[0] ? rw.atividade_principal[0].text : '',
                            data_inicio_atividade: rw.abertura || ''
                        };
                    }
                }
            } catch (e) { console.log('[CNPJ] ReceitaWS falhou:', e.message); }
        }
        
        // Tentativa 3: publica.cnpj.ws
        if (!data) {
            try {
                const r3 = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`, { headers });
                if (r3.ok) {
                    const text = await r3.text();
                    const pw = JSON.parse(text);
                    data = {
                        razao_social: pw.razao_social || '',
                        nome_fantasia: pw.estabelecimento?.nome_fantasia || '',
                        cnpj: cnpj,
                        ddd_telefone_1: pw.estabelecimento?.ddd1 ? `${pw.estabelecimento.ddd1}${pw.estabelecimento.telefone1}` : '',
                        email: pw.estabelecimento?.email || '',
                        municipio: pw.estabelecimento?.cidade?.nome || '',
                        uf: pw.estabelecimento?.estado?.sigla || '',
                        logradouro: pw.estabelecimento?.logradouro || '',
                        numero: pw.estabelecimento?.numero || '',
                        bairro: pw.estabelecimento?.bairro || '',
                        cep: pw.estabelecimento?.cep || '',
                        porte: pw.porte?.descricao || '',
                        descricao_situacao_cadastral: pw.estabelecimento?.situacao_cadastral || '',
                        cnae_fiscal_descricao: pw.estabelecimento?.atividade_principal?.descricao || '',
                        data_inicio_atividade: pw.estabelecimento?.data_inicio_atividade || ''
                    };
                }
            } catch (e) { console.log('[CNPJ] publica.cnpj.ws falhou:', e.message); }
        }
        
        if (!data) return res.status(404).json({ error: 'CNPJ não encontrado em nenhuma fonte de dados.' });
        
        res.json({
            success: true,
            razao_social: data.razao_social || '',
            nome_fantasia: data.nome_fantasia || '',
            cnpj: data.cnpj || cnpj,
            telefone: data.ddd_telefone_1 || '',
            email: data.email || '',
            municipio: data.municipio || '',
            uf: data.uf || '',
            logradouro: data.logradouro || '',
            numero: data.numero || '',
            bairro: data.bairro || '',
            cep: data.cep || '',
            porte: data.porte || '',
            situacao: data.descricao_situacao_cadastral || '',
            cnae_principal: data.cnae_fiscal_descricao || '',
            data_abertura: data.data_inicio_atividade || ''
        });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao consultar CNPJ: ' + err.message });
    }
});

// =============================================
// FALLBACK: Servir index.html
// =============================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// =============================================
// START
// =============================================
app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════╗');
    console.log('  ║   VERSATIL SERVICES — Server              ║');
    console.log(`  ║   http://localhost:${PORT}                  ║`);
    console.log('  ║   Asaas API: ✅ Produção                  ║');
    console.log('  ║   PIX:       ✅ /api/pix/create            ║');
    console.log('  ║   Status:    ✅ /api/pix/status/:id        ║');
    console.log('  ║   Email:     ' + (SMTP_CONFIG.auth.user ? '✅' : '⏳') + ' nodemailer                  ║');
    console.log('  ╚══════════════════════════════════════════╝');
    console.log('');
});
