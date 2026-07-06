import { Logo, Navlinks, Theme } from "../../index.js";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Handbag, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAddToCart } from "../cart/addToCart.js";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

let allLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Store", path: "/store/shirt" },
  { id: 3, name: "Sale", path: "/sale/shirt" },
];
const Navbar = ({isLoggedIn}) => {
  const location = useLocation();
  
  const isNavBarNormal =
    location.pathname.startsWith("/order") ||
    location.pathname.startsWith("/checkout");

  const navLinks = isLoggedIn
    ? [...allLinks, { id: 4, name: "Dashboard", path: "/dashboard" }]
    : [...allLinks, { id: 4, name: "Login", path: "/login" }];

  const cartCount = useSelector((state) => state.cart.cartCount);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className={`w-full h-[94px] sticky top-0 left-0 bg-(--background)/50 backdrop-blur-lg flex justify-center border-b border-(--text-color)/5 transition-all duration-300 z-30`}
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="lg:w-1/4 flex items-center flex-shrink-0">
          <Logo navLinkPath={"/"} />
        </div>

        {/* Desktop Navigation Link Row */}
        <div className="hidden lg:flex w-1/2 items-center justify-center h-full">
          <div className="flex items-center lg:gap-10 py-5 justify-evenly">
            {!isNavBarNormal &&
              navLinks.map((link) => (
                <Navlinks
                  key={link.id}
                  id={link.id}
                  linkName={link.name}
                  path={link.path}
                  isLoggedIn={isLoggedIn}
                />
              ))}
          </div>
        </div>

        {/* Action Controls & Responsive Menu Selectors */}
        <div className="lg:w-1/4 flex items-center gap-3 sm:gap-4 justify-end">
          {/* Cart Icon Link - Desktop & Tablet */}
          {!isNavBarNormal && (
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                `${isActive ? "bg-(--text-color) text-(--background)" : "bg-(--text-color)/10 hover:bg-(--text-color) hover:text-(--background)"} relative rounded-lg p-2.5 cursor-pointer transition-all duration-300 flex items-center justify-center`
              }
            >
              <Handbag strokeWidth={2.2} size={20} />
              {/* Refined floating cart indicator badge */}
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-(--bg-accent) text-(--text-color) w-4.5 h-4.5 font-black text-[9px] rounded-full flex items-center justify-center border border-(--background) shadow-sm">
                  {cartCount}
                </div>
              )}
            </NavLink>
          )}

          {/* Theme Toggle Button */}
          <Theme />

          {/* Mobile Menu Open Toggle Button */}
          {!isNavBarNormal && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden block bg-(--text-color)/10 hover:bg-(--text-color)/20 text-(--text-color) rounded-lg p-2.5 cursor-pointer transition-colors duration-300"
              aria-label="Open navigation menu"
            >
              <Menu strokeWidth={2.2} size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Sliding Mobile & Tablet Drawer Panel */}
      <AnimatePresence>
        {/* 1. Dark Backdrop Overlay - Upgraded to bg-black/75 & deep blur */}
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 h-screen bg-black/75 backdrop-blur-md lg:hidden"
          />
        )}

        {/* 2. Sliding Panel Card - Opaque Background floats brightly over overlay */}
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 h-screen w-full max-w-[300px] sm:max-w-[340px] bg-(--background) text-(--text-color) shadow-2xl p-6 flex flex-col justify-between lg:hidden border-l border-(--text-color)/5"
          >
            <div className="flex flex-col gap-8">
              {/* Drawer Top Header Row */}
              <div className="flex items-center justify-between pb-4 border-b border-(--text-color)/10">
                <Logo navLinkPath={"/"} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 bg-(--text-color)/10 rounded-lg text-(--text-color) hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer animate-none"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Vertical Navigation Links */}
              <div className="flex flex-col gap-2">
                {!isNavBarNormal &&
                  navLinks.map((link) => (
                    <div
                      key={link.id}
                      className="w-full flex justify-start pl-2 py-2 border-b border-(--text-color)/5 last:border-0"
                    >
                      <Navlinks
                        id={link.id}
                        linkName={link.name}
                        path={link.path}
                        isLoggedIn={isLoggedIn}
                        onClick={() => setIsMobileMenuOpen(false)} // Seamlessly closes drawer upon link selection
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Minimalist Mobile Brand Footer */}
            <div className="text-[10px] text-(--text-color)/40 tracking-widest text-center border-t border-(--text-color)/5 pt-4 uppercase font-semibold">
              © 2026 Forgewear. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
