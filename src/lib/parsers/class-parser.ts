/**
 * ACKS II Class Parser - Placeholder
 */

import { CharacterClass, ContentType } from '../types/content';
import { ParsingContext } from './types';

export function parseClass(
  markdown: string,
  baseContent: Partial<CharacterClass>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext
): CharacterClass | undefined {
  // TODO: Implement in future subtask
  return {
    id: baseContent.id || 'placeholder-class',
    title: baseContent.title || 'Placeholder Class',
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category!,
    contentType: ContentType.CLASS,
    keyAttribute: 'STR',
    requirements: 'None',
    hitDice: '1d8',
    maximumLevel: 14,
    levelProgression: [],
    combatProgression: [],
    combatCharacteristics: {
      weaponProficiencies: 'All',
      armorProficiencies: 'All',
      fightingStyles: 'All',
      progressionNotes: 'Standard'
    },
    startingPowers: [],
    additionalPowers: [],
    proficiencyProgression: {
      starting: 'Standard',
      classProficiencies: 'Standard',
      generalProficiencies: 'Standard'
    },
    classProficiencies: [],
    templates: [],
    description: 'Placeholder class description'
  };
} 