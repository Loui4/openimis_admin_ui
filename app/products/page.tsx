import { Button, Stack } from "@mui/material";
import { ProductList } from "./components/productsList";
import { getProducts } from "@/services/product";
import AddIcon from "@mui/icons-material/Add";

export default async function Page() {
  const products = await getProducts();
  return (
    <Stack spacing={2}>
      <h2>Products</h2>
      {/* <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        href="/product/create"
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
        Create Product
      </Button> */}
      <ProductList products={products} />
    </Stack>
  );
}
