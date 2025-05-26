'use client';

/**
 * Rule Section Component for ACKS II Wiki
 * 
 * Displays rule content with proper formatting, cross-references,
 * and responsive design optimized for readability.
 * 
 * Features:
 * - Formatted rule text with proper typography
 * - Cross-reference links to related content
 * - Examples and clarifications
 * - Collapsible sections for complex rules
 * - Search highlighting
 * - Loading and error states
 * - Copy-to-clipboard functionality
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import { 
  BookOpen, 
  Link as LinkIcon, 
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { BaseContentCard } from './base-content-card';
import { 
  type Rule, 
  type RuleCategory,
  type CrossReference,
  type ReferenceType
} from '../../lib/types/content';

/**
 * Rule section component props
 */
export interface RuleSectionProps {
  /** Rule data to display */
  rule?: Rule;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Card variant */
  variant?: 'default' | 'compact' | 'detailed';
  /** Additional CSS classes */
  className?: string;
  /** Whether to show all sections expanded by default */
  expandedByDefault?: boolean;
  /** Search query for highlighting */
  searchQuery?: string;
  /** Callback when rule is clicked */
  onClick?: () => void;
  /** Callback when cross-reference is clicked */
  onCrossReferenceClick?: (reference: CrossReference) => void;
}

/**
 * Text highlighting component for search results
 */
function HighlightedText({ 
  text, 
  searchQuery 
}: { 
  text: string; 
  searchQuery?: string; 
}) {
  if (!searchQuery || searchQuery.length < 2) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

/**
 * Cross-reference display component
 */
function CrossReferenceList({ 
  crossReferences, 
  onCrossReferenceClick 
}: { 
  crossReferences: CrossReference[];
  onCrossReferenceClick?: (reference: CrossReference) => void;
}) {
  const getReferenceTypeIcon = (type: ReferenceType) => {
    switch (type) {
      case ReferenceType.REQUIRES:
        return <AlertCircle size={14} className="text-red-500" />;
      case ReferenceType.RELATED:
        return <LinkIcon size={14} className="text-blue-500" />;
      case ReferenceType.MENTIONS:
        return <Info size={14} className="text-muted-foreground" />;
      default:
        return <ExternalLink size={14} className="text-muted-foreground" />;
    }
  };

  const getReferenceTypeColor = (type: ReferenceType) => {
    switch (type) {
      case ReferenceType.REQUIRES:
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case ReferenceType.RELATED:
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case ReferenceType.MENTIONS:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-muted/80';
    }
  };

  if (crossReferences.length === 0) return null;

  return (
    <div className="space-y-2">
      <h5 className="font-medium text-foreground">Cross References</h5>
      <div className="space-y-1">
        {crossReferences.map((reference, index) => (
          <button
            key={index}
            onClick={() => onCrossReferenceClick?.(reference)}
            className={`
              w-full text-left p-2 rounded border text-sm transition-colors
              ${getReferenceTypeColor(reference.referenceType)}
            `}
          >
            <div className="flex items-start gap-2">
              {getReferenceTypeIcon(reference.referenceType)}
              <div className="flex-1 min-w-0">
                <div className="font-medium capitalize">
                  {reference.referenceType.replace('_', ' ')} - {reference.targetId}
                </div>
                {reference.context && (
                  <div className="text-xs opacity-75 mt-1">
                    {reference.context}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Rule examples display component
 */
function RuleExamples({ 
  examples, 
  searchQuery 
}: { 
  examples: string[];
  searchQuery?: string;
}) {
  if (examples.length === 0) return null;

  return (
    <div className="space-y-3">
      <h5 className="font-medium text-foreground flex items-center gap-2">
        <Lightbulb size={16} className="text-yellow-500" />
        Examples
      </h5>
      <div className="space-y-3">
        {examples.map((example, index) => (
          <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <HighlightedText text={example} searchQuery={searchQuery} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Related rules display component
 */
function RelatedRules({ 
  relatedRules 
}: { 
  relatedRules: string[];
}) {
  if (relatedRules.length === 0) return null;

  return (
    <div className="space-y-2">
      <h5 className="font-medium text-foreground">Related Rules</h5>
      <div className="flex flex-wrap gap-1">
        {relatedRules.map((rule, index) => (
          <span key={index} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
            {rule}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Collapsible section component
 */
function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  icon: Icon
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-muted-foreground" />}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Rule category badge component
 */
function RuleCategoryBadge({ category }: { category: RuleCategory }) {
  const getCategoryColor = (cat: RuleCategory) => {
    switch (cat) {
      case RuleCategory.COMBAT:
        return 'bg-red-100 text-red-800 border-red-200';
      case RuleCategory.MAGIC:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case RuleCategory.EXPLORATION:
        return 'bg-green-100 text-green-800 border-green-200';
      case RuleCategory.DOMAIN:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case RuleCategory.CAMPAIGN:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <span className={`
      inline-flex items-center px-2 py-1 text-xs font-medium rounded border capitalize
      ${getCategoryColor(category)}
    `}>
      {category.replace('_', ' ')}
    </span>
  );
}

/**
 * Rule section skeleton for loading state
 */
function RuleSectionSkeleton() {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-6 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-1/4`} />
      </div>
      
      {/* Rule text */}
      <div className="space-y-3">
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-2/3`} />
      </div>
      
      {/* Examples */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-5 w-1/4`} />
        <div className={`${skeletonClasses} h-16 w-full`} />
      </div>
      
      {/* Cross references */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-5 w-1/3`} />
        <div className={`${skeletonClasses} h-8 w-full`} />
        <div className={`${skeletonClasses} h-8 w-full`} />
      </div>
    </div>
  );
}

/**
 * Rule Section Component
 */
export function RuleSection({
  rule,
  isLoading = false,
  error,
  variant = 'default',
  className = '',
  expandedByDefault = false,
  searchQuery,
  onClick,
  onCrossReferenceClick
}: RuleSectionProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  /**
   * Copy rule text to clipboard
   */
  const copyRuleText = useCallback(async () => {
    if (!rule) return;

    const ruleText = `${rule.title}
Category: ${rule.ruleCategory}

${rule.ruleText}

${rule.examples && rule.examples.length > 0 ? `
Examples:
${rule.examples.map(ex => `- ${ex}`).join('\n')}
` : ''}

${rule.relatedRules && rule.relatedRules.length > 0 ? `
Related Rules: ${rule.relatedRules.join(', ')}
` : ''}`;

    try {
      await navigator.clipboard.writeText(ruleText);
      setCopiedSection('rule');
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy rule text:', error);
    }
  }, [rule]);

  // Format rule text with proper line breaks and emphasis
  const formattedRuleText = useMemo(() => {
    if (!rule?.ruleText) return '';
    
    // Split into paragraphs and format
    return rule.ruleText
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
  }, [rule?.ruleText]);

  if (isLoading) {
    return (
      <BaseContentCard
        isLoading={true}
        variant={variant}
        className={className}
      >
        <RuleSectionSkeleton />
      </BaseContentCard>
    );
  }

  if (error) {
    return (
      <BaseContentCard
        error={error}
        variant={variant}
        className={className}
      >
        {/* Error content handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  if (!rule) {
    return (
      <BaseContentCard
        error="No rule data provided"
        variant={variant}
        className={className}
      >
        {/* Error content handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  return (
    <BaseContentCard
      content={rule}
      variant={variant}
      showCopyButton={false}
      className={className}
      interactive={!!onClick}
      onClick={onClick}
      headerContent={
        <div className="flex items-center gap-2">
          <RuleCategoryBadge category={rule.ruleCategory} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyRuleText();
            }}
            className="
              inline-flex items-center gap-1 px-2 py-1 text-xs
              bg-muted hover:bg-muted/80 rounded transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            "
            title="Copy rule text"
          >
            {copiedSection === 'rule' ? (
              <>
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Rule</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Rule Text */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <BookOpen size={16} />
            Rule Text
          </h4>
          <div className="prose prose-sm max-w-none">
            {formattedRuleText.map((paragraph, index) => (
              <p key={index} className="text-sm text-muted-foreground leading-relaxed mb-3">
                <HighlightedText text={paragraph} searchQuery={searchQuery} />
              </p>
            ))}
          </div>
        </div>

        {/* Examples */}
        {rule.examples && rule.examples.length > 0 && (
          <CollapsibleSection
            title="Examples"
            defaultExpanded={expandedByDefault}
            icon={Lightbulb}
          >
            <div className="mt-3">
              <RuleExamples examples={rule.examples} searchQuery={searchQuery} />
            </div>
          </CollapsibleSection>
        )}

        {/* Related Rules */}
        {rule.relatedRules && rule.relatedRules.length > 0 && (
          <CollapsibleSection
            title="Related Rules"
            defaultExpanded={expandedByDefault}
            icon={LinkIcon}
          >
            <div className="mt-3">
              <RelatedRules relatedRules={rule.relatedRules} />
            </div>
          </CollapsibleSection>
        )}

        {/* Cross References */}
        {rule.crossReferences && rule.crossReferences.length > 0 && (
          <CollapsibleSection
            title="Cross References"
            defaultExpanded={expandedByDefault}
            icon={ExternalLink}
          >
            <div className="mt-3">
              <CrossReferenceList 
                crossReferences={rule.crossReferences}
                onCrossReferenceClick={onCrossReferenceClick}
              />
            </div>
          </CollapsibleSection>
        )}

        {/* Description (if different from rule text) */}
        {rule.description && rule.description !== rule.ruleText && (
          <div>
            <h4 className="font-semibold text-foreground mb-3">Additional Notes</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <HighlightedText text={rule.description} searchQuery={searchQuery} />
            </p>
          </div>
        )}
      </div>
    </BaseContentCard>
  );
}

/**
 * Compact rule section for lists
 */
export function CompactRuleSection({
  rule,
  isLoading,
  error,
  className = '',
  searchQuery,
  onClick,
  onCrossReferenceClick
}: Omit<RuleSectionProps, 'variant'>) {
  return (
    <RuleSection
      rule={rule}
      isLoading={isLoading}
      error={error}
      variant="compact"
      className={className}
      expandedByDefault={false}
      searchQuery={searchQuery}
      onClick={onClick}
      onCrossReferenceClick={onCrossReferenceClick}
    />
  );
}

export default RuleSection; 