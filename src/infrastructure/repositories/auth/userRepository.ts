import userModel from "@infrastructure/database/models/auth/userModel";
import { User } from "@domain/entities/auth/User";
import { Op } from "sequelize";
import { RoleModel, DepartmentModel } from "@infrastructure/database/models"; // ✅ tambahkan DepartmentModel
import bcrypt from "bcrypt";

export class UserRepository {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(user: Partial<User>): Promise<User> {
    const created = await userModel.create(user);
    return created.toJSON() as User;
  }

  async findById(id: string): Promise<User | null> {
    const user = await userModel.findByPk(id, {
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: DepartmentModel,
          as: "department", 
          attributes: ["id", "name"],
        },
      ],
    });
    return user ? (user.toJSON() as User) : null;
  }

  async findAll(): Promise<User[] | null> {
    const users = await userModel.findAll({
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: DepartmentModel,
          as: "department",
          attributes: ["id", "name"],
        },
      ],
    });

    return users.length > 0 ? users.map((u: any) => u.toJSON() as User) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({
      where: { email },
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: DepartmentModel,
          as: "department",
          attributes: ["id", "name"], // ✅ include department juga
        },
      ],
    });

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      companyId: user.companyId,
      password: user.password,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roleId: user.role?.id || null,
      roleName: user.role?.name || null,
      departmentId: user.department?.id || null,   // ✅
      departmentName: user.department?.name || null, // ✅
      profilePicture: user.profilePicture ?? null,
      verificationCode: user.verificationCode,
      verificationCodeExpires: user.verificationCodeExpires,
      verificationEmailToken: user.verificationEmailToken,
      verificationEmailTokenExpires: user.verificationEmailTokenExpires,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpires: user.resetPasswordExpires,
    } as User;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await userModel.findByPk(id);
    if (!user) throw new Error("User tidak ditemukan");
    await user.update(data);
    return user.toJSON() as User;
  }

  async findByToken(token: string): Promise<User | null> {
    const user = await userModel.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });
    return user ? (user.toJSON() as User) : null;
  }

  async findByVerificationCode(code: string) {
    return await userModel.findOne({ where: { verificationCode: code } });
  }

  async findByVerificationToken(verificationEmailToken: string) {
    return await userModel.findOne({ where: { verificationEmailToken } });
  }
}
