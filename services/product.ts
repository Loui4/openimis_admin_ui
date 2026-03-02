import { Product } from "@/interface";
import { apiService } from "@/lib/apiService";

export type CreateProductPayload = {
  productCode: string;
  productName: string;
  dateFrom: string; // ISO date: "2026-01-01"
  dateTo: string;   // ISO date: "2026-12-31"
  lumpSum: number;
  memberCount: number;
  gracePeriod: number;
  auditUserId: number;
  insurancePeriod: number;
  locationId?: number;
};

export async function getProducts() {
  return apiService<Product[]>("product");
}

export async function createProduct(payload: CreateProductPayload) {
  return apiService<Product>("product", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * OPTIONAL: only use if you add these endpoints in the backend
 */
export async function updateProduct(productId: number, payload: Partial<CreateProductPayload>) {
  return apiService<Product>(`product/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(productId: number) {
  return apiService<void>(`product/${productId}`, {
    method: "DELETE",
  });
}
