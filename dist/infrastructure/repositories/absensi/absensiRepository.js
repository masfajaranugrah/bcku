"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsensiRepository = void 0;
const absensiModel_1 = __importDefault(require("@infrastructure/database/models/absensi/absensiModel"));
class AbsensiRepository {
    async createAbsensi(data) {
        return await absensiModel_1.default.create(data);
    }
    async findById(userId, companyId) {
        if (!companyId)
            throw new Error("companyId harus diberikan");
        return await absensiModel_1.default.findAll({
            where: {
                userId,
                companyId
            },
        });
    }
    async findByUserAndDate(userId, tanggal, companyId) {
        return await absensiModel_1.default.findOne({ where: { userId, tanggal, companyId } });
    }
    async update(id, data, companyId) {
        if (!companyId)
            throw new Error("companyId harus diberikan");
        // Hanya field yang ada di `data` yang akan diupdate
        const [updatedRows] = await absensiModel_1.default.update(data, {
            where: { id, companyId },
        });
        if (updatedRows === 0)
            return null;
        // Kembalikan data terbaru setelah update
        return await this.findById(id, companyId);
    }
    async getAllAbsensi(companyId) {
        const where = {};
        if (companyId)
            where.companyId = companyId;
        return await absensiModel_1.default.findAll({ where, order: [["tanggal", "DESC"]] });
    }
    async deleteAbsensi(id, companyId) {
        const where = { id };
        if (companyId)
            where.companyId = companyId;
        return await absensiModel_1.default.destroy({ where });
    }
}
exports.AbsensiRepository = AbsensiRepository;
//# sourceMappingURL=absensiRepository.js.map