import { RolePermissionDTO } from "@application/dtos/RolePermissionDTO";
import { RolePermissions } from "@domain/entities/member/RolePermissions";
export declare class RolePermissionUseCase {
    private rolePermissionRepository;
    constructor();
    getPermissionsByRole(data: {
        roleId: string;
        companyId: string;
    }): Promise<string[]>;
    validatePermissions(permissionIds: string[]): Promise<string[]>;
    assignPermissionsToRole(data: RolePermissionDTO & {
        companyId: string;
    }): Promise<RolePermissions[]>;
    updatePermissionsForRole(data: RolePermissionDTO & {
        companyId: string;
    }): Promise<RolePermissions[]>;
    removePermissionFromRole(data: {
        roleId: string;
        permissionId: string;
        companyId: string;
    }): Promise<boolean>;
    removeAllPermissionsFromRole(data: {
        roleId: string;
        companyId: string;
    }): Promise<boolean>;
}
//# sourceMappingURL=rolePermissionUseCase.d.ts.map