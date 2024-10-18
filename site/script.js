window.onload = function() {
          console.log("This is coming from site/script.js");
};

fetch('/rjtravers.betsie.io/header/index.html')  // Add your actual repository name here
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
