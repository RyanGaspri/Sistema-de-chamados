// Dados mockados para simulação
const mockUsers = [
    { id: 1, username: "operador", password: "op123", name: "João Operador", role: "operator", sector: "Produção", email: "joao@empresa.com" },
    { id: 2, username: "gestor", password: "ges123", name: "Maria Gestora", role: "manager", sector: "Gerência", email: "maria@empresa.com" },
    { id: 3, username: "tecnico", password: "tec123", name: "Pedro Técnico", role: "technician", sector: "Automação", email: "pedro@empresa.com" },
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

// Sistema de notificações
const notifications = [];
let notificationCount = 0;

// Estado da aplicação
let currentUser = null;
let darkMode = false;
let sidebarOpen = true;
let countdownIntervals = [];

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Verificar preferência de tema
    if (localStorage.getItem('darkMode') === 'true') {
        enableDarkMode();
    }

    // Event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Forgot Password
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', showPasswordRecovery);
    }

    // Back to login
    const backToLoginBtn = document.getElementById('back-to-login');
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', hidePasswordRecovery);
    }

    // Recovery form
    const recoveryForm = document.getElementById('recovery-form');
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', handlePasswordRecovery);
    }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
        themeSwitch.checked = localStorage.getItem('darkMode') === 'true';
    }

    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // Notification bell
    const notificationBell = document.getElementById('notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', toggleNotificationPanel);
    }
}

// Theme Functions
function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    darkMode = true;

    // Update charts if they exist
    updateChartsForTheme();
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    darkMode = false;

    // Update charts if they exist
    updateChartsForTheme();
}

function updateChartsForTheme() {
    // This will be called when theme changes to update any visible charts
    // We'll implement this in the chart rendering functions
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');

    if (sidebar) {
        if (sidebar.classList.contains('open') || sidebarOpen) {
            sidebar.classList.remove('open');
            menuToggle.classList.remove('active');
            sidebarOpen = false;
        } else {
            sidebar.classList.add('open');
            menuToggle.classList.add('active');
            sidebarOpen = true;
        }
    }
}

// Notification System
function showNotification(title, message, type = 'info', duration = 5000) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let iconPath = '';
    switch (type) {
        case 'info':
            iconPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z';
            break;
        case 'success':
            iconPath = 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
            break;
        case 'warning':
            iconPath = 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
            break;
        case 'error':
            iconPath = 'M12 2C6.48 2 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z';
            break;
    }

    notification.innerHTML = `
        <div class="notification-icon">
            <svg viewBox="0 0 24 24">
                <path d="${iconPath}"/>
            </svg>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    // Increment notification counter
    updateNotificationCount(1);

    // Store notification for history
    notifications.push({
        id: notifications.length + 1,
        title,
        message,
        type,
        timestamp: new Date()
    });

    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notificationContainer.removeChild(notification);
    });

    return notification;
}

function updateNotificationCount(change) {
    notificationCount += change;
    const countElement = document.getElementById('notification-count');

    if (countElement) {
        countElement.textContent = notificationCount > 9 ? '9+' : notificationCount;
        countElement.style.display = notificationCount > 0 ? 'flex' : 'none';
    }
}

function toggleNotificationPanel() {
    // For future implementation: show notification history panel
    showNotification('Notificações', 'Histórico de notificações será implementado em breve.', 'info');

    // Reset notification count when viewed
    updateNotificationCount(-notificationCount);
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Set interval to simulate real-time updates
    setInterval(() => {
        if (!currentUser) return; // Only if logged in

        const randomEvent = Math.floor(Math.random() * 10);

        if (randomEvent < 3 && currentUser.role === 'technician') {
            // New ticket assigned
            const machine = mockMachines[Math.floor(Math.random() * mockMachines.length)];
            showNotification(
                'Novo chamado atribuído',
                `Você recebeu um novo chamado para a ${machine.name}`,
                'info'
            );
        } else if (randomEvent === 3 && currentUser.role === 'manager') {
            // Critical machine status
            const machine = mockMachines[Math.floor(Math.random() * mockMachines.length)];
            showNotification(
                'Alerta de máquina',
                `${machine.name} está apresentando status crítico`,
                'warning'
            );
        } else if (randomEvent === 4) {
            // Maintenance completed
            showNotification(
                'Manutenção concluída',
                'Uma tarefa de manutenção foi concluída com sucesso',
                'success'
            );
        }
    }, 45000); // Every 45 seconds
}

// Funções auxiliares
function getFormattedDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleString('pt-BR');
}

function getWeeklyTicketsCount(machineId) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return mockTickets.filter(ticket =>
        ticket.machineId === machineId &&
        new Date(ticket.createdAt) >= oneWeekAgo
    ).length;
}

function getMachineStatus(machineId) {
    const ticketsCount = getWeeklyTicketsCount(machineId);

    if (ticketsCount < 3) return "ok";
    if (ticketsCount < 6) return "warning";
    return "critical";
}

function getStatusLabel(status) {
    switch (status) {
        case "ok": return "OK";
        case "warning": return "Atenção";
        case "critical": return "Crítico";
        case "active": return "Ativa";
        case "maintenance": return "Em Manutenção";
        case "open": return "Aberto";
        case "inProgress": return "Em Andamento";
        case "closed": return "Concluído";
        default: return status;
    }
}

function getStatusClass(status) {
    switch (status) {
        case "ok": return "status-ok";
        case "warning": return "status-warning";
        case "critical": return "status-critical";
        case "active": return "status-ok";
        case "maintenance": return "status-maintenance";
        case "open": return "status-warning";
        case "inProgress": return "status-maintenance";
        case "closed": return "status-ok";
        default: return "";
    }
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const user = await response.json();
            
            // Success
            currentUser = user;
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
            document.getElementById('user-display').textContent = user.name;

            setupNavigation(user.role);
            loadDashboard();

            // Welcome notification
            showNotification('Bem-vindo', `Olá, ${user.name}! Você está conectado ao sistema.`, 'success');

            // Start real-time updates
            simulateRealTimeUpdates();
        } else {
            const error = await response.json();
            showNotification('Erro de Login', error.message || 'Credenciais inválidas. Tente novamente.', 'error');
        }
    } catch (error) {
        showNotification('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.', 'error');
    }
}

function handleLogout() {
    // Clear intervals to prevent memory leaks
    clearAllIntervals();

    // Reset application state
    currentUser = null;
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    showNotification('Sessão encerrada', 'Você foi desconectado do sistema.', 'info');
}

function showPasswordRecovery(e) {
    e.preventDefault();
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('password-recovery-container').classList.remove('hidden');
}

function hidePasswordRecovery() {
    document.getElementById('password-recovery-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}

async function handlePasswordRecovery(e) {
    e.preventDefault();
    const email = document.getElementById('recovery-email').value;

    try {
        const response = await fetch('/Auth/RecoverPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const result = await response.json();
            showNotification(
                'E-mail enviado',
                result.message,
                'success'
            );

            // Return to login screen
            hidePasswordRecovery();
        } else {
            const error = await response.json();
            showNotification(
                'Erro',
                error.message || 'Não foi possível processar sua solicitação.',
                'error'
            );
        }
    } catch (error) {
        showNotification(
            'Erro',
            'Ocorreu um erro ao tentar recuperar sua senha. Tente novamente mais tarde.',
            'error'
        );
    }
}

// Navegação
function setupNavigation(role) {
    const nav = document.getElementById('main-nav');
    let navHTML = '<ul>';

    // Icons for each navigation item
    const icons = {
        dashboard: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6z"/></svg>',
        tickets: '<svg viewBox="0 0 24 24"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>',
        machines: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"/></svg>',
        parts: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
        employees: '<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>'
    };

    switch (role) {
        case 'operator':
            navHTML += `
                <li><a href="#" data-page="machines">${icons.machines} Máquinas</a></li>
                <li><a href="#" data-page="tickets">${icons.tickets} Chamados</a></li>
            `;
            break;
        case 'manager':
            navHTML += `
                <li><a href="#" data-page="dashboard">${icons.dashboard} Dashboard</a></li>
                <li><a href="#" data-page="tickets">${icons.tickets} Chamados</a></li>
                <li><a href="#" data-page="machines">${icons.machines} Máquinas</a></li>
                <li><a href="#" data-page="parts">${icons.parts} Peças</a></li>
                <li><a href="#" data-page="employees">${icons.employees} Colaboradores</a></li>
            `;
            break;
        case 'technician':
            navHTML += `
                <li><a href="#" data-page="dashboard">${icons.dashboard} Dashboard</a></li>
                <li><a href="#" data-page="tickets">${icons.tickets} Chamados</a></li>
            `;
            break;
    }

    navHTML += '</ul>';
    nav.innerHTML = navHTML;

    // Event listeners para navegação
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            nav.querySelectorAll('a').forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            const page = this.getAttribute('data-page');

            // Clear all intervals when switching pages
            clearAllIntervals();

            switch (page) {
                case 'dashboard': loadDashboard(); break;
                case 'tickets': loadTickets(); break;
                case 'machines': loadMachines(); break;
                case 'parts': loadParts(); break;
                case 'employees': loadEmployees(); break;
            }
        });
    });

    // Mark dashboard as active initially
    const defaultLink = (role === 'operator') ?
        nav.querySelector('a[data-page="machines"]') :
        nav.querySelector('a[data-page="dashboard"]');

    if (defaultLink) {
        defaultLink.classList.add('active');
    }
}

// Helper function to clear all intervals
function clearAllIntervals() {
    // Clear countdown timers
    countdownIntervals.forEach(interval => clearInterval(interval));
    countdownIntervals = [];
}

// Carregamento de páginas
function loadDashboard() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Dashboard</h2>
            <div class="export-options">
                <button class="export-btn" id="export-dashboard-pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Exportar para PDF
                </button>
                <button class="export-btn" id="export-dashboard-powerbi">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    Exportar para Power BI
                </button>
            </div>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Total de Chamados</h3>
                <p style="font-size: 2.5rem; font-weight: bold; color: var(--greek-blue-regular);">${mockTickets.length}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    <span class="status-badge status-warning">${mockTickets.filter(t => t.status === 'open').length} Abertos</span>
                    <span class="status-badge status-maintenance">${mockTickets.filter(t => t.status === 'inProgress').length} Em Andamento</span>
                    <span class="status-badge status-ok">${mockTickets.filter(t => t.status === 'closed').length} Concluídos</span>
                </div>
            </div>
            <div class="dashboard-card">
                <h3>Máquinas com Problemas</h3>
                <p style="font-size: 2.5rem; font-weight: bold; color: var(--greek-blue-regular);">${mockMachines.filter(m => m.status === 'maintenance').length}</p>
                <p style="margin-top: 1rem;">Total de ${mockMachines.length} máquinas no sistema</p>
            </div>
            <div class="dashboard-card">
                <h3>Manutenções Pendentes</h3>
                <p style="font-size: 2.5rem; font-weight: bold; color: var(--greek-blue-regular);">${mockTickets.filter(t => t.status !== 'closed').length}</p>
                <div class="progress-bar" style="margin-top: 1rem; height: 8px; background: rgba(119, 141, 169, 0.2); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${Math.round(mockTickets.filter(t => t.status === 'closed').length / mockTickets.length * 100)}%; height: 100%; background: var(--success-color);"></div>
                </div>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                    ${Math.round(mockTickets.filter(t => t.status === 'closed').length / mockTickets.length * 100)}% de chamados concluídos
                </p>
            </div>
        </div>
        
        <div class="chart-container">
            <h3>Status das Máquinas</h3>
            <canvas id="machineStatusChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3>Evolução de Chamados</h3>
            <canvas id="ticketsEvolutionChart"></canvas>
        </div>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--text-primary);">Máquinas com Mais Chamados</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Máquina</th>
                    <th>Setor</th>
                    <th>Chamados na Semana</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    mockMachines.forEach(machine => {
        const ticketsCount = getWeeklyTicketsCount(machine.id);
        const status = machine.status === 'maintenance' ? 'maintenance' : getMachineStatus(machine.id);

        html += `
            <tr>
                <td>${machine.name}</td>
                <td>${machine.sector}</td>
                <td>${ticketsCount}</td>
                <td><span class="status-badge ${getStatusClass(status)}">${getStatusLabel(status)}</span></td>
                <td>
                    <button class="action-btn view-machine" data-id="${machine.id}">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Ver
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contentArea.innerHTML = html;

    // Event listeners para exportação
    document.getElementById('export-dashboard-pdf').addEventListener('click', function () {
        const dashboardData = mockMachines.map(machine => ({
            id: machine.id,
            name: machine.name,
            sector: machine.sector,
            status: getMachineStatus(machine.id),
            ticketsCount: getWeeklyTicketsCount(machine.id)
        }));

        exportToPDF(dashboardData, 'Dashboard de Máquinas', [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Máquina' },
            { key: 'sector', header: 'Setor' },
            { key: 'status', header: 'Status' },
            { key: 'ticketsCount', header: 'Chamados na Semana' }
        ]);
    });

    document.getElementById('export-dashboard-powerbi').addEventListener('click', function () {
        // Preparar dados para exportação
        const dashboardData = mockMachines.map(machine => {
            return {
                id: machine.id,
                name: machine.name,
                sector: machine.sector,
                status: machine.status,
                statusHealth: getMachineStatus(machine.id),
                ticketsCount: getWeeklyTicketsCount(machine.id)
            };
        });

        exportToPowerBI(dashboardData, 'Dashboard_Maquinas');
    });

    // Add view machine event listeners
    document.querySelectorAll('.view-machine').forEach(btn => {
        btn.addEventListener('click', function () {
            const machineId = parseInt(this.getAttribute('data-id'));
            viewMachine(machineId);
        });
    });

    // Renderizar os gráficos
    renderMachineStatusChart();
    renderTicketsEvolutionChart();
}

