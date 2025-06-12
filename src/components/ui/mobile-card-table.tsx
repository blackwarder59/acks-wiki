'use client';

/**
 * Mobile Card Table Component for ACKS II Wiki
 * 
 * Displays table data in a card format optimized for mobile devices.
 * Provides better readability and touch interactions on small screens.
 * 
 * Features:
 * - Card-based layout for mobile optimization
 * - Collapsible sections for complex data
 * - Touch-friendly interactions
 * - Customizable field prioritization
 * - Search and filter integration
 * - Swipe gestures for actions
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { type TableColumn } from './responsive-table';

/**
 * Card field configuration
 */
export interface CardField<T = any> {
  /** Field key from data */
  key: string;
  /** Display label */
  label: string;
  /** Field priority for mobile display */
  priority: 1 | 2 | 3 | 4 | 5;
  /** Whether field is always visible */
  alwaysVisible?: boolean;
  /** Custom render function */
  render?: (value: any, row: T, index: number) => React.ReactNode;
  /** Field type for styling */
  type?: 'primary' | 'secondary' | 'accent' | 'muted';
  /** Whether field should be in header */
  isHeader?: boolean;
  /** Whether field should be in summary */
  isSummary?: boolean;
  /** Icon component */
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

/**
 * Mobile card table props
 */
export interface MobileCardTableProps<T = any> {
  /** Table data */
  data: T[];
  /** Field definitions */
  fields: CardField<T>[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Whether cards are expandable */
  expandable?: boolean;
  /** Search query */
  searchQuery?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Whether to show search */
  showSearch?: boolean;
  /** Whether to show field controls */
  showFieldControls?: boolean;
  /** Card click handler */
  onCardClick?: (row: T, index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Compact mode */
  compact?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Maximum number of cards to show initially */
  initialLimit?: number;
}

/**
 * Field visibility control
 */
function FieldVisibilityControl<T>({ 
  fields, 
  visibleFields, 
  onToggleField 
}: { 
  fields: CardField<T>[]; 
  visibleFields: Set<string>; 
  onToggleField: (key: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1 px-3 py-2 text-sm
          bg-muted hover:bg-muted/80 rounded-md transition-colors
        "
      >
        <Eye size={14} />
        Fields
        <ChevronDown size={14} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="
            absolute top-full right-0 mt-1 z-20
            bg-background border border-border rounded-md shadow-lg
            min-w-48 p-2
          ">
            {fields.filter(field => !field.alwaysVisible).map((field) => (
              <label
                key={field.key}
                className="
                  flex items-center gap-2 px-2 py-1 text-sm
                  hover:bg-muted rounded cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={visibleFields.has(field.key)}
                  onChange={() => onToggleField(field.key)}
                  className="rounded"
                />
                {field.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Card skeleton for loading state
 */
function CardSkeleton({ compact = false }: { compact?: boolean }) {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className={`border border-border rounded-lg p-4 space-y-3 ${compact ? 'p-3' : ''}`}>
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-5 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-1/2`} />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-2/3`} />
        {!compact && (
          <>
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-4 w-1/2`} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Individual card component
 */
function DataCard<T>({ 
  data, 
  fields, 
  visibleFields, 
  expandable, 
  compact, 
  onClick,
  index
}: { 
  data: T; 
  fields: CardField<T>[]; 
  visibleFields: Set<string>; 
  expandable: boolean; 
  compact: boolean; 
  onClick?: (row: T, index: number) => void;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Separate fields by type
  const headerFields = fields.filter(f => f.isHeader && visibleFields.has(f.key));
  const summaryFields = fields.filter(f => f.isSummary && visibleFields.has(f.key));
  const detailFields = fields.filter(f => 
    !f.isHeader && !f.isSummary && visibleFields.has(f.key)
  );

  // Sort fields by priority
  const sortedDetailFields = detailFields.sort((a, b) => a.priority - b.priority);

  const getFieldTypeClasses = (type?: string) => {
    switch (type) {
      case 'primary':
        return 'text-foreground font-medium';
      case 'secondary':
        return 'text-muted-foreground';
      case 'accent':
        return 'text-primary font-medium';
      case 'muted':
        return 'text-muted-foreground text-sm';
      default:
        return 'text-foreground';
    }
  };

  const renderField = (field: CardField<T>) => {
    const value = (data as any)[field.key];
    const content = field.render ? field.render(value, data, index) : value;
    
    return (
      <div key={field.key} className="flex items-start gap-2">
        {field.icon && <field.icon size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <span className="text-sm text-muted-foreground">{field.label}:</span>
          <div className={getFieldTypeClasses(field.type)}>
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
        border border-border rounded-lg bg-background
        transition-all duration-200 hover:shadow-md hover:border-primary/20
        ${onClick ? 'cursor-pointer' : ''}
        ${compact ? 'p-3' : 'p-4'}
      `}
      onClick={onClick ? () => onClick(data, index) : undefined}
    >
      {/* Header section */}
      {headerFields.length > 0 && (
        <div className="space-y-2 mb-3">
          {headerFields.map(renderField)}
        </div>
      )}

      {/* Summary section */}
      {summaryFields.length > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${headerFields.length > 0 ? 'mb-3' : ''}`}>
          {summaryFields.map(renderField)}
        </div>
      )}

      {/* Detail section */}
      {sortedDetailFields.length > 0 && (
        <>
          {expandable ? (
            <div className="space-y-2">
              {/* Always show first few fields */}
              {sortedDetailFields.slice(0, compact ? 2 : 3).map(renderField)}
              
              {/* Expandable section */}
              {sortedDetailFields.length > (compact ? 2 : 3) && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="
                      flex items-center gap-1 text-sm text-primary
                      hover:text-primary/80 transition-colors
                    "
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={14} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        Show {sortedDetailFields.length - (compact ? 2 : 3)} more
                      </>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      {sortedDetailFields.slice(compact ? 2 : 3).map(renderField)}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {sortedDetailFields.map(renderField)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Mobile Card Table Component
 */
export function MobileCardTable<T = any>({
  data,
  fields,
  isLoading = false,
  error,
  expandable = true,
  searchQuery = '',
  searchPlaceholder = 'Search...',
  showSearch = true,
  showFieldControls = true,
  onCardClick,
  className = '',
  compact = false,
  emptyMessage = 'No data available',
  initialLimit = 20
}: MobileCardTableProps<T>) {
  const [visibleFields, setVisibleFields] = useState<Set<string>>(
    new Set(fields.map(field => field.key))
  );
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      return fields.some(field => {
        const value = (item as any)[field.key];
        return value && value.toString().toLowerCase().includes(query);
      });
    });
  }, [data, fields, searchQuery]);

  // Limit displayed data for performance
  const displayedData = filteredData.slice(0, displayLimit);

  // Handle field visibility toggle
  const toggleFieldVisibility = useCallback((key: string) => {
    setVisibleFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // Load more data
  const loadMore = useCallback(() => {
    setDisplayLimit(prev => prev + initialLimit);
  }, [initialLimit]);

  // Loading state
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {(showSearch || showFieldControls) && (
          <div className="flex gap-2 justify-between">
            {showSearch && (
              <div className="animate-pulse bg-muted rounded h-10 flex-1" />
            )}
            {showFieldControls && (
              <div className="animate-pulse bg-muted rounded h-10 w-24" />
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} compact={compact} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-destructive font-medium">Error loading data</p>
        <p className="text-muted-foreground text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Empty state
  if (filteredData.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">
          {data.length === 0 ? emptyMessage : 'No results match your search'}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Controls */}
      {(showSearch || showFieldControls) && (
        <div className="flex gap-2 justify-between">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                readOnly
                className="
                  w-full pl-10 pr-4 py-2 border border-border rounded-md
                  bg-muted text-muted-foreground
                  cursor-not-allowed
                "
              />
            </div>
          )}
          
          {showFieldControls && (
            <FieldVisibilityControl
              fields={fields}
              visibleFields={visibleFields}
              onToggleField={toggleFieldVisibility}
            />
          )}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredData.length === data.length 
          ? `${data.length} items`
          : `${filteredData.length} of ${data.length} items`
        }
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4">
        {displayedData.map((item, index) => (
          <DataCard
            key={index}
            data={item}
            fields={fields}
            visibleFields={visibleFields}
            expandable={expandable}
            compact={compact}
            onClick={onCardClick}
            index={index}
          />
        ))}
      </div>

      {/* Load more */}
      {displayedData.length < filteredData.length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="
              px-6 py-2 bg-primary text-primary-foreground rounded-md
              hover:bg-primary/90 transition-colors
            "
          >
            Load More ({filteredData.length - displayedData.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Utility function to convert table columns to card fields
 */
export function columnsToFields<T>(columns: TableColumn<T>[]): CardField<T>[] {
  return columns.map(column => ({
    key: column.key,
    label: column.header,
    priority: column.priority,
    render: column.render,
    type: column.priority === 1 ? 'primary' : column.priority === 2 ? 'secondary' : 'muted',
    isHeader: column.priority === 1,
    isSummary: column.priority === 2,
    alwaysVisible: column.priority <= 2
  }));
}

export default MobileCardTable; 