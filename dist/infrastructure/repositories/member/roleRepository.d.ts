import { Role } from "@domain/entities/member/Roles";
export declare class RoleRepository {
    create(companyId: string, role: Role): Promise<Role>;
    findAll(companyId: string): Promise<Role[]>;
    findById(id: string, companyId: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    update(id: string, companyId: string, payload: Partial<Role>): Promise<Role | null>;
    delete(id: string, companyId: string): Promise<boolean>;
    findByNameAndCompany(roleName: string, companyId: string): Promise<any>;
}
//# sourceMappingURL=roleRepository.d.ts.map