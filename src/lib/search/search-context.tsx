'use client';

/**
 * Search Context for ACKS II Wiki
 * 
 * Provides centralized search functionality using Fuse.js for fuzzy search
 * across all content types. Manages search state, results, and configuration
 * with real-time updates and debounced queries for optimal performance.
 * 
 * Features:
 * - Real-time search with debouncing
 * - Fuzzy search using Fuse.js
 * - Content type filtering
 * - Search history and suggestions
 * - Performance optimization with result caching
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { AnyContent, ContentType } from '../types/content';
import { SearchSuggestionsEngine, type SearchSuggestion } from './search-suggestions';

/**
 * Search result with relevance scoring and match highlighting
 */
export interface SearchResult {
  /** The matched content item */
  item: AnyContent;
  /** Relevance score (0-1, higher is more relevant) */
  score: number;
  /** Highlighted matches for display */
  matches: SearchMatch[];
  /** Content type for filtering and display */
  contentType: ContentType;
}

/**
 * Individual search match with highlighting information
 */
export interface SearchMatch {
  /** Field that matched the search query */
  field: string;
  /** Matched text with highlighting markers */
  value: string;
  /** Character indices of matches for highlighting */
  indices: readonly [number, number][];
}

/**
 * ACKS-specific attribute filters
 */
export interface ACKSFilters {
  /** Spell level range (1-9) */
  spellLevel: number[];
  /** Character level range (1-14+) */
  characterLevel: [number, number];
  /** Monster Hit Dice range (0.25-20+) */
  monsterHD: [number, number];
  /** Class types */
  classType: string[];
  /** Equipment categories */
  equipmentCategory: string[];
  /** Spell schools */
  spellSchool: string[];
  /** Monster types */
  monsterType: string[];
  /** Alignment */
  alignment: string[];
  /** Magic type (arcane/divine) */
  magicType: string[];
  /** Filter combination logic */
  filterLogic: 'AND' | 'OR';
}

/**
 * Search filter configuration
 */
export interface SearchFilters {
  /** Content types to include in search */
  contentTypes: ContentType[];
  /** Minimum relevance score to include in results */
  minScore: number;
  /** Maximum number of results to return */
  maxResults: number;
  /** ACKS-specific attribute filters */
  acksFilters: ACKSFilters;
}

/**
 * Search configuration options
 */
export interface SearchConfig {
  /** Fuse.js search threshold (0.0 = exact match, 1.0 = match anything) */
  threshold: number;
  /** Maximum distance for fuzzy matching */
  distance: number;
  /** Whether to include score in results */
  includeScore: boolean;
  /** Whether to include match information */
  includeMatches: boolean;
  /** Minimum character length to trigger search */
  minSearchLength: number;
  /** Debounce delay in milliseconds */
  debounceMs: number;
}

/**
 * Search context state
 */
interface SearchContextState {
  /** Current search query */
  query: string;
  /** Search results */
  results: SearchResult[];
  /** Whether search is currently loading */
  isLoading: boolean;
  /** Search error if any */
  error: string | null;
  /** Current search filters */
  filters: SearchFilters;
  /** Search configuration */
  config: SearchConfig;
  /** Search history for suggestions */
  history: string[];
  /** Whether search index is ready */
  isIndexReady: boolean;
}

/**
 * Search context actions
 */
interface SearchContextActions {
  /** Update search query */
  setQuery: (query: string) => void;
  /** Update search filters */
  setFilters: (filters: Partial<SearchFilters>) => void;
  /** Update search configuration */
  setConfig: (config: Partial<SearchConfig>) => void;
  /** Clear search results */
  clearSearch: () => void;
  /** Clear search history */
  clearHistory: () => void;
  /** Add query to history */
  addToHistory: (query: string) => void;
  /** Get search suggestions based on current query */
  getSuggestions: (query: string) => SearchSuggestion[];
  /** Track suggestion usage for analytics */
  trackSuggestionUsage: (suggestion: SearchSuggestion) => void;
  /** Initialize search index with content */
  initializeIndex: (content: AnyContent[]) => void;
}

