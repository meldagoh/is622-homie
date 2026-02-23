
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
// import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBjHnf4J60cmRVPvRx60iB1HdtYDoFus-8",
//     authDomain: "wad2-login.firebaseapp.com",
//     projectId: "wad2-login",
//     storageBucket: "wad2-login.appspot.com",
//     messagingSenderId: "416797111775",
//     appId: "1:416797111775:web:f572cad671caf62a1a806a",
//     databaseURL: "https://wad2-login-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth();
// const storage = getStorage()
// const storageref = sRef(storage);
// console.log(storageref)


// let signUp = document.getElementById('signUp')
// let loginBtn = document.getElementById('loginBtn')
//let signOutBtn = document.getElementById('signOut')
// let listRoomie = document.getElementById('listRoomie')
// let listProperty = document.getElementById('listProperty')
// let main = document.getElementById('main')
// let file = document.getElementById('inputFile')
// let mainproperty = document.getElementById("mainproperty")

// let main_user = null

// function GenerateId() {
//     return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
//   };
// main.addEventListener("load", getAllDataOnce())


// if (listRoomie != null) {
//     listRoomie.addEventListener("click", (e) => {
//         createRoomie()
//     })
// }

// if (listProperty != null) {
//     console.log("HI")
//     listProperty.addEventListener("click", (e) => {
//         createProperty()
//     })
// }



// if (signUp != null) {
//     signUp.addEventListener("click", (e) => {

//         const username = document.getElementById("username").value;
//         const dob = document.getElementById("dob").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById('password1').value;
//         const roommate = document.getElementById('inputRoommate').checked;
//         const landlord = document.getElementById('inputLandlord').checked;
//         var type = "Not Selected"
//         if (roommate == true) {
//             type = "Roommate";
//         }
//         else {
//             type = "Landlord";
//         }



//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed in 
//                 const user = userCredential.user;
//                 console.log(user.uid)
//                 set(ref(database, 'users/' + user.uid), {
//                     username: username,
//                     dob: dob,
//                     email: email,
//                     type: type
//                 })


//                 alert('Succesfully Registered!')
//                 window.location.href = "login.html"

//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 alert(errorMessage);
//                 // ..
//             });
//     })
// }


// if (loginBtn != null) {
//     loginBtn.addEventListener("click", (e) => {
//         const inputEmail = document.getElementById('inputEmail').value
//         const inputPassword = document.getElementById('inputPassword').value
//         signInWithEmailAndPassword(auth, inputEmail, inputPassword)
//             .then((userCredential) => {
//                 var currentdate = new Date()
//                 var datetime = "Last Login: " + currentdate.getDay() + "/" + currentdate.getMonth()
//                     + "/" + currentdate.getFullYear() + " @ "
//                     + currentdate.getHours() + ":"
//                     + currentdate.getMinutes()
//                 const user = userCredential.user;
//                 update(ref(database, 'users/' + user.uid), {
//                     last_login: datetime
//                 }

//                 )
//                 alert("Successfully logged in!")
//                 window.location.href = "/home.html";
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;

//                 alert(errorMessage)
//             });

//     })
// }

// if (signOutBtn != null) {
//     signOutBtn.addEventListener("click", (e) => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             alert("Successfully Signed Out!")
//         }).catch((error) => {
//             // An error happened.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             alert(errorMessage)

//         });
//     })
// }

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         main_user = user
//         console.log(main_user)
//         var testing1 = sRef(storage, `${main_user.uid}/profile/profileImg`)
//         console.log(testing1)
//         console.log("user logged in")
//         // ...
//     } else {
//         // User is signed out
//         // ...
//         main_user = null
//         console.log("user signed out")
//     }
// });

// function populateP()
//   {
//     var url = document.URL
//     console.log(url)
//     var id = url.substring(url.lastIndexOf('=') + 1)
//     console.log(id)

//     const dbRef = ref(database)
//     get(child(dbRef,"property")).then((snapshot)=>{
//         var index = 0
//         var property = []
//         snapshot.forEach(childSnapshot=>{
//             property.push(childSnapshot.val())
//         });
//         var roomListingDiv = document.getElementById("pListingDetails")
//         for(var i =0; i<property.length; i++){
//             // console.log(property[i].listId)
//             // console.log(id)
//             if(property[i].listId==id){
//                 index = i
//             }
//         }
//         console.log(property[index])
//         const pTitle = property[index].title
//         const pAdd = property[index].address
//         const pToiletNo = property[index].bathroomquantity
//         const pBedNo = property[index].bedroomquantity
        
