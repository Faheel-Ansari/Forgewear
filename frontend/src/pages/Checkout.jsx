import api from "../api/axios";
import { CreditCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCartData } from "../components/cart/fetchCartData";
import { setData } from "../redux-toolkit/features/CartSlice";
import { BaseURL } from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../schema/schema";
import { Payment } from "../index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sameAsShipping: true,
      payMethod: "cod",
    },
    shouldUnregister: true,
    resolver: yupResolver(checkoutSchema),
  });

  const data = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);

  const { ids } = useFetchCartData();

  const isCartBreak = data.some((item) => !item.avail || !item.status);

  useEffect(() => {
    if (loading) return;

    if (ids.length <= 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
    }
    if (isCartBreak) {
      toast.error("Some items are unavailable!");
      navigate("/cart");
    }
  }, [isCartBreak, ids.length, loading]);

  const [orderID, setOrderID] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shippingCharges, setShippingCharges] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const sameAsShipping = watch("sameAsShipping");
  const payMethod = watch("payMethod");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchShippingCharges = async () => {
    try {
      const res = await api.get("/admin/shipcharges");

      if (res.data.status) {
        setShippingCharges(res.data.charges);
      } else {
        setShippingCharges(0);
      }
    } catch (error) {
      setShippingCharges(0);
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");

    const cleanInput = input.slice(0, 10);

    if (cleanInput.length > 3) {
      setPhoneNumber(`${cleanInput.slice(0, 3)} ${cleanInput.slice(3)}`);
    } else {
      setPhoneNumber(cleanInput);
    }
  };

  const handleCardChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");

    const cleanInput = input.slice(0, 16);

    const formattedInput = cleanInput.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedInput);
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length === 1 && input > 1) {
      input = "0" + input;
    }

    if (input.length >= 2) {
      const month = input.slice(0, 2);
      if (parseInt(month) > 12) input = "12" + input.slice(2);
    }

    const cleanInput = input.slice(0, 4);

    if (cleanInput.length > 2) {
      setExpiryDate(`${cleanInput.slice(0, 2)} / ${cleanInput.slice(2)}`);
    } else {
      setExpiryDate(cleanInput);
    }
  };

  const subTotalPrice = data.reduce((acc, item) => {
    return acc + item.newPrice * item.quantity;
  }, 0);

  // 1. Sync throttle timer from localStorage on page refresh
  useEffect(() => {
    const blockUntil = localStorage.getItem("checkout_blocked_until");
    if (blockUntil) {
      const timeLeft = Math.ceil((parseInt(blockUntil) - Date.now()) / 1000);
      if (timeLeft > 0) {
        setIsBtnDisabled(true);
        setCountdown(timeLeft);
        setErrorMessage(
          `Too many checkout attempts. Please try again in ${timeLeft} seconds.`,
        );
      } else {
        localStorage.removeItem("checkout_blocked_until");
      }
    }

    fetchShippingCharges();
  }, []);

  // 2. Active countdown clock handler
  useEffect(() => {
    if (countdown <= 0) {
      setIsBtnDisabled(false);
      setErrorMessage("");
      localStorage.removeItem("checkout_blocked_until");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const nextValue = prev - 1;
        if (nextValue <= 0) {
          setIsBtnDisabled(false);
          setErrorMessage("");
          localStorage.removeItem("checkout_blocked_until");
        } else {
          setErrorMessage(
            `Too many checkout attempts. Please try again in ${nextValue} seconds.`,
          );
        }
        return nextValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const onSubmit = async (shipAndPayDetails) => {
    if (isBtnDisabled) return;

    const validate = await api.get(`/validate/${ids}`);

    if (validate.data.status === false) {
      toast.error("Some items are unavailable!");
      navigate("/cart");
      return;
    }

    setIsBtnDisabled(true);

    const formData = new FormData();

    formData.append("contact", shipAndPayDetails.contact);
    formData.append("email", shipAndPayDetails.email);

    formData.append("shippingFirstName", shipAndPayDetails.shippingFirstName);
    formData.append("shippingLastName", shipAndPayDetails.shippingLastName);
    formData.append("shippingAddress", shipAndPayDetails.shippingAddress);
    formData.append("shippingCity", shipAndPayDetails.shippingCity);
    formData.append("shippingProvince", shipAndPayDetails.shippingProvince);
    formData.append("shippingZip", shipAndPayDetails.shippingZip);

    formData.append("payMethod", shipAndPayDetails.payMethod);
    formData.append(
      "sameAsShipping",
      JSON.stringify(shipAndPayDetails.sameAsShipping),
    );
    if (
      shipAndPayDetails.sameAsShipping === false &&
      shipAndPayDetails.payMethod === "cod"
    ) {
      formData.append("billingFirstName", shipAndPayDetails.billingFirstName);
      formData.append("billingLastName", shipAndPayDetails.billingLastName);
      formData.append("billingAddress", shipAndPayDetails.billingAddress);
      formData.append("billingCity", shipAndPayDetails.billingCity);
      formData.append("billingProvince", shipAndPayDetails.billingProvince);
      formData.append("billingZip", shipAndPayDetails.billingZip);
      formData.append(
        "sameAsShipping",
        JSON.stringify(shipAndPayDetails.sameAsShipping),
      );
    }
    if (shipAndPayDetails.payMethod === "card") {
      formData.append("cardholderName", shipAndPayDetails.cardholderName);
      formData.append("cardNumber", shipAndPayDetails.cardNumber);
      formData.append("expiryDate", shipAndPayDetails.expiryDate);
      formData.append("cvv", shipAndPayDetails.cvv);
      formData.append("sameAsShipping", JSON.stringify(false));
    }

    formData.append("shippingCharges", shippingCharges);
    formData.append("total", subTotalPrice);

    formData.append("orderDetails", JSON.stringify(data));

    try {
      const res = await api.post(`/place/order`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === true) {
        reset();
        setCardNumber("");
        setExpiryDate("");
        setPhoneNumber("");
        setPaymentStatus(true);
        setOrderID(res.data.orderID);
        localStorage.removeItem("checkout_blocked_until");
        setIsBtnDisabled(false);
      }
    } catch (error) {

      if (error.response && error.response.status === 429) {
        const serverMessage =
          error.response.data.message || "Too many attempts.";

        // Extract remaining seconds from backend text message string
        const matches = serverMessage.match(/\d+/);
        const secondsLeft = matches ? parseInt(matches[0]) : 120;

        // Save unlock time epoch timestamp locally
        const blockUntilTime = Date.now() + secondsLeft * 1000;
        localStorage.setItem(
          "checkout_blocked_until",
          blockUntilTime.toString(),
        );

        setCountdown(secondsLeft);
      } else {
        // Re-enable click if it's a structural 422 error so they can fix billing text fields
        setIsBtnDisabled(false);
        toast.error("Something went wrong!");
        navigate("/cart");
      }
    }
  };

  useEffect(() => {
    if (orderID !== null && paymentStatus === false) {
      navigate(`/order/ORD-${orderID}`);
    }
  }, [orderID, paymentStatus]);

  return (
    <div className="bg-(--background) min-h-[70vh] text-(--text-color) py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {paymentStatus && <Payment setPaymentStatus={setPaymentStatus} />}

      {/* Unified Grid Container */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* LEFT COLUMN: Shipping & Billing Form (Spans 7 cols on desktop) */}
        <div className="lg:col-span-7 w-full bg-(--bg-accent)/5 border border-(--text-color)/5 shadow-xl rounded-3xl p-5 sm:p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-black tracking-tight mb-6">
            Shipping & Payment
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-(--text-color)/50 mb-3">
                Contact Information
              </h3>
              <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-(--text-color)/10">
                <div className="flex flex-col justify-between gap-1.5">
                  <div
                    className={`w-full flex items-center justify-center rounded-lg bg-(--text-color)/10 border border-transparent transition-all duration-300 ${
                      errors.contact
                        ? "border-red-400"
                        : "focus-within:border-(--bg-accent)"
                    }`}
                  >
                    <div className="w-[15%] p-3 text-sm font-bold text-center text-(--text-color)/70">
                      +92
                    </div>
                    <input
                      type="text"
                      placeholder="300 1234567"
                      {...register("contact")}
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e)}
                      className="w-[85%] p-3 bg-transparent placeholder:text-(--text-color)/45 outline-none text-sm sm:text-base text-(--text-color)"
                    />
                  </div>
                  {errors.contact?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.contact?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.email?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div className="pb-5 border-b border-(--text-color)/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-(--text-color)/50 mb-3">
                Shipping Address
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("shippingFirstName")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.shippingFirstName
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.shippingFirstName?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.shippingFirstName?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("shippingLastName")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.shippingLastName
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.shippingLastName?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.shippingLastName?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-1.5 mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  {...register("shippingAddress")}
                  className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                    errors.shippingAddress
                      ? "border-red-400"
                      : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                  }`}
                />
                {errors.shippingAddress?.message && (
                  <p className="text-xs text-red-400 font-semibold px-1">
                    {errors.shippingAddress?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="text"
                    placeholder="City"
                    {...register("shippingCity")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.shippingCity
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.shippingCity?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.shippingCity?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="text"
                    placeholder="Province"
                    {...register("shippingProvince")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.shippingProvince
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.shippingProvince?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.shippingProvince?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-between gap-1.5">
                  <input
                    type="text"
                    placeholder="ZIP"
                    {...register("shippingZip")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.shippingZip
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.shippingZip?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.shippingZip?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pb-5 border-b border-(--text-color)/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-(--text-color)/50 mb-3">
                Payment Method
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full flex items-center space-x-3 p-4 rounded-lg bg-(--text-color)/10 border border-(--text-color)/5">
                  <input
                    type="radio"
                    id="cod"
                    value={"cod"}
                    {...register("payMethod")}
                    className="h-5 w-5 accent-(--bg-accent) cursor-pointer"
                  />
                  <label
                    htmlFor="cod"
                    className="text-sm font-bold text-(--text-color)/85 cursor-pointer"
                  >
                    Cash on delivery (COD)
                  </label>
                </div>
                <div className="w-full flex items-center space-x-3 p-4 rounded-lg bg-(--text-color)/10 border border-(--text-color)/5">
                  <input
                    type="radio"
                    id="card"
                    value={"card"}
                    {...register("payMethod")}
                    className="h-5 w-5 accent-(--bg-accent) cursor-pointer"
                  />
                  <label
                    htmlFor="card"
                    className="text-sm font-bold text-(--text-color)/85 cursor-pointer"
                  >
                    Credit / Debit Card
                  </label>
                </div>
              </div>
            </div>

            {/* COD Billing Toggle Option */}
            {payMethod === "cod" && (
              <div className="pb-5 border-b border-(--text-color)/10 animate-fade">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-(--text-color)/10 border border-(--text-color)/5">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    {...register("sameAsShipping")}
                    className="h-5 w-5 accent-(--bg-accent) cursor-pointer"
                  />
                  <label
                    htmlFor="sameAsShipping"
                    className="text-sm font-bold text-(--text-color)/80 cursor-pointer"
                  >
                    Billing address is the same as shipping
                  </label>
                </div>
              </div>
            )}

            {/* Billing Address Module */}
            {sameAsShipping === false && payMethod === "cod" && (
              <div className="pb-5 border-b border-(--text-color)/10 animate-fade">
                <h3 className="text-sm font-bold uppercase tracking-wider text-(--text-color)/50 mb-3">
                  Billing Address
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("billingFirstName")}
                      className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                        errors.billingFirstName
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.billingFirstName?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.billingFirstName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("billingLastName")}
                      className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                        errors.billingLastName
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.billingLastName?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.billingLastName?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-1.5 mb-4">
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("billingAddress")}
                    className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                      errors.billingAddress
                        ? "border-red-400"
                        : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                    }`}
                  />
                  {errors.billingAddress?.message && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      {errors.billingAddress?.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="City"
                      {...register("billingCity")}
                      className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                        errors.billingCity
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.billingCity?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.billingCity?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="Province"
                      {...register("billingProvince")}
                      className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                        errors.billingProvince
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.billingProvince?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.billingProvince?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="ZIP"
                      {...register("billingZip")}
                      className={`w-full p-3 rounded-lg bg-(--text-color)/10 border border-transparent text-sm sm:text-base placeholder:text-(--text-color)/45 outline-none transition duration-300 ${
                        errors.billingZip
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.billingZip?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.billingZip?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Card Details Module */}
            {payMethod === "card" && (
              <div className="mb-10 animate-fade">
                <h3 className="text-sm font-bold uppercase tracking-wider text-(--text-color)/50 mb-3">
                  Card Details
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-(--bg-accent)/5 border border-(--bg-accent)/10 space-y-4">
                  <div className="flex flex-col justify-between gap-1.5">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      {...register("cardholderName")}
                      className={`w-full p-3 bg-(--text-color)/10 border border-transparent rounded-lg text-sm sm:text-base placeholder:text-(--text-color)/40 outline-none transition duration-300 ${
                        errors.cardholderName
                          ? "border-red-400"
                          : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                      }`}
                    />
                    {errors.cardholderName?.message && (
                      <p className="text-xs text-red-400 font-semibold px-1">
                        {errors.cardholderName?.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="flex flex-col justify-between gap-1.5">
                      <input
                        type="text"
                        {...register("cardNumber")}
                        value={cardNumber}
                        onChange={handleCardChange}
                        placeholder="0000 0000 0000 0000"
                        className={`w-full p-3 bg-(--text-color)/10 border border-transparent rounded-lg text-sm sm:text-base placeholder:text-(--text-color)/40 outline-none transition duration-300 ${
                          errors.cardNumber
                            ? "border-red-400"
                            : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                        }`}
                      />
                      {errors.cardNumber?.message && (
                        <p className="text-xs text-red-400 font-semibold px-1">
                          {errors.cardNumber?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between gap-1.5">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        {...register("expiryDate")}
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        className={`w-full p-3 bg-(--text-color)/10 border border-transparent rounded-lg text-sm sm:text-base placeholder:text-(--text-color)/40 outline-none transition duration-300 ${
                          errors.expiryDate
                            ? "border-red-400"
                            : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                        }`}
                      />
                      {errors.expiryDate?.message && (
                        <p className="text-xs text-red-400 font-semibold px-1">
                          {errors.expiryDate?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-between gap-1.5">
                      <input
                        type="number"
                        placeholder="CVV"
                        {...register("cvv")}
                        className={`w-full p-3 bg-(--text-color)/10 border border-transparent rounded-lg text-sm sm:text-base placeholder:text-(--text-color)/40 outline-none transition duration-300 ${
                          errors.cvv
                            ? "border-red-400"
                            : "focus:border-(--bg-accent) focus:ring-1 focus:ring-(--bg-accent)"
                        }`}
                      />
                      {errors.cvv?.message && (
                        <p className="text-xs text-red-400 font-semibold px-1">
                          {errors.cvv?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isBtnDisabled && (
              <p className="text-red-400 italic mb-2">{errorMessage}</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBtnDisabled}
              className={`w-full ${isBtnDisabled ? "bg-gray-400/30 text-gray-400 cursor-not-allowed" : "bg-(--text-color) text-(--background) hover:bg-(--bg-accent) hover:text-(--text-color) active:bg-(--bg-accent)/60 cursor-pointer shadow-md hover:-translate-y-0.5"} font-black py-4 rounded-xl transition-all duration-300 tracking-wider uppercase text-sm sm:text-base`}
            >
              COMPLETE PURCHASE
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary Card (Spans 5 cols on desktop) */}
        {!isCartBreak && (
          <div className="lg:col-span-5 w-full">
            <div className="bg-(--bg-accent)/5 border border-(--text-color)/5 p-5 sm:p-6 rounded-3xl shadow-xl cursor-default backdrop-blur-lg">
              <h2 className="text-2xl font-black tracking-tight mb-6">
                Order Summary
              </h2>

              {/* Product Items List Area */}
              <div className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-1 scrollbar-none">
                {data.length > 0 &&
                  data.map((item) => (
                    <div
                      key={item.varientID}
                      className="flex items-center justify-between gap-4 sm:gap-6 bg-(--text-color)/5 border border-(--text-color)/5 rounded-2xl p-3 sm:p-4"
                    >
                      <div className="flex items-center min-w-0">
                        {/* Image Frame */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-(--text-color)/5 border border-(--text-color)/5 flex items-center justify-center rounded-xl overflow-hidden mr-3 sm:mr-4">
                          <img
                            src={`${BaseURL}/uploads/productImages/${item.image}`}
                            alt={item.title}
                            className="w-[90%] h-[90%] object-contain"
                          />
                        </div>
                        {/* Item Details */}
                        <div className="flex flex-col justify-between gap-1 min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-(--text-color) truncate capitalize">
                            {item.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-(--text-color)/60">
                            <p>
                              Size:{" "}
                              <span className="uppercase font-extrabold text-(--text-color)">
                                {item.size}
                              </span>
                            </p>
                            <div className="flex items-center gap-1.5">
                              <p>Color:</p>
                              <span
                                style={{ backgroundColor: item.color }}
                                className="w-4 h-4 border border-(--text-color)/15 inline-block rounded-md"
                              ></span>
                            </div>
                          </div>
                          <p className="mt-0.5 font-bold text-xs sm:text-sm text-(--bg-accent)">
                            PKR {item.newPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {/* Quantity Block */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(--text-color)/40">
                          Qty
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-(--text-color)">
                          {item.quantity}
                        </p>
                      </div>
                      {/* Total Block */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(--text-color)/40">
                          Total
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-(--text-color) whitespace-nowrap">
                          {(item.quantity * item.newPrice).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pricing Aggregations */}
              <div className="border-t border-(--text-color)/10 pt-4 space-y-3 text-sm sm:text-base font-semibold">
                <div className="flex justify-between text-(--text-color)/70">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    PKR {subTotalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-(--text-color)/70">
                  <span>Shipping</span>
                  {shippingCharges === 0 ? (
                    <span className="text-green-600 font-bold uppercase tracking-wide text-xs sm:text-sm bg-green-500/10 px-2 py-0.5 rounded-md">
                      Free
                    </span>
                  ) : (
                    <span className="font-bold">
                      PKR {shippingCharges.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-lg sm:text-xl font-black pt-4 border-t border-(--text-color)/10 text-(--bg-accent)">
                  <span>Total Amount</span>
                  <span>
                    PKR {(subTotalPrice + shippingCharges).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-[10px] sm:text-xs text-center text-(--text-color)/40 tracking-wider">
                Secure encrypted transaction. No real money will be charged.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
