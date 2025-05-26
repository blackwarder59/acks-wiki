import { Sword, Search, Filter } from 'lucide-react'

export default function MonstersPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Sword className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Monsters</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Discover the 292 creatures that inhabit the Auran Empire and the wider world. 
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
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Monster Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { name: 'Animals', count: 45, description: 'Natural creatures and beasts' },
          { name: 'Constructs', count: 12, description: 'Artificial beings and golems' },
          { name: 'Dragons', count: 18, description: 'Ancient wyrms and dragonkin' },
          { name: 'Humanoids', count: 67, description: 'Intelligent bipedal creatures' },
          { name: 'Undead', count: 34, description: 'Creatures that have cheated death' },
          { name: 'Outsiders', count: 28, description: 'Beings from other planes' },
        ].map((category) => (
          <div
            key={category.name}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer"
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
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <Sword className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Monster Database Coming Soon
        </h2>
        <p className="text-muted-foreground">
          We&apos;re currently processing the 292 monsters from the ACKS II Monstrous Manual. 
          The complete searchable database will be available once Task 2 (Content Processing System) is complete.
        </p>
      </div>
    </div>
  )
} 