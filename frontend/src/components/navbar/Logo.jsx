import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Logo = ({ navLinkPath }) => {
  const logoName = "FORGEWEAR";
  const splittedLogoName = logoName.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letter = {
    hidden: { y: 0, opacity: 1 },
    visible: {
      y: [0, -80, 80, 0],
      opacity: [1, 0, 0, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };
  return (
    <NavLink to={navLinkPath}>
      <motion.h1
        variants={container}
        initial="hidden"
        whileHover={"visible"}
        exit="hidden"
        className="font-[logoFont] overflow-hidden text-3xl sm:text-5xl font-bold tracking-[0.2em] whitespace-nowrap"
      >
        {splittedLogoName.map((e, idx) => (
          <motion.span key={idx} className="inline-block" variants={letter}>
            {e}
          </motion.span>
        ))}
      </motion.h1>
    </NavLink>
  );
};

export default Logo;
