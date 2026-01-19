"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationModel_1 = require("@infrastructure/database/models/notification/notificationModel");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
// Get all notifications for current user
router.get("/", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;
        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const notifications = await notificationModel_1.NotificationModel.findAll({
            where: { userId, companyId },
            order: [["createdAt", "DESC"]],
            limit: 50,
        });
        return res.status(200).json({
            success: true,
            data: notifications,
        });
    }
    catch (error) {
        console.error("Get notifications error:", error);
        return res.status(500).json({ message: "Gagal mengambil notifikasi" });
    }
});
// Mark all notifications as read
router.put("/read-all", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;
        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await notificationModel_1.NotificationModel.update({ read: true }, { where: { userId, companyId, read: false } });
        return res.status(200).json({
            success: true,
            message: "Semua notifikasi ditandai sudah dibaca",
        });
    }
    catch (error) {
        console.error("Mark notifications read error:", error);
        return res.status(500).json({ message: "Gagal memperbarui notifikasi" });
    }
});
// Mark single notification as read
router.put("/:id", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const userId = authReq.user?.id;
        const { id } = req.params;
        const notification = await notificationModel_1.NotificationModel.findOne({
            where: { id, userId },
        });
        if (!notification) {
            return res.status(404).json({ message: "Notifikasi tidak ditemukan" });
        }
        await notification.update({ read: true });
        return res.status(200).json({
            success: true,
            data: notification,
        });
    }
    catch (error) {
        console.error("Mark notification read error:", error);
        return res.status(500).json({ message: "Gagal memperbarui notifikasi" });
    }
});
// Delete notification
router.delete("/:id", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const userId = authReq.user?.id;
        const { id } = req.params;
        const notification = await notificationModel_1.NotificationModel.findOne({
            where: { id, userId },
        });
        if (!notification) {
            return res.status(404).json({ message: "Notifikasi tidak ditemukan" });
        }
        await notification.destroy();
        return res.status(200).json({
            success: true,
            message: "Notifikasi dihapus",
        });
    }
    catch (error) {
        console.error("Delete notification error:", error);
        return res.status(500).json({ message: "Gagal menghapus notifikasi" });
    }
});
// Create notification (for internal use / admin)
router.post("/", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const companyId = authReq.user?.companyId;
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { userId, title, message, type } = req.body;
        const notification = await notificationModel_1.NotificationModel.create({
            userId: userId || authReq.user?.id,
            companyId,
            title,
            message,
            type: type || "info",
        });
        return res.status(201).json({
            success: true,
            data: notification,
        });
    }
    catch (error) {
        console.error("Create notification error:", error);
        return res.status(500).json({ message: "Gagal membuat notifikasi" });
    }
});
exports.default = router;
//# sourceMappingURL=notification.js.map