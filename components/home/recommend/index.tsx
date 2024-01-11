import CardProductService from "@/components/service-ui/card_product";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

type Props = {};
export default function Recommend({}: Props) {
  const router = useRouter();
  return (
    <Container maxWidth='xl' sx={{ mt: 15 }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <Box />
        <Typography
          variant='h3'
          fontWeight={700}
          color='#2d3054'
          align='center'
        >
          Recommended For You
        </Typography>
        <Button
          sx={{
            outline: "2px solid #F94073",
            width: 200,
            height: 40,
            borderRadius: "2rem",
            color: "#F94073",
            ":hover": {
              background: "#F94073",
              color: "white",
            },
          }}
          onClick={() => router.push("/shop")}
        >
          Browse all
        </Button>
      </Stack>

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

      <Grid container mt={5} mb={5} spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={"/assets/images/dog1.jpg"} className={styles.zoom} />
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={"/assets/images/dog2.jpg"} className={styles.zoom} />
        </Grid>
      </Grid>
    </Container>
  );
}
