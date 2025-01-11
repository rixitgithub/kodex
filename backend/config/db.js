require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');

// Establish MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI); 
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
