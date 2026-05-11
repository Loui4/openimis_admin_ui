import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceList } from "./components/medicalServiceList";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { ImportButtonDialog } from "./components/importDialog";
import { ExportButton } from "./components/exportButton";

export default async function Page() {
  const medicalServiceList = await getMedicalServices();

  return (
    <Stack spacing={2}>
      <h2>Medical Services</h2>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Link href="/medical-services/create" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Service
          </Button>
        </Link>
        <ImportButtonDialog />
        <ExportButton />
      </Stack>

      <MedicalServiceList medicalServiceList={medicalServiceList} />
    </Stack>
  );
}
