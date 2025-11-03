"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
  Divider,
  Checkbox,
  Button,
} from "@mui/material";
import { MedicalService, PriceList } from "@/interface";
import { useParams, useRouter } from "next/navigation";
import {
  createPriceListDetail,
  savePriceListDetailsAction,
} from "@/services/priceListDetail";
import { getOnePriceLIst } from "@/services/priceList";

interface Props {
  medicalServiceList: MedicalService[];
}

export function MedicalServiceListSelect({ medicalServiceList }: Props) {
  const params = useParams();
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [priceList, setPriceList] = useState<PriceList>({} as PriceList);

  const [selectedServices, setSelectedServices] = useState<MedicalService[]>(
    []
  );

  // Filtered services based on search
  const filteredRows = useMemo(() => {
    if (!filter) return medicalServiceList;
    return medicalServiceList.filter(
      (s) =>
        s.ServName.toLowerCase().includes(filter.toLowerCase()) ||
        s.ServCode.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, medicalServiceList]);

  const handleToggle = (service: MedicalService) => {
    if (selectedServices.some((s) => s.ServCode === service.ServCode)) {
      setSelectedServices(
        selectedServices.filter((s) => s.ServCode !== service.ServCode)
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleChipDelete = (code: string) => {
    setSelectedServices(selectedServices.filter((s) => s.ServCode !== code));
  };

  const handleSaveServices = async () => {
    const formattedServices = selectedServices.map((service) => {
      return {
        ServiceID: service.ServiceID,
        ValidityFrom: "2025-10-30T00:00:00Z",
      };
    });

    const data = await savePriceListDetailsAction(
      params.id as string,
      formattedServices
    );
    router.push("/price-lists");
  };

  useEffect(() => {
    async function findPriceList() {
      const priceList = await getOnePriceLIst(45);
      setPriceList(priceList);
    }
    findPriceList();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <h1>{priceList.PLServName}</h1>
      <Button
        onClick={handleSaveServices}
        variant="contained"
        color="primary"
        sx={{ alignSelf: "flex-start" }}
      >
        Save Selected Services
      </Button>
      {/* Selected Chips */}
      {selectedServices.length > 0 && (
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1} // horizontal spacing between chips
          rowGap={1} // vertical spacing between lines
        >
          {selectedServices.map((s) => (
            <Chip
              key={s.ServCode}
              label={s.ServName}
              variant="outlined"
              onDelete={() => handleChipDelete(s.ServCode)}
              sx={{
                borderColor: "#006273",
                color: "#006273",
                "& .MuiChip-deleteIcon": { color: "#006273" },
                "&:hover": {
                  backgroundColor: "rgba(0, 98, 115, 0.04)", // subtle hover fill
                  borderColor: "#005561",
                  color: "#005561",
                  "& .MuiChip-deleteIcon": { color: "#005561" },
                },
              }}
            />
          ))}
        </Stack>
      )}

      {/* Search Field */}
      <TextField
        label="Search services..."
        variant="outlined"
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ maxWidth: 300 }}
      />

      {/* Services List */}
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
        {filteredRows.map((s) => (
          <Box
            key={s.ServCode}
            sx={{
              display: "flex",
              px: 2,
              py: 1,
              alignItems: "center",
              cursor: "pointer",
              bgcolor: selectedServices.some(
                (sel) => sel.ServCode === s.ServCode
              )
                ? "#e0f7fa"
                : "transparent",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
            onClick={() => handleToggle(s)}
          >
            <Checkbox
              checked={selectedServices.some(
                (sel) => sel.ServCode === s.ServCode
              )}
              onChange={() => handleToggle(s)}
              onClick={(e) => e.stopPropagation()}
              sx={{ width: 50 }}
            />
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
