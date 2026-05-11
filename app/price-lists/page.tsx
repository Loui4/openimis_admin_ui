import Link from "next/link";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getPriceLists } from "@/services/priceList";
import { PriceListList } from "./components/priceListList";

const numberFormatter = new Intl.NumberFormat("en-MW", {
  maximumFractionDigits: 0,
});

export default async function Page() {
  const priceLists = await getPriceLists();

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
            Price Lists
          </Typography>
          <Typography sx={{ color: "#5f6f75", mt: 0.75, maxWidth: 680 }}>
            Manage price list definitions and attach medical services for use
            across products.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          sx={{
            alignItems: { xs: "stretch", sm: "center" },
            flexWrap: "wrap",
          }}
        >
          <Link href="/price-lists/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 1,
                minHeight: 40,
                px: 2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Create Price List
            </Button>
          </Link>
        </Stack>
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
                Price list catalogue
              </Typography>
              <Typography sx={{ color: "#6b7a80", fontSize: 13 }}>
                {numberFormatter.format(priceLists.length)} active rows available.
              </Typography>
            </Box>
          </Box>

          <PriceListList priceLists={priceLists} />
        </Stack>
      </Paper>
    </Stack>
  );
}
