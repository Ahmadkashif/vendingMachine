export default class Response implements HttpEvent {
    headers: Record<string, string>;
    url: string;
    method: string;
    statusCode: number;
    body: any;

    constructor(headers: Record<string, string>, url: string, method: string, statusCode: number, body: any) {
        this.headers = headers;
        this.url = url;
        this.method = method;
        this.statusCode = statusCode;
        this.body = body;
    }

    // Add any additional methods or properties specific to the Response class
}