"use client";

import type { MedicalService } from "@/interface";
import { updateMedicalServicePrice } from "@/services/medicalService";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

type Props = {
  service: MedicalService;
};

export const UpdateMedicalServicePrice = ({ service }: Props) => {
  const router = useRouter();
  const [price, setPrice] = useState(String(service.ServPrice ?? ""));
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextPrice = Number(price);

    if (!Number.isFinite(nextPrice)) {
      setSubmitError("Service price must be a valid number.");
      return;
    }

    try {
      setLoading(true);
      await updateMedicalServicePrice(service.ServiceID, nextPrice);
      sessionStorage.setItem("medicalServicePriceUpdated", "1");
      router.back();
      setTimeout(() => router.refresh(), 100);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to update service price."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ maxWidth: 520 }}
    >
      <Typography variant="h5">Update Service Price</Typography>
      <Typography color="text.secondary">
        {service.ServCode} - {service.ServName}
      </Typography>

      <TextField
        label="Price (MWK)"
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        inputProps={{ step: "0.01" }}
        required
      />

      {submitError ? <Alert severity="error">{submitError}</Alert> : null}

      <Stack direction="row" spacing={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Updating..." : "Update price"}
        </Button>
        <Button
          variant="text"
          onClick={() => router.push("/medical-services")}
          disabled={loading}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};
