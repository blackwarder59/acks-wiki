'use client';

/**
 * Backlinks Component for ACKS II Wiki
 * 
 * Displays bidirectional references showing where the current content
 * is referenced from other content items.
 * 
 * Features:
 * - Aggregated backlink display with grouping
 * - Filtering and sorting options
 * - Reference type indicators
 * - Confidence scoring display
 * - Expandable sections for detailed view
 * - Performance optimization for large reference sets
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Link as LinkIcon,
  Star,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  type ContentType, 
  type ReferenceType,
  ReferenceRegistry,
  type ReferenceEntry
} from '@/lib/cross-references';

/**
 * Backlink display configuration
 */
export interface BacklinksConfig {
  /** Maximum number of backlinks to show initially */
  initialLimit?: number;
  /** Show confidence scores */
  showConfidence?: boolean;
  /** Show reference types */
  showReferenceTypes?: boolean;
  /** Enable grouping by content type */
  groupByContentType?: boolean;
  /** Enable sorting options */
  enableSorting?: boolean;
  /** Enable filtering options */
  enableFiltering?: boolean;
  /** Show preview on hover */
  showPreview?: boolean;
  /** Minimum confidence threshold to display */
  minConfidence?: number;
}

/**
 * Sorting options for backlinks
 */
export type BacklinkSortOption = 
  | 'confidence-desc' 
  | 'confidence-asc' 
  | 'title-asc' 
  | 'title-desc' 
  | 'type-asc' 
  | 'recent-first';

/**
 * Filter options for backlinks
 */
export interface BacklinkFilters {
  contentTypes: ContentType[];
  referenceTypes: ReferenceType[];
  minConfidence: number;
  searchQuery: string;
}

/**
 * Props for Backlinks component
 */
export interface BacklinksProps {
  /** Content ID to show backlinks for */
  contentId: string;
  /** Content type */
  contentType: ContentType;
  /** Reference registry instance */
  registry: ReferenceRegistry;
  /** Configuration options */
  config?: BacklinksConfig;
  /** Custom CSS classes */
  className?: string;
  /** Callback when backlink is clicked */
  onBacklinkClick?: (reference: ReferenceEntry) => void;
  /** Custom empty state component */
  emptyState?: React.ComponentType;
}

/**
 * Grouped backlinks by content type
 */
