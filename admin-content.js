 /**
 * Espaço Elêusis - Sistema de Gerenciamento de Conteúdo
 * Editor visual tipo WordPress con vista previa en vivo
 * Permite editar textos, imágenes y toggle de precios
 */

// Default content configuration
const DEFAULT_CONTENT = {
    hero: {
        title: "Viva o presente da vida com uma vida presente",
        subtitle: "Psicologia Junguiana & Mindfulness em São Paulo.",
        subtitleAlt: "Um espaço de autocuidado e renascimento.",
        ctaPrimary: "Agendar Sessão",
        ctaSecondary: "Conheça o Espaço Elêusis",
        backgroundImage: "flordemeterencampodetrigo.jpg",
        backgroundAlt: "Campo de flores de Deméter - Espaço Elêusis"
    },
    sobre: {
        title: "Malu (Maria Lucia)",
        subtitle: "Sobre Mim",
        description: "Psicóloga Clínica com mais de 25 anos de experiência (desde 1994). Psicoterapia de Abordagem Junguiana.",
        description2: "Minha trajetória combina a prática clínica com a pesquisa acadêmica, oferecendo um espaço seguro e fundamentado para o seu processo de autoconhecimento e transformação.",
        bioLonga: "Minha jornada profissional começou em 1987, quando me formei em História pela PUC-SP. Essa formação inicial me proporcionou uma base sólida para compreender as narrativas humanas e os contextos culturais que moldam nossas experiências.\n\nAo longo de mais de 25 anos de atuação como psicóloga clínica, tenho acompanhado pessoas em seus processos de autoconhecimento, acolhendo cada história com escuta sensível e compromisso ético. A abordagem junguiana me permite olhar para o indivíduo em sua totalidade, valorizando os símbolos, os sonhos e as narrativas que dão sentido à vida.\n\nMinha trajetória acadêmica inclui um Mestrado em Saúde Coletiva pela UNIFESP (2018) e uma especialização como Instrutora de Mindfulness, certificada desde 2017. Atuei como pesquisadora e coordenadora no Ambulatório de Mindfulness Brasil (Mente Aberta/UNIFESP), integrando a prática clínica com a pesquisa científica.\n\nAcredito que o encontro terapêutico é um espaço de renascimento, onde é possível ressignificar dores, descobrir potencialidades e florescer em cada ciclo da vida. Minha abordagem combina a profundidade da psicologia junguiana com as práticas de atenção plena, oferecendo um caminho para o autoconhecimento e a transformação pessoal.",
        galeria: [],
        image: "fotodemalu.jpeg",
        imageAlt: "Malu - Psicóloga Junguiana em São Paulo",
        imagePosition: { x: 50, y: 0 },
        credentials: [
            { title: "Historiadora", subtitle: "PUC-SP, 1987" },
            { title: "Instrutora de Mindfulness Certificada", subtitle: "Desde 2017" },
            { title: "Mestre em Saúde Coletiva", subtitle: "UNIFESP, 2018" },
            { title: "Pesquisadora e Coordenadora", subtitle: "Ambulatório de Mindfulness Brasil (Mente Aberta/UNIFESP)" }
        ]
    },
    espaco: {
        title: "O Espaço Elêusis",
        showOnSite: true,
        posts: [
            {
                id: "post_1",
                title: "Um convite ao renascimento",
                description: "Assim como nos antigos Mistérios de Elêusis, este espaço é um convite ao seu renascimento pessoal. Através da Psicologia Junguiana e do Mindfulness, buscamos o florescer a cada ciclo da vida, promovendo o autoconhecimento profundo e o autocuidado.",
                quote: "Conheça todas as teorias, domine todas as técnicas, mas ao tocar uma alma humana, seja apenas outra alma humana.",
                quoteAuthor: "C.G. Jung",
                image: "templodemeter.jpg",
                imageAlt: "Templo de Deméter - Espaço Elêusis",
                date: "2024-01-15",
                published: true
            }
        ]
    },
    servicos: {
        title: "Serviços",
        heading: "O que ofereço",
        showPrices: true,
        services: [
            {
                id: "s1",
                title: "Psicoterapia Individual",
                description: "Atendimento online e presencial. Foco em adultos e saúde mental da mulher.",
                price: "R$ 250",
                showPrice: true,
                icon: "group",
                features: ["Abordagem Junguiana", "Saúde mental da mulher", "Gestação e pós-parto", "Prevenção de depressão"]
            },
            {
                id: "s2",
                title: "Mindfulness (Atenção Plena)",
                description: "Protocolo MBHP para redução de estresse e ansiedade, desenvolvido na UNIFESP.",
                price: "R$ 200",
                showPrice: true,
                icon: "globe",
                features: ["Redução de estresse", "Controle de ansiedade", "Protocolo MBHP/UNIFESP", "Grupos e individuais"]
            },
            {
                id: "s3",
                title: "Workshops e Vivências",
                description: "Vivências transformadoras para autoconhecimento e desenvolvimento pessoal.",
                price: "R$ 350",
                showPrice: true,
                icon: "book",
                features: ["Jornada das Heroínas", "Cursos especializados", "Retiros espirituais", "Vivências em grupo"]
            }
        ]
    },
    contato: {
        title: "Contato",
        heading: "Entre em contato e agende sua sessão",
        description: "Escolha o serviço, selecione a data e horário disponíveis",
        whatsapp: "+55 11 97275-0589",
        email: "espacoeleusis@gmail.com"
    }
};

// Migrate old content format to new format
function migrateContent(parsed) {
    // Migrate old format (service1/service2/service3) to new array format
    if (parsed.servicos && parsed.servicos.service1 && !parsed.servicos.services) {
        parsed.servicos.services = [
            migrateService(parsed.servicos.service1, "s1"),
            migrateService(parsed.servicos.service2, "s2"),
            migrateService(parsed.servicos.service3, "s3")
        ];
        delete parsed.servicos.service1;
        delete parsed.servicos.service2;
        delete parsed.servicos.service3;
    }
    // Migrate old espaco format (single fields) to new posts array format
    if (parsed.espaco && parsed.espaco.heading && !parsed.espaco.posts) {
        parsed.espaco.posts = [
            {
                id: "post_1",
                title: parsed.espaco.heading || "Um convite ao renascimento",
                description: parsed.espaco.description || "",
                quote: parsed.espaco.quote || "",
                quoteAuthor: parsed.espaco.quoteAuthor || "",
                image: parsed.espaco.image || "templodemeter.jpg",
                imageAlt: parsed.espaco.imageAlt || "",
                date: new Date().toISOString().split('T')[0],
                published: true
            }
        ];
        delete parsed.espaco.heading;
        delete parsed.espaco.description;
        delete parsed.espaco.quote;
        delete parsed.espaco.quoteAuthor;
        delete parsed.espaco.image;
        delete parsed.espaco.imageAlt;
    }
    return parsed;
}

