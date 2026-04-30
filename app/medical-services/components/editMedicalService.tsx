"use client";

import type { MedicalService } from "@/interface";
import { updateMedicalService } from "@/services/medicalService";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MedicalServiceForm,
  MedicalServiceFormValues,
} from "./medicalServiceForm";
import {
  toMedicalServiceFormValues,
  toMedicalServicePayload,
} from "./medicalServicePayload";

type Props = {
  service: MedicalService;
};

export const EditMedicalService = ({ service }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: MedicalServiceFormValues) => {
    setLoading(true);
    setSubmitError(null);

    try {
      await updateMedicalService(
        service.ServiceID,
        toMedicalServicePayload(values)
      );
      router.replace("/medical-services");
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to update medical service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Edit Medical Service</Typography>
      <MedicalServiceForm
        initialValues={toMedicalServiceFormValues(service)}
        onSubmit={handleSubmit}
        loading={loading}
        submitError={submitError}
        submitButtonText="Update service"
        showServicePrice={false}
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
