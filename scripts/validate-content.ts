#!/usr/bin/env ts-node

/**
 * ACKS II Content Validation CLI
 * 
 * A focused validation tool for checking ACKS II markdown content files
 * for structural and data integrity issues without generating output files.
 * This script is useful for CI/CD pipelines and content quality assurance.
 * 
 * Features:
 * - Fast validation-only processing
 * - Detailed error reporting with line numbers
 * - Multiple validation levels (strict, normal, lenient)
 * - JSON and text output formats for reports
 * - Exit codes for CI/CD integration
 * - Configurable error thresholds
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve, relative } from 'path';
import chalk from 'chalk';
import ora from 'ora';

// Import validation components
import { validateContent as validateContentItem, generateValidationSummary, ValidationResult } from '../src/lib/parsers/json-output';
import { ContentProcessor } from '../src/lib/parsers/content-processor';
import { ContentType, ContentCategory, ParseError, ErrorSeverity } from '../src/lib/types/content';
import type { ProcessorConfig, ProcessingResults, ProcessingEvent } from '../src/lib/parsers/pipeline-types';
import { ParsingOptions } from '../src/lib/parsers/types';

/**
 * Validation configuration interface
 */
interface ValidationConfig {
  /** Input directory containing ACKS II content */
  inputDir: string;
  /** Output file for validation report */
  reportFile?: string;
  /** Validation level: strict, normal, or lenient */
  validationLevel: 'strict' | 'normal' | 'lenient';
  /** Report format: json or text */
  reportFormat: 'json' | 'text';
  /** Content types to validate (empty = all) */
  contentTypes: ContentType[];
  /** Content categories to validate (empty = all) */
  categories: ContentCategory[];
  /** Maximum number of errors before stopping */
  maxErrors: number;
  /** Whether to show warnings */
  showWarnings: boolean;
  /** Logging verbosity level */
  verbose: number;
  /** Whether to use colors in output */
  useColors: boolean;
  /** Exit with error code if validation fails */
  exitOnError: boolean;
}

/**
 * Default validation configuration
 */
const DEFAULT_CONFIG: ValidationConfig = {
  inputDir: './ACKS_II_Content',
  validationLevel: 'normal',
  reportFormat: 'text',
  contentTypes: [],
  categories: [],
  maxErrors: 100,
  showWarnings: true,
  verbose: 1,
  useColors: true,
  exitOnError: true
};

/**
 * Validation statistics tracker
 */
class ValidationStats {
  public startTime: Date = new Date();
  public endTime?: Date;
  public totalFiles: number = 0;
  public validatedFiles: number = 0;
  public validFiles: number = 0;
  public invalidFiles: number = 0;
  public skippedFiles: number = 0;
  public totalErrors: number = 0;
  public totalWarnings: number = 0;
  public criticalErrors: number = 0;
  public errorsByType: Record<string, number> = {};
  public errorsByFile: Record<string, number> = {};

  /**
   * Calculate validation duration in milliseconds
   */
  get duration(): number {
    const end = this.endTime || new Date();
    return end.getTime() - this.startTime.getTime();
  }

  /**
   * Calculate validation rate (files per second)
   */
  get rate(): number {
    const durationSeconds = this.duration / 1000;
    return durationSeconds > 0 ? this.validatedFiles / durationSeconds : 0;
  }

  /**
   * Get overall validation success rate
   */
  get successRate(): number {
    return this.validatedFiles > 0 ? (this.validFiles / this.validatedFiles) * 100 : 0;
  }
}

/**
 * Progress reporter for validation
 */
class ValidationReporter {
  private spinner = ora();
  private stats: ValidationStats;
  private verbose: number;
  private useColors: boolean;

  constructor(stats: ValidationStats, verbose: number, useColors: boolean) {
    this.stats = stats;
    this.verbose = verbose;
    this.useColors = useColors;
  }

  /**
   * Start validation reporting
   */
  start(message: string): void {
    if (this.verbose > 0) {
      this.spinner.start(this.useColors ? chalk.blue(message) : message);
    }
  }

