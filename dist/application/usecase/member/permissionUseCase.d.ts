import { Permissions } from "../../../domain/entities/member/Permission";
export declare class PermissionUseCase {
    private permissionsRepository;
    constructor();
    createPermission(payload: Permissions & {
        companyId: string;
    }): Promise<Permissions>;
    getPermission(data: {
        companyId: string;
    }): Promise<Permissions[]>;
    getPermissionById(id: string, companyId: string): Promise<Permissions | null>;
    updatePermission(id: string, payload: Partial<Permissions> & {
        companyId?: string;
    }): Promise<Permissions | null>;
    deletePermission(id: string, companyId: string): Promise<boolean>;
}
//# sourceMappingURL=permissionUseCase.d.ts.map