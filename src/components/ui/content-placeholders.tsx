'use client';

/**
 * Content-Specific Placeholder Components for ACKS II Wiki
 * 
 * Provides skeleton loading states that match the structure of actual content,
 * improving perceived performance and user experience during loading.
 * 
 * Features:
 * - Content-type specific skeletons
 * - Animated shimmer effects
 * - Responsive design
 * - Accessibility support
 * - Customizable dimensions
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base skeleton component with shimmer animation
 */
export const SkeletonBase: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={cn(
      "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted",
      "bg-[length:200%_100%]",
      className
    )}
    style={{
      animation: 'shimmer 2s infinite linear',
      backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
    }}
    aria-hidden="true"
  >
    {children}
  </div>
);

/**
 * Text line skeleton with configurable width
 */
export const SkeletonText: React.FC<{
  width?: string | number;
  height?: string | number;
  className?: string;
}> = ({ width = '100%', height = '1rem', className }) => (
  <div style={{ width, height }}> 
  <SkeletonBase
      className={cn("rounded h-full w-full", className)} 
  />
  </div>
);

/**
 * Monster card placeholder
 */
export const MonsterCardPlaceholder: React.FC<{
  className?: string;
  compact?: boolean;
}> = ({ className, compact = false }) => (
  <div className={cn("space-y-4 p-4 border border-border rounded-lg", className)}>
    {/* Header */}
    <div className="space-y-2">
      <SkeletonText width="60%" height="1.5rem" />
      <SkeletonText width="40%" height="1rem" />
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: compact ? 4 : 6 }, (_, i) => (
        <div key={i} className="space-y-1">
          <SkeletonText width="80%" height="0.875rem" />
          <SkeletonText width="60%" height="1.25rem" />
        </div>
      ))}
    </div>

    {/* Description */}
    <div className="space-y-2">
      <SkeletonText width="100%" height="1rem" />
      <SkeletonText width="85%" height="1rem" />
      {!compact && <SkeletonText width="70%" height="1rem" />}
    </div>

    {/* Special abilities */}
    {!compact && (
      <div className="space-y-2">
        <SkeletonText width="50%" height="1.125rem" />
        <div className="space-y-1">
          <SkeletonText width="90%" height="0.875rem" />
          <SkeletonText width="75%" height="0.875rem" />
        </div>
      </div>
    )}
  </div>
);

/**
 * Spell card placeholder
 */
export const SpellCardPlaceholder: React.FC<{
  className?: string;
  compact?: boolean;
}> = ({ className, compact = false }) => (
  <div className={cn("space-y-4 p-4 border border-border rounded-lg", className)}>
    {/* Header */}
    <div className="space-y-2">
      <SkeletonText width="50%" height="1.5rem" />
      <div className="flex gap-2">
        <SkeletonText width="60px" height="1.5rem" className="rounded-full" />
        <SkeletonText width="80px" height="1.5rem" className="rounded-full" />
      </div>
    </div>

    {/* Spell details */}
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: compact ? 3 : 5 }, (_, i) => (
        <div key={i} className="space-y-1">
          <SkeletonText width="70%" height="0.875rem" />
          <SkeletonText width="90%" height="1rem" />
        </div>
      ))}
    </div>

    {/* Description */}
    <div className="space-y-2">
      <SkeletonText width="100%" height="1rem" />
      <SkeletonText width="95%" height="1rem" />
      {!compact && (
        <>
          <SkeletonText width="80%" height="1rem" />
          <SkeletonText width="60%" height="1rem" />
        </>
      )}
    </div>
  </div>
);

/**
 * Equipment table row placeholder
 */
export const EquipmentRowPlaceholder: React.FC<{
  className?: string;
  columns?: number;
}> = ({ className, columns = 6 }) => (
  <tr className={cn("border-b border-border", className)}>
    {Array.from({ length: columns }, (_, i) => (
      <td key={i} className="p-2">
        <SkeletonText 
          width={i === 0 ? "80%" : "60%"} 
          height="1rem" 
        />
      </td>
    ))}
  </tr>
);

/**
 * Equipment table placeholder
 */
