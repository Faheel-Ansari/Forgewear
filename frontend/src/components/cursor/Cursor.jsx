import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useCursor } from "./cursor";

function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const outerX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const outerY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const innerX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const innerY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="hidden xl:block" id="globalCursor">
      <motion.div
        style={{ x: outerX, y: outerY }}
        className="hidden xl:block w-9 h-9 fixed top-0 left-0 border-2 border-(--bg-accent) rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div
        style={{ x: innerX, y: innerY }}
        className="hidden xl:block w-3 h-3 fixed top-0 left-0 bg-(--bg-accent) rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default Cursor;
