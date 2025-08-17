#!/usr/bin/env python3
"""
Find Correct Movie Information Script

This script helps you find the correct IMDb IDs for movies by providing
a structured approach to search for each movie manually.

Usage:
    python3 scripts/find_correct_movies.py
"""

import json
from pathlib import Path

def get_movies_needing_info():
    """Get all movies that need year and IMDb ID information."""
    
    json_file = "src/data/rugerones.json"
    
    if not Path(json_file).exists():
        print(f"Error: File {json_file} not found!")
        return []
    
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    movies_needing_info = []
    
    for block in data:
        if "movies" in block:
            for movie in block["movies"]:
                if "year" not in movie or "imdbId" not in movie:
                    movies_needing_info.append({
                        "title": movie["title"],
                        "director": block["title"],
                        "block_id": block["id"]
                    })
    
    return movies_needing_info

def display_search_instructions():
    """Display instructions for finding movie information."""
    
    print("🔍 Movie Information Search Instructions")
    print("=" * 60)
    print()
    print("To find the correct year and IMDb ID for each movie:")
    print()
    print("1. Go to https://www.imdb.com")
    print("2. Search for the movie title + director name")
    print("3. Verify it's the correct movie by checking:")
    print("   - Director matches")
    print("   - Year is correct")
    print("   - Title is the right movie")
    print("4. Copy the IMDb ID from the URL (e.g., tt0080120)")
    print("5. Note the release year")
    print()
    print("Alternative search methods:")
    print("- Use Google: 'movie title director name year imdb'")
    print("- Use Wikipedia: search for the movie and find IMDb link")
    print("- Use TMDB: https://www.themoviedb.org")
    print()

def main():
    """Main function to help find correct movie information."""
    
    movies_needing_info = get_movies_needing_info()
    
    if not movies_needing_info:
        print("✅ All movies already have year and IMDb ID information!")
        return
    
    print(f"📽️  Found {len(movies_needing_info)} movies needing information:")
    print()
    
    # Group by director for easier searching
    by_director = {}
    for movie in movies_needing_info:
        director = movie["director"]
        if director not in by_director:
            by_director[director] = []
        by_director[director].append(movie)
    
    for director, movies in by_director.items():
        print(f"🎬 {director}")
        print("-" * 40)
        for movie in movies:
            print(f"  • {movie['title']}")
        print()
    
    print("=" * 60)
    display_search_instructions()
    
    print("📝 Next steps:")
    print("1. Search for each movie using the methods above")
    print("2. Create a mapping file with the correct information")
    print("3. Use the mapping to update the JSON file")
    print()
    print("💡 Tip: Start with movies you're most familiar with")
    print("   or movies with distinctive titles that are easier to find")

if __name__ == "__main__":
    main()
