function Awards() {
  fetch(`https://mps7.chandalen.dev/api/resume-num`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer 116|ChZ2xtwKhEEnHkHoSstcYZIin4Vg8rOdAiofdhrV8e9376da`,
          'Content-Type': 'application/json' // Optional: Set content type if needed
      }
  })
  .then(res => {
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      return res.json();
  })
  .then(json => {
    //  console.log(json); // Log the entire response for debugging
      
      // Check if the response is successful
      if (json.result) {
          const { total_education, total_experience, total_project, total_skill } = json.data;

          // Build the HTML content with the specified style
          const awardsContainer = document.getElementById('awards');
          awardsContainer.innerHTML = `
              <div class="col-md d-flex justify-content-center counter-wrap ">
                  <div class="block-18 shadow">
                      <div class="text">
                          <strong class="number" data-number="${total_education || 0}">${total_education || 0}</strong>
                          <span>Total Education</span>
                      </div>
                  </div>
              </div>
              <div class="col-md d-flex justify-content-center counter-wrap ">
                  <div class="block-18 shadow">
                      <div class="text">
                          <strong class="number" data-number="${total_experience || 0}">${total_experience || 0}</strong>
                          <span>Total Experience</span>
                      </div>
                  </div>
              </div>
              <div class="col-md d-flex justify-content-center counter-wrap ">
                  <div class="block-18 shadow">
                      <div class="text">
                          <strong class="number" data-number="${total_project || 0}">${total_project || 0}</strong>
                          <span>Total Projects</span>
                      </div>
                  </div>
              </div>
              <div class="col-md d-flex justify-content-center counter-wrap ">
                  <div class="block-18 shadow">
                      <div class="text">
                          <strong class="number" data-number="${total_skill || 0}">${total_skill || 0}</strong>
                          <span>Total Skills</span>
                      </div>
                  </div>
              </div>
          `;
      } else {
          console.error('Unexpected response format:', json);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

// Call the function
Awards();