"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyIdParamSchema = exports.uuidParamSchema = exports.paginationSchema = exports.updateMemberSchema = exports.createKpiSchema = exports.createAbsensiSchema = exports.updateSprintSchema = exports.createSprintSchema = exports.subscriptionParamsSchema = exports.subscriptionOrderSchema = exports.requestResetSchema = exports.resetPasswordSchema = exports.verificationSchema = exports.registerMemberSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
// =====================
// AUTH SCHEMAS
// =====================
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: zod_1.z.string({ message: "Password wajib diisi" }).min(6, "Password minimal 6 karakter"),
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: zod_1.z
        .string({ message: "Password wajib diisi" })
        .min(8, "Password minimal 8 karakter")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[0-9]/, "Password harus mengandung angka"),
    firstName: zod_1.z.string({ message: "Nama depan wajib diisi" }).min(2, "Nama depan minimal 2 karakter"),
    lastName: zod_1.z.string().optional(),
    phone: zod_1.z
        .string()
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
        .optional(),
    companyName: zod_1.z.string().optional(),
});
exports.registerMemberSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: zod_1.z.string({ message: "Password wajib diisi" }).min(8, "Password minimal 8 karakter"),
    firstName: zod_1.z.string({ message: "Nama depan wajib diisi" }).min(2, "Nama depan minimal 2 karakter"),
    lastName: zod_1.z.string().optional(),
    roleId: zod_1.z.string().uuid("Format roleId tidak valid").optional(),
    departmentId: zod_1.z.string().uuid("Format departmentId tidak valid"),
});
exports.verificationSchema = zod_1.z.object({
    code: zod_1.z.string({ message: "Kode verifikasi wajib diisi" }).length(6, "Kode verifikasi harus 6 digit"),
});
exports.resetPasswordSchema = zod_1.z
    .object({
    password: zod_1.z
        .string({ message: "Password baru wajib diisi" })
        .min(8, "Password minimal 8 karakter")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: zod_1.z.string({ message: "Konfirmasi password wajib diisi" }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
});
exports.requestResetSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
});
// =====================
// SUBSCRIPTION SCHEMAS
// =====================
exports.subscriptionOrderSchema = zod_1.z.object({
    packageId: zod_1.z.string({ message: "Package ID wajib diisi" }).uuid("Format packageId tidak valid"),
    duration: zod_1.z
        .number({ message: "Durasi wajib diisi" })
        .int("Durasi harus berupa bilangan bulat")
        .min(1, "Durasi minimal 1")
        .max(12, "Durasi maksimal 12"),
});
exports.subscriptionParamsSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid("Format companyId tidak valid"),
    userId: zod_1.z.string().uuid("Format userId tidak valid"),
});
// =====================
// SPRINT SCHEMAS
// =====================
exports.createSprintSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: "Nama sprint wajib diisi" })
        .min(3, "Nama sprint minimal 3 karakter")
        .max(100, "Nama sprint maksimal 100 karakter"),
    goal: zod_1.z.string().max(500, "Goal maksimal 500 karakter").optional(),
    description: zod_1.z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
    startDate: zod_1.z.string().datetime("Format tanggal mulai tidak valid"),
    endDate: zod_1.z.string().datetime("Format tanggal selesai tidak valid"),
    status: zod_1.z.enum(["PLANNED", "IN_PROGRESS", "DONE"]).default("PLANNED"),
    storyPoints: zod_1.z.number().int().min(0).optional(),
    progress: zod_1.z.number().int().min(0).max(100).optional(),
});
exports.updateSprintSchema = exports.createSprintSchema.partial();
// =====================
// ABSENSI SCHEMAS
// =====================
// Helper untuk menerima string ATAU number dan mengkonversi ke number
const stringOrNumber = zod_1.z.union([
    zod_1.z.string().transform((val) => {
        if (val === "" || val === "null" || val === "undefined")
            return undefined;
        const num = parseFloat(val);
        return isNaN(num) ? undefined : num;
    }),
    zod_1.z.number()
]).optional();
exports.createAbsensiSchema = zod_1.z.object({
    type: zod_1.z.enum(["HADIR", "IZIN", "SAKIT", "CUTI", "hadir", "izin", "sakit", "cuti", "Hadir", "Izin", "Sakit", "Cuti"]).optional(),
    keterangan: zod_1.z.string().max(500, "Keterangan maksimal 500 karakter").optional(),
    latitude: stringOrNumber,
    longitude: stringOrNumber,
});
// =====================
// KPI SCHEMAS
// =====================
exports.createKpiSchema = zod_1.z.object({
    sprintId: zod_1.z.string().uuid("Format sprintId tidak valid").optional(),
    title: zod_1.z
        .string({ message: "Judul KPI wajib diisi" })
        .min(3, "Judul minimal 3 karakter")
        .max(200, "Judul maksimal 200 karakter"),
    description: zod_1.z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
    target: zod_1.z.number({ message: "Target wajib diisi" }).positive("Target harus positif"),
    achieved: zod_1.z.number().min(0, "Achieved minimal 0").default(0),
    unit: zod_1.z.string().max(50, "Unit maksimal 50 karakter").optional(),
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD").optional(),
});
// =====================
// MEMBER SCHEMAS
// =====================
exports.updateMemberSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "Nama depan minimal 2 karakter").optional(),
    lastName: zod_1.z.string().optional(),
    phone: zod_1.z
        .string()
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
        .optional(),
    address: zod_1.z.string().max(500, "Alamat maksimal 500 karakter").optional(),
});
// =====================
// COMMON SCHEMAS
// =====================
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
exports.uuidParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Format ID tidak valid"),
});
exports.companyIdParamSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid("Format companyId tidak valid"),
});
//# sourceMappingURL=index.js.map