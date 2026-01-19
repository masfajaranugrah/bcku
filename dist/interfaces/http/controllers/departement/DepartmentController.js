"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const departmentRepository_1 = require("@infrastructure/repositories/department/departmentRepository");
const repository = new departmentRepository_1.DepartmentRepository();
class DepartmentController {
    /**
     * Create new department
     */
    async create(req, res) {
        try {
            const { name, companyId, description } = req.body;
            if (!name || !companyId) {
                return res.status(400).json({
                    status: "error",
                    message: "name dan companyId wajib diisi",
                });
            }
            const result = await repository.create({ name, companyId, description });
            return res.status(201).json({
                status: "success",
                data: result,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Get all departments
     */
    async findAll(req, res) {
        try {
            const departments = await repository.findAll();
            return res.status(200).json({
                status: "success",
                data: departments,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Get department by ID
     */
    async findById(req, res) {
        try {
            const { id } = req.params;
            const department = await repository.findById(id);
            if (!department) {
                return res.status(404).json({
                    status: "error",
                    message: "Department tidak ditemukan",
                });
            }
            return res.status(200).json({
                status: "success",
                data: department,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Get departments by companyId
     */
    async findByCompany(req, res) {
        try {
            const { companyId } = req.params;
            const departments = await repository.findByCompanyId(companyId);
            return res.status(200).json({
                status: "success",
                data: departments,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Update department
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updated = await repository.update(id, { name, description });
            return res.status(200).json({
                status: "success",
                data: updated,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Delete department
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            await repository.delete(id);
            return res.status(200).json({
                status: "success",
                message: "Department berhasil dihapus",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Search department by name
     */
    async search(req, res) {
        try {
            const { keyword, companyId } = req.query;
            const results = await repository.searchByName(String(keyword || ""), companyId ? String(companyId) : undefined);
            return res.status(200).json({
                status: "success",
                data: results,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    /**
     * Get all users in department
     */
    async findUsers(req, res) {
        try {
            const { id } = req.params;
            const users = await repository.findUsers(id);
            return res.status(200).json({
                status: "success",
                data: users,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map