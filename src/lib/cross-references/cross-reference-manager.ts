/**
 * Cross-Reference Manager for ACKS II Wiki
 * 
 * This module provides a high-level API for managing cross-references
 * throughout the application. It orchestrates the reference parser
 * and registry to provide a unified interface for reference operations.
 * 
 * Features:
 * - Unified API for reference operations
 * - Automatic reference processing
 * - Reference validation and cleanup
 * - Performance optimization
 * - Event-driven updates
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { type AnyContent } from '../types/content';
import { 
  ReferenceParser, 
  createReferenceParser,
  type ParsedReference,
  type ReferenceParserConfig 
} from './reference-parser';
import { 
  ReferenceRegistry, 
  createReferenceRegistry,
  type ReferenceEntry,
  type ReferenceStats,
  type ReferenceQuery 
} from './reference-registry';

/**
 * Cross-reference manager configuration
 */
export interface CrossReferenceConfig {
  /** Parser configuration */
  parser?: Partial<ReferenceParserConfig>;
  /** Whether to auto-process content on addition */
  autoProcess?: boolean;
  /** Whether to validate references automatically */
  autoValidate?: boolean;
  /** Batch size for processing operations */
  batchSize?: number;
  /** Whether to enable performance monitoring */
  enableProfiling?: boolean;
}

/**
 * Processing result
 */
export interface ProcessingResult {
  /** Content ID that was processed */
  contentId: string;
  /** Number of references found */
  referencesFound: number;
  /** Number of references added to registry */
  referencesAdded: number;
  /** Processing time in milliseconds */
  processingTime: number;
  /** Any errors encountered */
  errors: string[];
}

/**
 * Batch processing result
 */
export interface BatchProcessingResult {
  /** Total content items processed */
  totalProcessed: number;
  /** Total references found */
  totalReferences: number;
  /** Total processing time */
  totalTime: number;
  /** Individual results */
  results: ProcessingResult[];
  /** Summary statistics */
  stats: ReferenceStats;
}

/**
 * Event types for the cross-reference manager
 */
export type CrossReferenceEvent = 
  | { type: 'content_added'; contentId: string }
  | { type: 'content_removed'; contentId: string }
  | { type: 'references_processed'; contentId: string; count: number }
  | { type: 'references_validated'; validated: number; broken: number }
  | { type: 'batch_complete'; result: BatchProcessingResult };

/**
 * Event listener type
 */
export type EventListener = (event: CrossReferenceEvent) => void;

/**
 * Cross-Reference Manager Class
 */
export class CrossReferenceManager {
  private parser: ReferenceParser;
  private registry: ReferenceRegistry;
  private config: Required<CrossReferenceConfig>;
  private contentIndex: Map<string, AnyContent> = new Map();
  private listeners: Set<EventListener> = new Set();
  private processingQueue: Set<string> = new Set();

  constructor(config: CrossReferenceConfig = {}) {
    this.config = {
      parser: {},
      autoProcess: true,
      autoValidate: true,
      batchSize: 50,
      enableProfiling: false,
      ...config
    };

    this.parser = createReferenceParser(this.config.parser);
    this.registry = createReferenceRegistry();
  }

  /**
   * Add content to the manager
   */
  async addContent(content: AnyContent | AnyContent[]): Promise<ProcessingResult[]> {
    const items = Array.isArray(content) ? content : [content];
    const results: ProcessingResult[] = [];

    // Update content index
    for (const item of items) {
      this.contentIndex.set(item.id, item);
      this.emit({ type: 'content_added', contentId: item.id });
    }

    // Update parser and registry indices
    const allContent = Array.from(this.contentIndex.values());
    this.parser.setContentIndex(allContent);
    this.registry.setContentIndex(allContent);

    // Auto-process if enabled
    if (this.config.autoProcess) {
      for (const item of items) {
        const result = await this.processContent(item.id);
        results.push(result);
      }
    }

    return results;
  }

