export default class ResponseCustom {

    constructor(public message: string, public data: any = null, public code = 200, optionals?: {}) {
        this.message = message;
        this.data = data;
        this.code = code;
    }
}