import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { resumes } from '~/server/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    // Get the most recent resume from database
    const latestResume = await db
      .select()
      .from(resumes)
      .orderBy(desc(resumes.uploadedAt))
      .limit(1);

    if (latestResume.length > 0) {
      return NextResponse.json({
        url: latestResume[0]!.url,
        downloadUrl: latestResume[0]!.downloadUrl
      });
    }
    
    // Fallback to Google Drive link if no resume in database
    const fallbackUrl = "https://drive.google.com/file/d/1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn/view?usp=sharing";
    return NextResponse.json({
      url: fallbackUrl,
      downloadUrl: fallbackUrl.replace('/view?usp=sharing', '/uc?export=download')
    });
  } catch (error) {
    console.error('Database error:', error);
    // Fallback to Google Drive link on error
    const fallbackUrl = "https://drive.google.com/file/d/1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn/view?usp=sharing";
    return NextResponse.json({
      url: fallbackUrl,
      downloadUrl: fallbackUrl.replace('/view?usp=sharing', '/uc?export=download')
    });
  }
}

interface ResumeData {
  url: string;
  downloadUrl: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as ResumeData & { filename?: string };
    
    // Insert new resume into database
    await db.insert(resumes).values({
      url: data.url,
      downloadUrl: data.downloadUrl,
      filename: data.filename ?? 'resume.pdf'
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save resume to database' },
      { status: 500 }
    );
  }
}