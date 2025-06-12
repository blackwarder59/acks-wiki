/**
 * Chapter Layout Component for ACKS II Rulebook
 * 
 * Provides a consistent layout for all rulebook chapters with:
 * - Left sidebar navigation with table of contents
 * - Main content area with proper typography
 * - Responsive design with mobile-first approach
 * - Active section highlighting and smooth scrolling
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { ChapterContent } from '@/lib/types/content';

/**
 * Collapsible Section Component
 */
interface CollapsibleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  children,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section id={id} className="scroll-mt-24">
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted/70 transition-colors text-left"
          aria-expanded={isExpanded}
          aria-controls={`${id}-content`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <div className="flex-shrink-0 ml-4">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </button>
        
        {isExpanded && (
          <div 
            id={`${id}-content`}
            className="p-6 prose prose-lg max-w-none dark:prose-invert animate-in slide-in-from-top-2 duration-200"
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};


/**
 * Interface for table of contents items
 */
interface TOCItem {
  id: string;
  title: string;
  level: number;
  subsections?: {
    id: string;
    title: string;
  }[];
}

interface ChapterLayoutProps {
  chapter: ChapterContent;
}

/**
 * Sidebar Navigation Component
*/
interface ChapterSidebarProps {
  chapterTitle: string;
  chapterNumber: number | string;
  tocItems: TOCItem[];
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
  appendix?: boolean;
}

const ChapterSidebar: React.FC<ChapterSidebarProps> = ({
  chapterTitle,
  chapterNumber,
  tocItems,
  activeSection,
  isOpen,
  onToggle,
  appendix = false
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (window.innerWidth < 768) {
        onToggle();
      }
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside 
        className={`
          fixed inset-y-0 left-0 transform z-50 w-80 bg-background border-r border-border
          md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:flex-shrink-0 
          md:translate-x-0 md:z-auto transition duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
      `}>
        <div className="flex-shrink-0 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {appendix ? 'Appendix' : 'Chapter'} {chapterNumber}
              </h2>
              <h3 className="text-lg font-bold text-foreground mt-1">
                {chapterTitle}
              </h3>
            </div>
            <button
              onClick={onToggle}
              className="md:hidden p-2 hover:bg-accent rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <Link
            href="/rules"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rulebook
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Contents
          </h4>
          <ul className="space-y-1">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
                    ${activeSection === item.id 
                      ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary ml-0 pl-2' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  {item.title}
                </button>
                
                {item.subsections && item.subsections.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <button
                          onClick={() => scrollToSection(subsection.id)}
                          className={`
                            w-full text-left px-3 py-1 rounded-md text-xs transition-all duration-200
                            ${activeSection === subsection.id
                              ? 'bg-primary/5 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }
                          `}
                        >
                          {subsection.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

/**
 * Main Chapter Layout Component
 */
export const ChapterLayout: React.FC<ChapterLayoutProps> = ({ chapter }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const tocItems: TOCItem[] = chapter.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: section.level,
    subsections: [] // Add logic for subsections if any
  }));
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    chapter.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapter.sections]);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="md:grid md:grid-cols-[20rem_1fr] md:gap-8">
      <ChapterSidebar
        chapterTitle={chapter.title}
        chapterNumber={chapter.chapterNumber}
        tocItems={tocItems}
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
        appendix={chapter.appendix}
      />
      <main className="py-6 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleSidebarToggle}
            className="p-2 hover:bg-accent rounded-md mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Chapter {chapter.chapterNumber}
            </h2>
            <h3 className="text-lg font-bold text-foreground">
              {chapter.title}
            </h3>
          </div>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
            {chapter.title}
          </h1>
          
          {chapter.description && (
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl">
              {chapter.description}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-8 border-t border-b border-border py-4">
            {chapter.previousChapter ? (
              <Link href={chapter.previousChapter.href} className="flex items-center text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>{chapter.previousChapter.title}</span>
              </Link>
            ) : <div />}
            {chapter.nextChapter ? (
              <Link href={chapter.nextChapter.href} className="flex items-center text-primary hover:underline">
                <span>{chapter.nextChapter.title}</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            ) : <div />}
          </div>
        </header>

        {chapter.introduction && (
          <div 
            className="prose prose-xl max-w-none dark:prose-invert mb-12" 
            dangerouslySetInnerHTML={{ __html: chapter.introduction }} 
          />
        )}

        <div className="space-y-12">
          {chapter.sections.map((section, index) => (
            <CollapsibleSection
              key={section.id}
              id={section.id}
              title={section.title}
              defaultExpanded={index < 3} // Expand first 3 sections by default
            >
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </CollapsibleSection>
          ))}
        </div>

      </main>
    </div>
  );
}; 