  /**
   * Remove content from the manager
   */
  removeContent(contentId: string | string[]): boolean {
    const ids = Array.isArray(contentId) ? contentId : [contentId];
    let removed = false;

    for (const id of ids) {
      if (this.contentIndex.has(id)) {
        this.contentIndex.delete(id);
        
        // Remove all references involving this content
        const outgoingRefs = this.registry.getOutgoingReferences(id);
        const incomingRefs = this.registry.getIncomingReferences(id);
        
        for (const ref of [...outgoingRefs, ...incomingRefs]) {
          this.registry.removeReference(ref.id);
        }

        this.emit({ type: 'content_removed', contentId: id });
        removed = true;
      }
    }

    // Update indices
    if (removed) {
      const allContent = Array.from(this.contentIndex.values());
      this.parser.setContentIndex(allContent);
      this.registry.setContentIndex(allContent);
    }

    return removed;
  }

  /**
   * Process a specific content item for references
   */
  async processContent(contentId: string): Promise<ProcessingResult> {
    const startTime = Date.now();
    const result: ProcessingResult = {
      contentId,
      referencesFound: 0,
      referencesAdded: 0,
      processingTime: 0,
      errors: []
    };

    try {
      // Check if already processing
      if (this.processingQueue.has(contentId)) {
        result.errors.push('Content is already being processed');
        return result;
      }

      this.processingQueue.add(contentId);

      const content = this.contentIndex.get(contentId);
      if (!content) {
        result.errors.push('Content not found');
        return result;
      }

      // Remove existing references for this content
      const existingRefs = this.registry.getOutgoingReferences(contentId);
      for (const ref of existingRefs) {
        this.registry.removeReference(ref.id);
      }

      // Parse references from content text
      const textToProcess = this.extractTextFromContent(content);
      const parsedReferences = this.parser.parseReferences(textToProcess, contentId);
      result.referencesFound = parsedReferences.length;

      // Add references to registry
      for (const parsedRef of parsedReferences) {
        try {
          const targetContent = this.parser.resolveReference(parsedRef);
          if (targetContent) {
            this.registry.addReference(contentId, targetContent.id, parsedRef);
            result.referencesAdded++;
          }
        } catch (error) {
          result.errors.push(`Failed to add reference: ${error}`);
        }
      }

      this.emit({ 
        type: 'references_processed', 
        contentId, 
        count: result.referencesAdded 
      });

    } catch (error) {
      result.errors.push(`Processing failed: ${error}`);
    } finally {
      this.processingQueue.delete(contentId);
      result.processingTime = Date.now() - startTime;
    }

    return result;
  }

