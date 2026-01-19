"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintUseCase = void 0;
const sprintRepository_1 = require("@infrastructure/repositories/sprint/sprintRepository");
class SprintUseCase {
    constructor() {
        this.repository = new sprintRepository_1.SprintRepository();
    }
    createSprint(data) {
        return this.repository.create(data);
    }
    getAllSprints(companyId) {
        return this.repository.findAllByCompany(companyId);
    }
    getSprintById(id) {
        return this.repository.findById(id);
    }
    updateSprint(id, data) {
        return this.repository.update(id, data);
    }
    deleteSprint(id) {
        return this.repository.delete(id);
    }
}
exports.SprintUseCase = SprintUseCase;
//# sourceMappingURL=sprintUseCase.js.map