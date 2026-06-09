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
        "menu.sair": "Sair do Sistema",
        // Cabeçalho e Métricas
        "header.title": "Painel Executivo Geral",
        "header.subtitle": "Métricas estratégicas e controle global do Ecossistema CRM.",
        "header.btn_atualizar": "Atualizar Base",
        "header.btn_novo": "Novo Prospect",
        "stat.total": "Total Clientes",
        "stat.total_sub": "da base física indexada",
        "stat.novos": "Novos Clientes",
        "stat.novos_sub": "Adicionados via CRM",
        "stat.prio_a": "Clientes Prioridade A",
        "stat.prio_a_sub": "Petróleo, Celulose & Mineração",
        "stat.contatar": "A Contatar (30 dias)",
        "stat.contatar_sub": "Paradas planejadas mapeadas"
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
        "menu.sair": "Log Out",
        "header.title": "General Executive Dashboard",
        "header.subtitle": "Strategic metrics and global control of the CRM Ecosystem.",
        "header.btn_atualizar": "Refresh DB",
        "header.btn_novo": "New Prospect",
        "stat.total": "Total Customers",
        "stat.total_sub": "of physical base indexed",
        "stat.novos": "New Customers",
        "stat.novos_sub": "Added via CRM",
        "stat.prio_a": "Priority A Customers",
        "stat.prio_a_sub": "Oil, Pulp & Mining",
        "stat.contatar": "To Contact (30 days)",
        "stat.contatar_sub": "Planned shutdowns mapped"
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
        "menu.sair": "Cerrar sesión",
        "header.title": "Panel Ejecutivo General",
        "header.subtitle": "Métricas estratégicas y control global del Ecosistema CRM.",
        "header.btn_atualizar": "Actualizar Base",
        "header.btn_novo": "Nuevo Prospecto",
        "stat.total": "Total Clientes",
        "stat.total_sub": "de la base física indexada",
        "stat.novos": "Nuevos Clientes",
        "stat.novos_sub": "Añadidos vía CRM",
        "stat.prio_a": "Clientes Prioridad A",
        "stat.prio_a_sub": "Petróleo, Celulosa y Minería",
        "stat.contatar": "A Contactar (30 días)",
        "stat.contatar_sub": "Paradas planificadas mapeadas"
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
        "menu.sair": "تسجيل الخروج",
        "header.title": "لوحة القيادة التنفيذية",
        "header.subtitle": "المقاييس الاستراتيجية والتحكم العالمي في نظام CRM.",
        "header.btn_atualizar": "تحديث القاعدة",
        "header.btn_novo": "عميل جديد",
        "stat.total": "إجمالي العملاء",
        "stat.total_sub": "من القاعدة المادية المفهرسة",
        "stat.novos": "العملاء الجدد",
        "stat.novos_sub": "أضيف عبر CRM",
        "stat.prio_a": "عملاء الأولوية أ",
        "stat.prio_a_sub": "النفط، اللب، والتعدين",
        "stat.contatar": "للاتصال (30 يومًا)",
        "stat.contatar_sub": "تم تعيين فترات التوقف المخطط لها"
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
            flag.style.color = 'var(--white)';
            flag.style.border = '2px solid var(--gold)';
        } else {
            flag.style.color = 'var(--text-muted)';
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
