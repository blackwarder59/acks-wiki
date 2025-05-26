#!/usr/bin/env python3
"""
ACKS II File Splitter

This script splits the large ACKS II markdown files into manageable chunks
based on their chapter and section structure. This makes them easier to read
and process for the wiki project.

Author: AI Assistant
Date: 2024
"""

import os
import re
from pathlib import Path
from typing import List, Tuple, Dict

def sanitize_filename(text: str) -> str:
    """
    Convert a chapter/section title into a safe filename.
    
    Args:
        text: The original text to sanitize
        
    Returns:
        A safe filename string
    """
    # Remove markdown formatting and special characters
    text = re.sub(r'[#\[\]{}()*+?.,\\^$|]', '', text)
    # Replace spaces and other characters with underscores
    text = re.sub(r'[\s\-:]+', '_', text)
    # Remove leading/trailing underscores and convert to lowercase
    text = text.strip('_').lower()
    # Limit length to avoid filesystem issues
    return text[:50] if len(text) > 50 else text

def find_chapter_breaks(content: str) -> List[Tuple[int, str, str]]:
    """
    Find all chapter and major section breaks in the content.
    
    Args:
        content: The full markdown content
        
    Returns:
        List of tuples: (line_number, header_level, title)
    """
    lines = content.split('\n')
    breaks = []
    
    for i, line in enumerate(lines):
        # Look for markdown headers (# ## ### etc.)
        if line.strip().startswith('#'):
            # Count the number of # characters
            level = len(line) - len(line.lstrip('#'))
            # Extract the title (remove # and whitespace)
            title = line.lstrip('#').strip()
            
            # Only split on major sections (# and ##)
            if level <= 2 and title:
                breaks.append((i, '#' * level, title))
    
    return breaks

def split_file_by_chapters(filepath: str, output_dir: str) -> None:
    """
    Split a large markdown file into smaller files based on chapter structure.
    
    Args:
        filepath: Path to the input markdown file
        output_dir: Directory to save the split files
    """
    print(f"\nProcessing: {filepath}")
    
    # Read the file content
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all chapter breaks
    breaks = find_chapter_breaks(content)
    
    if not breaks:
        print(f"No chapter breaks found in {filepath}")
        return
    
    lines = content.split('\n')
    total_lines = len(lines)
    
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Split the content
    for i, (start_line, level, title) in enumerate(breaks):
        # Determine end line (start of next chapter or end of file)
        if i + 1 < len(breaks):
            end_line = breaks[i + 1][0]
        else:
            end_line = total_lines
        
        # Extract the section content
        section_lines = lines[start_line:end_line]
        section_content = '\n'.join(section_lines)
        
        # Create filename
        chapter_num = f"{i+1:02d}"  # Zero-padded chapter number
        safe_title = sanitize_filename(title)
        filename = f"{chapter_num}_{safe_title}.md"
        
        # Write the section to file
        output_path = os.path.join(output_dir, filename)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(section_content)
        
        # Calculate size info
        size_kb = len(section_content.encode('utf-8')) / 1024
        line_count = len(section_lines)
        
        print(f"  Created: {filename} ({size_kb:.1f}KB, {line_count} lines)")

def main():
    """Main function to process all ACKS II files."""
    
    print("ACKS II File Splitter")
    print("=" * 50)
    print("This script will split the large ACKS II files into manageable chunks.")
    print()
    
    # Define the files to process and their output directories
    files_to_process = [
        {
            'input': 'ACKS II Revised Rulebook v144 - Ready for Layout.md',
            'output': 'ACKS_II_Content/Rulebook',
            'description': 'ACKS II Revised Rulebook'
        },
        {
            'input': 'ACKS II Judges Journal v57 Ready for Layout.md',
            'output': 'ACKS_II_Content/Judges_Journal',
            'description': 'ACKS II Judges Journal'
        },
        {
            'input': 'ACKS II Monstrous Manual v46 - Part I.md',
            'output': 'ACKS_II_Content/Monstrous_Manual',
            'description': 'Monstrous Manual Part I'
        },
        {
            'input': 'ACKS II Monstrous Manual v46 - Part IIA.md',
            'output': 'ACKS_II_Content/Monstrous_Manual',
            'description': 'Monstrous Manual Part IIA'
        },
        {
            'input': 'ACKS II Monstrous Manual v46 - Part IIB.md',
            'output': 'ACKS_II_Content/Monstrous_Manual',
            'description': 'Monstrous Manual Part IIB'
        },
        {
            'input': 'ACKS II Monstrous Manual v46 - Part III.md',
            'output': 'ACKS_II_Content/Monstrous_Manual',
            'description': 'Monstrous Manual Part III'
        }
    ]
    
    # Process each file
    for file_info in files_to_process:
        input_path = file_info['input']
        output_dir = file_info['output']
        description = file_info['description']
        
        if os.path.exists(input_path):
            print(f"\n📚 Processing {description}...")
            split_file_by_chapters(input_path, output_dir)
        else:
            print(f"❌ File not found: {input_path}")
    
    print("\n" + "=" * 50)
    print("✅ File splitting complete!")
    print("\nThe split files are organized in the ACKS_II_Content directory:")
    print("  📁 ACKS_II_Content/")
    print("    📁 Rulebook/")
    print("    📁 Judges_Journal/")
    print("    📁 Monstrous_Manual/")
    print("\nEach file is now a manageable size for reading and processing.")

if __name__ == "__main__":
    main() 