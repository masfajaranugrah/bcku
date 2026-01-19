import { UserRepository } from "../../../infrastructure/repositories/auth/userRepository";
import { AuthUserDTO } from "../../dtos/AuthUserDTO";
import { Response } from "express";
import { RoleRepository } from "../../../infrastructure/repositories/member/roleRepository";
import { CompanyRepository } from "@infrastructure/repositories/company/companyRepository";
import { DepartmentRepository } from "@infrastructure/repositories/department/departmentRepository";
export declare class AuthUseCase {
    private userRepository;
    private roleRepository;
    private companyRepository;
    private departmentRepository;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository, companyRepository: CompanyRepository, departmentRepository: DepartmentRepository);
    /**
     * REGISTER → untuk HR_ADMIN (buat perusahaan baru)
     * 1. Cek email
     * 2. Buat atau ambil company
     * 3. Buat role HR_ADMIN jika belum ada
     * 4. Buat department default: HR / Human Resource
     * 5. Simpan user pertama dengan role HR_ADMIN
     */
    register(data: AuthUserDTO): Promise<{
        message: string;
        data: {
            id: string | undefined;
            firstName: string;
            lastName: string;
            fullName: string;
            email: string;
            roleId: string;
            departmentId: string | null | undefined;
            companyId: string | null | undefined;
            companyName: string;
            paketId: string | null | undefined;
            isVerified: boolean | undefined;
            profilePicture: string | null | undefined;
            verificationCode: string | null | undefined;
            verificationCodeExpires: Date | null | undefined;
            verificationEmailToken: string | null | undefined;
            verificationEmailTokenExpires: Date | null | undefined;
        };
    }>;
    /**
     * REGISTER MEMBER → untuk HR_ADMIN menambahkan anggota tim
     * 1. Cek email
     * 2. Ambil company dari HR admin
     * 3. Pilih atau buat role sesuai kebutuhan
     * 4. Pilih departemen (harus diisi)
     * 5. Simpan user baru
     */
    registerMember(data: AuthUserDTO): Promise<{
        id: string | undefined;
        firstName: string;
        lastName: string;
        email: string;
        roleId: string;
        departmentId: string | null | undefined;
        companyId: string;
        registeredCompanyName: string;
        isVerified: boolean | undefined;
        profilePicture: string | null;
    }>;
    login(data: AuthUserDTO, res: Response): Promise<{
        message: string;
        user: {
            id: any;
            fullName: string;
            email: any;
            roleId: any;
            companyId: any;
            departmentId: any;
            status: any;
            paketId: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    verifyById(userId: string, code: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
        id: string;
        email: string;
    }>;
    requestResetPassword(email: string): Promise<{
        message: string;
        token: string;
    }>;
    updatePassword(token: string, newpassword: string, confirmpassword: string): Promise<{
        message: string;
    }>;
    verifyByToken(verificationEmailToken: string): Promise<{
        message: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=authUseCase.d.ts.map