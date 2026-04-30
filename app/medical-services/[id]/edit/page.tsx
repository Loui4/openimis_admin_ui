import { getOneMedicalService } from "@/services/medicalService";
import { EditMedicalService } from "../../components/editMedicalService";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMedicalServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = await getOneMedicalService(id);

  return <EditMedicalService service={service} />;
}
