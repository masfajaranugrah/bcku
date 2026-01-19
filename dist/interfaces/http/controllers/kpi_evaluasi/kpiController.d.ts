import { Request, Response } from "express";
export declare class KpiController {
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static delete(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=kpiController.d.ts.map