import { getTopicGuide, topicKey } from "../lib/parentGuides";
import type { ParentNotes } from "../types";
import { SubjectBadge } from "./SubjectBadge";
import { resolveTopicContent } from "../lib/topicContent/resolve";
import { TopicLearnContent } from "./TopicLearnContent";

const phaseLabel: Record<string, string> = {
  revision: "Revision",
  introduction: "Introduction",
  writing: "Writing",
  general: "Focus",
  "mat activities": "Mat routines",
  "preliminary activities": "Preliminary work",
  "social behaviour activities": "Grace & courtesy",
  "social behavioral activities": "Grace & courtesy",
};

type Props = {
  subject: string;
  phase: string;
  topic: string;
  months?: string[];
  topicNumber?: number | null;
  notes: ParentNotes;
  onToggleDiscussed: (key: string) => void;
  onClose?: () => void;
};

export function TopicDetail({
  subject,
  phase,
  topic,
  months = [],
  topicNumber,
  notes,
  onToggleDiscussed,
  onClose,
}: Props) {
  const guide = getTopicGuide(topic, subject, phase);
  const key = topicKey(subject, topic);
  const discussed = notes[key] ?? false;
  const phaseText = phaseLabel[phase] ?? phase;
  const learnContent = resolveTopicContent(topic, subject);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-stone-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {topicNumber != null && (
                <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold tabular-nums text-stone-600">
                  #{topicNumber}
                </span>
              )}
              <SubjectBadge name={subject} />
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
                {phaseText}
              </span>
              {months.length > 0 && (
                <span className="text-[11px] font-medium text-stone-400">
                  · in {months.length} month{months.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
            <h2 className="font-display text-xl font-semibold leading-snug text-stone-900 sm:text-2xl">
              {topic}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{guide.summary}</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-stone-500 hover:bg-stone-100 lg:hidden"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <TopicLearnContent content={learnContent} />

        <div className="grid gap-4 px-5 py-4 lg:grid-cols-2 lg:gap-5">
        <section className="rounded-xl bg-stone-50/80 p-4 text-sm text-stone-700">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            In the classroom
          </h3>
          <p className="leading-relaxed">{guide.atSchool}</p>
        </section>

        <section className="rounded-xl bg-stone-50/80 p-4 text-sm text-stone-700">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            Try at home
          </h3>
          <ul className="list-inside list-disc space-y-1.5 leading-relaxed">
            {guide.atHome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {guide.watchFor && (
          <section className="rounded-xl bg-amber-50 p-4 text-sm text-amber-950 lg:col-span-2">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
              Parent tip
            </h3>
            <p className="leading-relaxed">{guide.watchFor}</p>
          </section>
        )}

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 lg:col-span-2">
          <input
            type="checkbox"
            checked={discussed}
            onChange={() => onToggleDiscussed(key)}
            className="h-4 w-4 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="text-sm font-medium text-stone-800">
            We talked about this at home
          </span>
        </label>
        </div>
      </div>
    </div>
  );
}
