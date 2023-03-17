export default class Request implements HttpEvent {
    headers: Record<string, string>;
    url: string;
    method: string;
    body: any;
  
    constructor(headers: Record<string, string>, url: string, method: string, body: any) {
      this.headers = headers;
      this.url = url;
      this.method = method;
      this.body = body;
    }
  
}