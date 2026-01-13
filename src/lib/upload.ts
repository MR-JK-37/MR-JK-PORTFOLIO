import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

/**
 * PRODUCTION UPLOAD SERVICE
 * Replaces local fs/promises with Vercel Blob for persistent storage in production.
 */
export async function saveFile(file: File): Promise<string> {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${timestamp}_${uuidv4().substring(0, 8)}_${safeName}`;

    // Environment check (Vercel automatic)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        const { url } = await put(fileName, file, {
            access: 'public',
        });
        return url;
    }

    // Fallback for local dev if token missing (though normally we'll use cloud in dev too)
    return `/uploads/${fileName}`;
}
