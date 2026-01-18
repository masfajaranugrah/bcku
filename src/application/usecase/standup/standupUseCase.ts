import { StandupRepository } from "@infrastructure/repositories/standup/standupRepository";
import { CreateStandupDTO, UpdateStandupDTO } from "@application/dtos/standupDTO";

export class StandupUseCase {
  private repo: StandupRepository;

  constructor() {
    this.repo = new StandupRepository();
  }

  async createStandup(data: CreateStandupDTO) {
    return await this.repo.create(data);
  }

  async getAllStandups(companyId: string) {
    return await this.repo.findAllByCompany(companyId);
  }

  async getStandupById(id: string) {
    return await this.repo.findById(id);
  }

  async updateStandup(id: string, data: UpdateStandupDTO) {
    return await this.repo.update(id, data);
  }

  async deleteStandup(id: string) {
    return await this.repo.delete(id);
  }
}
