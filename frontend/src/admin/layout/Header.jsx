import { BellRing, ExternalLink, House, LogOut, Menu, X } from "lucide-react";
import { Logo, Theme } from "../../index";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import api, { BaseURL, getCSRF } from "../../api/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux-toolkit/features/AuthSlice";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const splittedName = user?.name?.split(" ");
  const letters = [
    splittedName?.[0]?.split("")[0],
    splittedName?.[1]?.split("")[0],
  ];

  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const onLogout = async () => {
    try {
      await getCSRF();
      const res = await axios.post(
        `${BaseURL}/logout`,
        {},
        {
          withCredentials: true,
          withXSRFToken: true,
        },
      );
      if (res.data.status === true) {
        dispatch(setUser({}));
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div
      className={`w-full h-[94px] sticky top-0 left-0 bg-(--background)/50 backdrop-blur-lg flex justify-center border-b border-(--text-color)/5 transition-all duration-300 ${
        isMobileHeaderOpen ? "z-50" : "z-30"
      }`}
    >
      <div className="w-full  px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center h-full">
        {/* Left Section: Dashboard Logo */}
        <div className="flex items-center flex-shrink-0">
          <Logo navLinkPath={"/dashboard"} />
        </div>

        {/* Right Section 1: Desktop Actions (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 h-full">

          {/* Theme Button */}
          <Theme />

          {/* Back to Site Link */}
          <NavLink
            to={"/"}
            className="px-4 py-2.5 rounded-xl font-bold bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/25 transition-all duration-300 flex justify-center items-center gap-2 text-sm"
          >
            <ExternalLink size={18} strokeWidth={2.5} /> Back to Site
          </NavLink>

          {/* Logout Trigger */}
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl font-bold bg-red-400/15 text-red-400 hover:bg-red-400/25 hover:text-white transition-all duration-300 cursor-pointer flex justify-center items-center gap-2 text-sm"
          >
            <LogOut size={18} strokeWidth={2.5} /> Logout
          </button>

          {/* User Profile Navigation Block */}
          <div className="h-10 border-l border-(--text-color)/15 pl-4 flex items-center">
            <NavLink
              to={"/dashboard/profile"}
              className={({ isActive }) =>
                `${isActive ? "bg-(--bg-accent)/15 text-(--bg-accent)" : "hover:bg-(--bg-accent)/15 hover:text-(--bg-accent) bg-(--text-color)/10 text-(--text-color)"} flex justify-between items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer transition-colors duration-300`
              }
            >
              {/* User Avatar Frame */}
              <div className="overflow-hidden rounded-full w-10 h-10 shadow-md flex-shrink-0">
                {user?.photo !== null ? (
                  <img
                    src={`${BaseURL}/uploads/userImages/${user.photo}`}
                    className="w-full h-full object-cover"
                    alt={user.name}
                  />
                ) : (
                  <div className="w-full h-full bg-(--bg-accent)/15 text-(--bg-accent) flex justify-center items-center gap-0.5 text-xs font-bold uppercase">
                    {letters.map((e, idx) => (
                      <span key={idx}>{e}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Name Details */}
              <div className="h-full flex flex-col justify-center text-left">
                <h3 className="text-sm font-bold capitalize truncate max-w-[120px]">
                  {user.name}
                </h3>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-inherit opacity-70 mt-0.5">
                  • {role}
                </p>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Right Section 2: Mobile/Tablet Controls (Hidden on desktop) */}
        <div className="flex lg:hidden items-center gap-3 justify-end h-full">
          {/* Theme Button */}
          <Theme />

          {/* Compact Mini Avatar Link */}
          <NavLink
            to={"/dashboard/profile"}
            className="overflow-hidden rounded-full w-10 h-10 shadow-md border border-(--text-color)/10 bg-(--text-color)/5 flex-shrink-0 flex items-center justify-center"
          >
            {user?.photo !== null ? (
              <img
                src={`${BaseURL}/uploads/userImages/${user.photo}`}
                className="w-full h-full object-cover"
                alt={user.name}
              />
            ) : (
              <div className="w-full h-full bg-(--bg-accent)/15 text-(--bg-accent) flex justify-center items-center gap-0.5 text-xs font-bold uppercase">
                {letters.map((e, idx) => (
                  <span key={idx}>{e}</span>
                ))}
              </div>
            )}
          </NavLink>

          {/* Mobile Drawer Toggle Button */}
          <button
            onClick={() => setIsMobileHeaderOpen(true)}
            className="p-2.5 bg-(--text-color)/10 hover:bg-(--text-color)/20 text-(--text-color) rounded-lg cursor-pointer flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            <Menu strokeWidth={2.2} size={20} />
          </button>
        </div>
      </div>

      {/* Sliding Mobile & Tablet Dashboard Drawer Panel */}
      <AnimatePresence>
        {/* Dark Backdrop Overlay */}
        {isMobileHeaderOpen && (
          <motion.div
            key="db-header-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileHeaderOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sliding Panel Card - Restored with Opaque Variable Background */}
        {isMobileHeaderOpen && (
          <motion.div
            key="db-header-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full h-screen bg-(--background) max-w-[300px] sm:max-w-[350px] text-(--text-color) shadow-2xl p-6 flex flex-col justify-between lg:hidden border-l border-(--text-color)/5"
          >
            <div className="flex flex-col gap-8">
              {/* Drawer Top Header Row */}
              <div className="flex items-center justify-between pb-4 border-b border-(--text-color)/10">
                <Logo navLinkPath={"/dashboard"} />
                <button
                  onClick={() => setIsMobileHeaderOpen(false)}
                  className="p-1.5 bg-(--text-color)/10 rounded-lg text-(--text-color) hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Mobile Drawer Profile Card */}
              <NavLink
                to={"/dashboard/profile"}
                onClick={() => setIsMobileHeaderOpen(false)}
                className="flex items-center gap-4 bg-(--text-color)/5 border border-(--text-color)/5 p-4 rounded-2xl cursor-pointer"
              >
                <div className="overflow-hidden rounded-full w-12 h-12 shadow-md flex-shrink-0">
                  {user?.photo !== null ? (
                    <img
                      src={`${BaseURL}/uploads/userImages/${user.photo}`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-(--bg-accent)/15 text-(--bg-accent) flex justify-center items-center gap-0.5 text-sm font-bold uppercase">
                      {letters.map((e, idx) => (
                        <span key={idx}>{e}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center text-left">
                  <h3 className="text-base font-bold capitalize text-(--text-color)">
                    {user.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-(--text-color)/60 mt-0.5">
                    • {role}
                  </p>
                </div>
              </NavLink>

              {/* Action Items List inside mobile drawer */}
              <div className="flex flex-col gap-3.5 pt-4">
                <NavLink
                  to={"/"}
                  onClick={() => setIsMobileHeaderOpen(false)}
                  className="w-full bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/25 py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-colors duration-200"
                >
                  <ExternalLink size={16} strokeWidth={2.5} /> Back to Site
                </NavLink>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileHeaderOpen(false);
                    onLogout();
                  }}
                  className="w-full bg-red-400/10 text-red-500 hover:bg-red-500 hover:text-white py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 cursor-pointer"
                >
                  <LogOut size={16} strokeWidth={2.5} /> Logout
                </button>
              </div>
            </div>

            {/* Mobile Drawer Brand Footer */}
            <div className="text-[10px] text-(--text-color)/40 tracking-widest text-center border-t border-(--text-color)/5 pt-4 uppercase font-semibold">
              © {new Date().getFullYear()} Brand. Dashboard
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
