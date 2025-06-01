'use client';

/**
 * Lazy Image Loading Component for ACKS II Wiki
 * 
 * Provides efficient image loading with Intersection Observer API,
 * progressive loading, and appropriate placeholders.
 * 
 * Features:
 * - Intersection Observer for lazy loading
 * - Progressive image loading with blur-up effect
 * - Responsive image support with srcSet
 * - Error handling with fallback images
 * - Accessibility support with proper alt text
 * - Performance optimization with loading states
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { 
  useState, 
  useRef, 
  useEffect, 
  useCallback,
  forwardRef,
  ImgHTMLAttributes
} from 'react';
import { cn } from '@/lib/utils';

/**
 * Configuration for lazy image loading behavior
 */
export interface LazyImageConfig {
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Enable progressive loading with blur effect */
  progressive?: boolean;
  /** Enable responsive image support */
  responsive?: boolean;
  /** Fade in duration in milliseconds */
  fadeInDuration?: number;
  /** Enable error retry mechanism */
  enableRetry?: boolean;
  /** Maximum retry attempts */
  maxRetries?: number;
  /** Retry delay in milliseconds */
  retryDelay?: number;
}

/**
 * Props for LazyImage component
 */
export interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'onLoad' | 'onError'> {
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Optional low-quality placeholder image */
  placeholder?: string;
  /** Responsive image sources */
  srcSet?: string;
  /** Image sizes for responsive loading */
  sizes?: string;
  /** Fallback image URL if main image fails */
  fallback?: string;
  /** Custom placeholder component */
  placeholderComponent?: React.ComponentType<{ className?: string }>;
  /** Configuration options */
  config?: LazyImageConfig;
  /** Callback when image loads successfully */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Callback when image fails to load */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Custom loading component */
  loadingComponent?: React.ComponentType<{ className?: string }>;
  /** Enable skeleton loading animation */
  skeleton?: boolean;
  /** Image aspect ratio for placeholder */
  aspectRatio?: number;
  /** Priority loading (disable lazy loading) */
  priority?: boolean;
}

/**
 * Default configuration for lazy image loading
 */
const DEFAULT_CONFIG: Required<LazyImageConfig> = {
  threshold: 0.1,
  rootMargin: '50px',
  progressive: true,
  responsive: true,
  fadeInDuration: 300,
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000
};

/**
 * Default skeleton placeholder component
 */
const SkeletonPlaceholder: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn(
      "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted",
      "bg-[length:200%_100%] animate-[shimmer_2s_infinite]",
      className
    )}
    aria-hidden="true"
  />
);

/**
 * Default loading spinner component
 */
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn(
      "flex items-center justify-center",
      className
    )}
    aria-hidden="true"
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

/**
 * Custom hook for intersection observer
 */
function useIntersectionObserver(
  config: Required<LazyImageConfig>
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [config.threshold, config.rootMargin]);

  return [ref, isIntersecting];
}

/**
 * Custom hook for image loading with retry logic
 */
function useImageLoader(
  src: string,
  fallback: string | undefined,
  config: Required<LazyImageConfig>
) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(() => {
    setLoadState('loaded');
  }, []);

  const handleError = useCallback(() => {
    if (config.enableRetry && retryCount < config.maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setCurrentSrc(`${src}?retry=${retryCount + 1}`);
      }, config.retryDelay);
    } else if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setRetryCount(0);
    } else {
      setLoadState('error');
    }
  }, [src, fallback, currentSrc, retryCount, config.enableRetry, config.maxRetries, config.retryDelay]);

  return {
    loadState,
    currentSrc,
    handleLoad,
    handleError,
    retryCount
  };
}

/**
 * LazyImage component with comprehensive loading and optimization features
 */
