import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChapterTemplate from '@/components/rulebook/chapter-template';
// No markdown component import needed
import { 
  loadChapterContent, 
  getChapterNavigation,
  type ChapterContent 
} from '@/lib/rulebook/content-loader';

const CHAPTER_ID = 'chapter-2-classes';

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const chapterContent = await loadChapterContent(CHAPTER_ID);
    
    if (!chapterContent) {
      return {
        title: 'Chapter Not Found',
      };
    }

    return {
      title: `Chapter ${chapterContent.chapterNumber}: ${chapterContent.title} | ACKS II Rulebook`,
      description: chapterContent.description,
    };
  } catch (error) {
    console.error('Error generating metadata for chapter 2:', error);
    return {
      title: 'Chapter 2: Classes | ACKS II Rulebook',
      description: 'Character classes with progression tables and class features',
    };
  }
}

/**
 * Chapter 2: Classes Page
 * 
 * ACKS II Rulebook - Chapter 2
 */
export default async function Chapter2ClassesPage() {
  try {
    const chapterContent = await loadChapterContent(CHAPTER_ID);
    
    if (!chapterContent) {
      notFound();
    }

    const navigation = getChapterNavigation(CHAPTER_ID);

    return (
      <ChapterTemplate
        chapterNumber={chapterContent.chapterNumber}
        title={chapterContent.title}
        description={chapterContent.description}
        introduction={chapterContent.introduction}
        sections={chapterContent.sections.map(section => ({
          ...section,
          content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
        }))}
        appendix={chapterContent.appendix}
        previousChapter={navigation.previous ? {
          href: navigation.previous.href,
          title: navigation.previous.title
        } : undefined}
        nextChapter={navigation.next ? {
          href: navigation.next.href,
          title: navigation.next.title
        } : undefined}
      />
    );
  } catch (error) {
    console.error('Error loading chapter 2:', error);
    notFound();
  }
} 