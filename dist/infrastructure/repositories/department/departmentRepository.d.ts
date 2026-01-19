export declare class DepartmentRepository {
    /**
     * Buat department baru
     */
    create(data: {
        name: string;
        companyId: string;
        description?: string;
    }): Promise<any>;
    /**
     * Cari department berdasarkan ID dan companyId
     */
    findByIdAndCompany(id: string, companyId: string): Promise<any>;
    /**
     * Cari department berdasarkan nama dan companyId
     */
    findByNameAndCompany(name: string, companyId: string): Promise<any>;
    /**
     * Ambil semua department
     */
    findAll(): Promise<any>;
    /**
     * Ambil department berdasarkan ID
     */
    findById(id: string): Promise<any>;
    /**
     * Ambil semua department berdasarkan companyId
     */
    findByCompanyId(companyId: string): Promise<any>;
    /**
     * Update department
     */
    update(id: string, data: Partial<{
        name: string;
        description?: string;
    }>): Promise<any>;
    /**
     * Hapus department
     */
    delete(id: string): Promise<boolean>;
    /**
     * Cari department berdasarkan keyword
     */
    searchByName(keyword: string, companyId?: string): Promise<any>;
    /**
     * Ambil semua user dalam department
     */
    findUsers(departmentId: string): Promise<any>;
}
//# sourceMappingURL=departmentRepository.d.ts.map