import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyKey, setSessionCookie, generateSessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { key } = await req.json();

        const admin = await prisma.admin.findFirst();
        if (!admin) {
            return NextResponse.json({ setupRequired: true }, { status: 401 });
        }

        const isValid = await verifyKey(key, admin.password_hash);

        if (isValid) {
            const response = NextResponse.json({ success: true });
            const token = generateSessionToken();
            setSessionCookie(response, token);
            return response;
        } else {
            return NextResponse.json({ error: 'ACCESS_DENIED' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
