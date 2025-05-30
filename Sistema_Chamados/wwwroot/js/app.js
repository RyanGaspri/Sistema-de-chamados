// Dados mockados para simulação
const mockUsers = [
    { id: 1, username: "ryan", password: "op123", name: "Ryan Gaspri", role: "operator", sector: "Produção", email: "joao@empresa.com" },
    { id: 2, username: "reinaldo", password: "ges123", name: "Reinaldo Figueiredo", role: "manager", sector: "Gerência", email: "maria@empresa.com" },
    { id: 3, username: "jefferson", password: "tec123", name: "Jefferson Pintor", role: "technician", sector: "Automação", email: "pedro@empresa.com" },
    { id: 4, username: "adm", password: "adm123", name: "Administrador", role: "manager", sector: "Administração", email: "admin@empresa.com" }
];

const mockMachines = [
    { id: 1, name: "Máquina de Embalagem", sector: "Produção", status: "active" },
    { id: 2, name: "Esteira Transportadora", sector: "Logística", status: "active" },
    { id: 3, name: "Prensa Hidráulica", sector: "Moldagem", status: "maintenance" }
];

const mockParts = [
    { id: 1, machineId: 1, name: "Motor Principal", status: "active" },
    { id: 2, machineId: 1, name: "Sensor de Temperatura", status: "active" },
    { id: 3, machineId: 1, name: "Correia Transportadora", status: "active" },
    { id: 4, machineId: 2, name: "Motor de Tração", status: "active" },
    { id: 5, machineId: 2, name: "Rolamentos", status: "active" },
    { id: 6, machineId: 3, name: "Cilindro Hidráulico", status: "active" },
    { id: 7, machineId: 3, name: "Válvula de Pressão", status: "maintenance" }
];

const mockMaintenanceTimes = [
    { partId: 1, maintenanceType: "Ajuste", estimatedTime: 30 },
    { partId: 1, maintenanceType: "Troca", estimatedTime: 120 },
    { partId: 2, maintenanceType: "Calibração", estimatedTime: 45 },
    { partId: 2, maintenanceType: "Troca", estimatedTime: 60 },
    { partId: 3, maintenanceType: "Tensionamento", estimatedTime: 30 },
    { partId: 3, maintenanceType: "Troca", estimatedTime: 90 },
    { partId: 4, maintenanceType: "Ajuste", estimatedTime: 40 },
    { partId: 4, maintenanceType: "Troca", estimatedTime: 180 },
    { partId: 5, maintenanceType: "Lubrificação", estimatedTime: 20 },
    { partId: 5, maintenanceType: "Troca", estimatedTime: 60 },
    { partId: 6, maintenanceType: "Reparo", estimatedTime: 90 },
    { partId: 6, maintenanceType: "Troca", estimatedTime: 240 },
    { partId: 7, maintenanceType: "Calibração", estimatedTime: 30 },
    { partId: 7, maintenanceType: "Troca", estimatedTime: 60 }
];

const mockTickets = [
    {
        id: 1,
        machineId: 1,
        partId: 2,
        maintenanceTypeId: 3,
        description: "Sensor de temperatura com leitura incorreta",
        createdBy: 1,
        status: "open",
        createdAt: new Date(2023, 10, 15, 10, 30),
        assignedTo: null,
        startedAt: null,
        estimatedTime: null,
        finishedAt: null
    },
    {
        id: 2,
        machineId: 3,
        partId: 6,
        maintenanceTypeId: 11,
        description: "Vazamento no cilindro hidráulico",
        createdBy: 1,
        status: "inProgress",
        createdAt: new Date(2023, 10, 16, 8, 15),
        assignedTo: 3,
        startedAt: new Date(2023, 10, 16, 9, 0),
        estimatedTime: 90,
        finishedAt: null
    },
    {
        id: 3,
        machineId: 2,
        partId: 5,
        maintenanceTypeId: 9,
        description: "Ruído anormal nos rolamentos",
        createdBy: 1,
        status: "closed",
        createdAt: new Date(2023, 10, 14, 14, 45),
        assignedTo: 3,
        startedAt: new Date(2023, 10, 14, 15, 30),
        estimatedTime: 20,
        finishedAt: new Date(2023, 10, 14, 15, 55)
    }
];

const mockMessages = [
    {
        id: 1,
        fromUserId: 2,
        toUserId: 3,
        subject: 'Manutenção Agendada',
        content: 'Olá, precisamos agendar uma manutenção preventiva para a Máquina de Embalagem. Podemos marcar para amanhã às 9h?',
        timestamp: new Date(2025, 10, 18, 14, 30),
        read: true
    },
    {
        id: 2,
        fromUserId: 1,
        toUserId: 3,
        subject: 'Problema na Esteira',
        content: 'Estamos com um problema recorrente na esteira transportadora. Poderia verificar quando tiver disponibilidade?',
        timestamp: new Date(2025, 10, 19, 10, 15),
        read: false
    },
    {
        id: 3,
        fromUserId: 4,
        toUserId: 2,
        subject: 'Relatório Mensal',
        content: 'Bom dia Reinaldo, o relatório mensal de manutenções preventivas e corretivas está disponível para análise. Por favor, revise e me dê um retorno até o final do dia.',
        timestamp: new Date(2025, 10, 19, 9, 0),
        read: false
    },
    {
        id: 4,
        fromUserId: 3,
        toUserId: 1,
        subject: 'Retorno sobre Esteira',
        content: 'Ryan, verifiquei a esteira e identifiquei um problema nos rolamentos. Vou providenciar a troca amanhã pela manhã.',
        timestamp: new Date(2025, 10, 19, 16, 45),
        read: true
    }
];

const mockAnnouncements = [
    {
        id: 1,
        fromUserId: 4,
        title: 'Manutenção Programada - Sistema Offline',
        content: 'Informamos que no próximo domingo (26/11) das 8h às 12h, o sistema estará indisponível para manutenção programada. Por favor, planejem suas atividades considerando esta parada.',
        timestamp: new Date(2025, 10, 18, 11, 0),
        targetSectors: null, // all sectors
        readBy: [1, 2]
    },
    {
        id: 2,
        fromUserId: 2,
        title: 'Novo Procedimento de Manutenção',
        content: 'A partir da próxima semana, implementaremos um novo procedimento para abertura de chamados de manutenção. Todos os setores devem utilizar o novo formulário disponível no sistema.\n\nCaso tenham dúvidas, entrem em contato com o setor de Gerência.',
        timestamp: new Date(2025, 10, 19, 15, 30),
        targetSectors: ['Produção', 'Logística', 'Moldagem'],
        readBy: []
    }
];

// Estado da aplicação
let currentUser = null;
let darkMode = false;
let sidebarOpen = true;
let countdownIntervals = [];

// Acessibilidade
function initAccessibilityFeatures() {
    // Carregar preferências salvas
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
        document.getElementById('high-contrast').checked = true;
    }

    if (localStorage.getItem('focusHighlight') === 'true') {
        document.body.classList.add('focus-highlight');
        document.getElementById('focus-highlight').checked = true;
    }

    // Aplicar tamanho de fonte salvo
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.documentElement.style.fontSize = fontSize;
    }

    // Inicializar narrador de texto
    window.textToSpeechActive = localStorage.getItem('textToSpeech') === 'true';
    if (window.textToSpeechActive) {
        document.getElementById('text-to-speech-toggle').textContent = 'Desativar Narrador';
        document.getElementById('text-to-speech-toggle').classList.add('active');
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    checkCookieConsent();
});

function initializeApp() {
    // Verificar preferência de tema
    if (localStorage.getItem('darkMode') === 'true') {
        enableDarkMode();
    }

    // Inicializar configurações de acessibilidade
    initAccessibilityFeatures();

    // Event listeners
    setupEventListeners();

    // Initialize notification system first
    initializeNotificationSystem();
}

function initializeNotificationSystem() {
    // Create or ensure window.notificationSystem exists
    window.notificationSystem = window.notificationSystem || {};

    if (!window.notificationSystem?.messages) {
        // Populate with mock/initial data
        window.notificationSystem = {
            messages: mockMessages,
            notifications: [],
            announcements: mockAnnouncements,
            callbacks: {},
            ...window.notificationSystem
        };
    }

    window.notificationSystem.messages = mockMessages;
    window.notificationSystem.announcements = mockAnnouncements;

    // Load state from localStorage
    window.notificationSystem.loadState();

    // Set up event listeners for notifications
    window.notificationSystem.on('newMessage', (message) => {
        if (currentUser && message.toUserId === currentUser.id) {
            const sender = mockUsers.find(u => u.id === message.fromUserId);
            showNotification(
                'Nova Mensagem',
                `Você recebeu uma nova mensagem de ${sender ? sender.name : 'Usuário Desconhecido'}`,
                'info'
            );
            updateHeaderNotifications();
        }
    });

    window.notificationSystem.on('newAnnouncement', (announcement) => {
        if (currentUser && (!announcement.targetSectors || announcement.targetSectors.includes(currentUser.sector))) {
            showNotification(
                'Novo Comunicado',
                `Novo comunicado: ${announcement.title}`,
                'info'
            );
            updateHeaderNotifications();
        }
    });

    window.notificationSystem.on('newNotification', (notification) => {
        if (currentUser && (notification.targetUserId === null || notification.targetUserId === currentUser.id)) {
            updateHeaderNotifications();
        }
    });

    // Save state periodically
    setInterval(() => {
        window.notificationSystem.saveState();
    }, 60000); // Save every minute
}

// Event listeners setup
function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Theme toggle
    document.getElementById('theme-switch').addEventListener('change', function () {
        if (this.checked) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });

    // Sidebar toggle on mobile
    document.getElementById('menu-toggle').addEventListener('click', function () {
        this.classList.toggle('active');
        document.getElementById('main-nav').classList.toggle('open');
    });

    // Forgot password link
    document.getElementById('forgot-password-link').addEventListener('click', function (e) {
        e.preventDefault();
        showForgotPasswordForm();
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function () {
        currentUser = null;
        document.getElementById('app-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        showNotification('Sessão Encerrada', 'Você saiu do sistema com sucesso', 'info');
    });

    // Notification bell
    setupNotificationBell();

    // Accessibility toolbar toggle
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', toggleAccessibilityPanel);
    }

    // High contrast toggle
    const highContrastToggle = document.getElementById('high-contrast');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', toggleHighContrast);
    }

    // Font size controls
    const decreaseFontBtn = document.getElementById('decrease-font');
    const resetFontBtn = document.getElementById('reset-font');
    const increaseFontBtn = document.getElementById('increase-font');

    if (decreaseFontBtn) decreaseFontBtn.addEventListener('click', decreaseFontSize);
    if (resetFontBtn) resetFontBtn.addEventListener('click', resetFontSize);
    if (increaseFontBtn) increaseFontBtn.addEventListener('click', increaseFontSize);

    // Text to speech toggle
    const textToSpeechToggle = document.getElementById('text-to-speech-toggle');
    if (textToSpeechToggle) {
        textToSpeechToggle.addEventListener('click', toggleTextToSpeech);
    }

    // Focus highlight toggle
    const focusHighlightToggle = document.getElementById('focus-highlight');
    if (focusHighlightToggle) {
        focusHighlightToggle.addEventListener('change', toggleFocusHighlight);
    }
}

