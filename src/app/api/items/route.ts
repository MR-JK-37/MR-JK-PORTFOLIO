import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    const items = await prisma.item.findMany({
        where: type ? { type: type as string } : undefined,
        orderBy: { created_at: 'desc' },
        include: {
            attachments: true,
        },
    });

    return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();

        const item = await prisma.item.create({
            data: {
                type: data.type,
                title: data.title,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                category: data.category,
                imageUrl: data.imageUrl,
                attachments: {
                    create: data.attachments || [],
                },
            },
            include: {
                attachments: true,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Create Item Error:', error);
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
