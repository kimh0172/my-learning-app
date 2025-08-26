import type { ProgressRepository } from "../../domain/repositories/ProgressRepository";
import type { Store } from "../../domain/entities/Progress";

export class ToggleWeekDone {
  private readonly repo: ProgressRepository;
  constructor(repo: ProgressRepository) {
    this.repo = repo;
  }

  async exec(weekId: number): Promise<Store> {
    const store = await this.repo.load();
    const prev = store[weekId] ?? { done: false, notes: "" };
    const next = { ...prev, done: !prev.done };
    const updated = { ...store, [weekId]: next };
    await this.repo.save(updated);
    return updated;
  }
}
