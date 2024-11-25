

function getLang() {
    fetch('https://mps7.chandalen.dev/api/languages')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            let tr = '';
            json.data.forEach(element => {
                tr += `<tr class="bg bg-body-secondary">
        <td>${element.id}</td>
        <td>${element.en_name}</td>
        <td>${element.percent}</td>
       <td>
            <img class=" cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#languages"  onclick="toUpdate(${element.id})" width="20px" height="20px">
            <img class="ms-2 cs " src="../asset/img/rubbish-bin.png" onclick="deleteLang(${element.id})" width="20px" height="20px">     
        </td>
    </tr>`;
            });
            document.querySelector('tbody').innerHTML = tr;
            if (tr == '') {
                document.getElementById('nodata').classList.remove('d-none');
            } else {
                document.getElementById('nodata').classList.add('d-none');
            }
        })
}
getLang();

function addLang() {
    const btnlg = document.getElementById('btnlg');
    btnlg.disabled = true;
    let languagesName = document.getElementById('languagesName');
    let languagesLevel = document.getElementById('output');
    let langError = document.getElementById('langError');

    if (!isNaN(languagesName.value) && languagesName.value != '') {
        langError.classList.remove('opacity-0');
        languagesName.classList.add('border', 'border-danger');
        langError.innerHTML = "Language must be a string.";
        btnlg.disabled = false;
        return;
    }


    fetch(`https://mps7.chandalen.dev/api/languages`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_name": languagesName.value,
            "percent": languagesLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (languagesName.value == "") {
                langError.innerHTML = json.data.en_name[1];
                languagesName.classList.add('border', 'border-danger');
                langError.classList.remove('opacity-0');
            } else {
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                languagesName.value = "";
                getLang();
            }
        })
        .finally(() => {
            btnlg.disabled = false;
        });
}
languagesName.addEventListener("input", function () {
    if (languagesName.value.trim() !== "") {
        languagesName.classList.remove('border', 'border-danger');
        langError.classList.add('opacity-0');
    }
});

function deleteLang(id) {
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
            fetch(`https://mps7.chandalen.dev/api/languages/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json); // Log the response to see if delete was successful
                    if (json.result) {
                        Swal.fire({
                            title: "Deleted!",
                            text: json.message,
                            icon: "success"
                        });
                        getLang(); // Refresh data
                    } else {
                        Swal.fire("Error!", "Failed to delete experience.", "error");
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    Swal.fire("Error!", "An error occurred while deleting the experience.", "error");
                });
        }
    });
}

/////update////////
let idUpdate = 0;
let unlanguagesName = document.getElementById('unlanguagesName');
let unlanguagesLevel = document.getElementById('unlanguagesLevel');
let updateLangError = document.getElementById('updateLangError'); // Error span for update name

function toUpdate(id) {
    idUpdate = id;
    unlanguagesName.classList.remove('border', 'border-danger');
    updateLangError.classList.add('opacity-0');
    fetch('https://mps7.chandalen.dev/api/languages')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            json.data.forEach(element => {

                if (element.id == id) {
                    unlanguagesName.value = element.en_name;
                    unlanguagesLevel.value = element.percent;
                    document.getElementById('rangePercent').value = element.percent;
                }
            });

        })

}

function updateLang() {
    const updatelg = document.getElementById('updatelg');
    updatelg.disabled = true;
    if (!isNaN(unlanguagesName.value) && unlanguagesName.value != '') {
        updateLangError.classList.remove('opacity-0');
        unlanguagesName.classList.add('border', 'border-danger');
        updateLangError.innerHTML = "Language must be a string.";
        updatelg.disabled = false;
        return;
    }
    fetch(`https://mps7.chandalen.dev/api/languages/${idUpdate}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            "en_name": unlanguagesName.value,
            "percent": unlanguagesLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (unlanguagesName.value == "") {
                updateLangError.innerHTML = json.errors.en_name[1];
                unlanguagesName.classList.add('border', 'border-danger');
                updateLangError.classList.remove('opacity-0');
            } else if (json.message) {

                bootstrap.Modal.getInstance(
                    document.getElementById("languages")
                ).hide(); // Close the modal
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getLang(); // Refresh the skill list
            }
        })
        .finally(() => {
            updatelg.disabled = false;
        });
}
unlanguagesName.addEventListener("input", function () {
    if (unlanguagesName.value.trim() !== "") {
        unlanguagesName.classList.remove('border', 'border-danger');
        updateLangError.classList.add('opacity-0');
    }
});
