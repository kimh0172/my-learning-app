import React from "react";
import type { Week } from "../../../domain/entities/Week";
import type { Progress } from "../../../domain/entities/Progress";
import { WeekCard } from "./WeekCard";

export const WeekColumn: React.FC<{
  week: Week;
  plannedDate: Date;
  progress?: Progress;
  onToggleDone: () => void;
  onNotesChange: (v: string) => void;
}> = ({ week, plannedDate, progress, onToggleDone, onNotesChange }) => {
  return (
    <div className="col" data-week={week.id}>
      <WeekCard
        week={week}
        plannedDate={plannedDate}
        progress={progress}
        onToggleDone={onToggleDone}
        onNotesChange={onNotesChange}
      />
    </div>
  );
};
