import type { Week } from "../../domain/entities/Week";
import curriculum from "../../data/curriculum";

export function getCurriculum(): Week[] {
  return curriculum;
}
