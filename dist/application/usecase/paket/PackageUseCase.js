"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageUseCase = void 0;
const AppError_1 = require("@shared/errors/AppError");
class PackageUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async addPackage(data) {
        if (!data.name || !data.features || !data.price) {
            throw new AppError_1.AppError("Name, features, and price are required", 400);
        }
        return this.repo.create(data);
    }
    async editPackage(id, data) {
        const pkg = await this.repo.update(id, data);
        if (!pkg)
            throw new AppError_1.AppError("Package not found", 404);
        return pkg;
    }
    async getById(id) {
        const pkg = await this.repo.getById(id);
        if (!pkg)
            throw new AppError_1.AppError("Package not found", 404);
        return pkg;
    }
    async listPackages() {
        return this.repo.findAll();
    }
    async getPackage(id) {
        const pkg = await this.repo.findById(id);
        if (!pkg)
            throw new AppError_1.AppError("Package not found", 404);
        return pkg;
    }
    async deletePackage(id) {
        const pkg = await this.repo.delete(id);
        if (!pkg)
            throw new AppError_1.AppError("Package not found", 404);
        return pkg;
    }
}
exports.PackageUseCase = PackageUseCase;
//# sourceMappingURL=PackageUseCase.js.map