"use client";

import { DataGridComponent } from "@/components/dataGrid";
import { PriceList } from "@/interface";
import { GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { FC, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { deletePriceList } from "@/services/priceList";

const numberFormatter = new Intl.NumberFormat("en-MW");

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

  const formatDateValue = (value: unknown) => {
    const d = value as Date | null;
    if (!d) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "PLServiceID",
        headerName: "ID",
        minWidth: 118,
        flex: 0.7,
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
        field: "PLServName",
        headerName: "Price List",
        minWidth: 260,
        flex: 2,
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
              ID {params.row.PLServiceID}
            </Typography>
          </Box>
        ),
      },

      {
        field: "DatePL",
        headerName: "Price List Date",
        minWidth: 164,
        flex: 1,
        valueGetter: dateValueGetter,
        renderCell: (params) => (
          <Typography sx={{ color: "#42545b" }}>
            {formatDateValue(params.value)}
          </Typography>
        ),
        sortComparator: (v1, v2) => {
          const t1 = (v1 as Date | null)?.getTime?.() ?? 0;
          const t2 = (v2 as Date | null)?.getTime?.() ?? 0;
          return t1 - t2;
        },
      },

      {
        field: "NumberOfServices",
        headerName: "Services",
        minWidth: 132,
        flex: 0.9,
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
        field: "actions",
        headerName: "",
        sortable: false,
        filterable: false,
        width: 72,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <IconButton
            onClick={(e) => handleMenuOpen(e, params.row as PriceList)}
            size="small"
            aria-label={`Open actions for ${params.row.PLServName}`}
            sx={{
              width: 34,
              height: 34,
              border: "1px solid #dce5e8",
              borderRadius: 1,
              color: "#52636a",
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#f5f8f9",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGridComponent
        rows={priceLists}
        columns={columns}
        rowIdField="PLServiceID"
        height={620}
        searchPlaceholder="Search by price list name, ID, date, or service count"
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
    </Box>
  );
};
