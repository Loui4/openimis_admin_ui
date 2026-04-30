"use client";

import { FormDatePicker, FormikInit, TextInputField } from "@/components/form";
import { Alert, Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC } from "react";
import * as Yup from "yup";

export type MedicalServiceFormValues = {
  ServCode: string;
  ServName: string;
  ServType: string;
  ServLevel: string;
  ServPrice: string;
  ServCareType: string;
  ServFrequency: string;
  ServPatCat: string;
  ValidityFrom: string;
  AuditUserID: string;
  MaximumAmount: string;
  manualPrice: boolean;
  ServPackageType: string;
  ServCategory: string;
  LegacyID: string;
};

const form = {
  ServCode: { label: "Service Code", name: "ServCode" },
  ServName: { label: "Service Name", name: "ServName" },
  ServType: { label: "Service Type", name: "ServType" },
  ServLevel: { label: "Service Level", name: "ServLevel" },
  ServPrice: { label: "Service Price", name: "ServPrice" },
  ServCareType: { label: "Care Type", name: "ServCareType" },
  ServFrequency: { label: "Frequency", name: "ServFrequency" },
  ServPatCat: { label: "Patient Category", name: "ServPatCat" },
  ValidityFrom: { label: "Validity From", name: "ValidityFrom" },
  AuditUserID: { label: "Audit User ID", name: "AuditUserID" },
  MaximumAmount: { label: "Maximum Amount", name: "MaximumAmount" },
  ServPackageType: { label: "Package Type", name: "ServPackageType" },
  ServCategory: { label: "Service Category", name: "ServCategory" },
  LegacyID: { label: "Legacy ID", name: "LegacyID" },
};

const optionalNumber = (label: string) =>
  Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError(`${label} must be a number`)
    .nullable();

const schema = Yup.object().shape({
  [form.ServCode.name]: Yup.string()
    .max(6)
    .required()
    .label(form.ServCode.label),
  [form.ServName.name]: Yup.string()
    .max(100)
    .required()
    .label(form.ServName.label),
  [form.ServType.name]: Yup.string()
    .length(1)
    .required()
    .label(form.ServType.label),
  [form.ServLevel.name]: Yup.string()
    .length(1)
    .required()
    .label(form.ServLevel.label),
  [form.ServPrice.name]: Yup.number()
    .typeError(`${form.ServPrice.label} must be a number`)
    .required()
    .label(form.ServPrice.label),
  [form.ServCareType.name]: Yup.string()
    .length(1)
    .required()
    .label(form.ServCareType.label),
  [form.ServFrequency.name]: optionalNumber(form.ServFrequency.label),
  [form.ServPatCat.name]: Yup.number()
    .typeError(`${form.ServPatCat.label} must be a number`)
    .required()
    .label(form.ServPatCat.label),
  [form.ValidityFrom.name]: Yup.string()
    .required()
    .label(form.ValidityFrom.label),
  [form.AuditUserID.name]: Yup.number()
    .typeError(`${form.AuditUserID.label} must be a number`)
    .required()
    .label(form.AuditUserID.label),
  [form.MaximumAmount.name]: optionalNumber(form.MaximumAmount.label),
  [form.ServPackageType.name]: Yup.string()
    .length(1)
    .required()
    .label(form.ServPackageType.label),
  [form.ServCategory.name]: Yup.string()
    .max(1)
    .label(form.ServCategory.label),
  [form.LegacyID.name]: optionalNumber(form.LegacyID.label),
});

const defaultInitialValues: MedicalServiceFormValues = {
  ServCode: "",
  ServName: "",
  ServType: "O",
  ServLevel: "1",
  ServPrice: "",
  ServCareType: "O",
  ServFrequency: "",
  ServPatCat: "1",
  ValidityFrom: new Date().toISOString().slice(0, 10),
  AuditUserID: "1",
  MaximumAmount: "",
  manualPrice: false,
  ServPackageType: "S",
  ServCategory: "",
  LegacyID: "",
};

interface Props {
  onSubmit: (values: MedicalServiceFormValues) => void | Promise<void>;
  loading?: boolean;
  submitError?: string | null;
  initialValues?: MedicalServiceFormValues;
  submitButtonText?: string;
  showServicePrice?: boolean;
}

export const MedicalServiceForm: FC<Props> = ({
  onSubmit,
  loading = false,
  submitError,
  initialValues = defaultInitialValues,
  submitButtonText = "Save service",
  showServicePrice = true,
}) => {
  return (
    <FormikInit
      validationSchema={schema}
      onSubmit={(values: MedicalServiceFormValues) => onSubmit(values)}
      initialValues={initialValues}
      submitButtonText={submitButtonText}
      loading={loading}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            <TextInputField
              id={form.ServCode.name}
              name={form.ServCode.name}
              label={form.ServCode.label}
            />
            <TextInputField
              id={form.ServName.name}
              name={form.ServName.name}
              label={form.ServName.label}
            />
            <TextInputField
              id={form.ServType.name}
              name={form.ServType.name}
              label={form.ServType.label}
            />
            <TextInputField
              id={form.ServLevel.name}
              name={form.ServLevel.name}
              label={form.ServLevel.label}
            />
            {showServicePrice ? (
              <TextInputField
                id={form.ServPrice.name}
                name={form.ServPrice.name}
                label={form.ServPrice.label}
                type="number"
              />
            ) : null}
            <TextInputField
              id={form.ServCareType.name}
              name={form.ServCareType.name}
              label={form.ServCareType.label}
            />
            <TextInputField
              id={form.ServFrequency.name}
              name={form.ServFrequency.name}
              label={form.ServFrequency.label}
              type="number"
            />
            <TextInputField
              id={form.ServPatCat.name}
              name={form.ServPatCat.name}
              label={form.ServPatCat.label}
              type="number"
            />
            <FormDatePicker
              name={form.ValidityFrom.name}
              label={form.ValidityFrom.label}
            />
            <TextInputField
              id={form.AuditUserID.name}
              name={form.AuditUserID.name}
              label={form.AuditUserID.label}
              type="number"
            />
            <TextInputField
              id={form.MaximumAmount.name}
              name={form.MaximumAmount.name}
              label={form.MaximumAmount.label}
              type="number"
            />
            <TextInputField
              id={form.ServPackageType.name}
              name={form.ServPackageType.name}
              label={form.ServPackageType.label}
            />
            <TextInputField
              id={form.ServCategory.name}
              name={form.ServCategory.name}
              label={form.ServCategory.label}
            />
            <TextInputField
              id={form.LegacyID.name}
              name={form.LegacyID.name}
              label={form.LegacyID.label}
              type="number"
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={values.manualPrice}
                onChange={(event) =>
                  setFieldValue("manualPrice", event.target.checked)
                }
              />
            }
            label="Allow manual price entry"
          />

          {submitError ? <Alert severity="error">{submitError}</Alert> : null}
        </Stack>
      )}
    </FormikInit>
  );
};
