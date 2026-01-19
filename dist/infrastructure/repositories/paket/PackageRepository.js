"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRepository = void 0;
const PackageModel_1 = __importDefault(require("@infrastructure/database/models/paket/PackageModel"));
class PackageRepository {
    async create(data) {
        return PackageModel_1.default.create(data);
    }
    async update(id, data) {
        const pkg = await PackageModel_1.default.findByPk(id);
        if (!pkg)
            return null;
        return pkg.update(data);
    }
    async findAll() {
        const packages = await PackageModel_1.default.findAll();
        return packages.map((pkg) => ({
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            permissions: pkg.features, // pastikan disini features -> permissions
            createdAt: pkg.createdAt,
            updatedAt: pkg.updatedAt,
        }));
    }
    async findById(id) {
        const pkg = await PackageModel_1.default.findByPk(id);
        if (!pkg)
            return null;
        return {
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            permissions: pkg.features,
            createdAt: pkg.createdAt,
            updatedAt: pkg.updatedAt,
        };
    }
    async getById(id) {
        const pkg = await PackageModel_1.default.findByPk(id);
        if (!pkg)
            return null;
        return {
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            permissions: pkg.features,
            createdAt: pkg.createdAt,
            updatedAt: pkg.updatedAt,
        };
    }
    async delete(id) {
        const pkg = await PackageModel_1.default.findByPk(id);
        if (!pkg)
            return null;
        await pkg.destroy();
        return {
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            permissions: pkg.features,
            createdAt: pkg.createdAt,
            updatedAt: pkg.updatedAt,
        };
    }
}
exports.PackageRepository = PackageRepository;
//# sourceMappingURL=PackageRepository.js.map