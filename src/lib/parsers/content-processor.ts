/**
 * ACKS II Content Processor
 * 
 * This module provides the main content processing pipeline that orchestrates
 * file discovery, parsing, batch processing, and result collection.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { EventEmitter } from 'events';
import { ContentCategory, ContentType } from '../types/content';
import { 
  ProcessorConfig, 
  ProcessingResults, 
  ProcessingProgress, 
  ProcessingEvent,
  ProcessingBatch,
  ProcessingResult,
  ContentFile,
  PipelineHooks
} from './pipeline-types';
import { FileSystemScanner } from './file-scanner';
import { ContentRouter } from './content-router';

/**
 * Main content processing pipeline
 */
export class ContentProcessor extends EventEmitter {
  private config: ProcessorConfig;
  private scanner: FileSystemScanner;
  private router: ContentRouter;
  private hooks: PipelineHooks;
  private progress: ProcessingProgress;
  private results: ProcessingResult[] = [];
  private skippedFiles: ContentFile[] = [];
  
  constructor(config: ProcessorConfig, hooks: PipelineHooks = {}) {
    super();
    
    this.config = {
      concurrency: 3,
      batchSize: 10,
      continueOnError: true,
      includePatterns: ['**/*.md'],
      excludePatterns: ['**/node_modules/**', '**/.git/**', '**/README.md'],
      recursive: true,
      verbose: false,
      ...config
    };
    
    this.hooks = hooks;
    
    // Initialize scanner
    this.scanner = new FileSystemScanner({
      rootDirectory: this.config.rootDirectory,
      recursive: this.config.recursive ?? true,
      includePatterns: this.config.includePatterns || ['**/*.md'],
      excludePatterns: this.config.excludePatterns || [],
      followSymlinks: false
    });
    
    // Initialize router
    this.router = new ContentRouter({
      defaultOptions: this.config.parsingOptions,
      enableDetection: true,
      detectionThreshold: 0.5
    });
    
    // Initialize progress
    this.progress = {
      totalFiles: 0,
      processedFiles: 0,
      successfulFiles: 0,
      failedFiles: 0,
      skippedFiles: 0,
      startTime: new Date(),
      percentComplete: 0
    };
  }
  
