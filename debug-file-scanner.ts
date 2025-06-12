import { FileSystemScanner } from './src/lib/parsers/file-scanner';
import { promises as fs } from 'fs';
import path from 'path';

async function testScanner() {
  console.log('=== Testing FileSystemScanner ===');
  
  // First, let's manually check what files exist
  console.log('\n=== Manual File Check ===');
  try {
    const entries = await fs.readdir('./test_content', { withFileTypes: true });
    console.log('Top level entries:');
    for (const entry of entries) {
      console.log(`  ${entry.isDirectory() ? '📁' : '📄'} ${entry.name}`);
      if (entry.isDirectory()) {
        const subEntries = await fs.readdir(path.join('./test_content', entry.name), { withFileTypes: true });
        for (const subEntry of subEntries) {
          console.log(`    ${subEntry.isDirectory() ? '📁' : '📄'} ${subEntry.name}`);
        }
      }
    }
  } catch (error) {
    console.error('Manual check error:', error);
  }
  
  console.log('\n=== FileSystemScanner Test ===');
  const scanner = new FileSystemScanner({
    rootDirectory: './test_content',
    recursive: true,
    includePatterns: ['**/*.md'],
    excludePatterns: ['**/node_modules/**', '**/.git/**', '**/README.md'],
    followSymlinks: false
  });
  
  try {
    const files = await scanner.discoverFiles();
    console.log(`Found ${files.length} files:`);
    
    files.forEach(file => {
      console.log(`  - ${file.relativePath}`);
      console.log(`    Category: ${file.category}`);
      console.log(`    Should process: ${file.shouldProcess}`);
      console.log(`    Size: ${file.size} bytes`);
    });
    
  } catch (error) {
    console.error('Scanner error:', error);
  }
}

testScanner(); 