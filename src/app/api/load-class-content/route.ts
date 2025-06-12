import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API route to load class content from markdown files
 * Used by the classes page to dynamically load full class descriptions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'File parameter is required' },
        { status: 400 }
      );
    }

    // Security: Ensure the file path is within our content directory
    // and doesn't contain path traversal attempts
    if (file.includes('..') || !file.startsWith('ACKS_II_Content/')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Construct the full file path
    const fullPath = path.join(process.cwd(), file);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read the file content
    const content = fs.readFileSync(fullPath, 'utf-8');

    // Return the content as plain text
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // Cache for 5 minutes
        'Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    console.error('Error loading class content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 