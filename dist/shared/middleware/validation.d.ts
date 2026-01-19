import { z } from "zod";
import { Request, Response, NextFunction } from "express";
/**
 * Generic validation middleware factory
 * Validates request body, params, or query against a Zod schema
 */
export declare const validate: (schema: z.ZodType<any>, source?: "body" | "params" | "query") => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
/**
 * Validate multiple sources at once
 */
export declare const validateMultiple: (schemas: {
    body?: z.ZodType<any>;
    params?: z.ZodType<any>;
    query?: z.ZodType<any>;
}) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validation.d.ts.map