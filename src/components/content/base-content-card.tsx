'use client';

/**
 * Base Content Card Component for ACKS II Wiki
 * 
 * Provides foundational layout, styling, and functionality for all content display components.
 * Includes responsive design, loading states, error handling, and consistent theming.
 * 
 * Features:
 * - Responsive card layout with medieval theme
 * - Loading skeleton states
 * - Error boundary handling
 * - Copy-to-clipboard functionality
 * - Accessibility with proper ARIA labels
 * - Mobile-first responsive design
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, ReactNode } from 'react';
import { Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import { type BaseContent, type ContentType } from '../../lib/types/content';
import { CopyButton, Backlinks, createCopyContent } from '@/components/ui';
import { ReferenceRegistry } from '@/lib/cross-references';

/**
 * Base content card props
 */
export interface BaseContentCardProps {
  /** Content data to display */
  content?: BaseContent;
  /** Whether the component is in loading state */
  isLoading?: boolean;
  /** Error message if content failed to load */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Card variant for different layouts */
  variant?: 'default' | 'compact' | 'detailed';
  /** Whether to show copy button */
  showCopyButton?: boolean;
  /** Whether to show backlinks section */
  showBacklinks?: boolean;
  /** Reference registry for backlinks */
  referenceRegistry?: ReferenceRegistry;
  /** Custom header content */
  headerContent?: ReactNode;
  /** Main content area */
  children?: ReactNode;
  /** Footer content */
  footerContent?: ReactNode;
  /** Callback when copy button is clicked */
  onCopy?: (content: string) => void;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Loading skeleton component
 */
function ContentSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'detailed' }) {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-6 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-1/2`} />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        {variant === 'compact' ? (
          <>
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-4 w-2/3`} />
          </>
        ) : (
          <>
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-4 w-3/4`} />
            {variant === 'detailed' && (
              <>
                <div className={`${skeletonClasses} h-20 w-full`} />
                <div className={`${skeletonClasses} h-4 w-1/2`} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Error display component
 */
function ContentError({ error }: { error: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-destructive">Failed to load content</p>
        <p className="text-xs text-destructive/80 mt-1">{error}</p>
      </div>
    </div>
  );
}

/**
 * Legacy copy button component (kept for backward compatibility)
 * Use the new CopyButton from @/components/ui for enhanced functionality
 */
function LegacyCopyButton({ 
  content, 
  onCopy 
}: { 
  content: string; 
  onCopy?: (content: string) => void; 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.(content);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  }, [content, onCopy]);

  return (
    <button
      onClick={handleCopy}
      className="
        inline-flex items-center gap-1 px-2 py-1 text-xs
        bg-muted hover:bg-muted/80 rounded transition-colors
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      "
      aria-label={copied ? 'Content copied' : 'Copy content to clipboard'}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-600" />
          <span className="text-green-600">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

/**
 * Base Content Card Component
 */
export function BaseContentCard({
  content,
  isLoading = false,
  error,
  className = '',
  variant = 'default',
  showCopyButton = false,
  showBacklinks = false,
  referenceRegistry,
  headerContent,
  children,
  footerContent,
  onCopy,
  interactive = false,
  onClick
}: BaseContentCardProps) {
  // Variant-specific styling
  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    detailed: 'p-6 lg:p-8'
  };

  // Generate content for copying
  const copyContent = content ? createCopyContent(content) : { text: '' };

  return (
    <div
      className={`
        bg-background border border-border rounded-lg shadow-sm
        transition-all duration-200
        ${interactive ? 'cursor-pointer hover:shadow-md hover:border-primary/20' : ''}
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {/* Loading State */}
      {isLoading && (
        <ContentSkeleton variant={variant} />
      )}

      {/* Error State */}
      {error && !isLoading && (
        <ContentError error={error} />
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {/* Header */}
          {(content || headerContent) && (
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                {content && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {content.title}
                    </h3>
                    {content.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {content.description}
                      </p>
                    )}
                  </>
                )}
                {headerContent}
              </div>
              
              {/* Copy Button */}
              {showCopyButton && copyContent && (
                <CopyButton 
                  content={copyContent}
                  size="sm"
                  variant="outline"
                  position="inline"
                  onCopySuccess={(content, format) => onCopy?.(content)}
                  config={{
                    showFormatSelector: true,
                    successMessage: 'Content copied!',
                    enableHaptics: true
                  }}
                />
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-4">
            {children}
          </div>

          {/* Backlinks */}
          {showBacklinks && content && referenceRegistry && (
            <div className="mt-6 pt-4 border-t border-border">
              <Backlinks
                contentId={content.id}
                contentType={content.contentType}
                registry={referenceRegistry}
                config={{
                  initialLimit: 5,
                  showConfidence: true,
                  showReferenceTypes: true,
                  groupByContentType: true,
                  enableSorting: true,
                  enableFiltering: false, // Simplified for card view
                  minConfidence: 0.6
                }}
              />
            </div>
          )}

          {/* Footer */}
          {footerContent && (
            <div className="mt-6 pt-4 border-t border-border">
              {footerContent}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Content card with loading state
 */
export function LoadingContentCard({ 
  variant = 'default', 
  className = '' 
}: { 
  variant?: 'default' | 'compact' | 'detailed'; 
  className?: string; 
}) {
  return (
    <BaseContentCard
      isLoading={true}
      variant={variant}
      className={className}
    >
      {/* Content will be skeleton */}
    </BaseContentCard>
  );
}

/**
 * Content card with error state
 */
export function ErrorContentCard({ 
  error, 
  variant = 'default', 
  className = '' 
}: { 
  error: string; 
  variant?: 'default' | 'compact' | 'detailed'; 
  className?: string; 
}) {
  return (
    <BaseContentCard
      error={error}
      variant={variant}
      className={className}
    >
      {/* Content will be error display */}
    </BaseContentCard>
  );
}

export default BaseContentCard; 