export const EquipmentTablePlaceholder: React.FC<{
  className?: string;
  rows?: number;
  columns?: number;
}> = ({ className, rows = 8, columns = 6 }) => (
  <div className={cn("border border-border rounded-lg overflow-hidden", className)}>
    {/* Table header */}
    <div className="bg-muted/50 p-4 border-b border-border">
      <div className="flex justify-between items-center">
        <SkeletonText width="150px" height="1.25rem" />
        <SkeletonText width="100px" height="2rem" className="rounded" />
      </div>
    </div>

    {/* Table content */}
    <table className="w-full">
      <thead className="bg-muted/30">
        <tr>
          {Array.from({ length: columns }, (_, i) => (
            <th key={i} className="p-3 text-left">
              <SkeletonText width="80%" height="1rem" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, i) => (
          <EquipmentRowPlaceholder key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Class description placeholder
 */
export const ClassDescriptionPlaceholder: React.FC<{
  className?: string;
  compact?: boolean;
}> = ({ className, compact = false }) => (
  <div className={cn("space-y-6 p-4", className)}>
    {/* Header */}
    <div className="space-y-3">
      <SkeletonText width="40%" height="2rem" />
      <SkeletonText width="70%" height="1.25rem" />
    </div>

    {/* Requirements */}
    <div className="space-y-2">
      <SkeletonText width="30%" height="1.125rem" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-1">
            <SkeletonText width="60%" height="0.875rem" />
            <SkeletonText width="40%" height="1rem" />
          </div>
        ))}
      </div>
    </div>

    {/* Description */}
    <div className="space-y-2">
      <SkeletonText width="100%" height="1rem" />
      <SkeletonText width="95%" height="1rem" />
      <SkeletonText width="85%" height="1rem" />
      {!compact && (
        <>
          <SkeletonText width="90%" height="1rem" />
          <SkeletonText width="75%" height="1rem" />
        </>
      )}
    </div>

    {/* Abilities */}
    {!compact && (
      <div className="space-y-3">
        <SkeletonText width="35%" height="1.125rem" />
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="space-y-2 p-3 border border-border rounded">
            <SkeletonText width="50%" height="1rem" />
            <SkeletonText width="100%" height="0.875rem" />
            <SkeletonText width="80%" height="0.875rem" />
          </div>
        ))}
      </div>
    )}
  </div>
);

/**
 * Rule section placeholder
 */
export const RuleSectionPlaceholder: React.FC<{
  className?: string;
  compact?: boolean;
}> = ({ className, compact = false }) => (
  <div className={cn("space-y-4 p-4", className)}>
    {/* Title */}
    <SkeletonText width="60%" height="1.75rem" />

    {/* Content paragraphs */}
    <div className="space-y-3">
      {Array.from({ length: compact ? 2 : 4 }, (_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonText width="100%" height="1rem" />
          <SkeletonText width="90%" height="1rem" />
          <SkeletonText width="75%" height="1rem" />
        </div>
      ))}
    </div>

    {/* Subsections */}
    {!compact && (
      <div className="space-y-4">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonText width="45%" height="1.25rem" />
            <SkeletonText width="100%" height="1rem" />
            <SkeletonText width="85%" height="1rem" />
          </div>
        ))}
      </div>
    )}
  </div>
);

/**
 * Search result placeholder
 */
export const SearchResultPlaceholder: React.FC<{
  className?: string;
  count?: number;
}> = ({ className, count = 5 }) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="p-4 border border-border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <SkeletonText width="20px" height="20px" className="rounded" />
          <SkeletonText width="60%" height="1.25rem" />
        </div>
        <SkeletonText width="100%" height="1rem" />
        <SkeletonText width="80%" height="1rem" />
        <div className="flex gap-2 mt-2">
          <SkeletonText width="60px" height="1.5rem" className="rounded-full" />
          <SkeletonText width="80px" height="1.5rem" className="rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Card grid placeholder
 */
export const CardGridPlaceholder: React.FC<{
  className?: string;
  count?: number;
  columns?: number;
}> = ({ className, count = 12, columns = 3 }) => (
  <div 
    className={cn(
      "grid gap-4",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )}
  >
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="p-4 border border-border rounded-lg space-y-3">
        <SkeletonText width="70%" height="1.25rem" />
        <SkeletonText width="100%" height="1rem" />
        <SkeletonText width="85%" height="1rem" />
        <div className="flex justify-between items-center mt-4">
          <SkeletonText width="60px" height="1.5rem" className="rounded-full" />
          <SkeletonText width="80px" height="2rem" className="rounded" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * List placeholder
 */
export const ListPlaceholder: React.FC<{
  className?: string;
  count?: number;
  showAvatar?: boolean;
}> = ({ className, count = 8, showAvatar = false }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 border border-border rounded">
        {showAvatar && (
          <SkeletonText width="40px" height="40px" className="rounded-full flex-shrink-0" />
        )}
        <div className="flex-1 space-y-1">
          <SkeletonText width="60%" height="1rem" />
          <SkeletonText width="40%" height="0.875rem" />
        </div>
        <SkeletonText width="60px" height="1.5rem" className="rounded" />
      </div>
    ))}
  </div>
);

/**
 * Generic content placeholder that adapts to content type
 */
export const ContentPlaceholder: React.FC<{
  type: 'monster' | 'spell' | 'equipment' | 'class' | 'rule' | 'search' | 'grid' | 'list';
  className?: string;
  compact?: boolean;
  count?: number;
  columns?: number;
}> = ({ type, className, compact = false, count, columns }) => {
  switch (type) {
    case 'monster':
      return <MonsterCardPlaceholder className={className} compact={compact} />;
    case 'spell':
      return <SpellCardPlaceholder className={className} compact={compact} />;
    case 'equipment':
      return <EquipmentTablePlaceholder className={className} rows={count} columns={columns} />;
    case 'class':
      return <ClassDescriptionPlaceholder className={className} compact={compact} />;
    case 'rule':
      return <RuleSectionPlaceholder className={className} compact={compact} />;
    case 'search':
      return <SearchResultPlaceholder className={className} count={count} />;
    case 'grid':
      return <CardGridPlaceholder className={className} count={count} columns={columns} />;
    case 'list':
      return <ListPlaceholder className={className} count={count} />;
    default:
      return <SkeletonBase className={cn("h-32 rounded", className)} />;
  }
};

export default ContentPlaceholder; 