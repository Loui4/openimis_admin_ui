'use server'
import { PriceList } from "@/interface";
import { apiService } from "@/lib/apiService";

export async function getPriceLists() {
    return apiService<PriceList[]>("price-list");
}

export async function savePriceList(data:any){
    console.log({data});
    return apiService<PriceList>('price-list',{method:"POST", body:JSON.stringify(data)})
}

export async function getOnePriceList(id:number){
    return apiService<PriceList>(`price-list/${id}`)
}