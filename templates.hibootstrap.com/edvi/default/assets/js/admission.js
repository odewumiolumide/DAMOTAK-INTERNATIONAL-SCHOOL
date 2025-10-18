 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

  // ✅ Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCiy2VaTfnuO7eEPL0_kD_WIHcDMB2T6Xs",
    authDomain: "damotak-international-da-230d5.firebaseapp.com",
    databaseURL: "https://damotak-international-da-230d5-default-rtdb.firebaseio.com",
    projectId: "damotak-international-da-230d5",
    storageBucket: "damotak-international-da-230d5.firebasestorage.app",
    messagingSenderId: "947496867501",
    appId: "1:947496867501:web:527ecd025aa713a9a2d824"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // 🧾 Form submit event
  const form = document.getElementById("admissionForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Disable button temporarily to prevent double-clicks
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;

    // Collect all form data
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    const student = {
      firstName,
      lastName,
      email: document.getElementById("email").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      className: document.getElementById("className").value.trim(),
      joinDate: document.getElementById("joinDate").value,
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      // ⏱ Generate lightweight unique ID for fast write
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const studentID = `${firstName}-${lastName}${randomNum}`.replace(/\s+/g, '').toLowerCase();

      // 🚀 Write operation (fast and reliable)
      const writeStart = performance.now();
      await set(ref(db, "Admission Form/" + studentID), student);
      const writeEnd = performance.now();

      const duration = ((writeEnd - writeStart) / 1000).toFixed(2);

      // ✅ Success message (no ID shown)
      showModal(`✅ Admission Submitted Successfully!`);

      // Reset form
      form.reset();
    } catch (error) {
      console.error("🔥 Error saving to Firebase:", error);
      showModal("❌ Error submitting admission form. Please try again.");
    } finally {
      // Re-enable submit button after 3 seconds
      setTimeout(() => {
        if (submitButton) submitButton.disabled = false;
      }, 3000);
    }
  });

  // 🪄 Simple modal popup
  function showModal(message) {
    const messageEl = document.getElementById("modalMessage");
    if (messageEl) messageEl.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById("notificationModal"));
    modal.show();
  }

  // 🧠 Handle traffic and network errors gracefully
  window.addEventListener("error", (e) => {
    console.error("Unhandled error:", e.message);
  });

  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled Promise Rejection:", e.reason);
  });