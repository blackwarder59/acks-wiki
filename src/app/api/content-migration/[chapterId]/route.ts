/**
 * API Route for Content Migration Testing (Subtask 17.2)
 * 
 * Provides server-side content loading since the content-loader
 * uses Node.js fs module which can't run in the browser
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadChapterContent, CHAPTER_CONFIGS, getChapterConfig } from '@/lib/rulebook/content-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  try {
    const { chapterId } = await params;
    
    // Validate chapter ID exists
    const config = getChapterConfig(chapterId);
    if (!config) {
      return NextResponse.json(
        { error: `Chapter not found: ${chapterId}` },
        { status: 404 }
      );
    }

    console.log(`API: Loading chapter content for ${chapterId}`);
    
    // Load the chapter content
    const content = await loadChapterContent(chapterId);
    
    if (!content) {
      return NextResponse.json(
        { error: `Failed to load content for chapter: ${chapterId}` },
        { status: 500 }
      );
    }

    // Analyze the content structure
    const analysis = {
      totalSections: content.sections.length,
      contentLength: content.sections.reduce((total, section) => total + section.content.length, 0),
      headingLevels: content.sections.map(s => s.level).sort(),
      sourceFiles: [...new Set(content.sections.map(s => s.sourceFile).filter(Boolean))],
      sectionsWithoutSource: content.sections.filter(s => !s.sourceFile).length,
      hasIntroduction: !!content.introduction,
      introductionLength: content.introduction?.length || 0,
      config: {
        title: config.title,
        chapterNumber: config.chapterNumber,
        description: config.description,
        sourceFileCount: config.sourceFiles.length
      }
    };

    return NextResponse.json({
      content,
      analysis
    });

  } catch (error) {
    console.error('Content loading error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

 