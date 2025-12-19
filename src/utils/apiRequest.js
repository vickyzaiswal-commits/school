// api.js
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000"; // backend URL

// apiRequest handles signing for server-side calls (Node). Do NOT embed secrets in browser bundles.
// For browser usage, provide a signer endpoint via `NEXT_PUBLIC_API_SIGNER_ENDPOINT` which will
// perform signing server-side and return the required headers.
export const apiRequest = async (endpoint, payload = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  try {
    const headers = { "Content-Type": "application/json" };

    // Server-side signing: Node environment (e.g., Next.js server or API route)
    if (typeof window === "undefined" && process.env.API_KEY_ID && process.env.API_KEY_SECRET) {
      const crypto = require("crypto");
      const timestamp = Date.now().toString();
      const bodyString = payload && Object.keys(payload).length ? JSON.stringify(payload) : "";
      const bodyHash = crypto.createHash("sha256").update(bodyString).digest("hex");
      const signingString = `POST\n/${endpoint}\n${timestamp}\n${bodyHash}`;
      const signature = crypto.createHmac("sha256", process.env.API_KEY_SECRET).update(signingString).digest("hex");
      headers["x-api-key"] = process.env.API_KEY_ID;
      headers["x-timestamp"] = timestamp;
      headers["x-signature"] = signature;
    }

    // Browser flow: ask a signer endpoint to produce headers (keeps secret off the client)
    else if (typeof window !== "undefined") {
      const signerUrl = process.env.NEXT_PUBLIC_API_SIGNER_ENDPOINT || '/api/sign';
      try {
        const signRes = await axios.post(signerUrl, {
          method: "POST",
          path: `/${endpoint}`,
          body: payload,
        });
        const data = signRes.data || {};
        if (data['x-api-key'] && data['x-timestamp'] && data['x-signature']) {
          headers['x-api-key'] = data['x-api-key'];
          headers['x-timestamp'] = data['x-timestamp'];
          headers['x-signature'] = data['x-signature'];
        } else {
          console.warn('Signer endpoint did not return expected headers');
        }
      } catch (err) {
        console.error('Signing request failed', err.response?.data || err.message);
        throw err.response?.data || err;
      }
    } else {
      // No signing available in browser — protected endpoints will return 401.
      if (typeof window !== "undefined") {
        console.warn(
          'No signing configured for browser requests. Provide NEXT_PUBLIC_API_SIGNER_ENDPOINT or call backend from server-side.'
        );
      }
    }

    const res = await axios.post(url, payload, { headers });
    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
