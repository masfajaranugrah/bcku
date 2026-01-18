import { StandupModel } from "@infrastructure/database/models/standup/standupModel";
import { CreateStandupDTO, UpdateStandupDTO } from "@application/dtos/standupDTO";

export class StandupRepository {
  async create(data: CreateStandupDTO) {
    return await StandupModel.create(data);
  }

  async findAllByCompany(companyId: string) {
    return await StandupModel.findAll({
      where: { companyId },
      order: [["date", "DESC"]],
    });
  }

  async findById(id: string) {
    return await StandupModel.findByPk(id);
  }

  async update(id: string, data: UpdateStandupDTO) {
    const standup = await StandupModel.findByPk(id);
    if (!standup) return null;
    await standup.update(data);
    return standup;
  }

  async delete(id: string) {
    return await StandupModel.destroy({ where: { id } });
  }
}
