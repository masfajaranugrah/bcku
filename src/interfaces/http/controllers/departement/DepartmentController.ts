import { Request, Response } from "express";
import { DepartmentRepository } from "@infrastructure/repositories/department/departmentRepository";

const repository = new DepartmentRepository();

export class DepartmentController {
  /**
   * Create new department
   */
  async create(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Get all departments
   */
  async findAll(req: Request, res: Response) {
    try {
      const departments = await repository.findAll();
      return res.status(200).json({
        status: "success",
        data: departments,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Get department by ID
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const department = await repository.findById(id as any);
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
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Get departments by companyId
   */
  async findByCompany(req: Request, res: Response) {
    try {
      const { companyId } = req.params;

      const departments = await repository.findByCompanyId(companyId as any);

      return res.status(200).json({
        status: "success",
        data: departments,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Update department
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updated = await repository.update(id as any, { name, description });

      return res.status(200).json({
        status: "success",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Delete department
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await repository.delete(id as any);

      return res.status(200).json({
        status: "success",
        message: "Department berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Search department by name
   */
  async search(req: Request, res: Response) {
    try {
      const { keyword, companyId } = req.query;

      const results = await repository.searchByName(
        String(keyword || ""),
        companyId ? String(companyId) : undefined
      );

      return res.status(200).json({
        status: "success",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  /**
   * Get all users in department
   */
  async findUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const users = await repository.findUsers(id as any);

      return res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }
}

