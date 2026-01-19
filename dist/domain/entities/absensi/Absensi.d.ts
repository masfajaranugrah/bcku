export interface AbsensiDTO {
    id?: string;
    userId: string;
    tanggal: string;
    waktuMasuk?: string | null;
    waktuKeluar?: string | null;
    status_absensi: "Hadir" | "Sakit" | "Izin" | "Alpha";
    foto?: string | null;
    latitude?: number | null;
    longitude?: number | null;
}
//# sourceMappingURL=Absensi.d.ts.map