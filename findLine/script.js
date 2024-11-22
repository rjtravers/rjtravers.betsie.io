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
