"use client";
import { FormDatePicker } from "@/components/form";
import { FormikInit } from "@/components/form/formik";
import { TextInputField } from "@/components/form/textInput";
import { FC } from "react";
import * as Yup from "yup";

const form = {
  PLServName: {
    label: "Price List Name",
    name: "PLServName",
  },
  DatePL: {
    label: "Effective Date",
    name: "DatePL",
  },
  ValidityFrom: {
    label: "Valid From",
    name: "ValidityFrom",
  },
};

const schema = Yup.object().shape({
  [form.PLServName.name]: Yup.string().required().label(form.PLServName.label),
  // [form.DatePL.name]: Yup.date().required().label(form.DatePL.label),
  // [form.ValidityFrom.name]: Yup.date()
  //   .required()
  //   .label(form.ValidityFrom.label),
});

interface Props {
  onSubmit: (values: any) => void;
}

export const PriceListForm: FC<Props> = ({ onSubmit }) => {
  return (
    <FormikInit
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{ PLServName: "" }}
    >
      <TextInputField
        name={form.PLServName.name}
        label={form.PLServName.label}
        id={form.PLServName.name}
      />
      {/* <FormDatePicker name={form.DatePL.name} label={form.DatePL.label} />
      <FormDatePicker
        name={form.ValidityFrom.name}
        label={form.ValidityFrom.label}
      /> */}
    </FormikInit>
  );
};
