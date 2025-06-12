#!/usr/bin/env ts-node

/**
 * ACKS II Content Processing CLI
 * 
 * A comprehensive command-line tool for batch processing ACKS II markdown content
 * into structured JSON data. This script orchestrates the entire content processing
 * pipeline including file discovery, parsing, validation, and output generation.
 * 
 * Features:
 * - Configurable input/output directories
 * - Multiple output formats (single, collection, indexed)
 * - Parallel processing with configurable concurrency
 * - Progress reporting with ETA estimation
 * - Detailed logging with multiple verbosity levels
 * - Incremental processing (only changed files)
 * - Watch mode for continuous development
 * - Comprehensive error handling and recovery
 * - Configuration file support (JSON/YAML)
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'fs';
import { join, resolve, relative, dirname } from 'path';
import { createHash } from 'crypto';
import chalk from 'chalk';
import ora from 'ora';
import { watch } from 'chokidar';
import yaml from 'js-yaml';

// Import our content processing components
import { ContentProcessor } from '../src/lib/parsers/content-processor.ts';
import { generateJsonOutput, validateContent, OutputOptions, OutputFile } from '../src/lib/parsers/json-output.ts';
import { ContentType, ContentCategory, AnyContent } from '../src/lib/types/content.ts';
import type { ProcessorConfig, ProcessingResults, ProcessingEvent } from '../src/lib/parsers/pipeline-types.ts';
import { ParsingOptions } from '../src/lib/parsers/types.ts';

/**
 * CLI Configuration interface
 */
interface CLIConfig {
  /** Input directory containing ACKS II content */
  inputDir: string;
  /** Output directory for processed JSON files */
  outputDir: string;
  /** Output format: single, collection, or indexed */
  outputFormat: 'single' | 'collection' | 'indexed';
  /** Content types to process (empty = all) */
  contentTypes: ContentType[];
  /** Content categories to process (empty = all) */
  categories: ContentCategory[];
  /** Number of concurrent processing tasks */
  concurrency: number;
  /** Batch size for processing */
  batchSize: number;
  /** Validation level: strict, normal, or lenient */
  validationLevel: 'strict' | 'normal' | 'lenient';
  /** Continue processing on errors */
  continueOnError: boolean;
  /** Enable incremental processing */
  incremental: boolean;
  /** Watch mode for continuous processing */
  watch: boolean;
  /** Logging verbosity level */
  verbose: number;
  /** Pretty print JSON output */
  prettyPrint: boolean;
  /** Generate validation reports */
  generateReports: boolean;
  /** Configuration file path */
  configFile?: string;
}

/**
 * Default CLI configuration
 */
const DEFAULT_CONFIG: CLIConfig = {
  inputDir: './ACKS_II_Content',
  outputDir: './output',
  outputFormat: 'collection',
  contentTypes: [],
  categories: [],
  concurrency: 3,
  batchSize: 10,
  validationLevel: 'normal',
  continueOnError: true,
  incremental: false,
  watch: false,
  verbose: 1,
  prettyPrint: true,
  generateReports: true
};

/**
 * Processing statistics tracker
 */
class ProcessingStats {
  public startTime: Date = new Date();
  public endTime?: Date;
  public totalFiles: number = 0;
  public processedFiles: number = 0;
  public successfulFiles: number = 0;
  public failedFiles: number = 0;
  public skippedFiles: number = 0;
  public validationErrors: number = 0;
  public validationWarnings: number = 0;

  /**
   * Calculate processing duration in milliseconds
   */
  get duration(): number {
    const end = this.endTime || new Date();
    return end.getTime() - this.startTime.getTime();
  }

  /**
   * Calculate estimated time remaining
   */
  getETA(): number {
    if (this.processedFiles === 0) return 0;
    const avgTimePerFile = this.duration / this.processedFiles;
    const remainingFiles = this.totalFiles - this.processedFiles;
    return avgTimePerFile * remainingFiles;
  }