  /**
   * Update progress with current status
   */
  update(currentFile?: string): void {
    if (this.verbose === 0) return;

    const { validatedFiles, totalFiles, validFiles, invalidFiles } = this.stats;
    const percentage = totalFiles > 0 ? Math.round((validatedFiles / totalFiles) * 100) : 0;
    
    let message = `Validating: ${validatedFiles}/${totalFiles} (${percentage}%)`;
    
    if (invalidFiles > 0) {
      const errorText = ` | ${invalidFiles} invalid`;
      message += this.useColors ? chalk.red(errorText) : errorText;
    }

    if (currentFile && this.verbose > 1) {
      const shortPath = relative(process.cwd(), currentFile);
      const fileText = `\n${this.useColors ? chalk.gray('Current:') : 'Current:'} ${shortPath}`;
      message += fileText;
    }

    this.spinner.text = message;
  }

  /**
   * Complete validation reporting
   */
  complete(message: string): void {
    if (this.verbose > 0) {
      this.spinner.succeed(this.useColors ? chalk.green(message) : message);
    }
  }

  /**
   * Report error
   */
  error(message: string): void {
    if (this.verbose > 0) {
      this.spinner.fail(this.useColors ? chalk.red(message) : message);
    }
  }
}

/**
 * Generate text format validation report
 */
function generateTextReport(stats: ValidationStats, validationResults: ValidationResult[], config: ValidationConfig): string {
  const duration = stats.duration;
  const rate = stats.rate;
  
  const lines = [
    '📋 ACKS II Content Validation Report',
    '═'.repeat(50),
    `📁 Input Directory: ${config.inputDir}`,
    `⏱️  Validation Duration: ${formatDuration(duration)}`,
    `📈 Validation Rate: ${rate.toFixed(2)} files/sec`,
    `🎯 Validation Level: ${config.validationLevel}`,
    '',
    '📊 File Statistics:',
    `  📄 Total Files: ${stats.totalFiles}`,
    `  ✅ Validated: ${stats.validatedFiles}`,
    `  ✅ Valid: ${stats.validFiles}`,
    `  ❌ Invalid: ${stats.invalidFiles}`,
    `  ⏭️  Skipped: ${stats.skippedFiles}`,
    `  📈 Success Rate: ${stats.successRate.toFixed(1)}%`,
    '',
    '🔍 Validation Results:',
    `  ❌ Total Errors: ${stats.totalErrors}`,
    `  ⚠️  Total Warnings: ${stats.totalWarnings}`,
    `  🚨 Critical Errors: ${stats.criticalErrors}`,
    ''
  ];

  // Add error breakdown by type
  if (Object.keys(stats.errorsByType).length > 0) {
    lines.push('📋 Errors by Type:');
    Object.entries(stats.errorsByType)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        lines.push(`  ${type}: ${count}`);
      });
    lines.push('');
  }

  // Add most problematic files
  const problematicFiles = Object.entries(stats.errorsByFile)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  if (problematicFiles.length > 0) {
    lines.push('📁 Files with Most Issues:');
    problematicFiles.forEach(([file, count]) => {
      const shortPath = relative(config.inputDir, file);
      lines.push(`  ${shortPath}: ${count} issues`);
    });
    lines.push('');
  }

  // Add detailed errors if verbose
  if (config.verbose > 1 && stats.invalidFiles > 0) {
    lines.push('📝 Detailed Error Report:');
    lines.push('─'.repeat(50));
    
    validationResults
      .filter(result => !result.isValid)
      .forEach(result => {
        const shortPath = relative(config.inputDir, result.content.sourceFile);
        lines.push(`\n📄 ${shortPath}:`);
        
        result.errors.forEach(error => {
          lines.push(`  ❌ ${error.field}: ${error.message}`);
          if (error.expected) {
            lines.push(`     Expected: ${error.expected}`);
          }
          if (error.actual !== undefined) {
            lines.push(`     Actual: ${error.actual}`);
          }
          if (error.suggestion) {
            lines.push(`     Suggestion: ${error.suggestion}`);
          }
        });

        if (config.showWarnings && result.warnings.length > 0) {
          result.warnings.forEach(warning => {
            lines.push(`  ⚠️  ${warning.field}: ${warning.message}`);
          });
        }
      });
  }

  // Add summary
  lines.push('');
  if (stats.invalidFiles === 0) {
    lines.push('🎉 All files passed validation!');
  } else {
    lines.push(`⚠️  ${stats.invalidFiles} files failed validation. See details above.`);
  }

  return lines.join('\n');
}

