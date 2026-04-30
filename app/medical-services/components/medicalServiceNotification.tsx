"use client";

import { useEffect, useState, SyntheticEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";

export const MedicalServiceNotification = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "1";
  const isPriceUpdated = searchParams.get("priceUpdated") === "1";
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isCreated) {
      setMessage("Medical service created successfully.");
      setOpen(true);
      return;
    }

    if (isPriceUpdated) {
      setMessage("Medical service price updated successfully.");
      setOpen(true);
      return;
    }

    if (sessionStorage.getItem("medicalServicePriceUpdated") === "1") {
      sessionStorage.removeItem("medicalServicePriceUpdated");
      setMessage("Medical service price updated successfully.");
      setOpen(true);
    }
  }, [isCreated, isPriceUpdated]);

  const clearNotificationParams = () => {
    if (!isCreated && !isPriceUpdated) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("created");
    nextParams.delete("priceUpdated");

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl);
  };

  const handleClose = (
    _event?: Event | SyntheticEvent,
    reason?: "timeout" | "clickaway" | "escapeKeyDown"
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    clearNotificationParams();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
