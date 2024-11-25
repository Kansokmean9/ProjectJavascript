
      function GetDate(){
        fetch('https://mps7.chandalen.dev/api/contacts?page=1&per_page=10&search',{
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            .then(res => res.json())
            .then(json => {
                console.log(json);
                let tr = '';
                json.data.forEach(element => {
                    tr += `<tr class="bg bg-body-secondary">
                        <td class="p-4">${element.id}</td>
                        <td class="px-1 py-4">${element.name}</td>
                        <td class="px-1 py-4">${element.email}</td>
                        <td class="px-1 py-4">${element.phone}</td>
                        <td class="px-1 py-4">${element.subject || 'N/A'}</td>
                        <td class="px-1 py-4">${element.message}</td>
                        <td class="px-1 py-4">${element.created_at_format}</td>
                        <td class="px-3">
                            <img class="ms-2 cs" onclick="deletePost(${element.id})" src="../asset/img/rubbish-bin.png" width="20px" height="20px">
                           

                        </td>
                    </tr>`;
                });
                document.querySelector('tbody').innerHTML = tr;
                if (tr == '') {
                        document.getElementById('nodata').classList.remove('d-none');
                }else{
                        document.getElementById('nodata').classList.add('d-none');
                    }
            })
      }
      GetDate();
        function deletePost(id) {
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
                    fetch(`https://mps7.chandalen.dev/api/contacts/${id}`, {
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
                                GetDate(); // Refresh data
                            } else {
                                Swal.fire("Error!", "Failed to delete contect.", "error");
                            }
                        })
                        .catch(err => {
                            console.error('Error:', err);
                            Swal.fire("Error!", "An error occurred while deleting the contect.", "error");
                        });
                }
            });
        }
      