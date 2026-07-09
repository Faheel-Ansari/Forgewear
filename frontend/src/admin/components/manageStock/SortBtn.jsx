function SortBtn({ id, method, text, icon, status, isLoading }) {
  return (
    <button
      onClick={() => method(id)}
      className={`${
        status
          ? `${isLoading ? "bg-(--bg-accent)/10 text-(--bg-accent) cursor-progress" : "bg-(--bg-accent)/10 text-(--bg-accent) hover:text-(--background) hover:bg-(--bg-accent) cursor-pointer"}`
          : `${isLoading ? "bg-red-400/10 text-red-400 cursor-progress" : "bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-(--background) cursor-pointer"}`
      } w-full md:w-auto py-2 px-3 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 active:scale-98 shadow-sm`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">
        {isLoading ? "Loading..." : text}
      </span>
    </button>
  );
}

export default SortBtn;
