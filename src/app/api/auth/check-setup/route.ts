import { NextRequest, NextResponse } from 'next/server';
import { isAdminSetup } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const isSetup = await isAdminSetup();
    return NextResponse.json({ isSetup });
}
