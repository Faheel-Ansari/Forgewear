import { ChevronDown, Frown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import {
  setError,
  setFAQ,
  setIsAvailable,
  setLoading,
} from "../../redux-toolkit/features/FAQSlice";
import Loading from "../loading/Loading";

function FAQ() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.faq.error);
  const loading = useSelector((state) => state.faq.loading);
  const isAvailable = useSelector((state) => state.faq.isAvailable);

  const faqs = useSelector((state) => state.faq.faqs);

  const [isClicked, setIsClicked] = useState(null);

  const fetchData = async () => {
    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get("/faq");

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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full">
      {/* Modernized Header */}
      <div className="border-b border-(--text-color)/5 pb-4">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
          FAQs
        </h3>
      </div>

      {/* Status Conditional Blocks */}
      {loading ? (
        <div className="py-12 flex justify-center items-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-(--text-color)/60 py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
          <Frown size={28} strokeWidth={2.5} />
          Something went wrong!
        </div>
      ) : !isAvailable ? (
        <div className="text-(--text-color)/60 py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
          <Search size={28} strokeWidth={2.5} />
          No FAQs found!
        </div>
      ) : (
        /* Accordion Container Wrapper */
        <div className="mt-6 sm:mt-8 border-t border-(--text-color)/10 backdrop-blur-lg rounded-2xl overflow-hidden">
          {faqs.length > 0 &&
            faqs.map((e) => {
              const isActive = isClicked === e.id;
              return (
                <div
                  onClick={() => {
                    setIsClicked((prev) => (prev === e.id ? null : e.id));
                  }}
                  key={e.id}
                  className={`px-4 sm:px-6 lg:px-10 xl:px-12 py-4.5 sm:py-5.5 lg:py-6.5 border-b border-(--text-color)/10 flex flex-col justify-center cursor-pointer transition-all duration-300 ease-out
                ${isActive ? "bg-(--text-color)/3" : "hover:bg-(--text-color)/2"}`}
                >
                  {/* Question Row */}
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-(--text-color)">
                      {e.question}
                    </h4>
                    <ChevronDown
                      strokeWidth={2.5}
                      size={16}
                      className={`sm:w-[20px] sm:h-[20px] transition-transform duration-300 ease-out text-(--text-color)/60 group-hover:text-(--text-color) ${
                        isActive ? "rotate-180 text-(--bg-accent)" : ""
                      }`}
                    />
                  </div>

                  {/* Framer Motion Dropdown Answer */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isActive ? "auto" : 0 }}
                    transition={{
                      ease: "easeOut",
                      duration: 0.3,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="lg:pr-16 pb-2">
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg lg:leading-relaxed text-(--text-color)/75 mt-3 sm:mt-4 text-justify">
                        {e.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default FAQ;
