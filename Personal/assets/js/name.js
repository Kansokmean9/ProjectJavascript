


function fetchAbout() {
    fetch("https://mps7.chandalen.dev/api/profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
       // console.log(json); // Log the entire response for debugging
  
        if (json.result && json.data && json.data.profile) {
          const profile = json.data.profile;
          // Image footer
          
          const navbar_title = document.getElementById('navbar_title');
        //  console.log(navbar_title);
          navbar_title.innerHTML = profile.en_first_name + " " + profile.en_last_name;
       
        } else {
          console.error("No data found in the API response");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  // Call the function to fetch and display the data
  fetchAbout();