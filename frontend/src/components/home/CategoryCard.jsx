import React from "react";
import { NavLink } from "react-router-dom";

function CategoryCard({ imagePath, name, tab }) {
  return (
    <NavLink
      to={`/store/${tab}`}
      className="category-card group bg-(--bg-accent)/5 hover:bg-(--bg-accent)/10 border border-(--text-color)/5 hover:border-(--bg-accent)/25 cursor-pointer backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300 justify-center items-center w-full max-w-[130px] sm:max-w-[180px] lg:max-w-[220px]"
    >
      {/* Expanded image boundary wrapper with soft backplate */}
      <div className="category-image-container overflow-hidden flex justify-center items-center w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-xl sm:rounded-2xl bg-(--background)/10 relative">
        <img
          src={imagePath}
          className="category-image w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-95 drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)]"
          alt=""
        />
      </div>

      {/* Polished metadata text label */}
      <div className="category-text text-xs sm:text-sm text-center font-bold uppercase tracking-wider text-(--text-color)/85">
        {name}
      </div>
    </NavLink>
  );
}

export default CategoryCard;
