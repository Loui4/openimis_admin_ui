import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceList } from "./components/medicalServiceList";

export default async function Page() {
    return <MedicalServiceList medicalServiceList={await getMedicalServices()} />
}