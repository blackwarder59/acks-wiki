/**
 * Chapter Template Component for ACKS II Rulebook
 * 
 * Provides a consistent layout for all rulebook chapters with:
 * - Left sidebar navigation with table of contents
 * - Main content area with proper typography
 * - Responsive design with mobile-first approach
 * - Active section highlighting and smooth scrolling
 */

import { loadFullChapter } from '@/lib/rulebook/content-loader';
import { ChapterLayout } from './chapter-layout';

interface ChapterTemplateProps {
  chapterId: string;
}

export const ChapterTemplate: React.FC<ChapterTemplateProps> = async ({ chapterId }) => {
  const chapter = await loadFullChapter(chapterId);

  if (!chapter) {
    return <div>Chapter content not found for ID: {chapterId}</div>;
  }

  return <ChapterLayout chapter={chapter} />;
}; 