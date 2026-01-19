"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagePermissions = void 0;
exports.PackagePermissions = {
    FREE: ["DASHBOARD", "CREATE_MEMBER"],
    MEDIUM: ["DASHBOARD", "CREATE_MEMBER", "LIHAT_MEMBER", "LIHAT_ABSENSI"],
    GOLD: [
        "DASHBOARD",
        "CREATE_MEMBER",
        "LIHAT_MEMBER",
        "LIHAT_ABSENSI",
        "EDIT_ABSENSI",
        "DELETE_ABSENSI",
    ],
    PREMIUM: [
        "DASHBOARD",
        "CREATE_MEMBER",
        "LIHAT_MEMBER",
        "LIHAT_ABSENSI",
        "EDIT_ABSENSI",
        "DELETE_ABSENSI",
        "EXPORT",
        "CETAK_LAPORAN"
    ],
};
//# sourceMappingURL=permissions.js.map