
const KEY_SECRET = "MAHSR_SIM_2024_LNT_TCAP_UNIVERSAL";
const KEY_VALIDITY_HOURS = 48;

// A simple, non-cryptographic hash function for this purpose.
// Using Web Crypto API which is standard in modern browsers.
async function simpleHash(text: string): Promise<string> {
    const buffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // Return a short part of the hash as the signature
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 6);
}

export async function generateAuthKeyString(): Promise<string> {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 random chars
    const expiresAt = Date.now() + KEY_VALIDITY_HOURS * 60 * 60 * 1000;
    const signature = await simpleHash(`${randomPart}|${expiresAt}|${KEY_SECRET}`);
    return `${randomPart}-${expiresAt}-${signature}`;
}

export async function validateAuthKey(key: string): Promise<{isValid: boolean; message: string}> {
    const parts = key.split('-');
    if (parts.length !== 3) {
        return { isValid: false, message: 'Invalid key format. Please ensure you have copied the entire key.' };
    }
    const [randomPart, expiresAtStr, signature] = parts;
    
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt)) {
        return { isValid: false, message: 'Invalid key format. The key appears to be corrupted.' };
    }

    if (Date.now() > expiresAt) {
        return { isValid: false, message: 'This key has expired. Please request a new one from the admin.' };
    }

    const expectedSignature = await simpleHash(`${randomPart}|${expiresAt}|${KEY_SECRET}`);
    
    if (signature === expectedSignature) {
        return { isValid: true, message: 'Key is valid.' };
    } else {
        return { isValid: false, message: 'Invalid key. Please check the key and try again.' };
    }
}
