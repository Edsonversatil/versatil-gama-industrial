/* =============================================
   VERSATIL GAMA INDUSTRIAL — Vercel Serverless Function
   POST /api/asaas/payments — Criar pagamento com cartão
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
        const { customerId, value, description, creditCard, creditCardHolderInfo } = req.body;

        if (!customerId || !value || !creditCard || !creditCardHolderInfo) {
            return res.status(400).json({ success: false, error: 'Dados incompletos para pagamento.' });
        }

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

        const response = await fetch(`${ASAAS_BASE_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY
            },
            body: JSON.stringify(paymentBody)
        });

        const data = await response.json();

        if (response.status >= 200 && response.status < 300) {
            const status = data.status;
            const confirmed = status === 'CONFIRMED' || status === 'RECEIVED';

            return res.status(200).json({
                success: true,
                approved: confirmed,
                status: status,
                paymentId: data.id,
                value: data.value,
                message: confirmed
                    ? 'Pagamento aprovado com sucesso!'
                    : status === 'PENDING'
                        ? 'Pagamento em processamento.'
                        : 'Pagamento não aprovado.'
            });
        } else {
            const errorMsg = data.errors
                ? data.errors.map(e => e.description).join('; ')
                : 'Erro ao processar pagamento.';
            return res.status(response.status).json({ success: false, error: errorMsg });
        }
    } catch (err) {
        console.error('Erro ao processar pagamento:', err);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
};
