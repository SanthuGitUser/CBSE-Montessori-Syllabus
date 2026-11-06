import { useEffect, useMemo, useState } from "react";
import type { ParentNotes, SubjectCatalog, SyllabusCatalog } from "../types";
import { countDiscussed } from "../lib/storage";
import { buildTopicSubgroups } from "../lib/topicSubgroups";
import { allCatalogTopicIds, flattenSubjectCatalog } from "../lib/topics";
import { displaySubject } from "./SubjectBadge";
import { SubTopicTabs } from "./SubTopicTabs";
import { TopicDetail } from "./TopicDetail";
import { TopicSidebar } from "./TopicSidebar";

type Props = {
  catalog: SyllabusCatalog;
  subject: SubjectCatalog;
  notes: ParentNotes;
  onToggleDiscussed: (key: string) => void;
};

export function SubjectView({
  catalog,
  subject,
  notes,
  onToggleDiscussed,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [subgroupId, setSubgroupId] = useState<string>("");

  const entries = useMemo(
    () => flattenSubjectCatalog(subject),
    [subject],
  );

  const subgroups = useMemo(
    () => buildTopicSubgroups(subject.name, entries),
    [subject.name, entries],
  );

  const activeSubgroup = useMemo(() => {
    const found = subgroups.find((g) => g.id === subgroupId);
    return found ?? subgroups[0] ?? null;
  }, [subgroups, subgroupId]);

  const filteredEntries = useMemo(() => {
    const list = activeSubgroup?.entries ?? [];
    return list.map((entry, i) => ({ ...entry, number: i + 1 }));
  }, [activeSubgroup]);

  const selectedNumber = useMemo(() => {
    if (!selectedId) return null;
    const found = filteredEntries.find((e) => e.id === selectedId);
    if (!found) return null;
    return found.number;
  }, [filteredEntries, selectedId]);

  const allIds = useMemo(() => allCatalogTopicIds(catalog), [catalog]);
  const doneSubject = entries.filter((e) => notes[e.id]).length;
  const doneAll = countDiscussed(notes, allIds);

  const selected =
    filteredEntries.find((e) => e.id === selectedId) ?? filteredEntries[0] ?? null;

  useEffect(() => {
    if (subgroups.length && !subgroups.some((g) => g.id === subgroupId)) {
      setSubgroupId(subgroups[0].id);
    }
  }, [subgroups, subgroupId]);

  useEffect(() => {
    setSubgroupId(subgroups[0]?.id ?? "");
    setSelectedId(null);
    setMobileDetailOpen(false);
  }, [subject.name, subgroups]);

  useEffect(() => {
    if (!filteredEntries.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filteredEntries.some((e) => e.id === selectedId)) {
      setSelectedId(filteredEntries[0].id);
    }
  }, [filteredEntries, selectedId]);

  function selectTopic(id: string) {
    setSelectedId(id);
    setMobileDetailOpen(true);
  }

  const notesDoneInGroup = (groupEntries: typeof entries) =>
    groupEntries.filter((e) => notes[e.id]).length;

  return (
    <div className="mx-auto flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-3 sm:px-5 lg:max-w-[1600px] lg:px-8">
      <header className="mb-3 shrink-0">
        <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:gap-5">
          <div className="min-w-0 lg:justify-self-start">
            <h1 className="font-display text-2xl font-bold leading-tight text-stone-900 sm:text-3xl">
              {displaySubject(subject.name)}
            </h1>
            <p className="mt-0.5 text-sm text-stone-600">
              {entries.length} unique topics · merged from {catalog.sourceMonths} monthly portions
            </p>
          </div>

          {subgroups.length > 1 ? (
            <div className="min-w-0 justify-self-center lg:max-w-3xl lg:justify-self-stretch">
              <SubTopicTabs
                subgroups={subgroups}
                selectedId={activeSubgroup?.id ?? subgroups[0].id}
                onSelect={setSubgroupId}
                notesDone={notesDoneInGroup}
              />
            </div>
          ) : (
            <div className="hidden lg:block" aria-hidden />
          )}

          <div className="flex justify-start lg:justify-self-end">
            <div className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-600 ring-1 ring-stone-200 sm:px-4">
              Home check-ins:{" "}
              <span className="font-semibold text-stone-900">
                {doneSubject}/{entries.length}
              </span>
              <span className="text-stone-400">
                {" "}
                · all subjects {doneAll}/{catalog.topicCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)] gap-3 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] lg:gap-5">
        <aside
          className={`flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm ${
            mobileDetailOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          <TopicSidebar
            entries={filteredEntries}
            selectedId={selected?.id ?? null}
            notes={notes}
            onSelect={selectTopic}
          />
        </aside>

        <main
          className={`flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm ${
            mobileDetailOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          {selected ? (
            <TopicDetail
              subject={selected.subject}
              phase={selected.phase}
              topic={selected.topic}
              months={selected.months}
              topicNumber={selectedNumber}
              notes={notes}
              onToggleDiscussed={onToggleDiscussed}
              onClose={() => setMobileDetailOpen(false)}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-stone-500">
              No topics in this group.
            </div>
          )}
        </main>
      </div>

      {!mobileDetailOpen && selected && (
        <div className="mt-2 shrink-0 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileDetailOpen(true)}
            className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white"
          >
            View guide: {selected.topic.slice(0, 48)}
            {selected.topic.length > 48 ? "…" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
