import { MemberRespository } from '@infrastructure/repositories/member/memberRespository';
export declare class MemberUseCase {
    private memberRespository;
    constructor(memberRespository: MemberRespository);
    getAllMembers(companyId: string): Promise<{
        status: string;
        data: never[];
        message: string;
    } | {
        status: string;
        data: any[];
        message?: never;
    }>;
    getMemberById(id: string): Promise<{
        status: string;
        data: any;
    }>;
    updateMember(id: string, data: any): Promise<{
        status: string;
        data: {
            id: any;
            fullName: string;
            email: any;
            profilePicture: any;
            isVerified: any;
            createdAt: any;
            updatedAt: any;
        };
    }>;
}
//# sourceMappingURL=memberUseCase.d.ts.map