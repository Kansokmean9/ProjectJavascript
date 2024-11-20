


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
         const Bio = json.data.bio;
          const social = json.data.social;
  
         const social_link=`
  
         <a href="${social.facebook}"><i class="bi bi-facebook"></i></a>
         <a href="${social.telegram}"><i class="bi bi-telegram"></i></a>
         <a href="${social.linkedin}"><i class="bi bi-linkedin"></i></a>
         `

       //  console.log(social_link)
         document.getElementById("social-links").innerHTML = social_link;
         
  
  
          // Name header
          const about_name = document.getElementById('about_name');
          about_name.innerHTML =Bio.en_hero_bio;
          
  
  
  
          // Image footer
          
          const navbar_title = document.getElementById('navbar_title');
        //  console.log(navbar_title);
          navbar_title.innerHTML = profile.en_first_name + " " + profile.en_last_name;
       
  
          const hero_title = document.getElementById('hero-title');
          hero_title.innerHTML = profile.en_first_name + " " + profile.en_last_name;
          const image_contact = document.getElementById('hero-bg');
          image_contact.style.backgroundImage = `url('${profile.photo_hero}')`;
         // console.log(image_contact)
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