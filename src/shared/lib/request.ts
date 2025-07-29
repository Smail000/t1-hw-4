
type Method = "GET" | "POST" | "PATCH" | "DELETE";
type Returns<T> = { data: T, statusCode: number }

export async function request<T, K>(url: string, method: Method, body?: K): Promise<Returns<T>> {
    const result = await fetch(url, {
        method,
        headers: ["POST", "PATCH"].includes(method) ? {
            "Content-Type": "application/json;charset=utf-8"
        } : {},
        body: JSON.stringify(body)
    });
    const data = await result.json();
    const statusCode = result.status;

    return { data, statusCode }
}
