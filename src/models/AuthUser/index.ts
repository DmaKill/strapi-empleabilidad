export default class AuthUser {
    public id: number;
    public username: string;
    public email: string;
    public provider: string;
    public password: string;
    public resetPasswordToken: string;
    public confirmationToken: string;
    public confirmed: boolean;
    public blocked: boolean;
    public createdAt: string;
    public updatedAt: string;
    public role: {
        id: number;
        name: string;
        description: string;
        type: "authenticated" | "public";
        createdAt: string;
        updatedAt: string;
    };

    constructor(ctx: any) {
        Object.assign(this, ctx?.state?.auth?.credentials);
    }
}