/**
 * Combined search context type
 */
type SearchContextType = SearchContextState & SearchContextActions;

/**
 * Default search configuration
 */
const DEFAULT_CONFIG: SearchConfig = {
  threshold: 0.3,
  distance: 100,
  includeScore: true,
  includeMatches: true,
  minSearchLength: 2,
  debounceMs: 300
};

/**
 * Default ACKS filters
 */
const DEFAULT_ACKS_FILTERS: ACKSFilters = {
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
};

/**
 * Default search filters
 */
const DEFAULT_FILTERS: SearchFilters = {
  contentTypes: [],
  minScore: 0.1,
  maxResults: 50,
  acksFilters: DEFAULT_ACKS_FILTERS
};

/**
 * Search context
 */
const SearchContext = createContext<SearchContextType | null>(null);

/**
 * Fuse.js search options
 */
const FUSE_OPTIONS: IFuseOptions<AnyContent> = {
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'description', weight: 1.5 },
    { name: 'content', weight: 1.0 },
    { name: 'tags', weight: 1.2 },
    // Monster-specific fields
    { name: 'stats.type', weight: 0.8 },
    { name: 'stats.environment', weight: 0.6 },
    // Spell-specific fields
    { name: 'level', weight: 1.0 },
    { name: 'school', weight: 0.8 },
    { name: 'range', weight: 0.5 },
    // Class-specific fields
    { name: 'hitDice', weight: 0.8 },
    { name: 'requirements', weight: 0.6 },
    // Equipment-specific fields
    { name: 'category', weight: 0.8 },
    { name: 'properties', weight: 0.6 }
  ],
  threshold: DEFAULT_CONFIG.threshold,
  distance: DEFAULT_CONFIG.distance,
  includeScore: DEFAULT_CONFIG.includeScore,
  includeMatches: DEFAULT_CONFIG.includeMatches,
  ignoreLocation: true,
  findAllMatches: true,
  minMatchCharLength: 2
};

