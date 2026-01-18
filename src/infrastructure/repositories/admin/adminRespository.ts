import RoleModel from '@infrastructure/database/models/member/rolesModel';
import userModel from "@infrastructure/database/models/auth/userModel";
import { PermissionModel } from '@infrastructure/database/models';
import rolePermissionModel from '@infrastructure/database/models/member/rolePermissionModel';
import { User } from "@domain/entities/auth/User";
import { Op } from 'sequelize';

export class AdminRespository {
    async create(user: User): Promise<User> {
        const created = await userModel.create(user);
        return created.toJSON() as User;
    }

    async findByIdAndCompany(id: string, companyId: string) {
    return await userModel.findOne({ where: { id, companyId } });
}

async updateByIdAndCompany(id: string, companyId: string, data: any) {
    const member = await this.findByIdAndCompany(id, companyId);
    if (!member) throw new Error("Member tidak ditemukan");
    return await member.update(data);
}

async deleteByIdAndCompany(id: string, companyId: string) {
    const member = await this.findByIdAndCompany(id, companyId);
    if (!member) throw new Error("Member tidak ditemukan");
    return await member.destroy();
}


    async findById(id: string): Promise<any | null> {
        const user = await userModel.findByPk(id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: RoleModel,
                    as: "role",
                    include: [
                        {
                            model: PermissionModel,
                            as: "permissions",
                            attributes: ["name"],
                            through: { model: rolePermissionModel, attributes: [] },
                        },
                    ],
                },
            ],
        });

        if (!user) return null;

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role?.name || null,
            permissions: user.role?.permissions.map((p: any) => p.name) || [],
        };
    }

    // async findUserAll(): Promise<any[]> {
    //     const users = await userModel.findAll({
    //         attributes: { exclude: ["roleId", "password"] },
    //         include: [
    //             {
    //                 model: RoleModel,
    //                 as: "role",
    //                 include: [
    //                     {
    //                         model: PermissionModel,
    //                         as: "permissions",
    //                         attributes: ["name"],
    //                         through: { attributes: [] },
    //                     },
    //                 ],
    //             },
    //         ],
    //     });

    //     return users.map((user: any) => ({
    //         id: user.id,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email: user.email,
    //         isVerified: user.isVerified,
    //         createdAt: user.createdAt,
    //         updatedAt: user.updatedAt,
    //         role: user.role?.name || null,
    //         permissions: user.role?.permissions.map((p: any) => p.name) || [],
    //     }));
    // }

async findUserAll(companyId?: string): Promise<any[]> {
  // Jika companyId tidak ada, langsung kembalikan array kosong
  if (!companyId) return [];

  const users = await userModel.findAll({
    where: { companyId }, // filter sesuai perusahaan
    attributes: { exclude: ["roleId", "password"] },
    include: [
      {
        model: RoleModel,
        as: "role",
        include: [
          {
            model: PermissionModel,
            as: "permissions",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  return users.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role?.name || null,
    permissions: user.role?.permissions.map((p: any) => p.name) || [],
  }));
}



    async findByEmail(email: string): Promise<User | null> {
        const user = await userModel.findOne({ where: { email } });
        return user ? (user.toJSON() as User) : null;
    }

    async update(id: string, data: Partial<User>): Promise<any> {
        const user = await userModel.findByPk(id);
        if (!user) throw new Error("User tidak ditemukan");

        // kalau ada roleId ikut update
        if (data.roleId) {
            user.set("roleId", data.roleId);
        }

        await user.update(data);

        return this.findById(id); // return versi yang sudah formatted
    }

    async delete(id: string): Promise<void> {
        const user = await userModel.findByPk(id);
        if (!user) throw new Error("User tidak ditemukan");
        await user.destroy();
    }

    async findByToken(token: string): Promise<User | null> {
        const user = await userModel.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [Op.gt]: new Date()
                }
            }
        });

        return user ? (user.toJSON() as User) : null;
    }
}
