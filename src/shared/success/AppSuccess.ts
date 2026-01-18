export class AppSuccess {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly data?: any;

    constructor(message: string, data?: any, statusCode = 200) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    toJSON() {
        return {
            status: "success",
            statusCode: this.statusCode,
            message: this.message,
            data: this.data || null
        };
    }
}
