import { Router, Request, Response } from "express";
import { NotificationModel } from "@infrastructure/database/models/notification/notificationModel";
import { authMiddleware } from "@shared/middleware/authMiddleware";

const router = Router();

// Type for authenticated request
interface AuthRequest extends Request {
    user?: {
        id: string;
        companyId: string;
        role?: string;
        paketId?: string;
    };
}

// Get all notifications for current user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;

        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const notifications = await NotificationModel.findAll({
            where: { userId, companyId },
            order: [["createdAt", "DESC"]],
            limit: 50,
        });

        return res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error: unknown) {
        console.error("Get notifications error:", error);
        return res.status(500).json({ message: "Gagal mengambil notifikasi" });
    }
});

// Mark all notifications as read
router.put("/read-all", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;

        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await NotificationModel.update(
            { read: true },
            { where: { userId, companyId, read: false } }
        );

        return res.status(200).json({
            success: true,
            message: "Semua notifikasi ditandai sudah dibaca",
        });
    } catch (error: unknown) {
        console.error("Mark notifications read error:", error);
        return res.status(500).json({ message: "Gagal memperbarui notifikasi" });
    }
});

// Mark single notification as read
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;
        const { id } = req.params;

        const notification = await NotificationModel.findOne({
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
    } catch (error: unknown) {
        console.error("Mark notification read error:", error);
        return res.status(500).json({ message: "Gagal memperbarui notifikasi" });
    }
});

// Delete notification
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;
        const { id } = req.params;

        const notification = await NotificationModel.findOne({
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
    } catch (error: unknown) {
        console.error("Delete notification error:", error);
        return res.status(500).json({ message: "Gagal menghapus notifikasi" });
    }
});

// Create notification (for internal use / admin)
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const companyId = authReq.user?.companyId;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { userId, title, message, type } = req.body;

        const notification = await NotificationModel.create({
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
    } catch (error: unknown) {
        console.error("Create notification error:", error);
        return res.status(500).json({ message: "Gagal membuat notifikasi" });
    }
});

export default router;
