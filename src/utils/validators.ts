export function isBase64(str: string): boolean {
    const base64Pattern = /^([A-Za-z0-9+\/=]{4}){1,}([A-Za-z0-9+\/=]{2}==|[A-Za-z0-9+\/=]{3}=)?$/;
    return base64Pattern.test(str);
}