// Login handling function
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find user
    const user = mockUsers.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('user-display').textContent = user.name;

        // Setup navigation based on user role
        setupNavigation(user.role);

        // Show dashboard as default view
        loadDashboard();

        // Add notification for successful login
        showNotification('Bem-vindo', `Olá, ${user.name}! Você entrou no sistema com sucesso.`, 'success');

        // Announce login to screen readers
        announceToScreenReader(`Login realizado com sucesso. Bem-vindo, ${user.name}`);

        // Update notification count
        updateHeaderNotifications();
    } else {
        // Show error message
        showNotification('Erro de Login', 'Usuário ou senha incorretos. Tente novamente.', 'error');

        // Announce error to screen readers
        announceToScreenReader('Erro de login. Usuário ou senha incorretos. Tente novamente.');

        // Clear password field
        document.getElementById('password').value = '';
    }
}

// Accessibility panel toggle
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibility-panel');
    panel.classList.toggle('hidden');

    if (!panel.classList.contains('hidden')) {
        // Announce to screen readers
        announceToScreenReader('Painel de acessibilidade aberto');
    }
}

// High contrast mode
function toggleHighContrast() {
    const highContrastEnabled = document.getElementById('high-contrast').checked;

    if (highContrastEnabled) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('highContrast', 'true');
        announceToScreenReader('Modo de alto contraste ativado');
    } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('highContrast', 'false');
        announceToScreenReader('Modo de alto contraste desativado');
    }
}

// Font size adjustments
function increaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = currentSize * 1.1;
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', `${newSize}px`);
    announceToScreenReader('Tamanho da fonte aumentado');
}

function decreaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = currentSize * 0.9;
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', `${newSize}px`);
    announceToScreenReader('Tamanho da fonte diminuído');
}

function resetFontSize() {
    document.documentElement.style.fontSize = '';
    localStorage.removeItem('fontSize');
    announceToScreenReader('Tamanho da fonte redefinido');
}

// Text to speech
function toggleTextToSpeech() {
    window.textToSpeechActive = !window.textToSpeechActive;
    const button = document.getElementById('text-to-speech-toggle');

    if (window.textToSpeechActive) {
        button.textContent = 'Desativar Narrador';
        button.classList.add('active');
        localStorage.setItem('textToSpeech', 'true');
        announceToScreenReader('Narrador de texto ativado');

        // Add event listeners for interactive elements
        addTextToSpeechListeners();
    } else {
        button.textContent = 'Ativar Narrador';
        button.classList.remove('active');
        localStorage.setItem('textToSpeech', 'false');
        announceToScreenReader('Narrador de texto desativado');

        // Remove event listeners
        removeTextToSpeechListeners();
    }
}

function addTextToSpeechListeners() {
    // Add mouseover events to buttons, links, and other interactive elements
    document.querySelectorAll('button, a, input, select, textarea, .action-btn, .data-table td, .status-badge').forEach(elem => {
        elem.addEventListener('mouseover', handleElementHover);
        elem.setAttribute('data-tts-enabled', 'true');
    });
}

function removeTextToSpeechListeners() {
    document.querySelectorAll('[data-tts-enabled="true"]').forEach(elem => {
        elem.removeEventListener('mouseover', handleElementHover);
        elem.removeAttribute('data-tts-enabled');
    });
}

function handleElementHover(e) {
    if (!window.textToSpeechActive) return;

    let text = '';

    // Get text based on element type
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.classList.contains('action-btn')) {
        text = e.target.textContent.trim() || e.target.getAttribute('aria-label') || 'Botão';
    } else if (e.target.tagName === 'INPUT') {
        const label = document.querySelector(`label[for="${e.target.id}"]`);
        text = (label ? label.textContent + ': ' : '') + (e.target.value || e.target.placeholder || 'Campo de entrada');
    } else if (e.target.tagName === 'SELECT') {
        const label = document.querySelector(`label[for="${e.target.id}"]`);
        text = (label ? label.textContent + ': ' : '') + (e.target.options[e.target.selectedIndex]?.textContent || 'Seleção');
    } else if (e.target.tagName === 'TEXTAREA') {
        const label = document.querySelector(`label[for="${e.target.id}"]`);
        text = (label ? label.textContent + ': ' : '') + (e.target.value || e.target.placeholder || 'Área de texto');
    } else if (e.target.classList.contains('status-badge')) {
        text = 'Status: ' + e.target.textContent.trim();
    } else if (e.target.tagName === 'TD') {
        text = e.target.textContent.trim();
    }

    // Speak the text
    if (text) {
        speakText(text);
    }
}

function speakText(text) {
    if (!window.speechSynthesis) return;

    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
}

// Focus highlight
function toggleFocusHighlight() {
    const focusHighlightEnabled = document.getElementById('focus-highlight').checked;

    if (focusHighlightEnabled) {
        document.body.classList.add('focus-highlight');
        localStorage.setItem('focusHighlight', 'true');
        announceToScreenReader('Destaque de foco ativado');
    } else {
        document.body.classList.remove('focus-highlight');
        localStorage.setItem('focusHighlight', 'false');
        announceToScreenReader('Destaque de foco desativado');
    }
}

// Utility function to announce messages to screen readers
function announceToScreenReader(message) {
    const announcer = document.getElementById('screen-reader-announcer');

    if (!announcer) {
        const newAnnouncer = document.createElement('div');
        newAnnouncer.id = 'screen-reader-announcer';
        newAnnouncer.setAttribute('aria-live', 'polite');
        newAnnouncer.classList.add('sr-only');
        document.body.appendChild(newAnnouncer);

        setTimeout(() => {
            newAnnouncer.textContent = message;
        }, 100);
    } else {
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }

    // Also use speech synthesis if enabled
    if (window.textToSpeechActive) {
        speakText(message);
    }
}

// Setup navigation menu based on user role
function setupNavigation(role) {
    const sidebarNav = document.getElementById('main-nav');
    let navHTML = '<ul>';

    // Common navigation items for all roles
    navHTML += `
        <li><a href="#" data-page="dashboard">
            <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            Dashboard
        </a></li>
        <li><a href="#" data-page="communications">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
        </svg>
            Comunicações
        </a></li>
        <li><a href="#" data-page="tickets">
            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Chamados
        </a></li>
    `;

    // Role-specific navigation items
    if (role === 'manager' || role === 'admin') {
        navHTML += `
            <li><a href="#" data-page="machines">
                <svg viewBox="0 0 24 24"><path d="M19 3h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
                Máquinas
            </a></li>
            <li><a href="#" data-page="parts">
                <svg viewBox="0 0 24 24"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14v-2H4V9z"/>
            </svg>
                Peças
            </a></li>
            <li><a href="#" data-page="employees">
                <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
            </svg>
                Colaboradores
            </a></li>
            <li><a href="#" data-page="reports">
                <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H5v-2h6v-3h2v5h6v-2h-6v-3h2v3z"/>
            </svg>
                Relatórios
            </a></li>
        `;
    }

    if (role === 'technician') {
        navHTML += `
         `;
    }

    navHTML += '</ul>';
    sidebarNav.innerHTML = navHTML;

    // Add event listeners to navigation links
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');

            // Remove active class from all links
            document.querySelectorAll('#main-nav a').forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Load the selected page
            switch (page) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'communications':
                    loadCommunications();
                    break;
                case 'tickets':
                    loadTickets();
                    break;
                case 'machines':
                    loadMachines();
                    break;
                case 'parts':
                    loadParts();
                    break;
                case 'employees':
                    loadEmployees();
                    break;
                case 'reports':
                    loadReports();
                    break;
            
            }
        });
    });
}

