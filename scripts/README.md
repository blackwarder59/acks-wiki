# ACKS II Content Processing Scripts

This directory contains command-line tools for batch processing and validating ACKS II markdown content files. These scripts are designed to work with the content structure found in the `ACKS_II_Content/` directory.

## Available Scripts

### 1. Content Processing CLI (`process-content.ts`)

A comprehensive tool for batch processing ACKS II markdown content into structured JSON data.

#### Features
- 🔄 Batch processing with configurable concurrency
- 📊 Multiple output formats (single, collection, indexed)
- ⚡ Parallel processing with progress reporting
- 🔍 Comprehensive validation and error handling
- 📈 Detailed processing reports and statistics
- 🔧 Configuration file support (JSON/YAML)
- 👀 Watch mode for continuous development
- 📦 Incremental processing (only changed files)

#### Basic Usage

```bash
# Process all content with default settings
npm run process-content

# Process specific content types
npm run process-content -- --types monster,spell,class

# Process with custom input/output directories
npm run process-content -- --input ./content --output ./dist

# Use configuration file
npm run process-content -- --config ./scripts/config.json

# Watch mode for development
npm run process-content -- --watch --verbose
```

#### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `-i, --input <dir>` | Input directory containing ACKS II content | `./ACKS_II_Content` |
| `-o, --output <dir>` | Output directory for processed JSON files | `./output` |
| `-f, --format <format>` | Output format: single, collection, or indexed | `collection` |
| `-t, --types <types>` | Content types to process (comma-separated) | All types |
| `-c, --categories <categories>` | Content categories to process (comma-separated) | All categories |
| `--concurrency <number>` | Number of concurrent processing tasks | `3` |
| `--batch-size <number>` | Batch size for processing | `10` |
| `--validation <level>` | Validation level: strict, normal, or lenient | `normal` |
| `--no-continue-on-error` | Stop processing on first error | Continue |
| `--incremental` | Enable incremental processing (only changed files) | Disabled |
| `--watch` | Watch mode for continuous processing | Disabled |
| `-v, --verbose` | Increase verbosity level (can be used multiple times) | Normal |
| `--no-pretty-print` | Disable pretty printing of JSON output | Pretty print |
| `--no-reports` | Disable generation of processing reports | Generate reports |
| `--config <file>` | Configuration file path (JSON or YAML) | None |

#### Content Types
- `monster` - Creatures from the Monstrous Manual
- `spell` - Arcane and Divine spells
- `class` - Character classes and templates
- `equipment` - Weapons, armor, and gear
- `rule` - Game rules and mechanics
- `proficiency` - Character proficiencies
- `domain_rule` - Domain management rules
- `judge_tool` - Tools for judges/GMs

#### Content Categories
- `Rulebook` - Core game rules
- `Judges_Journal` - GM tools and guidance
- `Monstrous_Manual` - Creature descriptions

#### Output Formats

**Collection Format** (default)
```json
{
  "metadata": { ... },
  "data": [ ... ],
  "crossReferences": { ... }
}
```

**Single Format**
- One JSON file per content item
- Organized in subdirectories by type

**Indexed Format**
- Collection format with lookup indices
- Optimized for fast searches

#### Examples

```bash
# Development workflow - watch for changes with detailed logging
npm run process-content -- --watch --verbose --verbose --incremental

# Production build - fast processing with minimal output
npm run process-content -- --concurrency 5 --no-pretty-print --verbose 0

# Validation-focused - strict checking with detailed reports
npm run process-content -- --validation strict --no-continue-on-error --verbose

# Process only monsters from Monstrous Manual
npm run process-content -- --types monster --categories Monstrous_Manual

# Use custom configuration
npm run process-content -- --config ./scripts/my-config.yaml
```

### 2. Content Validation CLI (`validate-content.ts`)

A focused validation tool for checking ACKS II content files without generating output files.

#### Features
- ⚡ Fast validation-only processing
- 📋 Detailed error reporting with line numbers
- 🎯 Multiple validation levels (strict, normal, lenient)
- 📄 JSON and text output formats for reports
- 🚦 Exit codes for CI/CD integration
- ⚙️ Configurable error thresholds

#### Basic Usage

```bash
# Validate all content with default settings
npm run validate-content

# Validate specific content types
npm run validate-content -- --types monster,spell

# Generate detailed report
npm run validate-content -- --verbose --verbose --report validation-report.txt

# Strict validation for CI/CD
npm run validate-content -- --level strict --format json --report results.json
```

#### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `-i, --input <dir>` | Input directory containing ACKS II content | `./ACKS_II_Content` |
| `-r, --report <file>` | Output file for validation report | Console only |
| `-f, --format <format>` | Report format: json or text | `text` |
| `-l, --level <level>` | Validation level: strict, normal, or lenient | `normal` |
| `-t, --types <types>` | Content types to validate (comma-separated) | All types |
| `-c, --categories <categories>` | Content categories to validate (comma-separated) | All categories |
| `--max-errors <number>` | Maximum number of errors before stopping | `100` |
| `--no-warnings` | Hide warnings in output | Show warnings |
| `--no-colors` | Disable colored output | Use colors |
| `--no-exit-on-error` | Do not exit with error code on validation failure | Exit on error |
| `-v, --verbose` | Increase verbosity level (can be used multiple times) | Normal |

