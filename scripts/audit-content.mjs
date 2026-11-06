// Prints how every syllabus topic resolves, to spot topics without real pictures.
import { buildSync } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const dir = mkdtempSync(join(tmpdir(), "audit-"));
const out = join(dir, "resolve.mjs");
buildSync({
  entryPoints: ["src/lib/topicContent/resolve.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: out,
  logLevel: "error",
});
const { resolveTopicContent } = await import(pathToFileURL(out).href);
const data = JSON.parse(readFileSync("src/data/syllabus-by-subject.json", "utf8"));

const rows = [];
for (const subject of data.subjects) {
  for (const t of subject.topics) {
    const topic = t.title;
    const c = resolveTopicContent(topic, subject.name);
        const cards = c.itemCards.map((i) => (i.photo ? "P:" : "") + i.name);
        const missing = c.itemCards.filter((i) => !i.photo).length;
        rows.push({
          subject: subject.name,
          topic,
          photo: c.photo?.src ?? "",
          missing,
          cards: cards.join(", "),
        });
  }
}
writeFileSync(process.argv[2] ?? "scripts/.audit.json", JSON.stringify(rows, null, 2));
for (const r of rows) {
  if (r.photo) continue;
  console.log(`${r.subject.padEnd(16)} | ${r.topic.slice(0, 55).padEnd(55)} | ${r.missing} | ${r.cards.slice(0, 110)}`);
}
