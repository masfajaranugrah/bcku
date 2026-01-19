import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: any;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const checkFeaturePermission: (requiredFeature: string) => (req: AuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const checkHrAdminFeature: (requiredFeature: string) => (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map