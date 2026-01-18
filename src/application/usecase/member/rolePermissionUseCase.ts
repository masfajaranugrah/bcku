import { RolePermissionDTO } from "@application/dtos/RolePermissionDTO";
import { RolePermissionRepository } from "@infrastructure/repositories/member/rolePermissionRepository";
import { RolePermissions } from "@domain/entities/member/RolePermissions";

export class RolePermissionUseCase {
  private rolePermissionRepository: RolePermissionRepository;

  constructor() {
    this.rolePermissionRepository = new RolePermissionRepository();
  }

async getPermissionsByRole(data: { roleId: string; companyId: string }): Promise<string[]> {
  // Ambil semua role-permission, sudah return array string (nama permission)
  const permissions = await this.rolePermissionRepository.findByRoleIdAndCompany(data.roleId, data.companyId);

  // Tidak perlu map lagi, langsung return
  return permissions;
}

async validatePermissions(permissionIds: string[]): Promise<string[]> {
  // Panggil repository untuk cek permission yang ada
  return await this.rolePermissionRepository.findExistingPermissions(permissionIds);
}
async assignPermissionsToRole(data: RolePermissionDTO & { companyId: string }): Promise<RolePermissions[]> {
  const { roleId, permissionIds, companyId } = data;
  const created: RolePermissions[] = [];

  // Validasi permissionIds ada di tabel permissions
  const validPermissions = await this.rolePermissionRepository.findExistingPermissions(permissionIds);
  if (validPermissions.length !== permissionIds.length) {
    const invalidIds = permissionIds.filter(id => !validPermissions.includes(id));
    throw new Error(`Permission ID tidak valid: ${invalidIds.join(", ")}`);
  }

  for (const permissionId of permissionIds) {
    const rp = await this.rolePermissionRepository.create({ roleId, permissionId, companyId });
    created.push(rp);
  }

  return created;
}


  async updatePermissionsForRole(data: RolePermissionDTO & { companyId: string }): Promise<RolePermissions[]> {
    const { roleId, permissionIds, companyId } = data;

    // hapus semua yang lama
    await this.rolePermissionRepository.deleteAllByRoleAndCompany(roleId, companyId);

    // insert yang baru
    const created: RolePermissions[] = [];
    for (const permissionId of permissionIds) {
      const rp = await this.rolePermissionRepository.create({ roleId, permissionId, companyId });
      created.push(rp);
    }

    return created;
  }

  async removePermissionFromRole(data: { roleId: string; permissionId: string; companyId: string }): Promise<boolean> {
    const { roleId, permissionId, companyId } = data;
    const deleted = await this.rolePermissionRepository.deleteByRolePermissionAndCompany(roleId, permissionId, companyId);
    return deleted > 0;
  }

  async removeAllPermissionsFromRole(data: { roleId: string; companyId: string }): Promise<boolean> {
    const { roleId, companyId } = data;
    const deleted = await this.rolePermissionRepository.deleteAllByRoleAndCompany(roleId, companyId);
    return deleted > 0;
  }
}
