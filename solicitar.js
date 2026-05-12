/* =============================================
   VERSÁTIL SERVICES — Lógica de Solicitação
   Formulário + IndexedDB + WhatsApp + Email
   ============================================= */

// Arquivos anexados (em memória)
let anexos = [];

// =============================================
// INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Foto via câmera
    document.getElementById('inputFoto').addEventListener('change', handleFiles);
    // Arquivo via seletor
    document.getElementById('inputArquivo').addEventListener('change', handleFiles);
    // Botões
    document.getElementById('btnSalvar').addEventListener('click', salvarRascunho);
    document.getElementById('btnEnviarWA').addEventListener('click', enviarWhatsApp);
    document.getElementById('btnEnviarEmail').addEventListener('click', enviarEmail);
    // Carregar rascunhos existentes
    carregarRascunhos();
});

// =============================================
// GERENCIAMENTO DE ARQUIVOS
// =============================================
function handleFiles(e) {
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            anexos.push({
                nome: file.name,
                tipo: file.type,
                tamanho: file.size,
                dataUrl: ev.target.result
            });
            renderPreviews();
        };
        reader.readAsDataURL(file);
    });

    // Limpar input para permitir re-seleção
    e.target.value = '';
}

function renderPreviews() {
    const container = document.getElementById('previewAnexos');
    container.innerHTML = '';

    anexos.forEach((anexo, index) => {
        const div = document.createElement('div');
        div.className = 'preview-item';

        if (anexo.tipo.startsWith('image/')) {
            div.innerHTML = `
                <img src="${anexo.dataUrl}" alt="${anexo.nome}">
                <button class="preview-remove" onclick="removerAnexo(${index})">✕</button>
            `;
        } else {
            div.innerHTML = `
                <div class="file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <span>${anexo.nome}</span>
                </div>
                <button class="preview-remove" onclick="removerAnexo(${index})">✕</button>
            `;
        }

        container.appendChild(div);
    });
}

function removerAnexo(index) {
    anexos.splice(index, 1);
    renderPreviews();
}

// =============================================
// COLETA DE DADOS DO FORMULÁRIO
// =============================================
function coletarDados() {
    const tipoSelect = document.getElementById('tipoServico');
    const urgenciaSelect = document.getElementById('urgencia');

    return {
        empresa: document.getElementById('empresa').value.trim(),
        responsavel: document.getElementById('responsavel').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        email: document.getElementById('email').value.trim(),
        tipoServico: tipoSelect.value,
        tipoServicoTexto: tipoSelect.options[tipoSelect.selectedIndex]?.text || '',
        descricao: document.getElementById('descricao').value.trim(),
        urgencia: urgenciaSelect.value,
        urgenciaTexto: urgenciaSelect.options[urgenciaSelect.selectedIndex]?.text || '',
        observacoes: document.getElementById('observacoes').value.trim(),
        anexos: anexos.length,
        criadoEm: new Date().toISOString()
    };
}

function validarFormulario() {
    const dados = coletarDados();
    if (!dados.empresa) { mostrarToast('Informe a empresa', 'error'); return null; }
    if (!dados.responsavel) { mostrarToast('Informe o responsável', 'error'); return null; }
    if (!dados.telefone) { mostrarToast('Informe o WhatsApp', 'error'); return null; }
    if (!dados.tipoServico) { mostrarToast('Selecione o tipo de serviço', 'error'); return null; }
    if (!dados.descricao) { mostrarToast('Descreva a necessidade', 'error'); return null; }
    return dados;
}

// =============================================
// SALVAR RASCUNHO (IndexedDB)
// =============================================
async function salvarRascunho() {
    const dados = coletarDados();
    if (!dados.empresa && !dados.descricao) {
        mostrarToast('Preencha pelo menos empresa ou descrição', 'error');
        return;
    }

    dados.status = 'rascunho';
    // Salvar anexos como parte dos dados
    dados.anexosData = [...anexos];

    try {
        await salvarSolicitacao(dados);
        mostrarToast('✓ Rascunho salvo com sucesso!', 'success');
        carregarRascunhos();
    } catch (err) {
        mostrarToast('Erro ao salvar: ' + err.message, 'error');
    }
}

// =============================================
// CARREGAR RASCUNHOS
// =============================================
async function carregarRascunhos() {
    const section = document.getElementById('rascunhosSection');
    const lista = document.getElementById('listaRascunhos');

    try {
        const rascunhos = await listarSolicitacoes('rascunho');

        if (rascunhos.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        lista.innerHTML = '';

        rascunhos.forEach(r => {
            const data = new Date(r.criadoEm).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: '2-digit',
                hour: '2-digit', minute: '2-digit'
            });

            const card = document.createElement('div');
            card.className = 'rascunho-card';
            card.innerHTML = `
                <div class="rascunho-info">
                    <h4>${r.empresa || 'Sem empresa'} — ${r.tipoServicoTexto || 'Serviço não definido'}</h4>
                    <p>${data} · ${r.anexos || 0} anexo(s)</p>
                </div>
                <div class="rascunho-actions">
                    <button class="btn-carregar" onclick="carregarRascunho(${r.id})">Abrir</button>
                    <button class="btn-excluir" onclick="deletarRascunho(${r.id})">Excluir</button>
                </div>
            `;
            lista.appendChild(card);
        });
    } catch (err) {
        console.error('Erro ao carregar rascunhos:', err);
    }
}

