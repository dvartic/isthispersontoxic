export function getCustomError(message: string, customCode: number) {
    interface CustomError extends Error {
        customCode?: number;
    }
    const error: CustomError = new Error(message);
    error.customCode = customCode;
    return error;
}

export async function parseJsonReq(request: Request) {
    try {
        return await request.json();
    } catch {
        throw getCustomError("Invalid JSON", 400);
    }
}
