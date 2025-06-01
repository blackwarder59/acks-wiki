/**
 * ACKS II File System Scanner
 * 
 * This module handles discovery and categorization of ACKS II content files
 * from the file system, organizing them by content category and type.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { promises as fs } from 'fs';
import path from 'path';
import { ContentCategory } from '../types/content';
import { ContentFile, DiscoveryOptions } from './pipeline-types';

/**
 * File system scanner for discovering ACKS II content files
 */
export class FileSystemScanner {
  private options: DiscoveryOptions;
  
  constructor(options: DiscoveryOptions) {
    this.options = {
      ...options,
      includePatterns: options.includePatterns && options.includePatterns.length > 0 ? options.includePatterns : ['**/*.md'],
      excludePatterns: options.excludePatterns && options.excludePatterns.length > 0 ? options.excludePatterns : ['**/node_modules/**', '**/.git/**', '**/README.md'],
      followSymlinks: options.followSymlinks ?? false
    };
    console.log('[FileSystemScanner] Initialized with options:', JSON.stringify(this.options, null, 2)); // DEBUG
  }
  
  /**
   * Discover all content files in the specified directory
   * 
   * @returns Array of discovered content files
   */
  async discoverFiles(): Promise<ContentFile[]> {
    const files: ContentFile[] = [];
    
    try {
      await this.scanDirectory(this.options.rootDirectory, files);
      
      // Filter files based on patterns
      const filteredFiles = files.filter(file => this.shouldIncludeFile(file));
      
      // Sort files by category and path for consistent processing order
      filteredFiles.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.relativePath.localeCompare(b.relativePath);
      });
      
      // Apply max files limit if specified
      if (this.options.maxFiles && filteredFiles.length > this.options.maxFiles) {
        return filteredFiles.slice(0, this.options.maxFiles);
      }
      
