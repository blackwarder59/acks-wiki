/**
 * Chapter List Navigation Component for ACKS II Rulebook
 * 
 * Provides a comprehensive navigation menu showing all chapters and appendices
 * with current chapter highlighting and progress indicators
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

/**
 * Interface for a single chapter or appendix
 */
interface ChapterItem {
  id: string;
  number: number | string;
  title: string;
  href: string;
  description?: string;
  isAppendix?: boolean;
  completed?: boolean;
  sections?: {
    id: string;
    title: string;
    href: string;
    completed?: boolean;
  }[];
}

/**
 * Props for the ChapterListNav component
 */
interface ChapterListNavProps {
  chapters: ChapterItem[];
  currentChapterId?: string;
  currentSectionId?: string;
  showProgress?: boolean;
  collapsible?: boolean;
  className?: string;
}

/**
 * Chapter List Navigation Component
 * 
 * @param chapters - Array of chapters and appendices to display
 * @param currentChapterId - ID of the currently active chapter
 * @param currentSectionId - ID of the currently active section
 * @param showProgress - Whether to show completion indicators
 * @param collapsible - Whether chapters can be expanded/collapsed
 * @param className - Additional CSS classes
 */
export const ChapterListNav: React.FC<ChapterListNavProps> = ({
  chapters,
  currentChapterId,
  currentSectionId,
  showProgress = false,
  collapsible = true,
  className = ''
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(currentChapterId ? [currentChapterId] : [])
  );

  const toggleChapter = (chapterId: string) => {
    if (!collapsible) return;
    
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const isExpanded = (chapterId: string) => expandedChapters.has(chapterId);
  const isCurrentChapter = (chapterId: string) => currentChapterId === chapterId;
  const isCurrentSection = (sectionId: string) => currentSectionId === sectionId;

  return (
    <nav className={`space-y-2 ${className}`} aria-label="Chapter navigation">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="border border-border rounded-lg overflow-hidden">
          {/* Chapter Header */}
          <div 
            className={`
              flex items-center justify-between p-4 transition-colors cursor-pointer
              ${isCurrentChapter(chapter.id) 
                ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                : 'hover:bg-accent'
              }
            `}
            onClick={() => toggleChapter(chapter.id)}
          >
            <Link 
              href={chapter.href}
              className="flex items-center space-x-3 flex-1 min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chapter Icon */}
              <div className="flex-shrink-0">
                {chapter.isAppendix ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <BookOpen className="h-5 w-5" />
                )}
              </div>

              {/* Chapter Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {chapter.isAppendix ? 'Appendix' : 'Chapter'} {chapter.number}
                  </span>
                  {showProgress && chapter.completed && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <h3 className="font-medium text-foreground truncate">
                  {chapter.title}
                </h3>
                {chapter.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {chapter.description}
                  </p>
                )}
              </div>
            </Link>

            {/* Expand/Collapse Button */}
            {collapsible && chapter.sections && chapter.sections.length > 0 && (
              <button
                className="flex-shrink-0 p-1 hover:bg-background/50 rounded"
                aria-label={`${isExpanded(chapter.id) ? 'Collapse' : 'Expand'} ${chapter.title} sections`}
              >
                {isExpanded(chapter.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
          </div>

          {/* Chapter Sections */}
          {chapter.sections && chapter.sections.length > 0 && (
            <div 
              className={`
                transition-all duration-200 ease-in-out overflow-hidden
                ${isExpanded(chapter.id) ? 'max-h-screen' : 'max-h-0'}
                ${isCurrentChapter(chapter.id) && !isExpanded(chapter.id) ? 'max-h-screen' : ''}
              `}
            >
              <div className="border-t border-border bg-background/50">
                {chapter.sections.map((section) => (
                  <Link
                    key={section.id}
                    href={section.href}
                    className={`
                      flex items-center justify-between px-4 py-3 pl-12 text-sm transition-colors
                      border-b border-border/50 last:border-b-0
                      ${isCurrentSection(section.id)
                        ? 'bg-primary/5 text-primary font-medium border-l-4 border-primary ml-0 pl-8'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    <span className="flex-1">{section.title}</span>
                    {showProgress && section.completed && (
                      <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

/**
 * Utility function to generate chapter navigation data from content loader
 * 
 * @param chapters - Raw chapter data from content loader
 * @param basePath - Base URL path for chapters (e.g., '/rules')
 * @returns Formatted chapter items for navigation
 */
export const generateChapterNavData = (
  chapters: any[],
  basePath: string = '/rules'
): ChapterItem[] => {
  return chapters.map(chapter => ({
    id: chapter.id,
    number: chapter.chapterNumber || chapter.appendixLetter,
    title: chapter.title,
    href: `${basePath}/${chapter.id}`,
    description: chapter.description,
    isAppendix: chapter.appendix || false,
    sections: chapter.sections?.map((section: any) => ({
      id: section.id,
      title: section.title,
      href: `${basePath}/${chapter.id}#${section.id}`
    })) || []
  }));
};

/**
 * Keyboard navigation handler for chapter list
 * 
 * @param event - Keyboard event
 * @param chapters - Array of chapter items
 * @param currentIndex - Currently focused chapter index
 * @param onNavigate - Callback for navigation
 */
export const handleChapterKeyNavigation = (
  event: React.KeyboardEvent,
  chapters: ChapterItem[],
  currentIndex: number,
  onNavigate: (index: number) => void
) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      onNavigate(Math.min(currentIndex + 1, chapters.length - 1));
      break;
    case 'ArrowUp':
      event.preventDefault();
      onNavigate(Math.max(currentIndex - 1, 0));
      break;
    case 'Home':
      event.preventDefault();
      onNavigate(0);
      break;
    case 'End':
      event.preventDefault();
      onNavigate(chapters.length - 1);
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      // Navigate to chapter
      window.location.href = chapters[currentIndex].href;
      break;
  }
};

export default ChapterListNav; 