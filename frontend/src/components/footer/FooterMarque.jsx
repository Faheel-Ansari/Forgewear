import { motion } from "framer-motion";

function FooterMarque() {
  return (
    <div className="footerMarqueWrapper h-11 overflow-hidden cursor-default">
      <motion.div
        initial={{ translateX: 0 }}
        animate={{ translateX: "-50%" }}
        transition={{duration: 20, repeat: Infinity, ease: 'linear'}}
        className="footerTrack flex w-max h-full py-2 border-y items-center"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-1.5 whitespace-nowrap"
          >
            <p>SHIRTS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>JACKETS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>SHOES</p>
            <p className="text-(--bg-accent)">•</p>
            <p>PANTS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>HOODIES</p>
            <p className="text-(--bg-accent)">•</p>
          </div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-1.5 whitespace-nowrap"
          >
            <p>SHIRTS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>JACKETS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>SHOES</p>
            <p className="text-(--bg-accent)">•</p>
            <p>PANTS</p>
            <p className="text-(--bg-accent)">•</p>
            <p>HOODIES</p>
            <p className="text-(--bg-accent)">•</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default FooterMarque;
