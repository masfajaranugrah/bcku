"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandupUseCase = void 0;
const standupRepository_1 = require("@infrastructure/repositories/standup/standupRepository");
class StandupUseCase {
    constructor() {
        this.repo = new standupRepository_1.StandupRepository();
    }
    async createStandup(data) {
        return await this.repo.create(data);
    }
    async getAllStandups(companyId) {
        return await this.repo.findAllByCompany(companyId);
    }
    async getStandupById(id) {
        return await this.repo.findById(id);
    }
    async updateStandup(id, data) {
        return await this.repo.update(id, data);
    }
    async deleteStandup(id) {
        return await this.repo.delete(id);
    }
}
exports.StandupUseCase = StandupUseCase;
//# sourceMappingURL=standupUseCase.js.map