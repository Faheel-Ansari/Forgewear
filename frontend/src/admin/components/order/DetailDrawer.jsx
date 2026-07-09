import {
  ChevronDown,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
  Wallet,
  X,
} from "lucide-react";
import { BaseURL } from "../../../api/axios";
import { motion } from "framer-motion";

export function ShippingDrawer({ order, setDrawerOpen }) {
  return (
    <motion.div
      key="shippingDrawer"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 250 }}
      className="absolute bottom-4 right-4 sm:bottom-15 sm:right-5 w-[calc(100%-2rem)] sm:w-[550px] lg:w-[700px] bg-(--text-color) border border-(--text-color)/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-20"
    >
      {/* Close Button */}
      <div className="absolute text-(--background) top-5 right-5">
        <X
          onClick={() => setDrawerOpen(null)}
          size={26}
          strokeWidth={3}
          className="hover:text-red-400 transition-colors duration-200 cursor-pointer"
        />
      </div>

      {/* Drawer Header */}
      <div className="text-(--background) flex items-center gap-2.5 mb-6">
        <MapPin size={24} strokeWidth={3} className="sm:scale-110" />
        <h2 className="text-xl sm:text-2xl font-bold">Shipping Details</h2>
      </div>

      {/* Details Area */}
      <div className="bg-(--bg-accent)/10 text-(--background) space-y-4 border border-(--bg-accent)/20 rounded-2xl p-4 sm:p-5">
        <div className="space-y-4">
          {/* Grid splits into stacks on very small mobile sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info
              label="Full Name"
              value={`${order.shipFirstName} ${order.shipLastName}`}
            />
            <Info label="Phone" value={order.contact} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Email" value={order.email} />
            <Info label="City" value={order.shipCity} />
          </div>
          <Info label="Address" value={order.shipAddress} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Province" value={order.shipProvince} />
            <Info label="ZIP" value={order.shipZip} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PaymentDrawer({ order, setDrawerOpen }) {
  return (
    <motion.div
      key="paymentDrawer"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 250 }}
      className="absolute bottom-4 right-4 sm:bottom-15 sm:right-5 w-[calc(100%-2rem)] sm:w-[420px] md:w-[450px] bg-(--text-color) border border-(--text-color)/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-30"
    >
      {/* Close Button */}
      <div className="absolute text-(--background) top-5 right-5">
        <X
          onClick={() => setDrawerOpen(null)}
          size={26}
          strokeWidth={3}
          className="hover:text-red-400 transition-colors ease-in-out duration-200 cursor-pointer"
        />
      </div>

      {/* Drawer Header */}
      <div className="text-(--background) flex items-center gap-2.5 mb-6">
        {order.payMethod === "card" ? (
          <CreditCard size={24} strokeWidth={3} className="sm:scale-110" />
        ) : (
          <Wallet size={24} strokeWidth={3} className="sm:scale-110" />
        )}
        <h2 className="text-xl sm:text-2xl font-bold">Payment Details</h2>
      </div>

      {/* COD Billing Address Panel */}
      {order.payMethod === "cod" ? (
        <div className="bg-(--bg-accent)/10 text-(--background) space-y-5 border border-(--bg-accent)/20 rounded-2xl p-4 sm:p-5">
          <p className="text-base sm:text-lg font-semibold">
            Cash On Delivery Selected
          </p>

          <div className="border-t border-(--background)/10 pt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Billing Address
            </h3>

            <div className="space-y-4">
              <Info
                label="Full Name"
                value={`${order.billFirstName || order.shipFirstName} ${order.billLastName || order.shipLastName}`}
              />
              <Info
                label="Address"
                value={order.billAddress || order.shipAddress}
              />

              <div className="grid grid-cols-1 min-380px:grid-cols-2 gap-4">
                <Info label="City" value={order.billCity || order.shipCity} />
                <Info
                  label="Province"
                  value={order.billProvince || order.shipProvince}
                />
              </div>

              <Info label="ZIP" value={order.billZip || order.shipZip} />
            </div>
          </div>
        </div>
      ) : (
        /* Card details Panel */
        <div className="space-y-5 text-(--background)">
          <p className="text-base sm:text-lg font-semibold">
            Credit / Debit card payment selected
          </p>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Card Information
            </h3>

            <div className="bg-(--background)/10 rounded-2xl p-4 sm:p-5 border border-(--background)/10 shadow-inner">
              <div className="flex justify-between items-center">
                <p className="text-(--background)/60 text-xs sm:text-sm">
                  Cardholder Name
                </p>
                <CreditCard size={18} className="opacity-80" />
              </div>

              <p className="mt-1 text-base sm:text-lg font-semibold tracking-wide">
                {order.cardholderName}
              </p>

              <div className="mt-5 sm:mt-6">
                {/* Card Number Mask with Responsive Character Tracking */}
                <p className="tracking-[0.12em] sm:tracking-[0.25em] text-lg sm:text-2xl font-bold font-mono">
                  {order.cardNumber.split(" ").fill("****", 0, -1).join(" ")}
                </p>

                <div className="flex justify-between items-center border-t border-(--background)/10 mt-3 sm:mt-4 pt-2">
                  <p className="text-xs sm:text-sm text-(--background)/70">
                    Expiry: {order.expiryDate}
                  </p>
                  <p className="text-xs sm:text-sm font-bold tracking-wide uppercase text-(--background)/70">
                    Visa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function OrderDetailsDrawer({ order, setDrawerOpen }) {
  return (
    <motion.div
      key="shippingDrawer"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 250 }}
      className="absolute bottom-4 right-4 sm:bottom-15 sm:right-5 w-[calc(100%-2rem)] sm:w-[420px] md:w-[450px] bg-(--text-color) border border-(--text-color)/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-30"
    >
      {/* Close Button */}
      <div className="absolute text-(--background) top-5 right-5">
        <X
          onClick={() => setDrawerOpen(null)}
          size={26}
          strokeWidth={3}
          className="hover:text-red-400 transition-colors ease-in-out duration-200 cursor-pointer"
        />
      </div>

      {/* Drawer Header */}
      <div className="text-(--background) flex items-center gap-2.5 mb-6">
        <ShoppingBag size={24} strokeWidth={3} className="sm:scale-110" />
        <h2 className="text-xl sm:text-2xl font-bold">Order Details</h2>
      </div>

      <div className="space-y-4">
        {/* SCROLLABLE ITEM CONTAINER */}
        <div className="max-h-[25vh] sm:max-h-[32vh] space-y-4 overflow-y-auto pr-1 scrollbar-none">
          {order?.order_details?.map((item) => (
            <div
              key={item.id}
              className="bg-(--background)/10 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 border border-(--background)/5"
            >
              {/* Proportional Product Thumbnail Wrapper */}
              <div className="w-20 sm:w-28 h-20 sm:h-24 bg-(--background)/5 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={`${BaseURL}/uploads/productImages/${item.image}`}
                  alt={item.title}
                  className="max-w-[80%] max-h-[85%] object-contain"
                />
              </div>

              {/* Product Data Meta */}
              <div className="flex-1 text-(--background) min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Sizes / Colors / Pricing Line */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs md:text-sm font-medium text-(--background)/80 mt-1 sm:mt-2">
                    <p>
                      Size:{" "}
                      <span className="uppercase font-semibold">
                        {item.size}
                      </span>
                    </p>

                    <div className="flex items-center gap-1.5">
                      Color
                      <div
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-(--background)/20 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>

                    <p>
                      Price:{" "}
                      <span className="font-semibold">
                        {Number(item?.price)?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Qty & Price Subtotal row */}
                <div className="flex justify-between items-end mt-2 sm:mt-4">
                  <div>
                    <p className="text-(--background)/70 text-[10px] sm:text-xs font-medium">
                      Quantity
                    </p>
                    <p className="font-semibold text-xs sm:text-sm">
                      {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-(--background)/70 text-[10px] sm:text-xs">
                      Total
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold">
                      PKR{" "}
                      {(
                        Number(item?.price) * Number(item.quantity)
                      )?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRICING CALCULATION ACCENT */}
        <div className="border-t border-(--background)/15 pt-4 sm:pt-5 mt-4 sm:mt-5 space-y-2.5">
          <div className="flex justify-between text-xs sm:text-sm md:text-base text-(--background)/80">
            <span>Subtotal</span>
            <span className="font-medium">
              PKR {Number(order.total).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm md:text-base text-(--background)/80">
            <span>Shipping</span>
            {Number(order.shipCharges) === 0 ? (
              <span className="text-green-600 font-bold uppercase tracking-wide text-xs sm:text-sm bg-green-500/10 px-2 py-0.5 rounded-md">
                Free
              </span>
            ) : (
              <span className="font-medium">
                PKR {Number(order.shipCharges).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex justify-between text-lg sm:text-xl md:text-2xl font-black pt-1.5 text-(--background) border-t border-(--background)/5">
            <span>Total</span>
            <span>
              PKR{" "}
              {(
                Number(order.total) + Number(order.shipCharges)
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Drawer({ title, buttonText, icon, children }) {
  return (
    <div className="w-full">
      <details className="group">
        {/* SUMMARY TRIGGER BUTTON */}
        <summary className="list-none outline-none select-none cursor-pointer bg-(--bg-accent) text-(--background) hover:bg-(--bg-accent)/95 hover:scale-[1.01] hover:shadow-md transition-all duration-300 border border-white/10 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-between w-full min-w-[200px] sm:min-w-[240px]">
          <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
            {icon && <span className="shrink-0 sm:scale-110">{icon}</span>}
            <span>{buttonText}</span>
          </div>

          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-open:rotate-180 transition-transform duration-300 shrink-0" />
        </summary>

        {/* INNER CONTENT PANEL */}
        <div className="mt-3 bg-(--background) border border-(--text-color)/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sm:shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-tight text-(--text-color)">
              {title}
            </h2>
          )}

          <div className="text-(--text-color)/90">{children}</div>
        </div>
      </details>
    </div>
  );
}

export function Info({ label, value }) {
  return (
    <div className="bg-(--background)/8 border border-(--background)/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full min-w-0 transition-all duration-300 hover:bg-(--background)/12 flex flex-col justify-center">
      {/* Label (Sleek Uppercase Pill Style) */}
      <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-(--background)/50 leading-none">
        {label}
      </p>

      {/* Value (Break-Safe Fluid Typography) */}
      <p className="mt-1 sm:mt-1.5 font-medium text-(--background) text-sm sm:text-base md:text-lg leading-snug break-words">
        {value || "—"}
      </p>
    </div>
  );
}
