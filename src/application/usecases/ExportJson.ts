import type { Store } from "../../domain/entities/Progress";
export function buildJson(store: Store, startDate: string) {
  return JSON.stringify({ store, startDate }, null, 2);
}
