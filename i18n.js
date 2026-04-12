/* =============================================
   VERSATIL GAMA INDUSTRIAL — i18n + Multi-Moeda
   Sistema de internacionalização e conversão
   NÃO altera lógica interna — apenas exibição
   ============================================= */

(function() {
    'use strict';

    // =============================================
    // 1. CONFIGURAÇÃO DE MOEDA
    // =============================================
    const EXCHANGE_RATE = 5.00; // 1 USD = 5 BRL (ajustável)

    const CURRENCY_CONFIG = {
        pt: { symbol: 'R$', code: 'BRL', rate: 1, locale: 'pt-BR' },
        en: { symbol: '$',  code: 'USD', rate: EXCHANGE_RATE, locale: 'en-US' },
        es: { symbol: '$',  code: 'USD', rate: EXCHANGE_RATE, locale: 'es-ES' }
    };

    // =============================================
    // 2. TRADUÇÃO DOS PRODUTOS (nome + descrição)
    // =============================================
    const PRODUCT_TRANSLATIONS = {
        // ── PREMIUM: Rebolos Diamantados (1-10) ──
        'Rebolo Diamantado Copo Segmentado Heavy Duty': {
            en: { name: 'Segmented Cup Diamond Grinding Wheel Heavy Duty', desc: 'High-concentration diamond segments for surface grinding. Application: surface grinding of carbide and technical ceramics. Abrasive: synthetic diamond. Performance: severe industrial use.' },
            es: { name: 'Muela Diamantada Copa Segmentada Heavy Duty', desc: 'Segmentos diamantados de alta concentración para rectificado de superficie. Aplicación: rectificado plano de metal duro y cerámicas técnicas. Abrasivo: diamante sintético. Rendimiento: uso industrial severo.' }
        },
        'Rebolo Diamantado Reto para Metal Duro': {
            en: { name: 'Straight Diamond Wheel for Carbide', desc: 'Straight profile for carbide machining. Application: sharpening and grinding of inserts. Abrasive: resinoid diamond. Performance: high removal with fine finish.' },
            es: { name: 'Muela Diamantada Recta para Metal Duro', desc: 'Perfil recto para mecanizado de carburos. Aplicación: afilado y rectificado de insertos. Abrasivo: diamante resinoide. Rendimiento: alta remoción con acabado fino.' }
        },
        'Rebolo Diamantado Perfilado Alta Precisão': {
            en: { name: 'Precision Profile Diamond Grinding Wheel', desc: 'Custom profile for precision toolmaking. Application: complex profile grinding. Abrasive: vitrified diamond. Performance: micrometric tolerance.' },
            es: { name: 'Muela Diamantada Perfilada Alta Precisión', desc: 'Perfil a medida para herramentería de precisión. Aplicación: rectificado de perfiles complejos. Abrasivo: diamante vitrificado. Rendimiento: tolerancia micrométrica.' }
        },
        'Rebolo Diamantado para Cerâmica Técnica': {
            en: { name: 'Diamond Wheel for Technical Ceramics', desc: 'Fine grit for advanced ceramics and zirconia. Application: engineering ceramic components. Abrasive: fine resinoid diamond. Performance: minimal chipping.' },
            es: { name: 'Muela Diamantada para Cerámica Técnica', desc: 'Grano fino para cerámicas avanzadas y circonia. Aplicación: componentes cerámicos de ingeniería. Abrasivo: diamante resinoide fino. Rendimiento: mínimo astillado.' }
        },
        'Rebolo Diamantado para Retífica Plana': {
            en: { name: 'Diamond Wheel for Surface Grinding', desc: 'Large diameter for flat surface grinding. Application: serial production of flat parts. Abrasive: diamond with aluminum body. Performance: dimensional stability.' },
            es: { name: 'Muela Diamantada para Rectificado Plano', desc: 'Gran diámetro para rectificado de superficies planas. Aplicación: producción en serie de piezas planas. Abrasivo: diamante con cuerpo de aluminio. Rendimiento: estabilidad dimensional.' }
        },
        'Rebolo Diamantado Resinóide Alta Performance': {
            en: { name: 'High Performance Resinoid Diamond Wheel', desc: 'Resinoid bond for premium finishing. Application: polishing and fine grinding of carbide. Abrasive: resinoid matrix diamond. Performance: surface finish Ra < 0.2 µm.' },
            es: { name: 'Muela Diamantada Resinoide Alto Rendimiento', desc: 'Liga resinoide para acabado premium. Aplicación: pulido y rectificado fino de metal duro. Abrasivo: diamante en matriz resinoide. Rendimiento: acabado superficial Ra < 0.2 µm.' }
        },
        'Rebolo Diamantado Vitrificado Industrial': {
            en: { name: 'Industrial Vitrified Diamond Grinding Wheel', desc: 'Vitrified bond for maximum rigidity and profile retention. Application: precision serial grinding. Abrasive: vitrified diamond. Performance: long life in continuous production.' },
            es: { name: 'Muela Diamantada Vitrificada Industrial', desc: 'Liga vitrificada para máxima rigidez y retención de perfil. Aplicación: rectificado de precisión en serie. Abrasivo: diamante vitrificado. Rendimiento: larga vida útil en producción continua.' }
        },
        'Rebolo Diamantado para Vidro Industrial': {
            en: { name: 'Diamond Wheel for Industrial Glass', desc: 'Beveling and polishing of technical glass. Application: optical and tempered glass. Abrasive: fine resinoid diamond. Performance: crack-free finish.' },
            es: { name: 'Muela Diamantada para Vidrio Industrial', desc: 'Lapidación y biselado de vidrios técnicos. Aplicación: vidrio óptico y templado. Abrasivo: diamante resinoide fino. Rendimiento: acabado sin grietas.' }
        },
        'Rebolo Diamantado para Carbeto de Tungstênio': {
            en: { name: 'Diamond Wheel for Tungsten Carbide', desc: 'Grinding of tungsten carbide inserts and parts. Application: toolmaking and carbide machining. Abrasive: high-concentration diamond. Performance: controlled removal without thermal damage.' },
            es: { name: 'Muela Diamantada para Carburo de Tungsteno', desc: 'Rectificado de insertos y piezas de carburo de tungsteno. Aplicación: herramentería y mecanizado de metal duro. Abrasivo: diamante de alta concentración. Rendimiento: remoción controlada sin daños térmicos.' }
        },
        'Rebolo Diamantado para Afiação de Ferramentas': {
            en: { name: 'Diamond Wheel for Tool Sharpening', desc: 'Dish profile for sharpening drills, end mills and cutting tools. Application: carbide tool sharpening. Abrasive: resinoid diamond. Performance: perfect cutting edge.' },
            es: { name: 'Muela Diamantada para Afilado de Herramientas', desc: 'Perfil plato para afilado de brocas, fresas y herramientas de corte. Aplicación: afilado de herramientas de metal duro. Abrasivo: diamante resinoide. Rendimiento: filo de corte perfecto.' }
        },

        // ── PREMIUM: Rebolos CBN (11-20) ──
        'Rebolo CBN Vitrificado para Aço Temperado': {
            en: { name: 'Vitrified CBN Wheel for Hardened Steel', desc: 'Grinding of hardened steels above 55 HRC. Application: shafts, crankshafts and hardened gears. Abrasive: vitrified CBN. Performance: superior thermal and dimensional stability.' },
            es: { name: 'Muela CBN Vitrificada para Acero Templado', desc: 'Rectificado de aceros endurecidos por encima de 55 HRC. Aplicación: ejes, cigüeñales y engranajes templados. Abrasivo: CBN vitrificado. Rendimiento: estabilidad térmica y dimensional superior.' }
        },
        'Rebolo CBN Resinóide Alta Precisão': {
            en: { name: 'Precision Resinoid CBN Grinding Wheel', desc: 'Fine finishing on hardened steels with minimal heat. Application: precision tool and mold grinding. Abrasive: resinoid CBN. Performance: Ra < 0.4 µm.' },
            es: { name: 'Muela CBN Resinoide Alta Precisión', desc: 'Acabado fino en aceros endurecidos con mínimo calor. Aplicación: rectificado de precisión de herramientas y moldes. Abrasivo: CBN resinoide. Rendimiento: Ra < 0.4 µm.' }
        },
        'Rebolo CBN Copo Industrial': {
            en: { name: 'Industrial CBN Cup Wheel', desc: 'Surface grinding of tool steel and hardened parts. Application: flat machining of high-precision components. Abrasive: vitrified CBN cup type. Performance: maximum flatness.' },
            es: { name: 'Muela CBN Copa Industrial', desc: 'Rectificado de superficie en acero herramienta y piezas endurecidas. Aplicación: mecanizado plano de componentes de alta precisión. Abrasivo: CBN vitrificado tipo copa. Rendimiento: planicidad máxima.' }
        },
        'Rebolo CBN para Retífica Interna': {
            en: { name: 'CBN Wheel for Internal Grinding', desc: 'Small diameters for bores and internal cavities. Application: internal grinding of bearings and bushings. Abrasive: CBN with steel body. Performance: perfect concentricity.' },
            es: { name: 'Muela CBN para Rectificado Interno', desc: 'Diámetros reducidos para agujeros y cavidades internas. Aplicación: rectificado interno de rodamientos y bujes. Abrasivo: CBN con cuerpo de acero. Rendimiento: concentricidad perfecta.' }
        },
        'Rebolo CBN para Retífica Cilíndrica': {
            en: { name: 'CBN Wheel for Cylindrical Grinding', desc: 'Large format for external shaft and cylinder grinding. Application: automotive and aerospace serial production. Abrasive: high-speed vitrified CBN. Performance: 10x removal rate vs. conventional.' },
            es: { name: 'Muela CBN para Rectificado Cilíndrico', desc: 'Gran formato para rectificado externo de ejes y cilindros. Aplicación: producción en serie automotriz y aeronáutica. Abrasivo: CBN vitrificado de alta velocidad. Rendimiento: remoción 10x superior al convencional.' }
        },
        'Rebolo CBN para Engrenagens': {
            en: { name: 'CBN Wheel for Gears', desc: 'Special profiles for hardened gear teeth. Application: automotive and transmission industry. Abrasive: profiled CBN. Performance: DIN 3962 precision class.' },
            es: { name: 'Muela CBN para Engranajes', desc: 'Perfiles especiales para dientes de engranajes templados. Aplicación: industria automotriz y transmisiones. Abrasivo: CBN perfilado. Rendimiento: clase de precisión DIN 3962.' }
        },
        'Rebolo CBN Alta Velocidade': {
            en: { name: 'High-Speed CBN Grinding Wheel', desc: 'Balanced body for high RPM operation. Application: high-speed CNC grinding. Abrasive: reinforced vitrified CBN. Performance: up to 120 m/s peripheral speed.' },
            es: { name: 'Muela CBN Alta Velocidad', desc: 'Cuerpo balanceado para operación en altas RPM. Aplicación: rectificado de alta velocidad en CNC. Abrasivo: CBN vitrificado reforzado. Rendimiento: hasta 120 m/s de velocidad periférica.' }
        },
        'Rebolo CBN Ultra Precisão': {
            en: { name: 'Ultra Precision CBN Wheel', desc: 'Submicron tolerance for critical applications. Application: aerospace and medical components. Abrasive: nanometric vitrified CBN. Performance: roughness Ra < 0.1 µm.' },
            es: { name: 'Muela CBN Ultra Precisión', desc: 'Tolerancia submicrón para aplicaciones críticas. Aplicación: componentes aeroespaciales y médicos. Abrasivo: CBN vitrificado nanométrico. Rendimiento: rugosidad Ra < 0.1 µm.' }
        },
        'Rebolo CBN para Rolamentos Industriais': {
            en: { name: 'CBN Wheel for Industrial Bearings', desc: 'Inner and outer race grinding. Application: precision bearing manufacturing. Abrasive: special vitrified CBN. Performance: IT5 and circularity < 1 µm.' },
            es: { name: 'Muela CBN para Rodamientos Industriales', desc: 'Rectificado de pistas internas y externas de rodamientos. Aplicación: industria de rodamientos de precisión. Abrasivo: CBN vitrificado especial. Rendimiento: IT5 y circularidad < 1 µm.' }
        },
        'Rebolo CBN para Moldes e Matrizes': {
            en: { name: 'CBN Wheel for Molds and Dies', desc: 'Special format for mold cavities and profiles. Application: injection molding and stamping toolmakers. Abrasive: high-durability resinoid CBN. Performance: 50x lifespan vs. conventional.' },
            es: { name: 'Muela CBN para Moldes y Matrices', desc: 'Formato especial para cavidades y perfiles de moldes. Aplicación: herramentería de inyección plástica y estampación. Abrasivo: CBN resinoide de alta durabilidad. Rendimiento: vida útil 50x superior al convencional.' }
        },

        // ── PREMIUM: Cintas Abrasivas (21-30) ──
        'Cinta Abrasiva Zircônia Heavy Duty': {
            en: { name: 'Heavy Duty Zirconia Abrasive Belt', desc: 'Self-sharpening zirconia grain for heavy stock removal. Application: foundry, fabrication and structural metalwork. Abrasive: zirconia on polyester. Performance: 3x removal rate vs. aluminum oxide.' },
            es: { name: 'Cinta Abrasiva Circonia Heavy Duty', desc: 'Grano circonia autocortante para desbaste pesado. Aplicación: calderería, fundición y estructuras metálicas. Abrasivo: circonia sobre poliéster. Rendimiento: remoción 3x superior al óxido de aluminio.' }
        },
        'Cinta Abrasiva Cerâmica Premium': {
            en: { name: 'Premium Ceramic Abrasive Belt', desc: 'Latest generation ceramic grain for continuous high removal. Application: centerless grinding and serial deburring. Abrasive: microcrystalline ceramic. Performance: 5x standard lifespan.' },
            es: { name: 'Cinta Abrasiva Cerámica Premium', desc: 'Grano cerámico de última generación para alta remoción continua. Aplicación: rectificado centerless y desbaste en serie. Abrasivo: cerámico microcristalino. Rendimiento: 5x vida útil estándar.' }
        },
        'Cinta Abrasiva para Aço Inox Industrial': {
            en: { name: 'Industrial Stainless Steel Abrasive Belt', desc: 'Iron-free finish, no ferrous contamination. Application: polishing and finishing of stainless tubes and sheets. Abrasive: iron-free zirconia/ceramic. Performance: sanitary and pharmaceutical grade finish.' },
            es: { name: 'Cinta Abrasiva para Acero Inoxidable Industrial', desc: 'Acabado libre de contaminación ferrosa. Aplicación: pulido y acabado de tubos y chapas inox. Abrasivo: circonia/cerámica sin hierro. Rendimiento: acabado sanitario y farmacéutico.' }
        },
        'Cinta Abrasiva para Caldeiraria Pesada': {
            en: { name: 'Heavy Fabrication Abrasive Belt', desc: 'Reinforced construction for heavy plate stock removal. Application: weld joint preparation and beveling. Abrasive: zirconia grit 24-36. Performance: extreme heat resistance.' },
            es: { name: 'Cinta Abrasiva para Calderería Pesada', desc: 'Construcción reforzada para remoción bruta en chapas gruesas. Aplicación: preparación de juntas soldadas y chaflanes. Abrasivo: circonia grano 24-36. Rendimiento: resistencia al calor extremo.' }
        },
        'Cinta Abrasiva Banda Larga Industrial': {
            en: { name: 'Industrial Wide Belt Abrasive', desc: 'Extra-wide format for calibrating machines and planers. Application: metal panel and industrial MDF calibration. Abrasive: aluminum oxide/ceramic. Performance: thickness uniformity ±0.02mm.' },
            es: { name: 'Cinta Abrasiva Banda Ancha Industrial', desc: 'Formato extra ancho para calibradoras y cepilladoras industriales. Aplicación: calibración de paneles metálicos y MDF industrial. Abrasivo: óxido de aluminio/cerámica. Rendimiento: uniformidad de espesor ±0.02mm.' }
        },
        'Cinta Abrasiva Alta Remoção para Fundição': {
            en: { name: 'High Removal Abrasive Belt for Foundry', desc: 'Extra coarse grit for cast part cleaning. Application: gate, flash and sand removal from castings. Abrasive: zirconia grit 16-24. Performance: continuous heavy load operation.' },
            es: { name: 'Cinta Abrasiva Alta Remoción para Fundición', desc: 'Grano extra grueso para limpieza de piezas fundidas. Aplicación: remoción de canales, rebabas y arena de fundición. Abrasivo: circonia grano 16-24. Rendimiento: operación con carga pesada continua.' }
        },
        'Cinta Abrasiva para Tubulações Industriais': {
            en: { name: 'Industrial Pipe Abrasive Belt', desc: 'Narrow format for portable pipe sanders. Application: field pipe finishing. Abrasive: flexible zirconia. Performance: uniform finish on curved surfaces.' },
            es: { name: 'Cinta Abrasiva para Tubulaciones Industriales', desc: 'Formato estrecho para lijadoras portátiles de tubos. Aplicación: acabado de tubulaciones en campo. Abrasivo: circonia flexible. Rendimiento: acabado uniforme en superficies curvas.' }
        },
        'Cinta Abrasiva para Estruturas Metálicas': {
            en: { name: 'Structural Metalwork Abrasive Belt', desc: 'Surface preparation for industrial painting. Application: cleaning of metal profiles and beams. Abrasive: aluminum oxide grit 40-80. Performance: ideal roughness profile for adhesion.' },
            es: { name: 'Cinta Abrasiva para Estructuras Metálicas', desc: 'Preparación de superficie para pintura industrial. Aplicación: limpieza de perfiles y vigas metálicas. Abrasivo: óxido de aluminio grano 40-80. Rendimiento: perfil de rugosidad ideal para adherencia.' }
        },
        'Cinta Abrasiva para Equipamentos de Mineração': {
            en: { name: 'Mining Equipment Abrasive Belt', desc: 'Ultra-resistant for severe mining use. Application: maintenance of conveyor belts, rollers and heavy components. Abrasive: reinforced zirconia. Performance: extreme impact and abrasion resistance.' },
            es: { name: 'Cinta Abrasiva para Equipos de Minería', desc: 'Ultra resistente para uso severo en minería. Aplicación: mantenimiento de correas, rodillos y componentes pesados. Abrasivo: circonia reforzada. Rendimiento: resistencia extrema al impacto y abrasión.' }
        },
        'Cinta Abrasiva para Solda e Rebarbação Pesada': {
            en: { name: 'Heavy Weld & Deburring Abrasive Belt', desc: 'Weld bead and heavy flash removal. Application: fabrication shops, shipyards and heavy machinery. Abrasive: ceramic/zirconia grit 24-36. Performance: aggressive removal without loading.' },
            es: { name: 'Cinta Abrasiva para Soldadura y Desbarbado Pesado', desc: 'Remoción de cordones de soldadura y rebabas en piezas pesadas. Aplicación: calderería, astilleros y maquinaria pesada. Abrasivo: cerámica/circonia grano 24-36. Rendimiento: remoción agresiva sin empaste.' }
        },

        // ── PREMIUM: Discos (31-40) ──
        'Disco Diamantado Segmentado para Concreto Armado': {
            en: { name: 'Segmented Diamond Disc for Reinforced Concrete', desc: 'Laser-welded segments for heavy reinforced concrete. Application: slab, beam and pillar cutting. Abrasive: high-concentration diamond. Performance: jam-free cutting through rebar.' },
            es: { name: 'Disco Diamantado Segmentado para Hormigón Armado', desc: 'Segmentos soldados a láser para hormigón armado pesado. Aplicación: corte de losas, vigas y pilares. Abrasivo: diamante de alta concentración. Rendimiento: corte sin bloqueo en armaduras.' }
        },
        'Disco Diamantado Turbo Alta Performance': {
            en: { name: 'High Performance Turbo Diamond Disc', desc: 'Turbo rim for fast, cooled cutting. Application: granite, concrete and structural masonry. Abrasive: turbo diamond. Performance: 40% faster cutting speed vs. segmented.' },
            es: { name: 'Disco Diamantado Turbo Alto Rendimiento', desc: 'Borde turbo para corte rápido y refrigerado. Aplicación: granito, hormigón y mampostería estructural. Abrasivo: diamante turbo. Rendimiento: velocidad de corte 40% superior al segmentado.' }
        },
        'Disco Diamantado Contínuo para Cerâmica Técnica': {
            en: { name: 'Continuous Rim Diamond Disc for Technical Ceramics', desc: 'Thin continuous rim for chip-free cutting. Application: technical ceramics, porcelain tile and glass. Abrasive: fine continuous diamond. Performance: smooth edge finish, no rework needed.' },
            es: { name: 'Disco Diamantado Continuo para Cerámica Técnica', desc: 'Borde continuo fino para corte sin astillas. Aplicación: cerámica técnica, porcelanato y vidrio. Abrasivo: diamante continuo fino. Rendimiento: acabado de borde liso sin retrabajo.' }
        },
        'Disco Diamantado para Granito Industrial': {
            en: { name: 'Diamond Disc for Industrial Granite', desc: 'Reinforced segments for abrasive and hard granites. Application: industrial stone shops and quarries. Abrasive: high-hardness diamond. Performance: linear cut without deviation in dark granites.' },
            es: { name: 'Disco Diamantado para Granito Industrial', desc: 'Segmentos reforzados para granitos abrasivos y duros. Aplicación: marmoleras industriales y canteras. Abrasivo: diamante de alta dureza. Rendimiento: corte lineal sin desvío en granitos oscuros.' }
        },
        'Disco Diamantado para Mármore Profissional': {
            en: { name: 'Professional Diamond Disc for Marble', desc: 'Delicate cutting without cracks or chipping. Application: marble, travertine and limestones. Abrasive: continuous diamond. Performance: polished edge finish directly from cut.' },
            es: { name: 'Disco Diamantado para Mármol Profesional', desc: 'Corte delicado sin grietas ni astillado. Aplicación: mármol, travertino y calizas. Abrasivo: diamante continuo. Rendimiento: acabado de borde pulido directamente en el corte.' }
        },
        'Disco Diamantado Heavy Duty para Corte Profundo': {
            en: { name: 'Heavy Duty Diamond Disc for Deep Cutting', desc: 'Extra-tall segments for maximum depth. Application: deep cutting in reinforced concrete and asphalt. Abrasive: diamond with 15mm segments. Performance: cutting depth up to 65mm.' },
            es: { name: 'Disco Diamantado Heavy Duty para Corte Profundo', desc: 'Segmentos extra altos para profundidad máxima. Aplicación: corte profundo en hormigón armado y asfaltado. Abrasivo: diamante con segmentos de 15mm. Rendimiento: profundidad de corte de hasta 65mm.' }
        },
        'Disco Diamantado para Pedra Natural': {
            en: { name: 'Diamond Disc for Natural Stone', desc: 'Universal segmented for sandstones and natural stones. Application: stonework and heritage restoration. Abrasive: segmented diamond. Performance: clean cut without splintering.' },
            es: { name: 'Disco Diamantado para Piedra Natural', desc: 'Segmentado universal para areniscas y piedras naturales. Aplicación: cantería y restauración de patrimonio. Abrasivo: diamante segmentado. Rendimiento: corte limpio sin astillamiento.' }
        },
        'Disco de Corte Abrasivo para Aço Estrutural': {
            en: { name: 'Abrasive Cut-Off Disc for Structural Steel', desc: 'Reinforced disc for heavy profile cutting. Application: beam, pipe and thick plate cutting. Abrasive: aluminum oxide with double mesh. Performance: 350mm for sections up to 120mm.' },
            es: { name: 'Disco de Corte Abrasivo para Acero Estructural', desc: 'Disco reforzado para corte de perfiles pesados. Aplicación: corte de vigas, tubos y chapas gruesas. Abrasivo: óxido de aluminio con doble malla. Rendimiento: 350mm para secciones de hasta 120mm.' }
        },
        'Disco Flap Zircônia Industrial': {
            en: { name: 'Industrial Zirconia Flap Disc', desc: 'Zirconia flaps for grinding and finishing on metals. Application: weld preparation and industrial finishing. Abrasive: zirconia grit 40-120. Performance: conformability on irregular surfaces.' },
            es: { name: 'Disco Flap Circonia Industrial', desc: 'Láminas de circonia para desbaste y acabado en metales. Aplicación: preparación de soldaduras y acabado industrial. Abrasivo: circonia grano 40-120. Rendimiento: conformabilidad en superficies irregulares.' }
        },
        'Disco Flap Cerâmico Alta Remoção': {
            en: { name: 'Ceramic Flap Disc High Removal', desc: 'Ceramic grain for maximum aggressiveness with finish. Application: weld and bevel grinding on stainless and steel. Abrasive: self-sharpening ceramic. Performance: 3x lifespan vs. conventional zirconia.' },
            es: { name: 'Disco Flap Cerámico Alta Remoción', desc: 'Grano cerámico para máxima agresividad con acabado. Aplicación: desbaste de soldaduras y chaflanes en inox y acero. Abrasivo: cerámico autocortante. Rendimiento: 3x vida útil vs. circonia convencional.' }
        },

        // ── PREMIUM: Dressadores (41-45) ──
        'Dressador Diamantado Ponta Única': {
            en: { name: 'Single Point Diamond Dresser', desc: 'Selected natural diamond for precision dressing. Application: profiling and truing of conventional grinding wheels. Abrasive: monocrystalline natural diamond. Performance: controlled wheel surface finish.' },
            es: { name: 'Rectificador Diamantado Punta Única', desc: 'Diamante natural seleccionado para rectificado de precisión. Aplicación: perfilado y afilado de muelas convencionales. Abrasivo: diamante natural monocristalino. Rendimiento: acabado superficial controlado de la muela.' }
        },
        'Dressador Diamantado Multiponta': {
            en: { name: 'Multi-Point Diamond Dresser', desc: 'Diamond cluster for fast, aggressive dressing. Application: serial production grinding. Abrasive: multicrystalline natural diamonds. Performance: higher wheel removal per pass.' },
            es: { name: 'Rectificador Diamantado Multipunta', desc: 'Cluster de diamantes para rectificado rápido y agresivo. Aplicación: rectificado de producción en serie. Abrasivo: diamantes naturales multicristalinos. Rendimiento: mayor remoción de la muela por pasada.' }
        },
        'Dressador Diamantado Tipo Placa': {
            en: { name: 'Plate-Type Diamond Dresser', desc: 'Distributed diamond plate for CNC automated dressing. Application: high-production CNC grinders. Abrasive: diamonds embedded in metal plate. Performance: micrometric dressing uniformity.' },
            es: { name: 'Rectificador Diamantado Tipo Placa', desc: 'Placa con diamantes distribuidos para rectificado CNC automatizado. Aplicación: rectificadoras CNC de alta producción. Abrasivo: diamantes impregnados en placa metálica. Rendimiento: uniformidad de rectificado micrométrica.' }
        },
        'Dressador Diamantado Rotativo': {
            en: { name: 'Rotary Diamond Dresser', desc: 'Diamond roll for profiling wheels with complex profiles. Application: gear and thread grinding. Abrasive: sintered rotary diamond. Performance: profiles with ±2 µm tolerance.' },
            es: { name: 'Rectificador Diamantado Rotativo', desc: 'Rodillo diamantado para perfilado de muelas con perfiles complejos. Aplicación: rectificado de engranajes y roscas. Abrasivo: diamante sinterizado rotativo. Rendimiento: perfiles con tolerancia de ±2 µm.' }
        },
        'Dressador Diamantado Alta Precisão': {
            en: { name: 'High Precision Diamond Dresser', desc: 'Premium natural diamond for finishing dressing. Application: wheels for precision grinding and lapping. Abrasive: high-quality natural diamond. Performance: wheel surface finish Ra < 0.2 µm.' },
            es: { name: 'Rectificador Diamantado Alta Precisión', desc: 'Diamante natural premium para rectificado de acabado. Aplicación: muelas para rectificado de precisión y lapidado. Abrasivo: diamante natural de alta calidad. Rendimiento: acabado superficial Ra < 0.2 µm en la muela.' }
        },

        // ── PREMIUM: Pastas Diamantadas (46-50) ──
        'Pasta Diamantada Grão Grosso Industrial': {
            en: { name: 'Industrial Coarse Grit Diamond Paste', desc: '40-60 µm grit for fast removal. Application: rough lapping of carbide and ceramics. Abrasive: polycrystalline diamond in oil vehicle. Performance: superior removal rate with low heat generation.' },
            es: { name: 'Pasta Diamantada Grano Grueso Industrial', desc: 'Granulometría 40-60 µm para remoción rápida. Aplicación: lapidado grueso de metal duro y cerámicas. Abrasivo: diamante policristalino en vehículo oleoso. Rendimiento: tasa de remoción superior con baja generación de calor.' }
        },
        'Pasta Diamantada Grão Médio': {
            en: { name: 'Medium Grit Diamond Paste', desc: '9-15 µm grit for intermediate stage. Application: surface preparation before final polishing. Abrasive: monocrystalline diamond. Performance: uniform transition without deep scratches.' },
            es: { name: 'Pasta Diamantada Grano Medio', desc: 'Granulometría 9-15 µm para etapa intermedia. Aplicación: preparación de superficie antes del pulido final. Abrasivo: diamante monocristalino. Rendimiento: transición uniforme sin rayados profundos.' }
        },
        'Pasta Diamantada Grão Fino': {
            en: { name: 'Fine Grit Diamond Paste', desc: '3-6 µm grit for precision polishing. Application: polishing of tools, molds and optical components. Abrasive: fine monocrystalline diamond. Performance: consistent semi-mirror finish.' },
            es: { name: 'Pasta Diamantada Grano Fino', desc: 'Granulometría 3-6 µm para pulido de precisión. Aplicación: pulido de herramientas, moldes y componentes ópticos. Abrasivo: diamante monocristalino fino. Rendimiento: acabado semi-espejado consistente.' }
        },
        'Pasta Diamantada para Polimento Espelhado': {
            en: { name: 'Mirror Finish Diamond Polishing Paste', desc: '0.5-1 µm grit for mirror finish. Application: mirror polishing of injection molds and dies. Abrasive: nanometric diamond. Performance: Ra < 0.02 µm — mirror-like finish.' },
            es: { name: 'Pasta Diamantada para Pulido Espejado', desc: 'Granulometría 0.5-1 µm para acabado espejado. Aplicación: pulido espejado de moldes de inyección y matrices. Abrasivo: diamante nanométrico. Rendimiento: Ra < 0.02 µm — acabado tipo espejo.' }
        },
        'Pasta Diamantada para Lapidação Técnica': {
            en: { name: 'Technical Lapping Diamond Paste', desc: 'Special formulation for technical part lapping. Application: lapping of mechanical seals, valves and aerospace parts. Abrasive: diamond in aqueous/oil vehicle. Performance: certified optical flatness.' },
            es: { name: 'Pasta Diamantada para Lapidado Técnico', desc: 'Formulación especial para lapidado de piezas técnicas. Aplicación: lapidado de sellos mecánicos, válvulas y piezas aeronáuticas. Abrasivo: diamante en vehículo acuoso/oleoso. Rendimiento: planicidad óptica certificada.' }
        },

        // ── CATÁLOGO NACIONAL (produtos existentes) ──
        'Disco de Corte': { en: { name: 'Cut-Off Disc' }, es: { name: 'Disco de Corte' } },
        'Disco de Desbaste': { en: { name: 'Grinding Disc' }, es: { name: 'Disco de Desbaste' } },
        'Disco Flap Profissional': { en: { name: 'Professional Flap Disc' }, es: { name: 'Disco Flap Profesional' } },
        'Disco Flap Zircônia': { en: { name: 'Zirconia Flap Disc' }, es: { name: 'Disco Flap Circonia' } },
        'Lixas Diamantadas': { en: { name: 'Diamond Sanding Sheets' }, es: { name: 'Lijas Diamantadas' } },
        'Lixas Cerâmicas': { en: { name: 'Ceramic Sanding Sheets' }, es: { name: 'Lijas Cerámicas' } },
        'Cintas p/ Alta Remoção': { en: { name: 'High Removal Belts' }, es: { name: 'Cintas Alta Remoción' } },
        'Cintas p/ Retíficas Severas e Processos Industriais': { en: { name: 'Heavy Grinding & Industrial Process Belts' }, es: { name: 'Cintas para Rectificado Severo y Procesos Industriales' } },
        'Rebolos Convencionais': { en: { name: 'Conventional Grinding Wheels' }, es: { name: 'Muelas Convencionales' } },
        'Rebolos Resinados': { en: { name: 'Resinoid Grinding Wheels' }, es: { name: 'Muelas Resinadas' } },
        'Rebolos Diamantados': { en: { name: 'Diamond Grinding Wheels' }, es: { name: 'Muelas Diamantadas' } },
        'Rebolos CBN': { en: { name: 'CBN Grinding Wheels' }, es: { name: 'Muelas CBN' } },
        'Lixas Óxido de Alumínio': { en: { name: 'Aluminum Oxide Sanding Sheets' }, es: { name: 'Lijas Óxido de Aluminio' } },
        'Lixas Carbeto de Silício': { en: { name: 'Silicon Carbide Sanding Sheets' }, es: { name: 'Lijas Carburo de Silicio' } },
        'Cintas Abrasivas': { en: { name: 'Abrasive Belts' }, es: { name: 'Cintas Abrasivas' } },
        'Folhas Abrasivas': { en: { name: 'Abrasive Sheets' }, es: { name: 'Hojas Abrasivas' } },
        'Escovas de Aço': { en: { name: 'Wire Brushes' }, es: { name: 'Cepillos de Acero' } },
        'Escovas Inox / Circulares': { en: { name: 'Stainless / Circular Brushes' }, es: { name: 'Cepillos Inox / Circulares' } },
        'Escovas Copo': { en: { name: 'Cup Brushes' }, es: { name: 'Cepillos Copa' } },
        'Fresas de Metal Duro': { en: { name: 'Carbide Burrs' }, es: { name: 'Fresas de Metal Duro' } },
        'Pontas Montadas': { en: { name: 'Mounted Points' }, es: { name: 'Puntas Montadas' } }
    };

    // =============================================
    // 3. TRADUÇÕES DE UI
    // =============================================
    const TRANSLATIONS = {
        pt: {
            'nav.produtos': 'Produtos', 'nav.pagamento': 'Pagamento', 'nav.contato': 'Contato', 'nav.pedido': 'Pedido', 'nav.whatsapp': 'WhatsApp',
            'hero.badge': 'Abrasivos Industriais', 'hero.sub': 'Alta performance em abrasivos industriais para aplicações exigentes', 'hero.cta': 'Falar no WhatsApp agora',
            'premium.tag': '★ EXPORT QUALITY', 'premium.title': 'Linha Premium para Exportação', 'premium.desc': 'Superabrasivos e ferramentas de precisão para aplicações industriais críticas — alta performance, maior vida útil e redução de parada de máquina.', 'premium.cta': 'Solicitar Cotação Premium', 'premium.footer': 'Soluções de exportação com qualidade certificada para aplicações industriais críticas — atendimento técnico especializado.',
            'premium.g1': 'Rebolos Diamantados — Export Grade', 'premium.g2': 'Rebolos CBN — Export Grade', 'premium.g3': 'Cintas Abrasivas Industriais — Export Grade', 'premium.g4': 'Discos Diamantados & Flap — Export Grade', 'premium.g5': 'Dressadores Diamantados — Export Grade', 'premium.g6': 'Pastas Diamantadas — Export Grade',
            'catalog.tag': 'Catálogo', 'catalog.title': 'Linha Completa de Produtos', 'catalog.desc': 'Fornecemos soluções abrasivas para aplicações industriais leves e severas.',
            'tech.tag': 'Catálogo Técnico', 'tech.title': 'Linha Completa de Abrasivos Industriais', 'tech.desc': 'Trabalhamos com uma linha completa de abrasivos industriais, atendendo operações de corte, desbaste, acabamento e polimento técnico.',
            'specs.tag': 'Técnico', 'specs.title': 'Especificações',
            'diff.tag': 'Por que nos escolher', 'diff.title': 'Nossos Diferenciais', 'diff.dur': 'Alta Durabilidade', 'diff.dur.desc': 'Materiais que resistem ao uso mais severo e contínuo.', 'diff.prec': 'Precisão Industrial', 'diff.prec.desc': 'Grãos rigorosamente calibrados para acabamentos perfeitos.', 'diff.ent': 'Entrega Rápida', 'diff.ent.desc': 'Logística ágil para sua produção não parar.', 'diff.global': 'Atendimento Global', 'diff.global.desc': 'Nacional e internacional, adaptado à sua demanda.',
            'pay.tag': 'Formas de Pagamento', 'pay.title': 'Métodos de Pagamento', 'pay.desc': 'Oferecemos diversas formas de pagamento para facilitar sua compra.',
            'contact.tag': 'Fale conosco', 'contact.title': 'Entre em Contato', 'contact.desc': 'Solicite seu orçamento agora e receba atendimento direto da nossa equipe comercial.', 'contact.wa': 'WhatsApp', 'contact.email.label': 'E-mail Comercial', 'contact.loc.label': 'Localização', 'contact.loc.value': 'Sorocaba/SP — Brasil', 'contact.cta': 'Falar no WhatsApp agora',
            'footer.rights': '© 2002 Versatil Gama Industrial. Todos os direitos reservados.', 'footer.loc': 'Sorocaba/SP — Brasil',
            'btn.adicionar': 'Adicionar', 'btn.adicionado': 'Adicionado!', 'btn.finalizar': 'Finalizar Pedido via WhatsApp', 'cart.title': 'Seu Pedido', 'cart.empty': 'Seu carrinho está vazio', 'cart.total': 'TOTAL',
            'currency.notice': '', 'unit': '/ un'
        },
        en: {
            'nav.produtos': 'Products', 'nav.pagamento': 'Payment', 'nav.contato': 'Contact', 'nav.pedido': 'Order', 'nav.whatsapp': 'WhatsApp',
            'hero.badge': 'Industrial Abrasives', 'hero.sub': 'High-performance industrial abrasives for demanding applications', 'hero.cta': 'Chat on WhatsApp',
            'premium.tag': '★ EXPORT QUALITY', 'premium.title': 'Premium Export Line', 'premium.desc': 'Superabrasives and precision tools for critical industrial applications — high performance, extended tool life and reduced machine downtime.', 'premium.cta': 'Request Premium Quote', 'premium.footer': 'Export-grade solutions with certified quality for critical industrial applications — specialized technical support.',
            'premium.g1': 'Diamond Grinding Wheels — Export Grade', 'premium.g2': 'CBN Grinding Wheels — Export Grade', 'premium.g3': 'Industrial Abrasive Belts — Export Grade', 'premium.g4': 'Diamond & Flap Discs — Export Grade', 'premium.g5': 'Diamond Dressers — Export Grade', 'premium.g6': 'Diamond Pastes — Export Grade',
            'catalog.tag': 'Catalog', 'catalog.title': 'Complete Product Line', 'catalog.desc': 'We provide abrasive solutions for light and heavy industrial applications.',
            'tech.tag': 'Technical Catalog', 'tech.title': 'Full Range of Industrial Abrasives', 'tech.desc': 'We work with a complete line of industrial abrasives for cutting, grinding, finishing and technical polishing operations.',
            'specs.tag': 'Technical', 'specs.title': 'Specifications',
            'diff.tag': 'Why Choose Us', 'diff.title': 'Our Advantages', 'diff.dur': 'High Durability', 'diff.dur.desc': 'Materials that withstand the most severe and continuous use.', 'diff.prec': 'Industrial Precision', 'diff.prec.desc': 'Rigorously calibrated grains for perfect finishes.', 'diff.ent': 'Fast Delivery', 'diff.ent.desc': 'Agile logistics to keep your production running.', 'diff.global': 'Global Service', 'diff.global.desc': 'National and international, tailored to your demand.',
            'pay.tag': 'Payment Methods', 'pay.title': 'Payment Options', 'pay.desc': 'We offer multiple payment methods for your convenience.',
            'contact.tag': 'Get In Touch', 'contact.title': 'Contact Us', 'contact.desc': 'Request your quote now and receive direct support from our sales team.', 'contact.wa': 'WhatsApp', 'contact.email.label': 'Commercial E-mail', 'contact.loc.label': 'Location', 'contact.loc.value': 'Sorocaba/SP — Brazil', 'contact.cta': 'Chat on WhatsApp now',
            'footer.rights': '© 2002 Versatil Gama Industrial. All rights reserved.', 'footer.loc': 'Sorocaba/SP — Brazil',
            'btn.adicionar': 'Add to Cart', 'btn.adicionado': 'Added!', 'btn.finalizar': 'Complete Order via WhatsApp', 'cart.title': 'Your Order', 'cart.empty': 'Your cart is empty', 'cart.total': 'TOTAL',
            'currency.notice': 'Prices for international customers are displayed in USD', 'unit': '/ ea'
        },
        es: {
            'nav.produtos': 'Productos', 'nav.pagamento': 'Pago', 'nav.contato': 'Contacto', 'nav.pedido': 'Pedido', 'nav.whatsapp': 'WhatsApp',
            'hero.badge': 'Abrasivos Industriales', 'hero.sub': 'Abrasivos industriales de alto rendimiento para aplicaciones exigentes', 'hero.cta': 'Hablar por WhatsApp',
            'premium.tag': '★ EXPORT QUALITY', 'premium.title': 'Línea Premium de Exportación', 'premium.desc': 'Superabrasivos y herramientas de precisión para aplicaciones industriales críticas — alto rendimiento, mayor vida útil y reducción de paradas.', 'premium.cta': 'Solicitar Cotización Premium', 'premium.footer': 'Soluciones de exportación con calidad certificada para aplicaciones industriales críticas — soporte técnico especializado.',
            'premium.g1': 'Muelas Diamantadas — Export Grade', 'premium.g2': 'Muelas CBN — Export Grade', 'premium.g3': 'Cintas Abrasivas Industriales — Export Grade', 'premium.g4': 'Discos Diamantados & Flap — Export Grade', 'premium.g5': 'Rectificadores Diamantados — Export Grade', 'premium.g6': 'Pastas Diamantadas — Export Grade',
            'catalog.tag': 'Catálogo', 'catalog.title': 'Línea Completa de Productos', 'catalog.desc': 'Proporcionamos soluciones abrasivas para aplicaciones industriales ligeras y severas.',
            'tech.tag': 'Catálogo Técnico', 'tech.title': 'Gama Completa de Abrasivos Industriales', 'tech.desc': 'Trabajamos con una línea completa de abrasivos industriales para operaciones de corte, desbaste, acabado y pulido técnico.',
            'specs.tag': 'Técnico', 'specs.title': 'Especificaciones',
            'diff.tag': 'Por qué elegirnos', 'diff.title': 'Nuestros Diferenciales', 'diff.dur': 'Alta Durabilidad', 'diff.dur.desc': 'Materiales que resisten el uso más severo y continuo.', 'diff.prec': 'Precisión Industrial', 'diff.prec.desc': 'Granos rigurosamente calibrados para acabados perfectos.', 'diff.ent': 'Entrega Rápida', 'diff.ent.desc': 'Logística ágil para que su producción no pare.', 'diff.global': 'Atención Global', 'diff.global.desc': 'Nacional e internacional, adaptado a su demanda.',
            'pay.tag': 'Formas de Pago', 'pay.title': 'Métodos de Pago', 'pay.desc': 'Ofrecemos diversas formas de pago para facilitar su compra.',
            'contact.tag': 'Contáctenos', 'contact.title': 'Contacto', 'contact.desc': 'Solicite su presupuesto ahora y reciba atención directa de nuestro equipo comercial.', 'contact.wa': 'WhatsApp', 'contact.email.label': 'E-mail Comercial', 'contact.loc.label': 'Ubicación', 'contact.loc.value': 'Sorocaba/SP — Brasil', 'contact.cta': 'Hablar por WhatsApp ahora',
            'footer.rights': '© 2002 Versatil Gama Industrial. Todos los derechos reservados.', 'footer.loc': 'Sorocaba/SP — Brasil',
            'btn.adicionar': 'Agregar', 'btn.adicionado': '¡Agregado!', 'btn.finalizar': 'Finalizar Pedido por WhatsApp', 'cart.title': 'Su Pedido', 'cart.empty': 'Su carrito está vacío', 'cart.total': 'TOTAL',
            'currency.notice': 'Los precios para clientes internacionales se muestran en USD', 'unit': '/ un'
        }
    };

    // =============================================
    // 4. ESTADO
    // =============================================
    let currentLang = localStorage.getItem('vgi_lang') || 'pt';
    let isObserving = false;

    // =============================================
    // 5. FUNÇÕES DE MOEDA
    // =============================================
    function formatPrice(brlValue, lang) {
        lang = lang || currentLang;
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;
        const converted = brlValue / config.rate;
        if (lang === 'pt') {
            return 'R$ ' + converted.toFixed(2).replace('.', ',');
        }
        return '$ ' + converted.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function convertPrice(brlValue, lang) {
        const config = CURRENCY_CONFIG[lang || currentLang] || CURRENCY_CONFIG.pt;
        return brlValue / config.rate;
    }

    // =============================================
    // 6. TRADUÇÃO DE TEXTOS
    // =============================================
    function t(key, lang) {
        lang = lang || currentLang;
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
        return dict[key] || TRANSLATIONS.pt[key] || key;
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = t(key, lang);
            if (text) el.textContent = text;
        });
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
    }

    // =============================================
    // 7. TRADUZIR NOMES E DESCRIÇÕES DOS PRODUTOS
    // =============================================
    function translateProducts(lang) {
        document.querySelectorAll('.product-card').forEach(card => {
            const h4 = card.querySelector('.product-info h4');
            const descEl = card.querySelector('.product-info .product-desc');
            if (!h4) return;

            // Store original PT text on first run
            if (!card.hasAttribute('data-name-pt')) {
                card.setAttribute('data-name-pt', h4.textContent.trim());
                if (descEl) card.setAttribute('data-desc-pt', descEl.textContent.trim());
            }

            const ptName = card.getAttribute('data-name-pt');
            const ptDesc = card.getAttribute('data-desc-pt') || '';
            const translation = PRODUCT_TRANSLATIONS[ptName];

            if (lang === 'pt') {
                h4.textContent = ptName;
                if (descEl) descEl.textContent = ptDesc;
            } else if (translation && translation[lang]) {
                h4.textContent = translation[lang].name || ptName;
                if (descEl && translation[lang].desc) {
                    descEl.textContent = translation[lang].desc;
                }
            }
            // If no translation found, keep PT name (fallback)
        });
    }

    // =============================================
    // 8. ATUALIZAR PREÇOS NA EXIBIÇÃO
    // =============================================
    function updateDisplayPrices(lang) {
        const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.pt;

        // Update price prefixes (R$ → $)
        document.querySelectorAll('.product-price-prefix').forEach(el => {
            el.textContent = config.symbol;
        });

        // Update price input values — always read from BRL source
        document.querySelectorAll('.price-input').forEach(input => {
            const brlPrice = parseFloat(input.getAttribute('data-price-brl'));
            if (isNaN(brlPrice)) {
                // Fallback: read from card attribute
                const card = input.closest('.product-card');
                if (!card) return;
                const fallback = parseFloat(card.getAttribute('data-product-price-brl') || card.getAttribute('data-product-price'));
                if (isNaN(fallback)) return;
                input.setAttribute('data-price-brl', fallback);
                const converted = fallback / config.rate;
                input.value = lang === 'pt' ? converted.toFixed(2).replace('.', ',') : converted.toFixed(2);
            } else {
                const converted = brlPrice / config.rate;
                input.value = lang === 'pt' ? converted.toFixed(2).replace('.', ',') : converted.toFixed(2);
            }
        });

        // Update unit labels
        document.querySelectorAll('.product-unit').forEach(el => {
            el.textContent = t('unit', lang);
        });

        // Update "Adicionar" buttons text
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            if (!btn.classList.contains('added')) {
                const svg = btn.querySelector('svg');
                const svgHTML = svg ? svg.outerHTML : '';
                btn.innerHTML = svgHTML + '\n                        ' + t('btn.adicionar', lang);
            }
        });

        // Show/hide currency notice
        const notice = document.getElementById('currency-notice');
        if (notice) {
            const text = t('currency.notice', lang);
            notice.textContent = text;
            notice.style.display = text ? 'block' : 'none';
        }
    }

    // =============================================
    // 9. INTERCEPTAR CART — reformatar após pedido.js
    // =============================================
    function reformatCartForLang() {
        if (currentLang === 'pt') return; // pedido.js already formats in BRL

        // Cart item prices (BRL values from pedido.js → convert to display currency)
        document.querySelectorAll('.cart-item-price').forEach(el => {
            const raw = el.textContent;
            const brlVal = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
            if (!isNaN(brlVal) && brlVal > 0) {
                el.textContent = formatPrice(brlVal, currentLang) + ' ' + t('unit', currentLang);
            }
        });

        document.querySelectorAll('.cart-item-subtotal').forEach(el => {
            const raw = el.textContent;
            const brlVal = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
            if (!isNaN(brlVal) && brlVal > 0) {
                el.textContent = formatPrice(brlVal, currentLang);
            }
        });

        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            const raw = totalEl.textContent;
            const brlVal = parseFloat(raw.replace(/[^\d,\.]/g, '').replace(',', '.'));
            if (!isNaN(brlVal)) {
                totalEl.textContent = formatPrice(brlVal, currentLang);
            }
        }
    }

    // =============================================
    // 10. MUTATION OBSERVER — reformat cart after pedido.js updates
    // =============================================
    const cartObserver = new MutationObserver(() => {
        if (currentLang !== 'pt') {
            // Small delay to let pedido.js finish DOM update
            setTimeout(reformatCartForLang, 60);
        }
    });

    function startCartObserver() {
        if (isObserving) return;
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cartItems) {
            cartObserver.observe(cartItems, { childList: true, subtree: true, characterData: true });
        }
        if (cartTotal) {
            cartObserver.observe(cartTotal, { childList: true, subtree: true, characterData: true });
        }
        isObserving = true;
    }

    // =============================================
    // 11. SWITCHER PRINCIPAL
    // =============================================
    function switchLanguage(lang) {
        if (!TRANSLATIONS[lang]) lang = 'pt';
        currentLang = lang;
        localStorage.setItem('vgi_lang', lang);

        applyTranslations(lang);
        translateProducts(lang);
        updateDisplayPrices(lang);
        reformatCartForLang();

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        console.log(`[i18n] Language: ${lang} | Currency: ${CURRENCY_CONFIG[lang].symbol} (${CURRENCY_CONFIG[lang].code})`);
    }

    // =============================================
    // 12. CRIAR UI DO SELETOR
    // =============================================
    function createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.id = 'lang-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt" title="Português">
                <span class="lang-flag">🇧🇷</span><span class="lang-code">PT</span>
            </button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">
                <span class="lang-flag">🇺🇸</span><span class="lang-code">EN</span>
            </button>
            <button class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es" title="Español">
                <span class="lang-flag">🇪🇸</span><span class="lang-code">ES</span>
            </button>
        `;
        const navActions = document.querySelector('.nav-actions');
        if (navActions) navActions.insertBefore(switcher, navActions.firstChild);
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang')));
        });
    }

    function createCurrencyNotice() {
        const notice = document.createElement('div');
        notice.id = 'currency-notice';
        notice.className = 'currency-notice';
        notice.style.display = 'none';
        const hero = document.querySelector('.hero');
        if (hero && hero.nextElementSibling) {
            hero.parentNode.insertBefore(notice, hero.nextElementSibling);
        }
    }

    // =============================================
    // 13. TAG ELEMENTS WITH data-i18n
    // =============================================
    function tagElements() {
        // Navbar
        const navLinks = document.querySelectorAll('.nav-links a');
        if (navLinks[0]) navLinks[0].setAttribute('data-i18n', 'nav.produtos');
        if (navLinks[1]) navLinks[1].setAttribute('data-i18n', 'nav.pagamento');
        if (navLinks[2]) navLinks[2].setAttribute('data-i18n', 'nav.contato');

        // Nav cart text
        const navCartLink = document.getElementById('nav-cart-link');
        if (navCartLink) {
            const textNode = Array.from(navCartLink.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
            if (textNode) {
                const span = document.createElement('span');
                span.setAttribute('data-i18n', 'nav.pedido');
                span.textContent = textNode.textContent.trim();
                navCartLink.replaceChild(span, textNode);
            }
        }

        // Hero
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.setAttribute('data-i18n', 'hero.badge');
        const heroSub = document.querySelector('.hero-sub');
        if (heroSub) heroSub.setAttribute('data-i18n', 'hero.sub');
        const heroCta = document.querySelector('.hero .btn-primary');
        if (heroCta) {
            const svg = heroCta.querySelector('svg');
            const textSpan = document.createElement('span');
            textSpan.setAttribute('data-i18n', 'hero.cta');
            textSpan.textContent = 'Falar no WhatsApp agora';
            heroCta.textContent = '';
            if (svg) heroCta.appendChild(svg);
            heroCta.appendChild(document.createTextNode(' '));
            heroCta.appendChild(textSpan);
        }

        // Section headers
        document.querySelectorAll('.section-header').forEach(header => {
            const tag = header.querySelector('.section-tag');
            const h2 = header.querySelector('h2');
            const desc = header.querySelector('.section-desc');
            const tagText = tag ? tag.textContent.trim() : '';
            const map = {
                '★ EXPORT QUALITY': ['premium.tag', 'premium.title', 'premium.desc'],
                'Catálogo': ['catalog.tag', 'catalog.title', 'catalog.desc'],
                'Catálogo Técnico': ['tech.tag', 'tech.title', 'tech.desc'],
                'Técnico': ['specs.tag', 'specs.title', null],
                'Por que nos escolher': ['diff.tag', 'diff.title', null],
                'Formas de Pagamento': ['pay.tag', 'pay.title', 'pay.desc'],
                'Fale conosco': ['contact.tag', 'contact.title', 'contact.desc']
            };
            if (map[tagText]) {
                if (tag && map[tagText][0]) tag.setAttribute('data-i18n', map[tagText][0]);
                if (h2 && map[tagText][1]) h2.setAttribute('data-i18n', map[tagText][1]);
                if (desc && map[tagText][2]) desc.setAttribute('data-i18n', map[tagText][2]);
            }
        });

        // Diff cards
        const diffCards = document.querySelectorAll('.diff-card');
        [['diff.dur','diff.dur.desc'],['diff.prec','diff.prec.desc'],['diff.ent','diff.ent.desc'],['diff.global','diff.global.desc']].forEach((keys, i) => {
            if (diffCards[i]) {
                const h3 = diffCards[i].querySelector('h3');
                const p = diffCards[i].querySelector('p');
                if (h3) h3.setAttribute('data-i18n', keys[0]);
                if (p) p.setAttribute('data-i18n', keys[1]);
            }
        });

        // Contact labels
        const contactLabels = document.querySelectorAll('.contact-label');
        ['contact.wa','contact.email.label','contact.loc.label'].forEach((key, i) => {
            if (contactLabels[i]) contactLabels[i].setAttribute('data-i18n', key);
        });

        // Footer
        const footerPs = document.querySelectorAll('footer p');
        if (footerPs[0]) footerPs[0].setAttribute('data-i18n', 'footer.rights');
        if (footerPs[1]) footerPs[1].setAttribute('data-i18n', 'footer.loc');

        // Catalogo-footer texts
        document.querySelectorAll('.catalogo-footer .catalogo-position').forEach(el => {
            if (el.textContent.includes('exportação') || el.textContent.includes('export')) {
                el.setAttribute('data-i18n', 'premium.footer');
            }
        });
        document.querySelectorAll('.catalogo-footer .btn-primary').forEach(btn => {
            if (btn.textContent.includes('Premium') || btn.textContent.includes('premium')) {
                const svg = btn.querySelector('svg');
                const span = document.createElement('span');
                span.setAttribute('data-i18n', 'premium.cta');
                span.textContent = btn.textContent.replace(svg ? svg.textContent : '', '').trim();
                btn.textContent = '';
                if (svg) btn.appendChild(svg);
                btn.appendChild(document.createTextNode(' '));
                btn.appendChild(span);
            }
        });

        // Group titles
        const groupTitles = document.querySelectorAll('.group-title');
        const gKeys = ['premium.g1','premium.g2','premium.g3','premium.g4','premium.g5','premium.g6'];
        let gIdx = 0;
        groupTitles.forEach(gt => {
            if (gIdx < gKeys.length) {
                const textNodes = Array.from(gt.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim());
                const lastText = textNodes[textNodes.length - 1];
                if (lastText && lastText.textContent.trim()) {
                    const span = document.createElement('span');
                    span.setAttribute('data-i18n', gKeys[gIdx]);
                    span.textContent = lastText.textContent.trim();
                    gt.replaceChild(span, lastText);
                    gIdx++;
                }
            }
        });
    }

    // =============================================
    // 14. INIT
    // =============================================
    function init() {
        createLanguageSwitcher();
        createCurrencyNotice();
        tagElements();

        // Wait for pedido.js to inject controls, then apply language
        const waitForControls = setInterval(() => {
            if (document.querySelector('.product-card .btn-add-cart')) {
                clearInterval(waitForControls);
                if (currentLang !== 'pt') {
                    switchLanguage(currentLang);
                }
                // Start observing cart after controls are ready
                setTimeout(startCartObserver, 500);
            }
        }, 200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API
    window.VGI_i18n = {
        switchLanguage,
        formatPrice,
        convertPrice,
        getCurrentLang: () => currentLang,
        getExchangeRate: () => EXCHANGE_RATE,
        t
    };

})();