  /**
   * Calculate processing rate (files per second)
   */
  get rate(): number {
    const durationSeconds = this.duration / 1000;
    return durationSeconds > 0 ? this.processedFiles / durationSeconds : 0;
  }
}

/**
 * File hash cache for incremental processing
 */
class FileHashCache {
  private cache: Map<string, string> = new Map();
  private cacheFile: string;

  constructor(cacheDir: string) {
    this.cacheFile = join(cacheDir, '.content-hash-cache.json');
    this.loadCache();
  }

  /**
   * Load hash cache from disk
   */
  private loadCache(): void {
    try {
      if (existsSync(this.cacheFile)) {
        const data = JSON.parse(readFileSync(this.cacheFile, 'utf-8'));
        this.cache = new Map(Object.entries(data));
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not load hash cache: ${error}`));
    }
  }

  /**
   * Save hash cache to disk
   */
  saveCache(): void {
    try {
      const data = Object.fromEntries(this.cache);
      writeFileSync(this.cacheFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not save hash cache: ${error}`));
    }
  }

  /**
   * Calculate file hash
   */
  private calculateHash(filePath: string): string {
    const content = readFileSync(filePath, 'utf-8');
    const stats = statSync(filePath);
    const hashInput = `${content}:${stats.mtime.getTime()}`;
    return createHash('md5').update(hashInput).digest('hex');
  }

  /**
   * Check if file has changed since last processing
   */
  hasChanged(filePath: string): boolean {
    const currentHash = this.calculateHash(filePath);
    const cachedHash = this.cache.get(filePath);
    
    if (cachedHash !== currentHash) {
      this.cache.set(filePath, currentHash);
      return true;
    }
    
    return false;
  }

  /**
   * Mark file as processed
   */
  markProcessed(filePath: string): void {
    const hash = this.calculateHash(filePath);
    this.cache.set(filePath, hash);
  }
}

/**
 * Progress reporter with ETA estimation
 */
class ProgressReporter {
  private spinner = ora();
  private stats: ProcessingStats;
  private verbose: number;

  constructor(stats: ProcessingStats, verbose: number) {
    this.stats = stats;
    this.verbose = verbose;
  }

  /**
   * Start progress reporting
   */
  start(message: string): void {
    if (this.verbose > 0) {
      this.spinner.start(chalk.blue(message));
    }
  }

  /**
   * Update progress with current status
   */
  update(currentFile?: string): void {
    if (this.verbose === 0) return;

    const { processedFiles, totalFiles, successfulFiles, failedFiles } = this.stats;
    const percentage = totalFiles > 0 ? Math.round((processedFiles / totalFiles) * 100) : 0;
    const eta = this.stats.getETA();
    const etaText = eta > 0 ? ` (ETA: ${this.formatDuration(eta)})` : '';
    
    let message = `Processing: ${processedFiles}/${totalFiles} (${percentage}%)${etaText}`;
    
    if (currentFile && this.verbose > 1) {
      const shortPath = relative(process.cwd(), currentFile);
      message += `\n${chalk.gray('Current:')} ${shortPath}`;
    }

    if (failedFiles > 0) {
      message += chalk.red(` | ${failedFiles} failed`);
    }

    this.spinner.text = message;
  }

  /**
   * Complete progress reporting
   */
  complete(message: string): void {
    if (this.verbose > 0) {
      this.spinner.succeed(chalk.green(message));
    }
  }

  /**
   * Report error
   */
  error(message: string): void {
    if (this.verbose > 0) {
      this.spinner.fail(chalk.red(message));
    }
  }

  /**
   * Format duration in human-readable format
   */
  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}

/**
 * Load configuration from file
 */
