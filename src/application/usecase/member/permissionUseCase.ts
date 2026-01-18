import { Permissions } from "../../../domain/entities/member/Permission";
import { PermissionsRepository } from "../../../infrastructure/repositories/member/permissionRepository";

export class PermissionUseCase {
  private permissionsRepository: PermissionsRepository;

  constructor() {
    this.permissionsRepository = new PermissionsRepository();
  }

  async createPermission(payload: Permissions & { companyId: string }): Promise<Permissions> {
    // Pastikan payload mengandung companyId
    return this.permissionsRepository.create(payload);
  }

async getPermission(data: { companyId: string }): Promise<Permissions[]> {
  const { companyId } = data;
  return this.permissionsRepository.findAll(companyId);
}

  async getPermissionById(id: string, companyId: string): Promise<Permissions | null> {
    return this.permissionsRepository.findById(id);
  }

  async updatePermission(id: string, payload: Partial<Permissions> & { companyId?: string }): Promise<Permissions | null> {
    // CompanyId opsional di update
    return this.permissionsRepository.update(id, payload);
  }

  async deletePermission(id: string, companyId: string): Promise<boolean> {
    return this.permissionsRepository.delete(id);
  }
}
