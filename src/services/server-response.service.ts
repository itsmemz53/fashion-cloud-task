export class ServerResponse {

    public result: any;
    public responseCode: number;
    public message: string;

    constructor(result: any, responseCode: number, message?: string) {
        this.result = result || null;
        this.responseCode = responseCode;
        this.message = message || "";
    }
}
