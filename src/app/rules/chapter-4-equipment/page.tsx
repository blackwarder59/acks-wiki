import { Metadata } from 'next';
import { loadFullChapter } from '@/lib/rulebook/content-loader';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

export async function generateMetadata(): Promise<Metadata> {
  const chapter = await loadFullChapter('chapter-4-equipment');
  if (!chapter) {
    return {
      title: 'Chapter Not Found',
    };
  }
  return {
    title: `Chapter ${chapter.chapterNumber}: ${chapter.title} | ACKS II Rulebook`,
    description: chapter.description,
  };
}

const Chapter4Page = async () => {
  const chapter = await loadFullChapter('chapter-4-equipment');

  if (!chapter) {
    return <div>Chapter content not found.</div>;
  }

  return <ChapterTemplate chapter={chapter} />;
};

export default Chapter4Page; 