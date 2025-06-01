'use client';

/**
 * Content Preview Components for ACKS II Wiki
 * 
 * Provides condensed preview versions of different content types
 * for display in tooltips and quick previews.
 * 
 * Features:
 * - Optimized for small display areas
 * - Essential information only
 * - Consistent styling across content types
 * - Loading and error states
 * - Accessibility support
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React from 'react';
import { 
  Sword, 
  Shield, 
  Sparkles, 
  User, 
  Package, 
  BookOpen,
  Target,
  FileText,
  ExternalLink,
  Loader2,
  AlertCircle,
  Image
} from 'lucide-react';
import { 
  type Monster, 
  type Spell, 
  type CharacterClass, 
  type Equipment, 
  type Rule,
  type Proficiency,
  ContentType,
  type AnyContent,
  ContentCategory
} from '../../lib/types/content';

/**
 * Preview component props
 */
export interface ContentPreviewProps {
  /** Content to preview */
  content: AnyContent;
  /** Whether content is loading */
  isLoading?: boolean;
  /** Error message if loading failed */
  error?: string;
  /** Compact mode for smaller tooltips */
  compact?: boolean;
}

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
 * Loading preview component
 */
function LoadingPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? 'p-2' : 'p-3'}`}>
      <Loader2 size={16} className="animate-spin text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Loading preview...</span>
    </div>
  );
}

/**
 * Error preview component
 */
function ErrorPreview({ error, compact = false }: { error: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-destructive ${compact ? 'p-2' : 'p-3'}`}>
      <AlertCircle size={16} />
      <span className="text-sm">{error}</span>
    </div>
  );
}

/**
 * Monster preview component
 */
function MonsterPreview({ monster, compact = false }: { monster: Monster; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[ContentType.MONSTER];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-red-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {monster.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {monster.primaryCharacteristics.size} {monster.primaryCharacteristics.type}, {monster.encounterSetup.alignment}
          </p>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">AC:</span>
          <span className="ml-1 font-medium">{monster.primaryCharacteristics.armorClass}</span>
        </div>
        <div>
          <span className="text-muted-foreground">HD:</span>
          <span className="ml-1 font-medium">{monster.primaryCharacteristics.hitDice}</span>
        </div>
        <div>
          <span className="text-muted-foreground">MV:</span>
          <span className="ml-1 font-medium">{monster.primaryCharacteristics.speedLand || 'N/A'}</span>
        </div>
        <div>
          <span className="text-muted-foreground">XP:</span>
          <span className="ml-1 font-medium">{monster.encounterSetup.xp}</span>
        </div>
      </div>

      {/* Description snippet */}
      {!compact && monster.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {monster.description}
        </p>
      )}
    </div>
  );
}

/**
 * Spell preview component
 */
function SpellPreview({ spell, compact = false }: { spell: Spell; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[ContentType.SPELL];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-blue-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {spell.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            Level {spell.level} {spell.school}
          </p>
        </div>
      </div>

      {/* Key details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Range:</span>
          <span className="ml-1 font-medium">{spell.range}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Duration:</span>
          <span className="ml-1 font-medium">{spell.duration}</span>
        </div>
      </div>

      {/* Description snippet */}
      {!compact && spell.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {spell.description}
        </p>
      )}
    </div>
  );
}

/**
 * Class preview component
 */
function ClassPreview({ characterClass, compact = false }: { characterClass: CharacterClass; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[ContentType.CLASS];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-green-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {characterClass.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {characterClass.title} Class
          </p>
        </div>
      </div>

      {/* Key details */}
      <div className="text-xs space-y-1">
        {characterClass.requirements && (
          <div>
            <span className="text-muted-foreground">Requirements:</span>
            <span className="ml-1 font-medium">{characterClass.requirements}</span>
          </div>
        )}
        {characterClass.hitDice && (
          <div>
            <span className="text-muted-foreground">Hit Dice:</span>
            <span className="ml-1 font-medium">{characterClass.hitDice}</span>
          </div>
        )}
      </div>

      {/* Description snippet */}
      {!compact && characterClass.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {characterClass.description}
        </p>
      )}
    </div>
  );
}

/**
 * Equipment preview component
 */
