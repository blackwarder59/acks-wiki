/**
 * Cross-References Module Index
 * 
 * Exports all cross-reference functionality for the ACKS II Wiki.
 * This module provides comprehensive cross-reference management
 * including parsing, registry, and linking capabilities.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

// Reference Parser
export {
  ReferenceParser,
  createReferenceParser,
  extractReferences,
  type ReferencePattern,
  type ParsedReference,
  type ReferenceParserConfig
} from './reference-parser';

// Reference Registry
export {
  ReferenceRegistry,
  createReferenceRegistry,
  type ReferenceEntry,
  type ReferenceStats,
  type ReferenceQuery
} from './reference-registry';

// Cross-Reference Manager
export {
  CrossReferenceManager,
  createCrossReferenceManager,
  type CrossReferenceConfig,
  type ProcessingResult,
  type BatchProcessingResult,
  type CrossReferenceEvent,
  type EventListener
} from './cross-reference-manager';

// Re-export types from content types for convenience
export {
  ContentType,
  ReferenceType,
  type CrossReference,
  type AnyContent
} from '../types/content'; 