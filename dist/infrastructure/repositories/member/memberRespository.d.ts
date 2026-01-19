import { User } from "@domain/entities/auth/User";
export declare class MemberRespository {
    findById(id: string): Promise<any | null>;
    findUserAll(filter?: {
        companyId?: string;
    }): Promise<any[]>;
    update(id: string, data: Partial<User>): Promise<any>;
}
//# sourceMappingURL=memberRespository.d.ts.map