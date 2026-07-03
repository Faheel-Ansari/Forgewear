import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const PaymentStatus = ({setPaymentStatus}) => {

  useEffect(() => {
    triggerConfetti();
    const timer = setTimeout(() => {
      setPaymentStatus(false)
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#22c55e", "#86efac"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#22c55e", "#86efac"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "100%" }}
      transition={{ duration: 0.5 }}
      className="flex items-center fixed top-0 left-0 justify-center min-h-screen w-full bg-black/30 backdrop-blur-sm z-20 p-6"
    >
      {/* Container restricted to 320px for that mobile-modal feel */}
      <div className="w-[40vh] h-[40vh] bg-green-800/50 text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          <motion.div
            key="success"
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* Green Pop Background */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 bg-green-100 rounded-full"
            />

            {/* SVG Checkmark Path Animation */}
            <svg
              width="78"
              height="78"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
            >
              <motion.path
                d="M20 6L9 17L4 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center justify-start overflow-hidden">
          <motion.div
            key="success-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-3">
              Payment Complete
            </h2>
            <p className="text-md font-light leading-snug">
              A receipt has been sent <br /> to your email
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStatus;
