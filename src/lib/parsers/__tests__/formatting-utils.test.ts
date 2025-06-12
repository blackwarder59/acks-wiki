/**
 * Tests for ACKS II Formatting Utilities
 * 
 * Comprehensive test suite covering all formatting utility functions
 * with various edge cases and ACKS II-specific content patterns.
 */

import {
  parseDetailedMarkdownTable,
  extractTextFormatting,
  parseMarkdownLists,
  extractImageReferences,
  parseDetailedDiceNotation,
  extractCrossReferences,
  normalizeText,
  extractBlockQuotes,
  parseAcksRange
} from '../formatting-utils';

describe('parseDetailedMarkdownTable', () => {
  test('parses simple table with header', () => {
    const markdown = `
| Name | AC | HD |
|------|----|----|
| Goblin | 6 | 1-1 |
| Orc | 6 | 1 |
    `;
    
    const result = parseDetailedMarkdownTable(markdown);
    
    expect(result.hasHeader).toBe(true);
    expect(result.headers).toEqual(['Name', 'AC', 'HD']);
    expect(result.rows).toEqual([
      ['Goblin', '6', '1-1'],
      ['Orc', '6', '1']
    ]);
    expect(result.columnCount).toBe(3);
    expect(result.rowCount).toBe(2);
  });

  test('parses table without header', () => {
    const markdown = `
| Goblin | 6 | 1-1 |
| Orc | 6 | 1 |
    `;
    
    const result = parseDetailedMarkdownTable(markdown);
    
    expect(result.hasHeader).toBe(false);
    expect(result.headers).toEqual(['', '', '']);
    expect(result.rows).toEqual([
      ['Goblin', '6', '1-1'],
      ['Orc', '6', '1']
    ]);
  });

  test('handles table with caption', () => {
    const markdown = `
Monster Statistics
| Name | AC | HD |
|------|----|----|
| Goblin | 6 | 1-1 |
    `;
    
    const result = parseDetailedMarkdownTable(markdown);
    
    expect(result.caption).toBe('Monster Statistics');
    expect(result.hasHeader).toBe(true);
  });

  test('handles escaped pipes in cells', () => {
    const markdown = `
| Name | Description |
|------|-------------|
| Test | Contains \\| pipe |
    `;
    
    const result = parseDetailedMarkdownTable(markdown);
    
    expect(result.rows[0][1]).toBe('Contains \\| pipe');
  });

  test('handles empty table', () => {
    const result = parseDetailedMarkdownTable('');
    
    expect(result.hasHeader).toBe(false);
    expect(result.headers).toEqual([]);
    expect(result.rows).toEqual([]);
    expect(result.columnCount).toBe(0);
    expect(result.rowCount).toBe(0);
  });

  test('normalizes column count across rows', () => {
    const markdown = `
| A | B |
|---|---|
| 1 | 2 | 3 |
| 4 |
    `;
    
    const result = parseDetailedMarkdownTable(markdown);
    
    expect(result.columnCount).toBe(3);
    expect(result.headers).toEqual(['A', 'B', '']);
    expect(result.rows).toEqual([
      ['1', '2', '3'],
      ['4', '', '']
    ]);
  });
});

describe('extractTextFormatting', () => {
  test('extracts bold text', () => {
    const text = 'This is **bold** and __also bold__ text.';
    const result = extractTextFormatting(text);
    
    expect(result.bold).toEqual(['bold', 'also bold']);
    expect(result.plainText).toBe('This is bold and also bold text.');
  });

  test('extracts italic text', () => {
    const text = 'This is *italic* and _also italic_ text.';
    const result = extractTextFormatting(text);
    
    expect(result.italic).toEqual(['italic', 'also italic']);
    expect(result.plainText).toBe('This is italic and also italic text.');
  });

  test('extracts bold-italic text', () => {
    const text = 'This is ***bold italic*** and ___also bold italic___ text.';
    const result = extractTextFormatting(text);
    
    expect(result.boldItalic).toEqual(['bold italic', 'also bold italic']);
    expect(result.plainText).toBe('This is bold italic and also bold italic text.');
  });

  test('handles nested formatting correctly', () => {
    const text = 'Text with ***bold italic***, **bold**, and *italic*.';
    const result = extractTextFormatting(text);
    
    expect(result.boldItalic).toEqual(['bold italic']);
    expect(result.bold).toEqual(['bold']);
    expect(result.italic).toEqual(['italic']);
  });

  test('handles empty text', () => {
    const result = extractTextFormatting('');
    
    expect(result.bold).toEqual([]);
    expect(result.italic).toEqual([]);
    expect(result.boldItalic).toEqual([]);
    expect(result.plainText).toBe('');
  });
});

