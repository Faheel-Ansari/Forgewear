import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Footprints, ShoppingBag, Sparkles } from "lucide-react";

const MainLoading = () => {
  // Cycle through different clothing types to represent your category menu
  const icons = [
    <Shirt key="shirt" size={40} strokeWidth={1.2} />,
    <Footprints key="shoes" size={40} strokeWidth={1.2} />,
    <ShoppingBag key="bag" size={40} strokeWidth={1.2} />
  ];
  
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 800);
    return () => clearInterval(iconInterval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--background)"
    >
      <div className="text-center scale-200">
        
        {/* Main Oval Frame (Scales up on mount) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-28 h-36  mx-auto mb-6 border-2 border-(--bg-accent)/40 rounded-[50px] flex items-center justify-center bg-(--background) shadow-inner"
        >
          
          {/* Top Active Dot Circuit */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1 bg-(--background) px-2 h-2">
            <motion.span 
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-(--bg-accent)"
            />
          </div>

          {/* Morphing Apparel Icons Container */}
          <div className="relative text-(--bg-accent) w-10 h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={iconIndex}
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
              >
                {icons[iconIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Continuous Sparkle Spin */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -top-3 -right-3 text-orange-400"
            >
              <Sparkles size={16} />
            </motion.div>
          </div>

          {/* Bottom Active Dot Circuit */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 bg-(--background) px-2 h-2">
            <motion.span 
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-(--bg-accent)"
            />
          </div>
        </motion.div>

        {/* Text Treatment (Staggered fade-up entry) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-black tracking-widest text-(--text-color) uppercase">
            FORGEWEAR
          </h2>
          
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-2 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-(--bg-accent)"
          >
            <span>Premium</span>
            <span className="h-1 w-1 rounded-full bg-(--bg-accent)" />
            <span>Menswear</span>
          </motion.div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default MainLoading;