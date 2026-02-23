import app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);
const dbRef = ref(database)
let count = 0
let tempArr = ""
let currentLocal = ""
if (localStorage.getItem('favourites') != null) {
    currentLocal = localStorage.getItem('favourites')
    tempArr = currentLocal.split(",")

}


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (tempArr.length > 0) {
            update(ref(database, 'users/' + uid), {
                favourite: tempArr
            })

            localStorage.clear()
        }

        get(child(dbRef, "users/" + uid)).then((snapshot) => {
            let userInfo = snapshot.val()
            console.log(userInfo)
            if (userInfo.favourite) {
                
                let str =""
                for (var i = 0; i < userInfo.favourite.length; i++) {
                    get(child(dbRef, `property/${userInfo.favourite[i]}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            let property = snapshot.val();
                            const pInternet = property.internet
                            const pTitle = property.title
                            const pAdd = property.address
                            const pRent = property.financial.rent
                            const pBedroom = property.bedroomquantity
                            const pBathroom = property.bathroomquantity
                            const listId = property.listId
                            let url = "images/room/no-property-photo.jpg"
                            if (property.propertyImg) {
                                url = property.propertyImg
                            }

                            if (parseInt(pRent) < 750) {
                                var dNum = "one"
                                var dSign = "$"
                            }
                            else if (parseInt(pRent) < 2000) {
                                var dNum = "two"
                                var dSign = "$$"
                            }
                            else{
                                var dNum = "three"
                                var dSign = "$$$"
                            }
    
                            if (pInternet == "included") {
                                var wificlass = "wifiavailable"
                            }
                            else {
                                var wificlass = "nowifi"
                            }
                            
                            str +=
                            `
                        <div class="col project_container ${dNum}dollar ${wificlass} room${pBedroom} mb-3" >
                        <div class="card h-100" style='position:relative' >
                            <input type="checkbox" id="heart${listId}" onchange="passValues(this)" checked><label  for="heart${listId}" >&#9829</label></input>
                            <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
                            <div class="card-body">
                            <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
                                <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
                            </a>
                                
            
                                <div>
                                    <span class="badge bg-danger m-1">${dSign}</span>
                                    <span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>
                                    <span class="badge bg-info text-dark m-1">${pBedroom} room(s)</span>
                                </div>
                                <div class="card-text d-flex pb-2 mt-2">
                                    <span><i class="bi bi-geo-alt-fill" ></i></span>
                                    <div class="fw-light fs-6 px-2">${pAdd}</div>
                                </div>
                                <div class="card-text d-flex pb-2">
                                    <span><i class="bi bi-currency-dollar"></i></span>
                                    <div class="fw-light fs-6 px-2">${pRent} / month</div>
                                </div>
                                <div class="card-text d-flex pb-2">
                                    <div class="d-flex px-2">
                                        <span><i class="fa fa-bed"></i></span>
                                        <div class="fw-bolder fs-6">&nbsp;${pBedroom}</div>
                                    </div>
                                    <div class="d-flex px-2">
                                        <span><i class="fa fa-bath"></i></span>
                                        <div class="fw-bolder fs-6">&nbsp;${pBathroom}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                        }
                })
                    get(child(dbRef, `roomie/${userInfo.favourite[i]}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            let roomie = snapshot.val();
                            const rName = roomie.name
                            const rAge = roomie.age
                            var rLoc = ""
                            const listId = roomie.listId
                            for (var j = 0; j < roomie.location.length; j++) {
                                rLoc += `${roomie.location[j]}, `
                            }
                            rLoc = rLoc.slice(0, -2)
                            // console.log(pLoc.slice(0,-2))
                            const rBudget = roomie.budget
                            const rDuration = roomie.duration
                            let url = "images/profile/noimage.jpg"
                            if (roomie.roomieImg) {
                                url = roomie.roomieImg
                            }


                            str += `
                            <div class="col mb-3">
                                        <div class="card h-100" style='position:relative'  id="${listId}">
                                            <input type="checkbox" id="heart${listId}" onchange="passValues(this)" checked><label  for="heart${listId}" >&#9829</label></input>
                                            <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
                                            <div class="card-body">
                                                <a href="/roomieListing/roomieListing.html?listId=${listId}" id = "${listId}">
                                                    <h5 class="card-title text-success fw-bolder">${rName}, ${rAge}</h5>
                                                </a>
                                                <div class="card-text d-flex pb-2">
                                                    <span><i class="bi bi-geo-alt-fill" ></i></span>
                                                    <div class="fw-light fs-6 px-2">${rLoc}</div>
                                                </div>
                                                <div class="card-text d-flex pb-2">
                                                    <span><i class="bi bi-currency-dollar"></i></span>
                                                    <div class="fw-light fs-6 px-2">${rBudget} / month</div>
                                                </div>
                                                <div class="card-text d-flex pb-2">
                                                    <span>              
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock-fill mb-1 me-1" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                        </svg>
                                                    </span>
                                                    <div class="fw-light fs-6 px-2">${rDuration} month(s)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            `
                        }
                        document.getElementById('result').innerHTML = str
                        
                    })

                

                }
            }
        })















    }

    else {
        // window.location = "/register,login/login.html"
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