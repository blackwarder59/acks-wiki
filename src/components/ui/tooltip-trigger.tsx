'use client';

/**
 * Tooltip Trigger Component for ACKS II Wiki
 * 
 * Handles hover detection and touch interactions for triggering tooltips
 * on cross-reference links and other interactive elements.
 * 
 * Features:
 * - Mouse hover detection with configurable delays
 * - Touch device support with tap-and-hold
 * - Keyboard navigation support
 * - Focus management for accessibility
 * - Integration with TooltipProvider
 * - Performance optimization with event delegation
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { 
  useRef, 
  useCallback, 
  useEffect, 
  useState,
  forwardRef
} from 'react';
import { useTooltip, type TooltipConfig } from './tooltip-provider';
import { ContentPreview, AsyncContentPreview } from './content-preview';
import { type ParsedReference } from '../../lib/cross-references/reference-parser';
import { type AnyContent, ContentType } from '../../lib/types/content';

/**
 * Tooltip trigger props
 */
export interface TooltipTriggerProps {
  /** Child element that triggers the tooltip */
  children: React.ReactElement;
  /** Content to show in tooltip */
  content?: React.ReactNode;
  /** Reference data for content preview */
  reference?: ParsedReference;
  /** Content data for preview */
  contentData?: AnyContent;
  /** Tooltip configuration */
  config?: Partial<TooltipConfig>;
  /** Whether to enable touch interactions */
  enableTouch?: boolean;
  /** Whether to enable keyboard interactions */
  enableKeyboard?: boolean;
  /** Custom content loader for async previews */
  contentLoader?: (reference: ParsedReference) => Promise<AnyContent>;
  /** Callback when tooltip is shown */
  onTooltipShow?: (reference?: ParsedReference) => void;
  /** Callback when tooltip is hidden */
  onTooltipHide?: (reference?: ParsedReference) => void;
  /** Whether tooltip is disabled */
  disabled?: boolean;
}

/**
 * Touch interaction hook
 */
function useTouchInteraction(
  elementRef: React.RefObject<HTMLElement>,
  onTouchStart: () => void,
  onTouchEnd: () => void,
  enabled: boolean = true
) {
  const touchTimeoutRef = useRef<NodeJS.Timeout>();
  const isTouchingRef = useRef(false);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!enabled) return;
    
    event.preventDefault();
    isTouchingRef.current = true;
    
    // Show tooltip after 500ms of touch
    touchTimeoutRef.current = setTimeout(() => {
      if (isTouchingRef.current) {
        onTouchStart();
      }
    }, 500);
  }, [enabled, onTouchStart]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return;
    
    isTouchingRef.current = false;
    
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = undefined;
    }
    
    onTouchEnd();
  }, [enabled, onTouchEnd]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, [enabled, handleTouchStart, handleTouchEnd]);
}

/**
 * Keyboard interaction hook
 */
function useKeyboardInteraction(
  elementRef: React.RefObject<HTMLElement>,
  onKeyboardShow: () => void,
  onKeyboardHide: () => void,
  enabled: boolean = true
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onKeyboardShow();
    } else if (event.key === 'Escape') {
      onKeyboardHide();
    }
  }, [enabled, onKeyboardShow, onKeyboardHide]);

  const handleFocus = useCallback(() => {
    if (enabled) {
      onKeyboardShow();
    }
  }, [enabled, onKeyboardShow]);

  const handleBlur = useCallback(() => {
    if (enabled) {
      onKeyboardHide();
    }
  }, [enabled, onKeyboardHide]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [enabled, handleKeyDown, handleFocus, handleBlur]);
}

/**
 * Tooltip Trigger Component
 */
