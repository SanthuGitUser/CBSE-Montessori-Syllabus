"""Compress generated images into public/content as webp.

Source files are named <prefix>-<slug>.(jpg|png) where prefix is one of
epl, lesson or item. Usage: python scripts/convert-generated-images.py <assets-dir>
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGETS = {
    "epl": (ROOT / "public/content/epl", 960),
    "lesson": (ROOT / "public/content/lessons", 960),
    "item": (ROOT / "public/content/items", 480),
}


def main(src_dir: Path) -> None:
    for src in sorted(src_dir.iterdir()):
        if src.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        prefix, _, slug = src.stem.partition("-")
        if prefix not in TARGETS or not slug:
            continue
        out_dir, width = TARGETS[prefix]
        out_dir.mkdir(parents=True, exist_ok=True)
        dest = out_dir / f"{slug}.webp"
        if dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
            continue
        img = Image.open(src).convert("RGB")
        if img.width > width:
            img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        img.save(dest, "WEBP", quality=80, method=6)
        print(f"{src.name} -> {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
