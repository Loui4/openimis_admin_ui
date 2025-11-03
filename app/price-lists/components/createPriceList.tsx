"use client";
import { savePriceList } from "@/services/priceList";
import { PriceListForm } from "./priceListForm";
import { useRouter } from "next/navigation";

export const CreatePriceList = () => {
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const data = await savePriceList(values);

    if (data) {
      router.push(`/price-lists/${data.PLServiceID}/attach-services`);
    }
    console.log("Form submitted with values:", values);
  };
  return <PriceListForm onSubmit={handleSubmit} />;
};
