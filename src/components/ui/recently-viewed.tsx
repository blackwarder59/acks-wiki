'use client';

/**
 * Recently Viewed Component for ACKS II Wiki
 * 
 * Displays a list of recently accessed content with management options.
 * Integrates with the useBookmarks hook for recently viewed tracking.
 * 
 * Features:
 * - Displays recently viewed content in chronological order
 * - Individual item removal with confirmation
 * - Clear all history functionality
 * - Responsive design with mobile optimization
 * - Empty state handling
 * - Content type indicators
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { Clock, X, Trash2, Eye, ExternalLink } from 'lucide-react';
import { useBookmarks, type RecentlyViewedItem } from '../../lib/hooks/use-bookmarks';
import { type ContentType } from '../../lib/types/content';

/**
 * Recently viewed props
 */
export interface RecentlyViewedProps {
  /** Maximum number of items to display */
  maxItems?: number;
  /** Whether to show clear all button */
  showClearAll?: boolean;
  /** Whether to show individual remove buttons */
  showRemoveButtons?: boolean;
  /** Whether to show view counts */
  showViewCounts?: boolean;
  /** Layout variant */
  variant?: 'list' | 'grid' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Callback when item is clicked */
  onItemClick?: (item: RecentlyViewedItem) => void;
}

/**
 * Content type icon mapping
 */
const contentTypeIcons: Record<ContentType, string> = {
  monster: '🐉',
  spell: '✨',
  class: '⚔️',
  equipment: '🛡️',
  rule: '📜'
};

/**
 * Content type colors
 */
const contentTypeColors: Record<ContentType, string> = {
  monster: 'text-red-600',
  spell: 'text-purple-600',
  class: 'text-blue-600',
  equipment: 'text-amber-600',
  rule: 'text-green-600'
};

/**
 * Format relative time
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

/**
 * Recently viewed item component
 */
function RecentlyViewedItemComponent({
  item,
  showRemoveButton = true,
  showViewCount = true,
  variant = 'list',
  onRemove,
  onClick
}: {
  item: RecentlyViewedItem;
  showRemoveButton?: boolean;
  showViewCount?: boolean;
  variant?: 'list' | 'grid' | 'compact';
  onRemove?: (contentId: string) => void;
  onClick?: (item: RecentlyViewedItem) => void;
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRemoving) return;
    
    setIsRemoving(true);
    try {
      onRemove?.(item.contentId);
    } finally {
      setIsRemoving(false);
    }
  }, [isRemoving, onRemove, item.contentId]);

  const handleClick = useCallback(() => {
    onClick?.(item);
  }, [onClick, item]);

  if (variant === 'compact') {
    return (
      <div
        className="
          flex items-center gap-2 p-2 rounded hover:bg-muted/50 
          transition-colors cursor-pointer group
        "
        onClick={handleClick}
      >
        <span className="text-sm">
          {contentTypeIcons[item.contentType]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {item.title}
          </div>
        </div>
        {showViewCount && (
          <div className="text-xs text-muted-foreground">
            {item.viewCount}
          </div>
        )}
        {showRemoveButton && (
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="
              opacity-0 group-hover:opacity-100 transition-opacity
              p-1 hover:bg-destructive/10 rounded text-muted-foreground
              hover:text-destructive disabled:opacity-50
            "
            aria-label={`Remove ${item.title} from recently viewed`}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`
        p-3 border border-border rounded-lg hover:shadow-sm 
        transition-all cursor-pointer group bg-background
        ${variant === 'grid' ? 'h-full' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Content type indicator */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full bg-muted 
          flex items-center justify-center text-sm
          ${contentTypeColors[item.contentType]}
        `}>
          {contentTypeIcons[item.contentType]}
        </div>

        {/* Content info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm leading-tight truncate">
              {item.title}
            </h4>
            {showRemoveButton && (
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="
                  opacity-0 group-hover:opacity-100 transition-opacity
                  p-1 hover:bg-destructive/10 rounded text-muted-foreground
                  hover:text-destructive disabled:opacity-50 flex-shrink-0
                "
                aria-label={`Remove ${item.title} from recently viewed`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {item.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(item.viewedAt)}
            </div>
            {showViewCount && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {item.viewCount} view{item.viewCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div className="text-center py-8">
      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
      <h3 className="text-sm font-medium text-foreground mb-1">
        No recently viewed content
      </h3>
      <p className="text-xs text-muted-foreground">
        Content you view will appear here for quick access
      </p>
    </div>
  );
}

/**
 * Recently Viewed Component
 */
export function RecentlyViewed({
  maxItems = 10,
  showClearAll = true,
  showRemoveButtons = true,
  showViewCounts = true,
  variant = 'list',
  className = '',
  onItemClick
}: RecentlyViewedProps) {
  const {
    recentlyViewed,
    clearRecentlyViewed,
    removeFromRecentlyViewed,
    isLoading
  } = useBookmarks();

  const [isClearing, setIsClearing] = useState(false);

  // Limit items to display
  const displayItems = recentlyViewed.slice(0, maxItems);

  /**
   * Handle clear all
   */
  const handleClearAll = useCallback(async () => {
    if (isClearing) return;
    
    setIsClearing(true);
    try {
      clearRecentlyViewed();
    } finally {
      setIsClearing(false);
    }
  }, [isClearing, clearRecentlyViewed]);

  /**
   * Handle item removal
   */
  const handleItemRemove = useCallback((contentId: string) => {
    removeFromRecentlyViewed(contentId);
  }, [removeFromRecentlyViewed]);

  if (isLoading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className={className}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">
          Recently Viewed
        </h3>
        {showClearAll && displayItems.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={isClearing}
            className="
              text-xs text-muted-foreground hover:text-destructive
              transition-colors disabled:opacity-50 flex items-center gap-1
            "
          >
            <Trash2 className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Content */}
      <div className={`
        ${variant === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' 
          : 'space-y-2'
        }
      `}>
        {displayItems.map((item) => (
          <RecentlyViewedItemComponent
            key={item.contentId}
            item={item}
            showRemoveButton={showRemoveButtons}
            showViewCount={showViewCounts}
            variant={variant}
            onRemove={handleItemRemove}
            onClick={onItemClick}
          />
        ))}
      </div>

      {/* Show more indicator */}
      {recentlyViewed.length > maxItems && (
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Showing {maxItems} of {recentlyViewed.length} items
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact recently viewed for sidebars
 */
export function CompactRecentlyViewed({
  maxItems = 5,
  className = ''
}: {
  maxItems?: number;
  className?: string;
}) {
  return (
    <RecentlyViewed
      maxItems={maxItems}
      showClearAll={false}
      showRemoveButtons={false}
      showViewCounts={false}
      variant="compact"
      className={className}
    />
  );
}

export default RecentlyViewed; 