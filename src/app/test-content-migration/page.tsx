/**
 * Test Page for Content Migration System (Subtask 17.2)
 * 
 * This page tests the existing content loading functionality and helps identify
 * what enhancements are needed for proper content migration.
 */

'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

// Type definitions for the API responses
interface ChapterContent {
  id: string;
  chapterNumber: number | string;
  title: string;
  description?: string;
  introduction?: string;
  sections: ChapterSection[];
  appendix?: boolean;
}

interface ChapterSection {
  id: string;
  title: string;
  content: string;
  level: number;
  sourceFile?: string;
}

interface ChapterConfig {
  id: string;
  title: string;
  chapterNumber: number | string;
  description?: string;
  sourceFileCount: number;
  appendix?: boolean;
}

export default function TestContentMigration() {
  const [selectedChapter, setSelectedChapter] = useState<string>('chapter-1-characters');
  const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
  const [availableChapters, setAvailableChapters] = useState<ChapterConfig[]>([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentAnalysis, setContentAnalysis] = useState<any>(null);

  /**
   * Load available chapters from API
   */
  const loadAvailableChapters = async () => {
    setLoadingChapters(true);
    try {
      console.log('Fetching available chapters...');
      const response = await fetch('/api/content-migration/chapters');
      
      if (!response.ok) {
        throw new Error(`Failed to load chapters: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Received chapters data:', data);
      setAvailableChapters(data.chapters);
      console.log('Set available chapters:', data.chapters.length);
    } catch (err) {
      console.error('Error loading available chapters:', err);
      setError(`Failed to load chapter list: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingChapters(false);
    }
  };

  /**
   * Load and analyze chapter content via API
   */
  const loadChapter = async (chapterId: string) => {
    setLoading(true);
    setError(null);
    setContentAnalysis(null);
    
    try {
      console.log(`Loading chapter via API: ${chapterId}`);
      
      const response = await fetch(`/api/content-migration/${chapterId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('Raw API response:', {
        hasData: !!data,
        dataKeys: data ? Object.keys(data) : [],
        hasContent: !!data.content,
        contentKeys: data.content ? Object.keys(data.content) : [],
        hasSections: !!data.content?.sections,
        sectionsType: typeof data.content?.sections,
        sectionsLength: data.content?.sections?.length || 0,
        fullResponse: data
      });
      
      setChapterContent(data.content);
      setContentAnalysis(data.analysis);
      
      console.log('Content analysis from API:', data.analysis);
      
    } catch (err) {
      setError(`Error loading chapter: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Chapter loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load available chapters and initial chapter on mount
  useEffect(() => {
    loadAvailableChapters();
  }, []);

  // Load chapter when selection changes
  useEffect(() => {
    if (availableChapters.length > 0) {
      loadChapter(selectedChapter);
    }
  }, [selectedChapter, availableChapters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Content Migration Testing (Subtask 17.2)
          </h1>
          <p className="text-gray-600 mt-2">
            Testing the content loading system to identify migration needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Chapter Selector */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Select Chapter to Test
            {loadingChapters && (
              <span className="ml-2 text-sm text-gray-500">(Loading chapters...)</span>
            )}
          </h2>
          
          {loadingChapters ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-gray-500">Loading available chapters...</div>
            </div>
          ) : availableChapters.length === 0 ? (
            <div className="text-center p-8">
              <div className="text-gray-500 mb-2">No chapters found</div>
              <div className="text-sm text-gray-400">Check the console for errors</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableChapters.map((config) => (
                <button
                  key={config.id}
                  onClick={() => setSelectedChapter(config.id)}
                  className={`p-3 text-left rounded border transition-colors ${
                    selectedChapter === config.id
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">Ch. {config.chapterNumber}: {config.title}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {config.sourceFileCount} source files
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Debug info */}
          <div className="mt-4 text-xs text-gray-400">
            Available chapters: {availableChapters.length} | Loading: {loadingChapters.toString()} | Selected: {selectedChapter}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-lg">Loading chapter content...</div>
            <div className="text-sm text-gray-600 mt-2">Parsing markdown files and extracting content</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="text-red-800 font-medium">Error Loading Content</h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        )}

        {/* Content Analysis */}
        {contentAnalysis && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Content Analysis Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-2xl font-bold text-blue-900">
                  {contentAnalysis.totalSections}
                </div>
                <div className="text-blue-700">Total Sections</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded">
                <div className="text-2xl font-bold text-green-900">
                  {Math.round(contentAnalysis.contentLength / 1000)}K
                </div>
                <div className="text-green-700">Content Size (chars)</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-2xl font-bold text-purple-900">
                  {contentAnalysis.sourceFiles.length}
                </div>
                <div className="text-purple-700">Source Files</div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded">
                <div className="text-2xl font-bold text-orange-900">
                  {contentAnalysis.sectionsWithoutSource}
                </div>
                <div className="text-orange-700">Missing Sources</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Heading Levels Used:</h3>
                <div className="flex space-x-2">
                  {[...new Set(contentAnalysis.headingLevels)].map(level => (
                    <span key={level} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      H{level}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Source Files:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  {contentAnalysis.sourceFiles.map((file, index) => (
                    <div key={index} className="font-mono text-xs bg-gray-50 p-2 rounded">
                      {file}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chapter Content Display */}
        {chapterContent && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Chapter Content Preview</h2>
              <p className="text-gray-600 text-sm mt-1">
                How the content currently renders in the ChapterTemplate
              </p>
            </div>
            
            <div className="p-4">
              <ChapterTemplate 
                chapterNumber={chapterContent.chapterNumber}
                title={chapterContent.title}
                description={chapterContent.description}
                introduction={chapterContent.introduction ? (
                  <ReactMarkdown>{chapterContent.introduction}</ReactMarkdown>
                ) : undefined}
                sections={chapterContent.sections.map(section => ({
                  ...section,
                  content: <ReactMarkdown>{section.content}</ReactMarkdown>
                }))}
                appendix={chapterContent.appendix}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 