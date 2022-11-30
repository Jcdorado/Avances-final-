import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"


const firebaseConfig = {
    apiKey: "AIzaSyBtKwXTAw5AOdYb28Bg40h4CMhtkJ1ipuA",
    authDomain: "instagram-clone-aa227.firebaseapp.com",
    projectId: "instagram-clone-aa227",
    storageBucket: "instagram-clone-aa227.appspot.com",
    messagingSenderId: "1091522276714",
    appId: "1:1091522276714:web:3d0d27d7d4a3e38a644913"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let mail;
let userName;


//Asignar nombre de usuario a los usuarios y otros datos;
onAuthStateChanged(auth, (user) => {
    if (user) {
        
        mail = user.email;
        if (mail) {
            userName = mail.split('@')[0];
            console.log(userName);
        }

        let user_name = document.getElementById("create-user-name");
        if (user_name) {

            user_name.innerText = userName;
        }

    } else {
        // ...
        window.location.href = "./";
    }
});


//Register 
let buttonRegister = document.getElementById('register-button');
if (buttonRegister) { 
    buttonRegister.addEventListener('click', (e) => register(e));

    function register(e) {
        e.preventDefault();
        let user = [{ email: "" }, { password: "" }]

        user.email = document.getElementById('registerEmail')?.value;
        user.password = document.getElementById('registerPassword')?.value;

        //Call firebase function 
        newUser(user.email, user.password);

        document.getElementById('registerEmail').value = "";
        document.getElementById('registerPassword').value = "";
        document.getElementById('registerUser').value = "";
        document.getElementById('registerName').value = "";
    }

    function newUser(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
}


//Log in

let buttonSignIn = document.getElementById('sign-in-button');
if (buttonSignIn) { 
    buttonSignIn.addEventListener('click', (e) => logIn(e));

    function logIn(e) {
        e.preventDefault();
        let user = [{ email: "" }, { password: "" }]

      
        user.email = document.getElementById('loginName')?.value;
        user.password = document.getElementById('loginPassword')?.value;


        singInUser(user.email, user.password);
    }


    function singInUser(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                const user = userCredential.user;
                console.log("Log in succesfull");
                window.location.href = "./main";

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Log in error: ", errorCode, errorMessage)
            });
    }
}


