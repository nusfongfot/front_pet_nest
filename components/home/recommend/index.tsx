import * as React from "react";
import CardProductService from "@/components/service-ui/card_product";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { getAllProductByRecommend } from "@/api/product";
import { errorToast } from "@/utils/notification";
import { useLoading } from "@/zustand/loading";
import { useProductStore } from "@/zustand/products";

type Props = {};
export default function Recommend({}: Props) {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { products, setProducts } = useProductStore();

  const handleClickDetail = (id: string) => {
    router.push({
      pathname: `/shop/detail/${id}`,
    });
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllProductByRecommend();
        setProducts(res.data);
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
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
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={3} mb={3} key={item.productId}>
            <Card
              sx={{ maxWidth: 345, cursor: "pointer" }}
              onClick={() => handleClickDetail(item.productId)}
            >
              <CardMedia
                component='img'
                alt='green iguana'
                height='350'
                image={item.images.split(",")[0]}
              />
              <CardContent>
                <Typography gutterBottom component='div'>
                  {item.title.substring(0, 35) + "..."}
                </Typography>
                <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                  <Rating
                    value={
                      item?.reviews?.reduce((acc: any, val: any) => {
                        const total = acc + val.star;
                        return total;
                      }, 0) / item?.reviews?.length
                    }
                    readOnly
                    precision={0.5}
                  />
                  <Typography>{`(${item?.reviews?.length})`}</Typography>
                </Stack>
                <Typography
                  fontWeight={700}
                  variant='h5'
                  mt={1}
                  color='#f94073'
                >
                  {`$ ${item.price}`}
                </Typography>
                <Typography color={"rgba(0,0,0,.5)"}>
                  {`Salable ${item?.sold?.reduce(
                    (acc: any, val: any) => acc + val.qty,
                    0
                  )}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )).slice(0,4)}
      </Grid>

      <Grid container mt={5} mb={5} spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            src={"/assets/images/dog1.jpg"}
            className={styles.zoom}
            onClick={() => router.push("/shop")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={"/assets/images/dog2.jpg"}
            className={styles.zoom}
            onClick={() => router.push("/shop")}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
