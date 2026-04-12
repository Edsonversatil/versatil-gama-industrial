/* =============================================
   VERSATIL GAMA INDUSTRIAL — Motor de Pedidos v1.0
   Sistema de precificação, carrinho e checkout via WhatsApp
   ============================================= */

(function () {
    'use strict';

    // =============================================
    // 1. CATÁLOGO DE PREÇOS (Mercado + 20%)
    // =============================================
    const MARKUP = 1.20; // 20% sobre preço médio de mercado
    const WHATSAPP_NUMBER = '5513991509140';

    // Preços base de mercado (sem markup) — estimativas industriais reais
    const CATALOG = {
        // === DISCOS INDUSTRIAIS (Seção 1) ===
        'Disco Diamantado Premium Porcelanato 230mm': { base: 589.90, unit: 'un', fixed: 707.90 },
        'Disco de Corte Diamantado':          { base: 85.00,  unit: 'un' },
        'Disco Cerâmico de Alta Performance':  { base: 42.00,  unit: 'un' },
        'Disco de Corte p/ Metal e Aço':       { base: 8.50,   unit: 'un' },
        'Disco de Desbaste Industrial':        { base: 12.00,  unit: 'un' },
        'Disco Turbo Diamantado':              { base: 65.00,  unit: 'un' },
        'Disco Contínuo Diamantado':           { base: 55.00,  unit: 'un' },
        'Disco Flap Profissional':             { base: 14.00,  unit: 'un', fixed: 26.80 },
        'Disco Flap Zircônia':                 { base: 18.00,  unit: 'un' },

        // === LIXAS & CINTAS (Seção 2) ===
        'Lixas Diamantadas':                   { base: 35.00,  unit: 'un' },
        'Lixas Cerâmicas':                     { base: 1500.00, unit: 'un', fixed: 1800.00 }, // FIXA: Lixas cerâmicas p/ retífica

        'Cintas p/ Alta Remoção':              { base: 1500.00, unit: 'un', fixed: 1800.00 },
        'Cintas p/ Retíficas Severas e Processos Industriais': { base: 1800.00, unit: 'un', fixed: 2160.00 },


        // === ABRASIVOS ESPECIAIS (Seção 1) ===
        'Rebolos Convencionais':               { base: 55.00,  unit: 'un' },
        'Rebolos Especiais (CBN/Diamante)':    { base: 320.00, unit: 'un' },

        // ═══════════════════════════════════════════════════════
        // LINHA PREMIUM EXPORTAÇÃO — HIGH TICKET (50 produtos)
        // ═══════════════════════════════════════════════════════

        // --- Rebolos Diamantados (1-10) ---
        'Rebolo Diamantado Copo Segmentado Heavy Duty':     { base: 0, unit: 'un', fixed: 2450.00 },
        'Rebolo Diamantado Reto para Metal Duro':           { base: 0, unit: 'un', fixed: 1890.00 },
        'Rebolo Diamantado Perfilado Alta Precisão':        { base: 0, unit: 'un', fixed: 3180.00 },
        'Rebolo Diamantado para Cerâmica Técnica':          { base: 0, unit: 'un', fixed: 1650.00 },
        'Rebolo Diamantado para Retífica Plana':            { base: 0, unit: 'un', fixed: 2780.00 },
        'Rebolo Diamantado Resinóide Alta Performance':     { base: 0, unit: 'un', fixed: 1420.00 },
        'Rebolo Diamantado Vitrificado Industrial':         { base: 0, unit: 'un', fixed: 3490.00 },
        'Rebolo Diamantado para Vidro Industrial':          { base: 0, unit: 'un', fixed: 1280.00 },
        'Rebolo Diamantado para Carbeto de Tungstênio':     { base: 0, unit: 'un', fixed: 2950.00 },
        'Rebolo Diamantado para Afiação de Ferramentas':    { base: 0, unit: 'un', fixed: 980.00 },

        // --- Rebolos CBN (11-20) ---
        'Rebolo CBN Vitrificado para Aço Temperado':       { base: 0, unit: 'un', fixed: 3850.00 },
        'Rebolo CBN Resinóide Alta Precisão':               { base: 0, unit: 'un', fixed: 2680.00 },
        'Rebolo CBN Copo Industrial':                       { base: 0, unit: 'un', fixed: 3290.00 },
        'Rebolo CBN para Retífica Interna':                 { base: 0, unit: 'un', fixed: 1890.00 },
        'Rebolo CBN para Retífica Cilíndrica':              { base: 0, unit: 'un', fixed: 4150.00 },
        'Rebolo CBN para Engrenagens':                      { base: 0, unit: 'un', fixed: 4480.00 },
        'Rebolo CBN Alta Velocidade':                       { base: 0, unit: 'un', fixed: 3680.00 },
        'Rebolo CBN Ultra Precisão':                        { base: 0, unit: 'un', fixed: 4290.00 },
        'Rebolo CBN para Rolamentos Industriais':           { base: 0, unit: 'un', fixed: 2950.00 },
        'Rebolo CBN para Moldes e Matrizes':                { base: 0, unit: 'un', fixed: 3490.00 },

        // --- Cintas Abrasivas (21-30) ---
        'Cinta Abrasiva Zircônia Heavy Duty':               { base: 0, unit: 'un', fixed: 1850.00 },
        'Cinta Abrasiva Cerâmica Premium':                  { base: 0, unit: 'un', fixed: 2280.00 },
        'Cinta Abrasiva para Aço Inox Industrial':          { base: 0, unit: 'un', fixed: 1480.00 },
        'Cinta Abrasiva para Caldeiraria Pesada':           { base: 0, unit: 'un', fixed: 1680.00 },
        'Cinta Abrasiva Banda Larga Industrial':            { base: 0, unit: 'un', fixed: 2780.00 },
        'Cinta Abrasiva Alta Remoção para Fundição':        { base: 0, unit: 'un', fixed: 1950.00 },
        'Cinta Abrasiva para Tubulações Industriais':       { base: 0, unit: 'un', fixed: 890.00 },
        'Cinta Abrasiva para Estruturas Metálicas':         { base: 0, unit: 'un', fixed: 750.00 },
        'Cinta Abrasiva para Equipamentos de Mineração':    { base: 0, unit: 'un', fixed: 2450.00 },
        'Cinta Abrasiva para Solda e Rebarbação Pesada':    { base: 0, unit: 'un', fixed: 1180.00 },

        // --- Discos (31-40) ---
        'Disco Diamantado Segmentado para Concreto Armado': { base: 0, unit: 'un', fixed: 890.00 },
        'Disco Diamantado Turbo Alta Performance':          { base: 0, unit: 'un', fixed: 680.00 },
        'Disco Diamantado Contínuo para Cerâmica Técnica':  { base: 0, unit: 'un', fixed: 520.00 },
        'Disco Diamantado para Granito Industrial':         { base: 0, unit: 'un', fixed: 1280.00 },
        'Disco Diamantado para Mármore Profissional':       { base: 0, unit: 'un', fixed: 780.00 },
        'Disco Diamantado Heavy Duty para Corte Profundo':  { base: 0, unit: 'un', fixed: 1780.00 },
        'Disco Diamantado para Pedra Natural':              { base: 0, unit: 'un', fixed: 580.00 },
        'Disco de Corte Abrasivo para Aço Estrutural':      { base: 0, unit: 'un', fixed: 380.00 },
        'Disco Flap Zircônia Industrial':                   { base: 0, unit: 'un', fixed: 290.00 },
        'Disco Flap Cerâmico Alta Remoção':                 { base: 0, unit: 'un', fixed: 420.00 },

        // --- Dressadores (41-45) ---
        'Dressador Diamantado Ponta Única':                 { base: 0, unit: 'un', fixed: 1480.00 },
        'Dressador Diamantado Multiponta':                  { base: 0, unit: 'un', fixed: 1890.00 },
        'Dressador Diamantado Tipo Placa':                  { base: 0, unit: 'un', fixed: 2180.00 },
        'Dressador Diamantado Rotativo':                    { base: 0, unit: 'un', fixed: 1650.00 },
        'Dressador Diamantado Alta Precisão':               { base: 0, unit: 'un', fixed: 980.00 },

        // --- Pastas Diamantadas (46-50) ---
        'Pasta Diamantada Grão Grosso Industrial':          { base: 0, unit: 'un', fixed: 450.00 },
        'Pasta Diamantada Grão Médio':                      { base: 0, unit: 'un', fixed: 520.00 },
        'Pasta Diamantada Grão Fino':                       { base: 0, unit: 'un', fixed: 680.00 },
        'Pasta Diamantada para Polimento Espelhado':        { base: 0, unit: 'un', fixed: 890.00 },
        'Pasta Diamantada para Lapidação Técnica':          { base: 0, unit: 'un', fixed: 750.00 },

        // === CATÁLOGO TÉCNICO — Discos ===
        'Discos de Corte':                     { base: 8.50,   unit: 'un' },
        'Discos Flap':                         { base: 14.00,  unit: 'un', fixed: 26.80 },
        'Discos de Desbaste':                  { base: 12.00,  unit: 'un', fixed: 28.40 },
        'Discos Diamantados':                  { base: 75.00,  unit: 'un' },
        'Discos Cerâmicos':                    { base: 42.00,  unit: 'un' },

        // === CATÁLOGO TÉCNICO — Rebolos ===
        'Rebolos Vitrificados':                { base: 65.00,  unit: 'un' },
        'Rebolos Resinados':                   { base: 50.00,  unit: 'un' },
        'Rebolos Diamantados':                 { base: 380.00, unit: 'un' },
        'Rebolos CBN':                         { base: 420.00, unit: 'un' },

        // === CATÁLOGO TÉCNICO — Lixas ===
        'Lixas Óxido de Alumínio':             { base: 6.00,   unit: 'un', fixed: 77.20 },
        'Lixas Carbeto de Silício':            { base: 7.50,   unit: 'un', fixed: 29.00 },
        'Cintas Abrasivas':                    { base: 28.00,  unit: 'un', fixed: 83.60 },
        'Folhas Abrasivas':                    { base: 4.50,   unit: 'un' },

        // === CATÁLOGO TÉCNICO — Escovas ===
        'Escovas de Aço':                      { base: 22.00,  unit: 'un' },
        'Escovas Inox / Circulares':           { base: 35.00,  unit: 'un' },
        'Escovas Copo':                        { base: 28.00,  unit: 'un' },

        // === CATÁLOGO TÉCNICO — Ferramentas Rotativas ===
        'Fresas de Metal Duro':                { base: 45.00,  unit: 'un', fixed: 75.50 },
        'Pontas Montadas':                     { base: 18.00,  unit: 'un' },
    };

    // =============================================
    // 2. ESTADO DO CARRINHO
    // =============================================
    let cart = [];
    let cartVisible = false;

    // Persist cart to localStorage
    function saveCart() {
        try { localStorage.setItem('vgi_cart', JSON.stringify(cart)); } catch(e) {}
    }
    function loadCart() {
        try {
            const saved = localStorage.getItem('vgi_cart');
            if (saved) cart = JSON.parse(saved);
        } catch(e) { cart = []; }
    }

    // =============================================
    // 3. CALCULAR PREÇO FINAL
    // =============================================
    function getPrice(name) {
        const item = CATALOG[name];
        if (!item) return 25.00 * MARKUP; // fallback genérico
        if (item.fixed) return item.fixed;
        return Math.round(item.base * MARKUP * 100) / 100;
    }

    function formatBRL(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    // =============================================
    // 4. INJETAR CONTROLES NOS PRODUCT CARDS
    // =============================================
    function injectProductControls() {
        const cards = document.querySelectorAll('.product-card');

        cards.forEach((card, index) => {
            const h4 = card.querySelector('.product-info h4');
            if (!h4) return;

            const productName = h4.textContent.trim();
            const price = getPrice(productName);
            const productId = 'prod-' + index;

            // Add data attributes (BRL price is the source of truth, NEVER overwritten)
            card.setAttribute('data-product-id', productId);
            card.setAttribute('data-product-name', productName);
            card.setAttribute('data-product-price', price);
            card.setAttribute('data-product-price-brl', price);

            // Create price + controls element
            const controlsHTML = `
                <div class="product-price-row">
                    <span class="product-price-prefix" style="font-size:inherit;font-weight:inherit;color:#25D366;">R$</span>
                    <input type="text" class="price-input" data-id="${productId}" data-price-brl="${price}" value="${price.toFixed(2).replace('.', ',')}" style="background:transparent;border:none;color:#25D366;font-family:inherit;font-size:inherit;font-weight:inherit;width:85px;padding:0;margin:0 0 0 4px;outline:none;" readonly>
                    <span class="product-unit">/ un</span>
                </div>
                <div class="product-controls">
                    <div class="qty-control">
                        <button class="qty-btn qty-minus" data-id="${productId}" aria-label="Diminuir quantidade">−</button>
                        <input type="number" class="qty-input" data-id="${productId}" value="0" min="0" max="9999" step="1">
                        <button class="qty-btn qty-plus" data-id="${productId}" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <button class="btn-add-cart" data-id="${productId}" data-name="${productName}" data-price="${price}" data-price-brl="${price}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        Adicionar
                    </button>
                </div>
            `;

            const infoDiv = card.querySelector('.product-info');
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'product-order-zone';
            controlsContainer.innerHTML = controlsHTML;
            infoDiv.appendChild(controlsContainer);
        });
    }

    // =============================================
    // 5. CARRINHO FLUTUANTE
    // =============================================
    function createCartUI() {
        // Floating cart button
        const cartBtn = document.createElement('div');
        cartBtn.id = 'cart-float-btn';
        cartBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span id="cart-count">0</span>
        `;
        document.body.appendChild(cartBtn);

        // Cart panel
        const cartPanel = document.createElement('div');
        cartPanel.id = 'cart-panel';
        cartPanel.innerHTML = `
            <div class="cart-header">
                <h3>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    Meu Pedido
                </h3>
                <button id="cart-close" aria-label="Fechar carrinho">✕</button>
            </div>
            <div id="cart-items" class="cart-items"></div>
            <div id="cart-empty" class="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <p>Seu pedido está vazio</p>
                <span>Adicione produtos do catálogo</span>
            </div>
            <div id="cart-footer" class="cart-footer">
                <div class="cart-total-row">
                    <span>TOTAL</span>
                    <span id="cart-total" class="cart-total-value">R$ 0,00</span>
                </div>
                <button id="btn-checkout" class="btn-checkout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Finalizar Pedido via WhatsApp
                </button>
            </div>
        `;
        document.body.appendChild(cartPanel);

        // Cart overlay
        const overlay = document.createElement('div');
        overlay.id = 'cart-overlay';
        document.body.appendChild(overlay);
    }

    // =============================================
    // 6. LÓGICA DO CARRINHO
    // =============================================
    function addToCart(name, price, qty) {
        console.log('[CART] addToCart CALLED', { name, price, qty });
        console.log('[CART] BEFORE ADD', JSON.parse(JSON.stringify(cart)));
        if (qty <= 0) {
            showToast('Informe uma quantidade maior que zero.');
            return;
        }
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            showToast('Informe um preço válido.');
            return;
        }
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += qty;
            existing.price = parsedPrice;
            console.log('[CART] UPDATED EXISTING', existing);
        } else {
            cart.push({ name, price: parsedPrice, qty });
            console.log('[CART] PUSHED NEW ITEM', { name, price: parsedPrice, qty });
        }
        console.log('[CART] AFTER ADD', JSON.parse(JSON.stringify(cart)));
        saveCart();
        updateCartUI();
        showToast(`${name} adicionado ao pedido!`);
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        saveCart();
        updateCartUI();
    }

    function updateCartQty(name, newQty) {
        const parsed = parseInt(newQty) || 0;
        if (parsed <= 0) {
            removeFromCart(name);
            return;
        }
        const item = cart.find(i => i.name === name);
        if (item) {
            item.qty = parsed;
            saveCart();
            updateCartUI();
        }
    }

    function getCartTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    function updateCartUI() {
        console.log('[CART] updateCartUI CALLED, cart =', JSON.parse(JSON.stringify(cart)));
        const countEl = document.getElementById('cart-count');
        const itemsEl = document.getElementById('cart-items');
        const emptyEl = document.getElementById('cart-empty');
        const footerEl = document.getElementById('cart-footer');
        const totalEl = document.getElementById('cart-total');
        const floatBtn = document.getElementById('cart-float-btn');

        if (!countEl || !itemsEl || !emptyEl || !footerEl || !totalEl || !floatBtn) {
            console.error('[CART] DOM ELEMENTS MISSING!', { countEl, itemsEl, emptyEl, footerEl, totalEl, floatBtn });
            return;
        }

        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        countEl.textContent = totalItems;

        if (totalItems > 0) {
            floatBtn.classList.add('has-items');
            countEl.classList.add('bounce');
            setTimeout(() => countEl.classList.remove('bounce'), 300);
        } else {
            floatBtn.classList.remove('has-items');
        }

        if (cart.length === 0) {
            itemsEl.style.display = 'none';
            emptyEl.style.display = 'flex';
            footerEl.style.display = 'none';
            return;
        }

        emptyEl.style.display = 'none';
        itemsEl.style.display = 'block';
        footerEl.style.display = 'block';

        itemsEl.innerHTML = cart.map(item => {
            const escapedName = item.name.replace(/'/g, "\\'");
            const subtotal = item.price * item.qty;
            return `
            <div class="cart-item" data-brl-price="${item.price}" data-brl-subtotal="${subtotal}">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price" data-brl="${item.price}">${formatBRL(item.price)} / un</span>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-qty-control">
                        <button class="cart-qty-btn" onclick="window.__cartQtyChange('${escapedName}', -1)">&#8722;</button>
                        <input type="number" class="cart-qty-input" value="${item.qty}" min="0"
                            onchange="window.__cartQtyUpdate('${escapedName}', this.value)">
                        <button class="cart-qty-btn" onclick="window.__cartQtyChange('${escapedName}', 1)">+</button>
                    </div>
                    <span class="cart-item-subtotal" data-brl="${subtotal}">${formatBRL(subtotal)}</span>
                    <button class="cart-item-remove" onclick="window.__cartRemove('${escapedName}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            </div>`;
        }).join('');

        const brlTotal = getCartTotal();
        totalEl.setAttribute('data-brl', brlTotal);
        totalEl.textContent = formatBRL(brlTotal);
    }

    function showCart() {
        cartVisible = true;
        document.getElementById('cart-panel').classList.add('open');
        document.getElementById('cart-overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function hideCart() {
        cartVisible = false;
        document.getElementById('cart-panel').classList.remove('open');
        document.getElementById('cart-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }

    // =============================================
    // 7. CHECKOUT — Abre modal completo
    // =============================================
    function checkout() {
        if (cart.length === 0) return;
        hideCart();
        if (typeof window.__openCheckout === 'function') {
            window.__openCheckout();
        }
    }

    // =============================================
    // 8. TOAST NOTIFICATIONS
    // =============================================
    function showToast(message) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // =============================================
    // 9. COPIAR ENDEREÇO USDT
    // =============================================
    function copyUSDTAddress() {
        const address = 'TE1diztxiihihn7cWpvkYSSBjSJp7bPUZe';
        navigator.clipboard.writeText(address).then(() => {
            showToast('Endereço USDT copiado!');
        }).catch(() => {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = address;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Endereço USDT copiado!');
        });
    }

    // =============================================
    // 10. EVENT LISTENERS
    // =============================================
    function bindEvents() {
        // Quantity buttons on product cards
        document.addEventListener('click', function (e) {
            const minusBtn = e.target.closest('.qty-minus');
            const plusBtn = e.target.closest('.qty-plus');
            const addBtn = e.target.closest('.btn-add-cart');

            if (minusBtn) {
                const id = minusBtn.dataset.id;
                const input = document.querySelector(`.qty-input[data-id="${id}"]`);
                const val = parseInt(input.value) || 0;
                input.value = Math.max(0, val - 1);
            }

            if (plusBtn) {
                const id = plusBtn.dataset.id;
                const input = document.querySelector(`.qty-input[data-id="${id}"]`);
                const val = parseInt(input.value) || 0;
                input.value = val + 1;
            }

            if (addBtn) {
                const name = addBtn.dataset.name;
                const id = addBtn.dataset.id;
                // ALWAYS use BRL price from data attribute — NEVER from displayed value
                const brlPrice = parseFloat(addBtn.dataset.priceBrl) || parseFloat(addBtn.dataset.price);
                const input = document.querySelector(`.qty-input[data-id="${id}"]`);
                const qty = parseInt(input.value) || 0;
                
                // GUARD: block addition with invalid price
                if (!brlPrice || brlPrice <= 0) {
                    console.error('[CART] BLOCKED: produto sem preço válido', { name, brlPrice });
                    showToast('Erro: preço do produto não encontrado.');
                    return;
                }
                console.log('[CART] CLICK ADD BTN', { name, id, brlPrice, qty });
                addToCart(name, brlPrice, qty);

                // Visual feedback
                addBtn.classList.add('added');
                addBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Adicionado!
                `;
                setTimeout(() => {
                    addBtn.classList.remove('added');
                    addBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        Adicionar
                    `;
                }, 1500);
            }
        });

        // Cart toggle
        document.getElementById('cart-float-btn').addEventListener('click', () => {
            if (cartVisible) hideCart(); else showCart();
        });

        document.getElementById('cart-close').addEventListener('click', hideCart);
        document.getElementById('cart-overlay').addEventListener('click', hideCart);

        // Checkout
        document.getElementById('btn-checkout').addEventListener('click', checkout);

        // Copy USDT
        const copyBtn = document.getElementById('btn-copy-usdt');
        if (copyBtn) {
            copyBtn.addEventListener('click', copyUSDTAddress);
        }

        // Nav cart link
        const navCart = document.getElementById('nav-cart-link');
        if (navCart) {
            navCart.addEventListener('click', (e) => {
                e.preventDefault();
                showCart();
            });
        }
    }

    // =============================================
    // 11. CREDIT CARD CHECKOUT (ASAAS)
    // =============================================
    const CC_SURCHARGE = 0.05; // 5%

    function createCCModal() {
        const modal = document.createElement('div');
        modal.id = 'cc-modal-overlay';
        modal.innerHTML = `
            <div class="cc-modal">
                <div class="cc-modal-header">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        Pagamento com Cartão
                    </h3>
                    <button class="cc-modal-close" id="cc-modal-close">✕</button>
                </div>
                <div class="cc-modal-body">
                    <!-- FORM -->
                    <div id="cc-form-view">
                        <div class="cc-modal-total">
                            <span class="cc-modal-total-label">Total com cartão</span>
                            <div>
                                <span class="cc-modal-total-original" id="cc-total-original"></span>
                                <span class="cc-modal-total-value" id="cc-total-value"></span>
                            </div>
                        </div>
                        <div class="cc-surcharge-note">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            <span>Acréscimo de 5% referente às taxas operacionais do cartão.</span>
                        </div>

                        <div class="cc-form-section">
                            <div class="cc-form-section-title">Dados Pessoais</div>
                            <div class="cc-form-row full">
                                <div class="cc-field">
                                    <label>Nome completo</label>
                                    <input type="text" id="cc-name" placeholder="Nome como no cartão" required>
                                </div>
                            </div>
                            <div class="cc-form-row">
                                <div class="cc-field">
                                    <label>CPF / CNPJ</label>
                                    <input type="text" id="cc-cpf" placeholder="000.000.000-00" required>
                                </div>
                                <div class="cc-field">
                                    <label>E-mail</label>
                                    <input type="email" id="cc-email" placeholder="seu@email.com" required>
                                </div>
                            </div>
                            <div class="cc-form-row">
                                <div class="cc-field">
                                    <label>Telefone</label>
                                    <input type="text" id="cc-phone" placeholder="(00) 00000-0000">
                                </div>
                                <div class="cc-field">
                                    <label>CEP</label>
                                    <input type="text" id="cc-cep" placeholder="00000-000" required>
                                </div>
                            </div>
                            <div class="cc-form-row full">
                                <div class="cc-field">
                                    <label>Número do endereço</label>
                                    <input type="text" id="cc-address-number" placeholder="123" required>
                                </div>
                            </div>
                        </div>

                        <div class="cc-form-section">
                            <div class="cc-form-section-title">Dados do Cartão</div>
                            <div class="cc-form-row full">
                                <div class="cc-field">
                                    <label>Número do cartão</label>
                                    <input type="text" id="cc-card-number" placeholder="0000 0000 0000 0000" maxlength="19" required>
                                </div>
                            </div>
                            <div class="cc-form-row triple">
                                <div class="cc-field">
                                    <label>Mês (MM)</label>
                                    <input type="text" id="cc-expiry-month" placeholder="MM" maxlength="2" required>
                                </div>
                                <div class="cc-field">
                                    <label>Ano (AAAA)</label>
                                    <input type="text" id="cc-expiry-year" placeholder="AAAA" maxlength="4" required>
                                </div>
                                <div class="cc-field">
                                    <label>CVV</label>
                                    <input type="text" id="cc-cvv" placeholder="000" maxlength="4" required>
                                </div>
                            </div>
                        </div>

                        <button class="btn-submit-cc" id="btn-submit-cc">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Pagar Agora
                        </button>
                    </div>

                    <!-- LOADING -->
                    <div class="cc-loading" id="cc-loading-view">
                        <div class="cc-spinner"></div>
                        <p>Processando pagamento...</p>
                        <span>Aguarde, estamos validando seu cartão.</span>
                    </div>

                    <!-- RESULT -->
                    <div class="cc-result" id="cc-result-view">
                        <div class="cc-result-icon" id="cc-result-icon"></div>
                        <h4 id="cc-result-title"></h4>
                        <p id="cc-result-message"></p>
                        <button class="btn-cc-close-result" id="btn-cc-close-result">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function openCCModal() {
        if (cart.length === 0) {
            showToast('Adicione produtos ao pedido primeiro!');
            return;
        }

        const total = getCartTotal();
        const totalWithSurcharge = Math.round(total * (1 + CC_SURCHARGE) * 100) / 100;

        document.getElementById('cc-total-original').textContent = formatBRL(total);
        document.getElementById('cc-total-value').textContent = formatBRL(totalWithSurcharge);

        // Reset views
        document.getElementById('cc-form-view').style.display = 'block';
        document.getElementById('cc-loading-view').classList.remove('show');
        document.getElementById('cc-result-view').classList.remove('show');

        document.getElementById('cc-modal-overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCCModal() {
        document.getElementById('cc-modal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }

    function formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value.substring(0, 19);
    }

    async function submitCCPayment() {
        // Gather form data
        const name = document.getElementById('cc-name').value.trim();
        const cpf = document.getElementById('cc-cpf').value.trim();
        const email = document.getElementById('cc-email').value.trim();
        const phone = document.getElementById('cc-phone').value.trim();
        const cep = document.getElementById('cc-cep').value.trim();
        const addressNumber = document.getElementById('cc-address-number').value.trim();
        const cardNumber = document.getElementById('cc-card-number').value.trim();
        const expiryMonth = document.getElementById('cc-expiry-month').value.trim();
        const expiryYear = document.getElementById('cc-expiry-year').value.trim();
        const cvv = document.getElementById('cc-cvv').value.trim();

        // Validate
        if (!name || !cpf || !email || !cep || !addressNumber || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
            showToast('Preencha todos os campos obrigatórios.');
            return;
        }

        const total = getCartTotal();
        const totalWithSurcharge = Math.round(total * (1 + CC_SURCHARGE) * 100) / 100;

        // Show loading
        document.getElementById('cc-form-view').style.display = 'none';
        document.getElementById('cc-loading-view').classList.add('show');
        document.getElementById('btn-submit-cc').disabled = true;

        try {
            // Step 1: Create customer
            const customerRes = await fetch('/api/asaas/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, cpfCnpj: cpf, email, mobilePhone: phone })
            });
            const customerData = await customerRes.json();

            if (!customerData.success) {
                throw new Error(customerData.error || 'Erro ao criar cliente.');
            }

            // Step 2: Create payment
            const description = cart.map(i => `${i.name} x${i.qty}`).join(', ');

            const paymentRes = await fetch('/api/asaas/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customerData.customer.id,
                    value: totalWithSurcharge,
                    description: `Compra VERSATIL GAMA INDUSTRIAL: ${description}`,
                    creditCard: {
                        holderName: name,
                        number: cardNumber,
                        expiryMonth,
                        expiryYear,
                        ccv: cvv
                    },
                    creditCardHolderInfo: {
                        name,
                        email,
                        cpfCnpj: cpf,
                        postalCode: cep,
                        addressNumber,
                        phone
                    }
                })
            });
            const paymentData = await paymentRes.json();

            // Show result
            document.getElementById('cc-loading-view').classList.remove('show');
            document.getElementById('cc-result-view').classList.add('show');

            if (paymentData.success && paymentData.approved) {
                document.getElementById('cc-result-icon').className = 'cc-result-icon success';
                document.getElementById('cc-result-icon').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
                document.getElementById('cc-result-title').textContent = 'Pagamento Aprovado!';
                document.getElementById('cc-result-message').textContent = `Pagamento de ${formatBRL(totalWithSurcharge)} processado com sucesso. ID: ${paymentData.paymentId}`;
                cart = [];
                updateCartUI();
            } else if (paymentData.success && paymentData.status === 'PENDING') {
                document.getElementById('cc-result-icon').className = 'cc-result-icon success';
                document.getElementById('cc-result-icon').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
                document.getElementById('cc-result-title').textContent = 'Em Processamento';
                document.getElementById('cc-result-message').textContent = paymentData.message;
            } else {
                throw new Error(paymentData.error || paymentData.message || 'Pagamento não aprovado.');
            }

        } catch (err) {
            document.getElementById('cc-loading-view').classList.remove('show');
            document.getElementById('cc-result-view').classList.add('show');
            document.getElementById('cc-result-icon').className = 'cc-result-icon error';
            document.getElementById('cc-result-icon').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            document.getElementById('cc-result-title').textContent = 'Pagamento Não Aprovado';
            document.getElementById('cc-result-message').textContent = err.message || 'Ocorreu um erro ao processar o pagamento. Tente novamente.';
        }

        document.getElementById('btn-submit-cc').disabled = false;
    }

    function bindCCEvents() {
        // Open modal from payment section button
        const payBtn = document.getElementById('btn-pay-cc');
        if (payBtn) {
            payBtn.addEventListener('click', openCCModal);
        }

        // Close modal
        document.getElementById('cc-modal-close').addEventListener('click', closeCCModal);
        document.getElementById('cc-modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeCCModal();
        });

        // Submit
        document.getElementById('btn-submit-cc').addEventListener('click', submitCCPayment);

        // Close result
        document.getElementById('btn-cc-close-result').addEventListener('click', closeCCModal);

        // Format card number
        document.getElementById('cc-card-number').addEventListener('input', function () {
            formatCardNumber(this);
        });
    }

    // =============================================
    // EXPOSE GLOBAL HELPERS (for inline handlers in cart)
    // =============================================
    window.__cartQtyChange = function (name, delta) {
        const item = cart.find(i => i.name === name);
        if (item) {
            const newQty = item.qty + delta;
            if (newQty <= 0) {
                removeFromCart(name);
            } else {
                item.qty = newQty;
                saveCart();
                updateCartUI();
            }
        }
    };

    window.__cartQtyUpdate = function (name, val) {
        updateCartQty(name, val);
    };

    window.__cartRemove = function (name) {
        removeFromCart(name);
    };

    // Expose for checkout.js
    window.__getCart = function () { return cart; };
    window.__formatBRL = formatBRL;
    window.__showToast = showToast;
    window.__clearCart = function () {
        cart = [];
        saveCart();
        updateCartUI();
    };

    // =============================================
    // INIT
    // =============================================
    document.addEventListener('DOMContentLoaded', function () {
        loadCart();
        injectProductControls();
        createCartUI();
        createCCModal();
        bindEvents();
        bindCCEvents();
        updateCartUI();
    });

})();
