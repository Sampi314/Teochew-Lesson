#!/usr/bin/env python3
"""
Generate AUTHENTIC Teochew pronunciation audio files for the learning app.

Uses the same audio source as the Teochew Pop-up Dictionary Chrome Extension
(teochewspot.com) — native speaker recordings in authentic Teochew (Shantou
prestige dialect).

Usage:
    pip install requests
    python generate_audio.py

This downloads MP3 files to the audio/ directory. The web app automatically
detects and uses these files for pronunciation playback.
"""

import json
import os
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: 'requests' package is required.")
    print("Install it with: pip install requests")
    sys.exit(1)

# === Configuration ===
GRAPHQL_ENDPOINTS = [
    "https://www.teochewspot.com/graphql",
    "https://ycsyuqckpfe5addllgynkolgba0dkniu.lambda-url.us-west-1.on.aws/graphql",
]
AUDIO_BASE_URL = "https://www.teochewspot.com/audio"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio")

# All vocabulary words from the app
WORDS = [
    "你好", "食飽未", "多謝", "免客氣", "對唔住", "再見", "請問", "早起", "好佳哉", "歡迎",
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "萬",
    "阿爸", "阿母", "阿兄", "阿姐", "阿弟", "阿妹", "阿公", "阿嬤", "丈夫", "某", "囝", "孫",
    "飯", "粥", "麵", "粿條", "茶", "魚", "肉", "菜", "蛋", "豆腐", "鹹", "甜", "酸", "辣",
    "是", "唔是", "好", "我", "你", "伊", "這個", "許個", "乜個", "幾多錢", "佇塊", "愛", "唔愛", "會曉",
    "厝", "學堂", "街", "市場", "病院", "銀行", "廟", "店",
    "今日", "明日", "昨日", "日晝", "暗暝", "禮拜", "月", "年",
    "我是潮州人", "你是乜個人", "我是越南人", "我唔會曉講潮州話",
    "請你講慢些", "我聽無", "這個好食", "幾多錢", "我愛學潮州話", "新年好",
    "頭", "目", "耳", "鼻", "嘴", "手", "腳", "心", "腹",
    "紅", "白", "烏", "青", "黃", "藍", "金",
]


def sanitize_filename(hanzi):
    """Convert hanzi to a safe filename using Unicode code points."""
    return "_".join(f"{ord(c):04x}" for c in hanzi)


def extract_unique_chars(words):
    """Extract all unique Chinese characters from the word list."""
    chars = set()
    for word in words:
        for ch in word:
            if '\u4e00' <= ch <= '\u9fff' or '\u3400' <= ch <= '\u4dbf':
                chars.add(ch)
    return chars


def fetch_dictionaries(chars):
    """Fetch Teochew pronunciation and audio dictionaries via GraphQL."""
    # Build the query - same as Teochew Pop-up Dictionary extension
    chars_str = "".join(chars)

    query = """
    query genPartialDict($simpChars: String!, $tradChars: String!) {
        pinyinChaoyinDictRes(simpChars: $simpChars, tradChars: $tradChars)
        teochewAudioDictRes(simpChars: $simpChars, tradChars: $tradChars)
    }
    """

    variables = {
        "simpChars": chars_str,
        "tradChars": chars_str,
    }

    payload = {
        "query": query,
        "variables": variables,
    }

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "TeochewLearningApp/1.0",
    }

    for endpoint in GRAPHQL_ENDPOINTS:
        try:
            print(f"  Trying endpoint: {endpoint}")
            resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)
            resp.raise_for_status()
            data = resp.json()

            if "data" in data:
                result = data["data"]
                # Parse the JSON string responses
                pinyin_chaoyin = json.loads(result["pinyinChaoyinDictRes"]) if isinstance(result["pinyinChaoyinDictRes"], str) else result["pinyinChaoyinDictRes"]
                audio_dict = json.loads(result["teochewAudioDictRes"]) if isinstance(result["teochewAudioDictRes"], str) else result["teochewAudioDictRes"]
                return pinyin_chaoyin, audio_dict
            elif "errors" in data:
                print(f"  GraphQL errors: {data['errors']}")
        except requests.exceptions.RequestException as e:
            print(f"  Failed: {e}")
        except (json.JSONDecodeError, KeyError) as e:
            print(f"  Parse error: {e}")

    return None, None


def get_chaoyin_for_char(char, pinyin_chaoyin_dict):
    """Look up the Teochew pronunciation for a character."""
    # The dict maps character -> pronunciation info
    if char in pinyin_chaoyin_dict:
        entry = pinyin_chaoyin_dict[char]
        if isinstance(entry, dict):
            # Get the first/default pronunciation
            for key, value in entry.items():
                if isinstance(value, list) and len(value) > 0:
                    return value[0]
                elif isinstance(value, str):
                    return value
        elif isinstance(entry, list) and len(entry) > 0:
            return entry[0]
        elif isinstance(entry, str):
            return entry
    return None


