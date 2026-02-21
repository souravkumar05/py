def generate_playlist_mood():
    print("--- 🎧 Personality-Based Mood Generator ---")
    
    # Question 1: Energy Level
    print("\n1. How is your energy right now?")
    print("   [A] Fully charged (Let's go!)")
    print("   [B] Chilled out (Low-key)")
    energy = input("Your choice: ").strip().upper()

    # Question 2: Valence (The 'Vibe')
    print("\n2. What's the 'color' of your current mood?")
    print("   [A] Bright & Sunlit (Positive)")
    print("   [B] Deep & Shadowy (Intense/Gloomy)")
    valence = input("Your choice: ").strip().upper()

    # Question 3: Situation
    print("\n3. Where are you?")
    print("   [A] Solo (In my head)")
    print("   [B] Social (With the world)")
    situation = input("Your choice: ").strip().upper()

    # Logic Mapping
    if energy == "A" and valence == "A":
        title = "Neon Euphoria"
        vibe = "Uplifting, fast-tempo, and rhythmic."
        bpm = "120 - 140 BPM"
        description = "This playlist is your personal hype-man. High-gloss production and major chords."
    
    elif energy == "A" and valence == "B":
        title = "Midnight Rebellion"
        vibe = "Aggressive, distorted, and high-intensity."
        bpm = "140+ BPM"
        description = "Heavy basslines and raw vocals. Perfect for a late-night drive or a heavy workout."

    elif energy == "B" and valence == "A":
        title = "Golden Hour Glow"
        vibe = "Warm, acoustic, and breezy."
        bpm = "70 - 90 BPM"
        description = "Soft melodies and organic instruments. Like a warm cup of coffee on a Sunday morning."

    else: # Low Energy, Deep/Shadowy Mood
        title = "Rain-Slicked Windows"
        vibe = "Atmospheric, minor-key, and slow."
        bpm = "Under 70 BPM"
        description = "Deeply introspective and emotionally resonant. Focused on lyrical storytelling and space."

    # Final Output
    print("\n" + "="*30)
    print(f"✨ YOUR CUSTOM PLAYLIST VIBE: {title} ✨")
    print(f"Vibe: {vibe}")
    print(f"Energy Level: {bpm}")
    print(f"Setting: {'Group Anthem' if situation == 'B' else 'Solo Immersion'}")
    print(f"\nDescription: {description}")
    print("="*30)

generate_playlist_mood()