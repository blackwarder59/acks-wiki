'use client';

import { Sword, Search, Filter, Shield, Zap, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import allMonsters from '@/data/all-monsters.json'

export default function MonstersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter monsters based on search term and selected category
  const filteredMonsters = allMonsters.filter(monster => {
    const matchesSearch = monster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monster.stats.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monster.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!selectedCategory) return matchesSearch;
    
    // Category filtering logic
    switch (selectedCategory) {
      case 'Animals':
        return matchesSearch && monster.stats.type?.toLowerCase().includes('animal');
      case 'Vermin':
        return matchesSearch && monster.stats.type?.toLowerCase().includes('vermin');
      case 'Monstrosities':
        return matchesSearch && monster.stats.type?.toLowerCase().includes('monstrosity');
      case 'Incarnations':
        return matchesSearch && monster.stats.type?.toLowerCase().includes('incarnation');
      case 'High XP':
        return matchesSearch && monster.encounterInfo.xp > 1000;
      case 'Sapient':
        return matchesSearch && monster.stats.type?.toLowerCase().includes('sapient');
      default:
        return matchesSearch;
    }
  });

  // Clear category filter
  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Sword className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Monsters</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Discover the {filteredMonsters.length} creatures{searchTerm || selectedCategory ? ` ${selectedCategory ? `in ${selectedCategory}` : ''}${searchTerm ? ` matching "${searchTerm}"` : ''}` : ''} that inhabit the Auran Empire and the wider world. 
          From common animals to legendary dragons, find the perfect adversaries for your campaigns.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search monsters by name, type, or abilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          {selectedCategory && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                {selectedCategory}
              </span>
              <button
                onClick={clearCategoryFilter}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Monster Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {(() => {
          // Calculate real categories from actual monster data
          const categories = [
            { 
              name: 'Animals', 
              count: allMonsters.filter(m => m.stats.type?.toLowerCase().includes('animal')).length, 
              description: 'Natural creatures and beasts',
              types: ['Animal (wild)', 'Animal (domestic)']
            },
            { 
              name: 'Vermin', 
              count: allMonsters.filter(m => m.stats.type?.toLowerCase().includes('vermin')).length, 
              description: 'Giant insects and arthropods',
              types: ['Vermin']
            },
            { 
              name: 'Monstrosities', 
              count: allMonsters.filter(m => m.stats.type?.toLowerCase().includes('monstrosity')).length, 
              description: 'Unnatural creatures and aberrations',
              types: ['Monstrosity (bestial)', 'Monstrosity (sapient)']
            },
            { 
              name: 'Incarnations', 
              count: allMonsters.filter(m => m.stats.type?.toLowerCase().includes('incarnation')).length, 
              description: 'Demons, devils, and outsiders',
              types: ['Incarnation (demon)', 'Incarnation (devil)']
            },
            { 
              name: 'High XP', 
              count: allMonsters.filter(m => m.encounterInfo.xp > 1000).length, 
              description: 'Powerful creatures (1000+ XP)',
              types: []
            },
            { 
              name: 'Sapient', 
              count: allMonsters.filter(m => m.stats.type?.toLowerCase().includes('sapient')).length, 
              description: 'Intelligent creatures',
              types: []
            },
          ];
          return categories;
        })().map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            className={`p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer text-left ${
              selectedCategory === category.name ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
          >
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {category.description}
            </p>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {category.count} creatures
            </span>
          </button>
        ))}
      </div>

      {/* Monster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMonsters.map((monster) => (
          <Link
            key={monster.id}
            href={`/monsters/${monster.id}`}
            className="block"
          >
            <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-card-foreground line-clamp-2">
                  {monster.name}
                </h3>
                {monster.encounterInfo.xp > 0 && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                    XP {monster.encounterInfo.xp.toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="font-medium">{monster.stats.type}</span>
                  {monster.stats.size && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{monster.stats.size}</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm flex-wrap gap-2">
                  {monster.stats.armorClass && (
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-blue-500" />
                      <span>AC {monster.stats.armorClass}</span>
                    </div>
                  )}
                  {monster.stats.hitDice && (
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      <span>HD {monster.stats.hitDice}</span>
                    </div>
                  )}
                  {monster.stats.attacks && (
                    <div className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                      <span className="text-xs">{monster.stats.attacks}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {monster.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {monster.description.replace(/\*\*([^*]+)\*\*/g, '$1')}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {monster.stats.save && <span>Save: {monster.stats.save}</span>}
                {monster.stats.morale && <span>Morale: {monster.stats.morale}</span>}
                {monster.encounterInfo.alignment && <span>{monster.encounterInfo.alignment}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredMonsters.length === 0 && (searchTerm || selectedCategory) && (
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            No monsters found{selectedCategory ? ` in ${selectedCategory}` : ''}{searchTerm ? ` matching "${searchTerm}"` : ''}. 
            <br />
            Try searching for different terms or browse other categories.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
} 