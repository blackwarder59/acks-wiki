/**
 * ACKS II Spell Parser - Placeholder
 */

import { Spell, ContentType, MagicType } from '../types/content';
import { ParsingContext } from './types';

export function parseSpell(
  _markdown: string,
  baseContent: Partial<Spell>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext
): Spell | undefined {
  // TODO: Implement in future subtask
  return {
    id: baseContent.id || 'placeholder-spell',
    title: baseContent.title || 'Placeholder Spell',
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category!,
    contentType: ContentType.SPELL,
    magicType: MagicType.ARCANE,
    level: 1,
    spellType: 'placeholder',
    range: 'touch',
    duration: 'instantaneous',
    description: 'Placeholder spell description'
  };
} 