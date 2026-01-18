export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  companyId?: string | null;
  departmentId?: string | null;  
  permissionIds?: string[];
  profilePicture?: string | null;
  isVerified?: boolean;
  verificationCode?: string | null;
  verificationCodeExpires?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  verificationEmailToken?: string | null;
  verificationEmailTokenExpires?: Date | null;

  role?: {
    id: string;
    name: string;
    description?: string | null;
  };

  permissions?: {
    id: string;
    name: string;
    description?: string | null;
  }[];

  department?: {    
    id: string;
    name: string;
    description?: string | null;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
