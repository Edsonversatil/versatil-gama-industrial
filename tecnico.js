/* =============================================
   VERSÁTIL SERVICES — Área Técnica
   O.S., Documentação Fotográfica, Relatório
   ============================================= */

const PIN_CORRETO = '2002';
let ordemAtualId = null;
let filtroAtual = 'todas';

// =============================================
// INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se já está autenticado nesta sessão
    if (sessionStorage.getItem('tecnicoAuth') === 'true') {
        entrar();
    }

    // PIN
    document.getElementById('btnPin').addEventListener('click', verificarPin);
    document.getElementById('pinInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verificarPin();
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => mostrarTab(tab.dataset.tab));
    });

    // Filtros
    document.querySelectorAll('.filtro').forEach(f => {
        f.addEventListener('click', () => {
            document.querySelectorAll('.filtro').forEach(b => b.classList.remove('active'));
            f.classList.add('active');
            filtroAtual = f.dataset.status;
            carregarOrdens();
        });
    });

    // Criar O.S.
    document.getElementById('btnCriarOS').addEventListener('click', criarOrdem);

    // Fotos técnicas
    document.querySelectorAll('.inputFotoTec').forEach(input => {
        input.addEventListener('change', handleFotoTecnica);
    });

    // Botões da O.S.
    document.getElementById('btnSalvarNotas').addEventListener('click', salvarNotas);
    document.getElementById('btnIniciarOS').addEventListener('click', () => mudarStatusOS('em_execucao'));
    document.getElementById('btnConcluirOS').addEventListener('click', () => mudarStatusOS('concluido'));
    document.getElementById('btnGerarRelatorio').addEventListener('click', gerarRelatorio);
    document.getElementById('btnEnviarRelatorio').addEventListener('click', enviarRelatorioWA);
});

// =============================================
// AUTENTICAÇÃO (PIN LOCAL)
// =============================================
function verificarPin() {
    const pin = document.getElementById('pinInput').value;
    if (pin === PIN_CORRETO) {
        sessionStorage.setItem('tecnicoAuth', 'true');
        entrar();
    } else {
        document.getElementById('pinErro').style.display = 'block';
        document.getElementById('pinInput').value = '';
        document.getElementById('pinInput').focus();
    }
}

function entrar() {
    document.getElementById('telaPin').style.display = 'none';
    document.getElementById('telaPrincipal').style.display = 'block';
    carregarOrdens();
}

// =============================================
// TABS
// =============================================
function mostrarTab(nome) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    if (nome === 'ordens') {
        document.getElementById('tabOrdens').style.display = 'block';
        document.querySelector('[data-tab="ordens"]').classList.add('active');
        carregarOrdens();
    } else if (nome === 'nova') {
        document.getElementById('tabNova').style.display = 'block';
        document.querySelector('[data-tab="nova"]').classList.add('active');
    }
}

function voltarLista() {
    document.getElementById('telaDocumentar').style.display = 'none';
    mostrarTab('ordens');
}

function voltarDocumentar() {
    document.getElementById('telaRelatorio').style.display = 'none';
    document.getElementById('telaDocumentar').style.display = 'block';
}

// =============================================
// ORDENS DE SERVIÇO
// =============================================
async function criarOrdem() {
    const tipoSelect = document.getElementById('osTipo');
    const cliente = document.getElementById('osCliente').value.trim();
    const descricao = document.getElementById('osDescricao').value.trim();
    const tecnico = document.getElementById('osTecnico').value.trim();

    if (!cliente || !tipoSelect.value || !descricao) {
        mostrarToast('Preencha os campos obrigatórios', 'error');
        return;
    }

    const dados = {
        cliente,
        tipoServico: tipoSelect.value,
        tipoServicoTexto: tipoSelect.options[tipoSelect.selectedIndex].text,
        descricao,
        tecnico,
        status: 'pendente',
        notas: ''
    };

    try {
        await salvarOrdem(dados);
        mostrarToast('✓ Ordem de Serviço criada!', 'success');
        // Limpar form
        document.getElementById('osCliente').value = '';
        document.getElementById('osTipo').value = '';
        document.getElementById('osDescricao').value = '';
        document.getElementById('osTecnico').value = '';
        mostrarTab('ordens');
    } catch (err) {
        mostrarToast('Erro ao criar O.S.', 'error');
    }
}

