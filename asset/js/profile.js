let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let nationality = document.getElementById('nationality');
let va_fname = document.getElementById('va_fname');
let va_lname = document.getElementById('va_lname');
let va_nationality = document.getElementById('va_nationality');

let email = document.getElementById('email');
let phone = document.getElementById('phone');
let address = document.getElementById('address');
let va_email = document.getElementById('va_email');
let va_phone = document.getElementById('va_phone');
let va_address = document.getElementById('va_address');

let fb = document.getElementById('fb');
let tg = document.getElementById('tg');
let li = document.getElementById('li');
let va_fb = document.getElementById('va_fb');
let va_tg = document.getElementById('va_tg');
let va_li = document.getElementById('va_li');

function getme() {
    fetch(`https://mps7.chandalen.dev/api/profile`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            document.getElementById('heroImage').src = json.data.profile.photo_hero;
            document.getElementById('aboutImage').src = json.data.profile.photo_about;
            fname.value = json.data.profile.en_first_name;
            lname.value = json.data.profile.en_last_name;
            nationality.value = json.data.profile.en_nationality;
            email.value = json.data.profile.email;
            phone.value = json.data.profile.en_phone;
            address.value = json.data.profile.en_address;
            fb.value = json.data.social.facebook;
            tg.value = json.data.social.telegram;
            li.value = json.data.social.linkedin;

        })
}
getme();

let hero = document.getElementById('editpic1');
let va_hero = document.getElementById('va_hero');
let about = document.getElementById('editpic2');
let va_about = document.getElementById('va_about');
function toupHero() {
    hero.classList.remove('border', 'border-danger');
    va_hero.classList.add('opacity-0');
}
function toupAbout() {
    about.classList.remove('border', 'border-danger');
    va_about.classList.add('opacity-0');
}

function updateHero() {
    const btnUpdate = document.getElementById('btnUpdateHero');
    btnUpdate.disabled = true;
    const form = document.getElementById('updatehero');
    const formData = new FormData(form);

    if (hero.files.length > 0) {
        formData.append('photo', hero.files[0]);
    }
    fetch(`https://mps7.chandalen.dev/api/photo/hero`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            if (hero.value == '') {
                hero.classList.add('border', 'border-danger');
                va_hero.classList.remove('opacity-0');
                va_hero.innerHTML = json.data.photo[0];
            } else {

                Swal.fire({
                    title: "Updated!",
                    text: json.message,
                    icon: "success"
                });
                bootstrap.Modal.getInstance(
                    document.getElementById("modalUpdatehero")
                ).hide();
                getme();
            }
        })
        .finally(() => {
            btnUpdate.disabled = false;
        });

}
function updateAboutPhoto() {
    const btnUpdate = document.getElementById('btnUpdateAbout');
    btnUpdate.disabled = true;
    const form = document.getElementById('updateAbout');
    const formData = new FormData(form);
    if (about.files.length > 0) {
        formData.append('photo', about.files[0]);
    }
    fetch(`https://mps7.chandalen.dev/api/photo/about`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            if (about.value == '') {
                about.classList.add('border', 'border-danger');
                va_about.classList.remove('opacity-0');
                va_about.innerHTML = json.data.photo[0];
            } else {

                Swal.fire({
                    title: "Updated!",
                    text: json.message,
                    icon: "success"
                });
                bootstrap.Modal.getInstance(
                    document.getElementById("modalUpdateAbout")
                ).hide();
                getme();
            }
        })
        .finally(() => {
            btnUpdate.disabled = false;
        });
}

function updateInfo() {
    const btnUpInfo = document.getElementById('btnUpdateInfo');
    btnUpInfo.disabled = true;

    let succ = 0;
    let succ1 = 0;
    let succ2 = 0;

    if (!isNaN(fname.value) && fname.value != '') {
        va_fname.classList.remove('opacity-0');
        fname.classList.add('border', 'border-danger');
        va_fname.innerHTML = "Fisrt name must be a string.";
        succ = 1;
    } else if (fname.value == "") {
        va_fname.classList.remove('opacity-0');
        fname.classList.add('border', 'border-danger');
        va_fname.innerHTML = "The en first name field is required.";
    }

    if (!isNaN(lname.value) && lname.value != '') {
        va_lname.classList.remove('opacity-0');
        lname.classList.add('border', 'border-danger');
        va_lname.innerHTML = "Last name must be a string.";
        succ1 = 1;
    } else if (lname.value == "") {
        va_lname.classList.remove('opacity-0');
        lname.classList.add('border', 'border-danger');
        va_lname.innerHTML = "The en last name field is required.";
    }
    if (!isNaN(nationality.value) && nationality.value != '') {
        va_nationality.classList.remove('opacity-0');
        nationality.classList.add('border', 'border-danger');
        va_nationality.innerHTML = "Nationality must be a string.";
        succ2 = 1;
    } else if (nationality.value == "") {
        va_nationality.classList.remove('opacity-0');
        nationality.classList.add('border', 'border-danger');
        va_nationality.innerHTML = "The en nationality field is required.";
    }
    if (succ == 1 || succ1 == 1 || succ2 == 1) {
        btnUpInfo.disabled = false;
        return;
    }
    fetch(`https://mps7.chandalen.dev/api/profile/personal-information`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_first_name": fname.value,
            "en_last_name": lname.value,
            "en_nationality": nationality.value
        })

    })
        .then(res => res.json())
        .then(json => {
            if (fname.value == "") {
                fname.classList.add('border', 'border-danger');
                va_fname.innerHTML = json.data.en_first_name[1];
                va_fname.classList.remove('opacity-0');
            }
            if (lname.value == "") {
                lname.classList.add('border', 'border-danger');
                va_lname.innerHTML = json.data.en_last_name[1];
                va_lname.classList.remove('opacity-0');
            }
            if (nationality.value == "") {
                nationality.classList.add('border', 'border-danger');
                va_nationality.innerHTML = json.data.en_nationality[1];
                va_nationality.classList.remove('opacity-0');
            }
            if (json.result) {
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getme();
            }
        })
        .finally(() => {
            btnUpInfo.disabled = false;
        });
}
fname.addEventListener("input", function () {
    if (fname.value.trim() !== "") {
        fname.classList.remove('border', 'border-danger');
        va_fname.classList.add('opacity-0');
    }
});
lname.addEventListener("input", function () {
    if (lname.value.trim() !== "") {
        lname.classList.remove('border', 'border-danger');
        va_lname.classList.add('opacity-0');
    }
});
nationality.addEventListener("input", function () {
    if (nationality.value.trim() !== "") {
        nationality.classList.remove('border', 'border-danger');
        va_nationality.classList.add('opacity-0');
    }
});

