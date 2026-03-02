"use server";

import { MedicalService } from "@/interface";
import { apiService } from "@/lib/apiService";
import { UploadResponse } from "../interface";

export async function getMedicalServices() {
  return apiService<MedicalService[]>("service");
}

export type CreateMedicalServicePayload = {
  ServCode: string;
  ServName: string;
  ServType: string;
  ServLevel: string;
  ServPrice: number;
  ServCareType: string;
  ServFrequency?: number;
  ServPatCat: number;
  ValidityFrom: string;
  AuditUserID: number;
  MaximumAmount?: number;
  manualPrice: boolean;
  ServPackageType: string;
  ServCategory?: string;
  LegacyID?: number;
};

type CreateMedicalServiceResponse = {
  message: string;
  ServiceUUID: string;
};

export async function createMedicalService(payload: CreateMedicalServicePayload) {
  return apiService<CreateMedicalServiceResponse>("service/medical-service", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function dryRunUploadServices(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return apiService<UploadResponse>("service/dry-upload-csv", {
    method: "POST",
    body: formData,
    isFormData: true,
  });
}

export async function confirmUploadServices(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return apiService<UploadResponse>("service/upload-csv", {
    method: "POST",
    body: formData,
    isFormData: true,
  });
}
