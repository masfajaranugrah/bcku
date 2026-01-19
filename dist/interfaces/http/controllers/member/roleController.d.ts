import { Request, Response, NextFunction } from "express";
export declare class RoleController {
    static create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static findAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static findById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=roleController.d.ts.map