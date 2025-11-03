"use server";
import { apiService } from "@/lib/apiService"

export const createPriceListDetail = async (data:any)=>{
    return apiService('price-service-detail',{
        method:"POST",
        body: JSON.stringify(data),
    })
}

export async function savePriceListDetailsAction(
  PLServiceID: string,
  services: { ServiceID: number; ValidityFrom: string }[]
) {
  return await createPriceListDetail({ PLServiceID: Number(PLServiceID), services });
}