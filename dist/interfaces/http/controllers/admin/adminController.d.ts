import { Request, Response } from 'express';
export declare class adminController {
    static getFile(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
    static getAllMembers(req: any, res: any, next: any): Promise<any>;
    static getMemberById(req: any, res: any, next: any): Promise<any>;
    static updateMember(req: any, res: any, next: any): Promise<any>;
    static deleteMember(req: any, res: any, next: any): Promise<any>;
}
//# sourceMappingURL=adminController.d.ts.map