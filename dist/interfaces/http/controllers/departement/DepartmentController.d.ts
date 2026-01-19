import { Request, Response } from "express";
export declare class DepartmentController {
    /**
     * Create new department
     */
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all departments
     */
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get department by ID
     */
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get departments by companyId
     */
    findByCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Update department
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Delete department
     */
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Search department by name
     */
    search(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all users in department
     */
    findUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=DepartmentController.d.ts.map