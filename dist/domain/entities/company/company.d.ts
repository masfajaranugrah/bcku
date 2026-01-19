export interface Company {
    id?: string;
    name: string;
    code?: string | null;
    plan: "FREE" | "PREMIUM" | "ENTERPRISE";
    address?: string | null;
    phone?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=company.d.ts.map