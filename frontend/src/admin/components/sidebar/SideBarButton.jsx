import { ArrowRight, House } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function SideBarButton({ theme, name, path, icon }) {
  return (
    <NavLink
      to={`/dashboard${path}`}
      end={path === ""}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-(--text-color) text-(--background) font-extrabold"
            : "bg-(--text-color)/10 hover:bg-(--bg-accent)/15 hover:text-(--bg-accent) text-(--text-color) font-bold"
        } capitalize flex justify-between items-center cursor-pointer transition-all duration-300 rounded-xl lg:rounded-2xl w-auto lg:w-full py-2 px-4 lg:py-3.5 lg:px-6 text-sm lg:text-base xl:text-lg text-left whitespace-nowrap flex-shrink-0 group`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center justify-start gap-3 lg:gap-4 text-inherit">
            {/* Centered responsive icon container */}
            <span className="w-5 h-5 flex justify-center items-center flex-shrink-0 text-inherit">
              {icon}
            </span>
            <span className="text-inherit tracking-wide">{name}</span>
          </div>

          {/* Right Indicator Arrow - Hidden on mobile/tablet horizontal pills */}
          {isActive && (
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="hidden lg:block text-inherit group-hover:translate-x-0.5 transition-transform duration-300 ml-2"
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export default SideBarButton;
