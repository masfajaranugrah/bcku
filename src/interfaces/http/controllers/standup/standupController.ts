import { Request, Response } from "express";
import { StandupUseCase } from "@application/usecase/standup/standupUseCase";

const useCase = new StandupUseCase();

export class StandupController {
  static async create(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      if (!companyId) return res.status(400).json({ message: "Company ID required" });

      const result = await useCase.createStandup({
        ...req.body,
        companyId,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create standup" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      if (!companyId) return res.status(400).json({ message: "Company ID required" });

      const standups = await useCase.getAllStandups(companyId);
      res.json(standups);
    } catch (error) {
      res.status(500).json({ message: "Failed to get standups" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { companyId, id } = req.params;
      if (!companyId) return res.status(400).json({ message: "Company ID required" });

      console.log("=== DEBUG getById ===");
      console.log("companyId from params:", companyId);
      console.log("standup id from params:", id);

      const standup = await useCase.getStandupById(id as any);

      console.log("standup found:", standup ? "YES" : "NO");
      if (standup) {
        console.log("standup.companyId:", standup.companyId);
        console.log("companyId match:", standup.companyId === companyId);
      }

      if (!standup || standup.companyId !== companyId)
        return res.status(404).json({ message: "Not found or unauthorized" });

      res.json(standup);
    } catch (error: any) {
      console.error("❌ getById error:", error.message);
      res.status(500).json({ message: "Failed to get standup" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { companyId, id } = req.params;
      if (!companyId) return res.status(400).json({ message: "Company ID required" });

      const standup = await useCase.getStandupById(id as any);
      if (!standup || standup.companyId !== companyId)
        return res.status(404).json({ message: "Not found or unauthorized" });

      const updated = await useCase.updateStandup(id as any, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update standup" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { companyId, id } = req.params;
      if (!companyId) return res.status(400).json({ message: "Company ID required" });

      const standup = await useCase.getStandupById(id as any);
      if (!standup || standup.companyId !== companyId)
        return res.status(404).json({ message: "Not found or unauthorized" });

      await useCase.deleteStandup(id as any);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete standup" });
    }
  }
}
