import {
  getAllListOfBrand,
  getAllProductApi,
  getAllProductByBrand,
  getAllProductByCategory,
  searchProduct,
} from "@/api/product";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { errorToast } from "@/utils/notification";
import { useLoading } from "@/zustand/loading";
import { useProductStore } from "@/zustand/products";
import { useSearchStore } from "@/zustand/search";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

type Props = {};
const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "39.3vh",
  background: "white",
};
export default function ShopPage({}: Props) {
  const { setLoading } = useLoading();
  const { products, setProducts } = useProductStore();
  const router = useRouter();
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [valueRadio, setValueRadio] = React.useState<string>("");
  const { search, setSearch } = useSearchStore();
  const [brands, setBrands] = React.useState<any[]>([]);

  const handleClickDetail = (id: string) => {
    router.push({
      pathname: `/shop/detail/${id}`,
    });
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (router.asPath == "/shop") {
          const res = await getAllProductApi();  
          setProducts(res.data);
        }
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (valueRadio) {
          const res = await getAllProductByBrand(valueRadio);
          setProducts(res.data);
        }
      } catch (error: any) {
        errorToast(error.message, 2000);
      }
    })();
  }, [valueRadio]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const brandsData = await getAllListOfBrand();
        setBrands(brandsData.data);
        if (!!router.query.search) {
          const dataSearch = await searchProduct(router.query.search as string);
          setProducts(dataSearch.data);
          if (dataSearch.data.length == 0 || !!router.query.search) {
            setIsNotFound(true);
          }
        }
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.query.search]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!!router.query.cate) {
          const res = await getAllProductByCategory(
            router.query.cate as string
          );
          setProducts(res.data);
        }
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.query.cate]);

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
              {brands.map((item, i) => (
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  key={i}
                >
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby='demo-radio-buttons-group-label'
                        defaultValue='female'
                        name='radio-buttons-group'
                        value={valueRadio}
                        onChange={(e) => setValueRadio(e.target.value)}
                      >
                        <FormControlLabel
                          value={item}
                          control={<Radio />}
                          label={item}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </Stack>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} lg={9} mt={5}>
            <Grid container spacing={3}>
              {products.length == 0 && isNotFound ? (
                <Typography align='center' variant='h4' width={"100%"}>
                  Product not found.
                </Typography>
              ) : null}
              {products.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  mb={3}
                  key={item.productId}
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
                        {item.title.substring(0, 40) + "..."}
                      </Typography>
                      <Stack
                        flexDirection={"row"}
                        gap={2}
                        alignItems={"center"}
                      >
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
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
