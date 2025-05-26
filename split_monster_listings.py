#!/usr/bin/env python3
"""
ACKS II Monster Listings Splitter

This script splits the large monster listings files into individual monster entries.
Each monster gets its own file for easier reading and processing.

Author: AI Assistant
Date: 2024
"""

import os
import re
from pathlib import Path
from typing import List, Tuple

def sanitize_filename(text: str) -> str:
    """
    Convert a monster name into a safe filename.
    
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

def find_monster_entries(content: str) -> List[Tuple[int, str]]:
    """
    Find all monster entries in the content.
    
    Args:
        content: The full markdown content
        
    Returns:
        List of tuples: (line_number, monster_name)
    """
    lines = content.split('\n')
    entries = []
    
    for i, line in enumerate(lines):
        # Look for monster headers (### Monster Name)
        if line.strip().startswith('### '):
            # Extract the monster name (remove ### and whitespace)
            monster_name = line.lstrip('#').strip()
            entries.append((i, monster_name))
    
    return entries

def split_monster_file(filepath: str, output_dir: str) -> None:
    """
    Split a monster listings file into individual monster files.
    
    Args:
        filepath: Path to the input markdown file
        output_dir: Directory to save the split files
    """
    print(f"\nProcessing: {filepath}")
    
    # Read the file content
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all monster entries
    entries = find_monster_entries(content)
    
    if not entries:
        print(f"No monster entries found in {filepath}")
        return
    
    lines = content.split('\n')
    total_lines = len(lines)
    
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Split the content
    for i, (start_line, monster_name) in enumerate(entries):
        # Determine end line (start of next monster or end of file)
        if i + 1 < len(entries):
            end_line = entries[i + 1][0]
        else:
            end_line = total_lines
        
        # Extract the monster content
        monster_lines = lines[start_line:end_line]
        monster_content = '\n'.join(monster_lines)
        
        # Create filename
        monster_num = f"{i+1:03d}"  # Zero-padded monster number
        safe_name = sanitize_filename(monster_name)
        filename = f"{monster_num}_{safe_name}.md"
        
        # Write the monster to file
        output_path = os.path.join(output_dir, filename)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(monster_content)
        
        # Calculate size info
        size_kb = len(monster_content.encode('utf-8')) / 1024
        line_count = len(monster_lines)
        
        print(f"  Created: {filename} ({size_kb:.1f}KB, {line_count} lines)")

def main():
    """Main function to process monster listing files."""
    
    print("ACKS II Monster Listings Splitter")
    print("=" * 50)
    print("This script will split the large monster listing files into individual monster entries.")
    print()
    
    # Define the files to process
    files_to_process = [
        {
            'input': 'ACKS_II_Content/Monstrous_Manual/01_chapter_2_monster_listings.md',
            'output': 'ACKS_II_Content/Monstrous_Manual/Monster_Listings_A',
            'description': 'Monster Listings Part IIA'
        },
        {
            'input': 'ACKS II Monstrous Manual v46 - Part IIB.md',
            'output': 'ACKS_II_Content/Monstrous_Manual/Monster_Listings_B',
            'description': 'Monster Listings Part IIB'
        }
    ]
    
    # Process each file
    for file_info in files_to_process:
        input_path = file_info['input']
        output_dir = file_info['output']
        description = file_info['description']
        
        if os.path.exists(input_path):
            print(f"\n📚 Processing {description}...")
            split_monster_file(input_path, output_dir)
        else:
            print(f"❌ File not found: {input_path}")
    
    print("\n" + "=" * 50)
    print("✅ Monster listings splitting complete!")
    print("\nThe individual monster files are organized in:")
    print("  📁 ACKS_II_Content/Monstrous_Manual/Monster_Listings_A/")
    print("  📁 ACKS_II_Content/Monstrous_Manual/Monster_Listings_B/")
    print("\nEach monster now has its own file for easy reading and processing.")

if __name__ == "__main__":
    main() 