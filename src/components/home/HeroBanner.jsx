import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { publicApi } from "../../api/api";
import HeroBannerSkelton from "./HeroBannerSkelton";

const HeroBanner = () => {
  const bannerThemes = [
    {
      // Clean White & Soft Blue
      background: "bg-gradient-to-br from-white via-blue-50 to-indigo-50",
      subtitle: "text-blue-600",
      title: "text-slate-900",
      description: "text-slate-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5",
    },
    {
      // Light Sky Gradient
      background: "bg-gradient-to-r from-sky-100 to-white",
      subtitle: "text-sky-700",
      title: "text-slate-800",
      description: "text-slate-600",
      button: "bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5",
    },
    {
      // Minimalist Modern (Pure White focus)
      background: "bg-white border-b border-blue-100",
      subtitle: "text-indigo-500",
      title: "text-gray-900",
      description: "text-gray-500",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-5",
    },
    {
      // Soft "Ice" Blue
      background: "bg-gradient-to-tr from-blue-100 via-white to-blue-50",
      subtitle: "text-blue-500",
      title: "text-blue-950",
      description: "text-blue-800/70",
      button: "bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5",
    },
  ];
  const theme = bannerThemes[1];
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const { data } = await publicApi.get(`/ads/active`);
        setAds(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  return (
    <div className="w-full overflow-hidden rounded-lg">
      {loading ? (
        <HeroBannerSkelton />
      ) : (
        <Swiper
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay, Navigation]}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <div className="w-full aspect-[3/1] md:aspect-[6/1]">
                {/* PRE-DESIGNED BANNER */}
                {ad.bannerImage ? (
                  <Link to={ad.redirectUrl} className="block w-full h-full">
                    <img
                      src={ad.bannerImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ) : (
                  /* GENERATED BANNER */
                  <div className="w-full aspect-[3/1] md:aspect-[6/1]">
                    <div className={`w-full h-full flex ${theme.background}`}>
                      {/* Text */}
                      <div className="flex-1 flex items-center justify-center p-2 md:p-3 lg:p-4">
                        <div className="text-center max-w-[90%] lg:max-w-[70%] mx-auto">
                          <h3
                            className={`text-sm md:text-lg lg:text-2xl xl:text-3xl font-bold leading-tight ${theme.subtitle}`}
                          >
                            {ad.subtitle}
                          </h3>

                          <h1
                            className={`text-base md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 leading-tight ${theme.title}`}
                          >
                            {ad.title}
                          </h1>

                          {/* Strictly hidden until LG screen per your original design */}
                          <p
                            className={`hidden lg:block font-bold text-base mt-1 leading-tight ${theme.description}`}
                          >
                            {ad.description}
                          </p>

                          <Link
                            className={`mt-2 inline-block py-1.5 text-xs md:text-sm lg:text-sm transition-colors ${theme.button}`}
                            to={ad.redirectUrl}
                          >
                            {ad.ctaText}
                          </Link>
                        </div>
                      </div>
                      {/* Image */}
                      <div className="md:flex-1 h-full flex items-center justify-center">
                        <img
                          src={ad.productImage}
                          alt="Banner"
                          className="w-2/3 md:w-1/2 lg:w-3/4 h-full object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroBanner;