/**
 * Search Provider Component
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  // State management
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [config, setConfigState] = useState<SearchConfig>(DEFAULT_CONFIG);
  const [history, setHistory] = useState<string[]>([]);
  const [isIndexReady, setIsIndexReady] = useState(false);
  
  // Fuse.js instance
  const [fuseInstance, setFuseInstance] = useState<Fuse<AnyContent> | null>(null);
  
  // Search suggestions engine
  const [suggestionsEngine] = useState(() => new SearchSuggestionsEngine());
  
  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState('');

  /**
   * Load search history from localStorage
   */
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('acks-search-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }, []);

  /**
   * Save search history to localStorage
   */
  useEffect(() => {
    try {
      localStorage.setItem('acks-search-history', JSON.stringify(history));
    } catch (error) {
      console.warn('Failed to save search history:', error);
    }
  }, [history]);

  /**
   * Debounce search query updates
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, config.debounceMs);

    return () => clearTimeout(timer);
  }, [query, config.debounceMs]);

  /**
   * Perform search with specific Fuse instance
   */
  const performSearchWithFuse = useCallback((fuse: Fuse<AnyContent>, searchQuery: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const fuseResults = fuse.search(searchQuery, { limit: filters.maxResults });
      
      const searchResults: SearchResult[] = fuseResults
        .filter(result => (result.score || 0) <= (1 - filters.minScore))
        .map(result => ({
          item: result.item,
          score: 1 - (result.score || 0), // Convert to relevance score (higher is better)
          matches: result.matches?.map(match => ({
            field: match.key || '',
            value: match.value || '',
            indices: match.indices || []
          })) || [],
          contentType: result.item.contentType
        }));

      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.maxResults, filters.minScore]);

  /**
   * Perform search with current Fuse instance
   */
  const performSearch = useCallback((searchQuery: string) => {
    if (!fuseInstance) return;
    performSearchWithFuse(fuseInstance, searchQuery);
  }, [fuseInstance, performSearchWithFuse]);

  /**
   * Apply ACKS-specific filters to content
   */
  const applyACKSFilters = useCallback((content: AnyContent[], acksFilters: ACKSFilters): AnyContent[] => {
    return content.filter(item => {
      const checks: boolean[] = [];
      
      // Spell level filter
      if (acksFilters.spellLevel.length > 0 && item.contentType === ContentType.SPELL) {
        const spellLevel = (item as any).level;
        checks.push(spellLevel && acksFilters.spellLevel.includes(spellLevel));
      }
      
      // Character level filter (for classes)
      if (item.contentType === ContentType.CLASS) {
        const maxLevel = (item as any).maximumLevel || 14;
        checks.push(
          maxLevel >= acksFilters.characterLevel[0] && 
          maxLevel <= acksFilters.characterLevel[1]
        );
      }
      
      // Monster HD filter
      if (item.contentType === ContentType.MONSTER) {
        const hdString = (item as any).primaryCharacteristics?.hitDice || '';
        const hdMatch = hdString.match(/(\d+(?:\.\d+)?)/);
        if (hdMatch) {
          const hd = parseFloat(hdMatch[1]);
          checks.push(
            hd >= acksFilters.monsterHD[0] && 
            hd <= acksFilters.monsterHD[1]
          );
        }
      }
      
      // Class type filter
      if (acksFilters.classType.length > 0 && item.contentType === ContentType.CLASS) {
        const className = item.title?.toLowerCase() || '';
        checks.push(acksFilters.classType.some(type => 
          className.includes(type.toLowerCase())
        ));
      }
      
      // Equipment category filter
      if (acksFilters.equipmentCategory.length > 0 && item.contentType === ContentType.EQUIPMENT) {
        const category = (item as any).category?.toLowerCase() || '';
        checks.push(acksFilters.equipmentCategory.some(cat => 
          category.includes(cat.toLowerCase())
        ));
      }
      
      // Spell school filter
      if (acksFilters.spellSchool.length > 0 && item.contentType === ContentType.SPELL) {
        const school = (item as any).spellType?.toLowerCase() || '';
        checks.push(acksFilters.spellSchool.some(sch => 
          school.includes(sch.toLowerCase())
        ));
      }
      
      // Monster type filter
      if (acksFilters.monsterType.length > 0 && item.contentType === ContentType.MONSTER) {
        const type = (item as any).primaryCharacteristics?.type?.toLowerCase() || '';
        checks.push(acksFilters.monsterType.some(mt => 
          type.includes(mt.toLowerCase())
        ));
      }
      
      // Alignment filter
      if (acksFilters.alignment.length > 0) {
        const alignment = (item as any).encounterSetup?.alignment?.toLowerCase() || 
                         (item as any).alignment?.toLowerCase() || '';
        checks.push(acksFilters.alignment.some(al => 
          alignment.includes(al.toLowerCase())
        ));
      }
      
      // Magic type filter
      if (acksFilters.magicType.length > 0 && item.contentType === ContentType.SPELL) {
        const magicType = (item as any).magicType?.toLowerCase() || '';
        checks.push(acksFilters.magicType.some(mt => 
          magicType.includes(mt.toLowerCase())
        ));
      }
      
      // Apply filter logic (AND/OR)
      if (checks.length === 0) return true; // No applicable filters
      
      return acksFilters.filterLogic === 'AND' 
        ? checks.every(check => check)
        : checks.some(check => check);
    });
  }, []);

  /**
   * Initialize search index with content
   */
  const initializeIndex = useCallback((content: AnyContent[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Filter content based on content type filters
      let filteredContent = filters.contentTypes.length > 0
        ? content.filter(item => filters.contentTypes.includes(item.contentType))
        : content;
      
      // Apply ACKS-specific filters
      filteredContent = applyACKSFilters(filteredContent, filters.acksFilters);

      // Create new Fuse instance
      const fuse = new Fuse(filteredContent, {
        ...FUSE_OPTIONS,
        threshold: config.threshold,
        distance: config.distance,
        includeScore: config.includeScore,
        includeMatches: config.includeMatches
      });

      setFuseInstance(fuse);
      setIsIndexReady(true);
      
      // Initialize suggestions engine with content
      suggestionsEngine.initialize(filteredContent);
      
      // If there's a current query, re-run the search
      if (debouncedQuery && debouncedQuery.length >= config.minSearchLength) {
        performSearchWithFuse(fuse, debouncedQuery);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize search index');
      setIsLoading(false);
    }
  }, [filters.contentTypes, filters.acksFilters, config, debouncedQuery, performSearchWithFuse, applyACKSFilters]);

  /**
   * Perform search when debounced query changes
   */
  useEffect(() => {
    if (!fuseInstance || !debouncedQuery || debouncedQuery.length < config.minSearchLength) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    performSearch(debouncedQuery);
  }, [debouncedQuery, fuseInstance, config.minSearchLength, filters, performSearch]);

  /**
   * Update search query
   */
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
    if (newQuery.trim() && newQuery.length >= config.minSearchLength) {
      setIsLoading(true);
    }
  }, [config.minSearchLength]);

  /**
   * Update search filters
   */
  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Update search configuration
   */
  const setConfig = useCallback((newConfig: Partial<SearchConfig>) => {
    setConfigState(prev => ({ ...prev, ...newConfig }));
  }, []);

  /**
   * Clear search results and query
   */
  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  /**
   * Clear search history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  /**
   * Add query to search history
   */
  const addToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setHistory(prev => {
      const filtered = prev.filter(item => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 10); // Keep last 10 searches
    });
  }, []);

  /**
   * Get search suggestions based on current query
   */
  const getSuggestions = useCallback((searchQuery: string): SearchSuggestion[] => {
    return suggestionsEngine.getSuggestions(searchQuery, history, filters.contentTypes);
  }, [suggestionsEngine, history, filters.contentTypes]);

  /**
   * Track suggestion usage for analytics
   */
  const trackSuggestionUsage = useCallback((suggestion: SearchSuggestion) => {
    suggestionsEngine.trackSuggestionUsage(suggestion);
  }, [suggestionsEngine]);

  /**
   * Context value
   */
  const contextValue = useMemo<SearchContextType>(() => ({
    // State
    query,
    results,
    isLoading,
    error,
    filters,
    config,
    history,
    isIndexReady,
    
    // Actions
    setQuery,
    setFilters,
    setConfig,
    clearSearch,
    clearHistory,
    addToHistory,
    getSuggestions,
    trackSuggestionUsage,
    initializeIndex
  }), [
    query,
    results,
    isLoading,
    error,
    filters,
    config,
    history,
    isIndexReady,
    setQuery,
    setFilters,
    setConfig,
    clearSearch,
    clearHistory,
    addToHistory,
    getSuggestions,
    trackSuggestionUsage,
    initializeIndex
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Hook to use search context
 */
export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

/**
 * Hook to use search results with additional utilities
 */
export function useSearchResults() {
  const { results, query, isLoading, error } = useSearch();
  
  const resultsByType = useMemo(() => {
    const grouped: Record<ContentType, SearchResult[]> = {} as Record<ContentType, SearchResult[]>;
    
    results.forEach(result => {
      if (!grouped[result.contentType]) {
        grouped[result.contentType] = [];
      }
      grouped[result.contentType].push(result);
    });
    
    return grouped;
  }, [results]);
  
  const hasResults = results.length > 0;
  const isEmpty = !isLoading && !hasResults && query.length > 0;
  
  return {
    results,
    resultsByType,
    hasResults,
    isEmpty,
    isLoading,
    error,
    query,
    totalResults: results.length
  };
} 