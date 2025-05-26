'use client';

/**
 * Advanced Filters Component for ACKS II Wiki
 * 
 * Provides comprehensive filtering capabilities for ACKS-specific attributes
 * including spell levels, character levels, monster HD, class types, and more.
 * 
 * Features:
 * - Range sliders for numeric attributes (HD, levels)
 * - Multi-select dropdowns for categorical filters
 * - Filter presets for common combinations
 * - Collapsible sections for mobile optimization
 * - Real-time filter application
 * - LocalStorage persistence
 * - AND/OR logic toggle
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Bookmark, Settings } from 'lucide-react';
import { ContentType } from '@/lib/types/content';

/**
 * ACKS-specific attribute filters interface
 */
export interface ACKSFilters {
  /** Spell level range (1-9) */
  spellLevel: number[];
  /** Character level range (1-14+) */
  characterLevel: [number, number];
  /** Monster Hit Dice range (0.25-20+) */
  monsterHD: [number, number];
  /** Class types */
  classType: string[];
  /** Equipment categories */
  equipmentCategory: string[];
  /** Spell schools */
  spellSchool: string[];
  /** Monster types */
  monsterType: string[];
  /** Alignment */
  alignment: string[];
  /** Magic type (arcane/divine) */
  magicType: string[];
  /** Filter combination logic */
  filterLogic: 'AND' | 'OR';
}

/**
 * Filter preset configuration
 */
interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: Partial<ACKSFilters>;
  contentTypes: ContentType[];
}

/**
 * Advanced filters component props
 */
interface AdvancedFiltersProps {
  /** Current ACKS filters */
  filters: ACKSFilters;
  /** Current content type filters */
  contentTypes: ContentType[];
  /** Callback when filters change */
  onFiltersChange: (filters: Partial<ACKSFilters>) => void;
  /** Callback when content types change */
  onContentTypesChange: (types: ContentType[]) => void;
  /** Whether filters are expanded */
  isExpanded?: boolean;
  /** Callback when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Default ACKS filters
 */
const DEFAULT_ACKS_FILTERS: ACKSFilters = {
  spellLevel: [],
  characterLevel: [1, 14],
  monsterHD: [0.25, 20],
  classType: [],
  equipmentCategory: [],
  spellSchool: [],
  monsterType: [],
  alignment: [],
  magicType: [],
  filterLogic: 'AND'
};

/**
 * Filter presets for common combinations
 */
const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'low-level-spells',
    name: 'Low Level Spells',
    description: 'Spells for beginning characters (levels 1-2)',
    filters: { spellLevel: [1, 2] },
    contentTypes: [ContentType.SPELL]
  },
  {
    id: 'undead-monsters',
    name: 'Undead Creatures',
    description: 'All undead monsters',
    filters: { monsterType: ['undead'] },
    contentTypes: [ContentType.MONSTER]
  },
  {
    id: 'fighter-classes',
    name: 'Fighting Classes',
    description: 'Combat-focused character classes',
    filters: { classType: ['fighter', 'ranger', 'paladin'] },
    contentTypes: [ContentType.CLASS]
  },
  {
    id: 'weapons-armor',
    name: 'Combat Equipment',
    description: 'Weapons and armor',
    filters: { equipmentCategory: ['weapons', 'armor'] },
    contentTypes: [ContentType.EQUIPMENT]
  },
  {
    id: 'weak-monsters',
    name: 'Low HD Monsters',
    description: 'Monsters with 1-3 HD',
    filters: { monsterHD: [0.25, 3] },
    contentTypes: [ContentType.MONSTER]
  }
];

/**
 * ACKS-specific filter options
 */
