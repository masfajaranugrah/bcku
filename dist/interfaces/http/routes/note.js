"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteModel_1 = require("@infrastructure/database/models/note/noteModel");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
// Get all notes for company
router.get("/", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const companyId = authReq.user?.companyId;
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const notes = await noteModel_1.NoteModel.findAll({
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
    }
    catch (error) {
        console.error("Get notes error:", error);
        return res.status(500).json({ message: "Gagal mengambil catatan" });
    }
});
// Create note
router.post("/", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const userId = authReq.user?.id;
        const companyId = authReq.user?.companyId;
        if (!userId || !companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, content, status, color, priority } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Judul catatan wajib diisi" });
        }
        const note = await noteModel_1.NoteModel.create({
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
    }
    catch (error) {
        console.error("Create note error:", error);
        return res.status(500).json({ message: "Gagal membuat catatan" });
    }
});
// Update note
router.put("/:id", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const companyId = authReq.user?.companyId;
        const { id } = req.params;
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const note = await noteModel_1.NoteModel.findOne({
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
    }
    catch (error) {
        console.error("Update note error:", error);
        return res.status(500).json({ message: "Gagal memperbarui catatan" });
    }
});
// Delete note
router.delete("/:id", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const companyId = authReq.user?.companyId;
        const { id } = req.params;
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const note = await noteModel_1.NoteModel.findOne({
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
    }
    catch (error) {
        console.error("Delete note error:", error);
        return res.status(500).json({ message: "Gagal menghapus catatan" });
    }
});
// Bulk update note priorities (for drag-drop reordering)
router.put("/reorder/bulk", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const authReq = req;
        const companyId = authReq.user?.companyId;
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { notes } = req.body; // Array of { id, status, priority }
        if (!Array.isArray(notes)) {
            return res.status(400).json({ message: "Invalid data format" });
        }
        for (const noteData of notes) {
            await noteModel_1.NoteModel.update({ status: noteData.status, priority: noteData.priority }, { where: { id: noteData.id, companyId } });
        }
        return res.status(200).json({
            success: true,
            message: "Urutan catatan diperbarui",
        });
    }
    catch (error) {
        console.error("Reorder notes error:", error);
        return res.status(500).json({ message: "Gagal mengatur ulang catatan" });
    }
});
exports.default = router;
//# sourceMappingURL=note.js.map