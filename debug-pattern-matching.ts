function matchesPattern(filePath: string, pattern: string): boolean {
  // Convert glob pattern to regex
  // First escape dots, then handle ** before *, to avoid conflicts
  const regexPattern = pattern
    .replace(/\./g, '\\.')    // Escape dots first
    .replace(/\*\*/g, '___DOUBLESTAR___')  // Temporarily replace ** 
    .replace(/\*/g, '[^/]*')  // * matches any characters except /
    .replace(/___DOUBLESTAR___/g, '.*')  // ** matches any number of directories
    .replace(/\?/g, '[^/]');  // ? matches any single character except /
  
  const regex = new RegExp(`^${regexPattern}$`, 'i');
  console.log(`Testing: "${filePath}" against pattern "${pattern}"`);
  console.log(`Regex: ${regex}`);
  const result = regex.test(filePath);
  console.log(`Result: ${result}\n`);
  return result;
}

// Test the pattern matching
const testPaths = [
  'Monstrous_Manual/sample_monsters.md',
  'Rulebook/sample_rules.md',
  'monstrous_manual/sample_monsters.md',
  'rulebook/sample_rules.md'
];

const testPatterns = [
  '**/*.md',
  '*.md',
  'Monstrous_Manual/*.md',
  '*/*.md'
];

console.log('=== Pattern Matching Test (FIXED) ===\n');

for (const pattern of testPatterns) {
  console.log(`\n--- Testing pattern: "${pattern}" ---`);
  for (const path of testPaths) {
    matchesPattern(path, pattern);
  }
} 