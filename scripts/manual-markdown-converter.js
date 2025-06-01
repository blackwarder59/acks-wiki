#!/usr/bin/env node

/**
 * Manual Markdown to HTML Converter for ACKS II Wiki
 * 
 * This script reads markdown files and converts them to HTML directly,
 * bypassing the complex parsing system that isn't fully implemented.
 * 
 * Instead of trying to parse markdown into structured data,
 * we convert markdown to HTML and extract the necessary metadata.
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure marked for better table support
marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true
});

/**
 * Convert a markdown file to HTML with metadata extraction
 * @param {string} markdownContent - Raw markdown content
 * @param {string} contentType - Type of content (monster, spell, etc.)
 * @returns {Object} Converted content with HTML and metadata
 */
function convertMarkdownToHTML(markdownContent, contentType) {
  // Convert the entire markdown to HTML
  const fullHTML = marked(markdownContent);
  
  // Extract sections based on headers
  const sections = extractSections(markdownContent);
  
  // Extract metadata based on content type
  let metadata = {};
  
  if (contentType === 'monster') {
    metadata = extractMonsterMetadata(sections, markdownContent);
  } else if (contentType === 'spell') {
    metadata = extractSpellMetadata(sections, markdownContent);
  }
  // Add more content types as needed
  
  return {
    html: fullHTML,
    sections: sections.map(section => ({
      title: section.title,
      level: section.level,
      html: marked(section.content)
    })),
    metadata,
    rawMarkdown: markdownContent
  };
}

/**
 * Extract sections from markdown based on headers
 */
function extractSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentSection = null;
  let contentLines = [];
  
  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        currentSection.content = contentLines.join('\n').trim();
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        title: headerMatch[2].trim(),
        level: headerMatch[1].length,
        content: ''
      };
      contentLines = [];
    } else {
      contentLines.push(line);
    }
  }
  
  // Don't forget the last section
  if (currentSection) {
    currentSection.content = contentLines.join('\n').trim();
    sections.push(currentSection);
  }
  
  return sections;
}

/**
 * Extract monster metadata from sections and markdown
 */
function extractMonsterMetadata(sections, markdown) {
  const metadata = {
    name: '',
    stats: {},
    encounterInfo: {}
  };
  
  // Find the monster name (usually the first H3)
  const nameSection = sections.find(s => s.level === 3);
  if (nameSection) {
    metadata.name = nameSection.title;
  }
  
  // Look for the stats table
  const statsMatch = markdown.match(/\|[^|]*Type:[^|]*\|[^|]*\|[\s\S]*?(?=\n\n|\n#|$)/);
  if (statsMatch) {
    const tableText = statsMatch[0];
    metadata.stats = parseStatsTable(tableText);
  }
  
  // Look for encounter information
  const encounterMatch = markdown.match(/\|[^|]*Lair:[^|]*\|[^|]*\|[\s\S]*?(?=\n\n|\n#|$)/);
  if (encounterMatch) {
    const tableText = encounterMatch[0];
    metadata.encounterInfo = parseEncounterTable(tableText);
  }
  
  return metadata;
}

/**
 * Parse a stats table into an object
 */
function parseStatsTable(tableText) {
  const stats = {};
  const rows = tableText.split('\n').filter(row => row.trim().startsWith('|'));
  
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
    
    if (cells.length >= 2) {
      const key = cells[0].replace(/[*:]/g, '').trim();
      const value = cells[1].trim();
      
      // Map common stat names
      const statMap = {
        'Type': 'type',
        'Size': 'size',
        'Speed': 'speed',
        'Armor Class': 'armorClass',
        'Hit Dice': 'hitDice',
        'Attacks': 'attacks',
        'Damage': 'damage',
        'Save': 'save',
        'Morale': 'morale',
        'Vision': 'vision'
      };
      
      if (statMap[key]) {
        stats[statMap[key]] = value;
      }
    }
  }
  
  return stats;
}

/**
 * Parse encounter table
 */
function parseEncounterTable(tableText) {
  const encounter = {};
  const rows = tableText.split('\n').filter(row => row.trim().startsWith('|'));
  
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
    
    if (cells.length >= 2) {
      const key = cells[0].replace(/[*:]/g, '').trim();
      const value = cells[1].trim();
      
      const encounterMap = {
        'Lair': 'lair',
        'Dungeon Enc': 'dungeonEnc',
        'Wilderness Enc': 'wildernessEnc',
        'Alignment': 'alignment',
        'Treasure Type': 'treasureType',
        'XP': 'xp'
      };
      
      if (encounterMap[key]) {
        encounter[encounterMap[key]] = value;
        
        // Parse XP as number
        if (key === 'XP') {
          encounter.xp = parseInt(value.replace(/,/g, ''), 10) || 0;
        }
      }
    }
  }
  
  return encounter;
}

/**
 * Extract spell metadata (placeholder for now)
 */
function extractSpellMetadata(sections, markdown) {
  // TODO: Implement spell metadata extraction
  return {};
}

/**
 * Process a single markdown file
 */
function processMarkdownFile(filePath, outputDir, contentType) {
  console.log(`Processing ${filePath}...`);
  
  // Read markdown with explicit UTF-8 encoding and handle Unicode characters
  let markdown = fs.readFileSync(filePath, 'utf-8');
  
  // Fix common Unicode characters that cause rendering issues
  markdown = markdown
    .replace(/⟪/g, '⟪')   // Mathematical left angle bracket
    .replace(/⟫/g, '⟫')   // Mathematical right angle bracket  
    .replace(/–/g, '–')    // En dash
    .replace(/—/g, '—')    // Em dash
    .replace(/'/g, "'")    // Left single quotation mark
    .replace(/'/g, "'")    // Right single quotation mark
    .replace(/"/g, '"')    // Left double quotation mark
    .replace(/"/g, '"')    // Right double quotation mark
    .replace(/…/g, '...')   // Horizontal ellipsis
    .replace(/ë/g, 'ë')    // e with diaeresis
    .replace(/\u00A0/g, ' ') // Non-breaking space to regular space
    .replace(/\uFFFD/g, '?'); // Replace Unicode replacement character with ?
  const result = convertMarkdownToHTML(markdown, contentType);
  
  // Generate output filename
  const baseName = path.basename(filePath, '.md');
  const outputPath = path.join(outputDir, `${baseName}.json`);
  
  // Write the result
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  
  console.log(`✅ Converted to ${outputPath}`);
  
  return result;
}

/**
 * Process all markdown files in a directory
 */
function processDirectory(inputDir, outputDir, contentType) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.toLowerCase().includes('readme'));
  
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const result = processMarkdownFile(filePath, outputDir, contentType);
    results.push(result);
  }
  
  // Create a summary file
  const summaryPath = path.join(outputDir, '_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    totalFiles: results.length,
    contentType,
    processedAt: new Date().toISOString(),
    files: results.map(r => ({
      name: r.metadata.name || 'Unknown',
      hasHTML: !!r.html,
      sectionsCount: r.sections.length
    }))
  }, null, 2));
  
  console.log(`\n✅ Processed ${results.length} files`);
  console.log(`📄 Summary saved to ${summaryPath}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node manual-markdown-converter.js <input-dir> <output-dir> <content-type>');
  console.log('Example: node manual-markdown-converter.js ./ACKS_II_Content/Monstrous_Manual ./converted/monsters monster');
  process.exit(1);
}

const [inputDir, outputDir, contentType] = args;

processDirectory(inputDir, outputDir, contentType);

export {
  convertMarkdownToHTML,
  processMarkdownFile,
  processDirectory
}; 