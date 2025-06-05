'use client';

/**
 * Enhanced Mobile Navigation Component for ACKS II Wiki
 * 
 * Features:
 * - Gesture support (swipe right to open, swipe left to close)
 * - Smooth animations with Framer Motion
 * - Accessibility with focus trapping and ARIA attributes
 * - Context-aware navigation highlighting
 * - Collapsible sections for content organization
 * - Touch-optimized with proper target sizes (44x44px minimum)
 * - Backdrop blur and overlay effects
 * - Integrated color palette switcher for mobile theming
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sword,
  Shield,
  Scroll,
  Crown,
  Hammer,
  BookOpen,
  Gavel,
  Search,
  Home,
  Star,
  Clock,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaletteSwitcher } from '@/components/ui/palette-switcher';

/**
 * Navigation item interface
 */
interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: NavigationItem[];
  badge?: string;
}

/**
 * Mobile navigation props
 */
interface MobileNavigationProps {
  /** Whether the navigation is open */
  isOpen: boolean;
  /** Function to toggle navigation state */
  onToggle: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to enable gesture support */
  enableGestures?: boolean;
}

/**
 * Navigation structure for ACKS II content - Updated to only include working routes
 */
const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home
  },
  {
    href: '/search',
    label: 'Search',
    icon: Search
  },
  {
    href: '/monsters',
    label: 'Monsters',
    icon: Shield,
    badge: '167'
  },
  {
    href: '/spells',
    label: 'Spells',
    icon: Scroll,
    children: [
      { href: '/spells?magicType=Arcane', label: 'Arcane Spells', icon: ChevronRight },
      { href: '/spells?magicType=Divine', label: 'Divine Spells', icon: ChevronRight },
      { href: '/spells?level=1', label: 'Level 1', icon: ChevronRight },
      { href: '/spells?level=2', label: 'Level 2', icon: ChevronRight },
      { href: '/spells?level=3', label: 'Level 3', icon: ChevronRight },
      { href: '/spells?level=4', label: 'Level 4', icon: ChevronRight },
      { href: '/spells?level=5', label: 'Level 5', icon: ChevronRight },
      { href: '/spells?level=6', label: 'Level 6', icon: ChevronRight }
    ]
  },
  {
    href: '/rules',
    label: 'Rules',
    icon: BookOpen,
    badge: '118',
    children: [
      { href: '/rules/character-creation', label: 'Character Creation', icon: ChevronRight },
      { href: '/rules/classes', label: 'Character Classes', icon: ChevronRight },
      { href: '/rules/proficiencies', label: 'Proficiencies', icon: ChevronRight },
      { href: '/rules/equipment', label: 'Equipment & Gear', icon: ChevronRight },
      { href: '/rules/spells', label: 'Spells & Magic', icon: ChevronRight },
      { href: '/rules/adventures', label: 'Adventures', icon: ChevronRight },
      { href: '/rules/campaigns', label: 'Campaigns', icon: ChevronRight },
      { href: '/rules/armies', label: 'Armies & War', icon: ChevronRight }
    ]
  },
  {
    href: '/judges-journal',
    label: 'Judges Journal',
    icon: Crown,
    badge: '175'
  },
  {
    href: '/bookmarks',
    label: 'Bookmarks',
    icon: Bookmark
  }
];

/**
 * Enhanced Mobile Navigation Component
 */
export function MobileNavigation({
  isOpen,
  onToggle,
  className = '',
  enableGestures = true
}: MobileNavigationProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  /**
   * Handle touch start for gesture detection
   */
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enableGestures) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [enableGestures]);

  /**
   * Handle touch move for gesture detection
   */
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enableGestures) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [enableGestures]);

  /**
   * Handle touch end for gesture detection
   */
  const handleTouchEnd = useCallback(() => {
    if (!enableGestures || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && isOpen) {
      onToggle(false);
    } else if (isRightSwipe && !isOpen) {
      onToggle(true);
    }
  }, [enableGestures, touchStart, touchEnd, isOpen, onToggle, minSwipeDistance]);

  /**
   * Set up gesture listeners
   */
  useEffect(() => {
    if (!enableGestures) return;

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enableGestures, handleTouchStart, handleTouchMove, handleTouchEnd]);

  /**
   * Handle escape key to close navigation
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  /**
   * Focus trap for accessibility
   */
  useEffect(() => {
    if (!isOpen || !navRef.current) return;

    const focusableElements = navRef.current.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  /**
   * Toggle section expansion
   */
  const toggleSection = useCallback((href: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  }, []);

  /**
   * Check if current path matches navigation item
   */
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  /**
   * Handle navigation item click
   */
  const handleItemClick = useCallback((href: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleSection(href);
    } else {
      onToggle(false);
    }
  }, [toggleSection, onToggle]);

  /**
   * Render navigation item
   */
  const renderNavigationItem = useCallback((item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.href);
    const active = isActive(item.href);
    const Icon = item.icon;

    return (
      <div key={item.href} className={`${level > 0 ? 'ml-4' : ''}`}>
        {hasChildren ? (
          <button
            onClick={() => handleItemClick(item.href, true)}
            className={`
              w-full flex items-center justify-between px-4 py-3
              text-left text-base font-medium rounded-lg
              transition-all duration-200 min-h-[44px]
              ${active 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-foreground hover:bg-muted hover:text-accent-foreground'
              }
            `}
            aria-expanded={isExpanded}
            aria-controls={`submenu-${item.href}`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="flex-shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={() => handleItemClick(item.href, false)}
            className={`
              flex items-center gap-3 px-4 py-3 text-base font-medium
              rounded-lg transition-all duration-200 min-h-[44px]
              ${active 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-foreground hover:bg-muted hover:text-accent-foreground'
              }
            `}
          >
            <Icon size={20} className="flex-shrink-0" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-auto">
                {item.badge}
              </span>
            )}
          </Link>
        )}

        {/* Submenu */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              id={`submenu-${item.href}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="py-2 space-y-1">
                {item.children?.map(child => renderNavigationItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }, [expandedSections, isActive, handleItemClick]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => onToggle(false)}
            aria-hidden="true"
          />

          {/* Navigation Panel */}
          <motion.nav
            ref={navRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            className={`
              fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw]
              bg-background border-r border-border shadow-2xl
              overflow-y-auto overscroll-contain
              ${className}
            `}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <Link 
                href="/" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                onClick={() => onToggle(false)}
              >
                <Sword className="h-6 w-6 text-primary" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground">ACKS II</span>
                  <span className="text-xs text-muted-foreground -mt-1">Wiki</span>
                </div>
              </Link>
              
              <button
                onClick={() => onToggle(false)}
                className="
                  p-2 rounded-lg hover:bg-muted transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary
                "
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navigationItems.map(item => renderNavigationItem(item))}
            </div>

            {/* Color Theme Section */}
            <div className="p-4 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Color Theme</h3>
              <PaletteSwitcher className="w-full" showLabels={true} />
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-border bg-muted/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} />
                <span>ACKS II Wiki v1.0</span>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Mobile Navigation Toggle Button
 */
interface MobileNavToggleProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  className?: string;
}

export function MobileNavToggle({ isOpen, onToggle, className = '' }: MobileNavToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isOpen)}
      className={`
        inline-flex items-center justify-center h-10 w-10 rounded-lg
        border border-input bg-background hover:bg-accent hover:text-accent-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        transition-colors duration-200 min-h-[44px] min-w-[44px]
        ${className}
      `}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.div>
    </button>
  );
} 