import { Request, Response } from "express";
import { SprintUseCase } from "@application/usecase/sprint/sprintUseCase";

const useCase = new SprintUseCase();

export class SprintController {

  // === CREATE SPRINT ===
  static async create(req: Request, res: Response) {
    try {
      const { companyId } = req.params;

      // Ambil userId dari token JWT
      const userId = (req as any).user?.id;

      if (!companyId) {
        return res.status(400).json({ message: "companyId is required" });
      }

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: userId tidak ditemukan dari token" });
      }

      const payload = {
        name: req.body.name,
        goal: req.body.goal,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        storyPoints: req.body.storyPoints,
        progress: req.body.progress ?? 0,
        createdBy: userId,  // Dari token, bukan body
        companyId,
      };

      const result = await useCase.createSprint(payload);
      return res.status(201).json(result);

    } catch (error: any) {
      console.error("❌ Create sprint failed:", error);
      return res.status(500).json({
        message: "Failed to create sprint",
        error: error.message,
      });
    }
  }

  // === GET ALL SPRINTS BY COMPANY ===
  static async getAll(req: Request, res: Response) {
    try {
      const companyId = (req as any)?.user?.companyId || req.params.companyId;

      if (!companyId) {
        return res.status(400).json({ message: "Company ID is required" });
      }

      const sprints = await useCase.getAllSprints(companyId);
      return res.json(sprints);

    } catch (error: any) {
      console.error("❌ Error fetching sprints:", error);
      return res.status(500).json({
        message: "Failed to get sprints",
        error: error.message,
      });
    }
  }

  // === GET SINGLE SPRINT ===
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Sprint ID is required" });
      }

      const sprint = await useCase.getSprintById(id);

      if (!sprint) {
        return res.status(404).json({ message: "Sprint not found" });
      }

      return res.json(sprint);
    } catch (error: any) {
      console.error("❌ Error fetching sprint by ID:", error);
      return res.status(500).json({
        message: "Failed to get sprint",
        error: error.message,
      });
    }
  }


  // === UPDATE SPRINT ===
  // === UPDATE SPRINT ===
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Sprint ID is required" });
      }

      const sprint = await useCase.updateSprint(id, req.body);

      if (!sprint) {
        return res.status(404).json({ message: "Sprint not found" });
      }

      return res.json(sprint);

    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to update sprint",
        error: error.message,
      });
    }
  }


  // === DELETE SPRINT ===
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Sprint ID is required" });
      }

      const deleted = await useCase.deleteSprint(id);

      if (!deleted) {
        return res.status(404).json({ message: "Sprint not found" });
      }

      return res.status(204).send();

    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to delete sprint",
        error: error.message,
      });
    }
  }

}
