import type { SubjectCatalog, SyllabusCatalog } from "../types";
import { topicKey } from "./parentGuides";

export type TopicEntry = {
  id: string;
  subject: string;
  phase: string;
  topic: string;
  months: string[];
};

export type NumberedTopicEntry = TopicEntry & { number: number };

export type SubjectTopicGroup = {
  subject: string;
  entries: NumberedTopicEntry[];
};

export function primaryPhase(phases: string[]): string {
  if (phases.includes("introduction")) return "introduction";
  if (phases.includes("revision")) return "revision";
  return phases[0] ?? "general";
}

export function flattenSubjectCatalog(subject: SubjectCatalog): TopicEntry[] {
  return subject.topics.map((t) => ({
    id: topicKey(subject.name, t.title),
    subject: subject.name,
    phase: primaryPhase(t.phases),
    topic: t.title,
    months: t.months,
  }));
}

export function catalogTopicCount(catalog: SyllabusCatalog): number {
  return catalog.topicCount;
}

export function allCatalogTopicIds(catalog: SyllabusCatalog): string[] {
  const ids: string[] = [];
  for (const subject of catalog.subjects) {
    for (const t of subject.topics) {
      ids.push(topicKey(subject.name, t.title));
    }
  }
  return ids;
}

export function groupEntriesBySubject(entries: TopicEntry[]): SubjectTopicGroup[] {
  const groups: SubjectTopicGroup[] = [];
  let n = 0;

  for (const entry of entries) {
    n += 1;
    const numbered = { ...entry, number: n };
    const last = groups[groups.length - 1];
    if (last && last.subject === entry.subject) {
      last.entries.push(numbered);
    } else {
      groups.push({ subject: entry.subject, entries: [numbered] });
    }
  }

  return groups;
}

export function findSubject(catalog: SyllabusCatalog, name: string): SubjectCatalog | undefined {
  return catalog.subjects.find((s) => s.name === name);
}
