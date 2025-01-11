require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cryptoRoute = require('./routes/crypto');
const startCryptoJob = require('./jobs/cryptoJob');

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.use('/api', cryptoRoute);

startCryptoJob();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
