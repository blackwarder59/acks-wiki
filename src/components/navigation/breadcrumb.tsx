/**
 * Breadcrumb Navigation Component for ACKS II Wiki
 * 
 * Provides hierarchical navigation showing the current location
 * within the rulebook structure (Home > Rulebook > Chapter X > Section)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Interface for a single breadcrumb item
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

/**
 * Props for the Breadcrumb component
 */
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Navigation Component
 * 
 * @param items - Array of breadcrumb items to display
 * @param className - Additional CSS classes to apply
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
    >
      {/* Home icon as first item */}
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {/* Separator */}
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
          
          {/* Breadcrumb item */}
          {item.href && !item.active ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`${item.active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

/**
 * Utility function to generate breadcrumb items for chapter pages
 * 
 * @param chapterNumber - The chapter number
 * @param chapterTitle - The chapter title
 * @param sectionTitle - Optional section title for deeper navigation
 * @returns Array of breadcrumb items
 */
export const generateChapterBreadcrumbs = (
  chapterNumber: number | string,
  chapterTitle: string,
  sectionTitle?: string
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    {
      label: 'Rulebook',
      href: '/rules'
    },
    {
      label: `Chapter ${chapterNumber}: ${chapterTitle}`,
      href: `/rules/chapter-${chapterNumber}`,
      active: !sectionTitle
    }
  ];

  // Add section if provided
  if (sectionTitle) {
    items[items.length - 1].active = false; // Chapter is no longer active
    items.push({
      label: sectionTitle,
      active: true
    });
  }

  return items;
};

/**
 * Utility function to generate breadcrumb items for appendix pages
 * 
 * @param appendixLetter - The appendix letter (A, B, C)
 * @param appendixTitle - The appendix title
 * @param sectionTitle - Optional section title for deeper navigation
 * @returns Array of breadcrumb items
 */
export const generateAppendixBreadcrumbs = (
  appendixLetter: string,
  appendixTitle: string,
  sectionTitle?: string
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    {
      label: 'Rulebook',
      href: '/rules'
    },
    {
      label: `Appendix ${appendixLetter}: ${appendixTitle}`,
      href: `/rules/appendix-${appendixLetter.toLowerCase()}`,
      active: !sectionTitle
    }
  ];

  // Add section if provided
  if (sectionTitle) {
    items[items.length - 1].active = false; // Appendix is no longer active
    items.push({
      label: sectionTitle,
      active: true
    });
  }

  return items;
};

/**
 * Utility function to generate breadcrumb items for other wiki sections
 * 
 * @param sections - Array of section names and links
 * @returns Array of breadcrumb items
 */
export const generateWikiBreadcrumbs = (
  sections: Array<{ label: string; href?: string; active?: boolean }>
): BreadcrumbItem[] => {
  return sections.map(section => ({
    label: section.label,
    href: section.href,
    active: section.active
  }));
};

export default Breadcrumb; 