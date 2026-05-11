"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Box, InputAdornment, SxProps, Theme } from "@mui/material";

interface Props {
  rows: any[];
  columns: GridColDef[];
  rowIdField?: string; // optional, defaults to 'ProductCode'
  height?: number | string;
  searchPlaceholder?: string;
  gridSx?: SxProps<Theme>;
}

export const DataGridComponent: FC<Props> = ({
  rows,
  columns,
  rowIdField = "ProductCode",
  height = 600,
  searchPlaceholder = "Search...",
  gridSx,
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
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7c8a90", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", sm: 360 },
            "& .MuiOutlinedInput-root": {
              bgcolor: "#fff",
              borderRadius: 1.5,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          height,
          width: "100%",
          border: "1px solid #dce5e8",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row[rowIdField]}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
          rowHeight={58}
          columnHeaderHeight={48}
          sx={{
            border: 0,
            fontFamily: "Roboto, Arial, sans-serif",
            fontSize: 14,
            color: "#223238",
            bgcolor: "#fff",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f8f9",
              color: "#4a5a60",
              fontWeight: 700,
              borderBottom: "1px solid #dce5e8",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 0,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #edf2f4",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fbfb",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #dce5e8",
              minHeight: 48,
            },
            "& .MuiDataGrid-columnSeparator, & .MuiDataGrid-iconSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            ...gridSx,
          }}
        />
      </Box>
    </Box>
  );
};
