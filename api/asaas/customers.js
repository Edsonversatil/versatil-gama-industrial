/* =============================================
   VERSATIL GAMA INDUSTRIAL — Vercel Serverless Function
   POST /api/asaas/customers — Criar cliente no Asaas
   ============================================= */

const ASAAS_API_KEY = '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFkZDg3YzMyLThkOGMtNDc0Yy1hYzE2LWYzZWEwYmJlZDNmYTo6JGFhY2hfYzY5ZDBmMjQtZTFmYy00NTA2LWFjNWMtMzFiNGQ4ZDFhNTUw';
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { name, cpfCnpj, email, mobilePhone } = req.body;

        if (!name || !cpfCnpj) {
            return res.status(400).json({ success: false, error: 'Nome e CPF/CNPJ são obrigatórios.' });
        }

        const response = await fetch(`${ASAAS_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY
            },
            body: JSON.stringify({
                name,
                cpfCnpj: cpfCnpj.replace(/\D/g, ''),
                email: email || undefined,
                mobilePhone: mobilePhone ? mobilePhone.replace(/\D/g, '') : undefined
            })
        });

        const data = await response.json();

        if (response.status >= 200 && response.status < 300) {
            return res.status(200).json({ success: true, customer: data });
        } else {
            return res.status(response.status).json({
                success: false,
                error: data.errors ? data.errors[0].description : 'Erro ao criar cliente.'
            });
        }
    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
};
