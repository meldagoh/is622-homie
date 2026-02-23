import  app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);
let listRoomie = document.getElementById('listRoomie')
let file = document.getElementById('inputFile')


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid)
        const dbRef = ref(database)
        get(child(dbRef,"users")).then((snapshot)=>{
        var users = []
        var index = 0
        snapshot.forEach(childSnapshot=>{
            users.push(childSnapshot.val())
        });

        // console.log(users)
        for(var i=0; i<users.length; i++){
            if(users[i].uid==uid){
                index = i
            }
        }
        console.log(users[index].student)
        if(users[index].student){
            if (listRoomie != null) {
                listRoomie.addEventListener("click", (e) => {
                    createRoomie(user)                   
                })
            }
        }
        else{
            let timerInterval
            Swal.fire({
              title: 'We are sorry...',
              html: 'Restricted access for students only.<br><br>Redirecting in <b></b> milliseconds.',
              timer: 2500,
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
            setTimeout(function(){
                window.location.href = "../home.html"
             }, 2500);
        }
        })
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

  
      // ...
    } else {
      // User is signed out
      // ...
    //   window.location.href = "../register,login/login.html"
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
      setTimeout(function(){
          window.location.href = "../register,login/login.html"
       }, 2000);


    }
  });


function uploadProfileImage(user) {

    if (file.files.length > 0) {
        var thisref = sRef(storage, `${user.uid}/profile/profileImg`)
        console.log(file.files[0])
        uploadBytes(thisref, file.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(thisref)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    console.log(url)
                    update(ref(database, 'users/' + user.uid), {
                        profileImage: url
                    })
                    update(ref(database, 'roomie/' + user.uid), {
                        roomieImg: url
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

function createRoomie(user) {
    const firstname = document.getElementById("firstname").value
    const lastname = document.getElementById("lastname").value
    const name = firstname + ' ' + lastname
    const age = document.getElementById("age").value
    // const gender = document.querySelector('input[name="gender"]:checked').value
    // const gender = document.getElementsByName('gender');
    const female = document.getElementById('female').checked;
    const male = document.getElementById('male').checked;

    var gender_type = ""
        if (female == true) {
            gender_type = "Female";
        }
        else {
            gender_type = "Male";
        }

    const budget = document.getElementById("budget").value

    const locations = []
    const location = document.getElementsByName("location")
    for(var checkedLoc of location){
        if(checkedLoc.checked){
            locations.push(checkedLoc.value)
        }
    }
    console.log(locations)

    const rooms = document.getElementById("rooms").value
    const date = document.getElementById("movedate").value
    const duration = document.getElementById("duration").value
    const introduction = document.getElementById("intro").value
    const hobbies = document.getElementById("hobbies").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const tele = document.getElementById("tele").value

    var error = false;
    if (firstname != "" && lastname != "" && age!="" && gender_type !="" && budget != "" && locations.length != 0 && rooms != "No. of Rooms" && date != ""
        && duration != "" && introduction != "" && hobbies != "" && phone != "" && email != "" && tele != "" && user != null) {
            // const specialChars = /1234567890[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            // if (specialChars.test(firstname)){
            //     console.log("success")
            //     document.getElementById("firstname_error").innerHTML = `
            //     <input type="text" class="form-control form-control-lg bg-light h-75 is-invalid"
            //         style="border-radius: 10px;" id="firstname" required>
            //     <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
            //         Your name cannot contain numbers or special characters.
            //     </div>`
            //     error = true;
            // }
            // if (specialChars.test(lastname)){
            //     document.getElementById("lastname_error").innerHTML = `
            //     <input type="text" class="form-control form-control-lg bg-light h-75 is-invalid"
            //         style="border-radius: 10px;" id="lastname" required>
            //     <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
            //         Your name cannot contain numbers or special characters.
            //     </div>`
            //     error = true;
            // }
            if (age < 18 || age > 100){
                document.getElementById("age_error").innerHTML = `
                <input type="number" class="form-control form-control-lg bg-light h-75 is-invalid"
                    style="border-radius: 10px;" id="age" required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    You have to be at least 18 years old.
                </div>`
                error = true;
            }
            var ToDate = new Date();
        
            if (new Date(date).getTime() <= ToDate.getTime()) {
                document.getElementById("date_error").innerHTML = `
                    <input type="date" class="form-control form-control-lg bg-light h-75 is-invalid" style=" border-radius: 10px;"
                    id="movedate" required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter a future date.
                </div>`
                error = true;
            }
               
            if (phone.length != 8){
                document.getElementById("phone_error").innerHTML = `
                    <input type="number" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="phone" rows="1"
                    placeholder="Enter phone number.">
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please enter a valid phone number. 
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
                set(ref(database, 'roomie/' + user.uid), {
                    name: name,
                    age: age,
                    // gender: gender,
                    gender: gender_type,
                    budget: budget,
                    location: locations,         
                    rooms: rooms,
                    movedate: date,
                    duration: duration,
                    intro: introduction,
                    hobbies: hobbies,
                    listId: user.uid
                })
        
                set(ref(database, `roomie/${user.uid}/contact`), {
                    phone: phone,
                    email: email,
                    tele: tele,
                })
        
                // alert('roomie listed')
              

                console.log("listed")
                uploadProfileImage(user)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Roomie successfully listed',
                    showConfirmButton: false,
                    timer: 1500
                  })
                
                  
                setTimeout(function(){
                    window.location.href = "../home.html#project-area";
                 }, 2000);
                // alert("Loading...") 
            }
            
         
    }
    else{
        if (firstname == ''){
            document.getElementById("firstname_error").innerHTML = `
            <input type="text" class="form-control form-control-lg bg-light h-75 is-invalid"
                style="border-radius: 10px;" id="firstname" required>
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please enter your first name. 
            </div>`
        }
        
        if (lastname == ''){
            document.getElementById("lastname_error").innerHTML = `
            <input type="text" class="form-control form-control-lg bg-light h-75 is-invalid"
                style="border-radius: 10px;" id="lastname" required>
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please enter your last name. 
            </div>`
        }
        // if (specialChars.test(lastname)){
        //     document.getElementById("lastname_error").innerHTML = `
        //     <input type="text" class="form-control form-control-lg bg-light h-75 is-invalid"
        //         style="border-radius: 10px;" id="lastname" required>
        //     <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
        //         Your name cannot contain numbers or special characters.
        //     </div>`
        // }
        if (age == ''){
            document.getElementById("age_error").innerHTML = `
            <input type="number" class="form-control form-control-lg bg-light h-75 is-invalid"
                style="border-radius: 10px;" id="age" required>
            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please enter your age.
            </div>`
        }
        
        if (male == false && female == false){
            document.getElementById("gender_error").innerHTML = `
            <div class="form-check px-4">
                <input class="form-check-input is-invalid"  type="radio" value="Female" name="gender" id="female">
                Female
            </div>
            <div class="form-check px-4" >
                <input class="form-check-input is-invalid"  type="radio" value="Male" name="gender" id="male">
                Male
                <div class="invalid-feedback" style="font-family: Montserrat, sans-serif; font-size: 14px;">Please select your gender.</div>
            </div>`
            
        }
        if (budget == ''){
            document.getElementById("budget_error").innerHTML = `            
            <div class="input-group mb-3 mt-2" style="border-radius: 20px;">
                <span class="input-group-text " id="basic-addon1">$</span>
                <input type="text" class="form-control bg-light is-invalid" id="budget" rows="1" required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter your budget.
                </div>
            </div>`
        }
        if (rooms == 'No. of Rooms'){
            document.getElementById("rooms_error").innerHTML = `
                <select class="form-select form-select-lg bg-light h-100 mb-0 is-invalid" style=" border-radius: 10px;"
                  aria-label="Default select example" id="rooms">
                  <option selected>No. of Rooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please select preferred number of rooms. 
                </div>`
        }
        if (locations.length == 0){
            document.getElementById("location_error").innerHTML = `
                  <div class="form-check">
                    <input class="form-check-input is-invalid" type="checkbox" id="north" name="location" value="North">
                    <label class="form-check-label" for="north">North</label>
                  </div>
              
                  <div class="form-check">
                    <input class="form-check-input is-invalid" type="checkbox" id="south" name="location" value="South">
                    <label class="form-check-label" for="south">South</label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input is-invalid" type="checkbox" id="central" name="location" value="Central">
                    <label class="form-check-label" for="central">Central</label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input is-invalid" type="checkbox" id="east" name="location" value="East">
                    <label class="form-check-label" for="east">East</label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input is-invalid" type="checkbox" id="west" name="location" value="West">
                    <label class="form-check-label" for="west">West</label>
                    <div id="invalidCheck3Feedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif; font-size: 14px;">
                    Please select a preferred location.
                    </div>
                  </div>
                 
                  `
        }
        if (date == ''){
            document.getElementById("date_error").innerHTML = `
                <input type="date" class="form-control form-control-lg bg-light h-75 is-invalid" style=" border-radius: 10px;"
                id="movedate" required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter a valid date.
                </div>`
        }
        if (duration == ''){
            document.getElementById("duration_error").innerHTML = `
                <input type="number" class="form-control form-control-lg bg-light h-75 is-invalid" style="border-radius: 10px;"
                id="duration" required> 
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter a valid duration. 
                </div>`
        }
        if (introduction == ''){
            document.getElementById("intro_error").innerHTML = `
                <textarea class="form-control bg-light mt-2 is-invalid" style="border-radius: 10px;" id="intro" rows="5"
                placeholder="You can talk about yourself here."></textarea>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                Please give a short introduction about yourself.
                </div>`
        }
        if (hobbies == ''){
            document.getElementById("hobby_error").innerHTML = `
                <textarea class="form-control bg-light mt-2 is-invalid" style="border-radius: 10px;" id="hobbies" rows="5"
                placeholder="Share more about your hobbies here."></textarea>
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter your hobbies.
                </div>`
        }
        if (phone == '' || phone.length != 8){
            document.getElementById("phone_error").innerHTML = `
                <input type="number" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="phone" rows="1"
                placeholder="Enter phone number.">
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter a valid phone number. 
                </div>`
        }
        if (email == ''){
            document.getElementById("email_error").innerHTML = `
                <input type="email" class="form-control bg-light ps-3 mt-2 is-invalid" style="border-radius: 10px;" id="email" rows="1"
                placeholder="Enter email.">
                <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Please enter a valid email. 
                </div>`
        } 
        if (tele == ''){
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