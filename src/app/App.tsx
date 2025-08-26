import React from "react";
import "../ui/styles/theme.css";
import { createLearningService } from "../lib/container";
import { PHASES } from "../domain/value-objects/Phase";
import { filterWeeks } from "../application/usecases/FilterWeeks";
import { WeekColumn } from "../ui/components/weeks/WeekColumn";
import { Header } from "../ui/components/header/Header";
import { Card } from "../ui/components/layout/Card";
import { Input } from "../ui/components/controls/Input";
import { Button } from "../ui/components/controls/Button";
import { Download, RefreshCw, Search } from "lucide-react";
import { formatDate, addWeeks } from "../lib/date";
import { download } from "../infrastructure/io/download";

const svc = createLearningService();

export default function App() {
  const [store, setStore] = React.useState<
    Record<number, { done: boolean; notes: string }>
  >({});
  const [phase, setPhase] = React.useState<string | "ALL">("ALL");
  const [hideDone, setHideDone] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [startDate, setStartDate] = React.useState(formatDate(new Date()));
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  React.useEffect(() => {
    svc.loadStore().then(setStore);
  }, []);

  const weeks = svc.getWeeks();
  const filtered = filterWeeks(weeks, { phase, hideDone, q, store });
  const stats = {
    total: weeks.length,
    done: Object.values(store).filter((s) => s?.done).length,
  };
  const pct = Math.round((stats.done / stats.total) * 100);
  const nextId = weeks.find((w) => !store[w.id]?.done)?.id ?? null;
  const nextWeek = nextId ? weeks.find((w) => w.id === nextId) : null;

  const scrollToWeek = (id: number) => {
    const el = document.querySelector<HTMLDivElement>(
      `.col[data-week="${id}"]`
    );
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
  };

  const onToggleDone = async (id: number) => setStore(await svc.toggleDone(id));
  const saveTimers = React.useRef<Record<number, number>>({});
  const onNotesChange = (id: number, notes: string) => {
    // 1) Optimistic update vào state để con trỏ không nhảy
    setStore((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { done: false, notes: "" }), notes },
    }));
    // 2) Debounce lưu xuống repository (LocalStorage) – không await
    if (saveTimers.current[id]) window.clearTimeout(saveTimers.current[id]);
    saveTimers.current[id] = window.setTimeout(() => {
      svc.updateNotes(id, notes).catch(() => {
        /* ignore – ta đã optimistic */
      });
    }, 300);
  };

  const exportMd = () =>
    download(
      svc.exportMarkdown(store, startDate),
      "roadmap-6-thang.md",
      "text/markdown"
    );
  const exportJson = () =>
    download(
      svc.exportJson(store, startDate),
      "roadmap-progress.json",
      "application/json"
    );
  const importJson = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data.store && typeof data.store === "object") setStore(data.store);
        if (data.startDate) setStartDate(data.startDate);
        alert("Import thành công!");
      } catch {
        alert("File không hợp lệ");
      }
    };
    reader.readAsText(file);
  };

  const resetProgress = () => {
    if (confirm("Reset toàn bộ tiến độ?")) setStore({});
  };

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
        onExportMd={exportMd}
        onExportJson={exportJson}
        onImportJson={importJson}
      />

      <main className="container main">
        <section className="grid-3">
          <Card>
            <p className="muted mb-6">Tiến độ</p>
            <div className="progress">
              <div>
                <div className="stat__value">{pct}%</div>
                <p className="muted">
                  {stats.done}/{stats.total} tuần
                </p>
              </div>
              <div className="bar">
                <div className="bar__fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </Card>

          <Card>
            <p className="muted mb-6">Ngày bắt đầu</p>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {nextWeek && (
              <p className="muted mt-8">
                Tuần kế tiếp gợi ý:{" "}
                <span className="semi">Tuần {nextWeek.id}</span> –{" "}
                {nextWeek.title}
                <Button
                  variant="outline"
                  className="nextweek-btn-inline"
                  onClick={() => scrollToWeek(nextWeek.id)}
                  style={{ marginLeft: 8 }}
                >
                  Tới tuần {nextWeek.id}
                </Button>
              </p>
            )}
          </Card>

          <Card>
            <p className="muted mb-6">Bộ lọc & tìm kiếm</p>
            <div className="chips">
              <button
                className={`chip ${phase === "ALL" ? "chip--active" : ""}`}
                onClick={() => setPhase("ALL")}
              >
                Tất cả
              </button>
              {PHASES.map((p) => (
                <button
                  key={p.key}
                  className={`chip ${phase === p.key ? "chip--active" : ""}`}
                  onClick={() => setPhase(p.key)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="filters">
              <div className="search">
                <Search className="icon muted" />
                <Input
                  placeholder="Tìm theo nội dung tuần, mục tiêu, bài tập..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={hideDone}
                  onChange={(e) => setHideDone(e.target.checked)}
                />{" "}
                Ẩn tuần đã xong
              </label>
              <Button
                onClick={resetProgress}
                variant="danger"
                className="btn-inline"
              >
                <RefreshCw className="icon" /> Reset
              </Button>
              <Button onClick={exportJson} className="btn-inline">
                <Download className="icon" /> Backup
              </Button>
            </div>
          </Card>
        </section>

        <section className="columns" style={{ ["--col-w" as any]: "480px" }}>
          {filtered.map((w) => (
            <WeekColumn
              key={w.id}
              week={w}
              plannedDate={addWeeks(new Date(startDate), w.id - 1)}
              progress={store[w.id]}
              onToggleDone={() => onToggleDone(w.id)}
              onNotesChange={(v) => onNotesChange(w.id, v)}
            />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="muted center mt-10">
            Không có tuần nào khớp bộ lọc/tìm kiếm.
          </p>
        )}
        <footer className="footer">
          Made for you 💙 — giữ nhịp 2h/tuần là đủ để về đích.
        </footer>
      </main>
    </div>
  );
}
