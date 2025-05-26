'use client';

/**
 * Bookmarks Page for ACKS II Wiki
 * 
 * A dedicated page for managing bookmarked content with advanced features
 * including category filtering, search, export/import, and bulk operations.
 * 
 * Features:
 * - View all bookmarks with category filtering
 * - Search through bookmarked content
 * - Export/import bookmark collections
 * - Bulk bookmark operations
 * - Category management
 * - Recently viewed integration
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Download, 
  Upload, 
  Trash2, 
  Grid,
  List,
  BookmarkCheck,
  Tag,
  Calendar,
  Eye
} from 'lucide-react';
import { useBookmarks, type BookmarkItem, type BookmarkCategory } from '../../lib/hooks/use-bookmarks';
import { BookmarkButton } from '../../components/ui/bookmark-button';
import { RecentlyViewed } from '../../components/ui/recently-viewed';
import { BaseContentCard } from '../../components/content/base-content-card';

/**
 * Bookmark filter options
 */
interface BookmarkFilters {
  search: string;
  category: string | null;
  sortBy: 'created' | 'title' | 'accessed' | 'category';
  sortOrder: 'asc' | 'desc';
}

/**
 * Category filter component
 */
function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}: {
  categories: BookmarkCategory[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`
          px-3 py-1.5 text-sm rounded-full border transition-colors
          ${selectedCategory === null
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background text-muted-foreground border-border hover:bg-muted'
          }
        `}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-3 py-1.5 text-sm rounded-full border transition-colors
            flex items-center gap-2
            ${selectedCategory === category.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:bg-muted'
            }
          `}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          {category.name}
          <span className="text-xs opacity-75">
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Bookmark card component
 */
function BookmarkCard({
  bookmark,
  onUpdate,
  viewMode = 'grid'
}: {
  bookmark: BookmarkItem;
  onUpdate: (bookmarkId: string, updates: Partial<BookmarkItem>) => void;
  viewMode?: 'grid' | 'list';
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(bookmark.notes || '');

  const handleSaveNotes = useCallback(() => {
    onUpdate(bookmark.id, { notes });
    setIsEditing(false);
  }, [bookmark.id, notes, onUpdate]);

  const mockContent = {
    id: bookmark.contentId,
    contentType: bookmark.contentType,
    title: bookmark.title,
    description: bookmark.description
  };

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-background">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{bookmark.title}</h3>
          {bookmark.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {bookmark.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {bookmark.createdAt.toLocaleDateString()}
            </div>
            {bookmark.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {bookmark.category}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
                     <BookmarkButton
             content={mockContent as unknown as import('../../lib/types/content').AnyContent}
             size="sm"
             variant="ghost"
             showLabel={false}
           />
        </div>
      </div>
    );
  }

  return (
         <BaseContentCard
       content={mockContent as unknown as import('../../lib/types/content').AnyContent}
       variant="default"
       showCopyButton={true}
       className="h-full"
      footerContent={
        <div className="space-y-3">
          {/* Bookmark metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {bookmark.createdAt.toLocaleDateString()}
            </div>
            {bookmark.lastAccessed && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {bookmark.lastAccessed.toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Category and tags */}
          {(bookmark.category || bookmark.tags.length > 0) && (
            <div className="flex flex-wrap gap-1">
              {bookmark.category && (
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                  {bookmark.category}
                </span>
              )}
              {bookmark.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Notes section */}
          <div className="space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes..."
                  className="w-full p-2 text-xs border border-border rounded resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNotes}
                    className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNotes(bookmark.notes || '');
                    }}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {bookmark.notes ? (
                  <p className="text-xs text-muted-foreground">{bookmark.notes}</p>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Add notes...
                  </button>
                )}
                {bookmark.notes && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
                         <BookmarkButton
               content={mockContent as unknown as import('../../lib/types/content').AnyContent}
               size="sm"
               variant="outline"
               showLabel={true}
             />
          </div>
        </div>
      }
    >
      {/* Main content area is handled by BaseContentCard */}
    </BaseContentCard>
  );
}

/**
 * Bookmarks Page Component
 */
export default function BookmarksPage() {
  const {
    bookmarks,
    categories,
    removeBookmark,
    updateBookmark,
    exportBookmarks,
    importBookmarks,
    clearAllBookmarks,
    getStats,
    isLoading
  } = useBookmarks();

  const [filters, setFilters] = useState<BookmarkFilters>({
    search: '',
    category: null,
    sortBy: 'created',
    sortOrder: 'desc'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort bookmarks
  const filteredBookmarks = useMemo(() => {
    let filtered = bookmarks;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchLower) ||
        bookmark.description?.toLowerCase().includes(searchLower) ||
        bookmark.notes?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(bookmark => bookmark.category === filters.category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'accessed':
          const aAccessed = a.lastAccessed?.getTime() || 0;
          const bAccessed = b.lastAccessed?.getTime() || 0;
          comparison = aAccessed - bAccessed;
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [bookmarks, filters]);

  // Handle export
  const handleExport = useCallback(() => {
    const data = exportBookmarks();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `acks-wiki-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [exportBookmarks]);

  // Handle import
  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        await importBookmarks(data);
      } catch (err) {
        console.error('Failed to import bookmarks:', err);
      }
    };
    reader.readAsText(file);
  }, [importBookmarks]);

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-12 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
            <p className="text-muted-foreground mt-1">
              Manage your saved ACKS II content
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={bookmarks.length === 0}
              className="
                inline-flex items-center gap-2 px-3 py-2 text-sm
                bg-muted text-muted-foreground rounded-md hover:bg-muted/80
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <label className="
              inline-flex items-center gap-2 px-3 py-2 text-sm
              bg-muted text-muted-foreground rounded-md hover:bg-muted/80
              cursor-pointer
            ">
              <Upload className="h-4 w-4" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{stats.totalBookmarks}</div>
            <div className="text-sm text-muted-foreground">Total Bookmarks</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{stats.totalCategories}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{stats.recentlyViewedCount}</div>
            <div className="text-sm text-muted-foreground">Recently Viewed</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {stats.mostUsedCategory || 'None'}
            </div>
            <div className="text-sm text-muted-foreground">Top Category</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="space-y-4">
        {/* Search and view controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="
                w-full pl-10 pr-4 py-2 border border-border rounded-md
                bg-background text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              "
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [typeof filters.sortBy, typeof filters.sortOrder];
                setFilters(prev => ({ ...prev, sortBy, sortOrder }));
              }}
              className="
                px-3 py-2 border border-border rounded-md bg-background
                text-foreground focus:outline-none focus:ring-2 focus:ring-primary
              "
            >
              <option value="created-desc">Newest First</option>
              <option value="created-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="accessed-desc">Recently Accessed</option>
              <option value="category-asc">Category</option>
            </select>
            
            <div className="flex border border-border rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  p-2 ${viewMode === 'grid' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-muted-foreground hover:bg-muted'
                  }
                `}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`
                  p-2 ${viewMode === 'list' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-muted-foreground hover:bg-muted'
                  }
                `}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) => setFilters(prev => ({ ...prev, category }))}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12">
              <BookmarkCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks match your filters'}
              </h3>
              <p className="text-muted-foreground">
                {bookmarks.length === 0 
                  ? 'Start bookmarking content to see it here'
                  : 'Try adjusting your search or category filters'
                }
              </p>
            </div>
          ) : (
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }
            `}>
              {filteredBookmarks.map((bookmark) => (
                                 <BookmarkCard
                   key={bookmark.id}
                   bookmark={bookmark}
                   onUpdate={updateBookmark}
                   viewMode={viewMode}
                 />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentlyViewed
            maxItems={5}
            variant="compact"
            className="bg-muted/30 p-4 rounded-lg"
          />
          
          {bookmarks.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => clearAllBookmarks()}
                  className="
                    w-full text-left px-3 py-2 text-sm text-destructive
                    hover:bg-destructive/10 rounded transition-colors
                    flex items-center gap-2
                  "
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Bookmarks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 