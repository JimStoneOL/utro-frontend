import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";

export const SwiperHome=()=>{

  
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          width:'100%',
          height:'400px'
        }}
 
        navigation={true}
        modules={[FreeMode, Navigation,Autoplay]}
        className="swiper"
        data-swiper-autoplay='2000'
      >
        <SwiperSlide>
          <img src="https://odejda.imrocket.ru/img/19074214.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://vipidei.com/wp-content/uploads/2020/09/proizvodstvo-tkani.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://www.informetr.ru/_files/maco_01_b.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://adlermebel.ru/images/shop/vitrina_1140.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i07.fotocdn.net/s117/63fede4559dcac7d/public_pin_m/2660449562.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.gozetim.com/images/dokumsuz-kumaslar-icin-deney-yontemleri---dokum-katsayisinin-tayini.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
