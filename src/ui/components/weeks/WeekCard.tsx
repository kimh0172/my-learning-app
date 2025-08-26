import React from "react";
import {
  Calendar,
  CheckCircle2,
  BookOpen,
  Target,
  Wrench,
  NotebookPen,
} from "lucide-react";
import type { Week } from "../../../domain/entities/Week";
import type { Progress } from "../../../domain/entities/Progress";
import { Card } from "../layout/Card";
import { Button } from "../controls/Button";
import { Textarea } from "../controls/Textarea";

export const WeekCard: React.FC<{
  week: Week;
  plannedDate: Date;
  progress?: Progress;
  onToggleDone: () => void;
  onNotesChange: (v: string) => void;
}> = ({ week, plannedDate, progress, onToggleDone, onNotesChange }) => {
  const Section: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="section">
      <div className="section__title">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  return (
    <Card className="weekcard">
      <div className="week__header">
        <div>
          <h3 className="h3">
            Tuần {week.id}: {week.title}
          </h3>
          <p className="muted flex-row">
            <Calendar className="icon" /> {fmt(plannedDate)} • {week.phase} • ⏱
            2h
          </p>
        </div>
        <Button
          onClick={onToggleDone}
          variant={progress?.done ? "primary" : "outline"}
          className="btn-inline"
        >
          <CheckCircle2 className="icon" />{" "}
          {progress?.done ? "Hoàn thành" : "Đánh dấu xong"}
        </Button>
      </div>

      {week.goals?.length > 0 && (
        <Section
          icon={<Target className="icon icon--primary" />}
          title="Mục tiêu"
        >
          <ul className="list">
            {week.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </Section>
      )}

      {week.tasks?.length > 0 && (
        <Section
          icon={<Wrench className="icon icon--primary" />}
          title="Bài tập"
        >
          <ul className="list">
            {week.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {week.resources?.length > 0 && (
        <Section
          icon={<BookOpen className="icon icon--primary" />}
          title="Tài liệu"
        >
          <ul className="list links">
            {week.resources.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section
        icon={<NotebookPen className="icon icon--primary" />}
        title="Ghi chú"
      >
        <Textarea
          placeholder="Ghi lại điều học được / vướng mắc..."
          defaultValue={progress?.notes ?? ""}
          onBlur={(e) => onNotesChange(e.currentTarget.value)}
        />
      </Section>
    </Card>
  );
};
