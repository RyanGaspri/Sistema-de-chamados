// UI Components for the Communication System

// Renders the messaging interface
function renderMessagingInterface(container) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Get user's messages
    const messages = window.notificationSystem.getUserMessages(currentUser.id);
    const unreadCount = window.notificationSystem.getUnreadMessageCount(currentUser.id);

    const users = mockUsers.filter(u => u.id !== currentUser.id);

    container.innerHTML = `
        <div class="page-title">
            <h2>Mensagens</h2>
            <button id="new-message-btn" class="btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z"/>
                </svg>
                Nova Mensagem ${unreadCount > 0 ? `<span class="badge">${unreadCount}</span>` : ''}
            </button>
        </div>

        <div class="messaging-container">
            <div class="message-list">
                <h3>Mensagens Recebidas</h3>
                <div class="message-filters">
                    <button class="btn-outline active" data-filter="all">Todas</button>
                    <button class="btn-outline" data-filter="unread">Não Lidas (${unreadCount})</button>
                </div>
                <div class="messages">
                    ${messages.length > 0 ? 
                        messages.map(message => {
                            const sender = mockUsers.find(u => u.id === message.fromUserId);
                            return `
                                <div class="message-item ${message.read ? '' : 'unread'}" data-id="${message.id}">
                                    <div class="message-sender">
                                        <strong>${sender ? sender.name : 'Usuário Desconhecido'}</strong>
                                        <span class="message-time">${formatDatetime(message.timestamp)}</span>
                                    </div>
                                    <div class="message-subject">${message.subject}</div>
                                    <div class="message-preview">${message.content.substring(0, 60)}${message.content.length > 60 ? '...' : ''}</div>
                                </div>
                            `;
                        }).join('') 
                        : '<div class="no-data">Nenhuma mensagem encontrada</div>'
                    }
                </div>
            </div>
            <div class="message-detail" id="message-detail">
                <div class="no-message-selected">Selecione uma mensagem para visualizar</div>
            </div>
        </div>

        <!-- New Message Modal -->
        <div id="new-message-modal" class="modal-overlay hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nova Mensagem</h3>
                    <button class="modal-close" id="close-new-message-modal">&times;</button>
                </div>
                <form id="new-message-form">
                    <div class="form-group">
                        <label for="message-to">Para:</label>
                        <select id="message-to" required>
                            <option value="">Selecione um destinatário</option>
                            ${users.map(user => `
                                <option value="${user.id}">${user.name} (${user.sector})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message-subject">Assunto:</label>
                        <input type="text" id="message-subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message-content">Mensagem:</label>
                        <textarea id="message-content" rows="5" required></textarea>
                    </div>
                    <div class="action-buttons">
                        <button type="submit" class="btn-primary">Enviar Mensagem</button>
                        <button type="button" class="btn-secondary" id="cancel-new-message">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add event listeners
    setupMessagingEventListeners(container);
}

