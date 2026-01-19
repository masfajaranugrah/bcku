import { AdminRespository } from "@infrastructure/repositories/admin/adminRespository";
export declare class AdminUseCase {
    private adminRespository;
    constructor(adminRespository: AdminRespository);
    getAllMembers(user: any): Promise<{
        status: string;
        data: any[];
    }>;
    getMemberById(id: string, companyId: string): Promise<{
        status: string;
        data: any;
    }>;
    updateMember(id: string, companyId: string, data: any): Promise<{
        status: string;
        data: any;
    }>;
    deleteMember(id: string, companyId: string): Promise<{
        status: string;
        message: string;
    }>;
}
//# sourceMappingURL=adminUseCase.d.ts.map