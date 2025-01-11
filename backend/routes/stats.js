const express = require('express');
const CryptoData = require('../models/CryptoData');

const router = express.Router();

// Fetch latest data for a given cryptocurrency
router.get('/stats', async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin) return res.status(400).json({ error: 'Coin is required' });

        const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) return res.status(404).json({ error: 'No data found for the specified coin' });
        
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            change24h: latestData.change24h,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
