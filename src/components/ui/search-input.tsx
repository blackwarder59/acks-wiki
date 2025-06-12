'use client';

/**
 * Search Input Component for ACKS II Wiki
 * 
 * A comprehensive search input component with real-time search functionality,
 * keyboard navigation, accessibility features, and integration with the search context.
 * 
 * Features:
 * - Real-time search with visual feedback
 * - Keyboard navigation (Enter, Escape, Arrow keys)
 * - Loading states and error handling
 * - Accessibility with ARIA labels and screen reader support
 * - Mobile-optimized with proper touch targets
 * - Search suggestions and autocomplete
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Loader2, Clock, TrendingUp, Hash, Star, History, FileText } from 'lucide-react';
import { useSearch } from '../../lib/search/search-context';
import { type SearchSuggestion } from '../../lib/search/search-suggestions';

/**
 * Search input component props
 */
interface SearchInputProps {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show search suggestions */
  showSuggestions?: boolean;
  /** Whether to show search history */
  showHistory?: boolean;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Callback when search is performed */
  onSearch?: (query: string) => void;
  /** Callback when input is cleared */
  onClear?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show loading indicator */
  showLoading?: boolean;
}

/**
 * Search Input Component
 */
export function SearchInput({
  placeholder = 'Search ACKS II content...',
  className = '',
  showSuggestions = true,
  showHistory = true,
  autoFocus = false,
  onSearch,
  onClear,
  size = 'md',
  showLoading = true
}: SearchInputProps) {
  // Search context
  const {
    query,
    setQuery,
    isLoading,
    error,
    clearSearch,
    addToHistory,
    getSuggestions,
    trackSuggestionUsage,
    history
  } = useSearch();

  // Local state
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get current suggestions
  const suggestions = getSuggestions(query);
  const showHistoryItems = showHistory && query.length === 0 && history.length > 0;
  const showSuggestionItems = showSuggestions && query.length > 0 && suggestions.length > 0;
  const shouldShowDropdown = isFocused && (showHistoryItems || showSuggestionItems);

  // Helper function to get suggestion icon
  const getSuggestionIcon = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'content':
        return <FileText size={14} className="text-muted-foreground" />;
      case 'popular':
        return suggestion.metadata?.trending 
          ? <TrendingUp size={14} className="text-orange-500" />
          : <Star size={14} className="text-yellow-500" />;
      case 'category':
        return <Hash size={14} className="text-blue-500" />;
      case 'history':
        return <History size={14} className="text-muted-foreground" />;
      case 'completion':
        return <Search size={14} className="text-green-500" />;
      default:
        return <Search size={14} className="text-muted-foreground" />;
    }
  };

  /**
   * Auto-focus on mount if requested
   */
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSelectedSuggestionIndex(-1);
    
    // Suggestions will show automatically based on shouldShowDropdown
  }, [setQuery]);

  /**
   * Handle input focus
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  /**
   * Handle input blur
   */
  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsFocused(false);
      setSelectedSuggestionIndex(-1);
    }, 150);
  }, []);

  /**
   * Handle search submission
   */
  const handleSearch = useCallback((searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    addToHistory(searchQuery);
    setSelectedSuggestionIndex(-1);
    
    if (onSearch) {
      onSearch(searchQuery);
    }
    
    // Blur input on mobile to hide keyboard
    if (inputRef.current && window.innerWidth < 768) {
      inputRef.current.blur();
    }
  }, [query, addToHistory, onSearch]);

  /**
   * Handle clear search
   */
  const handleClear = useCallback(() => {
    clearSearch();
    setSelectedSuggestionIndex(-1);
    
    if (onClear) {
      onClear();
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [clearSearch, onClear]);

  /**
   * Handle suggestion selection
   */
  const handleSuggestionSelect = useCallback((suggestion: SearchSuggestion | string) => {
    const suggestionText = typeof suggestion === 'string' ? suggestion : suggestion.text;
    setQuery(suggestionText);
    handleSearch(suggestionText);
    
    // Track usage if it's a SearchSuggestion object
    if (typeof suggestion === 'object') {
      trackSuggestionUsage(suggestion);
    }
  }, [setQuery, handleSearch, trackSuggestionUsage]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowDropdown) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
      } else if (event.key === 'Escape') {
        handleClear();
      }
      return;
    }

    const items = showHistoryItems ? history : suggestions;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < items.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
        
      case 'Enter':
        event.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < items.length) {
          handleSuggestionSelect(items[selectedSuggestionIndex]);
        } else {
          handleSearch();
        }
        break;
        
              case 'Escape':
        event.preventDefault();
        setIsFocused(false);
        setSelectedSuggestionIndex(-1);
        if (inputRef.current) {
          inputRef.current.blur();
        }
        break;
        
              case 'Tab':
        setIsFocused(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  }, [
    shouldShowDropdown,
    showHistoryItems,
    history,
    suggestions,
    selectedSuggestionIndex,
    handleSearch,
    handleClear,
    handleSuggestionSelect
  ]);

  /**
   * Size-based styling
   */
  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-4',
    lg: 'h-12 text-lg px-5'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {showLoading && isLoading ? (
            <Loader2 
              size={iconSizes[size]} 
              className="animate-spin" 
              aria-hidden="true"
            />
          ) : (
            <Search 
              size={iconSizes[size]} 
              aria-hidden="true"
            />
          )}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full ${sizeClasses[size]} pl-10 pr-10
            bg-background border border-border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder:text-muted-foreground
            transition-all duration-200
            ${error ? 'border-destructive focus:ring-destructive' : ''}
            ${isFocused ? 'shadow-md' : 'shadow-sm'}
          `}
          aria-label="Search ACKS II content"
          aria-describedby={error ? 'search-error' : undefined}
          aria-expanded={shouldShowDropdown}
          aria-controls={shouldShowDropdown ? 'search-suggestions' : undefined}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              text-muted-foreground hover:text-foreground
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary rounded
              p-1
            "
            aria-label="Clear search"
          >
            <X size={iconSizes[size]} />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div 
          id="search-error"
          className="mt-1 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {shouldShowDropdown && (
        <div
          ref={suggestionsRef}
          id="search-suggestions"
          className="
            absolute top-full left-0 right-0 mt-1 z-50
            bg-background border border-border rounded-lg shadow-lg
            max-h-64 overflow-y-auto
          "
          role="listbox"
          aria-label="Search suggestions"
        >
          {/* History Items */}
          {showHistoryItems && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                Recent Searches
              </div>
              {history.slice(0, 5).map((item, index) => (
                <button
                  key={`history-${index}`}
                  type="button"
                  onClick={() => handleSuggestionSelect(item)}
                  className={`
                    w-full px-3 py-2 text-left text-sm
                    hover:bg-muted transition-colors duration-150
                    flex items-center gap-2
                    ${selectedSuggestionIndex === index ? 'bg-muted' : ''}
                  `}
                  role="option"
                  aria-selected={selectedSuggestionIndex === index}
                >
                  <Clock size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </>
          )}

          {/* Suggestion Items */}
          {showSuggestionItems && (
            <>
              {showHistoryItems && (
                <div className="border-t border-border" />
              )}
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                Suggestions
              </div>
              {suggestions.map((item, index) => (
                <button
                  key={`suggestion-${index}`}
                  type="button"
                  onClick={() => handleSuggestionSelect(item)}
                  className={`
                    w-full px-3 py-2 text-left text-sm
                    hover:bg-muted transition-colors duration-150
                    flex items-center gap-2
                    ${selectedSuggestionIndex === index ? 'bg-muted' : ''}
                  `}
                  role="option"
                  aria-selected={selectedSuggestionIndex === index}
                >
                  {getSuggestionIcon(item)}
                  <div className="flex-1 min-w-0">
                    <span className="truncate">{item.text}</span>
                    {item.metadata?.category && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {item.metadata.category}
                      </span>
                    )}
                  </div>
                  {item.metadata?.trending && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-1 rounded">
                      trending
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Compact Search Input for mobile/header use
 */
export function CompactSearchInput(props: Omit<SearchInputProps, 'size'>) {
  return (
    <SearchInput
      {...props}
      size="sm"
      showSuggestions={false}
      showHistory={false}
      className={`max-w-xs ${props.className || ''}`}
    />
  );
}

/**
 * Full-featured Search Input for main search pages
 */
export function FullSearchInput(props: SearchInputProps) {
  return (
    <SearchInput
      {...props}
      size="lg"
      showSuggestions={true}
      showHistory={true}
      autoFocus={true}
    />
  );
} 