function renderMachineStatusChart() {
    const ctx = document.getElementById('machineStatusChart').getContext('2d');
    const machineStatuses = mockMachines.map(m => getMachineStatus(m.id));
    const statusCounts = {
        ok: machineStatuses.filter(s => s === 'ok').length,
        warning: machineStatuses.filter(s => s === 'warning').length,
        critical: machineStatuses.filter(s => s === 'critical').length
    };

    // Chart.js options for dark/light mode
    const textColor = darkMode ? '#e0e1dd' : '#1b263b';

    // Destroy existing chart if it exists
    if (window.machineStatusChartInstance) {
        window.machineStatusChartInstance.destroy();
    }

    window.machineStatusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['OK', 'Atenção', 'Crítico'],
            datasets: [{
                data: [statusCounts.ok, statusCounts.warning, statusCounts.critical],
                backgroundColor: ['#2a9d8f', '#ffc857', '#e63946'],
                borderColor: darkMode ? '#1e1e1e' : '#ffffff',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                    titleColor: darkMode ? '#e0e1dd' : '#1b263b',
                    bodyColor: darkMode ? '#e0e1dd' : '#1b263b',
                    borderColor: darkMode ? '#333333' : '#e0e0e0',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    usePointStyle: true,
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return percentage + '%';
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    from: 1,
                    to: 0
                }
            },
            cutout: '65%'
        },
        plugins: [ChartDataLabels]
    });
}

function renderTicketsEvolutionChart() {
    const ctx = document.getElementById('ticketsEvolutionChart').getContext('2d');

    // Generate last 7 days dates
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
    }

    // Count tickets by status for each day
    const ticketData = {
        open: [],
        inProgress: [],
        closed: []
    };

    dates.forEach(date => {
        const dateString = date.toISOString().split('T')[0];

        // Count tickets opened on this day
        const openCount = mockTickets.filter(ticket => {
            const ticketDate = new Date(ticket.createdAt).toISOString().split('T')[0];
            return ticketDate === dateString && ticket.status === 'open';
        }).length;

        // Count tickets in progress on this day
        const inProgressCount = mockTickets.filter(ticket => {
            const ticketDate = new Date(ticket.createdAt).toISOString().split('T')[0];
            return ticketDate === dateString && ticket.status === 'inProgress';
        }).length;

        // Count tickets closed on this day
        const closedCount = mockTickets.filter(ticket => {
            const ticketDate = new Date(ticket.createdAt).toISOString().split('T')[0];
            return ticketDate === dateString && ticket.status === 'closed';
        }).length;

        ticketData.open.push(openCount);
        ticketData.inProgress.push(inProgressCount);
        ticketData.closed.push(closedCount);
    });

    // Format dates for labels
    const labels = dates.map(date => {
        return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });

    // Chart.js options for dark/light mode
    const textColor = darkMode ? '#e0e1dd' : '#1b263b';
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    // Destroy existing chart if it exists
    if (window.ticketsEvolutionChartInstance) {
        window.ticketsEvolutionChartInstance.destroy();
    }

    window.ticketsEvolutionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Abertos',
                    data: ticketData.open,
                    backgroundColor: 'rgba(255, 200, 87, 0.2)',
                    borderColor: '#ffc857',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffc857',
                    pointBorderColor: '#ffffff',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.3
                },
                {
                    label: 'Em Andamento',
                    data: ticketData.inProgress,
                    backgroundColor: 'rgba(76, 201, 240, 0.2)',
                    borderColor: '#4cc9f0',
                    borderWidth: 2,
                    pointBackgroundColor: '#4cc9f0',
                    pointBorderColor: '#ffffff',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.3
                },
                {
                    label: 'Concluídos',
                    data: ticketData.closed,
                    backgroundColor: 'rgba(42, 157, 143, 0.2)',
                    borderColor: '#2a9d8f',
                    borderWidth: 2,
                    pointBackgroundColor: '#2a9d8f',
                    pointBorderColor: '#ffffff',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: textColor,
                        padding: 20,
                        usePointStyle: true,
                        pointStyleWidth: 12,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                    titleColor: darkMode ? '#e0e1dd' : '#1b263b',
                    bodyColor: darkMode ? '#e0e1dd' : '#1b263b',
                    borderColor: darkMode ? '#333333' : '#e0e0e0',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    usePointStyle: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        precision: 0
                    },
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    from: 0.8,
                    to: 0.3
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

function loadTickets() {
    // ... existing tickets loading code ...
    // Function implementation remains mostly the same
    // Just update the visual appearance for better UI and add real-time updates

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Chamados</h2>
            <div class="export-options">
                <button class="export-btn" id="export-tickets-pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Exportar para PDF
                </button>
                <button class="export-btn" id="export-tickets-powerbi">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    Exportar para Power BI
                </button>
            </div>
        </div>
        
        <div class="action-buttons">
            <button id="new-ticket-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Novo Chamado
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros de Busca</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-id">Número da Máquina:</label>
                    <input type="number" id="filter-id" placeholder="Número da máquina">
                </div>
                <div class="filter-group">
                    <label for="filter-machine">Máquina:</label>
                    <select id="filter-machine">
                        <option value="">Todas as máquinas</option>
                        ${mockMachines.map(machine => `<option value="${machine.id}">${machine.name}</option>`).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-status">Status:</label>
                    <select id="filter-status">
                        <option value="">Todos os status</option>
                        <option value="open">Aberto</option>
                        <option value="inProgress">Em Andamento</option>
                        <option value="closed">Concluído</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-date-from">Data Inicial:</label>
                    <input type="date" id="filter-date-from">
                </div>
                <div class="filter-group">
                    <label for="filter-date-to">Data Final:</label>
                    <input type="date" id="filter-date-to">
                </div>
                <div class="filter-group">
                    <label for="filter-description">Descrição:</label>
                    <input type="text" id="filter-description" placeholder="Buscar na descrição">
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
            <div class="help-text">Informe o número da máquina para preencher automaticamente os filtros relacionados</div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Máquina</th>
                    <th>Peça</th>
                    <th>Descrição</th>
                    <th>Data de Abertura</th>
                    <th>Status</th>
                    <th>Tempo Estimado</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tickets-table-body">
    `;

    let filteredTickets = [...mockTickets]; // Inicialmente, mostra todos os chamados

    mockTickets.forEach(ticket => {
        const machine = mockMachines.find(m => m.id === ticket.machineId);
        const part = mockParts.find(p => p.id === ticket.partId);

        html += `
            <tr>
                <td>${ticket.id}</td>
                <td>${machine ? machine.name : 'N/A'}</td>
                <td>${part ? part.name : 'N/A'}</td>
                <td>${ticket.description}</td>
                <td>${getFormattedDate(ticket.createdAt)}</td>
                <td><span class="status-badge ${getStatusClass(ticket.status)}">${getStatusLabel(ticket.status)}</span></td>
                <td>${ticket.estimatedTime ? ticket.estimatedTime + ' min' : 'N/A'}</td>
                <td>
                    <button class="action-btn view-ticket" data-id="${ticket.id}">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Ver
                    </button>
                    ${currentUser.role === 'technician' && ticket.status === 'open' ?
                `<button class="action-btn start-maintenance" data-id="${ticket.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Iniciar
                        </button>` : ''}
                    ${currentUser.role === 'technician' && ticket.status === 'inProgress' ?
                `<button class="action-btn finish-maintenance" data-id="${ticket.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Finalizar
                        </button>` : ''}
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('new-ticket-btn').addEventListener('click', showNewTicketForm);

    document.querySelectorAll('.view-ticket').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            viewTicket(ticketId);
        });
    });

    document.querySelectorAll('.start-maintenance').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            startMaintenance(ticketId);
        });
    });

    document.querySelectorAll('.finish-maintenance').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            finishMaintenance(ticketId);
        });
    });

    // Filter event listeners
    document.getElementById('apply-filters').addEventListener('click', applyTicketFilters);
    document.getElementById('clear-filters').addEventListener('click', clearTicketFilters);

    document.getElementById('export-tickets-pdf').addEventListener('click', function () {
        // Use filtered tickets for export
        const filteredTicketsData = filteredTickets.map(ticket => {
            const machine = mockMachines.find(m => m.id === ticket.machineId);
            const part = mockParts.find(p => p.id === ticket.partId);

            return {
                id: ticket.id,
                machine: machine ? machine.name : 'N/A',
                part: part ? part.name : 'N/A',
                description: ticket.description,
                createdAt: ticket.createdAt,
                status: ticket.status,
                estimatedTime: ticket.estimatedTime ? ticket.estimatedTime + ' min' : 'N/A'
            };
        });

        exportToPDF(filteredTicketsData, 'Relatório de Chamados', [
            { key: 'id', header: 'ID' },
            { key: 'machine', header: 'Máquina' },
            { key: 'part', header: 'Peça' },
            { key: 'description', header: 'Descrição' },
            { key: 'createdAt', header: 'Data de Abertura' },
            { key: 'status', header: 'Status' },
            { key: 'estimatedTime', header: 'Tempo Estimado' }
        ]);
    });

    document.getElementById('export-tickets-powerbi').addEventListener('click', function () {
        // Use filtered tickets for export
        const filteredTicketsData = filteredTickets.map(ticket => {
            const machine = mockMachines.find(m => m.id === ticket.machineId);
            const part = mockParts.find(p => p.id === ticket.partId);
            const assignedTo = ticket.assignedTo ? mockUsers.find(u => u.id === ticket.assignedTo) : null;

            return {
                id: ticket.id,
                machineId: ticket.machineId,
                machineName: machine ? machine.name : 'N/A',
                partId: ticket.partId,
                partName: part ? part.name : 'N/A',
                description: ticket.description,
                createdBy: ticket.createdBy,
                status: ticket.status,
                createdAt: ticket.createdAt,
                assignedTo: ticket.assignedTo,
                assignedToName: assignedTo ? assignedTo.name : 'N/A',
                startedAt: ticket.startedAt,
                estimatedTime: ticket.estimatedTime,
                finishedAt: ticket.finishedAt
            };
        });

        exportToPowerBI(filteredTicketsData, 'Chamados');
    });

    // Simulate real-time updates
    setTimeout(() => {
        if (Math.random() > 0.5 && currentUser.role === 'technician') {
            // Show notification for new assignment
            showNotification(
                'Novo chamado atribuído',
                'Você recebeu um novo chamado para manutenção.',
                'info'
            );

            // Update the table to reflect the new assignment
            updateTicketsTable(mockTickets);
        }
    }, 10000);
}

// Keep implementing the remaining functions (viewTicket, startMaintenance, etc.)
// These are mostly the same as before but with updated UI components
// and real-time notification features