function loadConfigFile(configPath: string): Partial<CLIConfig> {
  try {
    const content = readFileSync(configPath, 'utf-8');
    const ext = configPath.toLowerCase();
    
    if (ext.endsWith('.yaml') || ext.endsWith('.yml')) {
      return yaml.load(content) as Partial<CLIConfig>;
    } else {
      return JSON.parse(content);
    }
  } catch (error) {
    throw new Error(`Failed to load config file ${configPath}: ${error}`);
  }
}

/**
 * Merge configuration from multiple sources
 */
function mergeConfig(
  defaults: CLIConfig,
  fileConfig: Partial<CLIConfig> = {},
  cliConfig: Partial<CLIConfig> = {}
): CLIConfig {
  return {
    ...defaults,
    ...fileConfig,
    ...cliConfig
  };
}

/**
 * Validate configuration
 */
function validateConfig(config: CLIConfig): void {
  if (!existsSync(config.inputDir)) {
    throw new Error(`Input directory does not exist: ${config.inputDir}`);
  }

  if (config.concurrency < 1 || config.concurrency > 10) {
    throw new Error('Concurrency must be between 1 and 10');
  }

  if (config.batchSize < 1 || config.batchSize > 100) {
    throw new Error('Batch size must be between 1 and 100');
  }

  if (!['single', 'collection', 'indexed'].includes(config.outputFormat)) {
    throw new Error('Output format must be single, collection, or indexed');
  }

  if (!['strict', 'normal', 'lenient'].includes(config.validationLevel)) {
    throw new Error('Validation level must be strict, normal, or lenient');
  }
}

/**
 * Generate processing summary report
 */
function generateSummaryReport(stats: ProcessingStats, config: CLIConfig): string {
  const duration = stats.duration;
  const rate = stats.rate;
  
  const report = [
    chalk.bold('\n📊 Processing Summary'),
    chalk.gray('─'.repeat(50)),
    `📁 Input Directory: ${config.inputDir}`,
    `📤 Output Directory: ${config.outputDir}`,
    `📋 Output Format: ${config.outputFormat}`,
    `⏱️  Total Duration: ${formatDuration(duration)}`,
    `📈 Processing Rate: ${rate.toFixed(2)} files/sec`,
    '',
    chalk.bold('📈 File Statistics:'),
    `  ✅ Total Files: ${stats.totalFiles}`,
    `  🎯 Processed: ${stats.processedFiles}`,
    `  ✅ Successful: ${stats.successfulFiles}`,
    `  ❌ Failed: ${stats.failedFiles}`,
    `  ⏭️  Skipped: ${stats.skippedFiles}`,
    '',
    chalk.bold('🔍 Validation Results:'),
    `  ⚠️  Errors: ${stats.validationErrors}`,
    `  💡 Warnings: ${stats.validationWarnings}`,
    ''
  ];

  if (stats.failedFiles > 0) {
    report.push(chalk.red(`⚠️  ${stats.failedFiles} files failed to process. Check logs for details.`));
  } else {
    report.push(chalk.green('🎉 All files processed successfully!'));
  }

  return report.join('\n');
}

/**
 * Format duration helper
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Main processing function
 */
