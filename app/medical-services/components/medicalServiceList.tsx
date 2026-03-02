"use client";
import { DataGridComponent } from "@/components/dataGrid";
import { MedicalService } from "@/interface";
import { GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

const readableDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const formatReadableDate = (value: unknown) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      return readableDateFormatter.format(
        new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
      );
    }
  }

  const parsedDate = new Date(String(value));

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  return readableDateFormatter.format(parsedDate);
};

export const columns: GridColDef[] = [
  { field: "ServCode", headerName: "Service Code", flex: 1 },
  { field: "ServName", headerName: "Service Name", flex: 2 },
  { field: "ServType", headerName: "Type" },
  { field: "ServLevel", headerName: "Level" },
  { field: "ServPrice", headerName: "Price (MWK)", flex: 1, type: "number" },
  { field: "ServCareType", headerName: "Care Type" },
  // { field: "ServFrequency", headerName: "Frequency", flex: 1, type: "number" },
  // { field: "ServPatCat", headerName: "Patient Category", flex: 1 },
  {
    field: "ValidityFrom",
    headerName: "Validity From",
    flex: 1,
    valueFormatter: (value) => formatReadableDate(value),
  },
  // {
  //   field: "ValidityTo",
  //   headerName: "Validity To",
  //   flex: 1,
  // },
  // { field: "MaximumAmount", headerName: "Max Amount", flex: 1, type: "number" },
  // {
  //   field: "manualPrice",
  //   headerName: "Manual Price",
  //   flex: 1,
  // },
  // { field: "ServPackageType", headerName: "Package Type", flex: 1 },
  // { field: "ServCategory", headerName: "Category", flex: 1 },
];

export const MedicalServiceList: FC<{
  medicalServiceList: MedicalService[];
}> = ({ medicalServiceList }) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGridComponent
        rows={medicalServiceList}
        columns={columns}
        rowIdField="ServCode"
      />
    </div>
  );
};
