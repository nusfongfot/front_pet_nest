import * as React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

type Props = {
  data: any[];
};

export default function MySwiperUnderImage({ data }: Props) {
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
        style={{ height: "400px", cursor: "pointer" }}
      >
        {data?.map((item, i) => (
          <SwiperSlide
            style={{ display: "flex", justifyContent: "center" }}
            key={i}
          >
            <img
              src={item}
              style={{
                height: "400px",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
