import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const Chapter11Page = async () => {
  const chapter = await loadFullChapter('chapter-11-battles');

  return <ChapterLayout chapter={chapter} />;
};

export default Chapter11Page; 