function fetchAbout() {
    fetch('https://mps7.chandalen.dev/api/profile')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(json => {
        console.log(json); // Log the entire response for debugging
  
        if (json.result && json.data && json.data.profile) {
          const profile = json.data.profile;
          const Bio = json.data.bio;
          const About = `
            <div class="row d-flex no-gutters">
              <div class="col-md-12 col-lg-6 d-flex">
                <div class="img-about img d-flex align-items-center justify-content-center">
                  <div class="overlay"></div>
                  <div class="img w-100 h-100" style="background-image: url(${profile.photo_about})"></div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 pl-md-5 py-5">
                <div class="row justify-content-start pb-3">
                  <div class="col-md-12 heading-section ">
                    <h2 class="mb-4">About Me</h2>
                    <h4 class="mb-4">${Bio.en_about_title}</h4>

                    <p>${Bio.en_about_bio}</p>
                    <ul class="about-info mt-4 px-md-0 px-2">
                      <li class="d-flex">
                        <span>Name:</span> <span>${profile.en_first_name} ${profile.en_last_name}</span>
                      </li>
                      <li class="d-flex">
                        <span>Address:</span> <span>${profile.km_nationality}</span>
                      </li>
                      <li class="d-flex">
                        <span>Address:</span> <span>${profile.en_address}</span>
                      </li>
                      <li class="d-flex">
                        <span>Phone:</span> <span>${profile.en_phone}</span>
                      </li>
                      <li class="d-flex">
                        <span>Email:</span> <span>${profile.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `;
  
          document.getElementById('about-section').innerHTML = About;
          console.log(json.data)
        } else {
          console.error('No data found in the API response');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Call the function to fetch and display the data
  fetchAbout();