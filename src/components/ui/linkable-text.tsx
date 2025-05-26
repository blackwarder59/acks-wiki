'use client';

/**
 * Linkable Text Component for ACKS II Wiki
 * 
 * This component automatically processes text content to identify and convert
 * cross-references into clickable links. It supports various reference types
 * and provides customizable styling and behavior.
 * 
 * Features:
 * - Automatic reference detection and linking
 * - Customizable link styling and behavior
 * - Search query highlighting
 * - Reference type indicators
 * - Tooltip integration ready
 * - Performance optimized for large text blocks
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  FileText, 
  Sword, 
  Sparkles, 
  User, 
  Package, 
  BookOpen,
  Target
} from 'lucide-react';
import { ContentType, ReferenceType } from '../../lib/types/content';
import { type ParsedReference } from '../../lib/cross-references/reference-parser';
import { TooltipTrigger } from './tooltip-trigger';

/**
 * Text segment types
 */
type TextSegment = {
  type: 'text' | 'reference' | 'highlight';
  content: string;
  reference?: ParsedReference;
  position: {
    start: number;
    end: number;
  };
};

/**
 * Link styling configuration
 */
export interface LinkStyle {
  /** Base CSS classes for all links */
  baseClasses: string;
  /** CSS classes by content type */
  contentTypeClasses: Record<ContentType, string>;
  /** CSS classes by reference type */
  referenceTypeClasses: Record<ReferenceType, string>;
  /** Whether to show icons for different content types */
  showIcons: boolean;
  /** Whether to show reference type indicators */
  showReferenceTypes: boolean;
}

/**
 * LinkableText component props
 */
export interface LinkableTextProps {
  /** Text content to process */
  children: string;
  /** Parsed references for this text */
  references?: ParsedReference[];
  /** Search query to highlight */
  searchQuery?: string;
  /** Custom link styling */
  linkStyle?: Partial<LinkStyle>;
  /** Custom link click handler */
  onLinkClick?: (reference: ParsedReference, event: React.MouseEvent) => void;
  /** Whether to enable reference processing */
  enableReferences?: boolean;
  /** Whether to enable search highlighting */
  enableHighlighting?: boolean;
  /** Whether to enable tooltips on references */
  enableTooltips?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of references to process (performance) */
  maxReferences?: number;
  /** Custom URL generator for references */
  generateUrl?: (reference: ParsedReference) => string;
}

/**
 * Default link styling
 */
const DEFAULT_LINK_STYLE: LinkStyle = {
  baseClasses: 'text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2 transition-colors',
  contentTypeClasses: {
    [ContentType.MONSTER]: 'text-red-600 hover:text-red-500',
    [ContentType.SPELL]: 'text-blue-600 hover:text-blue-500',
    [ContentType.CLASS]: 'text-green-600 hover:text-green-500',
    [ContentType.EQUIPMENT]: 'text-orange-600 hover:text-orange-500',
    [ContentType.RULE]: 'text-purple-600 hover:text-purple-500',
    [ContentType.PROFICIENCY]: 'text-teal-600 hover:text-teal-500',
    [ContentType.DOMAIN_RULE]: 'text-indigo-600 hover:text-indigo-500',
    [ContentType.JUDGE_TOOL]: 'text-gray-600 hover:text-gray-500'
  },
  referenceTypeClasses: {
    [ReferenceType.MENTIONS]: '',
    [ReferenceType.REQUIRES]: 'font-medium',
    [ReferenceType.RELATED]: 'italic',
    [ReferenceType.VARIANT]: 'font-light',
    [ReferenceType.PREREQUISITE]: 'font-bold'
  },
  showIcons: true,
  showReferenceTypes: false
};

/**
 * Content type icons
 */