//         const pRent = property[index].financial.rent
//         const pBills = property[index].financial.bills
//         const pDeposit = property[index].financial.deposit

//         const pType = property[index].property
//         const pFurnishing = property[index].furnishing
//         const pGender = property[index].gender
//         const pDate = property[index].date
//         const pDuration = property[index].duration

//         const pPlace = property[index].place
//         const pRoomie = property[index].roomies

//         const pPhone = property[index].contact.phone
//         const pEmail = property[index].contact.email
//         const pTele = property[index].contact.tele

//         var str = ``

//         str +=
//         `
//         <div id="listId">
//     <div class="row w-75 mx-auto mt-5">
//       <img src="../images/room/room1.jpg" alt="">
//       <h1 class="fw-bolder mt-3">${pTitle}</h1>
//       <h5 class="fw-bold">
//         <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-geo-alt-fill"
//           viewBox="0 0 16 16">
//           <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
//         </svg>
//         ${pAdd}
//       </h5>
//     </div>

//     <div class="d-flex p-5 mx-5 mt-0 pt-0 pb-0 col-5">
//     </div>
//   </div>


//   <div class="row w-75 mx-auto mt-5">
//     <h3 class="fw-bold">Facilities</h3>
//     <div class="bg-light px-2 mt-3 rounded-4">

//       <div class=" p-4 row ">
//           <div class=" p-4 col-3">
//           <img src="images/wifi.png" style='width:40px;height: 40px;' alt="">
//           <div><p class="mt-2 pe-4"> <br>Wifi </p></div>  
//           </div>
//           <div class="p-4 col-3">
//             <img src="images/water-closet.png" style='width:40px;height: 40px;' alt="">
//             <div><p class="  mt-2" style="white-space: nowrap;"> <br>${pToiletNo} toilet </p></div>  
//             </div>
//             <div class=" p-4 col-3">
//               <img src="images/bed.png" style='width:40px;height: 40px;' alt="">
//               <div><p class=" mt-2" style="white-space: nowrap;"> <br> ${pBedNo} bedrooms </p></div>  
//             </div>

//       </div>
//     </div>
//   </div>



//   <div class="row w-75 mx-auto mt-5">
//     <h3 class="fw-bold">Financial Information</h3>
//     <div class="bg-light p-4 mt-3 rounded-4">

//       <div class="d-flex justify-content-between">
//         <h6>
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-piggy-bank-fill me-1 mb-1" viewBox="0 0 16 16">
//             <path
//               d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
//           </svg>
//           Rent per month
//         </h6>
//         <div>
//           $${pRent}
//         </div>

//       </div>

//       <div class="d-flex justify-content-between">
//         <h6>
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-lightbulb-fill me-1 mb-1" viewBox="0 0 16 16">
//             <path
//               d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
//           </svg>
//           Bills
//         </h6>
//         <div>
//           ${pBills}
//         </div>
//       </div>

//       <div class="d-flex justify-content-between">
//         <h6>
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-shield-shaded me-1 mb-1" viewBox="0 0 16 16">
//             <path fill-rule="evenodd"
//               d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
//           </svg>
//           Security Deposit
//         </h6>
//         <div>
//           $${pDeposit}
//         </div>

//       </div>
//     </div>
//   </div>

//   <div class="row w-75 mx-auto mt-5">
//     <h3 class="fw-bold">Property Details</h3>
//     <div class="bg-light mt-3 p-4 rounded-4">

//       <div class="d-flex justify-content-between">
//         <h6 class="">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-house-fill  me-1" viewBox="0 0 16 16">
//             <path fill-rule="evenodd"
//               d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
//             <path fill-rule="evenodd"
//               d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
//           </svg>
//           Property Type
//         </h6>
//         <div c>
//           ${pType}
//         </div>
//       </div>

//       <div class="d-flex justify-content-between">
//         <h6 class="">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-lamp-fill  me-1" viewBox="0 0 16 16">
//             <path fill-rule="evenodd"
//               d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7Z" />
//             <path
//               d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z" />
//           </svg>
//           Room Furnishing
//         </h6>
//         <div class="mb-1">${pFurnishing}</div>
//       </div>

