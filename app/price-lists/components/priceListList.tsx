"use client";

import Link from "next/link";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGridComponent } from "@/components/dataGrid";
import { PriceList } from "@/interface";
import {
  GridColDef,
  GridValueFormatter,
  GridValueGetter,
} from "@mui/x-data-grid";
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
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to delete price list. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Convert incoming value (string/date/whatever) -> Date | null safely
  const toDateOrNull = (value: unknown): Date | null => {
    if (!value) return null;

    // If it's already a Date-like object with getTime (avoid instanceof)
    if (typeof value === "object" && value !== null && "getTime" in value) {
      const t = (value as { getTime: () => number }).getTime();
      return Number.isFinite(t) ? (value as Date) : null;
    }

    // If it's a string or number, try parsing
    const t = Date.parse(String(value));
    if (!Number.isFinite(t)) return null;

    const d = new Date(t);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const dateValueGetter: GridValueGetter = (value) => {
    return toDateOrNull(value);
  };

  const dateValueFormatter: GridValueFormatter = (value) => {
    const d = value as Date | null;
    if (!d) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d); // e.g. 25 Jan 2026
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "PLServiceID", headerName: "Service ID", flex: 1 },
      { field: "PLServName", headerName: "Service Name", flex: 2 },

      {
        field: "DatePL",
        headerName: "Price List Date",
        flex: 1,
        valueGetter: dateValueGetter,
        valueFormatter: dateValueFormatter,
        sortComparator: (v1, v2) => {
          const t1 = (v1 as Date | null)?.getTime?.() ?? 0;
          const t2 = (v2 as Date | null)?.getTime?.() ?? 0;
          return t1 - t2;
        },
      },

      { field: "NumberOfServices", headerName: "Number of Services", flex: 1 },

      {
        field: "actions",
        headerName: "",
        sortable: false,
        flex: 0.5,
        renderCell: (params) => (
          <IconButton
            onClick={(e) => handleMenuOpen(e, params.row as PriceList)}
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

      <Dialog
        open={confirmOpen}
        onClose={deleting ? undefined : handleCloseDeleteConfirm}
      >
        <DialogTitle>Delete price list?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedRow?.PLServName ?? "this price list"}</strong>?
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
