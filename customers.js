/* =============================================
   VGI INDUSTRIAL — Customer Manager (CRM Automático)
   Cadastro invisível baseado nos dados do checkout
   ============================================= */

(function () {
    'use strict';

    const STORAGE_KEY = 'vgi_customers';
    const CURRENT_KEY = 'vgi_current_customer';

    // =============================================
    // 1. CRUD LocalStorage
    // =============================================
    function getCustomers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCustomers(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function generateId() {
        return 'cust_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    // =============================================
    // 2. FIND EXISTING (by document or email)
    // =============================================
    function findExisting(doc, email) {
        const customers = getCustomers();
        const cleanDoc = (doc || '').replace(/\D/g, '');
        const cleanEmail = (email || '').trim().toLowerCase();

        return customers.find(c => {
            const cDoc = (c.document || '').replace(/\D/g, '');
            const cEmail = (c.email || '').trim().toLowerCase();
            if (cleanDoc && cDoc && cleanDoc === cDoc) return true;
            if (cleanEmail && cEmail && cleanEmail === cEmail) return true;
            return false;
        });
    }

    // =============================================
    // 3. SAVE OR UPDATE CUSTOMER
    // =============================================
    function saveCustomer(data) {
        const customers = getCustomers();
        const existing = findExisting(data.document, data.email);
        const now = new Date().toISOString();

        if (existing) {
            // Update existing
            Object.assign(existing, {
                name: data.name || existing.name,
                document: data.document || existing.document,
                email: data.email || existing.email,
                phone: data.phone || existing.phone,
                address: data.address || existing.address,
                company: data.company || existing.company,
                type: data.type || existing.type,
                updated_at: now,
                order_count: (existing.order_count || 0) + 1,
                last_order_at: now
            });
            saveCustomers(customers);
            localStorage.setItem(CURRENT_KEY, existing.id);
            console.log(`[CRM] Customer updated: ${existing.name} (${existing.id})`);
            return existing;
        } else {
            // Create new
            const customer = {
                id: generateId(),
                name: data.name,
                document: data.document,
                email: data.email,
                phone: data.phone,
                address: data.address,
                company: data.company || null,
                type: data.type, // 'pf' or 'pj'
                created_at: now,
                updated_at: now,
                order_count: 1,
                last_order_at: now
            };
            customers.push(customer);
            saveCustomers(customers);
            localStorage.setItem(CURRENT_KEY, customer.id);
            console.log(`[CRM] New customer: ${customer.name} (${customer.id})`);
            return customer;
        }
    }

    // =============================================
    // 4. CAPTURE FROM CHECKOUT FIELDS
    // =============================================
    function captureFromCheckout() {
        const pfForm = document.getElementById('ck-form-pf');
        const isPF = pfForm && pfForm.style.display !== 'none';
        const prefix = isPF ? 'ck-pf' : 'ck-pj';
        const type = isPF ? 'pf' : 'pj';

        const val = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : '';
        };

        const data = {
            type: type,
            name: isPF ? val(`${prefix}-nome`) : val(`${prefix}-responsavel`),
            document: isPF ? val(`${prefix}-cpf`) : val(`${prefix}-cnpj`),
            email: val(`${prefix}-email`),
            phone: val(`${prefix}-phone`),
            company: isPF ? null : val(`${prefix}-razao`),
            address: {
                cep: val(`${prefix}-cep`),
                street: val(`${prefix}-rua`),
                number: val(`${prefix}-numero`),
                complement: val(`${prefix}-complemento`),
                neighborhood: val(`${prefix}-bairro`),
                city: val(`${prefix}-cidade`),
                state: val(`${prefix}-estado`)
            }
        };

        // Only save if we have at least name and document
        if (data.name && data.document) {
            return saveCustomer(data);
        }
        return null;
    }

    // =============================================
    // 5. AUTO-FILL RETURNING CUSTOMER
    // =============================================
    function autoFillCustomer() {
        const lastId = localStorage.getItem(CURRENT_KEY);
        if (!lastId) return;

        const customers = getCustomers();
        const customer = customers.find(c => c.id === lastId);
        if (!customer) return;

        const prefix = customer.type === 'pf' ? 'ck-pf' : 'ck-pj';

        const setVal = (id, value) => {
            const el = document.getElementById(id);
            if (el && value && !el.value) {
                el.value = value;
            }
        };

        // Wait for checkout modal to be rendered
        setTimeout(() => {
            if (customer.type === 'pf') {
                setVal(`${prefix}-nome`, customer.name);
                setVal(`${prefix}-cpf`, customer.document);
            } else {
                setVal(`${prefix}-razao`, customer.company);
                setVal(`${prefix}-cnpj`, customer.document);
                setVal(`${prefix}-responsavel`, customer.name);
            }

            setVal(`${prefix}-email`, customer.email);
            setVal(`${prefix}-phone`, customer.phone);

            if (customer.address) {
                setVal(`${prefix}-cep`, customer.address.cep);
                setVal(`${prefix}-rua`, customer.address.street);
                setVal(`${prefix}-numero`, customer.address.number);
                setVal(`${prefix}-complemento`, customer.address.complement);
                setVal(`${prefix}-bairro`, customer.address.neighborhood);
                setVal(`${prefix}-cidade`, customer.address.city);
                setVal(`${prefix}-estado`, customer.address.state);
            }

            console.log(`[CRM] Auto-filled returning customer: ${customer.name}`);
        }, 300);
    }

    // =============================================
    // 6. HOOK INTO CHECKOUT FLOW
    // =============================================
    function hookCheckout() {
        // Wait for checkout DOM to be available
        const observer = new MutationObserver(() => {
            const nextBtn = document.getElementById('ck-btn-next');
            if (nextBtn && !nextBtn._crmHooked) {
                nextBtn._crmHooked = true;

                // Intercept "Next" click — save customer when leaving Step 1
                nextBtn.addEventListener('click', () => {
                    // Only capture on step 1 → 2 transition
                    const step1 = document.getElementById('ck-step-1');
                    if (step1 && step1.classList.contains('active')) {
                        // Small delay to let validation run first
                        setTimeout(() => {
                            // Only save if validation passed (step moved to 2)
                            const step2 = document.getElementById('ck-step-2');
                            if (step2 && step2.classList.contains('active')) {
                                captureFromCheckout();
                            }
                        }, 200);
                    }
                });

                console.log('[CRM] Hooked into checkout flow');
            }

            // Auto-fill when checkout opens
            const modal = document.getElementById('checkout-modal');
            if (modal && !modal._crmAutoFilled) {
                const modalObserver = new MutationObserver(() => {
                    if (modal.style.display !== 'none' && modal.offsetParent !== null) {
                        modal._crmAutoFilled = true;
                        autoFillCustomer();
                    }
                });
                modalObserver.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
                modal._crmAutoFilled = false;
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // =============================================
    // 7. ADMIN API (console access)
    // =============================================
    window.VGI_CRM = {
        getAll: getCustomers,
        find: findExisting,
        count: () => getCustomers().length,
        export: () => {
            const data = JSON.stringify(getCustomers(), null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vgi_customers_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            console.log('[CRM] Customers exported');
        },
        clear: () => {
            if (confirm('Limpar todos os clientes?')) {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(CURRENT_KEY);
                console.log('[CRM] All customers cleared');
            }
        }
    };

    // =============================================
    // 8. INIT
    // =============================================
    document.addEventListener('DOMContentLoaded', () => {
        hookCheckout();
        console.log(`[CRM] Customer Manager loaded. ${getCustomers().length} customers in database.`);
    });

})();
