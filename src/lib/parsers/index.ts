/**
 * ACKS II Content Processing Pipeline
 * 
 * This module exports the complete content processing pipeline
 * for parsing ACKS II markdown files into structured content.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

// Core parsing utilities
export * from './parsing-utils';
export * from './content-detector';
export * from './markdown-parser';

// Specialized parsers
export * from './monster-parser';
export * from './spell-parser';
export * from './class-parser';
export * from './equipment-parser';
export * from './rule-parser';
export * from './proficiency-parser';

// Processing pipeline
export * from './pipeline-types';
export * from './file-scanner';
export * from './content-router';
export * from './content-processor';

// Formatting utilities
export * from './formatting-utils';

// Type definitions
export * from './types';

// Convenience function for quick processing
import { ContentProcessor } from './content-processor';
import { ProcessorConfig, ProcessingResults } from './pipeline-types';

/**
 * Process ACKS II content files with default configuration
 * 
 * @param rootDirectory - Root directory containing ACKS II content
 * @param options - Optional processing configuration
 * @returns Processing results
 */
export async function processAcksContent(
  rootDirectory: string,
  options: Partial<ProcessorConfig> = {}
): Promise<ProcessingResults> {
  const config: ProcessorConfig = {
    rootDirectory,
    parsingOptions: {
      continueOnError: true,
      verbose: false,
      maxErrors: 50,
      autoRepair: false,
      extractCrossReferences: true
    },
    concurrency: 3,
    batchSize: 10,
    continueOnError: true,
    verbose: false,
    ...options
  };
  
  const processor = new ContentProcessor(config);
  return await processor.process();
} 