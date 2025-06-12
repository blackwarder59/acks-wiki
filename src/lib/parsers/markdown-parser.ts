/**
 * ACKS II Main Markdown Parser
 * 
 * This module provides the main parsing function that coordinates
 * content type detection and delegates to specialized parsers.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { AnyContent, ContentType, ContentCategory, Monster, Spell, CharacterClass } from '../types/content';
import { ParseResult, ParsingOptions } from './types';
import { detectContentType } from './content-detector';
import { parseMonster } from './monster-parser';
import { parseSpell } from './spell-parser';
import { parseClass } from './class-parser';
import { parseEquipment } from './equipment-parser';
import { parseRule } from './rule-parser';
import { parseProficiency } from './proficiency-parser';
import { createParsingContext, addParsingError } from './parsing-utils';
import { ErrorSeverity } from '../types/content';
import { ParsingContext } from './types';

/**
 * Parse markdown content into structured ACKS II content
 * 
 * @param markdown - Raw markdown content
 * @param sourceFile - Source file path for error reporting
 * @param options - Parsing options
 * @returns Parse result with content or errors
 */
export function parseMarkdown(
  markdown: string,
  sourceFile: string,
  options: ParsingOptions = {}
): ParseResult {
  const startTime = Date.now();
  const context = createParsingContext(sourceFile, options);
  
  try {
    // Detect content type if not forced
    let contentType: ContentType;
    if (options.forceContentType) {
      contentType = options.forceContentType;
    } else {
      const detection = detectContentType(markdown);
      contentType = detection.contentType;
      
      if (detection.confidence < 0.5) {
        addParsingError(
          context,
          `Low confidence content detection: ${detection.confidence.toFixed(2)} for ${contentType}`,
          ErrorSeverity.WARNING
        );
      }
      
      if (options.verbose) {
        console.log(`Detected content type: ${contentType} (confidence: ${detection.confidence.toFixed(2)})`);
        console.log(`Indicators: ${detection.indicators.join(', ')}`);
      }
    }
    
    // Determine content category from source file path
    const category = determineContentCategory(sourceFile);
    
    // Parse using appropriate specialized parser
    const content = parseByContentType(markdown, contentType, category, sourceFile, context);
    
    const processingTime = Date.now() - startTime;
    
    return {
      content,
      errors: context.errors,
      warnings: context.warnings,
      sourceFile,
      success: context.errors.length === 0,
      processingTime
    };
    
  } catch (error) {
    addParsingError(
      context,
      `Unexpected parsing error: ${error instanceof Error ? error.message : String(error)}`,
      ErrorSeverity.CRITICAL
    );
    
    return {
      errors: context.errors,
      warnings: context.warnings,
      sourceFile,
      success: false,
      processingTime: Date.now() - startTime
    };
  }
}

/**
 * Determine content category from source file path
 * 
 * @param sourceFile - Source file path
 * @returns Content category
 */
function determineContentCategory(sourceFile: string): ContentCategory {
  const normalizedPath = sourceFile.toLowerCase();
  
  if (normalizedPath.includes('monstrous_manual')) {
    return ContentCategory.MONSTROUS_MANUAL;
  } else if (normalizedPath.includes('judges_journal')) {
    return ContentCategory.JUDGES_JOURNAL;
  } else if (normalizedPath.includes('rulebook')) {
    return ContentCategory.RULEBOOK;
  }
  
  // Default to rulebook if unclear
  return ContentCategory.RULEBOOK;
}

/**
 * Parse content using the appropriate specialized parser
 * 
 * @param markdown - Raw markdown content
 * @param contentType - Detected content type
 * @param category - Content category
 * @param sourceFile - Source file path
 * @param context - Parsing context
 * @returns Parsed content
 */
