require('dotenv').config({ path: '../.env' });  // Explicitly specify the path to .env file

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Check if DB_URI is loaded correctly
if (!process.env.DB_URI) {
    console.error('DB_URI is not defined in .env file');
    process.exit(1);
}

// Connect to MongoDB
connectDB();

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('MongoDB Connection Test Successful!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