#### Validation Levels

**Strict**
- Treats warnings as errors
- Stops on first validation failure
- Recommended for CI/CD pipelines

**Normal** (default)
- Reports errors and warnings
- Continues processing after errors
- Good for development and content review

**Lenient**
- Minimal validation
- Only reports critical structural issues
- Useful for draft content

#### Examples

```bash
# Quick validation check
npm run validate-content

# Detailed validation with report
npm run validate-content -- --verbose --verbose --report validation-report.txt

# CI/CD validation
npm run validate-content -- --level strict --format json --report results.json --no-colors

# Validate only monsters with lenient checking
npm run validate-content -- --types monster --level lenient

# Generate JSON report for analysis
npm run validate-content -- --format json --report validation.json --no-exit-on-error
```

## Configuration Files

Both scripts support configuration files in JSON or YAML format. Use the `--config` option to specify a configuration file.

### Example JSON Configuration

```json
{
  "inputDir": "./ACKS_II_Content",
  "outputDir": "./output",
  "outputFormat": "collection",
  "contentTypes": ["monster", "spell", "class"],
  "categories": ["Monstrous_Manual", "Rulebook"],
  "concurrency": 3,
  "batchSize": 10,
  "validationLevel": "normal",
  "continueOnError": true,
  "incremental": false,
  "watch": false,
  "verbose": 1,
  "prettyPrint": true,
  "generateReports": true
}
```

### Example YAML Configuration

```yaml
# ACKS II Content Processing Configuration
inputDir: "./ACKS_II_Content"
outputDir: "./output"
outputFormat: "collection"

contentTypes:
  - "monster"
  - "spell"
  - "class"

categories:
  - "Monstrous_Manual"
  - "Rulebook"

concurrency: 3
batchSize: 10
validationLevel: "normal"
continueOnError: true
incremental: false
watch: false
verbose: 1
prettyPrint: true
generateReports: true
```

## Integration with Package.json

The scripts are integrated into the project's package.json:

```json
{
  "scripts": {
    "process-content": "ts-node scripts/process-content.ts",
    "validate-content": "ts-node scripts/validate-content.ts"
  }
}
```

## Error Handling and Exit Codes

### Process Content CLI
- **Exit Code 0**: Processing completed successfully
- **Exit Code 1**: Processing failed due to configuration or system errors

### Validate Content CLI
- **Exit Code 0**: All content passed validation
- **Exit Code 1**: Validation failed (when `--exit-on-error` is enabled)

## Performance Considerations

### Concurrency Settings
- **Low concurrency (1-2)**: Better for systems with limited memory
- **Medium concurrency (3-5)**: Good balance for most systems
- **High concurrency (6-10)**: For powerful systems with lots of RAM

### Batch Size
- **Small batches (1-5)**: More responsive progress reporting
- **Medium batches (10-20)**: Good balance of performance and memory usage
- **Large batches (50-100)**: Maximum throughput for large datasets

### Memory Usage
- Processing large numbers of files may require significant memory
- Use incremental processing for very large content sets
- Monitor memory usage with verbose logging

## Troubleshooting

### Common Issues

**"Input directory does not exist"**
- Check that the input directory path is correct
- Ensure you're running from the project root directory

**"Failed to load config file"**
- Verify the configuration file syntax (JSON/YAML)
- Check file permissions and path

**"Processing failed with timeout"**
- Reduce concurrency settings
- Increase system memory if possible
- Use incremental processing for large datasets

**"Validation errors in content"**
- Review the detailed error report
- Check content file structure and formatting
- Verify that content follows ACKS II markdown conventions

### Debug Mode

Enable maximum verbosity for debugging:

```bash
# Process content with debug output
npm run process-content -- --verbose --verbose --verbose

# Validate content with debug output
npm run validate-content -- --verbose --verbose --verbose
```

## Development Workflow

### Recommended Development Process

1. **Initial Setup**
   ```bash
   # Validate all content first
   npm run validate-content
   ```

2. **Development with Watch Mode**
   ```bash
   # Watch for changes during development
   npm run process-content -- --watch --incremental --verbose
   ```

3. **Pre-commit Validation**
   ```bash
   # Strict validation before committing
   npm run validate-content -- --level strict
   ```

4. **Production Build**
   ```bash
   # Generate final output
   npm run process-content -- --validation strict --no-continue-on-error
   ```

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Validate ACKS II Content
  run: npm run validate-content -- --level strict --format json --report validation.json

- name: Process ACKS II Content
  run: npm run process-content -- --validation strict --no-continue-on-error
```

## Contributing

When adding new content or modifying existing content:

1. Run validation to check for issues: `npm run validate-content`
2. Fix any validation errors or warnings
3. Test processing: `npm run process-content`
4. Commit changes with validation passing

For script development:
1. Follow TypeScript best practices
2. Add comprehensive error handling
3. Include progress reporting for long operations
4. Update documentation for new features 