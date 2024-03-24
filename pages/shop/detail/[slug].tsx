import BreadCrumbsService from "@/components/service-ui/breadcrumbs";
import {
  Alert,
  Avatar,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MySwiperUnderImage from "@/components/swiper-img";
import CancelIcon from "@mui/icons-material/Cancel";
import CardProductService from "@/components/service-ui/card_product";
import useInfo from "@/zustand/auth";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import { getAllProductByRecommend, getDetailsProduct } from "@/api/product";
import { errorToast, successToast } from "@/utils/notification";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import PropagateLoader from "react-spinners/PropagateLoader";
import { createCart } from "@/api/cart";
import { useCartStore } from "@/zustand/carts";
import NotFound from "@/pages/not-found";
import { useProductStore } from "@/zustand/products";
import { useLoading } from "@/zustand/loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {};

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "39.3vh",
  background: "white",
};
export default function DetailShopPage({}: Props) {
  const router = useRouter();
  const idProduct = router?.query?.slug;
  const { accInfo } = useInfo();
  const { carts, setCarts } = useCartStore();
  const { products, setProducts } = useProductStore();
  const { setLoading } = useLoading();

  const [product, setProduct] = useState<any>({});
  const [rating, setRating] = useState<number>(0);
  const [total, setTotal] = useState<number>(1);

  const handleClickDetail = (id: string) => {
    router.push({
      pathname: `/shop/detail/${id}`,
    });
  };

  const handleAddToCart = async () => {
    const body = {
      productId: idProduct,
      userId: accInfo.userId,
      qty: total,
      status: "pending",
    };
    try {
      const res = await createCart(body);
      successToast(res.message, 1500);
    } catch (error) {
      console.log("err =>", error);
      return error;
    }
  };

  const handleBuynow = async () => {
    const body = {
      productId: idProduct,
      userId: accInfo.userId,
      qty: total,
      status: "pending",
    };
    try {
      await createCart(body);
      router.push("/checkout");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (idProduct) {
          const res = await getDetailsProduct(idProduct as string);
          setProduct(res.data);
          setRating(res.totalRating);
        }
      } catch (error: any) {
        return error;
      }
    })();
  }, [idProduct]);

  useEffect(() => {
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

  if (!product) {
    return <NotFound />;
  }

  if (idProduct == undefined || product == undefined) {
    return (
      <PropagateLoader
        // loading={true}
        color='#36d7b7'
        size={10}
        cssOverride={override}
      />
    );
  }
  return (
    <Container maxWidth='xl' sx={{ mb: 10 }}>
      <Box sx={{ mt: 5, mb: 5 }}>
        <BreadCrumbsService title={product.title} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={2} order={{ xs: 2, md: 2, lg: 1 }}>
          <img
            src='/assets/images/rouelette.jpg'
            style={{ width: "100%", height: 350, objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={10} order={{ xs: 1, md: 1, lg: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <MySwiperUnderImage data={product?.images?.split(",")} />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant='h4' fontWeight={700}>
                {product.title}
              </Typography>
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Rating value={rating || 0} readOnly size='small' />
                <Typography>{`${product?.reviews?.length} reviews`}</Typography>
              </Stack>
              <Typography
                sx={{
                  background: "#F4ECE2",
                  p: 1,
                  color: "#f94073",
                  mt: 2,
                  mb: 2,
                }}
                variant='h4'
              >
                {`$ ${product.price}`}
              </Typography>
              <Stack flexDirection={"row"} alignItems={"center"} gap={8}>
                {product.qty != 0 ? (
                  <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                    <CheckCircleIcon sx={{ color: "#00b9c5" }} />
                    <Typography color={"#00b9c5"}>In Stock</Typography>
                  </Stack>
                ) : (
                  <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                    <CancelIcon sx={{ color: "red" }} />
                    <Typography color={"error"}>Out of Stock</Typography>
                  </Stack>
                )}

                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <ul>
                    <li>Free 1-3 day shipping </li>
                  </ul>
                </Stack>
              </Stack>

              <Typography
                mt={3}
              >{`There are ${product.qty} products in total.`}</Typography>
              <Typography
                mt={1}
                sx={{ textTransform: "capitalize" }}
              >{`Category: ${product.category}`}</Typography>
              <Typography mt={1} sx={{ textTransform: "capitalize" }}>
                {`Brand: ${product.brand}`}
              </Typography>

              {product.qty > 0 && (
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={2}
                  flexWrap={"wrap"}
                >
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    mt={3}
                    gap={2}
                  >
                    <Typography fontWeight={500}>Qty</Typography>

                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => setTotal((prev) => prev - 1)}
                      disabled={total == 1}
                    >
                      -
                    </Button>
                    <Typography fontWeight={500}>{total}</Typography>
                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => setTotal((prev) => prev + 1)}
                      disabled={total == Number(product.qty)}
                    >
                      +
                    </Button>
                  </Stack>

                  {accInfo.userId == "" ? (
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      mt={3}
                      gap={2}
                      width={"100%"}
                    >
                      <Button
                        variant='contained'
                        size='small'
                        sx={{ width: 350 }}
                        onClick={() => router.push("/sign-in")}
                      >
                        login to order
                      </Button>
                    </Stack>
                  ) : null}

                  {accInfo.userId != "" && product.qty > 0 ? (
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      mt={3}
                      gap={2}
                      width={"100%"}
                    >
                      <Button
                        className='btn_purple'
                        variant='contained'
                        fullWidth
                        onClick={handleAddToCart}
                      >
                        add to cart
                      </Button>
                      <Button
                        className='btn_pink'
                        variant='contained'
                        fullWidth
                        onClick={handleBuynow}
                      >
                        buy now
                      </Button>
                    </Stack>
                  ) : null}
                </Stack>
              )}

              {product.qty == 0 && (
                <Alert severity='error' sx={{ mt: 2 }}>
                  This product is out of stock!
                </Alert>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 5 }}>
            <Typography
              sx={{ background: "#F7F7F7", p: 1 }}
              variant='h5'
              fontWeight={500}
            >
              Product Description
            </Typography>

            <ReactQuill
              theme='bubble'
              value={product.description}
              readOnly={true}
              style={{ height: "100%" }}
            />

            <Typography
              sx={{ background: "#F7F7F7", p: 1 }}
              variant='h5'
              fontWeight={500}
            >
              Product Ratings
            </Typography>
            {product?.reviews?.length == 0 ? (
              <Typography>No review.</Typography>
            ) : (
              product?.reviews?.map((val: any) => (
                <Stack flexDirection={"column"} key={val.reviewId}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={2}
                    mt={3}
                  >
                    <Avatar src={accInfo?.picture || ""} />
                    <Box>
                      <Typography>{val.name}</Typography>
                      <Rating value={val.star} readOnly size='small' />
                      <Typography sx={{ fontSize: 13 }}>
                        {dayjs(val.createdAt).format("YYYY-MM-DD")}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box>
                    <Typography mt={1}>{val.detail}</Typography>
                  </Box>
                </Stack>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
      <Box mt={10}>
        <Typography align='center' variant='h4' fontWeight={700}>
          We found other products you might like!
        </Typography>
        <Grid container mt={5}>
          {products
            .filter((item) => item.productId != idProduct)
            .map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                mb={3}
                key={item.productId}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
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
            ))
            .slice(0, 3)}
        </Grid>
      </Box>
    </Container>
  );
}
