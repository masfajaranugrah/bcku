import { Role } from "@domain/entities/member/Roles";
export declare class RoleUseCase {
    private roleRepository;
    constructor();
    createRole(companyId: string, payload: Role): Promise<Role>;
    getRoles(companyId: string): Promise<Role[]>;
    getRoleById(id: string, companyId: string): Promise<Role | null>;
    updateRole(id: string, companyId: string, payload: Partial<Role>): Promise<Role | null>;
    deleteRole(id: string, companyId: string): Promise<boolean>;
}
//# sourceMappingURL=roleUseCase.d.ts.map