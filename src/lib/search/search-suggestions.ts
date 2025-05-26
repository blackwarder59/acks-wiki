'use client';

/**
 * Search Suggestions System for ACKS II Wiki
 * 
 * Provides intelligent search suggestions and autocomplete functionality
 * based on content analysis, popular terms, and contextual recommendations.
 * 
 * Features:
 * - Content-based suggestions from actual wiki content
 * - Popular search terms and trending queries
 * - Category-specific suggestions (monsters, spells, classes, etc.)
 * - Fuzzy matching for typo tolerance
 * - Analytics tracking for suggestion usage
 * - Performance optimization with caching
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { AnyContent, ContentType } from '../types/content';

/**
 * Search suggestion with metadata
 */
export interface SearchSuggestion {
  /** The suggestion text */
  text: string;
  /** Type of suggestion */
  type: 'content' | 'category' | 'popular' | 'history' | 'completion';
  /** Content type if applicable */
  contentType?: ContentType;
  /** Relevance score (0-1) */
  score: number;
  /** Additional metadata */
  metadata?: {
    /** Number of times this suggestion was used */
    usage?: number;
    /** Content item this suggestion refers to */
    contentId?: string;
    /** Category or tag information */
    category?: string;
    /** Whether this is a trending suggestion */
    trending?: boolean;
  };
}

/**
 * Suggestion configuration
 */
export interface SuggestionConfig {
  /** Maximum number of suggestions to return */
  maxSuggestions: number;
  /** Minimum query length to trigger suggestions */
  minQueryLength: number;
  /** Whether to include content-based suggestions */
  includeContent: boolean;
  /** Whether to include popular terms */
  includePopular: boolean;
  /** Whether to include category suggestions */
  includeCategories: boolean;
  /** Whether to include search history */
  includeHistory: boolean;
  /** Fuzzy matching threshold */
  fuzzyThreshold: number;
}

/**
 * Default suggestion configuration
 */
const DEFAULT_CONFIG: SuggestionConfig = {
  maxSuggestions: 8,
  minQueryLength: 1,
  includeContent: true,
  includePopular: true,
  includeCategories: true,
  includeHistory: true,
  fuzzyThreshold: 0.7
};

/**
 * Popular ACKS II search terms
 */
const POPULAR_TERMS = [
  // Monsters
  'dragon', 'goblin', 'orc', 'skeleton', 'zombie', 'griffon', 'owlbear', 'troll',
  'giant', 'demon', 'devil', 'undead', 'beast', 'elemental',
  
  // Spells
  'fireball', 'magic missile', 'cure light wounds', 'detect magic', 'light',
  'sleep', 'charm person', 'web', 'lightning bolt', 'heal', 'teleport',
  
  // Classes
  'fighter', 'mage', 'cleric', 'thief', 'ranger', 'paladin', 'assassin',
  'barbarian', 'bard', 'bladedancer', 'mystic', 'warlock', 'witch',
  
  // Equipment
  'sword', 'armor', 'shield', 'bow', 'crossbow', 'dagger', 'mace', 'staff',
  'plate mail', 'chain mail', 'leather armor', 'helmet', 'boots',
  
  // Game concepts
  'hit dice', 'armor class', 'saving throw', 'morale', 'experience',
  'level', 'proficiency', 'domain', 'stronghold', 'mercenary'
];

/**
 * Category-based suggestions
 */
const CATEGORY_SUGGESTIONS: Record<string, string[]> = {
  'monster': [
    'undead monsters', 'dragon types', 'giant creatures', 'magical beasts',
    'low level monsters', 'high level monsters', 'dungeon monsters'
  ],
  'spell': [
    'first level spells', 'healing spells', 'combat spells', 'utility spells',
    'arcane spells', 'divine spells', 'illusion spells', 'evocation spells'
  ],
  'class': [
    'fighting classes', 'spellcasting classes', 'hybrid classes',
    'human classes', 'demi-human classes', 'custom classes'
  ],
  'equipment': [
    'weapons', 'armor', 'magical items', 'adventuring gear',
    'siege engines', 'vehicles', 'trade goods'
  ],
  'rule': [
    'combat rules', 'magic rules', 'domain rules', 'stronghold rules',
    'mercenary rules', 'campaign rules'
  ]
};

