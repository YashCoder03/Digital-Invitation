/** Single place the app reads the backend base URL from — never hardcode it elsewhere. */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api").replace(/\/+$/, "");
