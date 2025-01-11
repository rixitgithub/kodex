const schedule = require('node-schedule');
const CryptoData = require('../models/CryptoData');
const { fetchCryptoData } = require('../services/coinGeckoService');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

// Function to delay execution between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startCryptoJob = () => {
    // Schedule the job to fetch data every 2 hours (for testing purposes, this interval can be adjusted)
    schedule.scheduleJob('0 */2 * * *', async () => {
        try {
            for (const coin of coins) {
                const data = await fetchCryptoData(coin);
                await CryptoData.create({ coin, ...data });
                await delay(2000);
            }
        } catch (error) {
            console.error('Error during scheduled job:', error.message);
        }
    });

    // Manually trigger the job immediately for testing or initialization
    (async () => {
        try {
            for (const coin of coins) {
                const data = await fetchCryptoData(coin);
                await CryptoData.create({ coin, ...data });
                await delay(2000);
            }
        } catch (error) {
            console.error('Error during manual job trigger:', error.message);
        }
    })();
};

module.exports = startCryptoJob;
