import { Metadata } from 'next';
import { getChapterConfig } from '@/lib/rulebook/content-loader';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

export async function generateMetadata(): Promise<Metadata> {
  const chapterConfig = getChapterConfig('chapter-5-spells');
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

export default function Chapter5SpellsPage() {
  return <ChapterTemplate chapterId="chapter-5-spells" />;
} 