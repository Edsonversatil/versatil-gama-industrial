/* =============================================
   VERSATIL GAMA INDUSTRIAL — Sistema de Checkout v2.0
   Cadastro completo do comprador + Entrega + Nota Fiscal
   ============================================= */

(function () {
    'use strict';

    const WHATSAPP_NUMBER = '5513991509140';

    // =============================================
    // 1. GERADOR DE NÚMERO DE PEDIDO
    // =============================================
    function generateOrderNumber() {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        return `VGI-${date}-${seq}`;
    }

    // =============================================
    // 2. MÁSCARAS DE INPUT
    // =============================================
    function maskCPF(v) {
        v = v.replace(/\D/g, '').substring(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return v;
    }

    function maskCNPJ(v) {
        v = v.replace(/\D/g, '').substring(0, 14);
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
        return v;
    }

    function maskPhone(v) {
        v = v.replace(/\D/g, '').substring(0, 11);
        if (v.length > 10) {
            v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (v.length > 6) {
            v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        return v;
    }

    function maskCEP(v) {
        v = v.replace(/\D/g, '').substring(0, 8);
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
        return v;
    }

    function applyMask(input, maskFn) {
        input.addEventListener('input', function () {
            const pos = this.selectionStart;
            const prev = this.value.length;
            this.value = maskFn(this.value);
            const diff = this.value.length - prev;
            this.setSelectionRange(pos + diff, pos + diff);
        });
    }

    // =============================================
    // 3. BUSCA CEP (ViaCEP)
    // =============================================
    async function fetchCEP(cep, prefix) {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return;

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await res.json();

            if (data.erro) {
                showCheckoutToast('CEP não encontrado.');
                return;
            }

            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el && val) el.value = val;
            };

            setVal(`${prefix}-rua`, data.logradouro);
            setVal(`${prefix}-bairro`, data.bairro);
            setVal(`${prefix}-cidade`, data.localidade);
            setVal(`${prefix}-estado`, data.uf);

        } catch (e) {
            showCheckoutToast('Erro ao buscar CEP.');
        }
    }

    function showCheckoutToast(msg) {
        // Reuse the global toast if available
        if (typeof window.__showToast === 'function') {
            window.__showToast(msg);
        } else {
            alert(msg);
        }
    }

    // =============================================
    // 4. CRIAR MODAL DE CHECKOUT
    // =============================================
    function createCheckoutModal() {
        const modal = document.createElement('div');
        modal.id = 'checkout-modal-overlay';
        modal.innerHTML = `
        <div class="ck-modal">
            <div class="ck-header">
                <h3>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    Finalizar Pedido
                </h3>
                <button class="ck-close" id="ck-close">✕</button>
            </div>

            <!-- STEP INDICATOR -->
            <div class="ck-steps">
                <div class="ck-step active" data-step="1"><span>1</span> Comprador</div>
                <div class="ck-step" data-step="2"><span>2</span> Entrega</div>
                <div class="ck-step" data-step="3"><span>3</span> Pagamento</div>
                <div class="ck-step" data-step="4"><span>4</span> Resumo</div>
            </div>

            <div class="ck-body">

                <!-- ==================== STEP 1: COMPRADOR ==================== -->
                <div class="ck-page active" id="ck-step-1">
                    <div class="ck-type-selector">
                        <button class="ck-type-btn active" id="ck-type-pf" data-type="pf">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            Pessoa Física
                        </button>
                        <button class="ck-type-btn" id="ck-type-pj" data-type="pj">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            Pessoa Jurídica
                        </button>
                    </div>

                    <!-- PF -->
                    <div class="ck-form-block" id="ck-form-pf">
                        <div class="ck-section-title">Dados Pessoais</div>
                        <div class="ck-row full"><div class="ck-field">
                            <label>Nome completo *</label>
                            <input type="text" id="ck-pf-nome" placeholder="Seu nome completo" required>
                        </div></div>
                        <div class="ck-row">
                            <div class="ck-field"><label>CPF *</label>
                                <input type="text" id="ck-pf-cpf" placeholder="000.000.000-00" class="mask-cpf" required>
                            </div>
                            <div class="ck-field"><label>E-mail *</label>
                                <input type="email" id="ck-pf-email" placeholder="seu@email.com" required>
                            </div>
                        </div>
                        <div class="ck-row full"><div class="ck-field"><label>Telefone / WhatsApp *</label>
                            <input type="text" id="ck-pf-phone" placeholder="(00) 00000-0000" class="mask-phone" required>
                        </div></div>

                        <div class="ck-section-title">Endereço (Cadastro / Fiscal)</div>
                        <div class="ck-row">
                            <div class="ck-field"><label>CEP *</label>
                                <input type="text" id="ck-pf-cep" placeholder="00000-000" class="mask-cep cep-auto" data-prefix="ck-pf" required>
                            </div>
                            <div class="ck-field"><label>Rua *</label>
                                <input type="text" id="ck-pf-rua" placeholder="Rua / Avenida" required>
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Número *</label>
                                <input type="text" id="ck-pf-numero" placeholder="Nº" required>
                            </div>
                            <div class="ck-field"><label>Complemento</label>
                                <input type="text" id="ck-pf-complemento" placeholder="Apto, sala...">
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Bairro *</label>
                                <input type="text" id="ck-pf-bairro" placeholder="Bairro" required>
                            </div>
                            <div class="ck-field"><label>Cidade *</label>
                                <input type="text" id="ck-pf-cidade" placeholder="Cidade" required>
                            </div>
                        </div>
                        <div class="ck-row full"><div class="ck-field"><label>Estado *</label>
                            <input type="text" id="ck-pf-estado" placeholder="UF" maxlength="2" required>
                        </div></div>
                    </div>

                    <!-- PJ -->
                    <div class="ck-form-block" id="ck-form-pj" style="display:none;">
                        <div class="ck-section-title">Dados da Empresa</div>
                        <div class="ck-row full"><div class="ck-field"><label>Razão Social *</label>
                            <input type="text" id="ck-pj-razao" placeholder="Razão social" required>
                        </div></div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Nome Fantasia</label>
                                <input type="text" id="ck-pj-fantasia" placeholder="Nome fantasia (opcional)">
                            </div>
                            <div class="ck-field"><label>CNPJ *</label>
                                <input type="text" id="ck-pj-cnpj" placeholder="00.000.000/0000-00" class="mask-cnpj" required>
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Inscrição Estadual</label>
                                <input type="text" id="ck-pj-ie" placeholder="IE (opcional)">
                            </div>
                            <div class="ck-field"><label>Responsável *</label>
                                <input type="text" id="ck-pj-responsavel" placeholder="Nome do responsável" required>
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>E-mail *</label>
                                <input type="email" id="ck-pj-email" placeholder="empresa@email.com" required>
                            </div>
                            <div class="ck-field"><label>Telefone / WhatsApp *</label>
                                <input type="text" id="ck-pj-phone" placeholder="(00) 00000-0000" class="mask-phone" required>
                            </div>
                        </div>

                        <div class="ck-section-title">Endereço (Cadastro / Fiscal)</div>
                        <div class="ck-row">
                            <div class="ck-field"><label>CEP *</label>
                                <input type="text" id="ck-pj-cep" placeholder="00000-000" class="mask-cep cep-auto" data-prefix="ck-pj" required>
                            </div>
                            <div class="ck-field"><label>Rua *</label>
                                <input type="text" id="ck-pj-rua" placeholder="Rua / Avenida" required>
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Número *</label>
                                <input type="text" id="ck-pj-numero" placeholder="Nº" required>
                            </div>
                            <div class="ck-field"><label>Complemento</label>
                                <input type="text" id="ck-pj-complemento" placeholder="Apto, sala...">
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Bairro *</label>
                                <input type="text" id="ck-pj-bairro" placeholder="Bairro" required>
                            </div>
                            <div class="ck-field"><label>Cidade *</label>
                                <input type="text" id="ck-pj-cidade" placeholder="Cidade" required>
                            </div>
                        </div>
                        <div class="ck-row full"><div class="ck-field"><label>Estado *</label>
                            <input type="text" id="ck-pj-estado" placeholder="UF" maxlength="2" required>
                        </div></div>
                    </div>
                </div>

                <!-- ==================== STEP 2: ENTREGA ==================== -->
                <div class="ck-page" id="ck-step-2">
                    <div class="ck-section-title">Endereço de Entrega</div>
                    <div class="ck-delivery-toggle">
                        <label class="ck-radio-label">
                            <input type="radio" name="ck-delivery" value="same" checked id="ck-delivery-same">
                            <span class="ck-radio-custom"></span>
                            Mesmo endereço do cadastro
                        </label>
                        <label class="ck-radio-label">
                            <input type="radio" name="ck-delivery" value="diff" id="ck-delivery-diff">
                            <span class="ck-radio-custom"></span>
                            Informar outro endereço de entrega
                        </label>
                    </div>

                    <div class="ck-form-block" id="ck-delivery-fields" style="display:none;">
                        <div class="ck-row">
                            <div class="ck-field"><label>CEP *</label>
                                <input type="text" id="ck-ent-cep" placeholder="00000-000" class="mask-cep cep-auto" data-prefix="ck-ent">
                            </div>
                            <div class="ck-field"><label>Rua *</label>
                                <input type="text" id="ck-ent-rua" placeholder="Rua / Avenida">
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Número *</label>
                                <input type="text" id="ck-ent-numero" placeholder="Nº">
                            </div>
                            <div class="ck-field"><label>Complemento</label>
                                <input type="text" id="ck-ent-complemento" placeholder="Apto, sala...">
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Bairro *</label>
                                <input type="text" id="ck-ent-bairro" placeholder="Bairro">
                            </div>
                            <div class="ck-field"><label>Cidade *</label>
                                <input type="text" id="ck-ent-cidade" placeholder="Cidade">
                            </div>
                        </div>
                        <div class="ck-row">
                            <div class="ck-field"><label>Estado *</label>
                                <input type="text" id="ck-ent-estado" placeholder="UF" maxlength="2">
                            </div>
                            <div class="ck-field"><label>Referência</label>
                                <input type="text" id="ck-ent-referencia" placeholder="Ponto de referência">
                            </div>
                        </div>
                    </div>

                    <!-- MODALIDADE DE ENVIO -->
                    <div class="ck-section-title" style="margin-top:24px;" data-i18n="shipping_mode_title">Modalidade de Envio</div>
                    <div class="ck-form-block">
                        <div class="ck-field">
                            <select id="ck-shipping-mode" style="width:100%;padding:12px 14px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#fff;font-size:15px;cursor:pointer;">
                                <option value="retirada" data-i18n="shipping_pickup">📦 Retirada no local</option>
                                <option value="nacional" selected data-i18n="shipping_national">🚚 Envio nacional</option>
                                <option value="internacional" data-i18n="shipping_international">✈️ Envio internacional direto</option>
                                <option value="logistica" data-i18n="shipping_logistics">🏢 Envio para centro logístico (exportação)</option>
                                <option value="cliente" data-i18n="shipping_customer">🔄 Retirada / despacho pelo cliente</option>
                            </select>
                        </div>
                    </div>

                    <!-- PESO ESTIMADO -->
                    <div id="ck-weight-info" style="margin-top:16px;padding:14px 18px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:10px;">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="font-size:18px;">⚖️</span>
                            <strong style="color:#22c55e;" data-i18n="estimated_weight">Peso estimado do pedido:</strong>
                            <strong id="ck-total-weight" style="color:#FFD700;font-size:18px;">0 kg</strong>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                            <span style="font-size:14px;">📦</span>
                            <span style="color:#888;font-size:13px;" data-i18n="freight_category_label">Categoria de frete:</span>
                            <strong id="ck-freight-category" style="color:#fff;font-size:13px;">—</strong>
                        </div>
                        <p style="color:#888;font-size:12px;margin:8px 0 0;" data-i18n="freight_note">💡 O frete será calculado e informado após análise do pedido.</p>
                    </div>
                </div>

                <!-- ==================== STEP 3: PAGAMENTO ==================== -->
                <div class="ck-page" id="ck-step-3">
                    <div class="ck-section-title">Forma de Pagamento</div>
                    <div class="ck-payment-options">
                        <label class="ck-pay-option">
                            <input type="radio" name="ck-payment" value="pix" checked>
                            <div class="ck-pay-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                <strong>PIX</strong>
                                <span>Pagamento instantâneo</span>
                            </div>
                        </label>
                        <label class="ck-pay-option">
                            <input type="radio" name="ck-payment" value="boleto">
                            <div class="ck-pay-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                <strong>Transferência Bancária</strong>
                                <span>Dados Sicredi</span>
                            </div>
                        </label>
                        <label class="ck-pay-option">
                            <input type="radio" name="ck-payment" value="usdt">
                            <div class="ck-pay-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15.5 9.5c0-1.38-1.57-2.5-3.5-2.5S8.5 8.12 8.5 9.5c0 1.38 1.57 2.5 3.5 2.5s3.5 1.12 3.5 2.5c0 1.38-1.57 2.5-3.5 2.5s-3.5-1.12-3.5-2.5"/></svg>
                                <strong>USDT (TRC20)</strong>
                                <span>Cripto internacional</span>
                            </div>
                        </label>
                        <label class="ck-pay-option">
                            <input type="radio" name="ck-payment" value="cartao">
                            <div class="ck-pay-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                                <strong>Cartão de Crédito</strong>
                                <span class="ck-pay-surcharge">+5% taxa operacional</span>
                            </div>
                        </label>
                    </div>

                    <!-- PAYMENT EXECUTION PANEL -->
                    <div id="ck-pay-exec" style="display:none; margin-top:20px;">
                        <div class="ck-section-title" id="ck-pay-exec-title"></div>
                        <div id="ck-pay-exec-body" style="background:rgba(37,211,102,0.08); border:1px solid rgba(37,211,102,0.25); border-radius:12px; padding:20px; margin-top:10px;"></div>
                        <button id="ck-pay-exec-confirm" style="margin-top:16px; width:100%; padding:14px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:700; font-size:15px; cursor:pointer;">Confirmar e Avançar →</button>
                    </div>
                </div>

                <!-- ==================== STEP 4: RESUMO ==================== -->
                <div class="ck-page" id="ck-step-4">
                    <div class="ck-order-number" id="ck-order-number"></div>

                    <div class="ck-summary-section">
                        <div class="ck-summary-title">Produtos</div>
                        <div id="ck-summary-products"></div>
                        <div class="ck-summary-total" id="ck-summary-total"></div>
                    </div>

                    <div class="ck-summary-section">
                        <div class="ck-summary-title">Dados do Comprador</div>
                        <div id="ck-summary-buyer"></div>
                    </div>

                    <div class="ck-summary-section">
                        <div class="ck-summary-title">Endereço de Entrega</div>
                        <div id="ck-summary-delivery"></div>
                    </div>

                    <div class="ck-summary-section">
                        <div class="ck-summary-title">Forma de Pagamento</div>
                        <div id="ck-summary-payment"></div>
                    </div>

                    <div class="ck-summary-section">
                        <div class="ck-summary-title">Dados para Nota Fiscal</div>
                        <div id="ck-summary-fiscal"></div>
                    </div>
                </div>

            </div>

            <!-- FOOTER NAV -->
            <div class="ck-footer">
                <button class="ck-btn-back" id="ck-btn-back" style="display:none;">
                    ← Voltar
                </button>
                <button class="ck-btn-next" id="ck-btn-next">
                    Próximo →
                </button>
                <button class="ck-btn-send" id="ck-btn-send" style="display:none;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Enviar Pedido via WhatsApp
                </button>
            </div>
        </div>
        `;
        document.body.appendChild(modal);
    }

    // =============================================
    // 5. NAVEGAÇÃO ENTRE STEPS
    // =============================================
    let currentStep = 1;
    const TOTAL_STEPS = 4;

    function goToStep(step) {
        currentStep = step;

        // Reset payment execution panel when leaving step 3
        const execPanel = document.getElementById('ck-pay-exec');
        if (execPanel) execPanel.style.display = 'none';

        // Update step indicators
        document.querySelectorAll('.ck-step').forEach(el => {
            const s = parseInt(el.dataset.step);
            el.classList.toggle('active', s === step);
            el.classList.toggle('done', s < step);
        });

        // Show/hide pages
        document.querySelectorAll('.ck-page').forEach(p => p.classList.remove('active'));
        document.getElementById(`ck-step-${step}`).classList.add('active');

        // Nav buttons
        document.getElementById('ck-btn-back').style.display = step > 1 ? '' : 'none';
        document.getElementById('ck-btn-next').style.display = step < TOTAL_STEPS ? '' : 'none';
        document.getElementById('ck-btn-send').style.display = step === TOTAL_STEPS ? '' : 'none';

        // Update weight info on step 2
        if (step === 2) updateWeightInfo();

        // Build summary on step 4
        if (step === TOTAL_STEPS) buildSummary();
    }

    // =============================================
    // 5A. LÓGICA DE PESO E FRETE
    // =============================================
    function updateWeightInfo() {
        const totalWeight = window.__getCartWeight ? window.__getCartWeight() : 0;
        const weightEl = document.getElementById('ck-total-weight');
        const categoryEl = document.getElementById('ck-freight-category');
        if (weightEl) weightEl.textContent = totalWeight.toFixed(1) + ' kg';
        if (categoryEl) categoryEl.textContent = getFreightCategory(totalWeight);
    }

    function getFreightCategory(weightKg) {
        const mode = document.getElementById('ck-shipping-mode');
        const isInternational = mode && (mode.value === 'internacional' || mode.value === 'logistica');

        if (isInternational) {
            if (weightKg <= 2) return '🟢 Leve (até 2 kg)';
            if (weightKg <= 10) return '🟡 Médio (2-10 kg)';
            return '🔴 Pesado (acima de 10 kg)';
        } else {
            if (weightKg <= 5) return '🟢 Leve (até 5 kg)';
            if (weightKg <= 20) return '🟡 Médio (5-20 kg)';
            return '🔴 Pesado (acima de 20 kg)';
        }
    }

    function getShippingData() {
        const modeEl = document.getElementById('ck-shipping-mode');
        const mode = modeEl ? modeEl.value : 'nacional';
        const labels = {
            'retirada': 'Retirada no local',
            'nacional': 'Envio nacional',
            'internacional': 'Envio internacional direto',
            'logistica': 'Envio para centro logístico (exportação)',
            'cliente': 'Retirada / despacho pelo cliente'
        };
        const totalWeight = window.__getCartWeight ? window.__getCartWeight() : 0;
        return {
            mode: mode,
            label: labels[mode] || mode,
            weight: totalWeight,
            category: getFreightCategory(totalWeight)
        };
    }

    // =============================================
    // 6. VALIDAÇÃO POR STEP
    // =============================================
    function validateStep(step) {
        if (step === 1) {
            const type = document.getElementById('ck-form-pf').style.display !== 'none' ? 'pf' : 'pj';
            const prefix = type === 'pf' ? 'ck-pf' : 'ck-pj';
            const requiredIds = type === 'pf'
                ? ['nome', 'cpf', 'email', 'phone', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']
                : ['razao', 'cnpj', 'responsavel', 'email', 'phone', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];

            for (const id of requiredIds) {
                const el = document.getElementById(`${prefix}-${id}`);
                if (el && !el.value.trim()) {
                    el.classList.add('ck-error');
                    el.focus();
                    showCheckoutToast('Preencha todos os campos obrigatórios.');
                    return false;
                }
                if (el) el.classList.remove('ck-error');
            }
            return true;
        }

        if (step === 2) {
            const isDiff = document.getElementById('ck-delivery-diff').checked;
            if (isDiff) {
                const reqIds = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];
                for (const id of reqIds) {
                    const el = document.getElementById(`ck-ent-${id}`);
                    if (el && !el.value.trim()) {
                        el.classList.add('ck-error');
                        el.focus();
                        showCheckoutToast('Preencha o endereço de entrega.');
                        return false;
                    }
                    if (el) el.classList.remove('ck-error');
                }
            }
            return true;
        }

        return true;
    }

    // =============================================
    // 6A. COTAÇÃO USDT/BRL EM TEMPO REAL (Binance)
    // =============================================
    const USDT_FALLBACK_RATE = 5.70;
    let usdtCache = { rate: USDT_FALLBACK_RATE, timestamp: 0 };

    async function getUsdtRate() {
        const now = Date.now();
        // Cache de 30 segundos
        if (now - usdtCache.timestamp < 30000 && usdtCache.rate > 0) {
            return usdtCache.rate;
        }
        try {
            // PRIORIDADE 1: Binance
            const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL');
            const data = await res.json();
            if (data && data.price) {
                const rate = parseFloat(data.price);
                if (rate > 0) {
                    usdtCache = { rate, timestamp: now };
                    console.log(`[USDT] Cotação Binance: R$ ${rate.toFixed(4)}`);
                    return rate;
                }
            }
        } catch (e) {
            console.warn('[USDT] Binance falhou, tentando CoinGecko...');
        }
        try {
            // ALTERNATIVA: CoinGecko
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=brl');
            const data = await res.json();
            if (data && data.tether && data.tether.brl) {
                const rate = parseFloat(data.tether.brl);
                if (rate > 0) {
                    usdtCache = { rate, timestamp: now };
                    console.log(`[USDT] Cotação CoinGecko: R$ ${rate.toFixed(4)}`);
                    return rate;
                }
            }
        } catch (e) {
            console.warn('[USDT] CoinGecko falhou, usando fallback.');
        }
        // Fallback: última válida ou 5.70
        return usdtCache.rate || USDT_FALLBACK_RATE;
    }

    // =============================================
    // 6B. EXECUÇÃO DO PAGAMENTO (Step 3)
    // =============================================
    let paymentExecuted = false;
    let paymentStatus = 'IDLE'; // IDLE | PENDING | CONFIRMED
    let currentPaymentId = null;

    async function executePaymentStep() {
        const method = document.querySelector('input[name="ck-payment"]:checked').value;
        const cart = window.__getCart();
        const formatBRL = window.__formatBRL;
        let total = cart.reduce((s, i) => s + i.price * i.qty, 0);

        const execPanel = document.getElementById('ck-pay-exec');
        const execTitle = document.getElementById('ck-pay-exec-title');
        const execBody = document.getElementById('ck-pay-exec-body');
        const confirmBtn = document.getElementById('ck-pay-exec-confirm');

        let html = '';

        // ── PIX REAL (ASAAS) ──
        if (method === 'pix') {
            execTitle.textContent = 'Pagamento via PIX';
            execBody.innerHTML = `
                <div style="text-align:center;padding:30px 0;">
                    <div class="cc-spinner" style="margin:0 auto 16px;"></div>
                    <p style="color:#aaa;">Gerando cobrança PIX...</p>
                </div>`;
            execPanel.style.display = 'block';
            confirmBtn.style.display = 'none';

            try {
                const buyer = getBuyerData();
                const orderDesc = 'Pedido VERSATIL GAMA INDUSTRIAL';

                const res = await fetch('/api/pix/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: buyer.type === 'PF' ? buyer.nome : buyer.razao,
                        cpfCnpj: buyer.cpfCnpj,
                        email: buyer.email,
                        phone: buyer.phone,
                        value: total,
                        description: orderDesc
                    })
                });

                const data = await res.json();

                if (!data.success) {
                    execBody.innerHTML = `
                        <div style="text-align:center;">
                            <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
                            <div style="color:#ff6b6b;font-weight:700;margin-bottom:8px;">Erro ao gerar PIX</div>
                            <p style="color:#aaa;font-size:13px;">${data.error || 'Tente novamente.'}</p>
                            <button onclick="document.getElementById('ck-pay-exec').style.display='none'" style="margin-top:16px;padding:10px 24px;background:#333;color:#fff;border:none;border-radius:8px;cursor:pointer;">Tentar novamente</button>
                        </div>`;
                    return;
                }

                currentPaymentId = data.paymentId;
                paymentStatus = 'PENDING';

                html = `
                    <div style="text-align:center;">
                        <div style="font-size:28px;font-weight:800;color:#25D366;margin-bottom:4px;">${formatBRL(data.value)}</div>
                        <div style="font-size:13px;color:#999;margin-bottom:16px;">${cart.length} item(ns) · Cobrança gerada com sucesso</div>
                        ${data.pixQrCode ? `
                            <div style="background:#fff;border-radius:12px;padding:16px;display:inline-block;margin-bottom:16px;">
                                <img src="data:image/png;base64,${data.pixQrCode}" alt="QR Code PIX" style="width:220px;height:220px;">
                            </div>
                        ` : ''}
                        ${data.pixCopyPaste ? `
                            <div style="background:#111;border-radius:10px;padding:16px;margin-bottom:14px;">
                                <div style="font-weight:700;color:#25D366;margin-bottom:8px;">PIX Copia e Cola:</div>
                                <div id="pix-payload" style="font-family:monospace;font-size:11px;color:#fff;word-break:break-all;max-height:60px;overflow-y:auto;">${data.pixCopyPaste}</div>
                                <button onclick="navigator.clipboard.writeText(document.getElementById('pix-payload').textContent).then(()=>{this.textContent='✓ Copiado!';setTimeout(()=>{this.textContent='Copiar código'},2000)})" style="margin-top:10px;padding:8px 20px;background:#25D366;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px;">Copiar código</button>
                            </div>
                        ` : ''}
                        <div id="pix-status-indicator" style="background:rgba(255,193,7,0.1);border:1px solid rgba(255,193,7,0.3);border-radius:10px;padding:14px;margin-bottom:14px;">
                            <div style="color:#ffc107;font-weight:700;font-size:14px;">⏳ Aguardando pagamento</div>
                            <div style="color:#aaa;font-size:12px;margin-top:4px;">Escaneie o QR Code ou cole o código no app do seu banco</div>
                        </div>
                        <div style="background:#111;border-radius:10px;padding:12px;margin-bottom:10px;">
                            <div style="color:#aaa;font-size:12px;">Chave PIX (CNPJ): <strong style="color:#ccc;">50.134.362/0001-43</strong></div>
                            <div style="color:#666;font-size:11px;margin-top:4px;">Edson de Oliveira Silva / Recebimento processado via Asaas</div>
                        </div>
                        <p style="color:#666;font-size:11px;">ID: ${data.paymentId}</p>
                    </div>`;

                execBody.innerHTML = html;

                // Show "Já paguei" button
                confirmBtn.textContent = '✓ Já paguei — Avançar para resumo';
                confirmBtn.style.display = 'block';
                confirmBtn.style.background = '#25D366';
                confirmBtn.onclick = function () {
                    paymentStatus = 'CONFIRMED';
                    paymentExecuted = true;
                    // Update status indicator
                    const indicator = document.getElementById('pix-status-indicator');
                    if (indicator) {
                        indicator.style.background = 'rgba(37,211,102,0.1)';
                        indicator.style.borderColor = 'rgba(37,211,102,0.3)';
                        indicator.innerHTML = `
                            <div style="color:#25D366;font-weight:700;font-size:14px;">✓ Pagamento confirmado</div>
                            <div style="color:#aaa;font-size:12px;margin-top:4px;">Avançando para o resumo do pedido...</div>`;
                    }
                    setTimeout(() => goToStep(4), 800);
                };

                // Auto-check payment status every 5s via polling
                if (currentPaymentId) {
                    const pollInterval = setInterval(async () => {
                        if (paymentStatus === 'CONFIRMED' || !document.getElementById('ck-pay-exec') || document.getElementById('ck-pay-exec').style.display === 'none') {
                            clearInterval(pollInterval);
                            return;
                        }
                        try {
                            const statusRes = await fetch(`/api/pix/status/${currentPaymentId}`);
                            const statusData = await statusRes.json();
                            if (statusData.success && statusData.status === 'CONFIRMED') {
                                clearInterval(pollInterval);
                                paymentStatus = 'CONFIRMED';
                                paymentExecuted = true;
                                const indicator = document.getElementById('pix-status-indicator');
                                if (indicator) {
                                    indicator.style.background = 'rgba(37,211,102,0.1)';
                                    indicator.style.borderColor = 'rgba(37,211,102,0.3)';
                                    indicator.innerHTML = `
                                        <div style="color:#25D366;font-weight:700;font-size:14px;">✓ Pagamento confirmado!</div>
                                        <div style="color:#aaa;font-size:12px;margin-top:4px;">Avançando para o resumo...</div>`;
                                }
                                confirmBtn.textContent = '✓ Pagamento confirmado — Avançar';

                                // Disparar email de confirmação
                                try {
                                    const buyer = getBuyerData();
                                    await fetch('/api/email/confirmation', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            email: buyer.email,
                                            nome: buyer.type === 'PF' ? buyer.nome : buyer.razao,
                                            produtos: cart,
                                            valorPago: total,
                                            paymentId: currentPaymentId
                                        })
                                    });
                                } catch (emailErr) { /* email is best-effort */ }

                                // Auto-avançar para resumo
                                setTimeout(() => goToStep(4), 1500);
                            }
                        } catch (e) { /* silent */ }
                    }, 5000);
                }

            } catch (err) {
                execBody.innerHTML = `
                    <div style="text-align:center;">
                        <div style="font-size:40px;margin-bottom:12px;">❌</div>
                        <div style="color:#ff6b6b;font-weight:700;margin-bottom:8px;">Erro de conexão</div>
                        <p style="color:#aaa;font-size:13px;">Verifique sua internet e tente novamente.</p>
                        <button onclick="document.getElementById('ck-pay-exec').style.display='none'" style="margin-top:16px;padding:10px 24px;background:#333;color:#fff;border:none;border-radius:8px;cursor:pointer;">Tentar novamente</button>
                    </div>`;
            }
            return;
        }

        // ── TRANSFERÊNCIA BANCÁRIA ──
        if (method === 'boleto') {
            execTitle.textContent = 'Transferência Bancária';
            html = `
                <div style="text-align:center;">
                    <div style="font-size:28px;font-weight:800;color:#25D366;margin-bottom:12px;">${formatBRL(total)}</div>
                    <div style="font-size:13px;color:#999;margin-bottom:16px;">${cart.length} item(ns) no pedido</div>
                    <div style="background:#111;border-radius:10px;padding:16px;margin-bottom:14px;text-align:left;">
                        <div style="font-weight:700;color:#25D366;margin-bottom:10px;">Dados Bancários — Santander</div>
                        <div style="color:#ccc;line-height:1.8;">
                            <strong>Banco:</strong> Santander (033)<br>
                            <strong>Agência:</strong> 0135<br>
                            <strong>Conta Corrente:</strong> 13.005213-0<br>
                            <strong>Titular:</strong> Versatil Services
                        </div>
                    </div>
                    <p style="color:#aaa;font-size:13px;">Realize a transferência e envie o comprovante pelo WhatsApp.</p>
                </div>`;
        }

        // ── USDT ──
        if (method === 'usdt') {
            execTitle.textContent = 'Pagamento em USDT (TRC20)';
            // Buscar cotação real
            const usdtRate = await getUsdtRate();
            // Aplicar desconto de 5%
            const totalComDesconto = Math.round(total * 0.95 * 100) / 100;
            const usdtValue = (totalComDesconto / usdtRate).toFixed(2);
            const usdtWallet = 'TE1diztxiihihn7cWpvkYSSBjSJp7bPUZe';

            // Validação do endereço
            const walletValid = usdtWallet && typeof usdtWallet === 'string' && usdtWallet.length > 0 && usdtWallet.startsWith('T');
            const tronUri = `tron:${usdtWallet}?amount=${usdtValue}`;
            const qrCodeUrl = walletValid
                ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(tronUri)}`
                : '';

            html = `
                <div style="text-align:center;">
                    <div style="background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.2);border-radius:8px;padding:8px 16px;display:inline-block;margin-bottom:12px;">
                        <span style="color:#25D366;font-weight:700;font-size:13px;">-5% DESCONTO via USDT</span>
                    </div>
                    <div style="font-size:16px;color:#999;text-decoration:line-through;margin-bottom:4px;">${formatBRL(total)}</div>
                    <div style="font-size:28px;font-weight:800;color:#25D366;margin-bottom:4px;">${formatBRL(totalComDesconto)}</div>
                    <div style="font-size:18px;color:#fff;margin-bottom:12px;">≈ ${usdtValue} USDT</div>
                    <div style="font-size:13px;color:#999;margin-bottom:16px;">Cotação em tempo real: 1 USDT = R$ ${usdtRate.toFixed(2).replace('.', ',')}</div>
                    ${walletValid ? `
                        <div style="background:#fff;border-radius:12px;padding:16px;display:inline-block;margin-bottom:16px;">
                            <img src="${qrCodeUrl}" alt="QR Code Wallet TRC20" style="width:220px;height:220px;">
                        </div>
                    ` : `
                        <div style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.3);border-radius:10px;padding:14px;margin-bottom:14px;">
                            <div style="color:#ff6b6b;font-weight:700;">Erro ao gerar QR Code de pagamento</div>
                        </div>
                    `}
                    <div style="background:#111;border-radius:10px;padding:16px;margin-bottom:14px;">
                        <div style="font-weight:700;color:#25D366;margin-bottom:8px;">Wallet TRC20:</div>
                        <div style="font-family:monospace;font-size:13px;color:#fff;word-break:break-all;">${usdtWallet}</div>
                        <button onclick="navigator.clipboard.writeText('${usdtWallet}').then(()=>{this.textContent='✓ Copiado!';setTimeout(()=>{this.textContent='Copiar endereço'},2000)}).catch(()=>{this.textContent='Não foi possível copiar';setTimeout(()=>{this.textContent='Copiar endereço'},2000)})" style="margin-top:10px;padding:8px 20px;background:#25D366;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px;">Copiar endereço</button>
                    </div>
                    <p style="color:#aaa;font-size:13px;">Envie o TXID (hash da transação) junto com o pedido pelo WhatsApp.</p>
                </div>`;
        }

        // ── CARTÃO ──
        if (method === 'cartao') {
            const totalCC = Math.round(total * 1.05 * 100) / 100;
            execTitle.textContent = 'Cartão de Crédito';
            html = `
                <div style="text-align:center;">
                    <div style="font-size:16px;color:#999;text-decoration:line-through;margin-bottom:4px;">${formatBRL(total)}</div>
                    <div style="font-size:28px;font-weight:800;color:#25D366;margin-bottom:4px;">${formatBRL(totalCC)}</div>
                    <div style="font-size:13px;color:#999;margin-bottom:16px;">Incluso +5% taxa operacional</div>
                    <div style="background:#111;border-radius:10px;padding:16px;margin-bottom:14px;text-align:left;">
                        <div style="color:#ccc;line-height:1.8;">
                            <strong style="color:#25D366;">Processamento seguro via Asaas</strong><br>
                            Os dados do cartão serão solicitados na etapa de confirmação final.<br>
                            <strong>Bandeiras aceitas:</strong> Visa, Mastercard, Elo, Amex
                        </div>
                    </div>
                    <p style="color:#aaa;font-size:13px;">O pagamento será processado após a confirmação do pedido.</p>
                </div>`;
        }

        // For non-PIX methods: show content + direct confirm button
        if (method !== 'pix') {
            execBody.innerHTML = html;
            execPanel.style.display = 'block';
            paymentStatus = 'CONFIRMED';
            paymentExecuted = false;
            confirmBtn.textContent = 'Confirmar e Avançar →';
            confirmBtn.style.display = 'block';
            confirmBtn.style.background = '#25D366';
            confirmBtn.onclick = function () {
                paymentExecuted = true;
                goToStep(4);
            };
        }
    }

    // =============================================
    // 7. COLETAR DADOS
    // =============================================
    function getBuyerData() {
        const isPF = document.getElementById('ck-form-pf').style.display !== 'none';
        if (isPF) {
            return {
                type: 'PF',
                nome: document.getElementById('ck-pf-nome').value,
                cpfCnpj: document.getElementById('ck-pf-cpf').value,
                email: document.getElementById('ck-pf-email').value,
                phone: document.getElementById('ck-pf-phone').value,
                cep: document.getElementById('ck-pf-cep').value,
                rua: document.getElementById('ck-pf-rua').value,
                numero: document.getElementById('ck-pf-numero').value,
                complemento: document.getElementById('ck-pf-complemento').value,
                bairro: document.getElementById('ck-pf-bairro').value,
                cidade: document.getElementById('ck-pf-cidade').value,
                estado: document.getElementById('ck-pf-estado').value,
            };
        } else {
            return {
                type: 'PJ',
                razao: document.getElementById('ck-pj-razao').value,
                fantasia: document.getElementById('ck-pj-fantasia').value,
                cpfCnpj: document.getElementById('ck-pj-cnpj').value,
                ie: document.getElementById('ck-pj-ie').value,
                responsavel: document.getElementById('ck-pj-responsavel').value,
                email: document.getElementById('ck-pj-email').value,
                phone: document.getElementById('ck-pj-phone').value,
                cep: document.getElementById('ck-pj-cep').value,
                rua: document.getElementById('ck-pj-rua').value,
                numero: document.getElementById('ck-pj-numero').value,
                complemento: document.getElementById('ck-pj-complemento').value,
                bairro: document.getElementById('ck-pj-bairro').value,
                cidade: document.getElementById('ck-pj-cidade').value,
                estado: document.getElementById('ck-pj-estado').value,
            };
        }
    }

    function getDeliveryData(buyer) {
        const isSame = document.getElementById('ck-delivery-same').checked;
        if (isSame) {
            return {
                same: true,
                rua: buyer.rua,
                numero: buyer.numero,
                complemento: buyer.complemento,
                bairro: buyer.bairro,
                cidade: buyer.cidade,
                estado: buyer.estado,
                cep: buyer.cep,
                referencia: ''
            };
        }
        return {
            same: false,
            rua: document.getElementById('ck-ent-rua').value,
            numero: document.getElementById('ck-ent-numero').value,
            complemento: document.getElementById('ck-ent-complemento').value,
            bairro: document.getElementById('ck-ent-bairro').value,
            cidade: document.getElementById('ck-ent-cidade').value,
            estado: document.getElementById('ck-ent-estado').value,
            cep: document.getElementById('ck-ent-cep').value,
            referencia: document.getElementById('ck-ent-referencia').value
        };
    }

    function getPaymentMethod() {
        const selected = document.querySelector('input[name="ck-payment"]:checked');
        const map = {
            pix: 'PIX (CNPJ)',
            boleto: 'Transferência Bancária (Sicredi)',
            usdt: 'USDT TRC20',
            cartao: 'Cartão de Crédito (+5%)'
        };
        return { value: selected.value, label: map[selected.value] || selected.value };
    }

    // =============================================
    // 8. RESUMO VISUAL (Step 4)
    // =============================================
    function buildSummary() {
        const cart = window.__getCart();
        const formatBRL = window.__formatBRL;
        const buyer = getBuyerData();
        const delivery = getDeliveryData(buyer);
        const payment = getPaymentMethod();
        const orderNum = generateOrderNumber();

        // Store for send
        window.__checkoutData = { buyer, delivery, payment, orderNum };

        // Order number
        document.getElementById('ck-order-number').innerHTML =
            `<span>PEDIDO</span> <strong>${orderNum}</strong>`;

        // Products
        let total = 0;
        const prodHtml = cart.map(item => {
            const sub = item.price * item.qty;
            total += sub;
            return `<div class="ck-sum-row">
                <span>${item.name}</span>
                <span>${item.qty} un × ${formatBRL(item.price)} = <strong>${formatBRL(sub)}</strong></span>
            </div>`;
        }).join('');
        document.getElementById('ck-summary-products').innerHTML = prodHtml;

        let finalTotal = total;
        let totalLabel = formatBRL(total);
        if (payment.value === 'cartao') {
            finalTotal = Math.round(total * 1.05 * 100) / 100;
            totalLabel = `<span class="ck-strikethrough">${formatBRL(total)}</span> ${formatBRL(finalTotal)} <small>(+5% cartão)</small>`;
        }
        document.getElementById('ck-summary-total').innerHTML =
            `<div class="ck-sum-total-row"><span>TOTAL</span><span>${totalLabel}</span></div>`;

        // Buyer
        const buyerName = buyer.type === 'PF' ? buyer.nome : buyer.razao;
        const buyerDoc = buyer.cpfCnpj;
        document.getElementById('ck-summary-buyer').innerHTML = `
            <div class="ck-sum-row"><span>Tipo</span><span>${buyer.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</span></div>
            <div class="ck-sum-row"><span>${buyer.type === 'PF' ? 'Nome' : 'Razão Social'}</span><span>${buyerName}</span></div>
            <div class="ck-sum-row"><span>${buyer.type === 'PF' ? 'CPF' : 'CNPJ'}</span><span>${buyerDoc}</span></div>
            ${buyer.ie ? `<div class="ck-sum-row"><span>IE</span><span>${buyer.ie}</span></div>` : ''}
            <div class="ck-sum-row"><span>E-mail</span><span>${buyer.email}</span></div>
            <div class="ck-sum-row"><span>Telefone</span><span>${buyer.phone}</span></div>
        `;

        // Delivery
        const addr = `${delivery.rua}, ${delivery.numero}${delivery.complemento ? ' - ' + delivery.complemento : ''}, ${delivery.bairro}, ${delivery.cidade}/${delivery.estado} - CEP ${delivery.cep}`;
        document.getElementById('ck-summary-delivery').innerHTML = `
            <div class="ck-sum-row"><span>Endereço</span><span>${addr}</span></div>
            ${delivery.referencia ? `<div class="ck-sum-row"><span>Referência</span><span>${delivery.referencia}</span></div>` : ''}
        `;

        // Payment
        document.getElementById('ck-summary-payment').innerHTML =
            `<div class="ck-sum-row"><span>Método</span><span><strong>${payment.label}</strong></span></div>`;

        // Fiscal
        document.getElementById('ck-summary-fiscal').innerHTML = `
            <div class="ck-sum-row"><span>Tipo</span><span>${buyer.type}</span></div>
            <div class="ck-sum-row"><span>${buyer.type === 'PF' ? 'Nome' : 'Razão Social'}</span><span>${buyerName}</span></div>
            <div class="ck-sum-row"><span>${buyer.type === 'PF' ? 'CPF' : 'CNPJ'}</span><span>${buyerDoc}</span></div>
            ${buyer.ie ? `<div class="ck-sum-row"><span>IE</span><span>${buyer.ie}</span></div>` : ''}
            <div class="ck-sum-row"><span>Endereço Fiscal</span><span>${buyer.rua}, ${buyer.numero}, ${buyer.bairro}, ${buyer.cidade}/${buyer.estado} - CEP ${buyer.cep}</span></div>
            <div class="ck-sum-row"><span>E-mail Fiscal</span><span>${buyer.email}</span></div>
        `;
    }

    // =============================================
    // 9. ENVIO VIA WHATSAPP
    // =============================================
    function sendOrder() {
        const data = window.__checkoutData;
        const cart = window.__getCart();
        const formatBRL = window.__formatBRL;

        let total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        let finalTotal = total;
        if (data.payment.value === 'cartao') {
            finalTotal = Math.round(total * 1.05 * 100) / 100;
        }

        let msg = `*PEDIDO ${data.orderNum}*\n`;
        msg += `*VERSATIL GAMA INDUSTRIAL*\n\n`;

        msg += `*PRODUTOS:*\n`;
        cart.forEach(i => {
            msg += `• ${i.name} — ${i.qty} un × ${formatBRL(i.price)} = ${formatBRL(i.price * i.qty)}\n`;
        });

        msg += `\n*TOTAL: ${formatBRL(finalTotal)}*`;
        if (data.payment.value === 'cartao') msg += ` (incluso +5% cartão)`;
        msg += `\n\n`;

        msg += `*DADOS DO COMPRADOR:*\n`;
        msg += `Tipo: ${data.buyer.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}\n`;
        if (data.buyer.type === 'PF') {
            msg += `Nome: ${data.buyer.nome}\n`;
            msg += `CPF: ${data.buyer.cpfCnpj}\n`;
        } else {
            msg += `Razão Social: ${data.buyer.razao}\n`;
            if (data.buyer.fantasia) msg += `Fantasia: ${data.buyer.fantasia}\n`;
            msg += `CNPJ: ${data.buyer.cpfCnpj}\n`;
            if (data.buyer.ie) msg += `IE: ${data.buyer.ie}\n`;
            msg += `Responsável: ${data.buyer.responsavel}\n`;
        }
        msg += `E-mail: ${data.buyer.email}\n`;
        msg += `Telefone: ${data.buyer.phone}\n\n`;

        msg += `*ENDEREÇO DE ENTREGA:*\n`;
        msg += `${data.delivery.rua}, ${data.delivery.numero}`;
        if (data.delivery.complemento) msg += ` - ${data.delivery.complemento}`;
        msg += `\n${data.delivery.bairro}, ${data.delivery.cidade}/${data.delivery.estado}\n`;
        msg += `CEP: ${data.delivery.cep}\n`;
        if (data.delivery.referencia) msg += `Ref: ${data.delivery.referencia}\n`;
        msg += `\n`;

        msg += `*FORMA DE PAGAMENTO:*\n`;
        msg += `${data.payment.label}\n\n`;

        msg += `*DADOS PARA NOTA FISCAL:*\n`;
        const buyerName = data.buyer.type === 'PF' ? data.buyer.nome : data.buyer.razao;
        msg += `${data.buyer.type === 'PF' ? 'CPF' : 'CNPJ'}: ${data.buyer.cpfCnpj}\n`;
        msg += `Nome/Razão: ${buyerName}\n`;
        msg += `End. Fiscal: ${data.buyer.rua}, ${data.buyer.numero}, ${data.buyer.cidade}/${data.buyer.estado}\n\n`;

        // Logistics info
        const shipping = getShippingData();
        msg += `*INFORMAÇÕES LOGÍSTICAS:*\n`;
        msg += `Modalidade: ${shipping.label}\n`;
        msg += `Peso estimado: ${shipping.weight.toFixed(1)} kg\n`;
        msg += `Categoria de frete: ${shipping.category}\n`;
        msg += `Obs: Frete será calculado e informado após análise.\n`;

        const encoded = encodeURIComponent(msg);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

        // WhatsApp URL limit ~4096 chars
        if (url.length > 4000) {
            navigator.clipboard.writeText(msg).then(() => {
                showCheckoutToast('Pedido copiado! Cole no WhatsApp.');
                window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
            }).catch(() => {
                window.open(url, '_blank');
            });
        } else {
            window.open(url, '_blank');
        }

        // Clear cart
        window.__clearCart();
        closeCheckout();
        showCheckoutToast('Pedido enviado com sucesso!');
    }

    // =============================================
    // 10. ABRIR / FECHAR
    // =============================================
    function openCheckout() {
        const cart = window.__getCart();
        if (!cart || cart.length === 0) {
            showCheckoutToast('Adicione produtos ao pedido primeiro!');
            return;
        }
        currentStep = 1;
        goToStep(1);
        document.getElementById('checkout-modal-overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCheckout() {
        document.getElementById('checkout-modal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }

    // =============================================
    // 11. BIND EVENTS
    // =============================================
    function bindCheckoutEvents() {
        // Close
        document.getElementById('ck-close').addEventListener('click', closeCheckout);
        document.getElementById('checkout-modal-overlay').addEventListener('click', e => {
            if (e.target === e.currentTarget) closeCheckout();
        });

        // PF/PJ toggle
        document.getElementById('ck-type-pf').addEventListener('click', () => {
            document.getElementById('ck-type-pf').classList.add('active');
            document.getElementById('ck-type-pj').classList.remove('active');
            document.getElementById('ck-form-pf').style.display = '';
            document.getElementById('ck-form-pj').style.display = 'none';
        });
        document.getElementById('ck-type-pj').addEventListener('click', () => {
            document.getElementById('ck-type-pj').classList.add('active');
            document.getElementById('ck-type-pf').classList.remove('active');
            document.getElementById('ck-form-pj').style.display = '';
            document.getElementById('ck-form-pf').style.display = 'none';
        });

        // Delivery toggle
        document.querySelectorAll('input[name="ck-delivery"]').forEach(r => {
            r.addEventListener('change', () => {
                document.getElementById('ck-delivery-fields').style.display =
                    document.getElementById('ck-delivery-diff').checked ? '' : 'none';
            });
        });

        // Shipping mode change → update freight category
        const shippingMode = document.getElementById('ck-shipping-mode');
        if (shippingMode) {
            shippingMode.addEventListener('change', updateWeightInfo);
        }

        // Next / Back
        document.getElementById('ck-btn-next').addEventListener('click', () => {
            if (!validateStep(currentStep)) return;
            if (currentStep === 3) {
                executePaymentStep();
                return;
            }
            goToStep(currentStep + 1);
        });
        document.getElementById('ck-btn-back').addEventListener('click', () => {
            goToStep(currentStep - 1);
        });

        // Send
        document.getElementById('ck-btn-send').addEventListener('click', sendOrder);

        // Masks
        document.querySelectorAll('.mask-cpf').forEach(el => applyMask(el, maskCPF));
        document.querySelectorAll('.mask-cnpj').forEach(el => applyMask(el, maskCNPJ));
        document.querySelectorAll('.mask-phone').forEach(el => applyMask(el, maskPhone));
        document.querySelectorAll('.mask-cep').forEach(el => applyMask(el, maskCEP));

        // Auto CEP
        document.querySelectorAll('.cep-auto').forEach(el => {
            el.addEventListener('blur', function () {
                const prefix = this.dataset.prefix;
                fetchCEP(this.value, prefix);
            });
        });

        // Remove error class on input
        document.querySelectorAll('#checkout-modal-overlay input').forEach(el => {
            el.addEventListener('input', () => el.classList.remove('ck-error'));
        });
    }

    // =============================================
    // INIT
    // =============================================
    document.addEventListener('DOMContentLoaded', function () {
        createCheckoutModal();
        bindCheckoutEvents();
    });

    // Expose opener
    window.__openCheckout = openCheckout;

})();
