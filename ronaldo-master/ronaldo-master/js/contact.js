
function fetchAbout() {
    fetch("https://mps7.chandalen.dev/api/profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
    //    console.log(json); // Log the entire response for debugging
  
        if (json.result && json.data && json.data.profile) {
          const profile = json.data.profile;
        //   const Bio = json.data.bio;
          const social = json.data.social;
  
     
  
        } else {
          console.error("No data found in the API response");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  // Call the function to fetch and display the data
  fetchAbout();
  

  let iname = document.getElementById("iname");
let iemail = document.getElementById("iemail");
let isubject = document.getElementById("isubject");

let imessage = document.getElementById("imessage");
let name_error = document.getElementById("name_error");
let email_error = document.getElementById("email_error");
let subject_error = document.getElementById("subject_error");

let message_error = document.getElementById("message_error");

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('send_message').innerHTML = ''


    fetch("https://mps7.chandalen.dev/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": iname.value,
            "email": iemail.value,
            "subject": isubject.value,
            "phone": iphone.value,
            "message": imessage.value
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((json) => {
        console.log("Success:", json);


        let hasError=false ;
        

        // Display errors if fields are empty
        if (iname.value === "") {
            iname.classList.add("border", "border-danger");
            name_error.classList.remove("opacity-0");
            name_error.innerHTML = json.data.name[1] || "Name is required.";
            hasError = true;
        }

        if (iemail.value === "") {
            iemail.classList.add("border", "border-danger");
            email_error.classList.remove("opacity-0");
            email_error.innerHTML = json.data.email[1] || "Email is required.";
            hasError = true;
        }else if(!iemail.value.includes("@")) {
            iemail.classList.add("border", "border-danger");
            email_error.classList.remove("opacity-0");
            email_error.innerHTML = json.data.email[0] || "Invalid email format.";
            hasError = true;
        }

        if (isubject.value === "") {
            isubject.classList.add("border", "border-danger");
            subject_error.classList.remove("opacity-0");
            subject_error.innerHTML = json.data.subject[1] || "Subject is required.";
            hasError = true;
        }

     
        if (imessage.value === "") {
            imessage.classList.add("border", "border-danger");
            message_error.classList.remove("opacity-0");
            message_error.innerHTML = json.data.message[1] || "Message is required.";
            hasError = true;
        }

        // setTimeout(() => {
        //     document.getElementById('loading').classList.add('d-none');
        // }, 2000);
        // Reset the form if there are no errors
        if (!hasError) {
            document.getElementById("contactForm").reset();
            Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('send_message').innerHTML = 'Send message'

    })
    .catch((error) => {
        console.error("Error:", error);
    });

    
});

// Add input event listeners to reset error styles
iname.addEventListener("input", function () {
    if (iname.value.trim() !== "") {
        iname.classList.remove('border', 'border-danger');
        name_error.classList.add('opacity-0');
    }
});
iemail.addEventListener("input", function () {
    if (iemail.value.trim() !== "") {
        iemail.classList.remove('border', 'border-danger');
        email_error.classList.add('opacity-0');
    }
});
isubject.addEventListener("input", function () {
    if (isubject.value.trim() !== "") {
        isubject.classList.remove('border', 'border-danger');
        subject_error.classList.add('opacity-0');
    }
});

imessage.addEventListener("input", function () {
    if (imessage.value.trim() !== "") {
        imessage.classList.remove('border', 'border-danger');
        message_error.classList.add('opacity-0');
    }
});