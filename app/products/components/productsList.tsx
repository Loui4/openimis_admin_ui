'use client'
import { DataGridComponent } from "@/components/dataGrid";
import { Product } from "@/interface";
import {  GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";


const columns: GridColDef[] = [
  { field: "ProductCode", headerName: "Product Code", flex: 1 },
  { field: "ProductName", headerName: "Product Name", flex: 1 },
  { field: "Region", headerName: "Region", flex: 1 },
  { field: "District", headerName: "District", flex: 1 },
  { field: "NumberOfServices", headerName: "Number Of Services", flex: 1 },
  { field: "MemberCount", headerName: "Member Count", flex: 1 },
];
export const ProductList:FC<{products: Product[]}> = ({products}) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGridComponent
        rows={products}
        columns={columns}
        rowIdField="ProductCode"
      />
    </div>
  );
};
