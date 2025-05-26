/**
 * ACKS II Proficiency Parser - Placeholder
 */

import { Proficiency, ContentType, ProficiencyCategory } from '../types/content';
import { ParsingContext } from './types';

export function parseProficiency(
  _markdown: string,
  baseContent: Partial<Proficiency>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext
): Proficiency | undefined {
  // TODO: Implement in future subtask
  return {
    id: baseContent.id || 'placeholder-proficiency',
    title: baseContent.title || 'Placeholder Proficiency',
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category!,
    contentType: ContentType.PROFICIENCY,
    proficiencyCategory: ProficiencyCategory.GENERAL,
    effects: 'Placeholder effects',
    description: 'Placeholder proficiency description'
  };
} 