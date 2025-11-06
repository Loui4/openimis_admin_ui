"use client";
import { DataGridComponent } from "@/components/dataGrid";
import { PriceList } from "@/interface";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

export const PriceListList: FC<{ priceLists: PriceList[] }> = ({
  priceLists,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<PriceList | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: PriceList
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const columns: GridColDef[] = [
    { field: "PLServiceID", headerName: "Service ID", flex: 1 },
    { field: "PLServName", headerName: "Service Name", flex: 2 },
    {
      field: "DatePL",
      headerName: "Price List Date",
      flex: 1,
    },
    { field: "NumberOfServices", headerName: "Number of Services", flex: 1 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => handleMenuOpen(e, params.row)}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridComponent
        rows={priceLists}
        columns={columns}
        rowIdField="PLServiceID"
      />

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() =>
            router.push(`/price-lists/${selectedRow?.PLServiceID}/view`)
          }
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/price-lists/${selectedRow?.PLServiceID}/edit`)
          }
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(
              `/price-lists/${selectedRow?.PLServiceID}/attach-services`
            )
          }
        >
          Attach Services
        </MenuItem>
        <MenuItem onClick={() => router.push("/view")}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
