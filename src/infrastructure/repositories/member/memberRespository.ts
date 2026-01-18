import RoleModel from '@infrastructure/database/models/member/rolesModel';
import userModel from "@infrastructure/database/models/auth/userModel";
import { PermissionModel } from '@infrastructure/database/models';
import rolePermissionModel from '@infrastructure/database/models/member/rolePermissionModel';
import { User } from "@domain/entities/auth/User";

export class MemberRespository {

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
        companyId: user.companyId,
        role: user.role?.name || null,
        permissions: user.role?.permissions.map((p: any) => p.name) || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

   async findUserAll(filter: { companyId?: string } = {}): Promise<any[]> {
  const where: any = {};
  if (filter.companyId) where.companyId = filter.companyId;

  const users = await userModel.findAll({
    where,
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


    async update(id: string, data: Partial<User>): Promise<any> {
        const user = await userModel.findByPk(id);
        if (!user) throw new Error("User tidak ditemukan");

        // Jika data.roleId ada, tetap update (digunakan admin)
        if (data.roleId) {
            user.set("roleId", data.roleId);
        }

        await user.update(data);

        // Return data formatted
        return this.findById(id);
    }
}
