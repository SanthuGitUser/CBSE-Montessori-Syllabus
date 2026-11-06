import type { NumberedTopicEntry } from "../lib/topics";
import type { ParentNotes } from "../types";

type Props = {
  entries: NumberedTopicEntry[];
  selectedId: string | null;
  notes: ParentNotes;
  onSelect: (id: string) => void;
};

function TopicRow({
  entry,
  isActive,
  discussed,
  onSelect,
}: {
  entry: NumberedTopicEntry;
  isActive: boolean;
  discussed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-2 py-2.5 pl-3 pr-3 text-left text-sm transition hover:bg-teal-50/60 ${
        isActive ? "bg-teal-50 ring-1 ring-inset ring-teal-200" : ""
      }`}
    >
      <span className="flex w-7 shrink-0 tabular-nums text-xs font-semibold text-stone-400">
        {entry.number}.
      </span>
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
          discussed
            ? "border-teal-500 bg-teal-500 text-white"
            : "border-stone-300 bg-white text-transparent"
        }`}
        aria-hidden
      >
        ✓
      </span>
      <span className="min-w-0 flex-1 leading-snug text-stone-800">{entry.topic}</span>
    </button>
  );
}

export function TopicSidebar({ entries, selectedId, notes, onSelect }: Props) {
  const done = entries.filter((e) => notes[e.id]).length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-stone-100 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          {entries.length} topics
        </span>
        <span className="rounded-full bg-stone-50 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-stone-500 ring-1 ring-stone-200">
          {done}/{entries.length} done
        </span>
      </div>

      <ul className="min-h-0 flex-1 divide-y divide-stone-50 overflow-y-auto overscroll-contain pb-1">
        {entries.map((entry) => (
          <li key={entry.id}>
            <TopicRow
              entry={entry}
              isActive={selectedId === entry.id}
              discussed={notes[entry.id] ?? false}
              onSelect={() => onSelect(entry.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
