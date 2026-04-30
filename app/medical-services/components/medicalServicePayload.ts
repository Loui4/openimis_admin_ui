import type { MedicalService } from "@/interface";
import type { CreateMedicalServicePayload } from "@/services/medicalService";
import type { MedicalServiceFormValues } from "./medicalServiceForm";

const toTrimmedString = (value: unknown) => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

const toNumber = (value: unknown) => Number(toTrimmedString(value));

const toOptionalNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isNaN(value) ? undefined : value;
  }

  const normalizedValue = toTrimmedString(value);
  return normalizedValue === "" ? undefined : Number(normalizedValue);
};

const toDateInputValue = (value: unknown) => {
  const normalizedValue = toTrimmedString(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue.slice(0, 10);
};

export const toMedicalServicePayload = (
  values: MedicalServiceFormValues
): CreateMedicalServicePayload => ({
  ServCode: toTrimmedString(values.ServCode),
  ServName: toTrimmedString(values.ServName),
  ServType: toTrimmedString(values.ServType),
  ServLevel: toTrimmedString(values.ServLevel),
  ServPrice: toNumber(values.ServPrice),
  ServCareType: toTrimmedString(values.ServCareType),
  ServFrequency: toOptionalNumber(values.ServFrequency),
  ServPatCat: toNumber(values.ServPatCat),
  ValidityFrom: toTrimmedString(values.ValidityFrom),
  AuditUserID: toNumber(values.AuditUserID),
  MaximumAmount: toOptionalNumber(values.MaximumAmount),
  manualPrice: values.manualPrice,
  ServPackageType: toTrimmedString(values.ServPackageType),
  ServCategory: toTrimmedString(values.ServCategory) || undefined,
  LegacyID: toOptionalNumber(values.LegacyID),
});

export const toMedicalServiceFormValues = (
  service: MedicalService
): MedicalServiceFormValues => ({
  ServCode: toTrimmedString(service.ServCode),
  ServName: toTrimmedString(service.ServName),
  ServType: toTrimmedString(service.ServType),
  ServLevel: toTrimmedString(service.ServLevel),
  ServPrice: toTrimmedString(service.ServPrice),
  ServCareType: toTrimmedString(service.ServCareType),
  ServFrequency: toTrimmedString(service.ServFrequency),
  ServPatCat: toTrimmedString(service.ServPatCat),
  ValidityFrom: toDateInputValue(service.ValidityFrom),
  AuditUserID: toTrimmedString(service.AuditUserID),
  MaximumAmount: toTrimmedString(service.MaximumAmount),
  manualPrice: Boolean(service.manualPrice),
  ServPackageType: toTrimmedString(service.ServPackageType),
  ServCategory: toTrimmedString(service.ServCategory),
  LegacyID: toTrimmedString(service.LegacyID),
});
