"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageController = void 0;
const PackageUseCase_1 = require("@application/usecase/paket/PackageUseCase");
const PackageRepository_1 = require("@infrastructure/repositories/paket/PackageRepository");
const repo = new PackageRepository_1.PackageRepository();
const useCase = new PackageUseCase_1.PackageUseCase(repo);
class PackageController {
    async addPackage(req, res, next) {
        try {
            const data = req.body;
            const pkg = await useCase.addPackage(data);
            return res.status(201).json({
                status: "success",
                message: "Package created",
                data: {
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price,
                    permissions: pkg.features, // tampilkan permissions
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async editPackage(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const pkg = await useCase.editPackage(id, data);
            return res.status(200).json({
                status: "success",
                message: "Package updated",
                data: {
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price,
                    permissions: pkg.features,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async listPackages(req, res, next) {
        try {
            const packages = await useCase.listPackages();
            return res.status(200).json({
                status: "success",
                data: packages,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getPackage(req, res, next) {
        try {
            const { id } = req.params;
            const pkg = await useCase.getPackage(id);
            return res.status(200).json({
                status: "success",
                data: pkg,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const pkg = await useCase.getById(id);
            return res.status(200).json({
                status: "success",
                data: {
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price,
                    permissions: pkg.permissions,
                    createdAt: pkg.createdAt,
                    updatedAt: pkg.updatedAt,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async deletePackage(req, res, next) {
        try {
            const { id } = req.params;
            await useCase.deletePackage(id);
            return res.status(200).json({
                status: "success",
                message: "Package deleted successfully",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PackageController = PackageController;
//# sourceMappingURL=PackageController.js.map