async function carregarOrdens() {
    const lista = document.getElementById('listaOrdens');
    const semOrdens = document.getElementById('semOrdens');

    try {
        let ordens;
        if (filtroAtual === 'todas') {
            ordens = await listarOrdens();
        } else {
            ordens = await listarOrdens(filtroAtual);
        }

        // Ordenar por data (mais recente primeiro)
        ordens.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

        if (ordens.length === 0) {
            lista.innerHTML = '';
            semOrdens.style.display = 'block';
            return;
        }

        semOrdens.style.display = 'none';
        lista.innerHTML = '';

        const statusConfig = {
            'pendente': { emoji: '🔴', label: 'Pendente', cor: '#ef4444' },
            'em_execucao': { emoji: '🟡', label: 'Em Execução', cor: '#f59e0b' },
            'concluido': { emoji: '🟢', label: 'Concluído', cor: '#25D366' }
        };

        ordens.forEach(o => {
            const st = statusConfig[o.status] || statusConfig.pendente;
            const data = new Date(o.criadoEm).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: '2-digit'
            });

            const card = document.createElement('div');
            card.className = 'rascunho-card';
            card.style.borderLeft = `4px solid ${st.cor}`;
            card.innerHTML = `
                <div class="rascunho-info" style="cursor:pointer;" onclick="abrirOrdem(${o.id})">
                    <h4>${st.emoji} ${o.cliente}</h4>
                    <p>${o.tipoServicoTexto} · ${data} ${o.tecnico ? '· ' + o.tecnico : ''}</p>
                </div>
                <div class="rascunho-actions">
                    <button class="btn-carregar" onclick="abrirOrdem(${o.id})">Abrir</button>
                    <button class="btn-excluir" onclick="deletarOrdem(${o.id})">Excluir</button>
                </div>
            `;
            lista.appendChild(card);
        });
    } catch (err) {
        console.error('Erro ao carregar ordens:', err);
    }
}

async function abrirOrdem(id) {
    ordemAtualId = id;
    const ordem = await buscarOrdem(id);
    if (!ordem) return;

    // Esconder todas as tabs
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Mostrar tela de documentação
    document.getElementById('telaDocumentar').style.display = 'block';

    const statusConfig = {
        'pendente': { emoji: '🔴', label: 'Pendente' },
        'em_execucao': { emoji: '🟡', label: 'Em Execução' },
        'concluido': { emoji: '🟢', label: 'Concluído' }
    };
    const st = statusConfig[ordem.status] || statusConfig.pendente;

    document.getElementById('osHeaderInfo').innerHTML = `
        <div class="os-info-card">
            <h3>${ordem.cliente}</h3>
            <p><strong>Serviço:</strong> ${ordem.tipoServicoTexto}</p>
            <p><strong>Status:</strong> ${st.emoji} ${st.label}</p>
            ${ordem.tecnico ? `<p><strong>Técnico:</strong> ${ordem.tecnico}</p>` : ''}
            <p><strong>Descrição:</strong> ${ordem.descricao}</p>
        </div>
    `;

    // Restaurar notas
    document.getElementById('notasTecnicas').value = ordem.notas || '';

    // Carregar fotos existentes
    carregarFotosOS();

    // Mostrar/esconder botões por status
    document.getElementById('btnIniciarOS').style.display = ordem.status === 'pendente' ? 'flex' : 'none';
    document.getElementById('btnConcluirOS').style.display = ordem.status === 'em_execucao' ? 'flex' : 'none';
}

async function deletarOrdem(id) {
    if (!confirm('Excluir esta Ordem de Serviço e todos os registros?')) return;
    try {
        await excluirOrdem(id);
        mostrarToast('O.S. excluída', 'success');
        carregarOrdens();
    } catch (err) {
        mostrarToast('Erro ao excluir', 'error');
    }
}

async function mudarStatusOS(novoStatus) {
    const ordem = await buscarOrdem(ordemAtualId);
    if (!ordem) return;

    ordem.status = novoStatus;
    if (novoStatus === 'em_execucao') ordem.iniciadoEm = new Date().toISOString();
    if (novoStatus === 'concluido') ordem.concluidoEm = new Date().toISOString();

    await salvarOrdem(ordem);
    mostrarToast(novoStatus === 'em_execucao' ? '⚡ Execução iniciada!' : '✅ Serviço concluído!', 'success');
    abrirOrdem(ordemAtualId);
}

// =============================================
// FOTOS TÉCNICAS
// =============================================
async function handleFotoTecnica(e) {
    const tipo = e.target.dataset.tipo; // antes, durante, depois
    const files = Array.from(e.target.files);

    for (const file of files) {
        const dataUrl = await readFileAsDataUrl(file);
        await salvarRegistro({
            ordemId: ordemAtualId,
            tipo: tipo,
            foto: dataUrl,
            nome: file.name
        });
    }

    e.target.value = '';
    carregarFotosOS();
    mostrarToast(`📸 ${files.length} foto(s) salva(s)`, 'success');
}

