/* =============================================
   VERSÁTIL SERVICES — Painel do Cliente
   Login CNPJ + PIN, Dashboard, O.S. e Detalhes
   ============================================= */

let clienteLogado = null;
let ordensCliente = [];

// =============================================
// LOGIN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Máscara CNPJ
    const loginCnpj = document.getElementById('loginCnpj');
    if (loginCnpj) {
        loginCnpj.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 14) v = v.substring(0, 14);
            if (v.length > 12) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
            else if (v.length > 8) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
            else if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{1,3})/, '$1.$2');
            e.target.value = v;
        });
    }

    // Enter no PIN
    const loginPin = document.getElementById('loginPin');
    if (loginPin) {
        loginPin.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') fazerLogin();
        });
    }

    // Botão Login
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) btnLogin.addEventListener('click', fazerLogin);

    // Filtros O.S.
    document.querySelectorAll('.os-filtro').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.os-filtro').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderizarOrdens(btn.dataset.f);
        });
    });

    // Verificar sessão salva
    const sessao = sessionStorage.getItem('versatil_cliente');
    if (sessao) {
        try {
            const dados = JSON.parse(sessao);
            restaurarSessao(dados.cnpj);
        } catch(e) {}
    }
});

async function fazerLogin() {
    const cnpj = document.getElementById('loginCnpj').value.trim();
    const pin = document.getElementById('loginPin').value.trim();
    const errEl = document.getElementById('loginError');

    errEl.style.display = 'none';

    if (!cnpj || !pin) {
        errEl.textContent = 'Preencha CNPJ e PIN.';
        errEl.style.display = 'block';
        return;
    }

    try {
        const cliente = await buscarClientePorCnpj(cnpj);
        if (!cliente) {
            errEl.textContent = 'CNPJ não cadastrado.';
            errEl.style.display = 'block';
            return;
        }

        if (cliente.pin !== pin) {
            errEl.textContent = 'PIN incorreto.';
            errEl.style.display = 'block';
            return;
        }

        // Login OK
        clienteLogado = cliente;
        sessionStorage.setItem('versatil_cliente', JSON.stringify({ cnpj: cliente.cnpj }));
        entrarPainel();
    } catch (err) {
        errEl.textContent = 'Erro ao conectar.';
        errEl.style.display = 'block';
        console.error(err);
    }
}

async function restaurarSessao(cnpj) {
    try {
        const cliente = await buscarClientePorCnpj(cnpj);
        if (cliente) {
            clienteLogado = cliente;
            entrarPainel();
        }
    } catch(e) {}
}

function entrarPainel() {
    document.getElementById('telaLogin').style.display = 'none';
    document.getElementById('painelCliente').style.display = 'block';
    document.getElementById('footerCliente').style.display = 'block';

    document.getElementById('cliNomeEmpresa').textContent = clienteLogado.empresa;
    document.getElementById('cliCnpjDisplay').textContent = clienteLogado.cnpj;

    carregarDashboard();
}

function sairPainel() {
    clienteLogado = null;
    sessionStorage.removeItem('versatil_cliente');
    document.getElementById('painelCliente').style.display = 'none';
    document.getElementById('footerCliente').style.display = 'none';
    document.getElementById('telaLogin').style.display = 'flex';
    document.getElementById('loginCnpj').value = '';
    document.getElementById('loginPin').value = '';
}

// =============================================
// DASHBOARD
// =============================================
async function carregarDashboard() {
    try {
        ordensCliente = await listarOrdensPorCliente(clienteLogado.id);
        ordensCliente.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

        // Stats
        const total = ordensCliente.length;
        const ativas = ordensCliente.filter(o => o.status === 'pendente' || o.status === 'em_execucao').length;
        const concluidas = ordensCliente.filter(o => o.status === 'concluido').length;

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statAtivas').textContent = ativas;
        document.getElementById('statConcluidas').textContent = concluidas;

        // Renderizar lista
        renderizarOrdens('todas');
    } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
    }
}

