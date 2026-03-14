// Vue instance
const main = Vue.createApp({});

// Create a new Vue component
main.component("nav-component", {
  template: `
    <nav class="navbar navbar-expand-xl fixed-top w-100 flex justify-content-between" style='background-color:#fbaee3; background-image: url("/images/navBarBg.png"); background-size: 520px; background-repeat: no-repeat; background-position: 180px; background-position-y: 0px;'>
      <a class="navbar-brand" href="../loading/loading.html">
        <img class='mx-4' src='/images/logo.png' style='width: 150px; transition: transform 0.2s ease;' onmouseover="this.style.transform='translateY(-3px) scale(1.04)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
      </a>
    
      <a class="nav-link mx-4" href="/profile/profile.html">
        <img src="/images/profile.png" style="height: 60px; margin-right: 5px;">
      </a>
    </nav>
  `,
});

main.mount("#main");