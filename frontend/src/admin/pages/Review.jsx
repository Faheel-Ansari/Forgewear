import { Eye, EyeOff, Frown, Search, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api, { BaseURL } from "../../api/axios";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/product/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsAvailable,
  setLoading,
  setReviews,
  setPaginationData,
} from "../../redux-toolkit/features/ReviewSlice";
import { Loading, Pagination, ReviewDrawer } from "../../index";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function Review() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);

  const loading = useSelector((state) => state.review.loading);
  const isAvailable = useSelector((state) => state.review.isAvailable);
  const error = useSelector((state) => state.review.error);

  const reviews = useSelector((state) => state.review.reviews);
  const reviewsCount = useSelector((state) => state.review.reviewsCount);
  const paginationData = useSelector((state) => state.review.paginationData);

  const perPage = 20;

  const [isActive, setIsActive] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [publicCount, setPublicCount] = useState(0);
  const [privateCount, setPrivateCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const searchReview = async (pageNo = 1) => {
    const formattedQuery = searchValue.trim();

    if (formattedQuery === "") return;

    if (reviews.length <= 0) return;

    dispatch(setLoading(true));

    setIsActive(null);

    const query = `/admin/review/search?query=${formattedQuery}&perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setReviews([]));
      } else {
        dispatch(setReviews(res.data.reviews));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchReviews = async (perPage, pageNo = 1) => {
    const query =
      role === "admin"
        ? `/admin/review?perPage=${perPage}&page=${pageNo}`
        : `/user/review?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setReviews([]));
      } else {
        dispatch(setReviews(res.data.reviews));
        dispatch(setPaginationData(res.data.pagination));
        setTotalReviews(res.data.stats.totalReviews);
        setPrivateCount(res.data.stats.privateCount);
        setPublicCount(res.data.stats.publicCount);
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchPrivateReviews = async (perPage, pageNo = 1) => {
    const query = `/admin/review/private?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setReviews([]));
      } else {
        dispatch(setReviews(res.data.reviews));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchPublicReviews = async (perPage, pageNo = 1) => {
    const query = `/admin/review/public?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setReviews([]));
      } else {
        dispatch(setReviews(res.data.reviews));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeReviewStatus = async (id) => {
    try {
      const res = await api.get(`/admin/review/status/${id}`);

      if (res.data.status) {
        toast.success("Status changed successfully.");
        fetchReviews(perPage, currentPageNo);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const getSelectedReview = (id) => {
    if (selectedReview?.id === id) return;
    const filteredReview = reviews.filter((item) => item.id === id);
    setSelectedReview(filteredReview[0]);
  };

  const filterReviews = () => {
    if (isActive === null) return;

    if (isActive === 1) {
      fetchReviews(perPage);
    } else if (isActive === 2) {
      fetchPrivateReviews(perPage);
    } else {
      fetchPublicReviews(perPage);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await api.delete(`/admin/review/delete/${id}`);
      console.log(res);

      if (res.data.status === false) {
        toast.error("Review not found!");
        fetchReviews();
      } else {
        toast.success("Review deleted successfully.");
        fetchReviews();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    filterReviews();
  }, [isActive]);

  const handlePageChange = (targetPageNo) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageNo(targetPageNo);

    if (isActive === 1) {
      fetchReviews(perPage, targetPageNo);
    } else if (isActive === 2) {
      fetchPrivateReviews(perPage, targetPageNo);
    } else if (isActive === 3) {
      fetchPublicReviews(perPage, targetPageNo);
    } else {
      searchReview(targetPageNo);
    }
  };

  return (
    <div className="relative pb-20 min-h-full overflow-hidden backdrop-blur-lg">
      <AnimatePresence mode="wait">
        {drawerOpen !== null && drawerOpen === `review${selectedReview.id}` && (
          <ReviewDrawer
            review={selectedReview.review}
            setDrawerOpen={setDrawerOpen}
            role={role}
          />
        )}
      </AnimatePresence>

      {/* RESPONSIVE HEADER ROW */}
      <div className="pb-6 sm:pb-8 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 border-b border-(--text-color)/20">
        <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold cursor-default">
          Ratings & Reviews
        </h2>

        {role === "admin" && (
          /* Filter Controls Group */
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full xl:w-auto">
            <button
              onClick={() => setIsActive(1)}
              className={`${
                isActive === 1
                  ? "bg-(--bg-accent) text-(--background)"
                  : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
              } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
            >
              <Star
                size={18}
                strokeWidth={2.5}
                stroke="#fbbf24"
                fill="#fbbf24"
                className="sm:scale-110"
              />{" "}
              All Reviews
            </button>
            <button
              onClick={() => setIsActive(2)}
              className={`${
                isActive === 2
                  ? "bg-(--bg-accent) text-(--background)"
                  : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
              } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
            >
              <EyeOff size={18} strokeWidth={2.5} className="sm:scale-110" />{" "}
              Private
            </button>
            <button
              onClick={() => setIsActive(3)}
              className={`${
                isActive === 3
                  ? "bg-(--bg-accent) text-(--background)"
                  : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
              } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
            >
              <Eye size={18} strokeWidth={2.5} className="sm:scale-110" />{" "}
              Public
            </button>

            {/* Search bar Input wrapper */}
            <div className="flex-grow sm:flex-grow-0 w-full sm:w-64 flex justify-between items-center border border-(--text-color) focus-within:border-(--bg-accent) overflow-hidden transition-all duration-300 rounded-xl bg-(--background)/10">
              <input
                type="search"
                placeholder="Search by email..."
                className="flex-1 min-w-0 p-2.5 focus:outline-none text-sm sm:text-base bg-transparent"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <button
                onClick={searchReview}
                className="flex justify-center items-center p-2.5 hover:bg-(--bg-accent) cursor-pointer hover:text-(--background) transition-colors duration-300 text-(--text-color) shrink-0"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {role === "admin" && (
          /* RESPONSIVE SUMMARY CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-yellow-400/20 border border-yellow-400/20 text-(--text-color) p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <Star stroke="#fbbf24" fill="#fbbf24" size={18} />
                Total Reviews
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {totalReviews.toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-400/20 border border-orange-400/20 text-orange-400 p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <EyeOff size={18} /> Private Reviews
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {privateCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-(--bg-accent)/10 border border-(--bg-accent)/20 text-(--bg-accent) p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <Eye size={18} /> Public Reviews
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {publicCount.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* RESPONSIVE SCROLLABLE TABLE AREA */}
        <div className="overflow-x-auto rounded-2xl mt-8 sm:mt-10 border border-(--text-color)/20">
          <table className="w-full border-collapse text-left">
            {/* TABLE HEAD */}
            <thead className="bg-(--text-color)/10 text-xs sm:text-sm">
              <tr>
                {role === "admin" && (
                  <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                    Photo
                  </th>
                )}
                <th className="p-3 sm:p-4 font-semibold whitespace-nowrap text-center">
                  Date
                </th>
                {role === "admin" && (
                  <>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap text-center">
                      Customer
                    </th>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap text-center">
                      Email
                    </th>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap text-center">
                      Product Category
                    </th>
                  </>
                )}
                <th className="p-3 sm:p-4 font-semibold whitespace-nowrap text-center">
                  Product Title
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Rating
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Review
                </th>
                {role === "admin" && (
                  <>
                    <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                      Status
                    </th>
                    <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                      Action
                    </th>
                  </>
                )}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="text-xs sm:text-sm">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12">
                    <div className="flex items-center justify-center">
                      <Loading />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-lg sm:text-xl lg:text-2xl font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Frown size={24} strokeWidth={3} />
                      <span>Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              ) : !isAvailable ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-lg sm:text-xl lg:text-2xl font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Search size={24} strokeWidth={3} />
                      <span>No review found!</span>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews &&
                reviews.map((item) => {
                  const splittedName = item?.name?.split(" ");
                  const letters = [
                    splittedName?.[0]?.split("")[0] || "",
                    splittedName?.[1]?.split("")[0] || "",
                  ];

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-(--text-color)/10 hover:bg-(--text-color)/5 transition"
                    >
                      {role === "admin" && (
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          {item.photo !== null ? (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center border border-(--text-color)/10 shrink-0">
                              <img
                                src={`${BaseURL}/uploads/userImages/${item.photo}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-(--bg-accent)/15 text-(--bg-accent) flex justify-center items-center gap-0.5 text-sm sm:text-base font-bold shrink-0">
                              {letters.map((e, idx) => (
                                <p key={idx}>{e}</p>
                              ))}
                            </div>
                          )}
                        </td>
                      )}

                      <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                        {item.created_at}
                      </td>

                      {role === "admin" && (
                        <>
                          <td className="p-3 sm:p-4 text-center capitalize whitespace-nowrap">
                            {item.name}
                          </td>

                          <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                            {item.email}
                          </td>

                          <td className="p-3 sm:p-4 text-center capitalize whitespace-nowrap">
                            {item.category}
                          </td>
                        </>
                      )}

                      <td className="p-3 sm:p-4 text-center capitalize whitespace-nowrap">
                        {item.title}
                      </td>

                      <td className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {item.rating}{" "}
                          <Star size={14} stroke="#fbbf24" fill="#fbbf24" />
                        </div>
                      </td>

                      {/* REVIEW VIEW ACTION BUTTON */}
                      <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            getSelectedReview(item.id);
                            setDrawerOpen((prev) =>
                              prev === `review${item.id}`
                                ? null
                                : `review${item.id}`,
                            );
                          }}
                          className="px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/70 hover:text-white transition cursor-pointer"
                        >
                          View
                        </button>
                      </td>

                      {role === "admin" && (
                        <>
                          {/* STATUS TOGGLE BADGE */}
                          <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                            <div className="inline-flex justify-center">
                              {item.status === "private" ? (
                                <button
                                  onClick={() => changeReviewStatus(item.id)}
                                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 bg-orange-400/15 text-orange-400 hover:bg-orange-400/70 hover:text-white transition cursor-pointer text-xs sm:text-sm"
                                >
                                  <EyeOff size={14} /> Private
                                </button>
                              ) : (
                                <button
                                  onClick={() => changeReviewStatus(item.id)}
                                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/70 hover:text-white transition cursor-pointer text-xs sm:text-sm"
                                >
                                  <Eye size={14} /> Public
                                </button>
                              )}
                            </div>
                          </td>

                          {/* DELETE ACTION BUTTON */}
                          <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                            <div className="inline-flex justify-center">
                              <button
                                onClick={() => deleteReview(item.id)}
                                className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 bg-red-400/15 text-red-400 hover:bg-red-400/70 hover:text-white transition cursor-pointer text-xs sm:text-sm"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESPONSIVE PAGINATION WRAPPER */}
      {reviews.length > 0 && (
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

export default Review;
