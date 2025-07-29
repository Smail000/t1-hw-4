
type Method = "GET" | "POST" | "PATCH" | "DELETE";
type RequestResult<T> = { data: T, statusCode: number }

export async function request<T, K = undefined>(url: string, method: Method, body?: K): Promise<RequestResult<T>> {
    const result = await fetch(url, {
        method,
        headers: ["POST", "PATCH"].includes(method) && body !== undefined ? {
            "Content-Type": "application/json;charset=utf-8"
        } : {},
        body: JSON.stringify(body)
    });
    const data = await result.json();
    const statusCode = result.status;

    return { data, statusCode }
}