describe('parseMarkdownLists', () => {
  test('parses bullet lists', () => {
    const text = `
- First item
- Second item
* Third item
+ Fourth item
    `;
    
    const result = parseMarkdownLists(text);
    
    expect(result.bulletLists).toHaveLength(1);
    expect(result.bulletLists[0]).toEqual([
      'First item',
      'Second item',
      'Third item',
      'Fourth item'
    ]);
  });

  test('parses numbered lists', () => {
    const text = `
1. First item
2. Second item
3. Third item
    `;
    
    const result = parseMarkdownLists(text);
    
    expect(result.numberedLists).toHaveLength(1);
    expect(result.numberedLists[0]).toEqual([
      'First item',
      'Second item',
      'Third item'
    ]);
  });

  test('separates multiple lists', () => {
    const text = `
- Bullet one
- Bullet two

Some text

1. Number one
2. Number two

More text

- Another bullet
    `;
    
    const result = parseMarkdownLists(text);
    
    expect(result.bulletLists).toHaveLength(2);
    expect(result.numberedLists).toHaveLength(1);
    expect(result.allItems).toEqual([
      'Bullet one',
      'Bullet two',
      'Number one',
      'Number two',
      'Another bullet'
    ]);
  });
});

describe('extractImageReferences', () => {
  test('extracts basic image references', () => {
    const text = 'Here is an image: ![Alt text](image.png)';
    const result = extractImageReferences(text);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      src: 'image.png',
      alt: 'Alt text',
      title: undefined,
      isRelative: true,
      resolvedPath: 'image.png'
    });
  });

  test('extracts image with title', () => {
    const text = '![Monster](dragon.jpg "A fearsome dragon")';
    const result = extractImageReferences(text);
    
    expect(result[0]).toEqual({
      src: 'dragon.jpg',
      alt: 'Monster',
      title: 'A fearsome dragon',
      isRelative: true,
      resolvedPath: 'dragon.jpg'
    });
  });

  test('resolves relative paths with base path', () => {
    const text = '![Test](../images/test.png)';
    const result = extractImageReferences(text, '/content/monsters');
    
    expect(result[0].resolvedPath).toBe('/content/monsters/../images/test.png');
  });

  test('handles absolute URLs', () => {
    const text = '![External](https://example.com/image.png)';
    const result = extractImageReferences(text);
    
    expect(result[0].isRelative).toBe(false);
    expect(result[0].resolvedPath).toBe('https://example.com/image.png');
  });

  test('handles empty alt text', () => {
    const text = '![](image.png)';
    const result = extractImageReferences(text);
    
    expect(result[0].alt).toBe('');
  });
});

describe('parseDetailedDiceNotation', () => {
  test('parses basic dice notation', () => {
    const result = parseDetailedDiceNotation('2d6');
    
    expect(result).toEqual({
      original: '2d6',
      count: 2,
      sides: 6,
      modifier: 0,
      minimum: 2,
      maximum: 12,
      average: 7
    });
  });

  test('parses dice with positive modifier', () => {
    const result = parseDetailedDiceNotation('1d20+5');
    
    expect(result).toEqual({
      original: '1d20+5',
      count: 1,
      sides: 20,
      modifier: 5,
      minimum: 6,
      maximum: 25,
      average: 15.5
    });
  });

  test('parses dice with negative modifier', () => {
    const result = parseDetailedDiceNotation('3d4-2');
    
    expect(result).toEqual({
      original: '3d4-2',
      count: 3,
      sides: 4,
      modifier: -2,
      minimum: 1,
      maximum: 10,
      average: 5.5
    });
  });

  test('handles invalid notation', () => {
    expect(parseDetailedDiceNotation('invalid')).toBeNull();
    expect(parseDetailedDiceNotation('2x6')).toBeNull();
    expect(parseDetailedDiceNotation('')).toBeNull();
  });

  test('handles case insensitive input', () => {
    const result = parseDetailedDiceNotation('2D6+1');
    
    expect(result?.count).toBe(2);
    expect(result?.sides).toBe(6);
    expect(result?.modifier).toBe(1);
  });
});

describe('extractCrossReferences', () => {
  test('extracts monster references', () => {
    const text = 'This creature fights as Orc and you can see Goblin for details.';
    const result = extractCrossReferences(text);
    
    const monsterRefs = result.filter(ref => ref.type === 'monster');
    expect(monsterRefs).toHaveLength(2);
    expect(monsterRefs[0].target).toBe('Orc');
    expect(monsterRefs[1].target).toBe('Goblin');
  });

  test('extracts spell references', () => {
    const text = 'The wizard can cast Magic Missile spell and Fireball spell.';
    const result = extractCrossReferences(text);
    
    const spellRefs = result.filter(ref => ref.type === 'spell');
    expect(spellRefs).toHaveLength(2);
    expect(spellRefs[0].target).toBe('Magic Missile');
    expect(spellRefs[1].target).toBe('Fireball');
  });

  test('extracts class references', () => {
    const text = 'Available to Fighter class and as a Cleric ability.';
    const result = extractCrossReferences(text);
    
    const classRefs = result.filter(ref => ref.type === 'class');
    expect(classRefs).toHaveLength(2);
    expect(classRefs[0].target).toBe('Fighter');
    expect(classRefs[1].target).toBe('Cleric');
  });

  test('extracts general references', () => {
    const text = 'For more information (see Chapter 3) and (see Appendix A).';
    const result = extractCrossReferences(text);
    
    const generalRefs = result.filter(ref => ref.type === 'reference');
    expect(generalRefs).toHaveLength(2);
    expect(generalRefs[0].target).toBe('Chapter 3');
    expect(generalRefs[1].target).toBe('Appendix A');
  });

  test('includes context and position', () => {
    const text = 'The monster fights as Orc in combat.';
    const result = extractCrossReferences(text);
    
    expect(result[0].context).toContain('monster fights as Orc in');
    expect(result[0].position.start).toBeGreaterThanOrEqual(0);
    expect(result[0].position.end).toBeGreaterThan(result[0].position.start);
  });
});

