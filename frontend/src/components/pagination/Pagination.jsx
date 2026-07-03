import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  if (lastPage <= 1) return null;

  // Helper to generate a clean page array window (e.g., 1 ... 4 5 6 ... 20)
  const getPageRange = () => {
    const range = [];
    const delta = 1; // Number of pages to buffer on each side of active page

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 ||
        i === lastPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2 my-8 select-none"
      aria-label="Pagination"
    >
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center backdrop-blur-lg px-3 py-2 text-sm font-medium bg-(--text-color)/20 hover:bg-(--text-color)/30 rounded-lg disabled:cursor-not-allowed disabled:text-(--background) disabled:hover:bg-(--text-color)/20 transition-colors ease-in-out duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Pagination Range Numbers */}
      {getPageRange().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-400 font-medium"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg cursor-pointer transition-colors ease-in-out duration-200 ${
              currentPage === page
                ? "bg-(--bg-accent) font-bold shadow-md"
                : "bg-(--text-color)/20 hover:bg-(--text-color)/30"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="flex items-center justify-center backdrop-blur-lg px-3 py-2 text-sm font-medium bg-(--text-color)/20 hover:bg-(--text-color)/30 rounded-lg disabled:cursor-not-allowed disabled:text-(--background) disabled:hover:bg-(--text-color)/20 transition-colors ease-in-out duration-200 cursor-pointer"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;
