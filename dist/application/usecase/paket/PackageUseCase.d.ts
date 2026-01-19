import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";
import { PackageDTO, PackageUpdateDTO } from "@application/dtos/PackageDTO";
export declare class PackageUseCase {
    private repo;
    constructor(repo: PackageRepository);
    addPackage(data: PackageDTO): Promise<import("../../../infrastructure/database/models").PaketModel>;
    editPackage(id: string, data: PackageUpdateDTO): Promise<import("../../../infrastructure/database/models").PaketModel>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    listPackages(): Promise<{
        id: any;
        name: any;
        price: any;
        permissions: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    getPackage(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePackage(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=PackageUseCase.d.ts.map