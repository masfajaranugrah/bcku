import { PackageDTO, PackageUpdateDTO } from "@application/dtos/PackageDTO";
import PackageModel from "@infrastructure/database/models/paket/PackageModel";
export declare class PackageRepository {
    create(data: PackageDTO): Promise<PackageModel>;
    update(id: string, data: PackageUpdateDTO): Promise<PackageModel | null>;
    findAll(): Promise<{
        id: any;
        name: any;
        price: any;
        permissions: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        permissions: string[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
//# sourceMappingURL=PackageRepository.d.ts.map