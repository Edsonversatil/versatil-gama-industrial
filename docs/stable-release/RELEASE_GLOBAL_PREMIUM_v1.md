# VERSATIL SERVICES — RELEASE OFICIAL GLOBAL PREMIUM v1
## Plataforma Internacional Premium B2B Enterprise

---

## 🏷️ Identificação da Release

| Item | Valor |
|---|---|
| **Versão** | VERSATIL_GLOBAL_PREMIUM_v1 |
| **Branch** | `stable/global-premium-v1` |
| **Tag Principal** | `VERSATIL_GLOBAL_PREMIUM_v1` |
| **Tag Secundária** | `VERSATIL_PREMIUM_GLOBAL_STABLE_v1` |
| **Data** | 2026-05-24 |
| **Status** | ✅ STABLE — Production Ready |
| **Repositório** | https://github.com/Edsonversatil/versatil-gama-industrial |

---

## 🌍 Idiomas e Internacionalização

| Código | Idioma | Direção | Fonte | Status |
|---|---|---|---|---|
| `pt` | Português (Brasil) | LTR | Inter | ✅ 100% |
| `en` | English (US) | LTR | Inter | ✅ 100% |
| `es` | Español | LTR | Inter | ✅ 100% |
| `ar` | العربية | **RTL** | **Cairo** (dinâmico) | ✅ 100% |

**Total de chaves traduzidas:** ~1.551 definições em i18n.js  
**Cobertura:** 100% de todas as chaves usadas nos HTMLs

---

## ✅ Checklist de Qualidade

### i18n
- [x] Zero chaves expostas na interface (NAV.PRODUTOS / NAV.PAGAMENTO eliminadas)
- [x] `tagElements()` legado corrigido — não sobrescreve `data-i18n` do HTML
- [x] 18 chaves de setores corrigidas (petroquímica, refinarias, naval, etc.)
- [x] `contact.comercial` traduzido nos 4 idiomas
- [x] `solicitar.html` — 32 chaves `sol.*` em PT/EN/ES/AR
- [x] `historia.*` — 9 chaves em PT/EN/ES/AR

### RTL Árabe
- [x] `dir="rtl"` aplicado no `<html>` via JavaScript
- [x] Fonte Cairo carregada dinamicamente ao selecionar AR
- [x] Seletor de bandeiras protegido com `dir="ltr"` (não inverte)
- [x] 26+ regras CSS RTL em style.css
- [x] Formulário `solicitar.html` 100% RTL compatível
- [x] `historia-valores` inverte borda esquerda → direita no RTL

### Homepage Premium
- [x] Seção "História" → "Global Engineering Group"
- [x] Eyebrow "Fundada em 2002" (badge premium)
- [x] 5 parágrafos institucionais B2B enterprise
- [x] Card Dubai/DMCC removido (empresa inativa)
- [x] Contador: **1067+** projetos executados
- [x] **3 continentes** (Brasil, Europa, Oriente Médio)
- [x] Valores: Planejamento · Segurança · Qualidade · Performance · Confiabilidade

### Navbar
- [x] Todos os links com `data-i18n` corretos
- [x] Seletor de idioma com bandeiras reais (flagcdn.com)
- [x] Mobile menu (hambúrguer) funcional
- [x] `nav-actions` com `dir="ltr"` (protege seletor RTL)

### PWA
- [x] service-worker.js ativo
- [x] manifest.json configurado
- [x] Apple mobile web app ready

---

## 🏗️ Stack Técnica

| Componente | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + Vanilla JS |
| i18n Engine | i18n.js customizado (TRANSLATIONS object) |
| Backend | Node.js + Express (server.js) |
| Banco de dados | SQLite via db.js |
| Deploy | Vercel (vercel.json) |
| PWA | service-worker.js + manifest.json |
| Fontes LTR | Inter (Google Fonts — pré-carregada) |
| Fonte RTL | Cairo (Google Fonts — carregada ao ativar AR) |
| Flags | flagcdn.com/w40/{code}.png |

---

## 🔄 Rollback

### Opção 1 — Branch estável
```bash
git checkout stable/global-premium-v1
```

### Opção 2 — Tag exata
```bash
git checkout VERSATIL_GLOBAL_PREMIUM_v1
```

### Opção 3 — Tag anterior (pré-NAV fix)
```bash
git checkout VERSATIL_PREMIUM_GLOBAL_STABLE_v1
```

### Opção 4 — Estado pré-internacionalização
```bash
git checkout backup-pre-global-update
```

---

## 📊 Histórico de Branches

| Branch | Propósito | Status |
|---|---|---|
| `master` | Estado original | Preservado |
| `feature/global-institutional-i18n` | Branch de desenvolvimento | Preservado |
| `stable/global-premium-v1` | **Release oficial v1** | ✅ **ATUAL** |
| `backup-estavel-v1` | Backup anterior | Preservado |

---

## 📞 Contatos Configurados

| Canal | Valor |
|---|---|
| WhatsApp Brasil | +55 (13) 99150-9140 |
| Email Técnico | dp.tecnico@versatilservices.com.br |
| Email Comercial | comercial@versatilservices.com.br |
| España | +34 637 12 04 28 |

---

## 🎯 Posicionamento Institucional Alcançado

> A VERSATIL SERVICES transmite:  
> **Grupo Industrial Internacional · Engenharia Pesada Premium · Parceiro Estratégico Global**  
> Preparada para contratos no Brasil, EUA, Oriente Médio e mercados internacionais.
