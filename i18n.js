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
        es: { symbol: '$',  code: 'USD', rate: EXCHANGE_RATE, locale: 'es-ES' },
        ar: { symbol: 'AED', code: 'AED', rate: EXCHANGE_RATE * 0.735, locale: 'ar-AE' }
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
        'Disco Diamantado Premium Porcelanato 230mm': { en: { name: 'Premium Diamond Disc Porcelain 230mm', desc: 'High performance for precise cutting of porcelain, ceramics and high-hardness materials. Superior finish.' }, es: { name: 'Disco Diamantado Premium Porcelanato 230mm', desc: 'Alta performance para corte preciso en porcelanato, cerámica y materiales de alta dureza. Acabado superior.' } },
        'Disco de Corte Diamantado': { en: { name: 'Diamond Cutting Disc', desc: 'Precise cutting in concrete, stone and hard materials.' }, es: { name: 'Disco de Corte Diamantado', desc: 'Corte preciso en concreto, piedra y materiales duros.' } },
        'Disco Cerâmico de Alta Performance': { en: { name: 'High Performance Ceramic Disc', desc: 'Aggressive removal with extended tool life.' }, es: { name: 'Disco Cerámico de Alta Performance', desc: 'Remoción agresiva con vida útil prolongada.' } },
        'Disco de Corte p/ Metal e Aço': { en: { name: 'Metal & Steel Cut-Off Disc', desc: 'High speed cutting in carbon steel and stainless.' }, es: { name: 'Disco de Corte p/ Metal y Acero', desc: 'Alta velocidad de corte en acero carbono e inox.' } },
        'Disco de Desbaste Industrial': { en: { name: 'Industrial Grinding Disc', desc: 'Heavy material removal on metallic surfaces.' }, es: { name: 'Disco de Desbaste Industrial', desc: 'Remoción pesada de material en superficies metálicas.' } },
        'Disco Turbo Diamantado': { en: { name: 'Turbo Diamond Disc', desc: 'Fast and clean cutting in masonry and reinforced concrete.' }, es: { name: 'Disco Turbo Diamantado', desc: 'Corte rápido y limpio en albañilería y concreto armado.' } },
        'Disco Contínuo Diamantado': { en: { name: 'Continuous Rim Diamond Disc', desc: 'Chip-free fine finishing in ceramics and porcelain.' }, es: { name: 'Disco Continuo Diamantado', desc: 'Acabado fino sin lascas en cerámica y porcelanato.' } },
        'Disco Flap Profissional': { en: { name: 'Professional Flap Disc', desc: 'Grinding and finishing in simultaneous operation on steel and stainless.' }, es: { name: 'Disco Flap Profesional', desc: 'Desbaste y acabado simultáneo en acero e inox.' } },
        'Disco Flap Zircônia': { en: { name: 'Zirconia Flap Disc', desc: 'Zirconia grain for high removal and long durability.' }, es: { name: 'Disco Flap Circonia', desc: 'Grano zirconia para alta remoción y larga durabilidad.' } },
        'Lixas Cerâmicas': { en: { name: 'Ceramic Sanding Sheets', desc: 'Self-sharpening grain for high removal rate.' }, es: { name: 'Lijas Cerámicas', desc: 'Grano autocortante para alta tasa de remoción.' } },
        'Rebolos Vitrificados': { en: { name: 'Vitrified Grinding Wheels', desc: 'High rigidity and precision for surface grinding.' }, es: { name: 'Muelas Vitrificadas', desc: 'Alta rigidez y precisión para rectificado de superficie.' } },
        'Rebolos Resinados': { en: { name: 'Resinoid Grinding Wheels', desc: 'Flexibility and finish for cutting and grinding operations.' }, es: { name: 'Muelas Resinadas', desc: 'Flexibilidad y acabado para operaciones de corte y desbaste.' } },
        'Rebolos Diamantados': { en: { name: 'Diamond Grinding Wheels', desc: 'Superabrasives for hard materials and technical ceramics.' }, es: { name: 'Muelas Diamantadas', desc: 'Superabrasivos para materiales duros y cerámicas técnicas.' } },
        'Rebolos CBN': { en: { name: 'CBN Grinding Wheels', desc: 'Grinding of hardened steels with minimal heat generation.' }, es: { name: 'Muelas CBN', desc: 'Rectificado de aceros templados con mínima generación de calor.' } },
        'Lixas Óxido de Alumínio': { en: { name: 'Aluminum Oxide Sanding Sheets', desc: 'Versatility for metal, wood and paint.' }, es: { name: 'Lijas Óxido de Aluminio', desc: 'Versatilidad para metal, madera y pintura.' } },
        'Lixas Carbeto de Silício': { en: { name: 'Silicon Carbide Sanding Sheets', desc: 'Ideal for glass, ceramics and non-ferrous materials.' }, es: { name: 'Lijas Carburo de Silicio', desc: 'Ideal para vidrio, cerámica y materiales no ferrosos.' } },
        'Cintas Abrasivas': { en: { name: 'Abrasive Belts', desc: 'For belt sanders in heavy-duty operations.' }, es: { name: 'Cintas Abrasivas', desc: 'Para lijadoras de cinta en operaciones pesadas.' } },
        'Folhas Abrasivas': { en: { name: 'Abrasive Sheets', desc: 'Manual sanding and fine surface finishing.' }, es: { name: 'Hojas Abrasivas', desc: 'Lijado manual y acabado fino de superficies.' } },
        'Escovas de Aço': { en: { name: 'Wire Brushes', desc: 'Removal of scale, rust and burrs on carbon steel.' }, es: { name: 'Cepillos de Acero', desc: 'Remoción de cascarilla, óxido y rebabas en acero carbono.' } },
        'Escovas Inox / Circulares': { en: { name: 'Stainless / Circular Brushes', desc: 'Cleaning and finishing without contamination on stainless steel.' }, es: { name: 'Cepillos Inox / Circulares', desc: 'Limpieza y acabado sin contaminación en inox.' } },
        'Escovas Copo': { en: { name: 'Cup Brushes', desc: 'Flat surface cleaning with angle grinder.' }, es: { name: 'Cepillos Copa', desc: 'Limpieza de superficies planas con amoladora.' } },
        'Fresas de Metal Duro': { en: { name: 'Carbide Burrs', desc: 'Tungsten carbide for machining and deburring.' }, es: { name: 'Fresas de Metal Duro', desc: 'Carburo de tungsteno para maquinado y desbarbado.' } },
        'Pontas Montadas': { en: { name: 'Mounted Points', desc: 'Internal grinding and cavity finishing.' }, es: { name: 'Puntas Montadas', desc: 'Rectificado interno y acabado en cavidades.' } },
        // ── CATÁLOGO TÉCNICO (nomes alternativos) ──
        'Discos de Corte': { en: { name: 'Cut-Off Discs', desc: 'For steel, stainless and metal. Fast and precise cutting.' }, es: { name: 'Discos de Corte', desc: 'Para acero, inox y metal. Corte rápido y preciso.' } },
        'Discos Flap': { en: { name: 'Flap Discs', desc: 'Simultaneous grinding and finishing with high conformability.' }, es: { name: 'Discos Flap', desc: 'Desbaste y acabado simultáneo con alta conformabilidad.' } },
        'Discos de Desbaste': { en: { name: 'Grinding Discs', desc: 'Aggressive material removal on metallic surfaces.' }, es: { name: 'Discos de Desbaste', desc: 'Remoción agresiva de material en superficies metálicas.' } },
        'Discos Diamantados': { en: { name: 'Diamond Discs', desc: 'Segmented, turbo and continuous for concrete and stone.' }, es: { name: 'Discos Diamantados', desc: 'Segmentados, turbo y continuos para concreto y piedra.' } },
        'Discos Cerâmicos': { en: { name: 'Ceramic Discs', desc: 'Self-sharpening ceramic grain for high performance.' }, es: { name: 'Discos Cerámicos', desc: 'Grano cerámico autocortante para alto rendimiento.' } },
        'Rebolos Especiais (CBN/Diamante)': { en: { name: 'Special Wheels (CBN/Diamond)', desc: 'Superabrasives for hardened metals and ceramics.' }, es: { name: 'Muelas Especiales (CBN/Diamante)', desc: 'Superabrasivos para metales templados y cerámicas.' } },
        'Rebolos Convencionais': { en: { name: 'Conventional Grinding Wheels', desc: 'Cylindrical and surface grinding for general use.' }, es: { name: 'Muelas Convencionales', desc: 'Rectificado cilíndrico y plano para uso general.' } },
        'Lixas Diamantadas': { en: { name: 'Diamond Sanding Sheets', desc: 'High-precision polishing and leveling.' }, es: { name: 'Lijas Diamantadas', desc: 'Pulido y nivelación de alta precisión.' } },
        'Cintas p/ Alta Remoção': { en: { name: 'High Removal Belts', desc: 'Coarse grains for heavy grinding on metal and wood.' }, es: { name: 'Cintas Alta Remoción', desc: 'Grano grueso para desbaste pesado en metal y madera.' } },
        'Cintas p/ Retíficas Severas e Processos Industriais': { en: { name: 'Heavy Grinding & Industrial Process Belts', desc: '150x2000mm — High performance for heavy grinding, rotary dryers, granulators and large equipment.' }, es: { name: 'Cintas para Rectificado Severo y Procesos Industriales', desc: '150x2000mm — Alto desempeño para rectificado pesado, secadores rotativos, granuladores y equipos de gran porte.' } }
    };

    // =============================================
    // 3. TRADUÇÕES DE UI
    // =============================================
    const TRANSLATIONS = {
        pt: {
            // Navbar
            'nav.servicos': 'Serviços', 'nav.equipamentos': 'Equipamentos', 'nav.portfolio': 'Portfólio',
            'nav.global': 'Presença Global', 'nav.contato': 'Contato', 'nav.area': 'Minha Área',
            'nav.solicitar': 'Solicitar Serviço',
            // Hero
            'hero.badge': 'Serviços B2B Enterprise',
            'hero.sub': 'Excelência em Manutenção Industrial e Usinagem de Campo para operações de Alta Complexidade.',
            'hero.cta': 'Solicitar Avaliação Técnica',
            // História
            'historia.eyebrow': 'Fundada em 2002',
            'historia.title': 'Global Engineering Group',
            'historia.p1': 'A VERSATIL SERVICES foi fundada em 2002 com a missão de fornecer soluções de engenharia industrial de alta performance para operações críticas em múltiplos setores industriais.',
            'historia.p2': 'Ao longo dos anos, a empresa evoluiu para um grupo internacional de serviços industriais, reconhecido pela confiabilidade operacional, precisão técnica e capacidade estratégica de engenharia.',
            'historia.p3': 'Nossa experiência combina manutenção industrial pesada, usinagem de campo, fabricação industrial e soluções técnicas desenvolvidas para suportar operações críticas com máxima eficiência e segurança.',
            'historia.p4': 'Hoje, a VERSATIL SERVICES atua com visão global, preparada para atender indústrias no Brasil, Estados Unidos, Oriente Médio e mercados internacionais que exigem elevados padrões técnicos e excelência operacional.',
            'historia.p5': 'Movidos pela engenharia, precisão e parcerias de longo prazo, investimos continuamente em tecnologia, infraestrutura e inteligência industrial para entregar soluções confiáveis para desafios industriais complexos.',
            'historia.valores': 'Planejamento · Segurança · Qualidade · Performance · Confiabilidade',
            'historia.tagline': 'Esses princípios fazem parte da nossa base operacional.',
            // Setores
            'setores.tag': 'Mercados Atendidos', 'setores.title': 'Setores de Atuação',
            'setores.desc': 'Atendemos todos os segmentos da indústria brasileira e internacional — de refinarias a usinas, de plataformas a fábricas.',
            // Serviços
            'services.tag': 'Soluções Corporativas', 'services.title': 'Nossos Pilares de Atuação',
            'services.desc': 'Oferecemos soluções completas para o setor industrial, garantindo a disponibilidade e integridade dos seus ativos.',
            // Serviços Realizados
            'realizados.tag': 'Resultados Comprovados', 'realizados.title': 'Serviços Realizados',
            'realizados.desc': 'Galeria de trabalhos executados em campo e na oficina. Clique para ampliar.',
            'realizados.portfolio.btn': 'Ver Portfólio Completo (50 Fotos)',
            // Equipamentos
            'equip.tag': 'Expertise Técnica', 'equip.title': 'Equipamentos Atendidos',
            'equip.desc': 'Atuamos em todos os tipos de trocadores de calor e equipamentos industriais, com pronto atendimento 24h — On/Offshore.',
            // Números
            'numeros.tag': 'Resultados', 'numeros.title': 'Nossos Números',
            'numeros.desc': 'Mais de duas décadas de excelência em manutenção industrial.',
            'numeros.anos': 'Anos de Mercado', 'numeros.projetos': 'Projetos Executados',
            // Setores
            'setor.petroleo.name': 'Petróleo e Gás', 'setor.petroleo.desc': 'Refinarias, plataformas e plantas petroquímicas',
            'setor.quimico.name': 'Químico e Petroquímico', 'setor.quimico.desc': 'Plantas de processo contínuo e batelada',
            'setor.mineracao.name': 'Mineração e Siderurgia', 'setor.mineracao.desc': 'Fornos, secadores, cilindros e britadores',
            'setor.celulose.name': 'Celulose e Papel', 'setor.celulose.desc': 'Secadores, prensas e cilindros yankee',
            'setor.energia.name': 'Energia e Utilities', 'setor.energia.desc': 'Usinas termelétricas e de biomassa',
            'setor.alimenticio.name': 'Alimentos e Bebidas', 'setor.alimenticio.desc': 'Linhas de envase e processamento',
            'setor.fertilizantes.name': 'Fertilizantes', 'setor.fertilizantes.desc': 'Granuladoras, secadores e reatores',
            'setor.maritimo.name': 'Naval e Offshore', 'setor.maritimo.desc': 'Embarcações, plataformas e módulos',
            'setor.agua.name': 'Saneamento e Água', 'setor.agua.desc': 'ETAs, ETEs e estações de bombeamento',
            'setor.borracha.name': 'Borracha e Plásticos', 'setor.borracha.desc': 'Extrusoras e equipamentos de vulcanização',
            'setor.geracaoeletrica.name': 'Geração Elétrica', 'setor.geracaoeletrica.desc': 'Usinas hidrelétricas e subestações',
            'setor.construcao.name': 'Construção Pesada', 'setor.construcao.desc': 'Obras industriais e montagem',
            'setor.farmaceutico.name': 'Farmacêutico', 'setor.farmaceutico.desc': 'Laboratórios e instalações de produção',
            'setor.automotivo.name': 'Automotivo', 'setor.automotivo.desc': 'Plantas de montagem e autopeças',
            'setor.sucroalcooleiro.name': 'Sucroalcooleiro', 'setor.sucroalcooleiro.desc': 'Usinas de etanol e açúcar',
            // Aliases para setores usados no HTML
            'setor.petroquimica.name': 'Petroquímica', 'setor.petroquimica.desc': 'Refinarias e plantas químicas',
            'setor.refinarias.name': 'Refinarias de Petróleo', 'setor.refinarias.desc': 'Destilação, craqueamento e refino',
            'setor.quimica.name': 'Químico e Petroquímico', 'setor.quimica.desc': 'Plantas de processo contínuo',
            'setor.siderurgia.name': 'Siderurgia e Metalúrgico', 'setor.siderurgia.desc': 'Fornos elétricos e laminadores',
            'setor.papel.name': 'Celulose e Papel', 'setor.papel.desc': 'Secadores, prensas e cilindros Yankee',
            'setor.naval.name': 'Naval e Offshore', 'setor.naval.desc': 'Embarcações, plataformas e módulos',
            'setor.saneamento.name': 'Saneamento e Água', 'setor.saneamento.desc': 'ETAs, ETEs e estações de bombeamento',
            'setor.cimento.name': 'Cimento e Construção', 'setor.cimento.desc': 'Fornos rotativos e moinhos industriais',
            'setor.ferroviario.name': 'Ferroviário e Logística', 'setor.ferroviario.desc': 'Locomotivas, vagões e infraestrutura',
            // Contato
            'contact.comercial': 'Comercial',
            'wa.label': 'Solicitar Avaliação Técnica',

            'srv.rotativos.title': 'Manutenção de Equipamentos Rotativos',
            'srv.rotativos.desc': 'Inspeção técnica, alinhamento a laser, retífica de campo e recuperação estrutural de secadores, fornos, tambores e resfriadores.',
            'srv.rotativos.b1': 'Alinhamento a Laser de Equipamentos Rotativos',
            'srv.rotativos.b2': 'Usinagem de Campo em Rotativos',
            'srv.rotativos.b3': 'Recuperação Estrutural de Secadores e Fornos',
            'srv.rotativos.b4': 'Balanceamento Dinâmico',
            'srv.rotativos.b5': 'Retífica de Pista e Cilindro',
            'srv.rotativos.b6': 'Troca de Pneus e Roletes',
            'srv.industrial.title': 'Manutenção Industrial',
            'srv.industrial.desc': 'Planejamento, execução e gestão de paradas de manutenção. Revitalização de equipamentos estáticos e tubulações industriais.',
            'srv.industrial.b1': 'Apoio à Fiscalização e Gerenciamento de Contratos',
            'srv.industrial.b2': 'Gestão e Fiscalização de Paradas de Manutenção',
            'srv.industrial.b3': 'Caldeiraria em Parada de Torres, Vasos e Permutadores',
            'srv.industrial.b4': 'Inspeção de Integridade em Equipamentos e Tubulações',
            'srv.industrial.b5': 'Manutenção de Tanques e Esferas',
            'srv.industrial.b6': 'Manutenção de Fornos e Caldeiras',
            'srv.industrial.b7': 'Manutenção de Válvulas',
            'srv.industrial.b8': 'Enquadramento NR13',
            'srv.usinagem.title': 'Usinagem de Campo',
            'srv.usinagem.desc': 'Usinagem in loco com tolerâncias micrométricas. Faceamento de flanges, mandrilhamento, fresamento e torneamento de eixos sem desmontagem.',
            'srv.usinagem.b1': 'Usinagem Flange Face Lisa / Ranhurada / Canal RTJ',
            'srv.usinagem.b2': 'Fresagem de Base Metálicas',
            'srv.usinagem.b3': 'Mandrilhamentos',
            'srv.usinagem.b4': 'Biselamentos de Tubos',
            'srv.usinagem.b5': 'Retífica em Pista de Secador / Granulador',
            'srv.usinagem.b6': 'Usinagem / Retífica em Pino de Virabrequim',
            'srv.usinagem.b7': 'Usinagem em Ponta de Eixo',
            'srv.trocadores.title': 'Trocadores de Calor',
            'srv.trocadores.desc': 'Fabricação, retubagem, limpeza química e hidrojateamento de trocadores de calor casco e tubo, serpentinas e resfriadores a ar.',
            'srv.trocadores.b1': 'Manutenção em Trocadores de Calor',
            'srv.trocadores.b2': 'Retubagem e Mandrilhamento',
            'srv.trocadores.b3': 'Limpeza Química e Hidrojateamento',
            'srv.trocadores.b4': 'Fabricação de Feixes Tubulares',
            'srv.trocadores.b5': 'Teste Hidrostático',
            'srv.trocadores.b6': 'Troca de Gaxetas e Espelhos',
            'srv.ensaios.title': 'Ensaios Não Destrutivos',
            'srv.ensaios.desc': 'Ensaios END para garantir a integridade de equipamentos, tubulações e estruturas.',
            'srv.ensaios.b1': 'Líquido Penetrante',
            'srv.ensaios.b2': 'Partícula Magnética',
            'srv.ensaios.b3': 'Ultrassom / Medição de Espessura',
            'srv.ensaios.b4': 'Radiografia Industrial',
            'srv.ensaios.b5': 'Ensaio Visual',
            'srv.ensaios.b6': 'Identificação de Ligas Metálicas (PMI)',
            'srv.ensaios.b7': 'Inspeção de Pintura',
            'srv.ensaios.b8': 'Inspeção de Fabricação',
            'srv.ensaios.b9': 'Alpinismo Industrial',
            'srv.ensaios.b10': 'Controle de Qualidade',
            // Equipamentos
            'equip.casco.name': 'Casco e Tubo', 'equip.casco.desc': 'Shell & Tube — manutenção, retubagem e fabricação',
            'equip.aircooler.name': 'Air Cooler', 'equip.aircooler.desc': 'Resfriadores a ar — limpeza e manutenção preventiva',
            'equip.condensadores.name': 'Condensadores', 'equip.condensadores.desc': 'Condensadores de vapor — retubagem e teste de hélio',
            'equip.placas.name': 'Placas', 'equip.placas.desc': 'Limpeza, troca de gaxetas e coberturas',
            'equip.rotativos.name': 'Rotativos Industriais', 'equip.rotativos.desc': 'Secadores, fornos e tambores — retífica e alinhamento',
            // Galeria
            'gal.badge.usinagem': 'Usinagem de Campo', 'gal.badge.rotativos': 'Rotativos', 'gal.badge.trocadores': 'Trocadores',
            'gal.badge.manutencao': 'Manutenção', 'gal.badge.ensaios': 'Ensaios N.D.', 'gal.badge.usinagem2': 'Usinagem',
            'gal.title.flange': 'Faceamento de Flange', 'gal.title.pista': 'Retífica de Pista',
            'gal.title.retubagem': 'Retubagem Completa', 'gal.title.caldeiraria': 'Caldeiraria Industrial',
            'gal.title.radiografia': 'Radiografia Industrial', 'gal.title.mandrilhamento': 'Mandrilhamento',
            'gal.title.secador': 'Inspeção de Secador', 'gal.title.serpentina': 'Serpentina Industrial',
            // Presença Global
            'global.brasil.name': '🇧🇷 Brasil', 'global.brasil.addr': 'R. Miguel Banhos Gomes, 115<br>Iporanga — Sorocaba/SP<br>Santos - SP<br>CEP 18087-158',
            'global.espanha.name': '🇪🇸 España', 'global.espanha.addr': 'Calle Massens 16-18, Piso 2, Puerta 3<br>Barcelona 08024<br>Barcelona — España',
            'global.dubai.name': '🇦🇪 Dubai', 'global.dubai.addr': 'United Arab Emirates<br>DMCC FREE Zone<br>Dubai',
            'numeros.clientes': 'Clientes Atendidos', 'numeros.continentes': 'Continentes',
            // Global
            'global.tag': 'Alcance Internacional', 'global.title': 'Presença Global',
            'global.desc': 'Com operações estratégicas em 3 continentes, garantimos mobilização rápida e padronização técnica para projetos complexos ao redor do mundo.',
            // Contato
            'contact.tag': 'Engenharia & Negócios', 'contact.title': 'Fale com Nossa Equipe Técnica',
            'contact.desc': 'Estamos prontos para analisar seu projeto, fornecer orçamentos detalhados e planejar a próxima parada da sua planta industrial.',
            'contact.wa': 'WhatsApp Brasil', 'contact.email.label': 'Departamento Técnico',
            'contact.loc.label': 'Localização', 'contact.loc.value': 'Sorocaba/SP — Brasil',
            // Solicitar
            'sol.title': 'Solicitar Cotação', 'sol.subtitle': 'Preencha os dados abaixo e nossa equipe técnica retornará em até 4 horas.',
            'sol.sec.cliente': 'Dados do Cliente', 'sol.sec.servico': 'Detalhes do Serviço', 'sol.sec.anexos': 'Fotos e Anexos',
            'sol.empresa': 'Empresa *', 'sol.empresa.ph': 'Ex: Petrobras, Vale, Braskem...',
            'sol.responsavel': 'Responsável *', 'sol.responsavel.ph': 'Nome completo',
            'sol.whatsapp': 'WhatsApp *', 'sol.email': 'Email',
            'sol.tipo': 'Tipo de Serviço *', 'sol.selecione': 'Selecione...',
            'sol.tipo.rotativos': 'Equipamentos Rotativos', 'sol.tipo.manutencao': 'Manutenção Industrial',
            'sol.tipo.usinagem': 'Usinagem de Campo', 'sol.tipo.trocadores': 'Trocadores de Calor',
            'sol.tipo.end': 'Ensaios Não Destrutivos (END)', 'sol.tipo.outro': 'Outro',
            'sol.urgencia': 'Urgência', 'sol.urg.prog': 'Programada', 'sol.urg.urg': 'Urgente', 'sol.urg.emer': 'Emergência',
            'sol.descricao': 'Descrição da Necessidade *', 'sol.descricao.ph': 'Descreva o serviço necessário, equipamento, localização na planta, dimensões, etc.',
            'sol.obs': 'Observações Adicionais', 'sol.obs.ph': 'Condições de acesso, restrições de horário, EPIs especiais...',
            'sol.anexos.hint': 'Tire fotos do equipamento ou anexe desenhos técnicos (PDF, imagens).',
            'sol.btn.foto': 'Tirar Foto', 'sol.btn.arquivo': 'Anexar Arquivo',
            'sol.btn.salvar': 'Salvar Rascunho', 'sol.btn.wa': 'Enviar via WhatsApp', 'sol.btn.email': 'Enviar por Email',
            'sol.rascunhos': 'Rascunhos Salvos',
            'sol.nav.servicos': 'Serviços', 'sol.nav.solicitar': 'Solicitar Cotação',
            'sol.footer': 'Desde 2002 — Manutenção Industrial de Excelência',
            'contact.cta': 'Iniciar Conversa',
            // Footer
            'footer.rights': '© 2002 Versátil Services. Todos os direitos reservados.',
            'footer.loc': 'Sorocaba/SP — Brasil',
            // Misc
            'toast.added': (name) => `${name} adicionado!`, 'toast.qty.zero': 'Informe quantidade maior que zero.',
            'toast.price.invalid': 'Informe um preço válido.', 'toast.price.missing': 'Erro: preço não encontrado.',
            'toast.cart.empty': 'Adicione itens primeiro!', 'toast.fields.required': 'Preencha todos os campos.',
            'toast.usdt.copied': 'Endereço copiado!', 'currency.notice': '', 'unit': '/ un',
            'btn.adicionar': 'Adicionar', 'btn.adicionado': 'Adicionado!', 'btn.finalizar': 'Finalizar via WhatsApp',
            'cart.title': 'Meu Pedido', 'cart.empty': 'Pedido vazio', 'cart.empty.sub': 'Adicione itens', 'cart.total': 'TOTAL',
            'cc.title': 'Pagamento com Cartão', 'cc.total.label': 'Total', 'cc.surcharge': 'Acréscimo de 5% no cartão.',
            'cc.section.personal': 'Dados Pessoais', 'cc.name': 'Nome', 'cc.name.placeholder': 'Nome no cartão',
            'cc.cpf': 'CPF/CNPJ', 'cc.email': 'E-mail', 'cc.phone': 'Telefone', 'cc.cep': 'CEP',
            'cc.address': 'Número', 'cc.section.card': 'Dados do Cartão', 'cc.number': 'Número do cartão',
            'cc.month': 'Mês', 'cc.year': 'Ano', 'cc.cvv': 'CVV', 'cc.submit': 'Pagar',
            'cc.processing': 'Processando...', 'cc.processing.sub': 'Aguarde.', 'cc.close': 'Fechar',
            'cc.approved': 'Aprovado!', 'cc.pending': 'Processando', 'cc.declined': 'Recusado',
            'ck.title': 'Finalizar', 'ck.step1': 'Dados', 'ck.step2': 'Entrega', 'ck.step3': 'Pagamento', 'ck.step4': 'Resumo',
            'ck.pf': 'Pessoa Física', 'ck.pj': 'Pessoa Jurídica', 'ck.dados.pf': 'Dados Pessoais', 'ck.dados.pj': 'Dados da Empresa',
            'ck.nome': 'Nome *', 'ck.cpf': 'CPF *', 'ck.email': 'E-mail *', 'ck.phone': 'Telefone *',
            'ck.razao': 'Razão Social *', 'ck.fantasia': 'Fantasia', 'ck.cnpj': 'CNPJ *', 'ck.ie': 'IE', 'ck.responsavel': 'Responsável *',
            'ck.endereco.cad': 'Endereço', 'ck.cep': 'CEP *', 'ck.rua': 'Rua *', 'ck.numero': 'Número *',
            'ck.complemento': 'Complemento', 'ck.bairro': 'Bairro *', 'ck.cidade': 'Cidade *', 'ck.estado': 'Estado *',
            'ck.entrega.title': 'Endereço de Entrega', 'ck.entrega.same': 'Mesmo endereço', 'ck.entrega.diff': 'Outro endereço', 'ck.referencia': 'Referência',
            'ck.pag.title': 'Pagamento', 'ck.pix': 'PIX', 'ck.pix.desc': 'Instantâneo', 'ck.transf': 'Transferência', 'ck.transf.desc': 'Sicredi',
            'ck.usdt': 'USDT', 'ck.usdt.desc': 'Cripto', 'ck.cartao': 'Cartão', 'ck.cartao.taxa': '+5%',
            'ck.confirm': 'Confirmar →', 'ck.back': '← Voltar', 'ck.next': 'Próximo →', 'ck.send': 'Enviar via WhatsApp',
            'ck.resumo.produtos': 'Itens', 'ck.resumo.comprador': 'Comprador', 'ck.resumo.entrega': 'Entrega',
            'ck.resumo.pagamento': 'Pagamento', 'ck.resumo.fiscal': 'Fiscal', 'ck.pedido': 'PEDIDO',
            'ck.required': 'Preencha todos os campos.', 'ck.required.entrega': 'Preencha o endereço de entrega.',
            'pay.tag': 'Formas de Pagamento', 'pay.title': 'Pagamento', 'pay.desc': 'Formas de pagamento disponíveis.',
            'pay.pix.desc': 'PIX instantâneo', 'pay.pix.key': 'Chave PIX', 'pay.pix.holder': 'Edson de Oliveira Silva', 'pay.pix.instrucao': 'Envie comprovante pelo WhatsApp',
            'pay.bank.title': 'Dados Bancários', 'pay.bank.desc': 'Transferência bancária', 'pay.bank.banco': 'Banco', 'pay.bank.agencia': 'Agência', 'pay.bank.conta': 'Conta', 'pay.bank.titular': 'Titular',
            'pay.usdt.badge': '-5%', 'pay.usdt.desc': 'Aceito USDT (TRC20).', 'pay.usdt.copiar': 'Copiar',
            'pay.cc.badge': '+5%', 'pay.cc.title': 'Cartão', 'pay.cc.desc': 'Cartão de crédito.', 'pay.cc.notice': '+5% no cartão.', 'pay.cc.btn': 'Pagar com Cartão',
            'abr.pontas': 'Serviços', 'abr.pastas': 'Projetos', 'abr.dagua': 'Manutenção', 'abr.inox': 'Inspeção', 'abr.oxido': 'Usinagem', 'abr.carbeto': 'Ensaios'
        },
        en: {
            // Navbar
            'nav.servicos': 'Services', 'nav.equipamentos': 'Equipment', 'nav.portfolio': 'Portfolio',
            'nav.global': 'Global Presence', 'nav.contato': 'Contact', 'nav.area': 'My Area',
            'nav.solicitar': 'Request Service',
            // Hero
            'hero.badge': 'B2B Enterprise Services',
            'hero.sub': 'Excellence in Industrial Maintenance and Field Machining for High-Complexity Operations.',
            'hero.cta': 'Request Technical Assessment',
            // História
            'historia.eyebrow': 'Founded in 2002',
            'historia.title': 'Global Engineering Group',
            'historia.p1': 'VERSATIL SERVICES was founded in 2002 with the mission of delivering high-performance industrial engineering solutions for critical operations across multiple industrial sectors.',
            'historia.p2': 'Over the years, the company evolved into an international industrial services group, recognized for operational reliability, technical precision, and strategic engineering capacity.',
            'historia.p3': 'Our expertise combines heavy industrial maintenance, field machining, industrial manufacturing, and technical solutions designed to support critical operations with maximum efficiency and safety.',
            'historia.p4': 'Today, VERSATIL SERVICES operates with a global vision, ready to serve industries in Brazil, the United States, the Middle East, and international markets that demand the highest technical standards and operational excellence.',
            'historia.p5': 'Driven by engineering, precision, and long-term partnerships, we continuously invest in technology, infrastructure, and industrial intelligence to deliver reliable solutions for complex industrial challenges.',
            'historia.valores': 'Planning · Safety · Quality · Performance · Reliability',
            'historia.tagline': 'These principles are the foundation of our operations.',
            // Setores
            'setores.tag': 'Markets Served', 'setores.title': 'Industry Sectors',
            'setores.desc': 'We serve all segments of Brazilian and international industry — from refineries to mills, from platforms to factories.',
            // Serviços
            'services.tag': 'Corporate Solutions', 'services.title': 'Our Core Services',
            'services.desc': 'We offer complete solutions for the industrial sector, ensuring the availability and integrity of your assets.',
            // Realizados
            'realizados.tag': 'Proven Results', 'realizados.title': 'Completed Services',
            'realizados.desc': 'Gallery of work carried out in the field and at the workshop. Click to enlarge.',
            'realizados.portfolio.btn': 'View Full Portfolio (50 Photos)',
            // Equipamentos
            'equip.tag': 'Technical Expertise', 'equip.title': 'Equipment We Service',
            'equip.desc': 'We work with all types of heat exchangers and industrial equipment, with 24h on-call — On/Offshore.',
            // Números
            'numeros.tag': 'Results', 'numeros.title': 'Our Numbers',
            'numeros.desc': 'Over two decades of excellence in industrial maintenance.',
            'numeros.anos': 'Years in Business', 'numeros.projetos': 'Projects Completed',
            // Sectors
            'setor.petroleo.name': 'Oil & Gas', 'setor.petroleo.desc': 'Refineries, platforms and petrochemical plants',
            'setor.quimico.name': 'Chemical & Petrochemical', 'setor.quimico.desc': 'Continuous and batch process plants',
            'setor.mineracao.name': 'Mining & Steel', 'setor.mineracao.desc': 'Kilns, dryers, cylinders and crushers',
            'setor.celulose.name': 'Pulp & Paper', 'setor.celulose.desc': 'Dryers, presses and yankee cylinders',
            'setor.energia.name': 'Energy & Utilities', 'setor.energia.desc': 'Thermoelectric and biomass plants',
            'setor.alimenticio.name': 'Food & Beverage', 'setor.alimenticio.desc': 'Bottling and processing lines',
            'setor.fertilizantes.name': 'Fertilizers', 'setor.fertilizantes.desc': 'Granulators, dryers and reactors',
            'setor.maritimo.name': 'Naval & Offshore', 'setor.maritimo.desc': 'Vessels, platforms and modules',
            'setor.agua.name': 'Water & Sanitation', 'setor.agua.desc': 'Water and wastewater treatment plants',
            'setor.borracha.name': 'Rubber & Plastics', 'setor.borracha.desc': 'Extruders and vulcanization equipment',
            'setor.geracaoeletrica.name': 'Power Generation', 'setor.geracaoeletrica.desc': 'Hydroelectric plants and substations',
            'setor.construcao.name': 'Heavy Construction', 'setor.construcao.desc': 'Industrial works and assembly',
            'setor.farmaceutico.name': 'Pharmaceutical', 'setor.farmaceutico.desc': 'Laboratories and production facilities',
            'setor.automotivo.name': 'Automotive', 'setor.automotivo.desc': 'Assembly plants and auto parts',
            'setor.sucroalcooleiro.name': 'Sugar & Ethanol', 'setor.sucroalcooleiro.desc': 'Ethanol and sugar mills',
            // Aliases for HTML setor keys
            'setor.petroquimica.name': 'Petrochemical', 'setor.petroquimica.desc': 'Refineries and chemical plants',
            'setor.refinarias.name': 'Oil Refineries', 'setor.refinarias.desc': 'Distillation, cracking and refining',
            'setor.quimica.name': 'Chemical & Petrochemical', 'setor.quimica.desc': 'Continuous process plants',
            'setor.siderurgia.name': 'Steel & Metallurgy', 'setor.siderurgia.desc': 'Electric furnaces and rolling mills',
            'setor.papel.name': 'Pulp & Paper', 'setor.papel.desc': 'Dryers, presses and Yankee cylinders',
            'setor.naval.name': 'Naval & Offshore', 'setor.naval.desc': 'Vessels, platforms and modules',
            'setor.saneamento.name': 'Water & Sanitation', 'setor.saneamento.desc': 'Water treatment and pumping stations',
            'setor.cimento.name': 'Cement & Construction', 'setor.cimento.desc': 'Rotary kilns and industrial mills',
            'setor.ferroviario.name': 'Railway & Logistics', 'setor.ferroviario.desc': 'Locomotives, wagons and infrastructure',
            // Contact
            'contact.comercial': 'Commercial',
            'wa.label': 'Request Technical Assessment',

            // Services
            'srv.rotativos.title': 'Rotating Equipment Maintenance',
            'srv.rotativos.desc': 'Technical inspection, laser alignment, field grinding and structural recovery of dryers, kilns, drums and coolers.',
            'srv.rotativos.b1': 'Laser Alignment of Rotating Equipment',
            'srv.rotativos.b2': 'Field Machining on Rotating Equipment',
            'srv.rotativos.b3': 'Structural Recovery of Dryers and Kilns',
            'srv.rotativos.b4': 'Dynamic Balancing',
            'srv.rotativos.b5': 'Track and Cylinder Grinding',
            'srv.rotativos.b6': 'Tire and Roller Replacement',
            'srv.industrial.title': 'Industrial Maintenance',
            'srv.industrial.desc': 'Planning, execution and management of maintenance shutdowns. Revitalization of static equipment and industrial piping.',
            'srv.industrial.b1': 'Supervision Support and Contract Management',
            'srv.industrial.b2': 'Shutdown Management and Supervision',
            'srv.industrial.b3': 'Boilermaking on Towers, Vessels and Exchangers',
            'srv.industrial.b4': 'Integrity Inspection of Equipment and Piping',
            'srv.industrial.b5': 'Tank and Sphere Maintenance',
            'srv.industrial.b6': 'Furnace and Boiler Maintenance',
            'srv.industrial.b7': 'Valve Maintenance',
            'srv.industrial.b8': 'NR13 Compliance',
            'srv.usinagem.title': 'Field Machining',
            'srv.usinagem.desc': 'On-site machining with micrometric tolerances. Flange facing, line boring, milling and shaft turning without disassembly.',
            'srv.usinagem.b1': 'Flange Face Machining — Flat / Grooved / RTJ',
            'srv.usinagem.b2': 'Metal Base Milling',
            'srv.usinagem.b3': 'Line Boring',
            'srv.usinagem.b4': 'Pipe Beveling',
            'srv.usinagem.b5': 'Dryer / Granulator Track Grinding',
            'srv.usinagem.b6': 'Crankshaft Pin Machining / Grinding',
            'srv.usinagem.b7': 'Shaft End Machining',
            'srv.trocadores.title': 'Heat Exchangers',
            'srv.trocadores.desc': 'Manufacturing, re-tubing, chemical cleaning and hydroblasting of shell-and-tube heat exchangers, coils and air coolers.',
            'srv.trocadores.b1': 'Heat Exchanger Maintenance',
            'srv.trocadores.b2': 'Re-tubing and Line Boring',
            'srv.trocadores.b3': 'Chemical Cleaning and Hydroblasting',
            'srv.trocadores.b4': 'Tube Bundle Manufacturing',
            'srv.trocadores.b5': 'Hydrostatic Testing',
            'srv.trocadores.b6': 'Gasket and Mirror Replacement',
            'srv.ensaios.title': 'Non-Destructive Testing',
            'srv.ensaios.desc': 'NDT inspections to ensure the integrity of equipment, piping and structures.',
            'srv.ensaios.b1': 'Liquid Penetrant',
            'srv.ensaios.b2': 'Magnetic Particle',
            'srv.ensaios.b3': 'Ultrasound / Thickness Measurement',
            'srv.ensaios.b4': 'Industrial Radiography',
            'srv.ensaios.b5': 'Visual Inspection',
            'srv.ensaios.b6': 'Metallic Alloy Identification (PMI)',
            'srv.ensaios.b7': 'Paint Inspection',
            'srv.ensaios.b8': 'Manufacturing Inspection',
            'srv.ensaios.b9': 'Industrial Rope Access',
            'srv.ensaios.b10': 'Quality Control',
            // Equipment
            'equip.casco.name': 'Shell & Tube', 'equip.casco.desc': 'Shell & Tube — maintenance, re-tubing and manufacturing',
            'equip.aircooler.name': 'Air Cooler', 'equip.aircooler.desc': 'Air coolers — cleaning and preventive maintenance',
            'equip.condensadores.name': 'Condensers', 'equip.condensadores.desc': 'Steam condensers — re-tubing and helium testing',
            'equip.placas.name': 'Plate Exchangers', 'equip.placas.desc': 'Cleaning, gasket and cover replacement',
            'equip.rotativos.name': 'Industrial Rotating Equipment', 'equip.rotativos.desc': 'Dryers, kilns and drums — grinding and alignment',
            // Gallery
            'gal.badge.usinagem': 'Field Machining', 'gal.badge.rotativos': 'Rotating Equipment', 'gal.badge.trocadores': 'Heat Exchangers',
            'gal.badge.manutencao': 'Maintenance', 'gal.badge.ensaios': 'NDT Inspections', 'gal.badge.usinagem2': 'Machining',
            'gal.title.flange': 'Flange Facing', 'gal.title.pista': 'Track Grinding',
            'gal.title.retubagem': 'Full Re-tubing', 'gal.title.caldeiraria': 'Industrial Boilermaking',
            'gal.title.radiografia': 'Industrial Radiography', 'gal.title.mandrilhamento': 'Line Boring',
            'gal.title.secador': 'Dryer Inspection', 'gal.title.serpentina': 'Industrial Coil',
            // Global Presence
            'global.brasil.name': '🇧🇷 Brazil', 'global.brasil.addr': 'R. Miguel Banhos Gomes, 115<br>Iporanga — Sorocaba/SP<br>Santos - SP<br>ZIP 18087-158',
            'global.espanha.name': '🇪🇸 Spain', 'global.espanha.addr': 'Calle Massens 16-18, Floor 2, Door 3<br>Barcelona 08024<br>Barcelona — Spain',
            'global.dubai.name': '🇦🇪 Dubai', 'global.dubai.addr': 'United Arab Emirates<br>DMCC FREE Zone<br>Dubai',
            'numeros.clientes': 'Clients Served', 'numeros.continentes': 'Continents',
            // Global
            'global.tag': 'International Reach', 'global.title': 'Global Presence',
            'global.desc': 'With strategic operations on 3 continents, we guarantee rapid mobilization and technical standardization for complex projects worldwide.',
            // Contato
            'contact.tag': 'Engineering & Business', 'contact.title': 'Talk to Our Technical Team',
            'contact.desc': 'We are ready to analyze your project, provide detailed quotes and plan the next shutdown of your industrial plant.',
            'contact.wa': 'WhatsApp Brazil', 'contact.email.label': 'Technical Department',
            'contact.loc.label': 'Location', 'contact.loc.value': 'Sorocaba/SP — Brazil',
            // Solicitar
            'sol.title': 'Request Quotation', 'sol.subtitle': 'Fill in the details below and our technical team will respond within 4 hours.',
            'sol.sec.cliente': 'Client Information', 'sol.sec.servico': 'Service Details', 'sol.sec.anexos': 'Photos & Attachments',
            'sol.empresa': 'Company *', 'sol.empresa.ph': 'Ex: Aramco, ADNOC, Shell...',
            'sol.responsavel': 'Contact Person *', 'sol.responsavel.ph': 'Full name',
            'sol.whatsapp': 'WhatsApp *', 'sol.email': 'Email',
            'sol.tipo': 'Service Type *', 'sol.selecione': 'Select...',
            'sol.tipo.rotativos': 'Rotating Equipment', 'sol.tipo.manutencao': 'Industrial Maintenance',
            'sol.tipo.usinagem': 'Field Machining', 'sol.tipo.trocadores': 'Heat Exchangers',
            'sol.tipo.end': 'Non-Destructive Testing (NDT)', 'sol.tipo.outro': 'Other',
            'sol.urgencia': 'Priority', 'sol.urg.prog': 'Scheduled', 'sol.urg.urg': 'Urgent', 'sol.urg.emer': 'Emergency',
            'sol.descricao': 'Service Description *', 'sol.descricao.ph': 'Describe the required service, equipment, plant location, dimensions, etc.',
            'sol.obs': 'Additional Notes', 'sol.obs.ph': 'Access conditions, time restrictions, special PPE requirements...',
            'sol.anexos.hint': 'Take photos of the equipment or attach technical drawings (PDF, images).',
            'sol.btn.foto': 'Take Photo', 'sol.btn.arquivo': 'Attach File',
            'sol.btn.salvar': 'Save Draft', 'sol.btn.wa': 'Send via WhatsApp', 'sol.btn.email': 'Send by Email',
            'sol.rascunhos': 'Saved Drafts',
            'sol.nav.servicos': 'Services', 'sol.nav.solicitar': 'Request Quotation',
            'sol.footer': 'Since 2002 — Excellence in Industrial Maintenance',
            'contact.cta': 'Start a Conversation',
            // Footer
            'footer.rights': '© 2002 Versátil Services. All rights reserved.',
            'footer.loc': 'Sorocaba/SP — Brazil',
            // Misc (same pattern)
            'toast.added': (name) => `${name} added!`, 'toast.qty.zero': 'Enter quantity > 0.',
            'toast.price.invalid': 'Enter a valid price.', 'toast.price.missing': 'Error: price not found.',
            'toast.cart.empty': 'Add items first!', 'toast.fields.required': 'Fill in all required fields.',
            'toast.usdt.copied': 'Address copied!', 'currency.notice': 'Prices shown in USD', 'unit': '/ ea',
            'btn.adicionar': 'Add', 'btn.adicionado': 'Added!', 'btn.finalizar': 'Complete via WhatsApp',
            'cart.title': 'My Order', 'cart.empty': 'Empty order', 'cart.empty.sub': 'Add items', 'cart.total': 'TOTAL',
            'cc.title': 'Card Payment', 'cc.total.label': 'Total', 'cc.surcharge': '+5% card processing fee.',
            'cc.section.personal': 'Personal Details', 'cc.name': 'Name', 'cc.name.placeholder': 'Name on card',
            'cc.cpf': 'Tax ID', 'cc.email': 'E-mail', 'cc.phone': 'Phone', 'cc.cep': 'Zip Code',
            'cc.address': 'Number', 'cc.section.card': 'Card Details', 'cc.number': 'Card number',
            'cc.month': 'Month', 'cc.year': 'Year', 'cc.cvv': 'CVV', 'cc.submit': 'Pay Now',
            'cc.processing': 'Processing...', 'cc.processing.sub': 'Please wait.', 'cc.close': 'Close',
            'cc.approved': 'Approved!', 'cc.pending': 'Processing', 'cc.declined': 'Declined',
            'ck.title': 'Checkout', 'ck.step1': 'Details', 'ck.step2': 'Shipping', 'ck.step3': 'Payment', 'ck.step4': 'Summary',
            'ck.pf': 'Individual', 'ck.pj': 'Company', 'ck.dados.pf': 'Personal Details', 'ck.dados.pj': 'Company Details',
            'ck.nome': 'Name *', 'ck.cpf': 'Tax ID *', 'ck.email': 'E-mail *', 'ck.phone': 'Phone *',
            'ck.razao': 'Company Name *', 'ck.fantasia': 'Trade Name', 'ck.cnpj': 'Company ID *', 'ck.ie': 'State Reg.', 'ck.responsavel': 'Contact *',
            'ck.endereco.cad': 'Address', 'ck.cep': 'Zip *', 'ck.rua': 'Street *', 'ck.numero': 'Number *',
            'ck.complemento': 'Unit', 'ck.bairro': 'District *', 'ck.cidade': 'City *', 'ck.estado': 'State *',
            'ck.entrega.title': 'Shipping Address', 'ck.entrega.same': 'Same address', 'ck.entrega.diff': 'Different address', 'ck.referencia': 'Landmark',
            'ck.pag.title': 'Payment', 'ck.pix': 'PIX', 'ck.pix.desc': 'Instant', 'ck.transf': 'Wire Transfer', 'ck.transf.desc': 'Bank details',
            'ck.usdt': 'USDT', 'ck.usdt.desc': 'Crypto', 'ck.cartao': 'Card', 'ck.cartao.taxa': '+5% fee',
            'ck.confirm': 'Confirm →', 'ck.back': '← Back', 'ck.next': 'Next →', 'ck.send': 'Send via WhatsApp',
            'ck.resumo.produtos': 'Items', 'ck.resumo.comprador': 'Buyer', 'ck.resumo.entrega': 'Shipping',
            'ck.resumo.pagamento': 'Payment', 'ck.resumo.fiscal': 'Tax', 'ck.pedido': 'ORDER',
            'ck.required': 'Fill all required fields.', 'ck.required.entrega': 'Fill shipping address.',
            'pay.tag': 'Payment Methods', 'pay.title': 'Payment', 'pay.desc': 'Available payment options.',
            'pay.pix.desc': 'Instant PIX', 'pay.pix.key': 'PIX Key', 'pay.pix.holder': 'Edson de Oliveira Silva', 'pay.pix.instrucao': 'Send receipt via WhatsApp',
            'pay.bank.title': 'Bank Details', 'pay.bank.desc': 'Wire transfer', 'pay.bank.banco': 'Bank', 'pay.bank.agencia': 'Branch', 'pay.bank.conta': 'Account', 'pay.bank.titular': 'Holder',
            'pay.usdt.badge': '-5%', 'pay.usdt.desc': 'USDT (TRC20) accepted.', 'pay.usdt.copiar': 'Copy',
            'pay.cc.badge': '+5%', 'pay.cc.title': 'Card', 'pay.cc.desc': 'Credit card.', 'pay.cc.notice': '+5% card fee.', 'pay.cc.btn': 'Pay with Card',
            'abr.pontas': 'Services', 'abr.pastas': 'Projects', 'abr.dagua': 'Maintenance', 'abr.inox': 'Inspection', 'abr.oxido': 'Machining', 'abr.carbeto': 'Testing'
        },
        es: {
            // Navbar
            'nav.servicos': 'Servicios', 'nav.equipamentos': 'Equipos', 'nav.portfolio': 'Portafolio',
            'nav.global': 'Presencia Global', 'nav.contato': 'Contacto', 'nav.area': 'Mi Área',
            'nav.solicitar': 'Solicitar Servicio',
            // Hero
            'hero.badge': 'Servicios B2B Enterprise',
            'hero.sub': 'Excelencia en Mantenimiento Industrial y Mecanizado de Campo para operaciones de Alta Complejidad.',
            'hero.cta': 'Solicitar Evaluación Técnica',
            // História
            'historia.eyebrow': 'Fundada en 2002',
            'historia.title': 'Global Engineering Group',
            'historia.p1': 'VERSATIL SERVICES fue fundada en 2002 con la misión de proporcionar soluciones de ingeniería industrial de alto rendimiento para operaciones críticas en múltiples sectores industriales.',
            'historia.p2': 'A lo largo de los años, la empresa evolucionó hasta convertirse en un grupo internacional de servicios industriales, reconocido por su confiabilidad operacional, precisión técnica y capacidad estratégica de ingeniería.',
            'historia.p3': 'Nuestra experiencia combina mantenimiento industrial pesado, mecanizado de campo, fabricación industrial y soluciones técnicas desarrolladas para soportar operaciones críticas con máxima eficiencia y seguridad.',
            'historia.p4': 'Hoy, VERSATIL SERVICES opera con visión global, preparada para atender industrias en Brasil, Estados Unidos, Oriente Medio y mercados internacionales que exigen los más altos estándares técnicos y excelencia operacional.',
            'historia.p5': 'Impulsados por la ingeniería, la precisión y las alianzas a largo plazo, invertimos continuamente en tecnología, infraestructura e inteligencia industrial para ofrecer soluciones confiables a desafíos industriales complejos.',
            'historia.valores': 'Planificación · Seguridad · Calidad · Performance · Confiabilidad',
            'historia.tagline': 'Estos principios forman la base de nuestras operaciones.',
            // Setores
            'setores.tag': 'Mercados Atendidos', 'setores.title': 'Sectores de Actuación',
            'setores.desc': 'Atendemos todos los segmentos de la industria brasileña e internacional — de refinerías a plantas, de plataformas a fábricas.',
            // Serviços
            'services.tag': 'Soluciones Corporativas', 'services.title': 'Nuestros Pilares',
            'services.desc': 'Ofrecemos soluciones completas para el sector industrial, garantizando la disponibilidad e integridad de sus activos.',
            // Realizados
            'realizados.tag': 'Resultados Comprobados', 'realizados.title': 'Servicios Realizados',
            'realizados.desc': 'Galería de trabajos ejecutados en campo y en taller. Haga clic para ampliar.',
            'realizados.portfolio.btn': 'Ver Portafolio Completo (50 Fotos)',
            // Equipamentos
            'equip.tag': 'Expertise Técnica', 'equip.title': 'Equipos Atendidos',
            'equip.desc': 'Trabajamos con todo tipo de intercambiadores de calor y equipos industriales, con atención 24h — On/Offshore.',
            // Números
            'numeros.tag': 'Resultados', 'numeros.title': 'Nuestros Números',
            'numeros.desc': 'Más de dos décadas de excelencia en mantenimiento industrial.',
            'numeros.anos': 'Años en el Mercado', 'numeros.projetos': 'Proyectos Ejecutados',
            // Sectores
            'setor.petroleo.name': 'Petróleo y Gas', 'setor.petroleo.desc': 'Refinerías, plataformas y plantas petroquímicas',
            'setor.quimico.name': 'Químico y Petroquímico', 'setor.quimico.desc': 'Plantas de proceso continuo y por lotes',
            'setor.mineracao.name': 'Minería y Siderurgia', 'setor.mineracao.desc': 'Hornos, secadores, cilindros y trituradoras',
            'setor.celulose.name': 'Celulosa y Papel', 'setor.celulose.desc': 'Secadores, prensas y cilindros yankee',
            'setor.energia.name': 'Energía y Utilities', 'setor.energia.desc': 'Plantas termoeléctricas y de biomasa',
            'setor.alimenticio.name': 'Alimentos y Bebidas', 'setor.alimenticio.desc': 'Líneas de envasado y procesamiento',
            'setor.fertilizantes.name': 'Fertilizantes', 'setor.fertilizantes.desc': 'Granuladoras, secadores y reactores',
            'setor.maritimo.name': 'Naval y Offshore', 'setor.maritimo.desc': 'Embarcaciones, plataformas y módulos',
            'setor.agua.name': 'Saneamiento y Agua', 'setor.agua.desc': 'Plantas de tratamiento de agua y aguas residuales',
            'setor.borracha.name': 'Caucho y Plásticos', 'setor.borracha.desc': 'Extrusoras y equipos de vulcanización',
            'setor.geracaoeletrica.name': 'Generación Eléctrica', 'setor.geracaoeletrica.desc': 'Plantas hidroeléctricas y subestaciones',
            'setor.construcao.name': 'Construcción Pesada', 'setor.construcao.desc': 'Obras industriales y montaje',
            'setor.farmaceutico.name': 'Farmacéutico', 'setor.farmaceutico.desc': 'Laboratorios e instalaciones de producción',
            'setor.automotivo.name': 'Automotriz', 'setor.automotivo.desc': 'Plantas de ensamblaje y autopartes',
            'setor.sucroalcooleiro.name': 'Azúcar y Etanol', 'setor.sucroalcooleiro.desc': 'Plantas de etanol y azúcar',
            // Aliases para setores del HTML
            'setor.petroquimica.name': 'Petroquímica', 'setor.petroquimica.desc': 'Refinerías y plantas químicas',
            'setor.refinarias.name': 'Refinerías de Petróleo', 'setor.refinarias.desc': 'Destilación, craqueo y refino',
            'setor.quimica.name': 'Química y Petroquímica', 'setor.quimica.desc': 'Plantas de proceso continuo',
            'setor.siderurgia.name': 'Siderúrgia y Metalurgia', 'setor.siderurgia.desc': 'Hornos eléctricos y laminadores',
            'setor.papel.name': 'Celulosa y Papel', 'setor.papel.desc': 'Secadores, prensas y cilindros Yankee',
            'setor.naval.name': 'Naval y Offshore', 'setor.naval.desc': 'Embarcaciones, plataformas y módulos',
            'setor.saneamento.name': 'Agua y Saneamiento', 'setor.saneamento.desc': 'Plantas de tratamiento y bombeo',
            'setor.cimento.name': 'Cemento y Construcción', 'setor.cimento.desc': 'Hornos rotativos y molinos industriales',
            'setor.ferroviario.name': 'Ferroviario y Logística', 'setor.ferroviario.desc': 'Locomotoras, vagones e infraestructura',
            // Contacto
            'contact.comercial': 'Comercial',
            'wa.label': 'Solicitar Evaluación Técnica',

            // Servicios
            'srv.rotativos.title': 'Mantenimiento de Equipos Rotativos',
            'srv.rotativos.desc': 'Inspección técnica, alineación láser, rectificado de campo y recuperación estructural de secadores, hornos, tambores y enfriadores.',
            'srv.rotativos.b1': 'Alineación Láser de Equipos Rotativos',
            'srv.rotativos.b2': 'Mecanizado de Campo en Rotativos',
            'srv.rotativos.b3': 'Recuperación Estructural de Secadores y Hornos',
            'srv.rotativos.b4': 'Balanceo Dinámico',
            'srv.rotativos.b5': 'Rectificado de Pista y Cilindro',
            'srv.rotativos.b6': 'Cambio de Neumáticos y Rodillos',
            'srv.industrial.title': 'Mantenimiento Industrial',
            'srv.industrial.desc': 'Planificación, ejecución y gestión de paradas de mantenimiento. Revitalización de equipos estáticos y tuberías industriales.',
            'srv.industrial.b1': 'Apoyo a la Fiscalización y Gestión de Contratos',
            'srv.industrial.b2': 'Gestión y Supervisión de Paradas de Mantenimiento',
            'srv.industrial.b3': 'Calderería en Torres, Vasijas y Permutadores',
            'srv.industrial.b4': 'Inspección de Integridad en Equipos y Tuberías',
            'srv.industrial.b5': 'Mantenimiento de Tanques y Esferas',
            'srv.industrial.b6': 'Mantenimiento de Hornos y Calderas',
            'srv.industrial.b7': 'Mantenimiento de Válvulas',
            'srv.industrial.b8': 'Adecuación NR13',
            'srv.usinagem.title': 'Mecanizado de Campo',
            'srv.usinagem.desc': 'Mecanizado in situ con tolerancias micrométricas. Refrentado de bridas, mandrinado, fresado y torneado de ejes sin desmontaje.',
            'srv.usinagem.b1': 'Refrentado de Brida — Liso / Ranurado / RTJ',
            'srv.usinagem.b2': 'Fresado de Bases Metálicas',
            'srv.usinagem.b3': 'Mandrinado',
            'srv.usinagem.b4': 'Biselado de Tubos',
            'srv.usinagem.b5': 'Rectificado de Pista de Secador / Granulador',
            'srv.usinagem.b6': 'Mecanizado / Rectificado de Perno de Cigüeñal',
            'srv.usinagem.b7': 'Mecanizado de Punta de Eje',
            'srv.trocadores.title': 'Intercambiadores de Calor',
            'srv.trocadores.desc': 'Fabricación, re-tubado, limpieza química e hidrochorro de intercambiadores de calor carcasa y tubos, serpentinas y enfriadores.',
            'srv.trocadores.b1': 'Mantenimiento de Intercambiadores de Calor',
            'srv.trocadores.b2': 'Re-tubado y Mandrinado',
            'srv.trocadores.b3': 'Limpieza Química e Hidrochorro',
            'srv.trocadores.b4': 'Fabricación de Haces Tubulares',
            'srv.trocadores.b5': 'Prueba Hidrostática',
            'srv.trocadores.b6': 'Cambio de Juntas y Espejos',
            'srv.ensaios.title': 'Ensayos No Destructivos',
            'srv.ensaios.desc': 'Ensayos END para garantizar la integridad de equipos, tuberías y estructuras.',
            'srv.ensaios.b1': 'Líquido Penetrante',
            'srv.ensaios.b2': 'Partícula Magnética',
            'srv.ensaios.b3': 'Ultrasonido / Medición de Espesor',
            'srv.ensaios.b4': 'Radiografía Industrial',
            'srv.ensaios.b5': 'Inspección Visual',
            'srv.ensaios.b6': 'Identificación de Aleaciones Metálicas (PMI)',
            'srv.ensaios.b7': 'Inspección de Pintura',
            'srv.ensaios.b8': 'Inspección de Fabricación',
            'srv.ensaios.b9': 'Alpinismo Industrial',
            'srv.ensaios.b10': 'Control de Calidad',
            // Equipos
            'equip.casco.name': 'Carcasa y Tubos', 'equip.casco.desc': 'Shell & Tube — mantenimiento, re-tubado y fabricación',
            'equip.aircooler.name': 'Air Cooler', 'equip.aircooler.desc': 'Enfriadores de aire — limpieza y mantenimiento preventivo',
            'equip.condensadores.name': 'Condensadores', 'equip.condensadores.desc': 'Condensadores de vapor — re-tubado y prueba de helio',
            'equip.placas.name': 'Intercambiador de Placas', 'equip.placas.desc': 'Limpieza, cambio de juntas y cubiertas',
            'equip.rotativos.name': 'Equipos Rotativos Industriales', 'equip.rotativos.desc': 'Secadores, hornos y tambores — rectificado y alineación',
            // Galería
            'gal.badge.usinagem': 'Mecanizado de Campo', 'gal.badge.rotativos': 'Equipos Rotativos', 'gal.badge.trocadores': 'Intercambiadores',
            'gal.badge.manutencao': 'Mantenimiento', 'gal.badge.ensaios': 'Inspección END', 'gal.badge.usinagem2': 'Mecanizado',
            'gal.title.flange': 'Refrentado de Brida', 'gal.title.pista': 'Rectificado de Pista',
            'gal.title.retubagem': 'Re-tubado Completo', 'gal.title.caldeiraria': 'Calderería Industrial',
            'gal.title.radiografia': 'Radiografía Industrial', 'gal.title.mandrilhamento': 'Mandrinado',
            'gal.title.secador': 'Inspección de Secador', 'gal.title.serpentina': 'Serpentín Industrial',
            // Presencia Global
            'global.brasil.name': '🇧🇷 Brasil', 'global.brasil.addr': 'R. Miguel Banhos Gomes, 115<br>Iporanga — Sorocaba/SP<br>Santos - SP<br>CEP 18087-158',
            'global.espanha.name': '🇪🇸 España', 'global.espanha.addr': 'Calle Massens 16-18, Piso 2, Puerta 3<br>Barcelona 08024<br>Barcelona — España',
            'global.dubai.name': '🇦🇪 Dubái', 'global.dubai.addr': 'Emiratos Árabes Unidos<br>Zona Franca DMCC<br>Dubái',
            'numeros.clientes': 'Clientes Atendidos', 'numeros.continentes': 'Continentes',
            // Global
            'global.tag': 'Alcance Internacional', 'global.title': 'Presencia Global',
            'global.desc': 'Con operaciones estratégicas en 3 continentes, garantizamos movilización rápida y estandarización técnica para proyectos complejos en todo el mundo.',
            // Contato
            'contact.tag': 'Ingeniería & Negocios', 'contact.title': 'Hable con Nuestro Equipo Técnico',
            'contact.desc': 'Estamos listos para analizar su proyecto, proporcionar presupuestos detallados y planificar la próxima parada de su planta industrial.',
            'contact.wa': 'WhatsApp Brasil', 'contact.email.label': 'Departamento Técnico',
            'contact.loc.label': 'Ubicación', 'contact.loc.value': 'Sorocaba/SP — Brasil',
            // Solicitar
            'sol.title': 'Solicitar Cotización', 'sol.subtitle': 'Complete los datos a continuación y nuestro equipo técnico responderá en 4 horas.',
            'sol.sec.cliente': 'Datos del Cliente', 'sol.sec.servico': 'Detalles del Servicio', 'sol.sec.anexos': 'Fotos y Archivos',
            'sol.empresa': 'Empresa *', 'sol.empresa.ph': 'Ej: Repsol, Pemex, YPF...',
            'sol.responsavel': 'Responsable *', 'sol.responsavel.ph': 'Nombre completo',
            'sol.whatsapp': 'WhatsApp *', 'sol.email': 'Email',
            'sol.tipo': 'Tipo de Servicio *', 'sol.selecione': 'Seleccione...',
            'sol.tipo.rotativos': 'Equipos Rotativos', 'sol.tipo.manutencao': 'Mantenimiento Industrial',
            'sol.tipo.usinagem': 'Mecanizado de Campo', 'sol.tipo.trocadores': 'Intercambiadores de Calor',
            'sol.tipo.end': 'Ensayos No Destructivos (END)', 'sol.tipo.outro': 'Otro',
            'sol.urgencia': 'Urgencia', 'sol.urg.prog': 'Programada', 'sol.urg.urg': 'Urgente', 'sol.urg.emer': 'Emergencia',
            'sol.descricao': 'Descripción del Servicio *', 'sol.descricao.ph': 'Describa el servicio requerido, equipo, ubicación en planta, dimensiones, etc.',
            'sol.obs': 'Observaciones Adicionales', 'sol.obs.ph': 'Condiciones de acceso, restricciones horarias, EPP especiales...',
            'sol.anexos.hint': 'Tome fotos del equipo o adjunte planos técnicos (PDF, imágenes).',
            'sol.btn.foto': 'Tomar Foto', 'sol.btn.arquivo': 'Adjuntar Archivo',
            'sol.btn.salvar': 'Guardar Borrador', 'sol.btn.wa': 'Enviar por WhatsApp', 'sol.btn.email': 'Enviar por Email',
            'sol.rascunhos': 'Borradores Guardados',
            'sol.nav.servicos': 'Servicios', 'sol.nav.solicitar': 'Solicitar Cotización',
            'sol.footer': 'Desde 2002 — Excelencia en Mantenimiento Industrial',
            'contact.cta': 'Iniciar Conversación',
            // Footer
            'footer.rights': '© 2002 Versátil Services. Todos los derechos reservados.',
            'footer.loc': 'Sorocaba/SP — Brasil',
            'toast.added': (name) => `${name} agregado!`, 'toast.qty.zero': 'Ingrese cantidad > 0.',
            'toast.price.invalid': 'Ingrese precio válido.', 'toast.price.missing': 'Error: precio no encontrado.',
            'toast.cart.empty': '¡Agregue ítems primero!', 'toast.fields.required': 'Complete todos los campos.',
            'toast.usdt.copied': '¡Dirección copiada!', 'currency.notice': 'Precios en USD', 'unit': '/ un',
            'btn.adicionar': 'Agregar', 'btn.adicionado': '¡Agregado!', 'btn.finalizar': 'Finalizar por WhatsApp',
            'cart.title': 'Mi Pedido', 'cart.empty': 'Pedido vacío', 'cart.empty.sub': 'Agregue ítems', 'cart.total': 'TOTAL',
            'cc.title': 'Pago con Tarjeta', 'cc.total.label': 'Total', 'cc.surcharge': '+5% recargo.',
            'cc.section.personal': 'Datos Personales', 'cc.name': 'Nombre', 'cc.name.placeholder': 'Nombre en la tarjeta',
            'cc.cpf': 'ID Fiscal', 'cc.email': 'E-mail', 'cc.phone': 'Teléfono', 'cc.cep': 'Código Postal',
            'cc.address': 'Número', 'cc.section.card': 'Datos de Tarjeta', 'cc.number': 'Número de tarjeta',
            'cc.month': 'Mes', 'cc.year': 'Año', 'cc.cvv': 'CVV', 'cc.submit': 'Pagar',
            'cc.processing': 'Procesando...', 'cc.processing.sub': 'Espere.', 'cc.close': 'Cerrar',
            'cc.approved': '¡Aprobado!', 'cc.pending': 'Procesando', 'cc.declined': 'Rechazado',
            'ck.title': 'Checkout', 'ck.step1': 'Datos', 'ck.step2': 'Envío', 'ck.step3': 'Pago', 'ck.step4': 'Resumen',
            'ck.pf': 'Persona Física', 'ck.pj': 'Empresa', 'ck.dados.pf': 'Datos Personales', 'ck.dados.pj': 'Datos Empresa',
            'ck.nome': 'Nombre *', 'ck.cpf': 'ID *', 'ck.email': 'E-mail *', 'ck.phone': 'Teléfono *',
            'ck.razao': 'Razón Social *', 'ck.fantasia': 'Nombre Comercial', 'ck.cnpj': 'CNPJ *', 'ck.ie': 'IE', 'ck.responsavel': 'Responsable *',
            'ck.endereco.cad': 'Dirección', 'ck.cep': 'CP *', 'ck.rua': 'Calle *', 'ck.numero': 'Número *',
            'ck.complemento': 'Complemento', 'ck.bairro': 'Barrio *', 'ck.cidade': 'Ciudad *', 'ck.estado': 'Estado *',
            'ck.entrega.title': 'Dirección de Envío', 'ck.entrega.same': 'Misma dirección', 'ck.entrega.diff': 'Otra dirección', 'ck.referencia': 'Referencia',
            'ck.pag.title': 'Pago', 'ck.pix': 'PIX', 'ck.pix.desc': 'Instantáneo', 'ck.transf': 'Transferencia', 'ck.transf.desc': 'Datos bancarios',
            'ck.usdt': 'USDT', 'ck.usdt.desc': 'Cripto', 'ck.cartao': 'Tarjeta', 'ck.cartao.taxa': '+5%',
            'ck.confirm': 'Confirmar →', 'ck.back': '← Volver', 'ck.next': 'Siguiente →', 'ck.send': 'Enviar por WhatsApp',
            'ck.resumo.produtos': 'Ítems', 'ck.resumo.comprador': 'Comprador', 'ck.resumo.entrega': 'Envío',
            'ck.resumo.pagamento': 'Pago', 'ck.resumo.fiscal': 'Fiscal', 'ck.pedido': 'PEDIDO',
            'ck.required': 'Complete todos los campos.', 'ck.required.entrega': 'Complete dirección de envío.',
            'pay.tag': 'Métodos de Pago', 'pay.title': 'Pago', 'pay.desc': 'Métodos de pago disponibles.',
            'pay.pix.desc': 'PIX instantáneo', 'pay.pix.key': 'Clave PIX', 'pay.pix.holder': 'Edson de Oliveira Silva', 'pay.pix.instrucao': 'Envíe comprobante por WhatsApp',
            'pay.bank.title': 'Datos Bancarios', 'pay.bank.desc': 'Transferencia bancaria', 'pay.bank.banco': 'Banco', 'pay.bank.agencia': 'Agencia', 'pay.bank.conta': 'Cuenta', 'pay.bank.titular': 'Titular',
            'pay.usdt.badge': '-5%', 'pay.usdt.desc': 'Aceptamos USDT (TRC20).', 'pay.usdt.copiar': 'Copiar',
            'pay.cc.badge': '+5%', 'pay.cc.title': 'Tarjeta', 'pay.cc.desc': 'Tarjeta de crédito.', 'pay.cc.notice': '+5% tarjeta.', 'pay.cc.btn': 'Pagar con Tarjeta',
            'abr.pontas': 'Servicios', 'abr.pastas': 'Proyectos', 'abr.dagua': 'Mantenimiento', 'abr.inox': 'Inspección', 'abr.oxido': 'Mecanizado', 'abr.carbeto': 'Ensayos'
        },
        ar: {
            // Navbar
            'nav.servicos': 'الخدمات', 'nav.equipamentos': 'المعدات', 'nav.portfolio': 'المشاريع',
            'nav.global': 'الحضور العالمي', 'nav.contato': 'اتصل بنا', 'nav.area': 'منطقتي',
            'nav.solicitar': 'طلب خدمة',
            // Hero
            'hero.badge': 'خدمات B2B المؤسسية',
            'hero.sub': 'التميز في الصيانة الصناعية والتشغيل الميداني للعمليات عالية التعقيد.',
            'hero.cta': 'طلب تقييم تقني',
            // História
            'historia.eyebrow': '\u062a\u0623\u0633\u0633\u062a \u0639\u0627\u0645 2002',
            'historia.title': 'Global Engineering Group',
            'historia.p1': '\u062a\u0623\u0633\u0633\u062a VERSATIL SERVICES \u0639\u0627\u0645 2002 \u0628\u0645\u0647\u0645\u0629 \u062a\u0642\u062f\u064a\u0645 \u062d\u0644\u0648\u0644 \u0647\u0646\u062f\u0633\u064a\u0629 \u0635\u0646\u0627\u0639\u064a\u0629 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u0623\u062f\u0627\u0621 \u0644\u0644\u0639\u0645\u0644\u064a\u0627\u062a \u0627\u0644\u062d\u0631\u062c\u0629 \u0639\u0628\u0631 \u0642\u0637\u0627\u0639\u0627\u062a \u0635\u0646\u0627\u0639\u064a\u0629 \u0645\u062a\u0639\u062f\u062f\u0629.',
            'historia.p2': '\u0639\u0644\u0649 \u0645\u0631 \u0627\u0644\u0633\u0646\u064a\u0646\u060c \u062a\u0637\u0648\u0631\u062a \u0627\u0644\u0634\u0631\u0643\u0629 \u0644\u062a\u0635\u0628\u062d \u0645\u062c\u0645\u0648\u0639\u0629 \u062f\u0648\u0644\u064a\u0629 \u0644\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0635\u0646\u0627\u0639\u064a\u0629\u060c \u0645\u0639\u062a\u0631\u0641\u0627\u064b \u0628\u0647\u0627 \u0644\u0627\u0639\u062a\u0645\u0627\u062f\u064a\u0629 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0648\u0627\u0644\u062f\u0642\u0629 \u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0648\u0627\u0644\u0642\u062f\u0631\u0629 \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629.',
            'historia.p3': '\u062a\u062c\u0645\u0639 \u062e\u0628\u0631\u062a\u0646\u0627 \u0628\u064a\u0646 \u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0627\u0644\u0635\u0646\u0627\u0639\u064a\u0629 \u0627\u0644\u062b\u0642\u064a\u0644\u0629 \u0648\u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0645\u064a\u062f\u0627\u0646\u064a \u0648\u0627\u0644\u062a\u0635\u0646\u064a\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u062d\u0644\u0648\u0644 \u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u0644\u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u064a\u0627\u062a \u0627\u0644\u062d\u0631\u062c\u0629 \u0628\u0623\u0642\u0635\u0649 \u0643\u0641\u0627\u0621\u0629 \u0648\u0623\u0645\u0627\u0646.',
            'historia.p4': '\u0627\u0644\u064a\u0648\u0645\u060c \u062a\u0639\u0645\u0644 VERSATIL SERVICES \u0628\u0631\u0624\u064a\u0629 \u0639\u0627\u0644\u0645\u064a\u0629\u060c \u0645\u0633\u062a\u0639\u062f\u0629 \u0644\u062e\u062f\u0645\u0629 \u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0641\u064a \u0627\u0644\u0628\u0631\u0627\u0632\u064a\u0644 \u0648\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0648\u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0648\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0627\u0644\u062a\u064a \u062a\u062a\u0637\u0644\u0628 \u0645\u0639\u0627\u064a\u064a\u0631 \u062a\u0642\u0646\u064a\u0629 \u0639\u0627\u0644\u064a\u0629 \u0648\u062a\u0645\u064a\u0632\u0627\u064b \u062a\u0634\u063a\u064a\u0644\u064a\u0627\u064b.',
            'historia.p5': '\u0645\u062f\u0641\u0648\u0639\u064a\u0646 \u0628\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u062f\u0642\u0629 \u0648\u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a \u0637\u0648\u064a\u0644\u0629 \u0627\u0644\u0623\u0645\u062f\u060c \u0646\u0633\u062a\u062b\u0645\u0631 \u0628\u0627\u0633\u062a\u0645\u0631\u0627\u0631 \u0641\u064a \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0635\u0646\u0627\u0639\u064a \u0644\u062a\u0642\u062f\u064a\u0645 \u062d\u0644\u0648\u0644 \u0645\u0648\u062b\u0648\u0642\u0629 \u0644\u0644\u062a\u062d\u062f\u064a\u0627\u062a \u0627\u0644\u0635\u0646\u0627\u0639\u064a\u0629 \u0627\u0644\u0645\u0639\u0642\u062f\u0629.',
            'historia.valores': '\u0627\u0644\u062a\u062e\u0637\u064a\u0637 \u00b7 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u00b7 \u0627\u0644\u062c\u0648\u062f\u0629 \u00b7 \u0627\u0644\u0623\u062f\u0627\u0621 \u00b7 \u0627\u0644\u0645\u0648\u062b\u0648\u0642\u064a\u0629',
            'historia.tagline': '\u0647\u0630\u0647 \u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0647\u064a \u0623\u0633\u0627\u0633 \u0639\u0645\u0644\u064a\u0627\u062a\u0646\u0627.',
            // Setores
            'setores.tag': 'الأسواق المخدومة', 'setores.title': 'قطاعات العمل',
            'setores.desc': 'نخدم جميع قطاعات الصناعة البرازيلية والدولية — من المصافي إلى المصانع، من المنصات إلى المعامل.',
            // Serviços
            'services.tag': 'حلول مؤسسية', 'services.title': 'خدماتنا الأساسية',
            'services.desc': 'نقدم حلولاً متكاملة للقطاع الصناعي، نضمن من خلالها توافر أصولك وسلامتها.',
            // Realizados
            'realizados.tag': 'نتائج مثبتة', 'realizados.title': 'خدمات منجزة',
            'realizados.desc': 'معرض أعمال منفذة في الميدان والورشة. انقر للتكبير.',
            'realizados.portfolio.btn': 'عرض المحفظة الكاملة (50 صورة)',
            // Equipamentos
            'equip.tag': 'الخبرة التقنية', 'equip.title': 'المعدات التي نخدمها',
            'equip.desc': 'نعمل مع جميع أنواع المبادلات الحرارية والمعدات الصناعية، مع استجابة 24 ساعة — بري وبحري.',
            // Números
            'numeros.tag': 'النتائج', 'numeros.title': 'أرقامنا',
            'numeros.desc': 'أكثر من عقدين من التميز في الصيانة الصناعية.',
            'numeros.anos': 'سنوات في السوق', 'numeros.projetos': 'مشاريع منجزة',
            // القطاعات
            'setor.petroleo.name': 'النفط والغاز', 'setor.petroleo.desc': 'المصافي والمنصات والمصانع البتروكيماوية',
            'setor.quimico.name': 'الكيمياء والبتروكيماء', 'setor.quimico.desc': 'مصانع المعالجة المستمرة والمتقطعة',
            'setor.mineracao.name': 'التعدين والصلب', 'setor.mineracao.desc': 'الأفران والمجففات والأسطوانات والكسارات',
            'setor.celulose.name': 'لب الورق والورق', 'setor.celulose.desc': 'مجففات ومكابس وأسطوانات يانكي',
            'setor.energia.name': 'الطاقة والمرافق', 'setor.energia.desc': 'محطات الطاقة الحرارية والكتلة الحيوية',
            'setor.alimenticio.name': 'الغذاء والمشروبات', 'setor.alimenticio.desc': 'خطوط التعبئة والتصنيع',
            'setor.fertilizantes.name': 'الأسمدة', 'setor.fertilizantes.desc': 'الحبيبات والمجففات والمفاعلات',
            'setor.maritimo.name': 'البحري والبحر العميق', 'setor.maritimo.desc': 'السفن والمنصات والوحدات',
            'setor.agua.name': 'الصرف الصحي والمياه', 'setor.agua.desc': 'محطات معالجة المياه والمياه العادمة',
            'setor.borracha.name': 'المطاط والبلاستيك', 'setor.borracha.desc': 'الباثقات ومعدات الفلكنة',
            'setor.geracaoeletrica.name': 'توليد الكهرباء', 'setor.geracaoeletrica.desc': 'محطات كهرومائية ومحطات تحويل',
            'setor.construcao.name': 'البناء الثقيل', 'setor.construcao.desc': 'أعمال صناعية وتجميع',
            'setor.farmaceutico.name': 'الدوائية', 'setor.farmaceutico.desc': 'مختبرات ومنشآت إنتاج',
            'setor.automotivo.name': 'السيارات', 'setor.automotivo.desc': 'مصانع التجميع وقطع الغيار',
            'setor.sucroalcooleiro.name': 'السكر والإيثانول', 'setor.sucroalcooleiro.desc': 'مصانع الإيثانول والسكر',
            // ترجمات القطاعات
            'setor.petroquimica.name': 'البتروكيميائيات', 'setor.petroquimica.desc': 'المصافي والمصانع الكيميائية',
            'setor.refinarias.name': 'مصافي النفط', 'setor.refinarias.desc': 'التقطير والتكسير والتكرير',
            'setor.quimica.name': 'الكيميائية والبتروكيميائية', 'setor.quimica.desc': 'مصانع المعالجة المستمرة',
            'setor.siderurgia.name': 'الصلب والمعادن', 'setor.siderurgia.desc': 'الأفران الكهربائية والمطاحن',
            'setor.papel.name': 'اللب والورق', 'setor.papel.desc': 'مجففات ومكابس وأسطوانات يانكي',
            'setor.naval.name': 'البحري والبحر العميق', 'setor.naval.desc': 'السفن والمنصات والوحدات',
            'setor.saneamento.name': 'المياه والصرف الصحي', 'setor.saneamento.desc': 'محطات معالجة المياه والضخ',
            'setor.cimento.name': 'الإسمنت والبناء', 'setor.cimento.desc': 'الأفران الدوارة والمطاحن الصناعية',
            'setor.ferroviario.name': 'السكك الحديدية واللوجستية', 'setor.ferroviario.desc': 'قاطرات وعربات وبنية تحتية',
            // جهة الاتصال
            'contact.comercial': 'التجارية',
            'wa.label': 'طلب تقييم تقني',

            // بطاقات الخدمات
            'srv.rotativos.title': 'صيانة المعدات الدوارة',
            'srv.rotativos.desc': 'فحص تقني ومحاذاة ليزرية وتشغيل ميداني واستعادة هيكلية للمجففات والأفران والطبول والمبردات.',
            'srv.rotativos.b1': 'محاذاة ليزرية للمعدات الدوارة',
            'srv.rotativos.b2': 'تشغيل ميداني على المعدات الدوارة',
            'srv.rotativos.b3': 'استعادة هيكلية للمجففات والأفران',
            'srv.rotativos.b4': 'موازنة ديناميكية',
            'srv.rotativos.b5': 'جلخ المسار والأسطوانة',
            'srv.rotativos.b6': 'تغيير الإطارات والبكرات',
            'srv.industrial.title': 'الصيانة الصناعية',
            'srv.industrial.desc': 'تخطيط وتنفيذ وإدارة توقفات الصيانة. تجديد المعدات الثابتة والأنابيب الصناعية.',
            'srv.industrial.b1': 'دعم الإشراف وإدارة العقود',
            'srv.industrial.b2': 'إدارة وإشراف توقفات الصيانة',
            'srv.industrial.b3': 'أعمال الغلاية في الأبراج والأوعية والمبادلات',
            'srv.industrial.b4': 'فحص سلامة المعدات والأنابيب',
            'srv.industrial.b5': 'صيانة الخزانات والكرات',
            'srv.industrial.b6': 'صيانة الأفران والغلايات',
            'srv.industrial.b7': 'صيانة الصمامات',
            'srv.industrial.b8': 'امتثال NR13',
            'srv.usinagem.title': 'تشغيل ميداني',
            'srv.usinagem.desc': 'تشغيل في الموقع بتفاوتات ميكرومترية. تسوية الوجه والتثقيب الخطي والتخطيط وتخريط المحاور دون تفكيك.',
            'srv.usinagem.b1': 'تسوية وجه الشفة — مسطح / مخدّل / RTJ',
            'srv.usinagem.b2': 'طحن القواعد المعدنية',
            'srv.usinagem.b3': 'تثقيب خطي',
            'srv.usinagem.b4': 'تسديد أطراف الأنابيب',
            'srv.usinagem.b5': 'جلخ مسار المجفف / الحبيبات',
            'srv.usinagem.b6': 'تشغيل / جلخ دبوس الكرنكشافت',
            'srv.usinagem.b7': 'تشغيل طرف المحور',
            'srv.trocadores.title': 'مبادلات الحرارة',
            'srv.trocadores.desc': 'تصنيع وإعادة تأنيب وتنظيف كيميائي وإزالة الترسبات بالمياه الضاغطة لمبادلات الحرارة.',
            'srv.trocadores.b1': 'صيانة مبادلات الحرارة',
            'srv.trocadores.b2': 'إعادة التأنيب والتثقيب الخطي',
            'srv.trocadores.b3': 'التنظيف الكيميائي وإزالة الترسبات',
            'srv.trocadores.b4': 'تصنيع حزم الأنابيب',
            'srv.trocadores.b5': 'اختبار ضغط الماء',
            'srv.trocadores.b6': 'تغيير الحشوات والمرايا',
            'srv.ensaios.title': 'الفحص والاختبارات غير التدميرية',
            'srv.ensaios.desc': 'اختبارات END لضمان سلامة المعدات والأنابيب والهياكل.',
            'srv.ensaios.b1': 'اختبار السائل النافذ',
            'srv.ensaios.b2': 'اختبار الجسيمات المغناطيسية',
            'srv.ensaios.b3': 'الموجات فوق الصوتية / قياس السمك',
            'srv.ensaios.b4': 'التصوير بالأشعة الصناعية',
            'srv.ensaios.b5': 'الفحص البصري',
            'srv.ensaios.b6': 'تحديد السبائك المعدنية (PMI)',
            'srv.ensaios.b7': 'فحص الطلاء',
            'srv.ensaios.b8': 'فحص التصنيع',
            'srv.ensaios.b9': 'تسلق صناعي',
            'srv.ensaios.b10': 'ضبط الجودة',
            // المعدات
            'equip.casco.name': 'غلاف وأنابيب', 'equip.casco.desc': 'Shell & Tube — صيانة وإعادة تأنيب وتصنيع',
            'equip.aircooler.name': 'Air Cooler', 'equip.aircooler.desc': 'مبردات هوائية — تنظيف وصيانة وقائية',
            'equip.condensadores.name': 'المكثفات', 'equip.condensadores.desc': 'مكثفات البخار — إعادة تأنيب واختبار الهيليوم',
            'equip.placas.name': 'مبادل الصفائح', 'equip.placas.desc': 'تنظيف وتغيير الحشوات والتغطيات',
            'equip.rotativos.name': 'معدات دوارة صناعية', 'equip.rotativos.desc': 'مجففات وأفران وطبول — جلخ ومحاذاة',
            // معرض الأعمال
            'gal.badge.usinagem': 'تشغيل ميداني', 'gal.badge.rotativos': 'معدات دوارة', 'gal.badge.trocadores': 'مبادلات حرارية',
            'gal.badge.manutencao': 'صيانة', 'gal.badge.ensaios': 'فحص غير تدميري', 'gal.badge.usinagem2': 'تشغيل',
            'gal.title.flange': 'تسوية وجه الشفة', 'gal.title.pista': 'جلخ المسار',
            'gal.title.retubagem': 'إعادة تأنيب كاملة', 'gal.title.caldeiraria': 'أعمال غلاية صناعية',
            'gal.title.radiografia': 'فحص بالأشعة', 'gal.title.mandrilhamento': 'تثقيب خطي',
            'gal.title.secador': 'فحص المجفف', 'gal.title.serpentina': 'ملف حلزوني صناعي',
            // الحضور العالمي
            'global.brasil.name': '🇧🇷 البرازيل', 'global.brasil.addr': 'R. Miguel Banhos Gomes, 115<br>Iporanga — Sorocaba/SP<br>Santos - SP<br>CEP 18087-158',
            'global.espanha.name': '🇪🇸 إسبانيا', 'global.espanha.addr': 'Calle Massens 16-18, طابق 2, باب 3<br>Barcelona 08024<br>برشلونة — إسبانيا',
            'global.dubai.name': '🇦🇪 دبي', 'global.dubai.addr': 'الإمارات العربية المتحدة<br>منطقة DMCC الحرة<br>دبي',
            'numeros.clientes': 'عملاء مخدومون', 'numeros.continentes': 'قارات',
            // Global
            'global.tag': 'الامتداد الدولي', 'global.title': 'الحضور العالمي',
            'global.desc': 'مع عمليات استراتيجية في 3 قارات، نضمن التعبئة السريعة والمعايرة التقنية للمشاريع المعقدة حول العالم.',
            // Contato
            'contact.tag': 'الهندسة والأعمال', 'contact.title': 'تحدث مع فريقنا التقني',
            'contact.desc': 'نحن مستعدون لتحليل مشروعك وتقديم عروض أسعار مفصلة والتخطيط لتوقف مصنعك القادم.',
            'contact.wa': 'واتساب البرازيل', 'contact.email.label': 'القسم التقني',
            'contact.loc.label': 'الموقع', 'contact.loc.value': 'Sorocaba/SP — البرازيل',
            // طلب عروض أسعار
            'sol.title': 'طلب عرض سعر', 'sol.subtitle': 'أدخل بياناتك أدناه وسيرد فريقنا التقني في غضون 4 ساعات.',
            'sol.sec.cliente': 'بيانات العميل', 'sol.sec.servico': 'تفاصيل الخدمة', 'sol.sec.anexos': 'الصور والملفات',
            'sol.empresa': 'الشركة *', 'sol.empresa.ph': 'مثال: Aramco, ADNOC, Saudi Aramco...',
            'sol.responsavel': 'المسؤول *', 'sol.responsavel.ph': 'الاسم الكامل',
            'sol.whatsapp': 'WhatsApp *', 'sol.email': 'البريد الإلكتروني',
            'sol.tipo': 'نوع الخدمة *', 'sol.selecione': 'اختر...',
            'sol.tipo.rotativos': 'المعدات الدوارة', 'sol.tipo.manutencao': 'الصيانة الصناعية',
            'sol.tipo.usinagem': 'تشغيل ميداني', 'sol.tipo.trocadores': 'مبادلات الحرارة',
            'sol.tipo.end': 'الفحص غير التدميري (NDT)', 'sol.tipo.outro': 'أخرى',
            'sol.urgencia': 'الأولوية', 'sol.urg.prog': 'مجدولة', 'sol.urg.urg': 'عاجل', 'sol.urg.emer': 'طوارئ',
            'sol.descricao': 'وصف الخدمة *', 'sol.descricao.ph': 'صف الخدمة المطلوبة والمعدات والموقع والأبعاد...',
            'sol.obs': 'ملاحظات إضافية', 'sol.obs.ph': 'ظروف الوصول وقيود الوقت ومتطلبات معدات الحماية...',
            'sol.anexos.hint': 'التقط صوراً للمعدات أو أرفق رسومات تقنية (PDF, صور).',
            'sol.btn.foto': 'التقاط صورة', 'sol.btn.arquivo': 'إرفاق ملف',
            'sol.btn.salvar': 'حفظ كمسودة', 'sol.btn.wa': 'إرسال عبر WhatsApp', 'sol.btn.email': 'إرسال بالبريد',
            'sol.rascunhos': 'المسودات المحفوظة',
            'sol.nav.servicos': 'الخدمات', 'sol.nav.solicitar': 'طلب عرض سعر',
            'sol.footer': 'منذ 2002 — تميز في الصيانة الصناعية',
            'contact.cta': 'ابدأ محادثة',
            // Footer
            'footer.rights': '© 2002 Versátil Services. جميع الحقوق محفوظة.',
            'footer.loc': 'Sorocaba/SP — البرازيل',
            'toast.added': (name) => `تمت إضافة ${name}!`, 'toast.qty.zero': 'أدخل كمية > 0.',
            'toast.price.invalid': 'أدخل سعراً صحيحاً.', 'toast.price.missing': 'خطأ: السعر غير موجود.',
            'toast.cart.empty': 'أضف عناصر أولاً!', 'toast.fields.required': 'أكمل جميع الحقول.',
            'toast.usdt.copied': 'تم نسخ العنوان!', 'currency.notice': 'الأسعار بالدرهم الإماراتي', 'unit': '/ وحدة',
            'btn.adicionar': 'إضافة', 'btn.adicionado': 'تمت الإضافة!', 'btn.finalizar': 'إتمام عبر WhatsApp',
            'cart.title': 'طلبي', 'cart.empty': 'الطلب فارغ', 'cart.empty.sub': 'أضف عناصر', 'cart.total': 'المجموع',
            'cc.title': 'دفع بالبطاقة', 'cc.total.label': 'الإجمالي', 'cc.surcharge': '+5% رسوم.',
            'cc.section.personal': 'بيانات شخصية', 'cc.name': 'الاسم', 'cc.name.placeholder': 'الاسم على البطاقة',
            'cc.cpf': 'رقم الهوية', 'cc.email': 'البريد الإلكتروني', 'cc.phone': 'الهاتف', 'cc.cep': 'الرمز البريدي',
            'cc.address': 'الرقم', 'cc.section.card': 'بيانات البطاقة', 'cc.number': 'رقم البطاقة',
            'cc.month': 'الشهر', 'cc.year': 'السنة', 'cc.cvv': 'CVV', 'cc.submit': 'ادفع',
            'cc.processing': 'جاري المعالجة...', 'cc.processing.sub': 'يرجى الانتظار.', 'cc.close': 'إغلاق',
            'cc.approved': 'موافق عليه!', 'cc.pending': 'قيد المعالجة', 'cc.declined': 'مرفوض',
            'ck.title': 'إتمام', 'ck.step1': 'البيانات', 'ck.step2': 'التوصيل', 'ck.step3': 'الدفع', 'ck.step4': 'ملخص',
            'ck.pf': 'فرد', 'ck.pj': 'شركة', 'ck.dados.pf': 'بيانات شخصية', 'ck.dados.pj': 'بيانات الشركة',
            'ck.nome': 'الاسم *', 'ck.cpf': 'رقم الهوية *', 'ck.email': 'البريد *', 'ck.phone': 'الهاتف *',
            'ck.razao': 'اسم الشركة *', 'ck.fantasia': 'الاسم التجاري', 'ck.cnpj': 'السجل التجاري *', 'ck.ie': 'رقم الضريبة', 'ck.responsavel': 'المسؤول *',
            'ck.endereco.cad': 'العنوان', 'ck.cep': 'الرمز البريدي *', 'ck.rua': 'الشارع *', 'ck.numero': 'الرقم *',
            'ck.complemento': 'تكملة', 'ck.bairro': 'الحي *', 'ck.cidade': 'المدينة *', 'ck.estado': 'الولاية *',
            'ck.entrega.title': 'عنوان التوصيل', 'ck.entrega.same': 'نفس العنوان', 'ck.entrega.diff': 'عنوان آخر', 'ck.referencia': 'مرجع',
            'ck.pag.title': 'الدفع', 'ck.pix': 'PIX', 'ck.pix.desc': 'فوري', 'ck.transf': 'تحويل بنكي', 'ck.transf.desc': 'بيانات بنكية',
            'ck.usdt': 'USDT', 'ck.usdt.desc': 'كريبتو', 'ck.cartao': 'بطاقة', 'ck.cartao.taxa': '+5%',
            'ck.confirm': 'تأكيد →', 'ck.back': '← رجوع', 'ck.next': 'التالي →', 'ck.send': 'إرسال عبر WhatsApp',
            'ck.resumo.produtos': 'العناصر', 'ck.resumo.comprador': 'المشتري', 'ck.resumo.entrega': 'التوصيل',
            'ck.resumo.pagamento': 'الدفع', 'ck.resumo.fiscal': 'ضريبي', 'ck.pedido': 'طلب',
            'ck.required': 'أكمل جميع الحقول.', 'ck.required.entrega': 'أكمل عنوان التوصيل.',
            'pay.tag': 'طرق الدفع', 'pay.title': 'الدفع', 'pay.desc': 'طرق الدفع المتاحة.',
            'pay.pix.desc': 'PIX فوري', 'pay.pix.key': 'مفتاح PIX', 'pay.pix.holder': 'Edson de Oliveira Silva', 'pay.pix.instrucao': 'أرسل الإيصال عبر WhatsApp',
            'pay.bank.title': 'بيانات بنكية', 'pay.bank.desc': 'تحويل بنكي', 'pay.bank.banco': 'البنك', 'pay.bank.agencia': 'الفرع', 'pay.bank.conta': 'الحساب', 'pay.bank.titular': 'صاحب الحساب',
            'pay.usdt.badge': '-5%', 'pay.usdt.desc': 'نقبل USDT (TRC20).', 'pay.usdt.copiar': 'نسخ',
            'pay.cc.badge': '+5%', 'pay.cc.title': 'بطاقة', 'pay.cc.desc': 'بطاقة ائتمان.', 'pay.cc.notice': '+5% رسوم.', 'pay.cc.btn': 'ادفع بالبطاقة',
            'abr.pontas': 'خدمات', 'abr.pastas': 'مشاريع', 'abr.dagua': 'صيانة', 'abr.inox': 'فحص', 'abr.oxido': 'تشغيل', 'abr.carbeto': 'اختبارات'
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
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
        const fallback = TRANSLATIONS.pt;

        // Translate text content — use textContent for clean rendering
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = dict[key] || fallback[key];
            if (text) {
                // Preserve any child SVG icons
                const svg = el.querySelector('svg');
                if (svg) {
                    el.textContent = '';
                    el.appendChild(svg);
                    el.appendChild(document.createTextNode(' ' + text));
                } else {
                    el.textContent = text;
                }
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = dict[key] || fallback[key];
            if (text) el.setAttribute('placeholder', text);
        });

        // Translate page title
        const titleEl = document.querySelector('[data-i18n-title]');
        if (titleEl) {
            const key = titleEl.getAttribute('data-i18n-title');
            const text = dict[key] || fallback[key];
            if (text) document.title = text;
        }

        // Update html lang attribute
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : lang === 'ar' ? 'ar' : 'en';
    }



    // =============================================
    // 7. TRADUZIR NOMES E DESCRIÇÕES DOS PRODUTOS
    // =============================================

    // Group title translations
    const GROUP_TITLES = {
        'Rebolos Diamantados — Export Grade': { en: 'Diamond Grinding Wheels — Export Grade', es: 'Muelas Diamantadas — Export Grade' },
        'Rebolos CBN — Export Grade': { en: 'CBN Grinding Wheels — Export Grade', es: 'Muelas CBN — Export Grade' },
        'Cintas Abrasivas Industriais — Export Grade': { en: 'Industrial Abrasive Belts — Export Grade', es: 'Cintas Abrasivas Industriales — Export Grade' },
        'Discos Diamantados & Flap — Export Grade': { en: 'Diamond & Flap Discs — Export Grade', es: 'Discos Diamantados & Flap — Export Grade' },
        'Dressadores Diamantados — Export Grade': { en: 'Diamond Dressers — Export Grade', es: 'Rectificadores Diamantados — Export Grade' },
        'Pastas Diamantadas — Export Grade': { en: 'Diamond Pastes — Export Grade', es: 'Pastas Diamantadas — Export Grade' },
        'Discos Industriais': { en: 'Industrial Discs', es: 'Discos Industriales' },
        'Discos Diamantados': { en: 'Diamond Discs', es: 'Discos Diamantados' },
        'Discos de Corte e Desbaste': { en: 'Cut-Off & Grinding Discs', es: 'Discos de Corte y Desbaste' },
        'Discos Flap': { en: 'Flap Discs', es: 'Discos Flap' },
        'Rebolos': { en: 'Grinding Wheels', es: 'Muelas' },
        'Lixas': { en: 'Sanding Sheets', es: 'Lijas' },
        'Lixas & Cintas Abrasivas': { en: 'Sanding Sheets & Abrasive Belts', es: 'Lijas y Cintas Abrasivas' },
        'Escovas Industriais': { en: 'Industrial Brushes', es: 'Cepillos Industriales' },
        'Ferramentas Rotativas': { en: 'Rotary Tools', es: 'Herramientas Rotativas' },
        'Discos Abrasivos': { en: 'Abrasive Discs', es: 'Discos Abrasivos' },
        'Abrasivos Especiais': { en: 'Special Abrasives', es: 'Abrasivos Especiales' }
    };

    // Badge translations
    const BADGE_TRANSLATIONS = {
        'EXPORTAÇÃO': { en: 'EXPORT', es: 'EXPORTACIÓN' },
        'HIGH PERFORMANCE': { en: 'HIGH PERFORMANCE', es: 'ALTO RENDIMIENTO' },
        'PREMIUM': { en: 'PREMIUM', es: 'PREMIUM' },
        'PRINCIPAL': { en: 'PRIMARY', es: 'PRINCIPAL' }
    };

    function translateProducts(lang) {
        // Translate product cards
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

            // Translate badges
            const badge = card.querySelector('.product-badge-premium');
            if (badge) {
                if (!badge.hasAttribute('data-badge-pt')) {
                    badge.setAttribute('data-badge-pt', badge.textContent.trim());
                }
                const ptBadge = badge.getAttribute('data-badge-pt');
                if (lang === 'pt') {
                    badge.textContent = ptBadge;
                } else if (BADGE_TRANSLATIONS[ptBadge] && BADGE_TRANSLATIONS[ptBadge][lang]) {
                    badge.textContent = BADGE_TRANSLATIONS[ptBadge][lang];
                }
            }
        });

        // Translate group titles
        document.querySelectorAll('.group-title').forEach(gt => {
            if (!gt.hasAttribute('data-title-pt')) {
                // Extract text only (ignore child SVG)
                const textNodes = [];
                gt.childNodes.forEach(n => { if (n.nodeType === 3) textNodes.push(n.textContent.trim()); });
                gt.setAttribute('data-title-pt', textNodes.join(' ').trim());
            }
            const ptTitle = gt.getAttribute('data-title-pt');
            const icon = gt.querySelector('.group-icon');
            if (lang === 'pt') {
                gt.textContent = '';
                if (icon) gt.appendChild(icon);
                gt.appendChild(document.createTextNode('\n                    ' + ptTitle + '\n                '));
            } else if (GROUP_TITLES[ptTitle] && GROUP_TITLES[ptTitle][lang]) {
                gt.textContent = '';
                if (icon) gt.appendChild(icon);
                gt.appendChild(document.createTextNode('\n                    ' + GROUP_TITLES[ptTitle][lang] + '\n                '));
            }
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

        // Cart item prices — read BRL from data-brl attribute (reliable, no text parsing)
        document.querySelectorAll('.cart-item-price[data-brl]').forEach(el => {
            const brlVal = parseFloat(el.getAttribute('data-brl'));
            if (!isNaN(brlVal) && brlVal > 0) {
                el.textContent = formatPrice(brlVal, currentLang) + ' ' + t('unit', currentLang);
            }
        });

        document.querySelectorAll('.cart-item-subtotal[data-brl]').forEach(el => {
            const brlVal = parseFloat(el.getAttribute('data-brl'));
            if (!isNaN(brlVal) && brlVal > 0) {
                el.textContent = formatPrice(brlVal, currentLang);
            }
        });

        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            const brlVal = parseFloat(totalEl.getAttribute('data-brl'));
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

        const prevLang = currentLang;
        const wasRTL = prevLang === 'ar';
        const isRTL = lang === 'ar';

        // 1. Update state
        currentLang = lang;
        localStorage.setItem('vgi_lang', lang);

        // 2. FULL RTL/LTR RESET — critical for AR→LTR transition
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : lang === 'ar' ? 'ar' : 'en');

        // Toggle body class for CSS RTL rules
        document.body.classList.toggle('rtl-active', isRTL);
        document.body.classList.toggle('ltr-active', !isRTL);

        // 3. Font management
        if (isRTL && !document.getElementById('font-cairo')) {
            const link = document.createElement('link');
            link.id = 'font-cairo';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap';
            document.head.appendChild(link);
        }

        // 4. Force clean re-render of all translations
        //    Using textContent for safety (no HTML injection)
        applyTranslations(lang);
        translateProducts(lang);
        updateDisplayPrices(lang);
        reformatCartForLang();
        translateCheckout(lang);
        translateCartDrawer(lang);
        translateCCModal(lang);

        // 5. Update language switcher UI buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // 6. Update lang-switcher-flags button highlights
        const flagWrap = document.getElementById('lang-switcher-flags');
        if (flagWrap) {
            flagWrap.querySelectorAll('button').forEach(b => {
                const isActive = b.getAttribute('data-lang') === lang;
                b.style.background = isActive ? 'rgba(191,32,38,0.09)' : 'transparent';
                b.style.outline = isActive ? '2px solid #bf2026' : 'none';
                const lbl = b.querySelector('span');
                if (lbl) lbl.style.color = isActive ? '#bf2026' : '#888';
            });
        }

        console.log(`[i18n] ${prevLang} → ${lang} | RTL: ${isRTL} | Reset: ${wasRTL && !isRTL ? 'FULL LTR RESET' : 'normal'}`);
    }


    // =============================================
    // 12. CRIAR UI DO SELETOR
    // =============================================
    function createLanguageSwitcher() {
        // Clean up any previous versions
        ['lang-topbar','lang-dropdown-wrap','lang-switcher-flags'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // Uses real flag images (Windows doesn't render emoji flags)
        const langs = [
            { code: 'pt', img: 'https://flagcdn.com/w40/br.png', label: 'PT' },
            { code: 'es', img: 'https://flagcdn.com/w40/es.png', label: 'ES' },
            { code: 'en', img: 'https://flagcdn.com/w40/us.png', label: 'EN' },
            { code: 'ar', img: 'https://flagcdn.com/w40/ae.png', label: 'AR' }
        ];

        const wrap = document.createElement('div');
        wrap.id = 'lang-switcher-flags';
        wrap.setAttribute('dir', 'ltr'); // Always LTR — flags never flip with RTL
        wrap.style.cssText = `
            display: flex; align-items: center; gap: 2px;
            background: #fff; border: 1px solid #e0e0e0;
            border-radius: 8px; padding: 3px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.08);
            flex-shrink: 0;
            direction: ltr;
        `;

        function refreshButtons(activeCode) {
            wrap.querySelectorAll('button').forEach(b => {
                const isNow = b.getAttribute('data-lang') === activeCode;
                b.style.background = isNow ? 'rgba(191,32,38,0.09)' : 'transparent';
                b.style.outline = isNow ? '2px solid #bf2026' : 'none';
                const lbl = b.querySelector('span');
                if (lbl) lbl.style.color = isNow ? '#bf2026' : '#888';
            });
        }

        langs.forEach(({ code, img, label }) => {
            const btn = document.createElement('button');
            btn.setAttribute('data-lang', code);
            btn.title = label;
            const isActive = currentLang === code;
            btn.style.cssText = `
                display: flex; flex-direction: column; align-items: center; gap: 2px;
                background: ${isActive ? 'rgba(191,32,38,0.09)' : 'transparent'};
                border: none; border-radius: 5px; padding: 4px 6px;
                cursor: pointer; transition: background 0.15s;
                outline: ${isActive ? '2px solid #bf2026' : 'none'};
                outline-offset: -2px;
            `;
            btn.innerHTML = `
                <img src="${img}" alt="${label}" width="22" height="15"
                     style="border-radius:2px;object-fit:cover;display:block;box-shadow:0 1px 3px rgba(0,0,0,0.15)">
                <span style="font-size:0.58rem;font-weight:800;letter-spacing:0.5px;
                             color:${isActive ? '#bf2026' : '#888'};line-height:1">${label}</span>
            `;
            btn.addEventListener('mouseenter', () => {
                if (currentLang !== code) btn.style.background = 'rgba(0,0,0,0.05)';
            });
            btn.addEventListener('mouseleave', () => {
                if (currentLang !== code) btn.style.background = 'transparent';
            });
            btn.addEventListener('click', () => {
                switchLanguage(code);
                localStorage.setItem('vgi_lang', code);
                refreshButtons(code);
            });
            wrap.appendChild(btn);
        });

        // Append at END of nav-actions so it stays on the right and never shifts
        const navActions = document.querySelector('.nav-actions');
        if (navActions) navActions.appendChild(wrap);
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
        // REGRA: nunca sobrescrever data-i18n já definido no HTML
        // Só atribuir se o elemento NÃO tiver data-i18n

        // Navbar — o HTML já possui data-i18n corretos em todos os links.
        // Esta função NÃO deve tocar no navbar.

        // Nav cart link (carrinho de produtos — legado)
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

        // Section headers — só aplica se não tiver data-i18n
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
                if (tag && map[tagText][0] && !tag.hasAttribute('data-i18n')) tag.setAttribute('data-i18n', map[tagText][0]);
                if (h2 && map[tagText][1] && !h2.hasAttribute('data-i18n')) h2.setAttribute('data-i18n', map[tagText][1]);
                if (desc && map[tagText][2] && !desc.hasAttribute('data-i18n')) desc.setAttribute('data-i18n', map[tagText][2]);
            }
        });

        // Diff cards — só aplica se não tiver data-i18n
        const diffCards = document.querySelectorAll('.diff-card');
        [['diff.dur','diff.dur.desc'],['diff.prec','diff.prec.desc'],['diff.ent','diff.ent.desc'],['diff.global','diff.global.desc']].forEach((keys, i) => {
            if (diffCards[i]) {
                const h3 = diffCards[i].querySelector('h3');
                const p = diffCards[i].querySelector('p');
                if (h3 && !h3.hasAttribute('data-i18n')) h3.setAttribute('data-i18n', keys[0]);
                if (p && !p.hasAttribute('data-i18n')) p.setAttribute('data-i18n', keys[1]);
            }
        });

        // Contact labels — só aplica se não tiver data-i18n
        const contactLabels = document.querySelectorAll('.contact-label');
        ['contact.wa','contact.email.label','contact.loc.label'].forEach((key, i) => {
            if (contactLabels[i] && !contactLabels[i].hasAttribute('data-i18n')) {
                contactLabels[i].setAttribute('data-i18n', key);
            }
        });

        // Footer
        const footerPs = document.querySelectorAll('footer p');
        if (footerPs[0] && !footerPs[0].hasAttribute('data-i18n')) footerPs[0].setAttribute('data-i18n', 'footer.rights');

        // Group titles (catálogo legado)
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

    // =============================================
    // 15. TRADUZIR CHECKOUT MODAL
    // =============================================
    function translateCheckout(lang) {
        lang = lang || currentLang;
        const modal = document.getElementById('checkout-modal-overlay');
        if (!modal) return;

        // Helper: set text of element by selector
        function setText(sel, key) {
            const el = modal.querySelector(sel);
            if (el) el.textContent = t(key, lang);
        }
        function setLabel(inputId, key) {
            const input = modal.querySelector('#' + inputId);
            if (input) {
                const label = input.closest('.ck-field')?.querySelector('label');
                if (label) label.textContent = t(key, lang);
            }
        }

        // Title
        const h3 = modal.querySelector('.ck-header h3');
        if (h3) {
            const svg = h3.querySelector('svg');
            h3.textContent = '';
            if (svg) h3.appendChild(svg);
            h3.appendChild(document.createTextNode(' ' + t('ck.title', lang)));
        }

        // Step indicators
        modal.querySelectorAll('.ck-step').forEach(step => {
            const num = step.dataset.step;
            const span = step.querySelector('span');
            const key = 'ck.step' + num;
            step.textContent = '';
            if (span) { step.appendChild(span); }
            else { const s = document.createElement('span'); s.textContent = num; step.appendChild(s); }
            step.appendChild(document.createTextNode(' ' + t(key, lang)));
        });

        // PF/PJ buttons
        const pfBtn = modal.querySelector('#ck-type-pf');
        const pjBtn = modal.querySelector('#ck-type-pj');
        if (pfBtn) { const svg = pfBtn.querySelector('svg'); pfBtn.textContent = ''; if (svg) pfBtn.appendChild(svg); pfBtn.appendChild(document.createTextNode(' ' + t('ck.pf', lang))); }
        if (pjBtn) { const svg = pjBtn.querySelector('svg'); pjBtn.textContent = ''; if (svg) pjBtn.appendChild(svg); pjBtn.appendChild(document.createTextNode(' ' + t('ck.pj', lang))); }

        // Section titles
        const sectionTitles = modal.querySelectorAll('.ck-section-title');
        const sectionMap = {
            'Dados Pessoais': 'ck.dados.pf', 'Personal Details': 'ck.dados.pf', 'Datos Personales': 'ck.dados.pf',
            'Dados da Empresa': 'ck.dados.pj', 'Company Details': 'ck.dados.pj', 'Datos de la Empresa': 'ck.dados.pj',
            'Endereço (Cadastro / Fiscal)': 'ck.endereco.cad', 'Address (Registration / Tax)': 'ck.endereco.cad', 'Dirección (Registro / Fiscal)': 'ck.endereco.cad',
            'Endereço de Entrega': 'ck.entrega.title', 'Shipping Address': 'ck.entrega.title', 'Dirección de Envío': 'ck.entrega.title',
            'Forma de Pagamento': 'ck.pag.title', 'Payment Method': 'ck.pag.title', 'Forma de Pago': 'ck.pag.title'
        };
        sectionTitles.forEach(st => {
            const key = sectionMap[st.textContent.trim()];
            if (key) st.textContent = t(key, lang);
        });

        // PF labels
        setLabel('ck-pf-nome', 'ck.nome'); setLabel('ck-pf-cpf', 'ck.cpf'); setLabel('ck-pf-email', 'ck.email'); setLabel('ck-pf-phone', 'ck.phone');
        setLabel('ck-pf-cep', 'ck.cep'); setLabel('ck-pf-rua', 'ck.rua'); setLabel('ck-pf-numero', 'ck.numero'); setLabel('ck-pf-complemento', 'ck.complemento');
        setLabel('ck-pf-bairro', 'ck.bairro'); setLabel('ck-pf-cidade', 'ck.cidade'); setLabel('ck-pf-estado', 'ck.estado');

        // PJ labels
        setLabel('ck-pj-razao', 'ck.razao'); setLabel('ck-pj-fantasia', 'ck.fantasia'); setLabel('ck-pj-cnpj', 'ck.cnpj'); setLabel('ck-pj-ie', 'ck.ie');
        setLabel('ck-pj-responsavel', 'ck.responsavel'); setLabel('ck-pj-email', 'ck.email'); setLabel('ck-pj-phone', 'ck.phone');
        setLabel('ck-pj-cep', 'ck.cep'); setLabel('ck-pj-rua', 'ck.rua'); setLabel('ck-pj-numero', 'ck.numero'); setLabel('ck-pj-complemento', 'ck.complemento');
        setLabel('ck-pj-bairro', 'ck.bairro'); setLabel('ck-pj-cidade', 'ck.cidade'); setLabel('ck-pj-estado', 'ck.estado');

        // Delivery labels
        setLabel('ck-ent-cep', 'ck.cep'); setLabel('ck-ent-rua', 'ck.rua'); setLabel('ck-ent-numero', 'ck.numero'); setLabel('ck-ent-complemento', 'ck.complemento');
        setLabel('ck-ent-bairro', 'ck.bairro'); setLabel('ck-ent-cidade', 'ck.cidade'); setLabel('ck-ent-estado', 'ck.estado'); setLabel('ck-ent-referencia', 'ck.referencia');

        // Delivery radio labels
        const radioLabels = modal.querySelectorAll('.ck-radio-label');
        if (radioLabels[0]) {
            const input0 = radioLabels[0].querySelector('input');
            const span0 = radioLabels[0].querySelector('.ck-radio-custom');
            radioLabels[0].textContent = '';
            if (input0) radioLabels[0].appendChild(input0);
            if (span0) radioLabels[0].appendChild(span0);
            radioLabels[0].appendChild(document.createTextNode(' ' + t('ck.entrega.same', lang)));
        }
        if (radioLabels[1]) {
            const input1 = radioLabels[1].querySelector('input');
            const span1 = radioLabels[1].querySelector('.ck-radio-custom');
            radioLabels[1].textContent = '';
            if (input1) radioLabels[1].appendChild(input1);
            if (span1) radioLabels[1].appendChild(span1);
            radioLabels[1].appendChild(document.createTextNode(' ' + t('ck.entrega.diff', lang)));
        }

        // Payment options
        const payCards = modal.querySelectorAll('.ck-pay-card');
        const payMap = [
            { strong: 'ck.pix', span: 'ck.pix.desc' },
            { strong: 'ck.transf', span: 'ck.transf.desc' },
            { strong: 'ck.usdt', span: 'ck.usdt.desc' },
            { strong: 'ck.cartao', span: 'ck.cartao.taxa' }
        ];
        payCards.forEach((card, i) => {
            if (payMap[i]) {
                const strong = card.querySelector('strong');
                const span = card.querySelector('span');
                if (strong) strong.textContent = t(payMap[i].strong, lang);
                if (span) span.textContent = t(payMap[i].span, lang);
            }
        });

        // Nav buttons
        const backBtn = modal.querySelector('#ck-btn-back');
        const nextBtn = modal.querySelector('#ck-btn-next');
        const sendBtn = modal.querySelector('#ck-btn-send');
        if (backBtn) backBtn.textContent = t('ck.back', lang);
        if (nextBtn) nextBtn.textContent = t('ck.next', lang);
        if (sendBtn) {
            const svg = sendBtn.querySelector('svg');
            sendBtn.textContent = '';
            if (svg) sendBtn.appendChild(svg);
            sendBtn.appendChild(document.createTextNode(' ' + t('ck.send', lang)));
        }

        // Summary section titles
        const sumTitles = modal.querySelectorAll('.ck-summary-title');
        const sumMap = ['ck.resumo.produtos', 'ck.resumo.comprador', 'ck.resumo.entrega', 'ck.resumo.pagamento', 'ck.resumo.fiscal'];
        sumTitles.forEach((st, i) => {
            if (sumMap[i]) st.textContent = t(sumMap[i], lang);
        });

        // Confirm button
        const confirmBtn = modal.querySelector('#ck-pay-exec-confirm');
        if (confirmBtn) confirmBtn.textContent = t('ck.confirm', lang);

        // Translate dynamic payment panel content
        translatePaymentPanel(lang);

        console.log('[i18n] Checkout translated to:', lang);
    }

    // =============================================
    // 15B. TRADUZIR PAINEL DE PAGAMENTO DINÂMICO
    // =============================================
    const PAY_PANEL_TRANSLATIONS = {
        pt: {
            'title.boleto': 'Transferência Bancária', 'title.usdt': 'Pagamento em USDT (TRC20)', 'title.cartao': 'Cartão de Crédito',
            'items.count': (n) => `${n} item(ns) no pedido`,
            'bank.title': 'Dados Bancários — Santander', 'bank.banco': 'Banco:', 'bank.agencia': 'Agência:', 'bank.conta': 'Conta Corrente:', 'bank.titular': 'Titular:',
            'bank.instrucao': 'Realize a transferência e envie o comprovante pelo WhatsApp.',
            'usdt.desconto': '-5% DESCONTO via USDT', 'usdt.cotacao': 'Cotação em tempo real:', 'usdt.wallet': 'Wallet TRC20:', 'usdt.copiar': 'Copiar endereço', 'usdt.copiado': '✓ Copiado!', 'usdt.txid': 'Envie o TXID (hash da transação) junto com o pedido pelo WhatsApp.',
            'cartao.taxa': 'Incluso +5% taxa operacional', 'cartao.seguro': 'Processamento seguro via Asaas', 'cartao.dados': 'Os dados do cartão serão solicitados na etapa de confirmação final.', 'cartao.bandeiras': 'Bandeiras aceitas:', 'cartao.processado': 'O pagamento será processado após a confirmação do pedido.',
            'confirm': 'Confirmar e Avançar →',
            'pix.aguardando': '⏳ Aguardando pagamento', 'pix.instrucao': 'Escaneie o QR Code ou cole o código no app do seu banco', 'pix.japaguei': '✓ Já paguei — Avançar para resumo'
        },
        en: {
            'title.boleto': 'Bank Transfer', 'title.usdt': 'USDT Payment (TRC20)', 'title.cartao': 'Credit Card',
            'items.count': (n) => `${n} item(s) in order`,
            'bank.title': 'Banking Details — Santander', 'bank.banco': 'Bank:', 'bank.agencia': 'Branch:', 'bank.conta': 'Account:', 'bank.titular': 'Account Holder:',
            'bank.instrucao': 'Complete the transfer and send the receipt via WhatsApp.',
            'usdt.desconto': '-5% DISCOUNT via USDT', 'usdt.cotacao': 'Live exchange rate:', 'usdt.wallet': 'Wallet TRC20:', 'usdt.copiar': 'Copy address', 'usdt.copiado': '✓ Copied!', 'usdt.txid': 'Send the TXID (transaction hash) along with your order via WhatsApp.',
            'cartao.taxa': 'Includes +5% processing fee', 'cartao.seguro': 'Secure processing via Asaas', 'cartao.dados': 'Card details will be requested at the final confirmation step.', 'cartao.bandeiras': 'Accepted brands:', 'cartao.processado': 'Payment will be processed after order confirmation.',
            'confirm': 'Confirm & Continue →',
            'pix.aguardando': '⏳ Awaiting payment', 'pix.instrucao': 'Scan the QR Code or paste the code in your banking app', 'pix.japaguei': '✓ Payment sent — Continue to summary'
        },
        es: {
            'title.boleto': 'Transferencia Bancaria', 'title.usdt': 'Pago en USDT (TRC20)', 'title.cartao': 'Tarjeta de Crédito',
            'items.count': (n) => `${n} artículo(s) en el pedido`,
            'bank.title': 'Datos Bancarios — Santander', 'bank.banco': 'Banco:', 'bank.agencia': 'Agencia:', 'bank.conta': 'Cuenta Corriente:', 'bank.titular': 'Titular:',
            'bank.instrucao': 'Realice la transferencia y envíe el comprobante por WhatsApp.',
            'usdt.desconto': '-5% DESCUENTO vía USDT', 'usdt.cotacao': 'Cotización en tiempo real:', 'usdt.wallet': 'Wallet TRC20:', 'usdt.copiar': 'Copiar dirección', 'usdt.copiado': '✓ ¡Copiado!', 'usdt.txid': 'Envíe el TXID (hash de la transacción) junto con el pedido por WhatsApp.',
            'cartao.taxa': 'Incluye +5% tasa operacional', 'cartao.seguro': 'Procesamiento seguro vía Asaas', 'cartao.dados': 'Los datos de la tarjeta serán solicitados en la etapa de confirmación final.', 'cartao.bandeiras': 'Marcas aceptadas:', 'cartao.processado': 'El pago será procesado después de la confirmación del pedido.',
            'confirm': 'Confirmar y Continuar →',
            'pix.aguardando': '⏳ Esperando pago', 'pix.instrucao': 'Escanee el QR Code o pegue el código en su app bancaria', 'pix.japaguei': '✓ Ya pagué — Continuar al resumen'
        }
    };

    function translatePaymentPanel(lang) {
        lang = lang || currentLang;
        const tr = PAY_PANEL_TRANSLATIONS[lang] || PAY_PANEL_TRANSLATIONS.pt;
        const execTitle = document.getElementById('ck-pay-exec-title');
        const execBody = document.getElementById('ck-pay-exec-body');
        const confirmBtn = document.getElementById('ck-pay-exec-confirm');

        if (!execTitle || !execBody) return;

        // Translate exec title
        const titleMap = {
            'Transferência Bancária': 'title.boleto', 'Bank Transfer': 'title.boleto', 'Transferencia Bancaria': 'title.boleto',
            'Pagamento em USDT (TRC20)': 'title.usdt', 'USDT Payment (TRC20)': 'title.usdt', 'Pago en USDT (TRC20)': 'title.usdt',
            'Cartão de Crédito': 'title.cartao', 'Credit Card': 'title.cartao', 'Tarjeta de Crédito': 'title.cartao'
        };
        const titleKey = titleMap[execTitle.textContent.trim()];
        if (titleKey && tr[titleKey]) execTitle.textContent = tr[titleKey];

        // Translate confirm button
        if (confirmBtn && confirmBtn.style.display !== 'none') {
            const txt = confirmBtn.textContent.trim();
            if (txt.includes('Confirmar') || txt.includes('Confirm') || txt.includes('Avançar') || txt.includes('Continue')) {
                confirmBtn.textContent = tr['confirm'];
            }
            if (txt.includes('Já paguei') || txt.includes('Payment sent') || txt.includes('Ya pagué')) {
                confirmBtn.textContent = tr['pix.japaguei'];
            }
        }
    }

    // =============================================
    // 16. OBSERVER: detectar abertura do checkout modal
    // =============================================
    const checkoutObserver = new MutationObserver(mutations => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.id === 'checkout-modal-overlay' || (node.querySelector && node.querySelector('#checkout-modal-overlay'))) {
                    setTimeout(() => translateCheckout(currentLang), 50);
                    return;
                }
            }
        }
    });
    // Start observing body for checkout modal insertion
    if (document.body) {
        checkoutObserver.observe(document.body, { childList: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            checkoutObserver.observe(document.body, { childList: true });
        });
    }

    // =============================================
    // 17. TRADUZIR CART DRAWER (pedido.js)
    // =============================================
    function translateCartDrawer(lang) {
        lang = lang || currentLang;

        // Cart header title
        const cartHeader = document.querySelector('#cart-panel .cart-header h3');
        if (cartHeader) {
            const svg = cartHeader.querySelector('svg');
            cartHeader.textContent = '';
            if (svg) cartHeader.appendChild(svg);
            cartHeader.appendChild(document.createTextNode('\n                    ' + t('cart.title', lang) + '\n                '));
        }

        // Cart empty state
        const emptyP = document.querySelector('#cart-empty p');
        const emptySub = document.querySelector('#cart-empty span');
        if (emptyP) emptyP.textContent = t('cart.empty', lang);
        if (emptySub) emptySub.textContent = t('cart.empty.sub', lang);

        // Cart footer button
        const btnCheckout = document.getElementById('btn-checkout');
        if (btnCheckout) {
            const svg = btnCheckout.querySelector('svg');
            btnCheckout.textContent = '';
            if (svg) btnCheckout.appendChild(svg);
            btnCheckout.appendChild(document.createTextNode('\n                    ' + t('btn.finalizar', lang) + '\n                '));
        }

        // Cart item names — translate if products have translations
        document.querySelectorAll('#cart-items .cart-item-name').forEach(nameEl => {
            const ptName = nameEl.textContent.trim();
            // Try to find this product in translations
            if (lang !== 'pt' && PRODUCT_TRANSLATIONS[ptName] && PRODUCT_TRANSLATIONS[ptName][lang]) {
                nameEl.textContent = PRODUCT_TRANSLATIONS[ptName][lang].name;
            }
        });

        // Cart close button aria-label
        const closeBtn = document.getElementById('cart-close');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', lang === 'pt' ? 'Fechar carrinho' : lang === 'es' ? 'Cerrar carrito' : 'Close cart');
        }
    }

    // =============================================
    // 18. TRADUZIR CC MODAL (pedido.js)
    // =============================================
    function translateCCModal(lang) {
        lang = lang || currentLang;
        const modal = document.getElementById('cc-modal-overlay');
        if (!modal) return;

        // Title
        const h3 = modal.querySelector('.cc-modal-header h3');
        if (h3) {
            const svg = h3.querySelector('svg');
            h3.textContent = '';
            if (svg) h3.appendChild(svg);
            h3.appendChild(document.createTextNode('\n                        ' + t('cc.title', lang) + '\n                    '));
        }

        // Total label
        const totalLabel = modal.querySelector('.cc-modal-total-label');
        if (totalLabel) totalLabel.textContent = t('cc.total.label', lang);

        // Surcharge note
        const surchargeSpan = modal.querySelector('.cc-surcharge-note span');
        if (surchargeSpan) surchargeSpan.textContent = t('cc.surcharge', lang);

        // Section titles
        const sectionTitles = modal.querySelectorAll('.cc-form-section-title');
        if (sectionTitles[0]) sectionTitles[0].textContent = t('cc.section.personal', lang);
        if (sectionTitles[1]) sectionTitles[1].textContent = t('cc.section.card', lang);

        // Labels
        const labelMap = [
            ['cc-name', 'cc.name'], ['cc-cpf', 'cc.cpf'], ['cc-email', 'cc.email'],
            ['cc-phone', 'cc.phone'], ['cc-cep', 'cc.cep'], ['cc-address-number', 'cc.address'],
            ['cc-card-number', 'cc.number'], ['cc-expiry-month', 'cc.month'],
            ['cc-expiry-year', 'cc.year'], ['cc-cvv', 'cc.cvv']
        ];
        labelMap.forEach(([id, key]) => {
            const input = modal.querySelector('#' + id);
            if (input) {
                const label = input.closest('.cc-field')?.querySelector('label');
                if (label) label.textContent = t(key, lang);
            }
        });

        // Placeholder for name
        const ccNameInput = modal.querySelector('#cc-name');
        if (ccNameInput) ccNameInput.placeholder = t('cc.name.placeholder', lang);

        // Submit button
        const submitBtn = modal.querySelector('#btn-submit-cc');
        if (submitBtn) {
            const svg = submitBtn.querySelector('svg');
            submitBtn.textContent = '';
            if (svg) submitBtn.appendChild(svg);
            submitBtn.appendChild(document.createTextNode('\n                            ' + t('cc.submit', lang) + '\n                        '));
        }

        // Loading text
        const loadingP = modal.querySelector('#cc-loading-view p');
        const loadingSpan = modal.querySelector('#cc-loading-view span');
        if (loadingP) loadingP.textContent = t('cc.processing', lang);
        if (loadingSpan) loadingSpan.textContent = t('cc.processing.sub', lang);

        // Close result button
        const closeResultBtn = modal.querySelector('#btn-cc-close-result');
        if (closeResultBtn) closeResultBtn.textContent = t('cc.close', lang);
    }

    // Expose API
    window.VGI_i18n = {
        switchLanguage,
        formatPrice,
        convertPrice,
        getCurrentLang: () => currentLang,
        getExchangeRate: () => EXCHANGE_RATE,
        t,
        translateCheckout,
        translateCartDrawer,
        translateCCModal
    };

})();
