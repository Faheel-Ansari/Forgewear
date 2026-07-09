import { NavLink, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError } from "../../redux-toolkit/features/StoreSlice";
import Loading from "../../components/loading/Loading";
import { Pagination, ProductTile, SearchBar } from "../../index";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Check,
  CircleOff,
  Frown,
  LayoutGrid,
  Package,
  Search,
} from "lucide-react";
import { useFetchData } from "../components/product/fetchData";

function StatusCategory() {
  const dispatch = useDispatch();
  const { category } = useParams();

  const loading = useSelector((state) => state.store.loading);
  const isAvailable = useSelector((state) => state.store.isAvailable);
  const error = useSelector((state) => state.store.error);

  const data = useSelector((state) => state.store.data);
  const paginationData = useSelector((state) => state.store.paginationData);

  const perPage = 20;

  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(1);
  const [formattedQuery, setFormattedQuery] = useState("");
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const { fetchData } = useFetchData();
  const stockMap = {
    1: "all",
    2: "enabled",
    3: "disabled",
  };

  const changeStatus = async (id) => {
    setIsLoading(true)
    
    dispatch(setError(false));

    try {
      const res = await api.put(`/admin/${category}/${id}/change/status`);

      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        fetchData(category, stockMap[isActive], perPage, "", currentPageNo);
      }
    } catch (error) {
      dispatch(setError(true));
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (isActive !== null) {
      fetchData(category, stockMap[isActive], perPage);
    }
  }, [isActive, category]);

  useEffect(() => {
    return () => {
      dispatch(setData([]));
    };
  }, []);

  const handlePageChange = (targetPageNo) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageNo(targetPageNo);

    if (isActive !== null) {
      fetchData(category, stockMap[isActive], perPage, "", targetPageNo);
    } else {
      fetchData(category, "search", perPage, formattedQuery, targetPageNo);
    }
  };

  return (
    <div className="w-full pb-20 min-h-full backdrop-blur-lg">
      {/* RESPONSIVE HEADER ROW */}
      <div className="pb-6 sm:pb-8 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 border-b border-(--text-color)/20">
        <h2 className="uppercase text-xl sm:text-3xl lg:text-5xl font-bold flex items-center gap-4 sm:gap-8 cursor-default">
          <NavLink
            to={"/dashboard/status"}
            className="hover:text-(--bg-accent) transition-colors ease-in-out duration-300 flex items-center"
          >
            <ArrowLeft size={32} strokeWidth={3} className="sm:scale-125" />
          </NavLink>{" "}
          Manage Status of {category}s
        </h2>

        {/* Sorting Filters & Searchbar wrapper */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full xl:w-auto">
          <p className="text-(--text-color)/70 text-sm sm:text-base lg:text-lg font-semibold shrink-0">
            Sort By:
          </p>

          <button
            onClick={() => setIsActive(1)}
            className={`${
              isActive === 1
                ? "bg-(--bg-accent) text-(--background)"
                : "bg-(--text-color)/20 hover:bg-(--text-color) text-(--text-color)"
            } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
          >
            <Package size={20} strokeWidth={2.5} className="sm:scale-110" /> All
          </button>
          <button
            onClick={() => setIsActive(2)}
            className={`${
              isActive === 2
                ? "bg-(--bg-accent) text-(--background)"
                : "bg-(--text-color)/20 hover:bg-(--text-color) text-(--text-color)"
            } hover:text-(--background) cursor-pointer backdrop-blur-lg px-4 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
          >
            <Check size={20} strokeWidth={2.5} className="sm:scale-110" />{" "}
            Enabled
          </button>
          <button
            onClick={() => setIsActive(3)}
            className={`${
              isActive === 3
                ? "bg-(--bg-accent) text-(--background)"
                : "bg-(--text-color)/20 hover:bg-(--text-color) text-(--text-color)"
            } hover:text-(--background) cursor-pointer backdrop-blur-lg px-4 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
          >
            <CircleOff size={20} strokeWidth={2.5} className="sm:scale-110" />{" "}
            Disabled
          </button>

          {/* Searchbar wrapper behaves responsively */}
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
            <SearchBar
              category={category}
              fetchData={fetchData}
              perPage={perPage}
              setFormattedQuery={setFormattedQuery}
              setIsActive={setIsActive}
            />
          </div>
        </div>
      </div>

      {/* RESPONSIVE CONTENT AREA */}
      {loading ? (
        <div className="pt-12">
          <Loading />
        </div>
      ) : error ? (
        <div className="h-full w-full pt-12 flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold">
          <Frown size={28} strokeWidth={3} />
          Something went wrong!
        </div>
      ) : !isAvailable ? (
        <div className="h-full w-full pt-12 flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold">
          <Search size={28} strokeWidth={3} /> No product found!
        </div>
      ) : (
        /* Responsive tile container spacing */
        <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
          {data.length > 0 &&
            data.map((e) => (
              <ProductTile
                key={e.id}
                id={e.id}
                image={e.color0image0}
                newPrice={e.newPrice}
                sizes={e.sizes}
                tags={e.tags}
                title={e.title}
                avail={e.avail}
                method={changeStatus}
                productStatus={e.status}
                isLoading={isLoading}
                status={true}
              />
            ))}
        </div>
      )}

      {/* RESPONSIVE PAGINATION */}
      {data.length > 0 && (
        <div className="w-full flex justify-center sm:justify-end mt-8 sm:mt-12">
          <div className="w-full sm:w-auto max-w-md">
            <Pagination
              currentPage={paginationData?.current_page}
              lastPage={paginationData?.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusCategory;
