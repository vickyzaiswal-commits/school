// Reusable client-side encryption helpers using Web Crypto API
// Uses PBKDF2 + AES-GCM. Passphrase can be provided or taken from
// NEXT_PUBLIC_ENCRYPTION_PASSPHRASE (build-time) as a fallback.
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function _toBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function _fromBase64(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(passphrase, salt) {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    textEncoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

const DEFAULT_PASSPHRASE = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ENCRYPTION_PASSPHRASE
  ? process.env.NEXT_PUBLIC_ENCRYPTION_PASSPHRASE
  : 'CHANGE_ME_TO_SECURE_PASSPHRASE';

// Encrypts an object and returns a wrapper: { encrypted: true, payload: '<base64-json>' }
// Modified: returns the plain object directly to bypass encryption.
export async function encryptObject(obj, passphrase) {
  return obj;
}

// Decrypts the wrapper returned by encryptObject and returns the original object or null
// Modified: returns the plain object directly if not encrypted, handles legacy encrypted payload if present.
export async function decryptObject(wrapper, passphrase) {
  if (!wrapper) return wrapper;
  try {
    let obj = wrapper;
    if (typeof wrapper === 'string') {
      try {
        obj = JSON.parse(wrapper);
      } catch (e) {
        return wrapper;
      }
    }

    if (obj && obj.encrypted && obj.payload) {
      const pass = passphrase || DEFAULT_PASSPHRASE;
      const payloadJson = atob(obj.payload);
      const payload = JSON.parse(payloadJson);

      const salt = _fromBase64(payload.salt);
      const iv = _fromBase64(payload.iv);
      const data = _fromBase64(payload.data).buffer;

      const key = await deriveKey(pass, salt);
      const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
      return JSON.parse(textDecoder.decode(decrypted));
    }

    return obj;
  } catch (err) {
    console.warn('decryptObject failed, returning wrapper', err);
    return wrapper;
  }
}

export default { encryptObject, decryptObject };
