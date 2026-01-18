import { SprintRepository } from "@infrastructure/repositories/sprint/sprintRepository";
import { CreateSprintDTO, UpdateSprintDTO } from "@application/dtos/sprintDTO";

export class SprintUseCase {
  private repository: SprintRepository;

  constructor() {
    this.repository = new SprintRepository();
  }

  createSprint(data: CreateSprintDTO) {
    return this.repository.create(data);
  }

  getAllSprints(companyId: string) {
    return this.repository.findAllByCompany(companyId);
  }

  getSprintById(id: string) {
    return this.repository.findById(id);
  }

  updateSprint(id: string, data: UpdateSprintDTO) {
    return this.repository.update(id, data);
  }

  deleteSprint(id: string) {
    return this.repository.delete(id);
  }
}
