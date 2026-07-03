import { NavLink } from "react-router-dom";

function SearchCard({
  page,
  name,
  imagePath,
  tabName,
  setActiveSearchTab,
  searchTab,
}) {
  return (
    <NavLink to={`/${page}/${tabName}`}>
      <button
        onClick={() => setActiveSearchTab(tabName)}
        className={`${
          searchTab === tabName
            ? "bg-(--bg-accent)/10 text-(--bg-accent) border border-(--bg-accent) shadow-[0_8px_25px_rgba(0,0,0,0.03)] scale-102"
            : "bg-(--text-color)/5 hover:bg-(--bg-accent)/5 hover:border-(--text-color)/20 border border-(--text-color)/5 text-(--text-color)"
        } px-4 py-2 sm:px-5 sm:py-3 xl:px-6 xl:py-4.5 flex items-center backdrop-blur-md cursor-pointer rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap group`}
      >
        {/* Micro-Artifact Styled Image Wrapper */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 xl:w-14 xl:h-14 flex justify-center items-center flex-shrink-0 bg-(--text-color)/5 rounded-xl group-hover:scale-105 transition-transform duration-300">
          <img
            src={imagePath}
            className="w-[70%] h-[70%] object-contain drop-shadow-sm"
            alt=""
          />
        </div>

        {/* Micro-Typography Container */}
        <div className="ml-3 sm:ml-4 flex flex-col justify-center items-start">
          <p className="text-xs sm:text-sm md:text-base xl:text-lg font-extrabold uppercase tracking-widest text-inherit">
            {name}
          </p>
          <div className=" opacity-50 text-[10px] sm:text-xs tracking-wider">
            <span className="inline-block">Premium •&nbsp;</span>
            <span className="inline-block capitalize">{name}</span>
          </div>
        </div>
      </button>
    </NavLink>
  );
}

export default SearchCard;
