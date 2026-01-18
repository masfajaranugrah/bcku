import { Router, Request, Response } from "express";
import { NoteModel } from "@infrastructure/database/models/note/noteModel";
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

// Get all notes for company
router.get("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const companyId = authReq.user?.companyId;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const notes = await NoteModel.findAll({
            where: { companyId },
            order: [
                ["status", "ASC"],
                ["priority", "ASC"],
                ["createdAt", "DESC"],
            ],
        });

        return res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error: unknown) {
        console.error("Get notes error:", error);
        return res.status(500).json({ message: "Gagal mengambil catatan" });
    }
});

// Create note
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;

        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, content, status, color, priority } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Judul catatan wajib diisi" });
        }

        const note = await NoteModel.create({
            userId,
            companyId,
            title,
            content: content || "",
            status: status || "todo",
            color: color || "yellow",
            priority: priority || 0,
        });

        return res.status(201).json({
            success: true,
            data: note,
        });
    } catch (error: unknown) {
        console.error("Create note error:", error);
        return res.status(500).json({ message: "Gagal membuat catatan" });
    }
});

// Update note
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const companyId = authReq.user?.companyId;
        const { id } = req.params;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const note = await NoteModel.findOne({
            where: { id, companyId },
        });

        if (!note) {
            return res.status(404).json({ message: "Catatan tidak ditemukan" });
        }

        const { title, content, status, color, priority } = req.body;

        await note.update({
            title: title !== undefined ? title : note.title,
            content: content !== undefined ? content : note.content,
            status: status !== undefined ? status : note.status,
            color: color !== undefined ? color : note.color,
            priority: priority !== undefined ? priority : note.priority,
        });

        return res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error: unknown) {
        console.error("Update note error:", error);
        return res.status(500).json({ message: "Gagal memperbarui catatan" });
    }
});

// Delete note
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const companyId = authReq.user?.companyId;
        const { id } = req.params;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const note = await NoteModel.findOne({
            where: { id, companyId },
        });

        if (!note) {
            return res.status(404).json({ message: "Catatan tidak ditemukan" });
        }

        await note.destroy();

        return res.status(200).json({
            success: true,
            message: "Catatan dihapus",
        });
    } catch (error: unknown) {
        console.error("Delete note error:", error);
        return res.status(500).json({ message: "Gagal menghapus catatan" });
    }
});

// Bulk update note priorities (for drag-drop reordering)
router.put("/reorder/bulk", authMiddleware, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const companyId = authReq.user?.companyId;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { notes } = req.body; // Array of { id, status, priority }

        if (!Array.isArray(notes)) {
            return res.status(400).json({ message: "Invalid data format" });
        }

        for (const noteData of notes) {
            await NoteModel.update(
                { status: noteData.status, priority: noteData.priority },
                { where: { id: noteData.id, companyId } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Urutan catatan diperbarui",
        });
    } catch (error: unknown) {
        console.error("Reorder notes error:", error);
        return res.status(500).json({ message: "Gagal mengatur ulang catatan" });
    }
});

export default router;
