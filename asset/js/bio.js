function getme() {
    fetch(`https://mps7.chandalen.dev/api/profile`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            // alert(json.data.profile.km_first_name);
            let biography = json.data.bio;
            document.getElementById('heorBio').value = biography.en_hero_bio;
            document.getElementById('aboutTitle').value = biography.en_about_title;
            document.getElementById('aboutBio').innerHTML = biography.en_about_bio;
            document.getElementById('subtitle').innerHTML = biography.en_about_sub_title;
            document.getElementById('logo1').src = biography.skill_logo_one;
            document.getElementById('logo2').src = biography.skill_logo_two;


        })
}
getme();

function updateBio() {
    let heorBio = document.getElementById('heorBio');
    let aboutTitle = document.getElementById('aboutTitle');
    let aboutBio = document.getElementById('aboutBio');
    let subtitle = document.getElementById('subtitle');

    let va_heroBio = document.getElementById('va_heroBio');
    let va_aboutTitle = document.getElementById('va_aboutTitle');
    let va_aboutBio = document.getElementById('va_aboutBio');
    let va_aboutSub = document.getElementById('va_aboutSub');

    let usucc = 0;
    let usucc1 = 0;
    let usucc2 = 0;
    let usucc3 = 0;

    if (!isNaN(heorBio.value) && heorBio.value != '') {
        va_heroBio.classList.remove('opacity-0');
        heorBio.classList.add('border', 'border-danger');
        va_heroBio.innerHTML = "Hero must be a string.";
        usucc = 1;
    } else if (heorBio.value == "") {
        va_heroBio.classList.remove('opacity-0');
        heorBio.classList.add('border', 'border-danger');
        va_heroBio.innerHTML = "The en hero bio field is required.";
    }

    if (!isNaN(aboutTitle.value) && aboutTitle.value != '') {
        va_aboutTitle.classList.remove('opacity-0');
        aboutTitle.classList.add('border', 'border-danger');
        va_aboutTitle.innerHTML = "Title must be a string.";
        usucc1 = 1;
    } else if (aboutTitle.value == "") {
        va_aboutTitle.classList.remove('opacity-0');
        aboutTitle.classList.add('border', 'border-danger');
        va_aboutTitle.innerHTML = "The en about title field is required.";
    }

    if (!isNaN(aboutBio.value) && aboutBio.value != '') {
        va_aboutBio.classList.remove('opacity-0');
        aboutBio.classList.add('border', 'border-danger');
        va_aboutBio.innerHTML = "Biography must be a string.";
        usucc2 = 1;
    } else if (aboutBio.value == "") {
        va_aboutBio.classList.remove('opacity-0');
        aboutBio.classList.add('border', 'border-danger');
        va_aboutBio.innerHTML = "The en about bio field is required.";
    }

    if (!isNaN(subtitle.value) && subtitle.value != '') {
        va_aboutSub.classList.remove('opacity-0');
        subtitle.classList.add('border', 'border-danger');
        va_aboutSub.innerHTML = "Subtitle must be a string.";
        usucc1 = 3;
    } else if (subtitle.value == "") {
        va_aboutSub.classList.remove('opacity-0');
        subtitle.classList.add('border', 'border-danger');
        va_aboutSub.innerHTML = "The en about sub title field is required.";
    }


    if (usucc == 1 || usucc1 == 1 || usucc2 == 1 || usucc3 == 1) {
        btnUsubmit.disabled = false;
        return;
    }
    fetch(`https://mps7.chandalen.dev/api/biographies`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_hero_bio": heorBio.value,
            "en_about_title": aboutTitle.value,
            "en_about_bio": aboutBio.value,
            "en_about_sub_title": subtitle.value,
            "km_hero_bio": heorBio.value,
            "km_about_title": aboutTitle.value,
            "km_about_bio": aboutBio.value,
            "km_about_sub_title": subtitle.value

        })
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (heorBio.value == "") {
                heorBio.classList.add('border', 'border-danger');
                va_heroBio.classList.remove('opacity-0');
                va_heroBio.innerHTML = json.data.en_hero_bio[1];
            }

            if (aboutTitle.value == "") {
                aboutTitle.classList.add('border', 'border-danger');
                va_aboutTitle.classList.remove('opacity-0');
                va_aboutTitle.innerHTML = json.data.en_about_title[1];
            }

            if (subtitle.value == "") {
                subtitle.classList.add('border', 'border-danger');
                va_aboutSub.classList.remove('opacity-0');
                va_aboutSub.innerHTML = json.data.en_about_sub_title[1];
            }

            if (aboutBio.value == "") {
                aboutBio.classList.add('border', 'border-danger');
                va_aboutBio.classList.remove('opacity-0');
                va_aboutBio.innerHTML = json.data.en_about_bio[1];
            }

            if (json.result) {
                
                getme();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1000
                });

            }
        })
}
heorBio.addEventListener("input", function () {
    if (heorBio.value.trim() !== "") {
        heorBio.classList.remove('border', 'border-danger');
        va_heroBio.classList.add('opacity-0');
    }
});
aboutTitle.addEventListener("input", function () {
    if (aboutTitle.value.trim() !== "") {
        aboutTitle.classList.remove('border', 'border-danger');
        va_aboutTitle.classList.add('opacity-0');
    }
});
aboutBio.addEventListener("input", function () {
    if (aboutBio.value.trim() !== "") {
        aboutBio.classList.remove('border', 'border-danger');
        va_aboutBio.classList.add('opacity-0');
    }
});
subtitle.addEventListener("input", function () {
    if (subtitle.value.trim() !== "") {
        subtitle.classList.remove('border', 'border-danger');
        va_aboutSub.classList.add('opacity-0');
    }
});

function updateLogo1() {
    const form = document.getElementById('logoSkillform');
    const formData = new FormData(form);
    let logo1 = document.getElementById('skilllogo1');

    let va_logo1 = document.getElementById('va_logo1');
    if (logo1.files.length > 0) {
        formData.append('logo', logo1.files[0]);
    }
    fetch(`https://mps7.chandalen.dev/api/biographies/skill-logo-one`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            if (json.message == "Invalid input value") {
                va_logo1.innerHTML = json.data.logo[0];
                va_logo1.classList.remove('opacity-0');
                logo1.classList.add('border', 'border-danger')
            } else {
                va_logo1.classList.add('opacity-0');
                logo1.classList.remove('border', 'border-danger');
                logo1.value = '';
                getme();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1000
                });

            }
        })
        .catch(err => console.error('Error:', err));
}
function updatelogo2() {
    const form = document.getElementById('logoSkillform');
    const formData = new FormData(form);
    let logo2 = document.getElementById('skilllogo2');
    let va_logo2 = document.getElementById('va_logo2');

    {
        if (logo2.files.length > 0) {
            formData.append('logo', logo2.files[0]);
        }
        fetch(`https://mps7.chandalen.dev/api/biographies/skill-logo-two`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(json => {
                if (json.message == "Invalid input value") {
                    va_logo2.innerHTML = json.data.logo[0];
                    va_logo2.classList.remove('opacity-0');
                    logo2.classList.add('border', 'border-danger');
                } else {
                    va_logo2.classList.add('opacity-0');
                    logo2.classList.remove('border', 'border-danger');
                    logo2.value = '';
                    getme();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: json.message,
                        showConfirmButton: false,
                        timer: 1000
                    });

                }
            })
            .catch(err => console.error('Error:', err));
    }
}