// Example for viewTicket with new UI elements:
function viewTicket(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado!', 'error');
        return;
    }

    const machine = mockMachines.find(m => m.id === ticket.machineId);
    const part = mockParts.find(p => p.id === ticket.partId);
    const creator = mockUsers.find(u => u.id === ticket.createdBy);
    const assignedTo = ticket.assignedTo ? mockUsers.find(u => u.id === ticket.assignedTo) : null;

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Chamado #${ticket.id}</h2>
            <button id="back-to-tickets" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-grid">
            <div class="form-section">
                <h3>Informações do Chamado</h3>
                <div class="ticket-details">
                    <div class="detail-row">
                        <div class="detail-label">Máquina:</div>
                        <div class="detail-value">${machine ? machine.name : 'N/A'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Peça:</div>
                        <div class="detail-value">${part ? part.name : 'N/A'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Descrição:</div>
                        <div class="detail-value">${ticket.description}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Criado por:</div>
                        <div class="detail-value">${creator ? creator.name : 'N/A'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Data de Abertura:</div>
                        <div class="detail-value">${getFormattedDate(ticket.createdAt)}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Status:</div>
                        <div class="detail-value">
                            <span class="status-badge ${getStatusClass(ticket.status)}">${getStatusLabel(ticket.status)}</span>
                        </div>
                    </div>
                    
                    ${assignedTo ? `
                    <div class="detail-row">
                        <div class="detail-label">Técnico Responsável:</div>
                        <div class="detail-value">${assignedTo.name}</div>
                    </div>
                    ` : ''}
                    
                    ${ticket.startedAt ? `
                    <div class="detail-row">
                        <div class="detail-label">Iniciado em:</div>
                        <div class="detail-value">${getFormattedDate(ticket.startedAt)}</div>
                    </div>
                    ` : ''}
                    
                    ${ticket.estimatedTime ? `
                    <div class="detail-row">
                        <div class="detail-label">Tempo Estimado:</div>
                        <div class="detail-value">${ticket.estimatedTime} minutos</div>
                    </div>
                    ` : ''}
                    
                    ${ticket.finishedAt ? `
                    <div class="detail-row">
                        <div class="detail-label">Concluído em:</div>
                        <div class="detail-value">${getFormattedDate(ticket.finishedAt)}</div>
                    </div>
                    ` : ''}
                </div>
                
                ${ticket.status === 'inProgress' ? `
                <div class="timer-display">
                    <h4>Tempo Estimado para Conclusão</h4>
                    <div class="countdown" id="maintenance-countdown">Calculando...</div>
                </div>
                ` : ''}
                
                <div class="action-buttons">
                    ${currentUser.role === 'technician' && ticket.status === 'open' ?
            `<button id="start-maintenance-btn" class="btn-info" data-id="${ticket.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Iniciar Manutenção
                        </button>` : ''}
                    ${currentUser.role === 'technician' && ticket.status === 'inProgress' && ticket.assignedTo === currentUser.id ?
            `<button id="finish-maintenance-btn" class="btn-success" data-id="${ticket.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Finalizar Manutenção
                        </button>` : ''}
                </div>
            </div>
            
            ${ticket.status === 'inProgress' ? `
            <div class="form-section">
                <h3>Progresso da Manutenção</h3>
                <div class="maintenance-progress">
                    <div class="progress-indicator">
                        <div class="progress-bar-container">
                            <div class="progress-bar" id="maintenance-progress-bar" style="width: 0%"></div>
                        </div>
                        <div class="progress-label" id="maintenance-progress-label">Calculando...</div>
                    </div>
                    
                    <div class="maintenance-stats">
                        <div class="stat-item">
                            <div class="stat-label">Iniciado</div>
                            <div class="stat-value">${getFormattedDate(ticket.startedAt)}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Estimativa</div>
                            <div class="stat-value">${ticket.estimatedTime} min</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Técnico</div>
                            <div class="stat-value">${assignedTo ? assignedTo.name : 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    // Add custom styles for ticket details
    html += `
        <style>
            .ticket-details {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            .detail-row {
                display: flex;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 0.5rem;
            }
            .detail-label {
                font-weight: 600;
                min-width: 180px;
                color: var(--greek-blue-regular);
            }
            .detail-value {
                flex: 1;
            }
            .maintenance-progress {
                padding: 1rem 0;
            }
            .progress-indicator {
                margin-bottom: 2rem;
            }
            .progress-bar-container {
                width: 100%;
                height: 8px;
                background-color: rgba(119, 141, 169, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            .progress-bar {
                height: 100%;
                background-color: var(--greek-blue-regular);
                border-radius: 4px;
                transition: width 1s ease;
            }
            .progress-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                text-align: right;
            }
            .maintenance-stats {
                display: flex;
                justify-content: space-between;
                margin-top: 1rem;
            }
            .stat-item {
                text-align: center;
                background-color: rgba(119, 141, 169, 0.1);
                padding: 1rem;
                border-radius: 8px;
                flex: 1;
                margin: 0 0.5rem;
            }
            .stat-label {
                font-size: 0.85rem;
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
            }
            .stat-value {
                font-weight: 600;
                color: var(--greek-blue-regular);
            }
            @media (max-width: 768px) {
                .maintenance-stats {
                    flex-direction: column;
                    gap: 1rem;
                }
                .stat-item {
                    margin: 0;
                }
            }
        </style>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-tickets').addEventListener('click', () => loadTickets());

    if (currentUser.role === 'technician' && ticket.status === 'open') {
        document.getElementById('start-maintenance-btn').addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            startMaintenance(ticketId);
        });
    }

    if (currentUser.role === 'technician' && ticket.status === 'inProgress' && ticket.assignedTo === currentUser.id) {
        document.getElementById('finish-maintenance-btn').addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            finishMaintenance(ticketId);
        });
    }

    // Atualizar countdown se o chamado estiver em andamento
    if (ticket.status === 'inProgress' && ticket.estimatedTime) {
        updateMaintenanceCountdown(ticket);
    }
}

function updateMaintenanceCountdown(ticket) {
    const countdownElement = document.getElementById('maintenance-countdown');
    const progressBar = document.getElementById('maintenance-progress-bar');
    const progressLabel = document.getElementById('maintenance-progress-label');

    if (!countdownElement) return;

    const startTime = new Date(ticket.startedAt).getTime();
    const estimatedEndTime = startTime + (ticket.estimatedTime * 60 * 1000);

    // Atualizar a cada segundo
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = estimatedEndTime - now;
        const elapsedTime = now - startTime;
        const totalTime = ticket.estimatedTime * 60 * 1000;

        // Calculate progress percentage
        const progressPercentage = Math.min(100, Math.round((elapsedTime / totalTime) * 100));

        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;

            // Change color based on progress
            if (progressPercentage < 60) {
                progressBar.style.backgroundColor = 'var(--greek-blue-regular)';
            } else if (progressPercentage < 90) {
                progressBar.style.backgroundColor = 'var(--warning-color)';
            } else {
                progressBar.style.backgroundColor = 'var(--danger-color)';
            }
        }

        if (progressLabel) {
            progressLabel.textContent = `${progressPercentage}% concluído`;
        }

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = 'Tempo estimado excedido';
            countdownElement.classList.add('ended');

            if (progressBar) {
                progressBar.style.width = '100%';
                progressBar.style.backgroundColor = 'var(--danger-color)';
            }

            if (progressLabel) {
                progressLabel.textContent = 'Tempo excedido';
            }

            // Show notification
            showNotification(
                'Tempo excedido',
                `O tempo de manutenção do chamado #${ticket.id} foi excedido!`,
                'warning'
            );

            return;
        }

        // Last 10% of time, show warning
        if (timeLeft < (totalTime * 0.1) && !countdownElement.classList.contains('ending')) {
            countdownElement.classList.add('ending');

            // Show notification
            showNotification(
                'Alerta de tempo',
                `O chamado #${ticket.id} está próximo do tempo limite!`,
                'warning'
            );
        }

        // Calcular horas, minutos e segundos
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Exibir no formato HH:MM:SS
        countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    // Add to the list of intervals to clear when navigating away
    countdownIntervals.push(countdownInterval);
}

// Implement remaining functions...
// The functionality stays the same but we'll enhance the UI

// Export functions (PDF and PowerBI) stay mostly the same

function exportToPDF(data, title, columns) {
    // Show progress notification
    const notification = showNotification('Exportando...', 'Gerando arquivo PDF, aguarde.', 'info');

    setTimeout(() => {
        try {
            const doc = new jspdf.jsPDF();

            // Configure title and date
            doc.setFontSize(18);
            doc.text(title, 14, 20);

            doc.setFontSize(11);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);
            doc.text(`Usuário: ${currentUser.name}`, 14, 37);

            // Configure table
            doc.autoTable({
                startY: 45,
                head: [columns.map(col => col.header)],
                body: data.map(item => columns.map(col => {
                    // Special formatting for status
                    if (col.key === 'status') {
                        return getStatusLabel(item[col.key]);
                    }
                    // Special formatting for dates
                    if (col.key.toLowerCase().includes('date') || col.key.toLowerCase().includes('at')) {
                        return item[col.key] ? getFormattedDate(item[col.key]) : 'N/A';
                    }
                    return item[col.key] !== undefined ? item[col.key].toString() : 'N/A';
                })),
                theme: 'striped',
                headStyles: {
                    fillColor: [27, 38, 59], // Greek blue
                    textColor: 255
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 3
                }
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);

                // Add footer
                doc.setFontSize(8);
                doc.text(`Sistema de Chamados - Página ${i} de ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' });
            }

            // Save the file
            doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);

            // Update notification
            notification.querySelector('.notification-title').textContent = 'PDF Gerado';
            notification.querySelector('.notification-message').textContent = 'O arquivo PDF foi gerado com sucesso!';
            notification.classList.remove('info');
            notification.classList.add('success');
        } catch (error) {
            // Show error notification
            showNotification('Erro ao Exportar', 'Erro ao gerar PDF: ' + error.message, 'error');
            console.error('Erro ao gerar PDF:', error);
        }
    }, 800);
}

function exportToPowerBI(data, title) {
    // Show progress notification
    const notification = showNotification('Exportando...', 'Preparando dados para o Power BI, aguarde.', 'info');

    setTimeout(() => {
        try {
            // Convert to CSV
            let csv = '';

            // Headers
            const headers = Object.keys(data[0]);
            csv += headers.join(',') + '\r\n';

            // Data
            data.forEach(row => {
                const values = headers.map(header => {
                    const value = row[header];

                    // Special formatting for dates
                    if (header.toLowerCase().includes('date') || header.toLowerCase().includes('at')) {
                        return value ? `"${new Date(value).toISOString()}"` : '""';
                    }

                    // Escape strings
                    if (typeof value === 'string') {
                        return `"${value.replace(/"/g, '""')}"`;
                    }

                    return value !== undefined ? value : '';
                });

                csv += values.join(',') + '\r\n';
            });

            // Create blob and generate download
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);

            // Update notification
            notification.querySelector('.notification-title').textContent = 'Dados Exportados';
            notification.querySelector('.notification-message').textContent = 'Os dados foram exportados para CSV com sucesso!';
            notification.classList.remove('info');
            notification.classList.add('success');

            // Show instructions
            setTimeout(() => {
                showPowerBIInstructionsModal();
            }, 1000);
        } catch (error) {
            // Show error notification
            showNotification('Erro ao Exportar', 'Erro ao exportar para o Power BI: ' + error.message, 'error');
            console.error('Erro ao exportar para o Power BI:', error);
        }
    }, 800);
}

function showPowerBIInstructionsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'export-modal';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Exportação Concluída</h3>
                <button class="modal-close" onclick="document.getElementById('export-modal').remove()">&times;</button>
            </div>
            <div>
                <p>Arquivo CSV gerado com sucesso!</p>
                <h4 style="margin-top: 1rem;">Como importar no Power BI:</h4>
                <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>Abra o Power BI Desktop</li>
                    <li>Clique em "Obter dados" e selecione "Texto/CSV"</li>
                    <li>Selecione o arquivo CSV que acabou de baixar</li>
                    <li>Clique em "Carregar" ou ajuste as configurações conforme necessário</li>
                    <li>Seus dados estão prontos para visualização!</li>
                </ol>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Apply ticket filters
function applyTicketFilters() {
    const filterId = document.getElementById('filter-id').value;

    // Clear all filters first
    document.getElementById('filter-machine').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-date-from').value = '';
    document.getElementById('filter-date-to').value = '';
    document.getElementById('filter-description').value = '';

    // If machine ID is entered...
    if (filterId) {
        const filteredTickets = mockTickets.filter(ticket =>
            ticket.machineId === parseInt(filterId)
        );

        // Try to find first ticket with this machine
        const sampleTicket = filteredTickets[0];
        if (sampleTicket) {
            // Auto-fill machine
            document.getElementById('filter-machine').value = sampleTicket.machineId;

            // Auto-fill status if all matching tickets have same status
            const uniqueStatus = new Set(filteredTickets.map(t => t.status));
            if (uniqueStatus.size === 1) {
                document.getElementById('filter-status').value = [...uniqueStatus][0];
            }

            // Show notification about auto-filled filters
            showNotification(
                'Filtros preenchidos',
                `Filtros atualizados para a máquina ${mockMachines.find(m => m.id === parseInt(filterId))?.name || 'selecionada'}`,
                'info'
            );
        } else {
            showNotification(
                'Nenhum resultado',
                'Não foram encontrados tickets para a máquina informada',
                'warning'
            );
        }

        // Show tickets table with filtered by machine
        updateTicketsTable(filteredTickets);

    } else {
        // Original filter logic (without ID search)
        const filterMachine = document.getElementById('filter-machine').value;
        const filterStatus = document.getElementById('filter-status').value;
        const filterDateFrom = document.getElementById('filter-date-from').value;
        const filterDateTo = document.getElementById('filter-date-to').value;
        const filterDescription = document.getElementById('filter-description').value.toLowerCase();

        let filteredTickets = mockTickets.filter(ticket => {
            // Filtro por ID
            if (filterMachine && ticket.machineId !== parseInt(filterMachine)) {
                return false;
            }

            // Filtro por status
            if (filterStatus && ticket.status !== filterStatus) {
                return false;
            }

            // Filtro por data inicial
            if (filterDateFrom) {
                const dateFrom = new Date(filterDateFrom);
                dateFrom.setHours(0, 0, 0, 0);
                if (new Date(ticket.createdAt) < dateFrom) {
                    return false;
                }
            }

            // Filtro por data final
            if (filterDateTo) {
                const dateTo = new Date(filterDateTo);
                dateTo.setHours(23, 59, 59, 999);
                if (new Date(ticket.createdAt) > dateTo) {
                    return false;
                }
            }

            // Filtro por descrição
            if (filterDescription && !ticket.description.toLowerCase().includes(filterDescription)) {
                return false;
            }

            return true;
        });

        // Atualizar a tabela com os resultados filtrados
        updateTicketsTable(filteredTickets);

        // Show notification about filter results
        showNotification(
            'Filtros aplicados',
            `${filteredTickets.length} chamados encontrados`,
            'info'
        );
    }
}

