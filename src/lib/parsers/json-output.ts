/**
 * ACKS II JSON Output Generation and Validation
 * 
 * This module provides functions to generate validated JSON output files
 * for all ACKS II content types with comprehensive data integrity checks.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { 
  BaseContent, 
  Monster, 
  Spell, 
  CharacterClass, 
  Equipment, 
  Rule, 
  Proficiency,
  ContentType 
} from '../types/content';

/**
 * Validation error details
 */
export interface ValidationError {
  /** Field path where the error occurred */
  field: string;
  
  /** Error message describing the issue */
  message: string;
  
  /** Severity level of the error */
  severity: 'error' | 'warning' | 'info';
  
  /** Expected value or format */
  expected?: string;
  
  /** Actual value that caused the error */
  actual?: unknown;
  
  /** Suggested fix for the error */
  suggestion?: string;
}

/**
 * Validation result for a content item
 */
export interface ValidationResult {
  /** Whether the content passed validation */
  isValid: boolean;
  
  /** List of validation errors found */
  errors: ValidationError[];
  
  /** List of validation warnings */
  warnings: ValidationError[];
  
  /** Content item that was validated */
  content: BaseContent;
  
  /** Validation timestamp */
  validatedAt: Date;
  
  /** Schema version used for validation */
  schemaVersion: string;
}

/**
 * Output generation options
 */
export interface OutputOptions {
  /** Whether to pretty-print the JSON */
  prettyPrint: boolean;
  
  /** Include validation metadata in output */
  includeValidation: boolean;
  
  /** Include processing timestamps */
  includeTimestamps: boolean;
  
  /** Output format type */
  format: 'single' | 'collection' | 'indexed';
  
  /** Version to include in output files */
  version: string;
  
  /** Whether to include cross-reference data */
  includeCrossReferences: boolean;
  
  /** Compression level (0-9, 0 = no compression) */
  compressionLevel: number;
}

/**
 * Generated output file metadata
 */
export interface OutputMetadata {
  /** File generation timestamp */
  generatedAt: Date;
  
  /** Content type of the file */
  contentType: ContentType;
  
  /** Number of items in the file */
  itemCount: number;
  
  /** File format version */
  formatVersion: string;
  
  /** Validation summary */
  validation: {
    totalItems: number;
    validItems: number;
    errorCount: number;
    warningCount: number;
  };
  
  /** Cross-reference statistics */
  crossReferences: {
    totalReferences: number;
    resolvedReferences: number;
    unresolvedReferences: string[];
  };
}

/**
 * Complete output file structure
 */
export interface OutputFile<T extends BaseContent = BaseContent> {
  /** File metadata */
  metadata: OutputMetadata;
  
  /** Content items */
  data: T[];
  
  /** Index for fast lookups (when format is 'indexed') */
  index?: Record<string, number>;
  
  /** Cross-reference mapping */
  crossReferences?: Record<string, string[]>;
  
  /** Validation results for each item */
  validationResults?: ValidationResult[];
}

/**
 * JSON Schema definitions for content validation
 */
