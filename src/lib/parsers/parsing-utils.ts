/**
 * ACKS II Markdown Parsing Utilities
 * 
 * This module provides common utility functions for parsing markdown content
 * from ACKS II source files. These utilities are used by specialized parsers
 * for different content types.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { 
  TableData, 
  SectionData, 
  PropertyList, 
  StatBlock,
  ParsingContext,
  ParsingOptions 
} from './types';
import { ParseError, ErrorSeverity } from '../types/content';

/**
 * Parse a markdown table into structured data
 * 
 * @param markdown - Raw markdown containing a table
 * @param context - Parsing context for error reporting
 * @returns Parsed table data with headers and rows
 */
export function parseMarkdownTable(
  markdown: string, 
  context?: ParsingContext
): TableData {
  const lines = markdown.split('\n').map(line => line.trim());
  const tableLines = lines.filter(line => line.startsWith('|') && line.endsWith('|'));
  
  if (tableLines.length < 2) {
    const error: ParseError = {
      sourceFile: context?.sourceFile || 'unknown',
      lineNumber: context?.currentLine,
      message: 'Invalid table format: insufficient rows',
      severity: ErrorSeverity.WARNING
    };
    context?.errors.push(error);
    
    return {
      headers: [],
      rows: [],
      rawMarkdown: markdown
    };
  }

  // Parse headers (first row)
  const headerLine = tableLines[0];
  const headers = parseTableRow(headerLine);
  
  // Skip separator line (second row with dashes)
  const dataLines = tableLines.slice(2);
  
  // Parse data rows
  const rows = dataLines.map(line => parseTableRow(line));
  
  // Extract caption if present (line before table)
  const tableStartIndex = lines.findIndex(line => line.startsWith('|'));
  const caption = tableStartIndex > 0 && lines[tableStartIndex - 1].trim() 
    ? lines[tableStartIndex - 1].trim() 
    : undefined;

  return {
    headers,
    rows,
    caption,
    rawMarkdown: markdown
  };
}

/**
 * Parse a single table row into cells
 * 
 * @param row - Raw table row markdown
 * @returns Array of cell contents
 */
function parseTableRow(row: string): string[] {
  // Remove leading and trailing pipes, then split by pipes
  const cleanRow = row.replace(/^\||\|$/g, '');
  const cells = cleanRow.split('|').map(cell => cell.trim());
  
  return cells;
}

/**
 * Extract sections from markdown based on headers
 * 
 * @param markdown - Raw markdown content
 * @param minLevel - Minimum header level to consider (default: 1)
 * @param maxLevel - Maximum header level to consider (default: 6)
 * @returns Hierarchical section data
 */
export function extractSection(
  markdown: string, 
  minLevel: number = 1, 
  maxLevel: number = 6
): SectionData[] {
  const lines = markdown.split('\n');
  const sections: SectionData[] = [];
  let currentSection: SectionData | null = null;
  let contentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      
      if (level >= minLevel && level <= maxLevel) {
        // Save previous section if exists
        if (currentSection) {
          currentSection.content = contentLines.join('\n').trim();
          sections.push(currentSection);
        }
        
        // Start new section
        currentSection = {
          title,
          content: '',
          subsections: [],
          level,
          rawMarkdown: line
        };
        contentLines = [];
      } else {
        // Add to content if header is outside our range
        contentLines.push(line);
      }
    } else {
      // Add to current section content
      contentLines.push(line);
    }
  }
  
  // Don't forget the last section
  if (currentSection) {
    currentSection.content = contentLines.join('\n').trim();
    sections.push(currentSection);
  }
  
  return buildSectionHierarchy(sections);
}

/**
 * Build hierarchical structure from flat section list
 * 
 * @param sections - Flat array of sections
 * @returns Hierarchical section structure
 */
function buildSectionHierarchy(sections: SectionData[]): SectionData[] {
  const result: SectionData[] = [];
  const stack: SectionData[] = [];
  
  for (const section of sections) {
    // Pop sections from stack that are at same or higher level
    while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      // Top-level section
      result.push(section);
    } else {
      // Subsection
      stack[stack.length - 1].subsections.push(section);
    }
    
    stack.push(section);
  }
  
  return result;
}

/**
 * Clean markdown text by removing formatting and normalizing whitespace
 * 
 * @param text - Raw markdown text
 * @param preserveLineBreaks - Whether to preserve line breaks
 * @returns Cleaned text
 */
export function cleanMarkdownText(
  text: string, 
  preserveLineBreaks: boolean = false
): string {
  let cleaned = text
    // Remove markdown formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
    .replace(/\*(.*?)\*/g, '$1')      // Italic
    .replace(/`(.*?)`/g, '$1')        // Inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/^#+\s+/gm, '')          // Headers
    .replace(/^\s*[-*+]\s+/gm, '')    // List markers
    .replace(/^\s*\d+\.\s+/gm, '')    // Numbered lists
    .replace(/^\s*>\s+/gm, '')        // Blockquotes
    .replace(/\|/g, ' ')              // Table separators
    .trim();
  
  if (!preserveLineBreaks) {
    cleaned = cleaned.replace(/\s+/g, ' ');
  }
  
  return cleaned;
}

