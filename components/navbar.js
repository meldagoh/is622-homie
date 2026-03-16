// Vue instance
const main = Vue.createApp({});

// Create a new Vue component
main.component("navbar-component", {
  template: `
    <nav class="navbar navbar-expand-xl fixed-top w-100 d-flex justify-content-between align-items-center" style='background-color:#fbaee3; background-image: url("/images/navBarBg.png"); background-size: 520px; background-repeat: no-repeat; background-position: 180px; background-position-y: 0px;'>
      <a class="navbar-brand" href="/home/home.html">
        <img class='mx-4' src='/images/logo.png' style='width: 150px; transition: transform 0.2s ease;' onmouseover="this.style.transform='translateY(-4px) scale(1.04)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
      </a>

      <div class="d-flex align-items-center me-4 gap-2">
        <!-- Chats list button -->
        <a class="nav-link d-flex flex-column align-items-center me-3" href="../chats/chats.html"
           style="text-decoration: none; color: #1a1a2e; transition: transform 0.2s ease;"
           onmouseover="this.style.transform='translateY(-4px) scale(1.04)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: rgba(255,255,255,0.35); border-radius: 50%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1a1a2e" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
              <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
          </span>
        </a>

        <!-- Profile button -->
        <a class="nav-link" href="/profile/profile.html"
           style="text-decoration: none; color: #1a1a2e; transition: transform 0.2s ease;"
           onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: rgba(255,255,255,0.35); border-radius: 50%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1a1a2e" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </span>
        </a>
      </div>
    </nav>
  `,
});

main.mount("#main");