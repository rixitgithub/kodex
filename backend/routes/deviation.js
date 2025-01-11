const express = require('express');
const CryptoData = require('../models/CryptoData');

const router = express.Router();

// Calculate standard deviation for a given cryptocurrency
router.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin) return res.status(400).json({ error: 'Coin is required' });

        const records = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length < 2) return res.status(400).json({ error: 'Not enough data to calculate deviation' });

        const prices = records.map((record) => record.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        console.log('Prices:', prices);
        console.log('Mean:', mean);
        console.log('Variance:', variance);
        console.log('Standard Deviation:', deviation);

        res.json({ deviation: parseFloat(deviation.toFixed(6)) }); // Increased precision
    } catch (error) {
        console.error('Error calculating deviation:', error);
        res.status(500).json({ error: 'Failed to calculate deviation' });
    }
});

module.exports = router;
