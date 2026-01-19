"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("./AppError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map