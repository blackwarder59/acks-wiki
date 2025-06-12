'use client';

/**
 * Search Results Component for ACKS II Wiki
 * 
 * Displays search results with highlighting, content type grouping,
 * and responsive design. Integrates with the search context to show
 * real-time results with proper loading states and error handling.
 * 
 * Features:
 * - Highlighted search matches
 * - Content type grouping and filtering
 * - Responsive grid layout
 * - Loading states and empty states
 * - Accessibility with proper ARIA labels
 * - Click handling for navigation
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  FileText, 
  Sword, 
  Sparkles, 
  Users, 
  Shield, 
  BookOpen, 
  Crown,
  Gavel,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useSearchResults } from '../../lib/search/search-context';
import { ContentType } from '../../lib/types/content';
import type { SearchResult } from '../../lib/search/search-context';

/**
 * Content type icons mapping
 */
const CONTENT_TYPE_ICONS = {
  [ContentType.MONSTER]: Sword,
  [ContentType.SPELL]: Sparkles,
  [ContentType.CLASS]: Users,
  [ContentType.EQUIPMENT]: Shield,
  [ContentType.RULE]: BookOpen,
  [ContentType.PROFICIENCY]: Crown,
  [ContentType.DOMAIN_RULE]: Gavel,
  [ContentType.JUDGE_TOOL]: FileText
} as const;

/**
 * Content type labels
 */
const CONTENT_TYPE_LABELS = {
  [ContentType.MONSTER]: 'Monster',
  [ContentType.SPELL]: 'Spell',
  [ContentType.CLASS]: 'Class',
  [ContentType.EQUIPMENT]: 'Equipment',
  [ContentType.RULE]: 'Rule',
  [ContentType.PROFICIENCY]: 'Proficiency',
  [ContentType.DOMAIN_RULE]: 'Domain Rule',
  [ContentType.JUDGE_TOOL]: 'Judge Tool'
} as const;

/**
 * Content type colors for badges
 */
const CONTENT_TYPE_COLORS = {
  [ContentType.MONSTER]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [ContentType.SPELL]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [ContentType.CLASS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [ContentType.EQUIPMENT]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [ContentType.RULE]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [ContentType.PROFICIENCY]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  [ContentType.DOMAIN_RULE]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [ContentType.JUDGE_TOOL]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
} as const;

/**
 * Search Results Component Props
 */
interface SearchResultsProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to group results by content type */
  groupByType?: boolean;
  /** Maximum number of results to show per type */
  maxPerType?: number;
  /** Whether to show content type badges */
  showTypeBadges?: boolean;
  /** Whether to show relevance scores */
  showScores?: boolean;
  /** Callback when a result is clicked */
  onResultClick?: (result: SearchResult) => void;
}

/**
 * Individual Search Result Item Component
 */
