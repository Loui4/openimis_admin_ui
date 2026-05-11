"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportMedicalServicesCsv } from "@/services/medicalService";

const EXPORT_FILENAME = "services_and_fcodes2026.csv";

export function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const csv = await exportMedicalServicesCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = EXPORT_FILENAME;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={
        loading ? <CircularProgress color="inherit" size={18} /> : <FileDownloadIcon />
      }
      onClick={handleExport}
      disabled={loading}
    >
      Export Medical Services
    </Button>
  );
}
