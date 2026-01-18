import RolePermissionModel from "@infrastructure/database/models/member/rolePermissionModel";
import PermissionModel from "@infrastructure/database/models/member/permissionsModel"; // pastikan ini model permissions
import { RolePermissions } from "@domain/entities/member/RolePermissions";
import { RoleModel } from "@infrastructure/database/models";
export class RolePermissionRepository {
  // Cari semua permission untuk role tertentu di company tertentu
async findByRoleIdAndCompany(roleId: string, companyId: string): Promise<string[]> {
  const role = await RoleModel.findOne({
    where: { id: roleId },
    include: [
      {
        model: PermissionModel,
        as: "permissions",
        attributes: ["name"],
        through: {
          attributes: [],
          where: { companyId }, 
        },
      },
    ],
  });

  return (role?.permissions || []).map((p: any) => p.name);
}



  // Buat role-permission baru dengan companyId
  async create(data: { roleId: string; permissionId: string; companyId: string }): Promise<RolePermissions> {
    const created = await RolePermissionModel.create(data);
    return created.toJSON() as RolePermissions;
  }

  // Hapus satu permission dari role di company tertentu
  async deleteByRolePermissionAndCompany(roleId: string, permissionId: string, companyId: string): Promise<number> {
    return await RolePermissionModel.destroy({
      where: { roleId, permissionId, companyId },
    });
  }

  // Hapus semua permission dari role di company tertentu
  async deleteAllByRoleAndCompany(roleId: string, companyId: string): Promise<number> {
    return await RolePermissionModel.destroy({
      where: { roleId, companyId },
    });
  }

  // Replace semua permissions untuk role di company tertentu
  async updatePermissions(roleId: string, newPermissionIds: string[], companyId: string): Promise<RolePermissions[]> {
    // Hapus semua permission lama
    await this.deleteAllByRoleAndCompany(roleId, companyId);

    // Insert permission baru
    const newRecords = newPermissionIds.map(permissionId => ({
      roleId,
      permissionId,
      companyId,
    }));

    const created = await RolePermissionModel.bulkCreate(newRecords, { returning: true });
    return created.map((c: any) => c.toJSON() as RolePermissions);
  }

  // Validasi permissionIds: kembalikan hanya permissionId yang valid (ada di tabel permissions)
  async findExistingPermissions(permissionIds: string[]): Promise<string[]> {
    const records = await PermissionModel.findAll({
      where: { id: permissionIds },
      attributes: ["id"],
    });

    return records.map((r:any) => r.id);
  }
}
