class CustomError extends Error {
    constructor(message: string, public data?: any, public statusCode?: number) {
        super(message);
        this.name = this.constructor.name;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }

    badRequest(ctx: any) {
        ctx.badRequest(this.message, this?.data);
    }
}

export default CustomError;