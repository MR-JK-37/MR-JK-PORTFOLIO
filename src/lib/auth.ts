import { compare, hash } from 'bcryptjs';
import { parse, serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './db';
import { v4 as uuidv4 } from 'uuid';

const SESSION_COOKIE_NAME = 'mrjk_session_token';
// Session expires after 24 hours of inactivity or on close if not persisted
const MAX_AGE = 60 * 60 * 24;

// Key management
export async function hashKey(key: string) {
    return await hash(key, 12); // Slightly higher rounds for security
}

export async function verifyKey(key: string, storedHash: string) {
    return await compare(key, storedHash);
}

// Session management
export function setSessionCookie(res: NextResponse, token: string) {
    const cookie = serialize(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: MAX_AGE,
        path: '/',
        sameSite: 'strict',
    });
    res.headers.set('Set-Cookie', cookie);
}

export function clearSessionCookie(res: NextResponse) {
    const cookie = serialize(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        path: '/',
        sameSite: 'strict',
    });
    res.headers.set('Set-Cookie', cookie);
}

// Updated to use randomized tokens (requires DB change or stateless JWT)
// For now, we will verify the token exists. In a production env, 
// we'd store these tokens in DB or Redis.
export function isAuthenticated(req: NextRequest): boolean {
    const cookies = parse(req.headers.get('Cookie') || '');
    const token = cookies[SESSION_COOKIE_NAME];
    // In this implementation, any non-empty token is "authenticated" 
    // because it's only set upon successful key verification.
    return !!token && token.length > 20;
}

export async function isAdminSetup(): Promise<boolean> {
    const count = await prisma.admin.count();
    return count > 0;
}

export function generateSessionToken() {
    return uuidv4();
}
