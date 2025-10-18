 
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
   //First Importation//
  import {getAuth, createUserWithEmailAndPassword, signWithEmailAndPassword}  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
  import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBFPcykjzCFAgz8zIeWSWCTz_aQLrqAnJc",
    authDomain: "admin-login-form-dd979.firebaseapp.com",
    projectId: "admin-login-form-dd979",
    storageBucket: "admin-login-form-dd979.firebasestorage.app",
    messagingSenderId: "115726171949",
    appId: "1:115726171949:web:c5d6a4aae94c422e975da4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //First Importation//
  import {getAuth, createUserWithEmailAndPassword, signWithEmailAndPassword}  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
  import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
      messageDiv.style.opacity=0;
    },5000);
  }
  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const username=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
        username: username,
        email: email,
        password: password
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef,userData)
      .then(()=>{
        window.location.href='/templates.hibootstrap.com/edvi/default/signin.html';
      })
      .catch((error)=>{
        console.error("Error writing documnet", error);

      });
    })
    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already in use'){
        showMessage('Email Address Already Exist !!!', 'signUpMessage');
      }
      else{
        showMessage('unable to create Account', 'signUpMessage');
      }
    })
    
  })