// Função para limpar os filtros
function clearTicketFilters() {
    document.getElementById('filter-id').value = '';
    document.getElementById('filter-machine').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-date-from').value = '';
    document.getElementById('filter-date-to').value = '';
    document.getElementById('filter-description').value = '';

    // Mostrar todos os chamados
    updateTicketsTable(mockTickets);

    // Show notification
    showNotification('Filtros limpos', 'Todos os filtros foram removidos', 'info');
}

// Continue with updateTicketsTable, showing the other functions like loadMachines, etc.
// ...

function showNewTicketForm() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Novo Chamado</h2>
            <button id="back-to-tickets" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações do Chamado</h3>
            <form id="new-ticket-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="machine-select">Máquina:</label>
                        <select id="machine-select" required>
                            <option value="">Selecione uma máquina</option>
                            ${mockMachines.map(machine => `
                                <option value="${machine.id}">${machine.name} (${machine.sector})</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="part-select">Peça:</label>
                        <select id="part-select" required disabled>
                            <option value="">Selecione uma peça</option>
                        </select>
                        <div class="help-text">Selecione uma máquina primeiro</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="maintenance-type">Tipo de Manutenção:</label>
                        <select id="maintenance-type" required disabled>
                            <option value="">Selecione um tipo</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="ticket-description">Descrição do Problema:</label>
                    <textarea id="ticket-description" rows="4" required placeholder="Descreva o problema ou situação que requer manutenção..."></textarea>
                </div>
                
                <div class="timer-display" id="estimated-time-display" style="display: none;">
                    <h4>Tempo Estimado para Manutenção</h4>
                    <div class="countdown" id="estimated-time">--:--</div>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Criar Chamado
                    </button>
                    <button type="button" id="cancel-ticket" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-tickets').addEventListener('click', loadTickets);
    document.getElementById('cancel-ticket').addEventListener('click', loadTickets);

    const machineSelect = document.getElementById('machine-select');
    const partSelect = document.getElementById('part-select');
    const maintenanceTypeSelect = document.getElementById('maintenance-type');
    const estimatedTimeDisplay = document.getElementById('estimated-time-display');
    const estimatedTime = document.getElementById('estimated-time');

    // When machine is selected, populate parts dropdown
    machineSelect.addEventListener('change', function () {
        const machineId = parseInt(this.value);

        if (machineId) {
            // Filter parts for this machine
            const machineParts = mockParts.filter(part => part.machineId === machineId);

            // Enable and populate parts dropdown
            partSelect.disabled = false;
            partSelect.innerHTML = '<option value="">Selecione uma peça</option>' +
                machineParts.map(part => `<option value="${part.id}">${part.name}</option>`).join('');

            // Reset maintenance type
            maintenanceTypeSelect.innerHTML = '<option value="">Selecione um tipo</option>';
            maintenanceTypeSelect.disabled = true;

            // Hide estimated time
            estimatedTimeDisplay.style.display = 'none';
        } else {
            // Reset and disable dropdowns
            partSelect.innerHTML = '<option value="">Selecione uma peça</option>';
            partSelect.disabled = true;
            maintenanceTypeSelect.innerHTML = '<option value="">Selecione um tipo</option>';
            maintenanceTypeSelect.disabled = true;
            estimatedTimeDisplay.style.display = 'none';
        }
    });

    // When part is selected, populate maintenance types
    partSelect.addEventListener('change', function () {
        const partId = parseInt(this.value);

        if (partId) {
            // Filter maintenance types for this part
            const partMaintenanceTypes = mockMaintenanceTimes.filter(mt => mt.partId === partId);

            // Enable and populate maintenance type dropdown
            maintenanceTypeSelect.disabled = false;
            maintenanceTypeSelect.innerHTML = '<option value="">Selecione um tipo</option>' +
                partMaintenanceTypes.map((mt, index) => `<option value="${index}">${mt.maintenanceType} (${mt.estimatedTime} min)</option>`).join('');

            // Hide estimated time
            estimatedTimeDisplay.style.display = 'none';
        } else {
            // Reset and disable maintenance type
            maintenanceTypeSelect.innerHTML = '<option value="">Selecione um tipo</option>';
            maintenanceTypeSelect.disabled = true;
            estimatedTimeDisplay.style.display = 'none';
        }
    });

    // When maintenance type is selected, show estimated time
    maintenanceTypeSelect.addEventListener('change', function () {
        const partId = parseInt(partSelect.value);
        const maintenanceTypeIndex = parseInt(this.value);

        if (!isNaN(maintenanceTypeIndex) && partId) {
            // Get maintenance details
            const partMaintenanceTypes = mockMaintenanceTimes.filter(mt => mt.partId === partId);
            const selectedMaintenance = partMaintenanceTypes[maintenanceTypeIndex];

            if (selectedMaintenance) {
                // Show estimated time
                const minutes = selectedMaintenance.estimatedTime;
                const hours = Math.floor(minutes / 60);
                const remainingMinutes = minutes % 60;

                estimatedTime.textContent = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
                estimatedTimeDisplay.style.display = 'flex';
            } else {
                estimatedTimeDisplay.style.display = 'none';
            }
        } else {
            estimatedTimeDisplay.style.display = 'none';
        }
    });

    // Form submission
    document.getElementById('new-ticket-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const machineId = parseInt(machineSelect.value);
        const partId = parseInt(partSelect.value);
        const maintenanceTypeIndex = parseInt(maintenanceTypeSelect.value);
        const description = document.getElementById('ticket-description').value.trim();

        if (!machineId || !partId || isNaN(maintenanceTypeIndex) || !description) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Get maintenance details
        const partMaintenanceTypes = mockMaintenanceTimes.filter(mt => mt.partId === partId);
        const selectedMaintenance = partMaintenanceTypes[maintenanceTypeIndex];

        if (!selectedMaintenance) {
            showNotification('Erro', 'Tipo de manutenção inválido.', 'error');
            return;
        }

        // Create new ticket
        const newTicket = {
            id: mockTickets.length + 1,
            machineId,
            partId,
            maintenanceTypeId: selectedMaintenance.id,
            description,
            createdBy: currentUser.id,
            status: 'open',
            createdAt: new Date(),
            assignedTo: null,
            startedAt: null,
            estimatedTime: null,
            finishedAt: null
        };

        // Add to mock data
        mockTickets.push(newTicket);

        // Show notification
        showNotification('Sucesso', 'Chamado criado com sucesso!', 'success');

        // Return to tickets list
        loadTickets();
    });
}

function startMaintenance(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado!', 'error');
        return;
    }

    // Get the corresponding maintenance type for the ticket
    const maintenanceType = mockMaintenanceTimes.find(mt =>
        mt.partId === ticket.partId &&
        (ticket.maintenanceTypeId ? mt.id === ticket.maintenanceTypeId : mt.maintenanceType.toLowerCase().includes("reparo"))
    );

    // Update ticket
    ticket.status = 'inProgress';
    ticket.assignedTo = currentUser.id;
    ticket.startedAt = new Date();
    ticket.estimatedTime = maintenanceType ? maintenanceType.estimatedTime : 60; // Default 60 minutes if not found

    // Show notification
    showNotification('Manutenção Iniciada', `Manutenção iniciada para o chamado #${ticketId}`, 'info');

    // Refresh the view
    if (document.querySelector('.view-ticket[data-id="' + ticketId + '"]')) {
        viewTicket(ticketId);
    } else {
        loadTickets();
    }
}

function finishMaintenance(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) {
        showNotification('Erro', 'Chamado não encontrado!', 'error');
        return;
    }

    // Update ticket
    ticket.status = 'closed';
    ticket.finishedAt = new Date();

    // Update machine status if needed
    const machine = mockMachines.find(m => m.id === ticket.machineId);
    if (machine && machine.status === 'maintenance') {
        // Check if there are other open tickets for this machine
        const otherOpenTickets = mockTickets.filter(t =>
            t.id !== ticketId &&
            t.machineId === machine.id &&
            t.status !== 'closed'
        );

        if (otherOpenTickets.length === 0) {
            machine.status = 'active';
        }
    }

    // Show notification
    showNotification('Manutenção Concluída', `Manutenção concluída para o chamado #${ticketId}`, 'success');

    // Refresh the view
    if (document.querySelector('.view-ticket[data-id="' + ticketId + '"]')) {
        viewTicket(ticketId);
    } else {
        loadTickets();
    }
}

