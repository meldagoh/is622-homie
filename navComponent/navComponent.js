// Vue instance
const main = Vue.createApp({});

// Create a new Vue component
main.component("nav-component", {
  template: `
        <nav class="navbar navbar-expand-xl fixed-top w-100" style='background-color:#fbaee3; background-image: url("/images/navBarBg.png"); background-size: 520px; background-repeat: no-repeat; background-position: right; background-position-y: 0px;'>
          <a class="navbar-brand" href="../home.html">
            <img class='mx-4'src='/images/logo.png' style='width: 150px;'>
          </a>
        
          <div class="navbar-nav id="navbarSupportedContent">
            <ul class="navbar-nav">

              <li class="nav-item mx-4">
                <a class="nav-link" href="/savedListings/savedListings.html">
                <br>
                <h1 class="fs-5 fw-bold" style="color: #0b60f6;">Saved Listings<span class="sr-only">(current)</span></a></h1>
              </li>

              <li class="nav-item mx-4">
                <a class="nav-link" href="/profile/profile.html">
                <br>
                <h1 class="fs-5 fw-bold" style="color: #0b60f6;">Profile<span class="sr-only">(current)</span></a></h1>
              </li>
                            
            </ul>
          </div>
      </nav> 
      
  </body>
  `,
});

main.mount("#main");