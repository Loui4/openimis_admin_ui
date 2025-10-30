// lib/apiService.ts
export interface FetchOptions extends RequestInit {
  baseUrl?: string; // optional base URL
}

export async function apiService<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL, ...fetchOptions } = options;

  const res = await fetch(`http://localhost:4000/${endpoint}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${res.status} - ${errorText}`);
  }

  return res.json();
}
