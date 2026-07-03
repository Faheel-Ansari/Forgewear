import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { BaseURL } from "../../api/axios";

const HeroImages = () => {
  const images = useSelector((state) => state.media.images);

  return (
    <div className="w-full h-[49vh] mt-6 sm:mt-10 px-4 sm:px-12 md:px-20 flex items-start justify-between relative">
      {/* Left Column: Image Pill 1 */}
      <div className="img1 lg:w-1/3 w-[30%] h-full flex flex-col items-center justify-start">
        <motion.div className="w-[8vh] sm:w-[10vh] lg:w-[13vh] xl:w-[15vh] h-[15vh] sm:h-[18vh] lg:h-[25vh] xl:h-[28vh] rounded-full shadow-xl hover:shadow-2xl overflow-hidden flex items-center justify-center border-2 border-(--bg-accent)/85 bg-(--bg-accent)/10 backdrop-blur-lg transition-shadow duration-300">
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 3,
              ease: "anticipate",
              delay: 1,
              repeat: Infinity,
            }}
            src={`${BaseURL}/uploads/mediaLibrary/${images?.heroLImg}`}
            className="w-[82%] h-[82%] object-contain"
            alt="Left Hero T-Shirt"
          />
        </motion.div>

        {/* Editorial feature list */}
        <div className="mt-5 flex justify-center items-center lg:pr-3">
          <ul className="list-disc list-inside text-center text-[9px] sm:text-[11px] lg:text-xs font-bold tracking-wider uppercase text-(--text-color)/75 marker:text-(--bg-accent)">
            <li>Premium Fabric</li>
            <li>Lightweight Feel</li>
            <li>Summer Ready</li>
          </ul>
        </div>
      </div>

      {/* Center Column: Prominent Image Pill 2 */}
      <div className="img2 lg:w-1/3 w-[40%] h-full flex flex-col items-center justify-center">
        {/* Top Accent Dots */}
        <div className="flex items-end justify-center lg:gap-3 gap-1.5 lg:mb-4 mb-2">
          <span className="lg:w-3 lg:h-3 w-1.5 h-1.5 bg-(--bg-accent)/40 rounded-full inline-block"></span>
          <span className="lg:w-5 lg:h-5 w-3 h-3 bg-(--bg-accent) rounded-full inline-block"></span>
          <span className="lg:w-3 lg:h-3 w-1.5 h-1.5 bg-(--bg-accent)/40 rounded-full inline-block"></span>
        </div>

        <motion.div className="w-[10vh] sm:w-[13vh] lg:w-[20vh] xl:w-[22vh] h-[20vh] sm:h-[26vh] lg:h-[40vh] xl:h-[45vh] rounded-full shadow-2xl hover:shadow-3xl overflow-hidden flex items-center justify-center border-2 border-(--bg-accent) backdrop-blur-lg transition-shadow duration-300">
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [20, -20, 20] }}
            transition={{
              duration: 3,
              ease: "backInOut",
              delay: 1,
              repeat: Infinity,
            }}
            src={`${BaseURL}/uploads/mediaLibrary/${images?.heroCImg}`}
            className="w-[90%] h-[90%] object-contain"
            alt="Center Hero T-Shirt"
          />
        </motion.div>

        {/* Bottom Accent Dots */}
        <div className="flex items-start justify-center lg:gap-3 gap-1.5 lg:mt-4 mt-2">
          <span className="lg:w-3 lg:h-3 w-1.5 h-1.5 bg-(--bg-accent)/40 rounded-full inline-block"></span>
          <span className="lg:w-5 lg:h-5 w-3 h-3 bg-(--bg-accent) rounded-full inline-block"></span>
          <span className="lg:w-3 lg:h-3 w-1.5 h-1.5 bg-(--bg-accent)/40 rounded-full inline-block"></span>
        </div>
      </div>

      {/* Right Column: Image Pill 3 */}
      <div className="img3 lg:w-1/3 w-[30%] h-full flex flex-col items-center justify-end">
        {/* Editorial feature list */}
        <div className="mb-5 flex justify-center items-center lg:pr-3">
          <ul className="list-disc list-inside text-center text-[9px] sm:text-[11px] lg:text-xs font-bold tracking-wider uppercase text-(--text-color)/75 marker:text-(--bg-accent)">
            <li>Modern Fit</li>
            <li>Bold Colors</li>
            <li>Street Style</li>
          </ul>
        </div>

        <motion.div className="w-[8vh] sm:w-[10vh] lg:w-[13vh] xl:w-[15vh] h-[15vh] sm:h-[18vh] lg:h-[25vh] xl:h-[28vh] rounded-full shadow-xl hover:shadow-2xl overflow-hidden flex items-center justify-center border-2 border-(--bg-accent)/85 bg-(--bg-accent)/10 backdrop-blur-lg transition-shadow duration-300">
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 3,
              ease: "anticipate",
              delay: 1,
              repeat: Infinity,
            }}
            src={`${BaseURL}/uploads/mediaLibrary/${images?.heroRImg}`}
            className="w-[82%] h-[82%] object-contain"
            alt="Right Hero T-Shirt"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImages;
