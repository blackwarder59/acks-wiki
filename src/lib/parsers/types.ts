/**
 * Types for ACKS II Content Parsing System
 * 
 * This file defines TypeScript types used throughout the parsing system
 * for consistent data structures and error handling.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { AnyContent, ContentType, ParseError } from '../types/content';

/**
 * Result of parsing a markdown file
 */
export interface ParseResult<T extends AnyContent = AnyContent> {
  /** Successfully parsed content, if any */
  content?: T;
  /** Errors encountered during parsing */
  errors: ParseError[];
  /** Warnings that don't prevent parsing */
  warnings: ParseError[];
  /** Source file that was parsed */
  sourceFile: string;
  /** Whether parsing was successful */
  success: boolean;
  /** Processing time in milliseconds */
  processingTime: number;
}

/**
 * Options for configuring parsing behavior
 */
export interface ParsingOptions {
  /** Whether to continue parsing after encountering errors */
  continueOnError?: boolean;
  /** Whether to include detailed debug information */
  verbose?: boolean;
  /** Maximum number of errors before stopping */
  maxErrors?: number;
  /** Whether to attempt automatic repair of common issues */
  autoRepair?: boolean;
  /** Custom content type override (skip detection) */
  forceContentType?: ContentType;
  /** Whether to extract cross-references */
  extractCrossReferences?: boolean;
}

/**
 * Parsed markdown table data
 */
export interface TableData {
  /** Table headers */
  headers: string[];
  /** Table rows (each row is an array of cell values) */
  rows: string[][];
  /** Caption if present */
  caption?: string;
  /** Raw markdown table text */
  rawMarkdown: string;
}

/**
 * Extracted section data from markdown
 */
export interface SectionData {
  /** Section title */
  title: string;
  /** Section content (without title) */
  content: string;
  /** Subsections within this section */
  subsections: SectionData[];
  /** Header level (1-6) */
  level: number;
  /** Raw markdown including header */
  rawMarkdown: string;
}

/**
 * Property list parsing result
 */
export interface PropertyList {
  /** Key-value pairs extracted from the list */
  properties: Record<string, string>;
  /** Items that couldn't be parsed as key-value pairs */
  unparsedItems: string[];
}

/**
 * Stat block parsing result for monsters
 */
export interface StatBlock {
  /** Parsed statistics */
  stats: Record<string, string | number>;
  /** Items that couldn't be parsed */
  unparsedLines: string[];
  /** Whether all expected stats were found */
  complete: boolean;
}

/**
 * Content detection result
 */
export interface ContentDetectionResult {
  /** Detected content type */
  contentType: ContentType;
  /** Confidence score (0-1) */
  confidence: number;
  /** Indicators that led to this detection */
  indicators: string[];
  /** Alternative possibilities */
  alternatives: Array<{
    contentType: ContentType;
    confidence: number;
  }>;
}

/**
 * Cross-reference extraction result
 */
export interface CrossReferenceData {
  /** Target content ID or title */
  target: string;
  /** Context where reference appears */
  context: string;
  /** Type of reference detected */
  type: 'mention' | 'requirement' | 'related' | 'variant';
  /** Line number where found */
  lineNumber?: number;
}

/**
 * Parsing context for maintaining state during parsing
 */
export interface ParsingContext {
  /** Current file being parsed */
  sourceFile: string;
  /** Current line number */
  currentLine: number;
  /** Accumulated errors */
  errors: ParseError[];
  /** Accumulated warnings */
  warnings: ParseError[];
  /** Parsing options */
  options: ParsingOptions;
  /** Start time for performance tracking */
  startTime: number;
}

/**
 * Table cell parsing result
 */
export interface CellData {
  /** Cleaned cell content */
  content: string;
  /** Whether cell spans multiple columns */
  colspan?: number;
  /** Whether cell spans multiple rows */
  rowspan?: number;
  /** Raw cell markdown */
  raw: string;
} 