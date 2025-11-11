import { AuthKey } from '../types';

// Define a fixed epoch to calculate relative timestamps. This must be the same for generation and validation.
const KEY_EPOCH = 1704067200000; // 2024-01-01T00:00:00.000Z in milliseconds
const KEY_VALIDITY_HOURS = 48;
const KEY_SECRET = "MAHSR_SIM_2024_COMPACT_SECRET";

/**
 * Calculates a simple checksum hash of a string and returns it as a 2-character base36 string.
 * This is not cryptographically secure but serves as a basic integrity check to prevent trivial forgery.
 * @param text The string to hash.
 * @returns A 2-character base36 hash.
 */
function simpleChecksum(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        // A simple hashing algorithm (djb2 variant)
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    // Ensure positive, take modulo, convert to base36 and pad
    return (Math.abs(hash) % (36 * 36)).toString(36).padStart(2, '0');
}

/**
 * Generates a 6-character, self-validating, portable authentication key object.
 * The key format is:
 * - Chars 0-2: Expiration time (hours since epoch), base36 encoded.
 * - Char 3: A random character for uniqueness, base36 encoded.
 * - Chars 4-5: A checksum signature to verify integrity.
 * @returns A promise that resolves to an AuthKey object.
 */
export async function generateAuthKey(): Promise<AuthKey> {
    const createdAt = Date.now();
    const hoursSinceEpoch = Math.floor((createdAt - KEY_EPOCH) / (1000 * 60 * 60));
    
    const expiresAtHours = hoursSinceEpoch + KEY_VALIDITY_HOURS;
    const expiresAtMillis = (expiresAtHours * 60 * 60 * 1000) + KEY_EPOCH;

    const expiresAtEncoded = expiresAtHours.toString(36).padStart(3, '0'); // 3 chars
    
    const randomChar = Math.floor(Math.random() * 36).toString(36); // 1 char
    
    const dataToSign = expiresAtEncoded + randomChar + KEY_SECRET;
    const signature = simpleChecksum(dataToSign); // 2 chars
    
    const keyString = (expiresAtEncoded + randomChar + signature).toUpperCase();
    
    return {
        key: keyString,
        createdAt: createdAt,
        expiresAt: expiresAtMillis,
    };
}

/**
 * Validates a 6-character authentication key.
 * @param key The 6-character key string to validate.
 * @returns An object with `isValid` and a `message`.
 */
export async function validateAuthKey(key: string): Promise<{isValid: boolean; message:string}> {
    if (typeof key !== 'string' || key.length !== 6) {
        return { isValid: false, message: 'Invalid key format. Key must be 6 characters long.' };
    }

    const lowerKey = key.toLowerCase();
    
    const expiresAtEncoded = lowerKey.substring(0, 3);
    const randomChar = lowerKey.substring(3, 4);
    const signature = lowerKey.substring(4, 6);
    
    // Verify the signature first
    const expectedDataToSign = expiresAtEncoded + randomChar + KEY_SECRET;
    const expectedSignature = simpleChecksum(expectedDataToSign);
    
    if (signature !== expectedSignature) {
        return { isValid: false, message: 'Invalid key. The key may be mistyped or counterfeit.' };
    }

    // If signature is valid, check expiration
    const expiresAtHours = parseInt(expiresAtEncoded, 36);
    if (isNaN(expiresAtHours)) {
         return { isValid: false, message: 'Invalid key. The key appears to be corrupted.' };
    }
    const expiresAtMillis = (expiresAtHours * 60 * 60 * 1000) + KEY_EPOCH;

    if (Date.now() > expiresAtMillis) {
        return { isValid: false, message: 'This key has expired. Please request a new one from the admin.' };
    }

    return { isValid: true, message: 'Key is valid.' };
}
