/**
 * API Route for Getting All Chapter Configurations (Subtask 17.2)
 */

import { NextResponse } from 'next/server';
import { CHAPTER_CONFIGS } from '@/lib/rulebook/content-loader';

export async function GET() {
  try {
    return NextResponse.json({
      chapters: CHAPTER_CONFIGS.map(config => ({
        id: config.id,
        title: config.title,
        chapterNumber: config.chapterNumber,
        description: config.description,
        sourceFileCount: config.sourceFiles.length,
        appendix: config.appendix || false
      }))
    });
  } catch (error) {
    console.error('Error fetching chapter configs:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to load chapter configurations',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 