async function carregarRascunho(id) {
    try {
        const r = await buscarSolicitacao(id);
        if (!r) return;

        document.getElementById('empresa').value = r.empresa || '';
        document.getElementById('responsavel').value = r.responsavel || '';
        document.getElementById('telefone').value = r.telefone || '';
        document.getElementById('email').value = r.email || '';
        document.getElementById('tipoServico').value = r.tipoServico || '';
        document.getElementById('descricao').value = r.descricao || '';
        document.getElementById('urgencia').value = r.urgencia || 'programada';
        document.getElementById('observacoes').value = r.observacoes || '';

        // Restaurar anexos
        if (r.anexosData) {
            anexos = [...r.anexosData];
            renderPreviews();
        }

        mostrarToast('Rascunho carregado', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        mostrarToast('Erro ao carregar', 'error');
    }
}

async function deletarRascunho(id) {
    if (!confirm('Excluir este rascunho?')) return;
    try {
        await excluirSolicitacao(id);
        mostrarToast('Rascunho excluído', 'success');
        carregarRascunhos();
    } catch (err) {
        mostrarToast('Erro ao excluir', 'error');
    }
}

// =============================================
// ENVIAR VIA WHATSAPP
// =============================================
function enviarWhatsApp() {
    const dados = validarFormulario();
    if (!dados) return;

    const urgenciaEmoji = {
        'programada': '📅',
        'urgente': '⚡',
        'emergencia': '🚨'
    };

    const msg = [
        `${urgenciaEmoji[dados.urgencia] || ''} *SOLICITAÇÃO DE SERVIÇO*`,
        `━━━━━━━━━━━━━━━━━━`,
        ``,
        `*Empresa:* ${dados.empresa}`,
        `*Responsável:* ${dados.responsavel}`,
        `*WhatsApp:* ${dados.telefone}`,
        dados.email ? `*Email:* ${dados.email}` : '',
        ``,
        `*Serviço:* ${dados.tipoServicoTexto}`,
        `*Urgência:* ${dados.urgenciaTexto}`,
        ``,
        `*Descrição:*`,
        dados.descricao,
        dados.observacoes ? `\n*Observações:*\n${dados.observacoes}` : '',
        ``,
        anexos.length > 0 ? `📎 *${anexos.length} anexo(s)* — enviar na sequência` : '',
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `_Enviado via Versátil Services App_`
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/5513991509140?text=${encoded}`;

    window.open(url, '_blank');

    // Marcar como enviado
    marcarComoEnviado(dados);
    mostrarToast('Abrindo WhatsApp...', 'success');
}

// =============================================
// ENVIAR VIA EMAIL
// =============================================
function enviarEmail() {
    const dados = validarFormulario();
    if (!dados) return;

    const assunto = `[${dados.urgenciaTexto}] Solicitação de ${dados.tipoServicoTexto} — ${dados.empresa}`;

    const corpo = [
        `SOLICITAÇÃO DE SERVIÇO — VERSÁTIL SERVICES`,
        ``,
        `Empresa: ${dados.empresa}`,
        `Responsável: ${dados.responsavel}`,
        `WhatsApp: ${dados.telefone}`,
        `Email: ${dados.email || 'Não informado'}`,
        ``,
        `Serviço: ${dados.tipoServicoTexto}`,
        `Urgência: ${dados.urgenciaTexto}`,
        ``,
        `DESCRIÇÃO:`,
        dados.descricao,
        dados.observacoes ? `\nOBSERVAÇÕES:\n${dados.observacoes}` : '',
        ``,
        anexos.length > 0 ? `${anexos.length} anexo(s) a enviar separadamente.` : '',
    ].filter(Boolean).join('\n');

    const mailto = `mailto:dp.tecnico@versatilservices.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;

    marcarComoEnviado(dados);
    mostrarToast('Abrindo email...', 'success');
}

// =============================================
// MARCAR COMO ENVIADO
// =============================================
async function marcarComoEnviado(dados) {
    dados.status = 'enviado';
    dados.enviadoEm = new Date().toISOString();
    dados.anexosData = [...anexos];
    try {
        await salvarSolicitacao(dados);
        carregarRascunhos();
    } catch (err) {
        console.error('Erro ao marcar como enviado:', err);
    }
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function mostrarToast(msg, tipo = '') {
    // Remover toast existente
    const existente = document.querySelector('.toast');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remover após 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