export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({
  src,
  alt,
  placeholder,
  srcSet,
  sizes,
  fallback,
  placeholderComponent: PlaceholderComponent = SkeletonPlaceholder,
  config: userConfig = {},
  onLoad,
  onError,
  loadingComponent: LoadingComponent = LoadingSpinner,
  skeleton = true,
  aspectRatio,
  priority = false,
  className,
  style,
  ...props
}, ref) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const [containerRef, isIntersecting] = useIntersectionObserver(config);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showImage, setShowImage] = useState(priority);
  
  const {
    loadState,
    currentSrc,
    handleLoad: handleImageLoad,
    handleError: handleImageError,
    retryCount
  } = useImageLoader(src, fallback, config);

  // Start loading when intersecting or priority is set
  useEffect(() => {
    if (isIntersecting || priority) {
      setShowImage(true);
    }
  }, [isIntersecting, priority]);

  // Handle successful image load
  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    handleImageLoad();
    onLoad?.(event);
  }, [handleImageLoad, onLoad]);

  // Handle image load error
  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    handleImageError();
    onError?.(event);
  }, [handleImageError, onError]);

  // Calculate container styles
  const containerStyle = {
    ...style,
    ...(aspectRatio && {
      aspectRatio: aspectRatio.toString(),
      position: 'relative' as const
    })
  };

  // Image styles with fade-in effect
  const imageStyle = {
    transition: `opacity ${config.fadeInDuration}ms ease-in-out`,
    opacity: imageLoaded ? 1 : 0,
    ...(aspectRatio && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    })
  };

  // Placeholder styles
  const placeholderStyle = {
    transition: `opacity ${config.fadeInDuration}ms ease-in-out`,
    opacity: imageLoaded ? 0 : 1,
    ...(aspectRatio && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        aspectRatio && "block",
        className
      )}
      style={containerStyle}
    >
      {/* Progressive placeholder image */}
      {config.progressive && placeholder && !imageLoaded && (
        <img
          src={placeholder}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "filter blur-sm scale-110 transition-opacity duration-300",
            imageLoaded && "opacity-0"
          )}
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {/* Skeleton or custom placeholder */}
      {!config.progressive && !imageLoaded && (
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            !aspectRatio && "min-h-[200px]"
          )}
          style={placeholderStyle}
        >
          {skeleton ? (
            <PlaceholderComponent className="w-full h-full" />
          ) : (
            <LoadingComponent className="w-full h-full" />
          )}
        </div>
      )}

      {/* Main image */}
      {showImage && (
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          srcSet={config.responsive ? srcSet : undefined}
          sizes={config.responsive ? sizes : undefined}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover",
            loadState === 'error' && "opacity-50"
          )}
          style={imageStyle}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      )}

      {/* Error state */}
      {loadState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center p-4">
            <div className="text-muted-foreground text-sm">
              Failed to load image
            </div>
            {config.enableRetry && retryCount > 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                Retry attempt: {retryCount}/{config.maxRetries}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator for priority images */}
      {priority && loadState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingComponent className="w-8 h-8" />
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

/**
 * Hook for preloading images
 */
export function useImagePreloader(urls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(url));
          resolve();
        };
        img.onerror = () => {
          setFailedImages(prev => new Set(prev).add(url));
          resolve();
        };
        img.src = url;
      });
    };

    Promise.all(urls.map(preloadImage));
  }, [urls]);

  return {
    loadedImages,
    failedImages,
    isLoaded: (url: string) => loadedImages.has(url),
    isFailed: (url: string) => failedImages.has(url)
  };
}

/**
 * Utility function to generate responsive image URLs
 */
export function generateResponsiveImageUrls(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): { srcSet: string; sizes: string } {
  const srcSet = widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');

  const sizes = [
    '(max-width: 320px) 320px',
    '(max-width: 640px) 640px',
    '(max-width: 768px) 768px',
    '(max-width: 1024px) 1024px',
    '(max-width: 1280px) 1280px',
    '1920px'
  ].join(', ');

  return { srcSet, sizes };
}

export default LazyImage; 