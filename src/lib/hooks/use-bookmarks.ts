'use client';

/**
 * Bookmarks Management Hook for ACKS II Wiki
 * 
 * Provides comprehensive bookmark functionality with localStorage persistence,
 * cross-tab synchronization, and bookmark organization features.
 * 
 * Features:
 * - Add/remove bookmarks with localStorage persistence
 * - Bookmark categories and tags for organization
 * - Cross-tab synchronization using storage events
 * - Export/import functionality
 * - Storage limit handling with fallback behavior
 * - Recently viewed content tracking
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { type AnyContent, type ContentType } from '../types/content';

/**
 * Bookmark item interface
 */
export interface BookmarkItem {
  /** Unique identifier for the bookmark */
  id: string;
  /** Content ID being bookmarked */
  contentId: string;
  /** Content type */
  contentType: ContentType;
  /** Display title */
  title: string;
  /** Brief description */
  description?: string;
  /** Bookmark category */
  category?: string;
  /** Tags for organization */
  tags: string[];
  /** When bookmark was created */
  createdAt: Date;
  /** Last accessed timestamp */
  lastAccessed?: Date;
  /** Custom notes */
  notes?: string;
}

/**
 * Recently viewed item interface
 */
export interface RecentlyViewedItem {
  /** Content ID */
  contentId: string;
  /** Content type */
  contentType: ContentType;
  /** Display title */
  title: string;
  /** Brief description */
  description?: string;
  /** When item was viewed */
  viewedAt: Date;
  /** View count */
  viewCount: number;
}

/**
 * Bookmark category interface
 */
export interface BookmarkCategory {
  /** Category ID */
  id: string;
  /** Category name */
  name: string;
  /** Category description */
  description?: string;
  /** Category color */
  color?: string;
  /** Number of bookmarks in category */
  count: number;
}

/**
 * Bookmark export data structure
 */
export interface BookmarkExportData {
  /** Export timestamp */
  exportedAt: Date;
  /** Version of export format */
  version: string;
  /** Bookmarks data */
  bookmarks: BookmarkItem[];
  /** Categories data */
  categories: BookmarkCategory[];
}

/**
 * Hook return type
 */
export interface UseBookmarksReturn {
  /** Array of all bookmarks */
  bookmarks: BookmarkItem[];
  /** Array of recently viewed items */
  recentlyViewed: RecentlyViewedItem[];
  /** Available bookmark categories */
  categories: BookmarkCategory[];
  /** Whether data is loading */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  
  // Bookmark management
  /** Add a bookmark */
  addBookmark: (content: AnyContent, category?: string, tags?: string[]) => Promise<boolean>;
  /** Remove a bookmark */
  removeBookmark: (contentId: string) => Promise<boolean>;
  /** Check if content is bookmarked */
  isBookmarked: (contentId: string) => boolean;
  /** Update bookmark */
  updateBookmark: (bookmarkId: string, updates: Partial<BookmarkItem>) => Promise<boolean>;
  /** Get bookmark by content ID */
  getBookmark: (contentId: string) => BookmarkItem | undefined;
  
  // Recently viewed management
  /** Add item to recently viewed */
  addToRecentlyViewed: (content: AnyContent) => void;
  /** Clear recently viewed history */
  clearRecentlyViewed: () => void;
  /** Remove item from recently viewed */
  removeFromRecentlyViewed: (contentId: string) => void;
  
  // Category management
  /** Create new category */
  createCategory: (name: string, description?: string, color?: string) => Promise<boolean>;
  /** Update category */
  updateCategory: (categoryId: string, updates: Partial<BookmarkCategory>) => Promise<boolean>;
  /** Delete category */
  deleteCategory: (categoryId: string) => Promise<boolean>;
  /** Get bookmarks by category */
  getBookmarksByCategory: (categoryId: string) => BookmarkItem[];
  
  // Import/Export
  /** Export bookmarks */
  exportBookmarks: () => BookmarkExportData;
  /** Import bookmarks */
  importBookmarks: (data: BookmarkExportData) => Promise<boolean>;
  
  // Utility functions
  /** Clear all bookmarks */
  clearAllBookmarks: () => Promise<boolean>;
  /** Get bookmark statistics */
  getStats: () => {
    totalBookmarks: number;
    totalCategories: number;
    recentlyViewedCount: number;
    mostUsedCategory: string | null;
  };
}

