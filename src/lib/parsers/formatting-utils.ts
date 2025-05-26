/**
 * ACKS II Formatting Utilities
 * 
 * This module provides utility functions for processing special markdown formatting,
 * tables, images, and ACKS II-specific notation found in content files.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

/**
 * Represents a parsed markdown table
 */
export interface ParsedTable {
  /** Table headers */
  headers: string[];
  
  /** Table rows (array of cell values) */
  rows: string[][];
  
  /** Table caption if present */
  caption?: string;
  
  /** Whether the table has a header row */
  hasHeader: boolean;
  
  /** Number of columns */
  columnCount: number;
  
  /** Number of rows (excluding header) */
  rowCount: number;
}

/**
 * Represents extracted image information
 */
export interface ImageReference {
  /** Image source path */
  src: string;
  
  /** Image alt text */
  alt: string;
  
  /** Image caption if present */
  caption?: string;
  
  /** Image title attribute */
  title?: string;
  
  /** Whether the path is relative */
  isRelative: boolean;
  
  /** Resolved absolute path */
  resolvedPath: string;
}

/**
 * Represents a cross-reference to other content
 */
export interface CrossReference {
  /** Reference text as it appears in the content */
  text: string;
  
  /** Type of reference (monster, spell, class, etc.) */
  type: string;
  
  /** Target content identifier */
  target: string;
  
  /** Context around the reference */
  context: string;
  
  /** Position in the original text */
  position: {
    start: number;
    end: number;
  };
}

/**
 * Represents ACKS II dice notation
 */
export interface DiceNotation {
  /** Original dice string (e.g., "2d6+3") */
  original: string;
  
  /** Number of dice */
  count: number;
  
  /** Die type (number of sides) */
  sides: number;
  
  /** Modifier (positive or negative) */
  modifier: number;
  
  /** Minimum possible result */
  minimum: number;
  
  /** Maximum possible result */
  maximum: number;
  
  /** Average result */
  average: number;
}

/**
 * Parse a markdown table into structured data with detailed analysis
 * 
 * @param tableMarkdown - Raw markdown table text
 * @returns Parsed table structure with metadata
 */
export function parseDetailedMarkdownTable(tableMarkdown: string): ParsedTable {
  const lines = tableMarkdown.trim().split('\n').map(line => line.trim());
  
  // Remove empty lines
  const nonEmptyLines = lines.filter(line => line.length > 0);
  
  if (nonEmptyLines.length === 0) {
    return {
      headers: [],
      rows: [],
      hasHeader: false,
      columnCount: 0,
      rowCount: 0
    };
  }
  
  // Check for table caption (line before table that doesn't contain |)
  let caption: string | undefined;
  let tableStartIndex = 0;
  
  if (nonEmptyLines[0] && !nonEmptyLines[0].includes('|')) {
    caption = nonEmptyLines[0];
    tableStartIndex = 1;
  }
  
  const tableLines = nonEmptyLines.slice(tableStartIndex);
  
  if (tableLines.length === 0) {
    return {
      headers: [],
      rows: [],
      caption,
      hasHeader: false,
      columnCount: 0,
      rowCount: 0
    };
  }
  
  // Parse table rows
  const parsedRows = tableLines
    .filter(line => line.includes('|'))
    .map(line => parseTableRow(line));
  
  if (parsedRows.length === 0) {
    return {
      headers: [],
      rows: [],
      caption,
      hasHeader: false,
      columnCount: 0,
      rowCount: 0
    };
  }
  
  // Determine if there's a header separator (line with dashes)
  let hasHeader = false;
  let headerIndex = -1;
  let separatorIndex = -1;
  
  for (let i = 0; i < tableLines.length; i++) {
    if (tableLines[i].includes('|') && tableLines[i].includes('-')) {
      // This might be a header separator
      const cells = parseTableRow(tableLines[i]);
      if (cells.every(cell => /^[-:\s]*$/.test(cell))) {
        hasHeader = true;
        separatorIndex = i;
        headerIndex = i - 1;
        break;
      }
    }
  }
  
  let headers: string[] = [];
  let dataRows: string[][] = [];
  
  if (hasHeader && headerIndex >= 0) {
    headers = parsedRows[headerIndex] || [];
    dataRows = parsedRows.slice(separatorIndex + 1);
  } else {
    // No header, all rows are data
    dataRows = parsedRows;
  }
  
  // Normalize column count
  const maxColumns = Math.max(
    headers.length,
    ...dataRows.map(row => row.length)
  );
  
  // Pad rows to match column count
  if (headers.length < maxColumns) {
    headers = [...headers, ...Array(maxColumns - headers.length).fill('')];
  }
  
  dataRows = dataRows.map(row => {
    if (row.length < maxColumns) {
      return [...row, ...Array(maxColumns - row.length).fill('')];
    }
    return row.slice(0, maxColumns);
  });
  
  return {
    headers,
    rows: dataRows,
    caption,
    hasHeader,
    columnCount: maxColumns,
    rowCount: dataRows.length
  };
}

