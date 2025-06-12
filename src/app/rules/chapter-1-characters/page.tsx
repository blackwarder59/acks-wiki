import { Metadata } from 'next';
import { getChapterConfig } from '@/lib/rulebook/content-loader';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const chapterConfig = getChapterConfig('chapter-1-characters');
  if (!chapterConfig) {
    return {
      title: 'Chapter Not Found',
    };
  }
  return {
    title: `Chapter ${chapterConfig.chapterNumber}: ${chapterConfig.title} | ACKS II Rulebook`,
    description: chapterConfig.description,
  };
}

/**
 * Chapter 1: Characters Page
 * 
 * ACKS II Rulebook - Chapter 1
 */
const Chapter1Page = () => {
  return <ChapterTemplate chapterId="chapter-1-characters" />;
};

export default Chapter1Page; 