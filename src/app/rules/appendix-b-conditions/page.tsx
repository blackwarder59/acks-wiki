import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const AppendixBPage = async () => {
  const chapter = await loadFullChapter('appendix-b-conditions');

  return <ChapterLayout chapter={chapter} />;
};

export default AppendixBPage; 