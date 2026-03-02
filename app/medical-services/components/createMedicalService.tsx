"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import {
  createMedicalService,
} from "@/services/medicalService";
import type { CreateMedicalServicePayload } from "@/services/medicalService";
import {
  MedicalServiceForm,
  MedicalServiceFormValues,
} from "./medicalServiceForm";

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

const toPayload = (
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

export const CreateMedicalService = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: MedicalServiceFormValues) => {
    setLoading(true);
    setSubmitError(null);

    try {
      await createMedicalService(toPayload(values));
      router.replace("/medical-services?created=1");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create medical service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <MedicalServiceForm
        onSubmit={handleSubmit}
        loading={loading}
        submitError={submitError}
      />
      <Button
        variant="text"
        onClick={() => router.push("/medical-services")}
        disabled={loading}
        sx={{ alignSelf: "flex-start" }}
      >
        Cancel
      </Button>
    </Stack>
  );
};
