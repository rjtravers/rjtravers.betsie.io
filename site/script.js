window.onload = function() {
          console.log("This is coming from site/script.js");
};

fetch('header/index.html')
          .then(response => response.text())
          .then(data => {
                    document.getElementById('header').innerHTML = data;
});
