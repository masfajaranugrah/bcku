import { z } from "zod";

// =====================
// AUTH SCHEMAS
// =====================

export const loginSchema = z.object({
    email: z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: z.string({ message: "Password wajib diisi" }).min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
    email: z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: z
        .string({ message: "Password wajib diisi" })
        .min(8, "Password minimal 8 karakter")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[0-9]/, "Password harus mengandung angka"),
    firstName: z.string({ message: "Nama depan wajib diisi" }).min(2, "Nama depan minimal 2 karakter"),
    lastName: z.string().optional(),
    phone: z
        .string()
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
        .optional(),
    companyName: z.string().optional(),
});

export const registerMemberSchema = z.object({
    email: z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
    password: z.string({ message: "Password wajib diisi" }).min(8, "Password minimal 8 karakter"),
    firstName: z.string({ message: "Nama depan wajib diisi" }).min(2, "Nama depan minimal 2 karakter"),
    lastName: z.string().optional(),
    roleId: z.string().uuid("Format roleId tidak valid").optional(),
    departmentId: z.string().uuid("Format departmentId tidak valid"),
});

export const verificationSchema = z.object({
    code: z.string({ message: "Kode verifikasi wajib diisi" }).length(6, "Kode verifikasi harus 6 digit"),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string({ message: "Password baru wajib diisi" })
            .min(8, "Password minimal 8 karakter")
            .regex(/[A-Z]/, "Password harus mengandung huruf besar")
            .regex(/[0-9]/, "Password harus mengandung angka"),
        confirmPassword: z.string({ message: "Konfirmasi password wajib diisi" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password dan konfirmasi password tidak cocok",
        path: ["confirmPassword"],
    });

export const requestResetSchema = z.object({
    email: z.string({ message: "Email wajib diisi" }).email("Format email tidak valid"),
});

// =====================
// SUBSCRIPTION SCHEMAS
// =====================

export const subscriptionOrderSchema = z.object({
    packageId: z.string({ message: "Package ID wajib diisi" }).uuid("Format packageId tidak valid"),
    duration: z
        .number({ message: "Durasi wajib diisi" })
        .int("Durasi harus berupa bilangan bulat")
        .min(1, "Durasi minimal 1")
        .max(12, "Durasi maksimal 12"),
});

export const subscriptionParamsSchema = z.object({
    companyId: z.string().uuid("Format companyId tidak valid"),
    userId: z.string().uuid("Format userId tidak valid"),
});

// =====================
// SPRINT SCHEMAS
// =====================

export const createSprintSchema = z.object({
    name: z
        .string({ message: "Nama sprint wajib diisi" })
        .min(3, "Nama sprint minimal 3 karakter")
        .max(100, "Nama sprint maksimal 100 karakter"),
    goal: z.string().max(500, "Goal maksimal 500 karakter").optional(),
    description: z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
    startDate: z.string().datetime("Format tanggal mulai tidak valid"),
    endDate: z.string().datetime("Format tanggal selesai tidak valid"),
    status: z.enum(["PLANNED", "IN_PROGRESS", "DONE"]).default("PLANNED"),
    storyPoints: z.number().int().min(0).optional(),
    progress: z.number().int().min(0).max(100).optional(),
});

export const updateSprintSchema = createSprintSchema.partial();

// =====================
// ABSENSI SCHEMAS
// =====================

// Helper untuk menerima string ATAU number dan mengkonversi ke number
const stringOrNumber = z.union([
    z.string().transform((val) => {
        if (val === "" || val === "null" || val === "undefined") return undefined;
        const num = parseFloat(val);
        return isNaN(num) ? undefined : num;
    }),
    z.number()
]).optional();

export const createAbsensiSchema = z.object({
    type: z.enum(["HADIR", "IZIN", "SAKIT", "CUTI", "hadir", "izin", "sakit", "cuti", "Hadir", "Izin", "Sakit", "Cuti"]).optional(),
    keterangan: z.string().max(500, "Keterangan maksimal 500 karakter").optional(),
    latitude: stringOrNumber,
    longitude: stringOrNumber,
});

// =====================
// KPI SCHEMAS
// =====================

export const createKpiSchema = z.object({
    sprintId: z.string().uuid("Format sprintId tidak valid").optional(),
    title: z
        .string({ message: "Judul KPI wajib diisi" })
        .min(3, "Judul minimal 3 karakter")
        .max(200, "Judul maksimal 200 karakter"),
    description: z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
    target: z.number({ message: "Target wajib diisi" }).positive("Target harus positif"),
    achieved: z.number().min(0, "Achieved minimal 0").default(0),
    unit: z.string().max(50, "Unit maksimal 50 karakter").optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD").optional(),
});

// =====================
// MEMBER SCHEMAS
// =====================

export const updateMemberSchema = z.object({
    firstName: z.string().min(2, "Nama depan minimal 2 karakter").optional(),
    lastName: z.string().optional(),
    phone: z
        .string()
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
        .optional(),
    address: z.string().max(500, "Alamat maksimal 500 karakter").optional(),
});

// =====================
// COMMON SCHEMAS
// =====================

export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const uuidParamSchema = z.object({
    id: z.string().uuid("Format ID tidak valid"),
});

export const companyIdParamSchema = z.object({
    companyId: z.string().uuid("Format companyId tidak valid"),
});
