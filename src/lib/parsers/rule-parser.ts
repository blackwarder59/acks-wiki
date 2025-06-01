/**
 * ACKS II Rule Parser - Placeholder
 */

import { Rule, ContentType, RuleCategory, ContentCategory } from '../types/content';
import { ParsingContext } from './types';
import { marked } from 'marked'; // Assuming 'marked' is a project dependency

/**
 * Generates a slug from a string.
 * @param text The text to slugify.
 * @returns A URL-friendly slug.
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

/**
 * Parses a Markdown string representing a single rule (expected to start with an H3 heading)
 * into a Rule object.
 * @param markdown The Markdown content for the rule.
 * @param baseContent Partial Rule object containing pre-filled data like sourceFile, category.
 * @param _context The parsing context (currently unused but available for future enhancements).
 * @returns A populated Rule object or undefined if parsing fails.
 */
export function parseRule(
  markdown: string,
  baseContent: Partial<Rule>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: ParsingContext 
): Rule | undefined {
  const tokens = marked.lexer(markdown);
  
  let title = baseContent.title || 'Untitled Rule';
  let id = baseContent.id || slugify(title);
  const ruleTextParts: string[] = [];
  const keywords: string[] = [];

  let firstHeadingProcessed = false;

  // Helper to process inline tokens for text and keywords
  const processInlineTokens = (inlineTokens: any[], targetArray: string[]) => {
    let currentText = '';
    for (const inlineToken of inlineTokens) {
      if (inlineToken.type === 'strong' || inlineToken.type === 'em_strong') {
        // For 'strong' and 'em_strong', 'tokens' is an array of further inline tokens
        // We need to recurse or extract text from them. For simplicity, extract raw text.
        // marked.parser can convert token to html, or token.text for simple text.
        // For keywords, we just want the text content.
        const keywordText = inlineToken.tokens ? inlineToken.tokens.map((t: any) => t.raw || '').join('') : (inlineToken.text || '');
        if (keywordText && !keywords.includes(keywordText)) {
          keywords.push(keywordText);
        }
        currentText += inlineToken.raw; // Add raw markdown for strong/em
      } else if (inlineToken.type === 'text') {
        currentText += inlineToken.text;
      } else {
        // For other inline types (like 'link', 'image', 'codespan', 'br', 'del', 'em'),
        // add their raw representation to maintain Markdown structure.
        currentText += inlineToken.raw || ''; 
      }
    }
    targetArray.push(currentText.trim());
  };

  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 3 && !firstHeadingProcessed) {
      title = token.text;
      id = slugify(token.text);
      firstHeadingProcessed = true; // Process only the first H3 as the main title for this snippet
    } else if (token.type === 'paragraph') {
      if (token.tokens && token.tokens.length > 0) {
        processInlineTokens(token.tokens, ruleTextParts);
      } else {
        ruleTextParts.push(token.text.trim());
      }
    } else if (token.type === 'list') {
      let listMarkdown = '';
      if (token.ordered) {
        token.items.forEach((item: any, index: number) => {
          listMarkdown += `${index + 1}. `;
          // item.tokens contains the full tokens for the list item text.
          // item.text is a plain text representation.
          // We need to process item.tokens for inline formatting like bold.
          let listItemText = '';
          for (const listItemToken of item.tokens) { // item.tokens is an array of 'paragraph' usually
             if(listItemToken.type === 'text' && 'tokens' in listItemToken && listItemToken.tokens) { // list items often have a nested 'text' token which is actually a paragraph-like structure
                processInlineTokens(listItemToken.tokens, ruleTextParts); // This will push to ruleTextParts directly
                // We capture the raw for the list construction below, or reconstruct from ruleTextParts?
                // For now, let's reconstruct from raw for simplicity of list formatting.
                listItemText += listItemToken.raw;
             } else if (listItemToken.type === 'text') {
                listItemText += listItemToken.text;
             } else {
                listItemText += listItemToken.raw;
             }
          }
          // To avoid duplicating text pushed by processInlineTokens from inside the list item,
          // we will reconstruct the list structure at the end from ruleTextParts for lists.
          // For now, let's just capture the raw text of the list item for simple ruleText.
          // This part needs refinement for accurate list Markdown reconstruction.
          // ruleTextParts.push(`${index + 1}. ${item.text}`); // Simplified
        });
        // A better way for lists would be to reconstruct their markdown structure
        // or convert them to HTML and add to a rich text field.
        // For now, using token.raw for the whole list.
        ruleTextParts.push(token.raw.trim());


      } else { // Unordered list
         // Similar logic for unordered, using token.raw for now
        ruleTextParts.push(token.raw.trim());
      }
    } else if (token.type === 'space') {
      // Add a space if it's not excessive, to maintain paragraph separation
      if (ruleTextParts.length > 0 && !ruleTextParts[ruleTextParts.length -1].endsWith('\n\n')) {
        // ruleTextParts.push('\n'); // Using raw for now
      }
    } else {
      // For other block-level tokens (code, blockquote, html, table, hr), add their raw representation.
      // Table parsing will be a separate, more complex step.
      if (token.raw) {
        ruleTextParts.push(token.raw.trim());
      }
    }
  }
  
  // Basic placeholder for ruleCategory, can be improved later
  const inferredRuleCategory = baseContent.sourceFile?.includes('combat') ? RuleCategory.COMBAT : RuleCategory.EXPLORATION;

  return {
    id: baseContent.id || id,
    title: title,
    sourceFile: baseContent.sourceFile || 'unknown',
    category: baseContent.category || ContentCategory.RULEBOOK,
    contentType: ContentType.RULE,
    ruleCategory: baseContent.ruleCategory || inferredRuleCategory, 
    ruleText: ruleTextParts.join('\n\n'), // Join parts with double newline for paragraph breaks
    // tables: [], // Placeholder for future table parsing
    // images: [], // Placeholder for future image parsing
    // subRules: [], // Placeholder for future sub-rule parsing
    description: baseContent.description || `Rule: ${title}` // Basic description
  };
} 