export const CONTENT_SCHEMAS = {
  monster: {
    type: 'object',
    required: ['id', 'name', 'type', 'stats'],
    properties: {
      id: { type: 'string', pattern: '^[a-z0-9-]+$' },
      name: { type: 'string', minLength: 1, maxLength: 100 },
      type: { const: 'MONSTER' },
      stats: {
        type: 'object',
        required: ['armorClass', 'hitDice', 'hitPoints', 'movement'],
        properties: {
          armorClass: { type: 'number', minimum: 0, maximum: 20 },
          hitDice: { type: 'string', pattern: '^\\d+d\\d+(\\+\\d+)?$' },
          hitPoints: { type: 'number', minimum: 1, maximum: 1000 },
          movement: { type: 'number', minimum: 0, maximum: 500 },
          morale: { type: 'number', minimum: 2, maximum: 12 },
          alignment: { 
            type: 'string', 
            enum: ['Lawful', 'Neutral', 'Chaotic'] 
          }
        }
      },
      description: { type: 'string', minLength: 10 },
      abilities: {
        type: 'array',
        items: { type: 'string' }
      },
      attacks: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'damage'],
          properties: {
            name: { type: 'string' },
            damage: { type: 'string', pattern: '^\\d+d\\d+(\\+\\d+)?$' },
            range: { type: 'string' },
            special: { type: 'string' }
          }
        }
      }
    }
  },
  
  spell: {
    type: 'object',
    required: ['id', 'name', 'type', 'level', 'range', 'duration'],
    properties: {
      id: { type: 'string', pattern: '^[a-z0-9-]+$' },
      name: { type: 'string', minLength: 1, maxLength: 100 },
      type: { const: 'SPELL' },
      level: { type: 'number', minimum: 1, maximum: 9 },
      range: { type: 'string' },
      duration: { type: 'string' },
      description: { type: 'string', minLength: 10 },
      school: { 
        type: 'string',
        enum: ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
               'Evocation', 'Illusion', 'Necromancy', 'Transmutation']
      },
      components: {
        type: 'object',
        properties: {
          verbal: { type: 'boolean' },
          somatic: { type: 'boolean' },
          material: { type: 'string' }
        }
      }
    }
  },
  
  characterClass: {
    type: 'object',
    required: ['id', 'name', 'type', 'hitDie', 'requirements'],
    properties: {
      id: { type: 'string', pattern: '^[a-z0-9-]+$' },
      name: { type: 'string', minLength: 1, maxLength: 50 },
      type: { const: 'CLASS' },
      hitDie: { type: 'string', pattern: '^d\\d+$' },
      requirements: {
        type: 'object',
        properties: {
          strength: { type: 'number', minimum: 3, maximum: 18 },
          intelligence: { type: 'number', minimum: 3, maximum: 18 },
          wisdom: { type: 'number', minimum: 3, maximum: 18 },
          dexterity: { type: 'number', minimum: 3, maximum: 18 },
          constitution: { type: 'number', minimum: 3, maximum: 18 },
          charisma: { type: 'number', minimum: 3, maximum: 18 }
        }
      },
      description: { type: 'string', minLength: 10 },
      abilities: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  
  equipment: {
    type: 'object',
    required: ['id', 'name', 'type', 'cost'],
    properties: {
      id: { type: 'string', pattern: '^[a-z0-9-]+$' },
      name: { type: 'string', minLength: 1, maxLength: 100 },
      type: { const: 'EQUIPMENT' },
      cost: { type: 'number', minimum: 0 },
      weight: { type: 'number', minimum: 0 },
      description: { type: 'string', minLength: 5 },
      category: {
        type: 'string',
        enum: ['Weapon', 'Armor', 'Shield', 'Gear', 'Tool', 'Treasure']
      },
      properties: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
} as const;

/**
 * Validate a content item against its schema
 * 
 * @param content - Content item to validate
 * @returns Validation result with errors and warnings
 */
export function validateContent(content: BaseContent): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  // Basic structure validation
  if (!content.id) {
    errors.push({
      field: 'id',
      message: 'Content ID is required',
      severity: 'error',
      expected: 'string',
      actual: content.id
    });
  } else if (!/^[a-z0-9-]+$/.test(content.id)) {
    errors.push({
      field: 'id',
      message: 'Content ID must contain only lowercase letters, numbers, and hyphens',
      severity: 'error',
      expected: 'lowercase alphanumeric with hyphens',
      actual: content.id,
      suggestion: 'Use kebab-case format (e.g., "fire-giant")'
    });
  }
  
  if (!content.title || content.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Content title is required',
      severity: 'error',
      expected: 'non-empty string',
      actual: content.title
    });
  }
  
  if (!content.contentType) {
    errors.push({
      field: 'contentType',
      message: 'Content type is required',
      severity: 'error',
      expected: 'ContentType enum value',
      actual: content.contentType
    });
  }
  
  // Type-specific validation
  switch (content.contentType) {
    case ContentType.MONSTER:
      validateMonster(content as Monster, errors, warnings);
      break;
    case ContentType.SPELL:
      validateSpell(content as Spell, errors, warnings);
      break;
    case ContentType.CLASS:
      validateCharacterClass(content as CharacterClass, errors, warnings);
      break;
    case ContentType.EQUIPMENT:
      validateEquipment(content as Equipment, errors, warnings);
      break;
    case ContentType.RULE:
    case ContentType.DOMAIN_RULE:
    case ContentType.JUDGE_TOOL:
      validateRule(content as Rule, errors, warnings);
      break;
    case ContentType.PROFICIENCY:
      validateProficiency(content as Proficiency, errors, warnings);
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    content,
    validatedAt: new Date(),
    schemaVersion: '1.0.0'
  };
}

/**
 * Validate monster-specific fields
 */
