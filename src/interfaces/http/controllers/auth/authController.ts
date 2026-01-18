import { Request, Response, NextFunction } from "express";
import { AuthUseCase } from "@application/usecase/auth/authUseCase";
import { UserRepository } from "@infrastructure/repositories/auth/userRepository";
import { CompanyRepository } from "@infrastructure/repositories/company/companyRepository";
import { RoleRepository } from "@infrastructure/repositories/member/roleRepository";
import { DepartmentRepository } from "@infrastructure/repositories/department/departmentRepository";
import { AuthUserDTO } from "@application/dtos/AuthUserDTO";
import { AppError } from "@shared/errors/AppError";
import { AppSuccess } from "@shared/success/AppSuccess";
import { config } from "@config/env";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const companyRepository = new CompanyRepository();
const departmentRepository = new DepartmentRepository();
const authUseCase = new AuthUseCase(userRepository, roleRepository, companyRepository, departmentRepository);

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    fullName: string;
    roleId: string;
    companyId: string;
    status: boolean;
  };
}

export class authController {


  // ======================================================
  // REGISTER — untuk perusahaan baru (HR_ADMIN utama)
  // ======================================================
  //   static async register(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { firstName, lastName, email, password, companyName } = req.body;

  //       if (!firstName || !lastName || !email || !password) {
  //         throw new AppError("Semua field wajib diisi", 400);
  //       }

  //       // 1️⃣ Buat atau ambil company
  //       let company = await companyRepository.findByName(companyName);
  //       if (!company) {
  //         company = await companyRepository.create({
  //           name: companyName,
  //           code: null,
  //           plan: "FREE",
  //           address: null,
  //           phone: null,
  //         });
  //       }

  //       const companyId = company.id!;
  //       const registeredCompanyName = company.name!;

  //       // 2️⃣ Pastikan role HR_ADMIN per company
  //       let role = await roleRepository.findByNameAndCompany("HR_ADMIN", companyId);
  //       if (!role) {
  //         role = await roleRepository.create(companyId, {
  //           name: "HR_ADMIN",
  //           description: "Role default HR Admin",
  //         });
  //       }

  //       // 3️⃣ Buat departemen default HR Admin jika belum ada
  //       let department = await departmentRepository.findByNameAndCompany("HR & Admin", companyId);
  //       if (!department) {
  //         department = await departmentRepository.create({
  //           name: "HR & Admin",
  //           companyId,
  //           description: "Departemen default untuk HR Admin",
  //         });
  //       }

  //       // 4️⃣ Siapkan data user utama
  //       const profilePicture =
  //         req.file?.path?.split("uploads/")[1]?.replace(/\\/g, "/") || null;

  //       const registerDTO: AuthUserDTO = {
  //         firstName,
  //         lastName,
  //         email,
  //         password,
  //         roleId: role.id!,
  //         profilePicture,
  //         companyId,
  //         departmentId: department.id!,
  //       };

  //       const user = await authUseCase.register(registerDTO);

  //       return res.status(201).json({
  //         message: "Perusahaan dan akun HR Admin berhasil dibuat",
  //         data: {
  //           id: user.id,
  //           fullName: `${user.firstName} ${user.lastName}`,
  //           email: user.email,
  //           roleId: user.roleId,
  //           departmentId: user.departmentId,
  //           companyId: user.companyId,
  //           companyName: registeredCompanyName,
  //           isVerified: user.isVerified ?? false,
  //           profilePicture: user.profilePicture
  //             ? `${config.BASE_URL}/uploads/${user.profilePicture}`
  //             : null,
  //           verificationCode: user.verificationCode ?? null,
  //           verificationCodeExpires: user.verificationCodeExpires ?? null,
  //           verificationEmailToken: user.verificationEmailToken ?? null,
  //           verificationEmailTokenExpires: user.verificationEmailTokenExpires ?? null,
  //         },
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  // }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, companyName } = req.body;

      // Validasi input
      if (!firstName || !lastName || !email || !password) {
        throw new AppError("Semua field wajib diisi", 400);
      }

      // 🔄 Default Product Plan diganti ke id product
      const defaultProductId = "427a8445-8bbf-4cc8-90bd-bfbb7d3580fb";

      // 1️⃣ Buat atau ambil company
      let company = await companyRepository.findByName(companyName?.trim() || "DEFAULT");

      if (!company) {
        company = await companyRepository.create({
          name: companyName?.trim() || "DEFAULT",
          code: null,
          paketId: defaultProductId,
          address: null,
          phone: null,
        });
      }

      const companyId = company.id!;
      const registeredCompanyName = company.name!;

      // 2️⃣ Pastikan role HR_ADMIN per company
      let role = await roleRepository.findByNameAndCompany("HR_ADMIN", companyId);
      if (!role) {
        role = await roleRepository.create(companyId, {
          name: "HR_ADMIN",
          description: "Role default HR Admin",
        });
      }

      // 3️⃣ Buat departemen default HR Admin jika belum ada
      let department = await departmentRepository.findByNameAndCompany("HR & Admin", companyId);
      if (!department) {
        department = await departmentRepository.create({
          name: "HR & Admin",
          companyId,
          description: "Departemen default untuk HR Admin",
        });
      }

