'use client';

/**
 * Tooltip Demo Page for ACKS II Wiki
 * 
 * Demonstrates the tooltip system with various content types and scenarios.
 * This page is for development and testing purposes.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React from 'react';
import { 
  LinkableText, 
  TooltipTrigger, 
  ContentPreview 
} from '@/components/ui';
import { 
  ContentType, 
  ReferenceType,
  type Monster,
  type Spell,
  type Equipment,
  type AnyContent
} from '@/lib/types/content';
import { type ParsedReference } from '@/lib/cross-references/reference-parser';

// Mock content data for testing
const mockMonster: Monster = {
  id: 'orc-1',
  title: 'Orc',
  description: 'A savage humanoid creature that lives in tribes and raids civilized settlements.',
  contentType: ContentType.MONSTER,
  tags: ['humanoid', 'savage', 'tribal'],
  createdAt: new Date(),
  updatedAt: new Date(),
  size: 'Medium',
  type: 'Humanoid',
  alignment: 'Chaotic Evil',
  armorClass: 13,
  hitDice: '1d8+1',
  hitPoints: 5,
  movement: '120\' (40\')',
  attackBonus: 1,
  damage: '1d8 (weapon)',
  savingThrows: {
    petrification: 13,
    poison: 13,
    breath: 16,
    device: 15,
    magic: 14
  },
  morale: 8,
  experience: 10,
  treasureType: 'D',
  specialAbilities: ['Infravision 60\''],
  ecology: {
    climate: 'Any',
    terrain: 'Any',
    frequency: 'Common',
    organization: 'Gang (2-8), Band (9-16), or Tribe (17-30)',
    activityCycle: 'Any',
    diet: 'Omnivore'
  }
};

const mockSpell: Spell = {
  id: 'magic-missile-1',
  title: 'Magic Missile',
  description: 'A missile of magical energy darts forth from your fingertip and strikes its target.',
  contentType: ContentType.SPELL,
  tags: ['evocation', 'force', 'missile'],
  createdAt: new Date(),
  updatedAt: new Date(),
  level: 1,
  school: 'Evocation',
  range: '150\'',
  duration: 'Instantaneous',
  castingTime: '1 round',
  components: ['V', 'S'],
  savingThrow: 'None',
  spellResistance: 'Yes',
  effect: 'Creates 1 missile per 2 caster levels (max 5)',
  damage: '1d4+1 force damage per missile'
};

const mockEquipment: Equipment = {
  id: 'longsword-1',
  title: 'Longsword',
  description: 'A versatile one-handed sword favored by warriors.',
  contentType: ContentType.EQUIPMENT,
  tags: ['weapon', 'sword', 'martial'],
  createdAt: new Date(),
  updatedAt: new Date(),
  equipmentCategory: 'WEAPON' as any,
  cost: 15,
  weight: 4,
  damage: '1d8',
  properties: ['Versatile (1d10)'],
  weaponType: 'Martial Melee'
};

// Mock references for testing
const mockReferences: ParsedReference[] = [
  {
    originalText: 'Orc',
    normalizedText: 'orc',
    contentType: ContentType.MONSTER,
    referenceType: ReferenceType.MENTIONS,
    position: { start: 20, end: 23 },
    context: 'The party encountered an Orc warrior on the road.',
    confidence: 0.9
  },
  {
    originalText: 'Magic Missile',
    normalizedText: 'magic missile',
    contentType: ContentType.SPELL,
    referenceType: ReferenceType.MENTIONS,
    position: { start: 45, end: 58 },
    context: 'The wizard cast Magic Missile at the approaching enemy.',
    confidence: 0.95
  },
  {
    originalText: 'Longsword',
    normalizedText: 'longsword',
    contentType: ContentType.EQUIPMENT,
    referenceType: ReferenceType.MENTIONS,
    position: { start: 80, end: 89 },
    context: 'The fighter drew his Longsword and prepared for battle.',
    confidence: 0.85
  }
];

export default function TooltipDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Tooltip System Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the tooltip system with various content types and scenarios.
          Hover over the highlighted links to see content previews.
        </p>
      </div>

      {/* Basic Tooltip Triggers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Basic Tooltip Triggers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Monster Preview</h3>
            <TooltipTrigger contentData={mockMonster}>
              <button className="text-red-600 hover:text-red-500 underline">
                Hover for Orc details
              </button>
            </TooltipTrigger>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Spell Preview</h3>
            <TooltipTrigger contentData={mockSpell}>
              <button className="text-blue-600 hover:text-blue-500 underline">
                Hover for Magic Missile details
              </button>
            </TooltipTrigger>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Equipment Preview</h3>
            <TooltipTrigger contentData={mockEquipment}>
              <button className="text-orange-600 hover:text-orange-500 underline">
                Hover for Longsword details
              </button>
            </TooltipTrigger>
          </div>
        </div>
      </section>

      {/* LinkableText Integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">LinkableText with Tooltips</h2>
        
        <div className="p-6 bg-muted/30 rounded-lg">
          <h3 className="font-medium mb-4">Sample Adventure Text</h3>
          <div className="prose prose-sm max-w-none">
            <LinkableText
              references={mockReferences}
              enableTooltips={true}
            >
              The party encountered an Orc warrior blocking the mountain pass. The wizard quickly cast Magic Missile while the fighter drew his Longsword and prepared for battle. The Orc roared in defiance, raising its crude shield against the magical assault.
            </LinkableText>
          </div>
        </div>
      </section>

      {/* Content Previews */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Content Preview Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium">Monster Preview</h3>
            </div>
            <ContentPreview content={mockMonster} />
          </div>

          <div className="border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium">Spell Preview</h3>
            </div>
            <ContentPreview content={mockSpell} />
          </div>

          <div className="border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium">Equipment Preview</h3>
            </div>
            <ContentPreview content={mockEquipment} />
          </div>
        </div>
      </section>

      {/* Compact Previews */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Compact Preview Mode</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg">
            <div className="p-2 border-b border-border">
              <h3 className="font-medium text-sm">Compact Monster</h3>
            </div>
            <ContentPreview content={mockMonster} compact={true} />
          </div>

          <div className="border border-border rounded-lg">
            <div className="p-2 border-b border-border">
              <h3 className="font-medium text-sm">Compact Spell</h3>
            </div>
            <ContentPreview content={mockSpell} compact={true} />
          </div>

          <div className="border border-border rounded-lg">
            <div className="p-2 border-b border-border">
              <h3 className="font-medium text-sm">Compact Equipment</h3>
            </div>
            <ContentPreview content={mockEquipment} compact={true} />
          </div>
        </div>
      </section>

      {/* Tooltip Configuration Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tooltip Configuration Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Fast Tooltips (100ms delay)</h3>
            <TooltipTrigger 
              contentData={mockMonster}
              config={{ showDelay: 100, hideDelay: 50 }}
            >
              <button className="text-primary hover:text-primary/80 underline">
                Fast tooltip trigger
              </button>
            </TooltipTrigger>
          </div>

          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Slow Tooltips (1000ms delay)</h3>
            <TooltipTrigger 
              contentData={mockSpell}
              config={{ showDelay: 1000, hideDelay: 300 }}
            >
              <button className="text-primary hover:text-primary/80 underline">
                Slow tooltip trigger
              </button>
            </TooltipTrigger>
          </div>

          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Interactive Tooltip</h3>
            <TooltipTrigger 
              contentData={mockEquipment}
              config={{ interactive: true, hideDelay: 500 }}
            >
              <button className="text-primary hover:text-primary/80 underline">
                Interactive tooltip (can hover over it)
              </button>
            </TooltipTrigger>
          </div>

          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Large Tooltip</h3>
            <TooltipTrigger 
              contentData={mockMonster}
              config={{ maxWidth: 500 }}
            >
              <button className="text-primary hover:text-primary/80 underline">
                Large tooltip (500px max width)
              </button>
            </TooltipTrigger>
          </div>
        </div>
      </section>

      {/* Accessibility Testing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Accessibility Testing</h2>
        
        <div className="p-6 bg-muted/30 rounded-lg space-y-4">
          <p className="text-sm text-muted-foreground">
            Test keyboard navigation: Use Tab to focus on elements, Enter/Space to show tooltips, Escape to hide.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <TooltipTrigger contentData={mockMonster}>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Keyboard accessible monster
              </button>
            </TooltipTrigger>
            
            <TooltipTrigger contentData={mockSpell}>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                Keyboard accessible spell
              </button>
            </TooltipTrigger>
            
            <TooltipTrigger contentData={mockEquipment}>
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                Keyboard accessible equipment
              </button>
            </TooltipTrigger>
          </div>
        </div>
      </section>

      {/* Performance Testing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Performance Testing</h2>
        
        <div className="p-6 bg-muted/30 rounded-lg">
          <h3 className="font-medium mb-4">Multiple Tooltips</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 24 }, (_, i) => (
              <TooltipTrigger 
                key={i}
                contentData={i % 3 === 0 ? mockMonster : i % 3 === 1 ? mockSpell : mockEquipment}
              >
                <button className="p-2 text-xs bg-muted hover:bg-muted/80 rounded border">
                  Tooltip {i + 1}
                </button>
              </TooltipTrigger>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 