  /**
   * Process all content files in the configured directory
   * 
   * @returns Processing results
   */
  async process(): Promise<ProcessingResults> {
    try {
      this.log('Starting content processing pipeline...');
      this.emitEvent('start');
      
      // Discover files
      this.log('Discovering content files...');
      const discoveredFiles = await this.scanner.discoverFiles();
      
      // Filter files that should be processed
      const filesToProcess = discoveredFiles.filter(file => file.shouldProcess);
      this.skippedFiles = discoveredFiles.filter(file => !file.shouldProcess);
      
      this.progress.totalFiles = filesToProcess.length;
      this.log(`Found ${filesToProcess.length} files to process, ${this.skippedFiles.length} skipped`);
      
      if (filesToProcess.length === 0) {
        this.log('No files to process');
        return this.buildResults();
      }
      
      // Create batches
      const batches = this.createBatches(filesToProcess);
      this.log(`Created ${batches.length} processing batches`);
      
      // Process batches
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        this.log(`Processing batch ${i + 1}/${batches.length} (${batch.files.length} files)...`);
        
        this.progress.currentBatch = batch.id;
        await this.processBatch(batch);
        
        this.emitEvent('batch-complete', { batch });
        
        // Check if we should continue processing
        if (!this.config.continueOnError && this.progress.failedFiles > 0) {
          this.log('Stopping processing due to errors and continueOnError=false');
          break;
        }
      }
      
      this.log('Content processing completed');
      const results = this.buildResults();
      this.emitEvent('complete');
      
      return results;
      
    } catch (error) {
      this.log(`Processing failed: ${error instanceof Error ? error.message : String(error)}`);
      this.emitEvent('error');
      throw error;
    }
  }
  
  /**
   * Process a single batch of files
   * 
   * @param batch - Batch to process
   */
  private async processBatch(batch: ProcessingBatch): Promise<void> {
    try {
      // Apply pre-process hooks
      const processableFiles: ContentFile[] = [];
      for (const file of batch.files) {
        let processedFile = file;
        
        // Apply pre-process hooks
        if (this.hooks.preProcess) {
          for (const hook of this.hooks.preProcess) {
            const result = await hook(processedFile);
            if (result === null) {
              // Hook indicates file should be skipped
              this.skippedFiles.push(processedFile);
              this.progress.skippedFiles++;
              continue;
            }
            processedFile = result;
          }
        }
        
        processableFiles.push(processedFile);
      }
      
      // Process files with concurrency control
      const batchResults = await this.router.routeFilesConcurrent(
        processableFiles, 
        this.config.concurrency
      );
      
      // Apply post-process hooks and collect results
      for (let result of batchResults) {
        try {
          // Apply post-process hooks
          if (this.hooks.postProcess) {
            for (const hook of this.hooks.postProcess) {
              result = await hook(result);
            }
          }
          
          // Update progress
          this.progress.processedFiles++;
          if (result.success) {
            this.progress.successfulFiles++;
          } else {
            this.progress.failedFiles++;
            
            // Apply error hooks
            if (this.hooks.onError && result.error) {
              const error = new Error(result.error);
              for (const hook of this.hooks.onError) {
                const shouldContinue = await hook(error, result.file);
                if (!shouldContinue) {
                  throw error;
                }
              }
            }
          }
          
          this.results.push(result);
          this.updateProgress();
          this.emitEvent('file-complete', { result });
          
        } catch (error) {
          this.log(`Error in post-processing ${result.file.path}: ${error instanceof Error ? error.message : String(error)}`);
          
          if (!this.config.continueOnError) {
            throw error;
          }
        }
      }
      
    } catch (error) {
      this.log(`Batch processing failed: ${error instanceof Error ? error.message : String(error)}`);
      
      if (!this.config.continueOnError) {
        throw error;
      }
    }
  }
  
  /**
   * Create processing batches from files
   * 
   * @param files - Files to batch
   * @returns Array of processing batches
   */
  private createBatches(files: ContentFile[]): ProcessingBatch[] {
    const batches: ProcessingBatch[] = [];
    const batchSize = this.config.batchSize || 10;
    
    for (let i = 0; i < files.length; i += batchSize) {
      const batchFiles = files.slice(i, i + batchSize);
      
      batches.push({
        id: `batch-${Math.floor(i / batchSize) + 1}`,
        files: batchFiles,
        createdAt: new Date(),
        estimatedTime: batchFiles.length * 100 // Rough estimate: 100ms per file
      });
    }
    
    return batches;
  }
  
  /**
   * Update processing progress
   */
  private updateProgress(): void {
    this.progress.percentComplete = this.progress.totalFiles > 0 
      ? (this.progress.processedFiles / this.progress.totalFiles) * 100 
      : 0;
    
    // Calculate processing rate
    const elapsedTime = Date.now() - this.progress.startTime.getTime();
    this.progress.processingRate = this.progress.processedFiles / (elapsedTime / 1000);
    
    // Estimate completion time
    if (this.progress.processingRate > 0) {
      const remainingFiles = this.progress.totalFiles - this.progress.processedFiles;
      const remainingTime = remainingFiles / this.progress.processingRate;
      this.progress.estimatedCompletion = new Date(Date.now() + remainingTime * 1000);
    }
    
    // Emit progress event
    if (this.hooks.onProgress) {
      for (const hook of this.hooks.onProgress) {
        hook(this.progress);
      }
    }
    
    this.emitEvent('progress');
  }
  
  /**
   * Build final processing results
   * 
   * @returns Complete processing results
   */
  private buildResults(): ProcessingResults {
    const totalTime = Date.now() - this.progress.startTime.getTime();
    
    // Calculate error summary
    const errorSummary = {
      totalErrors: this.results.filter(r => !r.success).length,
      criticalErrors: this.results.filter(r => r.parseResult?.errors.some(e => e.severity === 'critical')).length,
      warnings: this.results.reduce((sum, r) => sum + (r.parseResult?.warnings.length || 0), 0),
      errorsByType: {} as Record<string, number>,
      errorsByCategory: {} as Record<ContentCategory, number>
    };
    
    // Calculate content statistics
    const contentStats = {
      totalContent: this.results.filter(r => r.success).length,
      contentByType: {} as Record<ContentType, number>,
      contentByCategory: {} as Record<ContentCategory, number>,
      averageFileSize: 0,
      largestFile: '',
      smallestFile: ''
    };
    
    // Populate content statistics
    let totalSize = 0;
    let largestSize = 0;
    let smallestSize = Infinity;
    
    for (const result of this.results) {
      if (result.success && result.content) {
        // Count by type
        const type = result.content.contentType;
        contentStats.contentByType[type] = (contentStats.contentByType[type] || 0) + 1;
        
        // Count by category
        const category = result.content.category;
        contentStats.contentByCategory[category] = (contentStats.contentByCategory[category] || 0) + 1;
      }
      
      // Track file sizes
      const fileSize = result.file.size;
      totalSize += fileSize;
      
      if (fileSize > largestSize) {
        largestSize = fileSize;
        contentStats.largestFile = result.file.relativePath;
      }
      
      if (fileSize < smallestSize) {
        smallestSize = fileSize;
        contentStats.smallestFile = result.file.relativePath;
      }
    }
    
    contentStats.averageFileSize = this.results.length > 0 ? totalSize / this.results.length : 0;
    
    return {
      success: this.progress.failedFiles === 0,
      progress: this.progress,
      fileResults: this.results,
      skippedFiles: this.skippedFiles,
      errorSummary,
      performance: {
        totalTime,
        averageFileTime: this.results.length > 0 ? totalTime / this.results.length : 0,
        filesPerSecond: this.progress.processingRate || 0
      },
      contentStats
    };
  }
  
  /**
   * Emit a processing event
   * 
   * @param type - Event type
   * @param data - Event data
   */
  private emitEvent(type: ProcessingEvent['type'], data?: ProcessingEvent['data']): void {
    const event: ProcessingEvent = {
      type,
      timestamp: new Date(),
      progress: { ...this.progress },
      data
    };
    
    this.emit('processing-event', event);
    this.emit(type, event);
  }
  
  /**
   * Log a message if verbose mode is enabled
   * 
   * @param message - Message to log
   */
  private log(message: string): void {
    if (this.config.verbose) {
      console.log(`[ContentProcessor] ${message}`);
    }
  }
  
  /**
   * Get current processing progress
   * 
   * @returns Current progress
   */
  getProgress(): ProcessingProgress {
    return { ...this.progress };
  }
  
  /**
   * Get processor configuration
   * 
   * @returns Processor configuration
   */
  getConfig(): ProcessorConfig {
    return { ...this.config };
  }
} 