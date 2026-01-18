import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";
import { PackageDTO, PackageUpdateDTO } from "@application/dtos/PackageDTO";
import { AppError } from "@shared/errors/AppError";

export class PackageUseCase {
  constructor(private repo: PackageRepository) {}

  async addPackage(data: PackageDTO) {
    if (!data.name || !data.features || !data.price) {
      throw new AppError("Name, features, and price are required", 400);
    }
    return this.repo.create(data);
  }

  async editPackage(id: string, data: PackageUpdateDTO) {
    const pkg = await this.repo.update(id, data);
    if (!pkg) throw new AppError("Package not found", 404);
    return pkg;
  }
  async getById(id: string) {
  const pkg = await this.repo.getById(id);
  if (!pkg) throw new AppError("Package not found", 404);

  return pkg;
}

  async listPackages() {
    return this.repo.findAll();
  }

  async getPackage(id: string) {
    const pkg = await this.repo.findById(id);
    if (!pkg) throw new AppError("Package not found", 404);
    return pkg;
  }
   async deletePackage(id: string) {
    const pkg = await this.repo.delete(id);
    if (!pkg) throw new AppError("Package not found", 404);
    return pkg;
  }
}
