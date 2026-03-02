"use client";

import { useEffect, useState, SyntheticEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";

export const MedicalServiceNotification = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "1";
  const [open, setOpen] = useState(isCreated);

  useEffect(() => {
    setOpen(isCreated);
  }, [isCreated]);

  const clearCreatedParam = () => {
    if (!isCreated) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("created");

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
    clearCreatedParam();
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
        Medical service created successfully.
      </Alert>
    </Snackbar>
  );
};
