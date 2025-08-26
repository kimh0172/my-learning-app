import type { Store } from "../entities/Progress";

export interface ProgressRepository {
  load(): Promise<Store>;
  save(store: Store): Promise<void>;
}
