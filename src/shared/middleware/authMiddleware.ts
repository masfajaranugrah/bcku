// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { config } from "@config/env";
// import axios from "axios";
// import { AppError } from "@shared/errors/AppError";
// import { RoleUseCase } from "@application/usecase/member/roleUseCase";
// interface AuthRequest extends Request {
//   user?: any;
// }

// // =====================
// // AUTH MIDDLEWARE
// // =====================
// export const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Ambil token dari cookie atau header
//    let token: string | undefined =
//       req.cookies?.accessToken ||
//       (Array.isArray(req.headers["x-access-token"])
//         ? req.headers["x-access-token"][0]
//         : req.headers["x-access-token"]?.toString()) ||
//       (Array.isArray(req.headers["authorization"])
//         ? req.headers["authorization"][0]
//         : req.headers["authorization"]?.toString());
//      if (!token) {
//       return res.status(401).json({
//         status: "error",
//         message: "Unauthorized: Token is required",
//       });
//     }


//     // Jika header authorization masih pakai "Bearer", hapus prefix
//     if (token.toLowerCase().startsWith("bearer ")) {
//       token = token.slice(7);
//     }

//     // Verifikasi token
//     let decoded: JwtPayload;
//     try {
//       decoded = jwt.verify(token, config.ACCESS_TOKEN) as JwtPayload;
//     } catch (err) {
//       return res.status(401).json({
//         status: "error",
//         message: "Unauthorized: Invalid or expired token",
//       });
//     }

//     // Attach payload ke req.user
//     req.user = decoded;

//     next();
//   } catch (error) {
//     // fallback error
//     console.error("authMiddleware error:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };




// // =====================
// // HELPER: GET PAKET DATA
// // =====================
// const fetchPaketData = async (paketId: string) => {
//   try {
//     const response = await axios.get(`${config.BASE_URL}/api/v1/paket/packages/${paketId}`, { timeout: 5000 });
//      const paket = response.data.data;
//     if (!paket || !Array.isArray(paket.permissions)) {
//       throw new AppError("Invalid package data", 500);
//     }
//     return paket;
//   } catch (err: any) {
//     if (err.response) throw new AppError("Paket service unavailable", 503);
//     throw new AppError("Internal server error", 500);
//   }
// };

// // =====================
// // HELPER: GET ROLE DATA
// // =====================
// const fetchRoleData = async (companyId: string, token: string) => {
//   try {
//     const response = await axios.get(`${config.BASE_URL}/api/v1/roles/${companyId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // ✅ harus ada "Bearer "
//       },
//       timeout: 5000,
//     });

//     if (!response.data || !Array.isArray(response.data.data)) {
//       throw new AppError("Invalid role data", 500);
//     }

//     return response.data.data;
//   } catch (err: any) {
//     if (err.response) {
//       if (err.response.status === 401) throw new AppError("Unauthorized to access role service", 401);
//       throw new AppError("Role service unavailable", 503);
//     }
//     throw new AppError("Internal server error", 500);
//   }
// };




// // =====================
// // CHECK PERMISSION
// // =====================

// export const checkFeaturePermission = (requiredFeature: string) => {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) throw new AppError("Unauthorized", 401);

//       // Ambil token dari request
//       const token =
//         req.cookies?.accessToken ||
//         (Array.isArray(req.headers["authorization"])
//           ? req.headers["authorization"][0]
//           : req.headers["authorization"]?.toString());

//       if (!token) throw new AppError("Unauthorized", 401);

//       // ================================
//       // GET MEMBER DATA LANGSUNG DARI API MEMBER/ME
//       // ================================
//       const member = await axios.get(`${process.env.BASE_URL}/api/v1/member/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const { role, permissions } = member.data.data;

//       console.log("Role from API:", role);
//       console.log("Permissions from API:", permissions);

//       // ================================
//       // BUKAN HR_ADMIN → cek pakai permissions member/me
//       // ================================
//       if (role !== "HR_ADMIN") {
//         if (!permissions.includes(requiredFeature)) {
//           return res.status(403).json({
//             status: "error",
//             message: `Anda sebagai ${role} tidak diizinkan akses ini`,
//           });
//         }

