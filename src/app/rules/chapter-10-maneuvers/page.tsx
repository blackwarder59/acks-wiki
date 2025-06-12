import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const Chapter10Page = async () => {
  const chapter = await loadFullChapter('chapter-10-maneuvers');

  return <ChapterLayout chapter={chapter} />;
};

export default Chapter10Page; 