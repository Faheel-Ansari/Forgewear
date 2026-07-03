import { Ban, CircleOff, Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { quantityControl } from "../store/quantityControl";
import { BaseURL } from "../../api/axios";
import { useAddToCart } from "./addToCart";

function CartTile({
  id,
  varientID,
  image,
  title,
  size,
  color,
  avail,
  status,
  colorIndex,
  newPrice,
  cartQuantity,
  setSubTotalPrice,
  deleteCartItem,
}) {
  const { quantity, setQuantity, decreaseQuantity, increaseQuantity } =
    quantityControl(varientID);

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  const isItemAvailable = avail && status;

  return (
    <div className="w-full flex p-3 sm:p-4 md:p-5 rounded-2xl border border-(--text-color)/5 bg-(--background)/50 backdrop-blur-lg shadow-sm hover:shadow-md transition-all duration-300 gap-4 sm:gap-6 items-start md:items-center">
      {/* Left Section: Stable Product Image Frame */}
      <div
        className={`${isItemAvailable ? "" : "grayscale-100 opacity-60"} bg-(--bg-accent)/10 rounded-xl w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 flex items-center justify-center p-1.5 border border-(--bg-accent)/10`}
      >
        <img
          src={`${BaseURL}/uploads/productimages/${image}`}
          className="w-full h-full object-contain"
          alt={title}
        />
      </div>

      {/* Right Section: Adaptive details & control wrapper */}
      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 min-w-0 w-full">
        {/* Product Meta Details */}
        <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
          <h1
            className={`${isItemAvailable ? "" : "opacity-40"} text-sm sm:text-base md:text-lg font-bold capitalize truncate`}
            title={title}
          >
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-(--text-color)/60">
            <p>
              Size:{" "}
              <span className="font-extrabold uppercase text-(--text-color)">
                {size}
              </span>
            </p>
            <div className="flex items-center gap-1.5">
              <p>Color:</p>
              <span
                style={{ backgroundColor: isItemAvailable ? color : "gray" }}
                className="w-4 h-4 rounded-md border border-(--text-color)/15 inline-block"
              ></span>
            </div>
          </div>
          {isItemAvailable && (
            <p className="text-xs sm:text-sm font-bold text-(--bg-accent)/90">
              PKR {newPrice?.toLocaleString()}
            </p>
          )}
        </div>

        {/* Dynamic Controls Bar - Aligns horizontally on all devices */}
        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 md:gap-10 lg:gap-12 w-full md:w-auto">
          {/* Quantity selector OR unavailable alert */}
          {isItemAvailable ? (
            <div className="flex flex-col items-start gap-1">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(--text-color)/50 ml-1">
                Quantity
              </p>
              <div className="flex justify-between items-center bg-(--text-color)/10 border border-(--text-color)/5 rounded-xl overflow-hidden p-0.5">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="p-1.5 sm:p-2 rounded-lg cursor-pointer flex items-center justify-center hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) transition-all duration-200"
                >
                  <Minus
                    size={12}
                    className="sm:w-4 sm:h-4"
                    strokeWidth={2.5}
                  />
                </button>
                <p className="text-sm sm:text-base font-extrabold px-3 sm:px-4">
                  {quantity}
                </p>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="p-1.5 sm:p-2 rounded-lg cursor-pointer flex items-center justify-center hover:bg-(--bg-accent)/10 hover:text-(--bg-accent) transition-all duration-200"
                >
                  <Plus size={12} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-2 rounded-xl flex items-center gap-1.5">
                <Ban size={12} className="sm:w-[14px]" strokeWidth={2.5} /> No
                longer available
              </span>
            </div>
          )}

          {/* Delete cart item trigger with alignment spacer */}
          <div className="flex flex-col items-center justify-end gap-1">
            <p className="hidden md:block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-transparent select-none">
              &nbsp;
            </p>
            <button
              type="button"
              onClick={() => deleteCartItem(varientID)}
              className="bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-white rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all duration-300 flex items-center justify-center border border-red-500/5 shadow-sm"
              aria-label="Delete cart item"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Total Price (Only visible when product is active and available) */}
          {isItemAvailable && (
            <div className="flex flex-col items-end md:items-center gap-1">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(--text-color)/50 mr-1">
                Total
              </p>
              <p className="text-base sm:text-lg font-black text-(--bg-accent) whitespace-nowrap">
                PKR {(newPrice * quantity).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartTile;
