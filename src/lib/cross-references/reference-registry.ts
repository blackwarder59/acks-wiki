/**
 * Cross-Reference Registry for ACKS II Wiki
 * 
 * This module manages a registry of all cross-references between content items,
 * enabling bidirectional linking, reference validation, and reference analytics.
 * 
 * Features:
 * - Bidirectional reference tracking
 * - Reference validation and cleanup
 * - Reference analytics and statistics
 * - Efficient lookup and querying
 * - Reference type categorization
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { 
  ContentType, 
  ReferenceType, 
  type CrossReference, 
  type AnyContent 
} from '../types/content';
import { type ParsedReference } from './reference-parser';

/**
 * Reference entry in the registry
 */
export interface ReferenceEntry {
  /** Unique identifier for this reference */
  id: string;
  /** Source content ID */
  sourceId: string;
  /** Target content ID */
  targetId: string;
  /** Type of reference */
  referenceType: ReferenceType;
  /** Context where reference appears */
  context: string;
  /** Original text that created this reference */
  originalText: string;
  /** Position in source content */
  position: {
    start: number;
    end: number;
  };
  /** Confidence score */
  confidence: number;
  /** When this reference was created */
  createdAt: Date;
  /** Whether this reference has been validated */
  validated: boolean;
}

/**
 * Reference statistics
 */
export interface ReferenceStats {
  /** Total number of references */
  totalReferences: number;
  /** References by type */
  byType: Record<ReferenceType, number>;
  /** References by content type */
  byContentType: Record<ContentType, number>;
  /** Most referenced content items */
  mostReferenced: Array<{
    contentId: string;
    title: string;
    referenceCount: number;
  }>;
  /** Content items with most outgoing references */
  mostReferencing: Array<{
    contentId: string;
    title: string;
    referenceCount: number;
  }>;
  /** Orphaned content (no incoming references) */
  orphanedContent: string[];
  /** Broken references (target not found) */
  brokenReferences: ReferenceEntry[];
}

/**
 * Reference query options
 */
export interface ReferenceQuery {
  /** Source content ID */
  sourceId?: string;
  /** Target content ID */
  targetId?: string;
  /** Reference type filter */
  referenceType?: ReferenceType;
  /** Content type filter */
  contentType?: ContentType;
  /** Minimum confidence threshold */
  minConfidence?: number;
  /** Whether to include only validated references */
  validatedOnly?: boolean;
  /** Maximum number of results */
  limit?: number;
  /** Sort order */
  sortBy?: 'confidence' | 'createdAt' | 'referenceType';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

/**
 * Cross-Reference Registry Class
 */
export class ReferenceRegistry {
  private references: Map<string, ReferenceEntry> = new Map();
  private sourceIndex: Map<string, Set<string>> = new Map();
  private targetIndex: Map<string, Set<string>> = new Map();
  private contentIndex: Map<string, AnyContent> = new Map();
  private nextId = 1;

  /**
   * Set the content index for reference validation
   */
  setContentIndex(content: AnyContent[]): void {
    this.contentIndex.clear();
    content.forEach(item => {
      this.contentIndex.set(item.id, item);
    });
  }

  /**
   * Add a reference to the registry
   */
  addReference(
    sourceId: string,
    targetId: string,
    parsedRef: ParsedReference
  ): string {
    const referenceId = this.generateId();
    
    const entry: ReferenceEntry = {
      id: referenceId,
      sourceId,
      targetId,
      referenceType: parsedRef.referenceType,
      context: parsedRef.context,
      originalText: parsedRef.originalText,
      position: parsedRef.position,
      confidence: parsedRef.confidence,
      createdAt: new Date(),
      validated: this.contentIndex.has(targetId)
    };

    this.references.set(referenceId, entry);
    this.updateIndices(referenceId, sourceId, targetId);

    return referenceId;
  }

  /**
   * Remove a reference from the registry
   */
  removeReference(referenceId: string): boolean {
    const entry = this.references.get(referenceId);
    if (!entry) return false;

    this.references.delete(referenceId);
    this.removeFromIndices(referenceId, entry.sourceId, entry.targetId);

    return true;
  }