      // 4️⃣ Siapkan data user utama
      const profilePicture =
        req.file?.path?.split("uploads/")[1]?.replace(/\\/g, "/") || null;

      const registerDTO = {
        firstName,
        lastName,
        email,
        password,
        roleId: role.id!,
        profilePicture,
        companyId,
        departmentId: department.id!,
        company: { id: companyId, name: registeredCompanyName },
      };

      // 5️⃣ Register user
      const user = await authUseCase.register(registerDTO);

      // 6️⃣ Return response
      return res.status(201).json({
        message: user.message,
        data: {
          id: user.data.id,
          fullName: user.data.fullName,
          email: user.data.email,
          roleId: user.data.roleId,
          departmentId: user.data.departmentId,
          companyId: user.data.companyId,
          companyName: user.data.companyName,
          plan: defaultProductId,  // <-- di-return ke frontend
          isVerified: user.data.isVerified ?? false,
          profilePicture: user.data.profilePicture
            ? `${config.BASE_URL}/uploads/${user.data.profilePicture}`
            : null,
          verificationCode: user.data.verificationCode ?? null,
          verificationCodeExpires: user.data.verificationCodeExpires ?? null,
          verificationEmailToken: user.data.verificationEmailToken ?? null,
          verificationEmailTokenExpires: user.data.verificationEmailTokenExpires ?? null,
        },
      });
    } catch (error) {
      next(error);
    }
  }


  // ======================================================
  // REGISTER MEMBER — untuk HR Admin menambah karyawan
  // ======================================================
  static async registerMember(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      console.log("📦 REQ.BODY:", req.body);
      const { firstName, lastName, email, password, roleId, departmentId } = req.body;
      console.log("📦 Destructured departmentId:", departmentId);

      const { companyId } = req.params;

      if (!firstName || !lastName || !email || !password) {
        throw new AppError("Semua field wajib diisi", 400);
      }

      if (!companyId) throw new AppError("Company ID tidak ditemukan", 400);

      // 🔍 Pastikan department valid milik company ini
      const department = await departmentRepository.findByIdAndCompany(departmentId, companyId);
      if (!department) throw new AppError("Department tidak valid untuk company ini", 400);

      // 🔍 Pastikan role valid
      let finalRoleId: string;
      if (roleId) {
        const role = await roleRepository.findById(roleId, companyId);
        if (!role) throw new AppError("Role tidak valid untuk company ini", 400);
        finalRoleId = role.id!;
      } else {
        // Buat role default EMPLOYEE
        let role = await roleRepository.findByNameAndCompany("EMPLOYEE", companyId);
        if (!role) {
          role = await roleRepository.create(companyId, {
            name: "EMPLOYEE",
            description: "Role default untuk karyawan",
          });
        }
        finalRoleId = role.id!;
      }

      const profilePicture =
        req.file?.path?.split("uploads/")[1]?.replace(/\\/g, "/") || null;

      const registerDTO: AuthUserDTO = {
        firstName,
        lastName,
        email,
        password,
        roleId: finalRoleId,
        profilePicture,
        companyId: companyId,
        departmentId: department.id!,
        isVerified: true,
      };

      const user = await authUseCase.registerMember(registerDTO);

      return res.status(201).json({
        message: "Karyawan baru berhasil dibuat",
        data: {
          id: user.id,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          roleId: user.roleId,
          departmentId: user.departmentId,
          companyId: user.companyId,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture
            ? `${config.BASE_URL}/uploads/${user.profilePicture}`
            : null,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // ======================================================
  // LOGIN, VERIFICATION, RESET PASSWORD, LOGOUT (sama seperti sebelumnya)
  // ======================================================
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authUseCase.login({ email, password } as AuthUserDTO, res);

      const { user, accessToken, refreshToken } = result;

      return res.status(200).json({
        status: "success",
        message: "Login berhasil",
        data: { user, accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  }

  static async verification(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { code } = req.body;

      if (!token && !code) throw new AppError("Token atau kode verifikasi harus disediakan", 400);

      const result = token
        ? await authUseCase.verifyByToken(token)
        : await authUseCase.verifyById(req.body.userId, code);

      return res.status(200).json({ message: result?.message || "Verifikasi berhasil" });
    } catch (error) {
      next(error);
    }
  }

  static async sendCodeVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) throw new AppError("Email wajib diisi", 400);

      const result = await authUseCase.resendVerification(email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) throw new AppError("Email wajib diisi", 400);

      const result = await authUseCase.requestResetPassword(email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const { newPassword, confirmPassword } = req.body;
      if (!token || !newPassword || !confirmPassword)
        throw new AppError("Semua field wajib diisi", 400);

      const result = await authUseCase.updatePassword(token, newPassword, confirmPassword);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const result = await authUseCase.logout(res);
      return res.status(200).json(new AppSuccess("Logout berhasil", result, 200));
    } catch (error) {
      return res.status(500).json(new AppError("Terjadi kesalahan pada server", 500));
    }
  }
}