//       <div class="d-flex justify-content-between">
//         <h6 class="">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-person-heart me-1 mb-1" viewBox="0 0 16 16">
//             <path
//               d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
//           </svg>
//           Preferred Gender
//         </h6>
//         <div>
//           ${pGender}
//         </div>
//       </div>

//       <div class="d-flex justify-content-between">
//         <h6 class="">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-calendar-week-fill mb-1 me-1" viewBox="0 0 16 16">
//             <path
//               d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
//           </svg>
//           Available On
//         </h6>
//         <div>
//           ${pDate}
//         </div>
//       </div>

//       <div class="d-flex justify-content-between">
//         <h6 class="">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//             class="bi bi-clock-fill mb-1 me-1" viewBox="0 0 16 16">
//             <path
//               d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
//           </svg>
//           Stay Duration
//         </h6>
//         <div>
//           ${pDuration} months
//         </div>
//       </div>

//     </div>
//   </div>

//   <div class="row w-75 mx-auto mt-5">



//     <h3 class="fw-bold ">
//       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
//         class="bi bi-building mb-1 me-1 ms-2" viewBox="0 0 16 16">
//         <path fill-rule="evenodd"
//           d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
//         <path
//           d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
//       </svg>
//       More about the place
//     </h3>
//     <div class="bg-light py-3 px-2 rounded-4 mt-3">

//       <div class="px-4 py-2">
//         <div class="lh-lg">
//             ${pPlace}
//         </div>
//       </div>

//       <div class="p-2">

//       </div>
//     </div>


//   </div>



//   <div class="row w-75 mx-auto mt-5">



//     <h3 class="fw-bold">
//       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
//         class="bi bi-people mb-1 me-1 ms-2" viewBox="0 0 16 16">
//         <path
//           d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
//       </svg>
//       Meet the roomies
//     </h3>
//     <div class="bg-light py-3 px-2 rounded-4 mt-3">

//       <div class="px-4 py-2">
//         <div class="d-flex justify-content-between">

//         </div>
//         <div class="lh-lg">
//             ${pRoomie}
//         </div>
//       </div>

//       <div class="p-2">

//       </div>
//     </div>


//   </div>

//   <div class="row w-75 mx-auto mt-5">

//     <h3 class="fw-bold">
//       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
//         class="bi bi-postage mb-1 me-1 ms-2" viewBox="0 0 16 16">
//         <path
//           d="M4.75 3a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-8.5a.75.75 0 0 0-.75-.75h-6.5ZM11 12H5V4h6v8Z" />
//         <path
//           d="M3.5 1a1 1 0 0 0 1-1h1a1 1 0 0 0 2 0h1a1 1 0 0 0 2 0h1a1 1 0 1 0 2 0H15v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1h-1.5a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0H1v-1a1 1 0 1 0 0-2v-1a1 1 0 1 0 0-2V9a1 1 0 1 0 0-2V6a1 1 0 0 0 0-2V3a1 1 0 0 0 0-2V0h1.5a1 1 0 0 0 1 1ZM3 3v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
//       </svg>
//       Get in Touch
//     </h3>

//     <div class="bg-light p-4 rounded-4 mt-3">

//       <div class="p-2">
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//           class="bi bi-telephone-fill mb-1 me-1" viewBox="0 0 16 16">
//           <path fill-rule="evenodd"
//             d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
//         </svg>
//         ${pPhone}
//       </div>
//       <div class="p-2">
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//           class="bi bi-envelope-paper-fill mb-1 me-2" viewBox="0 0 16 16">
//           <path fill-rule="evenodd"
//             d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z" />
//         </svg>
//         ${pEmail}
//       </div>
//       <div class="p-2">
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
//           class="bi bi-telegram mb-1 me-2" viewBox="0 0 16 16">
//           <path
//             d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
//         </svg>
//         @${pTele}
//       </div>

//     </div>
//   </div>
//         `

//     roomListingDiv.innerHTML = str
//   })
// }

// mainproperty.addEventListener("load", populateP())

// console.log(mainproperty)



// function getAllDataOnce() {
//     const dbRef = ref(database)
//     // console.log(dbRef)

//     console.log("test")
//     get(child(dbRef, "roomie")).then((snapshot) => {
//         var roomie = []
//         snapshot.forEach(childSnapshot => {
//             roomie.push(childSnapshot.val())

//         });
//         var smth = 
//         `
//         <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
//         `
//         // console.log(roomie)

