/**
 * ACKS II Content Processing Pipeline Types
 * 
 * This module defines types for the content processing pipeline
 * that handles file discovery, batch processing, and result aggregation.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { AnyContent, ContentCategory, ContentType, ParseError } from '../types/content';
import { ParseResult, ParsingOptions } from './types';

/**
 * Configuration for the content processor
 */
export interface ProcessorConfig {
  /** Root directory containing ACKS II content */
  rootDirectory: string;
  
  /** Output directory for processed content */
  outputDirectory?: string;
  
  /** Parsing options to apply to all files */
  parsingOptions: ParsingOptions;
  
  /** Maximum number of files to process concurrently */
  concurrency?: number;
  
  /** Batch size for processing files */
  batchSize?: number;
  
  /** Whether to continue processing if errors occur */
  continueOnError?: boolean;
  
  /** File patterns to include (glob patterns) */
  includePatterns?: string[];
  
  /** File patterns to exclude (glob patterns) */
  excludePatterns?: string[];
  
  /** Whether to process files recursively */
  recursive?: boolean;
  
  /** Whether to enable verbose logging */
  verbose?: boolean;
}

/**
 * Represents a discovered content file
 */
export interface ContentFile {
  /** Absolute path to the file */
  path: string;
  
  /** Relative path from content root */
  relativePath: string;
  
  /** Detected content category */
  category: ContentCategory;
  
  /** File size in bytes */
  size: number;
  
  /** Last modified timestamp */
  lastModified: Date;
  
  /** File extension */
  extension: string;
  
  /** Whether this file should be processed */
  shouldProcess: boolean;
}

/**
 * Result of processing a single file
 */
export interface ProcessingResult {
  /** The file that was processed */
  file: ContentFile;
  
  /** Whether processing was successful */
  success: boolean;
  
  /** Parsed content (if successful) */
  content?: AnyContent;
  
  /** Parse result with detailed information */
  parseResult?: ParseResult;
  
  /** Processing time in milliseconds */
  processingTime: number;
  
  /** Error message (if failed) */
  error?: string;
  
  /** Whether recovery was attempted */
  recoveryAttempted?: boolean;
  
  /** Recovery result (if attempted) */
  recoveryResult?: string;
}

/**
 * Batch of files to process together
 */
export interface ProcessingBatch {
  /** Unique batch identifier */
  id: string;
  
  /** Files in this batch */
  files: ContentFile[];
  
  /** Batch creation timestamp */
  createdAt: Date;
  
  /** Estimated processing time in milliseconds */
  estimatedTime?: number;
}

/**
 * Progress information for the processing pipeline
 */
export interface ProcessingProgress {
  /** Total number of files to process */
  totalFiles: number;
  
  /** Number of files processed so far */
  processedFiles: number;
  
  /** Number of files successfully processed */
  successfulFiles: number;
  
  /** Number of files that failed processing */
  failedFiles: number;
  
  /** Number of files skipped */
  skippedFiles: number;
  
  /** Current file being processed */
  currentFile?: string;
  
  /** Current batch being processed */
  currentBatch?: string;
  
  /** Processing start time */
  startTime: Date;
  
  /** Estimated completion time */
  estimatedCompletion?: Date;
  
  /** Processing rate (files per second) */
  processingRate?: number;
  
  /** Percentage complete (0-100) */
  percentComplete: number;
}

/**
 * Final results of the entire processing pipeline
 */
export interface ProcessingResults {
  /** Overall success status */
  success: boolean;
  
  /** Processing progress summary */
  progress: ProcessingProgress;
  
  /** Results for each processed file */
  fileResults: ProcessingResult[];
  
  /** Files that were discovered but not processed */
  skippedFiles: ContentFile[];
  
  /** Summary of errors encountered */
  errorSummary: {
    totalErrors: number;
    criticalErrors: number;
    warnings: number;
    errorsByType: Record<string, number>;
    errorsByCategory: Record<ContentCategory, number>;
  };
  
  /** Performance metrics */
  performance: {
    totalTime: number;
    averageFileTime: number;
    filesPerSecond: number;
    peakMemoryUsage?: number;
  };
  
  /** Content statistics */
  contentStats: {
    totalContent: number;
    contentByType: Record<ContentType, number>;
    contentByCategory: Record<ContentCategory, number>;
    averageFileSize: number;
    largestFile: string;
    smallestFile: string;
  };
}

/**
 * Event emitted during processing
 */
export interface ProcessingEvent {
  /** Event type */
  type: 'start' | 'progress' | 'file-complete' | 'batch-complete' | 'error' | 'complete';
  
  /** Event timestamp */
  timestamp: Date;
  
  /** Current progress */
  progress: ProcessingProgress;
  
  /** Event-specific data */
  data?: {
    file?: ContentFile;
    batch?: ProcessingBatch;
    result?: ProcessingResult;
    error?: ParseError;
  };
}

/**
 * Hook function types for pipeline customization
 */
export type PreProcessHook = (file: ContentFile) => Promise<ContentFile | null>;
export type PostProcessHook = (result: ProcessingResult) => Promise<ProcessingResult>;
export type ErrorHook = (error: Error, file: ContentFile) => Promise<boolean>; // return true to continue
export type ProgressHook = (progress: ProcessingProgress) => void;

/**
 * Pipeline hooks configuration
 */
export interface PipelineHooks {
  /** Called before processing each file */
  preProcess?: PreProcessHook[];
  
  /** Called after processing each file */
  postProcess?: PostProcessHook[];
  
  /** Called when an error occurs */
  onError?: ErrorHook[];
  
  /** Called when progress updates */
  onProgress?: ProgressHook[];
}

/**
 * File discovery options
 */
export interface DiscoveryOptions {
  /** Root directory to scan */
  rootDirectory: string;
  
  /** Whether to scan recursively */
  recursive: boolean;
  
  /** File patterns to include */
  includePatterns: string[];
  
  /** File patterns to exclude */
  excludePatterns: string[];
  
  /** Maximum number of files to discover */
  maxFiles?: number;
  
  /** Whether to follow symbolic links */
  followSymlinks?: boolean;
}

/**
 * Content router configuration
 */
export interface RouterConfig {
  /** Default parsing options */
  defaultOptions: ParsingOptions;
  
  /** Category-specific parsing options */
  categoryOptions?: Partial<Record<ContentCategory, ParsingOptions>>;
  
  /** Type-specific parsing options */
  typeOptions?: Partial<Record<ContentType, ParsingOptions>>;
  
  /** Whether to enable content type detection */
  enableDetection: boolean;
  
  /** Minimum confidence threshold for detection */
  detectionThreshold: number;
} 