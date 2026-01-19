import { z } from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    companyName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const registerMemberSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    roleId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodString;
}, z.core.$strip>;
export declare const verificationSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const requestResetSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const subscriptionOrderSchema: z.ZodObject<{
    packageId: z.ZodString;
    duration: z.ZodNumber;
}, z.core.$strip>;
export declare const subscriptionParamsSchema: z.ZodObject<{
    companyId: z.ZodString;
    userId: z.ZodString;
}, z.core.$strip>;
export declare const createSprintSchema: z.ZodObject<{
    name: z.ZodString;
    goal: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        PLANNED: "PLANNED";
        IN_PROGRESS: "IN_PROGRESS";
        DONE: "DONE";
    }>>;
    storyPoints: z.ZodOptional<z.ZodNumber>;
    progress: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateSprintSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    goal: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        PLANNED: "PLANNED";
        IN_PROGRESS: "IN_PROGRESS";
        DONE: "DONE";
    }>>>;
    storyPoints: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    progress: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const createAbsensiSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        Hadir: "Hadir";
        Sakit: "Sakit";
        Izin: "Izin";
        hadir: "hadir";
        sakit: "sakit";
        izin: "izin";
        cuti: "cuti";
        HADIR: "HADIR";
        IZIN: "IZIN";
        SAKIT: "SAKIT";
        CUTI: "CUTI";
        Cuti: "Cuti";
    }>>;
    keterangan: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<number | undefined, string>>, z.ZodNumber]>>;
    longitude: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<number | undefined, string>>, z.ZodNumber]>>;
}, z.core.$strip>;
export declare const createKpiSchema: z.ZodObject<{
    sprintId: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    target: z.ZodNumber;
    achieved: z.ZodDefault<z.ZodNumber>;
    unit: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateMemberSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const uuidParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const companyIdParamSchema: z.ZodObject<{
    companyId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map