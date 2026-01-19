"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSuccess = void 0;
class AppSuccess {
    constructor(message, data, statusCode = 200) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
    toJSON() {
        return {
            status: "success",
            statusCode: this.statusCode,
            message: this.message,
            data: this.data || null
        };
    }
}
exports.AppSuccess = AppSuccess;
//# sourceMappingURL=AppSuccess.js.map