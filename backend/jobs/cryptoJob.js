const schedule = require('node-schedule');
const CryptoData = require('../models/CryptoData');
const { fetchCryptoData } = require('../services/coinGeckoService');

// Coins to track
const coins = ['bitcoin', 'matic-network', 'ethereum'];

// Background job to fetch and store data every 2 hours
const startCryptoJob = () => {
    schedule.scheduleJob('0 */2 * * *', async () => {
        console.log('Running scheduled job to fetch crypto data...');
        try {
            for (const coin of coins) {
                const data = await fetchCryptoData(coin);
                await CryptoData.create({ coin, ...data });
                console.log(`Data stored for ${coin}`);
            }
        } catch (error) {
            console.error('Error during scheduled job:', error.message);
        }
    });
};

module.exports = startCryptoJob;