def download_audio(syllable, audio_dict):
    """Download an audio file for a Teochew syllable."""
    if syllable not in audio_dict:
        return None

    filename = audio_dict[syllable]
    url = f"{AUDIO_BASE_URL}/{filename}.mp3"

    try:
        resp = requests.get(url, timeout=15)
        if resp.status_code == 200 and len(resp.content) > 100:
            return resp.content
        else:
            print(f"    Audio not found: {url} (status {resp.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"    Download error for {syllable}: {e}")

    return None


def generate_word_audio(word, pinyin_chaoyin_dict, audio_dict):
    """Generate concatenated audio for a multi-character word."""
    syllable_audios = []

    for char in word:
        if '\u4e00' <= char <= '\u9fff' or '\u3400' <= char <= '\u4dbf':
            chaoyin = get_chaoyin_for_char(char, pinyin_chaoyin_dict)
            if chaoyin:
                audio_data = download_audio(chaoyin, audio_dict)
                if audio_data:
                    syllable_audios.append(audio_data)
                else:
                    print(f"    No audio for syllable: {chaoyin} (char: {char})")
            else:
                print(f"    No pronunciation found for: {char}")

    return syllable_audios


def save_syllable_manifest(audio_dict, pinyin_chaoyin_dict):
    """Save a manifest mapping words to their syllable audio files."""
    manifest = {}
    syllable_files = {}

    for word in dict.fromkeys(WORDS):
        syllables = []
        for char in word:
            if '\u4e00' <= char <= '\u9fff' or '\u3400' <= char <= '\u4dbf':
                chaoyin = get_chaoyin_for_char(char, pinyin_chaoyin_dict)
                if chaoyin and chaoyin in audio_dict:
                    syllable_id = audio_dict[chaoyin]
                    syllables.append(syllable_id)
                    syllable_files[syllable_id] = True

        if syllables:
            manifest[word] = syllables

    return manifest, syllable_files


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print("Teochew Learning App - Authentic Audio Generator")
    print("Source: teochewspot.com (native Teochew recordings)")
    print("=" * 60)

    # Step 1: Extract unique characters
    chars = extract_unique_chars(WORDS)
    print(f"\nFound {len(chars)} unique characters in vocabulary.")

    # Step 2: Fetch pronunciation dictionaries
    print("\nFetching Teochew pronunciation data...")
    pinyin_chaoyin_dict, audio_dict = fetch_dictionaries(chars)

    if not pinyin_chaoyin_dict or not audio_dict:
        print("\nERROR: Could not fetch pronunciation data from teochewspot.com.")
        print("This might be due to network issues or API changes.")
        print("Please check your internet connection and try again.")
        sys.exit(1)

    print(f"  Got {len(pinyin_chaoyin_dict)} pronunciation entries")
    print(f"  Got {len(audio_dict)} audio file mappings")

    # Step 3: Build manifest and identify needed syllable files
    print("\nBuilding audio manifest...")
    manifest, syllable_files = save_syllable_manifest(audio_dict, pinyin_chaoyin_dict)
    print(f"  {len(manifest)} words mapped to syllables")
    print(f"  {len(syllable_files)} unique syllable audio files needed")

    # Step 4: Download syllable audio files
    print(f"\nDownloading syllable audio files to {OUTPUT_DIR}/...")
    success = 0
    skipped = 0
    failed = 0

    for i, syllable_id in enumerate(sorted(syllable_files.keys()), 1):
        filepath = os.path.join(OUTPUT_DIR, f"{syllable_id}.mp3")

        if os.path.exists(filepath):
            skipped += 1
            continue

        url = f"{AUDIO_BASE_URL}/{syllable_id}.mp3"
        try:
            resp = requests.get(url, timeout=15)
            if resp.status_code == 200 and len(resp.content) > 100:
                with open(filepath, "wb") as f:
                    f.write(resp.content)
                success += 1
                print(f"  [{i}/{len(syllable_files)}] {syllable_id}.mp3 - downloaded")
            else:
                failed += 1
                print(f"  [{i}/{len(syllable_files)}] {syllable_id}.mp3 - not found ({resp.status_code})")
        except requests.exceptions.RequestException as e:
            failed += 1
            print(f"  [{i}/{len(syllable_files)}] {syllable_id}.mp3 - error: {e}")

        time.sleep(0.2)  # Be polite to the server

    # Step 5: Save manifest
    manifest_data = {
        "source": "teochewspot.com",
        "dialect": "Teochew (Shantou prestige)",
        "type": "syllable",
        "words": manifest,
        "audioBaseUrl": AUDIO_BASE_URL,
    }

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, ensure_ascii=False, indent=2)

    # Also save the dictionaries for the web app to use
    dicts_path = os.path.join(OUTPUT_DIR, "teochew_dicts.json")
    with open(dicts_path, "w", encoding="utf-8") as f:
        json.dump({
            "pinyinChaoyin": pinyin_chaoyin_dict,
            "audioDict": audio_dict,
        }, f, ensure_ascii=False)

    print(f"\n{'=' * 60}")
    print(f"Done!")
    print(f"  Downloaded: {success} | Skipped: {skipped} | Failed: {failed}")
    print(f"  Manifest: {manifest_path}")
    print(f"  Dictionaries: {dicts_path}")
    print(f"\nAudio source: teochewspot.com (authentic Teochew)")
    print(f"Dialect: Shantou prestige form (standard Teochew)")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
