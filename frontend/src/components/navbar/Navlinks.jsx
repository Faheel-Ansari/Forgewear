import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Navlinks({ id, linkName, path, isLoggedIn }) {
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState(1);

  return (
    <div
      style={{ display: "inline-block", position: "relative" }}
      
      onMouseEnter={() => {
        setHovered(true);
        setOrigin(0);
      }}
      onMouseLeave={() => {
        setOrigin(1);
        setHovered(false);
      }}
    >
      <NavLink
        to={path}
        end={path === "/"}
      
        className={({ isActive }) =>
          `text-sm sm:text-base font-semibold inline-block transition-all duration-300
            ${
              isActive
                ? `${id === 3 ? "border px-3.5 py-1.5 rounded-full border-(--bg-accent) text-(--bg-accent)" : "text-(--bg-accent) opacity-100"}`
                : `${id === 3 ? "border px-3.5 py-1.5 rounded-full border-(--text-color)/10 hover:border-(--bg-accent) text-(--text-color) hover:text-(--bg-accent) opacity-100" : "opacity-75 hover:opacity-100"}`
            }`
        }
      >
        {({ isActive }) => (
          <>
            {linkName}
            {id !== 3 && (
              <motion.span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  backgroundColor: "var(--bg-accent)",
                  originX: origin,
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isActive || hovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            )}
          </>
        )}
      </NavLink>
    </div>
  );
}

export default Navlinks;
