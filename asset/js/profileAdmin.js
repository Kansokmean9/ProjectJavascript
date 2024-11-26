

let token = sessionStorage.getItem('Token');
console.log(token);

function getme() {
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
            if (json.data.avatar == "https://mps7.chandalen.dev/storage/avatar/default.png") {
                document.getElementById('avtadmin').src = "../asset/img/frameIMG.webp";
            } else {
                document.getElementById('avtadmin').src = json.data.avatar;

            }
            document.getElementById('adminName').innerHTML = json.data.name;

            document.getElementById('idAd').innerHTML = json.data.id;
            document.getElementById('nameAd').innerHTML = json.data.name;
            document.getElementById('gmailAd').innerHTML = json.data.email;
            document.getElementById('upName').value = json.data.name;
            document.getElementById('upGmail').value = json.data.email;
        })
}
getme();

let av = document.getElementById('editpic');
let va_av = document.getElementById('va_av');
function toupAV() {
    av.classList.remove('border', 'border-danger');
    va_av.classList.add('opacity-0');
}
function updateavt() {
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.disabled = true;
    const form = document.getElementById('updateAvt');
    const formData = new FormData(form);
    if (av.files.length > 0) {
        formData.append('avatar', av.files[0]);
    }
    fetch(`https://mps7.chandalen.dev/api/own/avatars`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            if (av.value == '') {
                av.classList.add('border', 'border-danger');
                va_av.classList.remove('opacity-0');
                va_av.innerHTML = json.data.avatar[0];
            } else {

                Swal.fire({
                    title: "Updated!",
                    text: json.message,
                    icon: "success"
                });
                bootstrap.Modal.getInstance(
                    document.getElementById("modalUpdateAvt")
                ).hide();
                getme();
            }
        })
        .finally(() => {
            btnUpdate.disabled = false;
        });
}

function deleteavt() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`https://mps7.chandalen.dev/api/own/avatars`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    alert(json.message);
                    Swal.fire({
                        title: "Deleted!",
                        text: json.message,
                        icon: "success"
                    });
                    getme();

                })
                .catch(err => console.error('Error:', err));

        }
    });
}

let names = document.getElementById('upName');
let emails = document.getElementById('upGmail');
function saveinfo() {
    const btnSubmit = document.getElementById('saveInfo');
    btnSubmit.disabled = true;

    let va_name = document.getElementById('va_name');
    let va_gmail = document.getElementById('va_gmail');

    fetch(`https://mps7.chandalen.dev/api/own/personal-information`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": names.value,
            "email": emails.value
        })
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (names.value == "") {
                va_name.innerHTML = json.data.name[1];
                names.classList.add('border', 'border-danger');
                va_name.classList.remove('opacity-0');

            } else {
                names.classList.remove('border', 'border-danger');
                va_name.classList.add('opacity-0');
            }
            if (emails.value == "") {
                va_gmail.innerHTML = json.data.email[1];
                emails.classList.add('border', 'border-danger');
                va_gmail.classList.remove('opacity-0');

            } else if (json.data.email[0] == "The email field must be a valid email address.") {
                va_gmail.innerHTML = json.data.email[0];
                emails.classList.add('border', 'border-danger');
                va_gmail.classList.remove('opacity-0');
            } else if (json.result) {
                emails.classList.remove('border', 'border-danger');
                va_gmail.classList.add('opacity-0');
                Swal.fire({
                    title: "Updated!",
                    text: json.message,
                    icon: "success"
                });
                getme();
            }

        })
        .finally(() => {
            btnSubmit.disabled = false;
        });

}
names.addEventListener("input", function () {
    if (names.value.trim() !== "") {
        names.classList.remove('border', 'border-danger');
        va_name.classList.add('opacity-0');
    }
});
emails.addEventListener("input", function () {
    if (emails.value.trim() !== "") {
        emails.classList.remove('border', 'border-danger');
        va_gmail.classList.add('opacity-0');
    }
});


let crPass = document.getElementById('crPass');
let newPass = document.getElementById('newPass');
let cfPass = document.getElementById('cfPass');
function savePass() {
    const btnSubmit = document.getElementById('savePass');
    btnSubmit.disabled = true;

    let va_cPass = document.getElementById('va_cPass');
    let va_nPass = document.getElementById('va_nPass');
    let va_comPass = document.getElementById('va_comPass');

    fetch(`https://mps7.chandalen.dev/api/own/password`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "current_password": crPass.value,
            "password": newPass.value,
            "password_confirmation": cfPass.value
        })
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (crPass.value == "") {
                crPass.classList.add('border', 'border-danger');
                va_cPass.classList.remove('opacity-0');
                va_cPass.innerHTML = json.errors.current_password[1];
            }
            else {
                crPass.classList.remove('border', 'border-danger');
                va_cPass.classList.add('opacity-0');
            }
            if (newPass.value == "") {
                newPass.classList.add('border', 'border-danger');
                va_nPass.classList.remove('opacity-0');
                va_nPass.innerHTML = json.errors.password[1];
            } else {
                newPass.classList.remove('border', 'border-danger');
                va_nPass.classList.add('opacity-0');
            }
            if (cfPass.value == "") {
                cfPass.classList.add('border', 'border-danger');
                va_comPass.classList.remove('opacity-0');
                va_comPass.innerHTML = json.errors.password_confirmation[1];

            } else {
                cfPass.classList.remove('border', 'border-danger');
                va_comPass.classList.add('opacity-0');

            }
            if (cfPass.value != "" && newPass.value != "" && crPass.value != "") {
                if (newPass.value != cfPass.value) {
                    cfPass.classList.add('border', 'border-danger');
                    va_comPass.innerHTML = json.errors.password;
                    va_comPass.classList.remove('opacity-0');
                } else if (newPass.value == cfPass.value) {
                    cfPass.classList.remove('border', 'border-danger');
                    va_comPass.classList.add('opacity-0');
                    if (!json.result) {
                        // alert()
                        crPass.classList.add('border', 'border-danger');
                        va_cPass.classList.remove('opacity-0');
                        va_cPass.innerHTML = json.message;
                    }
                    else {
                        crPass.classList.remove('border', 'border-danger');
                        va_cPass.classList.add('opacity-0');
                        Swal.fire({
                            title: "Updated!",
                            text: json.message,
                            icon: "success"
                        });
                    }
                }


            }

        })
        .finally(() => {
            btnSubmit.disabled = false;
        });

}
crPass.addEventListener("input", function () {
    if (crPass.value.trim() !== "") {
        crPass.classList.remove('border', 'border-danger');
        va_cPass.classList.add('opacity-0');
    }
});
newPass.addEventListener("input", function () {
    if (newPass.value.trim() !== "") {
        newPass.classList.remove('border', 'border-danger');
        va_nPass.classList.add('opacity-0');
    }
});
cfPass.addEventListener("input", function () {
    if (cfPass.value.trim() !== "") {
        cfPass.classList.remove('border', 'border-danger');
        va_comPass.classList.add('opacity-0');
    }
});

function logoutbtn() {
    let id = sessionStorage.getItem('Token');
    console.log(id);

    Swal.fire({
        title: "Are you sure",
        text: "you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://mps7.chandalen.dev/api/logout`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${id}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.message == "Logout successful.") {
                        // alert(json.message);
                        sessionStorage.clear();
                        location.href = '../index.html';
                    } else {
                        Swal.fire({
                            title: "Logout",
                            text: json.message,
                            icon: "warning"
                        });
                    }


                })
        }
    });

}

