import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceList } from "./components/medicalServiceList";
import { Box } from "@mui/material";
import { ImportButtonDialog } from "./components/importDialog";

export default async function Page() {
  const medicalServiceList = await getMedicalServices();

  return (
    <Box>
      <h2>Medical Services</h2>
      {/* Client-side import button */}
      <ImportButtonDialog />

      <MedicalServiceList medicalServiceList={medicalServiceList} />
    </Box>
  );
}
