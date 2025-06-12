'use client';

/**
 * Equipment Table Component for ACKS II Wiki
 * 
 * Displays equipment in a filterable, sortable table format with
 * responsive design optimized for both desktop and mobile viewing.
 * 
 * Features:
 * - Equipment filtering by category, cost, weight, and availability
 * - Sortable columns (name, cost, weight, damage, AC)
 * - Responsive table with mobile card view
 * - Search functionality
 * - Loading and error states
 * - Equipment comparison features
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
  Sword, 
  Shield, 
  Coins, 
  Weight,
  ChevronDown,
  ChevronUp,
  Grid,
  List as ListIcon,
  Package,
  Target,
  Star
} from 'lucide-react';
import { BaseContentCard } from './base-content-card';
import { AdaptiveTable, type TableColumn } from '../ui/adaptive-table';
import { type Equipment, EquipmentCategory } from '../../lib/types/content';

/**
 * Equipment table component props
 */
export interface EquipmentTableProps {
  /** Array of equipment to display */
  equipment?: Equipment[];
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
  /** Maximum number of items to show initially */
  initialLimit?: number;
  /** Additional CSS classes */
  className?: string;
  /** Callback when equipment is clicked */
  onEquipmentClick?: (equipment: Equipment) => void;
}

/**
 * Equipment filters interface
 */
interface EquipmentFilters {
  search: string;
  category: EquipmentCategory[];
  costRange: [number, number];
  weightRange: [number, number];
  availability: string[];
  sortBy: 'name' | 'cost' | 'weight' | 'damage' | 'armorClass';
  sortOrder: 'asc' | 'desc';
}

/**
 * Default filters
 */
const DEFAULT_FILTERS: EquipmentFilters = {
  search: '',
  category: [],
  costRange: [0, 10000],
  weightRange: [0, 100],
  availability: [],
  sortBy: 'name',
  sortOrder: 'asc'
};

/**
 * Equipment filter controls
 */
