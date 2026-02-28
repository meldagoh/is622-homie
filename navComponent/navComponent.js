// Vue instance
const main = Vue.createApp({});

// Create a new Vue component
main.component("nav-component", {
  template: `
        <nav class="navbar navbar-expand-xl sticky-top w-100" style='background-color:#fbaee3; background-image: url("/images/navBarBg.png"); background-size: 500px; background-repeat: no-repeat; background-position: right; background-position-y: 0px;'>
          <a class="navbar-brand" href="../home.html">
            <img class='mx-4'src='/images/logo.png' style='width: 150px;'>
          </a>

          <button class="navbar-toggler mx-4" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">

              <li class="nav-item active mx-4">
                <a class="nav-link" href="/home.html#project-area">
                <br>
                <h1 class="fs-5 fw-bold" style="color: #0b60f6;">Home<span class="sr-only">(current)</span></a></h1>
              </li>

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