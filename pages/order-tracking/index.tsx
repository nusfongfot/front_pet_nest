import * as React from "react";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

type Props = {};
export default function OrderTrackPage({}: Props) {
  const router = useRouter();
  const [values, setValues] = React.useState<string>("");

  return (
    <div>
      <HeaderBreadCrumbsSerVice
        title1='Order Tracking'
        title2='order-tracking'
      />
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} md={7} mt={5} mb={5}>
            <Box>
              <Typography variant='h4'>Track Order</Typography>
              <Typography>
                To track your order please enter your order ID in the input
                field below and press the “Track Order” button. this was given
                to you on your receipt and in the confirmation email you should
                have received.
              </Typography>
              <Typography variant='h6' sx={{ mt: 3 }}>
                Order ID.
              </Typography>
              <Stack flexDirection={"row"}>
                <Paper
                  sx={{
                    p: "5px",
                    display: "flex",
                    alignItems: "center",
                    width: 500,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='order id...'
                    onChange={(e) => setValues(e.target.value)}
                    value={values}
                  />

                  <Button
                    variant='contained'
                    className='btn_pink'
                    onClick={() =>
                      router.push({
                        pathname: "/order-tracking/track",
                        query: `id=${values}`,
                      })
                    }
                    disabled={!values}
                  >
                    track order
                  </Button>
                </Paper>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
