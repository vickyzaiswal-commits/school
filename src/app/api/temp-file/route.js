import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

const tmpUploadsDir = path.join(os.tmpdir(), 'frontend_uploads');

const mimeMap = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) {
      return NextResponse.json({ success: false, message: 'Missing name parameter' }, { status: 400 });
    }

    const safe = path.basename(name);
    const filePath = path.join(tmpUploadsDir, safe);

    if (!existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'File not found' }, { status: 404 });
    }

    const data = await readFile(filePath);
    const ext = path.extname(safe).toLowerCase();
    const contentType = mimeMap[ext] || 'application/octet-stream';

    return new NextResponse(data, {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    console.error('temp-file GET error:', err);
    return NextResponse.json({ success: false, message: 'Failed to serve file', error: err.message }, { status: 500 });
  }
}
