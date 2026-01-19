import { CreateCompanyDTO } from '@application/dtos/CompanyDTO';
import { CompanyModel } from "@infrastructure/database/models/company/companyModal";
export interface CompanyCreateDTO {
    name: string;
    code?: string | null;
    paketId?: string | null;
    address?: string | null;
    phone?: string | null;
}
export interface CompanyUpdateDTO {
    name?: string;
    code?: string | null;
    paketId?: string | null;
    address?: string | null;
    phone?: string | null;
    isActive?: boolean;
}
export declare class CompanyRepository {
    /** Cari company berdasarkan nama */
    findByName(name: string): Promise<CompanyModel | null>;
    /** Cari company berdasarkan ID */
    findById(id: string): Promise<CompanyModel | null>;
    /** Ambil semua company */
    getAllCompanies(): Promise<CompanyModel[]>;
    /** Buat company baru */
    create(data: CreateCompanyDTO): Promise<CompanyModel>;
    /** Perbarui company berdasarkan ID */
    updateCompany(id: string, data: CompanyUpdateDTO): Promise<CompanyModel>;
    /** Hapus company berdasarkan ID */
    deleteCompany(id: string): Promise<CompanyModel>;
    /** Cari company berdasarkan nama, jika tidak ada buat baru */
    createIfNotExists(data: CompanyCreateDTO): Promise<CompanyModel>;
}
//# sourceMappingURL=companyRepository.d.ts.map