  /**
   * Get a specific reference by ID
   */
  getReference(referenceId: string): ReferenceEntry | null {
    return this.references.get(referenceId) || null;
  }

  /**
   * Query references with filters
   */
  queryReferences(query: ReferenceQuery = {}): ReferenceEntry[] {
    let results = Array.from(this.references.values());

    // Apply filters
    if (query.sourceId) {
      const sourceRefs = this.sourceIndex.get(query.sourceId);
      if (!sourceRefs) return [];
      results = results.filter(ref => sourceRefs.has(ref.id));
    }

    if (query.targetId) {
      const targetRefs = this.targetIndex.get(query.targetId);
      if (!targetRefs) return [];
      results = results.filter(ref => targetRefs.has(ref.id));
    }

    if (query.referenceType) {
      results = results.filter(ref => ref.referenceType === query.referenceType);
    }

    if (query.contentType) {
      results = results.filter(ref => {
        const targetContent = this.contentIndex.get(ref.targetId);
        return targetContent?.contentType === query.contentType;
      });
    }

    if (query.minConfidence !== undefined) {
      results = results.filter(ref => ref.confidence >= query.minConfidence);
    }

    if (query.validatedOnly) {
      results = results.filter(ref => ref.validated);
    }

    // Apply sorting
    if (query.sortBy) {
      const direction = query.sortDirection === 'desc' ? -1 : 1;
      results.sort((a, b) => {
        let comparison = 0;
        
        switch (query.sortBy) {
          case 'confidence':
            comparison = a.confidence - b.confidence;
            break;
          case 'createdAt':
            comparison = a.createdAt.getTime() - b.createdAt.getTime();
            break;
          case 'referenceType':
            comparison = a.referenceType.localeCompare(b.referenceType);
            break;
        }
        
        return comparison * direction;
      });
    }

    // Apply limit
    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  /**
   * Get all outgoing references from a content item
   */
  getOutgoingReferences(sourceId: string): ReferenceEntry[] {
    return this.queryReferences({ sourceId });
  }

  /**
   * Get all incoming references to a content item (backlinks)
   */
  getIncomingReferences(targetId: string): ReferenceEntry[] {
    return this.queryReferences({ targetId });
  }

  /**
   * Get related content items (both incoming and outgoing references)
   */
  getRelatedContent(contentId: string): {
    outgoing: ReferenceEntry[];
    incoming: ReferenceEntry[];
  } {
    return {
      outgoing: this.getOutgoingReferences(contentId),
      incoming: this.getIncomingReferences(contentId)
    };
  }

  /**
   * Validate all references and update their status
   */
  validateReferences(): {
    validated: number;
    broken: number;
    fixed: number;
  } {
    let validated = 0;
    let broken = 0;
    let fixed = 0;

    for (const entry of this.references.values()) {
      const wasValidated = entry.validated;
      const isValid = this.contentIndex.has(entry.targetId);
      
      if (isValid && !wasValidated) {
        fixed++;
      } else if (!isValid && wasValidated) {
        broken++;
      }
      
      entry.validated = isValid;
      
      if (isValid) {
        validated++;
      }
    }

    return { validated, broken, fixed };
  }

  /**
   * Get reference statistics
   */
  getStatistics(): ReferenceStats {
    const references = Array.from(this.references.values());
    const validatedRefs = references.filter(ref => ref.validated);

    // Count by type
    const byType: Record<ReferenceType, number> = {
      [ReferenceType.MENTIONS]: 0,
      [ReferenceType.REQUIRES]: 0,
      [ReferenceType.RELATED]: 0,
      [ReferenceType.VARIANT]: 0,
      [ReferenceType.PREREQUISITE]: 0
    };

    // Count by content type
    const byContentType: Record<ContentType, number> = {
      [ContentType.MONSTER]: 0,
      [ContentType.SPELL]: 0,
      [ContentType.CLASS]: 0,
      [ContentType.EQUIPMENT]: 0,
      [ContentType.RULE]: 0,
      [ContentType.PROFICIENCY]: 0,
      [ContentType.DOMAIN_RULE]: 0,
      [ContentType.JUDGE_TOOL]: 0
    };

    // Count incoming references per content item
    const incomingCounts = new Map<string, number>();
    const outgoingCounts = new Map<string, number>();

    for (const ref of validatedRefs) {
      byType[ref.referenceType]++;
      
      const targetContent = this.contentIndex.get(ref.targetId);
      if (targetContent) {
        byContentType[targetContent.contentType]++;
      }

      // Count incoming references
      const currentIncoming = incomingCounts.get(ref.targetId) || 0;
      incomingCounts.set(ref.targetId, currentIncoming + 1);

      // Count outgoing references
      const currentOutgoing = outgoingCounts.get(ref.sourceId) || 0;
      outgoingCounts.set(ref.sourceId, currentOutgoing + 1);
    }

    // Find most referenced content
    const mostReferenced = Array.from(incomingCounts.entries())
      .map(([contentId, count]) => ({
        contentId,
        title: this.contentIndex.get(contentId)?.title || 'Unknown',
        referenceCount: count
      }))
      .sort((a, b) => b.referenceCount - a.referenceCount)
      .slice(0, 10);

    // Find content with most outgoing references
    const mostReferencing = Array.from(outgoingCounts.entries())
      .map(([contentId, count]) => ({
        contentId,
        title: this.contentIndex.get(contentId)?.title || 'Unknown',
        referenceCount: count
      }))
      .sort((a, b) => b.referenceCount - a.referenceCount)
      .slice(0, 10);

    // Find orphaned content (no incoming references)
    const referencedIds = new Set(validatedRefs.map(ref => ref.targetId));
    const orphanedContent = Array.from(this.contentIndex.keys())
      .filter(id => !referencedIds.has(id));

    // Find broken references
    const brokenReferences = references.filter(ref => !ref.validated);

    return {
      totalReferences: references.length,
      byType,
      byContentType,
      mostReferenced,
      mostReferencing,
      orphanedContent,
      brokenReferences
    };
  }

  /**
   * Clear all references
   */
  clear(): void {
    this.references.clear();
    this.sourceIndex.clear();
    this.targetIndex.clear();
    this.nextId = 1;
  }

  /**
   * Get total reference count
   */
  size(): number {
    return this.references.size;
  }

  /**
   * Export references as JSON
   */
  export(): ReferenceEntry[] {
    return Array.from(this.references.values());
  }

  /**
   * Import references from JSON
   */
  import(references: ReferenceEntry[]): void {
    this.clear();
    
    for (const ref of references) {
      this.references.set(ref.id, ref);
      this.updateIndices(ref.id, ref.sourceId, ref.targetId);
      
      // Update next ID to avoid conflicts
      const numericId = parseInt(ref.id.replace('ref_', ''), 10);
      if (!isNaN(numericId) && numericId >= this.nextId) {
        this.nextId = numericId + 1;
      }
    }
  }

  /**
   * Generate a unique reference ID
   */
  private generateId(): string {
    return `ref_${this.nextId++}`;
  }

  /**
   * Update indices when adding a reference
   */
  private updateIndices(referenceId: string, sourceId: string, targetId: string): void {
    // Update source index
    if (!this.sourceIndex.has(sourceId)) {
      this.sourceIndex.set(sourceId, new Set());
    }
    this.sourceIndex.get(sourceId)!.add(referenceId);

    // Update target index
    if (!this.targetIndex.has(targetId)) {
      this.targetIndex.set(targetId, new Set());
    }
    this.targetIndex.get(targetId)!.add(referenceId);
  }

  /**
   * Remove from indices when removing a reference
   */
  private removeFromIndices(referenceId: string, sourceId: string, targetId: string): void {
    // Remove from source index
    const sourceRefs = this.sourceIndex.get(sourceId);
    if (sourceRefs) {
      sourceRefs.delete(referenceId);
      if (sourceRefs.size === 0) {
        this.sourceIndex.delete(sourceId);
      }
    }

    // Remove from target index
    const targetRefs = this.targetIndex.get(targetId);
    if (targetRefs) {
      targetRefs.delete(referenceId);
      if (targetRefs.size === 0) {
        this.targetIndex.delete(targetId);
      }
    }
  }
}

/**
 * Create a default reference registry instance
 */
export function createReferenceRegistry(): ReferenceRegistry {
  return new ReferenceRegistry();
}

export default ReferenceRegistry; 