//         var roomieDiv = document.getElementById("roommates")
//         for(var i =0; i<roomie.length; i++){
//             // console.log(roomie[i])
//             const rName = roomie[i].name
//             const rAge = roomie[i].age
//             var pLoc = ""
//             const listId = roomie[i].listId
//             for(var j=0;j<roomie[i].location.length; j++){
//                 pLoc += `${roomie[i].location[j]}, `
//             }
//             pLoc = pLoc.slice(0,-2)
//             // console.log(pLoc.slice(0,-2))
//             const rBudget = roomie[i].budget
//             const rDuration = roomie[i].duration
//             let url = "images/profile/noimage.jpg"
//             if(roomie[i].roomieImg){
//                 url = roomie[i].roomieImg
//             }
            
            

            
//             smth += 
//             `
//             <div class="col mb-3">
//                         <div class="card h-100" style='position:relative'  id="card${i}">
//                             <input type="checkbox" id="heart${i}" onchange="passValues(this)"><label  for="heart${i}" >&#9829</label></input>
//                             <img class="img-fluid card-img-top" style="object-fit:cover; height:200px" src=${url} alt="project-img">
//                             <div class="card-body">
//                                 <a href="/roomieListing/roomieListing.html?listId=${listId}" id = "${listId}">
//                                     <h5 class="card-title text-success fw-bolder">${rName}, ${rAge}</h5>
//                                 </a>
//                                 <div class="card-text d-flex pb-2">
//                                     <span><i class="bi bi-geo-alt-fill" ></i></span>
//                                     <div class="fw-light fs-6 px-2">${pLoc}</div>
//                                 </div>
//                                 <div class="card-text d-flex pb-2">
//                                     <span><i class="bi bi-currency-dollar"></i></span>
//                                     <div class="fw-light fs-6 px-2">${rBudget} / month</div>
//                                 </div>
//                                 <div class="card-text d-flex pb-2">
//                                     <span>              
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock-fill mb-1 me-1" viewBox="0 0 16 16">
//                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
//                                         </svg>
//                                     </span>
//                                     <div class="fw-light fs-6 px-2">${rDuration} months</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//             `     
//         }

//         smth += `</div>`
//         roomieDiv.innerHTML=smth
//         // console.log(roomieDiv)

//     })

//     get(child(dbRef,"property")).then((snapshot)=>{
//         var property = []
//         snapshot.forEach(childSnapshot=>{
//             property.push(childSnapshot.val())
//         });
//         var str = 
//         `
//         <div class="mt-0 mb-3">
//                 <div class="btn-group mx-2">
//                     <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                     $
//                     </button>
//                     <ul class="dropdown-menu">
//                         <li><button class="dropdown-item text-center" onclick="show_one_dollar()" >$ (<750)</button></li>
//                         <li><button class="dropdown-item text-center" onclick="show_two_dollar()" >$$ (<2000)</button></li>
//                         <li><button class="dropdown-item text-center" onclick="show_three_dollar()" >$$$ (≥2000)</button></li>
//                     </ul>
//                 </div>

//                 <div class="btn-group mx-2">
//                     <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                     <i class="bi bi-wifi"></i>
//                     </button>
//                     <ul class="dropdown-menu">
//                     <li><button class="dropdown-item text-center" onclick="show_wifiavailable()" >Wifi included</button></li>
//                     <li><button class="dropdown-item text-center" onclick="show_nowifi()" >Wifi not included</button></li>
//                     </ul>
//                 </div>
//                 <div class="btn-group mx-2">
//                     <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                     No. of rooms
//                     </button>
//                     <ul class="dropdown-menu">
//                     <li><button class="dropdown-item text-center" onclick="show_one_room()">1 room</button></li>
//                     <li><button class="dropdown-item text-center" onclick="show_two_room()">2 rooms</button></li>
//                     <li><button class="dropdown-item text-center"  onclick="show_three_room()">≥ 3 rooms</button></li>
//                     </ul>
//                 </div>
//                 <!-- reset button -->
                
//                 <input class="btn btn-primary mx-2 my-2" type="reset" onclick='reset()' value="Reset">
//         </div>
            

//         <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
//         `

