import  app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);

let mainroomie = document.getElementById("mainroomie")
mainroomie.addEventListener("load", populateR())

function populateR(){
    var url = document.URL
    console.log(url)
    var id = url.substring(url.lastIndexOf('=') + 1)
    console.log(id)

    const dbRef = ref(database)
    get(child(dbRef,"roomie")).then((snapshot)=>{
        var index = 0
        var roomie = []
        snapshot.forEach(childSnapshot=>{
            roomie.push(childSnapshot.val())
        });
        // var roomieListingDiv = document.getElementById("rListingDetails")
        for(var i =0; i<roomie.length; i++){
            if(roomie[i].listId==id){
                index = i
            }
        }
    
        console.log(roomie[index])

        const rName = roomie[index].name
        
        const rGender = roomie[index].gender
        const rAge = roomie[index].age 
        var rLoc = ""
        console.log(rLoc)
        for(var j=0;j<roomie[index].location.length; j++){
            rLoc += `${roomie[index].location[j]}, `
        }
        rLoc = rLoc.slice(0,-2)

        const rBudget = roomie[index].budget 
        const rRooms = roomie[index].rooms 
        const rDate = roomie[index].movedate 
        const rDuration = roomie[index].duration 

        const rIntro = roomie[index].intro
        const rHobbies = roomie[index].hobbies

        const rPhone = roomie[index].contact.phone
        const rEmail = roomie[index].contact.email
        const rTele = roomie[index].contact.tele 

        

        let rImage = "/images/profile/noimage.jpg"
        
        if(roomie[index].roomieImg){
            rImage = roomie[index].roomieImg
          }

        console.log(rImage)

        var str = ``

        str += 
        `
        <div id="rListingDetails">


            <div class="row w-75 mx-auto mt-5">
                <div style="width:20rem">
                    <img src="${rImage}" class=" " alt="..." style="height:20rem; width:100%">
                </div>
                
                <div class=" pt-5 col ">
                  <h1 class="fw-bold">Hello, my name is <br>${rName}.</h1>
                  <h6 class="mt-4">${rGender} | ${rAge} years old | Looking to stay in ${rLoc}</h6>
                </div>
            </div>

            <div class="w-75 mx-auto mb-5 mt-5">
                <h3 class="fw-bold ms-3">Lodging Details</h3>
                <div class="rounded-4 bg-light py-4 px-5">

                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-piggy-bank-fill me-2" viewBox="0 0 16 16">
                            <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          Budget per month
                        </h6>
                        <div>
                          $${rBudget}
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-house-fill me-2" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                            <path fill-rule="evenodd"
                            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg>
                            No. of Rooms
                        </h6>
                        <div>${rRooms}</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            Preferred Location
                        </h6>
                        <div>${rLoc}</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-calendar-week-fill me-2" viewBox="0 0 16 16">
                            <path
                            d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            Ready to Move On
                        </h6>
                        <div>${rDate}</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clock-fill me-2" viewBox="0 0 16 16">
                            <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            </svg>
                            Stay Duration
                        </h6>
                        <div>
                          ${rDuration} month(s)
                        </div>
                    </div>

                </div>
            </div>
            <!-- end of lodging details -->

            <div class="w-75 mx-auto mb-5 mt-5">

                <h3 class="fw-bold ms-3 ">Get to Know ${rName}</h3>

                <div class="rounded-4 bg-light py-4 px-5">

                    <div class="p-2 mb-3">

                        <div class="d-flex justify-content-between mb-2">
                          <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor"
                            class="bi bi-chat-square-heart-fill me-2" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                            </svg>
                            Introduction 
                          </h4>

                        </div>
            
                        <div>
                            ${rIntro}
                        </div>
                        
                    </div>

                    <div class="p-2">
                        <div class="d-flex justify-content-between mb-2">
                            <h4>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-hand-thumbs-up-fill me-2" viewBox="0 0 16 16">
                                <path  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                </svg>
                    
                                Hobbies
                            </h4>
                        </div>
                        <div>
                            ${rHobbies}
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-75 mx-auto mb-5">

                <h3 class="fw-bold ms-3">Get in Touch</h3>

                <div class="p-2 ">
                    <div class="d-flex justify-content-between ">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-telephone-fill me-2" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                        ${rPhone}
                        </p>
                    </div>
                </div>

                <div class="p-2 ">
                    <div class="d-flex justify-content-between ">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-envelope-paper-fill me-2" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                            d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z" />
                            </svg>
                            ${rEmail}
                        </p>
                  </div>
                </div>

                <div class="p-2">
                    <div class="d-flex justify-content-between ">
                        <p>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-telegram me-2" viewBox="0 0 16 16">
                            <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                            </svg>
                            @${rTele}
                        </p>
                    </div>
                </div>

            </div>
            
            <div class="w-75 mx-auto pb-5">
                <h5>
                    <span class="fw-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-signpost-split me-3" viewBox="0 0 16 16">
                        <path
                        d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z" />
                        </svg>
              
                        Or: find other roomies & lodgings <a href="/home.html#project-area">here</a>.
                    </span>
                </h5>
            </div>

        </div>
        `

        mainroomie.innerHTML = str

    })
}


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // alert("Successfully logged in!")
        console.log("user logged in")
        
        // ...
    } else {
        // User is signed out
        // ...
        console.log("user signed out")
        let timerInterval
        Swal.fire({
          title: 'Login To View',
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
  