export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(({
  children,
  content,
  reference,
  contentData,
  config,
  enableTouch = true,
  enableKeyboard = true,
  contentLoader,
  onTooltipShow,
  onTooltipHide,
  disabled = false
}, ref) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const elementRef = useRef<HTMLElement>(null);
  const [loadedContent, setLoadedContent] = useState<AnyContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Combine refs
  const combinedRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  // Load content asynchronously if needed
  const loadContentAsync = useCallback(async () => {
    if (!reference || loadedContent || isLoading || disabled) return;

    if (contentLoader) {
      try {
        setIsLoading(true);
        setLoadError(null);
        const content = await contentLoader(reference);
        setLoadedContent(content);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Failed to load content');
      } finally {
        setIsLoading(false);
      }
    }
  }, [reference, loadedContent, isLoading, disabled, contentLoader]);

  // Show tooltip handler
  const handleShowTooltip = useCallback(() => {
    if (disabled || !elementRef.current) return;

    let tooltipContent: React.ReactNode;

    if (content) {
      // Use provided content
      tooltipContent = content;
    } else if (contentData) {
      // Use provided content data
      tooltipContent = <ContentPreview content={contentData} />;
    } else if (reference) {
      if (loadedContent) {
        // Use loaded content
        tooltipContent = <ContentPreview content={loadedContent} />;
      } else if (contentLoader) {
        // Show async loading preview
        tooltipContent = (
          <AsyncContentPreview
            contentId={reference.normalizedText}
            contentType={reference.contentType}
            onContentLoad={setLoadedContent}
          />
        );
      } else {
        // Show basic reference info
        tooltipContent = (
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{reference.originalText}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {reference.contentType.replace('_', ' ')}
              </span>
            </div>
            {reference.context && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {reference.context}
              </p>
            )}
          </div>
        );
      }
    } else {
      return; // No content to show
    }

    showTooltip(tooltipContent, elementRef.current, config);
    onTooltipShow?.(reference);
  }, [
    disabled, 
    content, 
    contentData, 
    reference, 
    loadedContent, 
    contentLoader, 
    config, 
    showTooltip, 
    onTooltipShow
  ]);

  // Hide tooltip handler
  const handleHideTooltip = useCallback(() => {
    if (disabled) return;
    
    hideTooltip();
    onTooltipHide?.(reference);
  }, [disabled, hideTooltip, onTooltipHide, reference]);

  // Mouse interaction handlers
  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      loadContentAsync();
      handleShowTooltip();
    }
  }, [disabled, loadContentAsync, handleShowTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled) {
      handleHideTooltip();
    }
  }, [disabled, handleHideTooltip]);

  // Touch interactions
  useTouchInteraction(
    elementRef,
    handleShowTooltip,
    handleHideTooltip,
    enableTouch && !disabled
  );

  // Keyboard interactions
  useKeyboardInteraction(
    elementRef,
    handleShowTooltip,
    handleHideTooltip,
    enableKeyboard && !disabled
  );

  // Clone child element with event handlers
  const childElement = React.cloneElement(children, {
    ref: combinedRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    tabIndex: enableKeyboard && !disabled ? (children.props.tabIndex ?? 0) : children.props.tabIndex,
    'aria-describedby': disabled ? undefined : 'tooltip',
    'data-tooltip-trigger': !disabled ? 'true' : undefined,
    style: {
      ...children.props.style,
      ...(enableKeyboard && !disabled && {
        outline: 'none',
        cursor: 'pointer'
      })
    }
  });

  return childElement;
});

TooltipTrigger.displayName = 'TooltipTrigger';

/**
 * Hook for creating tooltip triggers with references
 */
export function useTooltipTrigger(
  reference: ParsedReference,
  config?: Partial<TooltipConfig>
) {
  const { showTooltip, hideTooltip } = useTooltip();

  const createTrigger = useCallback((element: HTMLElement) => {
    const handleMouseEnter = () => {
      const content = (
        <AsyncContentPreview
          contentId={reference.normalizedText}
          contentType={reference.contentType}
        />
      );
      showTooltip(content, element, config);
    };

    const handleMouseLeave = () => {
      hideTooltip();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reference, config, showTooltip, hideTooltip]);

  return createTrigger;
}

export default TooltipTrigger; 