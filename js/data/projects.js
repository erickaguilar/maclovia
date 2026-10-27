/**
 * Maclovia / Belleza Maldita — Engineering Portfolio Data
 * Repositorios oficiales certificados del CEO Erick Jonathan Aguilar García.
 */

export const PROJECTS = [
  {
    id: 'gaje-semantic-compression',
    name: 'Protocolo GAJE: Compresión Genómica & Inferencia LLM',
    nameZh: 'GAJE 协议：基因组语义压缩与 LLM 原生推理',
    repoName: 'erickaguilar/gaje-semantic-compression',
    category: 'maclovia',
    badgeCategoryEs: 'MACLOVIA CORE · SISTEMAS',
    badgeCategoryEn: 'MACLOVIA CORE · SYSTEMS',
    badgeCategoryZh: 'MACLOVIA 核心 · 底层系统',
    taglineEs: 'Motor de inferencia nativa en Rust y compresión de alta densidad (Q4_0) para Modelos de Lenguaje Masivos con acceso zero-copy.',
    taglineEn: 'Native Rust inference engine and high-density Q4_0 compression for Large Language Models with zero-copy mmap access.',
    taglineZh: '原生 Rust 推理引擎与大语言模型高密度 Q4_0 压缩，支持内存映射零拷贝访问。',
    descriptionEs: 'Implementación pura en Rust que comprime el cuerpo del transformer a 4-bits por peso (Q4_0 con 16 centroides optimizados) manteniendo embeddings en FP32 en formato plano unificado .gaje v2. Incluye gaje-server soberano HTTP (Zero-Python Runtime) y soporte WebAssembly in-browser.',
    descriptionEn: 'Pure Rust implementation compressing transformer bodies to 4-bits per weight (Q4_0, 16 optimized centroids) while keeping embeddings in FP32 inside the unified .gaje v2 format. Includes sovereign HTTP gaje-server (Zero-Python) and in-browser WebAssembly.',
    descriptionZh: '纯 Rust 实现的 Transformer 模型压缩引擎，将权重压缩至 4-bit (16 个优化质心的 Q4_0 量化)，同时保持 FP32 嵌入向量并封装进统一的 .gaje v2 二进制平面格式。内置独立的高吞吐 HTTP 服务器 (gaje-server，零 Python 运行时) 并支持浏览器端 WebAssembly 极速推理。',
    primaryLanguage: 'Rust',
    techStack: ['Rust', 'PyO3', 'WebAssembly', 'Zero-Copy mmap', 'SSE Streaming', 'Q4_0 Quant'],
    githubUrl: 'https://github.com/erickaguilar/gaje-semantic-compression',
    huggingFaceUrl: 'https://huggingface.co/eaguilar/gaje-models',
    cloneCmd: 'git clone https://github.com/erickaguilar/gaje-semantic-compression.git',
    architectureDetails: {
      runtime: 'Pure Rust Engine (Zero-Python Runtime)',
      throughput: 'Token-to-token streaming < 18ms TTFT',
      quantizationOrType: 'Q4_0 (16 centroids) + FP32 Embeddings',
      cliExample: './target/release/gaje-server --model models/gaje_prime_3b.gaje --port 8080',
      highlightsEs: [
        'Formato plano unificado .gaje v2 con acceso zero-copy por mapeo en memoria (mmap).',
        'Servidor HTTP de producción soberano (gaje-server) con streaming SSE token a token.',
        'Soporte WebAssembly in-browser sin necesidad de backend o servidor externo.',
        'Modelos oficiales certificados en Hugging Face: Nano 1.5B (1.23 GB), Prime 3B (2.24 GB) y Ultra 7B (4.88 GB).'
      ],
      highlightsEn: [
        'Unified flat file .gaje v2 format with zero-copy memory-mapped access (mmap).',
        'Sovereign HTTP production server (gaje-server) with token-by-token SSE streaming.',
        'In-browser WebAssembly engine running entirely client-side with zero server dependencies.',
        'Certified models on Hugging Face: Nano 1.5B (1.23 GB), Prime 3B (2.24 GB), and Ultra 7B (4.88 GB).'
      ],
      highlightsZh: [
        '统一平面文件 .gaje v2 格式，通过 mmap 内存映射实现零拷贝瞬时加载。',
        '自主高效的独立生产级 HTTP 服务器 (gaje-server)，支持逐 Token 的 SSE 流式传输。',
        '浏览器端 WebAssembly 引擎，无需任何后端服务或依赖即可本地离线运行。',
        'Hugging Face 官方认证模型：Nano 1.5B (1.23 GB)、Prime 3B (2.24 GB) 与 Ultra 7B (4.88 GB)。'
      ],
      benchmarks: [
        { label: 'Formato .gaje v2', value: '1.23 GB', subtext: 'gaje_nano_1.5b en WASM' },
        { label: 'Latencia TTFT', value: '< 18ms', subtext: 'Inferencia local zero-copy' },
        { label: 'Cuantización', value: '4-bits / W', subtext: '16 centroides optimizados' },
        { label: 'Servidor HTTP', value: '0 ms Python', subtext: 'Soberano en Rust puro' }
      ]
    }
  },
  {
    id: 'runa-y-piedra',
    name: 'Runa y Piedra: Mazmorra Vóxel Cooperativa P2P',
    nameZh: '符文与基石：点对点多人合作体素地牢',
    repoName: 'erickaguilar/runa-y-piedra',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · WEBGL & P2P 3D',
    badgeCategoryEn: 'BELLEZA MALDITA · WEBGL & P2P 3D',
    badgeCategoryZh: 'BELLEZA MALDITA · 3D WEBGL 与点对点技术',
    taglineEs: 'Mazmorra vóxel cooperativa multijugador 3D en tiempo real con WebRTC dual-channel y motor WebGL a 60 FPS.',
    taglineEn: 'Real-time multiplayer 3D voxel cooperative dungeon powered by dual-channel WebRTC and 60 FPS WebGL engine.',
    taglineZh: '基于双通道 WebRTC 与 60 FPS WebGL 引擎驱动的实时多人 3D 体素合作地牢游戏。',
    descriptionEs: 'Experiencia multijugador 3D cooperativa en tiempo real para smartphones y escritorio con arquitectura listen-server P2P sobre WebRTC. Toda la mazmorra se renderiza en un único THREE.InstancedMesh (< 25 draw calls) con audio procedural sintetizado por Web Audio API, predicción de clientes y sincronización sin servidores centrales.',
    descriptionEn: 'Real-time cooperative 3D multiplayer dungeon for smartphones and desktop with P2P listen-server architecture over WebRTC. The entire dungeon renders inside a single THREE.InstancedMesh (< 25 draw calls) featuring synthesized procedural audio via Web Audio API, client reconciliation, and zero server infrastructure cost.',
    descriptionZh: '面向移动端和桌面的实时多人 3D 合作探险游戏，基于 WebRTC 的 P2P 侦听服务器架构。整个地牢在单个 THREE.InstancedMesh 中完成渲染（总绘制调用 < 25 次），辅以 Web Audio API 生成的过程化合成音效、客户端航位推算预测，实现零服务器基建成本运作。',
    primaryLanguage: 'JavaScript / WebGL',
    techStack: ['WebGL 2.0', 'Three.js', 'WebRTC P2P', 'Listen-Server', 'InstancedMesh', 'Web Audio API'],
    githubUrl: 'https://github.com/erickaguilar/runa-y-piedra',
    demoUrl: 'https://runa-y-piedra.vercel.app/',
    cloneCmd: 'git clone https://github.com/erickaguilar/runa-y-piedra.git',
    architectureDetails: {
      runtime: 'WebGL 2.0 + WebRTC Peer-to-Peer Browser Engine',
      throughput: '60 FPS Móvil · Latencia P2P LAN < 5ms',
      quantizationOrType: 'Instanced Voxel Meshing + Dual DataChannels',
      cliExample: 'git clone https://github.com/erickaguilar/runa-y-piedra.git && npm install && npm run dev',
      highlightsEs: [
        'Arquitectura Listen-Server P2P: un navegador asume el rol de host autoritativo con $0 en costos de servidor.',
        'Canales duales WebRTC: canal confiable para eventos y canal de alta frecuencia a 30 Hz para inputs sin head-of-line blocking.',
        'Presupuesto de rendimiento móvil: menos de 25 draw calls en total renderizando el calabozo en un solo InstancedMesh.',
        'Audio procedural sintetizado en tiempo real con Web Audio API sin descargas de activos pesados.',
        'Conexión instantánea entre jugadores vía Web Share API (WhatsApp/Telegram), código QR dinámico y PIN de 4 dígitos.'
      ],
      highlightsEn: [
        'P2P Listen-Server Architecture: one client browser acts as authoritative host with zero cloud server expenses.',
        'Dual WebRTC DataChannels: guaranteed delivery for events and high-frequency 30 Hz hot channel for inputs without head-of-line blocking.',
        'Strict mobile performance budget: under 25 total draw calls by rendering the dungeon in a single InstancedMesh.',
        'Real-time procedural audio synthesis via Web Audio API without downloading heavy sound assets.',
        'Instant player pairing using Web Share API (WhatsApp/Telegram), dynamic QR codes, and 4-digit room PINs.'
      ],
      highlightsZh: [
        'P2P 侦听服务器架构：由玩家浏览器担任权威主机，云端服务器成本降为 0。',
        '双 WebRTC 数据通道：可靠通道传输游戏事件，30 Hz 高频通道处理输入指令，杜绝队头阻塞。',
        '严苛的移动端性能把控：单批次 InstancedMesh 统一渲染，全场景总 Draw Calls 小于 25 次。',
        'Web Audio API 实时程序化音效合成，无需加载沉重外部音频素材。',
        '通过 Web Share API、动态二维码和 4 位房间密码实现秒级玩家组队。'
      ],
      benchmarks: [
        { label: 'Rendimiento', value: '60 FPS', subtext: 'GPUs móviles estándar' },
        { label: 'Draw Calls', value: '< 25', subtext: 'THREE.InstancedMesh' },
        { label: 'Red P2P', value: '< 5ms', subtext: 'WebRTC directo sin server' },
        { label: 'Costo Servidor', value: '$0 / mes', subtext: 'Host descentralizado' }
      ]
    }
  },
  {
    id: 'valenquest',
    name: 'ValenQuest: Local-First Educational PWA',
    nameZh: 'ValenQuest：本地优先教育类渐进式 Web 应用 (PWA)',
    repoName: 'erickaguilar/ValenQuest',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · CRAFT INTERACTIVO',
    badgeCategoryEn: 'BELLEZA MALDITA · INTERACTIVE CRAFT',
    badgeCategoryZh: 'BELLEZA MALDITA · 交互工艺',
    taglineEs: 'Videojuego educativo y simulación reactiva local-first compilada a WebAssembly con estética visual lúdica.',
    taglineEn: 'Local-first educational simulation and interactive game compiled to WebAssembly with playful visual aesthetics.',
    taglineZh: '基于 WebAssembly 的本地优先教育模拟与交互游戏，具备鲜明独特的艺术美感。',
    descriptionEs: 'Aplicación web progresiva (PWA) de arquitectura offline y local-first construida con módulos de cómputo en Rust compilados a WebAssembly integrados con JavaScript puro para garantizar máxima fluidez a 60 FPS.',
    descriptionEn: 'Progressive Web App (PWA) built on local-first offline architecture featuring high-speed Rust computation compiled to WebAssembly paired with vanilla JavaScript for silky 60 FPS performance.',
    descriptionZh: '采用离线本地优先架构构建的渐进式 Web 应用 (PWA)，由 Rust 编写的高性能计算模块编译至 WebAssembly，配合原生 JavaScript 调度，确保稳定 60 FPS 顺畅体验。',
    primaryLanguage: 'Rust + WASM',
    techStack: ['Rust', 'WebAssembly', 'Vanilla JS', 'Local-First', 'PWA Offline', 'HTML5 Canvas'],
    githubUrl: 'https://github.com/erickaguilar/ValenQuest',
    demoUrl: 'https://valen-quest.vercel.app',
    cloneCmd: 'git clone https://github.com/erickaguilar/ValenQuest.git',
    architectureDetails: {
      runtime: 'Rust + WebAssembly in Client Browser',
      throughput: '60 FPS Solid · Cero Latencia de Red',
      quantizationOrType: 'Local-First State Architecture',
      cliExample: 'npm run build:wasm && vercel dev',
      highlightsEs: [
        'Arquitectura 100% cliente local-first: opera sin conexión a internet permanente.',
        'Módulo compilado en Rust con WebAssembly para lógica matemática y física del juego.',
        'Diseño interactivo de autor con identidad artística vibrante y lúdica.',
        'Desplegado en producción en Vercel con soporte multiplataforma (móvil y escritorio).'
      ],
      highlightsEn: [
        '100% local-first client architecture: runs seamlessly without permanent internet connectivity.',
        'Compiled Rust WebAssembly module driving game physics and mathematical state logic.',
        'Authorial interactive interface with vibrant visual craftsmanship.',
        'Production deployment on Vercel with desktop and mobile responsiveness.'
      ],
      highlightsZh: [
        '100% 本地优先客户端架构：无需持续网络连接即可顺畅运行。',
        'Rust 编译的 WebAssembly 模块驱动数学逻辑与物理引擎。',
        '独具辨识度的交互设计与生动的视觉审美。',
        '已部署至 Vercel 生产环境，全面适配移动设备与桌面端。'
      ],
      benchmarks: [
        { label: 'Framerate', value: '60 FPS', subtext: 'Animación y física continua' },
        { label: 'Persistencia', value: 'Local-First', subtext: 'Sin dependencias de nube' },
        { label: 'Cómputo Wasm', value: 'Nativo', subtext: 'Compilado desde Rust' }
      ]
    }
  },
  {
    id: 'gaje-web-ui',
    name: 'GAJE Web UI / Local LLM Studio',
    nameZh: 'GAJE Web UI / 本地大模型交互控制台',
    repoName: 'erickaguilar/gaje-web-ui',
    category: 'belleza',
    badgeCategoryEs: 'IDENTIDAD UNIFICADA · INTERFAZ IA',
    badgeCategoryEn: 'UNIFIED IDENTITY · AI INTERFACE',
    badgeCategoryZh: '统一身份 · AI 交互界面',
    taglineEs: 'Consola de control web para interactuar con modelos locales mediante streaming de tokens en tiempo real.',
    taglineEn: 'Web service frontend and control studio for local LLM inference with real-time token streaming.',
    taglineZh: '用于本地大语言模型实时流式 Token 推理调试的 Web 前端控制面板。',
    descriptionEs: 'Frontend reactivo conectado al servidor gaje-server que permite probar la compresión de modelos, ajustar hiperparámetros de muestreo y observar el rendimiento de generación con telemetría en vivo.',
    descriptionEn: 'Reactive frontend connected to gaje-server enabling model compression evaluation, sampling hyperparameter adjustments, and real-time token generation telemetry.',
    descriptionZh: '与 gaje-server 深度协同的高性能响应式前端，支持模型压缩评测、采样超参数实时调整以及带毫秒级遥测的实时流式生成监视。',
    primaryLanguage: 'JavaScript',
    techStack: ['JavaScript', 'Streaming SSE', 'Tailwind CSS', 'Vercel Edge', 'Local LLM UI'],
    githubUrl: 'https://github.com/erickaguilar/gaje-web-ui',
    demoUrl: 'https://gaje-web-ui.vercel.app',
    cloneCmd: 'git clone https://github.com/erickaguilar/gaje-web-ui.git',
    architectureDetails: {
      runtime: 'Modern Reactive Web Service',
      throughput: 'EventSource / Server-Sent Events (SSE)',
      quantizationOrType: 'Client Stream Inspector',
      cliExample: 'git clone https://github.com/erickaguilar/gaje-web-ui.git && npm install && npm run dev',
      highlightsEs: [
        'Conexión directa vía SSE (Server-Sent Events) con gaje-server en tiempo real.',
        'Telemetría de generación: cálculo de tokens por segundo y consumo de memoria.',
        'Diseño minimalista oscuro optimizado para sesiones prolongadas de investigación.'
      ],
      highlightsEn: [
        'Direct Server-Sent Events (SSE) pipe connected to sovereign gaje-server.',
        'Live generation telemetry: tokens per second tracking and memory footprint monitor.',
        'Minimalist dark theme engineered for prolonged research sessions.'
      ],
      highlightsZh: [
        '通过 Server-Sent Events (SSE) 直连独立部署的 gaje-server。',
        '生成过程全量指标监控：实时计算每秒 Token 数与内存占用空间。',
        '针对长时间深度科研工作优化的极简暗色调交互界面。'
      ]
    }
  },
  {
    id: 'rubik-graph-visualizer',
    name: 'Rubik Graph Visualizer & State Space Topology',
    nameZh: '魔方状态拓扑图可视化与置换群分析工具',
    repoName: 'erickaguilar/rubik-graph-visualizer',
    category: 'maclovia',
    badgeCategoryEs: 'MACLOVIA CORE · MATEMÁTICAS',
    badgeCategoryEn: 'MACLOVIA CORE · MATHEMATICS',
    badgeCategoryZh: 'MACLOVIA 核心 · 离散数学',
    taglineEs: 'Visualizador topológico y análisis de grafos del espacio de estados y subgrupos del Cubo de Rubik.',
    taglineEn: 'Topological visualizer and state space graph analysis of Rubik\'s Cube permutation subgroups.',
    taglineZh: '魔方置换子群状态空间与图论拓扑分析可视化平台。',
    descriptionEs: 'Herramienta de análisis algorítmico y teoría de grupos para modelar las transiciones de estados del cubo de Rubik como grafos de Cayley, facilitando el estudio de caminos óptimos y propiedades algebraicas.',
    descriptionEn: 'Algorithmic tool and group theory visualizer modeling Rubik\'s Cube state transitions as Cayley graphs, enabling study of optimal pathing and algebraic structures.',
    descriptionZh: '将魔方状态转换建模为凯莱图 (Cayley Graph) 的算法与群论分析工具，便于深入探索离散状态空间中的最优寻路路径与代数结构性质。',
    primaryLanguage: 'Python',
    techStack: ['Python', 'Network Analysis', 'Graph Theory', 'Cayley Graphs', 'Combinatorics'],
    githubUrl: 'https://github.com/erickaguilar/rubik-graph-visualizer',
    demoUrl: 'https://rubik-graph-visualizer.vercel.app/',
    cloneCmd: 'git clone https://github.com/erickaguilar/rubik-graph-visualizer.git',
    architectureDetails: {
      runtime: 'Python Scientific & Graph Computing',
      throughput: 'State Graph Expansion',
      quantizationOrType: 'Discrete Algebra & Permutations',
      cliExample: 'python -m rubik_visualizer --depth 6 --layout topological',
      highlightsEs: [
        'Modelado de permutaciones mediante teoría de grupos y representaciones algebraicas.',
        'Visualización de subgrafos de Cayley y distancias de Hamming entre estados.',
        'Orientado a investigación en heurísticas de resolución y búsqueda en espacios discretos.'
      ],
      highlightsEn: [
        'Permutation modeling via algebraic group theory representations.',
        'Visualization of Cayley subgraphs and Hamming distance state transitions.',
        'Engineered for research in discrete search heuristics and combinatorial spaces.'
      ],
      highlightsZh: [
        '借助代数群论与置换群表示对状态进行严谨数学建模。',
        '凯莱子图可视化及状态间汉明距离与拓扑变换展示。',
        '专为离散搜索启发式算法与组合优化研究打造。'
      ]
    }
  },
  {
    id: 'generador-historias',
    name: 'Generador de Historias Interactivas con IA',
    nameZh: 'AI 互动故事生成器与多模态叙事工作台',
    repoName: 'erickaguilar/generador_historias',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · IA GENERATIVA & PWA',
    badgeCategoryEn: 'BELLEZA MALDITA · GENERATIVE AI & PWA',
    badgeCategoryZh: 'BELLEZA MALDITA · 生成式 AI 与 PWA',
    taglineEs: 'Taller interactivo de narrativa ramificada impulsado por Gemini 2.5 Flash, Imagen 3, síntesis por voz y persistencia Dexie.',
    taglineEn: 'Interactive branching storytelling studio powered by Gemini 2.5 Flash, Imagen 3, Web Speech API, and offline Dexie DB.',
    taglineZh: '由 Gemini 2.5 Flash 与 Imagen 3 驱动的分支互动叙事工作台，支持原生语音合成与 Dexie 离线存储。',
    descriptionEs: 'Aplicación web progresiva (PWA) colaborativa para coescribir historias literarias interactivas con IA multimodal. Incorpora libro de lore (world-building) persistente, generación de arte visual de escenas con Imagen 3, exportación editorial a PDF maquetado con jsPDF y almacenamiento seguro en cliente sobre IndexedDB (Dexie.js).',
    descriptionEn: 'Collaborative Progressive Web App (PWA) to co-write interactive branching narratives with multimodal AI. Features persistent lore book world-building, high-fidelity scene illustration with Imagen 3, publication-ready PDF exports with jsPDF, and zero-cloud client storage via IndexedDB (Dexie.js).',
    descriptionZh: '基于多模态 AI 协同创作分支互动小说的渐进式 Web 应用 (PWA)。内置世界观设定集（Lore Book）、Imagen 3 概念插画渲染、基于 jsPDF 的专业电子书排版导出，以及依托 IndexedDB (Dexie.js) 的纯离线数据安全管理。',
    primaryLanguage: 'TypeScript / React',
    techStack: ['React 19', 'TypeScript', 'Gemini 2.5 Flash', 'Imagen 3', 'Dexie.js / IndexedDB', 'jsPDF', 'PWA Offline'],
    githubUrl: 'https://github.com/erickaguilar/generador_historias',
    demoUrl: 'https://generador-historias.vercel.app/',
    cloneCmd: 'git clone https://github.com/erickaguilar/generador_historias.git',
    architectureDetails: {
      runtime: 'React 19 + TypeScript + Vite + Google GenAI SDK',
      throughput: 'Gemini 2.5 Flash Streaming + Imagen 3 1024px',
      quantizationOrType: 'Local-First Client / IndexedDB Store',
      cliExample: 'git clone https://github.com/erickaguilar/generador_historias.git && npm install && npm run dev',
      highlightsEs: [
        'Generación de relatos ramificados colaborativos con Gemini 2.5 Flash e ilustración visual con Imagen 3.',
        'Libro de Lore (world-building) persistente para coherencia narrativa, memoria de personajes y reglas de trama.',
        'Arquitectura local-first con Dexie.js (IndexedDB): privacidad absoluta y funcionamiento sin base de datos externa.',
        'Exportación editorial a PDF de alta fidelidad maquetada con carátulas e ilustraciones vía jsPDF.'
      ],
      highlightsEn: [
        'Branching collaborative storytelling powered by Gemini 2.5 Flash and scene generation via Imagen 3.',
        'Persistent Lore Book (world-building) preserving character continuity, narrative constraints, and plot twists.',
        'Local-first client architecture using Dexie.js (IndexedDB) for privacy with zero external database dependencies.',
        'High-fidelity digital book PDF exporting with custom cover layouts and generated illustrations via jsPDF.'
      ],
      highlightsZh: [
        '基于 Gemini 2.5 Flash 与 Imagen 3 的多模态分支互动叙事与场景绘画引擎。',
        '持久化设定集（Lore Book）技术，为生成流程注入世界观连续性与角色长程记忆。',
        '基于 Dexie.js (IndexedDB) 的本地优先架构，零外部数据库依赖且全程保护用户隐私。',
        '内置出版级 PDF 导出排版器，自动整合插画、封面与章节目录。'
      ],
      benchmarks: [
        { label: 'Modelo LLM', value: 'Gemini 2.5', subtext: 'Google GenAI SDK' },
        { label: 'Persistencia', value: 'IndexedDB', subtext: 'Dexie 4.0 Local-First' },
        { label: 'Exportación', value: 'Vector PDF', subtext: 'jsPDF con carátulas' },
        { label: 'Arquitectura', value: '100% PWA', subtext: 'Offline Service Worker' }
      ]
    }
  },
  {
    id: 'mivit3',
    name: 'miVIT3: Editor de Currículum Vitae WYSIWYG Estilo Word',
    nameZh: 'miVIT3：Word 风格即时所见即所得简历编辑器',
    repoName: 'erickaguilar/mivit3',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · PRODUCTIVITY & ATS',
    badgeCategoryEn: 'BELLEZA MALDITA · PRODUCTIVITY & ATS',
    badgeCategoryZh: 'BELLEZA MALDITA · 生产力工具与 ATS',
    taglineEs: 'Editor interactivo de CV en tiempo real sobre lienzo A4 con ribbon toolbar estilo Word, 8 plantillas ATS y 100% Vanilla JS.',
    taglineEn: 'Real-time interactive CV editor on A4 canvas featuring Microsoft Word ribbon toolbar, 8 ATS-ready templates, and pure Vanilla JS.',
    taglineZh: '基于 A4 真实画布与 Word 功能区界面的即时简历编辑器，内置 8 款 ATS 优化模板，100% 原生 JavaScript 零重依赖。',
    descriptionEs: 'Procesador de texto ligero y enfocado en privacidad para diseñar currículums profesionales en el navegador. Cuenta con ribbon toolbar estilo Office (fuentes, colores, alineación, listas y enlaces), lienzo A4 milimétrico con guías de corte y paginación en vivo, 8 plantillas intercambiables optimizadas para filtros ATS y exportación a PDF sin marcas de agua.',
    descriptionEn: 'Lightweight, privacy-focused in-browser word processor for crafting professional resumes. Features an Office-style ribbon toolbar (fonts, colors, alignment, lists, links), millimeter-accurate A4 canvas with live pagination and page-break guides, 8 interchangeable ATS-optimized templates, and high-fidelity watermark-free PDF exports.',
    descriptionZh: '注重隐私与轻量高效的专业简历排版文字处理器。配备 Office 风格的功能区工具栏（字体、色板、段落、列表、超链接），带有实时分页与截断参考线的毫米级 A4 纸张画布，内置 8 款通过 ATS 筛选优化的主题模板，支持无水印高保真矢量打印与 PDF 导出。',
    primaryLanguage: 'JavaScript / CSS',
    techStack: ['Vanilla JavaScript', 'CSS3 Modern Modules', 'WYSIWYG Engine', 'SVG Icons', 'PWA Offline', 'Print / PDF Engine'],
    githubUrl: 'https://github.com/erickaguilar/mivit3',
    demoUrl: 'https://mivit3.vercel.app/',
    cloneCmd: 'git clone https://github.com/erickaguilar/mivit3.git',
    architectureDetails: {
      runtime: 'Pure Vanilla JavaScript ES Modules (Zero External Frameworks)',
      throughput: 'WYSIWYG DOM updates < 4ms · Cero Latencia',
      quantizationOrType: 'LocalStorage + JSON Backup System',
      cliExample: 'git clone https://github.com/erickaguilar/mivit3.git && cd mivit3 && npx serve',
      highlightsEs: [
        'Editor WYSIWYG directo sobre lienzo A4 con ribbon toolbar estilo Microsoft Word/Google Docs.',
        '8 plantillas profesionales (Tech Minimalista, Ejecutivo Harvard, Línea de Tiempo, Nordic Clean y Colección Alpha).',
        'Motor de paginación geométrica y guías de corte visuales para evitar desbordes en impresión A4.',
        'Auditor ATS integrado para optimización de palabras clave y formato compatible con software de reclutamiento.',
        'Privacidad estricta: procesamiento 100% en el cliente sin servidores externos ni transmisión de datos.'
      ],
      highlightsEn: [
        'Direct WYSIWYG inline editor on A4 paper canvas with Microsoft Word / Google Docs style ribbon bar.',
        '8 professional themes (Tech Minimalist, Harvard Executive, Career Timeline, Nordic Clean, and Alpha collection).',
        'Geometric page-break measurement system with visual cut guides preventing content overflow during print.',
        'Integrated ATS keyword auditor ensuring recruiters and machine screening filters parse the CV flawlessly.',
        'Strict zero-knowledge privacy: executes 100% inside client browser with zero data transmitted to servers.'
      ],
      highlightsZh: [
        '所见即所得 A4 纸张排版引擎，还原微软 Word 与 Google Docs 功能区交互体验。',
        '8 款精工级职业模板（科技极简、哈佛主管、职业时间线、北欧风与 Alpha 系列）。',
        '几何分页测算系统与物理切线引导，杜绝跨页打印排版错位。',
        '内置 ATS 关键字审计系统，确保企业招聘筛选系统精准解析。',
        '严苛的零知识隐私：数据完全驻留浏览器本地存储，绝无云端泄露隐患。'
      ],
      benchmarks: [
        { label: 'Dependencias', value: '0 bytes', subtext: 'Vanilla JS puro' },
        { label: 'Plantillas ATS', value: '8 temas', subtext: 'Intercambiables al vuelo' },
        { label: 'Lienzo', value: 'A4 Real', subtext: 'Paginación milimétrica' },
        { label: 'Privacidad', value: '100% Local', subtext: 'Sin tracking ni backend' }
      ]
    }
  }
];
