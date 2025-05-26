'use client';

/**
 * Adaptive Table Component for ACKS II Wiki
 * 
 * Intelligent table component that automatically adapts between table and card views
 * based on screen size, data complexity, and user preferences.
 * 
 * Features:
 * - Automatic view switching based on breakpoints
 * - Manual view toggle with user preference persistence
 * - Responsive column prioritization
 * - Touch-optimized interactions
 * - Accessibility compliance
 * - Performance optimization for large datasets
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Grid, 
  List as ListIcon, 
  Monitor, 
  Smartphone,
  Tablet
} from 'lucide-react';
import { ResponsiveTable, type TableColumn, type SortConfig } from './responsive-table';

// Re-export TableColumn for easier importing
export type { TableColumn };
import { MobileCardTable, type CardField, columnsToFields } from './mobile-card-table';

/**
 * View mode options
 */
export type ViewMode = 'auto' | 'table' | 'cards';

/**
 * Breakpoint configuration
 */
export interface BreakpointConfig {
  /** Mobile breakpoint (px) */
  mobile: number;
  /** Tablet breakpoint (px) */
  tablet: number;
  /** Desktop breakpoint (px) */
  desktop: number;
}

/**
 * Adaptive table props
 */
export interface AdaptiveTableProps<T = any> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Initial view mode */
  initialViewMode?: ViewMode;
  /** Whether to persist user view preference */
  persistViewMode?: boolean;
  /** Local storage key for view preference */
  storageKey?: string;
  /** Custom breakpoint configuration */
  breakpoints?: Partial<BreakpointConfig>;
  /** Sort configuration */
  sortConfig?: SortConfig;
  /** Sort change handler */
  onSortChange?: (config: SortConfig) => void;
  /** Row/card click handler */
  onItemClick?: (item: T, index: number) => void;
  /** Search query for filtering */
  searchQuery?: string;
  /** Whether to show view mode controls */
  showViewControls?: boolean;
  /** Whether to show column/field controls */
  showFieldControls?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Maximum height for table view */
  maxHeight?: string;
  /** Initial display limit */
  initialLimit?: number;
}

/**
 * Default breakpoint configuration
 */
const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};

/**
 * Hook for detecting screen size and determining optimal view
 */
function useAdaptiveView(
  breakpoints: BreakpointConfig,
  columns: TableColumn[],
  userPreference?: ViewMode
) {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [recommendedView, setRecommendedView] = useState<'table' | 'cards'>('table');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.mobile) {
        setScreenSize('mobile');
      } else if (width < breakpoints.tablet) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Initial check
    updateScreenSize();

    // Listen for resize events
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [breakpoints]);

  useEffect(() => {
    // Determine recommended view based on screen size and data complexity
    const columnCount = columns.length;
    const hasComplexColumns = columns.some(col => col.render || col.minWidth);
    
    if (screenSize === 'mobile') {
      setRecommendedView('cards');
    } else if (screenSize === 'tablet') {
      // Use cards for complex data on tablets
      setRecommendedView(columnCount > 6 || hasComplexColumns ? 'cards' : 'table');
    } else {
      // Desktop can handle most table layouts
      setRecommendedView(columnCount > 10 ? 'cards' : 'table');
    }
  }, [screenSize, columns]);

  // Determine actual view based on user preference
  const actualView = useMemo(() => {
    if (userPreference === 'auto' || !userPreference) {
      return recommendedView;
    }
    return userPreference === 'table' ? 'table' : 'cards';
  }, [userPreference, recommendedView]);

  return {
    screenSize,
    recommendedView,
    actualView
  };
}

/**
 * View mode selector component
 */
