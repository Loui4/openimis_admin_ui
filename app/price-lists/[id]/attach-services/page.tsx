import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceListSelect } from "../../components/servicesListSelect";

export default async function Page() {
  return (
    <MedicalServiceListSelect medicalServiceList={await getMedicalServices()} />
  );
}
