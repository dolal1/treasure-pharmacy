const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  fields: Record<string, string[]>;

  constructor(status: number, fields: Record<string, string[]> = {}) {
    super(`API request failed with status ${status}`);
    this.status = status;
    this.fields = fields;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new ApiError(res.status);
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let fields: Record<string, string[]> = {};
    try {
      fields = await res.json();
    } catch {
      // non-JSON error body — status alone is enough
    }
    throw new ApiError(res.status, fields);
  }
  return res.json();
}
