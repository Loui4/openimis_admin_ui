import { getPriceLists } from "@/services/priceList";
import { PriceListList } from "./components/priceListList";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default async function Page() {
  return (
    <Stack spacing={2}>
      <h2>Price lists</h2>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        href="/price-lists/create"
        sx={{
          alignSelf: "flex-start",
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        Create Price List
      </Button>

      <PriceListList priceLists={await getPriceLists()} />
    </Stack>
  );
}
