import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { reviewSchema } from "../../schema/schema";
import { Send, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useReview } from "./review";

function WriteReview({ id, setToggleWriteReview }) {
  const parentVariants = {
    hidden: {
      height: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      height: "100vh",
      transition: {
        when: "beforeChildren",
        duration: 0.4,
        ease: "circInOut",
      },
    },
  };

  const childVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      height: "50%",
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(reviewSchema) });

  const [filledRating, setFilledRating] = useState(0);
  const [emptyRating, setEmptyRating] = useState(5);

  const { fetchDetailReviews } = useReview();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("product_id", Number(id));
    formData.append("rating", data.rating);
    formData.append("message", data.message);

    try {
      const res = await api.post(`/review/add`, formData);
      
      if (res.data.status === true) {
        toast.success(res.data.message);
        fetchDetailReviews(id);
        setToggleWriteReview(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setValue("rating", filledRating);
  }, [filledRating]);

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-30 bg-black/60 backdrop-blur-md flex justify-center items-center p-4 sm:p-6"
    >
      <motion.div
        variants={childVariants}
        className="w-full max-w-[92%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[45%] xl:max-w-[35%] max-h-[90vh] overflow-y-auto relative bg-(--text-color) text-(--background) rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 lg:p-16 scrollbar-none"
      >
        {/* Micro-style Close Button */}
        <button
          onClick={() => setToggleWriteReview(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 p-1.5 sm:p-2 bg-(--background) text-(--text-color) rounded-xl hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 shadow-md flex justify-center items-center"
        >
          <X
            size={18}
            className="sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]"
            strokeWidth={2.5}
          />
        </button>

        <div className="flex flex-col gap-6 sm:gap-8">
          <p className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
            Give us your Feedback
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 sm:gap-8"
          >
            {/* Rating Input Section */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-[0.1em] text-(--background)/60 flex flex-wrap items-center gap-2">
                Rating
                {errors.rating?.message && (
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-red-300 bg-red-500/20 px-2 py-0.5 rounded-md">
                    {errors.rating?.message}
                  </span>
                )}
              </label>
              <div className="flex items-center gap-1.5 px-1">
                <input type="hidden" {...register("rating")} />
                {emptyRating != 0 &&
                  Array.from({ length: emptyRating }).map((_, idx) => (
                    <Star
                      onClick={() => {
                        setFilledRating(idx + 1);
                      }}
                      key={idx}
                      size={26}
                      className="sm:w-[32px] sm:h-[32px] transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                      stroke={idx + 1 <= filledRating ? "#fbbf24" : "#b6bcc680"}
                      fill={idx + 1 <= filledRating ? "#fbbf24" : "none"}
                    />
                  ))}
              </div>
            </div>

            {/* Message Input Section */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="reviewMessage"
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.1em] text-(--background)/60 flex flex-wrap items-center gap-2"
              >
                Message
                {errors.message?.message && (
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-red-300 bg-red-500/20 px-2 py-0.5 rounded-md">
                    {errors.message?.message}
                  </span>
                )}
              </label>
              <textarea
                id="reviewMessage"
                rows={5}
                {...register("message")}
                placeholder="Write your message here..."
                className="bg-(--background)/5 border border-(--background)/10 rounded-2xl outline-none focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent) resize-none p-4 text-sm sm:text-base text-(--background) placeholder-(--background)/40 transition-all duration-300"
              ></textarea>
            </div>

            {/* Submit Button with Hover Lift */}
            <button
              type="submit"
              className="bg-(--background) text-(--text-color) hover:bg-(--bg-accent) hover:text-(--text-color) active:bg-(--bg-accent)/70 py-3.5 flex items-center justify-center gap-2 font-black rounded-xl cursor-pointer transition-all duration-300 text-sm sm:text-base uppercase tracking-wider shadow-md hover:-translate-y-0.5"
            >
              <Send size={16} strokeWidth={2.5} className="sm:w-[18px]" />
              Submit Feedback
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WriteReview;
