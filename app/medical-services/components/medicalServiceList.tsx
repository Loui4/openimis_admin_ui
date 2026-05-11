"use client";
import { DataGridComponent } from "@/components/dataGrid";
import { MedicalService } from "@/interface";
import { GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo, useState } from "react";
import type { MouseEvent } from "react";

const readableDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const formatReadableDate = (value: unknown) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      return readableDateFormatter.format(
        new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
      );
    }
  }

  const parsedDate = new Date(String(value));

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  return readableDateFormatter.format(parsedDate);
};

const priceFormatter = new Intl.NumberFormat("en-MW", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fieldLabel = (value: unknown, fallback = "Not set") =>
  value === null || value === undefined || value === "" ? fallback : String(value);

const typeLabel = (value: unknown) => {
  const label = fieldLabel(value);

  if (label === "C") return "Clinical";
  if (label === "S") return "Service";

  return label;
};

export const MedicalServiceList: FC<{
  medicalServiceList: MedicalService[];
}> = ({ medicalServiceList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<MedicalService | null>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement>, row: MedicalService) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    []
  );

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const navigateToAction = (action: "view" | "edit" | "update-price") => {
    if (!selectedRow?.ServiceID) return;

    const serviceId = selectedRow.ServiceID;
    handleMenuClose();
    router.push(`/medical-services/${serviceId}/${action}`);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "ServCode",
        headerName: "Code",
        minWidth: 118,
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
        field: "ServName",
        headerName: "Service",
        minWidth: 260,
        flex: 2.2,
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
              ID {params.row.ServiceID}
            </Typography>
          </Box>
        ),
      },
      {
        field: "ServType",
        headerName: "Type",
        minWidth: 120,
        flex: 0.8,
        renderCell: (params) => (
          <Chip
            label={typeLabel(params.value)}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 1, borderColor: "#ccd8dc", color: "#42545b" }}
          />
        ),
      },
      {
        field: "ServLevel",
        headerName: "Level",
        minWidth: 86,
        flex: 0.6,
        renderCell: (params) => (
          <Typography sx={{ fontWeight: 700, color: "#42545b" }}>
            {fieldLabel(params.value)}
          </Typography>
        ),
      },
      {
        field: "ServPrice",
        headerName: "Price (MWK)",
        minWidth: 140,
        flex: 1,
        type: "number",
        renderCell: (params) => (
          <Typography sx={{ fontWeight: 700, color: "#17262b" }}>
            {priceFormatter.format(Number(params.value || 0))}
          </Typography>
        ),
      },
      {
        field: "ServCareType",
        headerName: "Care Type",
        minWidth: 132,
        flex: 0.9,
        renderCell: (params) => (
          <Chip
            label={fieldLabel(params.value)}
            size="small"
            sx={{
              borderRadius: 1,
              bgcolor: "#f3f1ec",
              color: "#73510b",
              fontWeight: 650,
            }}
          />
        ),
      },
      // { field: "ServFrequency", headerName: "Frequency", flex: 1, type: "number" },
      // { field: "ServPatCat", headerName: "Patient Category", flex: 1 },
      {
        field: "ValidityFrom",
        headerName: "Validity From",
        minWidth: 158,
        flex: 1,
        renderCell: (params) => (
          <Typography sx={{ color: "#42545b" }}>
            {formatReadableDate(params.value)}
          </Typography>
        ),
      },
      // {
      //   field: "ValidityTo",
      //   headerName: "Validity To",
      //   flex: 1,
      // },
      // { field: "MaximumAmount", headerName: "Max Amount", flex: 1, type: "number" },
      // {
      //   field: "manualPrice",
      //   headerName: "Manual Price",
      //   flex: 1,
      // },
      // { field: "ServPackageType", headerName: "Package Type", flex: 1 },
      // { field: "ServCategory", headerName: "Category", flex: 1 },
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
            aria-label={`Open actions for ${params.row.ServName}`}
            onClick={(event) =>
              handleMenuOpen(event, params.row as MedicalService)
            }
            size="small"
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
    [handleMenuOpen]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGridComponent
        rows={medicalServiceList}
        columns={columns}
        rowIdField="ServiceID"
        height={620}
        searchPlaceholder="Search by code, service name, care type, or price"
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => navigateToAction("view")}>View</MenuItem>
        <MenuItem onClick={() => navigateToAction("edit")}>Edit</MenuItem>
        <MenuItem onClick={() => navigateToAction("update-price")}>
          Update Price
        </MenuItem>
      </Menu>
    </Box>
  );
};
