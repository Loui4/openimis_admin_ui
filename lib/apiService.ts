// lib/apiService.ts
'use server'
export interface FetchOptions extends RequestInit {
  baseUrl?: string; // optional base URL
  isFormData?: boolean; // flag for file uploads
}

export async function apiService<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL, isFormData, ...fetchOptions } = options;

  console.log({baseUrl});

  const headers: HeadersInit = isFormData
    ? (fetchOptions.headers as HeadersInit) || {} // don't set Content-Type
    : {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers || {}),
      };

  const res = await fetch(`${baseUrl}/${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${res.status} - ${errorText}`);
  }

  return res.json();
}