// Load machines function
function loadMachines() {
    const contentArea = document.getElementById('content-area');

    // Prepare status labels for better display
    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return '<span class="status-badge status-ok">Ativa</span>';
            case 'maintenance': return '<span class="status-badge status-maintenance">Em Manutenção</span>';
            case 'inactive': return '<span class="status-badge status-critical">Inativa</span>';
            default: return '<span class="status-badge">Desconhecido</span>';
        }
    };

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Gerenciamento de Máquinas</h2>
            <button id="new-machine-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Nova Máquina
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-status">Status</label>
                    <select id="filter-status">
                        <option value="">Todos</option>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                        <option value="inactive">Inativa</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-sector">Setor</label>
                    <select id="filter-sector">
                        <option value="">Todos</option>
                        <option value="Produção">Produção</option>
                        <option value="Logística">Logística</option>
                        <option value="Moldagem">Moldagem</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Setor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${mockMachines.map(machine => `
                    <tr>
                        <td>${machine.id}</td>
                        <td>${machine.name}</td>
                        <td>${machine.sector}</td>
                        <td>${getStatusLabel(machine.status)}</td>
                        <td class="actions-cell">
                            <button class="action-btn view-machine" data-id="${machine.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                Ver
                            </button>
                            <button class="action-btn edit-machine" data-id="${machine.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                                Editar
                            </button>
                            <button class="action-btn delete-machine" data-id="${machine.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                                Excluir
                            </button>
                            <button class="action-btn new-ticket-for-machine" data-id="${machine.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                                </svg>
                                Chamado
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Event listeners for machine management
    setupMachineEventListeners();
}

// Separate function to setup machine event listeners
function setupMachineEventListeners() {
    const newMachineBtn = document.getElementById('new-machine-btn');
    if (newMachineBtn) {
        newMachineBtn.addEventListener('click', () => {
            showNewMachineForm();
        });
    }

    document.querySelectorAll('.view-machine').forEach(button => {
        button.addEventListener('click', (e) => {
            const machineId = parseInt(e.currentTarget.getAttribute('data-id'));
            viewMachineDetails(machineId);
        });
    });

    document.querySelectorAll('.edit-machine').forEach(button => {
        button.addEventListener('click', (e) => {
            const machineId = parseInt(e.currentTarget.getAttribute('data-id'));
            editMachine(machineId);
        });
    });

    document.querySelectorAll('.delete-machine').forEach(button => {
        button.addEventListener('click', (e) => {
            const machineId = parseInt(e.currentTarget.getAttribute('data-id'));
            deleteMachine(machineId);
        });
    });

    document.querySelectorAll('.new-ticket-for-machine').forEach(button => {
        button.addEventListener('click', (e) => {
            const machineId = parseInt(e.currentTarget.getAttribute('data-id'));
            createTicketForMachine(machineId);
        });
    });

    // Filter event listeners
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyMachineFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearMachineFilters);
    }
}

// Helper function to view machine details
function viewMachineDetails(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada', 'error');
        return;
    }

    // Create a modal for machine details
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalhes da Máquina</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="machine-details">
                <p><strong>ID:</strong> ${machine.id}</p>
                <p><strong>Nome:</strong> ${machine.name}</p>
                <p><strong>Setor:</strong> ${machine.sector}</p>
                <p><strong>Status:</strong> ${machine.status}</p>
                <div class="action-buttons">
                    <button class="btn-primary" onclick="editMachine(${machine.id}); this.closest('.modal-overlay').remove();">Editar</button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove();">Fechar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal event
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    showNotification('Detalhes', `Visualizando detalhes da máquina: ${machine.name}`, 'info');
}

// Helper function to show new machine form
function showNewMachineForm() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Nova Máquina</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="new-machine-form">
                <div class="form-group">
                    <label for="machine-name">Nome da Máquina:</label>
                    <input type="text" id="machine-name" required>
                </div>
                <div class="form-group">
                    <label for="machine-sector">Setor:</label>
                    <select id="machine-sector" required>
                        <option value="">Selecione um setor</option>
                        <option value="Produção">Produção</option>
                        <option value="Logística">Logística</option>
                        <option value="Moldagem">Moldagem</option>
                        <option value="Automação">Automação</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="machine-status">Status:</label>
                    <select id="machine-status" required>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                        <option value="inactive">Inativa</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Criar Máquina</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#new-machine-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('machine-name').value;
        const sector = document.getElementById('machine-sector').value;
        const status = document.getElementById('machine-status').value;

        // Create new machine (in a real app, this would call an API)
        const newMachine = {
            id: mockMachines.length + 1,
            name,
            sector,
            status
        };

        mockMachines.push(newMachine);

        modal.remove();
        showNotification('Máquina Criada', `A máquina "${name}" foi criada com sucesso!`, 'success');
        loadMachines(); // Reload the machines list
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to edit a machine
function editMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar Máquina</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="edit-machine-form">
                <div class="form-group">
                    <label for="edit-machine-name">Nome da Máquina:</label>
                    <input type="text" id="edit-machine-name" value="${machine.name}" required>
                </div>
                <div class="form-group">
                    <label for="edit-machine-sector">Setor:</label>
                    <select id="edit-machine-sector" required>
                        <option value="Produção" ${machine.sector === 'Produção' ? 'selected' : ''}>Produção</option>
                        <option value="Logística" ${machine.sector === 'Logística' ? 'selected' : ''}>Logística</option>
                        <option value="Moldagem" ${machine.sector === 'Moldagem' ? 'selected' : ''}>Moldagem</option>
                        <option value="Automação" ${machine.sector === 'Automação' ? 'selected' : ''}>Automação</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-machine-status">Status:</label>
                    <select id="edit-machine-status" required>
                        <option value="active" ${machine.status === 'active' ? 'selected' : ''}>Ativa</option>
                        <option value="maintenance" ${machine.status === 'maintenance' ? 'selected' : ''}>Em Manutenção</option>
                        <option value="inactive" ${machine.status === 'inactive' ? 'selected' : ''}>Inativa</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Salvar Alterações</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#edit-machine-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-machine-name').value;
        const sector = document.getElementById('edit-machine-sector').value;
        const status = document.getElementById('edit-machine-status').value;

        // Update machine
        machine.name = name;
        machine.sector = sector;
        machine.status = status;

        modal.remove();
        showNotification('Máquina Atualizada', `A máquina "${name}" foi atualizada com sucesso!`, 'success');
        loadMachines(); // Reload the machines list
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to delete a machine
function deleteMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir a máquina <strong>"${machine.name}"</strong>?</p>
                <p style="color: var(--danger-color); font-size: 0.9rem;">Esta ação não pode ser desfeita.</p>
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button class="btn-danger confirm-delete">Sim, Excluir</button>
                    <button class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Confirm delete event
    modal.querySelector('.confirm-delete').addEventListener('click', () => {
        const index = mockMachines.findIndex(m => m.id === machineId);
        if (index > -1) {
            mockMachines.splice(index, 1);
            modal.remove();
            showNotification('Máquina Excluída', `A máquina "${machine.name}" foi excluída com sucesso!`, 'success');
            loadMachines(); // Reload the machines list
        }
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to create a new ticket for a specific machine
function createTicketForMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada', 'error');
        return;
    }

    // Get parts for this machine
    const machineParts = mockParts.filter(p => p.machineId === machineId);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Novo Chamado - ${machine.name}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="new-ticket-form">
                <div class="form-group">
                    <label for="ticket-part">Peça:</label>
                    <select id="ticket-part" required>
                        <option value="">Selecione uma peça</option>
                        ${machineParts.map(part => `<option value="${part.id}">${part.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="ticket-description">Descrição do Problema:</label>
                    <textarea id="ticket-description" rows="4" required placeholder="Descreva o problema encontrado..."></textarea>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Criar Chamado</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#new-ticket-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const partId = parseInt(document.getElementById('ticket-part').value);
        const description = document.getElementById('ticket-description').value;

        // Create new ticket
        const newTicket = {
            id: mockTickets.length + 1,
            machineId: machineId,
            partId: partId,
            maintenanceTypeId: null,
            description: description,
            createdBy: currentUser.id,
            status: 'open',
            createdAt: new Date(),
            assignedTo: null,
            startedAt: null,
            estimatedTime: null,
            finishedAt: null
        };

        mockTickets.push(newTicket);

        modal.remove();
        showNotification('Chamado Criado', `Chamado #${newTicket.id} criado com sucesso para a máquina "${machine.name}"!`, 'success');

        // Create system notification for technicians
        if (window.notificationSystem) {
            window.notificationSystem.createNotification(
                'ticket',
                `Novo chamado #${newTicket.id} criado para ${machine.name}`,
                null, // all technicians
                newTicket.id
            );
        }
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Filter functions
function applyMachineFilters() {
    const statusFilter = document.getElementById('filter-status');
    const sectorFilter = document.getElementById('filter-sector');

    if (!statusFilter || !sectorFilter) {
        showNotification('Erro', 'Elementos de filtro não encontrados', 'error');
        return;
    }

    const statusValue = statusFilter.value;
    const sectorValue = sectorFilter.value;

    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        if (row.cells.length >= 4) {
            const status = row.cells[3].textContent.toLowerCase();
            const sector = row.cells[2].textContent;

            let showRow = true;

            if (statusValue && !status.includes(statusValue)) {
                showRow = false;
            }

            if (sectorValue && sector !== sectorValue) {
                showRow = false;
            }

            row.style.display = showRow ? '' : 'none';
        }
    });

    showNotification('Filtros Aplicados',
        `Filtros aplicados: ${statusValue || 'Todos os status'}, ${sectorValue || 'Todos os setores'}`,
        'info'
    );
}

function clearMachineFilters() {
    const statusFilter = document.getElementById('filter-status');
    const sectorFilter = document.getElementById('filter-sector');

    if (statusFilter) statusFilter.value = '';
    if (sectorFilter) sectorFilter.value = '';

    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    showNotification('Filtros Limpos', 'Todos os filtros foram removidos', 'info');
}

// Load parts function
function loadParts() {
    const contentArea = document.getElementById('content-area');

    // Prepare status labels for better display
    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return '<span class="status-badge status-ok">Ativa</span>';
            case 'maintenance': return '<span class="status-badge status-maintenance">Em Manutenção</span>';
            case 'inactive': return '<span class="status-badge status-critical">Inativa</span>';
            default: return '<span class="status-badge">Desconhecido</span>';
        }
    };

    // Get machine name by ID
    const getMachineName = (id) => {
        const machine = mockMachines.find(m => m.id === id);
        return machine ? machine.name : 'Desconhecido';
    };

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Gerenciamento de Peças</h2>
            <button id="new-part-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Nova Peça
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-status">Status</label>
                    <select id="filter-status">
                        <option value="">Todos</option>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                        <option value="inactive">Inativa</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-machine">Máquina</label>
                    <select id="filter-machine">
                        <option value="">Todas</option>
                        ${mockMachines.map(machine => `<option value="${machine.id}">${machine.name}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-part-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-part-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Máquina</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${mockParts.map(part => `
                    <tr>
                        <td>${part.id}</td>
                        <td>${part.name}</td>
                        <td>${getMachineName(part.machineId)}</td>
                        <td>${getStatusLabel(part.status)}</td>
                        <td class="actions-cell">
                            <button class="action-btn view-part" data-id="${part.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                Ver
                            </button>
                            <button class="action-btn edit-part" data-id="${part.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                                Editar
                            </button>
                            <button class="action-btn delete-part" data-id="${part.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                                Excluir
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Add event listeners for the parts management
    setupPartsEventListeners();
}

// Setup event listeners for parts
function setupPartsEventListeners() {
    const newPartBtn = document.getElementById('new-part-btn');
    if (newPartBtn) {
        newPartBtn.addEventListener('click', () => {
            showNewPartForm();
        });
    }

    document.querySelectorAll('.view-part').forEach(button => {
        button.addEventListener('click', (e) => {
            const partId = parseInt(e.currentTarget.getAttribute('data-id'));
            viewPartDetails(partId);
        });
    });

    document.querySelectorAll('.edit-part').forEach(button => {
        button.addEventListener('click', (e) => {
            const partId = parseInt(e.currentTarget.getAttribute('data-id'));
            editPart(partId);
        });
    });

    document.querySelectorAll('.delete-part').forEach(button => {
        button.addEventListener('click', (e) => {
            const partId = parseInt(e.currentTarget.getAttribute('data-id'));
            deletePart(partId);
        });
    });

    // Filter event listeners
    const applyFiltersBtn = document.getElementById('apply-part-filters');
    const clearFiltersBtn = document.getElementById('clear-part-filters');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyPartFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearPartFilters);
    }
}

// Helper function to view part details
function viewPartDetails(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada', 'error');
        return;
    }

    const machine = mockMachines.find(m => m.id === part.machineId);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalhes da Peça</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="part-details">
                <p><strong>ID:</strong> ${part.id}</p>
                <p><strong>Nome:</strong> ${part.name}</p>
                <p><strong>Máquina:</strong> ${machine ? machine.name : 'Desconhecido'}</p>
                <p><strong>Status:</strong> ${part.status}</p>
                <div class="action-buttons">
                    <button class="btn-primary" onclick="editPart(${part.id}); this.closest('.modal-overlay').remove();">Editar</button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove();">Fechar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to show new part form
