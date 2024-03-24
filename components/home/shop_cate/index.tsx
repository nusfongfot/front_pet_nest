import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";

type Props = {};

const data = [
  {
    title: "Bird Food",
    src: "/assets/images/bird.png",
    link: "/shop?cate=bird",
  },
  {
    title: "Fish Food",
    src: "/assets/images/fish.jpg",
    link: "/shop?cate=fish",
  },
  {
    title: "Dog Food",
    src: "/assets/images/dog.jpg",
    link: "/shop?cate=dog",
  },
  {
    title: "Pets Toy",
    src: "/assets/images/pets_toy.jpg",
    link: "/shop?cate=toy",
  },
  {
    title: "Cat Food",
    src: "/assets/images/cat.jpg",
    link: "/shop?cate=cat",
  },
];

export default function ShopCategory({}: Props) {
  const router = useRouter();
  return (
    <Container maxWidth='xl' sx={{ mt: 10, mb: 5 }}>
      <Stack flexDirection={"column"} alignItems={"center"}>
        <Typography variant='h3' fontWeight={700} color={"#2d3054"}>
          Shop By Category
        </Typography>
      </Stack>
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Navigation]}
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.title}
              style={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  sx={{
                    outline: "30px solid #f7f7f7",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={item.src}
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      maxWidth: 150,
                      maxHeight: 150,
                    }}
                    onClick={() => router.push(`${item.link}`)}
                  />
                  <Typography
                    mt={4}
                    fontWeight={700}
                    color={"#2d3054"}
                    align='center'
                  >
                    {item.title}
                  </Typography>
                  <Typography align='center'>3 items</Typography>
                </Box>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </Container>
  );
}