function SearchResultItem({ 
  result, 
  showTypeBadge = true, 
  showScore = false,
  onClick 
}: {
  result: SearchResult;
  showTypeBadge?: boolean;
  showScore?: boolean;
  onClick?: (result: SearchResult) => void;
}) {
  const { item, score, matches, contentType } = result;
  const Icon = CONTENT_TYPE_ICONS[contentType];
  
  /**
   * Generate URL for the content item
   */
  const getItemUrl = (item: unknown, type: ContentType): string => {
    const baseUrls = {
      [ContentType.MONSTER]: '/monsters',
      [ContentType.SPELL]: '/spells',
      [ContentType.CLASS]: '/classes',
      [ContentType.EQUIPMENT]: '/equipment',
      [ContentType.RULE]: '/rules',
      [ContentType.PROFICIENCY]: '/rules',
      [ContentType.DOMAIN_RULE]: '/judge-tools',
      [ContentType.JUDGE_TOOL]: '/judge-tools'
    };
    
    return `${baseUrls[type]}/${(item as { id: string }).id}`;
  };

  /**
   * Escape special regex characters in a string
   */
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  /**
   * Highlight matched text
   */
  const highlightText = (text: string, matches: unknown[]): React.ReactNode => {
    if (!matches || matches.length === 0) return text;
    
    // Find matches for this specific text
    const relevantMatches = matches.filter((match): match is { value: string } => 
      typeof match === 'object' && 
      match !== null && 
      'value' in match && 
      typeof (match as { value: unknown }).value === 'string' &&
      text.includes((match as { value: string }).value)
    );
    
    if (relevantMatches.length === 0) return text;
    
    // Simple highlighting - escape special regex characters
    let highlightedText = text;
    relevantMatches.forEach(match => {
      if (match.value && match.value.trim()) {
        try {
          const escapedValue = escapeRegExp(match.value);
          const regex = new RegExp(`(${escapedValue})`, 'gi');
          highlightedText = highlightedText.replace(
            regex, 
            '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
          );
        } catch (error) {
          console.warn('Error highlighting text:', error, 'match value:', match.value);
          // If regex fails, just return the text without highlighting
        }
      }
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  /**
   * Handle click
   */
  const handleClick = () => {
    if (onClick) {
      onClick(result);
    }
  };

  return (
    <Link 
      href={getItemUrl(item, contentType)}
      onClick={handleClick}
      className="
        block p-4 bg-card border border-border rounded-lg
        hover:shadow-md hover:border-primary/50
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      "
    >
      <div className="flex items-start gap-3">
        {/* Content Type Icon */}
        <div className="flex-shrink-0 mt-1">
          <Icon size={20} className="text-muted-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header with title and badges */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate">
              {highlightText(item.title, matches)}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Content Type Badge */}
              {showTypeBadge && (
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${CONTENT_TYPE_COLORS[contentType]}
                `}>
                  {CONTENT_TYPE_LABELS[contentType]}
                </span>
              )}
              
              {/* Relevance Score */}
              {showScore && (
                <span className="text-xs text-muted-foreground">
                  {Math.round(score * 100)}%
                </span>
              )}
            </div>
          </div>
          
          {/* Description */}
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {highlightText(item.description, matches)}
            </p>
          )}
          
          {/* Additional metadata based on content type */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {contentType === ContentType.MONSTER && 'primaryCharacteristics' in item && (
              <>
                <span>HD: {item.primaryCharacteristics.hitDice}</span>
                <span>AC: {item.primaryCharacteristics.armorClass}</span>
              </>
            )}
            
            {contentType === ContentType.SPELL && 'level' in item && (
              <>
                <span>Level: {item.level}</span>
                {'spellType' in item && <span>School: {item.spellType}</span>}
              </>
            )}
            
            {contentType === ContentType.CLASS && 'hitDice' in item && (
              <>
                <span>HD: {item.hitDice}</span>
                {'requirements' in item && <span>Req: {item.requirements}</span>}
              </>
            )}
            
            {contentType === ContentType.EQUIPMENT && 'cost' in item && (
              <>
                <span>Cost: {item.cost}</span>
                {'weight' in item && <span>Weight: {item.weight}</span>}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Content Type Group Component
 */
function ContentTypeGroup({ 
  type, 
  results, 
  maxResults,
  showTypeBadges,
  showScores,
  onResultClick 
}: {
  type: ContentType;
  results: SearchResult[];
  maxResults?: number;
  showTypeBadges?: boolean;
  showScores?: boolean;
  onResultClick?: (result: SearchResult) => void;
}) {
  const Icon = CONTENT_TYPE_ICONS[type];
  const displayResults = maxResults ? results.slice(0, maxResults) : results;
  const hasMore = maxResults && results.length > maxResults;
  
  return (
    <div className="space-y-3">
      {/* Group Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Icon size={18} className="text-muted-foreground" />
        <h2 className="font-semibold text-foreground">
          {CONTENT_TYPE_LABELS[type]}
        </h2>
        <span className="text-sm text-muted-foreground">
          ({results.length})
        </span>
      </div>
      
      {/* Results */}
      <div className="space-y-3">
        {displayResults.map((result, index) => (
          <SearchResultItem
            key={`${type}-${result.item.id}-${index}`}
            result={result}
            showTypeBadge={showTypeBadges}
            showScore={showScores}
            onClick={onResultClick}
          />
        ))}
      </div>
      
      {/* Show More Link */}
      {hasMore && (
        <div className="text-center pt-2">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            Show {results.length - maxResults!} more {CONTENT_TYPE_LABELS[type].toLowerCase()}s
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Main Search Results Component
 */
export function SearchResults({
  className = '',
  groupByType = true,
  maxPerType = 5,
  showTypeBadges = true,
  showScores = false,
  onResultClick
}: SearchResultsProps) {
  const { 
    results, 
    resultsByType, 
    hasResults, 
    isEmpty, 
    isLoading, 
    error, 
    query,
    totalResults 
  } = useSearchResults();

  /**
   * Sorted content types by result count
   */
  const sortedTypes = useMemo(() => {
    return Object.keys(resultsByType)
      .sort((a, b) => resultsByType[b as ContentType].length - resultsByType[a as ContentType].length)
      .map(type => type as ContentType);
  }, [resultsByType]);

  /**
   * Loading State
   */
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Searching ACKS II content...</p>
        </div>
      </div>
    );
  }

  /**
   * Error State
   */
  if (error) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Search Error</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  /**
   * Empty State
   */
  if (isEmpty) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Search size={32} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">No results found</p>
          <p className="text-muted-foreground">
            No content found for &quot;{query}&quot;. Try different keywords or check your spelling.
          </p>
        </div>
      </div>
    );
  }

  /**
   * No Query State
   */
  if (!query && !hasResults) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Search size={32} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Start searching</p>
          <p className="text-muted-foreground">
            Enter a search term to find monsters, spells, classes, and more.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Results Display
   */
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
        
        {showScores && (
          <p className="text-xs text-muted-foreground">
            Sorted by relevance
          </p>
        )}
      </div>

      {/* Grouped Results */}
      {groupByType ? (
        <div className="space-y-8">
          {sortedTypes.map(type => (
            <ContentTypeGroup
              key={type}
              type={type}
              results={resultsByType[type]}
              maxResults={maxPerType}
              showTypeBadges={false} // Don't show badges when grouped
              showScores={showScores}
              onResultClick={onResultClick}
            />
          ))}
        </div>
      ) : (
        /* Flat Results */
        <div className="space-y-3">
          {results.map((result, index) => (
            <SearchResultItem
              key={`${result.contentType}-${result.item.id}-${index}`}
              result={result}
              showTypeBadge={showTypeBadges}
              showScore={showScores}
              onClick={onResultClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Compact Search Results for mobile/sidebar use
 */
export function CompactSearchResults(props: Omit<SearchResultsProps, 'groupByType' | 'maxPerType'>) {
  return (
    <SearchResults
      {...props}
      groupByType={false}
      maxPerType={3}
      showTypeBadges={true}
      className={`${props.className || ''}`}
    />
  );
} 