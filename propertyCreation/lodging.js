console.log("lodging")
import app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);
let listProperty = document.getElementById('listProperty')
let file = document.getElementById('inputFile')

function GenerateId() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const main_user = user
    function uploadListingImage(id) {
      if (file.files.length > 0) {
        var thisref = sRef(storage, `${main_user.uid}/Listing/${id}`)
        // console.log(file.files[0])
        uploadBytes(thisref, file.files[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(thisref)
            .then((url) => {
              // Insert url into an <img> tag to "download"
              // console.log(url)
              update(ref(database, 'property/' + id), {
                propertyImg: url
              })
            })
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;

                // ...

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            })

        });



      }


      // else{
      //     alert("No files selected!")
      // }

    }
    function createProperty() {
      const title = document.getElementById("title").value
      const address = document.getElementById("address").value
      const bathroomquantity = document.getElementById("bathroomquantity").value
      const bedroomquantity = document.getElementById("bedroomquantity").value
      const internet = document.getElementById("internet").value
      const rent = document.getElementById("rent").value
      const bills = document.getElementById("bills").value
      const deposit = document.getElementById("deposit").value
      const property = document.getElementById("property").value
      const furnishing = document.getElementById("furnishing").value
      // const gender = document.getElementById("gender").value

      const female = document.getElementById('female').checked;
      const male = document.getElementById('male').checked;

        var gender_type = ""
        if (female == true) {
            gender_type = "Female";
        }
        else {
            gender_type = "Male";
        }

      console.log(document.getElementById('date'))
      const date = document.getElementById("date").value
      const duration = document.getElementById("duration").value

      const place = document.getElementById("place").value
      const roomies = document.getElementById("roomies").value

      const phone = document.getElementById("phone").value
      const email = document.getElementById("email").value
      const tele = document.getElementById("tele").value

      // console.log("bye")

      var error = false;
      if (title != "" && address != "" && bathroomquantity.value != "Choose Quantity" && bedroomquantity != "Choose Quantity" && internet != ""
        && rent != "" && bills != "" && deposit != "" && property != "" && furnishing != "" && gender_type != "" && date != "" && duration != ""
        && place != "" && phone != "" && email != "" && tele != "" && main_user != null) {
        if (phone.length != 8) {
          document.getElementById("number_error").innerHTML = `
              <input type="number" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="phone" rows="1"
              placeholder="Enter phone number.">
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please enter a valid phone number. 
              </div>`
              error = true;
        }
        var ToDate = new Date();
        if (new Date(date).getTime() <= ToDate.getTime()) {
          document.getElementById("date_error").innerHTML = `
              <input type="date" class="form-control form-control-lg bg-light h-75 is-invalid" style=" border-radius: 10px;"
              id="date" required>
          <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
              Please enter a future date.
          </div>`
          error = true;
      }

      if(!email.includes('@')){
        document.getElementById("email_error").innerHTML = `
        <input type="email" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="email" rows="1"
        placeholder="Enter email.">
        <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
            Please enter a valid email. 
        </div>`
    }

  
      if(!error) {
          let id = GenerateId()
        set(ref(database, 'property/' + id), {
          title: title,
          address: address,
          bedroomquantity: bedroomquantity,
          bathroomquantity: bathroomquantity,
          internet: internet,
          property: property,
          furnishing: furnishing,
          gender: gender_type,
          date: date,
          duration: duration,
          place: place,
          roomies: roomies,
          uid: main_user.uid,
          listId: id
        })

        set(ref(database, `property/${id}/financial`), {
          rent: rent,
          bills: bills,
          deposit: deposit,
        })

        set(ref(database, `property/${id}/contact`), {
          phone: phone,
          email: email,
          tele: tele,
        })

        // alert('property listed')
        uploadListingImage(id)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Lodging successfully listed!',
          showConfirmButton: false,
          timer: 2000
        })

        setTimeout(function () {
          window.location.href = "../home.html#project-area";
        }, 2000);
        // alert("Loading...")
        }
      }

      else {
        if (title == '') {
          document.getElementById("listing_error").innerHTML = `
            <input type="text" class="form-control bg-light mx-auto is-invalid" style="border-radius: 10px;" id="title" rows="1"
            placeholder="Enter listing title.">
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please enter your listing title.
            </div>`
        }

        if (address == '') {
          document.getElementById("address_error").innerHTML = `
          <input type="text" class="form-control bg-light mx-auto is-invalid" style="border-radius: 10px;" id="address" rows="1"
          placeholder="Enter address.">
          <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
              Please enter a valid address.
          </div>`
        }

        if (bedroomquantity == 'Choose quantity') {
          document.getElementById("bedroom_error").innerHTML = `
            <select class="form-select bg-light is-invalid" style="color:rgb(110, 110, 110) ; border-radius: 10px;"
            aria-label="Default select example" id="bedroomquantity">
            <option selected>Choose quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please select number of bedrooms. 
              </div>`
        }

        if (bathroomquantity == 'Choose quantity') {
          document.getElementById("bathroom_error").innerHTML = `
              <select class="form-select bg-light is-invalid" style="color:rgb(110, 110, 110); border-radius: 10px;"
              aria-label="Default select example" id="bathroomquantity">
              <option selected>Choose quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              </select>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please select number of bathrooms. 
              </div>`
        }

        if (rent == "") {
          document.getElementById("rent_error").innerHTML = `
          <div class="input-group mb-3 mt-2" style="border-radius: 20px;">
              <span class="input-group-text " id="basic-addon1">$</span>
              <input type="number" class="form-control bg-light is-invalid" id="rent" rows="1" required>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
              Please enter your desired rent.
            </div>
          </div>`
        }

        if (deposit == "") {
          document.getElementById("deposit_error").innerHTML = `
          <div class="input-group mb-3 mt-2" style="border-radius: 20px;">
            <span class="input-group-text " id="basic-addon1">$</span>
            <input type="number" class="form-control bg-light is-invalid" id="deposit" rows="1" required>
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
              Please enter the required deposit.
            </div>
          </div>`
        }

        if (property == 'Choose property type') {
          document.getElementById("property_error").innerHTML = `
          <select id="property" class="form-select bg-light is-invalid" style="color:rgb(110, 110, 110) ;"
          aria-label="Default select example">
          <option selected>Choose property type</option>
          <option value="Apartment">Apartment</option>
          <option value="Room">Room</option>
        </select>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please select property type. 
              </div>`
        }

        if (male == false && female == false){
          document.getElementById("gender_error").innerHTML = `
          <select id="gender" class="form-select bg-light is-invalid" style="color:rgb(110, 110, 110) ;"
          aria-label="Default select example">
          <option selected>Choose preferred gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Any">Any</option>
        </select>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please select your preferred gender.
              </div>`
        }

        if (date == '') {
          document.getElementById("date_error").innerHTML = `
              <input type="date" class="form-control form-control-lg bg-light h-75 is-invalid" style=" border-radius: 10px;"
              id="date" required>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please enter a valid date.
              </div>`
        }

        if (duration == 'Choose stay duration') {
          document.getElementById("duration_error").innerHTML = `
          <select id="duration" class="form-select bg-light is-invalid" style="color:rgb(110, 110, 110) ;"
          aria-label="Default select example">
          <option selected>Choose stay duration</option>
          <option value="1-3">1-3 months</option>
          <option value="3-6">3-6 months</option>
          <option value="6-12">6-12 months</option>
          <option value=">12">>12 months</option>
        </select>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please select the allowed stay duration.
              </div>`
        }

        if (place == '') {
          document.getElementById("place_error").innerHTML = `
          <textarea id="place" class="form-control bg-light mt-2 is-invalid" style="border-radius: 10px;" rows="5"
            placeholder="Share more about your place here."></textarea>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please enter information about the place.
              </div>`
        }

        if (roomies == '') {
          document.getElementById("roomies_error").innerHTML = `
            <textarea id="roomies" class="form-control bg-light mt-2" style="border-radius: 10px;" rows="5"
              placeholder="Share more about the roommates here, if any."></textarea>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please enter information about the place.
              </div>`
        }

        if (phone == '' || phone.length != 8) {
          document.getElementById("number_error").innerHTML = `
              <input type="number" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="phone" rows="1"
              placeholder="Enter phone number.">
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                  Please enter a valid phone number. 
              </div>`
        }

        if (email == '') {
          document.getElementById("email_error").innerHTML = `
            <input type="email" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="email" rows="1"
            placeholder="Enter email.">
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please enter a valid email. 
            </div>`
        }

        if (tele == '') {
          document.getElementById("tele_error").innerHTML = `
          <div class="input-group mb-3 mt-2" style="border-radius: 20px;">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input type="text" class="form-control bg-light is-invalid" id="tele" rows="1"
              placeholder="Enter Telegram handle." required>
              <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
              Please enter a telegram username.
              </div>
          </div>
         `
        }





      }

    }


    if (listProperty != null) {
      listProperty.addEventListener("click", (e) => {
        createProperty()
      })
    }
    // ...
  } else {
    // User is signed out
    // ...
    //   window.location.href = "../register,login/login.html"
    console.log("user signed out")
    let timerInterval
    Swal.fire({
      title: 'Login To List',
      html: 'Redirecting in <b></b> milliseconds.',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    setTimeout(function () {
      window.location.href = "../register,login/login.html"
    }, 2000);

  }
});


