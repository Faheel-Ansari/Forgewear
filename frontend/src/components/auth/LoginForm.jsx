import {
  AtSign,
  Eye,
  EyeClosed,
  LockKeyhole,
  MoveRight,
  UserRound,
} from "lucide-react";

function LoginForm({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isPasswordHidden,
  setIsPasswordHidden,
  buttonTxt,
  isBtnDisabled,
  errorMessage,
  mode = "login",
}) {
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[30vh] flex flex-col gap-12"
    >
      <div className="flex flex-col gap-6">
        {mode === "signup" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="loginName" className="text-lg font-semibold">
              Name
            </label>
            <div
              className={`${errors.name?.message ? "outline-red-400" : "focus-within:outline-(--bg-accent)"} flex items-center rounded-lg outline-2 outline-(--text-color)/20 overflow-hidden transition-colors ease-in-out duration-300`}
            >
              <input
                type="text"
                {...register("name")}
                id="loginName"
                className="w-full p-3 outline-0"
              />
              <div className="p-3">
                <UserRound strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-red-400">{errors.name?.message}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="loginEmail" className="text-lg font-semibold">
            Email
          </label>
          <div
            className={`${errors.email?.message ? "outline-red-400" : "focus-within:outline-(--bg-accent)"} flex items-center rounded-lg outline-2 outline-(--text-color)/20 overflow-hidden transition-colors ease-in-out duration-300`}
          >
            <input
              type="email"
              {...register("email")}
              id="loginEmail"
              className="w-full p-3 outline-0"
            />
            <div className="p-3">
              <AtSign strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-red-400">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="loginPassword" className="text-lg font-semibold">
            Password
          </label>
          <div
            className={`${errors.password?.message ? "outline-red-400" : "focus-within:outline-(--bg-accent)"} flex items-center rounded-lg outline-2 outline-(--text-color)/20 overflow-hidden focus-within:outline-(--bg-accent) transition-colors ease-in-out duration-300`}
          >
            <input
              type={isPasswordHidden ? "password" : "text"}
              {...register("password")}
              id="loginPassword"
              className="w-full p-3 outline-0"
            />
            <div
              onClick={() => setIsPasswordHidden((prev) => !prev)}
              className="p-3 cursor-pointer"
            >
              {isPasswordHidden ? (
                <EyeClosed strokeWidth={2.5} />
              ) : (
                <Eye strokeWidth={2.5} />
              )}
            </div>
          </div>
          <p className="text-red-400">{errors.password?.message}</p>
        </div>
        {mode === "signup" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-lg font-semibold">
              Confirm Password
            </label>
            <div
              className={`${errors.confirmPassword?.message ? "outline-red-400" : "focus-within:outline-(--bg-accent)"} flex items-center rounded-lg outline-2 outline-(--text-color)/20 overflow-hidden transition-colors ease-in-out duration-300`}
            >
              <input
                type={isPasswordHidden ? "password" : "text"}
                {...register("password_confirmation")}
                id="confirmPassword"
                className="w-full p-3 outline-0"
              />
              <div className="p-3">
                <LockKeyhole strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-red-400">{errors.confirmPassword?.message}</p>
          </div>
        )}
      </div>
      {isBtnDisabled ? (
        <>
          <p className="text-red-400 italic">{errorMessage}</p>

          <button
            disabled
            type="button"
            className="p-3 bg-gray-400/40 text-gray-400 flex items-center justify-center gap-2 transition-colors ease-in-out duration-300 font-bold text-xl cursor-not-allowed rounded-lg"
          >
            {buttonTxt} <MoveRight size={28} />
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="p-3 bg-(--bg-accent) hover:bg-(--text-color) hover:text-(--background) active:bg-(--bg-accent)/20 flex items-center justify-center gap-2 transition-colors ease-in-out duration-300 font-bold text-xl cursor-pointer rounded-lg"
        >
          {buttonTxt} <MoveRight size={28} />
        </button>
      )}
    </form>
  );
}

export default LoginForm;
