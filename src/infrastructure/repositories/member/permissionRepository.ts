import PermissionsModel from "@infrastructure/database/models/member/permissionsModel";
import { Permissions } from "@domain/entities/member/Permission";

export class PermissionsRepository {

  async create(permissions: Permissions): Promise<Permissions> {
    const created = await PermissionsModel.create(permissions);
    return created.toJSON() as Permissions;
  }

 
async findAll(companyId: string): Promise<Permissions[]> {
  const records = await PermissionsModel.findAll({ where: { companyId } });
  return records.map((r : any) => r.toJSON() as Permissions);
}



  async findById(id: string): Promise<Permissions | null> {
    const role = await PermissionsModel.findByPk(id);
    return role ? (role.toJSON() as Permissions) : null;
  }
  async findByIds(ids: string[]): Promise<Permissions[]> {
    const permissions = await PermissionsModel.findAll({ where: { id: ids } });
    return permissions.map((p: InstanceType<typeof PermissionsModel>) => p.toJSON() as Permissions);
  }

  async update(id: string, payload: Partial<Permissions>): Promise<Permissions | null> {
    const role = await PermissionsModel.findByPk(id);
    if (!role) return null;
    await role.update(payload);
    return role.toJSON() as Permissions;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await PermissionsModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
