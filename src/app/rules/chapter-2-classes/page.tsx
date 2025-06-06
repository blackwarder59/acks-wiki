'use client';

import React from 'react';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Chapter 2: Classes
 * 
 * Character classes and their abilities in ACKS II
 */
export default function Chapter2ClassesPage() {
  const chapterContent = {
    id: 'chapter-2-classes',
    chapterNumber: 2,
    title: 'Classes',
    description: 'Character classes, their abilities, and advancement paths',
    introduction: `This chapter details the character classes available in ACKS II. Each class represents a different approach to adventure and offers unique abilities, restrictions, and paths to power.

Whether you wish to be a mighty warrior, a cunning spellcaster, a divine champion, or a master of stealth, these classes provide the framework for your character's capabilities and growth.`,
    sections: [
      {
        id: 'fighter',
        title: 'Fighter',
        content: `# Fighter

**Prime Requisite**: Strength  
**Hit Die**: d8  
**Armor Permitted**: Any armor and shields  
**Weapons Permitted**: Any weapons

Fighters are masters of combat, trained in warfare and capable of using any weapon or armor. They form the backbone of any adventuring party and excel in direct confrontation.

## Class Features

**Combat Expertise**: Fighters gain the best attack progression of all classes, making them formidable in battle.

**Weapon Mastery**: At higher levels, fighters can specialize in specific weapons, gaining additional bonuses when using them.

**Multiple Attacks**: High-level fighters can make multiple attacks per round against lesser opponents.

**Leadership**: Fighters can attract and command followers, building their own military forces.

## Advancement

Fighters advance by gaining experience through combat, exploration, and successfully completing adventures. They gain hit points, improve their attack capabilities, and unlock new combat techniques as they level up.`,
        level: 2
      },
      {
        id: 'mage',
        title: 'Mage',
        content: `# Mage

**Prime Requisite**: Intelligence  
**Hit Die**: d4  
**Armor Permitted**: None  
**Weapons Permitted**: Dagger, dart, staff, and other simple weapons

Mages are practitioners of arcane magic, studying ancient formulae and cosmic principles to manipulate reality through spellcasting.

## Class Features

**Spellcasting**: Mages can cast arcane spells, starting with simple cantrips and progressing to reality-altering magic.

**Spell Research**: Mages can research new spells and create unique magical effects.

**Magic Item Creation**: High-level mages can create magical items, potions, and artifacts.

**Familiar**: Mages can summon and bond with magical familiars to aid them.

## Spellbooks and Learning

Mages must maintain spellbooks containing the formulae for their spells. They can learn new spells by studying from other spellbooks, scrolls, or through their own research.`,
        level: 2
      },
      {
        id: 'cleric',
        title: 'Cleric',
        content: `# Cleric

**Prime Requisite**: Wisdom  
**Hit Die**: d6  
**Armor Permitted**: Any armor and shields  
**Weapons Permitted**: Blunt weapons only (as per religious restrictions)

Clerics serve as intermediaries between mortals and divine powers, channeling sacred energy for healing, protection, and battle against evil.

## Class Features

**Divine Spellcasting**: Clerics receive spells directly from their deity, focusing on healing, protection, and divination.

**Turn Undead**: Clerics can channel divine power to repel or destroy undead creatures.

**Divine Favor**: Clerics benefit from their deity's protection and guidance.

**Temple Building**: High-level clerics can establish temples and gather followers.

## Divine Magic

Unlike mages, clerics don't need to study their spells. Instead, they pray each day to receive divine magic from their patron deity.`,
        level: 2
      },
      {
        id: 'thief',
        title: 'Thief',
        content: `# Thief

**Prime Requisite**: Dexterity  
**Hit Die**: d4  
**Armor Permitted**: Leather armor only, no shields  
**Weapons Permitted**: Any one-handed weapons

Thieves excel at stealth, infiltration, and skills that others might consider unsavory. They are masters of cunning and misdirection.

## Class Features

**Thievery Skills**: Pick locks, detect and remove traps, move silently, hide in shadows, and climb walls.

**Backstab**: Thieves can deal devastating damage when attacking unaware opponents.

**Thief Cant**: Knowledge of the secret language and signs used by thieves and criminals.

**Guild Building**: High-level thieves can establish thieves' guilds and criminal organizations.

## Skills

Thieves have percentage-based skills that improve as they gain levels. These skills include:
- Pick Locks
- Find and Remove Traps  
- Move Silently
- Hide in Shadows
- Climb Walls
- Hear Noise`,
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
        href: '/rules/chapter-1-characters',
        title: 'Characters'
      }}
      nextChapter={{
        href: '/rules/chapter-3-equipment',
        title: 'Equipment'
      }}
    />
  );
} 