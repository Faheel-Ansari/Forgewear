import { CircleOff, Handbag, Minus, Plus, Star } from "lucide-react";
import { switchFilterTab } from "./FilterTab";
import { quantityControl } from "./quantityControl";
import { useEffect, useState } from "react";
import { BaseURL } from "../../api/axios";
import { useAddToCart } from "../cart/addToCart";
import { AnimatePresence, motion } from "framer-motion";

function Detail({
  imagesForColor1 = [],
  imagesForColor2 = [],
  imagesForColor3 = [],
  imagesForColor4 = [],
  id = null,
  title = "",
  productTags = [],
  reviewsCount = 0,
  rating = 0.0,
  desc = "",
  oldPrice = "",
  newPrice = "",
  colors = [],
  sizes = [],
  category = "",
  slug = "",
  isNew = false,
  avail = false,
  toggleSizeHelp,
}) {
  const { filterTab: colorTab, setActiveFilterTab: setActiveColorTab } =
    switchFilterTab();
  const { filterTab: imageTab, setActiveFilterTab: setActiveImageTab } =
    switchFilterTab();

  const { quantity, decreaseQuantity, increaseQuantity } = quantityControl();
  const {
    cartColor,
    setCartColor,
    cartID,
    setCartID,
    cartSize,
    setCartSize,
    setCartColorIndex,
    addToCart,
    cartItems,
  } = useAddToCart();

  const [isAddToCartActive, setIsAddToCartActive] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState(false);

  const imagesToShow =
    colorTab === colors[0].value
      ? imagesForColor1
      : colorTab === colors[1]?.value
        ? imagesForColor2
        : colorTab === colors[2]?.value
          ? imagesForColor3
          : imagesForColor4;

  const parentVariants = {
    hidden: {
      height: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      height: "100%",
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        ease: "circInOut",
      },
    },
  };

  const childVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      height: "60%",
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    setIsAddToCartActive(null);
  }, [cartItems]);

  useEffect(() => {
    if (colors.length > 0 && !colorTab) {
      setActiveColorTab(colors[0].value);
    }
    setActiveImageTab(0);
  }, [colorTab]);

  useEffect(() => {
    if (!imageTab) {
      setActiveImageTab(0);
    }
  }, [imageTab]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1680px] mx-auto py-8 lg:py-15 px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
      {/* Left Column (Image Gallery) - Spans 7 cols on laptop */}
      <div className="w-full lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 md:gap-6 justify-center">
        {/* Thumbnails with Hover-Zoom Indicators */}
        <div className="w-full md:w-[20%] flex flex-row md:flex-col items-center md:items-end justify-center md:justify-start gap-3 sm:gap-4 md:gap-5 py-2 md:py-10">
          {imagesToShow.map((e, idx) => {
            const isActive = imageTab === idx;
            return (
              <button
                onClick={() => setActiveImageTab(idx)}
                key={idx}
                className={`group relative overflow-hidden flex justify-center items-center transition-all duration-300 ease-out cursor-pointer rounded-xl lg:rounded-2xl border flex-shrink-0
              ${
                isActive
                  ? "border-(--bg-accent) bg-(--bg-accent)/5 shadow-lg scale-102 ring-2 ring-(--bg-accent)/15"
                  : "border-(--text-color)/10 hover:border-(--text-color)/30 bg-(--text-color)/2 hover:bg-(--text-color)/5"
              } 
              w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-44 xl:h-44`}
              >
                <img
                  src={`${BaseURL}/uploads/productImages/${e}`}
                  className="w-[75%] h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
                  alt=""
                />
              </button>
            );
          })}
        </div>

        {/* Main Image Container with Soft Shadow Backplate */}
        <div className="w-full md:w-[80%] flex justify-center items-center relative group p-4 bg-(--text-color)/2 rounded-3xl border border-(--text-color)/5 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          {imagesToShow.length > 0 && (
            <img
              src={`${BaseURL}/uploads/productImages/${imagesToShow[imageTab]}`}
              className="max-h-[250px] sm:max-h-[380px] md:max-h-[480px] lg:max-h-[580px] xl:max-h-[680px] w-auto max-w-[90%] object-contain transition-transform duration-500 hover:scale-103 drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
              alt=""
            />
          )}
        </div>
      </div>

      {/* Right Column (Product Details Card) - Spans 5 cols on laptop */}
      <div className="backdrop-blur-xl bg-(--bg-accent)/5 border border-(--text-color)/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] w-full lg:col-span-5 px-5 sm:px-8 lg:px-10 py-8 lg:py-12 relative flex flex-col justify-between gap-10">
        {/* Option Selection Overlay Drawer */}
        <AnimatePresence mode="wait">
          {isAddToCartActive && (
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex items-end rounded-3xl overflow-hidden"
            >
              <motion.div
                variants={childVariants}
                className="w-full max-h-[95%] overflow-y-auto p-6 sm:p-8 rounded-t-3xl bg-(--text-color) text-(--background) flex flex-col justify-between gap-8 transition-colors duration-300"
              >
                <div className="flex flex-col gap-6 sm:gap-8 pb-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-(--background)/60">
                        Select Size
                      </p>
                      {addToCartMessage && (
                        <span className="text-red-300 italic text-xs font-medium animate-pulse">
                          Please select Size & Color
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {sizes.map((e, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCartSize(e.value)}
                          className={`${
                            cartSize === e.value
                              ? "bg-(--bg-accent) text-(--text-color) shadow-md scale-102"
                              : "bg-(--background)/20 hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) text-(--background)/80"
                          } w-[30%] sm:w-[31%] py-2.5 text-sm sm:text-base font-bold uppercase rounded-xl cursor-pointer transition-all duration-200`}
                        >
                          {e.value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-(--background)/60">
                      Select Color
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      {colors.map((e, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCartColor(e.value);
                            setCartColorIndex(idx);
                          }}
                          style={{ backgroundColor: e.value }}
                          className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 border-2
                        ${
                          cartColor === e.value
                            ? "ring-2 ring-offset-2 ring-offset-(--text-color) ring-(--bg-accent) border-transparent"
                            : "border-(--background)/20 hover:scale-108"
                        }`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-around gap-4 sm:gap-5 mb-2 mt-4">
                  <button
                    onClick={() => {
                      setCartID(null);
                      setCartColor(null);
                      setCartSize(null);
                      setCartColorIndex(null);
                      setIsAddToCartActive(false);
                      setAddToCartMessage(false);
                    }}
                    className="bg-(--background)/10 hover:bg-(--background)/25 w-full py-3.5 text-sm sm:text-base font-bold rounded-xl cursor-pointer transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setAddToCartMessage(addToCart(quantity));
                    }}
                    className="bg-(--bg-accent) hover:bg-(--bg-accent)/90 hover:text-(--text-color) w-full py-3.5 text-sm sm:text-base font-bold rounded-xl cursor-pointer transition-colors duration-200"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges Layout */}
        <div className="absolute top-0 right-4 sm:right-6 lg:right-10 flex items-start gap-3 sm:gap-4 z-2">
          {isNew && (
            <div className="bg-(--bg-accent) text-(--background) cursor-default px-3 py-2 sm:px-4 sm:py-2.5 rounded-b-2xl text-xs sm:text-sm font-black tracking-widest uppercase">
              New
            </div>
          )}
          {oldPrice !== null && (
            <div className="bg-(--text-color) text-(--background) cursor-default px-3 py-2 sm:px-4 sm:py-2.5 rounded-b-2xl text-xs sm:text-sm font-black tracking-widest uppercase">
              {(((oldPrice - newPrice) / oldPrice) * 100).toFixed(0)}% OFF
            </div>
          )}
        </div>

        {/* Content Area */}
        <div>
          {/* Dynamic Tag Identifier */}
          <div className="text-(--bg-accent) text-xs font-bold tracking-[0.2em] uppercase cursor-default">
            <span className="inline-block">
              {productTags.length > 0 &&
                productTags.map((e, idx) =>
                  productTags.length - 1 === idx ? e.value : e.value + " • ",
                )}
            </span>
          </div>

          {/* Main Product Info Header */}
          <div className="mt-5 sm:mt-6 flex flex-col justify-center gap-4 sm:gap-5 cursor-default">
            {title !== "" && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black capitalize tracking-tight leading-tight lg:leading-12">
                {title}
              </h1>
            )}
            <div>
              {reviewsCount > 0 && (
                <p className="text-(--text-color)/60 text-xs sm:text-sm flex items-center justify-start lg:justify-end gap-2 tracking-wide">
                  <span className="flex items-center gap-1 font-bold">
                    ({rating}){" "}
                    <Star
                      size={14}
                      stroke="#fbbf24"
                      fill="#fbbf24"
                      className="sm:w-[16px]"
                    />
                  </span>
                  <span>•</span>
                  <span className="font-semibold">
                    {reviewsCount + " Reviews"}
                  </span>
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col justify-center gap-2 mt-2">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-(--text-color)/50">
                Description
              </h3>
              {desc !== "" && (
                <p className="text-sm sm:text-base leading-relaxed text-(--text-color)/80">
                  {desc}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Module */}
          <div className="mt-8 pt-8 border-t border-(--text-color)/5 cursor-default">
            <p className="line-through text-base sm:text-lg text-(--text-color)/40 tracking-wider">
              {oldPrice ? `PKR ${oldPrice.toLocaleString()}` : ""}
            </p>
            <span className="mt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-(--bg-accent) tracking-tight">
                {newPrice !== "" && `PKR ${newPrice.toLocaleString()}`}
              </h2>
              {oldPrice ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-(--bg-accent)/10 text-(--bg-accent) uppercase tracking-wider self-start sm:self-center">
                  Save PKR {(oldPrice - newPrice).toLocaleString()}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
          </div>

          {/* Color Swatch Panel */}
          <div className="mt-8 pt-8 border-t border-(--text-color)/5 cursor-default">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-(--text-color)/50 mb-4">
              Color
            </p>
            <div className="flex flex-wrap items-center gap-4 px-2">
              {colors.length > 0 &&
                colors.map((e, idx) => {
                  const isActive = colorTab === e.value;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveColorTab(e.value)}
                      style={{ backgroundColor: e.value }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-all duration-300 border-2 shadow-sm
                    ${
                      isActive
                        ? "scale-110 ring-2 ring-offset-2 ring-offset-(--background) ring-(--bg-accent) border-transparent"
                        : "scale-100 border-(--text-color)/10 hover:scale-110 hover:border-(--text-color)/30"
                    }`}
                    ></div>
                  );
                })}
            </div>
          </div>

          {/* Sizes Section Grid */}
          <div className="mt-8 pt-8 border-t border-(--text-color)/5 cursor-default">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-(--text-color)/50">
                Size
              </p>
              <button
                onClick={toggleSizeHelp}
                className="text-xs font-semibold tracking-wider uppercase underline text-(--text-color)/50 hover:text-(--bg-accent) transition-colors cursor-pointer"
              >
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 px-2">
              {sizes.length > 0 &&
                sizes.map((e, idx) => (
                  <div
                    key={idx}
                    className="uppercase px-4 py-2 text-sm sm:text-base font-bold rounded-lg border border-(--text-color)/10 bg-(--text-color)/2 tracking-wide text-(--text-color)/80 cursor-default"
                  >
                    {e.value}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* CTA / Footer Adaptive Area */}
        <div className="mt-8 pt-8 border-t border-(--text-color)/5">
          {!avail ? (
            <div className="bg-red-400/10 text-red-500 border border-red-400/20 py-3.5 rounded-2xl text-center font-bold text-base sm:text-lg flex items-center justify-center gap-3 tracking-wide">
              Sold Out <CircleOff strokeWidth={2.5} size={20} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-default">
              {/* Quantity Controls - Compact on Large, Fluid on Mobile */}
              <div className="w-full sm:w-auto flex justify-between items-center bg-(--text-color)/5 border border-(--text-color)/5 rounded-xl p-1 max-w-[180px] sm:max-w-none mx-auto sm:mx-0">
                <button
                  onClick={decreaseQuantity}
                  className="font-bold rounded-lg p-2.5 sm:p-3 cursor-pointer text-(--text-color)/70 hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) transition-colors duration-200 flex items-center justify-center"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <p className="font-extrabold text-base sm:text-lg text-(--text-color) px-5">
                  {quantity}
                </p>
                <button
                  onClick={increaseQuantity}
                  className="font-bold rounded-lg p-2.5 sm:p-3 cursor-pointer text-(--text-color)/70 hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              {/* Add to Cart Button - Automatically expands horizontally on laptops/tablets */}
              <div className="w-full sm:flex-1">
                <button
                  onClick={() => {
                    setIsAddToCartActive(true);
                    setCartID(id);
                  }}
                  className="w-full bg-(--text-color) text-(--background) text-base sm:text-lg font-bold cursor-pointer hover:bg-(--bg-accent) transition-all duration-300 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
                >
                  Add to Cart <Handbag strokeWidth={2.5} size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
