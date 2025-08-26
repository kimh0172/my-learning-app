import type { Week } from "../../domain/entities/Week";
import type { Store } from "../../domain/entities/Progress";
import { formatDate, addWeeks } from "../../lib/date";

export function buildMarkdown(weeks: Week[], store: Store, startDate: string): string {
  const lines: string[] = [];
  lines.push(`# Lộ trình 6 tháng – 2h/tuần`);
  lines.push(`Bắt đầu: ${startDate}`);
  lines.push("");
  for (const w of weeks) {
    const planDate = formatDate(addWeeks(new Date(startDate), w.id - 1));
    const prog = store[w.id] ?? { done: false, notes: "" };
    lines.push(`## Tuần ${w.id} – ${w.title} (${w.phase})`);
    lines.push(`- 📅 Dự kiến: ${planDate}`);
    lines.push(`- ✅ Trạng thái: ${prog.done ? "Hoàn thành" : "Chưa"}`);
    if (w.goals.length) {
      lines.push(`- 🎯 Mục tiêu:`);
      for (const g of w.goals) lines.push(`  - ${g}`);
    }
    if (w.tasks.length) {
      lines.push(`- 🛠 Bài tập:`);
      for (const t of w.tasks) lines.push(`  - ${t}`);
    }
    if (w.resources.length) {
      lines.push(`- 📚 Tài liệu:`);
      for (const r of w.resources) lines.push(`  - ${r.title} – ${r.url}`);
    }
    if (prog.notes) lines.push(`- 📝 Notes: ${prog.notes}`);
    lines.push("");
  }
  return lines.join("\n");
}
