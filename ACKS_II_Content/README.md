# ACKS II Content - Split and Organized

This directory contains the ACKS II content split into **619 manageable files** for easier reading, processing, and development of the ACKS II Wiki.

## 📁 Directory Structure

```
ACKS_II_Content/
├── Rulebook/                    # 118 files from the main rulebook
├── Judges_Journal/              # 174 files from the judges journal  
└── Monstrous_Manual/            # 327 files from the monster manual
    ├── Monster_Listings_A/      # 167 individual monster files (Part IIA)
    ├── Monster_Listings_B/      # 125 individual monster files (Part IIB)
    └── [Other chapters]         # 35 files covering rules, creation, etc.
```

## 📊 Content Breakdown

### Rulebook (118 files)
- **Core Rules**: Character creation, classes, proficiencies, equipment
- **Magic System**: Complete spell lists and descriptions
- **Adventure Rules**: Dungeon delving, wilderness exploration, combat
- **Campaign Rules**: Domains, realms, armies, battles, sieges
- **Appendices**: Auran Empire setting, conditions, wounds

### Judges Journal (174 files)
- **Part I - Praxis**: Gamemastering fundamentals and philosophy
- **Part II - Construction**: Building realms, settlements, dungeons
- **Part III - Abstraction**: Abstract dungeon and wilderness systems
- **Part IV - Customization**: Creating custom classes, races, spells
- **Part V - Appendices**: Adventures, cosmology, economics

### Monstrous Manual (327 files)
- **Monster Overview**: Types, characteristics, rules
- **Individual Monsters**: 292 unique monster entries (A-Z)
- **Monster Rules**: Attributes, proficiencies, training
- **Monster Creation**: Complete system for designing new monsters

## 🎯 File Naming Convention

All files follow a consistent naming pattern:
- **Chapters**: `##_chapter_title.md` (e.g., `01_character_creation.md`)
- **Monsters**: `###_monster_name.md` (e.g., `001_acanthaspis_giant.md`)
- **Sections**: `##_section_title.md` (descriptive titles)

## 📏 File Sizes

The original files were massive:
- **Original Rulebook**: 2.3MB (20,000+ lines)
- **Original Judges Journal**: 1.9MB (19,000+ lines)
- **Original Monster Manual**: 1.5MB+ combined

**After splitting**:
- Average file size: **3-15KB** (manageable for reading)
- Largest individual file: **~400KB** (spell descriptions)
- Most files: **Under 10KB** (quick to load and process)

## 🔍 How to Use This Content

### For Reading
Each file is now small enough to:
- Read comfortably in any text editor
- Load quickly in web browsers
- Process efficiently with scripts

### For Wiki Development
Perfect structure for:
- **Individual pages**: Each monster/spell/rule gets its own page
- **Cross-references**: Easy linking between related content
- **Search indexing**: Granular content for better search results
- **Version control**: Track changes to specific rules/monsters

### For Content Processing
Ideal for:
- **Automated parsing**: Extract specific data types
- **Content analysis**: Study patterns across monsters/spells
- **Database import**: Convert to structured data formats
- **API development**: Serve individual content pieces

## 🛠️ Technical Details

### Splitting Methodology
1. **Chapter-based splitting**: Used markdown headers (`#`, `##`) as break points
2. **Monster-based splitting**: Used `### Monster Name` pattern for individual entries
3. **Preserved formatting**: All original markdown formatting maintained
4. **Safe filenames**: Special characters converted to underscores

### Content Integrity
- ✅ **No content lost**: Every line from original files preserved
- ✅ **Formatting maintained**: Tables, lists, emphasis preserved
- ✅ **Images included**: Base64 encoded images kept with content
- ✅ **Cross-references intact**: All internal references preserved

## 📋 Next Steps for Wiki Development

1. **Content Analysis**: Parse files to extract structured data
2. **Database Design**: Create schema for monsters, spells, classes
3. **Cross-Reference Mapping**: Build relationship graphs between content
4. **Search Index**: Create full-text search across all content
5. **Web Interface**: Build Next.js components for each content type

## 🔧 Scripts Used

The content was split using custom Python scripts:
- `split_acks_files.py`: Main chapter-based splitter
- `split_monster_listings.py`: Specialized monster entry splitter

Both scripts include extensive documentation and error handling.

## 📈 Statistics

- **Total Files**: 619 markdown files
- **Total Monsters**: 292 unique creatures
- **Total Spells**: 300+ spell descriptions
- **Total Classes**: 20+ character classes
- **Processing Time**: ~30 seconds for complete split

---

*This content is from the Adventurer Conqueror King System II (ACKS II) by Autarch LLC. All rights reserved. This split is for development purposes of the ACKS II Wiki project.* 