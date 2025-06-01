'use client';

/**
 * ACKS II Performance Showcase
 * 
 * Demonstrates performance optimizations using real ACKS II content.
 * Shows virtualization, lazy loading, and other performance techniques
 * with actual monsters and spells from the game.
 * 
 * @author ACKS II Wiki Development Team
 */

import React, { useState, useCallback } from 'react';
import { 
  LazyImage, 
  ContentPlaceholder, 
  VirtualizedList,
  type VirtualizedListItemProps
} from '@/components/ui';
import { 
  useDebounce, 
  useThrottle, 
  usePerformanceMonitor,
  useIntersection
} from '@/lib/hooks/use-performance';
import { 
  LazyOnVisible, 
  BundleAnalyzer,
  usePreloadOnInteraction 
} from '@/lib/utils/code-splitting';
import allMonsters from '@/data/all-monsters.json';
import realSpells from '@/data/real-spells.json';

// Real ACKS II content for performance demonstrations
const realContent = [
  ...allMonsters.map(monster => ({
    ...monster,
    category: 'Monster',
    title: monster.name,
    level: monster.stats?.hitDice ? parseInt(monster.stats.hitDice.split('d')[0]) || 1 : 1
  })),
  ...realSpells.map(spell => ({
    ...spell,
    category: 'Spell',
    title: spell.name,
    level: spell.level || 1
  }))
];

/**
 * Virtualized list item component for real ACKS II content
 */
const VirtualizedItem: React.FC<VirtualizedListItemProps<any>> = ({ 
  item, 
  index,
  searchQuery 
}) => {
  const metrics = usePerformanceMonitor(`VirtualizedItem-${index}`, false);

  return (
    <div className="p-4 border-b border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
            {item.category}
          </span>
          {item.stats?.hitDice && (
            <span className="text-xs text-muted-foreground">HD {item.stats.hitDice}</span>
          )}
          {item.level && (
            <span className="text-xs text-muted-foreground">Level {item.level}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Real ACKS II themed images for lazy loading demo
const acksImages = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/300/200?random=${i + 100}`,
  placeholder: `https://picsum.photos/30/20?random=${i + 100}`,
  alt: `ACKS II themed image ${i + 1}`
}));

export default function PerformancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Performance monitoring
  const pageMetrics = usePerformanceMonitor('PerformancePage');
  const [observerRef, isObserved] = useIntersection({ threshold: 0.5 });
  const [observerCount, setObserverCount] = useState(0);

  // Debounced search
  const [debouncedSearch] = useDebounce((query: string) => {
    console.log('Debounced search:', query);
  }, 300);
  
  // Throttled scroll handler
  const throttledScrollHandler = useThrottle(() => {
    console.log('Scroll event handled');
  }, 100);

  // Preload interaction
  const preloadProps = usePreloadOnInteraction(
    () => import('@/components/ui/advanced-filters'),
    'advanced-filters'
  );

  const filteredItems = searchQuery 
    ? realContent.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : realContent;

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">ACKS II Performance Showcase</h1>
        <p className="text-muted-foreground">
          Explore performance optimizations with real ACKS II content. This page demonstrates
          virtualization, lazy loading, and other techniques using actual monsters and spells.
        </p>
      </div>

      {/* Performance Metrics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-medium text-foreground">Content Items</h3>
            <p className="text-2xl font-bold text-primary">{realContent.length}</p>
            <p className="text-sm text-muted-foreground">Real ACKS II entries</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-medium text-foreground">Monsters</h3>
            <p className="text-2xl font-bold text-red-600">{allMonsters.length}</p>
            <p className="text-sm text-muted-foreground">From Monstrous Manual</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-medium text-foreground">Spells</h3>
            <p className="text-2xl font-bold text-blue-600">{realSpells.length}</p>
            <p className="text-sm text-muted-foreground">From Rulebook</p>
          </div>
        </div>
      </section>

      {/* Virtualized List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Virtualized Content List</h2>
        <p className="text-muted-foreground">
          Efficiently renders {realContent.length.toLocaleString()} items using virtualization.
          Only visible items are rendered in the DOM.
        </p>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search ACKS II content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
          
          <div className="border border-border rounded-lg overflow-hidden">
            <VirtualizedList
              items={filteredItems}
              renderItem={VirtualizedItem as any}
              getItemKey={(item: any) => item.id}
              height={400}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {realContent.length} items
          </p>
        </div>
      </section>

      {/* Lazy Loading Images */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Lazy Loading Images</h2>
        <p className="text-muted-foreground">
          Images load only when they come into view, improving initial page load time.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {acksImages.slice(0, 20).map((image) => (
            <LazyImage
              key={image.id}
              src={image.src}
              placeholder={image.placeholder}
              alt={image.alt}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* Code Splitting Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Code Splitting</h2>
        <p className="text-muted-foreground">
          Components and features load on demand to reduce initial bundle size.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Lazy Component</h3>
            <LazyOnVisible>
              <ContentPlaceholder 
                type="monster"
                compact={true}
              />
            </LazyOnVisible>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Preload on Hover</h3>
                         <button
               {...preloadProps}
               className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
             >
               Hover to preload Advanced Filters
             </button>
          </div>
        </div>
      </section>

      {/* Bundle Analysis */}
      <section className="space-y-4" ref={observerRef as any}>
        <h2 className="text-2xl font-semibold text-foreground">Bundle Analysis</h2>
        <p className="text-muted-foreground">
          Analyze the application bundle size and composition.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Bundle'}
          </button>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Bundle analysis tools are available in the browser console.
              Click the analyze button to see performance metrics.
            </p>
            <button
              onClick={() => BundleAnalyzer.logBundleInfo()}
              className="mt-2 px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Log Bundle Info to Console
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 