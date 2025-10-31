import { MedicalService } from "@/interface";
import { apiService } from "@/lib/apiService";

export async function getMedicalServices() {
    return apiService<MedicalService[]>("service");
}