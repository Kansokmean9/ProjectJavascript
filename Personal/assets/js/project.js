function fetchProjects() {
    fetch('https://mps7.chandalen.dev/api/projects')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(json => {
            // console.log(json); // Log the entire response for debugging


            
            if (json.result && json.data) {
                const projects = json.data.map(project => `
                    <div class="col-md-4 d-flex ">
                        <div class="blog-entry justify-content-end w-100">
                            <a href="single.html" class="block-20" style="background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20240610/pngtree-computer-of-a-programmer-with-lines-code-of-software-image_15746003.jpg')">
                            </a>
        


                            <div class="text mt-2 float-right d-block">
                                <h3 class="heading">
                                    <a href="single.html">${project.en_name || 'Unnamed Project'}</a>
                                </h3>
                                <div class="d-flex align-items-center mb-3 meta">
                                    <p class="mb-0">
                                        <span class="mr-2">${project.en_workplace || 'Unknown Workplace'}</span>
                                    </p>
                                </div>
                                <p>
                                    ${project.points.length > 0 
                                        ? project.points.map(point => point.en_text).join('<br>') 
                                        : 'No details available.'}
                                </p>
                                
                            </div>
                        </div>
                    </div>
                `).join('');
                
                document.getElementById('projects-container').innerHTML = projects;
            } else {
                console.error('No data found in the API response');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch and display the data
fetchProjects();