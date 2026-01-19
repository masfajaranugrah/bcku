"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absensiController = void 0;
const absensiUseCase_1 = require("@application/usecase/absensi/absensiUseCase");
const env_1 = require("@config/env");
const useCase = new absensiUseCase_1.AbsensiUseCase();
exports.absensiController = {
    // contoh untuk create
    async create(req, res) {
        try {
            const { companyId } = req.params;
            if (!companyId)
                return res.status(400).json({ success: false, message: "companyId wajib ada" });
            // Ambil userId dari token JWT (req.user di-set oleh authMiddleware)
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: userId tidak ditemukan dari token"
                });
            }
            // Debug log
            console.log("=== DEBUG userId from token ===", userId);
            console.log("=== DEBUG req.body ===", req.body);
            console.log("=== DEBUG req.file ===", req.file);
            // Auto-generate tanggal jika tidak ada (format: YYYY-MM-DD)
            const today = new Date();
            const tanggal = req.body.tanggal || today.toISOString().split('T')[0];
            // Auto-generate waktuMasuk jika tidak ada (format: HH:mm:ss)
            const waktuMasuk = req.body.waktuMasuk || today.toTimeString().split(' ')[0];
            // Debug semua body fields
            console.log("=== DEBUG Full req.body ===", JSON.stringify(req.body));
            // Ambil status dari field 'type' (prioritas) atau 'status_absensi'
            // type lebih reliable karena form-data parsing
            const rawStatus = req.body.type || req.body.status_absensi || "";
            const normalizedStatus = rawStatus.toString().toLowerCase().trim();
            // Debug status
            console.log("=== DEBUG rawStatus ===", rawStatus);
            console.log("=== DEBUG normalizedStatus ===", normalizedStatus);
            const statusMap = {
                "hadir": "Hadir",
                "masuk": "Hadir",
                "sakit": "Sakit",
                "izin": "Izin",
                "cuti": "Izin",
                "alpha": "Alpha",
                "pulang": "Hadir",
            };
            const status_absensi = statusMap[normalizedStatus] || "Hadir";
            console.log("=== DEBUG final status_absensi ===", status_absensi);
            // Keterangan (optional)
            const keterangan = req.body.keterangan || null;
            console.log("=== DEBUG keterangan ===", keterangan);
            const data = {
                ...req.body,
                userId, // userId dari token
                companyId, // companyId dari params
                tanggal, // tanggal (auto atau dari body)
                waktuMasuk, // waktuMasuk (auto atau dari body)
                status_absensi, // status yang sudah dinormalisasi
                keterangan, // keterangan (optional)
                foto: req.file ? `${env_1.config.BASE_URL}/uploads/absensi/${userId}/${req.file.filename}` : null,
            };
            const result = await useCase.createAbsensi(data);
            return res.status(201).json({
                success: true,
                message: "Absensi berhasil dibuat",
                data: result,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Terjadi kesalahan",
            });
        }
    },
    async getAll(req, res) {
        try {
            const { companyId } = req.params;
            const data = await useCase.getAllAbsensi(companyId);
            return res.status(200).json({
                success: true,
                message: "List absensi berhasil diambil",
                data,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Terjadi kesalahan",
            });
        }
    },
    async getByUserId(req, res) {
        try {
            const { companyId, userId } = req.params;
            if (!userId || !companyId) {
                return res.status(400).json({
                    success: false,
                    message: "Parameter 'companyId' atau 'userId' tidak ditemukan",
                });
            }
            const data = await useCase.getAbsensiByUserId(userId, companyId);
            return res.status(200).json({
                success: true,
                message: "Data absensi berhasil diambil",
                data,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Terjadi kesalahan",
            });
        }
    },
    async update(req, res) {
        try {
            const { id, companyId } = req.params;
            if (!id || !companyId) {
                return res.status(400).json({
                    success: false,
                    message: "Parameter 'id' atau 'companyId' tidak ditemukan",
                });
            }
            // Ambil data update dari body
            const data = {
                ...req.body,
                foto: req.file ? `${env_1.config.BASE_URL}/uploads/absensi/${req.body.userId}/${req.file.filename}` : undefined,
            };
            // Panggil useCase untuk update
            const result = await useCase.updateAbsensi(id, data, companyId);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Data absensi tidak ditemukan",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Absensi berhasil diperbarui",
                data: result,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Terjadi kesalahan",
            });
        }
    },
    async remove(req, res) {
        try {
            const { id, companyId } = req.params;
            if (!id || !companyId)
                return res.status(400).json({ success: false, message: "Parameter 'id' tidak ditemukan" });
            await useCase.deleteAbsensi(id, companyId);
            return res.status(200).json({
                success: true,
                message: "Absensi berhasil dihapus",
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Terjadi kesalahan",
            });
        }
    },
};
//# sourceMappingURL=absensiController.js.map