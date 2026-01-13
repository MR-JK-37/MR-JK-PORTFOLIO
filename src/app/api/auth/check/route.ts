import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const authenticated = isAuthenticated(req);
    return NextResponse.json({ isAuthenticated: authenticated });
}
