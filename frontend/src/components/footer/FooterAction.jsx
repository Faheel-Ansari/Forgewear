import { useState } from "react";
import { motion, scale } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { switchSearchTab } from "../store/searchTab";
import { NavLink } from "react-router-dom";
import { BaseURL } from "../../api/axios";
import { useSelector } from "react-redux";

function FooterAction() {
  const images = useSelector((state) => state.media.images);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const buttonName = "Store";
  const splittedButtonName = buttonName.split("");
  const { setActiveSearchTab } = switchSearchTab();

  const blockArr = [
    {
      name: "shirts",
      imgPath: `${BaseURL}/uploads/mediaLibrary/${images?.bottomCatShirtImg}`,
      tab: "shirt",
    },
    {
      name: "pants",
      imgPath: `${BaseURL}/uploads/mediaLibrary/${images?.bottomCatPantImg}`,
      tab: "pant",
    },
    {
      name: "hoodies",
      imgPath: `${BaseURL}/uploads/mediaLibrary/${images?.bottomCatHoodieImg}`,
      tab: "hoodie",
    },
    {
      name: "shoes",
      imgPath: `${BaseURL}/uploads/mediaLibrary/${images?.bottomCatJacketImg}`,
      tab: "shoes",
    },
    {
      name: "jackets",
      imgPath: `${BaseURL}/uploads/mediaLibrary/${images?.bottomCatShoesImg}`,
      tab: "jacket",
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letter = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.5, 1],
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="backdrop-blur-2xl bg-(--bg-accent)/5 overflow-hidden flex flex-wrap rounded-3xl w-full h-full border-2 border-(--bg-accent)/50 font-[logoFont] tracking-widest lg:text-8xl text-3xl uppercase font-black">
      {blockArr.map((elem, idx) => {
        const isHovered = hoveredIndex === idx;
        return (
          <NavLink
            to={`/store/${elem.tab}`}
            key={idx}
            onClick={() => setActiveSearchTab(elem.tab)}
            className="w-1/3 h-1/2 flex justify-center items-center overflow-hidden will-change-transform"
          >
            <button
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full h-full flex justify-center cursor-pointer items-center"
            >
              <motion.img
                src={elem.imgPath}
                className="absolute pointer-events-none"
                style={{ width: "30%" }}
                initial={false}
                animate={{
                  y: isHovered ? 0 : "-120%",
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 1.3,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              <motion.span
                className="absolute"
                initial={false}
                animate={{
                  y: isHovered ? "120%" : 0,
                  opacity: isHovered ? 0 : 1,
                  scale: isHovered ? 0.8 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {elem.name}
              </motion.span>
            </button>
          </NavLink>
        );
      })}
      <motion.div
        variants={container}
        initial="hidden"
        whileHover={"visible"}
        exit="hidden"
        className="w-1/3 h-1/2 flex justify-center items-center overflow-hidden will-change-transform"
      >
        <button className="w-full cursor-pointer h-full flex items-center justify-center gap-0 footer-action-store-btn">
          {splittedButtonName.map((e, idx) => (
            <motion.span key={idx} className="inline-block" variants={letter}>
              {e}
            </motion.span>
          ))}
          <ArrowUpRight
            id="footer-action-store-arrow"
            size={140}
            strokeWidth={3}
          />
        </button>
      </motion.div>
    </div>
  );
}

export default FooterAction;
