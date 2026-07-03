import { motion } from "framer-motion";
import { CTAButton, HeroImages } from "../../index";

function Hero({ isMediaLoading }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.5, // Staggers the h1 and h3 animations beautifully
      },
    },
  };

  // 2. Custom variant matching your exact cubic-bezier ease for the H1
  const h1Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 3. Custom variant for the subtitle description text
  const h3Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Slogan & Heading Layout Container */}
      <div className="w-full flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isMediaLoading ? "hidden" : "visible"}
          className="flex flex-col cursor-default overflow-hidden items-center w-full max-w-6xl px-4 sm:px-6 mx-auto"
        >
          {/* Dynamic scaled headline for mobile up to 4K displays */}
          <motion.h1
            variants={h1Variants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[10rem] overflow-hidden text-center font-[logoFont] uppercase tracking-wider leading-none font-black text-(--text-color)"
          >
            Forge Your Style
          </motion.h1>

          {/* Refined editorial styled description subheader */}
          <motion.h3
            variants={h3Variants}
            className="uppercase font-extrabold text-[10px] sm:text-xs md:text-sm tracking-widest text-center underline decoration-1 underline-offset-4 opacity-80 max-w-xl sm:max-w-2xl mt-4 sm:mt-6 leading-relaxed"
          >
            Premium menswear crafted for confidence, comfort, and everyday
            performance.
          </motion.h3>
        </motion.div>

        {/* Dynamic CTA Button Container */}
        <div className="mt-2 sm:mt-4">
          <CTAButton />
        </div>
      </div>

      {/* Hero Images Grid containing the capsule pills */}
      <div className="w-full">
        <HeroImages />
      </div>
    </div>
  );
}

export default Hero;