// Setup event listeners for messaging interface
function setupMessagingEventListeners(container) {
    // New message button
    const newMessageBtn = container.querySelector('#new-message-btn');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            document.getElementById('new-message-modal').classList.remove('hidden');
        });
    }

    // Close modal buttons
    const closeModalBtn = container.querySelector('#close-new-message-modal');
    const cancelBtn = container.querySelector('#cancel-new-message');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('new-message-modal').classList.add('hidden');
        });
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('new-message-modal').classList.add('hidden');
        });
    }

    // New message form
    const newMessageForm = container.querySelector('#new-message-form');
    if (newMessageForm) {
        newMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const toUserId = parseInt(document.getElementById('message-to').value);
            const subject = document.getElementById('message-subject').value;
            const content = document.getElementById('message-content').value;
            
            // Send message
            const currentUser = getCurrentUser();
            if (currentUser) {
                window.notificationSystem.sendMessage(currentUser.id, toUserId, content, subject);
                document.getElementById('new-message-modal').classList.add('hidden');
                
                // Reset form
                newMessageForm.reset();
                
                // Show notification
                showNotification('Mensagem Enviada', 'Sua mensagem foi enviada com sucesso!', 'success');
                
                // Reload messages
                renderMessagingInterface(container);
            }
        });
    }

    // Message item click
    const messageItems = container.querySelectorAll('.message-item');
    messageItems.forEach(item => {
        item.addEventListener('click', () => {
            const messageId = parseInt(item.getAttribute('data-id'));
            const message = window.notificationSystem.messages.find(m => m.id === messageId);
            
            if (message) {
                // Mark message as read
                window.notificationSystem.markMessageAsRead(messageId);
                
                // Update UI
                item.classList.remove('unread');
                
                // Show message detail
                const sender = mockUsers.find(u => u.id === message.fromUserId);
                const messageDetail = container.querySelector('#message-detail');
                messageDetail.innerHTML = `
                    <div class="message-header">
                        <h3>${message.subject}</h3>
                        <div class="message-info">
                            <div>De: <strong>${sender ? sender.name : 'Usuário Desconhecido'}</strong></div>
                            <div>Setor: ${sender ? sender.sector : 'N/A'}</div>
                            <div>Data: ${formatDatetime(message.timestamp)}</div>
                        </div>
                    </div>
                    <div class="message-body">
                        ${message.content}
                    </div>
                    <div class="message-actions">
                        <button class="btn-primary reply-message" data-user-id="${message.fromUserId}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
                            </svg>
                            Responder
                        </button>
                        <button class="btn-danger delete-message" data-id="${message.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            Excluir
                        </button>
                    </div>
                `;
                
                // Add event listeners to the reply and delete buttons
                const replyBtn = messageDetail.querySelector('.reply-message');
                if (replyBtn) {
                    replyBtn.addEventListener('click', () => {
                        const userId = parseInt(replyBtn.getAttribute('data-user-id'));
                        // Open new message form with pre-filled recipient
                        document.getElementById('new-message-modal').classList.remove('hidden');
                        document.getElementById('message-to').value = userId;
                        document.getElementById('message-subject').value = `RE: ${message.subject}`;
                        document.getElementById('message-content').focus();
                    });
                }
                
                const deleteBtn = messageDetail.querySelector('.delete-message');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                        const messageId = parseInt(deleteBtn.getAttribute('data-id'));
                        // Remove message from list
                        window.notificationSystem.messages = window.notificationSystem.messages.filter(m => m.id !== messageId);
                        // Update UI
                        renderMessagingInterface(container);
                        showNotification('Mensagem Excluída', 'A mensagem foi excluída com sucesso!', 'success');
                    });
                }
            }
        });
    });

    // Message filters
    const filterButtons = container.querySelectorAll('.message-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            const messageItems = container.querySelectorAll('.message-item');
            
            messageItems.forEach(item => {
                if (filter === 'all') {
                    item.classList.remove('hidden');
                } else if (filter === 'unread') {
                    if (item.classList.contains('unread')) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Render announcements interface
function renderAnnouncementsInterface(container) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Get announcements for the user
    const announcements = window.notificationSystem.getUserAnnouncements(currentUser.id, currentUser.sector);
    const unreadAnnouncements = announcements.filter(a => !a.readBy.includes(currentUser.id));

    container.innerHTML = `
        <div class="page-title">
            <h2>Avisos e Comunicados</h2>
            ${currentUser.role === 'manager' || currentUser.role === 'admin' ? `
                <button id="new-announcement-btn" class="btn-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
                    </svg>
                    Novo Comunicado
                </button>
            ` : ''}
        </div>

        <div class="announcements-container">
            <div class="announcements-filters">
                <button class="btn-outline active" data-filter="all">Todos</button>
                <button class="btn-outline" data-filter="unread">Não Lidos (${unreadAnnouncements.length})</button>
            </div>

            <div class="announcements-list">
                ${announcements.length > 0 ? 
                    announcements.map(announcement => {
                        const sender = mockUsers.find(u => u.id === announcement.fromUserId);
                        const isRead = announcement.readBy.includes(currentUser.id);
                        return `
                            <div class="announcement-item ${isRead ? '' : 'unread'}" data-id="${announcement.id}">
                                <div class="announcement-header">
                                    <h3>${announcement.title}</h3>
                                    <div class="announcement-meta">
                                        <span class="announcement-author">Por: ${sender ? sender.name : 'Sistema'}</span>
                                        <span class="announcement-time">${formatDatetime(announcement.timestamp)}</span>
                                    </div>
                                </div>
                                <div class="announcement-content">
                                    ${announcement.content}
                                </div>
                                <div class="announcement-footer">
                                    <span class="announcement-target">
                                        ${announcement.targetSectors ? 
                                            `Para: ${announcement.targetSectors.join(', ')}` : 
                                            'Para: Todos os setores'}
                                    </span>
                                    ${!isRead ? '<span class="new-badge">Novo</span>' : ''}
                                </div>
                            </div>
                        `;
                    }).join('') 
                    : '<div class="no-data">Nenhum comunicado encontrado</div>'
                }
            </div>
        </div>

        <!-- New Announcement Modal (Only for managers/admins) -->
        ${currentUser.role === 'manager' || currentUser.role === 'admin' ? `
            <div id="new-announcement-modal" class="modal-overlay hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Novo Comunicado</h3>
                        <button class="modal-close" id="close-new-announcement-modal">&times;</button>
                    </div>
                    <form id="new-announcement-form">
                        <div class="form-group">
                            <label for="announcement-title">Título:</label>
                            <input type="text" id="announcement-title" required>
                        </div>
                        <div class="form-group">
                            <label for="announcement-sectors">Setores Alvo:</label>
                            <select id="announcement-sectors" multiple>
                                <option value="all">Todos os Setores</option>
                                <option value="Produção">Produção</option>
                                <option value="Logística">Logística</option>
                                <option value="Moldagem">Moldagem</option>
                                <option value="Automação">Automação</option>
                                <option value="Gerência">Gerência</option>
                                <option value="Administração">Administração</option>
                            </select>
                            <div class="help-text">Segure Ctrl para selecionar múltiplos setores.</div>
                        </div>
                        <div class="form-group">
                            <label for="announcement-content">Conteúdo:</label>
                            <textarea id="announcement-content" rows="6" required></textarea>
                        </div>
                        <div class="action-buttons">
                            <button type="submit" class="btn-primary">Publicar Comunicado</button>
                            <button type="button" class="btn-secondary" id="cancel-new-announcement">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        ` : ''}
    `;

    // Add event listeners
    setupAnnouncementsEventListeners(container);
}

// Setup event listeners for announcements interface
function setupAnnouncementsEventListeners(container) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Mark announcements as read when clicked
    const announcementItems = container.querySelectorAll('.announcement-item');
    announcementItems.forEach(item => {
        item.addEventListener('click', () => {
            const announcementId = parseInt(item.getAttribute('data-id'));
            window.notificationSystem.markAnnouncementAsRead(announcementId, currentUser.id);
            item.classList.remove('unread');
            item.querySelector('.new-badge')?.remove();
        });
    });

    // Filter buttons
    const filterButtons = container.querySelectorAll('.announcements-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            const announcementItems = container.querySelectorAll('.announcement-item');
            
            announcementItems.forEach(item => {
                if (filter === 'all') {
                    item.classList.remove('hidden');
                } else if (filter === 'unread') {
                    if (item.classList.contains('unread')) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // New announcement button (for managers/admins)
    if (currentUser.role === 'manager' || currentUser.role === 'admin') {
        const newAnnouncementBtn = container.querySelector('#new-announcement-btn');
        if (newAnnouncementBtn) {
            newAnnouncementBtn.addEventListener('click', () => {
                document.getElementById('new-announcement-modal').classList.remove('hidden');
            });
        }

        // Close modal buttons
        const closeModalBtn = container.querySelector('#close-new-announcement-modal');
        const cancelBtn = container.querySelector('#cancel-new-announcement');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('new-announcement-modal').classList.add('hidden');
            });
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                document.getElementById('new-announcement-modal').classList.add('hidden');
            });
        }

        // New announcement form
        const newAnnouncementForm = container.querySelector('#new-announcement-form');
        if (newAnnouncementForm) {
            newAnnouncementForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('announcement-title').value;
                const content = document.getElementById('announcement-content').value;
                
                // Get selected sectors
                const sectorsSelect = document.getElementById('announcement-sectors');
                const selectedOptions = Array.from(sectorsSelect.selectedOptions).map(option => option.value);
                
                let targetSectors = [];
                if (!selectedOptions.includes('all')) {
                    targetSectors = selectedOptions;
                }
                
                // Create announcement
                window.notificationSystem.createAnnouncement(
                    currentUser.id,
                    content,
                    title,
                    targetSectors
                );
                
                document.getElementById('new-announcement-modal').classList.add('hidden');
                
                // Reset form
                newAnnouncementForm.reset();
                
                // Show notification
                showNotification('Comunicado Publicado', 'Seu comunicado foi publicado com sucesso!', 'success');
                
                // Reload announcements
                renderAnnouncementsInterface(container);
            });
        }
    }
}

// Format date for display
function formatDatetime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get current user
function getCurrentUser() {
    return currentUser;
}