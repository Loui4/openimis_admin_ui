import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceList } from "./components/medicalServiceList";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { ImportButtonDialog } from "./components/importDialog";
import { MedicalServiceNotification } from "./components/medicalServiceNotification";

export default async function Page() {
  const medicalServiceList = await getMedicalServices();

  return (
    <Stack spacing={2}>
      <MedicalServiceNotification />
      <h2>Medical Services</h2>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Link href="/medical-services/create" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Service
          </Button>
        </Link>
        <ImportButtonDialog />
      </Stack>

      <MedicalServiceList medicalServiceList={medicalServiceList} />
    </Stack>
  );
}
