export function normalizeTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/[.:]+$/g, "")
    .trim();
}
