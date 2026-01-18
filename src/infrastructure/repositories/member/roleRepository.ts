import RoleModel from "@infrastructure/database/models/member/rolesModel";
import { Role } from "@domain/entities/member/Roles";
import { User } from "@domain/entities/auth/User";

export class RoleRepository {
  // Create role, pastikan role unik per company
  async create(companyId: string, role: Role): Promise<Role> {
    // cek apakah role dengan nama yang sama sudah ada di company ini
    const exists = await RoleModel.findOne({
      where: { name: role.name, companyId }
    });
    if (exists) {
      return exists.toJSON() as Role;
    }
    const created = await RoleModel.create({ ...role, companyId });
    return created.toJSON() as Role;
  }

  // Ambil semua role di sebuah company
  async findAll(companyId: string): Promise<Role[]> {
    const roles = await RoleModel.findAll({ where: { companyId } });
    return roles.map((role: any) => role.toJSON() as Role);
  }

  // Ambil role berdasarkan ID dan company
  async findById(id: string, companyId: string): Promise<Role | null> {
    const role = await RoleModel.findOne({ where: { id, companyId } });
    return role ? (role.toJSON() as Role) : null;
  }

  // Cari role berdasarkan nama dan company (update!)
async findByName(name: string): Promise<Role | null> {
    const role = await RoleModel.findOne({ where: { name } });
    return role ? (role.toJSON() as Role) : null;
  }

  // Update role dengan companyId
  async update(id: string, companyId: string, payload: Partial<Role>): Promise<Role | null> {
    const role = await this.findById(id, companyId);
    if (!role) return null;

    const instance = await RoleModel.findByPk(id);
    if (!instance) return null;

    await instance.update(payload);
    return instance.toJSON() as Role;
  }

  // Delete role dengan companyId
  async delete(id: string, companyId: string): Promise<boolean> {
    const deleted = await RoleModel.destroy({ where: { id, companyId } });
    return deleted > 0;
  }

   // ---------- DEFAULT ROLE HR_ADMIN ----------
 async findByNameAndCompany(roleName: string, companyId: string) {
    const role = await RoleModel.findOne({
      where: {
        name: roleName,
        companyId
      }
    });
    return role ? role.toJSON() : null;
  }
   
}
