import {
  ArrowUpRight,
  CircleOff,
  Handbag,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BaseURL } from "../../api/axios";
import { useEffect, useState } from "react";
import { useAddToCart } from "../cart/addToCart";
import { quantityControl } from "../store/quantityControl";
import { CartSize } from "../../index";
import toast from "react-hot-toast";

function SwiperCard({
  page,
  averageRating = 0,
  id,
  image = "",
  productTags = [],
  title = "",
  category = "",
  slug = "",
  sizes = [],
  colors = [],
  oldPrice = "",
  newPrice = "",
  isNew = false,
  avail = false,
  setCartColor,
  cartColor,
  setCartColorIndex,
  cartColorIndex,
  setCartSize,
  cartSize,
  setCartID,
  cartID,
  addToCart,
  cartItems,
  isAddToCartActive,
  setIsAddToCartActive,
}) {
  const [addToCartMessage, setAddToCartMessage] = useState(false);

  return (
    <div className="sliderCardWrapper group relative lg:h-[35vh] h-[50vh] w-full flex flex-col justify-between p-4 sm:p-5 rounded-3xl shadow-md hover:shadow-lg border border-(--text-color)/5 hover:border-(--bg-accent)/25 transition-all duration-300 overflow-hidden backdrop-blur-md">
      {/* Active Add to Cart Selection Drawer */}
      <AnimatePresence mode="wait">
        {isAddToCartActive === id && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // Explicitly wraps background HSL channels to ensure a solid background
            className="absolute inset-0 bg-(--background) text-(--text-color) p-5 z-10 flex flex-col justify-between rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 sm:gap-5">
              <p className="text-sm font-bold tracking-wider uppercase text-(--text-color)/60 flex flex-wrap items-center gap-1.5">
                Select Size{" "}
                {addToCartMessage && (
                  <span className="text-red-400 italic text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-red-500/15 px-2 py-0.5 rounded">
                    Please select Size & Color
                  </span>
                )}
              </p>
              <div className="flex flex-wrap justify-between gap-2.5">
                {sizes.map((e, idx) => (
                  <CartSize
                    key={idx}
                    size={e.value}
                    setSelectedSize={setCartSize}
                    selectedSize={cartSize}
                  />
                ))}
              </div>

              {/* Color Selection inside card */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold tracking-wider uppercase text-(--text-color)/60">
                  Select Color
                </p>
                <div className="flex items-center gap-3 px-2">
                  {colors.map((e, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCartColor(e.value);
                        setCartColorIndex(idx);
                      }}
                      style={{ backgroundColor: e.value }}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 border-2
                    ${
                      cartColor === e.value
                        ? "ring-2 ring-offset-2 ring-offset-(--text-color) ring-(--bg-accent) border-transparent"
                        : "border-(--background)/20 hover:scale-115"
                    }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions inside active card drawer */}
            <div className="flex items-center justify-around gap-3 mt-4 border-t border-(--text-color)/5 pt-4">
              <button
                onClick={() => {
                  setCartColorIndex(null);
                  setCartColor(null);
                  setCartSize(null);
                  setCartID(null);
                  setIsAddToCartActive(false);
                  setAddToCartMessage(false);
                }}
                className="hover:bg-(--text-color)/10 py-2.5 px-4 font-bold text-xs sm:text-sm rounded-xl cursor-pointer transition-colors duration-200 text-(--text-color)/70"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (cartColor === null || cartSize === null) {
                    setAddToCartMessage(true);
                    return;
                  }
                  setCartColorIndex(null);
                  setCartColor(null);
                  setCartSize(null);
                  setCartID(null);
                  setIsAddToCartActive(false);
                  setAddToCartMessage(addToCart(1));
                }}
                className="bg-(--bg-accent) text-(--background) hover:bg-(--bg-accent)/90 hover:text-(--text-color) py-2.5 px-5 font-bold text-xs sm:text-sm rounded-xl cursor-pointer transition-colors duration-200 shadow-sm"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Floating Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2.5 z-2">
        {isNew && (
          <span className="cursor-default inline-block bg-(--bg-accent)/10 text-(--bg-accent) font-black px-2.5 py-1 text-[10px] sm:text-xs tracking-wider uppercase rounded-lg border border-(--bg-accent)/15 text-center">
            New
          </span>
        )}
        {averageRating > 0 && (
          <span className="cursor-default flex items-center justify-center gap-1 bg-(--text-color)/10 text-(--text-color) font-black px-2.5 py-1 text-[10px] sm:text-xs tracking-wider rounded-lg text-center border border-(--text-color)/5">
            {averageRating.toFixed(1)}
            <Star
              stroke="#fbbf24"
              fill="#fbbf24"
              size={10}
              className="sm:w-[12px]"
            />
          </span>
        )}
      </div>

      {/* Right Floating Discount Badge */}
      <div className="absolute top-4 right-4 z-2">
        {oldPrice !== null && (
          <span className="inline-block cursor-default bg-(--text-color)/10 text-(--text-color) font-black px-2.5 py-1 text-[10px] sm:text-xs tracking-wider rounded-lg text-center border border-(--text-color)/5">
            {(((oldPrice - newPrice) / oldPrice) * 100).toFixed(0)}% OFF
          </span>
        )}
      </div>

      {/* Product Image Section - Fitted Opaque Scale */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden min-h-[140px] sm:min-h-[180px]">
        {!avail && (
          <div className="absolute bg-red-400 -rotate-45 w-[85%] h-0.5 text-center z-5 opacity-90 shadow-sm"></div>
        )}
        {image.length > 0 ? (
          <img
            src={`${BaseURL}/uploads/productImages/${image}`}
            alt={title}
            className="slideImage w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-102 drop-shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
          />
        ) : (
          <span className="text-xs font-semibold text-(--text-color)/40">
            No Image Preview
          </span>
        )}
      </div>

      {/* Card Bottom Details Layout */}
      <div className="flex flex-col justify-end gap-3 mt-auto">
        <div className="w-full flex flex-col gap-2 sm:px-1">
          <div className="flex flex-col gap-0.5">
            {/* Metadata tag list */}
            <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-(--bg-accent)/85 cursor-default truncate">
              {productTags.length > 0
                ? productTags.map((tag, idx) =>
                    productTags.length - 1 === idx
                      ? tag.value
                      : tag.value + " • ",
                  )
                : ""}
            </p>
            <NavLink
              to={`/${page}/${category}/${id}/${slug}`}
              className="font-black text-sm sm:text-base lg:text-lg text-(--text-color) capitalize truncate cursor-pointer tracking-tight"
              title={title !== "" ? title : ""}
            >
              {title !== "" ? title : ""}
            </NavLink>
          </div>

          {/* Prices Alignment */}
          <div className="flex flex-col">
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-[10px] sm:text-xs italic line-through cursor-default opacity-40">
                {oldPrice !== null ? `PKR ${oldPrice.toLocaleString()}` : ""}
              </p>
              {oldPrice !== null && (
                <p className="font-bold text-(--bg-accent)/75 text-[10px] sm:text-xs cursor-default italic">
                  Save PKR {(oldPrice - newPrice).toLocaleString()}
                </p>
              )}
            </div>
            <p className="font-black text-(--bg-accent) cursor-default text-base sm:text-lg lg:text-xl mt-0.5">
              {`PKR ${newPrice.toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="w-full flex justify-between gap-2">
          <NavLink
            to={`/${page}/${category}/${id}/${slug}`}
            className="px-2.5 py-2 w-full gap-1.5 flex items-center justify-center bg-(--text-color)/10 hover:bg-(--text-color)/15 text-(--text-color) rounded-xl font-bold text-xs cursor-pointer transition-all duration-200"
          >
            View{" "}
            <ArrowUpRight size={14} className="sm:w-[16px]" strokeWidth={2.5} />
          </NavLink>
          {!avail ? (
            <button
              disabled
              className="px-2.5 py-2 w-full flex items-center justify-center gap-1.5 rounded-xl font-bold bg-(--text-color)/10 text-(--text-color)/40 text-xs border border-transparent cursor-not-allowed"
            >
              Sold Out{" "}
              <CircleOff size={14} className="sm:w-[16px]" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={() => {
                setCartID(id);
                setIsAddToCartActive(id);
              }}
              className="px-2.5 py-2 w-full flex items-center justify-center gap-1.5 rounded-xl font-bold bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/25 text-xs cursor-pointer transition-all duration-200"
            >
              Add{" "}
              <Handbag size={14} className="sm:w-[16px]" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
