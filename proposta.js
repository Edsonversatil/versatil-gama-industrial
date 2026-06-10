/* =============================================
   VERSÁTIL SERVICES — Gerador de Propostas
   Proposta Técnica + Comercial com auto-fill
   ============================================= */

let stepAtual = 1;
const TOTAL_STEPS = 4;
let clienteSelecionado = null;

// =============================================
// INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Data atual
    document.getElementById('propData').value = new Date().toISOString().split('T')[0];

    // Número da proposta auto
    const num = Date.now().toString().slice(-6);
    document.getElementById('propNumero').value = num;

    // Carregar clientes
    await carregarClientesProposta();

    // Listener: seleção de cliente
    document.getElementById('propCliente').addEventListener('change', onClienteChange);

    // Listener: seleção de tipo de serviço
    document.getElementById('propTipo').addEventListener('change', onTipoChange);

    // Listener: adicionar item
    document.getElementById('btnAddItem').addEventListener('click', adicionarItemManual);

    // Preencher condições comerciais
    document.getElementById('propPagamento').value = CONDICOES_COMERCIAIS_PADRAO.formaPagamento;
    document.getElementById('propGarantia').value = CONDICOES_COMERCIAIS_PADRAO.garantia;
    document.getElementById('propObs').value = CONDICOES_COMERCIAIS_PADRAO.observacoes;
});

// =============================================
// CLIENTES
// =============================================
async function carregarClientesProposta() {
    const select = document.getElementById('propCliente');
    try {
        const clientes = await listarClientes();
        clientes.sort((a, b) => a.empresa.localeCompare(b.empresa));
        clientes.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.empresa} (${c.cnpj})`;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error('Erro ao carregar clientes:', err);
    }
}

async function onClienteChange() {
    const id = parseInt(this.value);
    const info = document.getElementById('propClienteInfo');

    if (!id) {
        info.style.display = 'none';
        clienteSelecionado = null;
        return;
    }

    try {
        clienteSelecionado = await buscarCliente(id);
        if (clienteSelecionado) {
            document.getElementById('propCliNome').textContent = clienteSelecionado.empresa;
            document.getElementById('propCliCnpj').textContent = clienteSelecionado.cnpj;
            document.getElementById('propCliContato').textContent = clienteSelecionado.contato || '—';
            document.getElementById('propCliEmail').textContent = clienteSelecionado.email || '—';
            document.getElementById('propCliTel').textContent = clienteSelecionado.telefone || '—';
            info.style.display = 'block';
        }
    } catch (err) {
        console.error(err);
    }
}

// =============================================
// AUTO-PREENCHIMENTO (Motor de Conhecimento)
// =============================================
function onTipoChange() {
    const tipo = this.value;

    // Modo personalizado: limpa tudo para escrita manual
    if (tipo === 'personalizado') {
        document.getElementById('propObjetivo').value = '';
        document.getElementById('propEscopo').value = '';
        document.getElementById('propExclusoes').value = '';
        document.getElementById('propMetodologia').value = '';
        document.getElementById('propEquipamento').value = '';
        document.getElementById('propControle').value = '';
        document.getElementById('propPrazo').value = '';
        document.getElementById('tabelaItens').innerHTML = '';
        // Adicionar 3 linhas em branco para começar
        adicionarLinhaItem('', 0);
        adicionarLinhaItem('', 0);
        adicionarLinhaItem('', 0);
        // Remover estilo auto-fill
        document.querySelectorAll('textarea.auto-filled').forEach(el => {
            el.style.borderColor = '';
            el.style.background = '';
        });
        return;
    }

    if (!tipo || !TEMPLATES_SERVICO[tipo]) return;

    const t = TEMPLATES_SERVICO[tipo];

    // Preencher campos técnicos
    document.getElementById('propObjetivo').value = t.objetivo;
    document.getElementById('propEscopo').value = t.escopo.join('\n');
    document.getElementById('propExclusoes').value = t.exclusoes.join('\n');
    document.getElementById('propMetodologia').value = t.metodologia;
    document.getElementById('propEquipamento').value = t.equipamento;
    document.getElementById('propControle').value = t.controleDimensional;
    document.getElementById('propPrazo').value = t.prazoEstimado;

    // Preencher tabela comercial
    preencherTabelaComercial(t.itensComerciais);

    // Marcar textareas como auto-filled
    document.querySelectorAll('textarea.auto-filled').forEach(el => {
        el.style.borderColor = '#6366f1';
        el.style.background = '#faf5ff';
    });
}

// =============================================
// TABELA COMERCIAL
// =============================================
function preencherTabelaComercial(itens) {
    const tbody = document.getElementById('tabelaItens');
    tbody.innerHTML = '';

    itens.forEach((item, i) => {
        adicionarLinhaItem(item.descricao, item.valor, i);
    });
}

function adicionarLinhaItem(descricao, valor, index) {
    const tbody = document.getElementById('tabelaItens');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <input type="text" class="item-desc" value="${descricao}" 
                   style="border:none;background:transparent;font-size:0.9rem;width:100%;font-family:inherit;">
        </td>
        <td style="text-align:right; display:flex; align-items:center; gap:4px; justify-content:flex-end;">
            <span style="color:var(--gray-500);">R$</span>
            <input type="number" class="item-valor" value="${valor}" min="0" step="100" 
                   oninput="calcularTotal()" placeholder="0">
            <button onclick="this.closest('tr').remove(); calcularTotal();" 
                    style="background:none;border:none;color:var(--gray-500);cursor:pointer;font-size:1rem;padding:4px;">✕</button>
        </td>
    `;
    tbody.appendChild(tr);
}

