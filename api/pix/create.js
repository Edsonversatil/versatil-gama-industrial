/* =============================================
   VERSATIL SERVICES — Vercel Serverless Function
   POST /api/pix/create — Criar cobrança PIX via Asaas
   ============================================= */

const ASAAS_API_KEY = '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFkZDg3YzMyLThkOGMtNDc0Yy1hYzE2LWYzZWEwYmJlZDNmYTo6JGFhY2hfYzY5ZDBmMjQtZTFmYy00NTA2LWFjNWMtMzFiNGQ4ZDFhNTUw';
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

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

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

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
            return res.status(200).json({
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
            return res.status(200).json({
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
        return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
};
