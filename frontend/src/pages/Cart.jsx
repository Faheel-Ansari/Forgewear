import {
  ArrowUpRight,
  Frown,
  Handbag,
  MoveLeft,
  Search,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { CartTile, Loading } from "../index";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { useEffect, useMemo, useState } from "react";
import {
  setCartItems,
  setData,
  setError,
  setIsAvailable,
  setLoading,
} from "../redux-toolkit/features/CartSlice";
import { useAddToCart } from "../components/cart/addToCart";
import { useFetchCartData } from "../components/cart/fetchCartData";

function Cart() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const isAvailable = useSelector((state) => state.cart.isAvailable);

  const data = useSelector((state) => state.cart.data);

  const { deleteCartItem, clearEntireCart } = useAddToCart();
  const { ids } = useFetchCartData();

  const isCheckoutDisabled = data.some((item) => !item.avail || !item.status);

  useEffect(() => {
    return () => dispatch(setData([]));
  }, []);

  let subTotalPrice = 0;
  data.forEach((item) => {
    if (item.avail && item.status) {
      subTotalPrice += item.newPrice * item.quantity;
    }
  });

  return (
    <div className="min-h-[80vh] flex items-start justify-center w-full bg-(--background) text-(--text-color)">
      {/* Fluid Page Container */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto py-10 sm:py-16 md:py-24">
        {/* Page Header: Title, Clear trigger & Continue shopping */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10 sm:pb-16 border-b border-(--text-color)/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              Shopping cart
            </h1>
            {data.length > 0 && (
              <button
                onClick={clearEntireCart}
                className="self-start text-xs font-bold uppercase tracking-wider text-red-400 bg-red-400/10 hover:bg-red-400/20 py-2 px-3 flex items-center gap-2 rounded-lg backdrop-blur-lg cursor-pointer transition-colors duration-200"
              >
                <Trash2 size={14} strokeWidth={2.5} /> Clear Cart
              </button>
            )}
          </div>
          <NavLink
            to={"/store/shirt"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-(--text-color)/10 hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) rounded-full backdrop-blur-lg transition-all duration-300"
          >
            <MoveLeft size={16} strokeWidth={2.5} /> Continue Shopping
          </NavLink>
        </div>

        {/* Cart Items List Wrapper */}
        <div className="flex flex-col gap-3 mt-6 sm:mt-8">
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
              <Handbag size={24} strokeWidth={2.5} />
              Your cart is empty
            </div>
          ) : (
            data.length > 0 &&
            data.map((item) => (
              <CartTile
                key={item.varientID}
                id={item.id}
                varientID={item.varientID}
                color={item.color}
                colorIndex={item.colorIndex}
                image={item.image}
                newPrice={item.newPrice}
                size={item.size}
                avail={item.avail}
                status={item.status}
                title={item.title}
                cartQuantity={item.quantity}
                deleteCartItem={deleteCartItem}
              />
            ))
          )}
        </div>

        {/* Subtotal & Checkout Module */}
        {data.length > 0 && (
          <div className="flex flex-col items-center sm:items-end justify-center py-10 sm:py-12 mt-6 border-t border-(--text-color)/5">
            <div className="flex flex-col gap-6 sm:gap-8 w-full sm:w-auto sm:min-w-[300px]">
              <p className="text-lg sm:text-xl font-bold text-center sm:text-right flex items-baseline justify-between sm:justify-end gap-3">
                Sub Total:{" "}
                <span className="text-2xl sm:text-3xl font-black text-(--bg-accent)">
                  PKR {subTotalPrice?.toLocaleString()}
                </span>
              </p>

              {isCheckoutDisabled ? (
                <div className="flex flex-col gap-3">
                  <button
                    disabled
                    className="w-full bg-(--text-color)/15 text-(--background) rounded-xl py-3 px-6 text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed backdrop-blur-lg"
                  >
                    Checkout{" "}
                    <ArrowUpRight
                      size={16}
                      className="sm:w-[20px]"
                      strokeWidth={2.5}
                    />
                  </button>
                  <p className="text-xs text-red-400 font-semibold text-center sm:text-right">
                    * Remove unavailable items to continue
                  </p>
                </div>
              ) : (
                <NavLink
                  to={"/checkout"}
                  className="w-full bg-(--bg-accent) text-white hover:text-(--background) hover:bg-(--text-color) rounded-xl py-3 px-6 text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:-translate-y-0.5 text-center"
                >
                  Checkout{" "}
                  <ArrowUpRight
                    size={24}
                    className=""
                    strokeWidth={2.5}
                  />
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
