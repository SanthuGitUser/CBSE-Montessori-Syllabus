"""Fetch candidate CC-licensed photos per topic from Openverse for manual review.

Usage: python scripts/photo_candidates.py [slug ...]
Writes scripts/.candidates/<slug>/<n>.jpg, meta.json and a contact sheet.
"""
import io
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
CAND = ROOT / "scripts" / ".candidates"
UA = {"User-Agent": "CBSE-for-Parents/1.0 (education app for parents)"}

QUERIES: dict[str, list[str]] = {
    "rolling-mat": ["montessori work mat rug child", "child rolling rug montessori"],
    "sit-on-mat": ["child sitting on mat montessori", "child sitting floor mat activity"],
    "walk-between-mats": ["montessori classroom mats floor children", "montessori classroom floor rugs"],
    "wash-hands": ["child washing hands soap", "kid washing hands sink"],
    "spread-napkin": ["child napkin table setting", "cloth napkin table child"],
    "napkin-folding": ["folding napkin", "napkin folding hands"],
    "sorting-beads": ["sorting beads children", "beads sorting bowls"],
    "tongs": ["montessori tongs transfer", "child using tongs"],
    "pegs": ["clothespin activity child", "clothes pegs fine motor"],
    "puzzles": ["wooden puzzle child", "toddler jigsaw puzzle"],
    "carry-tray-chair": ["child carrying tray montessori", "child carrying chair"],
    "silence": ["children sitting quietly classroom", "child meditation calm"],
    "threading": ["child threading beads", "lacing beads child"],
    "lock-and-key": ["lock and key toy", "padlock key child"],
    "opening-lids": ["jars lids montessori", "child opening jar"],
    "greeting": ["children greeting namaste", "child shaking hands greeting"],
    "sneeze-cough": ["cough into elbow", "sneeze elbow child"],
    "pairing-pictures": ["picture matching cards children", "memory matching cards"],
    "colour-sorting": ["colour sorting toddler", "color sorting activity child"],
    "pounding": ["pounding bench toddler", "child hammer pegs toy"],
    "dressing-frames": ["montessori dressing frame", "dressing frame buttons"],
    "scissors": ["child using scissors cutting paper", "kids scissors cutting"],
    "offer-sharp": ["passing scissors safely handle", "child scissors handle"],
    "fold-tshirt": ["child folding clothes", "folding t-shirt"],
    "transfer-liquid": ["montessori pouring water", "child pouring water jug"],
    "walk-line": ["montessori walking on the line", "child balance walking tape line"],
    "rolling-dough": ["child rolling dough", "kid rolling pin dough"],
    "transfer-grains": ["montessori spooning beans", "child spooning grains bowls"],
    "pattern-cutting": ["cutting along lines scissors worksheet", "child cutting paper strips"],
    "table-manners": ["children eating at table", "child eating with spoon table"],
    "sort-fruit-veg": ["fruits and vegetables basket", "child sorting vegetables"],
}


def get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def get_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def search(q: str, n: int) -> list[dict]:
    params = urllib.parse.urlencode(
        {"q": q, "page_size": n, "license": "cc0,pdm,by,by-sa", "mature": "false"}
    )
    for attempt in range(3):
        try:
            return get_json(f"https://api.openverse.org/v1/images/?{params}")["results"]
        except Exception as e:  # noqa: BLE001
            print(f"  search retry {attempt + 1}: {e}")
            time.sleep(4)
    return []


def contact_sheet(folder: Path, items: list[dict]) -> None:
    tiles = []
    for i, _ in enumerate(items):
        p = folder / f"{i}.jpg"
        if not p.exists():
            continue
        im = Image.open(p).convert("RGB")
        im.thumbnail((300, 300))
        tile = Image.new("RGB", (300, 330), "white")
        tile.paste(im, ((300 - im.width) // 2, 0))
        ImageDraw.Draw(tile).text((6, 308), f"#{i}", fill="black")
        tiles.append(tile)
    if not tiles:
        return
    cols = 4
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 300, rows * 330), "#ddd")
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % cols) * 300, (i // cols) * 330))
    sheet.save(folder / "sheet.jpg", quality=80)


def main() -> None:
    slugs = sys.argv[1:] or list(QUERIES)
    for slug in slugs:
        folder = CAND / slug
        folder.mkdir(parents=True, exist_ok=True)
        print(f"== {slug}")
        items: list[dict] = []
        seen = set()
        for q in QUERIES[slug]:
            for r in search(q, 6):
                if r["id"] in seen:
                    continue
                seen.add(r["id"])
                items.append(r)
        kept = []
        for r in items[:8]:
            i = len(kept)
            try:
                data = get_bytes(r["thumbnail"])
                Image.open(io.BytesIO(data)).verify()
                (folder / f"{i}.jpg").write_bytes(data)
                kept.append(
                    {
                        "title": r.get("title"),
                        "url": r["url"],
                        "creator": r.get("creator"),
                        "license": r.get("license"),
                        "license_version": r.get("license_version"),
                        "landing": r.get("foreign_landing_url"),
                    }
                )
            except Exception as e:  # noqa: BLE001
                print(f"  skip: {e}")
        (folder / "meta.json").write_text(json.dumps(kept, indent=2), encoding="utf-8")
        contact_sheet(folder, kept)
        print(f"  kept {len(kept)}")


if __name__ == "__main__":
    main()
