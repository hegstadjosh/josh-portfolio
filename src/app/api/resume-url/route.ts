import { NextResponse } from 'next/server';

// Simple in-memory storage for the resume URL
// In production, you might want to store this in your database
let resumeBlob: { url: string; downloadUrl: string } | null = null;

export async function GET() {
  if (resumeBlob) {
    return NextResponse.json(resumeBlob);
  }
  
  // Fallback to Google Drive link
  const fallbackUrl = "https://drive.google.com/file/d/1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn/view?usp=sharing";
  return NextResponse.json({
    url: fallbackUrl,
    downloadUrl: fallbackUrl.replace('/view?usp=sharing', '/uc?export=download')
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  resumeBlob = {
    url: data.url,
    downloadUrl: data.downloadUrl
  };
  
  return NextResponse.json({ success: true });
}