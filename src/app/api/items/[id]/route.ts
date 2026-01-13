import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const data = await req.json();

        const item = await prisma.item.update({
            where: { id },
            data: {
                title: data.title,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                category: data.category,
                imageUrl: data.imageUrl,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Update Item Error:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.item.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Item Error:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
