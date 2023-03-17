interface HttpEvent {
    headers: Record<string, string>;
    url: string;
    method: string;
}