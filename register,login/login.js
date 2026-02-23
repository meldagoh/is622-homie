import  app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);
let loginBtn = document.getElementById('loginBtn')

if (loginBtn != null) {
    loginBtn.addEventListener("click", (e) => {
        const inputEmail = document.getElementById('inputEmail').value
        const inputPassword = document.getElementById('inputPassword').value

        if (inputEmail != '' && inputPassword != '') {
            signInWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then((userCredential) => {
                var currentdate = new Date()
                var datetime = "Last Login: " + currentdate.getDay() + "/" + currentdate.getMonth()
                    + "/" + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes()
                const user = userCredential.user;
                update(ref(database, 'users/' + user.uid), {
                    last_login: datetime
                }

                )
              
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        // alert("Successfully logged in!")
                        console.log("user logged in")
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Login Success',
                                showConfirmButton: false,
                                timer: 1500
                                })
                
                            setTimeout(function(){
                                window.location.href = "/home.html";
                            }, 2000);
                        
                        // ...
                    } else {
                        // User is signed out
                        // ...
                        console.log("user signed out")
                    }
                });
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("error").innerHTML = `<div class="alert alert-danger p-10" style="font-family: Montserrat, sans-serif; color:black;">Email or Password is invalid. <br> Please try again! </div>`;
                // alert(errorMessage)
            });
        }
        else{
            if(inputEmail == ''){
                document.getElementById("email_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-person-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="email" placeholder="Email" id="inputEmail">
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="text-align: center; font-family: Montserrat, sans-serif;">
                        Please enter a valid university email. 
                    </div>
                </div>`;
            }
            if(inputPassword == ''){
                document.getElementById("password_error").innerHTML = `
                <div class="input-group mb-5 h-75">
                    <i class="bi bi-envelope-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Password" id="inputPassword">
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="text-align: center; font-family: Montserrat, sans-serif;">
                        Please enter a password. 
                    </div>
                </div>`;
            }
            // document.getElementById("error").innerHTML = `<div class="alert alert-danger p-10" style="font-family: Montserrat, sans-serif; color:black;">Email or Password cannot be empty</div>`;
        }
       

    })
}
