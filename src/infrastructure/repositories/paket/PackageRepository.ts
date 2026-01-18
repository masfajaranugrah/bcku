import { PackageDTO, PackageUpdateDTO } from "@application/dtos/PackageDTO";
import PackageModel from "@infrastructure/database/models/paket/PackageModel";

export class PackageRepository {
  async create(data: PackageDTO) {
    return PackageModel.create(data);
  }

  async update(id: string, data: PackageUpdateDTO) {
    const pkg = await PackageModel.findByPk(id);
    if (!pkg) return null;

    return pkg.update(data);
  }

  async findAll() {
    const packages = await PackageModel.findAll();
    return packages.map((pkg: any) => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      permissions: pkg.features, // pastikan disini features -> permissions
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    }));
  }

  async findById(id: string) {
    const pkg = await PackageModel.findByPk(id);
    if (!pkg) return null;

    return {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      permissions: pkg.features,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    };
  }

  async getById(id: string) {
  const pkg = await PackageModel.findByPk(id);
  if (!pkg) return null;

  return {
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    permissions: pkg.features,
    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,
  };
}

  async delete(id: string) {
    const pkg = await PackageModel.findByPk(id);
    if (!pkg) return null;

    await pkg.destroy();
    return {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      permissions: pkg.features,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    };
  }
}
