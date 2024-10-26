        // Sidebar toggle
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Notification button click event
        const notificationBtn = document.getElementById('notificationBtn');
        notificationBtn.addEventListener('click', () => {
            alert('Notifications feature coming soon!');
            location.reload();
        });
