'use client';

/**
 * Responsive Table Component for ACKS II Wiki
 * 
 * Advanced responsive table system with mobile optimization features:
 * - Horizontal scrolling with scroll indicators
 * - Collapsible rows for complex data
 * - Column prioritization for mobile screens
 * - Enhanced touch interactions
 * - Sticky headers and columns
 * - Zebra striping and hover effects
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Eye,
  EyeOff,
  SortAsc,
  SortDesc,
  ArrowUpDown
} from 'lucide-react';

/**
 * Column definition interface
 */
export interface TableColumn<T = any> {
  /** Unique column identifier */
  key: string;
  /** Column header text */
  header: string;
  /** Column priority (1 = highest, 5 = lowest) */
  priority: 1 | 2 | 3 | 4 | 5;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom render function for cell content */
  render?: (value: any, row: T, index: number) => React.ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Minimum width for responsive behavior */
  minWidth?: string;
  /** Whether column should be sticky */
  sticky?: boolean;
  /** Alignment of content */
  align?: 'left' | 'center' | 'right';
  /** Whether column can be hidden on mobile */
  hideable?: boolean;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Responsive table props
 */
export interface ResponsiveTableProps<T = any> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Whether to show zebra striping */
  striped?: boolean;
  /** Whether to show hover effects */
  hoverable?: boolean;
  /** Whether to enable row expansion */
  expandable?: boolean;
  /** Custom expansion content renderer */
  expandedContent?: (row: T, index: number) => React.ReactNode;
  /** Sort configuration */
  sortConfig?: SortConfig;
  /** Sort change handler */
  onSortChange?: (config: SortConfig) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Compact mode for smaller screens */
  compact?: boolean;
  /** Whether to show column visibility controls */
  showColumnControls?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Maximum height for scrollable table */
  maxHeight?: string;
}

/**
 * Scroll indicator component
 */
