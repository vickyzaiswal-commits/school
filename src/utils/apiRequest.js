// api.js
import axios from "axios";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // If running in browser and env URL is localhost but current origin is not localhost, use relative path
  if (typeof window !== 'undefined' && envUrl && envUrl.includes('localhost') && !window.location.hostname.includes('localhost')) {
    return '';
  }
  return envUrl || "";
};

const API_BASE_URL = getBaseUrl();

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

  const base = API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : '';
  const fullUrl = base ? `${base}/${url}` : `/api/${url}`;

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