function showNewPartForm() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Nova Peça</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="new-part-form">
                <div class="form-group">
                    <label for="part-name">Nome da Peça:</label>
                    <input type="text" id="part-name" required>
                </div>
                <div class="form-group">
                    <label for="part-machine">Máquina:</label>
                    <select id="part-machine" required>
                        <option value="">Selecione uma máquina</option>
                        ${mockMachines.map(machine => `<option value="${machine.id}">${machine.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="part-status">Status:</label>
                    <select id="part-status" required>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                        <option value="inactive">Inativa</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Criar Peça</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#new-part-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('part-name').value;
        const machineId = parseInt(document.getElementById('part-machine').value);
        const status = document.getElementById('part-status').value;

        const newPart = {
            id: mockParts.length + 1,
            name,
            machineId,
            status
        };

        mockParts.push(newPart);

        modal.remove();
        showNotification('Peça Criada', `A peça "${name}" foi criada com sucesso!`, 'success');
        loadParts();
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to edit a part
function editPart(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar Peça</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="edit-part-form">
                <div class="form-group">
                    <label for="edit-part-name">Nome da Peça:</label>
                    <input type="text" id="edit-part-name" value="${part.name}" required>
                </div>
                <div class="form-group">
                    <label for="edit-part-machine">Máquina:</label>
                    <select id="edit-part-machine" required>
                        ${mockMachines.map(machine =>
        `<option value="${machine.id}" ${machine.id === part.machineId ? 'selected' : ''}>${machine.name}</option>`
    ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-part-status">Status:</label>
                    <select id="edit-part-status" required>
                        <option value="active" ${part.status === 'active' ? 'selected' : ''}>Ativa</option>
                        <option value="maintenance" ${part.status === 'maintenance' ? 'selected' : ''}>Em Manutenção</option>
                        <option value="inactive" ${part.status === 'inactive' ? 'selected' : ''}>Inativa</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Salvar Alterações</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#edit-part-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-part-name').value;
        const machineId = parseInt(document.getElementById('edit-part-machine').value);
        const status = document.getElementById('edit-part-status').value;

        part.name = name;
        part.machineId = machineId;
        part.status = status;

        modal.remove();
        showNotification('Peça Atualizada', `A peça "${name}" foi atualizada com sucesso!`, 'success');
        loadParts();
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to delete a part
function deletePart(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir a peça <strong>"${part.name}"</strong>?</p>
                <p style="color: var(--danger-color); font-size: 0.9rem;">Esta ação não pode ser desfeita.</p>
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button class="btn-danger confirm-delete">Sim, Excluir</button>
                    <button class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Confirm delete event
    modal.querySelector('.confirm-delete').addEventListener('click', () => {
        const index = mockParts.findIndex(p => p.id === partId);
        if (index > -1) {
            mockParts.splice(index, 1);
            modal.remove();
            showNotification('Peça Excluída', `A peça "${part.name}" foi excluída com sucesso!`, 'success');
            loadParts();
        }
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Filter functions for parts
function applyPartFilters() {
    const statusFilter = document.getElementById('filter-status');
    const machineFilter = document.getElementById('filter-machine');

    if (!statusFilter || !machineFilter) {
        showNotification('Erro', 'Elementos de filtro não encontrados', 'error');
        return;
    }

    const statusValue = statusFilter.value;
    const machineValue = machineFilter.value;

    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        if (row.cells.length >= 4) {
            const status = row.cells[3].textContent.toLowerCase();
            const machine = row.cells[2].textContent;

            let showRow = true;

            if (statusValue && !status.includes(statusValue)) {
                showRow = false;
            }

            if (machineValue) {
                const selectedMachine = mockMachines.find(m => m.id == machineValue);
                if (selectedMachine && machine !== selectedMachine.name) {
                    showRow = false;
                }
            }

            row.style.display = showRow ? '' : 'none';
        }
    });

    showNotification('Filtros Aplicados',
        `Filtros aplicados: ${statusValue || 'Todos os status'}, ${machineValue ? 'Máquina selecionada' : 'Todas as máquinas'}`,
        'info'
    );
}

function clearPartFilters() {
    const statusFilter = document.getElementById('filter-status');
    const machineFilter = document.getElementById('filter-machine');

    if (statusFilter) statusFilter.value = '';
    if (machineFilter) machineFilter.value = '';

    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    showNotification('Filtros Limpos', 'Todos os filtros foram removidos', 'info');
}

// Load employees function
function loadEmployees() {
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Gerenciamento de Colaboradores</h2>
            <button id="new-employee-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                </svg>
                Novo Colaborador
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-role">Função</label>
                    <select id="filter-role">
                        <option value="">Todas</option>
                        <option value="operator">Operador</option>
                        <option value="technician">Técnico</option>
                        <option value="manager">Gestor</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-sector">Setor</label>
                    <select id="filter-sector">
                        <option value="">Todos</option>
                        <option value="Produção">Produção</option>
                        <option value="Logística">Logística</option>
                        <option value="Moldagem">Moldagem</option>
                        <option value="Automação">Automação</option>
                        <option value="Gerência">Gerência</option>
                        <option value="Administração">Administração</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-employee-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-employee-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Setor</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${mockUsers.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${translateRole(user.role)}</td>
                        <td>${user.sector}</td>
                        <td>${user.email}</td>
                        <td class="actions-cell">
                            <button class="action-btn view-employee" data-id="${user.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                Ver
                            </button>
                            <button class="action-btn edit-employee" data-id="${user.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                                Editar
                            </button>
                            <button class="action-btn delete-employee" data-id="${user.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                                Excluir
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Add event listeners for the employee management
    setupEmployeesEventListeners();
}

// Setup event listeners for employees
function setupEmployeesEventListeners() {
    const newEmployeeBtn = document.getElementById('new-employee-btn');
    if (newEmployeeBtn) {
        newEmployeeBtn.addEventListener('click', () => {
            showNewEmployeeForm();
        });
    }

    document.querySelectorAll('.view-employee').forEach(button => {
        button.addEventListener('click', (e) => {
            const employeeId = parseInt(e.currentTarget.getAttribute('data-id'));
            viewEmployeeDetails(employeeId);
        });
    });

    document.querySelectorAll('.edit-employee').forEach(button => {
        button.addEventListener('click', (e) => {
            const employeeId = parseInt(e.currentTarget.getAttribute('data-id'));
            editEmployee(employeeId);
        });
    });

    document.querySelectorAll('.delete-employee').forEach(button => {
        button.addEventListener('click', (e) => {
            const employeeId = parseInt(e.currentTarget.getAttribute('data-id'));
            deleteEmployee(employeeId);
        });
    });

    // Filter event listeners
    const applyFiltersBtn = document.getElementById('apply-employee-filters');
    const clearFiltersBtn = document.getElementById('clear-employee-filters');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyEmployeeFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearEmployeeFilters);
    }
}

// Helper function to view employee details
function viewEmployeeDetails(employeeId) {
    const employee = mockUsers.find(u => u.id === employeeId);
    if (!employee) {
        showNotification('Erro', 'Colaborador não encontrado', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalhes do Colaborador</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="employee-details">
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Nome:</strong> ${employee.name}</p>
                <p><strong>Usuário:</strong> ${employee.username}</p>
                <p><strong>Função:</strong> ${translateRole(employee.role)}</p>
                <p><strong>Setor:</strong> ${employee.sector}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <div class="action-buttons">
                    <button class="btn-primary" onclick="editEmployee(${employee.id}); this.closest('.modal-overlay').remove();">Editar</button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove();">Fechar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to show new employee form
function showNewEmployeeForm() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Novo Colaborador</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="new-employee-form">
                <div class="form-group">
                    <label for="employee-name">Nome:</label>
                    <input type="text" id="employee-name" required>
                </div>
                <div class="form-group">
                    <label for="employee-username">Usuário:</label>
                    <input type="text" id="employee-username" required>
                </div>
                <div class="form-group">
                    <label for="employee-password">Senha:</label>
                    <input type="password" id="employee-password" required>
                </div>
                <div class="form-group">
                    <label for="employee-email">Email:</label>
                    <input type="email" id="employee-email" required>
                </div>
                <div class="form-group">
                    <label for="employee-role">Função:</label>
                    <select id="employee-role" required>
                        <option value="">Selecione uma função</option>
                        <option value="operator">Operador</option>
                        <option value="technician">Técnico</option>
                        <option value="manager">Gestor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="employee-sector">Setor:</label>
                    <select id="employee-sector" required>
                        <option value="">Selecione um setor</option>
                        <option value="Produção">Produção</option>
                        <option value="Logística">Logística</option>
                        <option value="Moldagem">Moldagem</option>
                        <option value="Automação">Automação</option>
                        <option value="Gerência">Gerência</option>
                        <option value="Administração">Administração</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Criar Colaborador</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#new-employee-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('employee-name').value;
        const username = document.getElementById('employee-username').value;
        const password = document.getElementById('employee-password').value;
        const email = document.getElementById('employee-email').value;
        const role = document.getElementById('employee-role').value;
        const sector = document.getElementById('employee-sector').value;

        const newEmployee = {
            id: mockUsers.length + 1,
            name,
            username,
            password,
            email,
            role,
            sector
        };

        mockUsers.push(newEmployee);

        modal.remove();
        showNotification('Colaborador Criado', `O colaborador "${name}" foi criado com sucesso!`, 'success');
        loadEmployees();
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to edit an employee
function editEmployee(employeeId) {
    const employee = mockUsers.find(u => u.id === employeeId);
    if (!employee) {
        showNotification('Erro', 'Colaborador não encontrado', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar Colaborador</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="edit-employee-form">
                <div class="form-group">
                    <label for="edit-employee-name">Nome:</label>
                    <input type="text" id="edit-employee-name" value="${employee.name}" required>
                </div>
                <div class="form-group">
                    <label for="edit-employee-username">Usuário:</label>
                    <input type="text" id="edit-employee-username" value="${employee.username}" required>
                </div>
                <div class="form-group">
                    <label for="edit-employee-email">Email:</label>
                    <input type="email" id="edit-employee-email" value="${employee.email}" required>
                </div>
                <div class="form-group">
                    <label for="edit-employee-role">Função:</label>
                    <select id="edit-employee-role" required>
                        <option value="operator" ${employee.role === 'operator' ? 'selected' : ''}>Operador</option>
                        <option value="technician" ${employee.role === 'technician' ? 'selected' : ''}>Técnico</option>
                        <option value="manager" ${employee.role === 'manager' ? 'selected' : ''}>Gestor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-employee-sector">Setor:</label>
                    <select id="edit-employee-sector" required>
                        <option value="Produção" ${employee.sector === 'Produção' ? 'selected' : ''}>Produção</option>
                        <option value="Logística" ${employee.sector === 'Logística' ? 'selected' : ''}>Logística</option>
                        <option value="Moldagem" ${employee.sector === 'Moldagem' ? 'selected' : ''}>Moldagem</option>
                        <option value="Automação" ${employee.sector === 'Automação' ? 'selected' : ''}>Automação</option>
                        <option value="Gerência" ${employee.sector === 'Gerência' ? 'selected' : ''}>Gerência</option>
                        <option value="Administração" ${employee.sector === 'Administração' ? 'selected' : ''}>Administração</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Salvar Alterações</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submit event
    modal.querySelector('#edit-employee-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-employee-name').value;
        const username = document.getElementById('edit-employee-username').value;
        const email = document.getElementById('edit-employee-email').value;
        const role = document.getElementById('edit-employee-role').value;
        const sector = document.getElementById('edit-employee-sector').value;

        employee.name = name;
        employee.username = username;
        employee.email = email;
        employee.role = role;
        employee.sector = sector;

        modal.remove();
        showNotification('Colaborador Atualizado', `O colaborador "${name}" foi atualizado com sucesso!`, 'success');
        loadEmployees();
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function to delete an employee
function deleteEmployee(employeeId) {
    const employee = mockUsers.find(u => u.id === employeeId);
    if (!employee) {
        showNotification('Erro', 'Colaborador não encontrado', 'error');
        return;
    }

    if (employee.id === currentUser.id) {
        showNotification('Erro', 'Você não pode excluir seu próprio usuário', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir o colaborador <strong>"${employee.name}"</strong>?</p>
                <p style="color: var(--danger-color); font-size: 0.9rem;">Esta ação não pode ser desfeita.</p>
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button class="btn-danger confirm-delete">Sim, Excluir</button>
                    <button class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Confirm delete event
    modal.querySelector('.confirm-delete').addEventListener('click', () => {
        const index = mockUsers.findIndex(u => u.id === employeeId);
        if (index > -1) {
            mockUsers.splice(index, 1);
            modal.remove();
            showNotification('Colaborador Excluído', `O colaborador "${employee.name}" foi excluído com sucesso!`, 'success');
            loadEmployees();
        }
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Filter functions for employees
function applyEmployeeFilters() {
    const roleFilter = document.getElementById('filter-role');
    const sectorFilter = document.getElementById('filter-sector');

    if (!roleFilter || !sectorFilter) {
        showNotification('Erro', 'Elementos de filtro não encontrados', 'error');
        return;
    }

    const roleValue = roleFilter.value;
    const sectorValue = sectorFilter.value;

    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        if (row.cells.length >= 4) {
            const role = row.cells[2].textContent;
            const sector = row.cells[3].textContent;

            let showRow = true;

            if (roleValue && !role.toLowerCase().includes(translateRole(roleValue).toLowerCase())) {
                showRow = false;
            }

            if (sectorValue && sector !== sectorValue) {
                showRow = false;
            }

            row.style.display = showRow ? '' : 'none';
        }
    });

    showNotification('Filtros Aplicados',
        `Filtros aplicados: ${roleValue || 'Todas as funções'}, ${sectorValue || 'Todos os setores'}`,
        'info'
    );
}

function clearEmployeeFilters() {
    const roleFilter = document.getElementById('filter-role');
    const sectorFilter = document.getElementById('filter-sector');

    if (roleFilter) roleFilter.value = '';
    if (sectorFilter) sectorFilter.value = '';

    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    showNotification('Filtros Limpos', 'Todos os filtros foram removidos', 'info');
}

// Load reports function
function loadReports() {
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Relatórios e Análises</h2>
        </div>
        
        <div class="filter-container">
            <h3>Período do Relatório</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="report-start-date">Data Inicial</label>
                    <input type="date" id="report-start-date" value="${getThirtyDaysAgo()}">
                </div>
                <div class="filter-group">
                    <label for="report-end-date">Data Final</label>
                    <input type="date" id="report-end-date" value="${getTodayDate()}">
                </div>
                <div class="filter-group">
                    <label for="report-type">Tipo de Relatório</label>
                    <select id="report-type">
                        <option value="performance">Desempenho de Manutenção</option>
                        <option value="failure">Análise de Falhas</option>
                        <option value="cost">Custo de Manutenção</option>
                        <option value="workload">Carga de Trabalho</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button id="generate-report" class="btn-primary">Gerar Relatório</button>
                <button id="save-report" class="btn-secondary">Salvar Configuração</button>
            </div>
        </div>
        
        <div class="export-options">
            <button class="export-btn" id="export-pdf">
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
            </svg>
                Exportar PDF
            </button>
            <button class="export-btn" id="export-csv">
                <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
                Exportar CSV
            </button>
        </div>
        
        <div class="chart-container">
            <h3>Tempo Médio de Resolução (Últimos 30 dias)</h3>
            <canvas id="resolutionTimeChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3>Distribuição de Chamados por Máquina</h3>
            <canvas id="ticketDistributionChart"></canvas>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Eficiência Média</h3>
                <div class="dashboard-metric">87%</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 5%</span> em relação ao período anterior
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Tempo Médio de Resposta</h3>
                <div class="dashboard-metric">1h 23min</div>
                <div class="dashboard-trend">
                    <span class="trend-down">↓ 15%</span> em relação ao período anterior
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Taxa de Resolução na 1ª Visita</h3>
                <div class="dashboard-metric">72%</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 8%</span> em relação ao período anterior
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Satisfação com o Atendimento</h3>
                <div class="dashboard-metric">4.7/5.0</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 0.3</span> em relação ao período anterior
                </div>
            </div>
        </div>
    `;

    // Initialize Charts
    setTimeout(() => {
        initializeReportCharts();
    }, 100);

    // Add event listeners for report actions with null checks
    const generateBtn = document.getElementById('generate-report');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateReport);
    }

    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportReportPDF);
    }

    const exportCsvBtn = document.getElementById('export-csv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', exportReportCSV);
    }

    const saveReportBtn = document.getElementById('save-report');
    if (saveReportBtn) {
        saveReportBtn.addEventListener('click', () => {
            showNotification('Configuração Salva', 'A configuração do relatório foi salva com sucesso!', 'success');
        });
    }
}

