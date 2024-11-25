
$("#start_year").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d"
});
$("#end_year").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d"
});
$("#ustart_year").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d"
});
$("#uend_year").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d"
});
function GetEducation() {
    fetch('https://mps7.chandalen.dev/api/educations')
        .then(res => res.json())
        .then(json => {
            let tr = '';
            json.data.forEach(element => {
                let endyear = '';
                if (element.end_year == null) {
                    endyear = "Present";
                } else {
                    endyear = element.end_year;
                }
                tr += `<tr class="bg bg-body-secondary" data-id="${element.id}">
                            <td>${element.id}</td>
                            <td>${element.en_degree}</td>
                            <td>${element.en_school}</td>
                            <td>${element.start_year}</td>
                            <td>${endyear}</td>
                            <td>
                                <img class="cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#myModal1" onclick="toUpdate(${element.id})"  width="20px" height="20px">
                                <img class="ms-2 cs" src="../asset/img/rubbish-bin.png" onclick="deleteEducation(${element.id})" width="20px" height="20px">     
                            </td>
                        </tr>`;
            });
            document.querySelector('tbody').innerHTML = tr;
            if (tr == '') {
                document.getElementById('nodata').classList.remove('d-none');
            } else {
                document.getElementById('nodata').classList.add('d-none');
            }
        });
}
GetEducation();
function addEducation() {
    const Add = document.getElementById('Add');
    Add.disabled = true;

    let en_degree = document.getElementById('en_degree');
    let en_school = document.getElementById('en_school');
    let start_year = document.getElementById('start_year');
    let end_year = document.getElementById('end_year');

    let va_degree = document.getElementById('va_degree');
    let va_school = document.getElementById('va_school');
    let va_start = document.getElementById('va_start');

    let succ = 0;
    let succ1 = 0;

    if (!isNaN(en_degree.value) && en_degree.value != '') {
        va_degree.classList.remove('opacity-0');
        en_degree.classList.add('border', 'border-danger');
        va_degree.innerHTML = "Degree must be a string.";
        succ = 1;
    } else if (en_degree.value == "") {
        va_degree.classList.remove('opacity-0');
        en_degree.classList.add('border', 'border-danger');
        va_degree.innerHTML = "The en degree field is required.";
    }

    if (!isNaN(en_school.value) && en_school.value != '') {
        va_school.classList.remove('opacity-0');
        en_school.classList.add('border', 'border-danger');
        va_school.innerHTML = "School must be a string.";
        succ1 = 1;
    } else if (en_school.value == "") {
        va_school.classList.remove('opacity-0');
        en_school.classList.add('border', 'border-danger');
        va_school.innerHTML = "The en school field is required.";
    }
    if (start_year.value == "") {
        va_start.classList.remove('opacity-0');
        start_year.classList.add('border', 'border-danger');
        va_start.innerHTML = "The start year field is required.";
    }

    if (succ == 1 || succ1 == 1) {
        Add.disabled = false;
        return;
    }

    fetch(`https://mps7.chandalen.dev/api/educations`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "en_degree": en_degree.value,
            "en_school": en_school.value,
            "start_year": start_year.value,
            "end_year": end_year.value

        })

    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (en_degree.value == "") {

                va_degree.classList.remove('opacity-0');
                en_degree.classList.add('border', 'border-danger');
                va_degree.innerHTML = json.data.en_degree[1];
            } else if (isNaN(en_degree.value)) {
                va_degree.classList.add('opacity-0');
                en_degree.classList.remove('border', 'border-danger');
            }
            if (en_school.value === "") {
                va_school.classList.remove('opacity-0');
                en_school.classList.add('border', 'border-danger');
                va_school.innerHTML = json.data.en_school[1];
            } else if (isNaN(en_school.value)) {

                va_school.classList.add('opacity-0');
                en_school.classList.remove('border', 'border-danger');
            }

            if (start_year.value === "") {
                va_start.classList.remove('opacity-0');
                start_year.classList.add('border', 'border-danger');
                va_start.innerHTML = json.data.start_year[1];
            }
            if (json.result) {
                va_start.classList.add('opacity-0');
                start_year.classList.remove('border', 'border-danger');


                en_degree.classList.remove('border', 'border-danger');
                va_degree.classList.add('opacity-0');

                en_school.classList.remove('border', 'border-danger');
                va_school.classList.add('opacity-0');

                start_year.classList.remove('border', 'border-danger');
                va_start.classList.add('opacity-0');

                en_degree.value = "";
                en_school.value = "";
                start_year.value = "";
                end_year.value = "";


                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1000
                });
                GetEducation();
            }
        })
        .finally(() => {
            Add.disabled = false;

        });

}

en_degree.addEventListener("input", function () {
    if (en_degree.value.trim() !== "") {
        en_degree.classList.remove('border', 'border-danger');
        va_degree.classList.add('opacity-0');
    }
});
en_school.addEventListener("input", function () {
    if (en_school.value.trim() !== "") {
        en_school.classList.remove('border', 'border-danger');
        va_school.classList.add('opacity-0');
    }
});
start_year.addEventListener("input", function () {
    if (start_year.value.trim() !== "") {
        start_year.classList.remove('border', 'border-danger');
        va_start.classList.add('opacity-0');

    }
});