//         return next();
//       }

//       // ================================
//       // KHUSUS HR_ADMIN → cek pakai permissions paket
//       // ================================
//       if (!req.user.paketId) {
//         return res.status(403).json({
//           status: "error",
//           message: `Paket perusahaan tidak ditemukan`,
//         });
//       }

//       const paket = await fetchPaketData(req.user.paketId);

//       if (!paket.permissions.includes(requiredFeature)) {
//         return res.status(403).json({
//           status: "error",
//           message: `Your plan (${paket.name}) does not include permission: ${requiredFeature}`,
//         });
//       }

//       next();
//     } catch (error: any) {
//       console.error("Permission check error:", error.message);
//       return res.status(error.statusCode || 500).json({
//         status: "error",
//         message: error.message || "Internal server error",
//       });
//     }
//   };
// };


// // export const checkFeaturePermission = (requiredFeature: string) => {
// //   return async (req: AuthRequest, res: Response, next: NextFunction) => {
// //     try {
// //       if (!req.user) throw new AppError("Unauthorized", 401);

// //       const paket = await fetchPaketData(req.user.paketId);

// //       if (!paket.permissions.includes(requiredFeature)) {
// //         return res.status(403).json({
// //           status: "error",
// //           message: `Your plan (${paket.name}) does not include permission: ${requiredFeature}`,
// //         });
// //       }

// //       next();
// //     } catch (error: any) {
// //       console.error("Permission check error:", error.message);
// //       return res.status(error.statusCode || 500).json({
// //         status: "error",
// //         message: error.message || "Internal server error",
// //       });
// //     }
// //   };
// // };

// // =====================
// // CHECK HR ADMIN FEATURE
// // =====================
// export const checkHrAdminFeature = (requiredFeature: string) => {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) throw new AppError("Unauthorized", 401);

//       if (req.user.role !== "HR_ADMIN") {
//         return res.status(403).json({
//           status: "error",
//           message: "Forbidden: Only HR_ADMIN can access this feature",
//         });
//       }

//       const paket = await fetchPaketData(req.user.paketId);

//       if (!paket.permissions.includes(requiredFeature)) {
//         return res.status(403).json({
//           status: "error",
//           message: `Your plan (${paket.name}) does not include permission: ${requiredFeature}`,
//         });
//       }

//       next();
//     } catch (error: any) {
//       console.error("HR_ADMIN permission check error:", error.message);
//       return res.status(error.statusCode || 500).json({
//         status: "error",
//         message: error.message || "Internal server error",
//       });
//     }
//   };
// };


import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@config/env";
import axios from "axios";
import { AppError } from "@shared/errors/AppError";
import { RoleUseCase } from "@application/usecase/member/roleUseCase";

interface AuthRequest extends Request {
  user?: any;
}

// -----------------------------
// Helper: parse cookies header
// -----------------------------
const parseCookieHeader = (cookieHeader?: string) => {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  // cookieHeader example: "a=1; b=2"
  cookieHeader.split(";").forEach((pair) => {
    const idx = pair.indexOf("=");
    if (idx > -1) {
      const name = pair.slice(0, idx).trim();
      const val = pair.slice(idx + 1).trim();
      if (name) result[name] = decodeURIComponent(val);
    }
  });
  return result;
};

