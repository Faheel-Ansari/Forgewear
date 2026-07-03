import { X } from "lucide-react";
import { motion } from "framer-motion";

const measurmentGuide = [
  {
    heading: "body length",
    definition: "Measure from center to back, from neck seam to bottom of hem.",
  },
  {
    heading: "chest width",
    definition:
      "Put one end of the measuring tape at the bottom of the armpit of the shirt and measure straight across the bottom of the other armpit.",
  },
  {
    heading: "across shoulder",
    definition:
      "Measure from shoulder joint stretch the tape straight across to the tip of your other shoulder blade.",
  },
  {
    heading: "sleeve length",
    definition:
      "Measure from your shoulder joint to just to past your wrist bone.",
  },
];

const sizeGuide = [
  { size: "xs", inches: [26, 18, 16, 7] },
  { size: "sm", inches: [27, 19, 17, 7.5] },
  { size: "md", inches: [28, 20, 18, 8] },
  { size: "lg", inches: [29, 21, 19, 8.5] },
  { size: "xl", inches: [30, 22, 20, 9] },
  { size: "xxl", inches: [31, 23, 21, 9.5] },
];

function SizeModal({ toggleSizeHelp }) {
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
      height: "60%",
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-30 bg-black/60 backdrop-blur-md flex justify-center items-center p-4 sm:p-6"
    >
      <motion.div
        variants={childVariants}
        className="w-full max-w-[92%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[35%] max-h-[90vh] overflow-y-auto relative bg-(--text-color) text-(--background) rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 lg:p-20 scrollbar-none"
      >
        {/* Micro-style Close Button */}
        <button
          onClick={toggleSizeHelp}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 p-1.5 sm:p-2 bg-(--background) text-(--text-color) rounded-xl hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 shadow-md flex justify-center items-center"
        >
          <X
            size={18}
            className="sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]"
            strokeWidth={2.5}
          />
        </button>

        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Size Help
          </h3>

          {/* Responsive Horizontal Scroll Size Table Container */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-none">
            <div className="min-w-[500px] lg:min-w-0 flex border-b border-(--background)/10 pb-6 sm:pb-8">
              <div className="w-[40%] text-left">
                <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase opacity-60">
                  Measurements (Inches)
                </h4>
                <div className="text-sm sm:text-base md:text-lg font-extrabold mt-6 sm:mt-10 md:mt-12 flex flex-col gap-3 sm:gap-4 text-(--background)/90">
                  <p className="py-1">Body Length</p>
                  <p className="py-1">Chest Width</p>
                  <p className="py-1">Across Shoulder</p>
                  <p className="py-1">Sleeve Length</p>
                </div>
              </div>

              {sizeGuide.map((e, idx) => (
                <div className="w-[12%] text-center flex-1" key={idx}>
                  <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-(--bg-accent) bg-(--background)/10 py-1 rounded-md">
                    {e.size}
                  </h4>
                  <div className="text-sm sm:text-base md:text-lg font-extrabold mt-6 sm:mt-10 md:mt-12 flex flex-col gap-3 sm:gap-4 text-(--background)/90">
                    {e.inches.map((inch, inchIDX) => (
                      <p
                        key={inchIDX}
                        className="py-1 border-b border-(--background)/5 last:border-0"
                      >
                        {inch}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Guidelines */}
          <div className="flex flex-col gap-4 sm:gap-6 border-t border-(--background)/10 pt-6 sm:pt-8">
            {measurmentGuide.map((e, idx) => (
              <div key={idx} className="group">
                <p className="uppercase text-sm sm:text-base md:text-lg font-bold tracking-wider text-(--bg-accent)">
                  • {e.heading}
                </p>
                <p className="text-xs sm:text-sm text-(--background)/70 leading-relaxed mt-1">
                  {e.definition}
                </p>
              </div>
            ))}
          </div>

          {/* Premium Footnote */}
          <div className="text-xs sm:text-sm text-(--background)/50 border-t border-(--background)/5 pt-4">
            Note:{" "}
            <span className="italic">
              "All measurements are taken with the garment laid flat. Slight
              variations (±0.5–1 inch) may occur."
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SizeModal;
