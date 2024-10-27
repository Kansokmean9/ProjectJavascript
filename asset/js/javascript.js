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

        // get me
        let token = sessionStorage.getItem('Token');
        console.log(token);

        fetch(`https://mps7.chandalen.dev/api/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                document.getElementById('avtadmin').src = json.data.avatar;
                document.getElementById('adminName').innerHTML = json.data.name;

            })
