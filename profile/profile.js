// Profile Page Controller
const profilePage = {
  isEditMode: false,
  originalData: {},

  init() {
    this.loadProfileData();
    this.attachEventListeners();
    this.renderViewMode();

    // live mirror inputs to view spans while typing (optional)
    document.getElementById('username').addEventListener('input', (e) => {
      document.getElementById('usernameView').textContent = e.target.value || this.originalData.username;
    });
    document.getElementById('email').addEventListener('input', (e) => {
      document.getElementById('emailView').textContent = e.target.value || this.originalData.email;
    });
  },

  attachEventListeners() {
    // Pencil button toggles edit mode (for both form & picture)
    document.getElementById('editModeToggleBtn').addEventListener('click', () => {
      if (this.isEditMode) {
        // already editing, let user upload picture
        document.getElementById('profilePictureInput').click();
      } else {
        this.enterEditMode();
      }
    });

    // Profile picture upload
    document.getElementById('profilePictureInput').addEventListener('change', (e) => this.handleProfilePictureUpload(e));

    // Form submit
    document.getElementById('profileForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
  },

  loadProfileData() {
    // Load from localStorage or set defaults
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      this.originalData = JSON.parse(savedData);
    } else {
      this.originalData = {
        profilePicture: 'https://via.placeholder.com/150?text=Profile',
        username: 'meldagoh',
        email: 'meldagoh@gmail.com',
        password: 'password123'
      };
    }
  },

  renderViewMode() {
    document.getElementById('usernameView').textContent = this.originalData.username || 'Not set';
    document.getElementById('emailView').textContent = this.originalData.email || 'Not set';
    document.getElementById('profilePictureDisplay').src = this.originalData.profilePicture;

    // Hide input fields
    document.querySelectorAll('.hidden-input').forEach(input => {
      input.classList.add('hidden-input');
    });

    // Show view mode elements
    document.querySelectorAll('.form-value').forEach(el => {
      el.style.display = 'block';
    });

    // Hide edit buttons & upload overlay
    document.getElementById('editButtons').classList.add('hidden');
    document.getElementById('toggleEditBtn').style.display = 'none';
    document.getElementById('uploadOverlay').classList.add('hidden');

    this.isEditMode = false;
  },

  enterEditMode() {
    this.isEditMode = true;

    // Populate input fields with current data
    document.getElementById('username').value = this.originalData.username || '';
    document.getElementById('email').value = this.originalData.email || '';
    document.getElementById('password').value = '';

    // Hide view mode elements
    document.querySelectorAll('.form-value').forEach(el => {
      el.style.display = 'none';
    });

    // Show input fields
    document.querySelectorAll('.hidden-input').forEach(input => {
      input.classList.remove('hidden-input');
    });

    // Show edit buttons & upload overlay
    document.getElementById('editButtons').classList.remove('hidden');
    document.getElementById('toggleEditBtn').style.display = 'none';
    document.getElementById('uploadOverlay').classList.remove('hidden');
  },

  handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('profilePictureDisplay').src = e.target.result;
        this.originalData.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },

  handleFormSubmit(event) {
    event.preventDefault();

    // Validate inputs
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email) {
      alert('Please fill in all required fields');
      return;
    }

    if (!this.isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Update data object
    this.originalData.username = username;
    this.originalData.email = email;
    if (password) {
      this.originalData.password = password;
    }

    // Save to localStorage so the values persist between reloads
    localStorage.setItem('userProfile', JSON.stringify(this.originalData));

    // reload from storage just to be safe
    this.loadProfileData();

    // Show success message
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been saved successfully!',
        confirmButtonColor: '#fbaee3'
      });
    } else {
      alert('Profile updated successfully!');
    }

    this.renderViewMode();
  },

  cancelEdit() {
    this.renderViewMode();
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  profilePage.init();
});