//         var propertyDiv = document.getElementById("lodging")
//         for(var i = 0; i<property.length; i++){
//             // console.log(property[i])
//             const pTitle = property[i].title
//             const pAdd = property[i].address
//             const pRent = property[i].financial.rent
//             const pBedroom = property[i].bedroomquantity
//             const pBathroom = property[i].bathroomquantity
//             const listId = property[i].listId
//             let url = "images/room/no-property-photo.jpg"
//             if(property[i].propertyImg){
//                 url = property[i].propertyImg
//             }
//             str +=
//             `
//             <div class="col project_container onedollar wifiavailable tworoom mb-3" >
//             <div class="card h-100" style='position:relative' >
//                 <input type="checkbox" id="heart1" onchange="passValues(this)" ><label  for="heart1" >&#9829</label></input>
//                 <img class="img-fluid card-img-top" style="object-fit:cover; height:150px" src=${url} alt="project-img">
//                 <div class="card-body">
//                 <a href="/propertyListing/index.html?listId=${listId}" id = "${listId}">
//                     <h5 class="card-title text-success fw-bolder" >${pTitle}</h5>
//                 </a>
                    

//                     <div>
//                         <span class="badge bg-danger m-1">$</span>
//                         <span class="badge bg-warning text-dark m-1"><i class="bi bi-wifi"></i></span>
//                         <span class="badge bg-info text-dark m-1">${pBedroom} rooms</span>
//                     </div>
//                     <div class="card-text d-flex pb-2 mt-2">
//                         <span><i class="bi bi-geo-alt-fill" ></i></span>
//                         <div class="fw-light fs-6 px-2">${pAdd}</div>
//                     </div>
//                     <div class="card-text d-flex pb-2">
//                         <span><i class="bi bi-currency-dollar"></i></span>
//                         <div class="fw-light fs-6 px-2">${pRent} / month</div>
//                     </div>
//                     <div class="card-text d-flex pb-2">
//                         <div class="d-flex px-2">
//                             <span><i class="fa fa-bed"></i></span>
//                             <div class="fw-bolder fs-6">&nbsp;${pBedroom}</div>
//                         </div>
//                         <div class="d-flex px-2">
//                             <span><i class="fa fa-bath"></i></span>
//                             <div class="fw-bolder fs-6">&nbsp;${pBathroom}</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             `
//         }

//         str+="</div>"
//         // console.log(propertyDiv)

//         propertyDiv.innerHTML=str
//     })


// }


// function createRoomie() {
    
//     const firstname = document.getElementById("firstname").value
//     const lastname = document.getElementById("lastname").value
//     const name = firstname + ' ' + lastname
//     const age = document.getElementById("age").value
//     const gender = document.getElementById("gender").value
//     const budget = document.getElementById("budget").value

//     const locations = []
//     const location = document.getElementsByName("location")
//     for(var checkedLoc of location){
//         if(checkedLoc.checked){
//             locations.push(checkedLoc.value)
//         }
//     }
//     // console.log(locations)

//     const rooms = document.getElementById("rooms").value
//     const date = document.getElementById("movedate").value
//     const duration = document.getElementById("duration").value
//     const introduction = document.getElementById("intro").value
//     const hobbies = document.getElementById("hobbies").value
//     const phone = document.getElementById("phone").value
//     const email = document.getElementById("email").value
//     const tele = document.getElementById("tele").value

//     if (firstname != "" && lastname != "" && age!="" && gender!="" && budget != "" && locations != null && rooms != "" && date != ""
//         && duration != "" && introduction != "" && hobbies != "" && phone != "" && email != "" && tele != "" && main_user != null) {
//         set(ref(database, 'roomie/' + main_user.uid), {
//             name: name,
//             age: age,
//             gender: gender,
//             budget: budget,
//             location: locations,         
//             rooms: rooms,
//             movedate: date,
//             duration: duration,
//             intro: introduction,
//             hobbies: hobbies,
//             listId: id
//         })

//         set(ref(database, `roomie/${main_user.uid}/contact`), {
//             phone: phone,
//             email: email,
//             tele: tele,
//         })

//         alert('roomie listed')
//         console.log("listed")
//         uploadProfileImage()
//         // setTimeout(function(){
//         //     window.location.href = "../home.html#project-area";
//         //  }, 2000);
//         // alert("Loading...") 
         
//     }
// }

// function uploadProfileImage() {

