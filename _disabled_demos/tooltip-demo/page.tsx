'use client';

/**
 * ACKS II Content Tooltips Page
 * 
 * Demonstrates the tooltip system with real ACKS II content.
 * Shows how tooltips work with actual monsters and spells from the game.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React from 'react';
import allMonsters from '@/data/all-monsters.json';
import realSpells from '@/data/real-spells.json';

// Real ACKS II content for tooltips
const featuredMonster = allMonsters[0]; // Acanthaspis, Giant
const featuredSpell = realSpells[0]; // First real spell
const secondMonster = allMonsters[1]; // Amphisbaena
const secondSpell = realSpells[1]; // Second real spell

/**
 * Simple tooltip component for real ACKS II data
 */
const SimpleTooltip: React.FC<{
  children: React.ReactNode;
  content: string;
  title: string;
}> = ({ children, content, title }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-4 bg-popover border border-border rounded-lg shadow-lg">
          <h4 className="font-semibold text-foreground mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Monster card component for real ACKS II data
 */
const MonsterCard: React.FC<{ monster: typeof featuredMonster }> = ({ monster }) => (
  <div className="p-4 border border-border rounded-lg space-y-3">
    <div>
      <h3 className="font-semibold text-lg text-foreground">{monster.name}</h3>
      <p className="text-sm text-muted-foreground">{monster.stats?.type} • {monster.stats?.size}</p>
    </div>
    
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <span className="font-medium">AC:</span> {monster.stats?.armorClass}
      </div>
      <div>
        <span className="font-medium">HD:</span> {monster.stats?.hitDice}
      </div>
      <div>
        <span className="font-medium">Attacks:</span> {monster.stats?.attacks}
      </div>
      <div>
        <span className="font-medium">Damage:</span> {monster.stats?.damage}
      </div>
    </div>
    
    <p className="text-sm text-muted-foreground">{monster.description}</p>
    
    {monster.encounterInfo?.xp && (
      <div className="text-xs text-primary font-medium">
        XP: {monster.encounterInfo.xp}
      </div>
    )}
  </div>
);

/**
 * Spell card component for real ACKS II data
 */
const SpellCard: React.FC<{ spell: typeof featuredSpell }> = ({ spell }) => (
  <div className="p-4 border border-border rounded-lg space-y-3">
    <div>
      <h3 className="font-semibold text-lg text-foreground">{spell.name}</h3>
      <div className="flex gap-2 mt-1">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          Level {spell.level}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
          {spell.magicType}
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <span className="font-medium">Range:</span> {spell.range}
      </div>
      <div>
        <span className="font-medium">Duration:</span> {spell.duration}
      </div>
    </div>
    
    <p className="text-sm text-muted-foreground">{spell.description}</p>
  </div>
);

export default function TooltipDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">ACKS II Content Tooltips</h1>
        <p className="text-muted-foreground">
          Explore real ACKS II content with interactive tooltips. Hover over the highlighted links 
          to see detailed information about monsters, spells, and other game content.
        </p>
      </div>

      {/* Real Monster Tooltips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Monster Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Featured Monster</h3>
            <SimpleTooltip
              title={featuredMonster.name}
              content={`${featuredMonster.stats?.type} • AC ${featuredMonster.stats?.armorClass} • HD ${featuredMonster.stats?.hitDice} • ${featuredMonster.description}`}
            >
              <button className="text-red-600 hover:text-red-500 underline">
                {featuredMonster.name}
              </button>
            </SimpleTooltip>
            <p className="text-sm text-muted-foreground mt-2">
              {featuredMonster.description}
            </p>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Another Monster</h3>
            <SimpleTooltip
              title={secondMonster.name}
              content={`${secondMonster.stats?.type} • AC ${secondMonster.stats?.armorClass} • HD ${secondMonster.stats?.hitDice} • ${secondMonster.description}`}
            >
              <button className="text-red-600 hover:text-red-500 underline">
                {secondMonster.name}
              </button>
            </SimpleTooltip>
            <p className="text-sm text-muted-foreground mt-2">
              {secondMonster.description}
            </p>
          </div>
        </div>
      </section>

      {/* Real Spell Tooltips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Spell Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Featured Spell</h3>
            <SimpleTooltip
              title={featuredSpell.name}
              content={`Level ${featuredSpell.level} ${featuredSpell.magicType} spell • Range: ${featuredSpell.range} • Duration: ${featuredSpell.duration} • ${featuredSpell.description}`}
            >
              <button className="text-blue-600 hover:text-blue-500 underline">
                {featuredSpell.name}
              </button>
            </SimpleTooltip>
            <p className="text-sm text-muted-foreground mt-2">
              Level {featuredSpell.level} {featuredSpell.magicType} spell
            </p>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-2">Another Spell</h3>
            <SimpleTooltip
              title={secondSpell.name}
              content={`Level ${secondSpell.level} ${secondSpell.magicType} spell • Range: ${secondSpell.range} • Duration: ${secondSpell.duration} • ${secondSpell.description}`}
            >
              <button className="text-blue-600 hover:text-blue-500 underline">
                {secondSpell.name}
              </button>
            </SimpleTooltip>
            <p className="text-sm text-muted-foreground mt-2">
              Level {secondSpell.level} {secondSpell.magicType} spell
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Adventure Text */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Interactive Adventure Text</h2>
        
        <div className="p-6 bg-muted/30 rounded-lg">
          <h3 className="font-medium mb-4">Sample Adventure Scenario</h3>
          <div className="prose prose-sm max-w-none">
            <p>
              The party encountered a{' '}
              <SimpleTooltip
                title={featuredMonster.name}
                content={`${featuredMonster.stats?.type} • AC ${featuredMonster.stats?.armorClass} • HD ${featuredMonster.stats?.hitDice} • ${featuredMonster.description}`}
              >
                <span className="text-red-600 hover:text-red-500 underline cursor-pointer">
                  {featuredMonster.name}
                </span>
              </SimpleTooltip>
              {' '}blocking their path through the ancient ruins. 
              The creature's AC {featuredMonster.stats?.armorClass} made it a challenging opponent. The wizard quickly cast{' '}
              <SimpleTooltip
                title={featuredSpell.name}
                content={`Level ${featuredSpell.level} ${featuredSpell.magicType} spell • Range: ${featuredSpell.range} • Duration: ${featuredSpell.duration} • ${featuredSpell.description}`}
              >
                <span className="text-blue-600 hover:text-blue-500 underline cursor-pointer">
                  {featuredSpell.name}
                </span>
              </SimpleTooltip>
              {' '}to aid the party in the upcoming battle.
            </p>
          </div>
        </div>
      </section>

      {/* Content Previews */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Content Preview Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-3">{featuredMonster.name} Preview</h3>
            <MonsterCard monster={featuredMonster} />
          </div>

          <div>
            <h3 className="font-medium mb-3">{featuredSpell.name} Preview</h3>
            <SpellCard spell={featuredSpell} />
          </div>
        </div>
      </section>

      {/* Multiple Real Monsters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Monster Collection</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {allMonsters.slice(0, 12).map((monster, i) => (
            <SimpleTooltip
              key={monster.id}
              title={monster.name}
              content={`${monster.stats?.type} • AC ${monster.stats?.armorClass} • HD ${monster.stats?.hitDice} • ${monster.description}`}
            >
              <button className="p-2 text-xs bg-muted hover:bg-muted/80 rounded border text-left">
                {monster.name}
              </button>
            </SimpleTooltip>
          ))}
        </div>
      </section>

      {/* Multiple Real Spells */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Spell Collection</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {realSpells.slice(0, 12).map((spell, i) => (
            <SimpleTooltip
              key={spell.id}
              title={spell.name}
              content={`Level ${spell.level} ${spell.magicType} spell • Range: ${spell.range} • Duration: ${spell.duration} • ${spell.description}`}
            >
              <button className="p-2 text-xs bg-muted hover:bg-muted/80 rounded border text-left">
                {spell.name}
              </button>
            </SimpleTooltip>
          ))}
        </div>
      </section>
    </div>
  );
} 