import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        fullName: string;
        roleId: string;
        companyId: string;
        status: boolean;
    };
}
export declare class authController {
    static register(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static registerMember(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static verification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static sendCodeVerification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static requestResetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
//# sourceMappingURL=authController.d.ts.map