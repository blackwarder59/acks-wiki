/**
 * ACKS II Rule Parser - Placeholder
 */

import { Rule, ContentType, RuleCategory } from '../types/content';
import { ParsingContext } from './types';

export function parseRule(
  _markdown: string,
  baseContent: Partial<Rule>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext
): Rule | undefined {
  // TODO: Implement in future subtask
  return {
    id: baseContent.id || 'placeholder-rule',
    title: baseContent.title || 'Placeholder Rule',
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category!,
    contentType: ContentType.RULE,
    ruleCategory: RuleCategory.COMBAT,
    ruleText: 'Placeholder rule text',
    description: 'Placeholder rule description'
  };
} 