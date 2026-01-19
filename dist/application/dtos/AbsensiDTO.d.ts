export interface CreateAbsensiDTO {
    userId: string;
    companyId: string;
    tanggal: string;
    waktuMasuk?: string;
    waktuKeluar?: string;
    status_absensi?: "Hadir" | "Sakit" | "Izin" | "Alpha";
    foto?: string;
    keterangan?: string;
    latitude?: number;
    longitude?: number;
}
export interface UpdateAbsensiDTO {
    companyId?: string;
    waktuKeluar?: string;
    status_absensi?: "Hadir" | "Sakit" | "Izin" | "Alpha";
    foto?: string;
    keterangan?: string;
    latitude?: number;
    longitude?: number;
}
//# sourceMappingURL=AbsensiDTO.d.ts.map