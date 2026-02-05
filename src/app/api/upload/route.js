import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { mkdir } from 'fs/promises';

const uploadsDir = path.join(process.cwd(), 'public', 'img');

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

    // Ensure uploads directory exists
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    // Save file directly into public/img with a safe unique name
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\- _]/g, '');
    const filename = `${Date.now()}_${safeName}`;
    const finalPath = path.join(uploadsDir, filename);

    await writeFile(finalPath, buffer);

    // Publicly served URL
    const url = `/img/${encodeURIComponent(filename)}`;

    return NextResponse.json({
      success: true,
      url,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