function EquipmentFilters({
  filters,
  onFiltersChange,
  equipment
}: {
  filters: EquipmentFilters;
  onFiltersChange: (filters: Partial<EquipmentFilters>) => void;
  equipment: Equipment[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate min/max values for range sliders
  const costRange = useMemo(() => {
    const costs = equipment.map(e => e.cost).filter(c => c > 0);
    return [Math.min(...costs, 0), Math.max(...costs, 10000)];
  }, [equipment]);

  const weightRange = useMemo(() => {
    const weights = equipment.map(e => e.weight).filter(w => w > 0);
    return [Math.min(...weights, 0), Math.max(...weights, 100)];
  }, [equipment]);

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
              placeholder="Search equipment..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="
                w-full pl-10 pr-4 py-2 border border-border rounded-md
                bg-background text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
            <div className="flex flex-wrap gap-1">
              {Object.values(EquipmentCategory).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const newCategories = filters.category.includes(category)
                      ? filters.category.filter(c => c !== category)
                      : [...filters.category, category];
                    onFiltersChange({ category: newCategories });
                  }}
                  className={`px-3 py-1 text-sm rounded capitalize ${
                    filters.category.includes(category)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Cost Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Cost Range: {filters.costRange[0]} - {filters.costRange[1]} gp
            </label>
            <div className="px-2">
              <input
                type="range"
                min={costRange[0]}
                max={costRange[1]}
                value={filters.costRange[1]}
                onChange={(e) => onFiltersChange({ 
                  costRange: [filters.costRange[0], parseInt(e.target.value)] 
                })}
                className="w-full"
              />
            </div>
          </div>

          {/* Weight Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Weight Range: {filters.weightRange[0]} - {filters.weightRange[1]} stone
            </label>
            <div className="px-2">
              <input
                type="range"
                min={weightRange[0]}
                max={weightRange[1]}
                value={filters.weightRange[1]}
                onChange={(e) => onFiltersChange({ 
                  weightRange: [filters.weightRange[0], parseInt(e.target.value)] 
                })}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => onFiltersChange({ sortBy: e.target.value as EquipmentFilters['sortBy'] })}
                className="
                  px-3 py-2 border border-border rounded-md bg-background
                  text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                "
              >
                <option value="name">Name</option>
                <option value="cost">Cost</option>
                <option value="weight">Weight</option>
                <option value="damage">Damage</option>
                <option value="armorClass">Armor Class</option>
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
 * Equipment card for mobile/card view
 */
function EquipmentCard({ 
  equipment, 
  onClick 
}: { 
  equipment: Equipment; 
  onClick?: () => void; 
}) {
  const getCategoryIcon = (category: EquipmentCategory) => {
    switch (category) {
      case EquipmentCategory.WEAPON:
        return <Sword size={14} className="text-red-500" />;
      case EquipmentCategory.ARMOR:
      case EquipmentCategory.SHIELD:
        return <Shield size={14} className="text-blue-500" />;
      default:
        return <Package size={14} className="text-muted-foreground" />;
    }
  };

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
            <h3 className="font-semibold text-foreground truncate">{equipment.title}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {equipment.equipmentCategory.replace('_', ' ')}
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
            {getCategoryIcon(equipment.equipmentCategory)}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Coins size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">Cost:</span>
            <span className="text-foreground">{equipment.cost} gp</span>
          </div>
          <div className="flex items-center gap-1">
            <Weight size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">Weight:</span>
            <span className="text-foreground">{equipment.weight} st</span>
          </div>
          {equipment.damage && (
            <div className="flex items-center gap-1">
              <Sword size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Damage:</span>
              <span className="text-foreground">{equipment.damage}</span>
            </div>
          )}
          {equipment.armorClass && (
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">AC:</span>
              <span className="text-foreground">{equipment.armorClass}</span>
            </div>
          )}
          {equipment.range && (
            <div className="col-span-2 flex items-center gap-1">
              <Target size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Range:</span>
              <span className="text-foreground">{equipment.range}</span>
            </div>
          )}
        </div>

        {/* Properties */}
        {equipment.properties && equipment.properties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {equipment.properties.map((property, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                {property}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {equipment.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {equipment.description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Equipment table for desktop view
 */
function EquipmentTableView({ 
  equipment, 
  onEquipmentClick,
  filters,
  onFiltersChange
}: { 
  equipment: Equipment[];
  onEquipmentClick?: (equipment: Equipment) => void;
  filters: EquipmentFilters;
  onFiltersChange: (filters: Partial<EquipmentFilters>) => void;
}) {
  const handleSort = (column: EquipmentFilters['sortBy']) => {
    if (filters.sortBy === column) {
      onFiltersChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      onFiltersChange({ sortBy: column, sortOrder: 'asc' });
    }
  };

  const SortIcon = ({ column }: { column: EquipmentFilters['sortBy'] }) => {
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
            <th className="text-left p-3 font-medium text-foreground">Category</th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('cost')}
            >
              <div className="flex items-center gap-1">
                Cost
                <SortIcon column="cost" />
              </div>
            </th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('weight')}
            >
              <div className="flex items-center gap-1">
                Weight
                <SortIcon column="weight" />
              </div>
            </th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('damage')}
            >
              <div className="flex items-center gap-1">
                Damage
                <SortIcon column="damage" />
              </div>
            </th>
            <th 
              className="text-left p-3 font-medium text-foreground cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('armorClass')}
            >
              <div className="flex items-center gap-1">
                AC
                <SortIcon column="armorClass" />
              </div>
            </th>
            <th className="text-left p-3 font-medium text-foreground">Properties</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr
              key={item.id}
              className={`
                border-b border-border hover:bg-muted/30 transition-colors
                ${onEquipmentClick ? 'cursor-pointer' : ''}
              `}
              onClick={() => onEquipmentClick?.(item)}
            >
              <td className="p-3">
                <div className="font-medium text-foreground">{item.title}</div>
              </td>
              <td className="p-3 text-sm text-muted-foreground capitalize">
                {item.equipmentCategory.replace('_', ' ')}
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Coins size={14} className="text-primary" />
                  <span className="font-medium text-foreground">{item.cost}</span>
                  <span className="text-xs text-muted-foreground">gp</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Weight size={14} className="text-muted-foreground" />
                  <span className="text-foreground">{item.weight}</span>
                  <span className="text-xs text-muted-foreground">st</span>
                </div>
              </td>
              <td className="p-3 text-sm text-muted-foreground">
                {item.damage || '-'}
              </td>
              <td className="p-3 text-sm text-muted-foreground">
                {item.armorClass || '-'}
              </td>
              <td className="p-3">
                {item.properties && item.properties.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.properties.slice(0, 2).map((property, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                        {property}
                      </span>
                    ))}
                    {item.properties.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{item.properties.length - 2} more
                      </span>
                    )}
                  </div>
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
 * Equipment table skeleton for loading state
 */
function EquipmentTableSkeleton({ viewMode }: { viewMode: 'table' | 'cards' }) {
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
 * Equipment Table Component
 */
export function EquipmentTable({
  equipment = [],
  isLoading = false,
  error,
  viewMode: initialViewMode = 'table',
  showFilters = true,
  showSearch = true,
  initialLimit = 50,
  className = '',
  onEquipmentClick
}: EquipmentTableProps) {
  const [filters, setFilters] = useState<EquipmentFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(initialViewMode);
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  // Filter and sort equipment
  const filteredEquipment = useMemo(() => {
    let filtered = equipment;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.equipmentCategory.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(item => filters.category.includes(item.equipmentCategory));
    }

    // Apply cost range filter
    filtered = filtered.filter(item => 
      item.cost >= filters.costRange[0] && item.cost <= filters.costRange[1]
    );

    // Apply weight range filter
    filtered = filtered.filter(item => 
      item.weight >= filters.weightRange[0] && item.weight <= filters.weightRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'cost':
          comparison = a.cost - b.cost;
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        case 'damage':
          if (!a.damage && !b.damage) comparison = 0;
          else if (!a.damage) comparison = 1;
          else if (!b.damage) comparison = -1;
          else comparison = a.damage.localeCompare(b.damage);
          break;
        case 'armorClass':
          if (!a.armorClass && !b.armorClass) comparison = 0;
          else if (!a.armorClass) comparison = 1;
          else if (!b.armorClass) comparison = -1;
          else comparison = a.armorClass - b.armorClass;
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [equipment, filters]);

  // Limit displayed equipment for performance
  const displayedEquipment = filteredEquipment.slice(0, displayLimit);

  const handleFiltersChange = useCallback((newFilters: Partial<EquipmentFilters>) => {
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
        <EquipmentTableSkeleton viewMode={viewMode} />
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
            <h2 className="text-xl font-bold text-foreground">Equipment</h2>
            <p className="text-sm text-muted-foreground">
              {filteredEquipment.length} of {equipment.length} items
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
          <EquipmentFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            equipment={equipment}
          />
        )}

        {/* Content */}
        {displayedEquipment.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {equipment.length === 0 ? 'No equipment available' : 'No equipment matches your filters'}
            </h3>
            <p className="text-muted-foreground">
              {equipment.length === 0 
                ? 'Equipment will appear here once it is loaded'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <EquipmentTableView
                equipment={displayedEquipment}
                onEquipmentClick={onEquipmentClick}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    onClick={() => onEquipmentClick?.(item)}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {displayedEquipment.length < filteredEquipment.length && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="
                    px-6 py-2 bg-primary text-primary-foreground rounded-md
                    hover:bg-primary/90 transition-colors
                  "
                >
                  Load More ({filteredEquipment.length - displayedEquipment.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </BaseContentCard>
  );
}

/**
 * Enhanced Equipment Table using Adaptive Table Component
 */
export function EnhancedEquipmentTable({
  equipment = [],
  isLoading = false,
  error,
  showFilters = true,
  initialLimit = 50,
  className = '',
  onEquipmentClick
}: Omit<EquipmentTableProps, 'viewMode' | 'showSearch'>) {
  const [filters, setFilters] = useState<EquipmentFilters>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });

  // Define columns with priorities for responsive behavior
  const columns: TableColumn<Equipment>[] = useMemo(() => [
    {
      key: 'title',
      header: 'Name',
      priority: 1,
      sortable: true,
      sticky: true,
      minWidth: '150px',
      render: (value, item) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground capitalize">
            {item.equipmentCategory.replace('_', ' ')}
          </div>
        </div>
      )
    },
    {
      key: 'cost',
      header: 'Cost',
      priority: 2,
      sortable: true,
      align: 'right',
      minWidth: '80px',
      render: (value) => (
        <div className="flex items-center justify-end gap-1">
          <Coins size={14} className="text-primary" />
          <span className="font-medium">{value}</span>
          <span className="text-xs text-muted-foreground">gp</span>
        </div>
      )
    },
    {
      key: 'weight',
      header: 'Weight',
      priority: 3,
      sortable: true,
      align: 'right',
      minWidth: '80px',
      render: (value) => (
        <div className="flex items-center justify-end gap-1">
          <Weight size={14} className="text-muted-foreground" />
          <span>{value}</span>
          <span className="text-xs text-muted-foreground">st</span>
        </div>
      )
    },
    {
      key: 'damage',
      header: 'Damage',
      priority: 4,
      sortable: true,
      align: 'center',
      minWidth: '80px',
      render: (value) => value || '-'
    },
    {
      key: 'armorClass',
      header: 'AC',
      priority: 4,
      sortable: true,
      align: 'center',
      minWidth: '60px',
      render: (value) => value || '-'
    },
    {
      key: 'range',
      header: 'Range',
      priority: 5,
      align: 'center',
      minWidth: '80px',
      render: (value) => value || '-'
    },
    {
      key: 'properties',
      header: 'Properties',
      priority: 5,
      minWidth: '120px',
      render: (value: string[]) => {
        if (!value || value.length === 0) return '-';
        
        return (
          <div className="flex flex-wrap gap-1">
            {value.slice(0, 2).map((property, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                {property}
              </span>
            ))}
            {value.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{value.length - 2} more
              </span>
            )}
          </div>
        );
      }
    }
  ], []);

  // Filter and sort equipment
  const processedEquipment = useMemo(() => {
    let filtered = equipment;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.equipmentCategory.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(item => filters.category.includes(item.equipmentCategory));
    }

    // Apply cost range filter
    filtered = filtered.filter(item => 
      item.cost >= filters.costRange[0] && item.cost <= filters.costRange[1]
    );

    // Apply weight range filter
    filtered = filtered.filter(item => 
      item.weight >= filters.weightRange[0] && item.weight <= filters.weightRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.key) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'cost':
          comparison = a.cost - b.cost;
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        case 'damage':
          if (!a.damage && !b.damage) comparison = 0;
          else if (!a.damage) comparison = 1;
          else if (!b.damage) comparison = -1;
          else comparison = a.damage.localeCompare(b.damage);
          break;
        case 'armorClass':
          if (!a.armorClass && !b.armorClass) comparison = 0;
          else if (!a.armorClass) comparison = 1;
          else if (!b.armorClass) comparison = -1;
          else comparison = a.armorClass - b.armorClass;
          break;
      }

      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [equipment, filters, sortConfig]);

  const handleFiltersChange = useCallback((newFilters: Partial<EquipmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleSortChange = useCallback((config: { key: string; direction: 'asc' | 'desc' }) => {
    setSortConfig(config);
  }, []);

  if (isLoading || error) {
    return (
      <BaseContentCard
        isLoading={isLoading}
        error={error}
        className={className}
      >
        {/* Loading/error handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  return (
    <BaseContentCard
      className={className}
      headerContent={
        <div>
          <h2 className="text-xl font-bold text-foreground">Equipment</h2>
          <p className="text-sm text-muted-foreground">
            {processedEquipment.length} of {equipment.length} items
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filters */}
        {showFilters && (
          <EquipmentFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            equipment={equipment}
          />
        )}

        {/* Adaptive Table */}
        <AdaptiveTable
          data={processedEquipment}
          columns={columns}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          onItemClick={onEquipmentClick}
          emptyMessage="No equipment matches your filters"
          initialLimit={initialLimit}
          storageKey="equipment-table-view"
        />
      </div>
    </BaseContentCard>
  );
}

export default EquipmentTable; 