import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { bannerLists } from "../../utils";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const HeroBanner = () => {
  return (
    <div className="w-full aspect-[16/5] overflow-hidden h-60">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        navigation
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item, index) => (
          <SwiperSlide key={item.id}>
            {item.banner != "" ? (
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/dbf6342a41e793cf.jpeg?q=60"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full flex bg-gradient-to-r from-blue-100 to-indigo-200 ">
                <div className="hidden flex-1 lg:flex items-center justify-center  p-6">
                  <div className="text-center">
                    <h3 className="text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                      to="/products"
                    >
                      Shop
                    </Link>
                  </div>
                </div>

                <div className="flex-1 aspect-[16/5]">
                  <img
                    src="src\assets\sliders\s_3.webp"
                    alt="Banner"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
