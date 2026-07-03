import { SquarePen, X } from "lucide-react";
import { motion } from "framer-motion";
import { switchFilterTab } from "../../../components/store/FilterTab";
import { useEffect } from "react";
import { BaseURL } from "../../../api/axios";
import { NavLink } from "react-router-dom";

function ProductModal({
  id,
  toggleViewProduct,
  imagesForColor1 = [],
  imagesForColor2 = [],
  imagesForColor3 = [],
  imagesForColor4 = [],
  title = "",
  tags = [],
  reviews = [],
  desc = "",
  oldPrice = "",
  newPrice = "",
  colors = [],
  sizes = [],
  category = "",
  slug = "",
  isNew = false,
  viewProduct,
}) {
  const parentVariants = {
    hidden: {
      height: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      height: "100vh",
      transition: {
        when: "beforeChildren",
        duration: 0.4,
        ease: "circInOut",
      },
    },
  };

  const childVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      height: "75%",
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const { filterTab: colorTab, setActiveFilterTab: setActiveColorTab } =
    switchFilterTab();
  const { filterTab: imageTab, setActiveFilterTab: setActiveImageTab } =
    switchFilterTab();

  const imagesToShow =
    colorTab === colors[0].value
      ? imagesForColor1
      : colorTab === colors[1]?.value
        ? imagesForColor2
        : colorTab === colors[2]?.value
          ? imagesForColor3
          : imagesForColor4;

  useEffect(() => {
    setActiveImageTab(0);
    setActiveColorTab(colors[0].value);
  }, [id]);
  useEffect(() => {
    setActiveImageTab(0);
  }, [colorTab]);

  useEffect(() => {
    if (!colorTab) {
      setActiveColorTab(colors[0].value);
    }
    setActiveImageTab(0);
  }, [colors]);

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-start lg:items-center overflow-y-auto p-4 sm:p-6 md:p-8"
    >
      <motion.div
        variants={childVariants}
        className="w-full max-w-[1400px] my-auto relative bg-(--text-color) text-(--background) rounded-3xl overflow-auto p-6 sm:p-10 lg:p-16"
      >
        {/* UNIFIED ACTION BUTTONS CONTAINER */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2 sm:gap-4 z-20">
          <NavLink
            to={`/dashboard/product/${category}/edit/${id}`}
            className="py-1.5 p-2 sm:p-2 bg-(--background)/20 font-bold text-sm sm:text-base lg:text-lg flex items-center gap-1.5 rounded-lg hover:bg-(--bg-accent) hover:text-(--background) cursor-pointer transition-colors ease-out duration-300"
          >
            <SquarePen size={16} strokeWidth={2.5} className="sm:scale-110" />{" "}
            Edit
          </NavLink>
          <button
            onClick={toggleViewProduct}
            className="p-1.5 sm:p-2 bg-red-400/15 text-red-400 rounded-lg hover:bg-red-400 hover:text-(--text-color) cursor-pointer transition-colors ease-out duration-300"
          >
            <X size={20} strokeWidth={3} className="sm:scale-125" />
          </button>
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="w-full pt-10 lg:pt-5 pb-6 flex flex-col lg:flex-row justify-center gap-6 lg:gap-8">
          {/* Left Gallery (Thumbnails + Main Image) */}
          <div className="w-full lg:w-[55%] flex gap-3 sm:gap-5">
            {/* Thumbnails Stack */}
            <div className="w-[20%] py-4 sm:py-6 lg:py-10 flex flex-col items-center justify-start gap-4">
              {imagesToShow.length > 0 &&
                imagesToShow.map((e, idx) => {
                  return (
                    <button
                      onClick={() => setActiveImageTab(idx)}
                      key={idx}
                      className={`${
                        imageTab === idx
                          ? "bg-(--bg-accent)/30"
                          : "hover:bg-(--background)/10"
                      } w-full h-16 sm:h-24 p-2 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer flex justify-center items-center transition ease-in-out duration-300`}
                    >
                      <img
                        src={`${BaseURL}/uploads/productImages/${e}`}
                        className="w-auto h-full max-h-full object-contain"
                        alt=""
                      />
                    </button>
                  );
                })}
            </div>
            {/* Main Hero Image */}
            <div className="w-[80%] flex justify-center items-center p-4">
              {imagesToShow.length > 0 && (
                <img
                  src={`${BaseURL}/uploads/productImages/${imagesToShow[imageTab]}`}
                  className="max-w-full max-h-[300px] sm:max-h-[450px] object-contain"
                  alt=""
                />
              )}
            </div>
          </div>

          {/* Right Description & Details Panel */}
          <div className="backdrop-blur-lg bg-(--background)/10 rounded-2xl w-full lg:w-[45%] px-5 py-6 sm:px-8 sm:py-10 relative flex flex-col justify-between gap-6">
            {/* New & Discounts Badges */}
            <div className="absolute top-0 right-6 sm:right-10 flex items-start gap-3 sm:gap-4">
              {isNew && (
                <div className="bg-(--background) text-(--text-color) cursor-default px-2.5 py-1.5 sm:px-3 sm:py-2.5 rounded-b-xl sm:rounded-b-2xl text-xs sm:text-sm lg:text-base font-bold">
                  New
                </div>
              )}
              {oldPrice !== null && (
                <div className="bg-(--bg-accent) text-(--background) cursor-default px-2.5 py-1.5 sm:px-3 sm:py-2.5 rounded-b-xl sm:rounded-b-2xl text-xs sm:text-sm lg:text-base font-extrabold">
                  {(
                    ((Number(oldPrice) - Number(newPrice)) / Number(oldPrice)) *
                    100
                  ).toFixed(0)}
                  % OFF
                </div>
              )}
            </div>

            {/* Info Blocks */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="text-(--background) font-semibold text-xs sm:text-sm cursor-default">
                <span className="inline-block">
                  {tags.length > 0 &&
                    tags.map((e, idx) =>
                      tags.length - 1 === idx ? e.value : e.value + " • ",
                    )}
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 cursor-default">
                {title !== "" && (
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black first-letter:uppercase lowercase leading-tight lg:leading-14">
                    {title}
                  </h1>
                )}

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold">
                    Description
                  </h3>
                  {desc !== "" && (
                    <pre className="text-(--background)/60 font-semibold text-wrap font-[bodyFont] text-sm sm:text-base lg:text-lg leading-snug sm:leading-7">
                      {desc}
                    </pre>
                  )}
                </div>
              </div>

              {/* Pricing Row */}
              <div className="cursor-default border-t border-(--background)/10 pt-4">
                <p className="text-(--background)/60 line-through text-sm sm:text-base lg:text-lg">
                  {oldPrice !== null
                    ? `PKR ${Number(oldPrice).toLocaleString()}`
                    : ""}
                </p>
                <div className="mt-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-(--background)">
                    {newPrice !== null &&
                      `PKR ${Number(newPrice).toLocaleString()}`}
                  </h2>
                  {oldPrice !== null && (
                    <p className="text-xs sm:text-sm lg:text-base italic text-(--background)/60">
                      Save PKR{" "}
                      {(Number(oldPrice) - Number(newPrice)).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Color Select */}
              <div className="flex flex-col gap-2 cursor-default pt-2">
                <p className="text-sm sm:text-base lg:text-lg font-bold">
                  Colors
                </p>
                <div className="flex flex-wrap items-center gap-3 px-1 sm:px-3">
                  {colors.length > 0 &&
                    colors.map((e, idx) => {
                      const isActive = colorTab === e.value;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveColorTab(e.value)}
                          style={{ backgroundColor: e.value }}
                          className={`${
                            isActive
                              ? "scale-110 border-2 border-(--bg-accent)"
                              : "scale-100 border"
                          } w-6 h-6 sm:w-8 sm:h-8 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out duration-300`}
                        ></div>
                      );
                    })}
                </div>
              </div>

              {/* Sizes Row */}
              <div className="flex flex-col gap-2 cursor-default pt-2">
                <p className="text-sm sm:text-base lg:text-lg font-bold">
                  Sizes
                </p>
                <div className="flex flex-wrap items-center gap-2 px-1 sm:px-3">
                  {sizes.length > 0 &&
                    sizes.map((e, idx) => (
                      <div
                        key={idx}
                        className="uppercase px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm lg:text-base font-semibold rounded-lg bg-(--text-color) transition-all ease-in-out duration-300"
                      >
                        {e.value}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;
