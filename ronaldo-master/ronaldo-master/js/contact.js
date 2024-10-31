document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data); // Log the data before sending

    // Send a POST request to the API
    fetch('https://mps7.chandalen.dev/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convert the data object to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        console.log('Success:', json);
       // displaySubmittedData(json); // Call function to display data
      //  alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});

// // Function to display submitted data
// function displaySubmittedData(data) {
//     const displayArea = document.createElement('div');
//     displayArea.innerHTML = `
//         <h3>Submitted Data</h3>
//         <p><strong>ID:</strong> ${data.id}</p>
//         <p><strong>Name:</strong> ${data.name}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
//         <p><strong>Subject:</strong> ${data.subject}</p>
//         <p><strong>Message:</strong> ${data.message}</p>
//     `;
//     document.body.appendChild(displayArea);
  
// }