const CONTENT_TYPE_ICONS = {
  [ContentType.MONSTER]: Sword,
  [ContentType.SPELL]: Sparkles,
  [ContentType.CLASS]: User,
  [ContentType.EQUIPMENT]: Package,
  [ContentType.RULE]: BookOpen,
  [ContentType.PROFICIENCY]: Target,
  [ContentType.DOMAIN_RULE]: FileText,
  [ContentType.JUDGE_TOOL]: ExternalLink
};

/**
 * Generate URL for a reference
 */
function defaultGenerateUrl(reference: ParsedReference): string {
  const contentType = reference.contentType;
  const normalizedText = reference.normalizedText.toLowerCase().replace(/\s+/g, '-');
  
  switch (contentType) {
    case ContentType.MONSTER:
      return `/monsters/${normalizedText}`;
    case ContentType.SPELL:
      return `/spells/${normalizedText}`;
    case ContentType.CLASS:
      return `/classes/${normalizedText}`;
    case ContentType.EQUIPMENT:
      return `/equipment/${normalizedText}`;
    case ContentType.RULE:
      return `/rules/${normalizedText}`;
    case ContentType.PROFICIENCY:
      return `/proficiencies/${normalizedText}`;
    case ContentType.DOMAIN_RULE:
      return `/domain-rules/${normalizedText}`;
    case ContentType.JUDGE_TOOL:
      return `/judge-tools/${normalizedText}`;
    default:
      return `#${normalizedText}`;
  }
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Segment text into processable parts
 */
function segmentText(
  text: string, 
  references: ParsedReference[], 
  searchQuery?: string
): TextSegment[] {
  const segments: TextSegment[] = [];
  let currentPosition = 0;

  // Sort references by position
  const sortedReferences = [...references].sort((a, b) => a.position.start - b.position.start);

  // Process references
  for (const reference of sortedReferences) {
    const { start, end } = reference.position;

    // Add text before reference
    if (currentPosition < start) {
      const textContent = text.substring(currentPosition, start);
      if (textContent) {
        segments.push({
          type: 'text',
          content: textContent,
          position: { start: currentPosition, end: start }
        });
      }
    }

    // Add reference segment
    segments.push({
      type: 'reference',
      content: text.substring(start, end),
      reference,
      position: { start, end }
    });

    currentPosition = end;
  }

  // Add remaining text
  if (currentPosition < text.length) {
    const textContent = text.substring(currentPosition);
    if (textContent) {
      segments.push({
        type: 'text',
        content: textContent,
        position: { start: currentPosition, end: text.length }
      });
    }
  }

  // Apply search highlighting to text segments
  if (searchQuery && searchQuery.length > 1) {
    const highlightedSegments: TextSegment[] = [];
    
    for (const segment of segments) {
      if (segment.type === 'text') {
        const highlighted = highlightSearchQuery(segment.content, searchQuery, segment.position.start);
        highlightedSegments.push(...highlighted);
      } else {
        highlightedSegments.push(segment);
      }
    }
    
    return highlightedSegments;
  }

  return segments;
}

/**
 * Highlight search query in text
 */
function highlightSearchQuery(
  text: string, 
  query: string, 
  basePosition: number
): TextSegment[] {
  const segments: TextSegment[] = [];
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    // Add text before match
    if (lastIndex < matchStart) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, matchStart),
        position: {
          start: basePosition + lastIndex,
          end: basePosition + matchStart
        }
      });
    }

    // Add highlighted match
    segments.push({
      type: 'highlight',
      content: match[0],
      position: {
        start: basePosition + matchStart,
        end: basePosition + matchEnd
      }
    });

    lastIndex = matchEnd;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex),
      position: {
        start: basePosition + lastIndex,
        end: basePosition + text.length
      }
    });
  }

  return segments.length > 0 ? segments : [{
    type: 'text',
    content: text,
    position: { start: basePosition, end: basePosition + text.length }
  }];
}

/**
 * Render a reference link
 */
