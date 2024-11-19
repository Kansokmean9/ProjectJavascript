

function Awards() {
  fetch(`https://mps7.chandalen.dev/api/resume-num`, {
    method: "GET",
    headers: {
      Authorization: `Bearer 116|ChZ2xtwKhEEnHkHoSstcYZIin4Vg8rOdAiofdhrV8e9376da`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      // Check if the response is successful
      if (json.result) {
        const {
          total_education,
          total_experience,
          total_project,
          total_skill,
        } = json.data;

        // Build the HTML content with the specified style
        const awardsContainer = document.getElementById("awards");
        awardsContainer.innerHTML = `
            <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i class="bi bi-emoji-smile"></i>
                <div class="stats-item">
                    <span> ${total_education}</span>
                    <p>Total Education</p>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i class="bi bi-journal-richtext"></i>
                <div class="stats-item">
                    <span >${total_experience}</span>
                    <p>Total Experience</p>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i class="bi bi-headset"></i>
                <div class="stats-item">
                    <span>${total_project}</span>
                    <p>Total Project</p>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i class="bi bi-people"></i>
                <div class="stats-item">
                    <span >${total_skill}</span>
                    <p>Total Skill</p>
                </div>
            </div>
            
            `;
      } else {
        console.error("Unexpected response format:", json);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function
Awards();

function Skills(data = "") {
  fetch(`https://mps7.chandalen.dev/api/skills${data ? `?filter=${data}` : ""}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })

    .then((json) => {
      //   console.log(json); // Log the entire response for debugging

      if (json.result) {
        //  alert('Network response')

        const skills = json.data
          .map(
            (element) => `
              <div class="col-lg-6">
              <div class="progress">
                <span class="skill"
                  ><span>${element.name}</span> <i class="val">${element.percent}%</i></span
                >
                <div class="progress-bar-wrap">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="${element.percent}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              </div>
          `
          )
          .join("");
        document.getElementById("skill_progress").innerHTML = skills;
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function to fetch and display the data
Skills();








function Software(data = '') {
    fetch(`https://mps7.chandalen.dev/api/softwares${data ? `?filter=${data}` : ''}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        
        .then(json => {
          //  console.log(json); // Log the entire response for debugging
            
            if (json.result) {
              //  alert('Network response')
                
              const softwares = json.data.map(element => `
              <div class="col-lg-6">
              <div class="progress">
                <span class="skill"
                  ><span>${element.name}</span> <i class="val">${element.percent}%</i></span
                >
                <div class="progress-bar-wrap">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="${element.percent}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              </div>




              
          `).join('');
                document.getElementById('software_progress').innerHTML = softwares;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Software();



function Language(data = '') {
    fetch(`https://mps7.chandalen.dev/api/languages${data ? `?filter=${data}` : ''}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        
        .then(json => {
          //  console.log(json); // Log the entire response for debugging
            
            if (json.result) {
              //  alert('Network response')
                
              const languages = json.data.map(element => `
              <h3 class="resume-title">Education</h3>
              <div class="col-lg-6">
              <div class="progress">
                <span class="skill"
                  ><span>${element.en_name}</span> <i class="val">${element.percent}%</i></span
                >
                <div class="progress-bar-wrap">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="${element.percent}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              </div>



              
          `).join('');
                document.getElementById('language_progress').innerHTML =languages;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Language();
