"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMultiple = exports.validate = void 0;
/**
 * Generic validation middleware factory
 * Validates request body, params, or query against a Zod schema
 */
const validate = (schema, source = "body") => {
    return (req, res, next) => {
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
            req[source] = result.data;
            next();
        }
        catch (error) {
            console.error("Validation middleware error:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error during validation",
            });
        }
    };
};
exports.validate = validate;
/**
 * Validate multiple sources at once
 */
const validateMultiple = (schemas) => {
    return (req, res, next) => {
        const allErrors = [];
        for (const [source, schema] of Object.entries(schemas)) {
            if (schema) {
                const data = req[source];
                const result = schema.safeParse(data);
                if (!result.success) {
                    result.error.issues.forEach((issue) => {
                        allErrors.push({
                            source,
                            field: issue.path.join("."),
                            message: issue.message,
                        });
                    });
                }
                else {
                    // Replace with parsed data
                    req[source] = result.data;
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
exports.validateMultiple = validateMultiple;
//# sourceMappingURL=validation.js.map