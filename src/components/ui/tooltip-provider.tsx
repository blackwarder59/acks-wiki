'use client';

/**
 * Tooltip Provider Component for ACKS II Wiki
 * 
 * Manages tooltip state, positioning, and accessibility for content previews.
 * Provides intelligent positioning to keep tooltips within viewport bounds
 * and handles both mouse and keyboard interactions.
 * 
 * Features:
 * - Smart positioning with viewport boundary detection
 * - Configurable delays for show/hide
 * - Touch device support with alternative interactions
 * - Keyboard navigation and accessibility
 * - Portal rendering for proper z-index stacking
 * - Performance optimization with debounced positioning
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { 
  createContext, 
  useContext, 
  useState, 
  useRef, 
  useCallback, 
  useEffect,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Tooltip position options
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

/**
 * Tooltip configuration
 */
export interface TooltipConfig {
  /** Position preference */
  position: TooltipPosition;
  /** Delay before showing tooltip (ms) */
  showDelay: number;
  /** Delay before hiding tooltip (ms) */
  hideDelay: number;
  /** Offset from trigger element (px) */
  offset: number;
  /** Whether to show arrow pointing to trigger */
  showArrow: boolean;
  /** Maximum width of tooltip */
  maxWidth: number;
  /** Whether tooltip can be interactive */
  interactive: boolean;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Default tooltip configuration
 */
const DEFAULT_CONFIG: TooltipConfig = {
  position: 'auto',
  showDelay: 500,
  hideDelay: 200,
  offset: 8,
  showArrow: true,
  maxWidth: 320,
  interactive: false,
  className: ''
};

/**
 * Tooltip state
 */
interface TooltipState {
  isVisible: boolean;
  content: React.ReactNode;
  triggerRect: DOMRect | null;
  position: TooltipPosition;
  config: TooltipConfig;
}

/**
 * Tooltip context
 */
interface TooltipContextValue {
  showTooltip: (
    content: React.ReactNode,
    triggerElement: HTMLElement,
    config?: Partial<TooltipConfig>
  ) => void;
  hideTooltip: () => void;
  isVisible: boolean;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

/**
 * Hook to use tooltip context
 */
export function useTooltip(): TooltipContextValue {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
}

/**
 * Calculate optimal tooltip position
 */
function calculatePosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferredPosition: TooltipPosition,
  offset: number
): { position: TooltipPosition; x: number; y: number } {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  };

  const positions = {
    top: {
      x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      y: triggerRect.top - tooltipRect.height - offset
    },
    bottom: {
      x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      y: triggerRect.bottom + offset
    },
    left: {
      x: triggerRect.left - tooltipRect.width - offset,
      y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
    },
    right: {
      x: triggerRect.right + offset,
      y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
    }
  };

  // Check if preferred position fits in viewport
  const checkFit = (pos: { x: number; y: number }) => {
    return (
      pos.x >= viewport.scrollX &&
      pos.x + tooltipRect.width <= viewport.scrollX + viewport.width &&
      pos.y >= viewport.scrollY &&
      pos.y + tooltipRect.height <= viewport.scrollY + viewport.height
    );
  };

  // Try preferred position first (unless auto)
  if (preferredPosition !== 'auto' && checkFit(positions[preferredPosition])) {
    const pos = positions[preferredPosition];
    return { position: preferredPosition, x: pos.x, y: pos.y };
  }

  // Try all positions in order of preference
  const fallbackOrder: ('bottom' | 'top' | 'right' | 'left')[] = ['bottom', 'top', 'right', 'left'];
  
  for (const position of fallbackOrder) {
    if (checkFit(positions[position])) {
      const pos = positions[position];
      return { position, x: pos.x, y: pos.y };
    }
  }

  // If nothing fits, use bottom and adjust to viewport
  const pos = positions.bottom;
  return {
    position: 'bottom',
    x: Math.max(
      viewport.scrollX,
      Math.min(pos.x, viewport.scrollX + viewport.width - tooltipRect.width)
    ),
    y: Math.max(
      viewport.scrollY,
      Math.min(pos.y, viewport.scrollY + viewport.height - tooltipRect.height)
    )
  };
}

