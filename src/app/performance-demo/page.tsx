'use client';

/**
 * Performance Demo Page for ACKS II Wiki
 * 
 * Demonstrates all performance optimization features including lazy loading,
 * virtualization, code splitting, and other performance enhancements.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
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
  useIntersectionObserver 
} from '@/lib/hooks/use-performance';
import { 
  LazyOnVisible, 
  BundleAnalyzer,
  usePreloadOnInteraction 
} from '@/lib/utils/code-splitting';

// Mock data for demonstrations
type MockItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: number;
};

const generateMockItems = (count: number): MockItem[] => 
  Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}. It contains some sample text to demonstrate the virtualized list performance.`,
    category: ['Monster', 'Spell', 'Equipment', 'Class'][i % 4],
    level: Math.floor(Math.random() * 20) + 1
  }));

const mockItems = generateMockItems(10000);

// Mock image URLs for lazy loading demo
const mockImages = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/300/200?random=${i}`,
  placeholder: `https://picsum.photos/30/20?random=${i}`,
  alt: `Demo image ${i + 1}`
}));

/**
 * Virtualized list item component
 */
const VirtualizedItem: React.FC<VirtualizedListItemProps<typeof mockItems[0]>> = ({ 
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
          <span className="text-xs text-muted-foreground">Level {item.level}</span>
        </div>
      </div>
    </div>
  );
};

