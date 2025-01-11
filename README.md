# Kodex Backend Project

## Overview

The **Kodex Backend** is a Node.js-based API designed to provide real-time cryptocurrency stats, calculate the standard deviation of cryptocurrency prices, and schedule regular data fetching. The backend is built using **Express.js**, **MongoDB**, and **Axios** to fetch data from external sources. The backend is deployed on **Render** for easy access.

---

## What I Did

1. **Implemented Real-Time Cryptocurrency Stats API**: 
   - Created an API endpoint (`/api/stats`) that accepts a `coin` query parameter and returns the latest cryptocurrency data, including price, market cap, and 24-hour change.
   
2. **Standard Deviation Calculation API**: 
   - Created another API endpoint (`/api/deviation`) that calculates the standard deviation of cryptocurrency prices over the last 100 records in the database.
   
3. **Job Scheduling**: 
   - Set up a background job using **node-schedule** to fetch new cryptocurrency data periodically (e.g., every hour) and store it in MongoDB. This ensures the data remains up-to-date.

4. **MongoDB Integration**: 
   - Integrated **Mongoose** to interact with MongoDB and store cryptocurrency data for future use.

5. **Deployment on Render**: 
   - Deployed the backend on **Render** for production use. This allows the backend to be accessed remotely.

---

## How I Did 

### Step 1: Setting Up the Project

1. **Node.js and Express.js**: 
   - Set up a basic **Express.js** server to handle HTTP requests and responses.

2. **MongoDB Setup**: 
   - Connected to MongoDB using **Mongoose** for storing and querying cryptocurrency data.
   
3. **API Implementation**: 
   - Created two API endpoints:
     - **`/api/stats`**: Fetches the latest cryptocurrency data.
     - **`/api/deviation`**: Calculates and returns the standard deviation of cryptocurrency prices.
   
4. **Job Scheduling**: 
   - Used **node-schedule** to run a scheduled job that fetches cryptocurrency data from an external source at regular intervals and stores it in the database.

5. **Environment Variables**: 
   - Used **dotenv** to manage environment variables such as the MongoDB URI and port number.

6. **Deployment**: 
   - Deployed the backend on **Render** to make it publicly accessible.

---

### Step 2: Testing the API

1. **Real-Time Stats API (`/api/stats`)**:
   - This endpoint accepts a `coin` query parameter and returns the latest data for the given cryptocurrency.
   
2. **Standard Deviation API (`/api/deviation`)**:
   - This endpoint calculates and returns the standard deviation of cryptocurrency prices based on the last 100 records stored in the database.

3. **Job Scheduling**:
   - The job runs periodically to fetch and store new data. This can be tested by querying the `/api/stats` or `/api/deviation` endpoints to verify the data is being updated.

---

### Available API Endpoints

1. **Fetch Latest Cryptocurrency Stats**: 
   - **Endpoint**: `/api/stats`
   - **Method**: GET
   - **Query Parameters**: `coin` (Required)
   - **Example Request**:
     ```bash
     GET https://kodex-2mkn.onrender.com/api/stats?coin=bitcoin
     ```
   - **Example Response**:
     ```json
     {
       "price": 45000.23,
       "marketCap": 850000000000,
       "change24h": 5.23
     }
     ```

2. **Calculate Standard Deviation of Cryptocurrency Prices**: 
   - **Endpoint**: `/api/deviation`
   - **Method**: GET
   - **Query Parameters**: `coin` (Required)
   - **Example Request**:
     ```bash
     GET https://kodex-2mkn.onrender.com/api/deviation?coin=bitcoin
     ```
   - **Example Response**:
     ```json
     {
       "deviation": 1234.56
     }
     ```

---

### Testing the Endpoints

To test the endpoints:

1. **Open Postman** or use **cURL** to send requests to the endpoints.
2. **For `/api/stats`**:
   - Send a `GET` request with the `coin` parameter set to a valid cryptocurrency (e.g., `bitcoin`, `ethereum`).
   - Example:
     ```bash
     GET https://kodex-2mkn.onrender.com/api/stats?coin=bitcoin
     ```
   - You should receive the latest stats for the specified cryptocurrency.

3. **For `/api/deviation`**:
   - Send a `GET` request with the `coin` parameter set to a valid cryptocurrency.
   - Example:
     ```bash
     GET https://kodex-2mkn.onrender.com/api/deviation?coin=bitcoin
     ```
   - You should receive the calculated standard deviation for the cryptocurrency prices.

---

## How to Test Locally

If you'd like to run the application locally for testing, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rixitgithub/kodex.git
   cd backend
2. **Install dependencies**:
   ```bash
   npm install
4. **Set up environment variables**:
   Create a .env file in the root folder and add the following
   ```bash
   MONGO_URI=your-mongodb-uri
   PORT=5000
5. **Run the backend**:
   ```bash
   npm run dev
6. **Setup the frontend**:
   ```bash
   cd crypto-dashboard
   npm install
7. **Run the frontend**:
   ```bash
   npm start
## Deployment

The backend is deployed on Render, and the service is available at the following URL:
https://kodex-2mkn.onrender.com

The frontend is deployed on Vercel, and the service is available at the following URL:
https://kodex-one.vercel.app


## Conclusion:
This project allows you to fetch cryptocurrency data, calculate statistical information like standard deviation,
and keep the data up-to-date with a scheduled job. The backend is deployed on Render, and the API is accessible for testing and integration.
