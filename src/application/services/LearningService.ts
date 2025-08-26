import type { ProgressRepository } from "../../domain/repositories/ProgressRepository";
import { ToggleWeekDone } from "../usecases/ToggleWeekDone";
import { UpdateWeekNotes } from "../usecases/UpdateWeekNotes";
import { getCurriculum } from "../usecases/GetCurriculum";
import { buildMarkdown } from "../usecases/ExportMarkdown";
import { buildJson } from "../usecases/ExportJson";

export class LearningService {
  private readonly repo: ProgressRepository;
  private readonly toggle: ToggleWeekDone;
  private readonly update: UpdateWeekNotes;

  constructor(repo: ProgressRepository) {
    this.repo = repo;
    this.toggle = new ToggleWeekDone(this.repo);
    this.update = new UpdateWeekNotes(this.repo);
  }

  async loadStore() { return this.repo.load(); }
  getWeeks() { return getCurriculum(); }
  async toggleDone(weekId: number) { return this.toggle.exec(weekId); }
  async updateNotes(weekId: number, notes: string) { return this.update.exec(weekId, notes); }
  exportMarkdown(store: any, startDate: string) { return buildMarkdown(this.getWeeks(), store, startDate); }
  exportJson(store: any, startDate: string) { return buildJson(store, startDate); }
}