/**
 * Search Suggestions Engine
 */
export class SearchSuggestionsEngine {
  private content: AnyContent[] = [];
  private contentIndex: Map<string, AnyContent> = new Map();
  private popularityMap: Map<string, number> = new Map();
  private config: SuggestionConfig;
  private suggestionCache: Map<string, SearchSuggestion[]> = new Map();

  constructor(config: Partial<SuggestionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.loadPopularityData();
  }

  /**
   * Initialize with content data
   */
  initialize(content: AnyContent[]): void {
    this.content = content;
    this.contentIndex.clear();
    
    // Build content index
    content.forEach(item => {
      this.contentIndex.set(item.id, item);
    });
    
    // Clear cache when content changes
    this.suggestionCache.clear();
  }

  /**
   * Get suggestions for a query
   */
  getSuggestions(
    query: string, 
    history: string[] = [], 
    contentTypes: ContentType[] = []
  ): SearchSuggestion[] {
    if (query.length < this.config.minQueryLength) {
      return this.getDefaultSuggestions(history, contentTypes);
    }

    // Check cache first
    const cacheKey = `${query}:${contentTypes.join(',')}`;
    if (this.suggestionCache.has(cacheKey)) {
      return this.suggestionCache.get(cacheKey)!;
    }

    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase().trim();

    // Content-based suggestions
    if (this.config.includeContent) {
      suggestions.push(...this.getContentSuggestions(lowerQuery, contentTypes));
    }

    // Popular term suggestions
    if (this.config.includePopular) {
      suggestions.push(...this.getPopularSuggestions(lowerQuery));
    }

    // Category suggestions
    if (this.config.includeCategories) {
      suggestions.push(...this.getCategorySuggestions(lowerQuery, contentTypes));
    }

    // History suggestions
    if (this.config.includeHistory) {
      suggestions.push(...this.getHistorySuggestions(lowerQuery, history));
    }

    // Completion suggestions
    suggestions.push(...this.getCompletionSuggestions(lowerQuery));

    // Sort by relevance and remove duplicates
    const uniqueSuggestions = this.deduplicateAndSort(suggestions);
    
    // Limit results
    const finalSuggestions = uniqueSuggestions.slice(0, this.config.maxSuggestions);
    
    // Cache results
    this.suggestionCache.set(cacheKey, finalSuggestions);
    
    return finalSuggestions;
  }

