import { PriceList } from "@/interface";
import { apiService } from "@/lib/apiService";

export async function getPriceLists() {
    return apiService<PriceList[]>("price-list");
}