/**
 * Generate JSON format validation report
 */
function generateJsonReport(stats: ValidationStats, validationResults: ValidationResult[], config: ValidationConfig): string {
  const report = {
    timestamp: new Date().toISOString(),
    config: {
      inputDir: config.inputDir,
      validationLevel: config.validationLevel,
      contentTypes: config.contentTypes,
      categories: config.categories
    },
    statistics: {
      duration: stats.duration,
      rate: stats.rate,
      successRate: stats.successRate,
      totalFiles: stats.totalFiles,
      validatedFiles: stats.validatedFiles,
      validFiles: stats.validFiles,
      invalidFiles: stats.invalidFiles,
      skippedFiles: stats.skippedFiles,
      totalErrors: stats.totalErrors,
      totalWarnings: stats.totalWarnings,
      criticalErrors: stats.criticalErrors,
      errorsByType: stats.errorsByType,
      errorsByFile: stats.errorsByFile
    },
    validationResults: validationResults.map(result => ({
      file: relative(config.inputDir, result.content.sourceFile),
      contentType: result.content.contentType,
      isValid: result.isValid,
      errorCount: result.errors.length,
      warningCount: result.warnings.length,
      errors: result.errors,
      warnings: config.showWarnings ? result.warnings : undefined
    }))
  };

  return JSON.stringify(report, null, 2);
}

/**
 * Format duration helper
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Main validation function
 */
async function validateContent(config: ValidationConfig): Promise<void> {
  const stats = new ValidationStats();
  const reporter = new ValidationReporter(stats, config.verbose, config.useColors);

  try {
    // Initialize content processor for file discovery
    const processorConfig: ProcessorConfig = {
      rootDirectory: resolve(config.inputDir),
      parsingOptions: {
        continueOnError: true,
        verbose: config.verbose > 2,
        maxErrors: config.maxErrors,
        autoRepair: false,
        extractCrossReferences: false
      },
      concurrency: 1, // Single-threaded for validation
      batchSize: 1,
      continueOnError: true,
      recursive: true,
      verbose: config.verbose > 2
    };

    const processor = new ContentProcessor(processorConfig);

    // Set up event listeners for progress tracking
    processor.on('progress', (event: ProcessingEvent) => {
      stats.validatedFiles = event.progress.processedFiles;
      stats.totalFiles = event.progress.totalFiles;
      reporter.update(event.progress.currentFile);
    });

    // Start validation
    reporter.start('Discovering and validating content files...');
    
    const results: ProcessingResults = await processor.process();
    
    stats.endTime = new Date();
    stats.totalFiles = results.progress.totalFiles;
    stats.validatedFiles = results.progress.processedFiles;

    // Validate each successfully parsed content item
    const validationResults: ValidationResult[] = [];
    
    results.fileResults.forEach(result => {
      if (result.success && result.content) {
                 const validationResult = validateContentItem(result.content);
        validationResults.push(validationResult);
        
        if (validationResult.isValid) {
          stats.validFiles++;
        } else {
          stats.invalidFiles++;
          stats.errorsByFile[result.file.path] = validationResult.errors.length;
        }
        
        // Count errors and warnings
        validationResult.errors.forEach(error => {
          stats.totalErrors++;
          if (error.severity === 'error') {
            stats.criticalErrors++;
          }
          stats.errorsByType[error.field] = (stats.errorsByType[error.field] || 0) + 1;
        });
        
        stats.totalWarnings += validationResult.warnings.length;
      } else {
        stats.skippedFiles++;
      }
    });

    // Generate and save report
    let reportContent: string;
    if (config.reportFormat === 'json') {
      reportContent = generateJsonReport(stats, validationResults, config);
    } else {
      reportContent = generateTextReport(stats, validationResults, config);
    }

    // Save report to file if specified
    if (config.reportFile) {
      writeFileSync(config.reportFile, reportContent, 'utf-8');
      if (config.verbose > 0) {
        const message = `📄 Validation report saved to: ${config.reportFile}`;
        console.log(config.useColors ? chalk.blue(message) : message);
      }
    }

    // Display summary
    if (stats.invalidFiles === 0) {
      reporter.complete('All content files passed validation!');
    } else {
      reporter.error(`${stats.invalidFiles} files failed validation`);
    }

    // Display report if not saving to file or if verbose
    if (!config.reportFile || config.verbose > 0) {
      console.log('\n' + reportContent);
    }

    // Exit with error code if validation failed and exitOnError is true
    if (config.exitOnError && stats.invalidFiles > 0) {
      process.exit(1);
    }

  } catch (error) {
    stats.endTime = new Date();
    reporter.error(`Validation failed: ${error}`);
    
    if (config.verbose > 1) {
      console.error(config.useColors ? chalk.red('\nError details:') : '\nError details:', error);
    }
    
    if (config.exitOnError) {
      process.exit(1);
    }
  }
}

