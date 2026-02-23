import app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
// console.log(database)
let signUp = document.getElementById('signUp')

if (signUp != null) {
    signUp.addEventListener("click", (e) => {

        const username = document.getElementById("username").value;
        const dob = document.getElementById("dob").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById('password1').value;
        const cfm_password = document.getElementById('password2').value;
        // const user = document.getElementsByName('usertype')
        // const roommate = document.getElementById('inputRoommate').checked;
        // const landlord = document.getElementById('inputLandlord').checked;
        // var type = "Not Selected"
        // if (roommate == true) {
        //     type = "Roommate";
        // }
        // else {
        //     type = "Landlord";
        // }
        var check_email = ['ntu.edu.sg', 'smu.edu.sg', 'nus.edu.sg'];
        var email_parts = email.split('@');
        // console.log(email_parts[1])
        if (!check_email.includes(email_parts[1])) {
            console.log(check_email.includes(email_parts[1]))
            var isStudent = false
        }
        else {
            var isStudent = true
        }

            

            var dob_array = dob.split('-');
            var day = dob_array[2]
            var month = dob_array[1]
            var year = dob_array[0]


            var error = false;
            if (username != '' && dob != '' && email != '' && password != '' && cfm_password != '') {
                if (day > 31 || month > 12) {
                    document.getElementById("date_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-calendar-fill h-75  text-center"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                            type="date"  id="dob" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please enter a valid date. 
                    </div>
                </div>`;
                    error = true;
                }
                if (year > 2004 || year < 1921) {
                    document.getElementById("date_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-calendar-fill h-75  text-center"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                            type="date"  id="dob" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        You have to be at least 18 years old.
                    </div>
                </div>`;
                    error = true;
                }

                if (!email.includes('@')) {
                    // var email_parts = email.split('@');
                    // console.log(email_parts[1])
                    // if(!check_email.includes(email_parts[1]) ) {
                    //     console.log(check_email.includes(email_parts[1]))
                    document.getElementById("email_error").innerHTML = `
                    <div class="input-group mb-4 h-75">
                        <i class="bi bi-envelope-fill"></i>
                        <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                            type="email" placeholder="Email" id="email" required>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                            Please enter a valid email. 
                        </div>
                    </div>`;
                    error = true;
                    // }
                }
                // else{
                //     document.getElementById("email_error").innerHTML = `
                //         <div class="input-group mb-4 h-75">
                //             <i class="bi bi-envelope-fill"></i>
                //             <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                //                 type="email" placeholder="Email" id="email" required>
                //             <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                //                 Please enter a valid university email. 
                //             </div>
                //         </div>`;
                //         error = true;
                // }
                if (password != cfm_password) {
                    document.getElementById("password_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-key-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Re-enter Password" id="password2" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Passwords do not match.
                    </div>
                </div>`;
                    error = true;
                }
                if (password.length < 6) {
                    document.getElementById("password").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-key-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Password" id="password1" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Password must be at least 6 characters.
                    </div>
                </div>`;
                    document.getElementById("password_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-key-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Re-enter Password" id="password2" required">
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                    Password must be at least 6 characters.
                </div>`;
                    error = true;
                }
                if (!error) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            console.log(user.uid)
                            set(ref(database, 'users/' + user.uid), {
                                username: username,
                                dob: dob,
                                email: email,
                                uid: user.uid,
                                student: isStudent
                            })

                            // alert('Succesfully Registered!')
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Registration Success',
                                text: 'Your account has been created',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            setTimeout(function () {
                                window.location.href = "login.html"
                            }, 1500);


                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // Firebase: Error (auth/email-already-in-use)
                            console.log(errorMessage);
                            if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                                document.getElementById("email_error").innerHTML = `
                        <div class="input-group mb-4 h-75">
                            <i class="bi bi-envelope-fill"></i>
                            <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                                type="email" placeholder="Email" id="email" required>
                            <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                                This email is already in use. Please sign in.
                            </div>
                        </div>`;
                                error = true;
                                // alert(errorMessage);
                            }
                            // alert(errorMessage);
                            // ..
                        });
                }
            }
            else {
                if (username == '') {
                    document.getElementById("username_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-person-fill"></i>
                        <input type="username" class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;" id="username" 
                        placeholder="Name" required>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please choose a name.
                        </div>
                </div>`;
                }
                if (dob == '') {
                    document.getElementById("date_error").innerHTML = `
                <div class="input-group mb-4 h-50 " style='padding-bottom:20px'>
                    <i class="bi bi-calendar-fill h-50  text-center"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                            type="date"  id="dob" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please enter a valid date.
                    </div>
                </div>`;
                }
                if (email == '') {
                    document.getElementById("email_error").innerHTML = `
                    <div class="input-group mb-4 h-75">
                        <i class="bi bi-envelope-fill"></i>
                        <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                            type="email" placeholder="Email" id="email" required>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;"> 
                            Please enter a valid email. 
                        </div>
                    </div>`;
                }
                if (password == '') {
                    document.getElementById("password").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-key-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Password" id="password1" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please enter a password.
                    </div>
                </div>`;
                }
                if (cfm_password == '') {
                    document.getElementById("password_error").innerHTML = `
                <div class="input-group mb-4 h-75">
                    <i class="bi bi-key-fill"></i>
                    <input class="input-field form-control-lg bg-light is-invalid" style="border-radius: 10px;"
                        type="password" placeholder="Re-enter Password" id="password2" required>
                    <div id="validationServerUsernameFeedback" class="invalid-feedback" style="font-family: Montserrat, sans-serif;">
                        Please reconfirm your password.
                    </div>
                </div>`;
                }
                // if(roommate == false && landlord == false){
                //     document.getElementById("user_error").innerHTML = `
                //     <div class="input-group mb-4">
                //         <div class="d-flex justify-content-center col text-center">
                //             <h6 class="fs-5 mt-1 me-4 mt-3">
                //                 I am a...
                //             </h6>
                //             <div class="form-check form-check-inline mt-3 ms-2">
                //                 <input class="form-check-input is-invalid" type="radio" name="usertype"
                //                     id="inputRoommate" value="Roommate">
                //                 <label class="form-check-label form-check-label-lg" for="inputRoommate">Roommate</label>
                //             </div>
                //             <div class="form-check form-check-inline mt-3 ms-2">
                //                 <input class="form-check-input is-invalid" type="radio" name="usertype"
                //                     id="inputLandlord" value="Landlord">
                //                 <label class="form-check-label form-check-label-lg" for="inputLandlord">Landlord</label>

                //             </div>
                //             <div class="invalid-feedback" style="font-family: Montserrat, sans-serif;">Please select user type.</div>
                //         </div>
                //     </div>`;
                // }
                // document.getElementById("error").innerHTML = `<div class="alert alert-danger p-10" style="font-family: Montserrat, sans-serif; color:black;">Please fill in all the fields</div>`;
            }

        })
}