function ViewModeSelector({ 
  currentMode, 
  onModeChange, 
  screenSize,
  recommendedView
}: { 
  currentMode: ViewMode; 
  onModeChange: (mode: ViewMode) => void;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  recommendedView: 'table' | 'cards';
}) {
  const getScreenIcon = () => {
    switch (screenSize) {
      case 'mobile':
        return <Smartphone size={14} />;
      case 'tablet':
        return <Tablet size={14} />;
      default:
        return <Monitor size={14} />;
    }
  };

  return (
    <div className="flex items-center gap-1 border border-border rounded-md">
      <button
        onClick={() => onModeChange('auto')}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm transition-colors
          ${currentMode === 'auto' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-background text-muted-foreground hover:bg-muted'
          }
        `}
        title={`Auto (${recommendedView} recommended for ${screenSize})`}
      >
        {getScreenIcon()}
        Auto
      </button>
      
      <button
        onClick={() => onModeChange('table')}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm transition-colors
          ${currentMode === 'table' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-background text-muted-foreground hover:bg-muted'
          }
        `}
        title="Table view"
      >
        <ListIcon size={14} />
        Table
      </button>
      
      <button
        onClick={() => onModeChange('cards')}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm transition-colors
          ${currentMode === 'cards' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-background text-muted-foreground hover:bg-muted'
          }
        `}
        title="Card view"
      >
        <Grid size={14} />
        Cards
      </button>
    </div>
  );
}

/**
 * Adaptive Table Component
 */
export function AdaptiveTable<T = any>({
  data,
  columns,
  isLoading = false,
  error,
  initialViewMode = 'auto',
  persistViewMode = true,
  storageKey = 'adaptive-table-view',
  breakpoints = {},
  sortConfig,
  onSortChange,
  onItemClick,
  searchQuery = '',
  showViewControls = true,
  showFieldControls = true,
  className = '',
  emptyMessage = 'No data available',
  maxHeight,
  initialLimit = 50
}: AdaptiveTableProps<T>) {
  const mergedBreakpoints = { ...DEFAULT_BREAKPOINTS, ...breakpoints };
  
  // Load saved view preference
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (!persistViewMode || typeof window === 'undefined') {
      return initialViewMode;
    }
    
    try {
      const saved = localStorage.getItem(storageKey);
      return (saved as ViewMode) || initialViewMode;
    } catch {
      return initialViewMode;
    }
  });

  // Get adaptive view recommendations
  const { screenSize, recommendedView, actualView } = useAdaptiveView(
    mergedBreakpoints,
    columns,
    viewMode
  );

  // Convert columns to card fields
  const cardFields = useMemo(() => columnsToFields(columns), [columns]);

  // Handle view mode change
  const handleViewModeChange = useCallback((newMode: ViewMode) => {
    setViewMode(newMode);
    
    if (persistViewMode) {
      try {
        localStorage.setItem(storageKey, newMode);
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [persistViewMode, storageKey]);

  // Common props for both views
  const commonProps = {
    data,
    isLoading,
    error,
    className,
    emptyMessage
  };

  return (
    <div className="space-y-4">
      {/* View controls */}
      {showViewControls && !isLoading && !error && data.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {data.length} items • {screenSize} view • {actualView} layout
          </div>
          
          <ViewModeSelector
            currentMode={viewMode}
            onModeChange={handleViewModeChange}
            screenSize={screenSize}
            recommendedView={recommendedView}
          />
        </div>
      )}

      {/* Render appropriate view */}
      {actualView === 'table' ? (
        <ResponsiveTable
          {...commonProps}
          columns={columns}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
          onRowClick={onItemClick}
          showColumnControls={showFieldControls}
          maxHeight={maxHeight}
          compact={screenSize === 'mobile'}
          striped={true}
          hoverable={true}
          expandable={screenSize !== 'desktop'}
          expandedContent={screenSize !== 'desktop' ? (row, index) => (
            <div className="space-y-2">
              {columns
                .filter(col => col.priority > 2)
                .map(col => (
                  <div key={col.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{col.header}:</span>
                    <span className="text-foreground">
                      {col.render 
                        ? col.render((row as any)[col.key], row, index)
                        : (row as any)[col.key]
                      }
                    </span>
                  </div>
                ))
              }
            </div>
          ) : undefined}
        />
      ) : (
        <MobileCardTable
          {...commonProps}
          fields={cardFields}
          searchQuery={searchQuery}
          onCardClick={onItemClick}
          showFieldControls={showFieldControls}
          expandable={true}
          compact={screenSize === 'mobile'}
          initialLimit={initialLimit}
        />
      )}
    </div>
  );
}

export default AdaptiveTable; 