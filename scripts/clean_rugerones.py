#!/usr/bin/env python3
"""
Clean Rugerones Data Script

This script removes all extra movie information (year and IMDb ID) from the
rugerones.json file, keeping only the basic structure with movie titles.

Usage:
    python3 scripts/clean_rugerones.py
"""

import json
from pathlib import Path

def clean_movie_data(data):
    """Remove year and imdbId from all movies, keeping only titles."""
    
    cleaned_count = 0
    
    for block in data:
        if "movies" in block:
            for movie in block["movies"]:
                # Remove year and imdbId if they exist
                if "year" in movie:
                    del movie["year"]
                    cleaned_count += 1
                if "imdbId" in movie:
                    del movie["imdbId"]
                    cleaned_count += 1
    
    return data, cleaned_count

def backup_json_file(file_path: str) -> str:
    """Create a backup of the JSON file before making changes."""
    backup_path = f"{file_path}.backup.clean"
    try:
        with open(file_path, 'r', encoding='utf-8') as src:
            with open(backup_path, 'w', encoding='utf-8') as dst:
                dst.write(src.read())
        print(f"Backup created: {backup_path}")
        return backup_path
    except Exception as e:
        print(f"Warning: Could not create backup: {e}")
        return ""

def main():
    """Main function to clean the rugerones.json file."""
    
    # Define file paths
    json_file = "src/data/rugerones.json"
    
    # Check if file exists
    if not Path(json_file).exists():
        print(f"Error: File {json_file} not found!")
        return
    
    print("🧹 Clean Rugerones Data Script")
    print("=" * 50)
    print("This will remove all year and IMDb ID information from movies.")
    print("Only movie titles will be kept.")
    print()
    
    # Create backup
    backup_file = backup_json_file(json_file)
    
    try:
        # Read the current JSON file
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        print(f"Loaded {len(data)} director blocks from {json_file}")
        print("Cleaning movie data...")
        
        # Clean the data
        cleaned_data, cleaned_count = clean_movie_data(data)
        
        # Write the cleaned data back to the file
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ JSON file cleaned successfully!")
        print(f"📊 Removed {cleaned_count} extra fields from movies")
        
        if backup_file:
            print(f"💾 Backup saved as: {backup_file}")
        
        # Show sample of cleaned data
        print(f"\n📝 Sample of cleaned data:")
        for block in cleaned_data[:2]:  # Show first 2 blocks
            if "movies" in block:
                print(f"\n🎬 {block['title']}:")
                for movie in block["movies"][:2]:  # Show first 2 movies
                    print(f"  • {movie['title']}")
        
    except Exception as e:
        print(f"\n❌ Error cleaning file: {e}")
        if backup_file and Path(backup_file).exists():
            print(f"🔄 Restoring from backup...")
            try:
                with open(backup_file, 'r', encoding='utf-8') as src:
                    with open(json_file, 'w', encoding='utf-8') as dst:
                        dst.write(src.read())
                print("✅ File restored from backup")
            except Exception as restore_error:
                print(f"❌ Could not restore from backup: {restore_error}")

if __name__ == "__main__":
    main()