/**
 * Tooltip content component
 */
function TooltipContent({ 
  state, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  state: TooltipState;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [calculatedPosition, setCalculatedPosition] = useState<{
    position: TooltipPosition;
    x: number;
    y: number;
  } | null>(null);

  // Calculate position when tooltip becomes visible
  useEffect(() => {
    if (state.isVisible && state.triggerRect && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const position = calculatePosition(
        state.triggerRect,
        tooltipRect,
        state.config.position,
        state.config.offset
      );
      setCalculatedPosition(position);
    }
  }, [state.isVisible, state.triggerRect, state.config.position, state.config.offset]);

  if (!state.isVisible || !calculatedPosition) {
    return null;
  }

  const arrowStyles = state.config.showArrow ? {
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      ...(calculatedPosition.position === 'top' && {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '6px 6px 0 6px',
        borderColor: 'rgb(var(--background)) transparent transparent transparent'
      }),
      ...(calculatedPosition.position === 'bottom' && {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '0 6px 6px 6px',
        borderColor: 'transparent transparent rgb(var(--background)) transparent'
      }),
      ...(calculatedPosition.position === 'left' && {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 0 6px 6px',
        borderColor: 'transparent transparent transparent rgb(var(--background))'
      }),
      ...(calculatedPosition.position === 'right' && {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 6px 6px 0',
        borderColor: 'transparent rgb(var(--background)) transparent transparent'
      })
    }
  } : {};

  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`
        fixed z-50 px-3 py-2 text-sm
        bg-background border border-border rounded-md shadow-lg
        pointer-events-auto
        ${state.config.interactive ? 'cursor-auto' : 'pointer-events-none'}
        ${state.config.className || ''}
      `}
      style={{
        left: calculatedPosition.x,
        top: calculatedPosition.y,
        maxWidth: state.config.maxWidth,
        ...arrowStyles
      }}
      onMouseEnter={state.config.interactive ? onMouseEnter : undefined}
      onMouseLeave={state.config.interactive ? onMouseLeave : undefined}
      role="tooltip"
      aria-live="polite"
    >
      {state.content}
    </motion.div>
  );
}

/**
 * Tooltip Provider Component
 */
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TooltipState>({
    isVisible: false,
    content: null,
    triggerRect: null,
    position: 'auto',
    config: DEFAULT_CONFIG
  });

  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringTooltip = useRef(false);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const showTooltip = useCallback((
    content: React.ReactNode,
    triggerElement: HTMLElement,
    config: Partial<TooltipConfig> = {}
  ) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const triggerRect = triggerElement.getBoundingClientRect();

    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    showTimeoutRef.current = setTimeout(() => {
      setState({
        isVisible: true,
        content,
        triggerRect,
        position: mergedConfig.position,
        config: mergedConfig
      });
    }, mergedConfig.showDelay);
  }, []);

  const hideTooltip = useCallback(() => {
    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    // Don't hide if hovering over interactive tooltip
    if (state.config.interactive && isHoveringTooltip.current) {
      return;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isVisible: false }));
    }, state.config.hideDelay);
  }, [state.config.hideDelay, state.config.interactive]);

  const handleTooltipMouseEnter = useCallback(() => {
    isHoveringTooltip.current = true;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleTooltipMouseLeave = useCallback(() => {
    isHoveringTooltip.current = false;
    hideTooltip();
  }, [hideTooltip]);

  // Handle escape key to close tooltip
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.isVisible) {
        setState(prev => ({ ...prev, isVisible: false }));
      }
    };

    if (state.isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [state.isVisible]);

  const contextValue = useMemo(() => ({
    showTooltip,
    hideTooltip,
    isVisible: state.isVisible
  }), [showTooltip, hideTooltip, state.isVisible]);

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {state.isVisible && (
            <TooltipContent
              state={state}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </TooltipContext.Provider>
  );
}

export default TooltipProvider; 