'use client';

/**
 * Bookmark Button Component for ACKS II Wiki
 * 
 * A reusable button component for bookmarking content throughout the application.
 * Integrates with the useBookmarks hook and provides visual feedback for state changes.
 * 
 * Features:
 * - Toggle bookmark state with visual feedback
 * - Category selection for new bookmarks
 * - Loading states and error handling
 * - Accessible design with proper ARIA labels
 * - Customizable appearance and size
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { Bookmark, BookmarkCheck, Loader2, Plus } from 'lucide-react';
import { useBookmarks, type BookmarkCategory } from '../../lib/hooks/use-bookmarks';
import { type AnyContent } from '../../lib/types/content';

/**
 * Bookmark button props
 */
export interface BookmarkButtonProps {
  /** Content to bookmark */
  content: AnyContent;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Button style variant */
  variant?: 'default' | 'ghost' | 'outline';
  /** Whether to show text label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Whether to show category selection */
  showCategorySelection?: boolean;
  /** Default category for new bookmarks */
  defaultCategory?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when bookmark state changes */
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

/**
 * Category selection dropdown component
 */
function CategorySelector({
  categories,
  selectedCategory,
  onCategorySelect,
  onClose
}: {
  categories: BookmarkCategory[];
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-background border border-border rounded-md shadow-lg min-w-48">
      <div className="p-2">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Select Category
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategorySelect(category.id);
                onClose();
              }}
              className="
                w-full text-left px-2 py-1.5 text-sm rounded
                hover:bg-muted transition-colors
                flex items-center gap-2
              "
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{category.name}</div>
                {category.description && (
                  <div className="text-xs text-muted-foreground truncate">
                    {category.description}
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {category.count}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Bookmark Button Component
 */
export function BookmarkButton({
  content,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  showCategorySelection = true,
  defaultCategory,
  className = '',
  onBookmarkChange
}: BookmarkButtonProps) {
  const {
    isBookmarked,
    addBookmark,
    removeBookmark,
    categories,
    isLoading: bookmarksLoading
  } = useBookmarks();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookmarked = isBookmarked(content.id);

  // Size variants
  const sizeClasses = {
    sm: 'h-7 px-2 text-xs',
    md: 'h-9 px-3 text-sm',
    lg: 'h-11 px-4 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // Variant styles
  const variantClasses = {
    default: bookmarked
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-muted text-muted-foreground hover:bg-muted/80',
    ghost: bookmarked
      ? 'text-primary hover:bg-primary/10'
      : 'text-muted-foreground hover:bg-muted',
    outline: bookmarked
      ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10'
      : 'border-border text-muted-foreground hover:bg-muted'
  };

  /**
   * Handle bookmark toggle
   */
  const handleBookmarkToggle = useCallback(async (categoryId?: string) => {
    if (isProcessing || bookmarksLoading) return;

    setIsProcessing(true);
    setError(null);

    try {
      let success = false;

      if (bookmarked) {
        success = await removeBookmark(content.id);
      } else {
        const category = categoryId || defaultCategory;
        success = await addBookmark(content, category);
      }

      if (success) {
        onBookmarkChange?.(!bookmarked);
      } else {
        setError(bookmarked ? 'Failed to remove bookmark' : 'Failed to add bookmark');
      }
    } catch (err) {
      console.error('Bookmark operation failed:', err);
      setError('Bookmark operation failed');
    } finally {
      setIsProcessing(false);
    }
  }, [
    isProcessing,
    bookmarksLoading,
    bookmarked,
    removeBookmark,
    addBookmark,
    content,
    defaultCategory,
    onBookmarkChange
  ]);

  /**
   * Handle button click
   */
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (bookmarked) {
      // Remove bookmark directly
      handleBookmarkToggle();
    } else if (showCategorySelection && categories.length > 0) {
      // Show category selection
      setShowCategories(true);
    } else {
      // Add bookmark without category
      handleBookmarkToggle();
    }
  }, [bookmarked, showCategorySelection, categories.length, handleBookmarkToggle]);

  /**
   * Handle category selection
   */
  const handleCategorySelect = useCallback((categoryId: string) => {
    handleBookmarkToggle(categoryId);
    setShowCategories(false);
  }, [handleBookmarkToggle]);

  // Determine button content
  const buttonIcon = isProcessing ? (
    <Loader2 className={`${iconSizes[size]} animate-spin`} />
  ) : bookmarked ? (
    <BookmarkCheck className={iconSizes[size]} />
  ) : (
    <Bookmark className={iconSizes[size]} />
  );

  const buttonText = label || (bookmarked ? 'Bookmarked' : 'Bookmark');

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isProcessing || bookmarksLoading}
        className={`
          inline-flex items-center gap-2 rounded-md font-medium
          transition-all duration-200 focus:outline-none focus:ring-2 
          focus:ring-primary focus:ring-offset-2 disabled:opacity-50 
          disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        aria-label={
          bookmarked 
            ? `Remove ${content.title} from bookmarks`
            : `Add ${content.title} to bookmarks`
        }
        title={error || (bookmarked ? 'Remove bookmark' : 'Add bookmark')}
      >
        {buttonIcon}
        {showLabel && (
          <span className="truncate">
            {buttonText}
          </span>
        )}
      </button>

      {/* Category Selection Dropdown */}
      {showCategories && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowCategories(false)}
          />
          
          {/* Dropdown */}
          <CategorySelector
            categories={categories}
            selectedCategory={defaultCategory}
            onCategorySelect={handleCategorySelect}
            onClose={() => setShowCategories(false)}
          />
        </>
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Compact bookmark button for use in lists
 */
export function CompactBookmarkButton({
  content,
  className = ''
}: {
  content: AnyContent;
  className?: string;
}) {
  return (
    <BookmarkButton
      content={content}
      size="sm"
      variant="ghost"
      showLabel={false}
      showCategorySelection={false}
      className={className}
    />
  );
}

/**
 * Bookmark button with label for detailed views
 */
export function LabeledBookmarkButton({
  content,
  className = ''
}: {
  content: AnyContent;
  className?: string;
}) {
  return (
    <BookmarkButton
      content={content}
      size="md"
      variant="default"
      showLabel={true}
      showCategorySelection={true}
      className={className}
    />
  );
}

export default BookmarkButton; 