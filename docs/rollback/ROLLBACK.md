# ROLLBACK INSTRUCTIONS — VERSÁTIL SERVICES

## Snapshot Info
- **Branch de trabalho:** `feature/global-institutional-i18n`
- **Commit estável:** `backup-pre-global-update` (tag)
- **Data:** 2026-05-24

## Como fazer rollback completo

```bash
# Voltar ao estado estável imediato
git checkout main

# Ou restaurar exatamente o snapshot do backup
git checkout backup-pre-global-update

# Ver histórico de commits
git log --oneline -10
```

## Branch ativa
```bash
# Ver branch atual
git branch

# Voltar para main se necessário
git checkout main
```

## Dependências atuais
Ver `dependencies-backup.txt` na raiz do projeto.

## Stack do projeto
- **Runtime:** Node.js / Express
- **Frontend:** HTML + CSS + Vanilla JS
- **i18n:** `i18n.js` custom (PT/EN/ES/AR)
- **Deploy:** Vercel (`vercel.json`)
- **PWA:** `manifest.json` + `service-worker.js`

## Arquivos críticos
| Arquivo | Função |
|---|---|
| `index.html` | Landing page principal |
| `i18n.js` | Sistema multilíngue (146KB) |
| `style.css` | Design system + RTL |
| `server.js` | Backend Express |
| `vercel.json` | Configuração de deploy |
| `backup/i18n.js.bak` | Backup original do i18n |
| `backup/index.html.bak` | Backup original do index |
