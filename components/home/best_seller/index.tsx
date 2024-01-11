import CardProductService from "@/components/service-ui/card_product";
import { Container, Grid, Typography } from "@mui/material";

type Props = {};
export default function BestSeller({}: Props) {
  return (
    <Container maxWidth='xl' sx={{ mt: 15, mb: 10 }}>
      <Typography
        mb={5}
        variant='h4'
        fontWeight={700}
        color='#2d3054'
        align='center'
      >
        Best Selling
      </Typography>
      <Grid container>
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
    </Container>
  );
}