/**
 * Parse a single table row into cells
 * 
 * @param rowText - Raw table row text
 * @returns Array of cell contents
 */
function parseTableRow(rowText: string): string[] {
  // Remove leading and trailing pipes
  const cleaned = rowText.replace(/^\||\|$/g, '').trim();
  
  // Split by pipes, but handle escaped pipes
  const cells: string[] = [];
  let currentCell = '';
  let escaped = false;
  
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    
    if (escaped) {
      currentCell += char;
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
      currentCell += char;
    } else if (char === '|') {
      cells.push(currentCell.trim());
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  
  // Add the last cell
  if (currentCell || cells.length === 0) {
    cells.push(currentCell.trim());
  }
  
  return cells;
}

/**
 * Extract and process bold/italic text formatting
 * 
 * @param text - Text containing markdown formatting
 * @returns Object with extracted formatting information
 */
export function extractTextFormatting(text: string): {
  bold: string[];
  italic: string[];
  boldItalic: string[];
  plainText: string;
} {
  const bold: string[] = [];
  const italic: string[] = [];
  const boldItalic: string[] = [];
  
  // Extract bold-italic (***text*** or ___text___)
  const boldItalicMatches = text.match(/\*\*\*([^*]+)\*\*\*|___([^_]+)___/g);
  if (boldItalicMatches) {
    boldItalicMatches.forEach(match => {
      const content = match.replace(/^\*{3}|\*{3}$|^_{3}|_{3}$/g, '');
      boldItalic.push(content);
    });
  }
  
  // Extract bold (**text** or __text__) - but not if part of bold-italic
  let tempText = text;
  // Remove bold-italic sections temporarily
  boldItalic.forEach(bi => {
    tempText = tempText.replace(new RegExp(`\\*\\*\\*${bi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*\\*`, 'g'), '');
    tempText = tempText.replace(new RegExp(`___${bi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}___`, 'g'), '');
  });
  
  const boldMatches = tempText.match(/\*\*([^*]+)\*\*|__([^_]+)__/g);
  if (boldMatches) {
    boldMatches.forEach(match => {
      const content = match.replace(/^\*{2}|\*{2}$|^_{2}|_{2}$/g, '');
      bold.push(content);
    });
  }
  
  // Extract italic (*text* or _text_) - but not if part of bold or bold-italic
  let tempTextForItalic = text;
  // Remove bold-italic sections temporarily
  boldItalic.forEach(bi => {
    tempTextForItalic = tempTextForItalic.replace(new RegExp(`\\*\\*\\*${bi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*\\*`, 'g'), '');
    tempTextForItalic = tempTextForItalic.replace(new RegExp(`___${bi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}___`, 'g'), '');
  });
  // Remove bold sections temporarily
  bold.forEach(b => {
    tempTextForItalic = tempTextForItalic.replace(new RegExp(`\\*\\*${b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*`, 'g'), '');
    tempTextForItalic = tempTextForItalic.replace(new RegExp(`__${b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}__`, 'g'), '');
  });
  
  const italicMatches = tempTextForItalic.match(/\*([^*]+)\*|_([^_]+)_/g);
  if (italicMatches) {
    italicMatches.forEach(match => {
      const content = match.replace(/^\*|\*$|^_|_$/g, '');
      italic.push(content);
    });
  }
  
  // Create plain text by removing all formatting
  const plainText = text
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/___([^_]+)___/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1');
  
  return {
    bold,
    italic,
    boldItalic,
    plainText
  };
}

/**
 * Parse markdown lists (bullet and numbered)
 * 
 * @param text - Text containing markdown lists
 * @returns Parsed list structure
 */
export function parseMarkdownLists(text: string): {
  bulletLists: string[][];
  numberedLists: string[][];
  allItems: string[];
} {
  const lines = text.split('\n');
  const bulletLists: string[][] = [];
  const numberedLists: string[][] = [];
  const allItems: string[] = [];
  
  let currentBulletList: string[] = [];
  let currentNumberedList: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for bullet list item
    if (/^[-*+]\s+/.test(trimmed)) {
      const item = trimmed.replace(/^[-*+]\s+/, '');
      currentBulletList.push(item);
      allItems.push(item);
      
      // End any current numbered list
      if (currentNumberedList.length > 0) {
        numberedLists.push([...currentNumberedList]);
        currentNumberedList = [];
      }
    }
    // Check for numbered list item
    else if (/^\d+\.\s+/.test(trimmed)) {
      const item = trimmed.replace(/^\d+\.\s+/, '');
      currentNumberedList.push(item);
      allItems.push(item);
      
      // End any current bullet list
      if (currentBulletList.length > 0) {
        bulletLists.push([...currentBulletList]);
        currentBulletList = [];
      }
    }
    // Non-list line
    else if (trimmed.length > 0) {
      // End current lists
      if (currentBulletList.length > 0) {
        bulletLists.push([...currentBulletList]);
        currentBulletList = [];
      }
      if (currentNumberedList.length > 0) {
        numberedLists.push([...currentNumberedList]);
        currentNumberedList = [];
      }
    }
  }
  
  // Add any remaining lists
  if (currentBulletList.length > 0) {
    bulletLists.push(currentBulletList);
  }
  if (currentNumberedList.length > 0) {
    numberedLists.push(currentNumberedList);
  }
  
  return {
    bulletLists,
    numberedLists,
    allItems
  };
}

