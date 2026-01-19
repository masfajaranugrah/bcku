"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandupRepository = void 0;
const standupModel_1 = require("@infrastructure/database/models/standup/standupModel");
class StandupRepository {
    async create(data) {
        return await standupModel_1.StandupModel.create(data);
    }
    async findAllByCompany(companyId) {
        return await standupModel_1.StandupModel.findAll({
            where: { companyId },
            order: [["date", "DESC"]],
        });
    }
    async findById(id) {
        return await standupModel_1.StandupModel.findByPk(id);
    }
    async update(id, data) {
        const standup = await standupModel_1.StandupModel.findByPk(id);
        if (!standup)
            return null;
        await standup.update(data);
        return standup;
    }
    async delete(id) {
        return await standupModel_1.StandupModel.destroy({ where: { id } });
    }
}
exports.StandupRepository = StandupRepository;
//# sourceMappingURL=standupRepository.js.map