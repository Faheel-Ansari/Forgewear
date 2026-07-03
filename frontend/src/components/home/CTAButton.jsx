import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

function CTAButton() {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 10 });
  const springY = useSpring(y, { stiffness: 200, damping: 10 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.6);
    y.set(distanceY * 0.6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <NavLink to={"/store/shirt"}>
      <motion.button
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 text-md backdrop-blur-md cursor-pointer shadow-xl flex items-center border border-(--bg-accent) hover:border-2 transition-all duration-300 ease-out font-semibold rounded-full"
      >
        Shop Collection <ArrowUpRight />
      </motion.button>
    </NavLink>
  );
}

export default CTAButton;
