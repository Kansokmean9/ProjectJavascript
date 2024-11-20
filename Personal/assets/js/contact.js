function fetchAbout() {
  fetch("https://mps7.chandalen.dev/api/profile")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
    //   console.log(json); 

      if (json.result && json.data && json.data.profile) {
        const profile = json.data.profile;
        const Bio = json.data.bio;
        const social = json.data.social;

        const about_phone = document.getElementById("about_phone");
        about_phone.innerHTML = profile.en_phone;

        const about_email = document.getElementById("about_email");
        about_email.innerHTML = profile.email;

        const about_address = document.getElementById("about_address");
        about_address.innerHTML = profile.en_address;

        const social_link = `
  
         <a href="${social.facebook}"><i class="bi bi-facebook"></i></a>
         <a href="${social.telegram}"><i class="bi bi-telegram"></i></a>
         <a href="${social.linkedin}"><i class="bi bi-linkedin"></i></a>
         `;

       // console.log(social_link);
        document.getElementById("social-links").innerHTML = social_link;

        // Image footer

        // image_contact.src = profile.photo_about;

        //document.getElementById("hero-section").innerHTML = About;
        // console.log(json.data);
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
      //  console.log("Success:", json);

        let hasError = false;

        // Display errors if fields are empty
        if (iname.value === "") {
            iname.classList.add("border", "border-danger");
            name_error.classList.remove("opacity-0");
            name_error.innerHTML = json.data.name[1] ;
            hasError = true;
        }

        if (iemail.value === "" ) {
            iemail.classList.add("border", "border-danger");
            email_error.classList.remove("opacity-0");
            email_error.innerHTML = json.data.email[1];
            hasError = true;
        } else if(!iemail.value.includes("@")) {
            iemail.classList.add("border", "border-danger");
            email_error.classList.remove("opacity-0");
            email_error.innerHTML = json.data.email[0] ;
            hasError = true;
        }

        if (isubject.value === "") {
            isubject.classList.add("border", "border-danger");
            subject_error.classList.remove("opacity-0");
            subject_error.innerHTML = json.data.subject[1] ;
            hasError = true;
        }

      
        if (imessage.value === "") {
            imessage.classList.add("border", "border-danger");
            message_error.classList.remove("opacity-0");
            message_error.innerHTML = json.data.message[1] ;
            hasError = true;
        }

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