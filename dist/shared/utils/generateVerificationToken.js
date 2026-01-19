"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = generateVerificationToken;
const crypto_1 = __importDefault(require("crypto"));
function generateVerificationToken() {
    const buffer = crypto_1.default.randomBytes(3);
    const token = (parseInt(buffer.toString("hex"), 16) % 1000000)
        .toString()
        .padStart(6, "0");
    const tokenExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    return { token, tokenExpiresAt };
}
//# sourceMappingURL=generateVerificationToken.js.map