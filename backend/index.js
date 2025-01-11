require('dotenv').config();  

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');
const startCryptoJob = require('./jobs/cryptoJob');

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.use('/api', statsRoute);
app.use('/api', deviationRoute);

startCryptoJob();

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