function updateTicketsTable(filteredTickets) {
    const tableBody = document.getElementById('tickets-table-body');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (filteredTickets.length === 0) {
        // No results
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="help-noresult">Nenhum chamado encontrado com os filtros aplicados</td>
            </tr>
        `;
        return;
    }

    filteredTickets.forEach(ticket => {
        const machine = mockMachines.find(m => m.id === ticket.machineId);
        const part = mockParts.find(p => p.id === ticket.partId);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.id}</td>
            <td>${machine ? machine.name : 'N/A'}</td>
            <td>${part ? part.name : 'N/A'}</td>
            <td>${ticket.description}</td>
            <td>${getFormattedDate(ticket.createdAt)}</td>
            <td><span class="status-badge ${getStatusClass(ticket.status)}">${getStatusLabel(ticket.status)}</span></td>
            <td>${ticket.estimatedTime ? ticket.estimatedTime + ' min' : 'N/A'}</td>
            <td>
                <button class="action-btn view-ticket" data-id="${ticket.id}">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    Ver
                </button>
                ${currentUser.role === 'technician' && ticket.status === 'open' ?
                `<button class="action-btn start-maintenance" data-id="${ticket.id}">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Iniciar
                    </button>` : ''}
                ${currentUser.role === 'technician' && ticket.status === 'inProgress' ?
                `<button class="action-btn finish-maintenance" data-id="${ticket.id}">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Finalizar
                    </button>` : ''}
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Add event listeners to new buttons
    document.querySelectorAll('.view-ticket').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            viewTicket(ticketId);
        });
    });

    document.querySelectorAll('.start-maintenance').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            startMaintenance(ticketId);
        });
    });

    document.querySelectorAll('.finish-maintenance').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            finishMaintenance(ticketId);
        });
    });
}

function loadMachines() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Máquinas</h2>
            <div class="export-options">
                <button class="export-btn" id="export-machines-pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Exportar para PDF
                </button>
            </div>
        </div>
        
        ${currentUser.role === 'manager' ? `
        <div class="action-buttons">
            <button id="new-machine-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Nova Máquina
            </button>
        </div>
        ` : ''}
        
        <div class="filter-container">
            <h3>Filtros de Busca</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-machine-id">Número da Máquina:</label>
                    <input type="number" id="filter-machine-id" placeholder="Buscar por número">
                </div>
                <div class="filter-group">
                    <label for="filter-machine-name">Nome da Máquina:</label>
                    <input type="text" id="filter-machine-name" placeholder="Digite o nome da máquina">
                </div>
                <div class="filter-group">
                    <label for="filter-machine-sector">Setor:</label>
                    <select id="filter-machine-sector">
                        <option value="">Todos os setores</option>
                        ${[...new Set(mockMachines.map(m => m.sector))].map(sector =>
        `<option value="${sector}">${sector}</option>`
    ).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-machine-status">Status:</label>
                    <select id="filter-machine-status">
                        <option value="">Todos os status</option>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button id="apply-machine-filters" class="btn-primary">Aplicar Filtros</button>
                <button id="clear-machine-filters" class="btn-secondary">Limpar Filtros</button>
            </div>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Total de Máquinas</h3>
                <p style="font-size: 2.5rem; font-weight: bold; color: var(--greek-blue-regular);">${mockMachines.length}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    <span class="status-badge status-ok">${mockMachines.filter(m => m.status === 'active').length} Ativas</span>
                    <span class="status-badge status-maintenance">${mockMachines.filter(m => m.status === 'maintenance').length} Em Manutenção</span>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Chamados por Máquinas</h3>
                <p style="font-size: 2.5rem; font-weight: bold; color: var(--greek-blue-regular);">${mockTickets.length}</p>
                <p style="margin-top: 1rem;">
                    Média de ${(mockTickets.length / mockMachines.length).toFixed(1)} chamados por máquina
                </p>
            </div>
            
            <div class="dashboard-card">
                <h3>Status Geral</h3>
                <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span>Máquinas Ativas</span>
                            <span>${Math.round((mockMachines.filter(m => m.status === 'active').length / mockMachines.length) * 100)}%</span>
                        </div>
                        <div class="progress-bar-container" style="height: 6px; background: rgba(119, 141, 169, 0.2); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${Math.round((mockMachines.filter(m => m.status === 'active').length / mockMachines.length) * 100)}%; height: 100%; background: var(--success-color);"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span>Peças Funcionais</span>
                            <span>${Math.round((mockParts.filter(p => p.status === 'active').length / mockParts.length) * 100)}%</span>
                        </div>
                        <div class="progress-bar-container" style="height: 6px; background: rgba(119, 141, 169, 0.2); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${Math.round((mockParts.filter(p => p.status === 'active').length / mockParts.length) * 100)}%; height: 100%; background: var(--info-color);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Setor</th>
                    <th>Status</th>
                    <th>Chamados Recentes</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="machines-table-body">
    `;

    mockMachines.forEach(machine => {
        const recentTicketsCount = getWeeklyTicketsCount(machine.id);
        const healthStatus = getMachineStatus(machine.id);

        html += `
            <tr>
                <td>${machine.id}</td>
                <td>${machine.name}</td>
                <td>${machine.sector}</td>
                <td><span class="status-badge ${getStatusClass(machine.status)}">${getStatusLabel(machine.status)}</span></td>
                <td>
                    ${recentTicketsCount} 
                    <span class="status-badge ${getStatusClass(healthStatus)}" style="margin-left: 5px; font-size: 0.75rem; padding: 0.2rem 0.5rem;">
                        ${getStatusLabel(healthStatus)}
                    </span>
                </td>
                <td>
                    <button class="action-btn view-machine" data-id="${machine.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Ver
                    </button>
                    
                    ${currentUser.role !== 'operator' ? `
                        <button class="action-btn new-ticket-for-machine" data-id="${machine.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5V9h14v12zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                            </svg>
                            Chamado
                        </button>
                    ` : ''}
                    
                    ${currentUser.role === 'manager' ? `
                        <button class="action-btn edit-machine" data-id="${machine.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                            Editar
                        </button>
                        
                        <button class="action-btn delete-machine" data-id="${machine.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            Excluir
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    if (currentUser.role === 'manager') {
        document.getElementById('new-machine-btn').addEventListener('click', showNewMachineForm);
    }

    // Event listeners para botões de ação
    document.querySelectorAll('.view-machine').forEach(btn => {
        btn.addEventListener('click', function () {
            const machineId = parseInt(this.getAttribute('data-id'));
            viewMachine(machineId);
        });
    });

    document.querySelectorAll('.new-ticket-for-machine').forEach(btn => {
        btn.addEventListener('click', function () {
            const machineId = parseInt(this.getAttribute('data-id'));
            createTicketForMachine(machineId);
        });
    });

    if (currentUser.role === 'manager') {
        document.querySelectorAll('.edit-machine').forEach(btn => {
            btn.addEventListener('click', function () {
                const machineId = parseInt(this.getAttribute('data-id'));
                editMachine(machineId);
            });
        });

        document.querySelectorAll('.delete-machine').forEach(btn => {
            btn.addEventListener('click', function () {
                const machineId = parseInt(this.getAttribute('data-id'));
                deleteMachine(machineId);
            });
        });
    }

    // Filter event listeners
    document.getElementById('apply-machine-filters').addEventListener('click', applyMachineFilters);
    document.getElementById('clear-machine-filters').addEventListener('click', clearMachineFilters);

    // Export listeners
    document.getElementById('export-machines-pdf').addEventListener('click', function () {
        const machinesData = mockMachines.map(machine => {
            const recentTicketsCount = getWeeklyTicketsCount(machine.id);
            const healthStatus = getMachineStatus(machine.id);

            return {
                id: machine.id,
                name: machine.name,
                sector: machine.sector,
                status: getStatusLabel(machine.status),
                recentTickets: recentTicketsCount,
                health: getStatusLabel(healthStatus)
            };
        });

        exportToPDF(machinesData, 'Relatório de Máquinas', [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Nome' },
            { key: 'sector', header: 'Setor' },
            { key: 'status', header: 'Status' },
            { key: 'recentTickets', header: 'Chamados Recentes' },
            { key: 'health', header: 'Saúde' }
        ]);
    });
}

function viewMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada!', 'error');
        return;
    }

    const contentArea = document.getElementById('content-area');
    const machineParts = mockParts.filter(part => part.machineId === machineId);
    const machineTickets = mockTickets.filter(ticket => ticket.machineId === machineId);

    let html = `
        <div class="page-title">
            <h2>Máquina: ${machine.name}</h2>
            <button id="back-to-machines" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Detalhes da Máquina</h3>
                <div class="machine-details">
                    <div class="detail-row">
                        <div class="detail-label">ID:</div>
                        <div class="detail-value">${machine.id}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Nome:</div>
                        <div class="detail-value">${machine.name}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Setor:</div>
                        <div class="detail-value">${machine.sector}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Status:</div>
                        <div class="detail-value">
                            <span class="status-badge ${getStatusClass(machine.status)}">${getStatusLabel(machine.status)}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Saúde:</div>
                        <div class="detail-value">
                            <span class="status-badge ${getStatusClass(getMachineStatus(machine.id))}">${getStatusLabel(getMachineStatus(machine.id))}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Total de Peças:</div>
                        <div class="detail-value">${machineParts.length}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Chamados Recentes:</div>
                        <div class="detail-value">${getWeeklyTicketsCount(machine.id)}</div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Status das Peças</h3>
                <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span>Peças Funcionais</span>
                            <span>${machineParts.filter(p => p.status === 'active').length} / ${machineParts.length}</span>
                        </div>
                        <div class="progress-bar-container" style="height: 8px; background: rgba(119, 141, 169, 0.2); border-radius: 4px; overflow: hidden;">
                            <div style="width: ${Math.round((machineParts.filter(p => p.status === 'active').length / Math.max(1, machineParts.length)) * 100)}%; height: 100%; background: var(--success-color);"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span>Peças em Manutenção</span>
                            <span>${machineParts.filter(p => p.status === 'maintenance').length} / ${machineParts.length}</span>
                        </div>
                        <div class="progress-bar-container" style="height: 8px; background: rgba(119, 141, 169, 0.2); border-radius: 4px; overflow: hidden;">
                            <div style="width: ${Math.round((machineParts.filter(p => p.status === 'maintenance').length / Math.max(1, machineParts.length)) * 100)}%; height: 100%; background: var(--info-color);"></div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem;">
                    <button id="view-parts-btn" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4z"/>
                        </svg>
                        Ver Todas as Peças
                    </button>
                </div>
            </div>
        </div>
        
        <div class="action-buttons" style="margin-top: 1.5rem;">
            ${currentUser.role !== 'operator' ? `
                <button id="create-ticket-btn" class="btn-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Criar Chamado
                </button>
            ` : ''}
            
            ${currentUser.role === 'manager' ? `
                <button id="edit-machine-btn" class="btn-secondary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Editar Máquina
                </button>
                
                <button id="add-part-btn" class="btn-info">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Adicionar Peça
                </button>
            ` : ''}
        </div>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Chamados Recentes</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Peça</th>
                    <th>Descrição</th>
                    <th>Data de Abertura</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${machineTickets.length > 0 ?
            machineTickets.map(ticket => {
                const part = mockParts.find(p => p.id === ticket.partId);

                return `
                            <tr>
                                <td>${ticket.id}</td>
                                <td>${part ? part.name : 'N/A'}</td>
                                <td>${ticket.description}</td>
                                <td>${getFormattedDate(ticket.createdAt)}</td>
                                <td><span class="status-badge ${getStatusClass(ticket.status)}">${getStatusLabel(ticket.status)}</span></td>
                                <td>
                                    <button class="action-btn view-ticket" data-id="${ticket.id}">
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                        </svg>
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        `;
            }).join('') :
            '<tr><td colspan="6" class="help-noresult">Nenhum chamado encontrado para esta máquina</td></tr>'
        }
            </tbody>
        </table>
    `;

    // Add custom styles for machine details
    html += `
        <style>
            .machine-details {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .detail-row {
                display: flex;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 0.5rem;
            }
            .detail-label {
                font-weight: 600;
                min-width: 150px;
                color: var(--greek-blue-regular);
            }
            .detail-value {
                flex: 1;
            }
            .maintenance-progress {
                padding: 1rem 0;
            }
            .progress-bar-container {
                width: 100%;
                height: 8px;
                background-color: rgba(119, 141, 169, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            .progress-bar {
                height: 100%;
                background-color: var(--success-color);
                border-radius: 4px;
                transition: width 1s ease;
            }
        </style>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-machines').addEventListener('click', loadMachines);

    document.getElementById('view-parts-btn').addEventListener('click', function () {
        loadParts(machineId);
    });

    if (currentUser.role !== 'operator') {
        document.getElementById('create-ticket-btn').addEventListener('click', function () {
            createTicketForMachine(machineId);
        });
    }

    if (currentUser.role === 'manager') {
        document.getElementById('edit-machine-btn').addEventListener('click', function () {
            editMachine(machineId);
        });

        document.getElementById('add-part-btn').addEventListener('click', function () {
            showNewPartForm(machineId);
        });
    }

    document.querySelectorAll('.view-ticket').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            viewTicket(ticketId);
        });
    });
}

function applyMachineFilters() {
    const machineId = document.getElementById('filter-machine-id').value;
    const machineName = document.getElementById('filter-machine-name').value.toLowerCase();
    const sectorFilter = document.getElementById('filter-machine-sector').value;
    const statusFilter = document.getElementById('filter-machine-status').value;

    let filteredMachines = mockMachines;

    // Apply filters
    if (machineId) {
        filteredMachines = filteredMachines.filter(m => m.id === parseInt(machineId));
    }

    if (machineName) {
        filteredMachines = filteredMachines.filter(m =>
            m.name.toLowerCase().includes(machineName)
        );
    }

    if (sectorFilter) {
        filteredMachines = filteredMachines.filter(m => m.sector === sectorFilter);
    }

    if (statusFilter) {
        filteredMachines = filteredMachines.filter(m => m.status === statusFilter);
    }

    // Update table
    updateMachinesTable(filteredMachines);

    // Show notification
    showNotification(
        'Filtros aplicados',
        `${filteredMachines.length} máquinas encontradas`,
        'info'
    );
}

function clearMachineFilters() {
    document.getElementById('filter-machine-id').value = '';
    document.getElementById('filter-machine-name').value = '';
    document.getElementById('filter-machine-sector').value = '';
    document.getElementById('filter-machine-status').value = '';

    // Reset table to show all machines
    updateMachinesTable(mockMachines);

    // Show notification
    showNotification('Filtros limpos', 'Todos os filtros foram removidos', 'info');
}

function updateMachinesTable(machines) {
    const tableBody = document.getElementById('machines-table-body');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (machines.length === 0) {
        // No results
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="help-noresult">Nenhuma máquina encontrada com os filtros aplicados</td>
            </tr>
        `;
        return;
    }

    // Add rows for each machine
    machines.forEach(machine => {
        const recentTicketsCount = getWeeklyTicketsCount(machine.id);
        const healthStatus = getMachineStatus(machine.id);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${machine.id}</td>
            <td>${machine.name}</td>
            <td>${machine.sector}</td>
            <td><span class="status-badge ${getStatusClass(machine.status)}">${getStatusLabel(machine.status)}</span></td>
            <td>
                ${recentTicketsCount} 
                <span class="status-badge ${getStatusClass(healthStatus)}" style="margin-left: 5px; font-size: 0.75rem; padding: 0.2rem 0.5rem;">
                    ${getStatusLabel(healthStatus)}
                </span>
            </td>
            <td>
                <button class="action-btn view-machine" data-id="${machine.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    Ver
                </button>
                
                ${currentUser.role !== 'operator' ? `
                    <button class="action-btn new-ticket-for-machine" data-id="${machine.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5V9h14v12zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                        </svg>
                        Chamado
                    </button>
                ` : ''}
                
                ${currentUser.role === 'manager' ? `
                    <button class="action-btn edit-machine" data-id="${machine.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Editar
                    </button>
                    
                    <button class="action-btn delete-machine" data-id="${machine.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Excluir
                    </button>
                ` : ''}
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Re-attach event listeners
    document.querySelectorAll('.view-machine').forEach(btn => {
        btn.addEventListener('click', function () {
            const machineId = parseInt(this.getAttribute('data-id'));
            viewMachine(machineId);
        });
    });

    document.querySelectorAll('.new-ticket-for-machine').forEach(btn => {
        btn.addEventListener('click', function () {
            const machineId = parseInt(this.getAttribute('data-id'));
            createTicketForMachine(machineId);
        });
    });

    if (currentUser.role === 'manager') {
        document.querySelectorAll('.edit-machine').forEach(btn => {
            btn.addEventListener('click', function () {
                const machineId = parseInt(this.getAttribute('data-id'));
                editMachine(machineId);
            });
        });

        document.querySelectorAll('.delete-machine').forEach(btn => {
            btn.addEventListener('click', function () {
                const machineId = parseInt(this.getAttribute('data-id'));
                deleteMachine(machineId);
            });
        });
    }
}

function showNewMachineForm() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Nova Máquina</h2>
            <button id="back-to-machines" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações da Máquina</h3>
            <form id="new-machine-form">
                <div class="form-group">
                    <label for="machine-name">Nome da Máquina:</label>
                    <input type="text" id="machine-name" required placeholder="Digite o nome da máquina">
                </div>
                
                <div class="form-group">
                    <label for="machine-sector">Setor:</label>
                    <select id="machine-sector" required>
                        <option value="">Selecione um setor</option>
                        <option value="Produção">Produção</option>
                        <option value="Logística">Logística</option>
                        <option value="Moldagem">Moldagem</option>
                        <option value="Embalagem">Embalagem</option>
                        <option value="Montagem">Montagem</option>
                        <option value="Testes">Testes</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="machine-status">Status Inicial:</label>
                    <select id="machine-status" required>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
                    </select>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Máquina
                    </button>
                    <button type="button" id="cancel-machine" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-machines').addEventListener('click', loadMachines);
    document.getElementById('cancel-machine').addEventListener('click', loadMachines);

    // Form submission
    document.getElementById('new-machine-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('machine-name').value.trim();
        const sector = document.getElementById('machine-sector').value;
        const status = document.getElementById('machine-status').value;

        if (!name || !sector) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Create new machine
        const newMachine = {
            id: mockMachines.length + 1,
            name,
            sector,
            status
        };

        // Add to mock data
        mockMachines.push(newMachine);

        // Show success notification
        showNotification('Sucesso', 'Máquina criada com sucesso!', 'success');

        // Return to machines list
        loadMachines();
    });
}

function editMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada!', 'error');
        return;
    }

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Editar Máquina</h2>
            <button id="back-to-machines" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações da Máquina</h3>
            <form id="edit-machine-form">
                <div class="form-group">
                    <label for="machine-name">Nome da Máquina:</label>
                    <input type="text" id="machine-name" required placeholder="Digite o nome da máquina" value="${machine.name}">
                </div>
                
                <div class="form-group">
                    <label for="machine-sector">Setor:</label>
                    <select id="machine-sector" required>
                        <option value="">Selecione um setor</option>
                        <option value="Produção" ${machine.sector === 'Produção' ? 'selected' : ''}>Produção</option>
                        <option value="Logística" ${machine.sector === 'Logística' ? 'selected' : ''}>Logística</option>
                        <option value="Moldagem" ${machine.sector === 'Moldagem' ? 'selected' : ''}>Moldagem</option>
                        <option value="Embalagem" ${machine.sector === 'Embalagem' ? 'selected' : ''}>Embalagem</option>
                        <option value="Montagem" ${machine.sector === 'Montagem' ? 'selected' : ''}>Montagem</option>
                        <option value="Testes" ${machine.sector === 'Testes' ? 'selected' : ''}>Testes</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="machine-status">Status:</label>
                    <select id="machine-status" required>
                        <option value="active" ${machine.status === 'active' ? 'selected' : ''}>Ativa</option>
                        <option value="maintenance" ${machine.status === 'maintenance' ? 'selected' : ''}>Em Manutenção</option>
                    </select>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Alterações
                    </button>
                    <button type="button" id="cancel-edit" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-machines').addEventListener('click', () => viewMachine(machineId));
    document.getElementById('cancel-edit').addEventListener('click', () => viewMachine(machineId));

    // Form submission
    document.getElementById('edit-machine-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('machine-name').value.trim();
        const sector = document.getElementById('machine-sector').value;
        const status = document.getElementById('machine-status').value;

        if (!name || !sector) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Update machine data
        machine.name = name;
        machine.sector = sector;

        // Check if status is changed
        if (machine.status !== status) {
            machine.status = status;

            // If status changed to maintenance, create a system ticket
            if (status === 'maintenance' && currentUser.role === 'manager') {
                const newTicket = {
                    id: mockTickets.length + 1,
                    machineId: machine.id,
                    partId: null,
                    maintenanceTypeId: null,
                    description: 'Máquina colocada em manutenção pelo sistema.',
                    createdBy: currentUser.id,
                    status: 'open',
                    createdAt: new Date(),
                    assignedTo: null,
                    startedAt: null,
                    estimatedTime: null,
                    finishedAt: null
                };

                mockTickets.push(newTicket);

                showNotification(
                    'Ticket Criado',
                    `Um novo chamado foi criado automaticamente para a máquina ${machine.name}`,
                    'info'
                );
            }
        }

        // Show success notification
        showNotification('Sucesso', 'Máquina atualizada com sucesso!', 'success');

        // Return to machine view
        viewMachine(machineId);
    });
}

function deleteMachine(machineId) {
    const machine = mockMachines.find(m => m.id === machineId);
    if (!machine) {
        showNotification('Erro', 'Máquina não encontrada!', 'error');
        return;
    }

    // Check if machine has tickets
    const machineTickets = mockTickets.filter(t => t.machineId === machineId);
    if (machineTickets.length > 0) {
        showNotification(
            'Não é possível excluir',
            'Esta máquina possui chamados associados e não pode ser excluída.',
            'error'
        );
        return;
    }

    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close" id="close-delete-modal">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir a máquina <strong>${machine.name}</strong>?</p>
                <p>Esta ação não pode ser desfeita.</p>
                
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button id="confirm-delete" class="btn-danger">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Sim, Excluir
                    </button>
                    <button id="cancel-delete" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for modal buttons
    document.getElementById('close-delete-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('cancel-delete').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('confirm-delete').addEventListener('click', () => {
        // Remove machine from array
        const index = mockMachines.findIndex(m => m.id === machineId);
        if (index !== -1) {
            const machineId = mockMachines[index].id;
            mockMachines.splice(index, 1);

            // Remove associated parts
            const partsToRemove = mockParts.filter(p => p.machineId === machineId);
            partsToRemove.forEach(part => {
                const partIndex = mockParts.findIndex(p => p.id === part.id);
                if (partIndex !== -1) {
                    mockParts.splice(partIndex, 1);
                }
            });

            // Show success notification
            showNotification('Sucesso', 'Máquina excluída com sucesso!', 'success');

            // Remove modal
            document.body.removeChild(modal);

            // Return to machines list
            loadMachines();
        }
    });
}

function createTicketForMachine(machineId, preSelectedPartId = null) {
    // ... existing code ...
}

// ... existing code ...

