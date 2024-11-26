
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
        function GetExperience() {
            fetch('https://mps7.chandalen.dev/api/experiences')
                .then(res => res.json())
                .then(json => {
                    console.log(json.data);
                    let tr = '';
                    json.data.forEach(element => {
                        let endyear = '';
                        if (element.end_year == null) {
                            endyear = "Present";
                        } else {
                            endyear = element.end_year;
                        }
                        tr += `<tr class="bg bg-body-secondary">
                <td>${element.id}</td>
                <td>${element.en_title}</td>
                <td>${element.en_workplace}</td>
                <td>${element.start_year}</td>
                <td>${endyear}</td>
               <td>
                    <img class=" cs" src="../asset/img/edit.png" data-bs-toggle="modal" data-bs-target="#myModal1"  onclick="toUpdate(${element.id})" width="20px" height="20px">
                    <img class="ms-2 cs " src="../asset/img/rubbish-bin.png" onclick="deleteExperience(${element.id})" width="20px" height="20px">     
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
        GetExperience();

        function addExperince() {
            const btnSubmit = document.getElementById('btnsubmit');
            btnSubmit.disabled = true;

            let title = document.getElementById('title');
            let workplace = document.getElementById('workplace');
            let start_year = document.getElementById('start_year');
            let end_year = document.getElementById('end_year');

            let va_title = document.getElementById('va_title');
            let va_wp = document.getElementById('va_wp');
            let va_sy = document.getElementById('va_sy');


            let succ = 0;
            let succ1 = 0;

            if (!isNaN(title.value) && title.value != '') {
                va_title.classList.remove('opacity-0');
                title.classList.add('border', 'border-danger');
                va_title.innerHTML = "Title must be a string.";
                succ = 1;
            } else if (title.value == "") {
                va_title.classList.remove('opacity-0');
                title.classList.add('border', 'border-danger');
                va_title.innerHTML = "The en title field is required.";
            }

            if (!isNaN(workplace.value) && workplace.value != '') {
                va_wp.classList.remove('opacity-0');
                workplace.classList.add('border', 'border-danger');
                va_wp.innerHTML = "Workplace must be a string.";
                succ1 = 1;
            } else if (workplace.value == "") {
                va_wp.classList.remove('opacity-0');
                workplace.classList.add('border', 'border-danger');
                va_wp.innerHTML = "The en workplace field is required.";
            }
            if(start_year.value == ""){
                va_sy.classList.remove('opacity-0');
                start_year.classList.add('border', 'border-danger');
                va_sy.innerHTML = "The start year field is required.";
            }

            if (succ == 1 || succ1 == 1) {
                btnSubmit.disabled = false;
                return;
            }

            fetch(`https://mps7.chandalen.dev/api/experiences`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    "en_title": title.value,
                    "en_workplace": workplace.value,
                    "start_year": start_year.value,
                    "end_year": end_year.value
                })
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    if (title.value == "") {
                        va_title.classList.remove('opacity-0');
                        title.classList.add('border', 'border-danger');
                        va_title.innerHTML = json.data.en_title[1];
                    }
                    
                    if (workplace.value == "") {
                        va_wp.classList.remove('opacity-0');
                        workplace.classList.add('border', 'border-danger');
                        va_wp.innerHTML = json.data.en_workplace[1];
                    } 
                    
                    if (start_year.value == "") {
                        va_sy.classList.remove('opacity-0');
                        start_year.classList.add('border', 'border-danger');
                        va_sy.innerHTML = json.data.start_year[1];
                    }

                    if (json.result) {
                        

                        title.value = "";
                        workplace.value = "";
                        start_year.value = "";
                        end_year.value = "";

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: json.message,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        GetExperience();
                    }
                })
                .finally(() => {
                    btnSubmit.disabled = false;
                });
        }
        title.addEventListener("input", function () {
            if (title.value.trim() !== "") {
                title.classList.remove('border', 'border-danger');
                va_title.classList.add('opacity-0');
            }
        });
        workplace.addEventListener("input", function () {
            if (workplace.value.trim() !== "") {
                workplace.classList.remove('border', 'border-danger');
                va_wp.classList.add('opacity-0');
            }
        });
        start_year.addEventListener("input", function () {
            if (start_year.value.trim() !== "") {
                start_year.classList.remove('border', 'border-danger');
                va_sy.classList.add('opacity-0');
            }
        });
        function deleteExperience(id) {
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
                    fetch(`https://mps7.chandalen.dev/api/experiences/${id}`, {
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
                                GetExperience();
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

        let idUpdate = 0;
        let utitle = document.getElementById('utitle');
        let uworkplace = document.getElementById('uworkplace');
        let ustart_year = document.getElementById('ustart_year');
        let uend_year = document.getElementById('uend_year');

        function toUpdate(id) {
            uva_title.classList.add('opacity-0');
            utitle.classList.remove('border', 'border-danger');

            uva_wp.classList.add('opacity-0');
            uworkplace.classList.remove('border', 'border-danger');

            uva_sy.classList.add('opacity-0');
            ustart_year.classList.remove('border', 'border-danger');

            idUpdate = id;
            fetch('https://mps7.chandalen.dev/api/experiences')
                .then(res => res.json())
                .then(json => {
                    console.log(json.data);
                    json.data.forEach(element => {

                        if (element.id == id) {
                            utitle.value = element.en_title;
                            uworkplace.value = element.en_workplace;

                        }
                    });

                })

        }
        function updateExperience() {
            const btnUsubmit = document.getElementById('btnUsubmit');
            btnUsubmit.disabled = true;

            let usucc = 0;
            let usucc1 = 0;

            if (!isNaN(utitle.value) && utitle.value != '') {
                uva_title.classList.remove('opacity-0');
                utitle.classList.add('border', 'border-danger');
                uva_title.innerHTML = "Title must be a string.";
                usucc = 1;
            } else if (utitle.value == "") {
                uva_title.classList.remove('opacity-0');
                utitle.classList.add('border', 'border-danger');
                uva_title.innerHTML = "The en title field is required.";
            }

            if (!isNaN(uworkplace.value) && uworkplace.value != '') {
                uva_wp.classList.remove('opacity-0');
                uworkplace.classList.add('border', 'border-danger');
                uva_wp.innerHTML = "workplace must be a string.";
                usucc1 = 1;
            } else if (uworkplace.value == "") {
                uva_wp.classList.remove('opacity-0');
                uworkplace.classList.add('border', 'border-danger');
                uva_wp.innerHTML = "The en workplace field is required.";
            }
            if(ustart_year.value == ""){
                uva_sy.classList.remove('opacity-0');
                ustart_year.classList.add('border', 'border-danger');
                uva_sy.innerHTML = "The start year field is required.";
            }
            if (usucc == 1 || usucc1 == 1) {
                btnUsubmit.disabled = false;
                return;
            }

            fetch(`https://mps7.chandalen.dev/api/experiences/${idUpdate}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    "en_title": utitle.value,
                    "en_workplace": uworkplace.value,
                    "start_year": ustart_year.value,
                    "end_year": uend_year.value
                })
            })
                .then(res => res.json())
                .then(json => {

                    if (ustart_year.value == "") {
                        uva_sy.classList.remove('opacity-0');
                        ustart_year.classList.add('border', 'border-danger');
                        uva_sy.innerHTML = json.data.start_year[1];
                    }
                    if (json.result) {

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
                        GetExperience();
                    }
                })
                .finally(() => {
                    btnUsubmit.disabled = false;
                });
        }
        utitle.addEventListener("input", function () {
            if (utitle.value.trim() !== "") {
                utitle.classList.remove('border', 'border-danger');
                uva_title.classList.add('opacity-0');
            }
        });
        uworkplace.addEventListener("input", function () {
            if (uworkplace.value.trim() !== "") {
                uworkplace.classList.remove('border', 'border-danger');
                uva_wp.classList.add('opacity-0');
            }
        });
        ustart_year.addEventListener("input", function () {
            if (ustart_year.value.trim() !== "") {
                ustart_year.classList.remove('border', 'border-danger');
                va_sy.classList.add('opacity-0');
            }
        });

