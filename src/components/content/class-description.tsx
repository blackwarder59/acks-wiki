'use client';

/**
 * Class Description Component for ACKS II Wiki
 * 
 * Displays character class information including progression tables,
 * powers, proficiencies, and templates with responsive design.
 * 
 * Features:
 * - Level progression table with responsive design
 * - Combat progression display
 * - Class powers organized by level
 * - Proficiency information
 * - Character templates
 * - Collapsible sections for mobile optimization
 * - Loading and error states
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { 
  Crown, 
  Sword, 
  Shield, 
  Zap, 
  BookOpen, 
  Users, 
  Target,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  TrendingUp,
  Star
} from 'lucide-react';
import { BaseContentCard } from './base-content-card';
import { 
  type CharacterClass, 
  type LevelProgression, 
  type CombatProgression,
  type ClassPower,
  type ClassTemplate,
  PowerType
} from '../../lib/types/content';

/**
 * Class description component props
 */
export interface ClassDescriptionProps {
  /** Character class data to display */
  characterClass?: CharacterClass;
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
  /** Callback when class is clicked */
  onClick?: () => void;
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
 * Level progression table component
 */
function LevelProgressionTable({ 
  progression 
}: { 
  progression: LevelProgression[] 
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-2 font-medium text-foreground">Level</th>
            <th className="text-left p-2 font-medium text-foreground">XP</th>
            <th className="text-left p-2 font-medium text-foreground">Title</th>
            <th className="text-left p-2 font-medium text-foreground">HD</th>
            <th className="text-left p-2 font-medium text-foreground">Damage Bonus</th>
          </tr>
        </thead>
        <tbody>
          {progression.map((level) => (
            <tr key={level.level} className="border-b border-border hover:bg-muted/30">
              <td className="p-2 font-medium text-foreground">{level.level}</td>
              <td className="p-2 text-muted-foreground">{level.experience.toLocaleString()}</td>
              <td className="p-2 text-foreground">{level.title}</td>
              <td className="p-2 text-muted-foreground">{level.hitDice}</td>
              <td className="p-2 text-muted-foreground">{level.damageBonus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Combat progression table component
 */
function CombatProgressionTable({ 
  progression 
}: { 
  progression: CombatProgression[] 
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-2 font-medium text-foreground">Level</th>
            <th className="text-left p-2 font-medium text-foreground">Paralysis</th>
            <th className="text-left p-2 font-medium text-foreground">Death</th>
            <th className="text-left p-2 font-medium text-foreground">Blast</th>
            <th className="text-left p-2 font-medium text-foreground">Implements</th>
            <th className="text-left p-2 font-medium text-foreground">Spells</th>
            <th className="text-left p-2 font-medium text-foreground">Attack Throw</th>
          </tr>
        </thead>
        <tbody>
          {progression.map((combat, index) => (
            <tr key={index} className="border-b border-border hover:bg-muted/30">
              <td className="p-2 font-medium text-foreground">{combat.level}</td>
              <td className="p-2 text-muted-foreground">{combat.paralysis}</td>
              <td className="p-2 text-muted-foreground">{combat.death}</td>
              <td className="p-2 text-muted-foreground">{combat.blast}</td>
              <td className="p-2 text-muted-foreground">{combat.implements}</td>
              <td className="p-2 text-muted-foreground">{combat.spells}</td>
              <td className="p-2 text-muted-foreground">{combat.attackThrow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Class powers display component
 */
function ClassPowersDisplay({ 
  startingPowers, 
  additionalPowers 
}: { 
  startingPowers: ClassPower[];
  additionalPowers: ClassPower[];
}) {
  const allPowers = [...startingPowers, ...additionalPowers].sort((a, b) => a.level - b.level);
  
  const getPowerTypeIcon = (type: PowerType) => {
    switch (type) {
      case PowerType.ACTIVE:
        return <Zap size={14} className="text-blue-500" />;
      case PowerType.PASSIVE:
        return <Shield size={14} className="text-green-500" />;
      case PowerType.TRIGGERED:
        return <Target size={14} className="text-orange-500" />;
      default:
        return <Star size={14} className="text-muted-foreground" />;
    }
  };

  const getPowerTypeColor = (type: PowerType) => {
    switch (type) {
      case PowerType.ACTIVE:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case PowerType.PASSIVE:
        return 'bg-green-100 text-green-800 border-green-200';
      case PowerType.TRIGGERED:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-4">
      {allPowers.map((power, index) => (
        <div key={index} className="p-3 border border-border rounded-lg">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h5 className="font-medium text-foreground">{power.name}</h5>
              <p className="text-xs text-muted-foreground">Level {power.level}</p>
            </div>
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded text-xs border
              ${getPowerTypeColor(power.type)}
            `}>
              {getPowerTypeIcon(power.type)}
              {power.type}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{power.description}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Character templates display component
 */
function CharacterTemplatesDisplay({ 
  templates 
}: { 
  templates: ClassTemplate[] 
}) {
  return (
    <div className="space-y-4">
      {templates.map((template, index) => (
        <div key={index} className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium text-foreground">{template.name}</h5>
            <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
              {template.rollRange}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Proficiencies:</span>
              <span className="text-foreground ml-2">{template.proficiencies.join(', ')}</span>
            </div>
            
            <div>
              <span className="font-medium text-muted-foreground">Equipment:</span>
              <p className="text-foreground mt-1">{template.equipment}</p>
            </div>
            
            {template.encumbrance && (
              <div>
                <span className="font-medium text-muted-foreground">Encumbrance:</span>
                <span className="text-foreground ml-2">{template.encumbrance}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Class description skeleton for loading state
 */
function ClassDescriptionSkeleton() {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-6 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-1/2`} />
      </div>
      
      {/* Basic info */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-3 w-2/3`} />
          </div>
        ))}
      </div>
      
      {/* Tables */}
      <div className="space-y-4">
        <div className={`${skeletonClasses} h-32 w-full`} />
        <div className={`${skeletonClasses} h-24 w-full`} />
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-full`} />
        <div className={`${skeletonClasses} h-4 w-3/4`} />
      </div>
    </div>
  );
}

/**
 * Class Description Component
 */
export function ClassDescription({
  characterClass,
  isLoading = false,
  error,
  variant = 'default',
  className = '',
  expandedByDefault = false,
  onClick
}: ClassDescriptionProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  /**
   * Copy class summary to clipboard
   */
  const copyClassSummary = useCallback(async () => {
    if (!characterClass) return;

    const summary = `${characterClass.title}
Key Attribute: ${characterClass.keyAttribute}
Requirements: ${characterClass.requirements}
Hit Dice: ${characterClass.hitDice}
Maximum Level: ${characterClass.maximumLevel}

${characterClass.description}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedSection('summary');
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy class summary:', error);
    }
  }, [characterClass]);

  if (isLoading) {
    return (
      <BaseContentCard
        isLoading={true}
        variant={variant}
        className={className}
      >
        <ClassDescriptionSkeleton />
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

  if (!characterClass) {
    return (
      <BaseContentCard
        error="No character class data provided"
        variant={variant}
        className={className}
      >
        {/* Error content handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  return (
    <BaseContentCard
      content={characterClass}
      variant={variant}
      showCopyButton={false}
      className={className}
      interactive={!!onClick}
      onClick={onClick}
      headerContent={
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyClassSummary();
            }}
            className="
              inline-flex items-center gap-1 px-2 py-1 text-xs
              bg-muted hover:bg-muted/80 rounded transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            "
            title="Copy class summary"
          >
            {copiedSection === 'summary' ? (
              <>
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Key Attribute:</span>
            <span className="text-sm text-foreground">{characterClass.keyAttribute}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Requirements:</span>
            <span className="text-sm text-foreground">{characterClass.requirements}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Hit Dice:</span>
            <span className="text-sm text-foreground">{characterClass.hitDice}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Max Level:</span>
            <span className="text-sm text-foreground">{characterClass.maximumLevel}</span>
          </div>
        </div>

        {/* Combat Characteristics */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sword size={16} />
            Combat Characteristics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Weapons:</span>
              <p className="text-foreground mt-1">{characterClass.combatCharacteristics.weaponProficiencies}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Armor:</span>
              <p className="text-foreground mt-1">{characterClass.combatCharacteristics.armorProficiencies}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Fighting Styles:</span>
              <p className="text-foreground mt-1">{characterClass.combatCharacteristics.fightingStyles}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Progression:</span>
              <p className="text-foreground mt-1">{characterClass.combatCharacteristics.progressionNotes}</p>
            </div>
          </div>
        </div>

        {/* Level Progression Table */}
        <CollapsibleSection
          title="Level Progression"
          defaultExpanded={expandedByDefault}
          icon={TrendingUp}
        >
          <div className="mt-3">
            <LevelProgressionTable progression={characterClass.levelProgression} />
          </div>
        </CollapsibleSection>

        {/* Combat Progression Table */}
        <CollapsibleSection
          title="Combat Progression"
          defaultExpanded={expandedByDefault}
          icon={Sword}
        >
          <div className="mt-3">
            <CombatProgressionTable progression={characterClass.combatProgression} />
          </div>
        </CollapsibleSection>

        {/* Class Powers */}
        {(characterClass.startingPowers.length > 0 || characterClass.additionalPowers.length > 0) && (
          <CollapsibleSection
            title="Class Powers"
            defaultExpanded={expandedByDefault}
            icon={Zap}
          >
            <div className="mt-3">
              <ClassPowersDisplay 
                startingPowers={characterClass.startingPowers}
                additionalPowers={characterClass.additionalPowers}
              />
            </div>
          </CollapsibleSection>
        )}

        {/* Proficiency Progression */}
        <CollapsibleSection
          title="Proficiency Progression"
          defaultExpanded={expandedByDefault}
          icon={BookOpen}
        >
          <div className="mt-3 space-y-3 text-sm">
            <div>
              <span className="font-medium text-foreground">Starting:</span>
              <p className="text-muted-foreground mt-1">{characterClass.proficiencyProgression.starting}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Class Proficiencies:</span>
              <p className="text-muted-foreground mt-1">{characterClass.proficiencyProgression.classProficiencies}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">General Proficiencies:</span>
              <p className="text-muted-foreground mt-1">{characterClass.proficiencyProgression.generalProficiencies}</p>
            </div>
            
            {characterClass.classProficiencies.length > 0 && (
              <div>
                <span className="font-medium text-foreground">Available Class Proficiencies:</span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {characterClass.classProficiencies.map((prof, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {prof}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Character Templates */}
        {characterClass.templates.length > 0 && (
          <CollapsibleSection
            title="Character Templates"
            defaultExpanded={expandedByDefault}
            icon={Users}
          >
            <div className="mt-3">
              <CharacterTemplatesDisplay templates={characterClass.templates} />
            </div>
          </CollapsibleSection>
        )}

        {/* Description */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {characterClass.description}
          </p>
        </div>
      </div>
    </BaseContentCard>
  );
}

/**
 * Compact class description for lists
 */
export function CompactClassDescription({
  characterClass,
  isLoading,
  error,
  className = '',
  onClick
}: Omit<ClassDescriptionProps, 'variant'>) {
  return (
    <ClassDescription
      characterClass={characterClass}
      isLoading={isLoading}
      error={error}
      variant="compact"
      className={className}
      expandedByDefault={false}
      onClick={onClick}
    />
  );
}

export default ClassDescription; 