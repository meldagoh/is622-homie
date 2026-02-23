import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjHnf4J60cmRVPvRx60iB1HdtYDoFus-8",
    authDomain: "wad2-login.firebaseapp.com",
    projectId: "wad2-login",
    storageBucket: "wad2-login.appspot.com",
    messagingSenderId: "416797111775",
    appId: "1:416797111775:web:f572cad671caf62a1a806a",
    databaseURL: "https://wad2-login-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app