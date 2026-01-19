import { CreateSprintDTO, UpdateSprintDTO } from "@application/dtos/sprintDTO";
export declare class SprintUseCase {
    private repository;
    constructor();
    createSprint(data: CreateSprintDTO): Promise<import("../../../infrastructure/database/models/sprint/sprintModel").default>;
    getAllSprints(companyId: string): Promise<import("../../../infrastructure/database/models/sprint/sprintModel").default[]>;
    getSprintById(id: string): Promise<import("../../../infrastructure/database/models/sprint/sprintModel").default | null>;
    updateSprint(id: string, data: UpdateSprintDTO): Promise<import("../../../infrastructure/database/models/sprint/sprintModel").default | null>;
    deleteSprint(id: string): Promise<number>;
}
//# sourceMappingURL=sprintUseCase.d.ts.map