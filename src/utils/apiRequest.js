// api.js
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client if env vars are present (preferred for DB access)
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

// Use relative URL in production so calls go to the same origin (avoids CORS).
// Locally you may set NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Simple apiRequest for internal API calls (fallback to same-origin routes)
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

  // If you're using Supabase directly for DB queries, prefer the `supabase` client
  // elsewhere in the app (import { supabase } from 'src/utils/apiRequest' or
  // create a dedicated `supabaseClient.js`). This file keeps backward
  // compatibility by calling internal API routes relative to the current origin.

  const fullUrl = `${API_BASE_URL}/${url}`.replace(/([^:]\/)\/+/, '$1/').replace(/([^:]\/)\/+/, '$1/');

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
