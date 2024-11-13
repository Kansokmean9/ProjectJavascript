// Sidebar toggle
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');

// Toggle sidebar open/close
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when close button is clicked
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
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
        if(json.data.avatar== "https://mps7.chandalen.dev/storage/avatar/default.png"){
            document.getElementById('avtadmin').src ="../asset/img/frameIMG.webp";
        }else{
            document.getElementById('avtadmin').src = json.data.avatar;
        }
        document.getElementById('adminName').innerHTML = json.data.name;

    })



