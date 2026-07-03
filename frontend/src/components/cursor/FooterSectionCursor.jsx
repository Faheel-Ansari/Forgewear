import { motion } from "framer-motion";

const FooterSectionCursor = ({ x, y, isHovered }) => {

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{
        scale: isHovered ? 1 : 0,
        opacity: isHovered ? 1 : 0,
      }}
      className="w-32 h-32  bg-(--bg-accent) blur-3xl rounded-full flex items-center justify-center"
    >
    </motion.div>
  );
};
export default FooterSectionCursor;