function renderizarOrdens(filtro) {
    const lista = document.getElementById('listaOSCliente');
    const vazia = document.getElementById('osVazia');

    let filtradas = ordensCliente;
    if (filtro !== 'todas') {
        filtradas = ordensCliente.filter(o => o.status === filtro);
    }

    if (filtradas.length === 0) {
        lista.innerHTML = '';
        vazia.style.display = 'block';
        return;
    }

    vazia.style.display = 'none';
    lista.innerHTML = '';

    const statusLabels = {
        pendente: 'Pendente',
        em_execucao: 'Em Execução',
        concluido: 'Concluída'
    };

    filtradas.forEach(os => {
        const data = new Date(os.criadoEm).toLocaleDateString('pt-BR');
        const card = document.createElement('div');
        card.className = 'os-card';
        card.onclick = () => abrirDetalheOS(os.id);
        card.innerHTML = `
            <div class="os-card-header">
                <span class="os-card-num">O.S. #${String(os.id).padStart(3, '0')}</span>
                <span class="os-status ${os.status}">${statusLabels[os.status] || os.status}</span>
            </div>
            <div class="os-card-tipo">${os.tipoServicoTexto || os.tipoServico}</div>
            <div class="os-card-data">${data}${os.tecnico ? ' · Técnico: ' + os.tecnico : ''}</div>
        `;
        lista.appendChild(card);
    });
}

// =============================================
// DETALHE DA O.S.
// =============================================
async function abrirDetalheOS(osId) {
    const os = ordensCliente.find(o => o.id === osId);
    if (!os) return;

    const statusLabels = {
        pendente: '🟡 Pendente',
        em_execucao: '🔵 Em Execução',
        concluido: '🟢 Concluída'
    };

    document.getElementById('secaoOrdens').style.display = 'none';
    document.getElementById('detalheOS').style.display = 'block';

    document.getElementById('detTitulo').textContent = `O.S. #${String(os.id).padStart(3, '0')} — ${os.tipoServicoTexto || os.tipoServico}`;
    document.getElementById('detStatus').textContent = statusLabels[os.status] || os.status;
    document.getElementById('detTipo').textContent = os.tipoServicoTexto || os.tipoServico;
    document.getElementById('detData').textContent = new Date(os.criadoEm).toLocaleDateString('pt-BR');
    document.getElementById('detTecnico').textContent = os.tecnico || '—';
    document.getElementById('detDescTexto').textContent = os.descricao || '—';

    // Notas
    if (os.notas && os.notas.trim()) {
        document.getElementById('detNotas').style.display = 'block';
        document.getElementById('detNotasTexto').textContent = os.notas;
    } else {
        document.getElementById('detNotas').style.display = 'none';
    }

    // Carregar fotos
    await carregarFotosDetalhe(osId);
}

async function carregarFotosDetalhe(osId) {
    const secao = document.getElementById('secaoFotos');
    secao.innerHTML = '';

    try {
        const registros = await listarRegistros(osId);
        const tipos = {
            'foto_antes': '📸 Fotos — Antes',
            'foto_durante': '📸 Fotos — Durante',
            'foto_depois': '📸 Fotos — Depois'
        };

        for (const [tipo, label] of Object.entries(tipos)) {
            const fotos = registros.filter(r => r.tipo === tipo);
            if (fotos.length === 0) continue;

            const div = document.createElement('div');
            div.className = 'fotos-section';
            div.innerHTML = `<h4>${label}</h4>`;

            const grid = document.createElement('div');
            grid.className = 'fotos-grid';

            fotos.forEach(f => {
                const img = document.createElement('img');
                img.src = f.conteudo || f.foto;
                img.alt = label;
                img.onclick = () => {
                    const lb = document.createElement('div');
                    lb.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
                    lb.onclick = () => lb.remove();
                    lb.innerHTML = `<img src="${f.conteudo || f.foto}" style="max-width:90vw;max-height:85vh;border-radius:8px;">`;
                    document.body.appendChild(lb);
                };
                grid.appendChild(img);
            });

            div.appendChild(grid);
            secao.appendChild(div);
        }

        if (secao.children.length === 0) {
            secao.innerHTML = '<div class="fotos-section"><h4>📸 Fotos</h4><p style="color:var(--gray-500);">Nenhuma foto registrada ainda.</p></div>';
        }
    } catch (err) {
        console.error('Erro ao carregar fotos:', err);
    }
}

function voltarListaOS() {
    document.getElementById('detalheOS').style.display = 'none';
    document.getElementById('secaoOrdens').style.display = 'block';
}
