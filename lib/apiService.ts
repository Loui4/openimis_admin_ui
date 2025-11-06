// lib/apiService.ts
'use server'

import { cookies } from 'next/headers';

export interface FetchOptions extends RequestInit {
  baseUrl?: string;
  isFormData?: boolean;
  withAuth?: boolean;
}

export async function apiService<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL, isFormData, withAuth=true, ...fetchOptions } = options;

  let headers: Record<string, string> = isFormData
    ? (fetchOptions.headers as Record<string, string>) || {}
    : { 'Content-Type': 'application/json', ...(fetchOptions.headers as Record<string, string> || {}) };

  if (withAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
  }

  const res = await fetch(`${baseUrl}/${endpoint}`, { ...fetchOptions, headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function loginService(username: string, password: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth_token',
    value: data.access_token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return data;
}

export async function logoutService() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}
