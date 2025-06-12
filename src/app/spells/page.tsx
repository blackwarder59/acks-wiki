'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Search, Filter, Clock, Target, X } from 'lucide-react'
import Link from 'next/link';
import realSpells from '@/data/real-spells.json'

/**
 * ACKS II Spells Page
 * 
 * Displays all real ACKS II spells extracted from the official content.
 * Shows spell details including level, magic type, spell type, range, and duration.
 * 
 * @author ACKS II Wiki Development Team
 */

function SpellsPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedMagicType, setSelectedMagicType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for filtering
  useEffect(() => {
    const levelParam = searchParams.get('level');
    const magicTypeParam = searchParams.get('magicType');
    
    if (levelParam) {
      const level = parseInt(levelParam);
      if (level >= 1 && level <= 6) {
        setSelectedLevel(level);
        setShowFilters(true);
      }
    }
    
    if (magicTypeParam && ['Arcane', 'Divine'].includes(magicTypeParam)) {
      setSelectedMagicType(magicTypeParam);
      setShowFilters(true);
    }
  }, [searchParams]);

  // Filter spells based on search term and filters
  const filteredSpells = realSpells.filter(spell => {
    const matchesSearch = spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spell.spellType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (spell.description && spell.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === null || spell.level === selectedLevel;
    const matchesMagicType = selectedMagicType === null || spell.magicType === selectedMagicType;
    
    return matchesSearch && matchesLevel && matchesMagicType;
  });
  // Calculate spell statistics
  const spellsByLevel = realSpells.reduce((acc, spell) => {
    acc[spell.level] = (acc[spell.level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const spellsByMagicType = realSpells.reduce((acc, spell) => {
    acc[spell.magicType] = (acc[spell.magicType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Spells</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Explore the {filteredSpells.length} spells{searchTerm || selectedLevel || selectedMagicType ? ' matching your criteria' : ''} available to spellcasters in the ACKS II system. 
          From simple cantrips to reality-altering magic, find the perfect spells for your character.
        </p>
        
        {/* Cross-reference to Chapter 5 */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            📚 <strong>Also see:</strong> <Link href="/rules/chapter-5-spells" className="underline hover:text-blue-600">Chapter 5: Spells</Link> for the complete magic theory, spell types, and rulebook structure from the ACKS II Revised Rulebook.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search spells by name, type, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {(selectedLevel || selectedMagicType) && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {[selectedLevel && `Lvl ${selectedLevel}`, selectedMagicType].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={() => {
                setSelectedLevel(null);
                setSelectedMagicType(null);
                setShowFilters(false);
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spell Level Filter */}
            <div>
              <h4 className="font-medium mb-3">Spell Level</h4>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-input hover:bg-accent'
                    }`}
                  >
                    Level {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Magic Type Filter */}
            <div>
              <h4 className="font-medium mb-3">Magic Type</h4>
              <div className="flex flex-wrap gap-2">
                {['Arcane', 'Divine'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMagicType(selectedMagicType === type ? null : type)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedMagicType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-input hover:bg-accent'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLevel || selectedMagicType) && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedLevel && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    Level {selectedLevel}
                    <button onClick={() => setSelectedLevel(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedMagicType && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {selectedMagicType}
                    <button onClick={() => setSelectedMagicType(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Spell Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Total Spells
          </h3>
          <p className="text-3xl font-bold text-primary">{realSpells.length}</p>
        </div>
        
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Arcane Spells
          </h3>
          <p className="text-3xl font-bold text-blue-500">{spellsByMagicType.Arcane || 0}</p>
        </div>
        
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Divine Spells
          </h3>
          <p className="text-3xl font-bold text-green-500">{spellsByMagicType.Divine || 0}</p>
        </div>
        
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Spell Levels
          </h3>
          <p className="text-3xl font-bold text-purple-500">1-6</p>
        </div>
      </div>

      {/* Spell Level Distribution */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Spells by Level
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <div key={level} className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {spellsByLevel[level] || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Level {level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpells.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No spells found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `No spells match "${searchTerm}"`
                : 'No spells match the selected filters'
              }
            </p>
            {(searchTerm || selectedLevel || selectedMagicType) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel(null);
                  setSelectedMagicType(null);
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          filteredSpells.map((spell) => (
            <Link
              key={spell.id}
              href={`/spells/${spell.id}`}
              className="group"
            >
              <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full"
              >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-card-foreground">
                {spell.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  spell.magicType === 'Arcane' 
                    ? 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30'
                    : 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30'
                }`}>
                  {spell.magicType}
                </span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  Level {spell.level}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Type:</span> {spell.spellType}
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Target className="h-3 w-3 mr-1 text-blue-500" />
                  <span>{spell.range}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-green-500" />
                  <span>{spell.duration}</span>
                </div>
              </div>
            </div>
            
            {spell.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {spell.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Range: {spell.range}</span>
              <span>Duration: {spell.duration}</span>
            </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default function SpellsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Spells</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Loading spells...
          </p>
        </div>
      </div>
    }>
      <SpellsPageContent />
    </Suspense>
  );
} 