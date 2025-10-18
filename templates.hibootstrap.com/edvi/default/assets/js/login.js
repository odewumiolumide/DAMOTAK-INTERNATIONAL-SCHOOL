// ----------------- IMPORTS -----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ----------------- FIREBASE CONFIG -----------------
const firebaseConfig = {
  apiKey: "AIzaSyCiy2VaTfnuO7eEPL0_kD_WIHcDMB2T6Xs",
  authDomain: "damotak-international-da-230d5.firebaseapp.com",
  databaseURL: "https://damotak-international-da-230d5-default-rtdb.firebaseio.com",
  projectId: "damotak-international-da-230d5",
  storageBucket: "damotak-international-da-230d5.firebasestorage.app",
  messagingSenderId: "947496867501",
  appId: "1:947496867501:web:44857bbf3d3ac0ada2d824"
};

// ----------------- INITIALIZE -----------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ----------------- LOGIN HANDLER -----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("loginError");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/Admin Page/wowdash.wowtheme7.com/demo/index.html";
    } catch (error) {
      errorBox.textContent = "Invalid email or password.";
    }
  });
}

// ----------------- PREVENT LOGGED USERS FROM SEEING LOGIN AGAIN -----------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    sessionStorage.setItem("adminLoggedIn", "true");
    window.location.href = "/Admin Page/wowdash.wowtheme7.com/demo/index.html";
  }
});
