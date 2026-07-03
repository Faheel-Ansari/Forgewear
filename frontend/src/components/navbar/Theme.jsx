import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { useThemeToggle } from "./theme";
import { AnimatePresence, motion } from "framer-motion";

function Theme() {
  const { currentTheme, toggleTheme } = useThemeToggle();
  const MotionMoon = motion.create(Moon);
  const MotionSun = motion.create(Sun);
  const firstRender = useRef(true);
  return (
    <div
      onClick={toggleTheme}
      className="bg-(--text-color)/10 hover:bg-(--text-color)/15 text-(--text-color) rounded-lg p-2.5 cursor-pointer transition-all duration-300 flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {currentTheme === "LIGHT" ? (
          <MotionMoon
            className="fill-(--text-color) w-5 h-5"
            key="moon"
            stroke="none"
            initial={firstRender.current ? false : { y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 10 }}
          />
        ) : (
          <MotionSun
            className="fill-(--bg-accent) text-(--bg-accent) w-5 h-5"
            key="sun"
            size={20}
            initial={firstRender.current ? false : { y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 10 }}
          />
        )}
        {firstRender.current && (firstRender.current = false)}
      </AnimatePresence>
    </div>
  );
}

export default Theme;
