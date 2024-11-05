//List data Educations
function Educations(data = '') {
    fetch(`https://mps7.chandalen.dev/api/educations${data ? `?filter=${data}` : ''}`)
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
                
                const students = json.data.map(element => `
              
                    <div class="resume-wrap d-flex">
                       
                        <div class="text pl-3">
                       
                            <span class="date">${element.start_year} - ${element.end_year}</span>
                            <h2>${element.en_degree}</h2>
                            <span class="position">${element.en_school}</span>
                    
                            <p>${element.en_degree}</p> <!-- Changed to use km_degree -->
                        </div>
                    </div>
                `).join('');
                document.getElementById('list-educations').innerHTML = students;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Educations();




//Experience data
//List data Educations
function Experience(data = '') {
    fetch(`https://mps7.chandalen.dev/api/experiences${data ? `?filter=${data}` : ''}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(json => {
           // console.log(json); // Log the entire response for debugging
            
            if (json.result) {
                
                const Experience = json.data.map(element => {
                    const points = element.points.map(point => `<li>${point.en_text}</li>`).join('');
                 //   console.log(points);
                    
                    return `
                    <div class="resume-wrap d-flex">
                        <div class="text pl-3">
                            <span class="date">${element.start_year} - ${element.end_year || 'Present'}</span>
                            <h2>${element.en_title}</h2>
                            <h4>${element.en_workplace}</h4>
                            <ul>${points}</ul>
                        </div>
                    </div>
                    `;
                }).join('');
                
                
                document.getElementById('list-exp').innerHTML = Experience;
            //    console.log(Experience);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Experience();


///skill list all data

function Skills(data = '') {
    fetch(`https://mps7.chandalen.dev/api/skills${data ? `?filter=${data}` : ''}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        
        .then(json => {
         //   console.log(json); // Log the entire response for debugging
            
            if (json.result) {
              //  alert('Network response')
                
              const skills = json.data.map(element => `
              <div class="col-md-6 animate-box">
                  <div class="progress-wrap ">
                      <h3>${element.name}</h3>
                      <div class="progress">
                          <div
                              class="progress-bar color-1"
                              role="progressbar"
                              aria-valuenow="${element.percent}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: ${element.percent}%"
                          >
                              <span>${element.percent}%</span>
                          </div>
                      </div>
                  </div>
              </div>
          `).join('');
                document.getElementById('list-skill').innerHTML = skills;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Skills();

//software data


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
              <div class="col-md-6 animate-box">
                  <div class="progress-wrap ">
                      <h3>${element.name}</h3>
                      <div class="progress">
                          <div
                              class="progress-bar color-1"
                              role="progressbar"
                              aria-valuenow="${element.percent}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: ${element.percent}%"
                          >
                              <span>${element.percent}%</span>
                          </div>
                      </div>
                  </div>
              </div>




              
          `).join('');
                document.getElementById('list-software').innerHTML = softwares;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Software();



//language data



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
              <div class="col-md-6 animate-box">
                  <div class="progress-wrap ">
                      <h3>${element.en_name}</h3>
                      <div class="progress">
                          <div
                              class="progress-bar color-1"
                              role="progressbar"
                              aria-valuenow="${element.percent}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: ${element.percent}%"
                          >
                              <span>${element.percent}%</span>
                          </div>
                      </div>
                  </div>
              </div>




              
          `).join('');
                document.getElementById('list-Language').innerHTML =languages;
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
Language();