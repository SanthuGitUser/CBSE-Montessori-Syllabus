import type { SyllabusCatalog } from "../types";
import { displaySubject } from "./SubjectBadge";

const subjectText: Record<string, string> = {
  English: "text-sky-900",
  Math: "text-amber-900",
  EVS: "text-emerald-900",
  "EPL Activities": "text-rose-900",
  Sensorial: "text-violet-900",
  "Speaking Skills": "text-lime-900",
};

const subjectBar: Record<string, string> = {
  English: "from-sky-400 to-blue-600",
  Math: "from-amber-400 to-orange-600",
  EVS: "from-emerald-400 to-teal-600",
  "EPL Activities": "from-rose-400 to-pink-600",
  Sensorial: "from-violet-400 to-purple-600",
  "Speaking Skills": "from-lime-400 to-green-600",
};

type Props = {
  catalog: SyllabusCatalog;
  selected: string;
  onSelect: (subjectName: string) => void;
};

export function SubjectTabs({ catalog, selected, onSelect }: Props) {
  return (
    <div
      className="flex max-w-full touch-pan-x justify-center overflow-x-auto overflow-y-visible overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Subjects"
    >
      <div className="inline-flex shrink-0 gap-0.5 rounded-full bg-stone-100 p-1 ring-1 ring-stone-200/90">
        {catalog.subjects.map((s) => {
          const active = s.name === selected;
          const text = subjectText[s.name] ?? "text-stone-900";
          const bar = subjectBar[s.name] ?? "from-stone-400 to-stone-600";
          const label = displaySubject(s.name);
          return (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(s.name)}
              className={`relative min-w-[4.5rem] shrink-0 rounded-full px-3 py-1.5 text-center transition sm:min-w-[5.25rem] sm:px-4 ${
                active
                  ? "bg-white shadow-md shadow-stone-200/80 ring-1 ring-stone-200/80"
                  : "text-stone-600 hover:bg-white/50 hover:text-stone-800"
              }`}
            >
              {active && (
                <span
                  className={`absolute inset-x-3 top-1 h-0.5 rounded-full bg-gradient-to-r ${bar}`}
                  aria-hidden
                />
              )}
              <span
                className={`block pt-1 text-xs font-semibold leading-tight sm:text-sm ${
                  active ? text : ""
                }`}
              >
                {label}
              </span>
              <span
                className={`mt-0.5 block text-[10px] font-medium tabular-nums leading-none sm:text-[11px] ${
                  active ? "text-stone-500" : "text-stone-400"
                }`}
              >
                {s.topics.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
