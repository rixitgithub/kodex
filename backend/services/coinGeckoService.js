const axios = require('axios');

// Fetch cryptocurrency data from CoinGecko
const fetchCryptoData = async (coinId) => {
    let attempt = 0;
    const maxAttempts = 5; // Max number of retry attempts
    const baseDelay = 1000; // 1 minute delay

    while (attempt < maxAttempts) {
        try {
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
            const { data } = await axios.get(url);

            if (!data[coinId]) throw new Error(`No data found for ${coinId}`);

            return {
                price: data[coinId].usd,
                marketCap: data[coinId].usd_market_cap,
                change24h: data[coinId].usd_24h_change,
            };
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Rate limit hit, retry after delay with exponential backoff
                attempt++;
                const delayTime = baseDelay * Math.pow(2, attempt); // Exponential backoff
                console.error(`Rate limit hit for ${coinId}. Retrying in ${delayTime / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delayTime)); // Wait before retrying
            } else {
                console.error(`Failed to fetch data for ${coinId}:`, error.message);
                throw error;
            }
        }
    }

    throw new Error(`Failed to fetch data for ${coinId} after ${maxAttempts} attempts`);
};

module.exports = { fetchCryptoData };