interface GroupedBacklinks {
  [contentType: string]: ReferenceEntry[];
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<BacklinksConfig> = {
  initialLimit: 10,
  showConfidence: true,
  showReferenceTypes: true,
  groupByContentType: true,
  enableSorting: true,
  enableFiltering: true,
  showPreview: true,
  minConfidence: 0.5
};

/**
 * Reference type icons and labels
 */
const REFERENCE_TYPE_CONFIG = {
  MENTIONS: { icon: Eye, label: 'Mentions', color: 'text-blue-600' },
  REQUIRES: { icon: AlertTriangle, label: 'Requires', color: 'text-orange-600' },
  RELATED: { icon: LinkIcon, label: 'Related', color: 'text-green-600' },
  VARIANT: { icon: Star, label: 'Variant', color: 'text-purple-600' },
  PREREQUISITE: { icon: AlertTriangle, label: 'Prerequisite', color: 'text-red-600' }
};

/**
 * Content type labels
 */
const CONTENT_TYPE_LABELS = {
  MONSTER: 'Monsters',
  SPELL: 'Spells',
  CLASS: 'Classes',
  EQUIPMENT: 'Equipment',
  RULE: 'Rules',
  PROFICIENCY: 'Proficiencies',
  DOMAIN_RULE: 'Domain Rules',
  JUDGE_TOOL: 'Judge Tools'
};

/**
 * Sort backlinks based on selected option
 */
function sortBacklinks(backlinks: ReferenceEntry[], sortOption: BacklinkSortOption, registry: ReferenceRegistry): ReferenceEntry[] {
  return [...backlinks].sort((a, b) => {
    switch (sortOption) {
      case 'confidence-desc':
        return (b.confidence || 0) - (a.confidence || 0);
      case 'confidence-asc':
        return (a.confidence || 0) - (b.confidence || 0);
      case 'title-asc': {
        const titleA = registry.getContentTitle(a.sourceId) || '';
        const titleB = registry.getContentTitle(b.sourceId) || '';
        return titleA.localeCompare(titleB);
      }
      case 'title-desc': {
        const titleA = registry.getContentTitle(a.sourceId) || '';
        const titleB = registry.getContentTitle(b.sourceId) || '';
        return titleB.localeCompare(titleA);
      }
      case 'type-asc':
        return a.referenceType.localeCompare(b.referenceType);
      case 'recent-first':
        return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
      default:
        return 0;
    }
  });
}

/**
 * Filter backlinks based on criteria
 */
function filterBacklinks(backlinks: ReferenceEntry[], filters: BacklinkFilters, registry: ReferenceRegistry): ReferenceEntry[] {
  return backlinks.filter(backlink => {
    if (filters.contentTypes.length > 0) {
      const sourceContentType = registry.getContentType(backlink.sourceId);
      if (!sourceContentType || !filters.contentTypes.includes(sourceContentType)) {
      return false;
      }
    }
    if (filters.referenceTypes.length > 0 && !filters.referenceTypes.includes(backlink.referenceType)) {
      return false;
    }
    if ((backlink.confidence || 0) < filters.minConfidence) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const title = (registry.getContentTitle(backlink.sourceId) || '').toLowerCase();
      const context = (backlink.context || '').toLowerCase();
      if (!title.includes(query) && !context.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Group backlinks by content type
 */
function groupBacklinks(backlinks: ReferenceEntry[], registry: ReferenceRegistry): GroupedBacklinks {
  return backlinks.reduce((groups, backlink) => {
    const type = registry.getContentType(backlink.sourceId);
    if (type) {
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(backlink);
    }
    return groups;
  }, {} as GroupedBacklinks);
}

/**
 * Individual backlink item component
 */
const BacklinkItem: React.FC<{
  reference: ReferenceEntry;
  config: Required<BacklinksConfig>;
  onBacklinkClick?: (reference: ReferenceEntry) => void;
  registry: ReferenceRegistry;
}> = ({ reference, config, onBacklinkClick, registry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (onBacklinkClick) {
      e.preventDefault();
      onBacklinkClick(reference);
    }
  }, [reference, onBacklinkClick]);

  const referenceTypeConfig = REFERENCE_TYPE_CONFIG[reference.referenceType.toUpperCase() as keyof typeof REFERENCE_TYPE_CONFIG];
  const ReferenceIcon = referenceTypeConfig?.icon || LinkIcon;
  const sourceContentType = registry.getContentType(reference.sourceId);

  return (
    <div className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Title and link */}
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={sourceContentType ? `/${sourceContentType.toLowerCase()}/${reference.sourceId}` : '#'}
              onClick={handleClick}
              className="font-medium text-foreground hover:text-primary transition-colors truncate"
            >
              {registry.getContentTitle(reference.sourceId) || reference.sourceId}
            </Link>
            <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </div>

          {/* Reference type and confidence */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
            {config.showReferenceTypes && (
              <div className="flex items-center gap-1">
                <ReferenceIcon className={cn("w-3 h-3", referenceTypeConfig?.color)} />
                <span>{referenceTypeConfig?.label || reference.referenceType}</span>
              </div>
            )}
            
            {config.showConfidence && reference.confidence && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-current opacity-60" />
                <span>{Math.round(reference.confidence * 100)}% confidence</span>
              </div>
            )}
          </div>

          {/* Context preview */}
          {reference.context && (
            <div className="text-sm text-muted-foreground">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <span>Context</span>
              </button>
              
              {isExpanded && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  {reference.context}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Backlinks group component
 */
const BacklinksGroup: React.FC<{
  contentType: string;
  backlinks: ReferenceEntry[];
  config: Required<BacklinksConfig>;
  onBacklinkClick?: (reference: ReferenceEntry) => void;
  registry: ReferenceRegistry;
}> = ({ contentType, backlinks, config, onBacklinkClick, registry }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span>{CONTENT_TYPE_LABELS[contentType.toUpperCase() as keyof typeof CONTENT_TYPE_LABELS] || contentType}</span>
        <span className="text-muted-foreground">({backlinks.length})</span>
      </button>
      
      {isExpanded && (
        <div className="space-y-2 ml-6">
          {backlinks.map((backlink, index) => (
            <BacklinkItem
              key={`${backlink.sourceId}-${index}`}
              reference={backlink}
              config={config}
              onBacklinkClick={onBacklinkClick}
              registry={registry}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Backlinks filter component
 */
const BacklinksFilter: React.FC<{
  filters: BacklinkFilters;
  onFiltersChange: (filters: BacklinkFilters) => void;
  availableContentTypes: ContentType[];
  availableReferenceTypes: ReferenceType[];
}> = ({ filters, onFiltersChange, availableContentTypes, availableReferenceTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors"
      >
        <Filter className="w-3 h-3" />
        <span>Filter</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-4 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[300px]">
          <div className="space-y-4">
            {/* Content Types */}
            <div>
              <label className="text-sm font-medium mb-2 block">Content Types</label>
              <div className="space-y-1">
                {availableContentTypes.map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.contentTypes.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...filters.contentTypes, type]
                          : filters.contentTypes.filter(t => t !== type);
                        onFiltersChange({ ...filters, contentTypes: newTypes });
                      }}
                      className="rounded"
                    />
                    <span>{CONTENT_TYPE_LABELS[type.toUpperCase() as keyof typeof CONTENT_TYPE_LABELS] || type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reference Types */}
            <div>
              <label className="text-sm font-medium mb-2 block">Reference Types</label>
              <div className="space-y-1">
                {availableReferenceTypes.map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.referenceTypes.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...filters.referenceTypes, type]
                          : filters.referenceTypes.filter(t => t !== type);
                        onFiltersChange({ ...filters, referenceTypes: newTypes });
                      }}
                      className="rounded"
                    />
                    <span>{REFERENCE_TYPE_CONFIG[type.toUpperCase() as keyof typeof REFERENCE_TYPE_CONFIG]?.label || type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Confidence Threshold */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Min Confidence: {Math.round(filters.minConfidence * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={filters.minConfidence}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minConfidence: parseFloat(e.target.value) 
                })}
                className="w-full"
              />
            </div>

            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
                placeholder="Search backlinks..."
                className="w-full px-3 py-1 text-sm border border-border rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Main Backlinks component
 */
export const Backlinks: React.FC<BacklinksProps> = ({
  contentId,
  contentType,
  registry,
  config: userConfig = {},
  className,
  onBacklinkClick,
  emptyState: EmptyState
}) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  
  // State management
  const [sortOption, setSortOption] = useState<BacklinkSortOption>('confidence-desc');
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState<BacklinkFilters>({
    contentTypes: [],
    referenceTypes: [],
    minConfidence: config.minConfidence,
    searchQuery: ''
  });

  // Get backlinks from registry
  const allBacklinks = useMemo(() => {
    return registry.getIncomingReferences(contentId);
  }, [registry, contentId]);

  // Get available filter options
  const availableContentTypes = useMemo(() => {
    return Array.from(new Set(allBacklinks.map(b => registry.getContentType(b.sourceId)).filter(Boolean as any as (x: ContentType | undefined) => x is ContentType)));
  }, [allBacklinks, registry]);

  const availableReferenceTypes = useMemo(() => {
    return Array.from(new Set(allBacklinks.map(b => b.referenceType)));
  }, [allBacklinks]);

  // Apply filters and sorting
  const processedBacklinks = useMemo(() => {
    let filtered = filterBacklinks(allBacklinks, filters, registry);
    let sorted = sortBacklinks(filtered, sortOption, registry);
    
    if (!showAll && sorted.length > config.initialLimit) {
      sorted = sorted.slice(0, config.initialLimit);
    }
    
    return sorted;
  }, [allBacklinks, filters, sortOption, showAll, config.initialLimit, registry]);

  // Group backlinks if enabled
  const groupedBacklinks = useMemo(() => {
    if (config.groupByContentType) {
      return groupBacklinks(processedBacklinks, registry);
    }
    return { all: processedBacklinks };
  }, [processedBacklinks, config.groupByContentType, registry]);

  // Default empty state
  const DefaultEmptyState = () => (
    <div className="text-center py-8 text-muted-foreground">
      <LinkIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
      <p>No backlinks found for this content.</p>
      <p className="text-sm mt-1">This content is not referenced by other items yet.</p>
    </div>
  );

  const EmptyComponent = EmptyState || DefaultEmptyState;

  if (allBacklinks.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="text-lg font-semibold">Backlinks</h3>
        <EmptyComponent />
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Backlinks ({allBacklinks.length})
        </h3>
        
        <div className="flex items-center gap-2">
          {/* Filter */}
          {config.enableFiltering && (
            <BacklinksFilter
              filters={filters}
              onFiltersChange={setFilters}
              availableContentTypes={availableContentTypes}
              availableReferenceTypes={availableReferenceTypes}
            />
          )}
          
          {/* Sort */}
          {config.enableSorting && (
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as BacklinkSortOption)}
              className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors"
            >
              <option value="confidence-desc">Confidence ↓</option>
              <option value="confidence-asc">Confidence ↑</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="type-asc">Type A-Z</option>
              <option value="recent-first">Recent First</option>
            </select>
          )}
        </div>
      </div>

      {/* Backlinks display */}
      {processedBacklinks.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          <p>No backlinks match the current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {config.groupByContentType ? (
            Object.entries(groupedBacklinks).map(([contentType, backlinks]) => (
              <BacklinksGroup
                key={contentType}
                contentType={contentType}
                backlinks={backlinks}
                config={config}
                onBacklinkClick={onBacklinkClick}
                registry={registry}
              />
            ))
          ) : (
            <div className="space-y-2">
              {processedBacklinks.map((backlink, index) => (
                <BacklinkItem
                  key={`${backlink.sourceId}-${index}`}
                  reference={backlink}
                  config={config}
                  onBacklinkClick={onBacklinkClick}
                  registry={registry}
                />
              ))}
            </div>
          )}

          {/* Show more button */}
          {!showAll && allBacklinks.length > config.initialLimit && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors border border-border rounded hover:bg-muted"
            >
              Show {allBacklinks.length - config.initialLimit} more backlinks
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Backlinks; 