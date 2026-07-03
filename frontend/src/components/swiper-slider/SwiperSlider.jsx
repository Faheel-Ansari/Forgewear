import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Loading, SwiperCard } from "../../index";
import { Frown, Search } from "lucide-react";
import { useState } from "react";

function SwiperSlider({
  slideSpace = 50,
  perView = 3,
  pt = 50,
  pb = 50,
  loading,
  isAvailable,
  error,
  data = [],
  setCartID,
  cartID,
  setCartSize,
  cartSize,
  setCartColor,
  cartColor,
  setCartColorIndex,
  cartColorIndex,
  addToCart,
  cartItems,
}) {
  const [isAddToCartActive, setIsAddToCartActive] = useState(null);

  // Dynamic calculation to scale down your perView & slideSpace props proportionally
  const resolvedPerView = Number(perView);
  const resolvedSpace = Number(slideSpace) || 30;

  const responsiveBreakpoints = {
    // Mobile Portrait: Exactly 1 card visible, tight margins
    320: {
      slidesPerView: 1,
      spaceBetween: Math.min(resolvedSpace, 16),
    },
    // Landscape Mobile / Large Phones: Scales up to 2 cards if desktop allows
    480: {
      slidesPerView: Math.max(1, Math.min(2, resolvedPerView - 2)),
      spaceBetween: Math.min(resolvedSpace, 20),
    },
    // Tablets / Small Laptops: Scales up to 3 cards if desktop allows
    768: {
      slidesPerView: Math.max(1, Math.min(3, resolvedPerView - 1)),
      spaceBetween: Math.min(resolvedSpace, 24),
    },
    // Desktop & Laptops: Uses your passed default prop values
    1024: {
      slidesPerView: resolvedPerView,
      spaceBetween: resolvedSpace,
    },
    // Ultra-wide / 4K monitors: Expands further to fit large viewports gracefully
    1536: {
      slidesPerView: Math.max(resolvedPerView, 5),
      spaceBetween: Math.max(resolvedSpace, 40),
    },
  };

  return (
    <div className="w-full" onWheel={(e) => e.stopPropagation()}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Mousewheel, A11y]}
        breakpoints={responsiveBreakpoints} // Responsive views configuration
        pagination={{ clickable: true }}
        mousewheel={{ enabled: true }}
        style={{
          paddingTop: pt,
          paddingBottom: pb,
          "--swiper-pagination-color": "var(--bg-accent)",
          "--swiper-pagination-bullet-inactive-color": "var(--text-color)",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
      >
        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide text-(--text-color)/70">
            <Frown size={28} strokeWidth={2.5} />
            Something went wrong!
          </div>
        ) : !isAvailable ? (
          <div className="py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide text-(--text-color)/70">
            <Search size={28} strokeWidth={2.5} />
            No product found!
          </div>
        ) : (
          data.length > 0 &&
          data.map((e) => (
            <SwiperSlide key={e.id}>
              <SwiperCard
                page={"store"}
                id={e.id}
                averageRating={e.average_rating}
                image={e.color0image0}
                productTags={e.tags}
                title={e.title}
                slug={e.slug}
                category={e.category}
                sizes={e.sizes}
                colors={e.colors}
                oldPrice={e.oldPrice}
                newPrice={e.newPrice}
                isNew={e.isNew}
                avail={e.avail}
                setCartID={setCartID}
                cartID={cartID}
                setCartSize={setCartSize}
                cartSize={cartSize}
                setCartColor={setCartColor}
                cartColor={cartColor}
                setCartColorIndex={setCartColorIndex}
                cartColorIndex={cartColorIndex}
                addToCart={addToCart}
                cartItems={cartItems}
                isAddToCartActive={isAddToCartActive}
                setIsAddToCartActive={setIsAddToCartActive}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default SwiperSlider;
