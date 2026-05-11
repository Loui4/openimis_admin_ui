import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceList } from "./components/medicalServiceList";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { ImportButtonDialog } from "./components/importDialog";
import { ExportButton } from "./components/exportButton";

const currencyFormatter = new Intl.NumberFormat("en-MW", {
  maximumFractionDigits: 0,
});

export default async function Page() {
  const medicalServiceList = await getMedicalServices();
  const totalServices = medicalServiceList.length;

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              color: "#17262b",
              fontSize: { xs: 28, md: 34 },
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Medical Services
          </Typography>
          <Typography sx={{ color: "#5f6f75", mt: 0.75, maxWidth: 680 }}>
            Maintain the active service catalogue, pricing, and CSV exchange
            workflow.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          sx={{
            alignItems: { xs: "stretch", sm: "center" },
            flexWrap: "wrap",
          }}
        >
          <Link href="/medical-services/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 1,
                minHeight: 40,
                px: 2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Add Service
            </Button>
          </Link>
          <ImportButtonDialog />
          <ExportButton />
        </Stack>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          borderColor: "#dce5e8",
          borderRadius: 1,
          p: { xs: 1.5, md: 2 },
          bgcolor: "#fbfcfc",
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box>
              <Typography sx={{ color: "#17262b", fontWeight: 700 }}>
                Service catalogue
              </Typography>
              <Typography sx={{ color: "#6b7a80", fontSize: 13 }}>
                {currencyFormatter.format(totalServices)} active rows available.
              </Typography>
            </Box>
          </Box>

          <MedicalServiceList medicalServiceList={medicalServiceList} />
        </Stack>
      </Paper>
    </Stack>
  );
}
