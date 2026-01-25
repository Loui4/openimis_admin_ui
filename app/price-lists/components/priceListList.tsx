"use client";

import Link from "next/link";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGridComponent } from "@/components/dataGrid";
import { PriceList } from "@/interface";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useMemo, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { deletePriceList } from "@/services/priceList";

export const PriceListList: FC<{ priceLists: PriceList[] }> = ({
  priceLists,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<PriceList | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: PriceList,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleOpenDeleteConfirm = () => {
    // keep selectedRow, but close the menu
    setAnchorEl(null);
    setConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedRow?.PLServiceID) return;

    try {
      setDeleting(true);
      await deletePriceList(selectedRow.PLServiceID);

      setConfirmOpen(false);
      setSelectedRow(null);

      // refresh server data (App Router)
      router.refresh();
    } catch (e) {
      console.error(e);
      // You can replace this with your toast/snackbar
      alert("Failed to delete price list. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "PLServiceID", headerName: "Service ID", flex: 1 },
      { field: "PLServName", headerName: "Service Name", flex: 2 },
      { field: "DatePL", headerName: "Price List Date", flex: 1 },
      { field: "NumberOfServices", headerName: "Number of Services", flex: 1 },
      {
        field: "actions",
        headerName: "",
        sortable: false,
        flex: 0.5,
        renderCell: (params) => (
          <IconButton
            onClick={(e) => handleMenuOpen(e, params.row)}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
    ],
    [],
  );

  return (
    <Stack spacing={2}>
      <Button
        component={Link}
        href="/price-lists/create"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          alignSelf: "flex-start",
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
          boxShadow: 2,
          "&:hover": { boxShadow: 4 },
        }}
      >
        Create Price List
      </Button>

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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              if (!selectedRow?.PLServiceID) return;
              handleMenuClose();
              router.push(`/price-lists/${selectedRow.PLServiceID}/view`);
            }}
          >
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (!selectedRow?.PLServiceID) return;
              handleMenuClose();
              router.push(`/price-lists/${selectedRow.PLServiceID}/edit`);
            }}
          >
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (!selectedRow?.PLServiceID) return;
              handleMenuClose();
              router.push(
                `/price-lists/${selectedRow.PLServiceID}/attach-services`,
              );
            }}
          >
            Attach Services
          </MenuItem>

          <MenuItem onClick={handleOpenDeleteConfirm}>Delete</MenuItem>
        </Menu>
      </div>

      {/* Confirm delete dialog */}
      <Dialog
        open={confirmOpen}
        onClose={deleting ? undefined : handleCloseDeleteConfirm}
      >
        <DialogTitle>Delete price list?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure you want to delete{" "}
            <strong> {selectedRow?.PLServName ?? "this price list"}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} /> : undefined}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