// Initialize charts for reports page
function initializeReportCharts() {
    // Resolution Time Chart
    const resolutionTimeCtx = document.getElementById('resolutionTimeChart');
    if (resolutionTimeCtx) {
        const ctx = resolutionTimeCtx.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1/10', '5/10', '10/10', '15/10', '20/10', '25/10', '30/10'],
                    datasets: [{
                        label: 'Tempo Médio (minutos)',
                        data: [45, 39, 52, 41, 35, 30, 33],
                        backgroundColor: 'rgba(65, 90, 119, 0.1)',
                        borderColor: '#415a77',
                        borderWidth: 2,
                        pointBackgroundColor: '#1b263b',
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Minutos'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Data'
                            }
                        }
                    }
                }
            });
        }
    }

    // Ticket Distribution Chart
    const ticketDistributionCtx = document.getElementById('ticketDistributionChart');
    if (ticketDistributionCtx) {
        const ctx = ticketDistributionCtx.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Máquina de Embalagem', 'Esteira Transportadora', 'Prensa Hidráulica', 'Outras'],
                    datasets: [{
                        data: [35, 25, 20, 20],
                        backgroundColor: ['#415a77', '#778da9', '#0d1b2a', '#5bc0be']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        }
    }
}

// Export report to PDF
function exportReportPDF() {
    showNotification('Exportação Iniciada', 'O relatório está sendo exportado para PDF...', 'info');

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.text('Relatório de Manutenção', 20, 30);

        // Add generation date
        doc.setFontSize(12);
        doc.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);

        // Add performance metrics
        doc.setFontSize(16);
        doc.text('Métricas de Desempenho:', 20, 65);

        doc.setFontSize(12);
        doc.text('• Eficiência Média: 87%', 30, 80);
        doc.text('• Tempo Médio de Resposta: 1h 23min', 30, 95);
        doc.text('• Taxa de Resolução na 1ª Visita: 72%', 30, 110);
        doc.text('• Satisfação com o Atendimento: 4.7/5.0', 30, 125);

        // Add tickets summary
        doc.setFontSize(16);
        doc.text('Resumo de Chamados:', 20, 150);

        doc.setFontSize(12);
        doc.text(`• Total de Chamados: ${mockTickets.length}`, 30, 165);
        doc.text(`• Chamados em Aberto: ${mockTickets.filter(t => t.status === 'open').length}`, 30, 180);
        doc.text(`• Chamados em Andamento: ${mockTickets.filter(t => t.status === 'inProgress').length}`, 30, 195);
        doc.text(`• Chamados Concluídos: ${mockTickets.filter(t => t.status === 'closed').length}`, 30, 210);

        // Add trend analysis
        doc.setFontSize(16);
        doc.text('Análise de Tendências:', 20, 235);

        doc.setFontSize(12);
        doc.text('• Eficiência: ↑ 5% em relação ao período anterior', 30, 250);
        doc.text('• Tempo de Resposta: ↓ 15% em relação ao período anterior', 30, 265);
        doc.text('• Taxa de Resolução: ↑ 8% em relação ao período anterior', 30, 280);

        // Save the PDF
        doc.save(`relatorio-manutencao-${new Date().toISOString().split('T')[0]}.pdf`);

        showNotification('Exportação Concluída', 'O relatório foi exportado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro na Exportação', 'Ocorreu um erro ao gerar o PDF. Tentando exportação alternativa...', 'warning');

        // Fallback to text export
        const reportData = `
Relatório de Manutenção
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

Métricas de Desempenho:
- Eficiência Média: 87%
- Tempo Médio de Resposta: 1h 23min
- Taxa de Resolução na 1ª Visita: 72%
- Satisfação com o Atendimento: 4.7/5.0

Resumo de Chamados:
- Total de Chamados: ${mockTickets.length}
- Chamados em Aberto: ${mockTickets.filter(t => t.status === 'open').length}
- Chamados em Andamento: ${mockTickets.filter(t => t.status === 'inProgress').length}
- Chamados Concluídos: ${mockTickets.filter(t => t.status === 'closed').length}

Análise de Tendências:
- Eficiência: ↑ 5% em relação ao período anterior
- Tempo de Resposta: ↓ 15% em relação ao período anterior
- Taxa de Resolução: ↑ 8% em relação ao período anterior
- Satisfação: ↑ 0.3 em relação ao período anterior
        `;

        // Create and download file
        const blob = new Blob([reportData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-manutencao-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// Load tickets function
function loadTickets() {
    const contentArea = document.getElementById('content-area');

    // Prepare status labels for better display
    const getStatusLabel = (status) => {
        switch (status) {
            case 'open': return '<span class="status-badge status-warning">Em Aberto</span>';
            case 'inProgress': return '<span class="status-badge status-info">Em Andamento</span>';
            case 'closed': return '<span class="status-badge status-ok">Concluído</span>';
            default: return '<span class="status-badge">Desconhecido</span>';
        }
    };

    // Get machine name by ID
    const getMachineName = (id) => {
        const machine = mockMachines.find(m => m.id === id);
        return machine ? machine.name : 'Desconhecido';
    };

    // Get part name by ID
    const getPartName = (id) => {
        const part = mockParts.find(p => p.id === id);
        return part ? part.name : 'Desconhecido';
    };

    // Get user name by ID
    const getUserName = (id) => {
        if (!id) return 'Não atribuído';
        const user = mockUsers.find(u => u.id === id);
        return user ? user.name : 'Desconhecido';
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Chamados de Manutenção</h2>
            <button id="new-ticket-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                </svg>
                Novo Chamado
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-status">Status</label>
                    <select id="filter-status">
                        <option value="">Todos</option>
                        <option value="open">Em Aberto</option>
                        <option value="inProgress">Em Andamento</option>
                        <option value="closed">Concluído</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-machine">Máquina</label>
                    <select id="filter-machine">
                        <option value="">Todas</option>
                        ${mockMachines.map(machine => `<option value="${machine.id}">${machine.name}</option>`).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-date">Data (início)</label>
                    <input type="date" id="filter-date">
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Máquina</th>
                    <th>Peça</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Abertura</th>
                    <th>Técnico</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${mockTickets.map(ticket => `
                    <tr>
                        <td>${ticket.id}</td>
                        <td>${getMachineName(ticket.machineId)}</td>
                        <td>${getPartName(ticket.partId)}</td>
                        <td>${ticket.description}</td>
                        <td>${getStatusLabel(ticket.status)}</td>
                        <td>${formatDate(ticket.createdAt)}</td>
                        <td>${getUserName(ticket.assignedTo)}</td>
                        <td class="actions-cell">
                            <button class="action-btn view-ticket" data-id="${ticket.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                Ver
                            </button>
                            ${ticket.status === 'open' && currentUser.role === 'technician' ? `
                                <button class="action-btn start-maintenance" data-id="${ticket.id}">Iniciar</button>
                            ` : ''}
                            ${ticket.status === 'inProgress' && (currentUser.id === ticket.assignedTo || currentUser.role === 'manager') ? `
                                <button class="action-btn finish-maintenance" data-id="${ticket.id}">Concluir</button>
                            ` : ''}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Add event listeners for the ticket actions
    viewTicketDetailsEventListener();
    startMaintenanceEventListener();
    finishMaintenanceEventListener();

    // Event listener for new ticket button
    document.getElementById('new-ticket-btn').addEventListener('click', () => {
        showNewTicketForm();
    });

    // Apply filters event
    document.getElementById('apply-filters').addEventListener('click', filterTickets);

    // Clear filters event
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
}

// Helper function for viewing ticket details
function viewTicketDetailsEventListener() {
    document.querySelectorAll('.view-ticket').forEach(button => {
        button.addEventListener('click', (e) => {
            const ticketId = parseInt(e.currentTarget.getAttribute('data-id'));
            viewTicketDetails(ticketId);
        });
    });
}

// Helper function for starting maintenance
function startMaintenanceEventListener() {
    document.querySelectorAll('.start-maintenance').forEach(button => {
        button.addEventListener('click', (e) => {
            const ticketId = parseInt(e.currentTarget.getAttribute('data-id'));
            startMaintenance(ticketId);
        });
    });
}

// Helper function for finishing maintenance
function finishMaintenanceEventListener() {
    document.querySelectorAll('.finish-maintenance').forEach(button => {
        button.addEventListener('click', (e) => {
            const ticketId = parseInt(e.currentTarget.getAttribute('data-id'));
            finishMaintenance(ticketId);
        });
    });
}

// Helper function to view ticket details
function viewTicketDetails(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado', 'error');
        return;
    }

    // Implementation for viewing ticket details
    showNotification('Detalhes do Chamado', `Visualizando detalhes do chamado #${ticketId}`, 'info');
    // In a real app, this would open a modal or navigate to a details page
}

// Helper function to show new ticket form
function showNewTicketForm() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Novo Chamado</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form id="new-ticket-form">
                <div class="form-group">
                    <label for="ticket-machine">Máquina:</label>
                    <select id="ticket-machine" required>
                        <option value="">Selecione uma máquina</option>
                        ${mockMachines.map(machine => `<option value="${machine.id}">${machine.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="ticket-part">Peça:</label>
                    <select id="ticket-part" required disabled>
                        <option value="">Selecione uma máquina primeiro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ticket-description">Descrição do Problema:</label>
                    <textarea id="ticket-description" rows="4" required placeholder="Descreva o problema encontrado..."></textarea>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Criar Chamado</button>
                    <button type="button" class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Machine selection changes available parts
    const machineSelect = document.getElementById('ticket-machine');
    const partSelect = document.getElementById('ticket-part');

    machineSelect.addEventListener('change', () => {
        const machineId = parseInt(machineSelect.value);
        partSelect.disabled = !machineId;

        // Reset parts dropdown
        partSelect.innerHTML = '<option value="">Selecione uma peça</option>';

        if (machineId) {
            // Get parts for selected machine
            const machineParts = mockParts.filter(p => p.machineId === machineId);
            machineParts.forEach(part => {
                const option = document.createElement('option');
                option.value = part.id;
                option.textContent = part.name;
                partSelect.appendChild(option);
            });
        }
    });

    // Form submit event
    modal.querySelector('#new-ticket-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const machineId = parseInt(document.getElementById('ticket-machine').value);
        const partId = parseInt(document.getElementById('ticket-part').value);
        const description = document.getElementById('ticket-description').value;

        // Create new ticket
        const newTicket = {
            id: mockTickets.length + 1,
            machineId,
            partId,
            maintenanceTypeId: null, // To be determined by technician
            description,
            createdBy: currentUser.id,
            status: 'open',
            createdAt: new Date(),
            assignedTo: null,
            startedAt: null,
            estimatedTime: null,
            finishedAt: null
        };

        mockTickets.push(newTicket);

        modal.remove();
        showNotification('Chamado Criado', `Chamado #${newTicket.id} criado com sucesso!`, 'success');

        // Create notification for technicians
        if (window.notificationSystem) {
            window.notificationSystem.createNotification(
                'ticket',
                `Novo chamado #${newTicket.id} criado para ${getMachineName(machineId)}`,
                null,
                newTicket.id
            );
        }

        // Reload tickets to reflect changes
        loadTickets();
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Helper function for starting maintenance
function startMaintenance(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado', 'error');
        return;
    }

    ticket.status = 'inProgress';
    ticket.assignedTo = currentUser.id;
    ticket.startedAt = new Date();

    // Find the estimated time for this maintenance
    const maintenanceType = mockMaintenanceTimes.find(mt => mt.partId === ticket.partId);
    ticket.estimatedTime = maintenanceType ? maintenanceType.estimatedTime : 60; // Default to 60 min

    showNotification('Manutenção Iniciada', `Você iniciou a manutenção do chamado #${ticketId}`, 'success');

    // Reload tickets to reflect changes
    loadTickets();
}

// Helper function for finishing maintenance
function finishMaintenance(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado', 'error');
        return;
    }

    ticket.status = 'closed';
    ticket.finishedAt = new Date();

    showNotification('Manutenção Concluída', `Manutenção do chamado #${ticketId} foi concluída com sucesso`, 'success');

    // Reload tickets to reflect changes
    loadTickets();
}

// Filter tickets based on selected criteria
function filterTickets() {
    const statusFilter = document.getElementById('filter-status');
    const machineFilter = document.getElementById('filter-machine');
    const dateFilter = document.getElementById('filter-date');

    if (!statusFilter || !machineFilter || !dateFilter) {
        showNotification('Erro', 'Elementos de filtro não encontrados', 'error');
        return;
    }

    const statusValue = statusFilter.value;
    const machineValue = machineFilter.value;
    const dateValue = dateFilter.value;

    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        if (row.cells.length >= 6) {
            const status = row.cells[4].textContent.toLowerCase();
            const machine = row.cells[1].textContent;
            const dateText = row.cells[5].textContent;

            let showRow = true;

            if (statusValue && !status.includes(statusValue.replace('Progress', ' andamento').replace('open', 'aberto').replace('closed', 'concluído'))) {
                showRow = false;
            }

            if (machineValue) {
                const selectedMachine = mockMachines.find(m => m.id == machineValue);
                if (selectedMachine && machine !== selectedMachine.name) {
                    showRow = false;
                }
            }

            if (dateValue && dateText !== 'N/A') {
                try {
                    const rowDateParts = dateText.split(' ')[0].split('/');
                    if (rowDateParts.length === 3) {
                        const rowDate = new Date(rowDateParts[2], rowDateParts[1] - 1, rowDateParts[0]);
                        const filterDate = new Date(dateValue);
                        if (rowDate.toDateString() !== filterDate.toDateString()) {
                            showRow = false;
                        }
                    }
                } catch (error) {
                    // Skip date filtering if date parsing fails
                }
            }

            row.style.display = showRow ? '' : 'none';
        }
    });

    showNotification('Filtros Aplicados', 'Os chamados foram filtrados conforme selecionado', 'info');
}

// Clear applied filters
function clearFilters() {
    const statusFilter = document.getElementById('filter-status');
    const machineFilter = document.getElementById('filter-machine');
    const dateFilter = document.getElementById('filter-date');

    if (statusFilter) statusFilter.value = '';
    if (machineFilter) machineFilter.value = '';
    if (dateFilter) dateFilter.value = '';

    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    showNotification('Filtros Limpos', 'Os filtros foram removidos', 'info');
}

// Load dashboard function
function loadDashboard() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Dashboard</h2>
            <div class="export-options">
                <button class="export-btn" id="dashboard-export-pdf">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                </svg>
                    Exportar PDF
                </button>
                <button class="export-btn" id="dashboard-export-csv">
                    <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                    Exportar CSV
                </button>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Total de Chamados</h3>
                <div class="dashboard-metric">${mockTickets.length}</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 12%</span> em relação ao mês anterior
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Chamados em Aberto</h3>
                <div class="dashboard-metric">${mockTickets.filter(t => t.status === 'open').length}</div>
                <div class="dashboard-trend">
                    <span class="trend-down">↓ 5%</span> em relação ao mês anterior
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Chamados em Andamento</h3>
                <div class="dashboard-metric">${mockTickets.filter(t => t.status === 'inProgress').length}</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 8%</span> em relação ao mês anterior
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Chamados Concluídos</h3>
                <div class="dashboard-metric">${mockTickets.filter(t => t.status === 'closed').length}</div>
                <div class="dashboard-trend">
                    <span class="trend-up">↑ 15%</span> em relação ao mês anterior
                </div>
            </div>
        </div>

        <div class="chart-container">
            <h3>Chamados por Status</h3>
            <canvas id="statusChart"></canvas>
        </div>

        <div class="chart-container">
            <h3>Tempo Médio de Resolução por Tipo de Manutenção</h3>
            <canvas id="timeChart"></canvas>
        </div>
    `;

    // Initialize Charts
    initializeCharts();

    // Add event listeners for export buttons
    document.getElementById('dashboard-export-pdf').addEventListener('click', () => {
        showNotification('Exportação Iniciada', 'O relatório está sendo gerado em PDF...', 'info');
        setTimeout(() => {
            const dashboardData = `
Dashboard de Manutenção
Generated on: ${new Date().toLocaleDateString('pt-BR')}

Métricas Principais:
- Total de Chamados: ${mockTickets.length}
- Chamados em Aberto: ${mockTickets.filter(t => t.status === 'open').length}
- Chamados em Andamento: ${mockTickets.filter(t => t.status === 'inProgress').length}
- Chamados Concluídos: ${mockTickets.filter(t => t.status === 'closed').length}

Tendências:
- Total: ↑ 12% em relação ao mês anterior
- Em Aberto: ↓ 5% em relação ao mês anterior
- Em Andamento: ↑ 8% em relação ao mês anterior
- Concluídos: ↑ 15% em relação ao mês anterior
            `;

            const blob = new Blob([dashboardData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dashboard-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showNotification('Exportação Concluída', 'O relatório em PDF foi gerado com sucesso!', 'success');
        }, 2000);
    });

    document.getElementById('dashboard-export-csv').addEventListener('click', () => {
        showNotification('Exportação Iniciada', 'Os dados estão sendo exportados em CSV...', 'info');
        setTimeout(() => {
            exportReportCSV(); // Use the same CSV export function
        }, 500);
    });
}

// Initialize charts for dashboard
function initializeCharts() {
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Em Aberto', 'Em Andamento', 'Concluídos'],
                datasets: [{
                    label: 'Quantidade',
                    data: [
                        mockTickets.filter(t => t.status === 'open').length,
                        mockTickets.filter(t => t.status === 'inProgress').length,
                        mockTickets.filter(t => t.status === 'closed').length
                    ],
                    backgroundColor: [
                        '#ffc857', // warning
                        '#4cc9f0', // info
                        '#2a9d8f'  // success
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = (value * 100 / total).toFixed(1) + '%';
                            return percentage;
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // Time Chart
    const timeCtx = document.getElementById('timeChart').getContext('2d');
    if (timeCtx) {
        new Chart(timeCtx, {
            type: 'bar',
            data: {
                labels: ['Ajuste', 'Troca', 'Calibração', 'Reparo', 'Lubrificação', 'Tensionamento'],
                datasets: [{
                    label: 'Tempo Médio (minutos)',
                    data: [35, 120, 37.5, 90, 20, 30],
                    backgroundColor: '#415a77',
                    borderColor: '#1b263b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutos',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tipo de Manutenção',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Toggle between dark and light mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-switch').checked = true;
    darkMode = true;
    localStorage.setItem('darkMode', 'true');
}

function enableLightMode() {
    document.body.classList.remove('dark-mode');
    document.getElementById('theme-switch').checked = false;
    darkMode = false;
    localStorage.setItem('darkMode', 'false');
}

// Mock functions for forgot password - to be used on login page
function showForgotPasswordForm() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('password-recovery-container').classList.remove('hidden');

    // Add event listeners for recovery form
    document.getElementById('recovery-form').addEventListener('submit', handlePasswordRecovery);
    document.getElementById('back-to-login').addEventListener('click', () => {
        document.getElementById('password-recovery-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
    });
}

function handlePasswordRecovery(e) {
    e.preventDefault();
    const email = document.getElementById('recovery-email').value;

    // Simulate sending recovery email
    showNotification('Email Enviado', `Um link de recuperação foi enviado para ${email}. Verifique sua caixa de entrada.`, 'success');

    // Go back to login screen after 2 seconds
    setTimeout(() => {
        document.getElementById('password-recovery-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
    }, 2000);
}

// Sistema de consentimento de cookies
function checkCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');

    // Verificar se o usuário já aceitou os cookies
    if (getCookie('cookieConsent') !== 'accepted') {
        // Exibir o banner de consentimento após um pequeno delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
            // Anunciar para leitores de tela
            announceToScreenReader('Aviso importante sobre política de privacidade e cookies');
        }, 1000);
    }

    // Event listeners para os botões do banner
    document.getElementById('cookie-accept').addEventListener('click', () => {
        acceptCookies();
    });

    document.getElementById('cookie-settings').addEventListener('click', () => {
        showCookieSettings();
    });

    document.getElementById('privacy-policy-link').addEventListener('click', (e) => {
        e.preventDefault();
        showPrivacyPolicy();
    });

    document.getElementById('terms-link').addEventListener('click', (e) => {
        e.preventDefault();
        showTermsOfUse();
    });
}

// Aceitar cookies e armazenar consentimento
function acceptCookies() {
    // Definir cookie de consentimento válido por 180 dias
    setCookie('cookieConsent', 'accepted', 180);

    // Fechar o banner
    const cookieConsent = document.getElementById('cookie-consent');
    cookieConsent.classList.remove('show');

    // Notificar o usuário
    showNotification('Cookies Aceitos', 'Obrigado por aceitar nossos cookies e política de privacidade!', 'success');

    // Anunciar para leitores de tela
    announceToScreenReader('Cookies aceitos. Obrigado por concordar com nossa política de privacidade.');
}

// Mostrar configurações de cookies (em uma implementação real, isso abriria um modal com opções)
function showCookieSettings() {
    // Implementation simulada - em um cenário real, abriria um modal com configurações detalhadas
    showNotification('Configurações de Cookies', 'As configurações detalhadas de cookies serão implementadas em breve.', 'info');

    // Por enquanto, apenas aceita os cookies essenciais
    setCookie('cookieConsent', 'essentials', 180);

    // Fechar o banner
    const cookieConsent = document.getElementById('cookie-consent');
    cookieConsent.classList.remove('show');
}

// Mostrar política de privacidade (simulado)
function showPrivacyPolicy() {
    // Implementação simulada - em um cenário real, abriria um modal ou redirecionaria para página de política
    showNotification('Política de Privacidade', 'A política de privacidade completa seria exibida aqui.', 'info');
}

// Mostrar termos de uso (simulado)
function showTermsOfUse() {
    // Implementação simulada - em um cenário real, abriria um modal ou redirecionaria para página de termos
    showNotification('Termos de Uso', 'Os termos de uso completos seriam exibidos aqui.', 'info');
}

// Função para definir cookies
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Strict';
}

// Função para obter valor de um cookie
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Função para excluir um cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// Initialize notification system
function initializeNotificationSystem() {
    // Create or ensure window.notificationSystem exists
    window.notificationSystem = window.notificationSystem || {};

    if (!window.notificationSystem?.messages) {
        // Populate with mock/initial data
        window.notificationSystem = {
            messages: [],
            notifications: [],
            announcements: [],
            callbacks: {},
            ...window.notificationSystem
        };
    }

    window.notificationSystem.messages = mockMessages;
    window.notificationSystem.announcements = mockAnnouncements;

    // Load state from localStorage
    window.notificationSystem.loadState();

    // Set up event listeners for notifications
    window.notificationSystem.on('newMessage', (message) => {
        if (currentUser && message.toUserId === currentUser.id) {
            const sender = mockUsers.find(u => u.id === message.fromUserId);
            showNotification(
                'Nova Mensagem',
                `Você recebeu uma nova mensagem de ${sender ? sender.name : 'Usuário Desconhecido'}`,
                'info'
            );
            updateHeaderNotifications();
        }
    });

    window.notificationSystem.on('newAnnouncement', (announcement) => {
        if (currentUser && (!announcement.targetSectors || announcement.targetSectors.includes(currentUser.sector))) {
            showNotification(
                'Novo Comunicado',
                `Novo comunicado: ${announcement.title}`,
                'info'
            );
            updateHeaderNotifications();
        }
    });

    window.notificationSystem.on('newNotification', (notification) => {
        if (currentUser && (notification.targetUserId === null || notification.targetUserId === currentUser.id)) {
            updateHeaderNotifications();
        }
    });

    // Save state periodically
    setInterval(() => {
        window.notificationSystem.saveState();
    }, 60000); // Save every minute
}

// Update notification count in header
function updateHeaderNotifications() {
    if (!currentUser) return;

    const messageCount = window.notificationSystem.getUnreadMessageCount(currentUser.id);
    const announcementCount = window.notificationSystem.getUserAnnouncements(currentUser.id, currentUser.sector)
        .filter(a => !a.readBy.includes(currentUser.id)).length;
    const notificationCount = window.notificationSystem.getUnreadNotificationCount(currentUser.id);

    const totalCount = messageCount + announcementCount + notificationCount;

    const notificationCountElement = document.getElementById('notification-count');
    notificationCountElement.textContent = totalCount;

    if (totalCount > 0) {
        notificationCountElement.style.display = 'flex';
    } else {
        notificationCountElement.style.display = 'none';
    }
}

// Setup event for notification bell
function setupNotificationBell() {
    const notificationBell = document.getElementById('notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', toggleNotificationPanel);
    }
}

// Toggle notification panel
function toggleNotificationPanel() {
    const existingPanel = document.getElementById('notification-panel');

    if (existingPanel) {
        existingPanel.remove();
        return;
    }

    if (!currentUser) return;

    // Get user's notifications
    const messages = window.notificationSystem.getUserMessages(currentUser.id);
    const unreadMessageCount = window.notificationSystem.getUnreadMessageCount(currentUser.id);

    const announcements = window.notificationSystem.getUserAnnouncements(currentUser.id, currentUser.sector);
    const unreadAnnouncementCount = announcements.filter(a => !a.readBy.includes(currentUser.id)).length;

    const notifications = window.notificationSystem.getUserNotifications(currentUser.id);
    const unreadNotificationCount = window.notificationSystem.getUnreadNotificationCount(currentUser.id);

    // Create notification panel
    const panel = document.createElement('div');
    panel.id = 'notification-panel';
    panel.className = 'notification-panel';

    panel.innerHTML = `
        <div class="notification-panel-header">
            <h3>Notificações</h3>
            <button class="mark-all-read">Marcar todas como lidas</button>
        </div>
        <div class="notification-panel-tabs">
            <div class="notification-tab active" data-tab="all">
                Todas (${unreadMessageCount + unreadAnnouncementCount + unreadNotificationCount})
            </div>
            <div class="notification-tab" data-tab="messages">
                Mensagens (${unreadMessageCount})
            </div>
            <div class="notification-tab" data-tab="announcements">
                Avisos (${unreadAnnouncementCount})
            </div>
        </div>
        <div class="notification-panel-content">
            ${renderNotificationItems(messages, announcements, notifications)}
        </div>
        <div class="notification-panel-footer">
            <a href="#" id="view-all-notifications">Ver todas as notificações</a>
        </div>
    `;

    // Append to body
    document.body.appendChild(panel);

    // Add event listeners
    setupNotificationPanelEvents(panel);
}

// Render notification items
function renderNotificationItems(messages, announcements, notifications, filter = 'all') {
    if (messages.length === 0 && announcements.length === 0 && notifications.length === 0) {
        return `<div class="notification-empty">Nenhuma notificação encontrada</div>`;
    }

    let html = '';

    // Filter items based on tab
    const messagesToShow = (filter === 'all' || filter === 'messages') ? messages : [];
    const announcementsToShow = (filter === 'all' || filter === 'announcements') ? announcements : [];
    const notificationsToShow = (filter === 'all') ? notifications : [];

    // Combine all items and sort by date (newest first)
    const allItems = [
        ...messagesToShow.map(item => ({ type: 'message', data: item })),
        ...announcementsToShow.map(item => ({ type: 'announcement', data: item })),
        ...notificationsToShow.map(item => ({ type: 'notification', data: item }))
    ].sort((a, b) => new Date(b.data.timestamp) - new Date(a.data.timestamp));

    // Render each item
    allItems.forEach(item => {
        if (item.type === 'message') {
            const message = item.data;
            const sender = mockUsers.find(u => u.id === message.fromUserId);

            html += `
                <div class="notification-item ${message.read ? '' : 'unread'}" data-type="message" data-id="${message.id}">
                    <div class="notification-icon">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    </div>
                    <div class="notification-info">
                        <div class="notification-message">
                            <strong>${sender ? sender.name : 'Usuário Desconhecido'}</strong> enviou uma mensagem: ${message.subject}
                        </div>
                        <div class="notification-time">${formatDatetime(message.timestamp)}</div>
                    </div>
                </div>
            `;
        } else if (item.type === 'announcement') {
            const announcement = item.data;
            const sender = mockUsers.find(u => u.id === announcement.fromUserId);
            const isRead = announcement.readBy.includes(currentUser.id);

            html += `
                <div class="notification-item ${isRead ? '' : 'unread'}" data-type="announcement" data-id="${announcement.id}">
                    <div class="notification-icon">
                        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                    </svg>
                    </div>
                    <div class="notification-info">
                        <div class="notification-message">
                            <strong>${sender ? sender.name : 'Sistema'}</strong> publicou um comunicado: ${announcement.title}
                        </div>
                        <div class="notification-time">${formatDatetime(announcement.timestamp)}</div>
                    </div>
                </div>
            `;
        } else if (item.type === 'notification') {
            const notification = item.data;

            html += `
                <div class="notification-item ${notification.read ? '' : 'unread'}" data-type="notification" data-id="${notification.id}">
                    <div class="notification-icon">
                        <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2-4H6V5h12v12h-2v-2H4v2z"/>
                    </svg>
                    </div>
                    <div class="notification-info">
                        <div class="notification-message">
                            ${notification.content}
                        </div>
                        <div class="notification-time">${formatDatetime(notification.timestamp)}</div>
                    </div>
                </div>
            `;
        }
    });

    return html;
}

// Setup events for notification panel
function setupNotificationPanelEvents(panel) {
    // Tabs
    const tabs = panel.querySelectorAll('.notification-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-tab');
            const messages = window.notificationSystem.getUserMessages(currentUser.id);
            const announcements = window.notificationSystem.getUserAnnouncements(currentUser.id, currentUser.sector);
            const notifications = window.notificationSystem.getUserNotifications(currentUser.id);

            panel.querySelector('.notification-panel-content').innerHTML =
                renderNotificationItems(messages, announcements, notifications, filter);

            // Re-attach event listeners to new items
            setupNotificationItemEvents(panel);
        });
    });

    // Mark all as read
    const markAllReadBtn = panel.querySelector('.mark-all-read');
    markAllReadBtn.addEventListener('click', () => {
        // Mark all messages as read
        window.notificationSystem.messages.forEach(message => {
            if (message.toUserId === currentUser.id && !message.read) {
                window.notificationSystem.markMessageAsRead(message.id);
            }
        });

        // Mark all announcements as read
        window.notificationSystem.announcements.forEach(announcement => {
            if (!announcement.targetSectors || announcement.targetSectors.includes(currentUser.sector)) {
                window.notificationSystem.markAnnouncementAsRead(announcement.id, currentUser.id);
            }
        });

        // Mark all notifications as read
        window.notificationSystem.notifications.forEach(notification => {
            if (notification.targetUserId === currentUser.id || notification.targetUserId === null) {
                window.notificationSystem.markNotificationAsRead(notification.id);
            }
        });

        // Update UI
        updateHeaderNotifications();
        toggleNotificationPanel(); // Close and reopen to refresh
        toggleNotificationPanel();
    });

    // View all notifications
    const viewAllBtn = panel.querySelector('#view-all-notifications');
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleNotificationPanel(); // Close the panel
        loadCommunications(); // Load the communications page
    });

    // Setup item events
    setupNotificationItemEvents(panel);

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== document.getElementById('notification-bell')) {
            panel.remove();
        }
    });
}

// Setup events for notification items
function setupNotificationItemEvents(panel) {
    const items = panel.querySelectorAll('.notification-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const id = parseInt(item.getAttribute('data-id'));

            if (type === 'message') {
                // Mark message as read
                window.notificationSystem.markMessageAsRead(id);
                item.classList.remove('unread');

                // Open messaging interface with this message selected
                toggleNotificationPanel(); // Close panel
                loadCommunications('messages', id);
            } else if (type === 'announcement') {
                // Mark announcement as read
                window.notificationSystem.markAnnouncementAsRead(id, currentUser.id);
                item.classList.remove('unread');

                // Open announcements interface
                toggleNotificationPanel(); // Close panel
                loadCommunications('announcements', id);
            } else if (type === 'notification') {
                // Mark notification as read
                window.notificationSystem.markNotificationAsRead(id);
                item.classList.remove('unread');

                // Handle notification based on its type
                const notification = window.notificationSystem.notifications.find(n => n.id === id);
                if (notification && notification.relatedItemId) {
                    // Navigate to related item
                    handleNotificationNavigation(notification);
                }
            }

            // Update header notification count
            updateHeaderNotifications();
        });
    });
}

// Handle navigation when a notification is clicked
function handleNotificationNavigation(notification) {
    // Implementation depends on your application structure
    // For example, if notification is about a ticket:
    if (notification.type === 'ticket') {
        toggleNotificationPanel(); // Close panel
        loadTickets();
        // Additional logic to select the specific ticket
    } else if (notification.type === 'maintenance') {
        toggleNotificationPanel(); // Close panel
        loadMyTasks();
    }
}

// Load communications page
function loadCommunications(defaultTab = 'messages', selectedItemId = null) {
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
        <div class="page-title">
            <h2>Comunicações</h2>
        </div>

        <div class="communication-tabs">
            <button class="btn-tab ${defaultTab === 'messages' ? 'active' : ''}" data-tab="messages">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9z"/>
                </svg>
                Mensagens
            </button>
            <button class="btn-tab ${defaultTab === 'announcements' ? 'active' : ''}" data-tab="announcements">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
                </svg>
                Avisos e Comunicados
            </button>
        </div>

        <div id="communication-content"></div>
    `;

    // Set up tab switching
    const tabs = document.querySelectorAll('.communication-tabs .btn-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.getAttribute('data-tab');
            const contentArea = document.getElementById('communication-content');

            if (tabName === 'messages') {
                renderMessagingInterface(contentArea);
            } else if (tabName === 'announcements') {
                renderAnnouncementsInterface(contentArea);
            }
        });
    });

    // Load default tab content
    const contentContainer = document.getElementById('communication-content');
    if (defaultTab === 'messages') {
        renderMessagingInterface(contentContainer);
    } else if (defaultTab === 'announcements') {
        renderAnnouncementsInterface(contentContainer);
    }
}

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
    });
}

