// api.js
import axios from "axios";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' || 
                        window.location.hostname === '::1';
    
    // If running on localhost in browser but envUrl points to an external server or different host,
    // use relative path so requests hit the local Next.js dev server.
    if (isLocalhost && envUrl && !envUrl.includes(window.location.host)) {
      return '';
    }

    // If envUrl is localhost but running in browser on remote host, use relative path.
    if (envUrl && envUrl.includes('localhost') && !isLocalhost) {
      return '';
    }
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
    // If fullUrl was absolute and failed due to a network error, attempt fallback to relative /api route
    if (base && (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || !error.response)) {
      const fallbackUrl = `/api/${url}`;
      try {
        const fallbackResponse = await axios.post(fallbackUrl, body, {
          headers: { "Content-Type": "application/json" }
        });
        return fallbackResponse.data;
      } catch (fallbackError) {
        // preserve original error if fallback also fails
      }
    }
    console.error(`API Error [${endpoint}]:`, error.response?.data || error.message);
    throw error;
  }
};
