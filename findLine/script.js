// Constants
const API_KEY = '9ce55105dd73a67831f39e8acb3c3465';
const BASE_URL = 'https://api.the-odds-api.com/v4';

// Utility function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }
    return response;
};

// Get API quota information
async function theOddsGetQuota() {
    try {
        const response = await fetch(`${BASE_URL}/sports/?apiKey=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const handledResponse = await handleResponse(response);
        const headers = handledResponse.headers;
        
        // Extract relevant quota information
        const quotaInfo = {
            remaining: headers.get('x-requests-remaining'),
            used: headers.get('x-requests-used'),
            total: headers.get('x-requests-limit')
        };
        
        return quotaInfo;
    } catch (error) {
        console.error('Error fetching quota:', error);
        throw error;
    }
}

// Get odds for a specific sport and market
async function getOdds(sport, market) {
    try {
        const response = await fetch(`${BASE_URL}/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=${market}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const handledResponse = await handleResponse(response);
        return await handledResponse.json();
    } catch (error) {
        console.error('Error fetching odds:', error);
        throw error;
    }
}

// Event listener setup
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quota display
    updateQuotaDisplay();
    
    // Setup form submission
    const submit = document.getElementById("submit");
    submit.addEventListener('click', handleFormSubmission);
});

// Update quota display
async function updateQuotaDisplay() {
    try {
        const quotaInfo = await theOddsGetQuota();
        const quotaElement = document.getElementById("quota");
        if (quotaElement) {
            console.log(quotaElement);
            quotaElement.textContent = `${quotaInfo.remaining} / ${quotaInfo.total} requests remaining`;
        }
    } catch (error) {
        console.error('Failed to update quota:', error);
        const quotaElement = document.getElementById("quota");
        if (quotaElement) {
            quotaElement.textContent = 'Failed to fetch quota information';
        }
    }
}

// Handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const sport = document.getElementById("sport");
    const market = document.getElementById("ftMarket");
    const selectedSport = sport.options[sport.selectedIndex].value;
    const selectedMarket = market.options[market.selectedIndex].value;
    
    const linesContainer = document.getElementById('linesContainer');
    linesContainer.innerHTML = '<p id="pleaseWait">Fetching lines, please wait...</p>';
    
    try {
        const oddsData = await getOdds(selectedSport, selectedMarket);
        displayOdds(oddsData);
    } catch (error) {
        linesContainer.innerHTML = `<p class="error">Error fetching odds: ${error.message}</p>`;
    }
}

// Display odds data
function displayOdds(oddsData) {
    const linesContainer = document.getElementById('linesContainer');
    linesContainer.innerHTML = ''; // Clear loading message
    
    if (!oddsData || oddsData.length === 0) {
        linesContainer.innerHTML = '<p>No odds data available for this selection.</p>';
        return;
    }
    
    // Create odds display (customize this based on your needs)
    oddsData.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-odds';
        gameElement.innerHTML = `
            <h3>${game.home_team} vs ${game.away_team}</h3>
            <p>Start time: ${new Date(game.commence_time).toLocaleString()}</p>
        `;
        linesContainer.appendChild(gameElement);
    });
}



// Assuming keyOddsAPI is defined elsewhere securely
async function theOddsGetFeaturedMarket(sport, market) {
    // Input validation
    if (!sport || !market) {
        throw new Error('Sport and market parameters are required');
    }

    // Construct the URL with proper encoding
    const baseUrl = 'https://api.the-odds-api.com/v4/sports';
    const url = `${baseUrl}/${encodeURIComponent(sport)}/odds/`;
    
    // Setup the query parameters
    const params = new URLSearchParams({
        regions: 'us',
        markets: market,
        oddsFormat: 'american',
        apiKey: keyOddsAPI
    });

    try {
        // Make the fetch request
        const response = await fetch(`${url}?${params}`);
        
        // Check if the response was successful
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }

        // Parse and return the JSON data
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching odds data:', error);
        throw error; // Re-throw to allow handling by the caller
    }
}

// Example usage:
// Add error handling when calling the function
async function displayFeaturedMarket(sport, market) {
    try {
        const oddsData = await theOddsGetFeaturedMarket(sport, market);
        console.log('Odds data:', oddsData);
        
        // Handle the data (example)
        if (oddsData && oddsData.length > 0) {
            // Process the odds data here
            oddsData.forEach(game => {
                console.log(`${game.home_team} vs ${game.away_team}`);
                // Add your display logic here
            });
        } else {
            console.log('No odds data available');
        }
        
    } catch (error) {
        console.error('Failed to get featured market:', error);
        // Handle the error appropriately (e.g., show user-friendly message)
    }
}

// Example of how to call the function
// displayFeaturedMarket('basketball_nba', 'h2h');
