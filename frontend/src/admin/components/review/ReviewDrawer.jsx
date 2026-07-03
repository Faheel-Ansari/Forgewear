import { motion } from "framer-motion";
import { MessageSquareText, Star, X } from "lucide-react";

export default function ReviewDrawer({ review, setDrawerOpen, role }) {
  return (
    <motion.div
      key="ReviewDrawer"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 250 }}
      className="absolute bottom-4 right-4 sm:bottom-15 sm:right-5 w-[calc(100%-2rem)] sm:w-[420px] md:w-[450px] bg-(--text-color) border border-(--text-color)/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-30"
    >
      {/* Close Button */}
      <div className="absolute text-(--background) top-5 right-5">
        <X
          onClick={() => setDrawerOpen(null)}
          size={26}
          strokeWidth={3}
          className="hover:text-red-400 transition-colors ease-in-out duration-200 cursor-pointer"
        />
      </div>

      {/* Drawer Header */}
      <div className="text-(--background) flex items-center gap-2.5 mb-6">
        <MessageSquareText size={24} strokeWidth={3} className="sm:scale-110" />
        <h2 className="text-xl sm:text-2xl font-bold">
          {role === "admin" ? "Customer" : "Your"} Review
        </h2>
      </div>

      {/* Review Content Card */}
      <div className="bg-(--bg-accent)/10 text-(--background) border border-(--bg-accent)/20 rounded-2xl p-4 sm:p-5 shadow-inner">
        <p className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
          {review || "No review content provided."}
        </p>
      </div>
    </motion.div>
  );
}
