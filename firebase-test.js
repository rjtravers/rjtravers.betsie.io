import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsNY1g6iCHzQUrJt_4Na5zTd7p1NBU2XI",
    authDomain: "betsie-cb801.firebaseapp.com",
    projectId: "betsie-cb801",
    storageBucket: "betsie-cb801.firebasestorage.app",
    messagingSenderId: "785908965472",
    appId: "1:785908965472:web:70aa7d665173be51066305",
    measurementId: "G-3H33TYHW3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test connection function
async function testFirebaseConnection() {
    const statusElement = document.getElementById('connectionStatus');
    
    try {
        // Try to access Firestore
        const testCollection = collection(db, 'test_collection');
        await getDocs(testCollection);
        
        // If we get here, connection was successful
        statusElement.textContent = 'Status: ✅ Connected to Firebase successfully!';
        statusElement.style.color = 'green';
        console.log('Firebase connection successful!');
    } catch (error) {
        // If there's an error, connection failed
        statusElement.textContent = `Status: ❌ Connection failed: ${error.message}`;
        statusElement.style.color = 'red';
        console.error('Firebase connection error:', error);
    }
}

// Add click event listener to the test button
document.getElementById('testConnection').addEventListener('click', testFirebaseConnection);

// Log that the script has loaded
console.log('Firebase test script loaded successfully');
