import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";

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

interface NoteCreationAttributes extends Optional<NoteAttributes, "id" | "priority" | "color"> { }

export class NoteModel
    extends Model<NoteAttributes, NoteCreationAttributes>
    implements NoteAttributes {
    public id!: string;
    public userId!: string;
    public companyId!: string;
    public title!: string;
    public content!: string;
    public status!: "todo" | "in_progress" | "done";
    public color!: string;
    public priority!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

NoteModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("todo", "in_progress", "done"),
            defaultValue: "todo",
        },
        color: {
            type: DataTypes.STRING(20),
            defaultValue: "yellow", // yellow, pink, blue, green
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "notes",
        timestamps: true,
    }
);