function updateContact() {
    const btnUpContact = document.getElementById('btnUpContact');
    btnUpContact.disabled = true;

    fetch(`https://mps7.chandalen.dev/api/profile/contact`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "en_phone": phone.value,
            "en_address": address.value
        })

    })
        .then(res => res.json())
        .then(json => {
            console.log(json);

            if (email.value == "") {
                email.classList.add('border', 'border-danger');
                va_email.innerHTML = json.data.email[1];
                va_email.classList.remove('opacity-0');
            } else if (json.data.email == "The email field must be a valid email address.") {
                email.classList.add('border', 'border-danger');
                va_email.innerHTML = json.data.email[0];
                va_email.classList.remove('opacity-0');
            } else {
                email.classList.remove('border', 'border-danger');
                va_email.classList.add('opacity-0');
            }
            if (phone.value == "") {
                phone.classList.add('border', 'border-danger');
                va_phone.innerHTML = json.data.en_phone[1];
                va_phone.classList.remove('opacity-0');
            }
            if (address.value == "") {
                address.classList.add('border', 'border-danger');
                va_address.innerHTML = json.data.en_address[1];
                va_address.classList.remove('opacity-0');
            }
            if (json.result) {
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getme()
            }
        })
        .finally(() => {
            btnUpContact.disabled = false;
        });
}
email.addEventListener("input", function () {
    if (email.value.trim() !== "") {
        email.classList.remove('border', 'border-danger');
        va_email.classList.add('opacity-0');
    }
});
phone.addEventListener("input", function () {
    if (phone.value.trim() !== "") {
        phone.classList.remove('border', 'border-danger');
        va_phone.classList.add('opacity-0');
    }
});
address.addEventListener("input", function () {
    if (address.value.trim() !== "") {
        address.classList.remove('border', 'border-danger');
        va_address.classList.add('opacity-0');
    }
});
function updateSocail() {
    const btnUpSocail = document.getElementById('btnUpSocail');
    btnUpSocail.disabled = true;

    fetch(`https://mps7.chandalen.dev/api/profile/social`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "facebook": fb.value,
            "telegram": tg.value,
            "linkedin": li.value
        })

    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            function isValidURL(url) {
                try {
                    new URL(url);
                    return true;
                } catch (error) {
                    return false;
                }
            }
            if (fb.value == "") {
                fb.classList.add('border', 'border-danger');
                va_fb.innerHTML = json.data.facebook[1];
                va_fb.classList.remove('opacity-0');
            } else if (!isValidURL(fb.value)) {
                fb.classList.add('border', 'border-danger');
                va_fb.innerHTML = json.data.facebook[0];
                va_fb.classList.remove('opacity-0');
            }
            if (tg.value == "") {
                tg.classList.add('border', 'border-danger');
                va_tg.innerHTML = json.data.telegram[1];
                va_tg.classList.remove('opacity-0');
            } else if (!isValidURL(tg.value)) {
                tg.classList.add('border', 'border-danger');
                va_tg.innerHTML = json.data.telegram[0];
                va_tg.classList.remove('opacity-0');
            }
            if (li.value == "") {
                li.classList.add('border', 'border-danger');
                va_li.innerHTML = json.data.linkedin[1];
                va_li.classList.remove('opacity-0');
            } else if (!isValidURL(li.value)) {
                li.classList.add('border', 'border-danger');
                va_li.innerHTML = json.data.linkedin[0];
                va_li.classList.remove('opacity-0');
            }
            if (json.result) {
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getme();
            }
        })
        .finally(() => {
            btnUpSocail.disabled = false;
        });
}
fb.addEventListener("input", function () {
    if (fb.value.trim() !== "") {
        fb.classList.remove('border', 'border-danger');
        va_fb.classList.add('opacity-0');
    }
});
tg.addEventListener("input", function () {
    if (tg.value.trim() !== "") {
        tg.classList.remove('border', 'border-danger');
        va_tg.classList.add('opacity-0');
    }
});
li.addEventListener("input", function () {
    if (li.value.trim() !== "") {
        li.classList.remove('border', 'border-danger');
        va_li.classList.add('opacity-0');
    }
});