// Storage keys
const STORAGE_KEYS = {
  BOOKMARKS: 'acks-wiki-bookmarks',
  RECENTLY_VIEWED: 'acks-wiki-recently-viewed',
  CATEGORIES: 'acks-wiki-bookmark-categories'
} as const;

// Configuration
const CONFIG = {
  MAX_RECENTLY_VIEWED: 20,
  MAX_BOOKMARKS: 1000,
  STORAGE_VERSION: '1.0.0'
} as const;

/**
 * Bookmarks management hook
 */
export function useBookmarks(): UseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [categories, setCategories] = useState<BookmarkCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from localStorage
   */
  const loadData = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      // Load bookmarks
      const bookmarksData = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (bookmarksData) {
        const parsed = JSON.parse(bookmarksData);
        const bookmarksWithDates = parsed.map((bookmark: any) => ({
          ...bookmark,
          createdAt: new Date(bookmark.createdAt),
          lastAccessed: bookmark.lastAccessed ? new Date(bookmark.lastAccessed) : undefined
        }));
        setBookmarks(bookmarksWithDates);
      }

      // Load recently viewed
      const recentlyViewedData = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      if (recentlyViewedData) {
        const parsed = JSON.parse(recentlyViewedData);
        const recentlyViewedWithDates = parsed.map((item: any) => ({
          ...item,
          viewedAt: new Date(item.viewedAt)
        }));
        setRecentlyViewed(recentlyViewedWithDates);
      }

      // Load categories
      const categoriesData = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (categoriesData) {
        const parsed = JSON.parse(categoriesData);
        setCategories(parsed);
      } else {
        // Create default categories
        const defaultCategories: BookmarkCategory[] = [
          { id: 'monsters', name: 'Monsters', description: 'Creature stat blocks and lore', color: '#ef4444', count: 0 },
          { id: 'spells', name: 'Spells', description: 'Arcane and divine magic', color: '#8b5cf6', count: 0 },
          { id: 'classes', name: 'Classes', description: 'Character classes and builds', color: '#06b6d4', count: 0 },
          { id: 'equipment', name: 'Equipment', description: 'Weapons, armor, and gear', color: '#f59e0b', count: 0 },
          { id: 'rules', name: 'Rules', description: 'Game mechanics and rulings', color: '#10b981', count: 0 }
        ];
        setCategories(defaultCategories);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
      }
    } catch (err) {
      console.error('Failed to load bookmark data:', err);
      setError('Failed to load bookmark data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Save data to localStorage
   */
  const saveData = useCallback((
    newBookmarks?: BookmarkItem[],
    newRecentlyViewed?: RecentlyViewedItem[],
    newCategories?: BookmarkCategory[]
  ) => {
    try {
      if (newBookmarks) {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(newBookmarks));
      }
      if (newRecentlyViewed) {
        localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(newRecentlyViewed));
      }
      if (newCategories) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newCategories));
      }
    } catch (err) {
      console.error('Failed to save bookmark data:', err);
      setError('Failed to save bookmark data');
      return false;
    }
    return true;
  }, []);

  /**
   * Handle storage events for cross-tab synchronization
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (Object.values(STORAGE_KEYS).includes(e.key as any)) {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadData]);

  /**
   * Load data on mount
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * Add bookmark
   */
  const addBookmark = useCallback(async (
    content: AnyContent,
    category?: string,
    tags: string[] = []
  ): Promise<boolean> => {
    try {
      // Check if already bookmarked
      if (bookmarks.some(b => b.contentId === content.id)) {
        return false;
      }

      // Check storage limits
      if (bookmarks.length >= CONFIG.MAX_BOOKMARKS) {
        setError('Maximum number of bookmarks reached');
        return false;
      }

      const newBookmark: BookmarkItem = {
        id: `bookmark-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        contentId: content.id,
        contentType: content.contentType,
        title: content.title,
        description: content.description,
        category,
        tags,
        createdAt: new Date()
      };

      const newBookmarks = [...bookmarks, newBookmark];
      setBookmarks(newBookmarks);

      // Update category counts
      if (category) {
        const newCategories = categories.map(cat => 
          cat.id === category 
            ? { ...cat, count: cat.count + 1 }
            : cat
        );
        setCategories(newCategories);
        saveData(newBookmarks, undefined, newCategories);
      } else {
        saveData(newBookmarks);
      }

      return true;
    } catch (err) {
      console.error('Failed to add bookmark:', err);
      setError('Failed to add bookmark');
      return false;
    }
  }, [bookmarks, categories, saveData]);

  /**
   * Remove bookmark
   */
  const removeBookmark = useCallback(async (contentId: string): Promise<boolean> => {
    try {
      const bookmark = bookmarks.find(b => b.contentId === contentId);
      if (!bookmark) return false;

      const newBookmarks = bookmarks.filter(b => b.contentId !== contentId);
      setBookmarks(newBookmarks);

      // Update category counts
      if (bookmark.category) {
        const newCategories = categories.map(cat => 
          cat.id === bookmark.category 
            ? { ...cat, count: Math.max(0, cat.count - 1) }
            : cat
        );
        setCategories(newCategories);
        saveData(newBookmarks, undefined, newCategories);
      } else {
        saveData(newBookmarks);
      }

      return true;
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
      setError('Failed to remove bookmark');
      return false;
    }
  }, [bookmarks, categories, saveData]);

  /**
   * Check if content is bookmarked
   */
  const isBookmarked = useCallback((contentId: string): boolean => {
    return bookmarks.some(b => b.contentId === contentId);
  }, [bookmarks]);

  /**
   * Update bookmark
   */
  const updateBookmark = useCallback(async (
    bookmarkId: string,
    updates: Partial<BookmarkItem>
  ): Promise<boolean> => {
    try {
      const newBookmarks = bookmarks.map(bookmark =>
        bookmark.id === bookmarkId
          ? { ...bookmark, ...updates }
          : bookmark
      );
      setBookmarks(newBookmarks);
      saveData(newBookmarks);
      return true;
    } catch (err) {
      console.error('Failed to update bookmark:', err);
      setError('Failed to update bookmark');
      return false;
    }
  }, [bookmarks, saveData]);

  /**
   * Get bookmark by content ID
   */
  const getBookmark = useCallback((contentId: string): BookmarkItem | undefined => {
    return bookmarks.find(b => b.contentId === contentId);
  }, [bookmarks]);

  /**
   * Add to recently viewed
   */
  const addToRecentlyViewed = useCallback((content: AnyContent) => {
    try {
      const existingIndex = recentlyViewed.findIndex(item => item.contentId === content.id);
      let newRecentlyViewed: RecentlyViewedItem[];

      if (existingIndex >= 0) {
        // Update existing item
        const existingItem = recentlyViewed[existingIndex];
        const updatedItem: RecentlyViewedItem = {
          ...existingItem,
          viewedAt: new Date(),
          viewCount: existingItem.viewCount + 1
        };
        
        // Move to front
        newRecentlyViewed = [
          updatedItem,
          ...recentlyViewed.slice(0, existingIndex),
          ...recentlyViewed.slice(existingIndex + 1)
        ];
      } else {
        // Add new item
        const newItem: RecentlyViewedItem = {
          contentId: content.id,
          contentType: content.contentType,
          title: content.title,
          description: content.description,
          viewedAt: new Date(),
          viewCount: 1
        };
        
        newRecentlyViewed = [newItem, ...recentlyViewed];
      }

      // Limit to max items
      if (newRecentlyViewed.length > CONFIG.MAX_RECENTLY_VIEWED) {
        newRecentlyViewed = newRecentlyViewed.slice(0, CONFIG.MAX_RECENTLY_VIEWED);
      }

      setRecentlyViewed(newRecentlyViewed);
      saveData(undefined, newRecentlyViewed);
    } catch (err) {
      console.error('Failed to add to recently viewed:', err);
    }
  }, [recentlyViewed, saveData]);

  /**
   * Clear recently viewed
   */
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    saveData(undefined, []);
  }, [saveData]);

  /**
   * Remove from recently viewed
   */
  const removeFromRecentlyViewed = useCallback((contentId: string) => {
    const newRecentlyViewed = recentlyViewed.filter(item => item.contentId !== contentId);
    setRecentlyViewed(newRecentlyViewed);
    saveData(undefined, newRecentlyViewed);
  }, [recentlyViewed, saveData]);

  /**
   * Create category
   */
  const createCategory = useCallback(async (
    name: string,
    description?: string,
    color?: string
  ): Promise<boolean> => {
    try {
      const newCategory: BookmarkCategory = {
        id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        description,
        color,
        count: 0
      };

      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      saveData(undefined, undefined, newCategories);
      return true;
    } catch (err) {
      console.error('Failed to create category:', err);
      setError('Failed to create category');
      return false;
    }
  }, [categories, saveData]);

  /**
   * Update category
   */
  const updateCategory = useCallback(async (
    categoryId: string,
    updates: Partial<BookmarkCategory>
  ): Promise<boolean> => {
    try {
      const newCategories = categories.map(category =>
        category.id === categoryId
          ? { ...category, ...updates }
          : category
      );
      setCategories(newCategories);
      saveData(undefined, undefined, newCategories);
      return true;
    } catch (err) {
      console.error('Failed to update category:', err);
      setError('Failed to update category');
      return false;
    }
  }, [categories, saveData]);

  /**
   * Delete category
   */
  const deleteCategory = useCallback(async (categoryId: string): Promise<boolean> => {
    try {
      // Remove category from bookmarks
      const newBookmarks = bookmarks.map(bookmark =>
        bookmark.category === categoryId
          ? { ...bookmark, category: undefined }
          : bookmark
      );
      
      // Remove category
      const newCategories = categories.filter(cat => cat.id !== categoryId);
      
      setBookmarks(newBookmarks);
      setCategories(newCategories);
      saveData(newBookmarks, undefined, newCategories);
      return true;
    } catch (err) {
      console.error('Failed to delete category:', err);
      setError('Failed to delete category');
      return false;
    }
  }, [bookmarks, categories, saveData]);

  /**
   * Get bookmarks by category
   */
  const getBookmarksByCategory = useCallback((categoryId: string): BookmarkItem[] => {
    return bookmarks.filter(bookmark => bookmark.category === categoryId);
  }, [bookmarks]);

  /**
   * Export bookmarks
   */
  const exportBookmarks = useCallback((): BookmarkExportData => {
    return {
      exportedAt: new Date(),
      version: CONFIG.STORAGE_VERSION,
      bookmarks,
      categories
    };
  }, [bookmarks, categories]);

  /**
   * Import bookmarks
   */
  const importBookmarks = useCallback(async (data: BookmarkExportData): Promise<boolean> => {
    try {
      // Validate import data
      if (!data.bookmarks || !Array.isArray(data.bookmarks)) {
        setError('Invalid import data');
        return false;
      }

      // Merge with existing bookmarks (avoid duplicates)
      const existingIds = new Set(bookmarks.map(b => b.contentId));
      const newBookmarks = data.bookmarks.filter(b => !existingIds.has(b.contentId));
      
      const mergedBookmarks = [...bookmarks, ...newBookmarks];
      const mergedCategories = [...categories];

      // Merge categories
      if (data.categories) {
        const existingCategoryIds = new Set(categories.map(c => c.id));
        const newCategories = data.categories.filter(c => !existingCategoryIds.has(c.id));
        mergedCategories.push(...newCategories);
      }

      setBookmarks(mergedBookmarks);
      setCategories(mergedCategories);
      saveData(mergedBookmarks, undefined, mergedCategories);
      return true;
    } catch (err) {
      console.error('Failed to import bookmarks:', err);
      setError('Failed to import bookmarks');
      return false;
    }
  }, [bookmarks, categories, saveData]);

  /**
   * Clear all bookmarks
   */
  const clearAllBookmarks = useCallback(async (): Promise<boolean> => {
    try {
      setBookmarks([]);
      // Reset category counts
      const resetCategories = categories.map(cat => ({ ...cat, count: 0 }));
      setCategories(resetCategories);
      saveData([], undefined, resetCategories);
      return true;
    } catch (err) {
      console.error('Failed to clear bookmarks:', err);
      setError('Failed to clear bookmarks');
      return false;
    }
  }, [categories, saveData]);

  /**
   * Get statistics
   */
  const getStats = useCallback(() => {
    const categoryCounts = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.count;
      return acc;
    }, {} as Record<string, number>);

    const mostUsedCategory = Object.entries(categoryCounts).reduce(
      (max, [id, count]) => count > max.count ? { id, count } : max,
      { id: null as string | null, count: 0 }
    );

    return {
      totalBookmarks: bookmarks.length,
      totalCategories: categories.length,
      recentlyViewedCount: recentlyViewed.length,
      mostUsedCategory: mostUsedCategory.id
    };
  }, [bookmarks, categories, recentlyViewed]);

  return {
    bookmarks,
    recentlyViewed,
    categories,
    isLoading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    updateBookmark,
    getBookmark,
    addToRecentlyViewed,
    clearRecentlyViewed,
    removeFromRecentlyViewed,
    createCategory,
    updateCategory,
    deleteCategory,
    getBookmarksByCategory,
    exportBookmarks,
    importBookmarks,
    clearAllBookmarks,
    getStats
  };
} 