function readFileAsDataUrl(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

async function carregarFotosOS() {
    if (!ordemAtualId) return;
    const registros = await listarRegistros(ordemAtualId);

    ['antes', 'durante', 'depois'].forEach(tipo => {
        const container = document.querySelector(`.foto-preview[data-tipo="${tipo}"]`);
        if (!container) return;
        container.innerHTML = '';

        const fotos = registros.filter(r => r.tipo === tipo && r.foto);
        fotos.forEach(f => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <img src="${f.foto}" alt="${tipo}">
                <button class="preview-remove" onclick="removerFoto(${f.id})">✕</button>
            `;
            container.appendChild(div);
        });
    });
}

async function removerFoto(id) {
    await excluirRegistro(id);
    carregarFotosOS();
    mostrarToast('Foto removida', 'success');
}

// =============================================
// NOTAS TÉCNICAS
// =============================================
async function salvarNotas() {
    const ordem = await buscarOrdem(ordemAtualId);
    if (!ordem) return;
    ordem.notas = document.getElementById('notasTecnicas').value;
    await salvarOrdem(ordem);
    mostrarToast('✓ Notas salvas!', 'success');
}

// =============================================
// GERAÇÃO DE RELATÓRIO
// =============================================
async function gerarRelatorio() {
    const ordem = await buscarOrdem(ordemAtualId);
    if (!ordem) return;
    const registros = await listarRegistros(ordemAtualId);

    const fotosAntes = registros.filter(r => r.tipo === 'antes' && r.foto);
    const fotosDurante = registros.filter(r => r.tipo === 'durante' && r.foto);
    const fotosDepois = registros.filter(r => r.tipo === 'depois' && r.foto);

    const dataInicio = ordem.iniciadoEm ? new Date(ordem.iniciadoEm).toLocaleDateString('pt-BR') : '—';
    const dataConclusao = ordem.concluidoEm ? new Date(ordem.concluidoEm).toLocaleDateString('pt-BR') : '—';

    const renderFotos = (fotos, titulo) => {
        if (fotos.length === 0) return '';
        return `
            <div class="rel-section">
                <h4>${titulo}</h4>
                <div class="rel-fotos">${fotos.map(f => `<img src="${f.foto}" alt="${titulo}">`).join('')}</div>
            </div>
        `;
    };

    document.getElementById('relatorioContainer').innerHTML = `
        <div class="relatorio">
            <div class="rel-header">
                <div class="rel-logo">VERSÁTIL SERVICES</div>
                <div class="rel-titulo">RELATÓRIO TÉCNICO</div>
            </div>
            <div class="rel-bar"></div>

            <div class="rel-dados">
                <div class="rel-row"><span>Cliente:</span><strong>${ordem.cliente}</strong></div>
                <div class="rel-row"><span>Serviço:</span><strong>${ordem.tipoServicoTexto}</strong></div>
                <div class="rel-row"><span>Técnico:</span><strong>${ordem.tecnico || '—'}</strong></div>
                <div class="rel-row"><span>Início:</span><strong>${dataInicio}</strong></div>
                <div class="rel-row"><span>Conclusão:</span><strong>${dataConclusao}</strong></div>
                <div class="rel-row"><span>Status:</span><strong>${ordem.status === 'concluido' ? '✅ Concluído' : '🟡 Em Andamento'}</strong></div>
            </div>

            <div class="rel-section">
                <h4>Descrição do Serviço</h4>
                <p>${ordem.descricao}</p>
            </div>

            ${ordem.notas ? `
                <div class="rel-section">
                    <h4>Notas Técnicas</h4>
                    <p>${ordem.notas.replace(/\n/g, '<br>')}</p>
                </div>
            ` : ''}

            ${renderFotos(fotosAntes, '📸 Registro — Antes')}
            ${renderFotos(fotosDurante, '📸 Registro — Durante')}
            ${renderFotos(fotosDepois, '📸 Registro — Depois')}

            <div class="rel-bar"></div>
            <div class="rel-footer">
                <p>Versátil Services Industrial — Desde 2002</p>
                <p>dp.tecnico@versatilservices.com.br | +55 (13) 99150-9140</p>
            </div>
        </div>
    `;

    // Mostrar tela do relatório
    document.getElementById('telaDocumentar').style.display = 'none';
    document.getElementById('telaRelatorio').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// ENVIAR RELATÓRIO VIA WHATSAPP
// =============================================
async function enviarRelatorioWA() {
    const ordem = await buscarOrdem(ordemAtualId);
    if (!ordem) return;

    const msg = [
        `📄 *RELATÓRIO TÉCNICO — VERSÁTIL SERVICES*`,
        `━━━━━━━━━━━━━━━━━━`,
        ``,
        `*Cliente:* ${ordem.cliente}`,
        `*Serviço:* ${ordem.tipoServicoTexto}`,
        `*Técnico:* ${ordem.tecnico || '—'}`,
        `*Status:* ${ordem.status === 'concluido' ? '✅ Concluído' : '🟡 Em Andamento'}`,
        ``,
        `*Descrição:*`,
        ordem.descricao,
        ordem.notas ? `\n*Notas Técnicas:*\n${ordem.notas}` : '',
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `_Versátil Services — Desde 2002_`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/5513991509140?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function mostrarToast(msg, tipo = '') {
    const existente = document.querySelector('.toast');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
