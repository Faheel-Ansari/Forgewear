import { yupResolver } from "@hookform/resolvers/yup";
import { LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema/schema";
import { LoginForm } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Check localStorage on load to see if a block is active
  useEffect(() => {
    const blockUntil = localStorage.getItem("login_blocked_until");
    if (blockUntil) {
      const timeLeft = Math.ceil((parseInt(blockUntil) - Date.now()) / 1000);
      if (timeLeft > 0) {
        setIsBtnDisabled(true);
        setCountdown(timeLeft);
        setErrorMessage(
          `Too many login attempts. Please try again in ${timeLeft} seconds.`,
        );
      } else {
        localStorage.removeItem("login_blocked_until");
      }
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setIsBtnDisabled(false);
      setErrorMessage("");
      localStorage.removeItem("login_blocked_until");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const nextValue = prev - 1;
        if (nextValue <= 0) {
          setIsBtnDisabled(false);
          setErrorMessage("");
          localStorage.removeItem("login_blocked_until");
        } else {
          setErrorMessage(
            `Too many login attempts. Please try again in ${nextValue} seconds.`,
          );
        }
        return nextValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const onSubmit = async (data) => {
    try {
      // await getCSRF();
      const res = await api.post("/login", data);

      if (res.data.status === true) {
        const token = res.data.access_token;

        // Store the token in the browser's storage
        localStorage.setItem("auth_token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 429) {
        setIsBtnDisabled(true);

        // Pull the custom message from your backend response
        const serverMessage = error.response.data.message;

        // Extract seconds from Laravel message, or use a regex to match numbers
        const matches = serverMessage.match(/\d+/);
        const secondsLeft = matches ? parseInt(matches[0]) : 120;

        // Save exact unlock time to localStorage
        const blockUntilTime = Date.now() + secondsLeft * 1000;
        localStorage.setItem("login_blocked_until", blockUntilTime.toString());

        setCountdown(secondsLeft);
      } else {
        toast.error("Invalid Email or Password");
      }
    }
    reset();
  };

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="bg-(--text-color)/2 shadow-2xl rounded-4xl backdrop-blur-lg p-16 flex flex-col gap-10">
        <h1 className="text-6xl font-extrabold flex items-center justify-center gap-3">
          Login
          <LockKeyhole size={50} strokeWidth={3.5} />
        </h1>
        <LoginForm
          errors={errors}
          handleSubmit={handleSubmit}
          isPasswordHidden={isPasswordHidden}
          onSubmit={onSubmit}
          register={register}
          setIsPasswordHidden={setIsPasswordHidden}
          buttonTxt={"Login"}
          mode="login"
          isBtnDisabled={isBtnDisabled}
          errorMessage={errorMessage}
        />
        <p className="font-semibold flex items-center gap-2">
          Don't have an account?{" "}
          <NavLink
            to={"/signup"}
            className="underline font-extrabold flex items-center"
          >
            Sign-Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
