import { RolePermissions } from "@domain/entities/member/RolePermissions";
export declare class RolePermissionRepository {
    findByRoleIdAndCompany(roleId: string, companyId: string): Promise<string[]>;
    create(data: {
        roleId: string;
        permissionId: string;
        companyId: string;
    }): Promise<RolePermissions>;
    deleteByRolePermissionAndCompany(roleId: string, permissionId: string, companyId: string): Promise<number>;
    deleteAllByRoleAndCompany(roleId: string, companyId: string): Promise<number>;
    updatePermissions(roleId: string, newPermissionIds: string[], companyId: string): Promise<RolePermissions[]>;
    findExistingPermissions(permissionIds: string[]): Promise<string[]>;
}
//# sourceMappingURL=rolePermissionRepository.d.ts.map