// Load content from server (primary), localStorage (fallback), or defaults
function loadContent() {
    // Return defaults synchronously; server content will be loaded async
    return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

// Load content from server asynchronously
async function loadContentFromServer() {
    try {
        // Fetch the static JSON file
        const response = await fetch('../site-content.json');
        if (!response.ok) throw new Error('File not found');
        const data = await response.json();
        // Merge and return
        const parsed = migrateContent(data);
        const merged = deepMerge(JSON.parse(JSON.stringify(DEFAULT_CONTENT)), parsed);
        delete merged._lastUpdated;
        return merged;
    } catch(e) {
        console.log('Using localStorage/defaults:', e.message);
    }
    // Fallback to localStorage
    const stored = localStorage.getItem('eleusis_content');
    if (stored) {
        try {
            const parsed = migrateContent(JSON.parse(stored));
            return deepMerge(JSON.parse(JSON.stringify(DEFAULT_CONTENT)), parsed);
        } catch(e) {
            return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
        }
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

// Toggle Saber Mais expandir/recolher
function toggleSaberMais() {
    const content = document.getElementById('saber-mais-content');
    const text = document.getElementById('saber-mais-text');
    const chevron = document.getElementById('saber-mais-chevron');
    if (!content) return;
    
    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden');
    
    if (text) text.textContent = isHidden ? 'Saber Menos' : 'Saber Mais';
    if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Render editor de galeria no admin
function renderGaleriaEditor() {
    const container = document.getElementById('galeria-editor');
    if (!container) return;
    
    const fotos = SITE_CONTENT.sobre.galeria || [];
    
    container.innerHTML = fotos.map((foto, i) => `
        <div class="border border-cream-200 rounded-lg p-3 bg-white galeria-card" data-galeria-idx="${i}">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-brown-800">Foto ${i + 1}</span>
                <button type="button" onclick="removeGaleriaFoto(${i})" class="text-red-400 hover:text-red-600 transition p-1" title="Remover foto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
            <div class="flex gap-2 items-center mb-2">
                <input type="text" id="edit-galeria-img-${i}" value="${escapeHtml(foto.image || '')}" oninput="liveUpdateSobre()" class="flex-1 px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="nome-da-imagem.jpg ou data-url">
                <button type="button" onclick="uploadImage('edit-galeria-img-${i}', 'galeria', ${i})" class="px-2 py-1.5 bg-blue-50 text-blue-600 rounded border border-cream-200 hover:bg-blue-100 transition text-xs flex items-center gap-1 flex-shrink-0">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    Subir
                </button>
            </div>
            <input type="text" id="edit-galeria-alt-${i}" value="${escapeHtml(foto.imageAlt || '')}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Texto alternativo (opcional)">
            <input type="text" id="edit-galeria-caption-${i}" value="${escapeHtml(foto.caption || '')}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="Legenda (opcional)">
        </div>
    `).join('');
}

// Adicionar foto à galeria
function addGaleriaFoto() {
    if (!SITE_CONTENT.sobre.galeria) {
        SITE_CONTENT.sobre.galeria = [];
    }
    SITE_CONTENT.sobre.galeria.push({ id: 'foto_' + Date.now(), image: '', imageAlt: '', caption: '' });
    renderGaleriaEditor();
    liveUpdateSobre();
}

// Remover foto da galeria
function removeGaleriaFoto(idx) {
    if (!SITE_CONTENT.sobre.galeria || !SITE_CONTENT.sobre.galeria[idx]) return;
    if (!confirm(`Remover esta foto da galeria?`)) return;
    SITE_CONTENT.sobre.galeria.splice(idx, 1);
    renderGaleriaEditor();
    liveUpdateSobre();
}

// ============ LIVE PREVIEW FUNCTIONS ============

// Generate a live preview of a section
function generateLivePreview(section) {
    const content = SITE_CONTENT;
    const previewContainer = document.getElementById('live-preview');
    if (!previewContainer) return;
    
    let html = '';
    
    switch(section) {
        case 'hero':
            html = `
                <div class="relative bg-gradient-to-br from-brown-800 to-brown-700 rounded-xl overflow-hidden min-h-[200px]">
                    <div class="absolute inset-0 opacity-30">
                        <img src="${resolveImagePath(content.hero.backgroundImage)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="">
                    </div>
                    <div class="relative p-6 text-white">
                        <h2 class="font-display text-2xl font-medium mb-2">${content.hero.title}</h2>
                        <p class="text-cream-100">${content.hero.subtitle}</p>
                        <p class="text-cream-200 text-sm">${content.hero.subtitleAlt}</p>
                        <div class="flex gap-3 mt-4">
                            <span class="px-4 py-2 bg-gold rounded-full text-sm">${content.hero.ctaPrimary}</span>
                            <span class="px-4 py-2 border-2 border-white rounded-full text-sm">${content.hero.ctaSecondary}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'sobre':
            html = `
                <div class="bg-cream-100 rounded-xl p-6">
                    <div class="flex items-center gap-6">
                        <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-cream-200">
                            <img src="${resolveImagePath(content.sobre.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="" style="object-position: ${(content.sobre.imagePosition?.x ?? 50)}% ${(content.sobre.imagePosition?.y ?? 0)}%;">
                        </div>
                        <div>
                            <span class="text-olive-600 text-xs uppercase tracking-wider">${content.sobre.subtitle}</span>
                            <h3 class="font-display text-2xl text-brown-800">${content.sobre.title}</h3>
                        </div>
                    </div>
                    <p class="text-brown-700 mt-4 text-sm">${content.sobre.description}</p>
                    <p class="text-brown-600 mt-2 text-sm">${content.sobre.description2}</p>
                    <div class="mt-4 space-y-2">
                        ${content.sobre.credentials.map(c => 
                            `<div class="flex items-center gap-2 text-sm">
                                <span class="w-2 h-2 bg-gold rounded-full"></span>
                                <span class="font-medium text-brown-800">${c.title}</span>
                                <span class="text-brown-500">— ${c.subtitle}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            break;
        case 'espaco':
            const posts = content.espaco.posts || [];
            const publishedPosts = posts.filter(p => p.published);
            const sortedPosts = [...publishedPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            if (sortedPosts.length === 0) {
                html = `<div class="bg-cream-200 rounded-xl p-6 text-center"><p class="text-brown-500">Nenhum post publicado.</p></div>`;
            } else {
                html = sortedPosts.map((post, idx) => `
                    <div class="bg-cream-200 rounded-xl p-6 ${idx > 0 ? 'mt-4' : ''}">
                        <span class="text-olive-600 text-xs uppercase tracking-wider">${content.espaco.title}</span>
                        <time class="block text-xs text-brown-500 mt-1">${post.date}</time>
                        <h3 class="font-display text-xl text-brown-800 mt-1">${post.title}</h3>
                        ${post.description ? `<p class="text-brown-700 mt-2 text-sm">${post.description}</p>` : ''}
                        ${post.quote ? `
                        <div class="bg-white rounded-xl p-3 mt-3 border-l-4 border-gold">
                            <p class="font-display text-sm text-brown-700 italic">"${post.quote}"</p>
                            ${post.quoteAuthor ? `<p class="text-brown-600 mt-1 text-xs">— ${post.quoteAuthor}</p>` : ''}
                        </div>
                        ` : ''}
                        ${post.image ? `
                        <div class="mt-3 rounded-lg overflow-hidden h-24">
                            <img src="${resolveImagePath(post.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="">
                        </div>
                        ` : ''}
                    </div>
                `).join('');
            }
            break;
        case 'servicos':
            const services = content.servicos.services || [];
            const showPrices = content.servicos.showPrices;
            let gridCols = 'grid-cols-3';
            if (services.length === 1) gridCols = 'grid-cols-1';
            else if (services.length === 2) gridCols = 'grid-cols-2';
            else if (services.length === 4) gridCols = 'grid-cols-2 lg:grid-cols-4';
            
            html = `
                <div class="bg-white rounded-xl p-6">
                    <h3 class="font-display text-2xl text-brown-800 text-center mb-6">${content.servicos.heading}</h3>
                    <div class="grid ${gridCols} gap-4">
                        ${services.map((s) => {
                            const showPrice = showPrices && s.showPrice;
                            const features = s.features || [];
                            return `
                                <div class="bg-cream-50 rounded-xl p-4 border border-cream-200 flex flex-col">
                                    <h4 class="font-display text-lg text-brown-800">${s.title}</h4>
                                    <p class="text-brown-600 text-xs mt-2 flex-grow">${s.description}</p>
                                    ${showPrice ? `<p class="text-olive-600 font-semibold text-sm mt-2">${s.price}</p>` : ''}
                                    ${features.length > 0 ? `
                                        <div class="mt-3 pt-3 border-t border-cream-200">
                                            <ul class="space-y-1">
                                                ${features.map(f => `
                                                    <li class="flex items-start gap-1.5 text-[10px] text-brown-600">
                                                        <span class="mt-0.5 w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 ring-2 ring-gold-light/30"></span>
                                                        <span>${f}</span>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            break;
        case 'contato':
            html = `
                <div class="bg-cream-200 rounded-xl p-6">
                    <h3 class="font-display text-2xl text-brown-800 text-center">${content.contato.heading}</h3>
                    <p class="text-brown-600 text-center text-sm mt-2">${content.contato.description}</p>
                    <div class="flex justify-center gap-4 mt-4">
                        <div class="flex items-center gap-2 bg-olive-50 rounded-lg px-4 py-2">
                            <span class="text-green-600 text-lg">💬</span>
                            <span class="text-sm text-brown-700 hidden">${content.contato.whatsapp}</span>
                        </div>
                        <div class="flex items-center gap-2 bg-gold-light/30 rounded-lg px-4 py-2">
                            <span class="text-gold text-lg">✉️</span>
                            <span class="text-sm text-brown-700 hidden">${content.contato.email}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    previewContainer.innerHTML = html;
}

// ============ ADMIN PANEL FUNCTIONS ============

// Render content editor in admin panel
function renderContentEditor() {
    const container = document.getElementById('content-editor');
    if (!container) return;
    
    const content = SITE_CONTENT;
    
    container.innerHTML = `
        <!-- Preview Button Bar -->
        <div class="flex items-center justify-between mb-4">
            <h2 class="font-display text-2xl text-brown-800">Editor de Conteúdo</h2>
            <button onclick="openPreviewModal()" class="btn-primary px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Pré-visualizar
            </button>
        </div>
        <div class="space-y-4 editor-section">
                <!-- Hero Section Editor -->
                <div class="bg-cream-50 rounded-xl overflow-hidden">
                    <button onclick="toggleSection('hero-editor')" class="w-full flex items-center justify-between p-4 hover:bg-cream-100 transition">
                        <h3 class="font-display text-lg text-brown-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Seção Hero (Início)
                        </h3>
                        <svg class="w-5 h-5 text-brown-500 transition-transform" id="chevron-hero-editor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="hero-editor" class="px-4 pb-4 space-y-3">
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Título Principal</label>
                            <textarea id="edit-hero-title" rows="2" oninput="liveUpdateHero()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">${escapeHtml(content.hero.title)}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Subtítulo</label>
                            <input type="text" id="edit-hero-subtitle" value="${escapeHtml(content.hero.subtitle)}" oninput="liveUpdateHero()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Subtítulo Alternativo</label>
                            <input type="text" id="edit-hero-subtitle-alt" value="${escapeHtml(content.hero.subtitleAlt)}" oninput="liveUpdateHero()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-brown-700 mb-1">Botão Principal</label>
                                <input type="text" id="edit-hero-cta-primary" value="${escapeHtml(content.hero.ctaPrimary)}" oninput="liveUpdateHero()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-brown-700 mb-1">Botão Secundário</label>
                                <input type="text" id="edit-hero-cta-secondary" value="${escapeHtml(content.hero.ctaSecondary)}" oninput="liveUpdateHero()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Imagem de Fundo</label>
                            <div class="flex gap-2 items-center">
                                <input type="text" id="edit-hero-image" value="${escapeHtml(content.hero.backgroundImage)}" oninput="liveUpdateHero()" class="flex-1 px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none" placeholder="nome-da-imagem.jpg">
                                <button type="button" onclick="previewImageInline('hero')" class="px-3 py-2 bg-olive-100 text-olive-700 rounded-lg hover:bg-olive-200 transition text-xs">Ver</button>
                                <button type="button" onclick="uploadImage('edit-hero-image', 'hero')" class="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-xs flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                    Subir
                                </button>
                            </div>
                            <div id="hero-image-preview" class="mt-2 hidden">
                                <img class="w-full h-24 object-cover rounded-lg" alt="Preview">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sobre Section Editor -->
                <div class="bg-cream-50 rounded-xl overflow-hidden">
                    <button onclick="toggleSection('sobre-editor')" class="w-full flex items-center justify-between p-4 hover:bg-cream-100 transition">
                        <h3 class="font-display text-lg text-brown-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Seção Sobre (Malu)
                        </h3>
                        <svg class="w-5 h-5 text-brown-500 transition-transform" id="chevron-sobre-editor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="sobre-editor" class="px-4 pb-4 space-y-3">
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Nome</label>
                            <input type="text" id="edit-sobre-title" value="${escapeHtml(content.sobre.title)}" oninput="liveUpdateSobre()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Descrição Principal</label>
                            <textarea id="edit-sobre-desc" rows="2" oninput="liveUpdateSobre()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">${escapeHtml(content.sobre.description)}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Descrição Secundária</label>
                            <textarea id="edit-sobre-desc2" rows="2" oninput="liveUpdateSobre()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">${escapeHtml(content.sobre.description2)}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Foto</label>
                            <div class="flex gap-2 items-center">
                                <input type="text" id="edit-sobre-image" value="${escapeHtml(content.sobre.image)}" oninput="liveUpdateSobre()" class="flex-1 px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none" placeholder="nome-da-imagem.jpg">
                                <button type="button" onclick="previewImageInline('sobre')" class="px-3 py-2 bg-olive-100 text-olive-700 rounded-lg hover:bg-olive-200 transition text-xs">Ver</button>
                                <button type="button" onclick="uploadImage('edit-sobre-image', 'sobre')" class="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-xs flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                    Subir
                                </button>
                            </div>
                            <div id="sobre-image-preview" class="mt-2 hidden">
                                <img class="w-20 h-20 object-cover rounded-full" alt="Preview">
                            </div>
                        </div>
                        <!-- Image Position Controls -->
                        <div class="bg-white rounded-lg p-3 border border-cream-200">
                            <label class="block text-xs font-medium text-brown-700 mb-2">Posição da Foto no Círculo</label>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[10px] text-brown-500 mb-1">Horizontal: <span id="sobre-pos-x-val">${(content.sobre.imagePosition?.x ?? 50)}%</span></label>
                                    <input type="range" id="edit-sobre-pos-x" min="0" max="100" value="${content.sobre.imagePosition?.x ?? 50}" oninput="updateImagePosition('sobre')" class="w-full accent-olive-500">
                                </div>
                                <div>
                                    <label class="block text-[10px] text-brown-500 mb-1">Vertical: <span id="sobre-pos-y-val">${(content.sobre.imagePosition?.y ?? 0)}%</span></label>
                                    <input type="range" id="edit-sobre-pos-y" min="0" max="100" value="${content.sobre.imagePosition?.y ?? 0}" oninput="updateImagePosition('sobre')" class="w-full accent-olive-500">
                                </div>
                            </div>
                            <div class="flex justify-center mt-2">
                                <div id="sobre-position-preview" class="w-20 h-20 rounded-full overflow-hidden border-2 border-cream-200 bg-cream-100">
                                    <img src="${resolveImagePath(content.sobre.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="" style="object-position: ${(content.sobre.imagePosition?.x ?? 50)}% ${(content.sobre.imagePosition?.y ?? 0)}%;">
                                </div>
                            </div>
                            <button type="button" onclick="resetImagePosition('sobre')" class="mt-2 text-[10px] text-brown-500 hover:text-brown-700">↺ Restaurar posição</button>
                        </div>
                        <!-- Credentials Editor -->
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-2">Credenciais</label>
                            <div id="credentials-editor" class="space-y-2">
                                ${content.sobre.credentials.map((cred, i) => `
                                    <div class="flex gap-2 items-start">
                                        <div class="flex-1">
                                            <input type="text" id="edit-cred-title-${i}" value="${escapeHtml(cred.title)}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-xs rounded border border-cream-200 mb-1" placeholder="Título">
                                            <input type="text" id="edit-cred-subtitle-${i}" value="${escapeHtml(cred.subtitle)}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-xs rounded border border-cream-200" placeholder="Subtítulo">
                                        </div>
                                        <button type="button" onclick="removeCredential(${i})" class="text-red-500 hover:text-red-700 p-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                            <button type="button" onclick="addCredential()" class="mt-2 text-xs text-olive-600 hover:text-olive-700 font-medium">
                                + Adicionar credencial
                            </button>
                        </div>
                        <!-- Biografia Longa Editor ("Saber Mais") -->
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Biografia Longa (Saber Mais)</label>
                            <textarea id="edit-sobre-bio-longa" rows="6" oninput="liveUpdateSobre()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none" placeholder="Escreva aqui a biografia completa que aparecerá ao clicar em Saber Mais...">${escapeHtml(content.sobre.bioLonga || '')}</textarea>
                        </div>
                        <!-- Galeria de Fotos Editor -->
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-2">Galeria de Fotos (Saber Mais)</label>
                            <div id="galeria-editor" class="grid gap-2">
                                ${(content.sobre.galeria || []).map((foto, i) => renderGaleriaFotoCard(foto, i)).join('')}
                            </div>
                            <button type="button" onclick="addGaleriaFoto()" class="mt-2 w-full py-3 border-2 border-dashed border-cream-300 rounded-xl text-brown-500 hover:text-olive-600 hover:border-olive-300 hover:bg-olive-50/30 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                Adicionar foto à galeria
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Espaço Section Editor (Blog Posts) -->
                <div class="bg-cream-50 rounded-xl overflow-hidden">
                    <button onclick="toggleSection('espaco-editor')" class="w-full flex items-center justify-between p-4 hover:bg-cream-100 transition">
                        <h3 class="font-display text-lg text-brown-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            Seção O Espaço Elêusis (Blog)
                        </h3>
                        <svg class="w-5 h-5 text-brown-500 transition-transform" id="chevron-espaco-editor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="espaco-editor" class="px-4 pb-4 space-y-3">
                        <!-- Toggle de exibição da seção -->
                        <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-cream-200">
                            <div>
                                <p class="text-sm font-medium text-brown-800">Exibir Seção no Site</p>
                                <p class="text-xs text-brown-500">Mostrar ou ocultar toda a seção</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="edit-espaco-show" ${content.espaco.showOnSite ? 'checked' : ''} onchange="liveUpdateEspacoPosts()" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-olive-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-olive-500"></div>
                            </label>
                        </div>
                        
                        <!-- Dynamic Posts Editor -->
                        <div id="espaco-posts-editor-list" class="grid gap-3">
                            ${(content.espaco.posts || []).map((post, idx) => renderPostEditor(post, idx)).join('')}
                        </div>
                        
                        <!-- Add Post Button -->
                        <button type="button" onclick="addEspacoPost()" class="w-full py-3 border-2 border-dashed border-cream-300 rounded-xl text-brown-500 hover:text-olive-600 hover:border-olive-300 hover:bg-olive-50/30 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Adicionar novo post
                        </button>
                    </div>
                </div>
                
                <!-- Serviços Section Editor -->
                <div class="bg-cream-50 rounded-xl overflow-hidden">
                    <button onclick="toggleSection('servicos-editor')" class="w-full flex items-center justify-between p-4 hover:bg-cream-100 transition">
                        <h3 class="font-display text-lg text-brown-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            Seção Serviços
                        </h3>
                        <svg class="w-5 h-5 text-brown-500 transition-transform" id="chevron-servicos-editor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="servicos-editor" class="px-4 pb-4 space-y-3">
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Título da Seção</label>
                            <input type="text" id="edit-servicos-heading" value="${escapeHtml(content.servicos.heading)}" oninput="liveUpdateServicos()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        
                        <!-- Toggle Global de Preços -->
                        <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-cream-200">
                            <div>
                                <p class="text-sm font-medium text-brown-800">Mostrar Preços</p>
                                <p class="text-xs text-brown-500">Toggle global para exibir/ocultar todos os preços</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="edit-show-prices-global" ${content.servicos.showPrices ? 'checked' : ''} onchange="toggleGlobalPrices()" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-olive-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-olive-500"></div>
                            </label>
                        </div>
                        
                        <!-- Dynamic Services Editor -->
                        <div id="services-editor-list" class="grid gap-3">
                            ${(content.servicos.services || []).map((s, idx) => renderServiceEditor(s, idx)).join('')}
                        </div>
                        
                        <!-- Add Service Button -->
                        <button type="button" onclick="addService()" class="w-full py-3 border-2 border-dashed border-cream-300 rounded-xl text-brown-500 hover:text-olive-600 hover:border-olive-300 hover:bg-olive-50/30 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Adicionar Serviço
                        </button>
                    </div>
                </div>
                
                <!-- Contato Section Editor -->
                <div class="bg-cream-50 rounded-xl overflow-hidden">
                    <button onclick="toggleSection('contato-editor')" class="w-full flex items-center justify-between p-4 hover:bg-cream-100 transition">
                        <h3 class="font-display text-lg text-brown-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            Seção Contato
                        </h3>
                        <svg class="w-5 h-5 text-brown-500 transition-transform" id="chevron-contato-editor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="contato-editor" class="px-4 pb-4 space-y-3">
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Título</label>
                            <input type="text" id="edit-contato-heading" value="${escapeHtml(content.contato.heading)}" oninput="liveUpdateContato()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brown-700 mb-1">Descrição</label>
                            <input type="text" id="edit-contato-desc" value="${escapeHtml(content.contato.description)}" oninput="liveUpdateContato()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-brown-700 mb-1">WhatsApp</label>
                                <input type="text" id="edit-contato-whatsapp" value="${escapeHtml(content.contato.whatsapp)}" oninput="liveUpdateContato()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-brown-700 mb-1">Email</label>
                                <input type="email" id="edit-contato-email" value="${escapeHtml(content.contato.email)}" oninput="liveUpdateContato()" class="w-full px-3 py-2 text-sm rounded-lg border border-cream-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-3">
                    <button onclick="saveContentChanges()" class="flex-1 btn-primary py-3 rounded-full font-semibold text-sm">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                            </svg>
                            Salvar Alterações
                        </span>
                    </button>
                    <button onclick="resetContent()" class="border-2 border-red-300 text-red-600 py-3 px-4 rounded-full font-medium hover:bg-red-50 transition text-sm">
                        Restaurar Padrão
                    </button>
                </div>
        </div>
    `;
}

// Render a single galeria foto card
function renderGaleriaFotoCard(foto, i) {
    return `
        <div class="border border-cream-200 rounded-lg p-3 bg-white galeria-card" data-galeria-idx="${i}">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-brown-800">Foto ${i + 1}</span>
                <button type="button" onclick="removeGaleriaFoto(${i})" class="text-red-400 hover:text-red-600 transition p-1" title="Remover foto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
            <div class="flex gap-2 items-center mb-2">
                <input type="text" id="edit-galeria-img-${i}" value="${escapeHtml(foto.image || '')}" oninput="liveUpdateSobre()" class="flex-1 px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="nome-da-imagem.jpg ou data-url">
                <button type="button" onclick="uploadImage('edit-galeria-img-${i}', 'galeria', ${i})" class="px-2 py-1.5 bg-blue-50 text-blue-600 rounded border border-cream-200 hover:bg-blue-100 transition text-xs flex items-center gap-1 flex-shrink-0">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    Subir
                </button>
            </div>
            <input type="text" id="edit-galeria-alt-${i}" value="${escapeHtml(foto.imageAlt || '')}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Texto alternativo (opcional)">
            <input type="text" id="edit-galeria-caption-${i}" value="${escapeHtml(foto.caption || '')}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="Legenda (opcional)">
        </div>
    `;
}

// Render a single post editor card
function renderPostEditor(post, idx) {
    return `
        <div class="border border-cream-200 rounded-lg p-3 bg-white post-editor-card" data-post-idx="${idx}">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-brown-800 text-sm flex items-center gap-2">
                    <span class="w-6 h-6 bg-olive-100 rounded-full flex items-center justify-center text-xs text-olive-700 font-bold">${idx + 1}</span>
                    Post
                </h4>
                <button type="button" onclick="removeEspacoPost(${idx})" class="text-red-400 hover:text-red-600 transition p-1" title="Remover post">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
            <!-- Toggle publicado -->
            <div class="flex items-center justify-between mb-2 px-1">
                <span class="text-xs text-brown-500">Publicado</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="edit-post-published-${idx}" ${post.published ? 'checked' : ''} onchange="liveUpdateEspacoPosts()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-olive-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-olive-500"></div>
                </label>
            </div>
            <div class="mb-2">
                <label class="block text-xs text-brown-600 mb-1">Data</label>
                <input type="date" id="edit-post-date-${idx}" value="${post.date || ''}" oninput="liveUpdateEspacoPosts()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200">
            </div>
            <input type="text" id="edit-post-title-${idx}" value="${escapeHtml(post.title)}" oninput="liveUpdateEspacoPosts()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Título do post">
            <textarea id="edit-post-desc-${idx}" rows="2" oninput="liveUpdateEspacoPosts()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Descrição / conteúdo do post">${escapeHtml(post.description)}</textarea>
            <div class="mb-2">
                <label class="block text-xs text-brown-600 mb-1">Citação (opcional)</label>
                <textarea id="edit-post-quote-${idx}" rows="2" oninput="liveUpdateEspacoPosts()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-1" placeholder="Texto da citação">${escapeHtml(post.quote || '')}</textarea>
                <input type="text" id="edit-post-quote-author-${idx}" value="${escapeHtml(post.quoteAuthor || '')}" oninput="liveUpdateEspacoPosts()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="Autor da citação">
            </div>
            <div>
                <label class="block text-xs text-brown-600 mb-1">Imagem (opcional)</label>
                <div class="flex gap-2 items-center">
                    <input type="text" id="edit-post-image-${idx}" value="${escapeHtml(post.image || '')}" oninput="liveUpdateEspacoPosts()" class="flex-1 px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="nome-da-imagem.jpg">
                    <input type="text" id="edit-post-image-alt-${idx}" value="${escapeHtml(post.imageAlt || '')}" oninput="liveUpdateEspacoPosts()" class="flex-1 px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="Texto alternativo">
                    <button type="button" onclick="uploadImage('edit-post-image-${idx}', 'post', ${idx})" class="px-2 py-1.5 bg-blue-50 text-blue-600 rounded border border-cream-200 hover:bg-blue-100 transition text-xs flex items-center gap-1 flex-shrink-0">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                        Subir
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render a single service editor card
function renderServiceEditor(service, idx) {
    const features = service.features || [];
    return `
        <div class="border border-cream-200 rounded-lg p-3 bg-white service-editor-card" data-service-idx="${idx}">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-brown-800 text-sm flex items-center gap-2">
                    <span class="w-6 h-6 bg-olive-100 rounded-full flex items-center justify-center text-xs text-olive-700 font-bold">${idx + 1}</span>
                    Serviço
                </h4>
                <button type="button" onclick="removeService(${idx})" class="text-red-400 hover:text-red-600 transition p-1" title="Remover serviço">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
            <!-- Toggle individual de preço -->
            <div class="flex items-center justify-between mb-2 px-1">
                <span class="text-xs text-brown-500">Exibir Preço</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="edit-service-show-price-${idx}" ${service.showPrice ? 'checked' : ''} onchange="liveUpdateServicos()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-olive-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-olive-500"></div>
                </label>
            </div>
            <input type="text" id="edit-service-title-${idx}" value="${escapeHtml(service.title)}" oninput="liveUpdateServicos()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Título do serviço">
            <textarea id="edit-service-desc-${idx}" rows="2" oninput="liveUpdateServicos()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200 mb-2" placeholder="Descrição do serviço">${escapeHtml(service.description)}</textarea>
            <div class="mb-2">
                <label class="block text-xs text-brown-600 mb-1">Preço</label>
                <input type="text" id="edit-service-price-${idx}" value="${escapeHtml(service.price || '')}" oninput="liveUpdateServicos()" class="w-full px-2 py-1.5 text-sm rounded border border-cream-200" placeholder="Ex: R$ 250">
            </div>
            <div>
                <label class="block text-xs text-brown-600 mb-1">Características</label>
                <div id="features-service-${idx}" class="space-y-1">
                    ${features.map((f, fi) => `
                        <div class="flex gap-1 items-center">
                            <input type="text" id="edit-service-feature-${idx}-${fi}" value="${escapeHtml(f)}" oninput="liveUpdateServicos()" class="flex-1 px-2 py-1 text-xs rounded border border-cream-200" placeholder="Característica">
                            <button type="button" onclick="removeFeature(${idx}, ${fi})" class="text-red-500 hover:text-red-700">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button type="button" onclick="addFeature(${idx})" class="mt-1 text-xs text-olive-600 hover:text-olive-700 font-medium">
                    + Adicionar característica
                </button>
            </div>
        </div>
    `;
}

// ============ SECTION TOGGLE FUNCTIONS ============

function toggleSection(id) {
    const section = document.getElementById(id);
    const chevron = document.getElementById(`chevron-${id}`);
    if (section && chevron) {
        const isHidden = section.style.display === 'none' || section.style.display === '';
        section.style.display = isHidden ? 'block' : 'none';
        chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

// ============ LIVE UPDATE FUNCTIONS ============

function liveUpdateHero() {
    SITE_CONTENT.hero.title = document.getElementById('edit-hero-title').value;
    SITE_CONTENT.hero.subtitle = document.getElementById('edit-hero-subtitle').value;
    SITE_CONTENT.hero.subtitleAlt = document.getElementById('edit-hero-subtitle-alt').value;
    SITE_CONTENT.hero.ctaPrimary = document.getElementById('edit-hero-cta-primary').value;
    SITE_CONTENT.hero.ctaSecondary = document.getElementById('edit-hero-cta-secondary').value;
    SITE_CONTENT.hero.backgroundImage = document.getElementById('edit-hero-image').value;
    generateLivePreview('hero');
}

function liveUpdateSobre() {
    SITE_CONTENT.sobre.title = document.getElementById('edit-sobre-title').value;
    SITE_CONTENT.sobre.description = document.getElementById('edit-sobre-desc').value;
    SITE_CONTENT.sobre.description2 = document.getElementById('edit-sobre-desc2').value;
    SITE_CONTENT.sobre.image = document.getElementById('edit-sobre-image').value;
    // Read image position
    const posXEl = document.getElementById('edit-sobre-pos-x');
    const posYEl = document.getElementById('edit-sobre-pos-y');
    if (posXEl && posYEl) {
        SITE_CONTENT.sobre.imagePosition = {
            x: parseInt(posXEl.value),
            y: parseInt(posYEl.value)
        };
    }
    // Update credentials
    const credCount = document.querySelectorAll('#credentials-editor > div').length;
    SITE_CONTENT.sobre.credentials = [];
    for (let i = 0; i < credCount; i++) {
        const titleEl = document.getElementById(`edit-cred-title-${i}`);
        const subtitleEl = document.getElementById(`edit-cred-subtitle-${i}`);
        if (titleEl && subtitleEl) {
            SITE_CONTENT.sobre.credentials.push({
                title: titleEl.value,
                subtitle: subtitleEl.value
            });
        }
    }
    // Update biografia longa
    const bioLongaEl = document.getElementById('edit-sobre-bio-longa');
    if (bioLongaEl) {
        SITE_CONTENT.sobre.bioLonga = bioLongaEl.value;
    }
    // Update galeria
    const galeriaCards = document.querySelectorAll('#galeria-editor .galeria-card');
    SITE_CONTENT.sobre.galeria = Array.from(galeriaCards).map((card, i) => {
        const existing = SITE_CONTENT.sobre.galeria?.[i] || { id: 'foto_' + Date.now() + i };
        return {
            id: existing.id,
            image: document.getElementById(`edit-galeria-img-${i}`)?.value || '',
            imageAlt: document.getElementById(`edit-galeria-alt-${i}`)?.value || '',
            caption: document.getElementById(`edit-galeria-caption-${i}`)?.value || ''
        };
    });
    generateLivePreview('sobre');
}

function liveUpdateEspacoPosts() {
    SITE_CONTENT.espaco.showOnSite = document.getElementById('edit-espaco-show').checked;
    
    // Read all posts from the editor
    const postCards = document.querySelectorAll('#espaco-posts-editor-list .post-editor-card');
    SITE_CONTENT.espaco.posts = Array.from(postCards).map((card, idx) => {
        const existing = SITE_CONTENT.espaco.posts[idx] || { id: 'post_' + Date.now() + idx };
        return {
            id: existing.id,
            title: document.getElementById(`edit-post-title-${idx}`)?.value || '',
            description: document.getElementById(`edit-post-desc-${idx}`)?.value || '',
            quote: document.getElementById(`edit-post-quote-${idx}`)?.value || '',
            quoteAuthor: document.getElementById(`edit-post-quote-author-${idx}`)?.value || '',
            image: document.getElementById(`edit-post-image-${idx}`)?.value || '',
            imageAlt: document.getElementById(`edit-post-image-alt-${idx}`)?.value || '',
            date: document.getElementById(`edit-post-date-${idx}`)?.value || new Date().toISOString().split('T')[0],
            published: document.getElementById(`edit-post-published-${idx}`)?.checked || false
        };
    });
    
    generateLivePreview('espaco');
}

function liveUpdateServicos() {
    SITE_CONTENT.servicos.heading = document.getElementById('edit-servicos-heading').value;
    SITE_CONTENT.servicos.showPrices = document.getElementById('edit-show-prices-global').checked;
    
    // Read all services from the editor
    const serviceCards = document.querySelectorAll('#services-editor-list .service-editor-card');
    SITE_CONTENT.servicos.services = Array.from(serviceCards).map((card, idx) => {
        const service = SITE_CONTENT.servicos.services[idx] || { id: 's' + Date.now() + idx, icon: 'custom' };
        return {
            id: service.id,
            icon: service.icon || 'custom',
            title: document.getElementById(`edit-service-title-${idx}`)?.value || '',
            description: document.getElementById(`edit-service-desc-${idx}`)?.value || '',
            price: document.getElementById(`edit-service-price-${idx}`)?.value || '',
            showPrice: document.getElementById(`edit-service-show-price-${idx}`)?.checked || false,
            features: readFeatures(idx)
        };
    });
    
    generateLivePreview('servicos');
}

// Read features from editor for a given service index
function readFeatures(serviceIdx) {
    const container = document.getElementById(`features-service-${serviceIdx}`);
    if (!container) return [];
    const inputs = container.querySelectorAll('input[type="text"]');
    return Array.from(inputs).map(inp => inp.value).filter(f => f.trim() !== '');
}

function liveUpdateContato() {
    SITE_CONTENT.contato.heading = document.getElementById('edit-contato-heading').value;
    SITE_CONTENT.contato.description = document.getElementById('edit-contato-desc').value;
    SITE_CONTENT.contato.whatsapp = document.getElementById('edit-contato-whatsapp').value;
    SITE_CONTENT.contato.email = document.getElementById('edit-contato-email').value;
    generateLivePreview('contato');
}

// Update image position from sliders
function updateImagePosition(section) {
    const posXEl = document.getElementById(`edit-${section}-pos-x`);
    const posYEl = document.getElementById(`edit-${section}-pos-y`);
    if (!posXEl || !posYEl) return;
    const x = parseInt(posXEl.value);
    const y = parseInt(posYEl.value);
    const xVal = document.getElementById(`${section}-pos-x-val`);
    const yVal = document.getElementById(`${section}-pos-y-val`);
    if (xVal) xVal.textContent = x + '%';
    if (yVal) yVal.textContent = y + '%';
    const previewImg = document.querySelector(`#${section}-position-preview img`);
    if (previewImg) {
        previewImg.style.objectPosition = `${x}% ${y}%`;
        const imgInput = document.getElementById(`edit-${section}-image`);
        if (imgInput) previewImg.src = resolveImagePath(imgInput.value);
    }
    if (section === 'sobre') liveUpdateSobre();
}

// Reset image position to default
function resetImagePosition(section) {
    const defaults = { sobre: { x: 50, y: 0 } };
    const def = defaults[section] || { x: 50, y: 50 };
    const posXEl = document.getElementById(`edit-${section}-pos-x`);
    const posYEl = document.getElementById(`edit-${section}-pos-y`);
    if (posXEl) posXEl.value = def.x;
    if (posYEl) posYEl.value = def.y;
    updateImagePosition(section);
}

// ============ PREVIEW FUNCTIONS ============

function previewSection(section) {
    generateLivePreview(section);
}

// Preview image inline
function previewImageInline(section) {
    const imageInput = document.getElementById(`edit-${section}-image`);
    const preview = document.getElementById(`${section}-image-preview`);
    if (imageInput && preview) {
        const imageName = imageInput.value;
        if (imageName) {
            const img = preview.querySelector('img');
            if (img) {
                img.src = resolveImagePath(imageName);
                img.onerror = function() {
                    this.src = '';
                    this.alt = 'Imagem não encontrada';
                };
            }
            preview.classList.remove('hidden');
        } else {
            alert('Por favor, insira o nome da imagem primeiro.');
        }
    }
}

// ============ IMAGE UPLOAD FUNCTIONS ============

// Resolve image path for admin context (admin is in subfolder)
function resolveImagePath(src) {
    if (!src) return '';
    // Data URLs and absolute URLs work as-is
    if (src.startsWith('data:') || src.startsWith('http') || src.startsWith('//') || src.startsWith('/')) {
        return src;
    }
    // In admin subfolder, relative paths need ../ prefix
    if (window.location.pathname.includes('/admin/')) {
        return '../' + src;
    }
    return src;
}

// Compress and resize image before storing as base64
function compressImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            let canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height = Math.round((maxWidth / width) * height);
                width = maxWidth;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            callback(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Open file picker and upload image
function uploadImage(targetInputId, section, postIdx) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        // Compress image: max 800px wide, JPEG quality 0.85
        compressImage(file, 800, 0.85, function(dataUrl) {
            const input = document.getElementById(targetInputId);
            if (input) {
                input.value = dataUrl;
                // Trigger the appropriate live update
                if (section === 'hero') {
                    liveUpdateHero();
                    previewImageInline('hero');
                } else if (section === 'sobre') {
                    liveUpdateSobre();
                    previewImageInline('sobre');
                } else if (section === 'post') {
                    liveUpdateEspacoPosts();
                } else if (section === 'galeria') {
                    liveUpdateSobre();
                }
                showToast('Imagem carregada. Clique em "Salvar Alterações" para confirmar.', 'success');
            }
        });
        document.body.removeChild(fileInput);
    };
    document.body.appendChild(fileInput);
    fileInput.click();
}

// ============ ESPAÇO POSTS MANAGEMENT ============

// Add a new post
function addEspacoPost() {
    if (!SITE_CONTENT.espaco.posts) {
        SITE_CONTENT.espaco.posts = [];
    }
    const today = new Date().toISOString().split('T')[0];
    const newPost = {
        id: 'post_' + Date.now(),
        title: 'Novo Post',
        description: 'Descrição do post',
        quote: '',
        quoteAuthor: '',
        image: '',
        imageAlt: '',
        date: today,
        published: true
    };
    SITE_CONTENT.espaco.posts.push(newPost);
    
    // Re-render the posts editor
    const list = document.getElementById('espaco-posts-editor-list');
    if (list) {
        list.innerHTML = SITE_CONTENT.espaco.posts.map((p, idx) => renderPostEditor(p, idx)).join('');
    }
    
    liveUpdateEspacoPosts();
    showToast('Post adicionado. Preencha os detalhes e salve.', 'success');
}

// Remove a post
function removeEspacoPost(idx) {
    if (!SITE_CONTENT.espaco.posts || !SITE_CONTENT.espaco.posts[idx]) return;
    
    if (SITE_CONTENT.espaco.posts.length <= 1) {
        showToast('É necessário ter pelo menos um post.', 'error');
        return;
    }
    
    if (!confirm(`Remover "${SITE_CONTENT.espaco.posts[idx].title}"?`)) return;
    
    SITE_CONTENT.espaco.posts.splice(idx, 1);
    
    // Re-render the posts editor
    const list = document.getElementById('espaco-posts-editor-list');
    if (list) {
        list.innerHTML = SITE_CONTENT.espaco.posts.map((p, i) => renderPostEditor(p, i)).join('');
    }
    
    liveUpdateEspacoPosts();
    showToast('Post removido.', 'success');
}

// ============ SERVICES MANAGEMENT ============

// Add a new service
function addService() {
    if (!SITE_CONTENT.servicos.services) {
        SITE_CONTENT.servicos.services = [];
    }
    const newService = {
        id: 's' + Date.now(),
        title: 'Novo Serviço',
        description: 'Descrição do serviço',
        price: 'R$ 0',
        showPrice: true,
        icon: 'custom',
        features: ['Característica 1', 'Característica 2']
    };
    SITE_CONTENT.servicos.services.push(newService);
    
    // Re-render the services editor
    const list = document.getElementById('services-editor-list');
    if (list) {
        list.innerHTML = SITE_CONTENT.servicos.services.map((s, idx) => renderServiceEditor(s, idx)).join('');
    }
    
    liveUpdateServicos();
    showToast('Serviço adicionado. Preencha os detalhes e salve.', 'success');
}

// Remove a service
function removeService(idx) {
    if (!SITE_CONTENT.servicos.services || !SITE_CONTENT.servicos.services[idx]) return;
    
    if (SITE_CONTENT.servicos.services.length <= 1) {
        showToast('É necessário ter pelo menos um serviço.', 'error');
        return;
    }
    
    if (!confirm(`Remover "${SITE_CONTENT.servicos.services[idx].title}"?`)) return;
    
    SITE_CONTENT.servicos.services.splice(idx, 1);
    
    // Re-render the services editor
    const list = document.getElementById('services-editor-list');
    if (list) {
        list.innerHTML = SITE_CONTENT.servicos.services.map((s, i) => renderServiceEditor(s, i)).join('');
    }
    
    liveUpdateServicos();
    showToast('Serviço removido.', 'success');
}

// ============ FEATURES MANAGEMENT ============

function addFeature(serviceIdx) {
    const container = document.getElementById(`features-service-${serviceIdx}`);
    if (!container) return;
    const idx = container.children.length;
    const div = document.createElement('div');
    div.className = 'flex gap-1 items-center';
    div.innerHTML = `
        <input type="text" id="edit-service-feature-${serviceIdx}-${idx}" oninput="liveUpdateServicos()" class="flex-1 px-2 py-1 text-xs rounded border border-cream-200" placeholder="Característica">
        <button type="button" onclick="removeFeature(${serviceIdx}, ${idx})" class="text-red-500 hover:text-red-700">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;
    container.appendChild(div);
    liveUpdateServicos();
}

function removeFeature(serviceIdx, featureIdx) {
    const container = document.getElementById(`features-service-${serviceIdx}`);
    if (container && container.children[featureIdx]) {
        container.children[featureIdx].remove();
        // Re-index
        Array.from(container.children).forEach((child, i) => {
            const input = child.querySelector('input');
            const btn = child.querySelector('button');
            if (input) input.id = `edit-service-feature-${serviceIdx}-${i}`;
            if (btn) btn.setAttribute('onclick', `removeFeature(${serviceIdx}, ${i})`);
        });
        liveUpdateServicos();
    }
}

// ============ CREDENTIALS MANAGEMENT ============

function addCredential() {
    const container = document.getElementById('credentials-editor');
    if (!container) return;
    const idx = container.children.length;
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-start';
    div.innerHTML = `
        <div class="flex-1">
            <input type="text" id="edit-cred-title-${idx}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-xs rounded border border-cream-200 mb-1" placeholder="Título">
            <input type="text" id="edit-cred-subtitle-${idx}" oninput="liveUpdateSobre()" class="w-full px-2 py-1.5 text-xs rounded border border-cream-200" placeholder="Subtítulo">
        </div>
        <button type="button" onclick="removeCredential(${idx})" class="text-red-500 hover:text-red-700 p-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;
    container.appendChild(div);
    liveUpdateSobre();
}

function removeCredential(idx) {
    const container = document.getElementById('credentials-editor');
    if (container && container.children[idx]) {
        container.children[idx].remove();
        // Re-index
        Array.from(container.children).forEach((child, i) => {
            const titleInput = child.querySelector('input[id^="edit-cred-title-"]');
            const subtitleInput = child.querySelector('input[id^="edit-cred-subtitle-"]');
            const btn = child.querySelector('button');
            if (titleInput) titleInput.id = `edit-cred-title-${i}`;
            if (subtitleInput) subtitleInput.id = `edit-cred-subtitle-${i}`;
            if (btn) btn.setAttribute('onclick', `removeCredential(${i})`);
        });
        liveUpdateSobre();
    }
}

// ============ TOGGLE PRICES ============

function toggleGlobalPrices() {
    const globalToggle = document.getElementById('edit-show-prices-global');
    const isChecked = globalToggle.checked;
    // Update individual toggles to match global
    const services = SITE_CONTENT.servicos.services || [];
    services.forEach((_, idx) => {
        const individualToggle = document.getElementById(`edit-service-show-price-${idx}`);
        if (individualToggle) {
            individualToggle.checked = isChecked;
        }
    });
    liveUpdateServicos();
}

// ============ SAVE / RESET FUNCTIONS ============

// Save content changes
function saveContentChanges() {
    // Update hero content
    SITE_CONTENT.hero.title = document.getElementById('edit-hero-title').value;
    SITE_CONTENT.hero.subtitle = document.getElementById('edit-hero-subtitle').value;
    SITE_CONTENT.hero.subtitleAlt = document.getElementById('edit-hero-subtitle-alt').value;
    SITE_CONTENT.hero.ctaPrimary = document.getElementById('edit-hero-cta-primary').value;
    SITE_CONTENT.hero.ctaSecondary = document.getElementById('edit-hero-cta-secondary').value;
    SITE_CONTENT.hero.backgroundImage = document.getElementById('edit-hero-image').value;
    
    // Update sobre content
    SITE_CONTENT.sobre.title = document.getElementById('edit-sobre-title').value;
    SITE_CONTENT.sobre.description = document.getElementById('edit-sobre-desc').value;
    SITE_CONTENT.sobre.description2 = document.getElementById('edit-sobre-desc2').value;
    SITE_CONTENT.sobre.image = document.getElementById('edit-sobre-image').value;
    // Save image position
    const posXEl = document.getElementById('edit-sobre-pos-x');
    const posYEl = document.getElementById('edit-sobre-pos-y');
    if (posXEl && posYEl) {
        SITE_CONTENT.sobre.imagePosition = {
            x: parseInt(posXEl.value),
            y: parseInt(posYEl.value)
        };
    }
    
    // Update credentials
    const credCount = document.querySelectorAll('#credentials-editor > div').length;
    SITE_CONTENT.sobre.credentials = [];
    for (let i = 0; i < credCount; i++) {
        const titleEl = document.getElementById(`edit-cred-title-${i}`);
        const subtitleEl = document.getElementById(`edit-cred-subtitle-${i}`);
        if (titleEl && subtitleEl) {
            SITE_CONTENT.sobre.credentials.push({
                title: titleEl.value,
                subtitle: subtitleEl.value
            });
        }
    }
    
    // Update biografia longa
    const bioLongaEl = document.getElementById('edit-sobre-bio-longa');
    if (bioLongaEl) {
        SITE_CONTENT.sobre.bioLonga = bioLongaEl.value;
    }
    
    // Update galeria
    const galeriaCards = document.querySelectorAll('#galeria-editor .galeria-card');
    SITE_CONTENT.sobre.galeria = Array.from(galeriaCards).map((card, i) => {
        const existing = SITE_CONTENT.sobre.galeria?.[i] || { id: 'foto_' + Date.now() + i };
        return {
            id: existing.id,
            image: document.getElementById(`edit-galeria-img-${i}`)?.value || '',
            imageAlt: document.getElementById(`edit-galeria-alt-${i}`)?.value || '',
            caption: document.getElementById(`edit-galeria-caption-${i}`)?.value || ''
        };
    });
    
    // Update espaco posts content (read from editor)
    SITE_CONTENT.espaco.showOnSite = document.getElementById('edit-espaco-show').checked;
    const postCards = document.querySelectorAll('#espaco-posts-editor-list .post-editor-card');
    SITE_CONTENT.espaco.posts = Array.from(postCards).map((card, idx) => {
        const existing = SITE_CONTENT.espaco.posts[idx] || { id: 'post_' + Date.now() + idx };
        return {
            id: existing.id,
            title: document.getElementById(`edit-post-title-${idx}`)?.value || '',
            description: document.getElementById(`edit-post-desc-${idx}`)?.value || '',
            quote: document.getElementById(`edit-post-quote-${idx}`)?.value || '',
            quoteAuthor: document.getElementById(`edit-post-quote-author-${idx}`)?.value || '',
            image: document.getElementById(`edit-post-image-${idx}`)?.value || '',
            imageAlt: document.getElementById(`edit-post-image-alt-${idx}`)?.value || '',
            date: document.getElementById(`edit-post-date-${idx}`)?.value || new Date().toISOString().split('T')[0],
            published: document.getElementById(`edit-post-published-${idx}`)?.checked || false
        };
    });
    
    // Update servicos content (read from editor)
    SITE_CONTENT.servicos.heading = document.getElementById('edit-servicos-heading').value;
    SITE_CONTENT.servicos.showPrices = document.getElementById('edit-show-prices-global').checked;
    
    const serviceCards = document.querySelectorAll('#services-editor-list .service-editor-card');
    SITE_CONTENT.servicos.services = Array.from(serviceCards).map((card, idx) => {
        const existing = SITE_CONTENT.servicos.services[idx] || {};
        return {
            id: existing.id || 's' + Date.now() + idx,
            icon: existing.icon || 'custom',
            title: document.getElementById(`edit-service-title-${idx}`)?.value || '',
            description: document.getElementById(`edit-service-desc-${idx}`)?.value || '',
            price: document.getElementById(`edit-service-price-${idx}`)?.value || '',
            showPrice: document.getElementById(`edit-service-show-price-${idx}`)?.checked || false,
            features: readFeatures(idx)
        };
    });
    
    // Update contato content
    SITE_CONTENT.contato.heading = document.getElementById('edit-contato-heading').value;
    SITE_CONTENT.contato.description = document.getElementById('edit-contato-desc').value;
    SITE_CONTENT.contato.whatsapp = document.getElementById('edit-contato-whatsapp').value;
    SITE_CONTENT.contato.email = document.getElementById('edit-contato-email').value;
    
    // Save to localStorage (backup)
    saveContent(SITE_CONTENT);
    
    // Save to server (so all visitors see the same content)
    saveContentToServer(SITE_CONTENT);
    
    // Apply to site
    applyContentToSite();
    
    // Update WhatsApp link
    updateWhatsAppLink();
    
    // Update email link
    updateEmailLink();
    
    // Show success toast
    showToast('Conteúdo salvo com sucesso!', 'success');
}

// Save content to server
async function saveContentToServer(content) {
    // Trigger download of site-content.json
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "site-content.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast('Arquivo site-content.json baixado. Substitua o arquivo original com ele.', 'success');
    return true;
}

// Show toast notification
function showToast(message, type = 'success') {
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `admin-toast fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Update WhatsApp link
function updateWhatsAppLink() {
    const whatsappLink = document.querySelector('a[href^="https://wa.me"]');
    if (whatsappLink) {
        const phone = SITE_CONTENT.contato.whatsapp.replace(/\D/g, '');
        whatsappLink.href = `https://wa.me/${phone}?text=Ol%C3%A1%2C%20Malu.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20agendar%20uma%20sess%C3%A3o.`;
    }
    
    const whatsappText = document.querySelector('#contato a[href^="https://wa.me"] .text-brown-600');
    if (whatsappText) {
        whatsappText.textContent = SITE_CONTENT.contato.whatsapp;
    }
}

// Update email link
function updateEmailLink() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.href = `mailto:${SITE_CONTENT.contato.email}`;
    }
    
    const emailText = document.querySelector('#contato a[href^="mailto:"] .text-brown-600');
    if (emailText) {
        emailText.textContent = SITE_CONTENT.contato.email;
    }
}

// Reset content to defaults
function resetContent() {
    if (confirm('Tem certeza que deseja restaurar o conteúdo padrão? Todas as alterações serão perdidas.')) {
        SITE_CONTENT = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
        saveContent(SITE_CONTENT);
        applyContentToSite();
        renderContentEditor();
        showToast('Conteúdo restaurado para o padrão.', 'success');
    }
}

// ============ PREVIEW MODAL FUNCTIONS ============

// Open preview modal
function openPreviewModal() {
    // Remove existing modal if any
    const existing = document.querySelector('.preview-modal-overlay');
    if (existing) existing.remove();
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'preview-modal-overlay fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4';
    overlay.onclick = function(e) {
        if (e.target === overlay) closePreviewModal();
    };
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'preview-modal bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden';
    
    modal.innerHTML = `
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-cream-200">
            <h3 class="font-display text-xl text-brown-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Pré-visualização
            </h3>
            <div class="flex items-center gap-2">
                <div class="flex gap-1 preview-buttons">
                    <button onclick="previewModalSection('hero')" class="px-3 py-1.5 text-xs rounded-full bg-cream-100 text-brown-700 hover:bg-cream-200 transition font-medium">Hero</button>
                    <button onclick="previewModalSection('sobre')" class="px-3 py-1.5 text-xs rounded-full bg-cream-100 text-brown-700 hover:bg-cream-200 transition font-medium">Sobre</button>
                    <button onclick="previewModalSection('espaco')" class="px-3 py-1.5 text-xs rounded-full bg-cream-100 text-brown-700 hover:bg-cream-200 transition font-medium">Espaço</button>
                    <button onclick="previewModalSection('servicos')" class="px-3 py-1.5 text-xs rounded-full bg-cream-100 text-brown-700 hover:bg-cream-200 transition font-medium">Serviços</button>
                    <button onclick="previewModalSection('contato')" class="px-3 py-1.5 text-xs rounded-full bg-cream-100 text-brown-700 hover:bg-cream-200 transition font-medium">Contato</button>
                </div>
                <button onclick="closePreviewModal()" class="p-2 hover:bg-cream-100 rounded-full transition">
                    <svg class="w-5 h-5 text-brown-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Modal Body -->
        <div id="preview-modal-body" class="p-6 overflow-y-auto">
            <div class="flex items-center justify-center h-full text-brown-400">
                <p class="text-sm">Clique em uma seção acima para ver a pré-visualização</p>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Show first section by default
    setTimeout(() => previewModalSection('hero'), 100);
}

// Close preview modal
function closePreviewModal() {
    const overlay = document.querySelector('.preview-modal-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
    }
}

// Preview section inside modal
function previewModalSection(section) {
    const content = SITE_CONTENT;
    const body = document.getElementById('preview-modal-body');
    if (!body) return;
    
    let html = '';
    
    switch(section) {
        case 'hero':
            html = `
                <div class="relative bg-gradient-to-br from-brown-800 to-brown-700 rounded-xl overflow-hidden min-h-[250px]">
                    <div class="absolute inset-0 opacity-30">
                        <img src="${resolveImagePath(content.hero.backgroundImage)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="">
                    </div>
                    <div class="relative p-8 text-white">
                        <h2 class="font-display text-3xl font-medium mb-3">${content.hero.title}</h2>
                        <p class="text-cream-100 text-lg">${content.hero.subtitle}</p>
                        <p class="text-cream-200">${content.hero.subtitleAlt}</p>
                        <div class="flex gap-3 mt-6">
                            <span class="px-6 py-2.5 bg-gold rounded-full text-sm font-medium">${content.hero.ctaPrimary}</span>
                            <span class="px-6 py-2.5 border-2 border-white rounded-full text-sm font-medium">${content.hero.ctaSecondary}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'sobre':
            html = `
                <div class="bg-cream-100 rounded-xl p-8">
                    <div class="flex items-center gap-6">
                        <div class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-cream-200">
                            <img src="${resolveImagePath(content.sobre.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="" style="object-position: ${(content.sobre.imagePosition?.x ?? 50)}% ${(content.sobre.imagePosition?.y ?? 0)}%;">
                        </div>
                        <div>
                            <span class="text-olive-600 text-xs uppercase tracking-wider">${content.sobre.subtitle}</span>
                            <h3 class="font-display text-3xl text-brown-800">${content.sobre.title}</h3>
                        </div>
                    </div>
                    <p class="text-brown-700 mt-4">${content.sobre.description}</p>
                    <p class="text-brown-600 mt-2">${content.sobre.description2}</p>
                    <div class="mt-6 space-y-3">
                        ${content.sobre.credentials.map(c => 
                            `<div class="flex items-center gap-2">
                                <span class="w-2 h-2 bg-gold rounded-full"></span>
                                <span class="font-medium text-brown-800">${c.title}</span>
                                <span class="text-brown-500">— ${c.subtitle}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            break;
        case 'espaco':
            const posts = content.espaco.posts || [];
            const publishedPosts = posts.filter(p => p.published);
            const sortedPosts = [...publishedPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            if (sortedPosts.length === 0) {
                html = `<div class="bg-cream-200 rounded-xl p-8 text-center"><p class="text-brown-500">Nenhum post publicado.</p></div>`;
            } else {
                html = sortedPosts.map((post, idx) => `
                    <div class="bg-cream-200 rounded-xl p-8 ${idx > 0 ? 'mt-6' : ''}">
                        <span class="text-olive-600 text-xs uppercase tracking-wider">${content.espaco.title}</span>
                        <time class="block text-sm text-brown-500 mt-1">${new Date(post.date + 'T00:00:00').toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        <h3 class="font-display text-3xl text-brown-800 mt-2">${post.title}</h3>
                        ${post.description ? `<p class="text-brown-700 mt-3">${post.description}</p>` : ''}
                        ${post.quote ? `
                        <div class="bg-white rounded-xl p-6 mt-6 border-l-4 border-gold">
                            <p class="font-display text-xl text-brown-700 italic">"${post.quote}"</p>
                            ${post.quoteAuthor ? `<p class="text-brown-600 mt-2">— ${post.quoteAuthor}</p>` : ''}
                        </div>
                        ` : ''}
                        ${post.image ? `
                        <div class="mt-6 rounded-xl overflow-hidden h-48">
                            <img src="${resolveImagePath(post.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'" alt="${post.imageAlt || ''}">
                        </div>
                        ` : ''}
                    </div>
                `).join('');
            }
            break;
        case 'servicos':
            const services = content.servicos.services || [];
            const showPrices = content.servicos.showPrices;
            let gridCols = 'grid-cols-3';
            if (services.length === 1) gridCols = 'grid-cols-1';
            else if (services.length === 2) gridCols = 'grid-cols-2';
            else if (services.length === 4) gridCols = 'grid-cols-2 lg:grid-cols-4';
            
            html = `
                <div class="bg-white rounded-xl p-8">
                    <h3 class="font-display text-3xl text-brown-800 text-center mb-8">${content.servicos.heading}</h3>
                    <div class="grid ${gridCols} gap-6">
                        ${services.map((s) => {
                            const showPrice = showPrices && s.showPrice;
                            const features = s.features || [];
                            return `
                                <div class="bg-cream-50 rounded-xl p-6 border border-cream-200 flex flex-col">
                                    <h4 class="font-display text-xl text-brown-800">${s.title}</h4>
                                    <p class="text-brown-600 text-sm mt-2 flex-grow">${s.description}</p>
                                    ${showPrice ? `<p class="text-olive-600 font-semibold mt-3 text-lg">${s.price}</p>` : ''}
                                    ${features.length > 0 ? `
                                        <div class="mt-4 pt-4 border-t border-cream-200">
                                            <ul class="space-y-1.5">
                                                ${features.map(f => `
                                                    <li class="flex items-start gap-2 text-xs text-brown-600">
                                                        <span class="mt-1 w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 ring-2 ring-gold-light/30"></span>
                                                        <span>${f}</span>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            break;
        case 'contato':
            html = `
                <div class="bg-cream-200 rounded-xl p-8">
                    <h3 class="font-display text-3xl text-brown-800 text-center">${content.contato.heading}</h3>
                    <p class="text-brown-600 text-center mt-2">${content.contato.description}</p>
                    <div class="flex justify-center gap-6 mt-6">
                        <div class="flex items-center gap-3 bg-olive-50 rounded-xl px-6 py-3">
                            <span class="text-green-600 text-xl">💬</span>
                            <span class="text-brown-700 hidden">${content.contato.whatsapp}</span>
                        </div>
                        <div class="flex items-center gap-3 bg-gold-light/30 rounded-xl px-6 py-3">
                            <span class="text-gold text-xl">✉️</span>
                            <span class="text-brown-700 hidden">${content.contato.email}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    body.innerHTML = html;
}

// ============ UTILITY FUNCTIONS ============

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&')
              .replace(/</g, '<')
              .replace(/>/g, '>')
              .replace(/"/g, '"')
              .replace(/'/g, '&#039;');
}

// Export functions to global scope
window.initContentManagement = initContentManagement;
window.applyContent = applyContent;
window.renderContentEditor = renderContentEditor;
window.saveContentChanges = saveContentChanges;
window.resetContent = resetContent;
window.toggleSection = toggleSection;
window.liveUpdateHero = liveUpdateHero;
window.liveUpdateSobre = liveUpdateSobre;
window.liveUpdateEspaco = liveUpdateEspacoPosts;
window.liveUpdateServicos = liveUpdateServicos;
window.liveUpdateContato = liveUpdateContato;
window.previewSection = previewSection;
window.previewImageInline = previewImageInline;
window.uploadImage = uploadImage;
window.compressImage = compressImage;
window.resolveImagePath = resolveImagePath;
window.updateImagePosition = updateImagePosition;
window.resetImagePosition = resetImagePosition;
window.addFeature = addFeature;
window.removeFeature = removeFeature;
window.addCredential = addCredential;
window.removeCredential = removeCredential;
window.toggleGlobalPrices = toggleGlobalPrices;
window.showToast = showToast;
window.openPreviewModal = openPreviewModal;
window.closePreviewModal = closePreviewModal;
window.previewModalSection = previewModalSection;
window.addService = addService;
window.removeService = removeService;
window.renderServiceEditor = renderServiceEditor;
window.addEspacoPost = addEspacoPost;
window.removeEspacoPost = removeEspacoPost;
window.renderPostEditor = renderPostEditor;
window.liveUpdateEspacoPosts = liveUpdateEspacoPosts;
window.loadContentFromServer = loadContentFromServer;
window.saveContentToServer = saveContentToServer;
window.toggleSaberMais = toggleSaberMais;
window.renderSaberMaisContent = renderSaberMaisContent;
window.renderGaleriaEditor = renderGaleriaEditor;
window.renderGaleriaFotoCard = renderGaleriaFotoCard;
window.addGaleriaFoto = addGaleriaFoto;
window.removeGaleriaFoto = removeGaleriaFoto;