function deleteEducation(id) {
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
            fetch(`https://mps7.chandalen.dev/api/educations/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    if (json.result) {
                        Swal.fire({
                            title: "Deleted!",
                            text: json.message,
                            icon: "success"
                        });
                        GetEducation(); // Refresh data
                    } else {
                        Swal.fire("Error!", "Failed to delete education.", "error");
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    Swal.fire("Error!", "An error occurred while deleting the education.", "error");
                });
        }
    });
}
let idUpdate = 0;
let uen_degree = document.getElementById('uen_degree');
let uen_shcool = document.getElementById('uen_shcool');
let ustart_year = document.getElementById('ustart_year');
let uend_year = document.getElementById('uend_year');

let uva_degree = document.getElementById('uva_degree');
let uva_school = document.getElementById('uva_school');
let uva_start = document.getElementById('uva_start');

function toUpdate(id) {
    uva_degree.classList.add('opacity-0');
    uen_degree.classList.remove('border', 'border-danger');

    uva_school.classList.add('opacity-0');
    uen_shcool.classList.remove('border', 'border-danger');

    uva_start.classList.add('opacity-0');
    ustart_year.classList.remove('border', 'border-danger');

    idUpdate = id;
    fetch('https://mps7.chandalen.dev/api/educations')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            json.data.forEach(element => {

                if (element.id == id) {
                    uen_degree.value = element.en_degree;
                    uen_shcool.value = element.en_school;
                }

            });

        })
}
function updateEducation() {
    const AddE = document.getElementById('AddE');
    AddE.disabled = true;
    let usucc = 0;
    let usucc1 = 0

    if (!isNaN(uen_degree.value) && uen_degree.value != '') {
        uva_degree.classList.remove('opacity-0');
        uen_degree.classList.add('border', 'border-danger');
        uva_degree.innerHTML = "Degree must be a string.";
        usucc = 1;
    } else if (uen_degree.value == "") {
        uva_degree.classList.remove('opacity-0');
        uen_degree.classList.add('border', 'border-danger');
        uva_degree.innerHTML = "The en degree field is required.";
    }

    if (!isNaN(uen_shcool.value) && uen_shcool.value != '') {
        uva_school.classList.remove('opacity-0');
        uen_shcool.classList.add('border', 'border-danger');
        uva_school.innerHTML = "School must be a string.";
        usucc1 = 1;
    } else if (uen_shcool.value == "") {
        uva_school.classList.remove('opacity-0');
        uen_shcool.classList.add('border', 'border-danger');
        uva_school.innerHTML = "The en school field is required.";
    }

    if (ustart_year.value == "") {
        uva_start.classList.remove('opacity-0');
        ustart_year.classList.add('border', 'border-danger');
        uva_start.innerHTML = "The start year field is required.";
    }
    if (usucc == 1 || usucc1 == 1) {
        AddE.disabled = false;
        return;
    }

    console.log(uen_degree.value);
    fetch(`https://mps7.chandalen.dev/api/educations/${idUpdate}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            "en_degree": uen_degree.value,
            "en_school": uen_shcool.value,
            "start_year": ustart_year.value,
            "end_year": uend_year.value
        })
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)

            if (uen_degree.value == "") {
                uva_degree.classList.remove('opacity-0');
                uen_degree.classList.add('border', 'border-danger');
                uva_degree.innerHTML = json.data.en_degree[1];
            } else {
                uva_degree.classList.add('opacity-0');
                uen_degree.classList.remove('border', 'border-danger');
            }
            if (uen_shcool.value == "") {
                uva_school.classList.remove('opacity-0');
                uen_shcool.classList.add('border', 'border-danger');
                uva_school.innerHTML = json.data.en_school[1];
            } else {
                uva_school.classList.add('opacity-0');
                uen_shcool.classList.remove('border', 'border-denger');
            }
            if (ustart_year.value == "") {
                uva_start.classList.remove('opacity-0');
                ustart_year.classList.add('border', 'border-danger');
                uva_start.innerHTML = json.data.start_year[1];
            }

            if (json.result) {
                uva_start.classList.add('opacity-0');
                ustart_year.classList.remove('border', 'border-danger');

                uen_degree.classList.remove('border', 'border-danger');
                uva_degree.classList.add('opacity-0');

                uen_shcool.classList.remove('border', 'border-danger');
                uva_school.classList.add('opacity-0');

                ustart_year.classList.remove('border', 'border-danger');
                uva_start.classList.add('opacity-0');

                uen_degree.value = "";
                uen_shcool.value = "";
                ustart_year.value = "";
                uend_year.value = "";

                bootstrap.Modal.getInstance(
                    document.getElementById("myModal1")
                ).hide();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1000
                });
                GetEducation();
            }
        })
        .finally(() => {
            AddE.disabled = false;
        });

}
uen_degree.addEventListener("input", function () {
    if (uen_degree.value.trim() !== "") {
        uen_degree.classList.remove('border', 'border-danger');
        uva_degree.classLit.add('opacity-0');
    }
});

uen_shcool.addEventListener("input", function () {
    if (uen_shcool.value.trim() !== "") {
        uen_shcool.classList.remove('border', 'border-danger');
        uva_school.classList.add('opacity-0');
    }
});
ustart_year.addEventListener("input", function () {
    if (ustart_year.value.trim() !== "") {
        ustart_year.classList.remove('border', 'border-danger');
        uva_start.classList.add('opacity-0');
    }
});

