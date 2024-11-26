const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});


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
        console.log(json);
        if(json.data.avatar== "https://mps7.chandalen.dev/storage/avatar/default.png"){
            document.getElementById('avtadmin').src ="../asset/img/frameIMG.webp";
        }else{
            document.getElementById('avtadmin').src = json.data.avatar;
        }
        document.getElementById('adminName').innerHTML = json.data.name;

    })

    
    fetch(`https://mps7.chandalen.dev/api/dashboard`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json.data.total_view);
            
            document.getElementById('catchdata').innerText = json.data.total_contact;
    
        })



