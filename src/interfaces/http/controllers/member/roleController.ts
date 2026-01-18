import { Request, Response, NextFunction } from "express";
import { RoleUseCase } from "@application/usecase/member/roleUseCase";

const roleUseCase = new RoleUseCase();

export class RoleController {
  // CREATE ROLE
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.params.companyId;
      const { name, description } = req.body;

      if (!companyId) return res.status(400).json({ message: "CompanyId wajib ada" });
      if (!name) return res.status(400).json({ message: "Nama role wajib diisi" });

      const role = await roleUseCase.createRole(companyId, { name, description });
      return res.status(201).json({ message: "Role berhasil dibuat", data: role });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL ROLES
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.params.companyId;
      if (!companyId) return res.status(400).json({ message: "CompanyId wajib ada" });

      const roles = await roleUseCase.getRoles(companyId);
      return res.status(200).json({ data: roles });
    } catch (error) {
      next(error);
    }
  }

  // GET ROLE BY ID
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, companyId } = req.params;

      if (!id) return res.status(400).json({ message: "ID role wajib ada" });
      if (!companyId) return res.status(400).json({ message: "CompanyId wajib ada" });

      const role = await roleUseCase.getRoleById(id, companyId);
      if (!role) return res.status(404).json({ message: "Role tidak ditemukan" });

      return res.status(200).json({ data: role });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE ROLE
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, companyId } = req.params;
      const { name, description } = req.body;

      if (!id) return res.status(400).json({ message: "ID role wajib ada" });
      if (!companyId) return res.status(400).json({ message: "CompanyId wajib ada" });
      if (!name || !description) return res.status(400).json({ message: "Nama dan deskripsi wajib diisi" });

      const updatedRole = await roleUseCase.updateRole(id, companyId, { name, description });
      if (!updatedRole) return res.status(404).json({ message: "Role tidak ditemukan" });

      return res.status(200).json({ message: "Role berhasil diperbarui", data: updatedRole });
    } catch (error) {
      next(error);
    }
  }

  // DELETE ROLE
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, companyId } = req.params;

      if (!id) return res.status(400).json({ message: "ID role wajib ada" });
      if (!companyId) return res.status(400).json({ message: "CompanyId wajib ada" });

      await roleUseCase.deleteRole(id, companyId);
      return res.status(200).json({ message: "Role berhasil dihapus" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
