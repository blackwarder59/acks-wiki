/**
 * Keyboard Shortcuts Component for ACKS II Wiki Navigation
 * 
 * Provides keyboard shortcuts for common navigation actions
 * including chapter navigation, search, and accessibility features
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Interface for keyboard shortcut configuration
 */
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
  category: 'navigation' | 'content' | 'accessibility';
}

/**
 * Props for the KeyboardShortcuts component
 */
interface KeyboardShortcutsProps {
  currentChapterId?: string;
  totalChapters?: number;
  onToggleSidebar?: () => void;
  onToggleTableOfContents?: () => void;
  onFocusSearch?: () => void;
  shortcuts?: KeyboardShortcut[];
  disabled?: boolean;
}

/**
 * Keyboard Shortcuts Hook and Component
 * 
 * @param currentChapterId - ID of the current chapter
 * @param totalChapters - Total number of chapters for navigation
 * @param onToggleSidebar - Callback to toggle sidebar
 * @param onToggleTableOfContents - Callback to toggle TOC
 * @param onFocusSearch - Callback to focus search input
 * @param shortcuts - Additional custom shortcuts
 * @param disabled - Whether shortcuts are disabled
 */
export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  currentChapterId,
  totalChapters = 15,
  onToggleSidebar,
  onToggleTableOfContents,
  onFocusSearch,
  shortcuts: customShortcuts = [],
  disabled = false
}) => {
  const router = useRouter();

  /**
   * Navigate to previous chapter
   */
  const navigateToPreviousChapter = useCallback(() => {
    if (!currentChapterId) return;
    
    // Extract chapter number from ID (e.g., "chapter-1-characters" -> 1)
    const match = currentChapterId.match(/chapter-(\d+)/);
    if (match) {
      const currentNumber = parseInt(match[1]);
      if (currentNumber > 1) {
        router.push(`/rules/chapter-${currentNumber - 1}`);
      }
    }
  }, [currentChapterId, router]);

  /**
   * Navigate to next chapter
   */
  const navigateToNextChapter = useCallback(() => {
    if (!currentChapterId) return;
    
    // Extract chapter number from ID (e.g., "chapter-1-characters" -> 1)
    const match = currentChapterId.match(/chapter-(\d+)/);
    if (match) {
      const currentNumber = parseInt(match[1]);
      if (currentNumber < 12) { // 12 main chapters
        router.push(`/rules/chapter-${currentNumber + 1}`);
      } else if (currentNumber === 12) {
        // Go to first appendix
        router.push(`/rules/appendix-a`);
      }
    } else if (currentChapterId.includes('appendix')) {
      // Handle appendix navigation
      if (currentChapterId.includes('appendix-a')) {
        router.push(`/rules/appendix-b`);
      } else if (currentChapterId.includes('appendix-b')) {
        router.push(`/rules/appendix-c`);
      }
    }
  }, [currentChapterId, router]);

  /**
   * Navigate to specific chapter by number
   */
  const navigateToChapter = useCallback((chapterNumber: number) => {
    if (chapterNumber >= 1 && chapterNumber <= 12) {
      router.push(`/rules/chapter-${chapterNumber}`);
    }
  }, [router]);

  /**
   * Scroll to top of page
   */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /**
   * Scroll to bottom of page
   */
  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  /**
   * Default keyboard shortcuts
   */
  const defaultShortcuts: KeyboardShortcut[] = [
    // Navigation
    {
      key: 'ArrowLeft',
      alt: true,
      action: navigateToPreviousChapter,
      description: 'Previous chapter',
      category: 'navigation'
    },
    {
      key: 'ArrowRight',
      alt: true,
      action: navigateToNextChapter,
      description: 'Next chapter',
      category: 'navigation'
    },
    {
      key: 'h',
      action: () => router.push('/'),
      description: 'Go to home page',
      category: 'navigation'
    },
    {
      key: 'r',
      action: () => router.push('/rules'),
      description: 'Go to rulebook index',
      category: 'navigation'
    },
    
    // Content navigation
    {
      key: 'Home',
      action: scrollToTop,
      description: 'Scroll to top',
      category: 'content'
    },
    {
      key: 'End',
      action: scrollToBottom,
      description: 'Scroll to bottom',
      category: 'content'
    },
    {
      key: 'g',
      shift: true,
      action: scrollToTop,
      description: 'Go to top (vim-style)',
      category: 'content'
    },
    {
      key: 'G',
      shift: true,
      action: scrollToBottom,
      description: 'Go to bottom (vim-style)',
      category: 'content'
    },

    // Interface controls
    {
      key: 's',
      action: onToggleSidebar || (() => {}),
      description: 'Toggle sidebar',
      category: 'accessibility'
    },
    {
      key: 't',
      action: onToggleTableOfContents || (() => {}),
      description: 'Toggle table of contents',
      category: 'accessibility'
    },
    {
      key: '/',
      action: onFocusSearch || (() => {}),
      description: 'Focus search',
      category: 'accessibility'
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open modals or focus traps
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      },
      description: 'Close modals/unfocus',
      category: 'accessibility'
    },

    // Chapter number shortcuts (1-9)
    ...Array.from({ length: 9 }, (_, i) => ({
      key: (i + 1).toString(),
      action: () => navigateToChapter(i + 1),
      description: `Go to chapter ${i + 1}`,
      category: 'navigation' as const
    }))
  ];

  /**
   * All shortcuts (default + custom)
   */
  const allShortcuts = [...defaultShortcuts, ...customShortcuts];

  /**
   * Handle keydown events
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return;

    // Don't trigger shortcuts when user is typing in input fields
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    // Find matching shortcut
    const shortcut = allShortcuts.find(s => {
      const keyMatch = s.key === event.key;
      const ctrlMatch = s.ctrl ? event.ctrlKey : !event.ctrlKey;
      const altMatch = s.alt ? event.altKey : !event.altKey;
      const shiftMatch = s.shift ? event.shiftKey : !event.shiftKey;
      
      return keyMatch && ctrlMatch && altMatch && shiftMatch;
    });

    if (shortcut) {
      event.preventDefault();
      shortcut.action();
    }
  }, [allShortcuts, disabled]);

  /**
   * Set up event listeners
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // This component doesn't render anything visible
  return null;
};

/**
 * Keyboard Shortcuts Help Component
 * 
 * Displays a help modal with all available keyboard shortcuts
 */
interface KeyboardShortcutsHelpProps {
  shortcuts?: KeyboardShortcut[];
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  shortcuts = [],
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const groupedShortcuts = shortcuts.reduce((groups, shortcut) => {
    if (!groups[shortcut.category]) {
      groups[shortcut.category] = [];
    }
    groups[shortcut.category].push(shortcut);
    return groups;
  }, {} as Record<string, KeyboardShortcut[]>);

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const parts = [];
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.alt) parts.push('Alt');
    if (shortcut.shift) parts.push('Shift');
    parts.push(shortcut.key);
    return parts.join(' + ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-md"
              aria-label="Close shortcuts help"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-accent text-sm font-mono rounded">
                      {formatShortcut(shortcut)}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts; 