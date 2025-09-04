import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'joshua-hegstad-resume.pdf';

    if (!request.body) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
      contentType: 'application/pdf',
    });

    // Update the stored resume URL
    await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/resume-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: blob.url,
        downloadUrl: blob.downloadUrl || blob.url
      })
    });

    return NextResponse.json({
      url: blob.url,
      downloadUrl: blob.downloadUrl || blob.url,
      message: 'Resume uploaded successfully!'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve current resume URL
export async function GET() {
  // For now, return the Google Drive URL
  // Once you upload to Vercel Blob, you can replace this with the blob URL
  const resumeUrl = "https://drive.google.com/file/d/1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn/view?usp=sharing";
  
  return NextResponse.json({
    url: resumeUrl,
    downloadUrl: resumeUrl.replace('/view?usp=sharing', '/uc?export=download')
  });
}