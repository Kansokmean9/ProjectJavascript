function fetchAbout() {
  fetch("https://mps7.chandalen.dev/api/profile")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {

      if (json.result && json.data && json.data.profile) {
        const profile = json.data.profile;
        const Bio = json.data.bio;
        const social = json.data.social;

        const name = document.getElementById('navbar-name');
        let names = document.getElementById('names');
        name.innerHTML = profile.en_last_name[0];
        let naa =  profile.en_last_name;
        let result = naa.slice(1);
        names.innerHTML ="&nbsp;&nbsp;" + result ;


        const image_contact = document.getElementById('image-contact');
        image_contact.style.backgroundImage = `url('${profile.photo_about}')`;

        const About = `
          <div class="col-lg-6 col-md-6 align-items-center">
            <div class="text text-center">
              <span class="subheading">Hey! I am</span>
              <h2>${profile.en_first_name} ${profile.en_last_name}</h2>
              <h3 class="px-5 mx-5">${Bio.en_hero_bio}</h3>
              <div class="social-icons">
                <a href="${social.facebook}" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="${social.telegram}" target="_blank">
                  <i class="fab fa-telegram-plane"></i>
                </a>
                <a href="${social.linkedin}" target="_blank">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="mt-0 px-0 image_hero">
          <div class="arrow position-absolute"><i class="bi bi-chevron-double-down"></i></div>
             <div class="img  w-100 h-100" style="background-image: url(${profile.photo_hero});  border-radius: 0px; background-size: cover; background-position: center;"></div>
          </div>
        `;

        document.getElementById("hero-section").innerHTML = About;
      } else {
        console.error("No data found in the API response");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchAbout();