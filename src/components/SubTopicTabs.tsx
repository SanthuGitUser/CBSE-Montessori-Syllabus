import type { TopicSubgroup } from "../lib/topicSubgroups";

type Props = {
  subgroups: TopicSubgroup[];
  selectedId: string;
  onSelect: (subgroupId: string) => void;
  notesDone: (entries: TopicSubgroup["entries"]) => number;
};

export function SubTopicTabs({ subgroups, selectedId, onSelect, notesDone }: Props) {
  return (
    <div
      className="flex w-full max-w-full touch-pan-x justify-center overflow-x-auto overflow-y-visible overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Topic groups"
    >
      <div className="inline-flex shrink-0 gap-0.5 rounded-full bg-stone-100 p-1 ring-1 ring-stone-200/90">
        {subgroups.map((g) => {
          const active = g.id === selectedId;
          const done = notesDone(g.entries);
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(g.id)}
              className={`min-w-[4.75rem] shrink-0 rounded-full px-3 py-1.5 text-center transition sm:min-w-[5.5rem] sm:px-4 ${
                active
                  ? "bg-white text-stone-900 shadow-md shadow-stone-200/80 ring-1 ring-stone-200/80"
                  : "text-stone-600 hover:bg-white/50 hover:text-stone-800"
              }`}
            >
              <span className="block pt-0.5 text-xs font-semibold leading-tight sm:text-sm">
                {g.label}
              </span>
              <span
                className={`mt-0.5 block text-[10px] font-medium tabular-nums leading-none sm:text-[11px] ${
                  active ? "text-stone-500" : "text-stone-400"
                }`}
              >
                {done}/{g.entries.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
