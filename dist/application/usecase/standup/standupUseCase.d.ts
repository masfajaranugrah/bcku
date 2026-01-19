import { CreateStandupDTO, UpdateStandupDTO } from "@application/dtos/standupDTO";
export declare class StandupUseCase {
    private repo;
    constructor();
    createStandup(data: CreateStandupDTO): Promise<import("../../../infrastructure/database/models/standup/standupModel").StandupModel>;
    getAllStandups(companyId: string): Promise<import("../../../infrastructure/database/models/standup/standupModel").StandupModel[]>;
    getStandupById(id: string): Promise<import("../../../infrastructure/database/models/standup/standupModel").StandupModel | null>;
    updateStandup(id: string, data: UpdateStandupDTO): Promise<import("../../../infrastructure/database/models/standup/standupModel").StandupModel | null>;
    deleteStandup(id: string): Promise<number>;
}
//# sourceMappingURL=standupUseCase.d.ts.map