import { StandupModel } from "@infrastructure/database/models/standup/standupModel";
import { CreateStandupDTO, UpdateStandupDTO } from "@application/dtos/standupDTO";
export declare class StandupRepository {
    create(data: CreateStandupDTO): Promise<StandupModel>;
    findAllByCompany(companyId: string): Promise<StandupModel[]>;
    findById(id: string): Promise<StandupModel | null>;
    update(id: string, data: UpdateStandupDTO): Promise<StandupModel | null>;
    delete(id: string): Promise<number>;
}
//# sourceMappingURL=standupRepository.d.ts.map