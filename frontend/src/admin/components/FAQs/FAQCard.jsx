import { PenSquare, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

function FAQCard({ id, question, answer, deleteMethod }) {
  return (
    <div className="group relative overflow-hidden p-4 sm:p-6 lg:p-8 border border-(--text-color)/10 hover:border-(--bg-accent)/20 bg-gradient-to-r from-(--text-color)/2 to-transparent rounded-2xl flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6 hover:shadow-xl transition-all duration-300">
      {/* Left Section (Question & Answer Content) */}
      <div className="w-full md:w-[70%] lg:w-[75%] flex flex-col cursor-default">
        {/* Question Header */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold flex items-start gap-1.5 sm:gap-2 text-(--text-color) transition-colors duration-300 group-hover:text-(--bg-accent)">
          <span className="text-(--bg-accent) select-none animate-pulse shrink-0 mt-0.5 sm:mt-1">
            •
          </span>
          <span className="leading-snug">{question}</span>
        </h2>

        {/* Answer Body (Fluid Indentation) */}
        {answer && (
          <p className="pl-5 sm:pl-7 leading-relaxed mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-(--text-color)/75 font-medium break-words whitespace-pre-wrap">
            {answer}
          </p>
        )}
      </div>

      {/* Right Section (Buttons Action Group) */}
      <div className="w-full md:w-[30%] lg:w-[25%] flex flex-row md:flex-col lg:flex-row items-center justify-start sm:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t border-(--text-color)/5 md:border-0">
        {/* Edit Button */}
        <NavLink
          to={`/dashboard/faq/edit/${id}`}
          className="w-1/2 md:w-full lg:w-auto bg-(--bg-accent)/10 text-(--bg-accent) hover:bg-(--bg-accent) hover:text-(--background) cursor-pointer backdrop-blur-lg py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 shadow-sm whitespace-nowrap"
        >
          <PenSquare
            size={14}
            className="sm:scale-110 shrink-0"
            strokeWidth={2.5}
          />
          <span>Edit</span>
        </NavLink>

        {/* Delete Button */}
        <button
          onClick={() => deleteMethod(id)}
          className="w-1/2 md:w-full lg:w-auto bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-(--background) cursor-pointer backdrop-blur-lg py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 shadow-sm whitespace-nowrap"
        >
          <Trash
            size={14}
            className="sm:scale-110 shrink-0"
            strokeWidth={2.5}
          />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default FAQCard;
