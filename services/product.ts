import { Product } from "@/interface";
import { apiService } from "@/lib/apiService";

export async function getProducts() {
    return apiService<Product[]>("product");
}