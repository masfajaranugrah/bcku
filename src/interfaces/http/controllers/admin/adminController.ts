import { AdminRespository } from './../../../../infrastructure/repositories/admin/adminRespository';
import { AdminUseCase } from "@application/usecase/admin/adminUseCase";
import path from 'path';
import fs from 'fs';

const asminRespository = new AdminRespository();
const adminUseCase = new AdminUseCase(asminRespository);

import { Request, Response } from 'express';

export class adminController {
    static async getFile(req: Request, res: Response) {
    try {
      const { folder, userId, filename } = req.params;

      if (!folder || !userId || !filename) {
        return res.status(400).json({ message: "Parameter tidak lengkap" });
      }
      // validasi folder supaya cuma boleh "profile" atau "absensi"
      if (!["profile", "absensi"].includes(folder)) {
        return res.status(400).json({ message: "Folder tidak valid" });
      }

      const filePath = path.join(__dirname, `../../../uploads/${folder}/${userId}/${filename}`);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File tidak ditemukan" });
      }

      return res.sendFile(filePath);
    } catch (err) {
      return res.status(500).json({ message: "Terjadi kesalahan", error: err });
    }
  }

static async getAllMembers(req: any, res: any, next: any) {
  try {
    // ambil companyId dari URL atau fallback dari JWT
    const companyId = req.params.companyId || req.user?.companyId;
 
 
if (!companyId) {
  return res.status(400).json({ message: "Company ID tidak ditemukan" });
}

    if (!companyId) {
      return res.status(400).json({ message: "Company ID tidak ditemukan" });
    }

    // panggil use case
    const result = await adminUseCase.getAllMembers(companyId);

    return res.status(200).json({
       data: result.data,
    });
  } catch (error) {
    next(error);
  }
}




static async getMemberById(req: any, res: any, next: any) {
    try {
        const { id, companyId } = req.params;
        const member = await adminUseCase.getMemberById(id, companyId);
        return res.status(200).json(member);
    } catch (error) {
        next(error);
    }
}

  static async updateMember(req: any, res: any, next: any) {
    try {
        const { id, companyId } = req.params;
        const updated = await adminUseCase.updateMember(id, companyId, req.body);
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

static async deleteMember(req: any, res: any, next: any) {
    try {
        const { id, companyId } = req.params;
        const deleted = await adminUseCase.deleteMember(id, companyId);
        return res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
}
}
