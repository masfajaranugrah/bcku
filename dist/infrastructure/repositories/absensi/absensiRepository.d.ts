import { CreateAbsensiDTO } from "@application/dtos/AbsensiDTO";
export declare class AbsensiRepository {
    createAbsensi(data: CreateAbsensiDTO): Promise<any>;
    findById(userId: string, companyId: string): Promise<any>;
    findByUserAndDate(userId: string, tanggal: string, companyId: string): Promise<any>;
    update(id: string, data: Partial<CreateAbsensiDTO>, companyId: string): Promise<any>;
    getAllAbsensi(companyId?: string): Promise<any>;
    deleteAbsensi(id: string, companyId?: string): Promise<any>;
}
//# sourceMappingURL=absensiRepository.d.ts.map