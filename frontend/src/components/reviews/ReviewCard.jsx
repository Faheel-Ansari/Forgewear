import { Frown, Search, Star } from "lucide-react";
import Loading from "../loading/Loading";
import api, { BaseURL } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsAvailable,
  setLoading,
  setReviews,
} from "../../redux-toolkit/features/ReviewSlice";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useReview } from "./review";

function ReviewCard({ id = 0 }) {
  const loading = useSelector((state) => state.review.loading);
  const isAvailable = useSelector((state) => state.review.isAvailable);
  const error = useSelector((state) => state.review.error);

  const reviews = useSelector((state) => state.review.reviews);

  const { fetchDetailReviews, fetchAllReviews } = useReview();

  useEffect(() => {
    if (id === 0) {
      fetchAllReviews();
    } else {
      fetchDetailReviews(id);
    }
  }, [id]);

  return (
    <div className="px-4 sm:px-6 pb-14 overflow-y-auto hide-scrollbar">
      {loading ? (
        <div className="py-12 flex justify-center items-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-(--text-color)/70 h-full w-full py-16 flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
          <Frown size={28} strokeWidth={2.5} />
          Something went wrong!
        </div>
      ) : !isAvailable ? (
        <div className="text-(--text-color)/70 h-full w-full py-16 flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
          <Search size={28} strokeWidth={2.5} />
          No reviews found!
        </div>
      ) : (
        <section className="columns-1 min-[540px]:columns-2 md:columns-2 lg:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-5 gap-4 space-y-4">
          {reviews.length > 0 &&
            reviews.map((review) => {
              const emptyRating = 5 - Number(review.rating);
              const rawTime = new Date(review.created_at);
              const time = formatDistanceToNow(rawTime, { addSuffix: true });

              // Crash-proof initials generator supporting single-word names
              const splittedName = review?.name?.split(" ") || [];
              const letters = [
                splittedName?.[0]?.charAt(0) || "",
                splittedName?.[1]?.charAt(0) || "",
              ].filter(Boolean);

              return (
                <div
                  key={review.id}
                  className="bg-(--text-color)/5 hover:bg-(--text-color)/10 border border-(--text-color)/5 text-(--text-color) backdrop-blur-lg break-inside-avoid group rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-md hover:border-(--text-color)/10 flex flex-col gap-3"
                >
                  {/* Header: User Profile details & Rating Stars */}
                  <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 pb-3 border-b border-(--text-color)/5">
                    <div className="flex items-center gap-3">
                      {review.photo !== null ? (
                        <img
                          src={
                            review.photo
                              ? `${BaseURL}/uploads/userImages/${review.photo}`
                              : "/images/user/no_profile.jpg"
                          }
                          alt=""
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-sm ring-1 ring-(--text-color)/10"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-(--bg-accent)/10 text-(--bg-accent) flex justify-center items-center gap-0.5 text-sm sm:text-base font-bold uppercase tracking-wider border border-(--bg-accent)/15">
                          {letters.map((e, idx) => (
                            <span key={idx}>{e}</span>
                          ))}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-(--text-color) truncate">
                          {review.name ?? "Unknown"}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-(--text-color)/55 mt-0.5">
                          {time}
                        </p>
                      </div>
                    </div>

                    {/* Rating Stars - Scales sharp without blurring artifacts */}
                    <div className="flex items-center gap-0.5 self-start min-[380px]:self-center">
                      {Array.from({ length: Number(review.rating) }).map(
                        (_, idx) => (
                          <Star
                            key={idx}
                            size={13}
                            className="sm:w-[15px] sm:h-[15px]"
                            stroke="#fbbf24"
                            fill="#fbbf24"
                          />
                        ),
                      )}
                      {emptyRating !== 0 &&
                        Array.from({ length: emptyRating }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={13}
                            className="sm:w-[15px] sm:h-[15px]"
                            stroke="#b6bcc680"
                            fill="none"
                          />
                        ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm leading-relaxed text-(--text-color)/80 font-medium whitespace-pre-line">
                    {review.review}
                  </p>
                </div>
              );
            })}
        </section>
      )}
    </div>
  );
}

export default ReviewCard;
