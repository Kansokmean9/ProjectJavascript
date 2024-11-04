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
        const Bio = json.data.bio;
        const social = json.data.social;

        // Name header
        const name = document.getElementById('navbar-name');
        let names = document.getElementById('names');
        name.innerHTML = profile.en_first_name[0];
        let nam = profile.en_first_name;
        let result = nam.slice(1);
        names.innerHTML = result + " " + profile.en_last_name;

        // Image footer
        const image_contact = document.getElementById('image-contact');
        image_contact.src = profile.photo_about;

        const About = `
          <div class="col-lg-6 col-md-6 align-items-center">
            <div class="text text-center">
              <span class="subheading">Hey! I am</span>
              <h2>${profile.en_first_name} ${profile.en_last_name}</h2>
              <h3>${Bio.en_hero_bio}</h3>
              <div class="social-icons">
                <a href="${social.facebook}" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://t.me/tchandalen" target="_blank">
                  <i class="fab fa-telegram-plane"></i>
                </a>
                <a href="https://www.linkedin.com/in/chandalen-teang" target="_blank">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 image_hero">
            <div class="img w-100 h-100" style="background-image: url(${profile.photo_hero}); width: 600px; border-radius: 10px; background-size: cover; background-position: center;"></div>
          </div>
        `;

        document.getElementById("hero-section").innerHTML = About;
        console.log(json.data);
      } else {
        console.error("No data found in the API response");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function to fetch and display the data
fetchAbout();