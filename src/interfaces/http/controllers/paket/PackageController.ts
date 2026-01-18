import { Request, Response, NextFunction } from "express";
import { PackageUseCase } from "@application/usecase/paket/PackageUseCase";
import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";

const repo = new PackageRepository();
const useCase = new PackageUseCase(repo);

export class PackageController {
  async addPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const pkg = await useCase.addPackage(data);
      return res.status(201).json({
        status: "success",
        message: "Package created",
        data: {
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          permissions: pkg.features, // tampilkan permissions
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async editPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const pkg = await useCase.editPackage(id as any, data);
      return res.status(200).json({
        status: "success",
        message: "Package updated",
        data: {
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          permissions: pkg.features,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async listPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const packages = await useCase.listPackages();
      return res.status(200).json({
        status: "success",
        data: packages,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const pkg = await useCase.getPackage(id as any);
      return res.status(200).json({
        status: "success",
        data: pkg,
      });
    } catch (err) {
      next(err);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const pkg = await useCase.getById(id as any);

    return res.status(200).json({
      status: "success",
      data: {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        permissions: pkg.permissions,
        createdAt: pkg.createdAt,
        updatedAt: pkg.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

  async deletePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await useCase.deletePackage(id as any);
      return res.status(200).json({
        status: "success",
        message: "Package deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

