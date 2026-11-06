const styles: Record<string, string> = {
  English: "bg-sky-100 text-sky-900 border-sky-200",
  Math: "bg-amber-100 text-amber-900 border-amber-200",
  EVS: "bg-emerald-100 text-emerald-900 border-emerald-200",
  Evs: "bg-emerald-100 text-emerald-900 border-emerald-200",
  "EPL Activities": "bg-violet-100 text-violet-900 border-violet-200",
  Sensorial: "bg-rose-100 text-rose-900 border-rose-200",
  "Speaking Skills": "bg-teal-100 text-teal-900 border-teal-200",
};

export function displaySubject(name: string): string {
  return name === "Evs" ? "EVS" : name;
}

export function SubjectBadge({ name }: { name: string }) {
  const label = displaySubject(name);
  const cls = styles[name] ?? "bg-stone-100 text-stone-800 border-stone-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${cls}`}
    >
      {label}
    </span>
  );
}