//     if (file.files.length > 0) {
//         var thisref = sRef(storage, `${main_user.uid}/profile/profileImg`)
//         console.log(file.files[0])
//         uploadBytes(thisref, file.files[0]).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//             getDownloadURL(thisref)
//                 .then((url) => {
//                     // Insert url into an <img> tag to "download"
//                     console.log(url)
//                     update(ref(database, 'users/' + main_user.uid), {
//                         profileImage: url
//                     })
//                     update(ref(database, 'roomie/' + main_user.uid), {
//                         roomieImg: url
//                     })
//                 })
//                 .catch((error) => {
//                     // A full list of error codes is available at
//                     // https://firebase.google.com/docs/storage/web/handle-errors
//                     switch (error.code) {
//                         case 'storage/object-not-found':
//                             // File doesn't exist
//                             break;
//                         case 'storage/unauthorized':
//                             // User doesn't have permission to access the object
//                             break;
//                         case 'storage/canceled':
//                             // User canceled the upload
//                             break;

//                         // ...

//                         case 'storage/unknown':
//                             // Unknown error occurred, inspect the server response
//                             break;
//                     }
//                 })

//         });



//     }


//     // else{
//     //     alert("No files selected!")
//     // }

// }

// function uploadListingImage(id) {

//     if (file.files.length > 0) {
//         var thisref = sRef(storage, `${main_user.uid}/Listing/${id}`)
//         console.log(file.files[0])
//         uploadBytes(thisref, file.files[0]).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//             getDownloadURL(thisref)
//                 .then((url) => {
//                     // Insert url into an <img> tag to "download"
//                     console.log(url)
//                     update(ref(database, 'property/' + id), {
//                         propertyImg: url
//                     })
//                 })
//                 .catch((error) => {
//                     // A full list of error codes is available at
//                     // https://firebase.google.com/docs/storage/web/handle-errors
//                     switch (error.code) {
//                         case 'storage/object-not-found':
//                             // File doesn't exist
//                             break;
//                         case 'storage/unauthorized':
//                             // User doesn't have permission to access the object
//                             break;
//                         case 'storage/canceled':
//                             // User canceled the upload
//                             break;

//                         // ...

//                         case 'storage/unknown':
//                             // Unknown error occurred, inspect the server response
//                             break;
//                     }
//                 })

//         });



//     }


//     // else{
//     //     alert("No files selected!")
//     // }

// }


// function createProperty() {
//     const title = document.getElementById("title").value
//     const address = document.getElementById("address").value
//     const bathroomquantity = document.getElementById("bathroomquantity").value
//     const bedroomquantity = document.getElementById("bedroomquantity").value
//     const internet = document.getElementById("internet").value
//     const rent = document.getElementById("rent").value
//     const bills = document.getElementById("bills").value
//     const deposit = document.getElementById("deposit").value
//     const property = document.getElementById("property").value
//     const furnishing = document.getElementById("furnishing").value
//     const gender = document.getElementById("gender").value
//     const date = document.getElementById("date").value
//     const duration = document.getElementById("duration").value

//     const place = document.getElementById("place").value
//     const roomies = document.getElementById("roomies").value

//     const phone = document.getElementById("phone").value
//     const email = document.getElementById("email").value
//     const tele = document.getElementById("tele").value
    
//     // console.log("bye")

//     if (title != "" && address!="" && bathroomquantity.value != "Choose Quantity" && bedroomquantity != "Choose Quantity"&& internet != ""
//         && rent != "" && bills != "" && deposit != "" && property != "" && furnishing != "" && gender != "" && date != "" && duration != ""
//         && place != "" && phone!="" && email!="" && tele!="" && main_user != null) {
//         let id = GenerateId()
//         set(ref(database, 'property/' + id), {
//             title: title,
//             address: address,
//             bedroomquantity: bedroomquantity,
//             bathroomquantity: bathroomquantity,
//             internet: internet,
//             property: property,
//             furnishing: furnishing,
//             gender: gender,
//             date: date,
//             duration: duration,
//             place: place,
//             roomies: roomies,
//             uid: main_user.uid,
//             listId: id
//         })

//         set(ref(database, `property/${id}/financial`), {
//             rent: rent,
//             bills: bills,
//             deposit: deposit,
//         })

//         set(ref(database, `property/${id}/contact`), {
//             phone: phone,
//             email: email,
//             tele: tele,
//         })

//         alert('property listed')
//         uploadListingImage(id)
//         setTimeout(function(){
//             window.location.href = "../home.html#project-area";
//          }, 2000);
//         alert("Loading...")
//     }

// }