const FILTER_OPTIONS = {
  classType: [
    'fighter', 'mage', 'cleric', 'thief', 'ranger', 'paladin', 'assassin',
    'barbarian', 'bard', 'bladedancer', 'dwarven craftpriest', 'dwarven vaultguard',
    'elven enchanter', 'elven ranger', 'elven spellsword', 'explorer', 'mystic',
    'nobiran wonderworker', 'priestess', 'shaman', 'warlock', 'witch'
  ],
  equipmentCategory: [
    'weapons', 'armor', 'shields', 'adventuring gear', 'tools', 'containers',
    'clothing', 'food and drink', 'lodging', 'transportation', 'services',
    'animals', 'vehicles', 'siege engines', 'magical items'
  ],
  spellSchool: [
    'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation',
    'illusion', 'necromancy', 'transmutation'
  ],
  monsterType: [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental',
    'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant',
    'undead'
  ],
  alignment: [
    'lawful', 'neutral', 'chaotic'
  ],
  magicType: [
    'arcane', 'divine'
  ]
};

/**
 * Range Slider Component
 */
interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  formatValue?: (value: number) => string;
  marks?: Record<number, string>;
}

function RangeSlider({ 
  min, 
  max, 
  step, 
  value, 
  onChange, 
  label, 
  formatValue = (v) => v.toString(),
  marks 
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    const newValue: [number, number] = [newMin, Math.max(newMin, localValue[1])];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    const newValue: [number, number] = [Math.min(localValue[0], newMax), newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-muted-foreground">
          {formatValue(localValue[0])} - {formatValue(localValue[1])}
        </span>
      </div>
      
      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-muted rounded-full relative">
          {/* Active range */}
          <div 
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              width: `${((localValue[1] - localValue[0]) / (max - min)) * 100}%`
            }}
          />
        </div>
        
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
        />
        
        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
      
      {/* Marks */}
      {marks && (
        <div className="flex justify-between text-xs text-muted-foreground">
          {Object.entries(marks).map(([value, label]) => (
            <span key={value}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Multi-Select Component
 */
interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
}

function MultiSelect({ options, value, onChange, label, placeholder = "Select options..." }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {value.length === 0 
                ? placeholder 
                : `${value.length} selected`
              }
            </span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => handleToggle(option)}
                  className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm capitalize">{option.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Selected items */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => handleToggle(item)}
                className="ml-1 hover:text-primary/80"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Advanced Filters Component
 */
export function AdvancedFilters({
  filters,
  contentTypes,
  onFiltersChange,
  onContentTypesChange,
  isExpanded = false,
  onExpandedChange,
  className = ''
}: AdvancedFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    levels: true,
    categories: true,
    attributes: false,
    presets: false
  });

  /**
   * Load saved filters from localStorage
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('acks-advanced-filters');
      if (saved) {
        const savedFilters = JSON.parse(saved);
        onFiltersChange(savedFilters);
      }
    } catch (error) {
      console.warn('Failed to load saved filters:', error);
    }
  }, [onFiltersChange]);

  /**
   * Save filters to localStorage
   */
  useEffect(() => {
    try {
      localStorage.setItem('acks-advanced-filters', JSON.stringify(filters));
    } catch (error) {
      console.warn('Failed to save filters:', error);
    }
  }, [filters]);

  /**
   * Toggle section expansion
   */
  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  /**
   * Handle filter change
   */
  const handleFilterChange = useCallback((key: keyof ACKSFilters, value: any) => {
    onFiltersChange({ [key]: value });
  }, [onFiltersChange]);

  /**
   * Apply filter preset
   */
  const applyPreset = useCallback((preset: FilterPreset) => {
    onFiltersChange(preset.filters);
    onContentTypesChange(preset.contentTypes);
  }, [onFiltersChange, onContentTypesChange]);

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    onFiltersChange(DEFAULT_ACKS_FILTERS);
    onContentTypesChange([]);
  }, [onFiltersChange, onContentTypesChange]);

  /**
   * Count active filters
   */
  const activeFilterCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'filterLogic') return count;
    if (Array.isArray(value) && value.length > 0) return count + 1;
    if (key === 'characterLevel' && (value[0] !== 1 || value[1] !== 14)) return count + 1;
    if (key === 'monsterHD' && (value[0] !== 0.25 || value[1] !== 20)) return count + 1;
    return count;
  }, 0);

  if (!isExpanded) return null;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Settings size={16} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Filter Logic Toggle */}
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground">Logic:</span>
            <button
              onClick={() => handleFilterChange('filterLogic', filters.filterLogic === 'AND' ? 'OR' : 'AND')}
              className={`px-2 py-1 text-xs rounded ${
                filters.filterLogic === 'AND' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {filters.filterLogic}
            </button>
          </div>
          
          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded"
            title="Reset all filters"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Filter Presets */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('presets')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <Bookmark size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filter Presets</span>
          </div>
          {expandedSections.presets ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {expandedSections.presets && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
            {FILTER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="p-2 text-left bg-muted/50 hover:bg-muted rounded border border-border"
              >
                <div className="text-sm font-medium">{preset.name}</div>
                <div className="text-xs text-muted-foreground">{preset.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Level and HD Ranges */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('levels')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium">Levels & Hit Dice</span>
          {expandedSections.levels ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {expandedSections.levels && (
          <div className="space-y-4 pl-6">
            {/* Character Level Range */}
            <RangeSlider
              min={1}
              max={14}
              step={1}
              value={filters.characterLevel}
              onChange={(value) => handleFilterChange('characterLevel', value)}
              label="Character Level"
              marks={{ 1: '1', 4: '4', 7: '7', 10: '10', 14: '14+' }}
            />
            
            {/* Monster HD Range */}
            <RangeSlider
              min={0.25}
              max={20}
              step={0.25}
              value={filters.monsterHD}
              onChange={(value) => handleFilterChange('monsterHD', value)}
              label="Monster Hit Dice"
              formatValue={(v) => v < 1 ? `${v}` : `${Math.floor(v)}`}
              marks={{ 0.25: '¼', 1: '1', 5: '5', 10: '10', 15: '15', 20: '20+' }}
            />
            
            {/* Spell Level Multi-Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Spell Levels</label>
              <div className="flex flex-wrap gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      const newLevels = filters.spellLevel.includes(level)
                        ? filters.spellLevel.filter(l => l !== level)
                        : [...filters.spellLevel, level];
                      handleFilterChange('spellLevel', newLevels);
                    }}
                    className={`px-3 py-1 text-sm rounded ${
                      filters.spellLevel.includes(level)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium">Categories</span>
          {expandedSections.categories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-4 pl-6">
            <MultiSelect
              options={FILTER_OPTIONS.classType}
              value={filters.classType}
              onChange={(value) => handleFilterChange('classType', value)}
              label="Class Types"
              placeholder="Select class types..."
            />
            
            <MultiSelect
              options={FILTER_OPTIONS.equipmentCategory}
              value={filters.equipmentCategory}
              onChange={(value) => handleFilterChange('equipmentCategory', value)}
              label="Equipment Categories"
              placeholder="Select equipment categories..."
            />
            
            <MultiSelect
              options={FILTER_OPTIONS.spellSchool}
              value={filters.spellSchool}
              onChange={(value) => handleFilterChange('spellSchool', value)}
              label="Spell Schools"
              placeholder="Select spell schools..."
            />
          </div>
        )}
      </div>

      {/* Additional Attributes */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('attributes')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium">Additional Attributes</span>
          {expandedSections.attributes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {expandedSections.attributes && (
          <div className="space-y-4 pl-6">
            <MultiSelect
              options={FILTER_OPTIONS.monsterType}
              value={filters.monsterType}
              onChange={(value) => handleFilterChange('monsterType', value)}
              label="Monster Types"
              placeholder="Select monster types..."
            />
            
            <MultiSelect
              options={FILTER_OPTIONS.alignment}
              value={filters.alignment}
              onChange={(value) => handleFilterChange('alignment', value)}
              label="Alignment"
              placeholder="Select alignments..."
            />
            
            <MultiSelect
              options={FILTER_OPTIONS.magicType}
              value={filters.magicType}
              onChange={(value) => handleFilterChange('magicType', value)}
              label="Magic Type"
              placeholder="Select magic types..."
            />
          </div>
        )}
      </div>
    </div>
  );
} 