function loadParts(machineId = null) {
    const contentArea = document.getElementById('content-area');

    let filteredParts = machineId ?
        mockParts.filter(part => part.machineId === machineId) :
        mockParts;

    let html = `
        <div class="page-title">
            <h2>Peças ${machineId ? `da ${mockMachines.find(m => m.id === machineId)?.name || 'Máquina'}` : ''}</h2>
            <div class="export-options">
                <button class="export-btn" id="export-parts-pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Exportar para PDF
                </button>
            </div>
        </div>
        
        ${currentUser.role === 'manager' && !machineId ? `
        <div class="action-buttons">
            <button id="new-part-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Nova Peça
            </button>
        </div>
        ` : ''}
        
        <div class="filter-container">
            <h3>Filtros de Busca</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-part-id">ID da Peça:</label>
                    <input type="number" id="filter-part-id" placeholder="Buscar por ID">
                </div>
                <div class="filter-group">
                    <label for="filter-part-name">Nome da Peça:</label>
                    <input type="text" id="filter-part-name" placeholder="Digite o nome da peça">
                </div>
                <div class="filter-group">
                    <label for="filter-part-machine">Máquina:</label>
                    <select id="filter-part-machine" ${machineId ? 'disabled' : ''}>
                        <option value="">Todas as máquinas</option>
                        ${mockMachines.map(machine => `
                            <option value="${machine.id}" ${machine.id === machineId ? 'selected' : ''}>${machine.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-part-status">Status:</label>
                    <select id="filter-part-status">
                        <option value="">Todos os status</option>
                        <option value="active">Ativa</option>
                        <option value="maintenance">Em Manutenção</option>
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
                    <th>Chamados</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="parts-table-body">
    `;

    if (filteredParts.length === 0) {
        html += `
            <tr>
                <td colspan="6" class="help-noresult">Nenhuma peça encontrada</td>
            </tr>
        `;
    } else {
        filteredParts.forEach(part => {
            const machine = mockMachines.find(m => m.id === part.machineId);
            const partTickets = mockTickets.filter(t => t.partId === part.id);

            html += `
                <tr>
                    <td>${part.id}</td>
                    <td>${part.name}</td>
                    <td>${machine ? machine.name : 'N/A'}</td>
                    <td><span class="status-badge ${getStatusClass(part.status)}">${getStatusLabel(part.status)}</span></td>
                    <td>${partTickets.length}</td>
                    <td>
                        <button class="action-btn view-part" data-id="${part.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                            Ver
                        </button>
                        
                        ${currentUser.role === 'manager' ? `
                            <button class="action-btn edit-part" data-id="${part.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                                Editar
                            </button>
                            
                            <button class="action-btn delete-part" data-id="${part.id}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                                Excluir
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    if (currentUser.role === 'manager' && !machineId) {
        document.getElementById('new-part-btn')?.addEventListener('click', () => showNewPartForm());
    }

    document.querySelectorAll('.view-part').forEach(btn => {
        btn.addEventListener('click', function () {
            const partId = parseInt(this.getAttribute('data-id'));
            viewPart(partId);
        });
    });

    if (currentUser.role === 'manager') {
        document.querySelectorAll('.edit-part').forEach(btn => {
            btn.addEventListener('click', function () {
                const partId = parseInt(this.getAttribute('data-id'));
                editPart(partId);
            });
        });

        document.querySelectorAll('.delete-part').forEach(btn => {
            btn.addEventListener('click', function () {
                const partId = parseInt(this.getAttribute('data-id'));
                deletePart(partId);
            });
        });
    }

    // Filter event listeners
    document.getElementById('apply-part-filters')?.addEventListener('click', applyPartFilters);
    document.getElementById('clear-part-filters')?.addEventListener('click', clearPartFilters);

    // Export listener
    document.getElementById('export-parts-pdf')?.addEventListener('click', function () {
        exportPartsToPDF(filteredParts);
    });

    // If viewing from machine details, add back button
    if (machineId) {
        const backButton = document.createElement('button');
        backButton.id = 'back-to-machine';
        backButton.className = 'btn-secondary';
        backButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Voltar para Máquina
        `;
        backButton.addEventListener('click', () => viewMachine(machineId));

        document.querySelector('.page-title').appendChild(backButton);
    }
}

function viewPart(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada!', 'error');
        return;
    }

    const machine = mockMachines.find(m => m.id === part.machineId);
    const partTickets = mockTickets.filter(t => t.partId === part.id);
    const maintenanceTypes = mockMaintenanceTimes.filter(mt => mt.partId === part.id);

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Peça: ${part.name}</h2>
            <button id="back-to-parts" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Detalhes da Peça</h3>
                <div class="part-details">
                    <div class="detail-row">
                        <div class="detail-label">ID:</div>
                        <div class="detail-value">${part.id}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Nome:</div>
                        <div class="detail-value">${part.name}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Máquina:</div>
                        <div class="detail-value">${machine ? machine.name : 'N/A'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Status:</div>
                        <div class="detail-value">
                            <span class="status-badge ${getStatusClass(part.status)}">${getStatusLabel(part.status)}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Total de Chamados:</div>
                        <div class="detail-value">${partTickets.length}</div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Tempos de Manutenção</h3>
                <div class="maintenance-times">
                    ${maintenanceTypes.length > 0 ?
            maintenanceTypes.map(mt => `
                            <div class="maintenance-time-item">
                                <div class="maintenance-type">${mt.maintenanceType}</div>
                                <div class="maintenance-duration">${mt.estimatedTime} min</div>
                            </div>
                        `).join('') :
            '<div class="help-noresult">Nenhum tipo de manutenção cadastrado</div>'
        }
                </div>
                
                ${currentUser.role === 'manager' ? `
                <div style="margin-top: 1rem;">
                    <button id="add-maintenance-type-btn" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        Adicionar Tipo de Manutenção
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="action-buttons" style="margin-top: 1.5rem;">
            ${currentUser.role !== 'operator' ? `
                <button id="create-ticket-for-part-btn" class="btn-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5V9h14v12zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                    </svg>
                    Criar Chamado
                </button>
            ` : ''}
            
            ${currentUser.role === 'manager' ? `
                <button id="edit-part-btn" class="btn-secondary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Editar Peça
                </button>
            ` : ''}
        </div>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Chamados Relacionados</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Data de Abertura</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${partTickets.length > 0 ?
            partTickets.map(ticket => `
                        <tr>
                            <td>${ticket.id}</td>
                            <td>${ticket.description}</td>
                            <td>${getFormattedDate(ticket.createdAt)}</td>
                            <td><span class="status-badge ${getStatusClass(ticket.status)}">${getStatusLabel(ticket.status)}</span></td>
                            <td>
                                <button class="action-btn view-ticket" data-id="${ticket.id}">
                                    <svg viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                    </svg>
                                    Ver
                                </button>
                            </td>
                        </tr>
                    `).join('') :
            '<tr><td colspan="5" class="help-noresult">Nenhum chamado encontrado para esta peça</td></tr>'
        }
            </tbody>
        </table>
    `;

    // Add custom styles for part details
    html += `
        <style>
            .part-details {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .detail-row {
                display: flex;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 0.5rem;
            }
            .detail-label {
                font-weight: 600;
                min-width: 150px;
                color: var(--greek-blue-regular);
            }
            .detail-value {
                flex: 1;
            }
            .maintenance-times {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .maintenance-time-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0.75rem;
                background-color: rgba(119, 141, 169, 0.1);
                border-radius: 8px;
            }
            .maintenance-type {
                font-weight: 500;
            }
            .maintenance-duration {
                font-weight: 600;
                color: var(--greek-blue-regular);
            }
        </style>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-parts').addEventListener('click', () => loadParts(machine?.id));

    if (currentUser.role !== 'operator') {
        document.getElementById('create-ticket-for-part-btn').addEventListener('click', () => {
            createTicketForMachine(part.machineId, part.id);
        });
    }

    if (currentUser.role === 'manager') {
        document.getElementById('edit-part-btn').addEventListener('click', () => {
            editPart(part.id);
        });

        document.getElementById('add-maintenance-type-btn')?.addEventListener('click', () => {
            addMaintenanceType(part.id);
        });
    }

    document.querySelectorAll('.view-ticket').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = parseInt(this.getAttribute('data-id'));
            viewTicket(ticketId);
        });
    });
}

function applyPartFilters() {
    const partId = document.getElementById('filter-part-id').value;
    const partName = document.getElementById('filter-part-name').value.toLowerCase();
    const machineFilter = document.getElementById('filter-part-machine').value;
    const statusFilter = document.getElementById('filter-part-status').value;

    let filteredParts = mockParts;

    // Apply filters
    if (partId) {
        filteredParts = filteredParts.filter(p => p.id === parseInt(partId));
    }

    if (partName) {
        filteredParts = filteredParts.filter(p =>
            p.name.toLowerCase().includes(partName)
        );
    }

    if (machineFilter) {
        filteredParts = filteredParts.filter(p => p.machineId === parseInt(machineFilter));
    }

    if (statusFilter) {
        filteredParts = filteredParts.filter(p => p.status === statusFilter);
    }

    // Update table
    updatePartsTable(filteredParts);

    // Show notification
    showNotification(
        'Filtros aplicados',
        `${filteredParts.length} peças encontradas`,
        'info'
    );
}

function clearPartFilters() {
    document.getElementById('filter-part-id').value = '';
    document.getElementById('filter-part-name').value = '';
    document.getElementById('filter-part-machine').value = '';
    document.getElementById('filter-part-status').value = '';

    // Reset table to show all parts
    updatePartsTable(mockParts);

    // Show notification
    showNotification('Filtros limpos', 'Todos os filtros foram removidos', 'info');
}

function updatePartsTable(parts) {
    const tableBody = document.getElementById('parts-table-body');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (parts.length === 0) {
        // No results
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="help-noresult">Nenhuma peça encontrada com os filtros aplicados</td>
            </tr>
        `;
        return;
    }

    // Add rows for each part
    parts.forEach(part => {
        const machine = mockMachines.find(m => m.id === part.machineId);
        const partTickets = mockTickets.filter(t => t.partId === part.id);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.id}</td>
            <td>${part.name}</td>
            <td>${machine ? machine.name : 'N/A'}</td>
            <td><span class="status-badge ${getStatusClass(part.status)}">${getStatusLabel(part.status)}</span></td>
            <td>${partTickets.length}</td>
            <td>
                <button class="action-btn view-part" data-id="${part.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    Ver
                </button>
                
                ${currentUser.role === 'manager' ? `
                    <button class="action-btn edit-part" data-id="${part.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Editar
                    </button>
                    
                    <button class="action-btn delete-part" data-id="${part.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Excluir
                    </button>
                ` : ''}
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Re-attach event listeners
    document.querySelectorAll('.view-part').forEach(btn => {
        btn.addEventListener('click', function () {
            const partId = parseInt(this.getAttribute('data-id'));
            viewPart(partId);
        });
    });

    if (currentUser.role === 'manager') {
        document.querySelectorAll('.edit-part').forEach(btn => {
            btn.addEventListener('click', function () {
                const partId = parseInt(this.getAttribute('data-id'));
                editPart(partId);
            });
        });

        document.querySelectorAll('.delete-part').forEach(btn => {
            btn.addEventListener('click', function () {
                const partId = parseInt(this.getAttribute('data-id'));
                deletePart(partId);
            });
        });
    }
}

function exportPartsToPDF(parts) {
    // Show progress notification
    const notification = showNotification('Exportando...', 'Gerando relatório de peças em PDF, aguarde.', 'info');

    setTimeout(() => {
        try {
            const doc = new jspdf.jsPDF();

            // Configure title and date
            doc.setFontSize(18);
            doc.text('Relatório de Peças', 14, 20);

            doc.setFontSize(11);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);
            doc.text(`Usuário: ${currentUser.name}`, 14, 37);

            // Prepare data for table
            const partsData = parts.map(part => {
                const machine = mockMachines.find(m => m.id === part.machineId);
                const partTickets = mockTickets.filter(t => t.partId === part.id);

                return {
                    id: part.id,
                    name: part.name,
                    machine: machine ? machine.name : 'N/A',
                    status: getStatusLabel(part.status),
                    ticketsCount: partTickets.length
                };
            });

            // Configure table columns
            const columns = [
                { key: 'id', header: 'ID' },
                { key: 'name', header: 'Nome da Peça' },
                { key: 'machine', header: 'Máquina' },
                { key: 'status', header: 'Status' },
                { key: 'ticketsCount', header: 'Chamados' }
            ];

            // Generate table
            doc.autoTable({
                startY: 45,
                head: [columns.map(col => col.header)],
                body: partsData.map(item => columns.map(col => item[col.key])),
                theme: 'striped',
                headStyles: {
                    fillColor: [27, 38, 59], // Greek blue
                    textColor: 255
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 3
                }
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);

                // Add footer
                doc.setFontSize(8);
                doc.text(`Sistema de Chamados - Página ${i} de ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' });
            }

            // Save the file
            doc.save(`relatorio_pecas_${new Date().toISOString().split('T')[0]}.pdf`);

            // Update notification
            notification.querySelector('.notification-title').textContent = 'PDF Gerado';
            notification.querySelector('.notification-message').textContent = 'O relatório de peças foi gerado com sucesso!';
            notification.classList.remove('info');
            notification.classList.add('success');
        } catch (error) {
            // Show error notification
            showNotification('Erro ao Exportar', 'Erro ao gerar PDF: ' + error.message, 'error');
            console.error('Erro ao gerar PDF:', error);
        }
    }, 800);
}

function showNewPartForm(machineId = null) {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Nova Peça${machineId ? ` para ${mockMachines.find(m => m.id === machineId)?.name || 'Máquina'}` : ''}</h2>
            <button id="back-btn" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações da Peça</h3>
            <form id="new-part-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="part-name">Nome da Peça:</label>
                        <input type="text" id="part-name" required placeholder="Digite o nome da peça">
                    </div>
                    
                    <div class="form-group">
                        <label for="part-machine">Máquina:</label>
                        <select id="part-machine" required ${machineId ? 'disabled' : ''}>
                            <option value="">Selecione uma máquina</option>
                            ${mockMachines.map(machine => `
                                <option value="${machine.id}" ${machine.id === machineId ? 'selected' : ''}>${machine.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="part-status">Status Inicial:</label>
                        <select id="part-status" required>
                            <option value="active">Ativa</option>
                            <option value="maintenance">Em Manutenção</option>
                        </select>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Peça
                    </button>
                    <button type="button" id="cancel-part" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', () =>
        machineId ? viewMachine(machineId) : loadParts()
    );

    document.getElementById('cancel-part').addEventListener('click', () =>
        machineId ? viewMachine(machineId) : loadParts()
    );

    // Form submission
    document.getElementById('new-part-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('part-name').value.trim();
        const machineIdToUse = machineId || parseInt(document.getElementById('part-machine').value);
        const status = document.getElementById('part-status').value;

        if (!name || !machineIdToUse) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Create new part
        const newPart = {
            id: mockParts.length + 1,
            machineId: machineIdToUse,
            name,
            status
        };

        // Add to mock data
        mockParts.push(newPart);

        // Show success notification
        showNotification('Sucesso', 'Peça criada com sucesso!', 'success');

        // Return to previous view
        if (machineId) {
            viewMachine(machineId);
        } else {
            loadParts();
        }
    });
}

function editPart(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada!', 'error');
        return;
    }

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Editar Peça</h2>
            <button id="back-btn" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações da Peça</h3>
            <form id="edit-part-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="part-name">Nome da Peça:</label>
                        <input type="text" id="part-name" required placeholder="Digite o nome da peça" value="${part.name}">
                    </div>
                    
                    <div class="form-group">
                        <label for="part-machine">Máquina:</label>
                        <select id="part-machine" required>
                            <option value="">Selecione uma máquina</option>
                            ${mockMachines.map(machine => `
                                <option value="${machine.id}" ${machine.id === part.machineId ? 'selected' : ''}>${machine.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="part-status">Status:</label>
                        <select id="part-status" required>
                            <option value="active" ${part.status === 'active' ? 'selected' : ''}>Ativa</option>
                            <option value="maintenance" ${part.status === 'maintenance' ? 'selected' : ''}>Em Manutenção</option>
                        </select>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Alterações
                    </button>
                    <button type="button" id="cancel-edit" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', () => viewPart(partId));
    document.getElementById('cancel-edit').addEventListener('click', () => viewPart(partId));

    // Form submission
    document.getElementById('edit-part-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('part-name').value.trim();
        const machineId = parseInt(document.getElementById('part-machine').value);
        const status = document.getElementById('part-status').value;

        if (!name || !machineId) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Update part data
        part.name = name;
        part.machineId = machineId;
        part.status = status;

        // Show success notification
        showNotification('Sucesso', 'Peça atualizada com sucesso!', 'success');

        // Return to part view
        viewPart(partId);
    });
}

function deletePart(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada!', 'error');
        return;
    }

    // Check if part has tickets
    const partTickets = mockTickets.filter(t => t.partId === partId);
    if (partTickets.length > 0) {
        showNotification(
            'Não é possível excluir',
            'Esta peça possui chamados associados e não pode ser excluída.',
            'error'
        );
        return;
    }

    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close" id="close-delete-modal">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir a peça <strong>${part.name}</strong>?</p>
                <p>Esta ação não pode ser desfeita.</p>
                
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button id="confirm-delete" class="btn-danger">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Sim, Excluir
                    </button>
                    <button id="cancel-delete" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for modal buttons
    document.getElementById('close-delete-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('cancel-delete').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('confirm-delete').addEventListener('click', () => {
        // Remove part from array
        const index = mockParts.findIndex(p => p.id === partId);
        if (index !== -1) {
            const machineId = mockParts[index].machineId;
            mockParts.splice(index, 1);

            // Remove associated maintenance times
            const maintenanceTimesToRemove = mockMaintenanceTimes.filter(mt => mt.partId === partId);
            maintenanceTimesToRemove.forEach(mt => {
                const mtIndex = mockMaintenanceTimes.findIndex(m => m.id === mt.id);
                if (mtIndex !== -1) {
                    mockMaintenanceTimes.splice(mtIndex, 1);
                }
            });

            // Show success notification
            showNotification('Sucesso', 'Peça excluída com sucesso!', 'success');

            // Remove modal
            document.body.removeChild(modal);

            // Return to parts list
            loadParts(machineId);
        }
    });
}

function addMaintenanceType(partId) {
    const part = mockParts.find(p => p.id === partId);
    if (!part) {
        showNotification('Erro', 'Peça não encontrada!', 'error');
        return;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Adicionar Tipo de Manutenção</h3>
                <button class="modal-close" id="close-modal">&times;</button>
            </div>
            <form id="add-maintenance-type-form">
                <div class="form-group">
                    <label for="maintenance-type-name">Tipo de Manutenção:</label>
                    <input type="text" id="maintenance-type-name" required placeholder="Ex: Troca, Ajuste, Calibração">
                </div>
                
                <div class="form-group">
                    <label for="maintenance-time">Tempo Estimado (minutos):</label>
                    <input type="number" id="maintenance-time" required min="1" placeholder="Tempo em minutos">
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Adicionar
                    </button>
                    <button type="button" id="cancel-modal" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for modal buttons
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('cancel-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Form submission
    document.getElementById('add-maintenance-type-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const maintenanceType = document.getElementById('maintenance-type-name').value.trim();
        const estimatedTime = parseInt(document.getElementById('maintenance-time').value);

        if (!maintenanceType || isNaN(estimatedTime) || estimatedTime <= 0) {
            showNotification('Erro', 'Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }

        // Create new maintenance type
        const newMaintenanceType = {
            id: mockMaintenanceTimes.length + 1,
            partId: partId,
            maintenanceType,
            estimatedTime
        };

        // Add to mock data
        mockMaintenanceTimes.push(newMaintenanceType);

        // Show success notification
        showNotification('Sucesso', 'Tipo de manutenção adicionado com sucesso!', 'success');

        // Remove modal
        document.body.removeChild(modal);

        // Refresh part view
        viewPart(partId);
    });
}

function loadEmployees() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Colaboradores</h2>
            <div class="export-options">
                <button class="export-btn" id="export-employees-pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Exportar para PDF
                </button>
            </div>
        </div>
        
        <div class="action-buttons">
            <button id="new-employee-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Novo Colaborador
            </button>
        </div>
        
        <div class="filter-container">
            <h3>Filtros de Busca</h3>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filter-employee-id">ID:</label>
                    <input type="number" id="filter-employee-id" placeholder="Buscar por ID">
                </div>
                <div class="filter-group">
                    <label for="filter-employee-name">Nome:</label>
                    <input type="text" id="filter-employee-name" placeholder="Digite o nome do colaborador">
                </div>
                <div class="filter-group">
                    <label for="filter-employee-role">Função:</label>
                    <select id="filter-employee-role">
                        <option value="">Todas as funções</option>
                        <option value="operator">Operador</option>
                        <option value="technician">Técnico</option>
                        <option value="manager">Gestor</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filter-employee-sector">Setor:</label>
                    <select id="filter-employee-sector">
                        <option value="">Todos os setores</option>
                        ${[...new Set(mockUsers.map(u => u.sector))].map(sector =>
        `<option value="${sector}">${sector}</option>`
    ).join('')}
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
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="employees-table-body">
    `;

    mockUsers.forEach(user => {
        let roleName = '';
        switch (user.role) {
            case 'operator': roleName = 'Operador'; break;
            case 'technician': roleName = 'Técnico'; break;
            case 'manager': roleName = 'Gestor'; break;
            default: roleName = user.role;
        }

        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${roleName}</td>
                <td>${user.sector}</td>
                <td>${user.email}</td>
                <td>
                    <button class="action-btn edit-employee" data-id="${user.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Editar
                    </button>
                    
                    <button class="action-btn delete-employee" data-id="${user.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('new-employee-btn').addEventListener('click', showNewEmployeeForm);

    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            editEmployee(userId);
        });
    });

    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteEmployee(userId);
        });
    });

    // Filter event listeners
    document.getElementById('apply-employee-filters').addEventListener('click', applyEmployeeFilters);
    document.getElementById('clear-employee-filters').addEventListener('click', clearEmployeeFilters);

    // Export listener
    document.getElementById('export-employees-pdf').addEventListener('click', function () {
        exportEmployeesToPDF();
    });
}

