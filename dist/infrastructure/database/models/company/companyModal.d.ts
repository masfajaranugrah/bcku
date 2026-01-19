import { Model } from "sequelize";
export interface CompanyAttributes {
    id?: string;
    name: string;
    code?: string | null;
    paketId?: string | null;
    address?: string | null;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class CompanyModel extends Model<CompanyAttributes> implements CompanyAttributes {
    id: string;
    name: string;
    code: string | null;
    paketId: string | null;
    address: string | null;
    phone: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export default CompanyModel;
//# sourceMappingURL=companyModal.d.ts.map