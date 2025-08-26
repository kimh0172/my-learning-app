export const PHASES = [
  { key: "Phase 0", label: "Lập trình cơ bản" },
  { key: "Phase 1", label: "Web cơ bản" },
  { key: "Phase 2", label: "React/Next.js" },
  { key: "Phase 3", label: "Backend & DB" },
  { key: "Phase 4", label: "Fullstack Integration" },
  { key: "Phase 5", label: "Deploy" },
] as const;
export type PhaseKey = typeof PHASES[number]["key"];
