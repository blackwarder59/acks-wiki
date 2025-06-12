/**
 * Performance Optimization Hooks for ACKS II Wiki
 * 
 * Collection of custom hooks and utilities for optimizing React component
 * performance, including memoization, debouncing, throttling, and more.
 * 
 * Features:
 * - Advanced memoization with custom equality
 * - Debouncing and throttling utilities
 * - Intersection observer for lazy loading
 * - Performance monitoring and metrics
 * - Memory leak prevention
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { 
  useCallback, 
  useEffect, 
  useRef, 
  useState, 
  useMemo,
  DependencyList
} from 'react';

/**
 * Advanced debounce hook with immediate execution option
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  immediate = false
): [T, () => void] {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      const executeCallback = () => {
        setIsDebouncing(false);
        return callbackRef.current(...args);
      };
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (immediate && !isDebouncing) {
        setIsDebouncing(true);
        return executeCallback();
      }
      setIsDebouncing(true);
      timeoutRef.current = setTimeout(executeCallback, delay);
    }) as T,
    [delay, immediate, isDebouncing]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsDebouncing(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedCallback, cancel];
}

/**
 * Throttle hook for limiting function execution frequency
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  leading = true,
  trailing = true
): T {
  const lastCallTime = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime.current;
      const executeCallback = () => {
        lastCallTime.current = now;
        return callbackRef.current(...args);
      };
      if (timeSinceLastCall >= delay) {
        if (leading) {
          return executeCallback();
        }
      }
      if (trailing) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          if (Date.now() - lastCallTime.current >= delay) {
            executeCallback();
          }
        }, delay - timeSinceLastCall);
      }
    }) as T,
    [delay, leading, trailing]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Advanced memoization hook with custom equality function
 */
export function useDeepMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equalityFn?: (a: DependencyList, b: DependencyList) => boolean
): T {
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  const defaultEqualityFn = useCallback((a: DependencyList, b: DependencyList) => {
    if (a.length !== b.length) return false;
    return a.every((item, index) => {
      const other = b[index];
      if (typeof item === 'object' && item !== null && typeof other === 'object' && other !== null) {
        try {
        return JSON.stringify(item) === JSON.stringify(other);
        } catch (e) {
          return false;
        }
      }
      return item === other;
    });
  }, []);

  const areEqual = equalityFn || defaultEqualityFn;

  if (!ref.current || !areEqual(ref.current.deps, deps)) {
    ref.current = {
      deps: [...deps],
      value: factory()
    };
  }

  return ref.current.value;
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersection(
  options: IntersectionObserverInit = {}
): [React.RefObject<Element | null>, boolean, IntersectionObserverEntry | null] {
  const elementRef = useRef<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return [elementRef, isIntersecting, entry];
}

/**
 * Performance monitoring hook for components
 */
export function usePerformanceMonitor(name: string, enabled = true) {
  const startTimeRef = useRef<number | null>(null);
  const metricsRef = useRef<{
    renderCount: number;
    totalRenderTime: number;
    averageRenderTime: number;
    lastRenderTime: number;
  }>({
    renderCount: 0,
    totalRenderTime: 0,
    averageRenderTime: 0,
    lastRenderTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    startTimeRef.current = performance.now();

    return () => {
      if (startTimeRef.current && metricsRef.current) {
        const renderTime = performance.now() - startTimeRef.current;
        const metrics = metricsRef.current;

        metrics.renderCount++;
        metrics.totalRenderTime += renderTime;
        metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;
        metrics.lastRenderTime = renderTime;

        if (renderTime > 16) {
          console.warn(`Slow render detected in ${name}: ${renderTime.toFixed(2)}ms`);
        }
        if (metrics.renderCount % 100 === 0) {
          console.log(`Performance metrics for ${name}:`, {
            renders: metrics.renderCount,
            avgTime: metrics.averageRenderTime.toFixed(2) + 'ms',
            lastTime: metrics.lastRenderTime.toFixed(2) + 'ms'
          });
        }
      }
    };
  });

  return metricsRef.current;
}

/**
 * Hook for optimizing re-renders with shallow comparison
 */
export function useShallowMemo<T extends Record<string, any>>(obj: T): T {
  return useMemo(() => obj, Object.values(obj));
}

/**
 * Hook for preventing unnecessary re-renders of child components
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T {
  const callbackRef = useRef<T>(callback);
  const depsRef = useRef<DependencyList>(deps);

  useEffect(() => {
    let depsChanged = false;
    if (deps.length !== depsRef.current.length) {
      depsChanged = true;
    } else {
      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== depsRef.current[i]) {
          depsChanged = true;
          break;
        }
      }
    }

    if (depsChanged) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }
  }, [callback, ...deps]);

  return useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    []
  );
}

export default {
  useDebounce,
  useThrottle,
  useDeepMemo,
  useIntersection,
  usePerformanceMonitor,
  useShallowMemo,
  useStableCallback
}; 