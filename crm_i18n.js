// =============================================
// VERSÁTIL CRM — Dicionário de Internacionalização
// =============================================

const CRM_I18N = {
    pt: {
        // Menu Lateral
        "menu.dashboard": "Painel Geral",
        "menu.clientes": "Fichas Comerciais",
        "menu.top100": "Top 100 Clientes",
        "menu.reativacao": "Reativação Comercial",
        "menu.vbot": "IA V-Bot Chat",
        "menu.novo_lead": "Capturar Novo Lead",
        "menu.campanha": "Campanha de Prospecção",
        "menu.equipe": "Gestão de Equipe",
        "menu.logado_como": "Logado como:",
        "menu.sair": "Sair do Sistema"
    },
    en: {
        "menu.dashboard": "General Dashboard",
        "menu.clientes": "Commercial Records",
        "menu.top100": "Top 100 Customers",
        "menu.reativacao": "Commercial Reactivation",
        "menu.vbot": "AI V-Bot Chat",
        "menu.novo_lead": "Capture New Lead",
        "menu.campanha": "Outreach Campaign",
        "menu.equipe": "Team Management",
        "menu.logado_como": "Logged in as:",
        "menu.sair": "Log Out"
    },
    es: {
        "menu.dashboard": "Panel General",
        "menu.clientes": "Fichas Comerciales",
        "menu.top100": "Top 100 Clientes",
        "menu.reativacao": "Reactivación Comercial",
        "menu.vbot": "IA V-Bot Chat",
        "menu.novo_lead": "Capturar Nuevo Lead",
        "menu.campanha": "Campaña de Prospección",
        "menu.equipe": "Gestión de Equipo",
        "menu.logado_como": "Conectado como:",
        "menu.sair": "Cerrar sesión"
    },
    ar: {
        "menu.dashboard": "لوحة القيادة العامة",
        "menu.clientes": "السجلات التجارية",
        "menu.top100": "أفضل 100 عميل",
        "menu.reativacao": "إعادة التنشيط التجاري",
        "menu.vbot": "دردشة V-Bot الذكية",
        "menu.novo_lead": "التقاط عميل جديد",
        "menu.campanha": "حملة التوعية",
        "menu.equipe": "إدارة الفريق",
        "menu.logado_como": "تسجيل الدخول باسم:",
        "menu.sair": "تسجيل الخروج"
    }
};

let currentCrmLang = localStorage.getItem('crm_lang') || 'pt';

function setCrmLanguage(lang) {
    if (!CRM_I18N[lang]) return;
    currentCrmLang = lang;
    localStorage.setItem('crm_lang', lang);
    applyCrmTranslations();
    
    // Atualizar visual das bandeiras
    document.querySelectorAll('.lang-flag').forEach(flag => {
        if (flag.getAttribute('data-lang') === lang) {
            flag.style.opacity = '1';
            flag.style.transform = 'scale(1.1)';
            flag.style.border = '2px solid var(--gold)';
        } else {
            flag.style.opacity = '0.5';
            flag.style.transform = 'scale(1)';
            flag.style.border = '2px solid transparent';
        }
    });

    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
}

function applyCrmTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    const dict = CRM_I18N[currentCrmLang];
    if (!dict) return;

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                const svg = el.querySelector('svg');
                if (svg) {
                    el.innerHTML = '';
                    el.appendChild(svg);
                    el.appendChild(document.createTextNode(' ' + dict[key]));
                } else {
                    el.textContent = dict[key];
                }
            }
        }
    });
}

// Inicializar idioma no carregamento
window.addEventListener('DOMContentLoaded', () => {
    setCrmLanguage(currentCrmLang);
});
