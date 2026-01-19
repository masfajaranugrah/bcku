export declare class AppSuccess {
    readonly message: string;
    readonly statusCode: number;
    readonly data?: any;
    constructor(message: string, data?: any, statusCode?: number);
    toJSON(): {
        status: string;
        statusCode: number;
        message: string;
        data: any;
    };
}
//# sourceMappingURL=AppSuccess.d.ts.map