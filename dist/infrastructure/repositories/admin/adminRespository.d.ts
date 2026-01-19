import { User } from "@domain/entities/auth/User";
export declare class AdminRespository {
    create(user: User): Promise<User>;
    findByIdAndCompany(id: string, companyId: string): Promise<any>;
    updateByIdAndCompany(id: string, companyId: string, data: any): Promise<any>;
    deleteByIdAndCompany(id: string, companyId: string): Promise<any>;
    findById(id: string): Promise<any | null>;
    findUserAll(companyId?: string): Promise<any[]>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<any>;
    delete(id: string): Promise<void>;
    findByToken(token: string): Promise<User | null>;
}
//# sourceMappingURL=adminRespository.d.ts.map