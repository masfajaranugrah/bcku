import { Op } from "sequelize";
import { DepartmentModel } from "@infrastructure/database/models/department/departmentModel";
import { CompanyModel } from "@infrastructure/database/models/company/companyModal";
import UserModel from "@infrastructure/database/models/auth/userModel";

export class DepartmentRepository {
  /**
   * Buat department baru
   */
  async create(data: { name: string; companyId: string; description?: string }) {
    const department = await DepartmentModel.create(data);
    return department.toJSON();
  }

  /**
   * Cari department berdasarkan ID dan companyId
   */
  async findByIdAndCompany(id: string, companyId: string) {
    const department = await DepartmentModel.findOne({
      where: { id, companyId },
      include: [
        {
          model: CompanyModel,
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
  async findByNameAndCompany(name: string, companyId: string) {
    const department = await DepartmentModel.findOne({
      where: { name, companyId },
      include: [
        {
          model: CompanyModel,
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
    const departments = await DepartmentModel.findAll({
      include: [
        {
          model: CompanyModel,
          as: "company",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return departments.map((d: any) => d.toJSON());
  }

  /**
   * Ambil department berdasarkan ID
   */
  async findById(id: string) {
    const department = await DepartmentModel.findByPk(id, {
      include: [
        {
          model: CompanyModel,
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
  async findByCompanyId(companyId: string) {
    const departments = await DepartmentModel.findAll({
      where: { companyId },
      include: [
        {
          model: CompanyModel,
          as: "company",
          attributes: ["id", "name"],
        },
      ],
    });
    return departments.map((d : any) => d.toJSON());
  }

  /**
   * Update department
   */
  async update(
    id: string,
    data: Partial<{ name: string; description?: string }>
  ) {
    const department = await DepartmentModel.findByPk(id);
    if (!department) throw new Error("Department tidak ditemukan");

    await department.update(data);
    return department.toJSON();
  }

  /**
   * Hapus department
   */
  async delete(id: string) {
    const department = await DepartmentModel.findByPk(id);
    if (!department) throw new Error("Department tidak ditemukan");

    await department.destroy();
    return true;
  }

  /**
   * Cari department berdasarkan keyword
   */
  async searchByName(keyword: string, companyId?: string) {
    const where: any = {
      name: { [Op.iLike]: `%${keyword}%` },
    };
    if (companyId) where.companyId = companyId;

    const departments = await DepartmentModel.findAll({
      where,
      include: [
        {
          model: CompanyModel,
          as: "company",
          attributes: ["id", "name"],
        },
      ],
    });
    return departments.map((d: any) => d.toJSON());
  }

  /**
   * Ambil semua user dalam department
   */
  async findUsers(departmentId: string) {
    const users = await UserModel.findAll({
      where: { departmentId },
      attributes: ["id", "firstName", "lastName", "email", "roleId"],
    });
    return users.map((u: any) => u.toJSON());
  }
}
