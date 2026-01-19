"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/main/app.ts
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const ErrorHandler_1 = require("@shared/errors/ErrorHandler");
const process_1 = __importDefault(require("process"));
// Routes
const userRoutes_1 = __importDefault(require("@interfaces/http/routes/userRoutes"));
const member_1 = __importDefault(require("@interfaces/http/routes/member"));
const role_1 = __importDefault(require("@interfaces/http/routes/role"));
const permission_1 = __importDefault(require("@interfaces/http/routes/permission"));
const rolePermissionRoutes_1 = __importDefault(require("@interfaces/http/routes/rolePermissionRoutes"));
const admin_1 = __importDefault(require("@interfaces/http/routes/admin"));
const absensi_1 = __importDefault(require("@interfaces/http/routes/absensi"));
const kpi_evaluasi_1 = __importDefault(require("@interfaces/http/routes/kpi_evaluasi"));
const company_1 = __importDefault(require("@interfaces/http/routes/company"));
const sprint_1 = __importDefault(require("@interfaces/http/routes/sprint"));
const standup_1 = __importDefault(require("@interfaces/http/routes/standup"));
const kpi_evaluasi_2 = __importDefault(require("@interfaces/http/routes/kpi_evaluasi"));
const departement_1 = __importDefault(require("@interfaces/http/routes/departement"));
const langganan_1 = __importDefault(require("@interfaces/http/routes/langganan"));
const paket_1 = __importDefault(require("@interfaces/http/routes/paket"));
const paymentLog_1 = __importDefault(require("@interfaces/http/routes/paymentLog"));
const notification_1 = __importDefault(require("@interfaces/http/routes/notification"));
const note_1 = __importDefault(require("@interfaces/http/routes/note"));
const app = (0, express_1.default)();
// ========== Middleware Global ==========
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Logging HTTP Request (morgan)
app.use((0, morgan_1.default)("dev"));
// CORS
app.use((0, cors_1.default)({
    origin: process_1.default.env.CLIENT_URL || "http://localhost:3000" || "https://strapless-inexact-mateo.ngrok-free.dev",
    credentials: true,
}));
// ========== Routes ==========
// Serve static file uploads
app.use("/uploads", express_1.default.static(path_1.default.join(process_1.default.cwd(), "uploads")));
app.use("/api/v1/auth", userRoutes_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/member", member_1.default);
app.use("/api/v1/roles", role_1.default);
app.use("/api/v1/permission", permission_1.default);
app.use("/api/v1/role-permission", rolePermissionRoutes_1.default);
app.use("/api/v1/absensi", absensi_1.default);
app.use("/api/v1/kpi-evaluasi", kpi_evaluasi_1.default);
app.use("/api/v1/company", company_1.default);
app.use("/api/v1/sprint", sprint_1.default);
app.use("/api/v1/standup", standup_1.default);
app.use("/api/v1/kpi", kpi_evaluasi_2.default);
app.use("/api/v1/departement", departement_1.default);
app.use("/api/v1/buy/paket", langganan_1.default);
app.use("/api/v1/paket", paket_1.default);
app.use("/api/v1/log", paymentLog_1.default);
app.use("/api/v1/notification", notification_1.default);
app.use("/api/v1/note", note_1.default);
// ========== Error Handler Global ==========
app.use(ErrorHandler_1.errorHandler);
// ========== Not Found Handler ==========
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map