import { ArrowLeft, Frown, Plus, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import api from "../../api/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setFAQ,
  setIsAvailable,
  setLoading,
} from "../../redux-toolkit/features/FAQSlice";
import { FAQCard, Loading } from "../../index";
import toast from "react-hot-toast";

function AdminFAQs() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.faq.faqs);
  const loading = useSelector((state) => state.faq.loading);
  const error = useSelector((state) => state.faq.error);
  const isAvailable = useSelector((state) => state.faq.isAvailable);

  const fetchData = async () => {
    dispatch(setError(false));
    dispatch(setLoading(true));
    try {
      const res = await api.get("/admin/faq");

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
      } else {
        dispatch(setIsAvailable(true));
        dispatch(setFAQ(res.data.allFAQs));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteFAQ = async (id) => {
    try {
      const res = await api.delete(`/admin/faq/${id}`);
      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full pb-20 min-h-full backdrop-blur-lg">
      {/* RESPONSIVE HEADER ROW */}
      <div className="pb-6 sm:pb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-(--text-color)/20">
        <h2 className="uppercase text-xl sm:text-3xl lg:text-5xl font-bold cursor-default text-(--text-color)">
          Frequently Asked Questions
        </h2>
        <NavLink
          to={"/dashboard/faq/add"}
          className="bg-(--text-color) text-(--background) hover:bg-(--bg-accent) hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-1.5 transition-all duration-300 w-full sm:w-auto shrink-0 shadow-sm"
        >
          <Plus size={20} strokeWidth={2.5} className="sm:scale-110" /> Add
          Question
        </NavLink>
      </div>

      {/* RESPONSIVE CONTENT AREA */}
      <div className="backdrop-blur-lg">
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
            {data.map((e) => (
              <FAQCard
                key={e.id}
                answer={e.answer}
                question={e.question}
                id={e.id}
                deleteMethod={deleteFAQ}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFAQs;
