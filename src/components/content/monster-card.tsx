'use client';

/**
 * Monster Card Component for ACKS II Wiki
 * 
 * Displays monster information in a structured, readable format with
 * responsive design optimized for both desktop and mobile viewing.
 * 
 * Features:
 * - Primary and secondary characteristics display
 * - Combat abilities and special powers
 * - Encounter setup information
 * - Ecology and spoils information
 * - Responsive layout with mobile optimization
 * - Loading and error states
 * - Copy-to-clipboard functionality
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { 
  Shield, 
  Sword, 
  Heart, 
  Eye, 
  Coins, 
  MapPin,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import { BaseContentCard } from './base-content-card';
import { type Monster, type MonsterPrimaryCharacteristics, type MonsterSecondaryCharacteristics } from '../../lib/types/content';

/**
 * Monster card component props
 */
export interface MonsterCardProps {
  /** Monster data to display */
  monster?: Monster;
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
  /** Callback when monster is clicked */
  onClick?: () => void;
}

/**
 * Attribute display component
 */
function AttributeRow({ 
  label, 
  value, 
  icon: Icon 
}: { 
  label: string; 
  value: string | number | undefined; 
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  if (!value) return null;
  
  return (
    <div className="flex items-center gap-2 py-1">
      {Icon && <Icon size={16} className="text-muted-foreground flex-shrink-0" />}
      <span className="text-sm font-medium text-muted-foreground min-w-0 flex-shrink-0">
        {label}:
      </span>
      <span className="text-sm text-foreground flex-1 min-w-0">
        {value}
      </span>
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
 * Primary characteristics display
 */
function PrimaryCharacteristics({ 
  characteristics 
}: { 
  characteristics: MonsterPrimaryCharacteristics 
}) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-foreground mb-3">Primary Characteristics</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <AttributeRow label="Type" value={characteristics.type} icon={Shield} />
        <AttributeRow label="Size" value={characteristics.size} />
        <AttributeRow label="AC" value={characteristics.armorClass} icon={Shield} />
        <AttributeRow label="Hit Dice" value={characteristics.hitDice} icon={Heart} />
        <AttributeRow label="Attacks" value={characteristics.attacks} icon={Sword} />
        <AttributeRow label="Damage" value={characteristics.damage} />
        <AttributeRow label="Save" value={characteristics.save} />
        <AttributeRow label="Morale" value={characteristics.morale} />
        <AttributeRow label="Vision" value={characteristics.vision} icon={Eye} />
        {characteristics.speedLand && (
          <AttributeRow label="Speed (Land)" value={characteristics.speedLand} />
        )}
        {characteristics.speedFly && (
          <AttributeRow label="Speed (Fly)" value={characteristics.speedFly} />
        )}
        {characteristics.speedSwim && (
          <AttributeRow label="Speed (Swim)" value={characteristics.speedSwim} />
        )}
        {characteristics.otherSenses && (
          <AttributeRow label="Other Senses" value={characteristics.otherSenses} />
        )}
        {characteristics.proficiencies && (
          <AttributeRow label="Proficiencies" value={characteristics.proficiencies} />
        )}
        {characteristics.normalLoad && (
          <AttributeRow label="Normal Load" value={characteristics.normalLoad} />
        )}
      </div>
    </div>
  );
}

/**
 * Secondary characteristics display
 */
function SecondaryCharacteristics({ 
  characteristics 
}: { 
  characteristics: MonsterSecondaryCharacteristics 
}) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-foreground mb-3">Secondary Characteristics</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {characteristics.expeditionSpeed && (
          <AttributeRow label="Expedition Speed" value={characteristics.expeditionSpeed} />
        )}
        {characteristics.supplyCost && (
          <AttributeRow label="Supply Cost" value={characteristics.supplyCost} icon={Coins} />
        )}
        {characteristics.trainingPeriod && (
          <AttributeRow label="Training Period" value={characteristics.trainingPeriod} />
        )}
        {characteristics.trainingModifier && (
          <AttributeRow label="Training Modifier" value={characteristics.trainingModifier} />
        )}
        {characteristics.battleRating && (
          <AttributeRow label="Battle Rating" value={characteristics.battleRating} />
        )}
        {characteristics.lifespan && (
          <AttributeRow label="Lifespan" value={characteristics.lifespan} />
        )}
        {characteristics.reproduction && (
          <AttributeRow label="Reproduction" value={characteristics.reproduction} />
        )}
        {characteristics.untrainedValue && (
          <AttributeRow label="Untrained Value" value={characteristics.untrainedValue} icon={Coins} />
        )}
        {characteristics.trainedValue && (
          <AttributeRow label="Trained Value" value={characteristics.trainedValue} icon={Coins} />
        )}
      </div>
    </div>
  );
}

