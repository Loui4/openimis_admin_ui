'use client';
import { apiService } from "@/lib/apiService";

export async function getCurrentUser() {
  try {
    const user = await apiService('users/me/profile', { method: 'GET' });
    return user; // logged in
  } catch (err) {
    return null; // not logged in
  }
}