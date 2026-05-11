import { Box, Paper, Stack, Typography } from "@mui/material";
import { ProductList } from "./components/productsList";
import { getProducts } from "@/services/product";

const numberFormatter = new Intl.NumberFormat("en-MW", {
  maximumFractionDigits: 0,
});

export default async function Page() {
  const products = await getProducts();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              color: "#17262b",
              fontSize: { xs: 28, md: 34 },
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Products
          </Typography>
          <Typography sx={{ color: "#5f6f75", mt: 0.75, maxWidth: 680 }}>
            Review insurance products, service coverage counts, locations, and
            current enrolled membership.
          </Typography>
        </Box>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          borderColor: "#dce5e8",
          borderRadius: 1,
          p: { xs: 1.5, md: 2 },
          bgcolor: "#fbfcfc",
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box>
              <Typography sx={{ color: "#17262b", fontWeight: 700 }}>
                Product catalogue
              </Typography>
              <Typography sx={{ color: "#6b7a80", fontSize: 13 }}>
                {numberFormatter.format(products.length)} active rows available.
              </Typography>
            </Box>
          </Box>

          <ProductList products={products} />
        </Stack>
      </Paper>
    </Stack>
  );
}
