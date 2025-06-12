/**
 * Cross-Reference Parser for ACKS II Wiki
 * 
 * This module provides functionality to parse text content and identify
 * cross-references to other content items (spells, monsters, classes, etc.).
 * 
 * Features:
 * - Pattern-based reference detection
 * - Content type inference
 * - Context extraction
 * - Reference validation
 * - Fuzzy matching for partial references
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { ContentType, ReferenceType, type CrossReference, type AnyContent } from '../types/content';

/**
 * Reference pattern configuration
 */
export interface ReferencePattern {
  /** Regex pattern to match references */
  pattern: RegExp;
  /** Content type this pattern identifies */
  contentType: ContentType;
  /** Reference type (mentions, requires, etc.) */
  referenceType: ReferenceType;
  /** Priority for pattern matching (higher = checked first) */
  priority: number;
  /** Whether pattern requires exact case matching */
  caseSensitive?: boolean;
  /** Context words that strengthen the match */
  contextWords?: string[];
}

/**
 * Parsed reference result
 */
export interface ParsedReference {
  /** Original matched text */
  originalText: string;
  /** Normalized reference text */
  normalizedText: string;
  /** Inferred content type */
  contentType: ContentType;
  /** Reference type */
  referenceType: ReferenceType;
  /** Position in source text */
  position: {
    start: number;
    end: number;
  };
  /** Surrounding context */
  context: string;
  /** Confidence score (0-1) */
  confidence: number;
}

/**
 * Reference parser configuration
 */
export interface ReferenceParserConfig {
  /** Maximum context length to extract */
  maxContextLength: number;
  /** Minimum confidence threshold */
  minConfidence: number;
  /** Whether to enable fuzzy matching */
  enableFuzzyMatching: boolean;
  /** Custom reference patterns */
  customPatterns?: ReferencePattern[];
}

/**
 * Default reference patterns for ACKS II content
 */