/**
 * Encounter setup display
 */
function EncounterSetup({ monster }: { monster: Monster }) {
  const { encounterSetup } = monster;
  
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-foreground mb-3">Encounter Setup</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <AttributeRow label="Alignment" value={encounterSetup.alignment} />
        <AttributeRow label="XP" value={encounterSetup.xp} icon={Zap} />
        {encounterSetup.lair && (
          <AttributeRow label="Lair" value={encounterSetup.lair} icon={MapPin} />
        )}
        {encounterSetup.dungeonEnc && (
          <AttributeRow label="Dungeon Enc" value={encounterSetup.dungeonEnc} icon={Users} />
        )}
        {encounterSetup.wildernessEnc && (
          <AttributeRow label="Wilderness Enc" value={encounterSetup.wildernessEnc} icon={Users} />
        )}
        {encounterSetup.treasureType && (
          <AttributeRow label="Treasure Type" value={encounterSetup.treasureType} icon={Coins} />
        )}
      </div>
    </div>
  );
}

/**
 * Monster card skeleton for loading state
 */
function MonsterCardSkeleton() {
  const skeletonClasses = "animate-pulse bg-muted rounded";
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <div className={`${skeletonClasses} h-6 w-3/4`} />
        <div className={`${skeletonClasses} h-4 w-1/2`} />
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className={`${skeletonClasses} h-4 w-full`} />
            <div className={`${skeletonClasses} h-3 w-2/3`} />
          </div>
        ))}
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
 * Monster Card Component
 */
