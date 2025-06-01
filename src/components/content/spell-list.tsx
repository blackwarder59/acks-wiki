'use client';

/**
 * Spell List Component for ACKS II Wiki
 * 
 * Displays spells in a filterable, sortable list format with
 * responsive design optimized for both desktop and mobile viewing.
 * 
 * Features:
 * - Spell filtering by level, school, and magic type
 * - Sortable columns (name, level, range, duration)
 * - Responsive table with mobile card view
 * - Search functionality
 * - Loading and error states
 * - Virtualization for large spell lists
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Sparkles, 
  Clock, 
  Target, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Grid,
  List as ListIcon
} from 'lucide-react';
import { BaseContentCard } from './base-content-card';
import { type Spell, MagicType } from '../../lib/types/content';

/**
 * Spell list component props
 */
export interface SpellListProps {
  /** Array of spells to display */
  spells?: Spell[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Initial view mode */
  viewMode?: 'table' | 'cards';
  /** Whether to show filters */
  showFilters?: boolean;
  /** Whether to show search */
  showSearch?: boolean;
  /** Maximum number of spells to show initially */
  initialLimit?: number;
  /** Additional CSS classes */
  className?: string;
  /** Callback when spell is clicked */
  onSpellClick?: (spell: Spell) => void;
}

/**
 * Spell filters interface
 */
interface SpellFilters {
  search: string;
  level: number[];
  magicType: MagicType[];
  school: string[];
  sortBy: 'name' | 'level' | 'range' | 'duration';
  sortOrder: 'asc' | 'desc';
}

/**
 * Default filters
 */
const DEFAULT_FILTERS: SpellFilters = {
  search: '',
  level: [],
  magicType: [],
  school: [],
  sortBy: 'name',
  sortOrder: 'asc'
};

/**
 * Spell filter controls
 */
function SpellFilters({
  filters,
  onFiltersChange,
  availableSchools
}: {
  filters: SpellFilters;
  onFiltersChange: (filters: Partial<SpellFilters>) => void;
  availableSchools: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Filters</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="p-3 border-t border-border space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search spells..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="
                w-full pl-10 pr-4 py-2 border border-border rounded-md
                bg-background text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              "
            />
          </div>

          {/* Spell Level */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Spell Level</label>
            <div className="flex flex-wrap gap-1">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    const newLevels = filters.level.includes(level)
                      ? filters.level.filter(l => l !== level)
                      : [...filters.level, level];
                    onFiltersChange({ level: newLevels });
                  }}
                  className={`px-3 py-1 text-sm rounded ${
                    filters.level.includes(level)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Magic Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Magic Type</label>
            <div className="flex flex-wrap gap-1">
              {Object.values(MagicType).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    const newTypes = filters.magicType.includes(type)
                      ? filters.magicType.filter(t => t !== type)
                      : [...filters.magicType, type];
                    onFiltersChange({ magicType: newTypes });
                  }}
                  className={`px-3 py-1 text-sm rounded ${
                    filters.magicType.includes(type)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* School */}
          {availableSchools.length > 0 && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">School</label>
              <div className="flex flex-wrap gap-1">
                {availableSchools.map((school) => (
                  <button
                    key={school}
                    onClick={() => {
                      const newSchools = filters.school.includes(school)
                        ? filters.school.filter(s => s !== school)
                        : [...filters.school, school];
                      onFiltersChange({ school: newSchools });
                    }}
                    className={`px-3 py-1 text-sm rounded capitalize ${
                      filters.school.includes(school)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {school}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => onFiltersChange({ sortBy: e.target.value as SpellFilters['sortBy'] })}
                className="
                  px-3 py-2 border border-border rounded-md bg-background
                  text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                "
              >
                <option value="name">Name</option>
                <option value="level">Level</option>
                <option value="range">Range</option>
                <option value="duration">Duration</option>
              </select>
              <button
                onClick={() => onFiltersChange({ 
                  sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
                })}
                className="
                  px-3 py-2 border border-border rounded-md bg-background
                  hover:bg-muted transition-colors
                "
              >
                {filters.sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            className="
              w-full px-3 py-2 text-sm bg-muted text-muted-foreground
              rounded-md hover:bg-muted/80 transition-colors
            "
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Spell card for mobile/card view
 */
function SpellCard({ 
  spell, 
  onClick 
}: { 
  spell: Spell; 
  onClick?: () => void; 
}) {
  return (
    <div
      className={`
        p-4 border border-border rounded-lg bg-background
        transition-all duration-200 hover:shadow-md hover:border-primary/20
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{spell.title}</h3>
            <p className="text-sm text-muted-foreground">
              {spell.magicType} • Level {spell.level}
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
            <Sparkles size={12} />
            {spell.level}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Target size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">Range:</span>
            <span className="text-foreground">{spell.range}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-foreground">{spell.duration}</span>
          </div>
          {spell.spellType && (
            <div className="col-span-2 flex items-center gap-1">
              <BookOpen size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Type:</span>
              <span className="text-foreground">{spell.spellType}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {spell.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {spell.description}
          </p>
        )}

        {/* School */}
        {spell.school && (
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded capitalize">
              {spell.school}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Spell table for desktop view
 */
function SpellTable({ 
  spells, 
  onSpellClick,
  filters,
  onFiltersChange
}: { 
  spells: Spell[];
  onSpellClick?: (spell: Spell) => void;
  filters: SpellFilters;
  onFiltersChange: (filters: Partial<SpellFilters>) => void;
}) {
  const handleSort = (column: SpellFilters['sortBy']) => {
    if (filters.sortBy === column) {
      onFiltersChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      onFiltersChange({ sortBy: column, sortOrder: 'asc' });
    }
  };

  const SortIcon = ({ column }: { column: SpellFilters['sortBy'] }) => {
    if (filters.sortBy !== column) return null;
    return filters.sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                Name
                <SortIcon column="name" />
              </div>
            </th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('level')}
            >
              <div className="flex items-center gap-1">
                Level
                <SortIcon column="level" />
              </div>
            </th>
            <th className="text-left p-3 font-medium text-foreground">Type</th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('range')}
            >
              <div className="flex items-center gap-1">
                Range
                <SortIcon column="range" />
              </div>
            </th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('duration')}
            >
              <div className="flex items-center gap-1">
                Duration
                <SortIcon column="duration" />
              </div>
            </th>
            <th className="text-left p-3 font-medium text-foreground">School</th>
          </tr>
        </thead>
        <tbody>
          {spells.map((spell) => (
            <tr
              key={spell.id}
              className={`
                border-b border-border hover:bg-muted/30 transition-colors
                ${onSpellClick ? 'cursor-pointer' : ''}
              `}
              onClick={() => onSpellClick?.(spell)}
            >
              <td className="p-3">
                <div>
                  <div className="font-medium text-foreground">{spell.title}</div>
                  <div className="text-sm text-muted-foreground">{spell.magicType}</div>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Sparkles size={14} className="text-primary" />
                  <span className="font-medium text-foreground">{spell.level}</span>
                </div>
              </td>
              <td className="p-3 text-sm text-muted-foreground">{spell.spellType}</td>
              <td className="p-3 text-sm text-muted-foreground">{spell.range}</td>
              <td className="p-3 text-sm text-muted-foreground">{spell.duration}</td>
              <td className="p-3">
                {spell.school && (
                  <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded capitalize">
                    {spell.school}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Spell list skeleton for loading state
 */
function SpellListSkeleton({ viewMode }: { viewMode: 'table' | 'cards' }) {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 border border-border rounded-lg space-y-3">
            <div className="space-y-2">
              <div className={`${skeletonClasses} h-5 w-3/4`} />
              <div className={`${skeletonClasses} h-4 w-1/2`} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className={`${skeletonClasses} h-4 w-full`} />
              <div className={`${skeletonClasses} h-4 w-full`} />
            </div>
            <div className={`${skeletonClasses} h-12 w-full`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className={`${skeletonClasses} h-10 w-full`} />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`${skeletonClasses} h-12 w-full`} />
      ))}
    </div>
  );
}

/**
 * Spell List Component
 */
export function SpellList({
  spells = [],
  isLoading = false,
  error,
  viewMode: initialViewMode = 'table',
  showFilters = true,
  showSearch = true,
  initialLimit = 50,
  className = '',
  onSpellClick
}: SpellListProps) {
  const [filters, setFilters] = useState<SpellFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(initialViewMode);
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  // Extract available schools from spells
  const availableSchools = useMemo(() => {
    const schools = new Set<string>();
    spells.forEach(spell => {
      if (spell.school) schools.add(spell.school);
    });
    return Array.from(schools).sort();
  }, [spells]);

  // Filter and sort spells
  const filteredSpells = useMemo(() => {
    let filtered = spells;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(spell =>
        spell.title.toLowerCase().includes(searchLower) ||
        spell.description?.toLowerCase().includes(searchLower) ||
        spell.spellType.toLowerCase().includes(searchLower)
      );
    }

    // Apply level filter
    if (filters.level.length > 0) {
      filtered = filtered.filter(spell => filters.level.includes(spell.level));
    }

    // Apply magic type filter
    if (filters.magicType.length > 0) {
      filtered = filtered.filter(spell => filters.magicType.includes(spell.magicType));
    }

    // Apply school filter
    if (filters.school.length > 0) {
      filtered = filtered.filter(spell => 
        spell.school && filters.school.includes(spell.school)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'level':
          comparison = a.level - b.level;
          break;
        case 'range':
          comparison = a.range.localeCompare(b.range);
          break;
        case 'duration':
          comparison = a.duration.localeCompare(b.duration);
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [spells, filters]);

  // Limit displayed spells for performance
  const displayedSpells = filteredSpells.slice(0, displayLimit);

  const handleFiltersChange = useCallback((newFilters: Partial<SpellFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setDisplayLimit(initialLimit); // Reset limit when filters change
  }, [initialLimit]);

  const loadMore = useCallback(() => {
    setDisplayLimit(prev => prev + initialLimit);
  }, [initialLimit]);

  if (isLoading) {
    return (
      <BaseContentCard
        isLoading={true}
        className={className}
      >
        <SpellListSkeleton viewMode={viewMode} />
      </BaseContentCard>
    );
  }

  if (error) {
    return (
      <BaseContentCard
        error={error}
        className={className}
      >
        {/* Error content handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  return (
    <BaseContentCard
      className={className}
      headerContent={
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Spells</h2>
            <p className="text-sm text-muted-foreground">
              {filteredSpells.length} of {spells.length} spells
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border border-border rounded-md">
              <button
                onClick={() => setViewMode('table')}
                className={`
                  p-2 ${viewMode === 'table' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-muted-foreground hover:bg-muted'
                  }
                `}
                title="Table view"
              >
                <ListIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`
                  p-2 ${viewMode === 'cards' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-muted-foreground hover:bg-muted'
                  }
                `}
                title="Card view"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filters */}
        {showFilters && (
          <SpellFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableSchools={availableSchools}
          />
        )}

        {/* Content */}
        {displayedSpells.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {spells.length === 0 ? 'No spells available' : 'No spells match your filters'}
            </h3>
            <p className="text-muted-foreground">
              {spells.length === 0 
                ? 'Spells will appear here once they are loaded'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <SpellTable
                spells={displayedSpells}
                onSpellClick={onSpellClick}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSpells.map((spell) => (
                  <SpellCard
                    key={spell.id}
                    spell={spell}
                    onClick={() => onSpellClick?.(spell)}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {displayedSpells.length < filteredSpells.length && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="
                    px-6 py-2 bg-primary text-primary-foreground rounded-md
                    hover:bg-primary/90 transition-colors
                  "
                >
                  Load More ({filteredSpells.length - displayedSpells.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </BaseContentCard>
  );
}

export default SpellList; 