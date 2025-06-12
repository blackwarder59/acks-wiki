'use client';

/**
 * Virtualized List Component for ACKS II Wiki
 * 
 * Efficiently renders large lists by only rendering visible items,
 * significantly improving performance for large datasets.
 * 
 * Features:
 * - Virtual scrolling with dynamic item heights
 * - Smooth scrolling with momentum
 * - Keyboard navigation support
 * - Accessibility compliance
 * - Search integration with highlighting
 * - Loading states and error handling
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react';
import { cn } from '@/lib/utils';
import { ContentPlaceholder } from './content-placeholders';

/**
 * Configuration for virtualized list behavior
 */
export interface VirtualizedListConfig {
  /** Number of items to render outside visible area */
  overscan?: number;
  /** Estimated item height for initial calculations */
  estimatedItemHeight?: number;
  /** Enable dynamic height calculation */
  dynamicHeight?: boolean;
  /** Scroll behavior configuration */
  scrollBehavior?: 'auto' | 'smooth';
  /** Enable keyboard navigation */
  enableKeyboardNav?: boolean;
  /** Threshold for loading more items */
  loadMoreThreshold?: number;
}

/**
 * Props for individual list items
 */
export interface VirtualizedListItemProps<T> {
  /** Item data */
  item: T;
  /** Item index in the full list */
  index: number;
  /** Whether item is currently visible */
  isVisible: boolean;
  /** Search query for highlighting */
  searchQuery?: string;
  /** Custom styling */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (item: T, index: number) => void;
  /** Additional props */
  [key: string]: any;
}

/**
 * Props for VirtualizedList component
 */
export interface VirtualizedListProps<T> {
  /** Array of items to render */
  items: T[];
  /** Component to render each item */
  renderItem: React.ComponentType<VirtualizedListItemProps<T>>;
  /** Unique key extractor for items */
  getItemKey: (item: T, index: number) => string | number;
  /** Height of the container */
  height: number;
  /** Configuration options */
  config?: VirtualizedListConfig;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string | null;
  /** Search query for highlighting */
  searchQuery?: string;
  /** Callback when more items should be loaded */
  onLoadMore?: () => void;
  /** Whether more items are available */
  hasMore?: boolean;
  /** Loading more items state */
  loadingMore?: boolean;
  /** Custom placeholder component */
  placeholder?: React.ComponentType<{ count?: number }>;
  /** Custom empty state component */
  emptyState?: React.ComponentType;
  /** Custom error component */
  errorComponent?: React.ComponentType<{ error: string }>;
  /** Container class name */
  className?: string;
  /** Item click handler */
  onItemClick?: (item: T, index: number) => void;
  /** Scroll event handler */
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
}

/**
 * Handle exposed by VirtualizedList via ref
 */
export interface VirtualizedListHandle {
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
  getScrollPosition: () => number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<VirtualizedListConfig> = {
  overscan: 5,
  estimatedItemHeight: 80,
  dynamicHeight: true,
  scrollBehavior: 'auto',
  enableKeyboardNav: true,
  loadMoreThreshold: 200
};

/**
 * Hook for calculating visible items and scroll position
 */
function useVirtualization<T>(
  items: T[],
  containerHeight: number,
  config: Required<VirtualizedListConfig>
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeights, setItemHeights] = useState<Map<number, number>>(new Map());
  const [totalHeight, setTotalHeight] = useState(0);

  // Calculate item positions and visible range
  const { visibleRange, itemPositions } = useMemo(() => {
    const positions: number[] = [];
    let currentPosition = 0;

    // Calculate positions based on known or estimated heights
    for (let i = 0; i < items.length; i++) {
      positions[i] = currentPosition;
      const height = itemHeights.get(i) || config.estimatedItemHeight;
      currentPosition += height;
    }

    const total = currentPosition;
    
    // Find visible range
    const startIndex = Math.max(0, 
      positions.findIndex(pos => pos + config.estimatedItemHeight >= scrollTop) - config.overscan
    );
    
    const endIndex = Math.min(items.length - 1,
      positions.findIndex(pos => pos > scrollTop + containerHeight) + config.overscan
    );

    return {
      visibleRange: { start: startIndex, end: endIndex === -1 ? items.length - 1 : endIndex },
      itemPositions: positions,
      totalHeight: total
    };
  }, [items.length, scrollTop, containerHeight, itemHeights, config.estimatedItemHeight, config.overscan]);

