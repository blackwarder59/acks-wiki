import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';

const AppendixCPage = async () => {
  const chapter = await loadFullChapter('appendix-c-wounds-and-woe');

  return <ChapterLayout chapter={chapter} />;
};

export default AppendixCPage; 