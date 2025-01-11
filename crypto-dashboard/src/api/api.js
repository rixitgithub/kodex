// src/api/api.js

const API_URL = 'http://localhost:5000/api';  // Replace with your server URL

export const fetchCryptoStats = async (coin) => {
  try {
    const response = await fetch(`${API_URL}/stats?coin=${coin}`);
    if (!response.ok) {
      throw new Error(`Error fetching stats: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto stats:", error);
    return null;
  }
};

export const fetchDeviationStats = async (coin) => {
  try {
    const response = await fetch(`${API_URL}/deviation?coin=${coin}`);
    if (!response.ok) {
      throw new Error(`Error fetching deviation stats: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deviation stats:", error);
    return null;
  }
};