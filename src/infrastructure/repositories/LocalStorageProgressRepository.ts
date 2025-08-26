import type { ProgressRepository } from "../../domain/repositories/ProgressRepository";
import type { Store } from "../../domain/entities/Progress";

const KEY = "kanban-lite-learning-progress";

export class LocalStorageProgressRepository implements ProgressRepository {
  async load(): Promise<Store> {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  }
  async save(store: Store): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(store));
  }
}
