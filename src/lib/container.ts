import { LocalStorageProgressRepository } from "../infrastructure/repositories/LocalStorageProgressRepository";
import { LearningService } from "../application/services/LearningService";

export function createLearningService() {
  const repo = new LocalStorageProgressRepository();
  const service = new LearningService(repo);
  return service;
}
