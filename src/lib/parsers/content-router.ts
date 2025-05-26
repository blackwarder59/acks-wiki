/**
 * ACKS II Content Router
 * 
 * This module routes content files to appropriate parsers based on
 * content category, type detection, and configuration settings.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { promises as fs } from 'fs';
import { ContentCategory, ContentType } from '../types/content';
import { ParsingOptions } from './types';
import { ContentFile, RouterConfig, ProcessingResult } from './pipeline-types';
import { parseMarkdown } from './markdown-parser';
import { detectContentType } from './content-detector';

/**
 * Content router that directs files to appropriate parsers
 */
export class ContentRouter {
  private config: RouterConfig;
  
  constructor(config: RouterConfig) {
    this.config = {
      ...config,
      enableDetection: config.enableDetection ?? true,
      detectionThreshold: config.detectionThreshold ?? 0.5
    };
  }
  
  /**
   * Route a content file to the appropriate parser
   * 
   * @param file - Content file to process
   * @returns Processing result
   */
  async routeFile(file: ContentFile): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      // Read file content
      const content = await fs.readFile(file.path, 'utf-8');
      
      // Get parsing options for this file
      const options = this.getParsingOptions(file);
      
      // Parse the content
      const parseResult = parseMarkdown(content, file.path, options);
      
      const processingTime = Date.now() - startTime;
      
      return {
        file,
        success: parseResult.success,
        content: parseResult.content,
        parseResult,
        processingTime
      };
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      return {
        file,
        success: false,
        processingTime,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Route multiple files in batch
   * 
   * @param files - Array of content files to process
   * @returns Array of processing results
   */
  async routeFiles(files: ContentFile[]): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];
    
    for (const file of files) {
      const result = await this.routeFile(file);
      results.push(result);
    }
    
    return results;
  }
  
  /**
   * Route files with concurrency control
   * 
   * @param files - Array of content files to process
   * @param concurrency - Maximum number of concurrent operations
   * @returns Array of processing results
   */
  async routeFilesConcurrent(files: ContentFile[], concurrency: number = 3): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];
    const queue = [...files];
    const running: Promise<void>[] = [];
    
    const processNext = async (): Promise<void> => {
      const file = queue.shift();
      if (!file) return;
      
      const result = await this.routeFile(file);
      results.push(result);
      
      // Process next file if queue is not empty
      if (queue.length > 0) {
        return processNext();
      }
    };
    
    // Start initial concurrent operations
    for (let i = 0; i < Math.min(concurrency, files.length); i++) {
      running.push(processNext());
    }
    
    // Wait for all operations to complete
    await Promise.all(running);
    
    // Sort results to match input order
    results.sort((a, b) => {
      const aIndex = files.findIndex(f => f.path === a.file.path);
      const bIndex = files.findIndex(f => f.path === b.file.path);
      return aIndex - bIndex;
    });
    
    return results;
  }
  
  /**
   * Get parsing options for a specific file
   * 
   * @param file - Content file
   * @returns Parsing options to use
   */
  private getParsingOptions(file: ContentFile): ParsingOptions {
    // Start with default options
    let options = { ...this.config.defaultOptions };
    
    // Apply category-specific options
    if (this.config.categoryOptions?.[file.category]) {
      options = {
        ...options,
        ...this.config.categoryOptions[file.category]
      };
    }
    
    // Apply type-specific options if content type is known
    // Note: This would require pre-detection or file naming conventions
    // For now, we'll let the parser handle type detection
    
    // Configure content type detection
    if (!this.config.enableDetection) {
      // Force content type based on category if detection is disabled
      options.forceContentType = this.getDefaultContentType(file.category);
    }
    
    return options;
  }
  
  /**
   * Get default content type for a category
   * 
   * @param category - Content category
   * @returns Default content type for the category
   */
  private getDefaultContentType(category: ContentCategory): ContentType {
    switch (category) {
      case ContentCategory.MONSTROUS_MANUAL:
        return ContentType.MONSTER;
      case ContentCategory.JUDGES_JOURNAL:
        return ContentType.RULE;
      case ContentCategory.RULEBOOK:
        return ContentType.RULE;
      default:
        return ContentType.RULE;
    }
  }
  
  /**
   * Analyze content type distribution for a set of files
   * 
   * @param files - Array of content files
   * @returns Content type analysis
   */
  async analyzeContentTypes(files: ContentFile[]): Promise<{
    typeDistribution: Record<ContentType, number>;
    categoryDistribution: Record<ContentCategory, number>;
    detectionConfidence: {
      high: number;    // > 0.8
      medium: number;  // 0.5 - 0.8
      low: number;     // < 0.5
    };
    sampleResults: Array<{
      file: string;
      detectedType: ContentType;
      confidence: number;
      indicators: string[];
    }>;
  }> {
    const typeDistribution: Record<ContentType, number> = {} as Record<ContentType, number>;
    const categoryDistribution: Record<ContentCategory, number> = {} as Record<ContentCategory, number>;
    const detectionConfidence = { high: 0, medium: 0, low: 0 };
    const sampleResults: Array<{
      file: string;
      detectedType: ContentType;
      confidence: number;
      indicators: string[];
    }> = [];
    
    // Sample up to 50 files for analysis to avoid performance issues
    const sampleFiles = files.slice(0, 50);
    
    for (const file of sampleFiles) {
      try {
        // Count by category
        categoryDistribution[file.category] = (categoryDistribution[file.category] || 0) + 1;
        
        // Detect content type
        const content = await fs.readFile(file.path, 'utf-8');
        const detection = detectContentType(content);
        
        // Count by detected type
        typeDistribution[detection.contentType] = (typeDistribution[detection.contentType] || 0) + 1;
        
        // Track confidence levels
        if (detection.confidence > 0.8) {
          detectionConfidence.high++;
        } else if (detection.confidence >= 0.5) {
          detectionConfidence.medium++;
        } else {
          detectionConfidence.low++;
        }
        
        // Add to sample results
        sampleResults.push({
          file: file.relativePath,
          detectedType: detection.contentType,
          confidence: detection.confidence,
          indicators: detection.indicators
        });
        
      } catch (error) {
        console.warn(`Warning: Could not analyze file ${file.path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    return {
      typeDistribution,
      categoryDistribution,
      detectionConfidence,
      sampleResults
    };
  }
  
  /**
   * Validate router configuration
   * 
   * @returns Validation result
   */
  validateConfig(): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check required fields
    if (!this.config.defaultOptions) {
      errors.push('Default parsing options are required');
    }
    
    // Check detection threshold
    if (this.config.detectionThreshold < 0 || this.config.detectionThreshold > 1) {
      errors.push('Detection threshold must be between 0 and 1');
    }
    
    // Check for reasonable threshold values
    if (this.config.detectionThreshold < 0.3) {
      warnings.push('Very low detection threshold may result in unreliable type detection');
    }
    
    if (this.config.detectionThreshold > 0.9) {
      warnings.push('Very high detection threshold may result in many files being unclassified');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Get router statistics
   * 
   * @returns Router configuration and statistics
   */
  getStats(): {
    config: RouterConfig;
    validation: ReturnType<ContentRouter['validateConfig']>;
  } {
    return {
      config: this.config,
      validation: this.validateConfig()
    };
  }
} 