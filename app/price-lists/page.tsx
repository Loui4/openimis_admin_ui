import { getPriceLists } from "@/services/priceList";
import { PriceListList } from "./components/priceListList";

export default async function Page() {
    return <PriceListList priceLists={await getPriceLists()} />

}