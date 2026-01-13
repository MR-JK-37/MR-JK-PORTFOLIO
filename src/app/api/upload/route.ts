import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { saveFile } from '@/lib/upload';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const publicPath = await saveFile(file);

        let fileType: 'image' | 'video' | 'pdf' = 'pdf';
        if (file.type.startsWith('image/')) fileType = 'image';
        else if (file.type.startsWith('video/')) fileType = 'video';
        else if (file.type === 'application/pdf') fileType = 'pdf';

        return NextResponse.json({
            filePath: publicPath,
            fileType: fileType,
            fileName: file.name
        });
    } catch (error: any) {
        console.error('Critical Upload Error:', error);
        return NextResponse.json({
            error: 'UPLOAD_FAILED',
            details: error.message
        }, { status: 500 });
    }
}
