import { Permissions } from "@domain/entities/member/Permission";
export declare class PermissionsRepository {
    create(permissions: Permissions): Promise<Permissions>;
    findAll(companyId: string): Promise<Permissions[]>;
    findById(id: string): Promise<Permissions | null>;
    findByIds(ids: string[]): Promise<Permissions[]>;
    update(id: string, payload: Partial<Permissions>): Promise<Permissions | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=permissionRepository.d.ts.map