function validateMonster(monster: Monster, errors: ValidationError[], warnings: ValidationError[]): void {
  if (!monster.primaryCharacteristics) {
    errors.push({
      field: 'primaryCharacteristics',
      message: 'Monster primary characteristics are required',
      severity: 'error'
    });
    return;
  }
  
  const { primaryCharacteristics } = monster;
  
  // Armor Class validation
  if (typeof primaryCharacteristics.armorClass !== 'number' || primaryCharacteristics.armorClass < 0 || primaryCharacteristics.armorClass > 20) {
    errors.push({
      field: 'primaryCharacteristics.armorClass',
      message: 'Armor Class must be a number between 0 and 20',
      severity: 'error',
      expected: '0-20',
      actual: primaryCharacteristics.armorClass
    });
  }
  
  // Hit Dice validation
  if (!primaryCharacteristics.hitDice || !/^\d+d\d+(\+\d+)?$/.test(primaryCharacteristics.hitDice)) {
    errors.push({
      field: 'primaryCharacteristics.hitDice',
      message: 'Hit Dice must be in format "XdY" or "XdY+Z"',
      severity: 'error',
      expected: 'XdY or XdY+Z format',
      actual: primaryCharacteristics.hitDice,
      suggestion: 'Examples: "2d8", "3d6+3"'
    });
  }
  
  // Attacks validation
  if (!primaryCharacteristics.attacks) {
    warnings.push({
      field: 'primaryCharacteristics.attacks',
      message: 'Monster attacks should be specified',
      severity: 'warning'
    });
  }
  
  // Damage validation
  if (!primaryCharacteristics.damage) {
    warnings.push({
      field: 'primaryCharacteristics.damage',
      message: 'Monster damage should be specified',
      severity: 'warning'
    });
  }
  
  // Morale validation (optional but if present, must be valid)
  if (primaryCharacteristics.morale && !/^[0-9+-]+$/.test(primaryCharacteristics.morale)) {
    warnings.push({
      field: 'primaryCharacteristics.morale',
      message: 'Morale should be in valid format',
      severity: 'warning',
      actual: primaryCharacteristics.morale
    });
  }
  
  // Encounter setup validation
  if (!monster.encounterSetup) {
    warnings.push({
      field: 'encounterSetup',
      message: 'Monster encounter setup should be provided',
      severity: 'warning'
    });
  } else {
    // Alignment validation
    if (!monster.encounterSetup.alignment) {
      warnings.push({
        field: 'encounterSetup.alignment',
        message: 'Monster alignment should be specified',
        severity: 'warning'
      });
    }
    
    // XP validation
    if (typeof monster.encounterSetup.xp !== 'number' || monster.encounterSetup.xp < 0) {
      errors.push({
        field: 'encounterSetup.xp',
        message: 'Experience points must be a non-negative number',
        severity: 'error',
        expected: 'non-negative number',
        actual: monster.encounterSetup.xp
      });
    }
  }
}

/**
 * Validate spell-specific fields
 */
function validateSpell(spell: Spell, errors: ValidationError[], warnings: ValidationError[]): void {
  // Level validation
  if (typeof spell.level !== 'number' || spell.level < 1 || spell.level > 9) {
    errors.push({
      field: 'level',
      message: 'Spell level must be between 1 and 9',
      severity: 'error',
      expected: '1-9',
      actual: spell.level
    });
  }
  
  // Range validation
  if (!spell.range) {
    errors.push({
      field: 'range',
      message: 'Spell range is required',
      severity: 'error'
    });
  }
  
  // Duration validation
  if (!spell.duration) {
    errors.push({
      field: 'duration',
      message: 'Spell duration is required',
      severity: 'error'
    });
  }
  
  // School validation (optional but if present, must be valid)
  const validSchools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
                       'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  if (spell.school && !validSchools.includes(spell.school)) {
    warnings.push({
      field: 'school',
      message: 'Spell school should be one of the standard schools',
      severity: 'warning',
      expected: validSchools.join(', '),
      actual: spell.school
    });
  }
}

/**
 * Validate character class-specific fields
 */
function validateCharacterClass(characterClass: CharacterClass, errors: ValidationError[], warnings: ValidationError[]): void {
  // Hit Dice validation
  if (!characterClass.hitDice || !/^d\d+$/.test(characterClass.hitDice)) {
    errors.push({
      field: 'hitDice',
      message: 'Hit Dice must be in format "dX"',
      severity: 'error',
      expected: 'dX format',
      actual: characterClass.hitDice,
      suggestion: 'Examples: "d6", "d8", "d10"'
    });
  }
  
  // Requirements validation
  if (!characterClass.requirements || characterClass.requirements.trim().length === 0) {
    warnings.push({
      field: 'requirements',
      message: 'Character class should have ability score requirements specified',
      severity: 'warning'
    });
  }
}

/**
 * Validate equipment-specific fields
 */
