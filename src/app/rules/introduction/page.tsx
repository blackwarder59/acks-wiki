import { ChapterLayout } from '@/components/rulebook/chapter-layout';
import { loadFullChapter } from '@/lib/rulebook/content-loader';
import { notFound } from 'next/navigation';

const IntroductionPage = async () => {
  const chapter = await loadFullChapter('introduction');

  if (!chapter) {
    notFound();
  }

  return <ChapterLayout chapter={chapter} />;
};

export default IntroductionPage; 