function parseByContentType(
  markdown: string,
  contentType: ContentType,
  category: ContentCategory,
  sourceFile: string,
  context: ParsingContext
): AnyContent | undefined {
  
  const baseContent = {
    sourceFile,
    category,
    contentType,
    lastModified: new Date()
  };
  
  try {
    switch (contentType) {
      case ContentType.MONSTER:
        return parseMonster(markdown, { ...baseContent, contentType: ContentType.MONSTER }, context);
        
      case ContentType.SPELL:
        return parseSpell(markdown, { ...baseContent, contentType: ContentType.SPELL }, context);
        
      case ContentType.CLASS:
        return parseClass(markdown, { ...baseContent, contentType: ContentType.CLASS }, context);
        
      case ContentType.EQUIPMENT:
        return parseEquipment(markdown, { ...baseContent, contentType: ContentType.EQUIPMENT }, context);
        
      case ContentType.RULE:
      case ContentType.DOMAIN_RULE:
      case ContentType.JUDGE_TOOL:
        return parseRule(markdown, { ...baseContent, contentType: ContentType.RULE }, context);
        
      case ContentType.PROFICIENCY:
        return parseProficiency(markdown, { ...baseContent, contentType: ContentType.PROFICIENCY }, context);
        
      default:
        addParsingError(
          context,
          `Unsupported content type: ${contentType}`,
          ErrorSeverity.ERROR
        );
        return undefined;
    }
  } catch (error) {
    addParsingError(
      context,
      `Error in ${contentType} parser: ${error instanceof Error ? error.message : String(error)}`,
      ErrorSeverity.ERROR
    );
    return undefined;
  }
}

/**
 * Parse multiple markdown files in batch
 * 
 * @param files - Array of {content, sourceFile} objects
 * @param options - Parsing options
 * @returns Array of parse results
 */
export function parseMarkdownBatch(
  files: Array<{ content: string; sourceFile: string }>,
  options: ParsingOptions = {}
): ParseResult[] {
  const results: ParseResult[] = [];
  
  for (const file of files) {
    if (options.verbose) {
      console.log(`Parsing ${file.sourceFile}...`);
    }
    
    const result = parseMarkdown(file.content, file.sourceFile, options);
    results.push(result);
    
    // Stop on critical errors if not continuing on error
    if (!options.continueOnError && result.errors.some(e => e.severity === ErrorSeverity.CRITICAL)) {
      break;
    }
  }
  
  return results;
}

/**
 * Validate parsed content against expected structure
 * 
 * @param content - Parsed content to validate
 * @returns Validation result
 */
export function validateParsedContent(content: AnyContent): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Basic validation
  if (!content.id || content.id.trim() === '') {
    errors.push('Content ID is required');
  }
  
  if (!content.title || content.title.trim() === '') {
    errors.push('Content title is required');
  }
  
  if (!content.sourceFile || content.sourceFile.trim() === '') {
    errors.push('Source file is required');
  }
  
  // Content-specific validation
  switch (content.contentType) {
    case ContentType.MONSTER:
      validateMonsterContent(content as Monster, errors, warnings);
      break;
      
    case ContentType.SPELL:
      validateSpellContent(content as Spell, errors, warnings);
      break;
      
    case ContentType.CLASS:
      validateClassContent(content as CharacterClass, errors, warnings);
      break;
      
    // Add more specific validations as needed
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate monster-specific content
 */
function validateMonsterContent(
  content: Monster, 
  errors: string[], 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _warnings: string[]
): void {
  if (!content.primaryCharacteristics) {
    errors.push('Monster must have primary characteristics');
  } else {
    if (!content.primaryCharacteristics.hitDice) {
      errors.push('Monster must have hit dice');
    }
    if (typeof content.primaryCharacteristics.armorClass !== 'number') {
      errors.push('Monster must have numeric armor class');
    }
  }
  
  if (!content.encounterSetup) {
    errors.push('Monster must have encounter setup');
  } else {
    if (typeof content.encounterSetup.xp !== 'number') {
      errors.push('Monster must have numeric XP value');
    }
  }
}

/**
 * Validate spell-specific content
 */
function validateSpellContent(content: Spell, errors: string[], warnings: string[]): void {
  if (typeof content.level !== 'number' || content.level < 1 || content.level > 6) {
    errors.push('Spell must have valid level (1-6)');
  }
  
  if (!content.magicType) {
    errors.push('Spell must have magic type (Arcane/Divine)');
  }
  
  if (!content.range || !content.duration) {
    warnings.push('Spell should have range and duration specified');
  }
}

/**
 * Validate class-specific content
 */
function validateClassContent(
  content: CharacterClass, 
  errors: string[], 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _warnings: string[]
): void {
  if (!content.hitDice) {
    errors.push('Class must have hit dice specified');
  }
  
  if (typeof content.maximumLevel !== 'number' || content.maximumLevel < 1) {
    errors.push('Class must have valid maximum level');
  }
  
  if (!content.levelProgression || !Array.isArray(content.levelProgression)) {
    errors.push('Class must have level progression table');
  }
} 