// -----------------------------
// Helper: ambil token dengan aman
// - return token tanpa "Bearer " prefix
// -----------------------------
const getTokenFromRequest = (req: Request): string | undefined => {
  // 1) Dari req.cookies (jika tersedia)
  const cookieToken = (req as any).cookies?.accessToken;
  if (cookieToken && typeof cookieToken === "string") {
    return cookieToken.trim();
  }

  // 2) Dari header Cookie (jika cookie-parser tidak dipasang atau req.cookies kosong)
  const cookieHeader = req.headers["cookie"]?.toString();
  if (cookieHeader) {
    const parsed = parseCookieHeader(cookieHeader);
    if (parsed.accessToken) return parsed.accessToken;
  }

  // 3) Dari x-access-token header (mendukung array atau string)
  const xAccess = req.headers["x-access-token"];
  if (Array.isArray(xAccess) && xAccess.length) {
    return (xAccess[0] as string).trim();
  }
  if (typeof xAccess === "string" && xAccess.trim()) {
    return xAccess.trim();
  }

  // 4) Dari authorization header (mendukung array atau string)
  const auth = req.headers["authorization"];
  let rawAuth: string | undefined;
  if (Array.isArray(auth) && auth.length) rawAuth = auth[0] as string;
  else if (typeof auth === "string") rawAuth = auth;

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
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Token is required",
      });
    }

    // Verifikasi token (config.ACCESS_TOKEN adalah secret)
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.ACCESS_TOKEN) as JwtPayload;
    } catch (err) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid or expired token",
      });
    }

    // Attach payload ke req.user
    req.user = decoded;

    next();
  } catch (error) {
    // fallback error
    console.error("authMiddleware error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// =====================
// HELPER: GET PAKET DATA
// (tetap sama tetapi perbaiki sedikit penanganan axios err)
// =====================
const fetchPaketData = async (paketId: string) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/api/v1/paket/packages/${paketId}`, { timeout: 5000 });
    const paket = response.data.data;
    if (!paket || !Array.isArray(paket.permissions)) {
      throw new AppError("Invalid package data", 500);
    }
    return paket;
  } catch (err: any) {
    if (err.response) {
      // layanan paket tidak tersedia / error dari service paket
      throw new AppError("Paket service unavailable", 503);
    }
    throw new AppError("Internal server error", 500);
  }
};

// =====================
// HELPER: GET ROLE DATA
// - token param harus berupa raw token (tanpa "Bearer " prefix)
// =====================
const fetchRoleData = async (companyId: string, token: string) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/api/v1/roles/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // kita pastikan di caller menambahkan prefix
      },
      timeout: 5000,
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new AppError("Invalid role data", 500);
    }

    return response.data.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401) throw new AppError("Unauthorized to access role service", 401);
      throw new AppError("Role service unavailable", 503);
    }
    throw new AppError("Internal server error", 500);
  }
};

// =====================
// CHECK PERMISSION (OPTIMIZED - Direct DB Query)
// =====================
import { MemberRespository } from "@application/../infrastructure/repositories/member/memberRespository";
import PackageModel from "@infrastructure/database/models/paket/PackageModel";

const memberRepository = new MemberRespository();

// Cache for permissions per request
const getPermissionsFromDB = async (userId: string): Promise<{ role: string; permissions: string[] }> => {
  const member = await memberRepository.findById(userId);
  if (!member) {
    throw new AppError("User not found", 404);
  }
  return {
    role: member.role || "",
    permissions: member.permissions || [],
  };
};

const getPaketPermissionsFromDB = async (paketId: string): Promise<{ name: string; permissions: string[] }> => {
  const paket = await PackageModel.findByPk(paketId);
  if (!paket) {
    throw new AppError("Package not found", 404);
  }
  return {
    name: paket.name,
    permissions: paket.features || [], // features = permissions in PackageModel
  };
};

export const checkFeaturePermission = (requiredFeature: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized", 401);

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
        const { CompanyModel } = await import("@infrastructure/database/models");
        const company = await CompanyModel.findByPk(req.user.companyId);
        if (company?.paketId) {
          req.user.paketId = company.paketId;
        } else {
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
    } catch (error: any) {
      console.error("Permission check error:", error?.message || error);
      return res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "Internal server error",
      });
    }
  };
};

// =====================
// CHECK HR ADMIN FEATURE (OPTIMIZED)
// =====================
export const checkHrAdminFeature = (requiredFeature: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized", 401);

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
        const { CompanyModel } = await import("@infrastructure/database/models");
        const company = await CompanyModel.findByPk(req.user.companyId);
        if (company?.paketId) {
          req.user.paketId = company.paketId;
        } else {
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
    } catch (error: any) {
      console.error("HR_ADMIN permission check error:", error?.message || error);
      return res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "Internal server error",
      });
    }
  };
};

