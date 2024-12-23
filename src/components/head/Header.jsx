import { Link } from "react-router-dom";
import { useHomeActivityTypes } from "../../hooks/useHomeQueries";
import { Swiper, SwiperSlide } from "swiper/react";

const Header = () => {
  const { data: activityData } = useHomeActivityTypes();
  const activities = activityData?.activities || [];

  return (
    <>
      {activities.length > 0 && (
        <div className="hidden lg:block">
          <div className="grid grid-cols-8 gap-4 justify-center mt-4 mx-auto rounded-lg items-center p-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={activity.logo}
                  alt={activity.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <div className="font-medium text-center text-sm w-full">
                  {activity.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="lg:hidden mt-4 px-4">
        <Swiper
          spaceBetween={12}
          breakpoints={{
            0: {
              slidesPerView: 3.2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 4.2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 5.2,
              spaceBetween: 16,
            },
          }}
        >
          {activities.map((activity, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2 shadow-sm">
                <img
                  src={activity.logo}
                  alt={activity.name}
                  className="w-10 h-10 object-contain mb-1"
                />
                <div className="font-medium text-center text-xs w-full truncate">
                  {activity.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Header;
