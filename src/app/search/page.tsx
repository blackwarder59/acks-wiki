'use client';

/**
 * Search Page for ACKS II Wiki
 * 
 * A dedicated search page that provides comprehensive search functionality
 * with advanced filtering, result display, and user-friendly interface.
 * 
 * Features:
 * - Full-featured search input with suggestions
 * - Content type filtering
 * - Search results with highlighting
 * - Responsive design
 * - Search analytics and history
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, RotateCcw, Settings } from 'lucide-react';
import { FullSearchInput } from '@/components/ui/search-input';
import { SearchResults } from '@/components/ui/search-results';
import { AdvancedFilters, type ACKSFilters } from '@/components/ui/advanced-filters';
import { useSearch } from '@/lib/search/search-context';
import { ContentType, ContentCategory, MagicType, type AnyContent } from '@/lib/types/content';

/**
 * Content type filter options
 */
const CONTENT_TYPE_OPTIONS = [
  { value: ContentType.MONSTER, label: 'Monsters', color: 'bg-red-100 text-red-800' },
  { value: ContentType.SPELL, label: 'Spells', color: 'bg-purple-100 text-purple-800' },
  { value: ContentType.CLASS, label: 'Classes', color: 'bg-blue-100 text-blue-800' },
  { value: ContentType.EQUIPMENT, label: 'Equipment', color: 'bg-green-100 text-green-800' },
  { value: ContentType.RULE, label: 'Rules', color: 'bg-yellow-100 text-yellow-800' },
  { value: ContentType.PROFICIENCY, label: 'Proficiencies', color: 'bg-indigo-100 text-indigo-800' },
  { value: ContentType.DOMAIN_RULE, label: 'Domain Rules', color: 'bg-orange-100 text-orange-800' },
  { value: ContentType.JUDGE_TOOL, label: 'Judge Tools', color: 'bg-gray-100 text-gray-800' }
];

/**
 * Search Page Component (Inner)
 */
