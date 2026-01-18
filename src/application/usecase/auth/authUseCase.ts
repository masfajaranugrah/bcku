import { Role } from "@domain/entities/member/Roles";
import { UserRepository } from "../../../infrastructure/repositories/auth/userRepository";
import { AuthUserDTO } from "../../dtos/AuthUserDTO";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "@config/env";
import { Response } from "express";
import crypto from "crypto";
import { sendVerificationEmail } from "../../../shared/utils/sendVerificationEmail";
import { generateVerificationToken } from "../../../shared/utils/generateVerificationToken";
import { sendResetPasswordEmail } from "../../../shared/utils/sendResetPasswordEmail";
import generateEmailVerificationToken from "../../../shared/utils/generateEmailVerificationToken";
import { RoleRepository } from "../../../infrastructure/repositories/member/roleRepository";
import { CompanyRepository } from "@infrastructure/repositories/company/companyRepository";
import { DepartmentRepository } from "@infrastructure/repositories/department/departmentRepository";
import { RoleModel, UserModel, PaketModel, CompanyModel } from "@infrastructure/database/models";

export class AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private companyRepository: CompanyRepository,
    private departmentRepository: DepartmentRepository
  ) { }

  /**
   * REGISTER → untuk HR_ADMIN (buat perusahaan baru)
   * 1. Cek email
   * 2. Buat atau ambil company
   * 3. Buat role HR_ADMIN jika belum ada
   * 4. Buat department default: HR / Human Resource
   * 5. Simpan user pertama dengan role HR_ADMIN
   */
  //   async register(data: AuthUserDTO) {
  //     // cek email sudah terdaftar
  //     const existing = await this.userRepository.findByEmail(data.email);
  //     if (existing) throw new AppError("Email sudah terdaftar", 400);

  //     // buat atau ambil company
  //     let companyId: string;
  //     let registeredCompanyName: string;

  //     if (data.companyId) {
  //       const company = await this.companyRepository.findById(data.companyId);
  //       if (!company) throw new AppError("Company tidak ditemukan", 400);
  //       companyId = company.id;
  //       registeredCompanyName = company.name;
  //     } else {
  //       const companyName =
  //         typeof data.companyName === "string" && data.companyName.trim().length > 0
  //           ? data.companyName.trim()
  //           : "DEFAULT";


  //       const selectedPlan = data.plan && ["FREE", "BASIC", "PRO", "ENTERPRISE"].includes(data.plan)
  //   ? data.plan
  //   : "FREE";

  //       let company = await this.companyRepository.findByName(companyName);
  //       if (!company) {
  //         company = await this.companyRepository.create({
  //           name: companyName,
  //           code: null,
  //           plan: "FREE",
  //           address: null,
  //           phone: null,
  //         });
  //       }
  //       companyId = company.id;
  //       registeredCompanyName = company.name;
  //     }

  //     // pastikan role HR_ADMIN ada untuk company ini
  //     let role = await this.roleRepository.findByNameAndCompany("HR_ADMIN", companyId);
  //     if (!role) {
  //       role = await this.roleRepository.create(companyId, {
  //         name: "HR_ADMIN",
  //         description: "Role default HR Admin",
  //       });
  //     }

  //     // buat department default HR / Human Resource
  //     let department = await this.departmentRepository.findByNameAndCompany("Human Resource", companyId);
  //     if (!department) {
  //       department = await this.departmentRepository.create({
  //         name: "Human Resource",
  //         description: "Departemen HR bawaan",
  //         companyId,
  //       });
  //     }

  //     // hash password
  //     const hashedPassword = await bcrypt.hash(data.password, 10);

  //     // generate kode verifikasi & token
  //     const { token, tokenExpiresAt } = generateVerificationToken();
  //     const { tokenVerification, tokenVerificationExpiresAt } = generateEmailVerificationToken();

  //     // buat user HR Admin pertama
  //     const userToCreate = {
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       email: data.email,
  //       password: hashedPassword,
  //       isVerified: false,
  //       roleId: role.id,
  //       departmentId: department.id, // ✅ otomatis masuk ke departemen HR
  //       profilePicture: data.profilePicture ?? null,
  //       companyId,
  //       verificationCode: token,
  //       verificationCodeExpires: tokenExpiresAt,
  //       verificationEmailToken: tokenVerification,
  //       verificationEmailTokenExpires: tokenVerificationExpiresAt,
  //     };

  //     const user = await this.userRepository.create(userToCreate);

  //     // kirim email verifikasi
  //     await sendVerificationEmail(
  //       user.email,
  //       token,
  //       tokenExpiresAt,
  //       tokenVerification,
  //       tokenVerificationExpiresAt,

  //     );

  //     return {
  //   id: user.id,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: user.email,
  //   roleId: user.roleId,
  //   companyId: user.companyId,
  //   departmentId: user.departmentId,
  //   isVerified: user.isVerified,
  //   profilePicture: user.profilePicture,
  //   verificationCode: user.verificationCode,
  //   verificationCodeExpires: user.verificationCodeExpires,
  //   verificationEmailToken: user.verificationEmailToken,
  //   verificationEmailTokenExpires: user.verificationEmailTokenExpires,
  // };

  //   }
  async register(data: AuthUserDTO) {
    // 1️⃣ Cek email sudah terdaftar
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new AppError("Email sudah terdaftar", 400);

    // 2️⃣ Buat atau ambil company
    let companyId: string;
    let registeredCompanyName: string;

    if (data.companyId) {
      // pakai company yang sudah ada
      const company = await this.companyRepository.findById(data.companyId);
      if (!company) throw new AppError("Company tidak ditemukan", 400);
      companyId = company.id;
      registeredCompanyName = company.name;
    } else {
      // buat company baru
      const companyName =
        typeof data.companyName === "string" && data.companyName.trim().length > 0
          ? data.companyName.trim()
          : "DEFAULT";

      // default paketId untuk company baru
      const defaultPaketId = "427a8445-8bbf-4cc8-90bd-bfbb7d3580fb";

      let company = await this.companyRepository.findByName(companyName);

      // ⚡ Cek jika company sudah ada tapi di-banned
      if (company && !company.isActive) {
        throw new AppError("Maaf, akun perusahaan Anda di-banned", 403);
      }

      if (!company) {
        company = await this.companyRepository.create({
          name: companyName,
          code: null,
          paketId: defaultPaketId, // ✅ ganti plan → paketId
          address: null,
          phone: null,
        });
      }
      companyId = company.id;
      registeredCompanyName = company.name;
    }

    // 3️⃣ Pastikan role HR_ADMIN ada untuk company ini
    let role = await this.roleRepository.findByNameAndCompany("HR_ADMIN", companyId);
    if (!role) {
      role = await this.roleRepository.create(companyId, {
        name: "HR_ADMIN",
        description: "Role default HR Admin",
      });
    }

    // 4️⃣ Buat department default HR / Human Resource
    let department = await this.departmentRepository.findByNameAndCompany("Human Resource", companyId);
    if (!department) {
      department = await this.departmentRepository.create({
        name: "Human Resource",
        description: "Departemen HR bawaan",
        companyId,
      });
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 6️⃣ Generate kode verifikasi & token email
    const { token, tokenExpiresAt } = generateVerificationToken();
    const { tokenVerification, tokenVerificationExpiresAt } = generateEmailVerificationToken();

    // 7️⃣ Buat user HR Admin pertama
    const userToCreate = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      isVerified: false,
      roleId: role.id,
      departmentId: department.id,
      profilePicture: data.profilePicture ?? null,
      companyId,
      verificationCode: token,
      verificationCodeExpires: tokenExpiresAt,
      verificationEmailToken: tokenVerification,
      verificationEmailTokenExpires: tokenVerificationExpiresAt,
    };

    const user = await this.userRepository.create(userToCreate);

    // 8️⃣ Kirim email verifikasi
    await sendVerificationEmail(
      user.email,
      token,
      tokenExpiresAt,
      tokenVerification,
      tokenVerificationExpiresAt
    );

    // 9️⃣ Return response
    return {
      message: "Perusahaan dan akun HR Admin berhasil dibuat",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        roleId: user.roleId,
        departmentId: user.departmentId,
        companyId: user.companyId,
        companyName: registeredCompanyName,
        paketId: companyId ? (await this.companyRepository.findById(companyId))?.paketId : null, // ✅ return paketId
        isVerified: user.isVerified,
        profilePicture: user.profilePicture,
        verificationCode: user.verificationCode,
        verificationCodeExpires: user.verificationCodeExpires,
        verificationEmailToken: user.verificationEmailToken,
        verificationEmailTokenExpires: user.verificationEmailTokenExpires,
      },
    };
  }


  /**
   * REGISTER MEMBER → untuk HR_ADMIN menambahkan anggota tim
   * 1. Cek email
   * 2. Ambil company dari HR admin
   * 3. Pilih atau buat role sesuai kebutuhan
   * 4. Pilih departemen (harus diisi)
   * 5. Simpan user baru
   */
  async registerMember(data: AuthUserDTO) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new AppError("Email sudah terdaftar", 400);

    // pastikan companyId valid
    if (!data.companyId) throw new AppError("Company ID wajib diisi", 400);
    const company = await this.companyRepository.findById(data.companyId);
    if (!company) throw new AppError("Company tidak ditemukan", 400);

    const companyId = company.id;
    const registeredCompanyName = company.name;

    // pastikan department valid (HR admin memilih)
    if (!data.departmentId) {
      throw new AppError("Departemen wajib dipilih", 400);
    }
    const department = await this.departmentRepository.findById(data.departmentId);
    if (!department || department.companyId !== companyId) {
      throw new AppError("Departemen tidak valid untuk company ini", 400);
    }

    // pastikan role valid
    let roleId = data.roleId;

    if (!roleId) {
      const defaultRole = await this.roleRepository.findByNameAndCompany("EMPLOYEE", companyId);
      const role = defaultRole || await this.roleRepository.create(companyId, {
        name: "EMPLOYEE",
        description: "Role default untuk karyawan",
      });

      if (!role?.id) throw new Error("Role ID tidak ditemukan");

      roleId = role.id;
    }


    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { token, tokenExpiresAt } = generateVerificationToken();
    const { tokenVerification, tokenVerificationExpiresAt } = generateEmailVerificationToken();

    const userToCreate = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      isVerified: true,
      roleId,
      companyId,

      departmentId: data.departmentId, // ✅ dipilih manual oleh HR Admin
      profilePicture: data.profilePicture ?? null,
      verificationCode: token,
      verificationCodeExpires: tokenExpiresAt,
      verificationEmailToken: tokenVerification,
      verificationEmailTokenExpires: tokenVerificationExpiresAt,
    };

    const user = await this.userRepository.create(userToCreate);

    await sendVerificationEmail(
      user.email,
      token,
      tokenExpiresAt,
      tokenVerification,
      tokenVerificationExpiresAt
    );

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      departmentId: user.departmentId,
      companyId,
      registeredCompanyName,
      isVerified: user.isVerified,
      profilePicture: user.profilePicture ?? null,
    };
  }




  async login(data: AuthUserDTO, res: Response) {
    const user = await UserModel.findOne({
      where: { email: data.email },
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: CompanyModel,
          as: "company",
          attributes: ["id", "name", "paketId", "isActive"],
          include: [
            {
              model: PaketModel,
              as: "paket",
              attributes: ["id", "name"],
            },
          ],
        },
      ]

    });

    if (!user) throw new AppError("Email tidak terdaftar", 400);
    if (!user.isVerified) throw new AppError("Akun belum diverifikasi, silahkan cek email", 403);

    // ⚡ Cek jika company di-banned
    if (user.company && !user.company.isActive) {
      throw new AppError("Mohon maaf, perusahaan Anda di-banned oleh admin", 403);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new AppError("Password salah", 400);
    const payload = {
      id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      roleId: user.role?.id,
      companyId: user.companyId,
      departmentId: user.departmentId,
      status: user.isVerified,
      paketId: user.company?.paketId || null,
    };


    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN, { expiresIn: "15m" });
    const refreshToken = jwt.sign(
      { id: user.id, companyId: user.companyId, paketId: user.userPaket?.id || null },
      config.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.isProd,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.isProd,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return {
      message: "Login berhasil",
      user: {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        roleId: user.roleId,
        companyId: user.companyId,
        departmentId: user.departmentId,
        status: user.isVerified,
        paketId: user.userPaket?.id || null, // ⚡ ambil dari relasi
      },
      accessToken,
      refreshToken,
    };
  }


  async verifyById(userId: string, code: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User tidak ditemukan", 404);
    } else if (user.isVerified) {
      throw new AppError("User sudah terverifikasi", 400);
    } else if (user.verificationCode !== code) {
      throw new AppError("Kode verifikasi salah", 400);
    } else if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      throw new AppError("Kode verifikasi sudah kadaluwarsa", 400);
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await this.userRepository.update(userId, user);

    return { message: "Verifikasi berhasil, Anda sekarang bisa login" };
  }


  async resendVerification(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("Email tidak ditemukan", 404);
    if (user.isVerified) throw new AppError("Akun sudah diverifikasi", 400);

    const { token, tokenExpiresAt } = generateVerificationToken();
    user.verificationCode = token;
    user.verificationCodeExpires = tokenExpiresAt;

    user.verificationEmailToken = crypto.randomBytes(32).toString("hex");
    user.verificationEmailTokenExpires = new Date(Date.now() + 5 * 60 * 1000);
    // kirim email verifikasi
    await sendVerificationEmail(
      user.email,
      user.verificationCode,
      user.verificationCodeExpires,
      user.verificationEmailToken,
      user.verificationEmailTokenExpires
    );

    if (!user.id) throw new AppError("User ID tidak ditemukan", 404);

    // update user di database
    await this.userRepository.update(user.id, user);

    return {
      message: "Kode verifikasi baru sudah dikirim ke email Anda",
      id: user.id,
      email: user.email,
    };
  }

  async requestResetPassword(email: string) {

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("Email tidak ditemukan", 404);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;

    if (!user.id) throw new AppError("User ID tidak ditemukan", 404);
    await this.userRepository.update(user.id, user);

    try {
      await sendResetPasswordEmail(user.email, token, expires);
      console.log(`✅ Reset password email sent to ${user.email}`);
    } catch (error) {
      console.error("❌ Gagal mengirim email reset password:", error);
      throw new AppError("Gagal mengirim email reset password", 500);
    }

    // 5. Return response (tidak perlu expose token ke client)
    return { message: "Link reset password sudah dikirim ke email Anda", token };
  }

  async updatePassword(token: string, newpassword: string, confirmpassword: string) {

    if (newpassword !== confirmpassword) {
      throw new AppError("pasword tidak cocok", 400);
    }

    const user = await this.userRepository.findByToken(token);
    if (!user) throw new AppError("Token tidak valid atau sudah kadaluwarsa", 400);

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new AppError("Token reset password sudah kadaluwarsa")
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.userRepository.update(user.id!, user);

    return { message: "Password berhasil direset" };
  }

  async verifyByToken(verificationEmailToken: string) {
    const user = await this.userRepository.findByVerificationToken(verificationEmailToken);

    if (!user) throw new AppError("Token tidak valid", 400);
    if (user.verificationEmailTokenExpires < new Date()) {
      throw new AppError("Token sudah kedaluwarsa", 400);
    }

    user.isVerified = true;
    user.verificationEmailToken = null;
    user.verificationEmailTokenExpires = null;

    await user.save();

    return { message: "Email berhasil diverifikasi melalui link" };
  }


  async logout(res: Response) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: config.isProd,
      sameSite: "strict",
      path: "/"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.isProd,
      sameSite: "strict",
      path: "/"
    });

    return { message: "logout berhasil" }
  }
}