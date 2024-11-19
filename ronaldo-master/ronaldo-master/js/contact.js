
function fetchAbout() {
    fetch("https://mps7.chandalen.dev/api/profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json); // Log the entire response for debugging
  
        if (json.result && json.data && json.data.profile) {
          const profile = json.data.profile;
        //   const Bio = json.data.bio;
          const social = json.data.social;
  
        //   const about_phone = document.getElementById("about_phone");
        //   about_phone.innerHTML = profile.en_phone;
  
        //   const about_email = document.getElementById("about_email");
        //   about_email.innerHTML = profile.email;
  
        //   const about_address = document.getElementById("about_address");
        //   about_address.innerHTML = profile.en_address;
  
        //   const social_link = `
    
        //    <a href="${social.facebook}"><i class="bi bi-facebook"></i></a>
        //    <a href="${social.telegram}"><i class="bi bi-telegram"></i></a>
        //    <a href="${social.linkedin}"><i class="bi bi-linkedin"></i></a>
        //    `;
  
        //   console.log(social_link);
        //   document.getElementById("social-links").innerHTML = social_link;
  
        } else {
          console.error("No data found in the API response");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  // Call the function to fetch and display the data
  fetchAbout();
  
  // let valid = [false, false, false, false, false];
  // const name1 = document.getElementById('name');
  // const emailInput = document.querySelector('input[name="email"]');
  // const subjectInput = document.querySelector('input[name="subject"]');
  // const phoneInput = document.querySelector('input[name="phone"]');
  // const messageInput = document.querySelector('textarea[name="message"]');
  
  // const nameError = document.getElementById('name_error');
  // const emailError = document.getElementById('email_error');
  // const subjectError = document.getElementById('subject_error');
  // const phoneError = document.getElementById('phone_error');
  // const messageError = document.getElementById('message_error');
  
  // const validateName = () => {
  //   const namePattern = /^[A-Za-z\s]+$/;
  //   if (name1.value.trim().length === 0) {
  //     nameError.innerHTML = 'Name is required';
  //     name1.classList.add('is-invalid');
  //     valid[0] = false;
  //   } else if (!namePattern.test(name1.value.trim())) {
  //     nameError.innerHTML = 'Name cannot contain numbers';
  //     name1.classList.add('is-invalid');
  //     valid[0] = false;
  //   } else {
  //     nameError.innerHTML = '';
  //     name1.classList.remove('is-invalid');
  //     valid[0] = true;
  //   }
  // };
  
  // const validateEmail = () => {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailPattern.test(emailInput.value.trim())) {
  //     emailError.innerHTML = 'Valid email is required';
  //     emailInput.classList.add('is-invalid');
  //     valid[1] = false;
  //   } else {
  //     emailError.innerHTML = '';
  //     emailInput.classList.remove('is-invalid');
  //     valid[1] = true;
  //   }
  // };
  
  // const validateSubject = () => {
  //   if (subjectInput.value.trim().length === 0) {
  //     subjectError.innerHTML = 'Subject is required';
  //     subjectInput.classList.add('is-invalid');
  //     valid[2] = false;
  //   } else {
  //     subjectError.innerHTML = '';
  //     subjectInput.classList.remove('is-invalid');
  //     valid[2] = true;
  //   }
  // };
  
  // const validatePhone = () => {
  //   const phonePattern = /^[0-9]{10,15}$/;
  //   if (!phonePattern.test(phoneInput.value.trim())) {
  //     phoneError.innerHTML = 'Valid phone number is required';
  //     phoneInput.classList.add('is-invalid');
  //     valid[3] = false;
  //   } else {
  //     phoneError.innerHTML = '';
  //     phoneInput.classList.remove('is-invalid');
  //     valid[3] = true;
  //   }
  // };
  
  // const validateMessage = () => {
  //   if (messageInput.value.trim().length === 0) {
  //     messageError.innerHTML = 'Message is required';
  //     messageInput.classList.add('is-invalid');
  //     valid[4] = false;
  //   } else {
  //     messageError.innerHTML = '';
  //     messageInput.classList.remove('is-invalid');
  //     valid[4] = true;
  //   }
  // };
  
  // name1.oninput = validateName;
  // emailInput.oninput = validateEmail;
  // subjectInput.oninput = validateSubject;
  // phoneInput.oninput = validatePhone;
  // messageInput.oninput = validateMessage;
  
  // document.getElementById('contactForm').addEventListener('submit', function(event) {
  //   event.preventDefault();
  //   validateName();
  //   validateEmail();
  //   validateSubject();
  //   validatePhone();
  //   validateMessage();
  
  //   const validateMessage = () => {
  //     if (messageInput.value.trim().length === 0) {
  //       messageError.innerHTML = 'Message is required';
  //       messageInput.classList.add('is-invalid');
  //       valid[4] = false;
  //     } else {
  //       messageError.innerHTML = '';
  //       messageInput.classList.remove('is-invalid');
  //       valid[4] = true;
  //     }
  //   };
  
  //   if (valid.includes(false)) return;
  
  //   const formData = new FormData(this);
  //   const data = {};
  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });
  
  //   fetch('https://mps7.chandalen.dev/api/contacts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  
  //   .then(json => {
  //     console.log('Success:', json);
  //     document.getElementById('contactForm').reset();
  
  //     Swal.fire({
  //       title: 'Success!',
  //       text: 'Your message has been sent successfully.',
  //       icon: 'success',
  //       confirmButtonText: 'OK'
  //     });
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //     alert('There was an error sending your message. Please try again.');
  //   });
  // });
  
  
  
  // let iname = document.getElementById("iname");
  // let iemail=document.getElementById("iemail");
  // let isubject=document.getElementById("isubject");
  // let iphone=document.getElementById("iphone");
  // let imessage=document.getElementById("imessage");
  
  // document
  //   .getElementById("contactForm")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();
  
  //     const formData = new FormData(this);
  //     const data = {};
  //     formData.forEach((value, key) => {
  //       data[key] = value;
  //     });
  //     let name_error = document.getElementById("name_error");
  //     let email_error=document.getElementById("email_error");
  //     let subject_error=document.getElementById("subject_error");
  //     let phone_error=document.getElementById("phone_error");
  //     let message_error=document.getElementById("message_error");
  //     console.log(data);
  
  //     fetch("https://mps7.chandalen.dev/api/contacts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         "name": iname.value,
  //         "email": iemail.value,
  //        "subject": isubject.value,
  //        "phone": iphone.value,
  //        "message": imessage.value
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((json) => {
  //         console.log("Success:", json);
  //         if (iname.value == "") {
  //           iname.classList.add("border", "border-danger");
  //           name_error.classList.remove("opacity-0");
  //           name_error.innerHTML = json.data.name[1];
  //         } else {
  //           crPass.classList.remove("border", "border-danger");
  //           va_cPass.classList.add("opacity-0");
  //         }
  
  //         if(iemail.value == "") {
  //           iemail.classList.add("border", "border-danger");
  //           email_error.classList.remove("opacity-0");
  //           email_error.innerHTML = json.data.email[1];
  //         } else {
  //           iemail.classList.remove("border", "border-danger");
  //           email_error.classList.add("opacity-0");
  //         }
  
  //         if(isubject.value == "") {
  //           isubject.classList.add("border", "border-danger");
  //           subject_error.classList.remove("opacity-0");
  //           subject_error.innerHTML = json.data.subject[1];
  //         } else {
  //           isubject.classList.remove("border", "border-danger");
  //           subject_error.classList.add("opacity-0");
  //         }
  
  //         if(iphone.value == "") {
  //           iphone.classList.add("border", "border-danger");
  //           phone_error.classList.remove("opacity-0");
  //           phone_error.innerHTML = json.data.phone[1];
  //         }
  //         else {
  //           iphone.classList.remove("border", "border-danger");
  //           phone_error.classList.add("opacity-0");
  //         }
  
  //         if(imessage.value == "") {
  //           imessage.classList.add("border", "border-danger");
  //           message_error.classList.remove("opacity-0");
  //           message_error.innerHTML = json.data.message[1];
  //         } else {
  //           imessage.classList.remove("border", "border-danger");
  //           message_error.classList.add("opacity-0");
  //         }
  
  //         document.getElementById("contactForm").reset();
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         alert("There was an error sending your message. Please try again.");
  //       });
  //   });

  let iname = document.getElementById("iname");
let iemail = document.getElementById("iemail");
let isubject = document.getElementById("isubject");
let iphone = document.getElementById("iphone");
let imessage = document.getElementById("imessage");
let name_error = document.getElementById("name_error");
let email_error = document.getElementById("email_error");
let subject_error = document.getElementById("subject_error");
let phone_error = document.getElementById("phone_error");
let message_error = document.getElementById("message_error");

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });


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
        }

        if (isubject.value === "") {
            isubject.classList.add("border", "border-danger");
            subject_error.classList.remove("opacity-0");
            subject_error.innerHTML = json.data.subject[1] || "Subject is required.";
            hasError = true;
        }

        if (iphone.value === "") {
            iphone.classList.add("border", "border-danger");
            phone_error.classList.remove("opacity-0");
            // phone_error.innerHTML = json.data.phone[1] || "Phone is required.";
            hasError = true;
        }

        if (imessage.value === "") {
            imessage.classList.add("border", "border-danger");
            message_error.classList.remove("opacity-0");
            message_error.innerHTML = json.data.message[1] || "Message is required.";
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
iphone.addEventListener("input", function () {
    if (iphone.value.trim() !== "") {
        iphone.classList.remove('border', 'border-danger');
        phone_error.classList.add('opacity-0');
    }
});
imessage.addEventListener("input", function () {
    if (imessage.value.trim() !== "") {
        imessage.classList.remove('border', 'border-danger');
        message_error.classList.add('opacity-0');
    }
});