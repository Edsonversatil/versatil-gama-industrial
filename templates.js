/* =============================================
   VERSÁTIL SERVICES — Base de Conhecimento
   Templates técnicos por tipo de serviço
   Extraído dos documentos reais da empresa
   ============================================= */

const TEMPLATES_SERVICO = {

    usinagem: {
        nome: 'Usinagem de Campo',
        objetivo: 'Executar serviço especializado de usinagem de campo destinado à recuperação dimensional do componente, por meio de retífica e mandrilhamento controlado, utilizando mandrilhadora hidráulica portátil. A intervenção objetiva restabelecer as condições adequadas de funcionamento mecânico do conjunto.',
        escopo: [
            'Mobilização do equipamento de mandrilhamento portátil',
            'Instalação e alinhamento da mandrilhadora',
            'Execução da usinagem/retífica de precisão in situ',
            'Recuperação de faces de vedação (flanges)',
            'Reparo e usinagem de espelhos tubulares',
            'Alinhamento e usinagem de sedes de juntas',
            'Adequação de conexões e bocais',
            'Eliminação de ovalizações e imperfeições por desgaste/corrosão',
            'Alinhamento centesimal do eixo de usinagem',
            'Controle dimensional contínuo durante a intervenção',
            'Registro fotográfico e relatório técnico final'
        ],
        exclusoes: [
            'Desmontagem estrutural do equipamento',
            'Movimentação pesada do conjunto',
            'Ensaios metalúrgicos externos',
            'Fornecimento de peças novas',
            'Ensaios não destrutivos externos (END)'
        ],
        metodologia: 'A recuperação será executada por mandrilhamento interno progressivo, com alinhamento preciso da mandrilhadora e remoção controlada do material deformado, restabelecendo a geometria original do componente. O equipamento opera através da conversão de energia hidráulica em energia mecânica rotativa e linear, garantindo operação suave e controle preciso.',
        equipamento: 'Mandrilhadora hidráulica portátil — fabricação própria Versatil Services\n• Barra de mandrilhamento: Ø 2" (50,8 mm)\n• Comprimento: 2000 mm\n• Sistema de acionamento: Hidráulico de alto torque\n• Avanço micrométrico progressivo\n• Precisão geométrica: 0,05 mm',
        controleDimensional: 'Serão utilizados instrumentos calibrados: paquímetros industriais, micrômetros internos e relógios comparadores para garantir a precisão dimensional da peça recuperada.',
        prazoEstimado: '2 a 3 dias',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento técnico', valor: 0 },
            { descricao: 'Logística e mobilização/desmobilização', valor: 0 },
            { descricao: 'Usinagem / Retífica de campo', valor: 0 },
            { descricao: 'Controle dimensional e instrumentação', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    },

    rotativos: {
        nome: 'Equipamentos Rotativos',
        objetivo: 'Executar serviço de manutenção especializada em equipamento rotativo, contemplando inspeção técnica, diagnóstico, alinhamento geométrico, retífica de campo e comissionamento, visando restabelecer as condições operacionais do equipamento com segurança e confiabilidade.',
        escopo: [
            'Inspeção dimensional geral do conjunto rotativo',
            'Verificação de desgaste em pista, roletes e superfícies',
            'Alinhamento geométrico com Laser Tracker',
            'Correção de paralelismo, nível e concentricidade',
            'Retífica/usinagem de pista (tyres) in loco',
            'Retífica/usinagem de roletes de apoio',
            'Recuperação e retífica do rolete de encosto',
            'Inspeção e ajustes em coroa e pinhão',
            'Verificação de folgas e marca de contato',
            'Inspeção de mancais e carcaças',
            'Inspeção de selos e anéis de vedação',
            'Teste operacional e entrega técnica documentada'
        ],
        exclusoes: [
            'Fornecimento de rolamentos e peças de reposição',
            'Serviços de caldeiraria pesada',
            'Ensaios metalúrgicos laboratoriais',
            'Análise de vibração por empresa terceira'
        ],
        metodologia: 'A manutenção será executada seguindo procedimento técnico estruturado que contempla inspeção, diagnóstico, alinhamento geométrico, retífica de campo das superfícies de contato, ajuste do conjunto de transmissão, verificação de rolamentos e lubrificação, vedação e selagem, finalizando com comissionamento e entrega técnica documentada.',
        equipamento: 'Equipamentos de retífica portátil para pistas e roletes\n• Laser Tracker para alinhamento geométrico\n• Relógios comparadores e instrumentos de medição\n• Equipamentos de soldagem (quando aplicável)\n• Ferramentas especiais para rotativos industriais',
        controleDimensional: 'Verificação geométrica com Laser Tracker, medição de folgas com calibradores e relógios comparadores, análise de marca de contato em coroa/pinhão.',
        prazoEstimado: '5 a 10 dias (conforme escopo)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento técnico', valor: 0 },
            { descricao: 'Mobilização e desmobilização de equipe', valor: 0 },
            { descricao: 'Inspeção e diagnóstico do equipamento', valor: 0 },
            { descricao: 'Alinhamento geométrico', valor: 0 },
            { descricao: 'Retífica de campo (pistas/roletes)', valor: 0 },
            { descricao: 'Ajuste de transmissão e vedação', valor: 0 },
            { descricao: 'Comissionamento e entrega técnica', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    },

    manutencao: {
        nome: 'Manutenção Industrial',
        objetivo: 'Executar serviço de manutenção industrial especializada, contemplando diagnóstico, intervenção mecânica e entrega técnica documentada, visando restabelecer as condições operacionais do equipamento com máxima confiabilidade e mínimo tempo de parada.',
        escopo: [
            'Diagnóstico técnico do equipamento',
            'Planejamento da intervenção',
            'Execução da manutenção mecânica',
            'Substituição de componentes desgastados',
            'Ajustes e calibrações necessárias',
            'Teste funcional e validação operacional',
            'Registro fotográfico e relatório técnico'
        ],
        exclusoes: [
            'Fornecimento de peças e materiais',
            'Serviços elétricos e de automação',
            'Pintura e tratamento superficial',
            'Ensaios não destrutivos (END)'
        ],
        metodologia: 'A manutenção será executada conforme planejamento técnico previamente definido, com equipe especializada e ferramental adequado. Todos os serviços seguem procedimentos de segurança e qualidade, com rastreabilidade completa das atividades executadas.',
        equipamento: 'Ferramental mecânico especializado\n• Torquímetros calibrados\n• Equipamentos de medição dimensional\n• Dispositivos de alinhamento\n• Ferramentas especiais conforme necessidade',
        controleDimensional: 'Verificação dimensional com instrumentos calibrados conforme padrões de referência do equipamento.',
        prazoEstimado: '3 a 7 dias (conforme escopo)',
        itensComerciais: [
            { descricao: 'Planejamento técnico e engenharia', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Mão de obra especializada', valor: 0 },
            { descricao: 'Supervisão técnica', valor: 0 },
            { descricao: 'Documentação e relatório técnico', valor: 0 }
        ]
    },

    trocadores: {
        nome: 'Trocadores de Calor',
        objetivo: 'Executar serviço de manutenção especializada em trocador de calor, contemplando inspeção, limpeza, retubagem, mandrilhamento de tubos, teste hidrostático e recomposição do equipamento, assegurando integridade operacional e conformidade com normas aplicáveis.',
        tiposAtendidos: ['Tipo Placas', 'Casco e Tubos', 'Air Cooler', 'Radiador', 'Condensadores', 'Heatric (PCHE)'],
        escopo: [
            'Inspeção visual e dimensional do trocador',
            'Desmontagem e limpeza do feixe tubular',
            'Mandrilhamento e expansão de tubos',
            'Substituição de tubos (quando necessário)',
            'Teste hidrostático conforme ASME/NR-13',
            'Teste de estanqueidade com gás hélio (micro vazamentos)',
            'Teste tubo a tubo por vácuo/pneumática',
            'Locação e operação de saca-feixe (até 30 Ton)',
            'Aplicação de inserts e linners para extensão de vida útil',
            'Recomposição do equipamento',
            'Registro fotográfico e relatório técnico'
        ],
        exclusoes: [
            'Fornecimento de tubos e gaxetas',
            'Movimentação pesada com guindaste',
            'Serviços de caldeiraria no casco',
            'Análise metalúrgica laboratorial'
        ],
        metodologia: 'A intervenção será executada conforme procedimento técnico, incluindo desmontagem controlada, limpeza mecânica/química, mandrilhamento dos tubos com controle de expansão, e teste hidrostático para validação da estanqueidade do feixe tubular.',
        equipamento: 'Mandrilhadora para tubos\n• Equipamento de limpeza hidrojateamento\n• Bomba de teste hidrostático\n• Instrumentos de medição dimensional\n• Ferramentas especiais para trocadores',
        controleDimensional: 'Controle de expansão dos tubos, medição de espessura residual, teste hidrostático com registro de pressão e tempo de estabilização.',
        prazoEstimado: '5 a 15 dias (conforme quantidade de tubos)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Desmontagem e limpeza', valor: 0 },
            { descricao: 'Mandrilhamento / retubagem', valor: 0 },
            { descricao: 'Teste hidrostático', valor: 0 },
            { descricao: 'Recomposição e entrega', valor: 0 },
            { descricao: 'Documentação técnica', valor: 0 }
        ]
    },

    end: {
        nome: 'Ensaios Não Destrutivos',
        objetivo: 'Executar ensaios não destrutivos (END) para avaliação da integridade estrutural do componente/equipamento, utilizando técnicas normalizadas conforme normas ABNT, ASME e/ou Petrobras, emitindo laudo técnico com parecer de aprovação ou reprovação.',
        escopo: [
            'Preparação superficial da região de inspeção',
            'Execução do(s) ensaio(s) conforme procedimento qualificado',
            'Interpretação e avaliação dos resultados',
            'Emissão de laudo técnico com parecer',
            'Registro fotográfico da inspeção',
            'Rastreabilidade dos consumíveis utilizados'
        ],
        exclusoes: [
            'Montagem/desmontagem de andaimes',
            'Preparação de superfície por jateamento',
            'Reparos corretivos das descontinuidades encontradas',
            'Fornecimento de isolamento térmico'
        ],
        metodologia: 'Os ensaios serão executados conforme procedimentos qualificados, por inspetores certificados conforme ABENDI/SNQC. As técnicas aplicáveis incluem: Líquidos Penetrantes (LP), Partículas Magnéticas (PM), Ultrassom (US), Radiografia (RX), Inspeção Visual (IV), Correntes Parasitas (Eddy Current) e Termografia Infravermelha. Certificações conforme ABNT NBR-15239, ASME, API e NR-13.',
        equipamento: 'Kits de Líquidos Penetrantes e Partículas Magnéticas\n• Aparelho de Ultrassom digital\n• Equipamento de Radiografia Industrial\n• Luxímetro calibrado\n• Padrões de referência e blocos de calibração',
        controleDimensional: 'Medição de espessura por ultrassom, calibração dos equipamentos conforme padrões de referência, registro de parâmetros de ensaio.',
        prazoEstimado: '1 a 5 dias (conforme extensão)',
        itensComerciais: [
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Ensaios não destrutivos (LP/PM/US/RX)', valor: 0 },
            { descricao: 'Consumíveis de ensaio', valor: 0 },
            { descricao: 'Emissão de laudos técnicos', valor: 0 },
            { descricao: 'Documentação e relatório', valor: 0 }
        ]
    },

    caldeiraria: {
        nome: 'Caldeiraria e Soldagem',
        objetivo: 'Executar serviço de caldeiraria industrial e soldagem especializada para reparo, fabricação ou modificação de componentes estruturais, vasos de pressão, tubulações e equipamentos industriais, conforme normas ASME, AWS e NR-13.',
        escopo: [
            'Inspeção visual e dimensional da região de intervenção',
            'Preparação de juntas e chanfros conforme EPS/RQPS',
            'Execução de soldagem qualificada (TIG/MIG/MAG/Eletrodo)',
            'Deposição de solda para recuperação dimensional',
            'Pré e pós-aquecimento conforme especificação',
            'Tratamento térmico localizado (quando aplicável)',
            'Controle dimensional pós-soldagem',
            'Ensaios não destrutivos nas juntas soldadas',
            'Registro fotográfico e relatório técnico'
        ],
        exclusoes: [
            'Fornecimento de materiais base e consumíveis de soldagem',
            'Montagem/desmontagem de andaimes',
            'Tratamento térmico em forno externo',
            'Emissão de ART de projeto estrutural',
            'Jateamento e pintura industrial'
        ],
        metodologia: 'Os serviços de soldagem serão executados por soldadores qualificados conforme ASME IX / AWS D1.1, seguindo Especificações de Procedimento de Soldagem (EPS) aprovadas. Todos os parâmetros de soldagem serão monitorados e registrados, incluindo temperatura de pré-aquecimento, interpasse e pós-aquecimento.',
        equipamento: 'Máquinas de soldagem multiprocesso (TIG/MIG/MAG/Eletrodo)\n• Equipamento de tratamento térmico localizado\n• Pirômetros e termopares de contato\n• Ferramentas de preparação de juntas\n• Esmerilhadeiras e equipamentos de corte',
        controleDimensional: 'Verificação dimensional pré e pós-soldagem com instrumentos calibrados. Controle de deformação por pontos de referência. Ensaios não destrutivos conforme critérios de aceitação aplicáveis.',
        prazoEstimado: '3 a 10 dias (conforme extensão)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento de soldagem', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Preparação de juntas e chanfros', valor: 0 },
            { descricao: 'Soldagem qualificada', valor: 0 },
            { descricao: 'Tratamento térmico (se aplicável)', valor: 0 },
            { descricao: 'Ensaios não destrutivos', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    },

    torqueamento: {
        nome: 'Torqueamento Controlado',
        objetivo: 'Executar serviço de torqueamento controlado de uniões flangeadas, estojos e conexões críticas, garantindo a integridade das juntas e vedação conforme especificações técnicas do projeto, normas ASME PCC-1 e procedimentos do cliente.',
        escopo: [
            'Identificação e mapeamento das juntas a serem torqueadas',
            'Verificação da condição dos estojos, porcas e gaxetas',
            'Lubrificação adequada conforme especificação',
            'Execução do torqueamento em sequência cruzada (cross-pattern)',
            'Aplicação de torque em passes progressivos',
            'Registro individual de torque por estojo',
            'Emissão de certificado de torqueamento'
        ],
        exclusoes: [
            'Fornecimento de estojos, porcas e gaxetas',
            'Substituição de componentes danificados',
            'Teste hidrostático ou pneumático',
            'Montagem/desmontagem de flanges'
        ],
        metodologia: 'O torqueamento será executado conforme procedimento técnico baseado na ASME PCC-1, utilizando torquímetros hidráulicos ou manuais calibrados. A sequência de aperto seguirá padrão cruzado (cross-pattern) com passes progressivos (25%, 50%, 75%, 100% + verificação) para garantir distribuição uniforme de carga na gaxeta.',
        equipamento: 'Torquímetros hidráulicos de alta precisão\n• Torquímetros manuais calibrados (diversos ranges)\n• Bombas hidráulicas\n• Soquetes de impacto especiais\n• Lubrificantes e compostos anti-engripamento',
        controleDimensional: 'Controle de torque individual por estojo com registro em planilha. Torquímetros com certificado de calibração válido. Verificação de retorque após estabilização térmica quando aplicável.',
        prazoEstimado: '1 a 3 dias',
        itensComerciais: [
            { descricao: 'Planejamento e procedimento de torque', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Torqueamento controlado', valor: 0 },
            { descricao: 'Verificação de retorque', valor: 0 },
            { descricao: 'Certificado e relatório', valor: 0 }
        ]
    },

    alinhamento: {
        nome: 'Alinhamento a Laser',
        objetivo: 'Executar serviço de alinhamento de precisão em equipamentos rotativos utilizando tecnologia a laser, visando reduzir vibrações, desgaste prematuro de componentes e consumo energético, prolongando a vida útil dos equipamentos e aumentando a confiabilidade operacional.',
        escopo: [
            'Medição inicial de desalinhamento (angular e paralelo)',
            'Verificação de pé-manco (soft foot)',
            'Correção de desalinhamento com calços de precisão',
            'Alinhamento final com verificação em múltiplas posições',
            'Registro de valores antes e depois do alinhamento',
            'Emissão de relatório com dados do alinhamento'
        ],
        exclusoes: [
            'Substituição de acoplamentos e elementos flexíveis',
            'Reparos em base e chumbadores',
            'Balanceamento dinâmico',
            'Análise de vibração detalhada'
        ],
        metodologia: 'O alinhamento será executado com sistema laser de precisão, realizando medições angulares e paralelas nos planos horizontal e vertical. Será verificada condição de pé-manco previamente ao alinhamento. Os calços de correção serão dimensionados conforme software do equipamento laser, garantindo tolerâncias conforme padrão API ou norma aplicável.',
        equipamento: 'Sistema de alinhamento a laser de última geração\n• Calços de precisão (laminados inoxidáveis)\n• Relógios comparadores (verificação complementar)\n• Ferramentas de ajuste e posicionamento\n• Software de cálculo e relatório',
        controleDimensional: 'Tolerâncias de alinhamento conforme API 610/686 ou especificação do fabricante. Registro de valores de desalinhamento angular e paralelo nos planos horizontal e vertical.',
        prazoEstimado: '1 a 2 dias por trem de máquinas',
        itensComerciais: [
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Alinhamento a laser', valor: 0 },
            { descricao: 'Calços de precisão', valor: 0 },
            { descricao: 'Relatório técnico e certificado', valor: 0 }
        ]
    },

    inspecao: {
        nome: 'Inspeção de Equipamentos',
        objetivo: 'Executar inspeção técnica especializada em equipamentos industriais para avaliação de integridade estrutural, condição operacional e conformidade com normas regulamentadoras (NR-13, NR-12), emitindo laudo técnico com recomendações e prazo para próxima inspeção.',
        escopo: [
            'Inspeção visual interna e externa do equipamento',
            'Medição de espessura por ultrassom',
            'Verificação de dispositivos de segurança (PSV, manômetros)',
            'Avaliação de corrosão, erosão e desgaste',
            'Verificação de documentação e prontuário do equipamento',
            'Ensaios não destrutivos complementares (quando aplicável)',
            'Emissão de relatório de inspeção com recomendações',
            'Registro fotográfico detalhado'
        ],
        exclusoes: [
            'Reparos e intervenções corretivas',
            'Desmontagem de internos e acessórios',
            'Montagem/desmontagem de andaimes',
            'Limpeza interna do equipamento',
            'Teste hidrostático'
        ],
        metodologia: 'A inspeção será executada por Inspetor de Equipamentos qualificado, seguindo procedimentos técnicos baseados nas normas NR-13, ASME e API aplicáveis. Serão avaliadas condições estruturais, dimensional, dispositivos de segurança e histórico operacional do equipamento.',
        equipamento: 'Aparelho de ultrassom para medição de espessura\n• Kits de ensaios não destrutivos\n• Câmera fotográfica industrial\n• Instrumentos de medição dimensional\n• Luxímetro e boroscópio (quando aplicável)',
        controleDimensional: 'Medição de espessura em pontos estratégicos com mapeamento por quadrantes. Comparação com espessura mínima de projeto conforme memorial de cálculo.',
        prazoEstimado: '1 a 3 dias por equipamento',
        itensComerciais: [
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Inspeção visual e dimensional', valor: 0 },
            { descricao: 'Medição de espessura por ultrassom', valor: 0 },
            { descricao: 'Ensaios complementares', valor: 0 },
            { descricao: 'Laudo técnico e relatório', valor: 0 }
        ]
    },

    fabricacao: {
        nome: 'Fabricação de Peças e Dispositivos',
        objetivo: 'Executar fabricação de peças mecânicas, dispositivos de usinagem, gabaritos e ferramentais especiais sob encomenda, conforme desenho técnico ou engenharia reversa, utilizando processos de usinagem convencional e CNC com controle dimensional rigoroso.',
        escopo: [
            'Análise do desenho técnico ou engenharia reversa da peça',
            'Seleção de material conforme especificação',
            'Programação e setup de máquina',
            'Usinagem conforme tolerâncias especificadas',
            'Tratamento térmico / superficial (quando especificado)',
            'Controle dimensional final com certificado',
            'Embalagem e entrega'
        ],
        exclusoes: [
            'Fornecimento de matéria-prima (salvo acordo)',
            'Projeto mecânico e cálculo estrutural',
            'Tratamentos superficiais especiais (cromagem, niquelagem)',
            'Certificações de material (responsabilidade do fornecedor de matéria-prima)'
        ],
        metodologia: 'A fabricação será executada conforme desenho técnico aprovado, com planejamento de processos que define sequência de usinagem, ferramentas, parâmetros de corte e pontos de controle dimensional. Peças críticas serão inspecionadas em etapas intermediárias.',
        equipamento: 'Torno convencional e CNC\n• Fresadora universal e CNC\n• Furadeira radial\n• Retífica cilíndrica e plana\n• Instrumentos de medição de precisão',
        controleDimensional: 'Controle dimensional com instrumentos calibrados: paquímetros, micrômetros, relógios comparadores, blocos padrão e calibradores. Emissão de certificado dimensional quando solicitado.',
        prazoEstimado: '5 a 15 dias (conforme complexidade)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento de fabricação', valor: 0 },
            { descricao: 'Matéria-prima (quando aplicável)', valor: 0 },
            { descricao: 'Usinagem e fabricação', valor: 0 },
            { descricao: 'Tratamento térmico (se aplicável)', valor: 0 },
            { descricao: 'Controle dimensional e certificado', valor: 0 },
            { descricao: 'Embalagem e entrega', valor: 0 }
        ]
    },

    parada: {
        nome: 'Parada de Manutenção (Turnaround)',
        objetivo: 'Executar serviços de manutenção mecânica durante parada programada de unidade industrial, contemplando planejamento, mobilização de equipe, execução simultânea de múltiplos escopos e comissionamento, com foco em segurança, qualidade e cumprimento do cronograma.',
        escopo: [
            'Planejamento e cronograma detalhado de atividades',
            'Mobilização de equipe técnica especializada',
            'Desmontagem, inspeção e limpeza de equipamentos',
            'Usinagem de campo em flanges, sedes e superfícies',
            'Mandrilhamento e retubagem de trocadores',
            'Torqueamento controlado de juntas flangeadas',
            'Alinhamento de equipamentos rotativos',
            'Ensaios não destrutivos (LP/PM/US)',
            'Teste hidrostático conforme NR-13',
            'Comissionamento e entrega técnica',
            'Relatórios diários de avanço (RDA)'
        ],
        exclusoes: [
            'Fornecimento de materiais e sobressalentes',
            'Montagem/desmontagem de andaimes',
            'Serviços de caldeiraria pesada (acima de 2")',
            'Pintura e isolamento térmico',
            'Serviços elétricos e de instrumentação'
        ],
        metodologia: 'A parada será executada conforme planejamento integrado, com gestão de cronograma, controle de recursos e relatórios diários de avanço. A equipe operará em turnos conforme necessidade, garantindo máxima produtividade com segurança. Todas as atividades seguem procedimentos técnicos aprovados e permissões de trabalho.',
        equipamento: 'Conjunto completo de ferramental mecânico\n• Equipamentos de usinagem de campo portáteis\n• Torquímetros hidráulicos e manuais\n• Sistema de alinhamento a laser\n• Equipamentos de END\n• Bomba de teste hidrostático\n• Ferramentas especiais conforme escopo',
        controleDimensional: 'Controle dimensional em todas as etapas críticas. Inspeção de recebimento de materiais. Ensaios conforme plano de inspeção e testes. Registro em data-book de parada.',
        prazoEstimado: '7 a 30 dias (conforme escopo da parada)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento de parada', valor: 0 },
            { descricao: 'Mobilização/desmobilização de equipe', valor: 0 },
            { descricao: 'Supervisão técnica', valor: 0 },
            { descricao: 'Mão de obra mecânica (HH)', valor: 0 },
            { descricao: 'Usinagem de campo', valor: 0 },
            { descricao: 'Torqueamento controlado', valor: 0 },
            { descricao: 'Ensaios não destrutivos', valor: 0 },
            { descricao: 'Testes hidrostáticos', valor: 0 },
            { descricao: 'Documentação e data-book', valor: 0 }
        ]
    },

    gerenciamento: {
        nome: 'Gerenciamento e Fiscalização de Contratos',
        objetivo: 'Executar serviço de apoio à gestão, fiscalização e gerenciamento de contratos de manutenção industrial, garantindo o cumprimento de escopos, prazos, custos e padrões de qualidade e segurança estabelecidos pelo cliente.',
        escopo: [
            'Fiscalização técnica das atividades contratadas',
            'Acompanhamento de cronograma e avanço físico',
            'Controle de qualidade das intervenções',
            'Gestão de interfaces entre disciplinas',
            'Verificação de conformidade com normas e procedimentos',
            'Participação em reuniões de planejamento e coordenação',
            'Emissão de relatórios de acompanhamento',
            'Validação de medições e boletins de serviço'
        ],
        exclusoes: [
            'Execução direta dos serviços de manutenção',
            'Fornecimento de materiais e sobressalentes',
            'Responsabilidade sobre prazo de terceiros',
            'Elaboração de projetos de engenharia'
        ],
        metodologia: 'O gerenciamento será executado por profissional técnico experiente, atuando como representante do cliente junto às contratadas. Serão utilizadas ferramentas de controle de cronograma, medição de avanço e indicadores de desempenho para garantir a execução conforme planejado.',
        equipamento: 'Ferramentas de gestão de projetos\n• Instrumentos de medição para verificação\n• Câmera fotográfica para registro\n• EPI e acesso às áreas operacionais',
        controleDimensional: 'Verificação por amostragem dos serviços executados. Acompanhamento de ensaios e testes. Validação de relatórios técnicos das contratadas.',
        prazoEstimado: 'Conforme duração do contrato',
        itensComerciais: [
            { descricao: 'Fiscalização técnica (por dia)', valor: 0 },
            { descricao: 'Supervisão de campo (por dia)', valor: 0 },
            { descricao: 'Relatórios e documentação', valor: 0 },
            { descricao: 'Despesas de deslocamento', valor: 0 }
        ]
    },

    limpezaIndustrial: {
        nome: 'Limpeza Industrial Especializada',
        objetivo: 'Executar serviço de limpeza industrial especializada em equipamentos de troca térmica, utilizando técnicas mecânicas, químicas e/ou hidrojateamento sob ultra alta pressão (UHP), visando a remoção de incrustações, depósitos e contaminantes que comprometem a eficiência térmica e a integridade dos equipamentos.',
        escopo: [
            'Avaliação prévia do grau de incrustação e tipo de depósito',
            'Seleção do método de limpeza adequado (mecânica/química/UHP)',
            'Limpeza mecânica com sistema de limpadores metálicos gabaritados',
            'Limpeza química com soluções controladas e neutralização',
            'Hidrojateamento sob ultra alta pressão (UHP) e pressão controlada',
            'Limpeza mecânica de placas com equipamento de alta pressão',
            'Tratamento e descarte de efluentes conforme normas ambientais',
            'Inspeção visual pós-limpeza e registro fotográfico',
            'Relatório técnico com comparativo antes/depois'
        ],
        exclusoes: [
            'Desmontagem/montagem do equipamento',
            'Movimentação pesada com guindaste',
            'Reparos em tubos danificados',
            'Fornecimento de gaxetas e vedações',
            'Tratamento de efluentes industriais externos'
        ],
        metodologia: 'A limpeza mecânica utiliza limpadores metálicos com tamanho gabaritado para cada diâmetro de tubo, em processo não rotativo que garante a integridade do tubo independente do material. A limpeza química emprega soluções controladas com monitoramento de concentração e temperatura. O hidrojateamento UHP é a solução mais rápida, segura e econômica para tratamento de superfícies, operando sob pressão controlada para máxima eficiência.',
        equipamento: 'Sistema CONCO de limpadores metálicos gabaritados\n• Unidade de hidrojateamento UHP (até 40.000 PSI)\n• Bombas de alta pressão com controle de vazão\n• Kits de produtos químicos para limpeza\n• Equipamentos de neutralização\n• Instrumentos de medição de pH e concentração',
        controleDimensional: 'Medição de depósito residual por amostragem. Verificação de integridade tubular pós-limpeza. Comparativo fotográfico antes/depois. Análise de eficiência térmica quando aplicável.',
        prazoEstimado: '2 a 7 dias (conforme quantidade e grau de incrustação)',
        itensComerciais: [
            { descricao: 'Planejamento e avaliação técnica', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Limpeza mecânica / química / UHP', valor: 0 },
            { descricao: 'Consumíveis e produtos químicos', valor: 0 },
            { descricao: 'Tratamento de efluentes', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    },

    retubagem: {
        nome: 'Retubagem de Campo',
        objetivo: 'Executar serviço de retubagem total ou parcial em trocadores de calor e condensadores, contemplando remoção dos tubos danificados, preparação dos espelhos tubulares, instalação e mandrilhamento de tubos novos, e teste hidrostático final, assegurando a integridade e estanqueidade do equipamento.',
        escopo: [
            'Inspeção e mapeamento dos tubos a serem substituídos',
            'Remoção dos tubos danificados (total ou parcial)',
            'Preparação e limpeza dos furos nos espelhos tubulares',
            'Instalação dos tubos novos conforme especificação',
            'Mandrilhamento e expansão controlada dos tubos',
            'Teste de estanqueidade tubo a tubo (pneumático/vácuo)',
            'Teste hidrostático conforme ASME/NR-13',
            'Teste com gás hélio para detecção de micro vazamentos',
            'Registro fotográfico e relatório técnico final'
        ],
        exclusoes: [
            'Fornecimento de tubos e materiais',
            'Movimentação pesada do equipamento',
            'Reparos em casco e espelhos (caldeiraria)',
            'Fabricação de componentes novos',
            'Pintura e isolamento térmico'
        ],
        metodologia: 'A retubagem será executada conforme procedimento técnico, com controle rigoroso de expansão dos tubos por mandrilhamento. Serão aplicados testes de estanqueidade tubo a tubo e teste hidrostático final para validação. Em casos de alta criticidade, será utilizado teste com gás hélio para detecção de micro vazamentos não identificáveis por métodos convencionais.',
        equipamento: 'Mandrilhadoras pneumáticas e hidráulicas\n• Extratores de tubos\n• Equipamento de teste tubo a tubo (vácuo/pressão)\n• Bomba de teste hidrostático\n• Detector de vazamento por gás hélio\n• Instrumentos de medição dimensional',
        controleDimensional: 'Controle de expansão dos tubos por mandrilhamento com registro individual. Medição de diâmetro interno pré e pós-expansão. Teste hidrostático com registro de pressão, temperatura e tempo de estabilização.',
        prazoEstimado: '5 a 20 dias (conforme quantidade de tubos)',
        itensComerciais: [
            { descricao: 'Engenharia e planejamento', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Remoção de tubos danificados', valor: 0 },
            { descricao: 'Instalação e mandrilhamento', valor: 0 },
            { descricao: 'Testes de estanqueidade', valor: 0 },
            { descricao: 'Teste hidrostático final', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    },

    revestimentos: {
        nome: 'Revestimentos Especiais',
        objetivo: 'Executar serviço de aplicação de revestimento interno e/ou externo em equipamentos de troca térmica, visando o aumento da vida útil, proteção contra corrosão, erosão, abrasão e incrustação, mantendo a eficiência da troca térmica e reduzindo a frequência de manutenção.',
        escopo: [
            'Avaliação do substrato e tipo de degradação',
            'Preparação de superfície conforme especificação do revestimento',
            'Aplicação de revestimento em tubos (interno/externo)',
            'Aplicação de revestimento em placas de trocadores',
            'Aplicação de revestimento em casco e componentes',
            'Cura e pós-cura conforme especificação do fabricante',
            'Inspeção de aderência e espessura do revestimento',
            'Teste de integridade e estanqueidade',
            'Registro fotográfico e relatório técnico'
        ],
        exclusoes: [
            'Fornecimento de revestimento (salvo acordo)',
            'Reparos estruturais no equipamento',
            'Desmontagem/montagem de internos',
            'Jateamento abrasivo (quando terceirizado)',
            'Tratamento térmico em forno'
        ],
        metodologia: 'O revestimento será selecionado conforme os fluidos de processo, temperaturas operacionais e tipo de degradação. A aplicação pode ser total ou localizada nas áreas com maior frequência de substituição ou efeitos de corrosão. O processo garante eliminação de corrosão, incrustações, abrasão e erosão, mantém a eficiência térmica e reduz a frequência de limpeza.',
        equipamento: 'Equipamentos de preparação de superfície\n• Sistemas de aplicação airless/HVLP\n• Medidores de espessura de camada úmida e seca\n• Instrumentos de controle ambiental (temperatura, umidade)\n• Equipamento de cura/pós-cura\n• Kits de teste de aderência (pull-off)',
        controleDimensional: 'Medição de espessura de película seca (EPS) conforme especificação. Teste de aderência por tração (pull-off test). Inspeção visual com padrão fotográfico. Teste holiday (porosidade) quando aplicável.',
        prazoEstimado: '3 a 10 dias (conforme área e número de demãos)',
        itensComerciais: [
            { descricao: 'Avaliação técnica e especificação', valor: 0 },
            { descricao: 'Mobilização e desmobilização', valor: 0 },
            { descricao: 'Preparação de superfície', valor: 0 },
            { descricao: 'Aplicação de revestimento', valor: 0 },
            { descricao: 'Inspeção e testes de qualidade', valor: 0 },
            { descricao: 'Documentação técnica e relatório', valor: 0 }
        ]
    }
};

// Dados fixos da empresa
const DADOS_VERSATIL = {
    razaoSocial: 'Versatil Services LTDA',
    razaoSocialCurta: 'VERSATIL GLOBAL SERVICE',
    enderecoLinha1: 'RUA: VISCONDE DE EMBARE, 230 – VALONGO – CONJ. 1901',
    cidadeUfCep: 'SANTOS-SP C.E.P.: 11010-240',
    enderecoCompleto: 'Rua Visconde do Embaré, 230 – Conj. 1901',
    bairro: 'Valongo',
    cidadeUf: 'Santos/SP',
    cep: '11010-240',
    cnpj: '50.134.362/0001-43',
    ie: '132.146.163.110',
    responsavel: 'Edson de Oliveira Silva',
    responsavelCompleto: 'Eng. Edson de Oliveira Silva',
    crea: 'CREA-SP: 5068954051',
    formacao: [
        'Engenheiro Mecânico',
        'Engenharia em Segurança do Trabalho',
        'Pós-graduação em Criação e Desenvolvimento de Projetos'
    ],
    formacaoCompleta: [
        'Engenheiro Mecânico',
        'Engenharia de Segurança do Trabalho',
        'Inspetor de Equipamentos',
        'Pós Graduado em Gestão de Projetos PMI-PMBOK',
        'Pós Graduado em Engenharia de Software'
    ],
    email: 'dp.tecnico@versatilservices.com.br',
    telefone: '(13) 99150-9140',
    telefoneFixo: '(13) 3221-8000'
};

const CONDICOES_COMERCIAIS_PADRAO = {
    formaPagamento: 'Arranque de Mobilização 30% — Saldo restante 21 DDL após finalização dos serviços',
    validadeProposta: '30 dias corridos a partir da data de emissão',
    garantia: '90 dias sobre a mão de obra executada',
    impostos: 'IR, PIS, COFINS, CSLL — Incluso sobre os serviços',
    inclusoes: 'Todos os valores incluem: mão de obra especializada, ferramental, instrumentação, EPI e documentação técnica.',
    observacoes: 'Atendimento Programado. Valores sujeitos à confirmação após visita técnica.'
};
