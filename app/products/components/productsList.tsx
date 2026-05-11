"use client";

import { DataGridComponent } from "@/components/dataGrid";
import { Product } from "@/interface";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Typography } from "@mui/material";
import { FC } from "react";

const numberFormatter = new Intl.NumberFormat("en-MW");

const columns: GridColDef[] = [
  {
    field: "ProductCode",
    headerName: "Code",
    minWidth: 132,
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          borderRadius: 1,
          bgcolor: "#eef6f7",
          color: "#005565",
          fontFamily: "monospace",
          fontWeight: 700,
          minWidth: 64,
        }}
      />
    ),
  },
  {
    field: "ProductName",
    headerName: "Product",
    minWidth: 260,
    flex: 1.8,
    renderCell: (params) => (
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: "#17262b",
            fontWeight: 650,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {params.value}
        </Typography>
        <Typography sx={{ color: "#728087", fontSize: 12 }}>
          Code {params.row.ProductCode}
        </Typography>
      </Box>
    ),
  },
  {
    field: "Region",
    headerName: "Region",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ color: "#42545b", fontWeight: 600 }}>
        {params.value || "Not set"}
      </Typography>
    ),
  },
  {
    field: "District",
    headerName: "District",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ color: "#42545b" }}>
        {params.value || "Not set"}
      </Typography>
    ),
  },
  {
    field: "NumberOfServices",
    headerName: "Services",
    minWidth: 132,
    flex: 0.8,
    type: "number",
    renderCell: (params) => (
      <Chip
        label={numberFormatter.format(Number(params.value || 0))}
        size="small"
        sx={{
          borderRadius: 1,
          bgcolor: "#f3f1ec",
          color: "#73510b",
          fontWeight: 650,
          minWidth: 56,
        }}
      />
    ),
  },
  {
    field: "MemberCount",
    headerName: "Members",
    minWidth: 132,
    flex: 0.8,
    type: "number",
    renderCell: (params) => (
      <Typography sx={{ color: "#17262b", fontWeight: 700 }}>
        {numberFormatter.format(Number(params.value || 0))}
      </Typography>
    ),
  },
];

export const ProductList: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGridComponent
        rows={products}
        columns={columns}
        rowIdField="ProductCode"
        height={620}
        searchPlaceholder="Search by product code, name, region, district, or members"
      />
    </Box>
  );
};
