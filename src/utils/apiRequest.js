// api.js
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000"; // change to your backend URL

// Centralized POST API
export const apiRequest = async (endpoint, payload = {}) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/${endpoint}`, payload);
    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
