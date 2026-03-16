// Vue instance for footer
const footerApp = Vue.createApp({});

// Create footer component
footerApp.component("footer-component", {
  props: ['footerText'],
  template: `
    <div id="wrapper" style="background-color: #3c78cf;">
        <footer id="footer" class="footer pb-3 flex align-items-center">
            <div class="container pb-4">
                <div class="row justify-content-between">
                        <h3 class="pt-5 ps-4 fw-semibold" style="color:#fbaee3">About Us</h3>
                        <p style="color:#fff" class="mt-3 mb-3 ps-4">{{ footerText || 'Find your affordable, clean and safe room to rent. Our mission is to simplify the process of connecting newcomers to Singapore with housing.' }}
                            <br><br>
                            <i>Made with love by Team 1 for IS622 Digital Product Management.</i>
                        </p>
                        <img src="/images/houseFooter.png" class="py-3" style="width: 120px;">
                </div>
            </div>
        </footer>
    </div>
  `,
});

footerApp.mount("#footer-mount");