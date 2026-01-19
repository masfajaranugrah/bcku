import { CreateAbsensiDTO } from "@application/dtos/AbsensiDTO";
export declare class AbsensiUseCase {
    private repository;
    constructor();
    createAbsensi(data: CreateAbsensiDTO): Promise<any>;
    getAbsensiByUserId(userId: string, companyId: string): Promise<any>;
    getAllAbsensi(companyId?: string): Promise<any>;
    updateAbsensi(id: string, data: any, companyId: string): Promise<any>;
    deleteAbsensi(id: string, companyId?: string): Promise<any>;
}
//# sourceMappingURL=absensiUseCase.d.ts.map