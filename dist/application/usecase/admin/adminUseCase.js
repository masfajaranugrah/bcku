"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AdminUseCase {
    constructor(adminRespository) {
        this.adminRespository = adminRespository;
    }
    async getAllMembers(user) {
        if (!user) {
            throw new Error("Company ID tidak ditemukan");
        }
        // Panggil repository dengan companyId
        const members = await this.adminRespository.findUserAll(user);
        // Jika kosong, kembalikan array kosong, jangan lempar error
        return { status: "success", data: members || [] };
    }
    async getMemberById(id, companyId) {
        const member = await this.adminRespository.findByIdAndCompany(id, companyId);
        if (!member)
            throw new Error("Member tidak ditemukan");
        return { status: "success", data: member };
    }
    async updateMember(id, companyId, data) {
        const updateData = { ...data };
        // Jika ada password → hash dulu
        if (data.password) {
            updateData.password = await bcryptjs_1.default.hash(data.password, 10);
        }
        const updated = await this.adminRespository.updateByIdAndCompany(id, companyId, updateData);
        return { status: "success", data: updated };
    }
    async deleteMember(id, companyId) {
        await this.adminRespository.deleteByIdAndCompany(id, companyId);
        return { status: "success", message: "Member berhasil dihapus" };
    }
}
exports.AdminUseCase = AdminUseCase;
//# sourceMappingURL=adminUseCase.js.map