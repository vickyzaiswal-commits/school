import crypto from 'crypto';

export async function POST(req) {
  try {
    const payload = await req.json();
    const method = payload.method || 'POST';
    const path = payload.path || '/';
    const body = payload.body || {};

    const API_KEY_ID = process.env.API_KEY_ID;
    const API_KEY_SECRET = process.env.API_KEY_SECRET;
    const missing = [];
    if (!API_KEY_ID) missing.push('API_KEY_ID');
    if (!API_KEY_SECRET) missing.push('API_KEY_SECRET');
    if (missing.length) {
      return new Response(JSON.stringify({ error: 'Server signer not configured', missing }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const timestamp = Date.now().toString();
    const bodyString = body && Object.keys(body).length ? JSON.stringify(body) : '';
    const bodyHash = crypto.createHash('sha256').update(bodyString).digest('hex');
    const signingString = `${method}\n${path}\n${timestamp}\n${bodyHash}`;
    const signature = crypto.createHmac('sha256', API_KEY_SECRET).update(signingString).digest('hex');

    const resp = {
      'x-api-key': API_KEY_ID,
      'x-timestamp': timestamp,
      'x-signature': signature,
    };

    return new Response(JSON.stringify(resp), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