  // Update item height
  const updateItemHeight = useCallback((index: number, height: number) => {
    if (config.dynamicHeight) {
      setItemHeights(prev => {
        const newMap = new Map(prev);
        if (newMap.get(index) !== height) {
          newMap.set(index, height);
          return newMap;
        }
        return prev;
      });
    }
  }, [config.dynamicHeight]);

  // Update total height when item heights change
  useEffect(() => {
    if (config.dynamicHeight) {
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += itemHeights.get(i) || config.estimatedItemHeight;
      }
      setTotalHeight(total);
    } else {
      setTotalHeight(items.length * config.estimatedItemHeight);
    }
  }, [items.length, itemHeights, config.dynamicHeight, config.estimatedItemHeight]);

  return {
    visibleRange,
    itemPositions,
    totalHeight,
    scrollTop,
    setScrollTop,
    updateItemHeight
  };
}

/**
 * Individual virtualized item wrapper - Props definition
 */
interface StandaloneVirtualizedItemProps<T> {
  item: T;
  index: number;
  renderItem: React.ComponentType<VirtualizedListItemProps<T>>;
  position: number;
  onHeightChange: (index: number, height: number) => void;
  searchQuery?: string;
  style?: React.CSSProperties;
  onClick?: (item: T, index: number) => void;
  // We need to ensure all props expected by `renderItem` (via VirtualizedListItemProps<T>)
  // that are not explicitly listed here are handled or passed if necessary.
  // The original used: & Omit<VirtualizedListItemProps<T>, 'item' | 'index' | 'isVisible'>
  // For simplicity, we'll explicitly pass known ones. If renderItem needs more, they must be added.
}

/**
 * Individual virtualized item wrapper - Component definition
 */
const StandaloneVirtualizedItem = <T,>({
  item,
  index,
  renderItem: RenderItem,
  position,
  onHeightChange,
  searchQuery,
  style,
  onClick,
}: StandaloneVirtualizedItemProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      onHeightChange(index, height);
    }
  }); // Consider adding dependencies if re-measuring isn't always needed

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: position,
        left: 0,
        right: 0,
        ...style
      }}
    >
      <RenderItem
        item={item}
        index={index}
        isVisible={true} // This was part of the Omit, so it must be provided by VirtualizedItem itself.
        searchQuery={searchQuery}
        style={style} // Pass down style
        onClick={onClick} // Pass down onClick
        // Any other props from VirtualizedListItemProps should be explicitly passed here
        // if they were previously covered by the spread from Omit.
      />
    </div>
  );
};

const VirtualizedItem = React.memo(StandaloneVirtualizedItem) as typeof StandaloneVirtualizedItem;

// VirtualizedItem.displayName = 'VirtualizedItem'; // displayName is usually set on the memoized component
// React.memo typically forwards displayName from the wrapped component.

/**
 * Default empty state component
 */
const DefaultEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="text-muted-foreground text-lg mb-2">No items found</div>
    <div className="text-muted-foreground text-sm">Try adjusting your search or filters</div>
  </div>
);

/**
 * Default error component
 */
const DefaultErrorComponent: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="text-destructive text-lg mb-2">Error loading items</div>
    <div className="text-muted-foreground text-sm">{error}</div>
  </div>
);

/**
 * VirtualizedList component with comprehensive virtualization features
 */
