import { getAllProductApi } from "@/api/product";
import CardProductService from "@/components/service-ui/card_product";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { errorToast } from "@/utils/notification";
import { useLoading } from "@/zustand/loading";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";

type Props = {};
export default function ShopPage({}: Props) {
  const { setLoading } = useLoading();
  
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllProductApi();
        console.log("res", res.data);
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <HeaderBreadCrumbsSerVice title1='Shop' title2='Shop' />
      <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Paper sx={{ p: 2, mt: 5 }}>
              <Typography variant='h5' fontWeight={700}>
                Brands
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Checkbox />
                  <Typography>Meo</Typography>
                </Stack>
                <Typography>(1)</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ p: 2, mt: 5 }}>
              <Typography variant='h5' fontWeight={700}>
                Pets
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Checkbox />
                  <Typography>Dogs</Typography>
                </Stack>
                <Typography>(1)</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ p: 2, mt: 5 }}>
              <Typography variant='h5' fontWeight={700}>
                Price
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Slider
                defaultValue={50}
                aria-label='Default'
                valueLabelDisplay='auto'
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={9} mt={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={3} mb={3}>
                <CardProductService />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} mb={3}>
                <CardProductService />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} mb={3}>
                <CardProductService />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} mb={3}>
                <CardProductService />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