/**
 * Extract image references from markdown text
 * 
 * @param text - Text containing markdown images
 * @param basePath - Base path for resolving relative image paths
 * @returns Array of image references
 */
export function extractImageReferences(text: string, basePath: string = ''): ImageReference[] {
  const images: ImageReference[] = [];
  
  // Match markdown image syntax: ![alt](src "title")
  const imageRegex = /!\[([^\]]*)\]\(([^"\s)]+)(?:\s+"([^"]*)")?\)/g;
  
  let match;
  while ((match = imageRegex.exec(text)) !== null) {
    const [, alt, src, title] = match;
    const isRelative = !src.startsWith('http') && !src.startsWith('/');
    
    let resolvedPath = src;
    if (isRelative && basePath) {
      resolvedPath = `${basePath}/${src}`.replace(/\/+/g, '/');
    }
    
    images.push({
      src,
      alt: alt || '',
      title: title || undefined,
      isRelative,
      resolvedPath
    });
  }
  
  return images;
}

/**
 * Parse ACKS II dice notation with detailed statistics
 * 
 * @param diceString - Dice notation string (e.g., "2d6+3", "1d20-1")
 * @returns Parsed dice information with statistics
 */
export function parseDetailedDiceNotation(diceString: string): DiceNotation | null {
  const cleaned = diceString.trim().toLowerCase();
  
  // Match dice notation: XdY+Z or XdY-Z or XdY
  const diceRegex = /^(\d+)d(\d+)([+-]\d+)?$/;
  const match = cleaned.match(diceRegex);
  
  if (!match) {
    return null;
  }
  
  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;
  
  const minimum = count + modifier;
  const maximum = count * sides + modifier;
  const average = (count * (sides + 1) / 2) + modifier;
  
  return {
    original: diceString,
    count,
    sides,
    modifier,
    minimum,
    maximum,
    average: Math.round(average * 10) / 10 // Round to 1 decimal place
  };
}

/**
 * Extract cross-references to other ACKS II content
 * 
 * @param text - Text to search for cross-references
 * @returns Array of found cross-references
 */
export function extractCrossReferences(text: string): CrossReference[] {
  const references: CrossReference[] = [];
  
  // Common ACKS II reference patterns
  const patterns = [
    // Monster references: "see Goblin" or "as Orc"
    {
      regex: /\b(?:see|as)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g,
      type: 'monster'
    },
    // Spell references: "cast Magic Missile" or "Magic Missile spell"
    {
      regex: /\b(?:cast\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+spell\b/g,
      type: 'spell'
    },
    // Class references: "Fighter class" or "as a Cleric"
    {
      regex: /\b(?:as\s+a\s+)?([A-Z][a-z]+)\s+class\b/g,
      type: 'class'
    },
    // Additional class pattern: "as a Cleric"
    {
      regex: /\bas\s+a\s+([A-Z][a-z]+)\b/g,
      type: 'class'
    },
    // Equipment references: "wielding a Sword +1"
    {
      regex: /\bwielding\s+(?:a\s+)?([A-Z][a-z]+(?:\s+[A-Z+\d\s]*)*)\b/g,
      type: 'equipment'
    },
    // General references in parentheses: "(see Chapter 3)"
    {
      regex: /\(see\s+([^)]+)\)/g,
      type: 'reference'
    }
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      const [fullMatch, target] = match;
      const start = match.index;
      const end = start + fullMatch.length;
      
      // Extract context (20 characters before and after)
      const contextStart = Math.max(0, start - 20);
      const contextEnd = Math.min(text.length, end + 20);
      const context = text.slice(contextStart, contextEnd);
      
      references.push({
        text: fullMatch,
        type: pattern.type,
        target: target.trim(),
        context,
        position: { start, end }
      });
    }
  });
  
  return references;
}

