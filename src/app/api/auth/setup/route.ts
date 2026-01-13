import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashKey, isAdminSetup } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const alreadySetup = await isAdminSetup();
    if (alreadySetup) {
        return NextResponse.json({ error: 'System already initialized' }, { status: 403 });
    }

    try {
        const { key } = await req.json();

        if (!key || key.length < 8) {
            return NextResponse.json({ error: 'Secret key must be at least 8 characters' }, { status: 400 });
        }

        const hashed = await hashKey(key);

        // Ensure property name matches schema.prisma
        await prisma.admin.create({
            data: {
                password_hash: hashed
            }
        });

        return NextResponse.json({ success: true, message: 'System initialized successfully' });
    } catch (error: any) {
        console.error('Setup Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
