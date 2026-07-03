import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <motion.div
        className="w-20 h-20 border-6 border-(--text-color)/20 border-t-(--bg-accent) rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