/**
 * Normalize text by removing extra whitespace and standardizing formatting
 * 
 * @param text - Text to normalize
 * @returns Normalized text
 */
export function normalizeText(text: string): string {
  return text
    // Standardize line breaks first
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove multiple consecutive line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Remove extra whitespace but preserve line breaks
    .replace(/[ \t]+/g, ' ')
    // Remove leading/trailing whitespace from each line
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    // Remove leading/trailing whitespace from entire text
    .trim()
    // Standardize quotes
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    // Standardize dashes
    .replace(/[–—]/g, '-')
    // Remove zero-width characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}

/**
 * Extract block quotes and callouts from markdown text
 * 
 * @param text - Text containing block quotes
 * @returns Extracted quotes and callouts
 */
export function extractBlockQuotes(text: string): {
  quotes: string[];
  callouts: Array<{ type: string; content: string }>;
} {
  const lines = text.split('\n');
  const quotes: string[] = [];
  const callouts: Array<{ type: string; content: string }> = [];
  
  let currentQuote: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('>')) {
      const content = line.replace(/^>\s*/, '');
      
      // Check for callout syntax: > [!TYPE] Content
      const calloutMatch = content.match(/^\[!(\w+)\]\s*(.*)$/);
      if (calloutMatch) {
        const [, type, calloutContent] = calloutMatch;
        callouts.push({
          type: type.toLowerCase(),
          content: calloutContent
        });
      } else {
        currentQuote.push(content);
      }
    } else {
      // End current quote
      if (currentQuote.length > 0) {
        quotes.push(currentQuote.join('\n').trim());
        currentQuote = [];
      }
    }
  }
  
  // Add any remaining quote
  if (currentQuote.length > 0) {
    quotes.push(currentQuote.join('\n').trim());
  }
  
  return { quotes, callouts };
}

/**
 * Process special ACKS II range formats (e.g., "30'/60'/90'", "Touch", "Self")
 * 
 * @param rangeText - Range text to process
 * @returns Parsed range information
 */
export function parseAcksRange(rangeText: string): {
  type: 'touch' | 'self' | 'ranged' | 'special';
  short?: number;
  medium?: number;
  long?: number;
  unit: 'feet' | 'yards' | 'miles' | 'special';
  original: string;
} {
  const cleaned = rangeText.trim().toLowerCase();
  
  if (cleaned === 'touch') {
    return {
      type: 'touch',
      unit: 'special',
      original: rangeText
    };
  }
  
  if (cleaned === 'self') {
    return {
      type: 'self',
      unit: 'special',
      original: rangeText
    };
  }
  
  // Parse ranged format: "30'/60'/90'" or "120'"
  const rangedMatch = cleaned.match(/(\d+)'(?:\/(\d+)')?(?:\/(\d+)')?/);
  if (rangedMatch) {
    const [, short, medium, long] = rangedMatch;
    
    return {
      type: 'ranged',
      short: parseInt(short, 10),
      medium: medium ? parseInt(medium, 10) : undefined,
      long: long ? parseInt(long, 10) : undefined,
      unit: 'feet',
      original: rangeText
    };
  }
  
  return {
    type: 'special',
    unit: 'special',
    original: rangeText
  };
} 