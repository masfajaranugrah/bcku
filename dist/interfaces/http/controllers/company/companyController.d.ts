import { Request, Response } from "express";
export declare class CompanyController {
    private useCase;
    constructor();
    createCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCompanies(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCompanyById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=companyController.d.ts.map