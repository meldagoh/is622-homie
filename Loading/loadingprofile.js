import  app from '/config/newconfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // console.log(user.uid)
    setTimeout(function(){
        window.location.href = `../Profilepage/profile2.html?uid=${uid}`;
     }, 300);
    // ...
  } else {
    // User is signed out
    // ...
    setTimeout(function(){
        window.location.href = '../register,login/login.html';
     }, 300);
  }
});