export default function PerformanceDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLargeList, setShowLargeList] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);

  // Performance monitoring
  const pageMetrics = usePerformanceMonitor('PerformanceDemoPage');

  // Debounced search
  const [debouncedSearch] = useDebounce((query: string) => {
    console.log('Debounced search:', query);
  }, 300);

  // Throttled scroll handler
  const throttledScrollHandler = useThrottle((scrollTop: number) => {
    console.log('Throttled scroll:', scrollTop);
  }, 100);

  // Intersection observer for analytics
  const [analyticsRef, isAnalyticsVisible] = useIntersectionObserver({
    threshold: 0.5
  });

  // Preload interaction
  const preloadProps = usePreloadOnInteraction(
    () => import('@/components/ui/advanced-filters'),
    'advanced-filters'
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleImageLoad = useCallback(() => {
    setImageLoadCount(prev => prev + 1);
  }, []);

  const filteredItems = searchQuery 
    ? mockItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockItems;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Performance Optimization Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates various performance optimization techniques including lazy loading,
          virtualization, debouncing, throttling, and code splitting.
        </p>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{pageMetrics.renderCount}</div>
            <div className="text-xs text-muted-foreground">Renders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {pageMetrics.averageRenderTime.toFixed(1)}ms
            </div>
            <div className="text-xs text-muted-foreground">Avg Render</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {pageMetrics.maxRenderTime.toFixed(1)}ms
            </div>
            <div className="text-xs text-muted-foreground">Max Render</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{imageLoadCount}</div>
            <div className="text-xs text-muted-foreground">Images Loaded</div>
          </div>
        </div>
      </div>

      {/* Bundle Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Bundle Analysis</h2>
        <div className="flex gap-4">
          <button
            onClick={BundleAnalyzer.logBundleInfo}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Log Bundle Info
          </button>
          <button
            onClick={BundleAnalyzer.monitorChunkLoading}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
          >
            Monitor Chunk Loading
          </button>
        </div>
      </section>

      {/* Debounced Search Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Debounced Search</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Type to search (debounced 300ms)..."
            className="w-full p-3 border border-border rounded bg-background text-foreground"
          />
          <p className="text-sm text-muted-foreground">
            Search is debounced to prevent excessive API calls. Check console for debounced output.
          </p>
        </div>
      </section>

      {/* Lazy Image Loading Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Lazy Image Loading</h2>
        <p className="text-muted-foreground">
          Images below are loaded lazily as they come into view. Progressive loading with blur effect.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockImages.slice(0, 20).map((image) => (
            <LazyImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              placeholder={image.placeholder}
              aspectRatio={1.5}
              onLoad={handleImageLoad}
              className="rounded-lg overflow-hidden"
              config={{
                progressive: true,
                fadeInDuration: 300
              }}
            />
          ))}
        </div>
      </section>

      {/* Content Placeholders Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Content Placeholders</h2>
        <p className="text-muted-foreground">
          Different placeholder types for various content while loading.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Monster Card</h3>
            <ContentPlaceholder type="monster" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Spell Card</h3>
            <ContentPlaceholder type="spell" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Equipment Table</h3>
            <ContentPlaceholder type="equipment" columns={4} />
          </div>
        </div>
      </section>

      {/* Lazy Loading with Intersection Observer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Lazy Loading with Intersection Observer</h2>
        <p className="text-muted-foreground">
          Content below is only rendered when it comes into view.
        </p>
        
        <LazyOnVisible
          threshold={0.2}
          fallback={<ContentPlaceholder type="grid" count={6} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Lazy Loaded Content {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  This content was only rendered when it became visible in the viewport.
                </p>
              </div>
            ))}
          </div>
        </LazyOnVisible>
      </section>

      {/* Preloading Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Component Preloading</h2>
        <p className="text-muted-foreground">
          Hover over the button below to preload a component before clicking.
        </p>
        
        <button
          {...preloadProps}
          onClick={() => console.log('Component should be preloaded now!')}
          className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
        >
          Hover to Preload Advanced Filters
        </button>
      </section>

      {/* Virtualized List Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Virtualized List</h2>
        <p className="text-muted-foreground">
          Efficiently renders {mockItems.length.toLocaleString()} items using virtualization.
          Only visible items are rendered in the DOM.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setShowLargeList(!showLargeList)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            {showLargeList ? 'Hide' : 'Show'} Large List ({filteredItems.length.toLocaleString()} items)
          </button>
          {searchQuery && (
            <span className="text-sm text-muted-foreground">
              Showing {filteredItems.length.toLocaleString()} filtered results
            </span>
          )}
        </div>

        {showLargeList && (
          <div className="border border-border rounded-lg overflow-hidden">
            <VirtualizedList
              items={filteredItems}
              renderItem={VirtualizedItem}
              getItemKey={(item) => item.id}
              height={400}
              searchQuery={searchQuery}
              onScroll={throttledScrollHandler}
              config={{
                estimatedItemHeight: 80,
                overscan: 5,
                enableKeyboardNav: true
              }}
            />
          </div>
        )}
      </section>

      {/* Analytics Tracking Demo */}
      <section className="space-y-4" ref={analyticsRef}>
        <h2 className="text-2xl font-semibold text-foreground">Analytics Tracking</h2>
        <div className={`p-4 rounded-lg transition-colors ${
          isAnalyticsVisible ? 'bg-green-100 dark:bg-green-900' : 'bg-muted/30'
        }`}>
          <p className="text-sm">
            This section is {isAnalyticsVisible ? 'visible' : 'not visible'} in the viewport.
            Analytics events can be triggered based on visibility.
          </p>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Performance Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Lazy Loading</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use intersection observer for images</li>
              <li>• Implement progressive image loading</li>
              <li>• Lazy load components below the fold</li>
              <li>• Preload on hover for better UX</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Virtualization</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use for large lists (&gt;100 items)</li>
              <li>• Implement dynamic height calculation</li>
              <li>• Add keyboard navigation support</li>
              <li>• Include loading states</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Debouncing</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use for search inputs (300ms)</li>
              <li>• Apply to resize handlers</li>
              <li>• Debounce API calls</li>
              <li>• Include immediate execution option</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Code Splitting</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Split by routes and features</li>
              <li>• Use dynamic imports</li>
              <li>• Implement error boundaries</li>
              <li>• Add retry mechanisms</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 