function validateEquipment(equipment: Equipment, errors: ValidationError[], warnings: ValidationError[]): void {
  // Cost validation
  if (typeof equipment.cost !== 'number' || equipment.cost < 0) {
    errors.push({
      field: 'cost',
      message: 'Equipment cost must be a non-negative number',
      severity: 'error',
      expected: 'non-negative number',
      actual: equipment.cost
    });
  }
  
  // Weight validation (optional but if present, must be valid)
  if (equipment.weight !== undefined && (typeof equipment.weight !== 'number' || equipment.weight < 0)) {
    warnings.push({
      field: 'weight',
      message: 'Equipment weight should be a non-negative number',
      severity: 'warning',
      expected: 'non-negative number',
      actual: equipment.weight
    });
  }
  
  // Category validation
  const validCategories = ['Weapon', 'Armor', 'Shield', 'Gear', 'Tool', 'Treasure'];
  if (equipment.category && !validCategories.includes(equipment.category)) {
    warnings.push({
      field: 'category',
      message: 'Equipment category should be one of the standard categories',
      severity: 'warning',
      expected: validCategories.join(', '),
      actual: equipment.category
    });
  }
}

/**
 * Validate rule-specific fields
 */
function validateRule(rule: Rule, errors: ValidationError[], warnings: ValidationError[]): void {
  // Description validation
  if (!rule.description || rule.description.trim().length < 10) {
    warnings.push({
      field: 'description',
      message: 'Rule description should be at least 10 characters long',
      severity: 'warning',
      expected: 'minimum 10 characters',
      actual: rule.description?.length || 0
    });
  }
}

/**
 * Validate proficiency-specific fields
 */
function validateProficiency(proficiency: Proficiency, errors: ValidationError[], warnings: ValidationError[]): void {
  // Description validation
  if (!proficiency.description || proficiency.description.trim().length < 5) {
    warnings.push({
      field: 'description',
      message: 'Proficiency description should be at least 5 characters long',
      severity: 'warning',
      expected: 'minimum 5 characters',
      actual: proficiency.description?.length || 0
    });
  }
}

/**
 * Generate JSON output for a collection of content items
 * 
 * @param items - Content items to include in output
 * @param contentType - Type of content being output
 * @param options - Output generation options
 * @returns Generated output file structure
 */
export function generateJsonOutput<T extends BaseContent>(
  items: T[],
  contentType: ContentType,
  options: Partial<OutputOptions> = {}
): OutputFile<T> {
  const opts: OutputOptions = {
    prettyPrint: true,
    includeValidation: true,
    includeTimestamps: true,
    format: 'collection',
    version: '1.0.0',
    includeCrossReferences: true,
    compressionLevel: 0,
    ...options
  };
  
  // Validate all items
  const validationResults = items.map(item => validateContent(item));
  const validItems = validationResults.filter(result => result.isValid).length;
  const totalErrors = validationResults.reduce((sum, result) => sum + result.errors.length, 0);
  const totalWarnings = validationResults.reduce((sum, result) => sum + result.warnings.length, 0);
  
  // Extract cross-references
  const crossReferences: Record<string, string[]> = {};
  let totalReferences = 0;
  let resolvedReferences = 0;
  const unresolvedReferences: string[] = [];
  
  if (opts.includeCrossReferences) {
    items.forEach(item => {
      const refs = extractCrossReferences(item);
      if (refs.length > 0) {
        crossReferences[item.id] = refs;
        totalReferences += refs.length;
        
        // Check if references can be resolved within the current dataset
        refs.forEach(ref => {
          const resolved = items.some(otherItem => 
            otherItem.id === ref || 
            otherItem.title.toLowerCase().replace(/\s+/g, '-') === ref
          );
          if (resolved) {
            resolvedReferences++;
          } else {
            unresolvedReferences.push(ref);
          }
        });
      }
    });
  }
  
  // Create index for fast lookups
  const index: Record<string, number> = {};
  if (opts.format === 'indexed') {
    items.forEach((item, idx) => {
      index[item.id] = idx;
      // Also index by title (normalized)
      const normalizedTitle = item.title.toLowerCase().replace(/\s+/g, '-');
      if (normalizedTitle !== item.id) {
        index[normalizedTitle] = idx;
      }
    });
  }
  
  // Build metadata
  const metadata: OutputMetadata = {
    generatedAt: new Date(),
    contentType,
    itemCount: items.length,
    formatVersion: opts.version,
    validation: {
      totalItems: items.length,
      validItems,
      errorCount: totalErrors,
      warningCount: totalWarnings
    },
    crossReferences: {
      totalReferences,
      resolvedReferences,
      unresolvedReferences: [...new Set(unresolvedReferences)] // Remove duplicates
    }
  };
  
  // Build output file
  const outputFile: OutputFile<T> = {
    metadata,
    data: items
  };
  
  if (opts.format === 'indexed') {
    outputFile.index = index;
  }
  
  if (opts.includeCrossReferences && Object.keys(crossReferences).length > 0) {
    outputFile.crossReferences = crossReferences;
  }
  
  if (opts.includeValidation) {
    outputFile.validationResults = validationResults;
  }
  
  return outputFile;
}

