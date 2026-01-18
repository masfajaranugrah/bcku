import { z } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Generic validation middleware factory
 * Validates request body, params, or query against a Zod schema
 */
export const validate = (schema: z.ZodType<any>, source: "body" | "params" | "query" = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req[source];
            const result = schema.safeParse(data);

            if (!result.success) {
                const errors = result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return res.status(400).json({
                    status: "error",
                    message: "Validasi gagal",
                    errors,
                });
            }

            // Replace with parsed/transformed data
            (req as any)[source] = result.data;
            next();
        } catch (error) {
            console.error("Validation middleware error:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error during validation",
            });
        }
    };
};

/**
 * Validate multiple sources at once
 */
export const validateMultiple = (schemas: {
    body?: z.ZodType<any>;
    params?: z.ZodType<any>;
    query?: z.ZodType<any>;
}) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const allErrors: Array<{ field: string; message: string; source: string }> = [];

        for (const [source, schema] of Object.entries(schemas)) {
            if (schema) {
                const data = (req as any)[source];
                const result = schema.safeParse(data);

                if (!result.success) {
                    result.error.issues.forEach((issue) => {
                        allErrors.push({
                            source,
                            field: issue.path.join("."),
                            message: issue.message,
                        });
                    });
                } else {
                    // Replace with parsed data
                    (req as any)[source] = result.data;
                }
            }
        }

        if (allErrors.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "Validasi gagal",
                errors: allErrors,
            });
        }

        next();
    };
};