const DEFAULT_PATTERNS: ReferencePattern[] = [
  // Spell references
  {
    pattern: /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s+spell\b/g,
    contentType: ContentType.SPELL,
    referenceType: ReferenceType.MENTIONS,
    priority: 10,
    contextWords: ['cast', 'casting', 'spell', 'magic', 'arcane', 'divine']
  },
  {
    pattern: /\bspell\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
    contentType: ContentType.SPELL,
    referenceType: ReferenceType.MENTIONS,
    priority: 9,
    contextWords: ['cast', 'casting', 'spell', 'magic']
  },
  {
    pattern: /\b(Cure Light Wounds|Magic Missile|Fireball|Lightning Bolt|Charm Person|Sleep|Web|Hold Person|Dispel Magic|Haste|Slow|Polymorph|Wall of Fire|Teleport|Disintegrate|Power Word Kill)\b/g,
    contentType: ContentType.SPELL,
    referenceType: ReferenceType.MENTIONS,
    priority: 15,
    caseSensitive: true
  },

  // Monster references
  {
    pattern: /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s+(?:monster|creature|beast|dragon|undead|demon|devil)\b/g,
    contentType: ContentType.MONSTER,
    referenceType: ReferenceType.MENTIONS,
    priority: 10,
    contextWords: ['encounter', 'combat', 'attack', 'damage', 'HD', 'hit dice']
  },
  {
    pattern: /\b(Orc|Goblin|Troll|Dragon|Skeleton|Zombie|Vampire|Lich|Beholder|Owlbear|Bulette|Manticore|Griffon|Pegasus|Unicorn)\b/g,
    contentType: ContentType.MONSTER,
    referenceType: ReferenceType.MENTIONS,
    priority: 15,
    caseSensitive: true
  },

  // Class references
  {
    pattern: /\b(Fighter|Cleric|Mage|Thief|Assassin|Bard|Bladedancer|Explorer|Dwarven Craftpriest|Dwarven Vaultguard|Elven Enchanter|Elven Ranger|Elven Spellsword|Gnomish Trickster|Halfling Burglar)\b/g,
    contentType: ContentType.CLASS,
    referenceType: ReferenceType.MENTIONS,
    priority: 15,
    caseSensitive: true,
    contextWords: ['class', 'level', 'character', 'proficiency', 'ability']
  },
  {
    pattern: /\b([A-Z][a-z]+)\s+class\b/g,
    contentType: ContentType.CLASS,
    referenceType: ReferenceType.MENTIONS,
    priority: 10,
    contextWords: ['character', 'level', 'proficiency']
  },

  // Equipment references
  {
    pattern: /\b(sword|axe|mace|bow|crossbow|armor|shield|helmet|gauntlets|boots)\s+(?:of\s+)?([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
    contentType: ContentType.EQUIPMENT,
    referenceType: ReferenceType.MENTIONS,
    priority: 8,
    contextWords: ['weapon', 'armor', 'equipment', 'gear', 'cost', 'weight']
  },
  {
    pattern: /\b(Plate Mail|Chain Mail|Leather Armor|Shield|Long Sword|Short Sword|Battle Axe|War Hammer|Long Bow|Short Bow|Crossbow)\b/g,
    contentType: ContentType.EQUIPMENT,
    referenceType: ReferenceType.MENTIONS,
    priority: 12,
    caseSensitive: true
  },

  // Proficiency references
  {
    pattern: /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s+proficiency\b/g,
    contentType: ContentType.PROFICIENCY,
    referenceType: ReferenceType.MENTIONS,
    priority: 10,
    contextWords: ['skill', 'ability', 'training', 'expertise']
  },
  {
    pattern: /\bproficiency\s+in\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
    contentType: ContentType.PROFICIENCY,
    referenceType: ReferenceType.MENTIONS,
    priority: 9
  },

  // Rule references
  {
    pattern: /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s+rules?\b/g,
    contentType: ContentType.RULE,
    referenceType: ReferenceType.RELATED,
    priority: 8,
    contextWords: ['rule', 'regulation', 'procedure', 'mechanic']
  },
  {
    pattern: /\bsee\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s+rules?\b/g,
    contentType: ContentType.RULE,
    referenceType: ReferenceType.RELATED,
    priority: 12
  },

  // Generic cross-references
  {
    pattern: /\bsee\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
    contentType: ContentType.RULE, // Default to rule for generic references
    referenceType: ReferenceType.RELATED,
    priority: 5
  },
  {
    pattern: /\bas\s+described\s+in\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
    contentType: ContentType.RULE,
    referenceType: ReferenceType.RELATED,
    priority: 7
  }
];

/**
 * Default parser configuration
 */
const DEFAULT_CONFIG: ReferenceParserConfig = {
  maxContextLength: 100,
  minConfidence: 0.6,
  enableFuzzyMatching: true,
  customPatterns: []
};

/**
 * Cross-Reference Parser Class
 */
export class ReferenceParser {
  private config: ReferenceParserConfig;
  private patterns: ReferencePattern[];
  private contentIndex: Map<string, AnyContent> = new Map();

  constructor(config: Partial<ReferenceParserConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.patterns = [
      ...DEFAULT_PATTERNS,
      ...(this.config.customPatterns || [])
    ].sort((a, b) => b.priority - a.priority);
  }

  /**
   * Set the content index for reference validation
   */
  setContentIndex(content: AnyContent[]): void {
    this.contentIndex.clear();
    content.forEach(item => {
      // Index by title (primary)
      this.contentIndex.set(item.title.toLowerCase(), item);
      
      // Index by alternative names/variations
      if (item.tags) {
        item.tags.forEach(tag => {
          this.contentIndex.set(tag.toLowerCase(), item);
        });
      }
    });
  }

  /**
   * Parse text and extract all cross-references
   */
  parseReferences(text: string, sourceContentId?: string): ParsedReference[] {
    const references: ParsedReference[] = [];
    const processedRanges: Array<{ start: number; end: number }> = [];

    // Process each pattern in priority order
    for (const pattern of this.patterns) {
      const matches = this.findMatches(text, pattern);
      
      for (const match of matches) {
        // Check if this range has already been processed by a higher priority pattern
        const overlaps = processedRanges.some(range => 
          this.rangesOverlap(match.position, range)
        );
        
        if (!overlaps) {
          const confidence = this.calculateConfidence(match, text, pattern);
          
          if (confidence >= this.config.minConfidence) {
            references.push({
              ...match,
              confidence
            });
            
            processedRanges.push(match.position);
          }
        }
      }
    }

    // Sort by position in text
    return references.sort((a, b) => a.position.start - b.position.start);
  }

  /**
   * Find matches for a specific pattern
   */
  private findMatches(text: string, pattern: ReferencePattern): Omit<ParsedReference, 'confidence'>[] {
    const matches: Omit<ParsedReference, 'confidence'>[] = [];
    let match: RegExpExecArray | null;

    // Reset pattern regex
    pattern.pattern.lastIndex = 0;

    while ((match = pattern.pattern.exec(text)) !== null) {
      const fullMatch = match[0];
      const capturedText = match[1] || fullMatch;
      
      const start = match.index;
      const end = start + fullMatch.length;
      
      matches.push({
        originalText: fullMatch,
        normalizedText: this.normalizeText(capturedText),
        contentType: pattern.contentType,
        referenceType: pattern.referenceType,
        position: { start, end },
        context: this.extractContext(text, start, end)
      });
    }

    return matches;
  }

  /**
   * Calculate confidence score for a reference
   */
  private calculateConfidence(
    reference: Omit<ParsedReference, 'confidence'>, 
    fullText: string, 
    pattern: ReferencePattern
  ): number {
    let confidence = 0.7; // Base confidence

    // Check if reference exists in content index
    const normalizedRef = reference.normalizedText.toLowerCase();
    if (this.contentIndex.has(normalizedRef)) {
      confidence += 0.2;
    }

    // Check for context words
    if (pattern.contextWords) {
      const contextLower = reference.context.toLowerCase();
      const contextMatches = pattern.contextWords.filter(word => 
        contextLower.includes(word.toLowerCase())
      ).length;
      
      confidence += (contextMatches / pattern.contextWords.length) * 0.1;
    }

    // Penalize very short references
    if (reference.normalizedText.length < 3) {
      confidence -= 0.2;
    }

    // Boost confidence for exact case matches when required
    if (pattern.caseSensitive && reference.originalText === reference.normalizedText) {
      confidence += 0.1;
    }

    return Math.min(1.0, Math.max(0.0, confidence));
  }

  /**
   * Extract context around a reference
   */
  private extractContext(text: string, start: number, end: number): string {
    const maxLength = this.config.maxContextLength;
    const halfLength = Math.floor(maxLength / 2);
    
    const contextStart = Math.max(0, start - halfLength);
    const contextEnd = Math.min(text.length, end + halfLength);
    
    let context = text.substring(contextStart, contextEnd);
    
    // Trim to word boundaries
    if (contextStart > 0) {
      const firstSpace = context.indexOf(' ');
      if (firstSpace > 0) {
        context = context.substring(firstSpace + 1);
      }
    }
    
    if (contextEnd < text.length) {
      const lastSpace = context.lastIndexOf(' ');
      if (lastSpace > 0) {
        context = context.substring(0, lastSpace);
      }
    }
    
    return context.trim();
  }

  /**
   * Normalize reference text for matching
   */
  private normalizeText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .toLowerCase();
  }

  /**
   * Check if two ranges overlap
   */
  private rangesOverlap(
    range1: { start: number; end: number }, 
    range2: { start: number; end: number }
  ): boolean {
    return range1.start < range2.end && range2.start < range1.end;
  }

  /**
   * Validate a reference against the content index
   */
  validateReference(reference: ParsedReference): boolean {
    const normalizedRef = reference.normalizedText.toLowerCase();
    return this.contentIndex.has(normalizedRef);
  }

  /**
   * Get content item for a reference
   */
  resolveReference(reference: ParsedReference): AnyContent | null {
    const normalizedRef = reference.normalizedText.toLowerCase();
    return this.contentIndex.get(normalizedRef) || null;
  }

  /**
   * Add custom pattern
   */
  addPattern(pattern: ReferencePattern): void {
    this.patterns.push(pattern);
    this.patterns.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Get all patterns
   */
  getPatterns(): ReferencePattern[] {
    return [...this.patterns];
  }
}

/**
 * Create a default reference parser instance
 */
export function createReferenceParser(config?: Partial<ReferenceParserConfig>): ReferenceParser {
  return new ReferenceParser(config);
}

/**
 * Utility function to extract references from text
 */
export function extractReferences(
  text: string, 
  contentIndex: AnyContent[], 
  config?: Partial<ReferenceParserConfig>
): ParsedReference[] {
  const parser = createReferenceParser(config);
  parser.setContentIndex(contentIndex);
  return parser.parseReferences(text);
}

export default ReferenceParser; 