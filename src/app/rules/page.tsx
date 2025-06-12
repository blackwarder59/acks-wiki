/**
 * Rules Page - ACKS II Rulebook Content
 * 
 * Displays the converted rulebook content organized by categories
 */

import Link from 'next/link';
import { Book, Users, Sword, Sparkles, Coins, Scroll, Crown, Globe, Search, BookOpen, ArrowRight } from 'lucide-react';
import { CHAPTER_CONFIGS } from '@/lib/rulebook/content-loader';

export default async function RulesPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            <BookOpen className="h-5 w-5" />
            ACKS II Digital Companion
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Revised Rulebook
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Browse the complete ACKS II rules by chapter. Select a chapter to begin reading.
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTER_CONFIGS.map((chapter) => {
            const isAppendix = chapter.id.startsWith('appendix');
            const titlePrefix = isAppendix ? 'Appendix' : 'Chapter';
            const titleText = isAppendix ? chapter.title.split(': ')[1] : chapter.title;
            const chapterNumberText = isAppendix ? chapter.title.split(' ')[1].replace(':', '') : chapter.chapterNumber;

            return (
              <Link
                key={chapter.id}
                href={`/rules/${chapter.id}`}
                className="group block"
              >
                <div className="relative h-full p-6 bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg transform hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div>
                      <span className="text-sm font-semibold text-primary">
                        {titlePrefix} {chapterNumberText}
                      </span>
                      <h2 className="text-xl font-bold text-card-foreground mt-2">
                        {titleText}
                      </h2>
                      <p className="text-muted-foreground mt-2 text-sm flex-grow">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                        Read Chapter
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 