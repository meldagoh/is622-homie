import  app from '/config/newconfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage()
const storageref = sRef(storage);

let profileDetails = document.getElementById('profileinfo')
profileDetails.addEventListener("load", populateInfo())

let signOutBtn = document.getElementById('signOut')

if (signOutBtn != null) {
  signOutBtn.addEventListener("click", (e) => {
      signOut(auth).then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'See You Again',
            text: 'You have successfully logged out.',
            showConfirmButton: false,
            timer: 1500
            })

            setTimeout(function(){
              window.location.href = "/newlanding.html";
          }, 2000);

      }).catch((error) => {
          // An error happened.
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)

      });
  })
}

function populateInfo(){
  var url = document.URL
    console.log(url)
    var uid = url.substring(url.lastIndexOf('=') + 1)
    console.log(uid)

    const dbRef = ref(database)
    get(child(dbRef,"users")).then((snapshot)=>{
        var index = 0
        var users = []
        snapshot.forEach(childSnapshot=>{
            users.push(childSnapshot.val())
        });


        for(var i =0; i<users.length; i++){
            if(users[i].uid==uid){
                index = i
            }
        }
        console.log(users[index])

        const name = users[index].username
        const dob = users[index].dob
        const email = users[index].email

        var dobArr = dob.split("-")
        console.log(dobArr)
        const year = dobArr[0]
        const month = dobArr[1]
        const day = dobArr[2]

        var str = 
        `
        <div class="d-flex justify-content-center row mt-5 mb-4">

        <div class="col-md-auto d-flex justify-content-center">
          <div></div>
            <label for="photo">
              <img id='preview' src="profile_graphics.png" class="img-fluid mb-4" style="border-radius:10px ; max-width:300px"; width:100% />
            </label>
          </div>

          <div class="col-md-auto">
            <div style="overflow-x:auto;">
              <table class="mx-auto text-center">
                <th colspan="2">
                  <h3 class="fw-semibold mb-3 ">Personal Details</h3>
                </th>
                <tr>
                  <td><h6 class="p-2">Name</h6></td>
                  <td style="background-color:#dbe6da; padding-left: 10px; padding-right: 10px; border-radius: 10px;font-size: small; text-align: start; font-family: Montserrat, sans-serif;">
                  ${name}
                  </td>
                </tr>

                <tr>
                  <td><h6 class="p-2">Birthday</h6></td>
                  <td style="background-color:#dbe6da; padding-left: 10px; padding-right: 10px; border-radius: 10px; font-size: small; text-align: start; font-family: Montserrat, sans-serif;">
                    ${day}/${month}/${year}
                  </td>
                </tr>

                <tr>
                  <td><h6 class="p-2">Email</h6></td>
                  <td style="background-color:#dbe6da; padding-left: 10px; padding-right: 10px;  border-radius: 10px;font-size: small; text-align: start; font-family: Montserrat, sans-serif;">
                    ${email}
                  </td>
                </tr>
              </table>
            </div>
          </div>
      </div>
        `

        profileDetails.innerHTML = str

})
}