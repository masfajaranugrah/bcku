import SprintModel from "@infrastructure/database/models/sprint/sprintModel";
import { CreateSprintDTO, UpdateSprintDTO } from "@application/dtos/sprintDTO";
export declare class SprintRepository {
    create(data: CreateSprintDTO): Promise<SprintModel>;
    findAllByCompany(companyId: string): Promise<SprintModel[]>;
    findById(id: string): Promise<SprintModel | null>;
    update(id: string, data: UpdateSprintDTO): Promise<SprintModel | null>;
    delete(id: string): Promise<number>;
}
//# sourceMappingURL=sprintRepository.d.ts.map