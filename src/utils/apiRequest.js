// api.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"; // Next.js internal API

// Simple apiRequest for Next.js internal API calls (no authentication needed)
export const apiRequest = async (endpoint, payload = {}) => {
  // Convert save_data/action_name to data?action=action_name format
  let url = endpoint;
  let body = { ...payload };

  if (endpoint.startsWith('save_data/')) {
    const action = endpoint.replace('save_data/', '');
    url = 'data';
    body = { action, ...payload };
  } else if (endpoint.startsWith('uploads/')) {
    url = endpoint.replace('uploads/', 'upload');
  } else if (endpoint.startsWith('users/')) {
    const action = endpoint.replace('users/', '');
    url = 'auth';
    body = { action, ...payload };
  }

  const fullUrl = `${API_BASE_URL}/${url}`;

  try {
    const response = await axios.post(fullUrl, body, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.response?.data || error.message);
    throw error;
  }
};
