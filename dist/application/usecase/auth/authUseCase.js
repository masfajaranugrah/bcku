"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const AppError_1 = require("../../../shared/errors/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@config/env");
const crypto_1 = __importDefault(require("crypto"));
const sendVerificationEmail_1 = require("../../../shared/utils/sendVerificationEmail");
const generateVerificationToken_1 = require("../../../shared/utils/generateVerificationToken");
const sendResetPasswordEmail_1 = require("../../../shared/utils/sendResetPasswordEmail");
const generateEmailVerificationToken_1 = __importDefault(require("../../../shared/utils/generateEmailVerificationToken"));
const models_1 = require("@infrastructure/database/models");
class AuthUseCase {
    constructor(userRepository, roleRepository, companyRepository, departmentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.departmentRepository = departmentRepository;
    }
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
    async register(data) {
        // 1️⃣ Cek email sudah terdaftar
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing)
            throw new AppError_1.AppError("Email sudah terdaftar", 400);
        // 2️⃣ Buat atau ambil company
        let companyId;
        let registeredCompanyName;
        if (data.companyId) {
            // pakai company yang sudah ada
            const company = await this.companyRepository.findById(data.companyId);
            if (!company)
                throw new AppError_1.AppError("Company tidak ditemukan", 400);
            companyId = company.id;
            registeredCompanyName = company.name;
        }
        else {
            // buat company baru
            const companyName = typeof data.companyName === "string" && data.companyName.trim().length > 0
                ? data.companyName.trim()
                : "DEFAULT";
            // default paketId untuk company baru
            const defaultPaketId = "427a8445-8bbf-4cc8-90bd-bfbb7d3580fb";
            let company = await this.companyRepository.findByName(companyName);
            // ⚡ Cek jika company sudah ada tapi di-banned
            if (company && !company.isActive) {
                throw new AppError_1.AppError("Maaf, akun perusahaan Anda di-banned", 403);
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
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        // 6️⃣ Generate kode verifikasi & token email
        const { token, tokenExpiresAt } = (0, generateVerificationToken_1.generateVerificationToken)();
        const { tokenVerification, tokenVerificationExpiresAt } = (0, generateEmailVerificationToken_1.default)();
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
        await (0, sendVerificationEmail_1.sendVerificationEmail)(user.email, token, tokenExpiresAt, tokenVerification, tokenVerificationExpiresAt);
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
    async registerMember(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing)
            throw new AppError_1.AppError("Email sudah terdaftar", 400);
        // pastikan companyId valid
        if (!data.companyId)
            throw new AppError_1.AppError("Company ID wajib diisi", 400);
        const company = await this.companyRepository.findById(data.companyId);
        if (!company)
            throw new AppError_1.AppError("Company tidak ditemukan", 400);
        const companyId = company.id;
        const registeredCompanyName = company.name;
        // pastikan department valid (HR admin memilih)
        if (!data.departmentId) {
            throw new AppError_1.AppError("Departemen wajib dipilih", 400);
        }
        const department = await this.departmentRepository.findById(data.departmentId);
        if (!department || department.companyId !== companyId) {
            throw new AppError_1.AppError("Departemen tidak valid untuk company ini", 400);
        }
        // pastikan role valid
        let roleId = data.roleId;
        if (!roleId) {
            const defaultRole = await this.roleRepository.findByNameAndCompany("EMPLOYEE", companyId);
            const role = defaultRole || await this.roleRepository.create(companyId, {
                name: "EMPLOYEE",
                description: "Role default untuk karyawan",
            });
            if (!role?.id)
                throw new Error("Role ID tidak ditemukan");
            roleId = role.id;
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const { token, tokenExpiresAt } = (0, generateVerificationToken_1.generateVerificationToken)();
        const { tokenVerification, tokenVerificationExpiresAt } = (0, generateEmailVerificationToken_1.default)();
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
        await (0, sendVerificationEmail_1.sendVerificationEmail)(user.email, token, tokenExpiresAt, tokenVerification, tokenVerificationExpiresAt);
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
    async login(data, res) {
        const user = await models_1.UserModel.findOne({
            where: { email: data.email },
            include: [
                {
                    model: models_1.RoleModel,
                    as: "role",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.CompanyModel,
                    as: "company",
                    attributes: ["id", "name", "paketId", "isActive"],
                    include: [
                        {
                            model: models_1.PaketModel,
                            as: "paket",
                            attributes: ["id", "name"],
                        },
                    ],
                },
            ]
        });
        if (!user)
            throw new AppError_1.AppError("Email tidak terdaftar", 400);
        if (!user.isVerified)
            throw new AppError_1.AppError("Akun belum diverifikasi, silahkan cek email", 403);
        // ⚡ Cek jika company di-banned
        if (user.company && !user.company.isActive) {
            throw new AppError_1.AppError("Mohon maaf, perusahaan Anda di-banned oleh admin", 403);
        }
        // DEBUG: Log company info
        console.log("🔍 DEBUG LOGIN - user.company:", JSON.stringify(user.company, null, 2));
        console.log("🔍 DEBUG LOGIN - user.company?.paketId:", user.company?.paketId);
        const isMatch = await bcrypt_1.default.compare(data.password, user.password);
        if (!isMatch)
            throw new AppError_1.AppError("Password salah", 400);
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
        const accessToken = jsonwebtoken_1.default.sign(payload, env_1.config.ACCESS_TOKEN, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, companyId: user.companyId, paketId: user.company?.paketId || null }, env_1.config.REFRESH_TOKEN, { expiresIn: "7d" });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: env_1.config.isProd,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env_1.config.isProd,
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
                paketId: user.company?.paketId || null, // ⚡ ambil dari company
            },
            accessToken,
            refreshToken,
        };
    }
    async verifyById(userId, code) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError("User tidak ditemukan", 404);
        }
        else if (user.isVerified) {
            throw new AppError_1.AppError("User sudah terverifikasi", 400);
        }
        else if (user.verificationCode !== code) {
            throw new AppError_1.AppError("Kode verifikasi salah", 400);
        }
        else if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
            throw new AppError_1.AppError("Kode verifikasi sudah kadaluwarsa", 400);
        }
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await this.userRepository.update(userId, user);
        return { message: "Verifikasi berhasil, Anda sekarang bisa login" };
    }
    async resendVerification(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError("Email tidak ditemukan", 404);
        if (user.isVerified)
            throw new AppError_1.AppError("Akun sudah diverifikasi", 400);
        const { token, tokenExpiresAt } = (0, generateVerificationToken_1.generateVerificationToken)();
        user.verificationCode = token;
        user.verificationCodeExpires = tokenExpiresAt;
        user.verificationEmailToken = crypto_1.default.randomBytes(32).toString("hex");
        user.verificationEmailTokenExpires = new Date(Date.now() + 5 * 60 * 1000);
        // kirim email verifikasi
        await (0, sendVerificationEmail_1.sendVerificationEmail)(user.email, user.verificationCode, user.verificationCodeExpires, user.verificationEmailToken, user.verificationEmailTokenExpires);
        if (!user.id)
            throw new AppError_1.AppError("User ID tidak ditemukan", 404);
        // update user di database
        await this.userRepository.update(user.id, user);
        return {
            message: "Kode verifikasi baru sudah dikirim ke email Anda",
            id: user.id,
            email: user.email,
        };
    }
    async requestResetPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError("Email tidak ditemukan", 404);
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        if (!user.id)
            throw new AppError_1.AppError("User ID tidak ditemukan", 404);
        await this.userRepository.update(user.id, user);
        try {
            await (0, sendResetPasswordEmail_1.sendResetPasswordEmail)(user.email, token, expires);
            console.log(`✅ Reset password email sent to ${user.email}`);
        }
        catch (error) {
            console.error("❌ Gagal mengirim email reset password:", error);
            throw new AppError_1.AppError("Gagal mengirim email reset password", 500);
        }
        // 5. Return response (tidak perlu expose token ke client)
        return { message: "Link reset password sudah dikirim ke email Anda", token };
    }
    async updatePassword(token, newpassword, confirmpassword) {
        if (newpassword !== confirmpassword) {
            throw new AppError_1.AppError("pasword tidak cocok", 400);
        }
        const user = await this.userRepository.findByToken(token);
        if (!user)
            throw new AppError_1.AppError("Token tidak valid atau sudah kadaluwarsa", 400);
        if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            throw new AppError_1.AppError("Token reset password sudah kadaluwarsa");
        }
        const hashedPassword = await bcrypt_1.default.hash(newpassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await this.userRepository.update(user.id, user);
        return { message: "Password berhasil direset" };
    }
    async verifyByToken(verificationEmailToken) {
        const user = await this.userRepository.findByVerificationToken(verificationEmailToken);
        if (!user)
            throw new AppError_1.AppError("Token tidak valid", 400);
        if (user.verificationEmailTokenExpires < new Date()) {
            throw new AppError_1.AppError("Token sudah kedaluwarsa", 400);
        }
        user.isVerified = true;
        user.verificationEmailToken = null;
        user.verificationEmailTokenExpires = null;
        await user.save();
        return { message: "Email berhasil diverifikasi melalui link" };
    }
    async logout(res) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: env_1.config.isProd,
            sameSite: "strict",
            path: "/"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env_1.config.isProd,
            sameSite: "strict",
            path: "/"
        });
        return { message: "logout berhasil" };
    }
}
exports.AuthUseCase = AuthUseCase;
//# sourceMappingURL=authUseCase.js.map