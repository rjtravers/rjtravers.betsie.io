window.onload = function() {
          console.log("This is coming from site/script.js");
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
          apiKey: "AIzaSyBsNY1g6iCHzQUrJt_4Na5zTd7p1NBU2XI",
          authDomain: "betsie-cb801.firebaseapp.com",
          projectId: "betsie-cb801",
          storageBucket: "betsie-cb801.appspot.com",
          messagingSenderId: "785908965472",
          appId: "1:785908965472:web:70aa7d665173be51066305",
          measurementId: "G-3H33TYHW3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
