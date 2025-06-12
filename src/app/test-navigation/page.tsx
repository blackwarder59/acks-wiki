'use client';

import React from 'react';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Test Navigation Page - Shows ChapterTemplate with Navigation Components
 * 
 * This page demonstrates the actual working navigation system:
 * - Breadcrumb navigation
 * - Keyboard shortcuts (press ? for help)
 * - Chapter navigation
 * - All integrated into ChapterTemplate
 */
export default function TestNavigationPage() {
  // Mock chapter content - no loading needed
  const chapterContent = {
    id: 'chapter-1-characters',
    chapterNumber: 1,
    title: 'Characters',
    description: 'Character creation, attributes, and basic character mechanics',
    introduction: `Welcome to character creation in ACKS II! This chapter covers everything you need to know about creating memorable characters for your adventures in the Auran Empire.

Characters are the heart of any campaign, and ACKS II provides a robust system for creating heroes who can grow from humble beginnings to legendary figures capable of ruling domains and commanding armies.`,
    sections: [
      {
        id: 'ability-scores',
        title: 'Ability Scores',
        content: `# Ability Scores

Characters in ACKS II have six core ability scores that define their natural talents and capabilities. These scores influence everything from combat effectiveness to social interactions.

## The Six Abilities

**Strength (STR)**: Measures physical power and muscle. High Strength helps with:
- Melee attack and damage rolls
- Carrying capacity for equipment and treasure
- Opening doors and breaking objects
- Feat of strength attempts

**Intelligence (INT)**: Represents reasoning ability, memory, and education. High Intelligence provides:
- Additional languages known at character creation
- Bonus spell slots for arcane spellcasters
- Better chances with knowledge-based tasks
- Faster learning of new skills

**Wisdom (WIS)**: Reflects awareness, intuition, and spiritual insight. High Wisdom grants:
- Bonus spell slots for divine spellcasters
- Better saving throws against mental effects
- Improved perception and survival skills
- Resistance to deception and illusion

**Dexterity (DEX)**: Measures agility, reflexes, and fine motor control. High Dexterity improves:
- Armor Class (making you harder to hit)
- Missile weapon attack rolls
- Initiative in combat situations
- Stealth and acrobatic maneuvers

**Constitution (CON)**: Represents health, stamina, and physical resilience. High Constitution provides:
- Additional hit points per character level
- Better saving throws against poison and disease
- Improved system shock survival rates
- Resistance to environmental hazards

**Charisma (CHA)**: Measures force of personality, leadership ability, and divine favor. High Charisma enhances:
- Reaction rolls when meeting NPCs
- Maximum number of retainers you can hire
- Loyalty ratings of followers and henchmen
- Effectiveness of certain magical abilities

## Rolling Ability Scores

The standard method for generating ability scores is to roll 3d6 six times and assign the results to the six abilities in any order you choose. This allows you to optimize your character for your preferred class while maintaining the excitement of random generation.

### Alternative Methods

**4d6 Drop Lowest**: Roll 4d6, drop the lowest die, and sum the remaining three. Do this six times for higher average scores.

**Point Buy System**: Distribute a fixed number of points among the six abilities for more controlled character creation.

**Standard Array**: Use the pre-determined array [15, 14, 13, 12, 10, 8] for consistent power levels.`,
        level: 2
      },
      {
        id: 'character-classes',
        title: 'Character Classes',
        content: `# Character Classes

Your character's class determines their role in the party, their special abilities, and their path of advancement. ACKS II features four main classes, each with numerous variants and customization options.

## The Core Classes

### Fighter
**Prime Requisite**: Strength  
**Hit Die**: d8  
**Armor Permitted**: Any armor and shields  
**Weapons Permitted**: Any weapons

Fighters are masters of combat, trained in the arts of war and capable of using any weapon or armor. They form the backbone of any adventuring party and excel in direct confrontation.

**Class Features**:
- Best attack progression of all classes
- Multiple attacks per round at higher levels
- Leadership abilities for commanding troops
- Weapon specialization options
- Tactical combat maneuvers

### Mage
**Prime Requisite**: Intelligence  
**Hit Die**: d4  
**Armor Permitted**: None  
**Weapons Permitted**: Dagger, dart, staff, and other simple weapons

Mages wield the power of arcane magic, studying ancient formulae and cosmic principles to bend reality to their will. Though physically fragile, their magical abilities make them invaluable allies.

**Class Features**:
- Arcane spellcasting abilities
- Magical research and item creation
- Spell book management and acquisition
- Familiar summoning at higher levels
- Tower construction and arcane laboratories

### Cleric
**Prime Requisite**: Wisdom  
**Hit Die**: d6  
**Armor Permitted**: Any armor and shields  
**Weapons Permitted**: Blunt weapons only

Clerics serve as intermediaries between the mortal world and divine powers. They channel sacred energy to heal allies, turn undead, and smite the forces of darkness.

**Class Features**:
- Divine spellcasting progression
- Turn undead creatures
- Healing and protection magic
- Temple construction and management
- Religious ceremony performance

### Thief
**Prime Requisite**: Dexterity  
**Hit Die**: d4  
**Armor Permitted**: Leather armor only, no shields  
**Weapons Permitted**: Any one-handed weapons

Thieves excel at stealth, infiltration, and acquiring things that don't belong to them. Their specialized skills make them essential for navigating traps, picking locks, and gathering information.

**Class Features**:
- Thievery skills (lockpicking, stealth, etc.)
- Backstab damage multiplier
- Special movement abilities (climbing, hiding)
- Thieves' guild establishment
- Black market connections and fencing

## Class Variants and Customization

Each core class has multiple variants that modify abilities, restrictions, and flavor. These variants allow for greater character customization while maintaining game balance.`,
        level: 2
      },
      {
        id: 'races-and-backgrounds',
        title: 'Races and Backgrounds',
        content: `# Races and Backgrounds

## Character Races

While humans are the dominant race in the Auran Empire, adventurers come from many different backgrounds and lineages.

### Humans
The most adaptable and ambitious of races, humans can excel in any class and often serve as leaders and innovators.

### Demi-Humans
Various demi-human races offer unique abilities and perspectives:
- **Elves**: Long-lived and magical, with natural spellcasting abilities
- **Dwarves**: Hardy mountain folk, expert crafters and warriors
- **Halflings**: Small but brave, with exceptional luck and stealth

## Character Backgrounds

Your character's background before becoming an adventurer shapes their skills and starting equipment:

- **Noble**: Born to privilege, with connections and resources
- **Soldier**: Military training and discipline
- **Merchant**: Trade skills and business acumen
- **Scholar**: Education and knowledge of lore
- **Criminal**: Street smarts and underworld connections`,
        level: 2
      }
    ],
    appendix: false
  };

  return (
    <ChapterTemplate
      chapterNumber={chapterContent.chapterNumber}
      title={chapterContent.title}
      description={chapterContent.description}
      introduction={chapterContent.introduction}
      sections={chapterContent.sections}
      appendix={chapterContent.appendix}
      previousChapter={{
        href: '/',
        title: 'Home'
      }}
      nextChapter={{
        href: '/rules/chapter-2-classes',
        title: 'Classes'
      }}
    />
  );
} 