export const VirtualizedList = forwardRef(<T,>(
  props: VirtualizedListProps<T>,
  ref: React.Ref<VirtualizedListHandle>
) => {
  const {
  items,
  renderItem,
  getItemKey,
  height,
  config: userConfig = {},
  loading = false,
  error = null,
  searchQuery,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  placeholder,
  emptyState: EmptyState = DefaultEmptyState,
  errorComponent: ErrorComponent = DefaultErrorComponent,
  className,
  onItemClick,
  onScroll
  } = props; // Destructure props here

  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const {
    visibleRange,
    itemPositions,
    totalHeight,
    scrollTop,
    setScrollTop,
    updateItemHeight
  } = useVirtualization(items, height, config);

  // Handle scroll events
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const newScrollTop = target.scrollTop;
    setScrollTop(newScrollTop);

    // Call external scroll handler
    onScroll?.(newScrollTop, target.scrollHeight, target.clientHeight);

    // Check if we need to load more items
    if (
      hasMore && 
      !loadingMore && 
      onLoadMore &&
      target.scrollHeight - target.scrollTop - target.clientHeight < config.loadMoreThreshold
    ) {
      onLoadMore();
    }
  }, [onScroll, hasMore, loadingMore, onLoadMore, config.loadMoreThreshold]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!config.enableKeyboardNav || items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => Math.min(items.length - 1, prev + 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => Math.max(0, prev - 1));
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          event.preventDefault();
          onItemClick?.(items[focusedIndex], focusedIndex);
        }
        break;
    }
  }, [config.enableKeyboardNav, items, focusedIndex, onItemClick]);

  // Scroll to focused item
  useEffect(() => {
    if (focusedIndex >= 0 && containerRef.current) {
      const itemPosition = itemPositions[focusedIndex];
      const itemHeight = config.estimatedItemHeight;
      const container = containerRef.current;

      if (itemPosition < scrollTop) {
        container.scrollTo({
          top: itemPosition,
          behavior: config.scrollBehavior
        });
      } else if (itemPosition + itemHeight > scrollTop + height) {
        container.scrollTo({
          top: itemPosition + itemHeight - height,
          behavior: config.scrollBehavior
        });
      }
    }
  }, [focusedIndex, itemPositions, scrollTop, height, config.estimatedItemHeight, config.scrollBehavior]);

  // Expose scroll methods via ref
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number, behavior: ScrollBehavior = config.scrollBehavior) => {
      if (containerRef.current && index >= 0 && index < items.length) {
        containerRef.current.scrollTo({
          top: itemPositions[index],
          behavior
        });
      }
    },
    scrollToTop: (behavior: ScrollBehavior = config.scrollBehavior) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior
        });
      }
    },
    getScrollPosition: () => scrollTop
  }), [itemPositions, items.length, scrollTop, config.scrollBehavior]);

  // Render loading state
  if (loading) {
    const PlaceholderComponent = placeholder || (() => <ContentPlaceholder type="list" count={8} />);
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ height }}>
        <PlaceholderComponent count={Math.ceil(height / config.estimatedItemHeight)} />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={cn("relative", className)} style={{ height }}>
        <ErrorComponent error={error} />
      </div>
    );
  }

  // Render empty state
  if (items.length === 0) {
    return (
      <div className={cn("relative", className)} style={{ height }}>
        <EmptyState />
      </div>
    );
  }

  // Render visible items
  const visibleItems = [];
  for (let i = visibleRange.start; i <= visibleRange.end; i++) {
    if (i >= 0 && i < items.length) {
      visibleItems.push(
        <VirtualizedItem
          key={getItemKey(items[i], i)}
          item={items[i]}
          index={i}
          renderItem={renderItem}
          position={itemPositions[i]}
          onHeightChange={updateItemHeight}
          searchQuery={searchQuery}
          onClick={onItemClick}
          style={{
            ...(focusedIndex === i && {
              outline: '2px solid hsl(var(--primary))',
              outlineOffset: '-2px'
            })
          }}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-auto focus:outline-none",
        className
      )}
      style={{ height }}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      tabIndex={config.enableKeyboardNav ? 0 : -1}
      role="listbox"
      aria-label="Virtualized list"
      aria-activedescendant={focusedIndex >= 0 ? `item-${focusedIndex}` : undefined}
    >
      {/* Virtual spacer for total height */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems}
      </div>

      {/* Load more indicator */}
      {loadingMore && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

/**
 * Hook for managing virtualized list state
 */
export function useVirtualizedList<T>(initialItems: T[] = []) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = useCallback(async (
    loader: () => Promise<T[]>,
    append = false
  ) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const newItems = await loader();
      
      if (append) {
        setItems(prev => [...prev, ...newItems]);
      } else {
        setItems(newItems);
      }

      // Update hasMore based on returned items
      setHasMore(newItems.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback((loader: () => Promise<T[]>) => {
    if (!loadingMore && hasMore) {
      loadItems(loader, true);
    }
  }, [loadItems, loadingMore, hasMore]);

  return {
    items,
    setItems,
    loading,
    loadingMore,
    error,
    hasMore,
    loadItems,
    loadMore,
    setError,
    setHasMore
  };
}

export default VirtualizedList; 