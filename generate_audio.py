#!/usr/bin/env python3
"""
Generate Teochew (Min Nan) audio files for the learning app.

Uses Microsoft Edge TTS with the XiaoxiaoDialectsNeural voice and nan-CN
(Min Nan) locale — the closest available TTS to Teochew pronunciation.

Usage:
    pip install edge-tts
    python generate_audio.py

This will create MP3 files in the audio/ directory. The web app will
automatically detect and use these files instead of Mandarin fallback.
"""

import asyncio
import os
import json
import re

# Try edge-tts first, with clear error message if not installed
try:
    import edge_tts
except ImportError:
    print("ERROR: edge-tts is not installed.")
    print("Install it with: pip install edge-tts")
    print()
    exit(1)

# Voice configuration
# zh-CN-XiaoxiaoDialectsNeural with nan-CN locale is Min Nan (closest to Teochew)
# Fallback to zh-CN-XiaoxiaoNeural (Mandarin) if dialect voice unavailable
MIN_NAN_VOICE = "zh-CN-XiaoxiaoDialectsNeural"
MANDARIN_VOICE = "zh-CN-XiaoxiaoNeural"

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio")

# All vocabulary words (hanzi) from the app - extracted from js/data.js
WORDS = [
    # Greetings
    "你好", "食飽未", "多謝", "免客氣", "對唔住", "再見", "請問", "早起", "好佳哉", "歡迎",
    # Numbers
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "萬",
    # Family
    "阿爸", "阿母", "阿兄", "阿姐", "阿弟", "阿妹", "阿公", "阿嬤", "丈夫", "某", "囝", "孫",
    # Food
    "飯", "粥", "麵", "粿條", "茶", "魚", "肉", "菜", "蛋", "豆腐", "鹹", "甜", "酸", "辣",
    # Daily
    "是", "唔是", "好", "我", "你", "伊", "這個", "許個", "乜個", "幾多錢", "佇塊", "愛", "唔愛", "會曉",
    # Places
    "厝", "學堂", "街", "市場", "病院", "銀行", "廟", "店",
    # Time
    "今日", "明日", "昨日", "日晝", "暗暝", "禮拜", "月", "年",
    # Phrases
    "我是潮州人", "你是乜個人", "我是越南人", "我唔會曉講潮州話",
    "請你講慢些", "我聽無", "這個好食", "我愛學潮州話", "新年好",
    # Body parts
    "頭", "目", "耳", "鼻", "嘴", "手", "腳", "心", "腹",
    # Colors
    "紅", "白", "烏", "青", "黃", "藍", "金",
]


def sanitize_filename(hanzi):
    """Convert hanzi to a safe filename using Unicode code points."""
    return "_".join(f"{ord(c):04x}" for c in hanzi)


async def check_voice_available(voice_name):
    """Check if a specific voice is available."""
    try:
        voices = await edge_tts.list_voices()
        return any(v["ShortName"] == voice_name for v in voices)
    except Exception:
        return False


async def generate_audio_for_word(word, voice, use_ssml=False):
    """Generate an MP3 file for a single word."""
    filename = sanitize_filename(word) + ".mp3"
    filepath = os.path.join(OUTPUT_DIR, filename)

    if os.path.exists(filepath):
        return filepath, True  # Already exists

    try:
        if use_ssml:
            # Use SSML to specify Min Nan locale
            ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='nan-CN'>
    <voice name='{voice}'>
        {word}
    </voice>
</speak>"""
            communicate = edge_tts.Communicate(ssml)
        else:
            communicate = edge_tts.Communicate(word, voice)

        await communicate.save(filepath)
        return filepath, True
    except Exception as e:
        print(f"  ERROR generating '{word}': {e}")
        return filepath, False


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print("Teochew Learning App - Audio Generator")
    print("=" * 60)

    # Check for Min Nan voice
    print("\nChecking available voices...")
    has_min_nan = await check_voice_available(MIN_NAN_VOICE)

    if has_min_nan:
        voice = MIN_NAN_VOICE
        use_ssml = True
        print(f"✓ Found Min Nan voice: {MIN_NAN_VOICE}")
        print("  Using nan-CN (Min Nan) locale — closest to Teochew!")
    else:
        voice = MANDARIN_VOICE
        use_ssml = False
        print(f"✗ Min Nan voice not available.")
        print(f"  Falling back to Mandarin: {MANDARIN_VOICE}")
        print("  Note: Mandarin pronunciation differs from Teochew.")

    # Remove duplicates while preserving order
    unique_words = list(dict.fromkeys(WORDS))

    print(f"\nGenerating audio for {len(unique_words)} words...")
    print(f"Output directory: {OUTPUT_DIR}\n")

    success_count = 0
    skip_count = 0
    fail_count = 0

    for i, word in enumerate(unique_words, 1):
        filepath = os.path.join(OUTPUT_DIR, sanitize_filename(word) + ".mp3")
        if os.path.exists(filepath):
            skip_count += 1
            print(f"  [{i}/{len(unique_words)}] {word} — skipped (exists)")
            continue

        _, ok = await generate_audio_for_word(word, voice, use_ssml)
        if ok:
            success_count += 1
            print(f"  [{i}/{len(unique_words)}] {word} — ✓")
        else:
            fail_count += 1
            print(f"  [{i}/{len(unique_words)}] {word} — ✗ failed")

        # Small delay to avoid rate limiting
        await asyncio.sleep(0.3)

    # Generate manifest for the web app
    manifest = {}
    for word in unique_words:
        filename = sanitize_filename(word) + ".mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath):
            manifest[word] = filename

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n{'=' * 60}")
    print(f"Done! Generated: {success_count}, Skipped: {skip_count}, Failed: {fail_count}")
    print(f"Manifest written to: {manifest_path}")
    print(f"Voice used: {voice}" + (" (Min Nan)" if use_ssml else " (Mandarin)"))
    print(f"{'=' * 60}")


if __name__ == "__main__":
    asyncio.run(main())