/**
 * Parse a property list (key: value pairs) from markdown
 * 
 * @param markdown - Markdown containing property list
 * @param separator - Separator between key and value (default: ':')
 * @returns Parsed properties and unparsed items
 */
export function parsePropertyList(
  markdown: string, 
  separator: string = ':'
): PropertyList {
  const lines = markdown.split('\n').map(line => line.trim()).filter(Boolean);
  const properties: Record<string, string> = {};
  const unparsedItems: string[] = [];
  
  for (const line of lines) {
    // Skip markdown list markers
    const cleanLine = line.replace(/^\s*[-*+]\s+/, '');
    
    if (cleanLine.includes(separator)) {
      const [key, ...valueParts] = cleanLine.split(separator);
      const value = valueParts.join(separator).trim();
      
      if (key.trim() && value) {
        properties[key.trim()] = value;
      } else {
        unparsedItems.push(line);
      }
    } else {
      unparsedItems.push(line);
    }
  }
  
  return { properties, unparsedItems };
}

/**
 * Parse a stat block (typically for monsters) from markdown table
 * 
 * @param markdown - Markdown containing stat block table
 * @param expectedStats - Array of expected stat names
 * @returns Parsed stat block
 */
export function parseStatBlock(
  markdown: string, 
  expectedStats: string[] = []
): StatBlock {
  const tableData = parseMarkdownTable(markdown);
  const stats: Record<string, string | number> = {};
  const unparsedLines: string[] = [];
  
  // Process table rows
  for (const row of tableData.rows) {
    if (row.length >= 2) {
      const key = cleanMarkdownText(row[0]);
      const value = cleanMarkdownText(row[1]);
      
      // Try to parse as number if it looks numeric
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && isFinite(numericValue)) {
        stats[key] = numericValue;
      } else {
        stats[key] = value;
      }
    } else {
      unparsedLines.push(row.join(' | '));
    }
  }
  
  // Check completeness
  const foundStats = Object.keys(stats);
  const complete = expectedStats.length === 0 || 
    expectedStats.every(stat => foundStats.includes(stat));
  
  return {
    stats,
    unparsedLines,
    complete
  };
}

/**
 * Extract a specific section by title from markdown
 * 
 * @param markdown - Full markdown content
 * @param sectionTitle - Title of section to extract
 * @param exact - Whether to match title exactly (default: false)
 * @returns Section content or null if not found
 */
export function extractSectionByTitle(
  markdown: string, 
  sectionTitle: string, 
  exact: boolean = false
): string | null {
  const sections = extractSection(markdown);
  
  const findSection = (sections: SectionData[], title: string): SectionData | null => {
    for (const section of sections) {
      const matches = exact 
        ? section.title === title
        : section.title.toLowerCase().includes(title.toLowerCase());
      
      if (matches) {
        return section;
      }
      
      // Search subsections recursively
      const found = findSection(section.subsections, title);
      if (found) {
        return found;
      }
    }
    return null;
  };
  
  const section = findSection(sections, sectionTitle);
  return section ? section.content : null;
}

/**
 * Parse dice notation (e.g., "2d6+1", "1d8") into components
 * 
 * @param diceString - Dice notation string
 * @returns Parsed dice components or null if invalid
 */
export function parseDiceNotation(diceString: string): {
  count: number;
  sides: number;
  modifier: number;
  raw: string;
} | null {
  const match = diceString.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
  
  if (!match) {
    return null;
  }
  
  const count = parseInt(match[1] || '1');
  const sides = parseInt(match[2]);
  const modifier = parseInt(match[3] || '0');
  
  return {
    count,
    sides,
    modifier,
    raw: diceString
  };
}

/**
 * Create a parsing context for error tracking
 * 
 * @param sourceFile - Source file being parsed
 * @param options - Parsing options
 * @returns New parsing context
 */
export function createParsingContext(
  sourceFile: string, 
  options: ParsingOptions = {}
): ParsingContext {
  return {
    sourceFile,
    currentLine: 1,
    errors: [],
    warnings: [],
    options: {
      continueOnError: true,
      verbose: false,
      maxErrors: 50,
      autoRepair: false,
      extractCrossReferences: true,
      ...options
    },
    startTime: Date.now()
  };
}

/**
 * Add an error to the parsing context
 * 
 * @param context - Parsing context
 * @param message - Error message
 * @param severity - Error severity
 * @param lineNumber - Optional line number
 */
export function addParsingError(
  context: ParsingContext,
  message: string,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  lineNumber?: number
): void {
  const error: ParseError = {
    sourceFile: context.sourceFile,
    lineNumber: lineNumber || context.currentLine,
    message,
    severity
  };
  
  if (severity === ErrorSeverity.WARNING) {
    context.warnings.push(error);
  } else {
    context.errors.push(error);
  }
  
  if (context.options.verbose) {
    console.log(`[${severity}] ${context.sourceFile}:${error.lineNumber} - ${message}`);
  }
}

/**
 * Check if parsing should continue based on error count and options
 * 
 * @param context - Parsing context
 * @returns Whether to continue parsing
 */
export function shouldContinueParsing(context: ParsingContext): boolean {
  if (!context.options.continueOnError && context.errors.length > 0) {
    return false;
  }
  
  if (context.options.maxErrors && context.errors.length >= context.options.maxErrors) {
    return false;
  }
  
  return true;
} 