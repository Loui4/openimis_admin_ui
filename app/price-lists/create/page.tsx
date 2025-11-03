import { getMedicalServices } from "@/services/medicalService";
import { MedicalServiceListSelect } from "../components/servicesListSelect";
import { CreatePriceList } from "../components/createPriceList";

export default async function Page() {
  return (
    <>
      <h3>Create Price list</h3>
      <CreatePriceList />
    </>
  );
}
