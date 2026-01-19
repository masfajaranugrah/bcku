import { Model, Optional } from "sequelize";
interface NoteAttributes {
    id: string;
    userId: string;
    companyId: string;
    title: string;
    content: string;
    status: "todo" | "in_progress" | "done";
    color: string;
    priority: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface NoteCreationAttributes extends Optional<NoteAttributes, "id" | "priority" | "color"> {
}
export declare class NoteModel extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
    id: string;
    userId: string;
    companyId: string;
    title: string;
    content: string;
    status: "todo" | "in_progress" | "done";
    color: string;
    priority: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
//# sourceMappingURL=noteModel.d.ts.map