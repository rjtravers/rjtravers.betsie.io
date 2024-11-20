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
    })
    .catch(error => {
        console.error('Error:', error);
    });
