"""List which activity photo each practical-life syllabus topic resolves to."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = (ROOT / "src/data/topicContent/eplActivities.ts").read_text(encoding="utf-8")
rules = re.findall(r'match: /(.+?)/i,\s*\n\s*photo: photo\("([a-z-]+)"\)', src)
data = json.loads((ROOT / "src/data/syllabus.json").read_text(encoding="utf-8"))

seen: dict[tuple[str, str], str | None] = {}
for month in data:
    for subject in month["subjects"]:
        for block in subject["blocks"]:
            for topic in block["topics"]:
                if topic.strip().lower() == "mat activities":
                    continue
                hit = next((slug for pat, slug in rules if re.search(pat, topic, re.I)), None)
                if subject["name"] == "EPL Activities" or hit:
                    seen.setdefault((subject["name"], topic), hit)

for (subject, topic), hit in sorted(seen.items(), key=lambda x: (x[1] is not None, x[0])):
    print(f"{subject:16} | {topic[:60]:60} -> {hit}")
