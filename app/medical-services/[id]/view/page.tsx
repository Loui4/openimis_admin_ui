import { getOneMedicalService } from "@/services/medicalService";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
};

export default async function MedicalServiceViewPage({ params }: PageProps) {
  const { id } = await params;
  const service = await getOneMedicalService(id);

  const details = [
    ["Service Code", service.ServCode],
    ["Service Name", service.ServName],
    ["Type", service.ServType],
    ["Level", service.ServLevel],
    ["Price (MWK)", service.ServPrice],
    ["Care Type", service.ServCareType],
    ["Frequency", service.ServFrequency],
    ["Patient Category", service.ServPatCat],
    ["Validity From", service.ValidityFrom?.slice(0, 10)],
    ["Maximum Amount", service.MaximumAmount],
    ["Manual Price", service.manualPrice],
    ["Package Type", service.ServPackageType],
    ["Service Category", service.ServCategory],
    ["Legacy ID", service.LegacyID],
  ];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h5">{service.ServName}</Typography>
          <Typography color="text.secondary">{service.ServCode}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            href={`/medical-services/${service.ServiceID}/edit`}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            component={Link}
            href={`/medical-services/${service.ServiceID}/update-price`}
            variant="contained"
          >
            Update Price
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {details.map(([label, value], index) => (
          <Box key={String(label)}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "220px 1fr" },
                gap: 2,
                px: 2,
                py: 1.5,
              }}
            >
              <Typography color="text.secondary">{label}</Typography>
              <Typography>{formatValue(value)}</Typography>
            </Box>
            {index < details.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Box>

      <Button
        component={Link}
        href="/medical-services"
        variant="text"
        sx={{ alignSelf: "flex-start" }}
      >
        Back
      </Button>
    </Stack>
  );
}
