import SprintModel from "@infrastructure/database/models/sprint/sprintModel";
import { CreateSprintDTO, UpdateSprintDTO } from "@application/dtos/sprintDTO";

export class SprintRepository {
  async create(data: CreateSprintDTO) {
    return await SprintModel.create(data as any);
  }

  async findAllByCompany(companyId: string) {
    return await SprintModel.findAll({ where: { companyId } });
  }

  async findById(id: string) {
    return await SprintModel.findByPk(id);
  }

  async update(id: string, data: UpdateSprintDTO) {
    const sprint = await SprintModel.findByPk(id);
    if (!sprint) return null;
    await sprint.update(data);
    return sprint;
  }

  async delete(id: string) {
    return await SprintModel.destroy({ where: { id } });
  }
}
