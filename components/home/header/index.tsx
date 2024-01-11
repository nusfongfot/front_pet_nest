type Props = {};
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Header({}: Props) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        // className='mySwiper'
      >
        <SwiperSlide>
          <img src='/assets/images/banner.webp' className={styles.img_height} />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/assets/images/banner1.jpg' className={styles.img_height} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
