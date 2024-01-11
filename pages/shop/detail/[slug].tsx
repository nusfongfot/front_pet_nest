import BreadCrumbsService from "@/components/service-ui/breadcrumbs";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MySwiperUnderImage from "@/components/swiper-img";
import CardProductService from "@/components/service-ui/card_product";
import useInfo from "@/zustand/auth";
import { useRouter } from "next/router";

type Props = {};
export default function DetailShopPage({}: Props) {
  const router = useRouter();
  const { accInfo } = useInfo();

  return (
    <Container maxWidth='xl' sx={{ mb: 10 }}>
      <Box sx={{ mt: 5, mb: 5 }}>
        <BreadCrumbsService title='Name of Product' />
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
              <MySwiperUnderImage />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant='h4' fontWeight={700}>
                Moomin For Pets Food Bowl Blue S - The Official Moomin Shop
              </Typography>
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Rating defaultValue={5} readOnly size='small' />
                <Typography>1 Reviews</Typography>
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
                $ 15.00
              </Typography>
              <Stack flexDirection={"row"} alignItems={"center"} gap={8}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <CheckCircleIcon sx={{ color: "#00b9c5" }} />
                  <Typography color={"#00b9c5"}>In Stock</Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <ul>
                    <li>Free 1-3 day shipping </li>
                  </ul>
                </Stack>
              </Stack>

              <Typography mt={3}>There are 128 products in total.</Typography>
              <Typography mt={1}>Category: Cat</Typography>
              <Typography mt={1}>Brand: ME-O</Typography>
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

                  <Button variant='contained' size='small'>
                    -
                  </Button>
                  <Typography fontWeight={500}>1</Typography>
                  <Button variant='contained' size='small'>
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
                ) : (
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
                    >
                      add to cart
                    </Button>
                    <Button className='btn_pink' variant='contained' fullWidth>
                      buy now
                    </Button>
                  </Stack>
                )}
              </Stack>
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
            <Typography mt={3}>
              ควบคุมความเร็วและความอัจฉริยะด้วย EDIFICE
              ซึ่งผสมผสานระหว่างระบบอะนาล็อกและดิจิตอลที่ขับเคลื่อนด้วยพลังงานแสงอาทิตย์
              ได้แรงบันดาลใจจากระบบกันสะเทือนของรถฟอร์มูลา SOSPENSIONE ECB-2000
              เป็น EDIFICE รุ่นแรกที่มีตัวเรือนเรซินเสริมคาร์บอนไฟเบอร์
              ด้วยดีไซน์ตัวเรือนที่มีเอกลักษณ์เฉพาะที่จัดเรียงสลักในโครงสร้างแบบสี่แขน
              สลักได้รับการเสริมด้วยคาร์บอนไฟเบอร์เช่นกัน
              นำจิตวิญญาณที่แท้จริงของมอเตอร์สปอร์ตมาสู่ดีไซน์และวัสดุ
            </Typography>
            <Typography
              sx={{ background: "#F7F7F7", p: 1, mt: 5 }}
              variant='h5'
              fontWeight={500}
            >
              Product Ratings
            </Typography>
            <Stack flexDirection={"column"}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={2} mt={3}>
                <Avatar />
                <Box>
                  <Typography>username</Typography>
                  <Rating defaultValue={5} readOnly size='small' />
                  <Typography sx={{ fontSize: 13 }}>2023-10-01</Typography>
                </Box>
              </Stack>
              <Box>
                <Typography mt={1}>
                  ได้รับสินค้าเเล้วครับสินค้าดีสวยงามสีตตรงตามที่สั่งการจัดส่งไวเเอดมินตอบดีถูกใจบริการดีขอบคุณครับ
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box mt={10}>
        <Typography align='center' variant='h4' fontWeight={700}>
          We found other products you might like!
        </Typography>
        <Grid container mt={5}>
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
      </Box>
    </Container>
  );
}
