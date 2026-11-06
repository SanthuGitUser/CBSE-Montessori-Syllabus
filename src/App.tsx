import { useCallback, useMemo, useState } from "react";
import catalogData from "./data/syllabus-by-subject.json";
import { SubjectTabs } from "./components/SubjectTabs";
import { SubjectView } from "./components/SubjectView";
import { findSubject } from "./lib/topics";
import { loadNotes, saveNotes } from "./lib/storage";
import type { ParentNotes, SyllabusCatalog } from "./types";

const catalog = catalogData as SyllabusCatalog;

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState(
    () => catalog.subjects[0]?.name ?? "",
  );
  const [notes, setNotes] = useState<ParentNotes>(() => loadNotes());

  const subjectData = useMemo(
    () => findSubject(catalog, selectedSubject) ?? catalog.subjects[0] ?? null,
    [selectedSubject],
  );

  const onToggleDiscussed = useCallback((key: string) => {
    setNotes((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveNotes(next);
      return next;
    });
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-teal-50/30">
      <header className="shrink-0 border-b border-stone-200/80 bg-white shadow-sm shadow-stone-200/40">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-3 px-3 py-3 sm:px-5 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:gap-6 lg:px-8 lg:py-3.5">
          <div className="flex min-w-0 items-start justify-between gap-3 lg:contents">
            <div className="min-w-0 lg:justify-self-start">
              <p className="font-display text-lg font-bold leading-tight text-stone-900 sm:text-xl">
                CBSE for Parents
              </p>
              <p className="text-xs text-stone-500 sm:text-[13px]">
                Montessori 1 · {catalog.academicYear || "2026–27"} · {catalog.topicCount} topics
              </p>
            </div>
            <span className="inline-flex shrink-0 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-800 lg:hidden">
              Parent guide
            </span>
          </div>

          <div className="min-w-0 justify-self-center lg:w-full lg:max-w-3xl">
            <SubjectTabs
              catalog={catalog}
              selected={selectedSubject}
              onSelect={setSelectedSubject}
            />
          </div>

          <div className="hidden justify-self-end lg:block">
            <span className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">
              Parent guide
            </span>
          </div>
        </div>
      </header>

      {subjectData ? (
        <SubjectView
          catalog={catalog}
          subject={subjectData}
          notes={notes}
          onToggleDiscussed={onToggleDiscussed}
        />
      ) : null}
    </div>
  );
}