export function MonsterCard({
  monster,
  isLoading = false,
  error,
  variant = 'default',
  className = '',
  expandedByDefault = false,
  onClick
}: MonsterCardProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  /**
   * Copy monster stat block to clipboard
   */
  const copyStatBlock = useCallback(async () => {
    if (!monster) return;

    const statBlock = `${monster.title}
${monster.primaryCharacteristics.type}, ${monster.primaryCharacteristics.size}
AC ${monster.primaryCharacteristics.armorClass}, HD ${monster.primaryCharacteristics.hitDice}
Attacks: ${monster.primaryCharacteristics.attacks}
Damage: ${monster.primaryCharacteristics.damage}
Save: ${monster.primaryCharacteristics.save}, Morale: ${monster.primaryCharacteristics.morale}
Alignment: ${monster.encounterSetup.alignment}, XP: ${monster.encounterSetup.xp}`;

    try {
      await navigator.clipboard.writeText(statBlock);
      setCopiedSection('statblock');
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy stat block:', error);
    }
  }, [monster]);

  if (isLoading) {
    return (
      <BaseContentCard
        isLoading={true}
        variant={variant}
        className={className}
      >
        <MonsterCardSkeleton />
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

  if (!monster) {
    return (
      <BaseContentCard
        error="No monster data provided"
        variant={variant}
        className={className}
      >
        {/* Error content handled by BaseContentCard */}
      </BaseContentCard>
    );
  }

  return (
    <BaseContentCard
      content={monster}
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
              copyStatBlock();
            }}
            className="
              inline-flex items-center gap-1 px-2 py-1 text-xs
              bg-muted hover:bg-muted/80 rounded transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            "
            title="Copy stat block"
          >
            {copiedSection === 'statblock' ? (
              <>
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Stats</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Primary Characteristics - Always visible */}
        <PrimaryCharacteristics characteristics={monster.primaryCharacteristics} />

        {/* Encounter Setup - Always visible */}
        <EncounterSetup monster={monster} />

        {/* Secondary Characteristics - Collapsible */}
        {monster.secondaryCharacteristics && (
          <CollapsibleSection
            title="Secondary Characteristics"
            defaultExpanded={expandedByDefault}
            icon={Shield}
          >
            <SecondaryCharacteristics characteristics={monster.secondaryCharacteristics} />
          </CollapsibleSection>
        )}

        {/* Combat Information - Collapsible */}
        {monster.combat && (
          <CollapsibleSection
            title="Combat"
            defaultExpanded={expandedByDefault}
            icon={Sword}
          >
            <div className="space-y-3">
              {monster.combat.specialAbilities && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Special Abilities</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {monster.combat.specialAbilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                  </ul>
                </div>
              )}
              {monster.combat.tactics && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Tactics</h5>
                  <p className="text-sm text-muted-foreground">{monster.combat.tactics}</p>
                </div>
              )}
              {monster.combat.resistances && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Resistances</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {monster.combat.resistances.map((resistance, index) => (
                      <li key={index}>{resistance}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Ecology - Collapsible */}
        {monster.ecology && (
          <CollapsibleSection
            title="Ecology"
            defaultExpanded={expandedByDefault}
            icon={MapPin}
          >
            <div className="space-y-3">
              {monster.ecology.habitat && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Habitat</h5>
                  <p className="text-sm text-muted-foreground">{monster.ecology.habitat}</p>
                </div>
              )}
              {monster.ecology.behavior && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Behavior</h5>
                  <p className="text-sm text-muted-foreground">{monster.ecology.behavior}</p>
                </div>
              )}
              {monster.ecology.offspring && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Offspring</h5>
                  <p className="text-sm text-muted-foreground">{monster.ecology.offspring}</p>
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Spoils - Collapsible */}
        {monster.spoils && (
          <CollapsibleSection
            title="Spoils"
            defaultExpanded={expandedByDefault}
            icon={Coins}
          >
            <div className="space-y-3">
              {monster.spoils.magicComponents && monster.spoils.magicComponents.length > 0 && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Magic Components</h5>
                  <div className="space-y-2">
                    {monster.spoils.magicComponents.map((component, index) => (
                      <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                        <div className="font-medium">{component.name}</div>
                        <div className="text-muted-foreground">
                          Weight: {component.weight}, Value: {component.value} gp
                        </div>
                        <div className="text-muted-foreground">
                          Spells: {component.spells.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {monster.spoils.valuableParts && monster.spoils.valuableParts.length > 0 && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Valuable Parts</h5>
                  <div className="space-y-2">
                    {monster.spoils.valuableParts.map((part, index) => (
                      <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                        <div className="font-medium">{part.name}</div>
                        <div className="text-muted-foreground">
                          Weight: {part.weight}, Value: {part.value} gp
                          {part.quantity && `, Quantity: ${part.quantity}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {monster.spoils.trainingNotes && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Training Notes</h5>
                  <p className="text-sm text-muted-foreground">{monster.spoils.trainingNotes}</p>
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Description - Always visible */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {monster.description}
          </p>
        </div>
      </div>
    </BaseContentCard>
  );
}

/**
 * Compact monster card for lists
 */
export function CompactMonsterCard({
  monster,
  isLoading,
  error,
  className = '',
  onClick
}: Omit<MonsterCardProps, 'variant'>) {
  return (
    <MonsterCard
      monster={monster}
      isLoading={isLoading}
      error={error}
      variant="compact"
      className={className}
      expandedByDefault={false}
      onClick={onClick}
    />
  );
}

export default MonsterCard; 