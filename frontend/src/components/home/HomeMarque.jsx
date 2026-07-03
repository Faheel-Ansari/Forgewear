import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const HomeMarque = () => {
  const [direction, setDirection] = useState(1);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });
  }, [direction]);

  useEffect(() => {
    const handleWheel = (e) => setDirection(e.deltaY > 0 ? 1 : -1);
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <div className="w-full py-8 sm:py-12 lg:py-16 my-6 sm:my-10 lg:my-16 overflow-hidden cursor-default select-none">
        <motion.div
          animate={controls}
          className="py-4 sm:py-6 lg:py-8 uppercase bg-(--bg-accent)/10 border-y border-(--bg-accent)/80 flex whitespace-nowrap w-max gap-0 backdrop-blur-lg"
        >
          {/* First Loop Set */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="font-[logoFont] font-light items-center text-center tracking-wider px-2 sm:px-3 lg:px-4 shrink-0 uppercase flex gap-3 sm:gap-5 md:gap-6 lg:gap-8 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            >
              <p>forge</p>
              <p className="text-(--bg-accent)">•</p>
              <p>Premium</p>
              <p className="text-(--bg-accent)">•</p>
              <p>wear</p>
              <ArrowRight
                strokeWidth={2.5}
                className={`w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] xl:w-[72px] xl:h-[72px] 2xl:w-[96px] 2xl:h-[96px] transition-transform duration-600 ease-in-out ${
                  direction === 1 ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          ))}

          {/* Second Duplicated Loop Set for Infinite Scroll Width */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="font-[logoFont] font-light items-center text-center tracking-wider px-2 sm:px-3 lg:px-4 shrink-0 uppercase flex gap-3 sm:gap-5 md:gap-6 lg:gap-8 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            >
              <p>forge</p>
              <p className="text-(--bg-accent)">•</p>
              <p>Premium</p>
              <p className="text-(--bg-accent)">•</p>
              <p>wear</p>
              <ArrowRight
                strokeWidth={2.5}
                className={`w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] xl:w-[72px] xl:h-[72px] 2xl:w-[96px] 2xl:h-[96px] transition-transform duration-600 ease-in-out ${
                  direction === 1 ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default HomeMarque;