function showNewEmployeeForm() {
    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Novo Colaborador</h2>
            <button id="back-to-employees" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações do Colaborador</h3>
            <form id="new-employee-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="employee-name">Nome Completo:</label>
                        <input type="text" id="employee-name" required placeholder="Nome completo">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-username">Nome de Usuário:</label>
                        <input type="text" id="employee-username" required placeholder="Login para acesso">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-password">Senha:</label>
                        <input type="password" id="employee-password" required placeholder="Senha">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-email">E-mail:</label>
                        <input type="email" id="employee-email" required placeholder="exemplo@empresa.com">
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
                        <input type="text" id="employee-sector" required placeholder="Setor de atuação">
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Colaborador
                    </button>
                    <button type="button" id="cancel-employee" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-employees').addEventListener('click', loadEmployees);
    document.getElementById('cancel-employee').addEventListener('click', loadEmployees);

    // Form submission
    document.getElementById('new-employee-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('employee-name').value.trim();
        const username = document.getElementById('employee-username').value.trim().toLowerCase();
        const password = document.getElementById('employee-password').value;
        const email = document.getElementById('employee-email').value.trim().toLowerCase();
        const role = document.getElementById('employee-role').value;
        const sector = document.getElementById('employee-sector').value.trim();

        if (!name || !username || !password || !email || !role || !sector) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Check if username already exists
        const existingUser = mockUsers.find(u => u.username === username);
        if (existingUser) {
            showNotification('Erro', 'Este nome de usuário já está em uso.', 'error');
            return;
        }

        // Check if email already exists
        const existingEmail = mockUsers.find(u => u.email === email);
        if (existingEmail) {
            showNotification('Erro', 'Este e-mail já está em uso.', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            username,
            password,
            name,
            role,
            sector,
            email
        };

        // Add to mock data
        mockUsers.push(newUser);

        // Show success notification
        showNotification('Sucesso', 'Colaborador criado com sucesso!', 'success');

        // Return to employees list
        loadEmployees();
    });
}

function editEmployee(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        showNotification('Erro', 'Colaborador não encontrado!', 'error');
        return;
    }

    const contentArea = document.getElementById('content-area');

    let html = `
        <div class="page-title">
            <h2>Editar Colaborador</h2>
            <button id="back-to-employees" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Voltar
            </button>
        </div>
        
        <div class="form-section">
            <h3>Informações do Colaborador</h3>
            <form id="edit-employee-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="employee-name">Nome Completo:</label>
                        <input type="text" id="employee-name" required placeholder="Nome completo" value="${user.name}">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-username">Nome de Usuário:</label>
                        <input type="text" id="employee-username" required placeholder="Login para acesso" value="${user.username}" readonly>
                        <div class="help-text">O nome de usuário não pode ser alterado.</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-password">Nova Senha (deixe em branco para manter):</label>
                        <input type="password" id="employee-password" placeholder="Nova senha">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-email">E-mail:</label>
                        <input type="email" id="employee-email" required placeholder="exemplo@empresa.com" value="${user.email}">
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-role">Função:</label>
                        <select id="employee-role" required>
                            <option value="">Selecione uma função</option>
                            <option value="operator" ${user.role === 'operator' ? 'selected' : ''}>Operador</option>
                            <option value="technician" ${user.role === 'technician' ? 'selected' : ''}>Técnico</option>
                            <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Gestor</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="employee-sector">Setor:</label>
                        <input type="text" id="employee-sector" required placeholder="Setor de atuação" value="${user.sector}">
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Salvar Alterações
                    </button>
                    <button type="button" id="cancel-edit" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    contentArea.innerHTML = html;

    // Event listeners
    document.getElementById('back-to-employees').addEventListener('click', loadEmployees);
    document.getElementById('cancel-edit').addEventListener('click', loadEmployees);

    // Form submission
    document.getElementById('edit-employee-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('employee-name').value.trim();
        const newPassword = document.getElementById('employee-password').value;
        const email = document.getElementById('employee-email').value.trim().toLowerCase();
        const role = document.getElementById('employee-role').value;
        const sector = document.getElementById('employee-sector').value.trim();

        if (!name || !email || !role || !sector) {
            showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Check if email already exists (and not the current user's)
        const existingEmail = mockUsers.find(u => u.email === email && u.id !== userId);
        if (existingEmail) {
            showNotification('Erro', 'Este e-mail já está em uso por outro colaborador.', 'error');
            return;
        }

        // Update user data
        user.name = name;
        user.email = email;
        user.role = role;
        user.sector = sector;

        // Update password if provided
        if (newPassword) {
            user.password = newPassword;
        }

        // Show success notification
        showNotification('Sucesso', 'Colaborador atualizado com sucesso!', 'success');

        // Return to employees list
        loadEmployees();
    });
}

function deleteEmployee(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        showNotification('Erro', 'Colaborador não encontrado!', 'error');
        return;
    }

    // Prevent deleting the currently logged in user
    if (user.id === currentUser.id) {
        showNotification('Erro', 'Você não pode excluir seu próprio usuário!', 'error');
        return;
    }

    // Check if user has related activities
    const userTickets = mockTickets.filter(t => t.createdBy === userId || t.assignedTo === userId);
    if (userTickets.length > 0) {
        showNotification(
            'Não é possível excluir',
            'Este colaborador possui atividades registradas no sistema e não pode ser excluído.',
            'error'
        );
        return;
    }

    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Exclusão</h3>
                <button class="modal-close" id="close-delete-modal">&times;</button>
            </div>
            <div>
                <p>Tem certeza que deseja excluir o colaborador <strong>${user.name}</strong>?</p>
                <p>Esta ação não pode ser desfeita.</p>
                
                <div class="action-buttons" style="margin-top: 1.5rem;">
                    <button id="confirm-delete" class="btn-danger">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Sim, Excluir
                    </button>
                    <button id="cancel-delete" class="btn-secondary">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for modal buttons
    document.getElementById('close-delete-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('cancel-delete').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('confirm-delete').addEventListener('click', () => {
        // Remove user from array
        const index = mockUsers.findIndex(u => u.id === userId);
        if (index !== -1) {
            mockUsers.splice(index, 1);

            // Show success notification
            showNotification('Sucesso', 'Colaborador excluído com sucesso!', 'success');

            // Remove modal
            document.body.removeChild(modal);

            // Return to employees list
            loadEmployees();
        }
    });
}

function applyEmployeeFilters() {
    const employeeId = document.getElementById('filter-employee-id').value;
    const employeeName = document.getElementById('filter-employee-name').value.toLowerCase();
    const roleFilter = document.getElementById('filter-employee-role').value;
    const sectorFilter = document.getElementById('filter-employee-sector').value;

    let filteredEmployees = mockUsers;

    // Apply filters
    if (employeeId) {
        filteredEmployees = filteredEmployees.filter(e => e.id === parseInt(employeeId));
    }

    if (employeeName) {
        filteredEmployees = filteredEmployees.filter(e =>
            e.name.toLowerCase().includes(employeeName) ||
            e.username.toLowerCase().includes(employeeName)
        );
    }

    if (roleFilter) {
        filteredEmployees = filteredEmployees.filter(e => e.role === roleFilter);
    }

    if (sectorFilter) {
        filteredEmployees = filteredEmployees.filter(e => e.sector === sectorFilter);
    }

    // Update table
    updateEmployeesTable(filteredEmployees);

    // Show notification
    showNotification(
        'Filtros aplicados',
        `${filteredEmployees.length} colaboradores encontrados`,
        'info'
    );
}

function clearEmployeeFilters() {
    document.getElementById('filter-employee-id').value = '';
    document.getElementById('filter-employee-name').value = '';
    document.getElementById('filter-employee-role').value = '';
    document.getElementById('filter-employee-sector').value = '';

    // Reset table to show all employees
    updateEmployeesTable(mockUsers);

    // Show notification
    showNotification('Filtros limpos', 'Todos os filtros foram removidos', 'info');
}

function updateEmployeesTable(employees) {
    const tableBody = document.getElementById('employees-table-body');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (employees.length === 0) {
        // No results
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="help-noresult">Nenhum colaborador encontrado com os filtros aplicados</td>
            </tr>
        `;
        return;
    }

    // Add rows for each employee
    employees.forEach(user => {
        let roleName = '';
        switch (user.role) {
            case 'operator': roleName = 'Operador'; break;
            case 'technician': roleName = 'Técnico'; break;
            case 'manager': roleName = 'Gestor'; break;
            default: roleName = user.role;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${roleName}</td>
            <td>${user.sector}</td>
            <td>${user.email}</td>
            <td>
                <button class="action-btn edit-employee" data-id="${user.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Editar
                </button>
                
                <button class="action-btn delete-employee" data-id="${user.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                    Excluir
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Re-attach event listeners
    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            editEmployee(userId);
        });
    });

    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteEmployee(userId);
        });
    });
}

function exportEmployeesToPDF() {
    // Show progress notification
    const notification = showNotification('Exportando...', 'Gerando relatório de colaboradores em PDF, aguarde.', 'info');

    setTimeout(() => {
        try {
            const doc = new jspdf.jsPDF();

            // Configure title and date
            doc.setFontSize(18);
            doc.text('Relatório de Colaboradores', 14, 20);

            doc.setFontSize(11);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);
            doc.text(`Usuário: ${currentUser.name}`, 14, 37);

            // Prepare data for table
            const employeesData = mockUsers.map(user => {
                let roleName = '';
                switch (user.role) {
                    case 'operator': roleName = 'Operador'; break;
                    case 'technician': roleName = 'Técnico'; break;
                    case 'manager': roleName = 'Gestor'; break;
                    default: roleName = user.role;
                }

                return {
                    id: user.id,
                    name: user.name,
                    role: roleName,
                    sector: user.sector,
                    email: user.email
                };
            });

            // Configure table columns
            const columns = [
                { key: 'id', header: 'ID' },
                { key: 'name', header: 'Nome' },
                { key: 'role', header: 'Função' },
                { key: 'sector', header: 'Setor' },
                { key: 'email', header: 'E-mail' }
            ];

            // Generate table
            doc.autoTable({
                startY: 45,
                head: [columns.map(col => col.header)],
                body: employeesData.map(item => columns.map(col => item[col.key])),
                theme: 'striped',
                headStyles: {
                    fillColor: [27, 38, 59], // Greek blue
                    textColor: 255
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 3
                }
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);

                // Add footer
                doc.setFontSize(8);
                doc.text(`Sistema de Chamados - Página ${i} de ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' });
            }

            // Save the file
            doc.save(`relatorio_colaboradores_${new Date().toISOString().split('T')[0]}.pdf`);

            // Update notification
            notification.querySelector('.notification-title').textContent = 'PDF Gerado';
            notification.querySelector('.notification-message').textContent = 'O relatório de colaboradores foi gerado com sucesso!';
            notification.classList.remove('info');
            notification.classList.add('success');
        } catch (error) {
            // Show error notification
            showNotification('Erro ao Exportar', 'Erro ao gerar PDF: ' + error.message, 'error');
            console.error('Erro ao gerar PDF:', error);
        }
    }, 800);
}