async function processContent(config: CLIConfig): Promise<void> {
  const stats = new ProcessingStats();
  const reporter = new ProgressReporter(stats, config.verbose);
  const hashCache = config.incremental ? new FileHashCache(config.outputDir) : null;

  try {
    // Initialize content processor
    const processorConfig: ProcessorConfig = {
      rootDirectory: resolve(config.inputDir),
      outputDirectory: resolve(config.outputDir),
      parsingOptions: {
        continueOnError: config.continueOnError,
        verbose: config.verbose > 1,
        maxErrors: config.validationLevel === 'strict' ? 1 : 10,
        autoRepair: config.validationLevel === 'lenient',
        extractCrossReferences: true
      },
      concurrency: config.concurrency,
      batchSize: config.batchSize,
      continueOnError: config.continueOnError,
      recursive: true,
      verbose: config.verbose > 1
    };

    const processor = new ContentProcessor(processorConfig);

    // Set up event listeners for progress tracking
    processor.on('progress', (event: ProcessingEvent) => {
      stats.processedFiles = event.progress.processedFiles;
      stats.totalFiles = event.progress.totalFiles;
      stats.failedFiles = event.progress.failedFiles;
      stats.successfulFiles = event.progress.successfulFiles;
      
      reporter.update(event.progress.currentFile);
    });

    processor.on('file-complete', (event: ProcessingEvent) => {
      if (hashCache && event.data?.result?.success) {
        hashCache.markProcessed(event.data.result.file.path);
      }
    });

    processor.on('error', (event: ProcessingEvent) => {
      if (event.data?.error) {
        stats.validationErrors++;
      }
    });

    // Start processing
    reporter.start('Initializing content processing...');
    
    const results: ProcessingResults = await processor.process();
    
    stats.endTime = new Date();
    stats.totalFiles = results.progress.totalFiles;
    stats.processedFiles = results.progress.processedFiles;
    stats.successfulFiles = results.progress.successfulFiles;
    stats.failedFiles = results.progress.failedFiles;

    // Generate output files
    if (results.progress.successfulFiles > 0) {
      reporter.update();
      
      const outputOptions: Partial<OutputOptions> = {
        format: config.outputFormat,
        prettyPrint: config.prettyPrint,
        includeValidation: config.validationLevel !== 'lenient',
        includeTimestamps: true,
        includeCrossReferences: true,
        version: '1.0.0'
      };

      // Group content by type for output generation
      const contentByType = new Map<ContentType, AnyContent[]>();
      
      // Process results and group by content type
      results.fileResults.forEach(result => {
        if (result.success && result.content) {
          const contentType = result.content.contentType;
          if (!contentByType.has(contentType)) {
            contentByType.set(contentType, []);
          }
          contentByType.get(contentType)!.push(result.content);
        }
      });

      // Generate output files for each content type
      for (const [contentType, items] of contentByType) {
        const outputFile = generateJsonOutput(items, contentType, outputOptions);
        const outputPath = join(config.outputDir, `${contentType}.json`);
        
        // Ensure output directory exists
        const outputDir = dirname(outputPath);
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        
        // Write output file
        const jsonContent = JSON.stringify(outputFile, null, config.prettyPrint ? 2 : 0);
        writeFileSync(outputPath, jsonContent, 'utf-8');
        
        if (config.verbose > 1) {
          console.log(chalk.blue(`📄 Generated ${contentType} output: ${outputPath}`));
        }
      }
    }

    // Save hash cache if using incremental processing
    if (hashCache) {
      hashCache.saveCache();
    }

    // Generate and display summary report
    const summaryReport = generateSummaryReport(stats, config);
    reporter.complete('Content processing completed!');
    
    if (config.verbose > 0) {
      console.log(summaryReport);
    }

    // Generate detailed reports if requested
    if (config.generateReports) {
      const reportPath = join(config.outputDir, 'processing-report.json');
      const reportData = {
        timestamp: new Date().toISOString(),
        config: config,
        statistics: stats,
        results: results
      };
      
      // Ensure output directory exists for the report
      const outputDirForReport = dirname(reportPath);
      if (!existsSync(outputDirForReport)) {
        mkdirSync(outputDirForReport, { recursive: true });
      }

      writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
      
      if (config.verbose > 1) {
        console.log(chalk.blue(`📄 Detailed report saved to: ${reportPath}`));
      }
    }

  } catch (error) {
    stats.endTime = new Date();
    reporter.error(`Processing failed: ${error}`);
    
    if (config.verbose > 1) {
      console.error(chalk.red('\nError details:'), error);
    }
    
    process.exit(1);
  }
}

/**
 * Watch mode implementation
 */
