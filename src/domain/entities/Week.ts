import type { Resource } from "./Resource";

export type Week = {
  id: number;
  phase: string; // "Phase 0" .. "Phase 5"
  title: string;
  goals: string[];
  resources: Resource[];
  tasks: string[];
};