// Helper function to translate roles
function translateRole(role) {
    switch (role) {
        case 'operator': return 'Operador';
        case 'technician': return 'Técnico';
        case 'manager': return 'Gestor';
        case 'admin': return 'Administrador';
        default: return 'Desconhecido';
    }
}

// Show notification function
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) {
        console.warn('Notification container not found');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const iconSvg = getNotificationIcon(type);

    notification.innerHTML = `
        <div class="notification-icon">
            ${iconSvg}
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" aria-label="Fechar notificação">&times;</button>
    `;

    container.appendChild(notification);

    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        case 'error':
            return '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        case 'warning':
            return '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
        default:
            return '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
    }
}

// Generate report function
function generateReport() {
    const startDate = document.getElementById('report-start-date');
    const endDate = document.getElementById('report-end-date');
    const reportType = document.getElementById('report-type');

    if (!startDate || !endDate || !reportType) {
        showNotification('Erro', 'Elementos do formulário não encontrados', 'error');
        return;
    }

    const startDateValue = startDate.value;
    const endDateValue = endDate.value;
    const reportTypeValue = reportType.value;

    if (!startDateValue || !endDateValue) {
        showNotification('Erro', 'Por favor, selecione o período do relatório', 'error');
        return;
    }

    showNotification('Relatório Gerado', `Relatório de ${reportTypeValue} gerado para o período de ${startDateValue} a ${endDateValue}`, 'success');

    // Simulate report generation
    setTimeout(() => {
        initializeReportCharts();
    }, 1000);
}