describe('normalizeText', () => {
  test('removes extra whitespace', () => {
    const text = 'This   has    extra     spaces';
    const result = normalizeText(text);
    
    expect(result).toBe('This has extra spaces');
  });

  test('standardizes line breaks', () => {
    const text = 'Line 1\r\nLine 2\rLine 3\n\n\nLine 4';
    const result = normalizeText(text);
    
    expect(result).toBe('Line 1\nLine 2\nLine 3\n\nLine 4');
  });

  test('standardizes quotes and dashes', () => {
    const text = '"Smart quotes" and \'apostrophes\' with em—dash and en–dash';
    const result = normalizeText(text);
    
    expect(result).toBe('"Smart quotes" and \'apostrophes\' with em-dash and en-dash');
  });

  test('removes zero-width characters', () => {
    const text = 'Text\u200Bwith\u200Czero\u200Dwidth\uFEFFchars';
    const result = normalizeText(text);
    
    expect(result).toBe('Textwithzerowidthchars');
  });

  test('trims leading and trailing whitespace', () => {
    const text = '   Text with spaces   ';
    const result = normalizeText(text);
    
    expect(result).toBe('Text with spaces');
  });
});

describe('extractBlockQuotes', () => {
  test('extracts simple block quotes', () => {
    const text = `
> This is a quote
> spanning multiple lines
> with more content

Regular text

> Another quote
    `;
    
    const result = extractBlockQuotes(text);
    
    expect(result.quotes).toHaveLength(2);
    expect(result.quotes[0]).toBe('This is a quote\nspanning multiple lines\nwith more content');
    expect(result.quotes[1]).toBe('Another quote');
  });

  test('extracts callouts', () => {
    const text = `
> [!WARNING] This is a warning
> [!NOTE] This is a note
> [!TIP] This is a tip
    `;
    
    const result = extractBlockQuotes(text);
    
    expect(result.callouts).toHaveLength(3);
    expect(result.callouts[0]).toEqual({ type: 'warning', content: 'This is a warning' });
    expect(result.callouts[1]).toEqual({ type: 'note', content: 'This is a note' });
    expect(result.callouts[2]).toEqual({ type: 'tip', content: 'This is a tip' });
  });

  test('handles mixed quotes and callouts', () => {
    const text = `
> Regular quote
> [!INFO] Callout content
> More quote text
    `;
    
    const result = extractBlockQuotes(text);
    
    expect(result.quotes).toHaveLength(1);
    expect(result.quotes[0]).toBe('Regular quote\nMore quote text');
    expect(result.callouts).toHaveLength(1);
    expect(result.callouts[0]).toEqual({ type: 'info', content: 'Callout content' });
  });
});

describe('parseAcksRange', () => {
  test('parses touch range', () => {
    const result = parseAcksRange('Touch');
    
    expect(result).toEqual({
      type: 'touch',
      unit: 'special',
      original: 'Touch'
    });
  });

  test('parses self range', () => {
    const result = parseAcksRange('Self');
    
    expect(result).toEqual({
      type: 'self',
      unit: 'special',
      original: 'Self'
    });
  });

  test('parses simple ranged format', () => {
    const result = parseAcksRange("120'");
    
    expect(result).toEqual({
      type: 'ranged',
      short: 120,
      medium: undefined,
      long: undefined,
      unit: 'feet',
      original: "120'"
    });
  });

  test('parses complex ranged format', () => {
    const result = parseAcksRange("30'/60'/90'");
    
    expect(result).toEqual({
      type: 'ranged',
      short: 30,
      medium: 60,
      long: 90,
      unit: 'feet',
      original: "30'/60'/90'"
    });
  });

  test('handles special ranges', () => {
    const result = parseAcksRange('Line of Sight');
    
    expect(result).toEqual({
      type: 'special',
      unit: 'special',
      original: 'Line of Sight'
    });
  });

  test('handles case insensitive input', () => {
    const result = parseAcksRange('TOUCH');
    
    expect(result.type).toBe('touch');
  });
}); 