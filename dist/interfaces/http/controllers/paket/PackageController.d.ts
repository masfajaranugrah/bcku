import { Request, Response, NextFunction } from "express";
export declare class PackageController {
    addPackage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    editPackage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    listPackages(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getPackage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    deletePackage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=PackageController.d.ts.map