/**
 * ACKS II Equipment Parser - Placeholder
 */

import { Equipment, ContentType, EquipmentCategory } from '../types/content';
import { ParsingContext } from './types';

export function parseEquipment(
  _markdown: string,
  baseContent: Partial<Equipment>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext
): Equipment | undefined {
  // TODO: Implement in future subtask
  return {
    id: baseContent.id || 'placeholder-equipment',
    title: baseContent.title || 'Placeholder Equipment',
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category!,
    contentType: ContentType.EQUIPMENT,
    equipmentCategory: EquipmentCategory.GEAR,
    cost: 1,
    weight: 1,
    description: 'Placeholder equipment description'
  };
} 