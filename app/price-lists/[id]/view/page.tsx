"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { MedicalService, PriceList } from "@/interface";
import { useParams } from "next/navigation";
import { getOnePriceList } from "@/services/priceList";

export default function MedicalServiceListView() {
  const params = useParams();
  const [priceList, setPriceList] = useState<PriceList>({} as PriceList);
  const [services, setServices] = useState<MedicalService[]>([]);

  useEffect(() => {
    async function fetchPriceList() {
      const fetchedPriceList = await getOnePriceList(
        params?.id as unknown as number
      );
      setPriceList(fetchedPriceList);

      console.log({ fetchedPriceList });

      if (fetchedPriceList.Services) {
        setServices(
          fetchedPriceList.Services.map((s: any) => ({
            ServiceID: s.ServiceID,
            ServiceUUID: s.ServiceUUID ?? "",
            ServCode: s.ServiceCode,
            ServName: s.ServiceName,
            ServType: s.ServType ?? "",
            ServLevel: s.ServLevel ?? "",
            ServPrice: s.ServPrice ?? 0,
            ServCareType: s.ServCareType ?? "",
            ServFrequency: s.ServFrequency ?? 0,
            ServPatCat: s.ServPatCat ?? 0,
            ValidityFrom: s.ValidityFrom ?? "",
            ValidityTo: s.ValidityTo ?? null,
            AuditUserID: s.AuditUserID ?? 0,
            MaximumAmount: s.MaximumAmount ?? 0,
            ServPackageType: s.ServPackageType ?? "",
            ServCategory: s.ServCategory ?? "",
            LegacyID: s.LegacyID ?? 0,
            manualPrice: s.manualPrice ?? "",
          }))
        );
      }
    }

    fetchPriceList();
  }, [params?.id]);

  const rows = services;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">{priceList.PLServName}</Typography>

      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          overflowY: "auto",
          maxHeight: 400,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            px: 2,
            py: 1,
            bgcolor: "#f1f3f4",
            fontWeight: 600,
            alignItems: "center",
          }}
        >
          <Typography sx={{ width: 50 }}></Typography>
          <Typography sx={{ flex: 1 }}>Code</Typography>
          <Typography sx={{ flex: 2 }}>Name</Typography>
          <Typography sx={{ flex: 1 }}>Type</Typography>
          <Typography sx={{ flex: 1 }}>Level</Typography>
          <Typography sx={{ flex: 1 }}>Price (MWK)</Typography>
          <Typography sx={{ flex: 1 }}>Care Type</Typography>
        </Box>

        <Divider />

        {/* Rows */}
        {rows.map((s, index) => (
          <Box
            key={s.ServCode + "" + s.ServiceID + "" + index}
            sx={{
              display: "flex",
              px: 2,
              py: 1,
              alignItems: "center",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            <Box sx={{ width: 50 }} /> {/* placeholder for checkbox column */}
            <Typography sx={{ flex: 1 }}>{s.ServCode}</Typography>
            <Typography sx={{ flex: 2 }}>{s.ServName}</Typography>
            <Typography sx={{ flex: 1 }}>{s.ServType}</Typography>
            <Typography sx={{ flex: 1 }}>{s.ServLevel}</Typography>
            <Typography sx={{ flex: 1 }}>{s.ServPrice}</Typography>
            <Typography sx={{ flex: 1 }}>{s.ServCareType}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
