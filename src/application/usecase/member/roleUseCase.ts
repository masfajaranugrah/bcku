import { Role } from "@domain/entities/member/Roles";
import { RoleRepository } from "@infrastructure/repositories/member/roleRepository";
import { UserModel } from "@infrastructure/database/models";
export class RoleUseCase {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }
 
  async createRole(companyId: string, payload: Role): Promise<Role> {
  return this.roleRepository.create(companyId, payload);
}

async getRoles(companyId: string): Promise<Role[]> {
  return this.roleRepository.findAll(companyId);
}

async getRoleById(id: string, companyId: string): Promise<Role | null> {
  return this.roleRepository.findById(id, companyId);
}

async updateRole(id: string, companyId: string, payload: Partial<Role>): Promise<Role | null> {
  return this.roleRepository.update(id, companyId, payload);
}

async deleteRole(id: string, companyId: string): Promise<boolean> {
  const userCount = await UserModel.count({ where: { roleId: id, companyId } });
  if (userCount > 0) throw new Error(`Role masih dipakai oleh ${userCount} user, tidak bisa dihapus`);

  return this.roleRepository.delete(id, companyId);
}


   

}