  /**
   * Get default suggestions when no query
   */
  private getDefaultSuggestions(
    history: string[], 
    contentTypes: ContentType[]
  ): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];

    // Recent history
    if (this.config.includeHistory && history.length > 0) {
      suggestions.push(...history.slice(0, 3).map((term, index) => ({
        text: term,
        type: 'history' as const,
        score: 1.0 - (index * 0.1),
        metadata: { usage: this.popularityMap.get(term) || 0 }
      })));
    }

    // Popular terms based on content types
    if (this.config.includePopular) {
      const relevantTerms = this.getRelevantPopularTerms(contentTypes);
      suggestions.push(...relevantTerms.slice(0, 5).map((term, index) => ({
        text: term,
        type: 'popular' as const,
        score: 0.9 - (index * 0.1),
        metadata: { 
          usage: this.popularityMap.get(term) || 0,
          trending: index < 3
        }
      })));
    }

    return suggestions.slice(0, this.config.maxSuggestions);
  }

  /**
   * Get content-based suggestions
   */
  private getContentSuggestions(
    query: string, 
    contentTypes: ContentType[]
  ): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const filteredContent = contentTypes.length > 0 
      ? this.content.filter(item => contentTypes.includes(item.contentType))
      : this.content;

    for (const item of filteredContent) {
      const titleMatch = this.fuzzyMatch(query, item.title?.toLowerCase() || '');
      if (titleMatch > this.config.fuzzyThreshold) {
        suggestions.push({
          text: item.title || '',
          type: 'content',
          contentType: item.contentType,
          score: titleMatch,
          metadata: {
            contentId: item.id,
            category: item.category,
            usage: this.popularityMap.get(item.title?.toLowerCase() || '') || 0
          }
        });
      }

      // Also check description for partial matches
      if (item.description) {
        const descMatch = this.fuzzyMatch(query, item.description.toLowerCase());
        if (descMatch > this.config.fuzzyThreshold && descMatch < titleMatch) {
          const words = item.description.split(' ');
          const matchingPhrase = this.extractMatchingPhrase(query, words);
          if (matchingPhrase) {
            suggestions.push({
              text: matchingPhrase,
              type: 'content',
              contentType: item.contentType,
              score: descMatch * 0.8, // Lower score for description matches
              metadata: {
                contentId: item.id,
                category: item.category
              }
            });
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Get popular term suggestions
   */
  private getPopularSuggestions(query: string): SearchSuggestion[] {
    return POPULAR_TERMS
      .filter(term => term.toLowerCase().includes(query))
      .map(term => ({
        text: term,
        type: 'popular' as const,
        score: this.calculatePopularityScore(term, query),
        metadata: {
          usage: this.popularityMap.get(term) || 0,
          trending: this.isTermTrending(term)
        }
      }));
  }

  /**
   * Get category-based suggestions
   */
  private getCategorySuggestions(
    query: string, 
    contentTypes: ContentType[]
  ): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    
    // If specific content types are selected, focus on those
    const relevantCategories = contentTypes.length > 0 
      ? contentTypes.map(type => type.toLowerCase())
      : Object.keys(CATEGORY_SUGGESTIONS);

    for (const category of relevantCategories) {
      const categorySuggestions = CATEGORY_SUGGESTIONS[category] || [];
      for (const suggestion of categorySuggestions) {
        if (suggestion.toLowerCase().includes(query)) {
          suggestions.push({
            text: suggestion,
            type: 'category',
            contentType: category.toUpperCase() as ContentType,
            score: this.calculateCategoryScore(suggestion, query),
            metadata: {
              category: category
            }
          });
        }
      }
    }

    return suggestions;
  }

  /**
   * Get history-based suggestions
   */
  private getHistorySuggestions(query: string, history: string[]): SearchSuggestion[] {
    return history
      .filter(term => term.toLowerCase().includes(query))
      .map((term, index) => ({
        text: term,
        type: 'history' as const,
        score: 0.8 - (index * 0.05), // Recent items score higher
        metadata: {
          usage: this.popularityMap.get(term) || 0
        }
      }));
  }

  /**
   * Get completion suggestions
   */
  private getCompletionSuggestions(query: string): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    
    // Common ACKS II term completions
    const completions = [
      'hit dice', 'armor class', 'saving throw', 'magic resistance',
      'spell level', 'character level', 'experience points', 'gold pieces'
    ];

    for (const completion of completions) {
      if (completion.startsWith(query) && completion !== query) {
        suggestions.push({
          text: completion,
          type: 'completion',
          score: 0.7,
          metadata: {
            usage: this.popularityMap.get(completion) || 0
          }
        });
      }
    }

    return suggestions;
  }

  /**
   * Fuzzy string matching
   */
  private fuzzyMatch(query: string, target: string): number {
    if (target.includes(query)) {
      return 1.0; // Exact substring match
    }

    // Simple fuzzy matching algorithm
    const queryChars = query.split('');
    let targetIndex = 0;
    let matches = 0;

    for (const char of queryChars) {
      const foundIndex = target.indexOf(char, targetIndex);
      if (foundIndex !== -1) {
        matches++;
        targetIndex = foundIndex + 1;
      }
    }

    return matches / query.length;
  }

  /**
   * Extract matching phrase from text
   */
  private extractMatchingPhrase(query: string, words: string[]): string | null {
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j <= Math.min(i + 4, words.length); j++) {
        const phrase = words.slice(i, j).join(' ').toLowerCase();
        if (phrase.includes(query)) {
          return words.slice(i, j).join(' ');
        }
      }
    }
    return null;
  }

  /**
   * Calculate popularity score
   */
  private calculatePopularityScore(term: string, query: string): number {
    const baseScore = term.toLowerCase().startsWith(query) ? 0.9 : 0.7;
    const popularityBonus = (this.popularityMap.get(term) || 0) * 0.1;
    return Math.min(baseScore + popularityBonus, 1.0);
  }

  /**
   * Calculate category score
   */
  private calculateCategoryScore(suggestion: string, query: string): number {
    const exactMatch = suggestion.toLowerCase().includes(query) ? 0.8 : 0.6;
    return exactMatch;
  }

  /**
   * Check if term is trending
   */
  private isTermTrending(term: string): boolean {
    const usage = this.popularityMap.get(term) || 0;
    return usage > 10; // Simple trending threshold
  }

  /**
   * Get relevant popular terms based on content types
   */
  private getRelevantPopularTerms(contentTypes: ContentType[]): string[] {
    if (contentTypes.length === 0) {
      return POPULAR_TERMS.slice(0, 10);
    }

    // Filter popular terms based on content types
    const relevantTerms: string[] = [];
    
    if (contentTypes.includes(ContentType.MONSTER)) {
      relevantTerms.push(...POPULAR_TERMS.filter(term => 
        ['dragon', 'goblin', 'orc', 'skeleton', 'zombie', 'griffon', 'owlbear', 'troll', 'giant', 'demon', 'devil', 'undead', 'beast', 'elemental'].includes(term)
      ));
    }
    
    if (contentTypes.includes(ContentType.SPELL)) {
      relevantTerms.push(...POPULAR_TERMS.filter(term => 
        ['fireball', 'magic missile', 'cure light wounds', 'detect magic', 'light', 'sleep', 'charm person', 'web', 'lightning bolt', 'heal', 'teleport'].includes(term)
      ));
    }
    
    if (contentTypes.includes(ContentType.CLASS)) {
      relevantTerms.push(...POPULAR_TERMS.filter(term => 
        ['fighter', 'mage', 'cleric', 'thief', 'ranger', 'paladin', 'assassin', 'barbarian', 'bard', 'bladedancer', 'mystic', 'warlock', 'witch'].includes(term)
      ));
    }
    
    if (contentTypes.includes(ContentType.EQUIPMENT)) {
      relevantTerms.push(...POPULAR_TERMS.filter(term => 
        ['sword', 'armor', 'shield', 'bow', 'crossbow', 'dagger', 'mace', 'staff', 'plate mail', 'chain mail', 'leather armor', 'helmet', 'boots'].includes(term)
      ));
    }

    return [...new Set(relevantTerms)]; // Remove duplicates
  }

  /**
   * Remove duplicates and sort by score
   */
  private deduplicateAndSort(suggestions: SearchSuggestion[]): SearchSuggestion[] {
    const seen = new Set<string>();
    const unique: SearchSuggestion[] = [];

    for (const suggestion of suggestions) {
      const key = suggestion.text.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(suggestion);
      }
    }

    return unique.sort((a, b) => b.score - a.score);
  }

  /**
   * Load popularity data from localStorage
   */
  private loadPopularityData(): void {
    try {
      const saved = localStorage.getItem('acks-search-popularity');
      if (saved) {
        const data = JSON.parse(saved);
        this.popularityMap = new Map(Object.entries(data));
      }
    } catch (error) {
      console.warn('Failed to load popularity data:', error);
    }
  }

  /**
   * Save popularity data to localStorage
   */
  private savePopularityData(): void {
    try {
      const data = Object.fromEntries(this.popularityMap);
      localStorage.setItem('acks-search-popularity', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save popularity data:', error);
    }
  }

  /**
   * Track suggestion usage for analytics
   */
  trackSuggestionUsage(suggestion: SearchSuggestion): void {
    const key = suggestion.text.toLowerCase();
    const currentUsage = this.popularityMap.get(key) || 0;
    this.popularityMap.set(key, currentUsage + 1);
    
    // Save to localStorage periodically
    if (currentUsage % 5 === 0) {
      this.savePopularityData();
    }
  }

  /**
   * Clear suggestion cache
   */
  clearCache(): void {
    this.suggestionCache.clear();
  }

  /**
   * Get analytics data
   */
  getAnalytics(): { popularTerms: [string, number][], cacheSize: number } {
    return {
      popularTerms: Array.from(this.popularityMap.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20),
      cacheSize: this.suggestionCache.size
    };
  }
} 