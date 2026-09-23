import { API_BASE_URL } from "@/lib/config";
import { clearToken, getToken } from "@/lib/auth/tokenStorage";

/** Thrown for any non-2xx response; carries the HTTP status and, for 400s, field errors. */
export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(status: number, message: string, errors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

function friendlyMessageFor(status: number): string {
  switch (status) {
    case 400:
      return "Please check the information you entered and try again.";
    case 401:
      return "Please log in again to continue.";
    case 403:
      return "You don't have access to do that.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 409:
      return "That already exists.";
    default:
      return "Something went wrong. Please try again.";
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/** Lets the auth context react to a 401 (clear session, redirect to /login) in one place. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Set to false for public endpoints that must never send a token. Defaults to true. */
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = options;
  const isFormData = body instanceof FormData;
  const headers: Record<string, string> = isFormData ? {} : { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Unable to reach the server. Check your connection and try again.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get("content-type")?.includes("application/json") ?? false;
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearToken();
      unauthorizedHandler?.();
    }
    const message = (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string")
      ? payload.message
      : friendlyMessageFor(response.status);
    const errors = (payload && typeof payload === "object" && "errors" in payload) ? (payload.errors as Record<string, string>) : undefined;
    throw new ApiError(response.status, message, errors);
  }

  return payload as T;
}

/** Reusable, centralized HTTP layer — components should never call fetch() directly. */
export const apiClient = {
  get: <T,>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T,>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T,>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "PUT", body }),
  patch: <T,>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  /** For multipart/form-data uploads - pass a FormData instance as the body. */
  upload: <T,>(path: string, formData: FormData, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "POST", body: formData }),
  delete: <T,>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
