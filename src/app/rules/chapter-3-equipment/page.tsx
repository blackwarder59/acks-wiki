'use client';

import React from 'react';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Chapter 3: Equipment
 * 
 * Weapons, armor, gear, and adventuring equipment in ACKS II
 */
export default function Chapter3EquipmentPage() {
  const chapterContent = {
    id: 'chapter-3-equipment',
    chapterNumber: 3,
    title: 'Equipment',
    description: 'Weapons, armor, gear, and adventuring equipment for characters',
    introduction: `Equipment forms the backbone of any successful adventure. From the sword at your side to the rope in your pack, the gear you carry can mean the difference between triumph and disaster.

This chapter covers all manner of equipment available to characters in ACKS II, including weapons, armor, tools, and specialized gear. Each piece of equipment has its place in the adventurer's arsenal.`,
    sections: [
      {
        id: 'weapons',
        title: 'Weapons',
        content: `# Weapons

Weapons are the primary tools of combat, each with distinct characteristics that affect their use in battle.

## Melee Weapons

**Swords**: Versatile cutting and thrusting weapons, favored by warriors for their balance and effectiveness.

**Axes**: Heavy chopping weapons that deal devastating damage but require strength to wield effectively.

**Maces**: Blunt weapons designed to crush armor and bone, particularly effective against heavily armored opponents.

**Spears**: Long-reaching weapons excellent for formation fighting and mounted combat.

## Ranged Weapons

**Bows**: Silent, accurate weapons favored by hunters and scouts for their precision and range.

**Crossbows**: Mechanical weapons that require less training but longer reload times than bows.

**Thrown Weapons**: Daggers, javelins, and other weapons that can be hurled at enemies.

## Weapon Properties

Each weapon has specific properties that determine its effectiveness:
- **Damage**: The amount of harm the weapon inflicts
- **Speed**: How quickly the weapon can be used
- **Range**: For ranged weapons, the maximum effective distance
- **Special Properties**: Unique characteristics like armor piercing or reach`,
        level: 2
      },
      {
        id: 'armor',
        title: 'Armor',
        content: `# Armor

Armor protects characters from physical harm, with different types offering varying levels of protection and mobility.

## Light Armor

**Leather Armor**: Basic protection made from treated animal hides, offering minimal defense while maintaining mobility.

**Studded Leather**: Reinforced leather armor with metal studs, providing better protection than basic leather.

## Medium Armor

**Chain Mail**: Interlocking metal rings that provide excellent protection against cutting attacks.

**Scale Mail**: Overlapping metal scales that offer good protection while remaining relatively flexible.

## Heavy Armor

**Plate Mail**: The pinnacle of armored protection, offering maximum defense at the cost of mobility and stealth.

**Shield**: A separate piece of equipment that can be combined with armor for additional protection.

## Armor Class

Armor Class (AC) represents how difficult you are to damage in combat. Better armor provides higher AC values, making you harder to hit effectively.`,
        level: 2
      },
      {
        id: 'adventuring-gear',
        title: 'Adventuring Gear',
        content: `# Adventuring Gear

Beyond weapons and armor, adventurers need a variety of tools and supplies to survive in hostile environments.

## Essential Gear

**Rope**: 50 feet of hemp or silk rope for climbing, securing, and rescue operations.

**Torches**: Essential light sources for exploring dark dungeons and caves.

**Backpack**: Carries all your essential equipment and treasures found during adventures.

**Bedroll**: Provides comfort and warmth during outdoor camping.

## Specialized Tools

**Thieves' Tools**: Lockpicks, small files, and other implements for bypassing security.

**Holy Symbol**: Required focus for divine spellcasters to channel their deity's power.

**Spell Components**: Material components needed for casting arcane spells.

**Climbing Gear**: Pitons, hammers, and other equipment for scaling walls and cliffs.

## Provisions

**Rations**: Preserved food that travels well and provides sustenance on long journeys.

**Water**: Essential for survival, particularly in desert or underground environments.

**Wine**: Both a luxury and a necessity for maintaining morale during difficult times.`,
        level: 2
      },
      {
        id: 'costs-availability',
        title: 'Costs and Availability',
        content: `# Equipment Costs and Availability

The price and availability of equipment varies greatly depending on location, local economy, and current events.

## Standard Pricing

Most civilized areas maintain relatively stable prices for common equipment. Weapons and armor typically cost more in frontier regions where skilled smiths are rare.

## Regional Variations

**City Markets**: Widest selection and most competitive prices due to trade and competition.

**Frontier Towns**: Limited selection with higher prices, especially for quality items.

**Remote Settlements**: Basic necessities available, but specialized gear may be unavailable at any price.

## Quality Levels

**Standard**: Normal quality equipment with typical effectiveness and durability.

**Masterwork**: Superior craftsmanship that provides bonuses to effectiveness.

**Magical**: Enchanted items with supernatural properties and powers.

## Encumbrance

Characters can only carry so much equipment before being slowed down. The encumbrance system tracks:
- **Movement Rate**: How carrying capacity affects travel speed
- **Combat Penalties**: How heavy loads impact fighting ability
- **Endurance**: How equipment weight affects long-term travel`,
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
        href: '/rules/chapter-2-classes',
        title: 'Classes'
      }}
      nextChapter={{
        href: '/rules/chapter-4-proficiencies',
        title: 'Proficiencies'
      }}
    />
  );
} 