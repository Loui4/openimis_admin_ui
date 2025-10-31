'use client'
import { DataGridComponent } from "@/components/dataGrid";
import { MedicalService, PriceList, Product } from "@/interface";
import {  GridColDef } from "@mui/x-data-grid";
import { FC } from "react";



export const columns: GridColDef[] = [
  { field: "ServCode", headerName: "Service Code", flex: 1 },
  { field: "ServName", headerName: "Service Name", flex: 2 },
  { field: "ServType", headerName: "Type", flex: 1 },
  { field: "ServLevel", headerName: "Level", flex: 1 },
  { field: "ServPrice", headerName: "Price (MWK)", flex: 1, type: "number" },
  { field: "ServCareType", headerName: "Care Type", flex: 1 },
  { field: "ServFrequency", headerName: "Frequency", flex: 1, type: "number" },
  { field: "ServPatCat", headerName: "Patient Category", flex: 1 },
  {
    field: "ValidityFrom",
    headerName: "Validity From",
    flex: 1,
  
  },
  {
    field: "ValidityTo",
    headerName: "Validity To",
    flex: 1,
 
  },
  { field: "MaximumAmount", headerName: "Max Amount", flex: 1, type: "number" },
  {
    field: "manualPrice",
    headerName: "Manual Price",
    flex: 1,
    type: "boolean",
  },
  { field: "ServPackageType", headerName: "Package Type", flex: 1 },
  { field: "ServCategory", headerName: "Category", flex: 1 },
];


export const MedicalServiceList:FC<{medicalServiceList: MedicalService[]}> = ({medicalServiceList}) => {
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
