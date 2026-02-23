import app from '/config/newconfig.js';
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage()
const storageref = sRef(storage);
// console.log(database)
let main = document.getElementById('main')
let count = 1
var main_user = null


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        main_user = user
        console.log("user is signed in")
        main.addEventListener("load", getAllDataOnce(main_user))
        // ...
    } else {
        // User is signed out
        // ...
        main_user = null
        main.addEventListener("load", getAllDataOnce(main_user))
    }
});



function getAllDataOnce(main_user) {
    const dbRef = ref(database)
    let fav = []
    get(child(dbRef, "roomie")).then((snapshot) => {
        var roomie = []
        snapshot.forEach(childSnapshot => {
            roomie.push(childSnapshot.val())

        });
        var smth =
            `
        <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        `
        // console.log(roomie)

        var roomieDiv = document.getElementById("roommates")
        for (var i = 0; i < roomie.length; i++) {
            // console.log(roomie[i])
            count += 1
            const rName = roomie[i].name
            const rAge = roomie[i].age
            var rLoc = ""
            const listId = roomie[i].listId
            for (var j = 0; j < roomie[i].location.length; j++) {
                rLoc += `${roomie[i].location[j]}, `
            }
            rLoc = rLoc.slice(0, -2)
            // console.log(pLoc.slice(0,-2))
            const rBudget = roomie[i].budget
            const rDuration = roomie[i].duration
            let url = "images/profile/noimage.jpg"
            if (roomie[i].roomieImg) {
                url = roomie[i].roomieImg
            }




            smth +=
                `
            <div class="col mb-3 gx-5">
                        <div class="card h-100" style='position:relative'  id="${listId}">
                            <input type="checkbox" id="heart${listId}" onchange="passValues(this)"><label  for="heart${listId}" >&#9829</label></input>
                            <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
                            <div class="card-body">
                                <a href="/roomielisting/roomieListing.html?listId=${listId}" id = "${listId}">
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

        smth += `</div>`
        roomieDiv.innerHTML = smth
        // console.log(roomieDiv)

    })

    get(child(dbRef, "property")).then((snapshot) => {
        var property = []
        snapshot.forEach(childSnapshot => {
            property.push(childSnapshot.val())
        });

        var propertyDiv = document.getElementById("lodgingDiv")
        var str = `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">`

        for (var i = 0; i < property.length; i++) {
            // console.log(property[i])
            const pInternet = property[i].internet

            const pTitle = property[i].title
            const pAdd = property[i].address
            const pRent = property[i].financial.rent
            const pBedroom = property[i].bedroomquantity
            const pBathroom = property[i].bathroomquantity
            const listId = property[i].listId
            let url = "images/room/no-property-photo.jpg"
            if (property[i].propertyImg) {
                url = property[i].propertyImg
            }

            // console.log(parseInt(pRent))
            if ((parseInt(pRent)) < 750) {
                var dNum = "one"
                var dSign = "$"
            }
            else if ((parseInt(pRent)) < 2000) {
                var dNum = "two"
                var dSign = "$$"
            }
            else{
                var dNum = "three"
                var dSign = "$$$"
            }

            if (pInternet == "Included") {
                var wificlass = "wifiavailable"
                var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>`
            }
            else {
                var wificlass = "nowifi"
                var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi-off"></i></span>`
            }

            // console.log(wificlass)

            str +=
                `
            <div class="col project_container ${dNum}dollar ${wificlass} room${pBedroom} mb-3" >
            <div class="card h-100" style='position:relative' >
                <input type="checkbox" id="heart${listId}" onchange="passValues(this)" ><label  for="heart${listId}" >&#9829</label></input>
                <img class="img-fluid card-img-top" style="object-fit:cover; height:150px" src=${url} alt="project-img">
                <div class="card-body">
                <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
                    <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
                </a>
                    

                    <div>
                        <span class="badge bg-danger m-1">${dSign}</span>
                        ${wifiline}
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

        str += "</div>"
        // console.log(propertyDiv)

        propertyDiv.innerHTML = str
    })
    if (main_user != null) {

        let uid = main_user.uid
        get(child(dbRef, "users/" + uid)).then((snapshot) => {
            let userInfo = snapshot.val()
            if (userInfo.favourite) {
                fav = userInfo.favourite
            }
            if (fav.length > 0) {
                get(child(dbRef, "roomie")).then((snapshot) => {
                    var roomie = []
                    snapshot.forEach(childSnapshot => {
                        roomie.push(childSnapshot.val())

                    });
                    var smth =
                        `
                <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
                `
                    // console.log(roomie)

                    var roomieDiv = document.getElementById("roommates")
                    for (var i = 0; i < roomie.length; i++) {
                        // console.log(roomie[i])
                        let isChecked = ""
                        for (var j = 0; j < fav.length; j++) {

                            if (fav[j] == roomie[i].listId) {
                                isChecked = "checked"
                            }
                        }
                        count += 1
                        const rName = roomie[i].name
                        const rAge = roomie[i].age
                        var rLoc = ""
                        const listId = roomie[i].listId
                        for (var j = 0; j < roomie[i].location.length; j++) {
                            rLoc += `${roomie[i].location[j]}, `
                        }
                        rLoc = rLoc.slice(0, -2)
                        // console.log(pLoc.slice(0,-2))
                        const rBudget = roomie[i].budget
                        const rDuration = roomie[i].duration
                        let url = "images/profile/noimage.jpg"
                        if (roomie[i].roomieImg) {
                            url = roomie[i].roomieImg
                        }




                        smth +=
                            `
                    <div class="col mb-3">
                                <div class="card h-100" style='position:relative'  id="${listId}">
                                    <input type="checkbox" id="heart${listId}" onchange="passValues(this)" ${isChecked}><label  for="heart${listId}" >&#9829</label></input>
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

                    smth += `</div>`
                    roomieDiv.innerHTML = smth
                    // console.log(roomieDiv)

                })
                get(child(dbRef, "property")).then((snapshot) => {
                    var property = []
                    snapshot.forEach(childSnapshot => {
                        property.push(childSnapshot.val())
                    });

                    var propertyDiv = document.getElementById("lodgingDiv")
                    var str = `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">`

                    for (var i = 0; i < property.length; i++) {
                        // console.log(property[i])
                        let isChecked2 = ""
                        for (var j = 0; j < fav.length; j++) {
                            if (fav[j] == property[i].listId) {
                                isChecked2 = "checked"
                            }
                        }
                        const pInternet = property[i].internet

                        const pTitle = property[i].title
                        const pAdd = property[i].address
                        const pRent = property[i].financial.rent
                        const pBedroom = property[i].bedroomquantity
                        const pBathroom = property[i].bathroomquantity
                        const listId = property[i].listId
                        let url = "images/room/no-property-photo.jpg"
                        if (property[i].propertyImg) {
                            url = property[i].propertyImg
                        }
                        if ((parseInt(pRent)) < 750) {
                            var dNum = "one"
                            var dSign = "$"
                        }
                        else if ((parseInt(pRent)) < 2000) {
                            var dNum = "two"
                            var dSign = "$$"
                        }
                        else{
                            var dNum = "three"
                            var dSign = "$$$"
                        }

                        if (pInternet == "Included") {
                            var wificlass = "wifiavailable"
                            var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>`
                        }
                        else {
                            var wificlass = "nowifi"
                            var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi-off"></i></span>`
                        }


                        str +=
                            `
                        <div class="col project_container ${dNum}dollar ${wificlass} room${pBedroom} mb-3" >
                        <div class="card h-100" style='position:relative' >
                            <input type="checkbox" id="heart${listId}" onchange="passValues(this)" ${isChecked2}><label  for="heart${listId}" >&#9829</label></input>
                            <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
                            <div class="card-body">
                            <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
                                <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
                            </a>
                                
            
                                <div>
                                    <span class="badge bg-danger m-1">${dSign}</span>
                                    ${wifiline}
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


                    str += "</div>"
                    // console.log(propertyDiv)

                    propertyDiv.innerHTML = str
                })
            }
            else {
                get(child(dbRef, "roomie")).then((snapshot) => {
                    var roomie = []
                    snapshot.forEach(childSnapshot => {
                        roomie.push(childSnapshot.val())

                    });
                    var smth =
                        `
        <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        `
                    // console.log(roomie)

                    var roomieDiv = document.getElementById("roommates")
                    for (var i = 0; i < roomie.length; i++) {
                        // console.log(roomie[i])
                        count += 1
                        const rName = roomie[i].name
                        const rAge = roomie[i].age
                        var rLoc = ""
                        const listId = roomie[i].listId
                        for (var j = 0; j < roomie[i].location.length; j++) {
                            rLoc += `${roomie[i].location[j]}, `
                        }
                        rLoc = rLoc.slice(0, -2)
                        // console.log(pLoc.slice(0,-2))
                        const rBudget = roomie[i].budget
                        const rDuration = roomie[i].duration
                        let url = "images/profile/noimage.jpg"
                        if (roomie[i].roomieImg) {
                            url = roomie[i].roomieImg
                        }




                        smth +=
                            `
            <div class="col mb-3">
                        <div class="card h-100" style='position:relative'  id="${listId}">
                            <input type="checkbox" id="heart${listId}" onchange="passValues(this)"><label  for="heart${listId}" >&#9829</label></input>
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

                    smth += `</div>`
                    roomieDiv.innerHTML = smth
                    // console.log(roomieDiv)

                })

                get(child(dbRef, "property")).then((snapshot) => {
                    var property = []
                    snapshot.forEach(childSnapshot => {
                        property.push(childSnapshot.val())
                    });

                    var propertyDiv = document.getElementById("lodgingDiv")
                    var str = `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">`

                    for (var i = 0; i < property.length; i++) {
                        // console.log(property[i])
                        const pInternet = property[i].internet

                        const pTitle = property[i].title
                        const pAdd = property[i].address
                        const pRent = property[i].financial.rent
                        const pBedroom = property[i].bedroomquantity
                        const pBathroom = property[i].bathroomquantity
                        const listId = property[i].listId
                        let url = "images/room/no-property-photo.jpg"
                        if (property[i].propertyImg) {
                            url = property[i].propertyImg
                        }

                        // console.log(parseInt(pRent))
                        if ((parseInt(pRent)) < 750) {
                            var dNum = "one"
                            var dSign = "$"
                        }
                        else if ((parseInt(pRent)) < 2000) {
                            var dNum = "two"
                            var dSign = "$$"
                        }
                        else{
                            var dNum = "three"
                            var dSign = "$$$"
                        }



                        if (pInternet == "Included") {
                            var wificlass = "wifiavailable"
                            var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>`
                        }
                        else {
                            var wificlass = "nowifi"
                            var wifiline = `<span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi-off"></i></span>`
                        }

                        // console.log(dNum)
                        // console.log(wificlass)

                        str +=
                            `
            <div class="col project_container ${dNum}dollar ${wificlass} room${pBedroom} mb-3" >
            <div class="card h-100" style='position:relative' >
                <input type="checkbox" id="heart${listId}" onchange="passValues(this)" ><label  for="heart${listId}" >&#9829</label></input>
                <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
                <div class="card-body">
                <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
                    <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
                </a>
                    

                    <div>
                        <span class="badge bg-danger m-1">${dSign}</span>
                        ${wifiline}
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

                    str += "</div>"
                    // console.log(propertyDiv)

                    propertyDiv.innerHTML = str
                })
            }


        })
    }

    else {
    

    }


    // console.log("test")
    // get(child(dbRef, "roomie")).then((snapshot) => {
    //     var roomie = []
    //     snapshot.forEach(childSnapshot => {
    //         roomie.push(childSnapshot.val())

    //     });
    //     var smth =
    //         `
    //     <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
    //     `
    //     // console.log(roomie)

    //     var roomieDiv = document.getElementById("roommates")
    //     for (var i = 0; i < roomie.length; i++) {
    //         // console.log(roomie[i])
    //         count += 1
    //         const rName = roomie[i].name
    //         const rAge = roomie[i].age
    //         var rLoc = ""
    //         const listId = roomie[i].listId
    //         for (var j = 0; j < roomie[i].location.length; j++) {
    //             rLoc += `${roomie[i].location[j]}, `
    //         }
    //         rLoc = rLoc.slice(0, -2)
    //         // console.log(pLoc.slice(0,-2))
    //         const rBudget = roomie[i].budget
    //         const rDuration = roomie[i].duration
    //         let url = "images/profile/noimage.jpg"
    //         if (roomie[i].roomieImg) {
    //             url = roomie[i].roomieImg
    //         }




    //         smth +=
    //             `
    //         <div class="col mb-3">
    //                     <div class="card h-100" style='position:relative'  id="${listId}">
    //                         <input type="checkbox" id="heart${i}" onchange="passValues(this)"><label  for="heart${i}" >&#9829</label></input>
    //                         <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
    //                         <div class="card-body">
    //                             <a href="/roomieListing/roomieListing.html?listId=${listId}" id = "${listId}">
    //                                 <h5 class="card-title text-success fw-bolder">${rName}, ${rAge}</h5>
    //                             </a>
    //                             <div class="card-text d-flex pb-2">
    //                                 <span><i class="bi bi-geo-alt-fill" ></i></span>
    //                                 <div class="fw-light fs-6 px-2">${rLoc}</div>
    //                             </div>
    //                             <div class="card-text d-flex pb-2">
    //                                 <span><i class="bi bi-currency-dollar"></i></span>
    //                                 <div class="fw-light fs-6 px-2">${rBudget} / month</div>
    //                             </div>
    //                             <div class="card-text d-flex pb-2">
    //                                 <span>              
    //                                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock-fill mb-1 me-1" viewBox="0 0 16 16">
    //                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
    //                                     </svg>
    //                                 </span>
    //                                 <div class="fw-light fs-6 px-2">${rDuration} month(s)</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //         `
    //     }

    //     smth += `</div>`
    //     roomieDiv.innerHTML = smth
    //     // console.log(roomieDiv)

    // })

    // get(child(dbRef, "property")).then((snapshot) => {
    //     var property = []
    //     snapshot.forEach(childSnapshot => {
    //         property.push(childSnapshot.val())
    //     });

    //     var propertyDiv = document.getElementById("lodgingDiv")
    //     var str = `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">`

    //     for (var i = 0; i < property.length; i++) {
    //         console.log(property[i])
    //         const pInternet = property[i].internet

    //         const pTitle = property[i].title
    //         const pAdd = property[i].address
    //         const pRent = property[i].financial.rent
    //         const pBedroom = property[i].bedroomquantity
    //         const pBathroom = property[i].bathroomquantity
    //         const listId = property[i].listId
    //         let url = "images/room/no-property-photo.jpg"
    //         if (property[i].propertyImg) {
    //             url = property[i].propertyImg
    //         }

    //         console.log(parseInt(pRent))
    //         if (parseInt(pRent) < 750) {
    //             var dNum = "one"
    //             var dSign = "$"
    //         }
    //         else if (parseInt(pRent) < 2000) {
    //             var dNum = "two"
    //             var dSign = "$$"
    //         }
    //         else if (parseInt(pRent) < 750) {
    //             var dNum = "three"
    //             var dSign = "$$$"
    //         }

    //         if (pInternet == "included") {
    //             var wificlass = "wifiavailable"
    //         }
    //         else {
    //             var wificlass = "nowifi"
    //         }

    //         console.log()

    //         str +=
    //             `
    //         <div class="col project_container ${dNum}dollar ${wificlass} room${pBedroom} mb-3" >
    //         <div class="card h-100" style='position:relative' >
    //             <input type="checkbox" id="heart${count + i}" onchange="passValues(this)" ><label  for="heart${count + i}" >&#9829</label></input>
    //             <img class="img-fluid card-img-top" style="object-fit:cover; height:150px" src=${url} alt="project-img">
    //             <div class="card-body">
    //             <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
    //                 <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
    //             </a>
                    

    //                 <div>
    //                     <span class="badge bg-danger m-1">${dSign}</span>
    //                     <span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>
    //                     <span class="badge bg-info text-dark m-1">${pBedroom} room(s)</span>
    //                 </div>
    //                 <div class="card-text d-flex pb-2 mt-2">
    //                     <span><i class="bi bi-geo-alt-fill" ></i></span>
    //                     <div class="fw-light fs-6 px-2">${pAdd}</div>
    //                 </div>
    //                 <div class="card-text d-flex pb-2">
    //                     <span><i class="bi bi-currency-dollar"></i></span>
    //                     <div class="fw-light fs-6 px-2">${pRent} / month</div>
    //                 </div>
    //                 <div class="card-text d-flex pb-2">
    //                     <div class="d-flex px-2">
    //                         <span><i class="fa fa-bed"></i></span>
    //                         <div class="fw-bolder fs-6">&nbsp;${pBedroom}</div>
    //                     </div>
    //                     <div class="d-flex px-2">
    //                         <span><i class="fa fa-bath"></i></span>
    //                         <div class="fw-bolder fs-6">&nbsp;${pBathroom}</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //         `
    //     }

    //     str += "</div>"
    //     console.log(propertyDiv)

    //     propertyDiv.innerHTML = str
    // })


}









