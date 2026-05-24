# VERSATIL SERVICES — STABLE RELEASE v1
## Global Premium International Platform

---

## Release Info

| Item | Valor |
|---|---|
| **Versão** | VERSATIL_PREMIUM_GLOBAL_STABLE_v1 |
| **Branch** | `stable/global-premium-v1` |
| **Tag** | `VERSATIL_PREMIUM_GLOBAL_STABLE_v1` |
| **Data** | 2026-05-24 |
| **Status** | ✅ STABLE — Production Ready |

---

## Stack

| Componente | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Backend | Node.js + Express |
| i18n | Sistema customizado (i18n.js) |
| Deploy | Vercel |
| PWA | service-worker.js + manifest.json |
| Banco | SQLite via db.js |
| Fonte PT/EN/ES | Inter (Google Fonts) |
| Fonte AR | Cairo (carregada dinamicamente) |

---

## Idiomas Suportados

| Código | Idioma | RTL | Status |
|---|---|---|---|
| `pt` | Português (Brasil) | ❌ LTR | ✅ Completo |
| `en` | English (US) | ❌ LTR | ✅ Completo |
| `es` | Español | ❌ LTR | ✅ Completo |
| `ar` | العربية | ✅ RTL | ✅ Completo |

---

## Cobertura de Tradução

| Seção | Chaves | Status |
|---|---|---|
| Navbar | 7 | ✅ |
| Hero | 3 | ✅ |
| História | 9 | ✅ |
| Setores | 30+ | ✅ |
| Serviços | 50+ | ✅ |
| Equipamentos | 12 | ✅ |
| Galeria | 14 | ✅ |
| Números | 6 | ✅ |
| Presença Global | 5 | ✅ |
| Contato | 8 | ✅ |
| Footer | 2 | ✅ |
| Solicitar | 32 | ✅ |
| **Total** | **~1.551 definições** | **✅** |

---

## Funcionalidades Estáveis

- ✅ Troca de idioma instantânea (sem reload)
- ✅ Persistência em localStorage
- ✅ Seletor de idioma com bandeiras reais (flagcdn.com)
- ✅ RTL árabe: `dir="rtl"` no `<html>`
- ✅ Seletor de bandeiras protegido com `dir="ltr"` (não inverte)
- ✅ Fonte Cairo carregada dinamicamente para árabe
- ✅ `<title>` traduzível via `data-i18n-title`
- ✅ `placeholder` traduzível via `data-i18n-placeholder`
- ✅ 26 regras CSS RTL para todos os componentes
- ✅ PWA funcional (service-worker + manifest)
- ✅ Backend Express com APIs de proposta e email
- ✅ Área técnica com PIN protegido
- ✅ Formulário de solicitação multilíngue

---

## Posicionamento Institucional

| Antes | Depois |
|---|---|
| "História" | "Global Engineering Group" |
| "Clientes Atendidos" | Removido |
| "Solicitar Serviço" | "Solicitar Cotação / Request Quotation" |
| "Contato" | "Contact Us" (EN) |
| Card Dubai DMCC | Removido |
| 589 projetos | **1067+ Projetos** |
| 2 parágrafos | **5 parágrafos institucionais** |

---

## Rollback

```bash
# Voltar para este estado estável exato
git checkout stable/global-premium-v1

# Ou via tag
git checkout VERSATIL_PREMIUM_GLOBAL_STABLE_v1

# Ver todas as branches
git branch -a

# Ver todas as tags
git tag -l
```

## Branches disponíveis

| Branch | Descrição |
|---|---|
| `main` | Estado original pré-internacionalização |
| `feature/global-institutional-i18n` | Branch de desenvolvimento |
| `stable/global-premium-v1` | **Branch estável atual** ✅ |