  /**
   * Process all content in batches
   */
  async processAllContent(): Promise<BatchProcessingResult> {
    const startTime = Date.now();
    const contentIds = Array.from(this.contentIndex.keys());
    const results: ProcessingResult[] = [];

    // Process in batches
    for (let i = 0; i < contentIds.length; i += this.config.batchSize) {
      const batch = contentIds.slice(i, i + this.config.batchSize);
      const batchPromises = batch.map(id => this.processContent(id));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    // Auto-validate if enabled
    if (this.config.autoValidate) {
      await this.validateReferences();
    }

    const totalTime = Date.now() - startTime;
    const totalReferences = results.reduce((sum, r) => sum + r.referencesAdded, 0);
    const stats = this.registry.getStatistics();

    const batchResult: BatchProcessingResult = {
      totalProcessed: results.length,
      totalReferences,
      totalTime,
      results,
      stats
    };

    this.emit({ type: 'batch_complete', result: batchResult });

    return batchResult;
  }

  /**
   * Validate all references
   */
  async validateReferences(): Promise<{ validated: number; broken: number; fixed: number }> {
    const result = this.registry.validateReferences();
    
    this.emit({ 
      type: 'references_validated', 
      validated: result.validated, 
      broken: result.broken 
    });

    return result;
  }

  /**
   * Get references for content
   */
  getReferencesForContent(contentId: string): {
    outgoing: ReferenceEntry[];
    incoming: ReferenceEntry[];
    parsed?: ParsedReference[];
  } {
    const { outgoing, incoming } = this.registry.getRelatedContent(contentId);
    
    // Optionally include parsed references for the content
    const content = this.contentIndex.get(contentId);
    let parsed: ParsedReference[] | undefined;
    
    if (content) {
      const textToProcess = this.extractTextFromContent(content);
      parsed = this.parser.parseReferences(textToProcess, contentId);
    }

    return { outgoing, incoming, parsed };
  }

  /**
   * Query references
   */
  queryReferences(query: ReferenceQuery): ReferenceEntry[] {
    return this.registry.queryReferences(query);
  }

  /**
   * Get reference statistics
   */
  getStatistics(): ReferenceStats {
    return this.registry.getStatistics();
  }

  /**
   * Get content by ID
   */
  getContent(contentId: string): AnyContent | null {
    return this.contentIndex.get(contentId) || null;
  }

  /**
   * Get all content
   */
  getAllContent(): AnyContent[] {
    return Array.from(this.contentIndex.values());
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.contentIndex.clear();
    this.registry.clear();
    this.processingQueue.clear();
    this.parser.setContentIndex([]);
  }

  /**
   * Export data
   */
  export(): {
    content: AnyContent[];
    references: ReferenceEntry[];
  } {
    return {
      content: this.getAllContent(),
      references: this.registry.export()
    };
  }

  /**
   * Import data
   */
  async import(data: {
    content: AnyContent[];
    references: ReferenceEntry[];
  }): Promise<void> {
    this.clear();
    
    // Import content
    for (const item of data.content) {
      this.contentIndex.set(item.id, item);
    }

    // Update indices
    const allContent = Array.from(this.contentIndex.values());
    this.parser.setContentIndex(allContent);
    this.registry.setContentIndex(allContent);

    // Import references
    this.registry.import(data.references);
  }

  /**
   * Add event listener
   */
  addEventListener(listener: EventListener): void {
    this.listeners.add(listener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(listener: EventListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Emit event to all listeners
   */
  private emit(event: CrossReferenceEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in cross-reference event listener:', error);
      }
    }
  }

  /**
   * Extract text content from a content item
   */
  private extractTextFromContent(content: AnyContent): string {
    const textParts: string[] = [];

    // Add title and description
    textParts.push(content.title);
    if (content.description) {
      textParts.push(content.description);
    }

    // Add content-type specific text
    switch (content.contentType) {
      case 'monster':
        const monster = content as any;
        if (monster.description) textParts.push(monster.description);
        if (monster.combat?.tactics) textParts.push(monster.combat.tactics);
        if (monster.ecology?.behavior) textParts.push(monster.ecology.behavior);
        break;
      
      case 'spell':
        const spell = content as any;
        if (spell.description) textParts.push(spell.description);
        break;
      
      case 'class':
        const charClass = content as any;
        if (charClass.description) textParts.push(charClass.description);
        break;
      
      case 'equipment':
        const equipment = content as any;
        if (equipment.description) textParts.push(equipment.description);
        break;
      
      case 'rule':
        const rule = content as any;
        if (rule.ruleText) textParts.push(rule.ruleText);
        if (rule.examples) textParts.push(...rule.examples);
        break;
      
      case 'proficiency':
        const proficiency = content as any;
        if (proficiency.description) textParts.push(proficiency.description);
        if (proficiency.effects) textParts.push(proficiency.effects);
        break;
    }

    return textParts.join(' ');
  }
}

/**
 * Create a default cross-reference manager instance
 */
export function createCrossReferenceManager(config?: CrossReferenceConfig): CrossReferenceManager {
  return new CrossReferenceManager(config);
}

export default CrossReferenceManager; 