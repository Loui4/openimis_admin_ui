'use server'
import { MedicalService } from "@/interface";
import { apiService } from "@/lib/apiService";
import {UploadResponse} from "../interface"



export async function getMedicalServices() {
    return apiService<MedicalService[]>("service");
}
export async function dryRunUploadServices(file:any) {
    const formData = new FormData();
    formData.append("file", file);
    return apiService<UploadResponse>("service/dry-upload-csv",{
        method:"POST",
        body: formData,
        isFormData: true,
    });
}
export async function confirmUploadServices(file:any) {
    const formData = new FormData();
    formData.append("file", file);
    return apiService<UploadResponse>("service/upload-csv",{
        method:"POST",
        body: formData,
        isFormData: true,
    });
}
