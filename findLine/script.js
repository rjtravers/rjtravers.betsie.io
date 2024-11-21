async function theOddsGetQuota() {
    const apiKey = '9ce55105dd73a67831f39e8acb3c3465'; // Store your API key securely
    const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const headers = response.headers;
        
        // Convert headers to a regular object if needed
        const headersObject = Object.fromEntries(headers.entries());
        return headersObject;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// To use the function:
theOddsGetQuota()
    .then(headers => {
        console.log('Response headers:', headers);
        document.getElementById("quota").textContent = headers['x-requests-remaining'] + " requests remaining";
    })
    .catch(error => {
        console.error('Error:', error);
    });

const submit = document.getElementById("submit");
submit.addEventListener('click', function(event) { 
    // Prevent the default form submission
    event.preventDefault();
    
    // Get the selected sport
    const sport = document.getElementById("sport");
    const selectedSport = sport.options[sport.selectedIndex].value;
    
    // Get the selected market
    const market = document.getElementById("ftMarket");
    const selectedMarket = market.options[market.selectedIndex].value;
    
    // Log the selected values
    console.log("Searching for " + selectedSport + " " + selectedMarket);

    // Select the lines container
    const linesContainer = document.getElementById('linesContainer');
    
    // Clear the container (equivalent to .empty() in jQuery)
    linesContainer.innerHTML = '';
    
    // Create the please wait paragraph
    const pleaseWait = document.createElement('p');
    pleaseWait.textContent = 'Fetching lines, please wait...';
    pleaseWait.id = 'pleaseWait';
    
    // Add the please wait paragraph to the container
    linesContainer.appendChild(pleaseWait);
    
}, false);
