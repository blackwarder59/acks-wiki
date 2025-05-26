'use client';

/**
 * Code Splitting Utilities for ACKS II Wiki
 * 
 * Provides utilities for dynamic imports, lazy loading, and code splitting
 * to optimize bundle size and improve loading performance.
 * 
 * Features:
 * - Dynamic component loading with error boundaries
 * - Route-based code splitting
 * - Preloading strategies
 * - Loading states and error handling
 * - Bundle analysis utilities
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { 
  Suspense, 
  lazy, 
  ComponentType, 
  LazyExoticComponent,
  ReactNode,
  ErrorInfo,
  Component
} from 'react';
import { ContentPlaceholder } from '@/components/ui/content-placeholders';

/**
 * Configuration for lazy loading
 */
export interface LazyLoadConfig {
  /** Fallback component while loading */
  fallback?: ReactNode;
  /** Error boundary component */
  errorBoundary?: ComponentType<{ error: Error; retry: () => void }>;
  /** Preload the component */
  preload?: boolean;
  /** Retry attempts on failure */
  retryAttempts?: number;
  /** Delay before retry */
  retryDelay?: number;
}

/**
 * Enhanced error boundary for lazy loaded components
 */
class LazyLoadErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback?: ComponentType<{ error: Error; retry: () => void }>;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
  },
  { hasError: boolean; error: Error | null; retryCount: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lazy load error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  retry = () => {
    this.setState(prev => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
const DefaultErrorFallback: React.FC<{ error: Error; retry: () => void }> = ({ 
  error, 
  retry 
}) => (
  <div className="flex flex-col items-center justify-center p-8 border border-destructive/20 rounded-lg bg-destructive/5">
    <div className="text-destructive text-lg font-medium mb-2">
      Failed to load component
    </div>
    <div className="text-muted-foreground text-sm mb-4 text-center">
      {error.message}
    </div>
    <button
      onClick={retry}
      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
    >
      Try Again
    </button>
  </div>
);

/**
 * Default loading fallback component
 */
const DefaultLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

/**
 * Enhanced lazy loading function with retry logic and error handling
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  config: LazyLoadConfig = {}
): LazyExoticComponent<T> & { preload: () => Promise<void> } {
  const {
    fallback = <DefaultLoadingFallback />,
    errorBoundary,
    preload = false,
    retryAttempts = 3,
    retryDelay = 1000
  } = config;

  let importPromise: Promise<{ default: T }> | null = null;

  const loadComponent = async (attempt = 1): Promise<{ default: T }> => {
    try {
      return await importFn();
    } catch (error) {
      if (attempt < retryAttempts) {
        console.warn(`Lazy load attempt ${attempt} failed, retrying...`, error);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadComponent(attempt + 1);
      }
      throw error;
    }
  };

  const LazyComponent = lazy(() => {
    if (!importPromise) {
      importPromise = loadComponent();
    }
    return importPromise;
  }) as LazyExoticComponent<T> & { preload: () => Promise<void> };

  // Add preload method
  LazyComponent.preload = async () => {
    if (!importPromise) {
      importPromise = loadComponent();
    }
    await importPromise;
  };

  // Preload immediately if requested
  if (preload) {
    LazyComponent.preload();
  }

  return LazyComponent;
}

/**
 * Higher-order component for wrapping lazy components with error boundaries
 */
export function withLazyLoading<P extends object>(
  LazyComponent: LazyExoticComponent<ComponentType<P>>,
  config: LazyLoadConfig = {}
) {
  const {
    fallback = <DefaultLoadingFallback />,
    errorBoundary
  } = config;

  return React.forwardRef<any, P>((props, ref) => (
    <LazyLoadErrorBoundary fallback={errorBoundary}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    </LazyLoadErrorBoundary>
  ));
}

/**
 * Route-based code splitting utility
 */
export function createLazyRoute(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  config: LazyLoadConfig & {
    /** Custom loading component for routes */
    routeLoading?: ComponentType;
  } = {}
) {
  const {
    routeLoading: RouteLoading = () => <ContentPlaceholder type="grid" count={6} />,
    ...lazyConfig
  } = config;

  const LazyComponent = createLazyComponent(importFn, {
    ...lazyConfig,
    fallback: <RouteLoading />
  });

  return withLazyLoading(LazyComponent, lazyConfig);
}

/**
 * Preloading utilities
 */
export class PreloadManager {
  private static preloadedComponents = new Set<string>();
  private static preloadPromises = new Map<string, Promise<any>>();

  /**
   * Preload a component by key
   */
  static async preload(
    key: string,
    importFn: () => Promise<any>
  ): Promise<void> {
    if (this.preloadedComponents.has(key)) {
      return;
    }

    if (!this.preloadPromises.has(key)) {
      this.preloadPromises.set(key, importFn());
    }

    try {
      await this.preloadPromises.get(key);
      this.preloadedComponents.add(key);
    } catch (error) {
      console.error(`Failed to preload component ${key}:`, error);
      this.preloadPromises.delete(key);
    }
  }

  /**
   * Preload multiple components
   */
  static async preloadMultiple(
    components: Array<{
      key: string;
      importFn: () => Promise<any>;
    }>
  ): Promise<void> {
    await Promise.allSettled(
      components.map(({ key, importFn }) => this.preload(key, importFn))
    );
  }

  /**
   * Check if component is preloaded
   */
  static isPreloaded(key: string): boolean {
    return this.preloadedComponents.has(key);
  }

  /**
   * Clear preload cache
   */
  static clearCache(): void {
    this.preloadedComponents.clear();
    this.preloadPromises.clear();
  }
}

/**
 * Hook for preloading components on hover or focus
 */
export function usePreloadOnInteraction(
  importFn: () => Promise<any>,
  key: string,
  enabled = true
) {
  const preload = React.useCallback(() => {
    if (enabled && !PreloadManager.isPreloaded(key)) {
      PreloadManager.preload(key, importFn);
    }
  }, [importFn, key, enabled]);

  return {
    onMouseEnter: preload,
    onFocus: preload
  };
}

/**
 * Component for lazy loading with intersection observer
 */
export const LazyOnVisible: React.FC<{
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}> = ({
  children,
  fallback = <DefaultLoadingFallback />,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};

/**
 * Bundle analysis utilities
 */
export const BundleAnalyzer = {
  /**
   * Log bundle information
   */
  logBundleInfo: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      console.group('Bundle Analysis');
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
      console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'ms');
      
      const jsResources = resources.filter(r => r.name.includes('.js'));
      const cssResources = resources.filter(r => r.name.includes('.css'));
      
      console.log('JavaScript Resources:', jsResources.length);
      console.log('CSS Resources:', cssResources.length);
      
      const totalJSSize = jsResources.reduce((total, resource) => {
        return total + (resource.transferSize || 0);
      }, 0);
      
      console.log('Total JS Transfer Size:', (totalJSSize / 1024).toFixed(2), 'KB');
      console.groupEnd();
    }
  },

  /**
   * Monitor chunk loading
   */
  monitorChunkLoading: () => {
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('chunk') || entry.name.includes('lazy')) {
            console.log('Lazy chunk loaded:', entry.name, 'in', entry.duration, 'ms');
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      
      return () => observer.disconnect();
    }
  }
};

/**
 * Commonly used lazy components for ACKS II Wiki
 */
export const LazyComponents = {
  // Content display components
  MonsterCard: createLazyComponent(
    () => import('@/components/content/monster-card'),
    { preload: true }
  ),
  
  SpellList: createLazyComponent(
    () => import('@/components/content/spell-list')
  ),
  
  EquipmentTable: createLazyComponent(
    () => import('@/components/content/equipment-table')
  ),
  
  ClassDescription: createLazyComponent(
    () => import('@/components/content/class-description')
  ),

  // UI components
  AdvancedFilters: createLazyComponent(
    () => import('@/components/ui/advanced-filters')
  ),
  
  SearchResults: createLazyComponent(
    () => import('@/components/ui/search-results')
  ),

  // Tooltip demo (for development)
  TooltipDemo: createLazyComponent(
    () => import('@/app/tooltip-demo/page')
  )
};

export default {
  createLazyComponent,
  withLazyLoading,
  createLazyRoute,
  PreloadManager,
  usePreloadOnInteraction,
  LazyOnVisible,
  BundleAnalyzer,
  LazyComponents
}; 