function adicionarItemManual() {
    adicionarLinhaItem('', 0);
    const inputs = document.querySelectorAll('.item-desc');
    inputs[inputs.length - 1].focus();
}

function calcularTotal() {
    const inputs = document.querySelectorAll('.item-valor');
    let total = 0;
    inputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    document.getElementById('propTotal').textContent = formatarMoeda(total);
}

function formatarMoeda(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// =============================================
// NAVEGAÇÃO ENTRE STEPS
// =============================================
function navegarStep(direcao) {
    const proximo = stepAtual + direcao;
    if (proximo < 1 || proximo > TOTAL_STEPS) return;

    // Validação do step 1
    if (stepAtual === 1 && direcao === 1) {
        if (!document.getElementById('propCliente').value) {
            alert('Selecione um cliente.');
            return;
        }
        if (!document.getElementById('propTipo').value) {
            alert('Selecione o tipo de serviço.');
            return;
        }
        if (!document.getElementById('propTitulo').value.trim()) {
            alert('Preencha o título da proposta.');
            return;
        }
    }

    // Gerar preview no step 4
    if (proximo === 4) {
        gerarPreview();
    }

    // Esconder step atual
    document.getElementById('step' + stepAtual).style.display = 'none';
    // Mostrar próximo
    document.getElementById('step' + proximo).style.display = 'block';

    stepAtual = proximo;

    // Atualizar steps bar
    document.querySelectorAll('.step-item').forEach((el, i) => {
        el.classList.remove('active', 'done');
        if (i + 1 < stepAtual) el.classList.add('done');
        if (i + 1 === stepAtual) el.classList.add('active');
    });

    document.querySelectorAll('.step-label span').forEach((el, i) => {
        el.classList.remove('active');
        if (i === stepAtual - 1) el.classList.add('active');
    });

    // Botões
    document.getElementById('btnAnterior').style.display = stepAtual > 1 ? 'block' : 'none';
    document.getElementById('btnProximo').textContent = stepAtual === TOTAL_STEPS ? '✓ Finalizado' : 'Próximo →';
    if (stepAtual === TOTAL_STEPS) {
        document.getElementById('btnProximo').style.display = 'none';
    } else {
        document.getElementById('btnProximo').style.display = 'block';
    }
}

// =============================================
// PREVIEW DOS DOCUMENTOS (SEPARADOS)
// =============================================
function gerarPreview() {
    const titulo = document.getElementById('propTitulo').value;
    const numero = document.getElementById('propNumero').value;
    const data = document.getElementById('propData').value;
    const dataFormatada = data ? new Date(data + 'T12:00:00').toLocaleDateString('pt-BR') : '';

    const escopo = document.getElementById('propEscopo').value.split('\n').filter(l => l.trim());
    const exclusoes = document.getElementById('propExclusoes').value.split('\n').filter(l => l.trim());

    // Coletar itens comerciais
    const itens = [];
    let total = 0;
    document.querySelectorAll('#tabelaItens tr').forEach(tr => {
        const desc = tr.querySelector('.item-desc').value;
        const val = parseFloat(tr.querySelector('.item-valor').value) || 0;
        if (desc) {
            itens.push({ descricao: desc, valor: val });
            total += val;
        }
    });

    // Bloco padrão: dados da empresa (para Proposta Técnica)
    const blocoEmpresa = `
        <div style="margin-bottom:24px;">
            <p style="color:#BF2026; font-weight:700; font-size:1.05rem; margin-bottom:4px;">${DADOS_VERSATIL.razaoSocial}</p>
            <p>Endereço: ${DADOS_VERSATIL.enderecoLinha1}</p>
            <p>Cidade/UF: ${DADOS_VERSATIL.cidadeUfCep}</p>
            <p>C.N.P.J.: ${DADOS_VERSATIL.cnpj}</p>
            <p>I.E.: ${DADOS_VERSATIL.ie}</p>
        </div>
        <div style="margin-bottom:24px;">
            <p>${DADOS_VERSATIL.enderecoCompleto}</p>
            <p>${DADOS_VERSATIL.bairro} – ${DADOS_VERSATIL.cidadeUf} – CEP ${DADOS_VERSATIL.cep}</p>
            <p>CNPJ: ${DADOS_VERSATIL.cnpj}</p>
        </div>
        <div>
            <p>Gerente Técnico Comercial:</p>
            <p><strong>${DADOS_VERSATIL.responsavelCompleto}</strong></p>
            ${DADOS_VERSATIL.formacaoCompleta.map(f => '<p>' + f + '</p>').join('')}
            <p>${DADOS_VERSATIL.crea}</p>
            <p><a href="mailto:${DADOS_VERSATIL.email}" style="color:#4A90D9;">${DADOS_VERSATIL.email}</a></p>
            <p style="color:#BF2026;">${DADOS_VERSATIL.telefone} | ${DADOS_VERSATIL.telefoneFixo}</p>
        </div>`;

    // Bloco padrão: dados do cliente
    const blocoCliente = `
        <strong>${clienteSelecionado ? clienteSelecionado.empresa : '—'}</strong><br>
        CNPJ: ${clienteSelecionado ? clienteSelecionado.cnpj : '—'}<br>
        ${clienteSelecionado && clienteSelecionado.contato ? 'Solicitante: ' + clienteSelecionado.contato + '<br>' : ''}
        ${clienteSelecionado && clienteSelecionado.email ? 'Email: ' + clienteSelecionado.email + '<br>' : ''}
        ${clienteSelecionado && clienteSelecionado.telefone ? 'Telefone: ' + clienteSelecionado.telefone : ''}`;

    // Detectar tipo de serviço selecionado para blocos condicionais
    const tipoServico = document.getElementById('propTipo').value;
    const template = TEMPLATES_SERVICO[tipoServico] || null;

    // Bloco condicional: Tipos de Equipamentos Atendidos
    const blocoTipos = template && template.tiposAtendidos
        ? `<div class="doc-section">
            <h4>Tipos de Equipamentos Atendidos</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
                ${template.tiposAtendidos.map(t => `<span style="background:rgba(191,32,38,0.08); color:#BF2026; padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600;">${t}</span>`).join('')}
            </div>
           </div>`
        : '';

    // Bloco condicional: Normas Aplicáveis (END, inspeção, trocadores, retubagem, caldeiraria)
    const servicosComNorma = ['end', 'inspecao', 'trocadores', 'retubagem', 'caldeiraria', 'torqueamento'];
    const normasMap = {
        end: ['ABNT NBR-15239', 'ASME V', 'API 510/570/653', 'NR-13', 'ABENDI/SNQC'],
        inspecao: ['NR-13', 'NR-12', 'ASME VIII', 'API 510/570', 'ABNT NBR-15417'],
        trocadores: ['ASME VIII Div.1', 'TEMA', 'NR-13', 'API 660'],
        retubagem: ['ASME VIII', 'TEMA', 'NR-13', 'API 660'],
        caldeiraria: ['ASME IX', 'AWS D1.1', 'NR-13', 'ASME VIII'],
        torqueamento: ['ASME PCC-1', 'API 6A']
    };
    const normasServico = normasMap[tipoServico] || [];
    const blocoNormas = normasServico.length > 0
        ? `<div class="doc-section">
            <h4>Normas e Referências Aplicáveis</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
                ${normasServico.map(n => `<span style="background:#f0f4ff; color:#1e3a5f; padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid #d0daf0;">📋 ${n}</span>`).join('')}
            </div>
           </div>`
        : '';

    // Bloco condicional: Pronto Atendimento 24h
    const servicosCampo = ['retubagem', 'limpezaIndustrial', 'parada', 'trocadores', 'usinagem'];
    const blocoPronto = servicosCampo.includes(tipoServico)
        ? `<div style="background:linear-gradient(135deg,#0a0a0a,#1a0a0b); color:#fff; padding:16px 24px; border-radius:8px; margin:16px 0; text-align:center;">
            <span style="font-size:1.5rem;">🚨</span>
            <span style="font-weight:800; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; margin-left:8px;">Pronto Atendimento 24h — On/Offshore</span>
           </div>`
        : '';

    // ========================================
    // DOCUMENTO 1: PROPOSTA TÉCNICA (sem valores!)
    // ========================================
    document.getElementById('previewTecnica').innerHTML = `
        <div class="doc-header">
            <img src="Fotos/logo-versatil.jpg" alt="Versátil Services" style="max-width:280px; margin-bottom:20px;">
            <h3 style="font-size:1.3rem; font-weight:900; letter-spacing:2px;">PROPOSTA TÉCNICA ${numero}</h3>
        </div>

        <div class="doc-section">${blocoEmpresa}</div>

        <div class="doc-section">
            <h4>Cliente / Solicitante</h4>
            <div class="dados-box">${blocoCliente}</div>
        </div>

        <div class="doc-section">
            <h4>Objetivo da Proposta</h4>
            <p>${document.getElementById('propObjetivo').value}</p>
        </div>

        ${blocoTipos}

        <div class="doc-section">
            <h4>Escopo de Responsabilidade</h4>
            <ul>${escopo.map(item => '<li>' + item + '</li>').join('')}</ul>
        </div>

        <div class="doc-section">
            <h4>Atividades Não Incluídas</h4>
            <ul>${exclusoes.map(item => '<li>' + item + '</li>').join('')}</ul>
        </div>

        <div class="doc-section">
            <h4>Metodologia</h4>
            <p>${document.getElementById('propMetodologia').value}</p>
        </div>

        ${blocoNormas}

        <div class="doc-section">
            <h4>Equipamento Utilizado</h4>
            <p style="white-space:pre-line;">${document.getElementById('propEquipamento').value}</p>
        </div>

        <div class="doc-section">
            <h4>Controle Dimensional</h4>
            <p>${document.getElementById('propControle').value}</p>
        </div>

        <div class="doc-section">
            <h4>Prazo de Execução</h4>
            <p>${document.getElementById('propPrazo').value}</p>
        </div>

        ${blocoPronto}

        <div class="doc-section">
            <h4>Responsabilidade Técnica</h4>
            <div style="text-align:center; margin-top:32px;">
                <p style="margin-bottom:48px;"></p>
                <strong>${DADOS_VERSATIL.responsavel}</strong><br>
                <span>${DADOS_VERSATIL.crea}</span><br>
                <span>${DADOS_VERSATIL.razaoSocial}</span>
            </div>
        </div>
    `;

    // ========================================
    // DOCUMENTO 2: PROPOSTA COMERCIAL
    // Formato baseado no PDF oficial da empresa
    // ========================================
    document.getElementById('previewComercial').innerHTML = `
        <div class="doc-header">
            <img src="Fotos/logo-versatil.jpg" alt="Versátil Services" style="max-width:280px; margin-bottom:20px;">
        </div>

        <!-- DADOS DA EMPRESA (formato oficial) -->
        <div class="doc-section" style="border:none; padding:0; margin-bottom:16px;">
            <p style="font-weight:700; font-size:1rem;">${DADOS_VERSATIL.razaoSocial}</p>
            <p>Endereço: ${DADOS_VERSATIL.enderecoLinha1}</p>
            <p>Cidade/UF: ${DADOS_VERSATIL.cidadeUfCep}</p>
            <p>C.N.P.J.: ${DADOS_VERSATIL.cnpj}</p>
            <p>I.E.: ${DADOS_VERSATIL.ie}</p>
        </div>

        <div class="doc-section" style="border:none; padding:0; margin-bottom:16px;">
            <p style="font-weight:700;">Gerente Técnico Comercial</p>
            <p>${DADOS_VERSATIL.responsavel}</p>
            ${DADOS_VERSATIL.formacao.map(f => '<p>' + f + '</p>').join('')}
            <p>${DADOS_VERSATIL.crea}</p>
            <p><a href="mailto:${DADOS_VERSATIL.email}" style="color:#4A90D9;">${DADOS_VERSATIL.email}</a></p>
            <p style="color:#BF2026;">${DADOS_VERSATIL.telefone} | ${DADOS_VERSATIL.telefoneFixo}</p>
        </div>

        <!-- NÚMERO E DATA -->
        <div class="doc-section" style="border-top:3px solid var(--red); padding-top:16px;">
            <h4 style="font-size:1.1rem; text-align:center; border:none; margin-bottom:16px;">
                Proposta Comercial nº${numero}-REV00 ${dataFormatada}
            </h4>
        </div>

        <!-- DADOS DO CLIENTE -->
        <div class="doc-section">
            <div class="dados-box">
                <strong>${clienteSelecionado ? clienteSelecionado.empresa : '—'}</strong><br>
                ${clienteSelecionado && clienteSelecionado.endereco ? clienteSelecionado.endereco + '<br>' : ''}
                CNPJ: ${clienteSelecionado ? clienteSelecionado.cnpj : '—'}<br>
                ${clienteSelecionado && clienteSelecionado.contato ? 'Contato: ' + clienteSelecionado.contato + '<br>' : ''}
                ${clienteSelecionado && clienteSelecionado.telefone ? 'Tel: ' + clienteSelecionado.telefone + '<br>' : ''}
                ${clienteSelecionado && clienteSelecionado.email ? 'Email: ' + clienteSelecionado.email : ''}
            </div>
        </div>

        <!-- OBJETO CONTRATUAL -->
        <div class="doc-section">
            <h4>OBJETO CONTRATUAL</h4>
            <p>${document.getElementById('propObjetivo').value}</p>
        </div>

        <!-- TABELA DE ITENS (formato oficial) -->
        <div class="doc-section">
            <table>
                <thead>
                    <tr>
                        <th style="width:8%; text-align:center;">ITEM</th>
                        <th style="width:52%;">DESCRIÇÃO</th>
                        <th style="width:8%; text-align:center;">UNID.</th>
                        <th style="width:8%; text-align:center;">QUANT.</th>
                        <th style="width:12%; text-align:right;">PREÇO UNITÁRIO (R$)</th>
                        <th style="width:12%; text-align:right;">VALOR TOTAL (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    ${itens.map((item, i) => `
                        <tr>
                            <td style="text-align:center;font-weight:700;">${String(i + 1).padStart(1, '0')}.${String(i + 1)}</td>
                            <td>${item.descricao}</td>
                            <td style="text-align:center;">UN</td>
                            <td style="text-align:center;">1</td>
                            <td style="text-align:right;">${formatarMoeda(item.valor)}</td>
                            <td style="text-align:right;font-weight:700;">${formatarMoeda(item.valor)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="total-final">SOMA Sub Total: ${formatarMoeda(total)}</div>
        </div>

        <!-- IMPOSTOS -->
        <div class="doc-section">
            <h4>IMPOSTOS INCLUSO SOBRE OS SERVIÇOS</h4>
            <p>IR · PIS · COFINS · CSLL</p>
        </div>

        <!-- PRAZO -->
        <div class="doc-section">
            <h4>Tempo Estimado</h4>
            <p>${document.getElementById('propPrazo').value}</p>
        </div>

        <!-- CONDIÇÕES DE PAGAMENTO -->
        <div class="doc-section">
            <h4>Condições de Pagamento</h4>
            <p>${document.getElementById('propPagamento').value}</p>
            <p style="margin-top:8px; font-style:italic; color:var(--gray-500);">${document.getElementById('propObs').value || 'Atendimento Programado.'}</p>
        </div>

        <!-- GARANTIA -->
        <div class="doc-section">
            <h4>Garantia</h4>
            <p>${document.getElementById('propGarantia').value}</p>
        </div>

        <!-- VALIDADE -->
        <div class="doc-section">
            <h4>Validade da Proposta</h4>
            <p>${document.getElementById('propValidade').value}</p>
        </div>

        <!-- ACEITE (Página 3 do PDF) -->
        <div class="doc-section" style="page-break-before:always; border-top:3px solid var(--red); padding-top:32px; margin-top:32px;">
            <h4 style="text-align:center; font-size:1.1rem; border:none;">ACEITE DE PROPOSTA</h4>
            <p style="margin-top:16px; line-height:1.8; text-align:justify;">
                Prezado cliente:<br><br>
                Comunicamos que, em caso de aceite desta proposta, nos seja enviado este documento devidamente 
                preenchido e assinado para que todos os seus itens sejam cumpridos por ambas as partes, conforme 
                artigo 20 da Lei 5474/68, onde se lê: <em>"A colocação do de acordo, pelo Cliente na proposta do 
                fornecedor, dá a mesma força de documento contratual"</em>.
            </p>
            <div style="text-align:center; margin-top:64px;">
                <p style="border-bottom:1px solid var(--text-dark); width:350px; margin:0 auto 8px;"></p>
                <p style="font-weight:700;">Assinatura Autorizada com Carimbo</p>
            </div>
        </div>
    `;
}

// =============================================
// TROCAR DOCUMENTO (ABA)
// =============================================
function trocarDocumento(tipo) {
    const tabTec = document.getElementById('tabTecnica');
    const tabCom = document.getElementById('tabComercial');
    const docTec = document.getElementById('docTecnica');
    const docCom = document.getElementById('docComercial');

    if (tipo === 'tecnica') {
        tabTec.style.background = 'var(--red)';
        tabTec.style.color = '#fff';
        tabTec.style.borderColor = 'var(--red)';
        tabCom.style.background = '#fff';
        tabCom.style.color = 'var(--text-dark)';
        tabCom.style.borderColor = 'var(--border)';
        docTec.style.display = 'block';
        docCom.style.display = 'none';
    } else {
        tabCom.style.background = 'var(--red)';
        tabCom.style.color = '#fff';
        tabCom.style.borderColor = 'var(--red)';
        tabTec.style.background = '#fff';
        tabTec.style.color = 'var(--text-dark)';
        tabTec.style.borderColor = 'var(--border)';
        docCom.style.display = 'block';
        docTec.style.display = 'none';
    }
}

// =============================================
// IMPRIMIR DOCUMENTO INDIVIDUAL
// =============================================
function imprimirDocumento(tipo) {
    const outro = tipo === 'tecnica' ? 'docComercial' : 'docTecnica';
    const outroEl = document.getElementById(outro);
    const originalDisplay = outroEl.style.display;
    
    // Esconder o outro documento antes de imprimir
    outroEl.style.display = 'none';
    window.print();
    // Restaurar após
    setTimeout(() => { outroEl.style.display = originalDisplay; }, 500);
}

// =============================================
// ENVIAR WHATSAPP (POR DOCUMENTO)
// =============================================
function enviarWhatsApp(tipo) {
    const titulo = document.getElementById('propTitulo').value;
    const numero = document.getElementById('propNumero').value;
    const prazo = document.getElementById('propPrazo').value;
    const cliente = clienteSelecionado ? clienteSelecionado.empresa : '';

    let msg;
    if (tipo === 'tecnica') {
        msg = `📄 *PROPOSTA TÉCNICA*
━━━━━━━━━━━━━━━━━━━
*Nº:* ${numero}
*Cliente:* ${cliente}
*Serviço:* ${titulo}
*Prazo:* ${prazo}
━━━━━━━━━━━━━━━━━━━
Segue em anexo a Proposta Técnica para avaliação.

*${DADOS_VERSATIL.razaoSocial}*
${DADOS_VERSATIL.responsavel}
${DADOS_VERSATIL.telefone}
${DADOS_VERSATIL.email}`;
    } else {
        const total = document.getElementById('propTotal').textContent;
        msg = `💰 *PROPOSTA COMERCIAL*
━━━━━━━━━━━━━━━━━━━
*Nº:* ${numero}
*Cliente:* ${cliente}
*Serviço:* ${titulo}
*Prazo:* ${prazo}
*Valor Total:* ${total}
━━━━━━━━━━━━━━━━━━━
Segue em anexo a Proposta Comercial para aprovação.

*${DADOS_VERSATIL.razaoSocial}*
${DADOS_VERSATIL.responsavel}
${DADOS_VERSATIL.telefone}
${DADOS_VERSATIL.email}`;
    }

    const tel = clienteSelecionado && clienteSelecionado.telefone 
        ? clienteSelecionado.telefone.replace(/\D/g, '') 
        : '';
    const url = tel 
        ? `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank');
}

// =============================================
// SALVAR PROPOSTA
// =============================================
async function salvarProposta() {
    const dados = {
        numero: document.getElementById('propNumero').value,
        data: document.getElementById('propData').value,
        titulo: document.getElementById('propTitulo').value,
        tipo: document.getElementById('propTipo').value,
        clienteId: clienteSelecionado ? clienteSelecionado.id : null,
        clienteNome: clienteSelecionado ? clienteSelecionado.empresa : '',
        objetivo: document.getElementById('propObjetivo').value,
        escopo: document.getElementById('propEscopo').value,
        exclusoes: document.getElementById('propExclusoes').value,
        metodologia: document.getElementById('propMetodologia').value,
        equipamento: document.getElementById('propEquipamento').value,
        controle: document.getElementById('propControle').value,
        prazo: document.getElementById('propPrazo').value,
        pagamento: document.getElementById('propPagamento').value,
        garantia: document.getElementById('propGarantia').value,
        observacoes: document.getElementById('propObs').value,
        total: document.getElementById('propTotal').textContent,
        criadoEm: new Date().toISOString()
    };

    // Coletar itens
    dados.itens = [];
    document.querySelectorAll('#tabelaItens tr').forEach(tr => {
        const desc = tr.querySelector('.item-desc').value;
        const val = parseFloat(tr.querySelector('.item-valor').value) || 0;
        if (desc) dados.itens.push({ descricao: desc, valor: val });
    });

    try {
        const db = await openDB();
        await new Promise((resolve, reject) => {
            // Check if store exists, if not we'll save to localStorage
            if (db.objectStoreNames.contains('propostas')) {
                const tx = db.transaction('propostas', 'readwrite');
                tx.objectStore('propostas').add(dados);
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
            } else {
                // Fallback: localStorage
                const props = JSON.parse(localStorage.getItem('versatil_propostas') || '[]');
                dados.id = Date.now();
                props.push(dados);
                localStorage.setItem('versatil_propostas', JSON.stringify(props));
                resolve();
            }
        });
        alert('✓ Proposta salva com sucesso!');
    } catch (err) {
        // Fallback localStorage
        const props = JSON.parse(localStorage.getItem('versatil_propostas') || '[]');
        dados.id = Date.now();
        props.push(dados);
        localStorage.setItem('versatil_propostas', JSON.stringify(props));
        alert('✓ Proposta salva!');
    }
}
