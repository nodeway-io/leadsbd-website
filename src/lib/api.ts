/**
 * API Configuration
 * 
 * In development: Uses Vite proxy (default, no env var needed)
 * In production: Set VITE_API_BASE_URL to your backend URL (e.g., https://api.yourdomain.com)
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function getApiUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