function SearchPageInner() {
  // URL search params
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // Search context
  const { 
    query, 
    setQuery, 
    filters, 
    setFilters, 
    isIndexReady,
    initializeIndex 
  } = useSearch();

  // Local state
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Initialize search with URL query
   */
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  /**
   * Initialize search index with mock data for now
   * In a real implementation, this would load from your content API
   */
  useEffect(() => {
    if (!isInitialized && !isIndexReady) {
      // Mock data for demonstration
      const mockContent: AnyContent[] = [
        {
          id: 'griffon',
          title: 'Griffon',
          description: 'A majestic creature with the body of a lion and the head and wings of an eagle.',
          sourceFile: 'mock/griffon.md',
          category: ContentCategory.MONSTROUS_MANUAL,
          contentType: ContentType.MONSTER,
          primaryCharacteristics: {
            type: 'Monstrosity',
            size: 'Large',
            armorClass: 17,
            hitDice: '7d8',
            attacks: '2 claws, 1 bite',
            damage: '1d4/1d4/2d8',
            save: 'F7',
            morale: '+1',
            vision: 'Normal'
          },
          encounterSetup: {
            alignment: 'Neutral',
            xp: 1100
          }
        } as AnyContent,
        {
          id: 'fireball',
          title: 'Fireball',
          description: 'A bright streak flashes from your pointing finger to a point you choose.',
          sourceFile: 'mock/fireball.md',
          category: ContentCategory.RULEBOOK,
          contentType: ContentType.SPELL,
          magicType: MagicType.ARCANE,
          spellType: 'Evocation',
          level: 3,
          range: '150 feet',
          duration: 'Instantaneous'
        } as AnyContent,
        {
          id: 'fighter',
          title: 'Fighter',
          description: 'A master of martial combat, skilled with a variety of weapons and armor.',
          sourceFile: 'mock/fighter.md',
          category: ContentCategory.RULEBOOK,
          contentType: ContentType.CLASS,
          keyAttribute: 'Strength',
          requirements: 'None',
          hitDice: 'd10',
          maximumLevel: 14,
          levelProgression: [],
          combatProgression: [],
          combatCharacteristics: {
            weaponProficiencies: 'All',
            armorProficiencies: 'All',
            fightingStyles: 'All',
            progressionNotes: 'Standard fighter progression'
          },
          startingPowers: [],
          additionalPowers: [],
          proficiencyProgression: {
            starting: '4',
            classProficiencies: '1 per 2 levels',
            generalProficiencies: '1 per 4 levels'
          },
          classProficiencies: [],
          templates: []
        } as AnyContent
      ];

      initializeIndex(mockContent);
      setIsInitialized(true);
    }
  }, [isInitialized, isIndexReady, initializeIndex]);

  /**
   * Handle content type filter toggle
   */
  const handleContentTypeToggle = (contentType: ContentType) => {
    const currentTypes = filters.contentTypes;
    const newTypes = currentTypes.includes(contentType)
      ? currentTypes.filter(type => type !== contentType)
      : [...currentTypes, contentType];
    
    setFilters({ contentTypes: newTypes });
  };

  /**
   * Handle ACKS filters change
   */
  const handleACKSFiltersChange = (newACKSFilters: Partial<ACKSFilters>) => {
    setFilters({
      acksFilters: {
        ...filters.acksFilters,
        ...newACKSFilters
      }
    });
  };

  /**
   * Handle content types change from advanced filters
   */
  const handleContentTypesChange = (types: ContentType[]) => {
    setFilters({ contentTypes: types });
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    setFilters({
      contentTypes: [],
      minScore: 0.1,
      maxResults: 50,
      acksFilters: {
        spellLevel: [],
        characterLevel: [1, 14],
        monsterHD: [0.25, 20],
        classType: [],
        equipmentCategory: [],
        spellSchool: [],
        monsterType: [],
        alignment: [],
        magicType: [],
        filterLogic: 'AND'
      }
    });
  };

  /**
   * Handle search result click
   */
  const handleResultClick = (result: unknown) => {
    // Add analytics tracking here if needed
    console.log('Search result clicked:', result);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search ACKS II Wiki
          </h1>
          <p className="text-muted-foreground">
            Find monsters, spells, classes, equipment, and rules
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <FullSearchInput 
            placeholder="Search for monsters, spells, classes, and more..."
            onSearch={(query) => {
              // Update URL with search query
              const url = new URL(window.location.href);
              url.searchParams.set('q', query);
              window.history.replaceState({}, '', url.toString());
            }}
          />
        </div>

        {/* Filters Section */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="
                flex items-center gap-2 px-4 py-2 
                bg-muted hover:bg-muted/80 rounded-lg
                text-sm font-medium transition-colors
              "
            >
              <Filter size={16} />
              Filters
              {filters.contentTypes.length > 0 && (
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                  {filters.contentTypes.length}
                </span>
              )}
            </button>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="
                  flex items-center gap-2 px-4 py-2 
                  bg-muted hover:bg-muted/80 rounded-lg
                  text-sm font-medium transition-colors
                "
              >
                <Settings size={16} />
                Advanced
              </button>
            </div>

            {(filters.contentTypes.length > 0) && (
              <button
                onClick={handleClearFilters}
                className="
                  flex items-center gap-2 px-3 py-1
                  text-sm text-muted-foreground hover:text-foreground
                  transition-colors
                "
              >
                <RotateCcw size={14} />
                Clear filters
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Content Types</h3>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPE_OPTIONS.map((option) => {
                  const isSelected = filters.contentTypes.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleContentTypeToggle(option.value)}
                      className={`
                        px-3 py-2 rounded-lg text-sm font-medium
                        border transition-all duration-200
                        ${isSelected 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background border-border hover:border-primary/50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Advanced Filters */}
          <AdvancedFilters
            filters={filters.acksFilters}
            contentTypes={filters.contentTypes}
            onFiltersChange={handleACKSFiltersChange}
            onContentTypesChange={handleContentTypesChange}
            isExpanded={showAdvancedFilters}
            className="mt-4"
          />

          {/* Active Filters */}
          {filters.contentTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.contentTypes.map((type) => {
                const option = CONTENT_TYPE_OPTIONS.find(opt => opt.value === type);
                if (!option) return null;
                
                return (
                  <div
                    key={type}
                    className="
                      flex items-center gap-2 px-3 py-1
                      bg-primary/10 text-primary rounded-full text-sm
                    "
                  >
                    <span>{option.label}</span>
                    <button
                      onClick={() => handleContentTypeToggle(type)}
                      className="hover:bg-primary/20 rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto">
          <SearchResults
            groupByType={true}
            maxPerType={10}
            showTypeBadges={false}
            showScores={false}
            onResultClick={handleResultClick}
          />
        </div>

        {/* Search Tips */}
        {!query && (
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Search Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Quick Search</h3>
                <p>Type any keyword to find related content across all categories.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Filters</h3>
                <p>Use content type filters to narrow down your search results.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Examples</h3>
                <p>Try searching for &quot;dragon&quot;, &quot;fireball&quot;, or &quot;fighter&quot;.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">History</h3>
                <p>Your recent searches are saved for quick access.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Search Page Component with Suspense boundary
 */
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  );
} 