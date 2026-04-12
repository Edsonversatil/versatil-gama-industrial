/* =============================================
   VERSATIL GAMA INDUSTRIAL — Backend Server
   Proxy seguro para API Asaas (Cartão de Crédito)
   API Key NUNCA exposta no frontend
   ============================================= */

const express = require('express');
const path = require('path');
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
            description: description || 'Compra VERSATIL GAMA INDUSTRIAL',
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

// SMTP Configuration — Preencher com dados reais
const SMTP_CONFIG = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '',  // SEU EMAIL: ex: versatil@gmail.com
        pass: ''   // SENHA DE APP (não a senha normal)
    }
};

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
                <p style="color:#aaa;margin-top:8px;">VERSATIL GAMA INDUSTRIAL</p>
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
                <p style="color:#666;font-size:12px;margin:0;">VERSATIL GAMA INDUSTRIAL — Sorocaba/SP</p>
                <p style="color:#666;font-size:12px;margin:4px 0 0;">WhatsApp: (13) 99150-9140</p>
            </div>
        </div>`;

        const info = await transporter.sendMail({
            from: `"Versatil Gama Industrial" <${SMTP_CONFIG.auth.user}>`,
            to: clienteEmail,
            subject: 'Pagamento confirmado - Versatil Gama Industrial',
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
            description: description || 'Pedido Versatil Gama Industrial'
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
        const { paymentId } = req.params;
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
// ROTA: Webhook Asaas (preparado para uso futuro)
// =============================================
app.post('/api/asaas/webhook', (req, res) => {
    const event = req.body;
    console.log('[WEBHOOK ASAAS]', JSON.stringify(event));
    res.status(200).json({ received: true });
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
    console.log('  ║   VERSATIL GAMA INDUSTRIAL — Server      ║');
    console.log(`  ║   http://localhost:${PORT}                  ║`);
    console.log('  ║   Asaas API: ✅ Produção                  ║');
    console.log('  ║   PIX:       ✅ /api/pix/create            ║');
    console.log('  ║   Status:    ✅ /api/pix/status/:id        ║');
    console.log('  ║   Email:     ' + (SMTP_CONFIG.auth.user ? '✅' : '⏳') + ' nodemailer                  ║');
    console.log('  ╚══════════════════════════════════════════╝');
    console.log('');
});
