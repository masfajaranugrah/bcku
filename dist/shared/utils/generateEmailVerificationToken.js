"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateEmailVerificationToken;
const crypto_1 = __importDefault(require("crypto"));
function generateEmailVerificationToken() {
    const tokenVerification = crypto_1.default.randomBytes(32).toString("hex");
    const tokenVerificationExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    return { tokenVerification, tokenVerificationExpiresAt };
}
//# sourceMappingURL=generateEmailVerificationToken.js.map