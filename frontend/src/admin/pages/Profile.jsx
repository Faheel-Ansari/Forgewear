import { yupResolver } from "@hookform/resolvers/yup";
import api, { BaseURL, getCSRF } from "../../api/axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profileSchema } from "../../schema/schema";
import {
  AtSign,
  Eye,
  EyeClosed,
  Image,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { setUser } from "../../redux-toolkit/features/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const splittedName = user?.name?.split(" ");
  const letters = [
    splittedName?.[0]?.split("")[0],
    splittedName?.[1]?.split("")[0],
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {
    if (
      data.name === user.name &&
      data.email === user.email &&
      data.password === "" &&
      data.photo.length === 0
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("photo", data.photo[0]);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("_method", "PUT");
    try {
      const res = await api.post("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status === true) {
        dispatch(
          setUser({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            photo: res.data.user.photo,
          }),
        );
      }
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-16 p-6 sm:p-10 md:p-14 backdrop-blur-lg rounded-2xl w-full max-w-4xl mx-auto transition-all duration-300">
      {/* Left Section: Profile Image & Identity */}
      <div className="flex flex-col items-center gap-6 p-4 shrink-0">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-full shadow-2xl border-4 border-(--bg-accent)/20 relative group transition-transform duration-300 hover:scale-[1.02]">
          {user?.photo !== null ? (
            <img
              src={`${BaseURL}/uploads/userImages/${user.photo}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="uppercase w-full h-full bg-(--bg-accent)/15 text-(--bg-accent) flex justify-center items-center gap-2 text-5xl md:text-6xl font-black cursor-default select-none">
              {letters.map((e, idx) => (
                <span key={idx}>{e}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-lg md:text-xl font-bold cursor-default flex items-center gap-2 text-(--text-color)">
            <span className="w-2.5 h-2.5 rounded-full bg-(--bg-accent) inline-block" />
            {role === 'admin' ? 'Admin' : 'User'}
          </h2>
        </div>
      </div>

      {/* Right Section: Form Fields */}
      <div className="w-full max-w-md p-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          {/* Name Input */}
          <div className="flex flex-col gap-1.5 font-semibold">
            <label htmlFor="name" className="text-sm text-(--text-color)/80">
              Name
            </label>
            <div
              className={`${
                errors?.name?.message
                  ? "outline-rose-600 focus-within:ring-1 focus-within:ring-rose-600"
                  : "outline-(--text-color)/40 focus-within:outline-(--bg-accent) focus-within:ring-1 focus-within:ring-(--bg-accent)"
              } flex items-center outline transition-all duration-300 rounded-lg overflow-hidden`}
            >
              <input
                type="text"
                {...register("name")}
                id="name"
                className="w-full p-2.5 bg-transparent outline-none border-none text-sm text-(--text-color)"
              />
              <div className="p-2.5 text-(--text-color)/60">
                <UserRound strokeWidth={2} size={20} />
              </div>
            </div>
            {errors?.name?.message && (
              <p className="text-xs text-rose-600 mt-0.5">
                {errors?.name?.message}
              </p>
            )}
          </div>

          {/* Profile Picture Input */}
          <div className="flex flex-col gap-1.5 font-semibold">
            <label
              htmlFor="profilePicture"
              className="text-sm text-(--text-color)/80"
            >
              Profile Picture
            </label>
            <div
              className={`${
                errors?.photo?.message
                  ? "outline-rose-600 focus-within:ring-1 focus-within:ring-rose-600"
                  : "outline-(--text-color)/40 focus-within:outline-(--bg-accent) focus-within:ring-1 focus-within:ring-(--bg-accent)"
              } flex items-center outline transition-all duration-300 rounded-lg overflow-hidden`}
            >
              <input
                type="file"
                {...register("photo")}
                id="profilePicture"
                className="w-full p-2 text-sm outline-none border-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-(--bg-accent)/15 file:text-(--bg-accent) hover:file:bg-(--bg-accent)/25 file:transition-colors file:cursor-pointer text-(--text-color)/70"
              />
              <div className="p-2.5 text-(--text-color)/60">
                <Image strokeWidth={2} size={20} />
              </div>
            </div>
            {errors?.photo?.message && (
              <p className="text-xs text-rose-600 mt-0.5">
                {errors?.photo?.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5 font-semibold">
            <label htmlFor="email" className="text-sm text-(--text-color)/80">
              Email
            </label>
            {role === "user" ? (
              <p className="outline outline-1 outline-(--text-color)/30 p-2.5 rounded-lg cursor-default bg-black/5 dark:bg-white/5 text-sm text-(--text-color)/60">
                {user.email}
              </p>
            ) : (
              <>
                <div
                  className={`${
                    errors?.email?.message
                      ? "outline-rose-600 focus-within:ring-1 focus-within:ring-rose-600"
                      : "outline-(--text-color)/40 focus-within:outline-(--bg-accent) focus-within:ring-1 focus-within:ring-(--bg-accent)"
                  } flex items-center outline transition-all duration-300 rounded-lg overflow-hidden`}
                >
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className="w-full p-2.5 bg-transparent outline-none border-none text-sm text-(--text-color)"
                  />
                  <div className="p-2.5 text-(--text-color)/60">
                    <AtSign strokeWidth={2} size={20} />
                  </div>
                </div>
                {errors?.email?.message && (
                  <p className="text-xs text-rose-600 mt-0.5">
                    {errors?.email?.message}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5 font-semibold">
            <label
              htmlFor="password"
              className="text-sm text-(--text-color)/80"
            >
              Password
            </label>
            <div
              className={`${
                errors?.password?.message
                  ? "outline-rose-600 focus-within:ring-1 focus-within:ring-rose-600"
                  : "outline-(--text-color)/40 focus-within:outline-(--bg-accent) focus-within:ring-1 focus-within:ring-(--bg-accent)"
              } flex items-center outline transition-all duration-300 rounded-lg overflow-hidden`}
            >
              <input
                type={isPasswordHidden ? "password" : "text"}
                {...register("password")}
                id="password"
                className="w-full p-2.5 bg-transparent outline-none border-none text-sm text-(--text-color)"
              />
              <button
                type="button"
                onClick={() => setIsPasswordHidden((prev) => !prev)}
                className="p-2.5 text-(--text-color)/60 hover:text-(--text-color) transition-colors cursor-pointer"
              >
                {isPasswordHidden ? (
                  <EyeClosed strokeWidth={2.5} size={20} />
                ) : (
                  <Eye strokeWidth={2.5} size={20} />
                )}
              </button>
            </div>
            {errors?.password?.message && (
              <p className="text-xs text-rose-600 mt-0.5">
                {errors?.password?.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1.5 font-semibold">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-(--text-color)/80"
            >
              Confirm Password
            </label>
            <div
              className={`${
                errors?.password_confirmation?.message
                  ? "outline-rose-600 focus-within:ring-1 focus-within:ring-rose-600"
                  : "outline-(--text-color)/40 focus-within:outline-(--bg-accent) focus-within:ring-1 focus-within:ring-(--bg-accent)"
              } flex items-center outline transition-all duration-300 rounded-lg overflow-hidden`}
            >
              <input
                type={isPasswordHidden ? "password" : "text"}
                {...register("password_confirmation")}
                id="confirmPassword"
                className="w-full p-2.5 bg-transparent outline-none border-none text-sm text-(--text-color)"
              />
              <div className="p-2.5 text-(--text-color)/60">
                <LockKeyhole strokeWidth={2} size={20} />
              </div>
            </div>
            {errors?.password_confirmation?.message && (
              <p className="text-xs text-rose-600 mt-0.5">
                {errors?.password_confirmation?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center font-bold mt-4">
            <button
              type="submit"
              className="w-full bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/25 active:scale-[0.98] py-3 cursor-pointer rounded-xl transition-all duration-300 text-sm shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
