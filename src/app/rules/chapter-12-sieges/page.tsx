import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const Chapter12Page = async () => {
  const chapter = await loadFullChapter('chapter-12-sieges');

  return <ChapterLayout chapter={chapter} />;
};

export default Chapter12Page; 