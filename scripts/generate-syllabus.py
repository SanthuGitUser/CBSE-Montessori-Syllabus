"""Extract Montessori 1 monthly syllabus from PDFs into syllabus.json and deduped syllabus-by-subject.json."""
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT
OUT_MONTHS = ROOT / "src" / "data" / "syllabus.json"
OUT_CATALOG = ROOT / "src" / "data" / "syllabus-by-subject.json"

SUBJECTS = [
    "ENGLISH",
    "MATH",
    "EVS",
    "EPL ACTIVITIES",
    "SENSORIAL",
    "SPEAKING SKILLS",
]

SUBJECT_ORDER = [
    "English",
    "Math",
    "EVS",
    "EPL Activities",
    "Sensorial",
    "Speaking Skills",
]

PHASES = (
    "Revision",
    "Introduction",
    "Writing",
    "Mat activities",
    "Preliminary activities",
    "Social behaviour activities",
    "Social behavioral activities",
)

MONTH_ORDER = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
]


def normalize_whitespace(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def normalize_topic(topic: str) -> str:
    """Match src/lib/topicContent/normalize.ts for dedupe keys."""
    s = topic.lower()
    s = re.sub(r"[–—]", "-", s)
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"[.:]+$", "", s)
    return s.strip()


def is_visible_topic(topic: str) -> bool:
    return not re.match(r"^mat activities$", topic.strip(), re.I)


def parse_pdf(path: Path) -> dict:
    reader = PdfReader(str(path))
    text = "\n".join((p.extract_text() or "") for p in reader.pages)
    text = text.replace("\r", "\n")

    month_match = re.search(
        r"Montessori 1 - Portions for the month of (\w+)\s*\(([^)]+)\)|"
        r"Montessori 1 - Portions for the month of (\w+)\s+(\d{4}-\d{2})",
        text,
        re.I,
    )
    if month_match:
        month = month_match.group(1) or month_match.group(3)
        year = month_match.group(2) or month_match.group(4)
    else:
        month, year = "Unknown", ""

    text = re.sub(r"EPL\s*\n\s*ACTIVITIES", "EPL ACTIVITIES", text, flags=re.I)
    text = re.sub(r"SPEAKING\s*\n\s*SKILLS", "SPEAKING SKILLS", text, flags=re.I)

    subjects = []
    for i, subj in enumerate(SUBJECTS):
        start = text.upper().find(subj)
        if start == -1:
            continue
        end = len(text)
        for other in SUBJECTS[i + 1 :]:
            pos = text.upper().find(other, start + len(subj))
            if pos != -1:
                end = min(end, pos)
        chunk = text[start + len(subj) : end]

        blocks = []
        current_phase = "general"
        current_topics: list[str] = []

        def flush():
            nonlocal current_topics
            if current_topics:
                blocks.append(
                    {
                        "phase": current_phase.lower(),
                        "topics": current_topics,
                    }
                )
                current_topics = []

        for raw_line in chunk.split("\n"):
            line = normalize_whitespace(raw_line)
            if not line:
                continue
            phase_hit = None
            for ph in PHASES:
                if line.lower().startswith(ph.lower()):
                    flush()
                    rest = line[len(ph) :].strip(" :")
                    current_phase = ph.lower()
                    if rest.startswith("*"):
                        rest = rest.lstrip("*").strip()
                    if rest:
                        current_topics.append(rest)
                    phase_hit = True
                    break
            if phase_hit:
                continue
            if line.startswith("*"):
                topic = line.lstrip("*").strip()
                if topic:
                    current_topics.append(topic)
            elif line.lower().rstrip(":") in [p.lower() for p in PHASES] and (
                line.endswith(":") or line.lower() in [p.lower() for p in PHASES]
            ):
                flush()
                current_phase = line.rstrip(":").lower()
            elif line.lower() == "mat activities":
                flush()
                current_phase = "mat activities"

        flush()

        if subj == "EVS":
            name = "EVS"
        elif subj == "EPL ACTIVITIES":
            name = "EPL Activities"
        elif subj == "SPEAKING SKILLS":
            name = "Speaking Skills"
        else:
            name = subj.title()
        subjects.append({"name": name, "blocks": blocks})

    return {"month": month.capitalize(), "year": year.strip(), "subjects": subjects}


def build_subject_catalog(months: list[dict]) -> dict:
    """Merge all months into unique topics per subject (first-seen title and order)."""
    buckets: dict[str, dict[str, dict]] = {}
    order_counter = 0

    for month_doc in months:
        month_name = month_doc["month"]
        for subject in month_doc["subjects"]:
            sname = subject["name"]
            if sname not in buckets:
                buckets[sname] = {}

            for block in subject["blocks"]:
                phase = block["phase"]
                for topic in block["topics"]:
                    if not is_visible_topic(topic):
                        continue
                    key = normalize_topic(topic)
                    if key not in buckets[sname]:
                        order_counter += 1
                        buckets[sname][key] = {
                            "title": topic,
                            "key": key,
                            "phases": [],
                            "months": [],
                            "order": order_counter,
                        }
                    rec = buckets[sname][key]
                    if phase not in rec["phases"]:
                        rec["phases"].append(phase)
                    if month_name not in rec["months"]:
                        rec["months"].append(month_name)

    subjects_out = []
    for sname in SUBJECT_ORDER:
        if sname not in buckets or not buckets[sname]:
            continue
        topics = sorted(buckets[sname].values(), key=lambda t: t["order"])
        subjects_out.append(
            {
                "name": sname,
                "topics": [
                    {
                        "title": t["title"],
                        "key": t["key"],
                        "phases": t["phases"],
                        "months": t["months"],
                    }
                    for t in topics
                ],
            }
        )

    years = [m["year"] for m in months if m.get("year")]
    academic_year = years[-1] if years else ""

    total_unique = sum(len(s["topics"]) for s in subjects_out)

    return {
        "academicYear": academic_year,
        "sourceMonths": len(months),
        "topicCount": total_unique,
        "subjects": subjects_out,
    }


def main():
    months = []
    for pdf in sorted(PDF_DIR.glob("*.pdf")):
        months.append(parse_pdf(pdf))

    months.sort(
        key=lambda m: MONTH_ORDER.index(m["month"]) if m["month"] in MONTH_ORDER else 99
    )

    OUT_MONTHS.parent.mkdir(parents=True, exist_ok=True)
    OUT_MONTHS.write_text(json.dumps(months, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(months)} months to {OUT_MONTHS}")

    catalog = build_subject_catalog(months)
    OUT_CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")
    print(
        f"Wrote {catalog['topicCount']} unique topics across "
        f"{len(catalog['subjects'])} subjects to {OUT_CATALOG}"
    )


if __name__ == "__main__":
    main()
