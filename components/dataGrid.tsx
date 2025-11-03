import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

interface Props {
  rows: any;
  columns: GridColDef[];
  rowIdField?: string; // optional, defaults to 'ProductCode'
}

export const DataGridComponent: FC<Props> = ({
  rows,
  columns,
  rowIdField = "ProductCode",
}) => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row[rowIdField]} // use the unique field for row id
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
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
        }}
      />
    </div>
  );
};