function ReferenceLink({
  reference,
  content,
  linkStyle,
  generateUrl,
  onLinkClick,
  enableTooltips = true
}: {
  reference: ParsedReference;
  content: string;
  linkStyle: LinkStyle;
  generateUrl: (ref: ParsedReference) => string;
  onLinkClick?: (reference: ParsedReference, event: React.MouseEvent) => void;
  enableTooltips?: boolean;
}) {
  const url = generateUrl(reference);
  const Icon = linkStyle.showIcons ? CONTENT_TYPE_ICONS[reference.contentType] : null;

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (onLinkClick) {
      event.preventDefault();
      onLinkClick(reference, event);
    }
  }, [reference, onLinkClick]);

  const linkClasses = [
    linkStyle.baseClasses,
    linkStyle.contentTypeClasses[reference.contentType],
    linkStyle.referenceTypeClasses[reference.referenceType]
  ].filter(Boolean).join(' ');

  const linkElement = (
    <Link
      href={url}
      onClick={handleClick}
      className={linkClasses}
      title={`${reference.contentType}: ${reference.normalizedText} (${reference.referenceType})`}
    >
      {Icon && (
        <Icon 
          size={12} 
          className="inline mr-1 -mt-0.5" 
          aria-hidden="true" 
        />
      )}
      {content}
      {linkStyle.showReferenceTypes && (
        <span className="text-xs opacity-60 ml-1">
          ({reference.referenceType})
        </span>
      )}
    </Link>
  );

  // Wrap with tooltip if enabled
  if (enableTooltips) {
    return (
      <TooltipTrigger
        reference={reference}
        config={{
          position: 'auto',
          showDelay: 300,
          hideDelay: 150,
          interactive: false,
          maxWidth: 350
        }}
      >
        {linkElement}
      </TooltipTrigger>
    );
  }

  return linkElement;
}

/**
 * LinkableText Component
 */
export function LinkableText({
  children,
  references = [],
  searchQuery,
  linkStyle = {},
  onLinkClick,
  enableReferences = true,
  enableHighlighting = true,
  enableTooltips = true,
  className = '',
  maxReferences = 100,
  generateUrl = defaultGenerateUrl
}: LinkableTextProps) {
  const mergedLinkStyle = useMemo(() => ({
    ...DEFAULT_LINK_STYLE,
    ...linkStyle,
    contentTypeClasses: {
      ...DEFAULT_LINK_STYLE.contentTypeClasses,
      ...linkStyle.contentTypeClasses
    },
    referenceTypeClasses: {
      ...DEFAULT_LINK_STYLE.referenceTypeClasses,
      ...linkStyle.referenceTypeClasses
    }
  }), [linkStyle]);

  const processedSegments = useMemo(() => {
    if (!enableReferences && !enableHighlighting) {
      return [{
        type: 'text' as const,
        content: children,
        position: { start: 0, end: children.length }
      }];
    }

    const activeReferences = enableReferences 
      ? references.slice(0, maxReferences)
      : [];
    
    const activeSearchQuery = enableHighlighting ? searchQuery : undefined;

    return segmentText(children, activeReferences, activeSearchQuery);
  }, [children, references, searchQuery, enableReferences, enableHighlighting, maxReferences]);

  return (
    <span className={className}>
      {processedSegments.map((segment, index) => {
        switch (segment.type) {
          case 'reference':
            return segment.reference ? (
              <ReferenceLink
                key={`ref-${index}`}
                reference={segment.reference}
                content={segment.content}
                linkStyle={mergedLinkStyle}
                generateUrl={generateUrl}
                onLinkClick={onLinkClick}
                enableTooltips={enableTooltips}
              />
            ) : (
              <span key={`ref-${index}`}>{segment.content}</span>
            );
          
          case 'highlight':
            return (
              <mark 
                key={`highlight-${index}`}
                className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded"
              >
                {segment.content}
              </mark>
            );
          
          case 'text':
          default:
            return (
              <span key={`text-${index}`}>
                {segment.content}
              </span>
            );
        }
      })}
    </span>
  );
}

export default LinkableText; 