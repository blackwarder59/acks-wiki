import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const AppendixAPage = async () => {
  const chapter = await loadFullChapter('appendix-a-auran-empire');

  return <ChapterLayout chapter={chapter} />;
};

export default AppendixAPage; 