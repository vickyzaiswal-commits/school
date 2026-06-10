import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { mkdir } from 'fs/promises';
import os from 'os';

const uploadsDir = path.join(process.cwd(), 'public', 'img');
const tmpUploadsDir = path.join(os.tmpdir(), 'frontend_uploads');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\- _]/g, '');
    const filename = `${Date.now()}_${safeName}`;

    // Try to save into public/img first (for environments where it's writable)
    try {
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }
      const finalPath = path.join(uploadsDir, filename);
      await writeFile(finalPath, buffer);
      const url = `/img/${encodeURIComponent(filename)}`;
      return NextResponse.json({ success: true, url, message: 'File uploaded successfully' });
    } catch (err) {
      // If public is read-only (EROFS) or any error occurs, fall back to tmp dir
      console.warn('Could not write to public/img, falling back to tmp dir:', err.message);
      if (!existsSync(tmpUploadsDir)) {
        await mkdir(tmpUploadsDir, { recursive: true });
      }
      const tmpPath = path.join(tmpUploadsDir, filename);
      await writeFile(tmpPath, buffer);
      // Return a temporary-serving endpoint URL
      const url = `/api/temp-file?name=${encodeURIComponent(filename)}`;
      return NextResponse.json({ success: true, url, message: 'File saved to temporary storage' });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed', error: error.message },
      { status: 500 }
    );
  }
}
