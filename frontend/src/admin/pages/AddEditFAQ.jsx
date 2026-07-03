import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { faqSchema } from "../../schema/schema";
import api from "../../api/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function AddEditFAQ() {
  const navigate = useNavigate();
  const { id, mode } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const fetchData = async (id) => {
    if (mode === "edit") {
      try {
        const res = await api.get(`/admin/faq/edit/${id}`);
        if (res.data.status === true) {
          const editData = res.data.faq;
          reset({
            question: editData.question,
            answer: editData.answer,
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {}
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("question", data.question);
    formData.append("answer", data.answer);
    if (mode === "add") {
      try {
        const res = await api.post("/admin/faq/add", formData);
        if (res.data.status === true) {
          toast.success(res.data.message);
          reset();
        } else if (res.data.status === "alreadyExist") {
          toast.error(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {}
    } else {
      formData.append("_method", "PUT");
      try {
        const res = await api.post(`/admin/faq/update/${id}`, formData);
        if (res.data.status === true) {
          toast.success(res.data.message);
          navigate(`/dashboard/faq`);
        } else if (res.data.status === "notFound") {
          toast.error(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id, mode]);

  return (
    <div className="w-full pb-20 min-h-full backdrop-blur-lg">
      {/* RESPONSIVE HEADER ROW */}
      <div className="pb-6 sm:pb-8 flex justify-between items-center border-b border-(--text-color)/20">
        <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl flex items-center justify-start gap-4 sm:gap-8 font-bold cursor-default text-(--text-color)">
          <NavLink
            to={"/dashboard/faq"}
            className="hover:text-(--bg-accent) transition-colors ease-in-out duration-300 flex items-center"
          >
            <ArrowLeft size={32} strokeWidth={3} className="sm:scale-125" />
          </NavLink>{" "}
          {mode} Question
        </h2>
      </div>

      {/* RESPONSIVE FORM WRAPPER */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-(--bg-accent)/5 p-4 sm:p-6 lg:p-8 mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl flex flex-col gap-6 sm:gap-8 text-sm sm:text-base xl:mx-0"
      >
        {/* Question Input Card */}
        <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl flex flex-col items-start justify-center gap-2.5 sm:gap-3">
          <label
            htmlFor="question"
            className="text-base sm:text-lg font-semibold text-(--text-color)"
          >
            Question
          </label>
          <input
            type="text"
            id="question"
            {...register("question")}
            placeholder="Write your question here..."
            className={`w-full bg-(--background)/20 outline outline-2 focus:outline-(--bg-accent) py-2 px-3 rounded-lg text-sm sm:text-base ${
              errors.question?.message
                ? "outline-red-400 text-red-400"
                : "outline-(--text-color)/30 focus:outline-(--bg-accent)"
            }`}
          />
          {errors.question?.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.question?.message}
            </p>
          )}
        </div>

        {/* Answer Textarea Card */}
        <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl flex flex-col items-start justify-center gap-2.5 sm:gap-3">
          <label
            htmlFor="answer"
            className="text-base sm:text-lg font-semibold text-(--text-color)"
          >
            Answer
          </label>
          <textarea
            rows={6}
            id="answer"
            placeholder="Write your answer here..."
            {...register("answer")}
            className={`w-full bg-(--background)/20 outline outline-2 focus:outline-(--bg-accent) py-2 px-3 rounded-lg text-sm sm:text-base transition-all ${
              errors.answer?.message
                ? "outline-red-400 text-red-400"
                : "outline-(--text-color)/30 focus:outline-(--bg-accent)"
            }`}
          ></textarea>
          {errors.answer?.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.answer?.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON ROW */}
        <div className="w-full mt-4 sm:mt-6">
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3.5 rounded-2xl font-bold text-sm sm:text-base lg:text-lg bg-(--bg-accent) text-(--text-color) border-2 border-(--bg-accent) hover:bg-(--text-color) hover:text-(--background) hover:border-(--text-color) transition-all duration-300 cursor-pointer shadow-sm"
          >
            Save FAQ
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditFAQ;
