"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintRepository = void 0;
const sprintModel_1 = __importDefault(require("@infrastructure/database/models/sprint/sprintModel"));
class SprintRepository {
    async create(data) {
        return await sprintModel_1.default.create(data);
    }
    async findAllByCompany(companyId) {
        return await sprintModel_1.default.findAll({ where: { companyId } });
    }
    async findById(id) {
        return await sprintModel_1.default.findByPk(id);
    }
    async update(id, data) {
        const sprint = await sprintModel_1.default.findByPk(id);
        if (!sprint)
            return null;
        await sprint.update(data);
        return sprint;
    }
    async delete(id) {
        return await sprintModel_1.default.destroy({ where: { id } });
    }
}
exports.SprintRepository = SprintRepository;
//# sourceMappingURL=sprintRepository.js.map