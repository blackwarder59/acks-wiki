const fs = require('fs');
const path = require('path');

// Simple file discovery
function findMarkdownFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && path.extname(entry.name) === '.md') {
        const relativePath = path.relative(dir, fullPath);
        files.push({
          fullPath,
          relativePath,
          name: entry.name
        });
      }
    }
  }
  
  scan(dir);
  return files;
}

console.log('=== Debug File Scanner ===');
console.log('Looking for files in: ./test_content');

const files = findMarkdownFiles('./test_content');
console.log(`Found ${files.length} markdown files:`);

files.forEach(file => {
  console.log(`  - ${file.relativePath}`);
  console.log(`    Full path: ${file.fullPath}`);
  console.log(`    Exists: ${fs.existsSync(file.fullPath)}`);
});

console.log('\n=== Directory Structure ===');
function showStructure(dir, indent = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    console.log(`${indent}${entry.isDirectory() ? '📁' : '📄'} ${entry.name}`);
    if (entry.isDirectory()) {
      showStructure(path.join(dir, entry.name), indent + '  ');
    }
  });
}

showStructure('./test_content'); 