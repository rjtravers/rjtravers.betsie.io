<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Your Site</title>
    <!-- Add Firebase SDK via CDN (this is required) -->
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
        
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
        const analytics = getAnalytics(app);
    </script>
    
    <!-- Your custom JavaScript file -->
    <script type="module" src="app.js" defer></script>
</head>
<body>
    <!-- Your website content here -->
</body>
</html>
