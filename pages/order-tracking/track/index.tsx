import TrackingSteppers from "@/components/step-track";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

type Props = {};
export default function Track({}: Props) {
  const router = useRouter();
  console.log(router);
  return (
    <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
      <Paper sx={{ p: 2 }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ background: "rgb(254, 250, 228)", p: 2 }}
        >
          <Box>
            <Typography>#1234</Typography>
            <Typography>
              1 Products Order Placed in 2024-01-02 at 01:24 PM
            </Typography>
          </Box>
          <Typography color={"rgb(45, 165, 243)"} variant='h4'>
            $ 3,200.00
          </Typography>
        </Stack>
        <Box mt={5}mb={5}>
          <TrackingSteppers />
        </Box>
      </Paper>
    </Container>
  );
}
