
const username = document.getElementById('username');
const password = document.getElementById('password');
let va_username = document.getElementById('va_user');
let va_pass = document.getElementById('va_pass');
function adddata() {
    const btnSubmit = document.getElementById('btnsubmit');
    btnSubmit.disabled = true;

    const form = document.getElementById('loginForm');
    let formData = new FormData(form);

    formData.append('email', username.value);
    formData.append('password', password.value);

    fetch('https://mps7.chandalen.dev/api/login', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);

            // Password validation
            if (password.value === "") {
                va_pass.classList.remove('opacity-0');
                password.classList.add('border', 'border-danger');
                va_pass.innerHTML = json.data?.password?.[1] || "Password is required.";
            } else {
                va_pass.classList.add('opacity-0');
                password.classList.remove('border', 'border-danger');
            }

            // Username/Email validation
            if (username.value === "") {
                va_username.classList.remove('opacity-0');
                username.classList.add('border', 'border-danger');
                va_username.innerHTML = json.data?.email?.[1] || "Username is required.";
            } else if (!isNaN(username.value)) {
                va_username.classList.remove('opacity-0');
                username.classList.add('border', 'border-danger');
                va_username.innerHTML = 'The email field must be a string.';
            } else if (json.data?.email?.[0] === "The email field must be a valid email address.") {
                va_username.classList.remove('opacity-0');
                username.classList.add('border', 'border-danger');
                va_username.innerHTML = json.data.email[0];
            } else {
                va_username.classList.add('opacity-0');
                username.classList.remove('border', 'border-danger');
            }

            // Incorrect credentials handling
            if (json.data?.length === 0) {
                va_username.classList.add('opacity-0');
                va_pass.classList.remove('opacity-0');
                password.classList.add('border', 'border-danger');
                va_pass.innerHTML = json.message || "Incorrect username or password.";
            } else if (json.message === "Login successful.") {
                // Successful login
                Swal.fire({
                    title: "Login processing!",
                    html: "Wait for <b></b> milliseconds.",
                    timer: 800,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    }
                }).then((result) => {
                    sessionStorage.setItem('Token', json.data.token);
                    location.href = 'page/dashboard.html';
                });
            }
        })
        .finally(() => {
            btnSubmit.disabled = false;
        });
}

function hidepass() {
    let pass = document.getElementById('password');
    if (pass.type === 'password') {
        pass.type = 'text';
        document.getElementById('hidePass').innerHTML = `<i class="bi bi-eye-fill"></i>`;
    } else {
        pass.type = 'password';
        document.getElementById('hidePass').innerHTML = `<i class="bi bi-eye-slash"></i>`;
    }
}
username.addEventListener("input", function () {
    if (username.value.trim() !== "") {
        username.classList.remove('border', 'border-danger');
        va_username.classList.add('opacity-0');
    }
});
password.addEventListener("input", function () {
    if (password.value.trim() !== "") {
        password.classList.remove('border', 'border-danger');
        va_pass.classList.add('opacity-0');
    }
});