// Helper functions for date formatting
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getThirtyDaysAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
}

function formatDatetime(date) {
    return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to export report data as CSV
function exportReportCSV() {
    showNotification('Exportação Iniciada', 'O relatório está sendo exportado para CSV...', 'info');

    try {
        // Get report data
        const reportType = document.getElementById('report-type').value;
        const startDate = document.getElementById('report-start-date').value;
        const endDate = document.getElementById('report-end-date').value;

        // Format CSV content
        let csvContent = "Tipo de Relatório;Período;Qtde Chamados;Tempo Médio;Eficiência\n";
        csvContent += `${translateReportType(reportType)};${startDate} a ${endDate};${mockTickets.length};60min;87%\n\n`;

        // Add ticket details
        csvContent += "ID;Máquina;Peça;Descrição;Status;Data Abertura;Técnico\n";
        mockTickets.forEach(ticket => {
            csvContent += `${ticket.id};"${getMachineName(ticket.machineId)}";"${getPartName(ticket.partId)}";"${ticket.description}";"${ticket.status}";"${formatDatetime(ticket.createdAt)}";"${getUserName(ticket.assignedTo)}"\n`;
        });

        // Create and download CSV file
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${reportType}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showNotification('Exportação Concluída', 'O relatório foi exportado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        showNotification('Erro na Exportação', 'Ocorreu um erro ao gerar o relatório. Tente novamente.', 'error');
    }
}

// Helper function to translate report type names
function translateReportType(type) {
    switch (type) {
        case 'performance': return 'Desempenho';
        case 'failure': return 'Falhas';
        case 'cost': return 'Custo de Manutenção';
        case 'workload': return 'Carga de Trabalho';
        default: return 'Outro';
    }
}