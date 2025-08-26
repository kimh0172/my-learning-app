import type { Week } from "../../domain/entities/Week";

export function filterWeeks(
  weeks: Week[],
  opts: { phase?: string | "ALL"; hideDone?: boolean; q?: string; store?: Record<number, { done: boolean }> }
): Week[] {
  const { phase = "ALL", hideDone = false, q = "", store = {} } = opts;
  return weeks.filter((w) => {
    if (phase !== "ALL" && w.phase !== phase) return false;
    if (hideDone && store[w.id]?.done) return false;
    if (q.trim()) {
      const hay = (w.title + " " + w.goals.join(" ") + " " + w.tasks.join(" ")).toLowerCase();
      if (!hay.includes(q.toLowerCase().trim())) return false;
    }
    return true;
  });
}
