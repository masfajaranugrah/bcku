"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { config } from "@config/env";
// import axios from "axios";
// import { AppError } from "@shared/errors/AppError";
// import { RoleUseCase } from "@application/usecase/member/roleUseCase";
// interface AuthRequest extends Request {
//   user?: any;
// }
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHrAdminFeature = exports.checkFeaturePermission = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@config/env");
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("@shared/errors/AppError");
// -----------------------------
// Helper: parse cookies header
// -----------------------------
const parseCookieHeader = (cookieHeader) => {
    const result = {};
    if (!cookieHeader)
        return result;
    // cookieHeader example: "a=1; b=2"
    cookieHeader.split(";").forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx > -1) {
            const name = pair.slice(0, idx).trim();
            const val = pair.slice(idx + 1).trim();
            if (name)
                result[name] = decodeURIComponent(val);
        }
    });
    return result;
};
// -----------------------------
// Helper: ambil token dengan aman
// - return token tanpa "Bearer " prefix
// -----------------------------
const getTokenFromRequest = (req) => {
    // 1) Dari req.cookies (jika tersedia)
    const cookieToken = req.cookies?.accessToken;
    if (cookieToken && typeof cookieToken === "string") {
        return cookieToken.trim();
    }
    // 2) Dari header Cookie (jika cookie-parser tidak dipasang atau req.cookies kosong)
    const cookieHeader = req.headers["cookie"]?.toString();
    if (cookieHeader) {
        const parsed = parseCookieHeader(cookieHeader);
        if (parsed.accessToken)
            return parsed.accessToken;
    }
    // 3) Dari x-access-token header (mendukung array atau string)
    const xAccess = req.headers["x-access-token"];
    if (Array.isArray(xAccess) && xAccess.length) {
        return xAccess[0].trim();
    }
    if (typeof xAccess === "string" && xAccess.trim()) {
        return xAccess.trim();
    }
    // 4) Dari authorization header (mendukung array atau string)
    const auth = req.headers["authorization"];
    let rawAuth;
    if (Array.isArray(auth) && auth.length)
        rawAuth = auth[0];
    else if (typeof auth === "string")
        rawAuth = auth;
    if (rawAuth) {
        const a = rawAuth.trim();
        // jika ada lebih dari satu token dipisah koma, ambil token pertama yang valid
        // contoh buruk: "Bearer x, Bearer y"
        const str = typeof a === "string" ? a : "";
        const first = str.split(",")[0]?.trim() ?? "";
        if (/^bearer\s+/i.test(first)) {
            return first.replace(/^bearer\s+/i, "").trim();
        }
        return first;
    }
    return undefined;
};
// =====================
// AUTH MIDDLEWARE
// =====================
const authMiddleware = (req, res, next) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: Token is required",
            });
        }
        // Verifikasi token (config.ACCESS_TOKEN adalah secret)
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, env_1.config.ACCESS_TOKEN);
        }
        catch (err) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: Invalid or expired token",
            });
        }
        // Attach payload ke req.user
        req.user = decoded;
        next();
    }
    catch (error) {
        // fallback error
        console.error("authMiddleware error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.authMiddleware = authMiddleware;
// =====================
// HELPER: GET PAKET DATA
// (tetap sama tetapi perbaiki sedikit penanganan axios err)
// =====================
const fetchPaketData = async (paketId) => {
    try {
        const response = await axios_1.default.get(`${env_1.config.BASE_URL}/api/v1/paket/packages/${paketId}`, { timeout: 5000 });
        const paket = response.data.data;
        if (!paket || !Array.isArray(paket.permissions)) {
            throw new AppError_1.AppError("Invalid package data", 500);
        }
        return paket;
    }
    catch (err) {
        if (err.response) {
            // layanan paket tidak tersedia / error dari service paket
            throw new AppError_1.AppError("Paket service unavailable", 503);
        }
        throw new AppError_1.AppError("Internal server error", 500);
    }
};
// =====================
// HELPER: GET ROLE DATA
// - token param harus berupa raw token (tanpa "Bearer " prefix)
// =====================
const fetchRoleData = async (companyId, token) => {
    try {
        const response = await axios_1.default.get(`${env_1.config.BASE_URL}/api/v1/roles/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // kita pastikan di caller menambahkan prefix
            },
            timeout: 5000,
        });
        if (!response.data || !Array.isArray(response.data.data)) {
            throw new AppError_1.AppError("Invalid role data", 500);
        }
        return response.data.data;
    }
    catch (err) {
        if (err.response) {
            if (err.response.status === 401)
                throw new AppError_1.AppError("Unauthorized to access role service", 401);
            throw new AppError_1.AppError("Role service unavailable", 503);
        }
        throw new AppError_1.AppError("Internal server error", 500);
    }
};
// =====================
// CHECK PERMISSION (OPTIMIZED - Direct DB Query)
// =====================
const memberRespository_1 = require("@application/../infrastructure/repositories/member/memberRespository");
const PackageModel_1 = __importDefault(require("@infrastructure/database/models/paket/PackageModel"));
const memberRepository = new memberRespository_1.MemberRespository();
// Cache for permissions per request
const getPermissionsFromDB = async (userId) => {
    const member = await memberRepository.findById(userId);
    if (!member) {
        throw new AppError_1.AppError("User not found", 404);
    }
    return {
        role: member.role || "",
        permissions: member.permissions || [],
    };
};
const getPaketPermissionsFromDB = async (paketId) => {
    const paket = await PackageModel_1.default.findByPk(paketId);
    if (!paket) {
        throw new AppError_1.AppError("Package not found", 404);
    }
    return {
        name: paket.name,
        permissions: paket.features || [], // features = permissions in PackageModel
    };
};
const checkFeaturePermission = (requiredFeature) => {
    return async (req, res, next) => {
        try {
            if (!req.user)
                throw new AppError_1.AppError("Unauthorized", 401);
            // Check if permissions are already cached in request
            if (!req.user._cachedPermissions) {
                const memberData = await getPermissionsFromDB(req.user.id);
                req.user._cachedPermissions = memberData.permissions;
                req.user._cachedRole = memberData.role;
            }
            const role = req.user._cachedRole;
            const permissions = req.user._cachedPermissions;
            // Non HR_ADMIN → check member permissions
            if (role !== "HR_ADMIN") {
                if (!Array.isArray(permissions) || !permissions.includes(requiredFeature)) {
                    return res.status(403).json({
                        status: "error",
                        message: `Anda sebagai ${role} tidak diizinkan akses ini`,
                    });
                }
                return next();
            }
            // HR_ADMIN → check package permissions
            if (!req.user.paketId) {
                // Fallback: check if company has paketId
                const { CompanyModel } = await Promise.resolve().then(() => __importStar(require("@infrastructure/database/models")));
                const company = await CompanyModel.findByPk(req.user.companyId);
                if (company?.paketId) {
                    req.user.paketId = company.paketId;
                }
                else {
                    return res.status(403).json({
                        status: "error",
                        message: "Paket perusahaan tidak ditemukan",
                    });
                }
            }
            // Cache paket permissions
            if (!req.user._cachedPaketPermissions) {
                const paketData = await getPaketPermissionsFromDB(req.user.paketId);
                req.user._cachedPaketPermissions = paketData.permissions;
                req.user._cachedPaketName = paketData.name;
            }
            const paketPermissions = req.user._cachedPaketPermissions;
            const paketName = req.user._cachedPaketName;
            if (!Array.isArray(paketPermissions) || !paketPermissions.includes(requiredFeature)) {
                return res.status(403).json({
                    status: "error",
                    message: `Paket ${paketName} tidak memiliki akses: ${requiredFeature}`,
                });
            }
            next();
        }
        catch (error) {
            console.error("Permission check error:", error?.message || error);
            return res.status(error.statusCode || 500).json({
                status: "error",
                message: error.message || "Internal server error",
            });
        }
    };
};
exports.checkFeaturePermission = checkFeaturePermission;
// =====================
// CHECK HR ADMIN FEATURE (OPTIMIZED)
// =====================
const checkHrAdminFeature = (requiredFeature) => {
    return async (req, res, next) => {
        try {
            if (!req.user)
                throw new AppError_1.AppError("Unauthorized", 401);
            // Get role from cache or DB
            if (!req.user._cachedRole) {
                const memberData = await getPermissionsFromDB(req.user.id);
                req.user._cachedRole = memberData.role;
            }
            if (req.user._cachedRole !== "HR_ADMIN") {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden: Only HR_ADMIN can access this feature",
                });
            }
            // Get paket permissions
            if (!req.user.paketId) {
                const { CompanyModel } = await Promise.resolve().then(() => __importStar(require("@infrastructure/database/models")));
                const company = await CompanyModel.findByPk(req.user.companyId);
                if (company?.paketId) {
                    req.user.paketId = company.paketId;
                }
                else {
                    return res.status(403).json({
                        status: "error",
                        message: "Paket perusahaan tidak ditemukan",
                    });
                }
            }
            if (!req.user._cachedPaketPermissions) {
                const paketData = await getPaketPermissionsFromDB(req.user.paketId);
                req.user._cachedPaketPermissions = paketData.permissions;
                req.user._cachedPaketName = paketData.name;
            }
            const paketPermissions = req.user._cachedPaketPermissions;
            const paketName = req.user._cachedPaketName;
            if (!Array.isArray(paketPermissions) || !paketPermissions.includes(requiredFeature)) {
                return res.status(403).json({
                    status: "error",
                    message: `Paket ${paketName} tidak memiliki akses: ${requiredFeature}`,
                });
            }
            next();
        }
        catch (error) {
            console.error("HR_ADMIN permission check error:", error?.message || error);
            return res.status(error.statusCode || 500).json({
                status: "error",
                message: error.message || "Internal server error",
            });
        }
    };
};
exports.checkHrAdminFeature = checkHrAdminFeature;
//# sourceMappingURL=authMiddleware.js.map