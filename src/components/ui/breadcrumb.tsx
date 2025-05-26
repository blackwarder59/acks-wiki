'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** URL path for the breadcrumb link */
  href: string;
  /** Whether this is the current/active page */
  isActive?: boolean;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Breadcrumb component props
 */
export interface BreadcrumbProps {
  /** Array of breadcrumb items to display */
  items?: BreadcrumbItem[];
  /** Whether to show the home icon */
  showHome?: boolean;
  /** Custom separator component */
  separator?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
}

/**
 * Generate breadcrumb items from the current pathname
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Add home breadcrumb
  breadcrumbs.push({
    label: 'Home',
    href: '/',
    icon: Home
  });

  // Build breadcrumbs from path segments
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: isLast
    });
  });

  return breadcrumbs;
}

/**
 * Breadcrumb component for showing navigation hierarchy
 * 
 * Features:
 * - Automatic path-based breadcrumb generation
 * - Custom breadcrumb items support
 * - Responsive design with collapsing for mobile
 * - Accessibility with proper ARIA labels
 * - Keyboard navigation support
 * - Customizable separators and icons
 */
export function Breadcrumb({
  items,
  showHome = true,
  separator,
  className = '',
  maxItems = 5
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);
  
  // Filter out home if showHome is false
  const filteredItems = showHome 
    ? breadcrumbItems 
    : breadcrumbItems.filter(item => item.href !== '/');

  // Handle collapsing for long breadcrumb chains
  const shouldCollapse = filteredItems.length > maxItems;
  const displayItems: (BreadcrumbItem | { label: string; href: string; isCollapsed: boolean })[] = shouldCollapse
    ? [
        ...filteredItems.slice(0, 2),
        { label: '...', href: '#', isCollapsed: true },
        ...filteredItems.slice(-2)
      ]
    : filteredItems;

  // Default separator
  const defaultSeparator = (
    <ChevronRight 
      className="h-4 w-4 text-muted-foreground" 
      aria-hidden="true"
    />
  );

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className={`flex items-center space-x-1 text-sm ${className}`}
    >
      <ol className="flex items-center space-x-1" role="list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const Icon = 'icon' in item ? item.icon : undefined;
          
          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {/* Separator (except for first item) */}
              {index > 0 && (
                <span className="mx-2" aria-hidden="true">
                  {separator || defaultSeparator}
                </span>
              )}
              
              {/* Breadcrumb item */}
              {'isCollapsed' in item && item.isCollapsed ? (
                <span 
                  className="text-muted-foreground px-2 py-1"
                  aria-label="More breadcrumb items"
                >
                  {item.label}
                </span>
              ) : isLast || ('isActive' in item && item.isActive) ? (
                <span 
                  className="flex items-center text-foreground font-medium px-2 py-1 rounded-md"
                  aria-current="page"
                >
                  {Icon && (
                    <Icon className="h-4 w-4 mr-1.5" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="
                    flex items-center text-muted-foreground hover:text-foreground
                    px-2 py-1 rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    hover:bg-muted/50
                  "
                  aria-label={`Navigate to ${item.label}`}
                >
                  {Icon && (
                    <Icon className="h-4 w-4 mr-1.5" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Compact breadcrumb variant for mobile/small spaces
 */
export function CompactBreadcrumb({
  items,
  className = ''
}: Pick<BreadcrumbProps, 'items' | 'className'>) {
  const pathname = usePathname();
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);
  
  // Show only the last two items for compact view
  const compactItems = breadcrumbItems.slice(-2);
  
  if (compactItems.length === 0) return null;
  
  return (
    <nav 
      aria-label="Compact breadcrumb navigation"
      className={`flex items-center text-sm ${className}`}
    >
      {compactItems.length > 1 && (
        <>
          <Link
            href={compactItems[0].href}
            className="
              text-muted-foreground hover:text-foreground
              transition-colors duration-200 truncate max-w-[120px]
            "
          >
            {compactItems[0].label}
          </Link>
          <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground" />
        </>
      )}
      <span className="text-foreground font-medium truncate">
        {compactItems[compactItems.length - 1].label}
      </span>
    </nav>
  );
}

/**
 * Breadcrumb with content type context
 */
export interface ContentBreadcrumbProps {
  /** Content type (monsters, spells, etc.) */
  contentType: string;
  /** Content category (Rulebook, Monstrous Manual, etc.) */
  category?: string;
  /** Specific content item name */
  itemName?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ContentBreadcrumb({
  contentType,
  category,
  itemName,
  className = ''
}: ContentBreadcrumbProps) {
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: Home
    }
  ];

  // Add category if provided
  if (category) {
    breadcrumbItems.push({
      label: category,
      href: `/${category.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  // Add content type
  breadcrumbItems.push({
    label: contentType.charAt(0).toUpperCase() + contentType.slice(1),
    href: `/${contentType}`
  });

  // Add specific item if provided
  if (itemName) {
    breadcrumbItems.push({
      label: itemName,
      href: `/${contentType}/${itemName.toLowerCase().replace(/\s+/g, '-')}`,
      isActive: true
    });
  }

  return (
    <Breadcrumb 
      items={breadcrumbItems}
      className={className}
    />
  );
}

export default Breadcrumb; 