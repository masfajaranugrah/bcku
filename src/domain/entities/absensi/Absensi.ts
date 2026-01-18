export interface AbsensiDTO {
  id?: string;
  userId: string;
  tanggal: string; // format YYYY-MM-DD
  waktuMasuk?: string | null;   // isi ketika absen masuk (server generate)
  waktuKeluar?: string | null;  // isi ketika absen pulang (server generate)
  status_absensi: "Hadir" | "Sakit" | "Izin" | "Alpha";
  foto?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}
