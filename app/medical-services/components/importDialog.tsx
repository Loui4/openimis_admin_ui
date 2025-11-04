"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  dryRunUploadServices,
  confirmUploadServices,
} from "@/services/medicalService";
import { UploadResponse } from "@/interface";

export function ImportButtonDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importSummary, setImportSummary] = useState<UploadResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isDryRunComplete, setIsDryRunComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setImportSummary(null);
    setIsDryRunComplete(false);
    setIsSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDryRunImport = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await dryRunUploadServices(file);
      setImportSummary(data);
      setIsDryRunComplete(true);
    } catch (error) {
      console.error("Dry run failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await confirmUploadServices(file);
      console.log("Confirmed upload:", result);
      setIsSuccess(true);
    } catch (error) {
      console.error("Final upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpen}
      >
        Import Medical Services
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Import Medical Services</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {loading && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Processing, please wait...
                </Typography>
              </Box>
            )}

            {!loading && !isDryRunComplete && !isSuccess && (
              <Box
                component="label"
                htmlFor="file-upload"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed #1976d2",
                  borderRadius: 2,
                  py: 6,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "border-color 0.3s",
                  "&:hover": {
                    borderColor: "#115293",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: "#1976d2", mb: 1 }}
                />
                {file ? (
                  <Typography variant="body1" color="textPrimary">
                    Selected file: {file.name}
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1" color="textSecondary">
                      Drag & drop a file here, or click to select
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Only CSV files are supported
                    </Typography>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  hidden
                />
              </Box>
            )}

            {!loading && isDryRunComplete && !isSuccess && importSummary && (
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fafafa",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Import Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body1">
                    Inserted: {importSummary.inserted}
                  </Typography>
                  <Typography variant="body1">
                    Updated: {importSummary.updated}
                  </Typography>
                  <Typography variant="body1">
                    Skipped: {importSummary.skipped}
                  </Typography>
                  <Typography variant="body1">
                    Errors: {importSummary.errorCount}
                  </Typography>
                </Stack>

                {importSummary?.errors?.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Error Details
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        p: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      {importSummary.errors.map((err, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            mb: 1,
                            p: 1,
                            borderBottom:
                              idx < importSummary.errors.length - 1
                                ? "1px solid #eee"
                                : "none",
                          }}
                        >
                          <Typography variant="body2" color="error">
                            Code: {err.code} — {err.friendlyMessage}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {err.detailedError}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {!loading && isSuccess && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircleIcon
                  sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                />
                <Typography variant="h6" color="success.main">
                  Import Completed Successfully!
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Your data has been imported and saved successfully.
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          {!isSuccess && (
            <>
              <Button onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              {!isDryRunComplete ? (
                <Button
                  variant="contained"
                  onClick={handleDryRunImport}
                  disabled={!file || loading}
                >
                  {loading ? "Processing..." : "Upload (Dry Run)"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmImport}
                  disabled={loading}
                >
                  {loading ? "Finalizing..." : "Continue Upload"}
                </Button>
              )}
            </>
          )}

          {isSuccess && (
            <Button
              variant="contained"
              color="success"
              onClick={handleClose}
              autoFocus
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
