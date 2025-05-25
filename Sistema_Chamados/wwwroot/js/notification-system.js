// Notification and Communication System
// Global window-level object to make it accessible throughout the app
window.notificationSystem = window.notificationSystem || {};

if (typeof window.NotificationSystem === 'undefined') {
    class NotificationSystem {
        constructor() {
            this.messages = [];
            this.announcements = [];
            this.notifications = [];
            this.callbacks = {};
        }

        // Send a direct message to a user
        sendMessage(fromUserId, toUserId, content, subject = '') {
            const message = {
                id: this.generateId(),
                fromUserId,
                toUserId,
                subject,
                content,
                timestamp: new Date(),
                read: false
            };
            this.messages.push(message);
            this.trigger('newMessage', message);
            return message;
        }

        // Get messages for a specific user
        getUserMessages(userId) {
            return this.messages.filter(msg => msg.toUserId === userId);
        }

        // Get unread message count for a user
        getUnreadMessageCount(userId) {
            return this.messages.filter(msg => msg.toUserId === userId && !msg.read).length;
        }

        // Mark a message as read
        markMessageAsRead(messageId) {
            const message = this.messages.find(msg => msg.id === messageId);
            if (message) {
                message.read = true;
                this.trigger('messageRead', message);
            }
        }

        // Create an announcement for all users or specific sectors
        createAnnouncement(fromUserId, content, title, targetSectors = []) {
            const announcement = {
                id: this.generateId(),
                fromUserId,
                title,
                content,
                timestamp: new Date(),
                targetSectors: targetSectors.length > 0 ? targetSectors : null, // null means all sectors
                readBy: []
            };
            this.announcements.push(announcement);
            this.trigger('newAnnouncement', announcement);
            return announcement;
        }

        // Get announcements visible to a user
        getUserAnnouncements(userId, userSector) {
            return this.announcements.filter(announcement => 
                !announcement.targetSectors || 
                announcement.targetSectors.includes(userSector)
            );
        }

        // Mark an announcement as read by a user
        markAnnouncementAsRead(announcementId, userId) {
            const announcement = this.announcements.find(a => a.id === announcementId);
            if (announcement && !announcement.readBy.includes(userId)) {
                announcement.readBy.push(userId);
                this.trigger('announcementRead', { announcement, userId });
            }
        }

        // Create a system notification (for tickets, maintenance, etc.)
        createNotification(type, content, targetUserId = null, relatedItemId = null) {
            const notification = {
                id: this.generateId(),
                type, // 'ticket', 'maintenance', 'system', etc.
                content,
                timestamp: new Date(),
                targetUserId, // if null, notification is for all users
                relatedItemId, // optional ID of related ticket, machine, etc.
                read: false
            };
            this.notifications.push(notification);
            this.trigger('newNotification', notification);
            return notification;
        }

        // Get notifications for a user
        getUserNotifications(userId) {
            return this.notifications.filter(
                notif => notif.targetUserId === userId || notif.targetUserId === null
            );
        }

        // Get unread notification count for a user
        getUnreadNotificationCount(userId) {
            return this.notifications.filter(
                notif => (notif.targetUserId === userId || notif.targetUserId === null) && !notif.read
            ).length;
        }

        // Mark a notification as read
        markNotificationAsRead(notificationId) {
            const notification = this.notifications.find(notif => notif.id === notificationId);
            if (notification) {
                notification.read = true;
                this.trigger('notificationRead', notification);
            }
        }

        // Event handling
        on(event, callback) {
            if (!this.callbacks[event]) {
                this.callbacks[event] = [];
            }
            this.callbacks[event].push(callback);
        }

        trigger(event, data) {
            if (this.callbacks[event]) {
                this.callbacks[event].forEach(callback => callback(data));
            }
        }

        generateId() {
            return Date.now() + Math.floor(Math.random() * 1000);
        }

        // Save state to localStorage
        saveState() {
            localStorage.setItem('messages', JSON.stringify(this.messages));
            localStorage.setItem('announcements', JSON.stringify(this.announcements));
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        }

        // Load state from localStorage
        loadState() {
            const messages = localStorage.getItem('messages');
            const announcements = localStorage.getItem('announcements');
            const notifications = localStorage.getItem('notifications');

            if (messages) this.messages = JSON.parse(messages);
            if (announcements) this.announcements = JSON.parse(announcements);
            if (notifications) this.notifications = JSON.parse(notifications);
        }
    }

    // Create a singleton instance only if it doesn't already exist
    if (!window.notificationSystem || !window.notificationSystem.messages) {
        window.notificationSystem = new NotificationSystem();
    }
}