      return filteredFiles;
      
    } catch (error) {
      throw new Error(`Failed to discover files: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Recursively scan a directory for content files
   * 
   * @param dirPath - Directory path to scan
   * @param files - Array to collect discovered files
   */
  private async scanDirectory(dirPath: string, files: ContentFile[]): Promise<void> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          // Recursively scan subdirectories if enabled
          if (this.options.recursive) {
            await this.scanDirectory(fullPath, files);
          }
        } else if (entry.isFile() || (entry.isSymbolicLink() && this.options.followSymlinks)) {
          // Process regular files and optionally symlinks
          const file = await this.createContentFile(fullPath);
          if (file) {
            files.push(file);
          }
        }
      }
    } catch (error) {
      // Log error but continue scanning other directories
      console.warn(`Warning: Could not scan directory ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Create a ContentFile object from a file path
   * 
   * @param filePath - Absolute path to the file
   * @returns ContentFile object or null if file should be skipped
   */
  private async createContentFile(filePath: string): Promise<ContentFile | null> {
    try {
      const stats = await fs.stat(filePath);
      const relativePath = path.relative(this.options.rootDirectory, filePath);
      const extension = path.extname(filePath).toLowerCase();
      
      // Skip non-markdown files
      if (extension !== '.md') {
        return null;
      }
      
      const category = this.detectContentCategory(relativePath);
      
      return {
        path: filePath,
        relativePath,
        category,
        size: stats.size,
        lastModified: stats.mtime,
        extension,
        shouldProcess: true
      };
      
    } catch (error) {
      console.warn(`Warning: Could not process file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }
  
  /**
   * Detect content category based on file path
   * 
   * @param relativePath - Relative path from content root
   * @returns Detected content category
   */
  private detectContentCategory(relativePath: string): ContentCategory {
    const normalizedPath = relativePath.toLowerCase().replace(/\\/g, '/');
    
    // Path-based detection - handle both lowercase and original case
    if (normalizedPath.includes('monstrous_manual/') || normalizedPath.includes('monstrous manual/')) {
      return ContentCategory.MONSTROUS_MANUAL;
    } else if (normalizedPath.includes('judges_journal/') || normalizedPath.includes('judges journal/')) {
      return ContentCategory.JUDGES_JOURNAL;
    } else if (normalizedPath.includes('rulebook/')) {
      return ContentCategory.RULEBOOK;
    }
    
    // Default to rulebook if unclear
    return ContentCategory.RULEBOOK;
  }
  
  /**
   * Check if a file should be included based on include/exclude patterns
   * 
   * @param file - Content file to check
   * @returns Whether the file should be included
   */
  private shouldIncludeFile(file: ContentFile): boolean {
    const relativePath = file.relativePath.replace(/\\/g, '/');
    console.log(`[FileSystemScanner] shouldIncludeFile: Checking path '${relativePath}'`); // DEBUG
    console.log(`[FileSystemScanner] using includePatterns: ${JSON.stringify(this.options.includePatterns)}`); // DEBUG
    console.log(`[FileSystemScanner] using excludePatterns: ${JSON.stringify(this.options.excludePatterns)}`); // DEBUG

    // Check exclude patterns first
    for (const pattern of this.options.excludePatterns) {
      if (this.matchesPattern(relativePath, pattern)) {
        console.log(`[FileSystemScanner] Path '${relativePath}' MATCHED exclude pattern '${pattern}'`); // DEBUG
        return false;
      }
    }
    
    // Check include patterns
    for (const pattern of this.options.includePatterns) {
      if (this.matchesPattern(relativePath, pattern)) {
        console.log(`[FileSystemScanner] Path '${relativePath}' MATCHED include pattern '${pattern}'`); // DEBUG
        return true;
      }
    }
    
    console.log(`[FileSystemScanner] Path '${relativePath}' did NOT match any include patterns. Excluding by default.`); // DEBUG
    // Default to exclude if no include patterns match
    return false;
  }
  
  /**
   * Simple glob pattern matching
   * 
   * @param filePath - File path to test
   * @param pattern - Glob pattern
   * @returns Whether the path matches the pattern
   */
  private matchesPattern(filePath: string, pattern: string): boolean {
    // Convert glob pattern to regex
    let regexPattern = pattern
      .replace(/\./g, '\\.')    // Escape dots first
      .replace(/\*\*/g, '___DOUBLESTAR___')  // Temporarily replace ** 
      .replace(/\*/g, '[^/]*')  // * matches any characters except /
      .replace(/___DOUBLESTAR___/g, '.*')  // ** matches any number of directories/chars
      .replace(/\?/g, '[^/]');  // ? matches any single character except /

    // Specific fix for patterns like '**/*.md' which became '.*/[^/]*\.md'
    // This regex expects a directory. To match files at the root as well,
    // make the initial 'directory part' optional.
    if (regexPattern.startsWith('.*/')) {
      // Check if the original pattern started with '**/' to justify this change.
      // This avoids altering patterns like 'foo/.*/bar.txt' incorrectly.
      if (pattern.startsWith('**/')) {
        regexPattern = '(?:.*/)?' + regexPattern.substring('.*/'.length);
      }
    }
    
    const regex = new RegExp(`^${regexPattern}$`, 'i');
    // console.log(`[FileSystemScanner] Testing path '${filePath}' against pattern '${pattern}' (source pattern: '${pattern}', regex: ${regex.source})`);
    const isMatch = regex.test(filePath);
    // if (isMatch) console.log(`[FileSystemScanner] MATCH!`); else console.log(`[FileSystemScanner] NO MATCH.`);
    return isMatch;
  }
  
  /**
   * Get statistics about discovered files
   * 
   * @param files - Array of discovered files
   * @returns File discovery statistics
   */
  static getDiscoveryStats(files: ContentFile[]): {
    totalFiles: number;
    filesByCategory: Record<ContentCategory, number>;
    totalSize: number;
    averageSize: number;
    largestFile: ContentFile | null;
    smallestFile: ContentFile | null;
  } {
    if (files.length === 0) {
      return {
        totalFiles: 0,
        filesByCategory: {} as Record<ContentCategory, number>,
        totalSize: 0,
        averageSize: 0,
        largestFile: null,
        smallestFile: null
      };
    }
    
    const filesByCategory: Record<ContentCategory, number> = {} as Record<ContentCategory, number>;
    let totalSize = 0;
    let largestFile = files[0];
    let smallestFile = files[0];
    
    for (const file of files) {
      // Count by category
      filesByCategory[file.category] = (filesByCategory[file.category] || 0) + 1;
      
      // Track size statistics
      totalSize += file.size;
      if (file.size > largestFile.size) {
        largestFile = file;
      }
      if (file.size < smallestFile.size) {
        smallestFile = file;
      }
    }
    
    return {
      totalFiles: files.length,
      filesByCategory,
      totalSize,
      averageSize: totalSize / files.length,
      largestFile,
      smallestFile
    };
  }
} 