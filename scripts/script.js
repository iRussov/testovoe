const mapPage = `
<div class="container2">
<div class="row justify-content-center">
  <div class="col-lg-12">
    <section class="custom-section bg-white mt-3">
      <div class="d-flex align-items-center wrap">
      <div class="map-text ">
        <h2>Basic Map</h2>
      </div>
      <div class="icon-buttons d-flex">
        <i class="fas fa-angle-down me-3"></i>
        <i class="fas fa-sync-alt me-3"></i>
        <i class="fas fa-times"></i>
      </div>
    </div>
      <div id="map"></div>
    </section>
  </div>
</div>
</div>

<div id="preloader" class="d-none justify-content-center align-items-center">
<div class="spinner-border text-black spinner-border" role="status">
  <span class="sr-only"></span>
</div>
</div>
    `

const home = `
<div class="row">
      <div class="col-12 col-md-8 mt-3">
        <section class="custom-section mx-3">
          <div class="text-center mb-4 mt-4">
            <img src="./images/picture_with_sun.jpg" class="img-sun " alt="beutiful picture">
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="fas fa-comment me-2"></i>
            <span  class="text-primary me-1">Jason Ansley</span> commented:
          </div>
          <div class="custom-comment ms-2">
            <p class="mx-2 mb-2">Don’t sit and wait. Get out there, feel life. Touch the sun, and immerse in the sea. Keep love in your heart. A life without it is like a sunless garden when the flowers are dead. Because summer is passion, memories, light breeze, the sun that appears on the skin and caresses the face.</p>
            <p class="ms-2 text-muted"> - Jason, 10:39 am</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <i class="fas fa-eye me-2"></i>
              <span>438</span>
              <i class="fas fa-regular fa-message me-1 ms-4"></i>
              <span>71</span>
            </div>
          </div>
        </section>
        <section class="custom-section mb-4 mx-3 mt-3">
            <div class="row">
              <div class="col-6">
                <span>Sunset sunset sunset</span>
              </div>
              <div class="col-6 d-flex justify-content-end align-items-center">
                <i class="far fa-clock me-2"></i>
                <span>53 minutes ago</span>
                <i class="fas fa-angle-down ms-2"></i>
              </div>
            </div>
          </section>
      </div>

      <div class="col-12 col-md-4 mt-3">
        <section class="custom-section mx-3">
          <div class="d-flex justify-content-center text-center mt-3">
            <div class="me-2">
              <img src="./images/ava.jpg" alt="Profile Photo" class="profile-photo rounded-circle">
              <p class="fw-bold mb-1">Russov Egor</p>
              <p>Web Developer</p>  
              <a href="https://t.me/egor_camus" target="_blank" class="custom-link">
                <i class="fa-brands fa-telegram fs-4"></i>
              </a>
              <a href="https://github.com/iRussov?tab=repositories" target="_blank" class="ms-2 custom-link" >
                <i class="fa-brands fa-github fs-4"></i>
              </a>
              <p class="mt-2">HTML, CSS, JavaScript, Node.JS, Express.JS, TypeScript, Git</p>
            </div>
          </div>
        </section>

        <section class="custom-section mx-3 mt-3 mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0">Share Your Thoughts</p>
            <i class="fas fa-angle-up"></i>
          </div>
          <textarea class="form-control mt-2" rows="3" placeholder="Enter your message..."></textarea>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary blue-btn mt-2">Save</button>
          </div>
        </section>
      </div>

    </div>
`

const timer = `
<div class="container2">
<div class="row justify-content-center">
  <div class="col-lg-12">
    <section class="custom-section2 bg-white mt-3">
      <div class="d-flex align-items-center wrap">
      <div class="timer-text">
        <h2>Timer:</h2>
      </div>
      <div class="icon-buttons d-flex">
        <i class="fas fa-angle-down me-3"></i>
        <i class="fas fa-sync-alt me-3"></i>
        <i class="fas fa-times"></i>
      </div>
    </div>
    <span id="timer"></span>
    </section>
  </div>
</div>
</div>
`

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const routes = {
        '/': home,
        '/map': mapPage,
        '/timer': timer
    };

    let startTime = new Date().getTime();
    setInterval(updateTimer, 1000);

    window.addEventListener('hashchange', updateContent);

    function navigateTo(url) {
        window.location.hash = url;
    }

    function updateContent() {
        const path = window.location.hash.split('#').pop() || '/';
        contentDiv.innerHTML = routes[path] || '<h1>404 - Page Not Found</h1>';    
        
        if (path === '/map') {
            showPreloader();
            initializeMap();
        }
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeSpent = currentTime - startTime;

        let hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = hours + ":" + minutes + ":" + seconds;
        }
    }

    function initializeMap() {
        setTimeout(() => {
        const map = L.map('map').setView([56.872, 37.362], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: './images/marker-icon.png',
            iconRetinaUrl: './images/marker-icon-2x.png',
            shadowUrl: './images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.marker([56.872, 37.362],{icon: customIcon}).addTo(map)
            .bindPopup('Я живу здесь ;)')
            .openPopup();

            hidePreloader();
    },2000);
    }

    function showPreloader() {
        preloader.classList.remove('d-none');
    }

    function hidePreloader() {
        preloader.classList.add('d-none');
    }


    document.getElementById('link-home').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/');
    });

    document.getElementById('link-map').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/map');
    });

    document.getElementById('link-time').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/timer');
    });

    document.querySelectorAll('nav ul li').forEach(function(item) {
        item.addEventListener('click', function() {
            document.querySelectorAll('nav ul li').forEach(function(li) {
                li.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    updateContent();

});