function EquipmentPreview({ equipment, compact = false }: { equipment: Equipment; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[ContentType.EQUIPMENT];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-orange-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {equipment.title}
          </h3>
          <p className="text-xs text-muted-foreground capitalize">
            {equipment.equipmentCategory.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Cost:</span>
          <span className="ml-1 font-medium">{equipment.cost} gp</span>
        </div>
        <div>
          <span className="text-muted-foreground">Weight:</span>
          <span className="ml-1 font-medium">{equipment.weight} st</span>
        </div>
        {equipment.damage && (
          <div>
            <span className="text-muted-foreground">Damage:</span>
            <span className="ml-1 font-medium">{equipment.damage}</span>
          </div>
        )}
        {equipment.armorClass && (
          <div>
            <span className="text-muted-foreground">AC:</span>
            <span className="ml-1 font-medium">{equipment.armorClass}</span>
          </div>
        )}
      </div>

      {/* Description snippet */}
      {!compact && equipment.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {equipment.description}
        </p>
      )}
    </div>
  );
}

/**
 * Rule preview component
 */
function RulePreview({ rule, compact = false }: { rule: Rule; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[rule.contentType as ContentType];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-purple-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {rule.title}
          </h3>
          <p className="text-xs text-muted-foreground capitalize">
            {rule.contentType.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Rule text snippet */}
      {rule.ruleText && (
        <p className="text-xs text-muted-foreground line-clamp-3">
          {rule.ruleText}
        </p>
      )}
    </div>
  );
}

/**
 * Proficiency preview component
 */
function ProficiencyPreview({ proficiency, compact = false }: { proficiency: Proficiency; compact?: boolean }) {
  const Icon = CONTENT_TYPE_ICONS[ContentType.PROFICIENCY];
  
  return (
    <div className={`space-y-2 ${compact ? 'p-2' : 'p-3'}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-teal-500 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {proficiency.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {proficiency.category} Proficiency
          </p>
        </div>
      </div>

      {/* Description snippet */}
      {proficiency.description && (
        <p className="text-xs text-muted-foreground line-clamp-3">
          {proficiency.description}
        </p>
      )}
    </div>
  );
}

/**
 * Main content preview component
 */
export function ContentPreview({ 
  content, 
  isLoading = false, 
  error, 
  compact = false 
}: ContentPreviewProps) {
  if (isLoading) {
    return <LoadingPreview compact={compact} />;
  }
  if (error) {
    return <ErrorPreview error={error} compact={compact} />;
  }

  switch (content.contentType) {
    case ContentType.MONSTER:
      return <MonsterPreview monster={content as Monster} compact={compact} />;
    case ContentType.SPELL:
      return <SpellPreview spell={content as Spell} compact={compact} />;
    case ContentType.CLASS:
      return <ClassPreview characterClass={content as CharacterClass} compact={compact} />;
    case ContentType.EQUIPMENT:
      return <EquipmentPreview equipment={content as Equipment} compact={compact} />;
    case ContentType.RULE:
    case ContentType.DOMAIN_RULE:
    case ContentType.JUDGE_TOOL:
      return <RulePreview rule={content as Rule} compact={compact} />;
    case ContentType.PROFICIENCY:
      return <ProficiencyPreview proficiency={content as Proficiency} compact={compact} />;
    default:
      return (
        <div className={`${compact ? 'p-2' : 'p-3'}`}>
          <p className="text-xs text-muted-foreground">
            Preview not available for this content type
          </p>
        </div>
      );
  }
}

/**
 * Async content preview component with loading states
 */
export function AsyncContentPreview({ 
  contentId, 
  contentType, 
  compact = false,
  onContentLoad
}: {
  contentId: string;
  contentType: ContentType;
  compact?: boolean;
  onContentLoad?: (content: AnyContent) => void;
}) {
  const [content, setContent] = React.useState<AnyContent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;

    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 300));
        if (isCancelled) return;
        const mockContentData: AnyContent = {
          id: contentId,
          title: `Sample ${contentType}`,
          description: 'This is a sample description for preview purposes.',
          contentType,
          category: ContentCategory.RULEBOOK,
          sourceFile: 'mock.md',
        } as AnyContent;

        setContent(mockContentData);
        onContentLoad?.(mockContentData);
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load content');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isCancelled = true;
    };
  }, [contentId, contentType, onContentLoad]);

  return <ContentPreview content={content || {} as AnyContent} isLoading={isLoading} error={error || undefined} compact={compact} />;
}

export default ContentPreview; 