/**
 * CLI Program Setup
 */
const program = new Command();

program
  .name('validate-content')
  .description('ACKS II Content Validation CLI - Validate markdown content for structural and data integrity')
  .version('1.0.0');

program
  .option('-i, --input <dir>', 'Input directory containing ACKS II content', DEFAULT_CONFIG.inputDir)
  .option('-r, --report <file>', 'Output file for validation report')
  .option('-f, --format <format>', 'Report format: json or text', DEFAULT_CONFIG.reportFormat)
  .option('-l, --level <level>', 'Validation level: strict, normal, or lenient', DEFAULT_CONFIG.validationLevel)
  .option('-t, --types <types>', 'Content types to validate (comma-separated)', '')
  .option('-c, --categories <categories>', 'Content categories to validate (comma-separated)', '')
  .option('--max-errors <number>', 'Maximum number of errors before stopping', String(DEFAULT_CONFIG.maxErrors))
  .option('--no-warnings', 'Hide warnings in output')
  .option('--no-colors', 'Disable colored output')
  .option('--no-exit-on-error', 'Do not exit with error code on validation failure')
  .option('-v, --verbose', 'Increase verbosity level', (_, prev) => prev + 1, 0)
  .action(async (options) => {
    try {
      // Parse CLI options
      const config: ValidationConfig = {
        inputDir: options.input,
        reportFile: options.report,
        reportFormat: options.format,
        validationLevel: options.level,
        contentTypes: options.types ? options.types.split(',').map((t: string) => t.trim() as ContentType) : [],
        categories: options.categories ? options.categories.split(',').map((c: string) => c.trim() as ContentCategory) : [],
        maxErrors: parseInt(options.maxErrors),
        showWarnings: options.warnings,
        useColors: options.colors,
        exitOnError: options.exitOnError,
        verbose: options.verbose
      };

      // Validate configuration
      if (!existsSync(config.inputDir)) {
        throw new Error(`Input directory does not exist: ${config.inputDir}`);
      }

      if (config.maxErrors < 1) {
        throw new Error('Max errors must be at least 1');
      }

      if (!['strict', 'normal', 'lenient'].includes(config.validationLevel)) {
        throw new Error('Validation level must be strict, normal, or lenient');
      }

      if (!['json', 'text'].includes(config.reportFormat)) {
        throw new Error('Report format must be json or text');
      }

      // Start validation
      await validateContent(config);

    } catch (error) {
      const message = `Error: ${error}`;
      console.error(options.colors ? chalk.red(message) : message);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(); 