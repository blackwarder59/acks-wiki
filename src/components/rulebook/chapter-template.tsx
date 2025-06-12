/**
 * Chapter Template Component for ACKS II Rulebook
 * 
 * Provides a consistent layout for all rulebook chapters with:
 * - Left sidebar navigation with table of contents
 * - Main content area with proper typography
 * - Responsive design with mobile-first approach
 * - Active section highlighting and smooth scrolling
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, ChevronRight, Keyboard, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
// import { Breadcrumb, generateChapterBreadcrumbs, generateAppendixBreadcrumbs } from '@/components/navigation/breadcrumb';
// import { KeyboardShortcuts, KeyboardShortcutsHelp } from '@/components/navigation/keyboard-shortcuts';

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

/**
 * Interface for chapter sections
 */
interface ChapterSection {
  id: string;
  title: string;
  content: React.ReactNode;
  level: number;
}

/**
 * Props for the ChapterTemplate component
 */
interface ChapterTemplateProps {
  chapterNumber: number | string;
  title: string;
  description?: string;
  introduction?: React.ReactNode;
  sections: ChapterSection[];
  appendix?: boolean;
  previousChapter?: {
    href: string;
    title: string;
  };
  nextChapter?: {
    href: string;
    title: string;
  };
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
      // Close sidebar on mobile when clicking a link
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
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform z-50 w-80 bg-background border-r border-border
        md:translate-x-0 md:static md:z-auto transition duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
      `}>
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4">
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
          
          {/* Back to Rules */}
          <Link
            href="/rules"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rulebook
          </Link>
        </div>

        {/* Table of Contents */}
        <nav className="p-4">
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
                
                {/* Subsections */}
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
      </div>
    </>
  );
};

/**
 * Main Chapter Template Component
 */
export const ChapterTemplate: React.FC<ChapterTemplateProps> = ({
  chapterNumber,
  title,
  description,
  introduction,
  sections,
  appendix = false,
  previousChapter,
  nextChapter
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // Generate table of contents from sections
  const tocItems: TOCItem[] = (sections || []).map(section => ({
    id: section.id,
    title: section.title,
    level: section.level,
    subsections: [] // Will be populated by parsing content if needed
  }));

  // Generate breadcrumb items
  // const breadcrumbItems = appendix 
  //   ? generateAppendixBreadcrumbs(chapterNumber.toString(), title)
  //   : generateChapterBreadcrumbs(chapterNumber, title);

  // Generate chapter ID for keyboard navigation
  const chapterId = appendix 
    ? `appendix-${chapterNumber.toString().toLowerCase()}`
    : `chapter-${chapterNumber}-characters`;

  // Intersection Observer for active section tracking
  useEffect(() => {
    const headings = document.querySelectorAll('h2[id], h3[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.1
      }
    );
    
    headings.forEach(heading => observer.observe(heading));
    
    return () => observer.disconnect();
  }, [sections]);

  // Remember sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('rulebook-sidebar-open');
    if (savedState !== null) {
      setSidebarOpen(savedState === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rulebook-sidebar-open', String(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Keyboard Shortcuts */}
      {/*<KeyboardShortcuts
        currentChapterId={chapterId}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onFocusSearch={() => {
          // Focus search if available
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }}
      />*/}

      {/* Keyboard Shortcuts Help Modal */}
      {/*<KeyboardShortcutsHelp
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
        shortcuts={[]} // Will be populated with actual shortcuts
      />*/}

      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-primary text-primary-foreground rounded-md shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Keyboard shortcuts help button */}
      <button 
        className="fixed top-4 right-4 z-30 p-2 bg-accent text-accent-foreground rounded-md shadow-lg hover:bg-accent/80 transition-colors"
        onClick={() => setShowKeyboardHelp(true)}
        title="Keyboard shortcuts (Press ? for help)"
      >
        <Keyboard className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <ChapterSidebar
        chapterTitle={title}
        chapterNumber={chapterNumber}
        tocItems={tocItems}
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        appendix={appendix}
      />

      {/* Main content */}
      <main className="md:ml-80">
        <div className="max-w-4xl mx-auto px-6 py-8 md:px-8 md:py-12">
          {/* Breadcrumb Navigation */}
          {/*<div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>*/}

          {/* Chapter Header */}
          <header className="mb-8 md:mb-12">
            <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">
              {appendix ? 'Appendix' : 'Chapter'} {chapterNumber}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </header>

          {/* Introduction */}
          {introduction && (
            <div className="mb-8 md:mb-12 prose prose-lg max-w-none dark:prose-invert">
              {introduction}
            </div>
          )}

          {/* Chapter Sections */}
          <div className="space-y-6">
            {(sections || []).map((section) => (
              <CollapsibleSection
                key={section.id}
                id={section.id}
                title={section.title}
                defaultExpanded={true}
              >
                {section.content}
              </CollapsibleSection>
            ))}
          </div>

          {/* Chapter Navigation */}
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-16 pt-8 border-t border-border">
            {previousChapter ? (
              <Link
                href={previousChapter.href}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm">Previous</div>
                  <div className="font-medium">{previousChapter.title}</div>
                </div>
              </Link>
            ) : (
              <div /> // Spacer
            )}

            {nextChapter && (
              <Link
                href={nextChapter.href}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors group text-right"
              >
                <div>
                  <div className="text-sm">Next</div>
                  <div className="font-medium">{nextChapter.title}</div>
                </div>
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default ChapterTemplate; 