/* =============================================
   VERSATIL GAMA INDUSTRIAL — i18n + Multi-Moeda
   Sistema de internacionalização e conversão
   NÃO altera lógica interna — apenas exibição
   ============================================= */

(function() {
    'use strict';

    // =============================================
    // 1. CONFIGURAÇÃO DE MOEDA
    // =============================================
    const EXCHANGE_RATE = 5.00; // 1 USD = 5 BRL (ajustável)

    const CURRENCY_CONFIG = {
        pt: { symbol: 'R$', code: 'BRL', rate: 1, locale: 'pt-BR', decimals: ',', thousands: '.' },
        en: { symbol: '$',  code: 'USD', rate: EXCHANGE_RATE, locale: 'en-US', decimals: '.', thousands: ',' },
        es: { symbol: '$',  code: 'USD', rate: EXCHANGE_RATE, locale: 'es-ES', decimals: '.', thousands: ',' }
    };

    // =============================================
    // 2. DICIONÁRIO DE TRADUÇÕES
    // =============================================
    const TRANSLATIONS = {
        pt: {
            // Navbar
            'nav.produtos': 'Produtos',
            'nav.pagamento': 'Pagamento',
            'nav.contato': 'Contato',
            'nav.pedido': 'Pedido',
            'nav.whatsapp': 'WhatsApp',

            // Hero
            'hero.badge': 'Abrasivos Industriais',
            'hero.title': 'VERSATIL GAMA INDUSTRIAL',
            'hero.sub': 'Alta performance em abrasivos industriais para aplicações exigentes',
            'hero.cta': 'Falar no WhatsApp agora',

            // Premium Section
            'premium.tag': '★ EXPORT QUALITY',
            'premium.title': 'Linha Premium para Exportação',
            'premium.desc': 'Superabrasivos e ferramentas de precisão para aplicações industriais críticas — alta performance, maior vida útil e redução de parada de máquina.',
            'premium.cta': 'Solicitar Cotação Premium',
            'premium.footer': 'Soluções de exportação com qualidade certificada para aplicações industriais críticas — atendimento técnico especializado.',
            'premium.g1': 'Rebolos Diamantados — Export Grade',
            'premium.g2': 'Rebolos CBN — Export Grade',
            'premium.g3': 'Cintas Abrasivas Industriais — Export Grade',
            'premium.g4': 'Discos Diamantados & Flap — Export Grade',
            'premium.g5': 'Dressadores Diamantados — Export Grade',
            'premium.g6': 'Pastas Diamantadas — Export Grade',

            // National catalog
            'catalog.tag': 'Catálogo',
            'catalog.title': 'Linha Completa de Produtos',
            'catalog.desc': 'Fornecemos soluções abrasivas para aplicações industriais leves e severas.',
            'catalog.g1': 'Discos Industriais',
            'catalog.g2': 'Lixas & Cintas Abrasivas',
            'catalog.g3': 'Abrasivos Especiais',

            // Catálogo Técnico
            'tech.tag': 'Catálogo Técnico',
            'tech.title': 'Linha Completa de Abrasivos Industriais',
            'tech.desc': 'Trabalhamos com uma linha completa de abrasivos industriais, atendendo operações de corte, desbaste, acabamento e polimento técnico.',
            'tech.cta': 'Solicitar Cotação',
            'tech.footer': 'Atuamos em parceria com grandes fabricantes mundiais, garantindo qualidade e desempenho para aplicações industriais exigentes.',

            // Specs
            'specs.tag': 'Técnico',
            'specs.title': 'Especificações',
            'specs.grains': 'Grãos disponíveis',
            'specs.sizes': 'Medidas',
            'specs.sizes.value': 'Sob demanda — consulte nossa equipe',
            'specs.note': 'Fornecemos soluções abrasivas para aplicações industriais leves e severas.',
            'specs.cta': 'Consultar especificações',

            // Diferenciais
            'diff.tag': 'Por que nos escolher',
            'diff.title': 'Nossos Diferenciais',
            'diff.dur': 'Alta Durabilidade',
            'diff.dur.desc': 'Materiais que resistem ao uso mais severo e contínuo.',
            'diff.prec': 'Precisão Industrial',
            'diff.prec.desc': 'Grãos rigorosamente calibrados para acabamentos perfeitos.',
            'diff.ent': 'Entrega Rápida',
            'diff.ent.desc': 'Logística ágil para sua produção não parar.',
            'diff.global': 'Atendimento Global',
            'diff.global.desc': 'Nacional e internacional, adaptado à sua demanda.',

            // Pagamento
            'pay.tag': 'Formas de Pagamento',
            'pay.title': 'Métodos de Pagamento',
            'pay.desc': 'Oferecemos diversas formas de pagamento para facilitar sua compra.',

            // Contato
            'contact.tag': 'Fale conosco',
            'contact.title': 'Entre em Contato',
            'contact.desc': 'Solicite seu orçamento agora e receba atendimento direto da nossa equipe comercial.',
            'contact.wa': 'WhatsApp',
            'contact.email.label': 'E-mail Comercial',
            'contact.loc.label': 'Localização',
            'contact.loc.value': 'Sorocaba/SP — Brasil',
            'contact.cta': 'Falar no WhatsApp agora',

            // Footer
            'footer.rights': '© 2002 Versatil Gama Industrial. Todos os direitos reservados.',
            'footer.loc': 'Sorocaba/SP — Brasil',

            // Cart/Controls
            'btn.adicionar': 'Adicionar',
            'btn.finalizar': 'Finalizar Pedido via WhatsApp',
            'cart.title': 'Seu Pedido',
            'cart.empty': 'Seu carrinho está vazio',
            'cart.empty.sub': 'Adicione produtos para começar seu pedido',
            'cart.total': 'TOTAL',

            // Currency notice
            'currency.notice': '',

            // Unit
            'unit': '/ un'
        },

        en: {
            'nav.produtos': 'Products',
            'nav.pagamento': 'Payment',
            'nav.contato': 'Contact',
            'nav.pedido': 'Order',
            'nav.whatsapp': 'WhatsApp',

            'hero.badge': 'Industrial Abrasives',
            'hero.title': 'VERSATIL GAMA INDUSTRIAL',
            'hero.sub': 'High-performance industrial abrasives for demanding applications',
            'hero.cta': 'Chat on WhatsApp',

            'premium.tag': '★ EXPORT QUALITY',
            'premium.title': 'Premium Export Line',
            'premium.desc': 'Superabrasives and precision tools for critical industrial applications — high performance, extended tool life and reduced machine downtime.',
            'premium.cta': 'Request Premium Quote',
            'premium.footer': 'Export-grade solutions with certified quality for critical industrial applications — specialized technical support.',
            'premium.g1': 'Diamond Grinding Wheels — Export Grade',
            'premium.g2': 'CBN Grinding Wheels — Export Grade',
            'premium.g3': 'Industrial Abrasive Belts — Export Grade',
            'premium.g4': 'Diamond & Flap Discs — Export Grade',
            'premium.g5': 'Diamond Dressers — Export Grade',
            'premium.g6': 'Diamond Pastes — Export Grade',

            'catalog.tag': 'Catalog',
            'catalog.title': 'Complete Product Line',
            'catalog.desc': 'We provide abrasive solutions for light and heavy industrial applications.',
            'catalog.g1': 'Industrial Discs',
            'catalog.g2': 'Sanding Sheets & Abrasive Belts',
            'catalog.g3': 'Specialty Abrasives',

            'tech.tag': 'Technical Catalog',
            'tech.title': 'Full Range of Industrial Abrasives',
            'tech.desc': 'We work with a complete line of industrial abrasives for cutting, grinding, finishing and technical polishing operations.',
            'tech.cta': 'Request Quote',
            'tech.footer': 'We partner with leading global manufacturers, ensuring quality and performance for demanding industrial applications.',

            'specs.tag': 'Technical',
            'specs.title': 'Specifications',
            'specs.grains': 'Available Grits',
            'specs.sizes': 'Dimensions',
            'specs.sizes.value': 'Custom sizes — contact our team',
            'specs.note': 'We provide abrasive solutions for light and heavy-duty industrial applications.',
            'specs.cta': 'Check specifications',

            'diff.tag': 'Why Choose Us',
            'diff.title': 'Our Advantages',
            'diff.dur': 'High Durability',
            'diff.dur.desc': 'Materials that withstand the most severe and continuous use.',
            'diff.prec': 'Industrial Precision',
            'diff.prec.desc': 'Rigorously calibrated grains for perfect finishes.',
            'diff.ent': 'Fast Delivery',
            'diff.ent.desc': 'Agile logistics to keep your production running.',
            'diff.global': 'Global Service',
            'diff.global.desc': 'National and international, tailored to your demand.',

            'pay.tag': 'Payment Methods',
            'pay.title': 'Payment Options',
            'pay.desc': 'We offer multiple payment methods for your convenience.',

            'contact.tag': 'Get In Touch',
            'contact.title': 'Contact Us',
            'contact.desc': 'Request your quote now and receive direct support from our sales team.',
            'contact.wa': 'WhatsApp',
            'contact.email.label': 'Commercial E-mail',
            'contact.loc.label': 'Location',
            'contact.loc.value': 'Sorocaba/SP — Brazil',
            'contact.cta': 'Chat on WhatsApp now',

            'footer.rights': '© 2002 Versatil Gama Industrial. All rights reserved.',
            'footer.loc': 'Sorocaba/SP — Brazil',

            'btn.adicionar': 'Add to Cart',
            'btn.finalizar': 'Complete Order via WhatsApp',
            'cart.title': 'Your Order',
            'cart.empty': 'Your cart is empty',
            'cart.empty.sub': 'Add products to start your order',
            'cart.total': 'TOTAL',

            'currency.notice': 'Prices for international customers are displayed in USD',

            'unit': '/ ea'
        },

        es: {
            'nav.produtos': 'Productos',
            'nav.pagamento': 'Pago',
            'nav.contato': 'Contacto',
            'nav.pedido': 'Pedido',
            'nav.whatsapp': 'WhatsApp',

            'hero.badge': 'Abrasivos Industriales',
            'hero.title': 'VERSATIL GAMA INDUSTRIAL',
            'hero.sub': 'Abrasivos industriales de alto rendimiento para aplicaciones exigentes',
            'hero.cta': 'Hablar por WhatsApp',

            'premium.tag': '★ EXPORT QUALITY',
            'premium.title': 'Línea Premium de Exportación',
            'premium.desc': 'Superabrasivos y herramientas de precisión para aplicaciones industriales críticas — alto rendimiento, mayor vida útil y reducción de paradas.',
            'premium.cta': 'Solicitar Cotización Premium',
            'premium.footer': 'Soluciones de exportación con calidad certificada para aplicaciones industriales críticas — soporte técnico especializado.',
            'premium.g1': 'Muelas Diamantadas — Export Grade',
            'premium.g2': 'Muelas CBN — Export Grade',
            'premium.g3': 'Cintas Abrasivas Industriales — Export Grade',
            'premium.g4': 'Discos Diamantados & Flap — Export Grade',
            'premium.g5': 'Rectificadores Diamantados — Export Grade',
            'premium.g6': 'Pastas Diamantadas — Export Grade',

            'catalog.tag': 'Catálogo',
            'catalog.title': 'Línea Completa de Productos',
            'catalog.desc': 'Proporcionamos soluciones abrasivas para aplicaciones industriales ligeras y severas.',
            'catalog.g1': 'Discos Industriales',
            'catalog.g2': 'Lijas y Cintas Abrasivas',
            'catalog.g3': 'Abrasivos Especiales',

            'tech.tag': 'Catálogo Técnico',
            'tech.title': 'Gama Completa de Abrasivos Industriales',
            'tech.desc': 'Trabajamos con una línea completa de abrasivos industriales para operaciones de corte, desbaste, acabado y pulido técnico.',
            'tech.cta': 'Solicitar Cotización',
            'tech.footer': 'Trabajamos en asociación con grandes fabricantes mundiales, garantizando calidad y rendimiento para aplicaciones industriales exigentes.',

            'specs.tag': 'Técnico',
            'specs.title': 'Especificaciones',
            'specs.grains': 'Granos disponibles',
            'specs.sizes': 'Medidas',
            'specs.sizes.value': 'Bajo demanda — consulte nuestro equipo',
            'specs.note': 'Proporcionamos soluciones abrasivas para aplicaciones industriales ligeras y severas.',
            'specs.cta': 'Consultar especificaciones',

            'diff.tag': 'Por qué elegirnos',
            'diff.title': 'Nuestros Diferenciales',
            'diff.dur': 'Alta Durabilidad',
            'diff.dur.desc': 'Materiales que resisten el uso más severo y continuo.',
            'diff.prec': 'Precisión Industrial',
            'diff.prec.desc': 'Granos rigurosamente calibrados para acabados perfectos.',
            'diff.ent': 'Entrega Rápida',
            'diff.ent.desc': 'Logística ágil para que su producción no pare.',
            'diff.global': 'Atención Global',
            'diff.global.desc': 'Nacional e internacional, adaptado a su demanda.',

            'pay.tag': 'Formas de Pago',
            'pay.title': 'Métodos de Pago',
            'pay.desc': 'Ofrecemos diversas formas de pago para facilitar su compra.',

            'contact.tag': 'Contáctenos',
            'contact.title': 'Contacto',
            'contact.desc': 'Solicite su presupuesto ahora y reciba atención directa de nuestro equipo comercial.',
            'contact.wa': 'WhatsApp',
            'contact.email.label': 'E-mail Comercial',
            'contact.loc.label': 'Ubicación',
            'contact.loc.value': 'Sorocaba/SP — Brasil',
            'contact.cta': 'Hablar por WhatsApp ahora',

            'footer.rights': '© 2002 Versatil Gama Industrial. Todos los derechos reservados.',
            'footer.loc': 'Sorocaba/SP — Brasil',

            'btn.adicionar': 'Agregar',
            'btn.finalizar': 'Finalizar Pedido por WhatsApp',
            'cart.title': 'Su Pedido',
            'cart.empty': 'Su carrito está vacío',
            'cart.empty.sub': 'Agregue productos para comenzar su pedido',
            'cart.total': 'TOTAL',

            'currency.notice': 'Los precios para clientes internacionales se muestran en USD',

            'unit': '/ un'
        }
    };

    // =============================================
    // 3. ESTADO
    // =============================================
    let currentLang = localStorage.getItem('vgi_lang') || 'pt';

    // =============================================
    // 4. FUNÇÕES DE MOEDA
    // =============================================
    function convertPrice(brlValue, lang) {
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;
        return brlValue / config.rate;
    }

    function formatPrice(brlValue, lang) {
        lang = lang || currentLang;
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;
        const converted = brlValue / config.rate;

        if (lang === 'pt') {
            return 'R$ ' + converted.toFixed(2).replace('.', ',');
        }
        return '$ ' + converted.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getCurrencySymbol(lang) {
        return (CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt).symbol;
    }

    // =============================================
    // 5. TRADUÇÃO DE TEXTOS
    // =============================================
    function t(key, lang) {
        lang = lang || currentLang;
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
        return dict[key] || TRANSLATIONS.pt[key] || key;
    }

    function applyTranslations(lang) {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = t(key, lang);
            if (text) el.textContent = text;
        });

        // Update HTML lang
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
    }

    // =============================================
    // 6. ATUALIZAR PREÇOS NA EXIBIÇÃO
    // =============================================
    function updateDisplayPrices(lang) {
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;

        // Update price prefixes (R$ → $)
        document.querySelectorAll('.product-price-prefix').forEach(el => {
            el.textContent = config.symbol;
        });

        // Update price input values
        document.querySelectorAll('.price-input').forEach(input => {
            const card = input.closest('.product-card');
            if (!card) return;
            const brlPrice = parseFloat(card.getAttribute('data-product-price'));
            if (isNaN(brlPrice)) return;
            const converted = brlPrice / config.rate;
            if (lang === 'pt') {
                input.value = converted.toFixed(2).replace('.', ',');
            } else {
                input.value = converted.toFixed(2);
            }
        });

        // Update unit labels
        document.querySelectorAll('.product-unit').forEach(el => {
            el.textContent = t('unit', lang);
        });

        // Update cart display
        updateCartDisplay(lang);

        // Show/hide currency notice
        const notice = document.getElementById('currency-notice');
        if (notice) {
            const text = t('currency.notice', lang);
            notice.textContent = text;
            notice.style.display = text ? 'block' : 'none';
        }
    }

    function updateCartDisplay(lang) {
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;

        // Cart item prices
        document.querySelectorAll('.cart-item-price').forEach(el => {
            const text = el.textContent;
            // Extract BRL value from existing text - look for data attribute instead
            const parentItem = el.closest('.cart-item');
            if (!parentItem) return;
        });

        // Cart total
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            const brlText = totalEl.textContent;
            const brlMatch = brlText.replace(/[^\d,\.]/g, '').replace(',', '.');
            const brlVal = parseFloat(brlMatch);
            if (!isNaN(brlVal)) {
                totalEl.textContent = formatPrice(brlVal, lang);
            }
        }
    }

    // =============================================
    // 7. INTERCEPT formatBRL em pedido.js
    // =============================================
    // Override formatBRL function to respect current language
    const _origInterval = setInterval(() => {
        // Wait for pedido.js to load, then patch
        if (document.querySelector('.product-card')) {
            clearInterval(_origInterval);
            patchPedidoSystem();
        }
    }, 200);

    function patchPedidoSystem() {
        // After pedido.js creates the controls, update prices for current language
        if (currentLang !== 'pt') {
            setTimeout(() => updateDisplayPrices(currentLang), 100);
        }
    }

    // =============================================
    // 8. OBSERVADOR DE MUDANÇAS NO CARRINHO
    // =============================================
    // Watch for cart UI updates to re-apply formatting
    const cartObserver = new MutationObserver((mutations) => {
        if (currentLang !== 'pt') {
            mutations.forEach(m => {
                if (m.target.id === 'cart-items' || m.target.id === 'cart-total') {
                    // Re-format cart values after pedido.js updates them
                    setTimeout(() => {
                        const config = CURRENCY_CONFIG[currentLang];
                        // Re-format cart prices
                        document.querySelectorAll('.cart-item-price').forEach(el => {
                            const raw = el.textContent;
                            const val = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
                            if (!isNaN(val)) {
                                el.textContent = formatPrice(val, currentLang) + ' ' + t('unit', currentLang);
                            }
                        });
                        document.querySelectorAll('.cart-item-subtotal').forEach(el => {
                            const raw = el.textContent;
                            const val = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
                            if (!isNaN(val)) {
                                el.textContent = formatPrice(val, currentLang);
                            }
                        });
                        const totalEl = document.getElementById('cart-total');
                        if (totalEl) {
                            const raw = totalEl.textContent;
                            const val = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
                            if (!isNaN(val)) {
                                totalEl.textContent = formatPrice(val, currentLang);
                            }
                        }
                    }, 50);
                }
            });
        }
    });

    // Start observer when DOM is ready
    function startCartObserver() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cartItems) cartObserver.observe(cartItems, { childList: true, characterData: true, subtree: true });
        if (cartTotal) cartObserver.observe(cartTotal, { childList: true, characterData: true, subtree: true });
    }

    // =============================================
    // 9. SWITCHER PRINCIPAL
    // =============================================
    function switchLanguage(lang) {
        if (!TRANSLATIONS[lang]) lang = 'pt';
        currentLang = lang;
        localStorage.setItem('vgi_lang', lang);

        // Apply translations
        applyTranslations(lang);

        // Update prices display
        updateDisplayPrices(lang);

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        console.log(`[i18n] Language changed to: ${lang} | Currency: ${CURRENCY_CONFIG[lang].symbol} (${CURRENCY_CONFIG[lang].code})`);
    }

    // =============================================
    // 10. CRIAR UI DO SELETOR
    // =============================================
    function createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.id = 'lang-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt" title="Português">
                <span class="lang-flag">🇧🇷</span>
                <span class="lang-code">PT</span>
            </button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">
                <span class="lang-flag">🇺🇸</span>
                <span class="lang-code">EN</span>
            </button>
            <button class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es" title="Español">
                <span class="lang-flag">🇪🇸</span>
                <span class="lang-code">ES</span>
            </button>
        `;

        // Insert into navbar
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.insertBefore(switcher, navActions.firstChild);
        }

        // Add click handlers
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                switchLanguage(btn.getAttribute('data-lang'));
            });
        });
    }

    // Currency notice banner
    function createCurrencyNotice() {
        const notice = document.createElement('div');
        notice.id = 'currency-notice';
        notice.className = 'currency-notice';
        notice.style.display = 'none';
        const hero = document.querySelector('.hero');
        if (hero && hero.nextElementSibling) {
            hero.parentNode.insertBefore(notice, hero.nextElementSibling);
        }
    }

    // =============================================
    // 11. INICIALIZAÇÃO
    // =============================================
    function init() {
        createLanguageSwitcher();
        createCurrencyNotice();

        // Add data-i18n attributes to existing elements
        tagElements();

        // Apply saved language
        if (currentLang !== 'pt') {
            switchLanguage(currentLang);
        }

        // Start cart observer after a delay (let pedido.js create the cart first)
        setTimeout(startCartObserver, 1500);
    }

    function tagElements() {
        // Navbar
        const navLinks = document.querySelectorAll('.nav-links a');
        if (navLinks[0]) navLinks[0].setAttribute('data-i18n', 'nav.produtos');
        if (navLinks[1]) navLinks[1].setAttribute('data-i18n', 'nav.pagamento');
        if (navLinks[2]) navLinks[2].setAttribute('data-i18n', 'nav.contato');

        // Nav buttons
        const navCartLink = document.getElementById('nav-cart-link');
        if (navCartLink) {
            const textNode = Array.from(navCartLink.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
            if (textNode) {
                const span = document.createElement('span');
                span.setAttribute('data-i18n', 'nav.pedido');
                span.textContent = textNode.textContent.trim();
                navCartLink.replaceChild(span, textNode);
            }
        }

        // Hero
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.setAttribute('data-i18n', 'hero.badge');

        const heroSub = document.querySelector('.hero-sub');
        if (heroSub) heroSub.setAttribute('data-i18n', 'hero.sub');

        const heroCta = document.querySelector('.hero .btn-primary');
        if (heroCta) {
            const textSpan = document.createElement('span');
            textSpan.setAttribute('data-i18n', 'hero.cta');
            textSpan.textContent = 'Falar no WhatsApp agora';
            const svg = heroCta.querySelector('svg');
            heroCta.textContent = '';
            if (svg) heroCta.appendChild(svg);
            heroCta.appendChild(document.createTextNode('\n                '));
            heroCta.appendChild(textSpan);
        }

        // Section headers - tag by position
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            const tag = header.querySelector('.section-tag');
            const h2 = header.querySelector('h2');
            const desc = header.querySelector('.section-desc');
            const tagText = tag ? tag.textContent.trim() : '';

            if (tagText === '★ EXPORT QUALITY') {
                if (tag) tag.setAttribute('data-i18n', 'premium.tag');
                if (h2) h2.setAttribute('data-i18n', 'premium.title');
                if (desc) desc.setAttribute('data-i18n', 'premium.desc');
            } else if (tagText === 'Catálogo' || tagText === 'Catalog') {
                if (tag) tag.setAttribute('data-i18n', 'catalog.tag');
                if (h2) h2.setAttribute('data-i18n', 'catalog.title');
                if (desc) desc.setAttribute('data-i18n', 'catalog.desc');
            } else if (tagText === 'Catálogo Técnico' || tagText === 'Technical Catalog') {
                if (tag) tag.setAttribute('data-i18n', 'tech.tag');
                if (h2) h2.setAttribute('data-i18n', 'tech.title');
                if (desc) desc.setAttribute('data-i18n', 'tech.desc');
            } else if (tagText === 'Técnico' || tagText === 'Technical') {
                if (tag) tag.setAttribute('data-i18n', 'specs.tag');
                if (h2) h2.setAttribute('data-i18n', 'specs.title');
            } else if (tagText === 'Por que nos escolher' || tagText === 'Why Choose Us') {
                if (tag) tag.setAttribute('data-i18n', 'diff.tag');
                if (h2) h2.setAttribute('data-i18n', 'diff.title');
            } else if (tagText === 'Formas de Pagamento' || tagText === 'Payment Methods') {
                if (tag) tag.setAttribute('data-i18n', 'pay.tag');
                if (h2) h2.setAttribute('data-i18n', 'pay.title');
                if (desc) desc.setAttribute('data-i18n', 'pay.desc');
            } else if (tagText === 'Fale conosco' || tagText === 'Get In Touch') {
                if (tag) tag.setAttribute('data-i18n', 'contact.tag');
                if (h2) h2.setAttribute('data-i18n', 'contact.title');
                if (desc) desc.setAttribute('data-i18n', 'contact.desc');
            }
        });

        // Diff cards
        const diffCards = document.querySelectorAll('.diff-card');
        const diffKeys = [
            ['diff.dur', 'diff.dur.desc'],
            ['diff.prec', 'diff.prec.desc'],
            ['diff.ent', 'diff.ent.desc'],
            ['diff.global', 'diff.global.desc']
        ];
        diffCards.forEach((card, i) => {
            if (diffKeys[i]) {
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.setAttribute('data-i18n', diffKeys[i][0]);
                if (p) p.setAttribute('data-i18n', diffKeys[i][1]);
            }
        });

        // Specs
        const specsLabel = document.querySelector('.specs-label');
        if (specsLabel) specsLabel.setAttribute('data-i18n', 'specs.grains');

        const specsNote = document.querySelector('.specs-note');
        if (specsNote) specsNote.setAttribute('data-i18n', 'specs.note');

        // Contact labels
        const contactLabels = document.querySelectorAll('.contact-label');
        const contactKeys = ['contact.wa', 'contact.email.label', 'contact.loc.label'];
        contactLabels.forEach((label, i) => {
            if (contactKeys[i]) label.setAttribute('data-i18n', contactKeys[i]);
        });

        // Footer
        const footerPs = document.querySelectorAll('footer p');
        if (footerPs[0]) footerPs[0].setAttribute('data-i18n', 'footer.rights');
        if (footerPs[1]) footerPs[1].setAttribute('data-i18n', 'footer.loc');

        // Group titles in premium section
        const groupTitles = document.querySelectorAll('.group-title');
        const premiumGroupKeys = [
            'premium.g1', 'premium.g2', 'premium.g3', 'premium.g4', 'premium.g5', 'premium.g6',
            'catalog.g1', 'catalog.g2', 'catalog.g3'
        ];
        let gIdx = 0;
        groupTitles.forEach(gt => {
            const text = gt.textContent.trim();
            if (text.includes('Export Grade') || text.includes('Rebolos Diamantados') && text.includes('Export')) {
                // Premium group titles
                if (gIdx < 6) {
                    const textNodes = Array.from(gt.childNodes).filter(n => n.nodeType === 3);
                    const lastText = textNodes[textNodes.length - 1];
                    if (lastText) {
                        const span = document.createElement('span');
                        span.setAttribute('data-i18n', premiumGroupKeys[gIdx]);
                        span.textContent = lastText.textContent.trim();
                        gt.replaceChild(span, lastText);
                    }
                    gIdx++;
                }
            }
        });
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.VGI_i18n = {
        switchLanguage,
        formatPrice,
        convertPrice,
        getCurrentLang: () => currentLang,
        getExchangeRate: () => EXCHANGE_RATE,
        t
    };

})();
