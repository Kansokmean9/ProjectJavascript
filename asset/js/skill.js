


function getskill() {
    fetch('https://mps7.chandalen.dev/api/skills')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            let tr = '';
            json.data.forEach(element => {
                tr += `<tr class="bg bg-body-secondary">
        <td class="py-4">${element.id}</td>
        <td>${element.name}</td>
        <td>${element.percent}</td>
       <td >
           <img class=" cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#myModal1"  onclick="toUpdate(${element.id})" width="20px" height="20px">
            <img class="ms-2 cs " src="../asset/img/rubbish-bin.png" onclick="deleteSkill(${element.id})" width="20px" height="20px">     
        </td>
    </tr>`;
            });
            document.querySelector('tbody').innerHTML = tr;
        })
}
getskill();

function addSkill() {
    const btnsk = document.getElementById('btnsk');
    btnsk.disabled = true;
    let skillName = document.getElementById('skillName');
    let skillLevel = document.getElementById('output');
    let nameError = document.getElementById('nameError'); // Error span for skill name

    if (!isNaN(skillName.value) && skillName.value != '') {
        nameError.classList.remove('opacity-0');
        skillName.classList.add('border', 'border-danger');
        nameError.innerHTML = "Skill must be a string.";
        btnsk.disabled = false;
        return;
    }

    fetch(`https://mps7.chandalen.dev/api/skills`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": skillName.value,
            "percent": skillLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (skillName.value == "") {
                nameError.innerHTML = json.data.name[1];
                skillName.classList.add('border', 'border-danger');
                nameError.classList.remove('opacity-0');
            } else if (json.result) {
                nameError.classList.add('opacity-0');
                skillName.classList.remove('border', 'border-danger');
                Swal.fire({
                    icon: "success",
                    title: json.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                skillName.value = "";
                getskill();
            }

        })
        .finally(() => {
            btnsk.disabled = false;
        });

}
skillName.addEventListener("input", function () {
    if (skillName.value.trim() !== "") {
        skillName.classList.remove('border', 'border-danger');
        nameError.classList.add('opacity-0');
    }
});

function deleteSkill(id) {
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
            fetch(`https://mps7.chandalen.dev/api/skills/${id}`, {
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
                        getskill(); // Refresh data
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
let unskillname = document.getElementById('unskillname');
let unskillLevel = document.getElementById('unskillLevel');
let updateNameError = document.getElementById('updateNameError'); // Error span for update name


function toUpdate(id) {
    unskillname.classList.remove('border', 'border-danger');
    updateNameError.classList.add('opacity-0');
    idUpdate = id;
    fetch('https://mps7.chandalen.dev/api/skills')
        .then(res => res.json())
        .then(json => {
            console.log(json.data);
            json.data.forEach(element => {

                if (element.id == id) {
                    unskillname.value = element.name;
                    unskillLevel.value = element.percent;
                    document.getElementById('rangePercent').value = element.percent;
                }
            });

        })

}

function updateSkill() {
    const updatesk = document.getElementById('updatesk');
    updatesk.disabled = true;

    if (!isNaN(unskillname.value) && unskillname.value != '') {
        updateNameError.classList.remove('opacity-0');
        unskillname.classList.add('border', 'border-danger');
        updateNameError.innerHTML = "Skill must be a string.";
        updatesk.disabled = false;
        return;
    }
    fetch(`https://mps7.chandalen.dev/api/skills/${idUpdate}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            "name": unskillname.value,
            "percent": unskillLevel.value,
        })
    })
        .then(res => res.json())
        .then(json => {

            if (unskillname.value == "") {
                updateNameError.innerHTML = json.data.name[1];
                unskillname.classList.add('border', 'border-danger');
                updateNameError.classList.remove('opacity-0');
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
                getskill(); // Refresh the skill list
            }
        })
        .finally(() => {
            updatesk.disabled = false;
        });
}
unskillname.addEventListener("input", function () {
    if (unskillname.value.trim() !== "") {
        unskillname.classList.remove('border', 'border-danger');
        updateNameError.classList.add('opacity-0');
    }
});

