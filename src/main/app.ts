// src/main/app.ts
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { errorHandler } from "@shared/errors/ErrorHandler";
import process from "process";


// Routes
import authRoutes from "@interfaces/http/routes/userRoutes";
import memberRoutes from "@interfaces/http/routes/member";
import roleRoutes from "@interfaces/http/routes/role";
import permissionRoutes from "@interfaces/http/routes/permission";
import rolePermissionRoutes from "@interfaces/http/routes/rolePermissionRoutes";
import adminRoutes from "@interfaces/http/routes/admin";
import absensiRoutes from "@interfaces/http/routes/absensi";
import kpiRoutes from "@interfaces/http/routes/kpi_evaluasi";
import CompanyRoutes from "@interfaces/http/routes/company";
import SprintRoutes from "@interfaces/http/routes/sprint";
import StandupRoutes from "@interfaces/http/routes/standup";
import KPIRoutes from "@interfaces/http/routes/kpi_evaluasi";
import DepartementRoutes from "@interfaces/http/routes/departement"
import BuyPaketRoutes from "@interfaces/http/routes/langganan"
import PaketRoutes from "@interfaces/http/routes/paket"
import PaymentLog from "@interfaces/http/routes/paymentLog";
import NotificationRoutes from "@interfaces/http/routes/notification";
import NoteRoutes from "@interfaces/http/routes/note";




const app: Application = express();

// ========== Middleware Global ==========
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging HTTP Request (morgan)
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000" || "https://strapless-inexact-mateo.ngrok-free.dev",
    credentials: true,
  })
);

// ========== Routes ==========
// Serve static file uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/member", memberRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/permission", permissionRoutes);
app.use("/api/v1/role-permission", rolePermissionRoutes);
app.use("/api/v1/absensi", absensiRoutes);
app.use("/api/v1/kpi-evaluasi", kpiRoutes);
app.use("/api/v1/company", CompanyRoutes);
app.use("/api/v1/sprint", SprintRoutes);
app.use("/api/v1/standup", StandupRoutes);
app.use("/api/v1/kpi", KPIRoutes);
app.use("/api/v1/departement", DepartementRoutes);
app.use("/api/v1/buy/paket", BuyPaketRoutes);
app.use("/api/v1/paket", PaketRoutes);
app.use("/api/v1/log", PaymentLog);
app.use("/api/v1/notification", NotificationRoutes);
app.use("/api/v1/note", NoteRoutes);

// ========== Error Handler Global ==========
app.use(errorHandler);

// ========== Not Found Handler ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