function startWatchMode(config: CLIConfig): void {
  console.log(chalk.blue(`👀 Watching ${config.inputDir} for changes...`));
  console.log(chalk.gray('Press Ctrl+C to stop watching\n'));

  const watcher = watch(config.inputDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
  });

  let processing = false;

  const processChanges = async () => {
    if (processing) return;
    
    processing = true;
    try {
      await processContent({ ...config, watch: false });
    } catch (error) {
      console.error(chalk.red('Watch mode processing error:'), error);
    } finally {
      processing = false;
    }
  };

  watcher
    .on('add', (path) => {
      console.log(chalk.green(`➕ File added: ${relative(config.inputDir, path)}`));
      processChanges();
    })
    .on('change', (path) => {
      console.log(chalk.yellow(`📝 File changed: ${relative(config.inputDir, path)}`));
      processChanges();
    })
    .on('unlink', (path) => {
      console.log(chalk.red(`➖ File removed: ${relative(config.inputDir, path)}`));
      processChanges();
    })
    .on('error', (error) => {
      console.error(chalk.red('Watch error:'), error);
    });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.blue('\n👋 Stopping watch mode...'));
    watcher.close();
    process.exit(0);
  });
}

/**
 * CLI Program Setup
 */
const program = new Command();

program
  .name('process-content')
  .description('ACKS II Content Processing CLI - Batch process markdown content into structured JSON')
  .version('1.0.0');

program
  .option('-i, --input <dir>', 'Input directory containing ACKS II content', DEFAULT_CONFIG.inputDir)
  .option('-o, --output <dir>', 'Output directory for processed JSON files', DEFAULT_CONFIG.outputDir)
  .option('-f, --format <format>', 'Output format: single, collection, or indexed', DEFAULT_CONFIG.outputFormat)
  .option('-t, --types <types>', 'Content types to process (comma-separated)', '')
  .option('-c, --categories <categories>', 'Content categories to process (comma-separated)', '')
  .option('--concurrency <number>', 'Number of concurrent processing tasks', String(DEFAULT_CONFIG.concurrency))
  .option('--batch-size <number>', 'Batch size for processing', String(DEFAULT_CONFIG.batchSize))
  .option('--validation <level>', 'Validation level: strict, normal, or lenient', DEFAULT_CONFIG.validationLevel)
  .option('--no-continue-on-error', 'Stop processing on first error')
  .option('--incremental', 'Enable incremental processing (only changed files)')
  .option('--watch', 'Watch mode for continuous processing')
  .option('-v, --verbose', 'Increase verbosity level', (_, prev) => prev + 1, 0)
  .option('--no-pretty-print', 'Disable pretty printing of JSON output')
  .option('--no-reports', 'Disable generation of processing reports')
  .option('--config <file>', 'Configuration file path (JSON or YAML)')
  .action(async (options) => {
    try {
      // Load configuration from file if specified
      let fileConfig: Partial<CLIConfig> = {};
      if (options.config) {
        fileConfig = loadConfigFile(options.config);
      }

      // Parse CLI options
      const cliConfig: Partial<CLIConfig> = {
        inputDir: options.input,
        outputDir: options.output,
        outputFormat: options.format,
        contentTypes: options.types ? options.types.split(',').map((t: string) => t.trim() as ContentType) : [],
        categories: options.categories ? options.categories.split(',').map((c: string) => c.trim() as ContentCategory) : [],
        concurrency: parseInt(options.concurrency),
        batchSize: parseInt(options.batchSize),
        validationLevel: options.validation,
        continueOnError: options.continueOnError,
        incremental: options.incremental,
        watch: options.watch,
        verbose: options.verbose,
        prettyPrint: options.prettyPrint,
        generateReports: options.reports,
        configFile: options.config
      };

      // Merge configurations
      const config = mergeConfig(DEFAULT_CONFIG, fileConfig, cliConfig);

      // Validate configuration
      validateConfig(config);

      // Start processing
      if (config.watch) {
        startWatchMode(config);
      } else {
        await processContent(config);
      }

    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(); 