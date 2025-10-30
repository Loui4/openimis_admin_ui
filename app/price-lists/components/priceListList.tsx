'use client'
import { DataGridComponent } from "@/app/components/dataGrid";
import { PriceList, Product } from "@/interface";
import {  GridColDef } from "@mui/x-data-grid";
import { FC } from "react";



export const columns: GridColDef[] = [
  { field: "PLServiceID", headerName: "Service ID", flex: 1 },
  { field: "PLServName", headerName: "Service Name", flex: 2 },
  {
    field: "DatePL",
    headerName: "Price List Date",
    flex: 1,
    // valueGetter: (params) => new Date(params.row.DatePL).toLocaleDateString(),
  },
  { field: "NumberOfServices", headerName: "Number of Services", flex: 1 },
];


export const PriceListList:FC<{priceLists: PriceList[]}> = ({priceLists}) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGridComponent
        rows={priceLists}
        columns={columns}
        rowIdField="PLServiceID"
      />
    </div>
  );
};