function ScrollIndicator({ 
  direction, 
  visible, 
  onClick 
}: { 
  direction: 'left' | 'right'; 
  visible: boolean; 
  onClick: () => void; 
}) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        w-8 h-8 bg-background/90 border border-border rounded-full
        flex items-center justify-center shadow-md
        hover:bg-muted transition-colors
        ${direction === 'left' ? 'left-2' : 'right-2'}
      `}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

/**
 * Column visibility control
 */
function ColumnVisibilityControl<T>({ 
  columns, 
  visibleColumns, 
  onToggleColumn 
}: { 
  columns: TableColumn<T>[]; 
  visibleColumns: Set<string>; 
  onToggleColumn: (key: string) => void; 
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
        Columns
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
            {columns.filter(col => col.hideable !== false).map((column) => (
              <label
                key={column.key}
                className="
                  flex items-center gap-2 px-2 py-1 text-sm
                  hover:bg-muted rounded cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.has(column.key)}
                  onChange={() => onToggleColumn(column.key)}
                  className="rounded"
                />
                {column.header}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Table skeleton for loading state
 */
function TableSkeleton({ 
  columns, 
  rows = 5 
}: { 
  columns: TableColumn[]; 
  rows?: number; 
}) {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className="space-y-2">
      {/* Header skeleton */}
      <div className="flex gap-2">
        {columns.map((column) => (
          <div 
            key={column.key} 
            className={`${skeletonClasses} h-10 flex-1`}
            style={{ minWidth: column.minWidth }}
          />
        ))}
      </div>
      
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-2">
          {columns.map((column) => (
            <div 
              key={column.key} 
              className={`${skeletonClasses} h-12 flex-1`}
              style={{ minWidth: column.minWidth }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Responsive Table Component
 */
export function ResponsiveTable<T = any>({
  data,
  columns,
  isLoading = false,
  error,
  striped = true,
  hoverable = true,
  expandable = false,
  expandedContent,
  sortConfig,
  onSortChange,
  onRowClick,
  className = '',
  compact = false,
  showColumnControls = true,
  emptyMessage = 'No data available',
  maxHeight
}: ResponsiveTableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [scrollPosition, setScrollPosition] = useState({ left: 0, right: 0 });
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.key))
  );

  // Calculate visible columns based on priority and screen size
  const prioritizedColumns = useMemo(() => {
    const sorted = [...columns].sort((a, b) => a.priority - b.priority);
    return sorted.filter(col => visibleColumns.has(col.key));
  }, [columns, visibleColumns]);

  // Handle scroll position tracking
  const handleScroll = useCallback(() => {
    if (!tableRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
    setScrollPosition({
      left: scrollLeft,
      right: scrollWidth - clientWidth - scrollLeft
    });
  }, []);

  // Set up scroll listener
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    table.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => table.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle row expansion
  const toggleRowExpansion = useCallback((index: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Handle column visibility toggle
  const toggleColumnVisibility = useCallback((key: string) => {
    setVisibleColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // Handle sorting
  const handleSort = useCallback((key: string) => {
    if (!onSortChange) return;
    
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    onSortChange({ key, direction });
  }, [sortConfig, onSortChange]);

  // Scroll table programmatically
  const scrollTable = useCallback((direction: 'left' | 'right') => {
    if (!tableRef.current) return;
    
    const scrollAmount = 200;
    const currentScroll = tableRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    tableRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  }, []);

  // Render sort icon
  const renderSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;
    
    if (sortConfig?.key === column.key) {
      return sortConfig.direction === 'asc' 
        ? <SortAsc size={14} /> 
        : <SortDesc size={14} />;
    }
    
    return <ArrowUpDown size={14} className="opacity-50" />;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showColumnControls && (
          <div className="flex justify-end">
            <div className="animate-pulse bg-muted rounded h-10 w-24" />
          </div>
        )}
        <TableSkeleton columns={prioritizedColumns} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-destructive font-medium">Error loading table data</p>
        <p className="text-muted-foreground text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Column controls */}
      {showColumnControls && (
        <div className="flex justify-end">
          <ColumnVisibilityControl
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={toggleColumnVisibility}
          />
        </div>
      )}

      {/* Table container */}
      <div className="relative">
        {/* Scroll indicators */}
        <ScrollIndicator
          direction="left"
          visible={scrollPosition.left > 0}
          onClick={() => scrollTable('left')}
        />
        <ScrollIndicator
          direction="right"
          visible={scrollPosition.right > 0}
          onClick={() => scrollTable('right')}
        />

        {/* Table wrapper */}
        <div
          ref={tableRef}
          className="overflow-x-auto border border-border rounded-lg"
          style={{ maxHeight }}
        >
          <table className="w-full border-collapse">
            {/* Header */}
            <thead className="bg-muted/50 sticky top-0 z-10">
              <tr>
                {expandable && (
                  <th className="w-10 p-2 border-b border-border" />
                )}
                {prioritizedColumns.map((column) => (
                  <th
                    key={column.key}
                    className={`
                      p-3 border-b border-border text-left font-medium
                      ${column.sortable ? 'cursor-pointer hover:bg-muted/70' : ''}
                      ${column.sticky ? 'sticky left-0 bg-muted/50 z-20' : ''}
                      ${column.className || ''}
                    `}
                    style={{ 
                      width: column.width, 
                      minWidth: column.minWidth,
                      textAlign: column.align 
                    }}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((row, index) => (
                <React.Fragment key={index}>
                  {/* Main row */}
                  <tr
                    className={`
                      border-b border-border transition-colors
                      ${striped && index % 2 === 1 ? 'bg-muted/20' : ''}
                      ${hoverable ? 'hover:bg-muted/30' : ''}
                      ${onRowClick ? 'cursor-pointer' : ''}
                      ${compact ? 'text-sm' : ''}
                    `}
                    onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                  >
                    {/* Expansion toggle */}
                    {expandable && (
                      <td className="p-2 border-b border-border">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(index);
                          }}
                          className="
                            p-1 hover:bg-muted rounded transition-colors
                            focus:outline-none focus:ring-2 focus:ring-primary
                          "
                          aria-label={
                            expandedRows.has(index) ? 'Collapse row' : 'Expand row'
                          }
                        >
                          {expandedRows.has(index) ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </td>
                    )}

                    {/* Data cells */}
                    {prioritizedColumns.map((column) => (
                      <td
                        key={column.key}
                        className={`
                          p-3 border-b border-border
                          ${column.sticky ? 'sticky left-0 bg-background z-10' : ''}
                          ${column.className || ''}
                        `}
                        style={{ 
                          width: column.width, 
                          minWidth: column.minWidth,
                          textAlign: column.align 
                        }}
                      >
                        {column.render 
                          ? column.render((row as any)[column.key], row, index)
                          : (row as any)[column.key]
                        }
                      </td>
                    ))}
                  </tr>

                  {/* Expanded content */}
                  {expandable && expandedRows.has(index) && expandedContent && (
                    <tr>
                      <td 
                        colSpan={prioritizedColumns.length + 1}
                        className="p-4 bg-muted/10 border-b border-border"
                      >
                        {expandedContent(row, index)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveTable; 