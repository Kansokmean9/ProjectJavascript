
function getsproject() {
    fetch('https://mps7.chandalen.dev/api/projects')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            let tr = '';
            json.data.forEach(element => {
                tr += `<tr class="bg bg-body-secondary">
            <td>${element.id}</td>
            <td>${element.en_name}</td>
            <td>${element.en_workplace}</td>
            <td>
                <img class="cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#myModal1" onclick="toUpdate(${element.id})" width="20px" height="20px">
                <img class="ms-2 cs" src="../asset/img/rubbish-bin.png" onclick="deleteExperience(${element.id})" width="20px" height="20px">     
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
getsproject();

function addproject() {
    const btnSubmit = document.getElementById('btnsubmit');
    btnSubmit.disabled = true;

    let projectName = document.getElementById('projectName');
    let projectTechnologies = document.getElementById('projectTechnologies');
    let projectError = document.getElementById('projectError');
    let workplaceError = document.getElementById('workplaceError');
    let succ = 0;
    let succ1 = 0;

    if (!isNaN(projectName.value) && projectName.value != '') {
        projectError.classList.remove('opacity-0');
        projectName.classList.add('border', 'border-danger');
        projectError.innerHTML = "Project must be a string.";
        succ = 1;
    }
    else if (projectName.value == "") {
        projectError.classList.remove('opacity-0');
        projectName.classList.add('border', 'border-danger');
        projectError.innerHTML = "The en name field is required.";
    }
    if (!isNaN(projectTechnologies.value) && projectTechnologies.value != '') {
        workplaceError.classList.remove('opacity-0');
        projectTechnologies.classList.add('border', 'border-danger');
        workplaceError.innerHTML = "Workplace must be a string.";
        succ1 = 1;
    } else if (projectTechnologies.value == "") {
        workplaceError.classList.remove('opacity-0');
        projectTechnologies.classList.add('border', 'border-danger');
        workplaceError.innerHTML = "The en workplace field is required.";
    }
    if (succ == 1 || succ1 == 1) {
        btnSubmit.disabled = false;
        return;
    }


    fetch(`https://mps7.chandalen.dev/api/projects`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_name": projectName.value,
            "en_workplace": projectTechnologies.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            // Project Name validation
            if (projectName.value === "") {
                projectError.classList.remove('opacity-0');
                projectName.classList.add('border', 'border-danger');
                projectError.innerHTML = json.data.en_name[1];
            } else if (isNaN(projectName.value)) {
                projectError.classList.add('opacity-0');
                projectName.classList.remove('border', 'border-danger');

            }

            if (projectTechnologies.value === "") {
                workplaceError.classList.remove('opacity-0');
                projectTechnologies.classList.add('border', 'border-danger');
                workplaceError.innerHTML = json.data.en_workplace[1];
            } else if (isNaN(projectTechnologies.value)) {
                workplaceError.classList.add('opacity-0');
                projectTechnologies.classList.remove('border', 'border-danger');

            }

            if (json.message === "Create project successful.") {
                projectTechnologies.value = '';
                projectName.value = '';
                Swal.fire({
                    title: "Success!",
                    text: "Project has been added.",
                    icon: "success"
                });
                getsproject();
            }
        })
        .finally(() => {
            btnSubmit.disabled = false;
        });
}
projectName.addEventListener("input", function () {
    if (projectName.value.trim() !== "") {
        projectName.classList.remove('border', 'border-danger');
        projectError.classList.add('opacity-0');
    }
});
projectTechnologies.addEventListener("input", function () {
    if (projectTechnologies.value.trim() !== "") {
        projectTechnologies.classList.remove('border', 'border-danger');
        workplaceError.classList.add('opacity-0');
    }
});


let idUpdate = 0;
let unprojectname = document.getElementById('unprojectname');
let unworkplace = document.getElementById('unworkplace');
let updateProjectError = document.getElementById('updateProjectError');
let updateWorkplaceError = document.getElementById('updateWorkplaceError');



function toUpdate(id) {
    idUpdate = id;
    unprojectname.classList.remove('border', 'border-danger');
    updateProjectError.classList.add('opacity-0');
    unworkplace.classList.remove('border', 'border-danger');
    updateWorkplaceError.classList.add('opacity-0');
    fetch('https://mps7.chandalen.dev/api/projects')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            json.data.forEach(element => {
                if (element.id == id) {
                    unprojectname.value = element.en_name;
                    unworkplace.value = element.en_workplace;
                }
            });
        });
}

function updateproject() {
    const updatebtn = document.getElementById('updatebtn');
    updatebtn.disabled = true;
    let usucc = 0;
    let usucc1 = 0;
    console.log(unprojectname.value);

    if (!isNaN(unprojectname.value) && unprojectname.value != '') {
        updateProjectError.classList.remove('opacity-0');
        unprojectname.classList.add('border', 'border-danger');
        updateProjectError.innerHTML = "Project must be a string.";
        usucc = 1;
    } else if (unprojectname.value == "") {
        updateProjectError.classList.remove('opacity-0');
        unprojectname.classList.add('border', 'border-danger');
        updateProjectError.innerHTML = "The en name field is required.";
    }
    if (!isNaN(unworkplace.value) && unworkplace.value != '') {
        updateWorkplaceError.classList.remove('opacity-0');
        unworkplace.classList.add('border', 'border-danger');
        updateWorkplaceError.innerHTML = "Workplace must be a string.";
        usucc1 = 1;
    } else if (unworkplace.value == "") {
        updateWorkplaceError.classList.remove('opacity-0');
        unworkplace.classList.add('border', 'border-danger');
        updateWorkplaceError.innerHTML = "The en workplace field is required.";
    }
    if (usucc == 1 || usucc1 == 1) {
        updatebtn.disabled = false;
        return;
    }

    fetch(`https://mps7.chandalen.dev/api/projects/${idUpdate}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_name": unprojectname.value,
            "en_workplace": unworkplace.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            // Project Name validation
            if (unprojectname.value == "") {
                updateProjectError.classList.remove('opacity-0');
                unprojectname.classList.add('border', 'border-danger');
                updateProjectError.innerHTML = json.data.en_name[1];
            }

            if (unworkplace.value === "") {
                updateWorkplaceError.classList.remove('opacity-0');
                unworkplace.classList.add('border', 'border-danger');
                updateWorkplaceError.innerHTML = json.data.en_workplace[1];
            }

            if (json.message === "Update project successful.") {
                Swal.fire({
                    title: "Success!",
                    text: json.message,
                    icon: "success"
                });
                bootstrap.Modal.getInstance(
                    document.getElementById("myModal1")
                ).hide();
                getsproject();
            }
        })
        .finally(() => {
            updatebtn.disabled = false;
        });
}
unprojectname.addEventListener("input", function () {
    if (unprojectname.value.trim() !== "") {
        unprojectname.classList.remove('border', 'border-danger');
        updateProjectError.classList.add('opacity-0');
    }
});
unworkplace.addEventListener("input", function () {
    if (unworkplace.value.trim() !== "") {
        unworkplace.classList.remove('border', 'border-danger');
        updateWorkplaceError.classList.add('opacity-0');
    }
});


/// Delete ///
function deleteExperience(id) {
    Swal.fire({
        title: "Are you sure",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://mps7.chandalen.dev/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.result) {
                        Swal.fire({
                            title: "Deleted!",
                            text: json.message,
                            icon: "success"
                        });
                        getsproject();
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