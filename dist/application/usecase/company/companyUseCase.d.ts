import { CreateCompanyDTO, UpdateCompanyDTO } from "@application/dtos/CompanyDTO";
export declare class CompanyUseCase {
    private repository;
    constructor();
    createCompany(data: CreateCompanyDTO): Promise<import("../../../infrastructure/database/models").CompanyModel>;
    getCompanyById(id: string): Promise<import("../../../infrastructure/database/models").CompanyModel>;
    getAllCompanies(): Promise<import("../../../infrastructure/database/models").CompanyModel[]>;
    updateCompany(id: string, data: UpdateCompanyDTO): Promise<import("../../../infrastructure/database/models").CompanyModel>;
    deleteCompany(id: string): Promise<import("../../../infrastructure/database/models").CompanyModel>;
    toggleStatus(id: string, isActive: boolean): Promise<import("../../../infrastructure/database/models").CompanyModel>;
}
//# sourceMappingURL=companyUseCase.d.ts.map