export interface AuthUserDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  roleId: string;
  companyId?: string | null;
  departmentId?: string | null;

  permissionIds?: string[];
  companyName?: string;
  profilePicture?: string | null;
  isVerified?: boolean;
  verificationEmailToken?: string | null;
  verificationEmailTokenExpires?: Date | null;
  verificationCode?: string | null;
  verificationCodeExpires?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;

  // Relasi
  role?: {
    id: string;
    name: string;
    description?: string | null;
  };

  company?: {
    id: string;
    name: string;
  };

  department?: {
    id: string;
    name: string;
  };

  permissions?: {
    id: string;
    name: string;
    description?: string | null;
  }[];
}
