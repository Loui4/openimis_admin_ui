'use server';

import { PriceList } from '@/interface';
import { apiService } from '@/lib/apiService';

export async function getPriceLists() {
  return apiService<PriceList[]>('price-list');
}

export async function savePriceList(data: any) {
  return apiService<PriceList>('price-list', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOnePriceList(id: number) {
  return apiService<PriceList>(`price-list/${id}`);
}

/**
 * Soft delete a price list (sets ValidityTo on backend)
 */
export async function deletePriceList(id: number) {
  return apiService<void>(`price-list/${id}`, {
    method: 'DELETE',
  });
}
