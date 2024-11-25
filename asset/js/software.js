

function getSoftware() {
    fetch('https://mps7.chandalen.dev/api/softwares')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            let tr = '';
            json.data.forEach(element => {
                tr += `<tr class="bg bg-body-secondary">
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.percent}</td>
       <td>
            <img class="cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#myModal1"  onclick="toUpdate(${element.id})" width="20px" height="20px">
            <img class="ms-2 cs" src="../asset/img/rubbish-bin.png" onclick="deleteSoftware(${element.id})" width="20px" height="20px">     
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
getSoftware();

function addSoft() {
    const btnsw = document.getElementById('btnsw');
    btnsw.disabled = true;
    let softName = document.getElementById('softName');
    let softLevel = document.getElementById('output');
    let softError = document.getElementById('softError'); // Error span for skill name

    if (!isNaN(softName.value) && softName.value != '') {
        softError.classList.remove('opacity-0');
        softName.classList.add('border', 'border-danger');
        softError.innerHTML = "Software must be a string.";
        btnsw.disabled = false;
        return;
    }

    fetch(`https://mps7.chandalen.dev/api/softwares/`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": softName.value,
            "percent": softLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (softName.value == "") {
                softError.innerHTML = json.data.name[1];
                softName.classList.add('border', 'border-danger');
                softError.classList.remove('opacity-0');
            } else {
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                softName.value = "";
                getSoftware();
            }
        })
        .finally(() => {
            btnsw.disabled = false;
        });
}
softName.addEventListener("input", function () {
    if (softName.value.trim() !== "") {
        softName.classList.remove('border', 'border-danger');
        softError.classList.add('opacity-0');
    }
});

function deleteSoftware(id) {
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
            fetch(`https://mps7.chandalen.dev/api/softwares/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);  // Log the response to see if delete was successful
                    if (json.result) {
                        Swal.fire({
                            title: "Deleted!",
                            text: json.message,
                            icon: "success"
                        });
                        getSoftware(); // Refresh data
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
let usoftname = document.getElementById('usoftname');
let unSoftLevel = document.getElementById('unSoftLevel');
let updatesoftError = document.getElementById('updatesoftError'); // Error span for update name

function toUpdate(id) {
    idUpdate = id;
    usoftname.classList.remove('border', 'border-danger');
    updatesoftError.classList.add('opacity-0');
    fetch('https://mps7.chandalen.dev/api/softwares')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            json.data.forEach(element => {

                if (element.id == id) {
                    usoftname.value = element.name;
                    unSoftLevel.value = element.percent;
                    document.getElementById('rangePercent').value = element.percent;
                }
            });

        })

}

function updateSoftware() {
    const updatesw = document.getElementById('updatesw');
    updatesw.disabled = true;
    if (!isNaN(usoftname.value) && usoftname.value != '') {
        updatesoftError.classList.remove('opacity-0');
        usoftname.classList.add('border', 'border-danger');
        updatesoftError.innerHTML = "Software must be a string.";
        updatesw.disabled = false;
        return;
    }
    console.log(usoftname.value);
    fetch(`https://mps7.chandalen.dev/api/softwares/${idUpdate}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            "name": usoftname.value,
            "percent": unSoftLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (usoftname.value == "") {
                updatesoftError.innerHTML = json.data.name[1];
                usoftname.classList.add('border', 'border-danger');
                updatesoftError.classList.remove('opacity-0');
            } else if (json.result) {
                bootstrap.Modal.getInstance(
                    document.getElementById("myModal1")
                ).hide(); // Close the modal
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getSoftware();
            }
        })
        .finally(() => {
            updatesw.disabled = false;
        });
}
usoftname.addEventListener("input", function () {
    if (usoftname.value.trim() !== "") {
        usoftname.classList.remove('border', 'border-danger');
        updatesoftError.classList.add('opacity-0');
    }
});