"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState, useMemo } from "react";
import { TextField, Box } from "@mui/material";

interface Props {
  rows: any[];
  columns: GridColDef[];
  rowIdField?: string; // optional, defaults to 'ProductCode'
}

export const DataGridComponent: FC<Props> = ({
  rows,
  columns,
  rowIdField = "ProductCode",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // filter rows by search term across all fields
  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;

    const lowerQuery = searchQuery.toLowerCase();

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerQuery)
      )
    );
  }, [rows, searchQuery]);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {/* 🔍 Search Bar */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, width: "40%" }}
      />

      {/* 🧾 DataGrid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row[rowIdField]}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: 14,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f1f3f4",
            color: "#202124",
            fontWeight: 600,
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiDataGrid-columnSeparator, & .MuiDataGrid-iconSeparator": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};
