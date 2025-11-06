import { Stack } from "@mui/material";
import { getPriceLists } from "@/services/priceList";
import { PriceListList } from "./components/priceListList";

export default async function Page() {
  return (
    <Stack spacing={2}>
      <h2>Price lists</h2>

      <PriceListList priceLists={await getPriceLists()} />
    </Stack>
  );
}
