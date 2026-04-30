import { getOneMedicalService } from "@/services/medicalService";
import { UpdateMedicalServicePrice } from "../../components/updateMedicalServicePrice";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateMedicalServicePricePage({
  params,
}: PageProps) {
  const { id } = await params;
  const service = await getOneMedicalService(id);

  return <UpdateMedicalServicePrice service={service} />;
}
