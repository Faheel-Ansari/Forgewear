import { Search } from "lucide-react";
import { useState } from "react";
import api from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setError,
  setIsAvailable,
  setLoading,
} from "../../../redux-toolkit/features/StoreSlice";

function SearchBar({
  isDeleteSelected = false,
  setIsActive = false,
  setFormattedQuery,
  fetchData,
  category,
  perPage,
}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.store.data);
  const [searchValue, setSearchValue] = useState("");

  const searchFilter = async () => {
    const cleanQuery = searchValue.trim();

    if (cleanQuery === "") return;

    setFormattedQuery(cleanQuery);

    dispatch(setLoading(true));
    if (setIsActive) {
      setIsActive(null);
    }

    fetchData(category, "search", perPage, cleanQuery);
  };

  return (
    <div className="w-full flex justify-between items-center border border-(--text-color) focus-within:border-(--bg-accent) overflow-hidden transition-colors ease-in-out duration-300 rounded-2xl">
      <input
        type="search"
        placeholder="Search by Title or Price.."
        className="flex-1 min-w-0 w-full p-2.5 sm:p-3 focus:outline-none text-sm sm:text-base bg-transparent"
        disabled={isDeleteSelected}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <button
        disabled={isDeleteSelected}
        onClick={searchFilter}
        className={`flex justify-center items-center p-2.5 sm:p-3 shrink-0 ${
          isDeleteSelected
            ? "cursor-not-allowed text-(--text-color)/40"
            : "hover:bg-(--bg-accent) cursor-pointer hover:text-(--background)"
        } transition-colors ease-in-out duration-300`}
      >
        <Search size={18} className="sm:scale-110" />
      </button>
    </div>
  );
}

export default SearchBar;
