import { ChevronRight, Funnel, SlidersHorizontal, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sizesArr = ["XS", "SM", "MD", "LG", "XL", "XXL"];
function StoreFilter({
  filterPrice,
  sizeTab,
  availableTab,
  sortTab,
  setActiveSizeTab,
  setActiveAvailableTab,
  setActiveSortTab,
  setFilterPrice,
  filter,
  filters,
  page,
  perPage,
  tab,
}) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const filterPriceRef = useRef(null);

  // Shared Form Render block to keep components DRY (Don't Repeat Yourself)
  const renderFilterForm = (isMobile = false) => {
    return (
      <div className="flex flex-col gap-6 ">
        {/* Price Slider */}
        <div className="flex flex-col gap-4 py-6 border-b border-(--text-color)/5">
          <span className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider text-(--text-color)/60">
            <p className="text-sm font-bold tracking-wider text-(--text-color)">
              Price
            </p>
            <p className="text-(--bg-accent)">
              0 - {Number(filterPrice).toLocaleString()}
            </p>
          </span>
          <input
            type="range"
            onChange={(e) => setFilterPrice(e.target.value)}
            value={filterPrice}
            ref={filterPriceRef}
            min={0}
            max={25000}
            step={1000}
            className="w-full h-1 bg-(--text-color)/15 rounded-lg appearance-none cursor-pointer accent-(--bg-accent) range-slider"
          />
        </div>

        {/* Sizes Grid */}
        <div className="flex flex-col gap-4 py-6 border-b border-(--text-color)/5">
          <p className="text-sm font-bold tracking-wider uppercase text-(--text-color)/50">
            Sizes
          </p>
          <div className="flex flex-wrap gap-2.5 px-1">
            {sizesArr.map((size, idx) => {
              const isActive = sizeTab === size.toLowerCase();
              return (
                <button
                  type="button"
                  onClick={() =>
                    setActiveSizeTab((prev) => {
                      if (prev === size.toLowerCase()) return null;
                      return size.toLowerCase();
                    })
                  }
                  key={idx}
                  className={`${
                    isActive
                      ? "bg-(--bg-accent) text-(--background) shadow-sm scale-102"
                      : "bg-(--text-color)/10 hover:bg-(--bg-accent)/10 text-(--text-color)"
                  } uppercase w-10 h-10 sm:w-11 sm:h-11 flex justify-center items-center rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer border border-transparent`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex flex-col gap-4 py-6 border-b border-(--text-color)/5">
          <p className="text-sm font-bold tracking-wider uppercase text-(--text-color)/50">
            Availability
          </p>
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() =>
                setActiveAvailableTab((prev) =>
                  prev === "true" ? null : "true",
                )
              }
              className={`${
                availableTab === "true"
                  ? "bg-(--bg-accent) text-(--background)"
                  : "bg-(--text-color)/10 hover:bg-(--bg-accent)/20 text-(--text-color)"
              } w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer`}
            >
              In-Stock
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveAvailableTab((prev) =>
                  prev === "false" ? null : "false",
                )
              }
              className={`${
                availableTab === "false"
                  ? "bg-(--bg-accent) text-(--background)"
                  : "bg-(--text-color)/10 hover:bg-(--bg-accent)/20 text-(--text-color)"
              } w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer`}
            >
              Sold-Out
            </button>
          </div>
        </div>

        {/* Sorters Selection */}
        <div className="flex flex-col gap-4 py-6 border-b border-(--text-color)/5">
          <p className="text-sm font-bold tracking-wider uppercase text-(--text-color)/50">
            Sort By
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { id: "new", label: "Newest" },
              { id: "lowtohigh", label: "Price: Low → High" },
              { id: "hightolow", label: "Price: High → Low" },
            ].map((sortOption) => {
              const isActive = sortTab === sortOption.id;
              return (
                <button
                  type="button"
                  key={sortOption.id}
                  onClick={() =>
                    setActiveSortTab((prev) =>
                      prev === sortOption.id ? null : sortOption.id,
                    )
                  }
                  className={`${
                    isActive
                      ? "bg-(--bg-accent) text-(--background)"
                      : "bg-(--text-color)/10 hover:bg-(--bg-accent)/20 text-(--text-color)"
                  } w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer`}
                >
                  {sortOption.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-6">
          <button
            type="button"
            onClick={() => {
              filter(
                false,
                page,
                tab,
                perPage,
                filters,
                setActiveAvailableTab,
                setActiveSizeTab,
                setActiveSortTab,
                setFilterPrice,
              );
              if (isMobile) setIsFilterDrawerOpen(false); // Closes drawer upon application on mobile
            }}
            className="w-full cursor-pointer bg-(--bg-accent) text-(--background) hover:bg-(--bg-accent)/90 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 py-3 rounded-xl shadow-md hover:-translate-y-0.5"
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 1. Desktop Panel View - Inline Sidebar Card */}
      <div className="hidden lg:block w-full backdrop-blur-lg rounded-3xl shadow-xl border border-(--text-color)/5 bg-(--text-color)/2 px-5 py-6">
        <div className="pb-6 border-b border-(--text-color)/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xl font-extrabold tracking-tight">Filters</p>
            <SlidersHorizontal
              size={18}
              strokeWidth={2.5}
              className="text-(--bg-accent)"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              filter(
                true,
                page,
                tab,
                perPage,
                filters,
                setActiveAvailableTab,
                setActiveSizeTab,
                setActiveSortTab,
                setFilterPrice,
              )
            }
            className="cursor-pointer text-xs font-bold uppercase tracking-wider text-(--bg-accent) bg-(--bg-accent)/10 hover:bg-(--bg-accent)/20 px-3 py-1.5 rounded-lg transition-all duration-300"
          >
            Clear All
          </button>
        </div>
        {renderFilterForm(false)}
      </div>

      {/* 2. Mobile / Tablet View - Static Toggle Button */}
      <div className="block lg:hidden w-full px-2 sm:px-4">
        <button
          type="button"
          onClick={() => setIsFilterDrawerOpen(true)}
          className="w-full flex items-center justify-between bg-(--text-color)/10 border border-(--text-color)/5 text-(--text-color) px-5 py-3.5 rounded-2xl font-bold hover:bg-(--text-color)/15 active:bg-(--text-color)/20 transition-all duration-300"
        >
          <span className="flex items-center gap-2 text-sm">
            <SlidersHorizontal
              size={16}
              strokeWidth={2.5}
              className="text-(--bg-accent)"
            />
            Filter & Sort Products
          </span>
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* 3. Mobile / Tablet View - Sliding Left Drawer Filter Panel */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              key="filter-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Sliding Drawer Card - Restored with Solid Compiled Backdrop */}
            <motion.div
              key="filter-drawer"
              initial={{ x: "-100%" }} // Filters elegantly slide in from the LEFT
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-[300px] sm:max-w-[340px] bg-(--background) text-(--text-color) shadow-2xl p-6 flex flex-col justify-between lg:hidden border-r border-(--text-color)/5 overflow-y-auto scrollbar-none"
            >
              <div className="flex flex-col gap-6">
                {/* Drawer Top Header Row */}
                <div className="flex items-center justify-between pb-4 border-b border-(--text-color)/10">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-extrabold tracking-tight">
                      Filters
                    </p>
                    <SlidersHorizontal
                      size={16}
                      strokeWidth={2.5}
                      className="text-(--bg-accent)"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        filter(
                          true,
                          page,
                          tab,
                          perPage,
                          filters,
                          setActiveAvailableTab,
                          setActiveSizeTab,
                          setActiveSortTab,
                          setFilterPrice,
                        );
                        setIsFilterDrawerOpen(false); // Closes drawer upon clear
                      }}
                      className="cursor-pointer text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-md"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFilterDrawerOpen(false)}
                      className="p-1.5 bg-(--text-color)/10 rounded-lg text-(--text-color) hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <X size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                {renderFilterForm(true)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default StoreFilter;
