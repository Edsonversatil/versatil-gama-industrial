/* =============================================
   VERSATIL GAMA INDUSTRIAL — Vercel Serverless Function
   GET /api/pix/status?paymentId=xxx — Consultar status PIX
   ============================================= */

const ASAAS_API_KEY = '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFkZDg3YzMyLThkOGMtNDc0Yy1hYzE2LWYzZWEwYmJlZDNmYTo6JGFhY2hfYzY5ZDBmMjQtZTFmYy00NTA2LWFjNWMtMzFiNGQ4ZDFhNTUw';
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

async function asaasRequest(endpoint, method) {
    const url = `${ASAAS_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'access_token': ASAAS_API_KEY
        }
    });
    const data = await response.json();
    return { status: response.status, data };
}

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { paymentId } = req.query;

        if (!paymentId) {
            return res.status(400).json({ success: false, error: 'paymentId é obrigatório.' });
        }

        const result = await asaasRequest(`/payments/${paymentId}`, 'GET');

        if (result.status >= 200 && result.status < 300) {
            const status = result.data.status;
            const confirmed = status === 'RECEIVED' || status === 'CONFIRMED';

            console.log(`[PIX STATUS] ${paymentId}: ${status}`);

            return res.status(200).json({
                success: true,
                paymentId: paymentId,
                status: confirmed ? 'CONFIRMED' : 'PENDING',
                rawStatus: status,
                confirmedDate: result.data.confirmedDate || null
            });
        } else {
            return res.status(result.status).json({ success: false, error: 'Pagamento não encontrado.' });
        }
    } catch (err) {
        console.error('[PIX STATUS] Erro:', err);
        return res.status(500).json({ success: false, error: 'Erro interno.' });
    }
};
