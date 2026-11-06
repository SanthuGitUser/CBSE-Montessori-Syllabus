import type { ParentNotes } from "../types";
import { topicKey } from "./parentGuides";

const KEY = "m1-parent-notes-v2";
const LEGACY_KEY = "m1-parent-notes-v1";

function migrateLegacyNotes(raw: ParentNotes): ParentNotes {
  const next: ParentNotes = {};
  for (const [k, checked] of Object.entries(raw)) {
    if (!checked) continue;
    const parts = k.split("|");
    if (parts.length >= 3) {
      const subject = parts[1];
      const topic = parts.slice(2).join("|");
      next[topicKey(subject, topic)] = true;
      continue;
    }
    if (parts.length === 2) {
      next[k] = true;
    }
  }
  return next;
}

export function loadNotes(): ParentNotes {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as ParentNotes;

    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const migrated = migrateLegacyNotes(JSON.parse(legacy) as ParentNotes);
      saveNotes(migrated);
      return migrated;
    }
    return {};
  } catch {
    return {};
  }
}

export function saveNotes(notes: ParentNotes): void {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

/** Count check-ins that match known topic ids (ignores stale keys). */
export function countDiscussed(notes: ParentNotes, validIds: string[]): number {
  const set = new Set(validIds);
  return Object.entries(notes).filter(([id, v]) => v && set.has(id)).length;
}
