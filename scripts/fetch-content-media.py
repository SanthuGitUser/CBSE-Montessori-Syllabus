"""Download reference photos/sounds into public/content (run once; optional)."""
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "content"

ASSETS = {
    "images/pink-tower.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Pink_Tower_and_Brown_Stairs.jpg/330px-Pink_Tower_and_Brown_Stairs.jpg",
    "images/sandpaper-letters.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sandpaper_letters.jpg/330px-Sandpaper_letters.jpg",
    "images/cow.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/330px-Cow_female_black_white.jpg",
    "images/dog.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/330px-YellowLabradorLooking_new.jpg",
    "images/cat.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/330px-Cat03.jpg",
    "images/rainbow.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rainbow_over_Bristol.jpg/330px-Rainbow_over_Bristol.jpg",
    "images/india-flag.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/330px-Flag_of_India.svg.png",
    "audio/cow-moo.ogg": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Cow_moo.ogg",
    "audio/dog-bark.ogg": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Dog_barking.ogg",
    "audio/cat-meow.ogg": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat_meow.ogg",
}


def main():
    for rel, url in ASSETS.items():
        dest = OUT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        print(f"fetch {rel}")
        req = urllib.request.Request(url, headers={"User-Agent": "CBSE-for-Parents/1.0 (education)"})
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                dest.write_bytes(resp.read())
        except Exception as e:
            print(f"  failed: {e}")
    print("done")


if __name__ == "__main__":
    main()
