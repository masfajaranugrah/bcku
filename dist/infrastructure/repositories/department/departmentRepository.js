"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const sequelize_1 = require("sequelize");
const departmentModel_1 = require("@infrastructure/database/models/department/departmentModel");
const companyModal_1 = require("@infrastructure/database/models/company/companyModal");
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
class DepartmentRepository {
    /**
     * Buat department baru
     */
    async create(data) {
        const department = await departmentModel_1.DepartmentModel.create(data);
        return department.toJSON();
    }
    /**
     * Cari department berdasarkan ID dan companyId
     */
    async findByIdAndCompany(id, companyId) {
        const department = await departmentModel_1.DepartmentModel.findOne({
            where: { id, companyId },
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
        });
        return department ? department.toJSON() : null;
    }
    /**
     * Cari department berdasarkan nama dan companyId
     */
    async findByNameAndCompany(name, companyId) {
        const department = await departmentModel_1.DepartmentModel.findOne({
            where: { name, companyId },
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
        });
        return department ? department.toJSON() : null;
    }
    /**
     * Ambil semua department
     */
    async findAll() {
        const departments = await departmentModel_1.DepartmentModel.findAll({
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        return departments.map((d) => d.toJSON());
    }
    /**
     * Ambil department berdasarkan ID
     */
    async findById(id) {
        const department = await departmentModel_1.DepartmentModel.findByPk(id, {
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
        });
        return department ? department.toJSON() : null;
    }
    /**
     * Ambil semua department berdasarkan companyId
     */
    async findByCompanyId(companyId) {
        const departments = await departmentModel_1.DepartmentModel.findAll({
            where: { companyId },
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
        });
        return departments.map((d) => d.toJSON());
    }
    /**
     * Update department
     */
    async update(id, data) {
        const department = await departmentModel_1.DepartmentModel.findByPk(id);
        if (!department)
            throw new Error("Department tidak ditemukan");
        await department.update(data);
        return department.toJSON();
    }
    /**
     * Hapus department
     */
    async delete(id) {
        const department = await departmentModel_1.DepartmentModel.findByPk(id);
        if (!department)
            throw new Error("Department tidak ditemukan");
        await department.destroy();
        return true;
    }
    /**
     * Cari department berdasarkan keyword
     */
    async searchByName(keyword, companyId) {
        const where = {
            name: { [sequelize_1.Op.iLike]: `%${keyword}%` },
        };
        if (companyId)
            where.companyId = companyId;
        const departments = await departmentModel_1.DepartmentModel.findAll({
            where,
            include: [
                {
                    model: companyModal_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name"],
                },
            ],
        });
        return departments.map((d) => d.toJSON());
    }
    /**
     * Ambil semua user dalam department
     */
    async findUsers(departmentId) {
        const users = await userModel_1.default.findAll({
            where: { departmentId },
            attributes: ["id", "firstName", "lastName", "email", "roleId"],
        });
        return users.map((u) => u.toJSON());
    }
}
exports.DepartmentRepository = DepartmentRepository;
//# sourceMappingURL=departmentRepository.js.map