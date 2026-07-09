import {
  Hero,
  Category,
  HomeMarque,
  SwiperSlider,
  FooterAction,
  ReviewCard,
  MainLoading,
} from "../index";
import { useMotionValue } from "framer-motion";
import { FooterSectionCursor } from "../index";
import api from "../api/axios";
import { useCursor } from "../components/cursor/cursor";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Home({
  isMediaLoading,
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { isSectionHovered, setIsSectionHovered } = useCursor();
  const footerSectionRef = useRef(null);

  const reviewsCount = useSelector((state) => state.review.reviewsCount);

  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [toggleReviewGradient, setToggleReviewGradient] = useState(false);

  const handleMouseMove = (e) => {
    if (!footerSectionRef.current) return;
    const rect = footerSectionRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const parseProducts = (res, setterFnc) => {
    if (res.data.status === false) {
      setIsAvailable(false);
    } else {
      const parsedProducts = res.data.products.map((product) => ({
        ...product,
        tags: JSON.parse(product.tags),
        sizes: JSON.parse(product.sizes),
        colors: JSON.parse(product.colors),
        oldPrice:
          JSON.parse(product.oldPrice) === null
            ? null
            : Number(product.oldPrice),
        newPrice: Number(product.newPrice),
        isNew: JSON.parse(product.isNew),
        avail: JSON.parse(product.avail),
      }));
      setError(false);
      setIsAvailable(true);
      setterFnc(parsedProducts);
    }
  };

  const fetchBestSellerProducts = async () => {
    setError(false);
    setLoading(true);
    try {
      const res = await api.get(`/home/bestseller`);
      parseProducts(res, setBestSellerProducts);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewArrivalProducts = async () => {
    setError(false);
    setLoading(true);
    try {
      const res = await api.get(`/home/newarrival`);
      parseProducts(res, setNewArrivalProducts);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellerProducts();
    fetchNewArrivalProducts();

    return () => {
      setBestSellerProducts([]);
      setNewArrivalProducts([]);
    };
  }, []);

  useEffect(() => {
    if (reviewsCount > 0) {
      setToggleReviewGradient(true);
    } else {
      setToggleReviewGradient(false);
    }
  }, [reviewsCount]);

  return (
    <div className="w-full flex flex-col items-center bg-(--background) text-(--text-color)">
      {/* Immersive Hero & Category Section */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 h-full">
        <Hero isMediaLoading={isMediaLoading} />
        <Category />
      </div>

      {/* Full-width Home Marquee */}
      <HomeMarque />

      {/* Product Showcase Sections */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-36 mt-8 sm:mt-12">
        {/* Best Sellers */}
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-4 sm:mb-6">
            <span className="text-(--bg-accent)">•</span> Best Sellers
          </h3>
          <SwiperSlider
            data={bestSellerProducts}
            error={error}
            isAvailable={isAvailable}
            loading={loading}
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
          />
        </div>

        {/* New Arrivals */}
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-4 sm:mb-6">
            <span className="text-(--bg-accent)">•</span> New Arrivals
          </h3>
          <SwiperSlider
            data={newArrivalProducts}
            error={error}
            isAvailable={isAvailable}
            loading={loading}
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
          />
        </div>
      </div>

      {/* Reviews Section Card Container */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto max-h-[70vh] md:max-h-[60vh] relative flex flex-col gap-6 sm:gap-8 mt-16 sm:mt-24">
        <div className="flex items-center justify-between pb-3 border-b border-(--text-color)/5">
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
            Reviews ({Number(reviewsCount).toLocaleString()})
          </h4>
        </div>
        <div className="overflow-y-auto pr-1">
          <ReviewCard />
        </div>
        {toggleReviewGradient && (
          <div
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
            className="w-full h-20 sm:h-26 absolute bottom-0 left-0 pointer-events-none"
          ></div>
        )}
      </div>

      {/* Interactive Custom Cursor Footer Action Section */}
      <div
        ref={footerSectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsSectionHovered((prev) => !prev)}
        onMouseLeave={() => setIsSectionHovered((prev) => !prev)}
        className="w-full max-w-[1440px] xl:max-w-[1600px] mx-auto relative h-[30vh] sm:h-[35vh] lg:h-[40vh] my-16 sm:my-24 lg:my-28 overflow-hidden rounded-3xl"
      >
        <FooterSectionCursor
          isHovered={isSectionHovered}
          x={mouseX}
          y={mouseY}
        />
        <FooterAction />
      </div>
    </div>
  );
}

export default Home;