/**
 * Extract cross-references from content item
 * 
 * @param content - Content item to analyze
 * @returns Array of referenced content IDs
 */
function extractCrossReferences(content: BaseContent): string[] {
  const references: string[] = [];
  const text = JSON.stringify(content).toLowerCase();
  
  // Common reference patterns
  const patterns = [
    /\b([a-z]+-[a-z-]+)\b/g, // kebab-case IDs
    /\b(spell|monster|class|equipment):\s*([a-z\s]+)/g, // Explicit references
    /see\s+([a-z\s]+)/g, // "See X" references
    /as\s+described\s+in\s+([a-z\s]+)/g // "As described in X" references
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const ref = match[1] || match[2];
      if (ref && ref.length > 2 && !references.includes(ref)) {
        references.push(ref.trim());
      }
    }
  });
  
  return references;
}

/**
 * Serialize output file to JSON string
 * 
 * @param outputFile - Output file to serialize
 * @param prettyPrint - Whether to format JSON for readability
 * @returns JSON string representation
 */
export function serializeOutput(outputFile: OutputFile, prettyPrint: boolean = true): string {
  if (prettyPrint) {
    return JSON.stringify(outputFile, null, 2);
  }
  return JSON.stringify(outputFile);
}

/**
 * Create multiple output files for different content types
 * 
 * @param contentByType - Content items grouped by type
 * @param options - Output generation options
 * @returns Map of content type to output file
 */
export function generateMultipleOutputs(
  contentByType: Map<ContentType, BaseContent[]>,
  options: Partial<OutputOptions> = {}
): Map<ContentType, OutputFile> {
  const outputs = new Map<ContentType, OutputFile>();
  
  contentByType.forEach((items, contentType) => {
    const outputFile = generateJsonOutput(items, contentType, options);
    outputs.set(contentType, outputFile);
  });
  
  return outputs;
}

/**
 * Merge related content items (e.g., monsters with their abilities)
 * 
 * @param primaryItems - Main content items
 * @param relatedItems - Related content to merge
 * @param relationshipField - Field name to use for merged content
 * @returns Primary items with related content merged
 */
export function mergeRelatedContent<T extends BaseContent, R extends BaseContent>(
  primaryItems: T[],
  relatedItems: R[],
  relationshipField: string
): T[] {
  return primaryItems.map(item => {
    const related = relatedItems.filter(relatedItem => 
      relatedItem.title.toLowerCase().includes(item.title.toLowerCase()) ||
      item.description?.toLowerCase().includes(relatedItem.title.toLowerCase())
    );
    
    if (related.length > 0) {
      return {
        ...item,
        [relationshipField]: related
      };
    }
    
    return item;
  });
}

/**
 * Generate validation summary report
 * 
 * @param validationResults - Results from validating multiple items
 * @returns Summary report of validation issues
 */
export function generateValidationSummary(validationResults: ValidationResult[]): {
  summary: {
    totalItems: number;
    validItems: number;
    invalidItems: number;
    totalErrors: number;
    totalWarnings: number;
  };
  errorsByField: Record<string, number>;
  commonIssues: Array<{ message: string; count: number; severity: string }>;
} {
  const summary = {
    totalItems: validationResults.length,
    validItems: validationResults.filter(r => r.isValid).length,
    invalidItems: validationResults.filter(r => !r.isValid).length,
    totalErrors: validationResults.reduce((sum, r) => sum + r.errors.length, 0),
    totalWarnings: validationResults.reduce((sum, r) => sum + r.warnings.length, 0)
  };
  
  const errorsByField: Record<string, number> = {};
  const issueMessages: Record<string, { count: number; severity: string }> = {};
  
  validationResults.forEach(result => {
    [...result.errors, ...result.warnings].forEach(issue => {
      // Count by field
      errorsByField[issue.field] = (errorsByField[issue.field] || 0) + 1;
      
      // Count by message
      if (!issueMessages[issue.message]) {
        issueMessages[issue.message] = { count: 0, severity: issue.severity };
      }
      issueMessages[issue.message].count++;
    });
  });
  
  const commonIssues = Object.entries(issueMessages)
    .map(([message, data]) => ({ message, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 most common issues
  
  return {
    summary,
    errorsByField,
    commonIssues
  };
} 