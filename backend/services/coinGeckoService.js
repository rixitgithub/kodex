const axios = require('axios');

// Fetch cryptocurrency data from CoinGecko
const fetchCryptoData = async (coinId) => {
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
        console.error(`Failed to fetch data for ${coinId}:`, error.message);
        throw error;
    }
};

module.exports = { fetchCryptoData };
