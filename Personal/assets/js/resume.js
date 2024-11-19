function Educations(data = "") {
  fetch(
    `https://mps7.chandalen.dev/api/educations${data ? `?filter=${data}` : ""}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      if (json.result) {
        const students = json.data
          .map(
            (element) => `
                <div class="resume-item" >
                <h4>${element.en_degree}</h4>
                <h5>${element.start_year} - ${
              element.end_year || "Present"
            }</h5>
                <p><em>${element.en_school}</em></p>
                <p></p>
             
                </div>
              
            
                `
          )
          .join("");
        document.getElementById("education").innerHTML = students;
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

Educations();

function Experience(data = "") {
  fetch(
    `https://mps7.chandalen.dev/api/experiences${data ? `?filter=${data}` : ""}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      if (json.result) {
        const Experience = json.data
          .map((element) => {
            const points = element.points
              .map((point) => `<li>${point.en_text}</li>`)
              .join("");
            //   console.log(points);

            return `
                   
<div class="resume-item">
<h4>${element.en_title}</h4>
<h5>${element.start_year} - ${element.end_year || "Present"}</h5>
<p><em>${element.en_workplace} </em></p>
<ul>${points}</ul>

</div>
                    `;
          })
          .join("");

        document.getElementById("experience").innerHTML = Experience;
        //    console.log(Experience);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function to fetch and display the data
Experience();


// <ul>
//   <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>
//   <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>
//   <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>
//   <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>
// </ul>