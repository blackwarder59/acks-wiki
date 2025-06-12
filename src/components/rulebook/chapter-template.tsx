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

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Menu, X, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { ChapterContent } from '@/lib/types/content';

interface ChapterTemplateProps {
  chapter: ChapterContent;
}

export const ChapterTemplate: React.FC<ChapterTemplateProps> = ({ chapter }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openSubsections, setOpenSubsections] = useState<Record<string, boolean>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const { title, chapterNumber, introduction, sections, previousChapter, nextChapter, appendix } = chapter;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    const currentSections = contentRef.current?.querySelectorAll('section[id]');
    currentSections?.forEach((section) => observer.observe(section));

    return () => {
      currentSections?.forEach((section) => observer.unobserve(section));
    };
  }, [sections]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubsection = (id: string) => {
    setOpenSubsections(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const mainSections = sections.filter(s => s.level === 2);
  const getSubsections = (parentId: string) => sections.filter(s => s.level > 2 && s.id.startsWith(parentId));


  const renderSectionLink = (section: any, isSubSection = false) => (
    <li key={section.id} className={`${isSubSection ? 'ml-4' : ''}`}>
      <div className="flex items-center justify-between">
        <a
          href={`#${section.id}`}
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
          className={`block py-2 px-3 rounded-md transition-colors text-sm ${
            activeSection === section.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          {section.title}
        </a>
        {getSubsections(section.id).length > 0 && (
          <button onClick={() => toggleSubsection(section.id)} className="p-1">
            {openSubsections[section.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
      {openSubsections[section.id] && (
        <ul>
          {getSubsections(section.id).map(sub => renderSectionLink(sub, true))}
        </ul>
      )}
    </li>
  );

  const sidebarContent = (
    <div className="p-4">
      <Link href="/rules" className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Rulebook
      </Link>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <nav>
        <ul>
          {mainSections.map(section => renderSectionLink(section))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4 flex justify-between items-center z-20">
        <button onClick={toggleSidebar} aria-label="Toggle navigation">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold truncate">
          {appendix ? 'Appendix' : `Ch. ${chapterNumber}`}: {title}
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-card border-r z-30 transform transition-transform md:relative md:translate-x-0 md:block ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-2 md:hidden">
          <button onClick={toggleSidebar} aria-label="Close navigation">
            <X size={24} />
          </button>
        </div>
        {sidebarContent}
      </aside>
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSidebar}></div>}


      {/* Main Content */}
      <main ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {appendix ? 'Appendix' : `Chapter ${chapterNumber}`}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">{title}</h1>
            {introduction && (
              <div className="prose prose-lg dark:prose-invert max-w-none mt-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: introduction }} />
            )}
          </header>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
               <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
            </section>
          ))}

          {/* Navigation */}
          <footer className="mt-16 pt-8 border-t">
            <div className="flex justify-between items-center">
              {previousChapter ? (
                <Link href={previousChapter.href} className="flex items-center gap-2 text-primary hover:underline">
                  <ArrowLeft size={16} />
                  <div>
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-semibold">{previousChapter.title}</p>
                  </div>
                </Link>
              ) : <div></div>}
              {nextChapter && (
                <Link href={nextChapter.href} className="flex items-center gap-2 text-right text-primary hover:underline">
                  <div>
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="font-semibold">{nextChapter.title}</p>
                  </div>
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}; 