import api, { BaseURL } from "../api/axios";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  Wallet,
  CalendarDays,
  ShoppingBag,
  ExternalLink,
  Handbag,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useSelector } from "react-redux";
import { useAddToCart } from "../components/cart/addToCart";
import { addDays, format } from "date-fns";

function OrderSuccess() {
  const navigate = useNavigate();
  const { orderID } = useParams();
  const formattedOrderID = orderID.split("-").pop();

  const { clearEntireCart } = useAddToCart();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  const deliveryDate = addDays(new Date(order?.created_at), 5);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/order/${formattedOrderID}`);

      if (res.data.status === false) {
        toast.error("You dont have any order!");
        navigate("/cart");
      } else {
        setOrder(res.data.order);
        clearEntireCart();
      }
    } catch (error) {
      toast.error("You dont have any order!");
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className=" px-4 py-10">
      {loading ? (
        <Loading />
      ) : (
        order !== null && (
          <div className="max-w-7xl mx-auto">
            {/* Success Banner */}
            <div className="bg-(--bg-accent)/10 border border-(--text-color)/10 rounded-3xl p-8 shadow-xl mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-bold">
                    Order Successfully Placed
                  </h1>

                  <p className=" mt-2 text-lg">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-4 font-bold">
                    <span className="px-4 py-2 rounded-full bg-(--text-color)/10 text-sm">
                      Order ID: ORD-{order.id}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-500 text-sm">
                      Payment Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* LEFT */}
              <div className="xl:col-span-2 space-y-8">
                {/* Products */}
                <div className="bg-(--bg-accent)/10 rounded-3xl p-6 border border-(--text-color)/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag
                      strokeWidth={2.5}
                      className="w-6 h-6 text-(--text-color)"
                    />
                    <h2 className="text-2xl font-semibold">Ordered Products</h2>
                  </div>

                  <div className="space-y-4">
                    {order?.order_details?.map((item) => (
                      <div
                        key={item.id}
                        className="bg-(--text-color)/5 rounded-2xl p-4 flex gap-4 hover:bg-(--text-color)/[0.07] transition"
                      >
                        <div className="w-28 h-28 rounded-xl flex items-center justify-center overflow-hidden">
                          <img
                            src={`${BaseURL}/uploads/productImages/${item.image}`}
                            alt={item.title}
                            width={"80%"}
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold line-clamp-1">
                              {item.title}
                            </h3>

                            <div className="flex items-center gap-5 mt-2 text-(--text-color)/80 text-sm">
                              <span>Size: {item.size}</span>

                              <div className="flex items-center gap-2">
                                Color:
                                <div
                                  className="w-4 h-4 rounded-full border border-(--text-color)/20"
                                  style={{ backgroundColor: item.color }}
                                />
                              </div>

                              <span>
                                Price: {Number(item.price).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            <div>
                              <p className="text-(--text-color)/55 text-sm">
                                Quantity
                              </p>
                              <p className="font-semibold">{item.quantity}</p>
                            </div>

                            <div className="text-right">
                              <p className="text-(--text-color)/55 text-sm">
                                Total
                              </p>
                              <p className="text-xl font-bold">
                                PKR {Number(item.subTotal).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-(--bg-accent)/10 rounded-3xl p-6 border border-(--text-color)/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin
                      strokeWidth={2.5}
                      className="w-6 h-6 text-(--text-color)"
                    />
                    <h2 className="text-2xl font-semibold">Shipping Address</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <InfoCard
                      label="Full Name"
                      value={`${order.shipFirstName} ${order.shipLastName}`}
                    />

                    <InfoCard label="Phone" value={order.contact} />
                    <InfoCard label="Email" value={order.email} />

                    <InfoCard label="City" value={order.shipCity} />

                    <div className="md:col-span-2">
                      <InfoCard label="Address" value={order.shipAddress} />
                    </div>

                    <InfoCard label="Province" value={order.shipProvince} />
                    <InfoCard label="ZIP Code" value={order.shipZip} />
                  </div>
                </div>

                {/* Billing / Payment */}
                <div className="bg-(--bg-accent)/10 rounded-3xl p-6 border border-(--text-color)/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    {order.payMethod === "cod" ? (
                      <Wallet className="w-6 h-6 text-(--text-color)" />
                    ) : (
                      <CreditCard className="w-6 h-6 text-(--text-color)" />
                    )}

                    <h2 className="text-2xl font-semibold">
                      {order.payMethod === "cod"
                        ? "Cash On Delivery (COD)"
                        : "Payment Details"}
                    </h2>
                  </div>

                  {order.payMethod === "cod" ? (
                    order.sameAsShipping === "true" ? (
                      <div className="bg-(--bg-accent)/10 border border-(--bg-accent)/20 rounded-2xl p-5">
                        <p className="text-lg font-medium">
                          Billing address is same as shipping address.
                        </p>

                        <p className="text-(--text-color)/60 mt-2">
                          Payment will be collected upon delivery.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Billing Address
                        </h3>

                        <div className="grid md:grid-cols-2 gap-5">
                          <InfoCard
                            label="Full Name"
                            value={`${order.billFirstName} ${order.billLastName}`}
                          />

                          <InfoCard label="City" value={order.billCity} />

                          <InfoCard
                            label="Province"
                            value={order.billProvince}
                          />

                          <InfoCard label="ZIP Code" value={order.billZip} />

                          <div className="md:col-span-2">
                            <InfoCard
                              label="Address"
                              value={order.billAddress}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="space-y-6">
                      {/* Card Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Card Information
                        </h3>

                        <div className="bg-(--text-color)/5 rounded-2xl p-5 border border-(--text-color)/5">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-(--text-color)/55 text-sm">
                                Cardholder Name
                              </p>
                              <p className="text-lg font-medium mt-1">
                                {order.cardholderName}
                              </p>
                            </div>

                            <CreditCard className="w-8 h-8 text-(--text-color)" />
                          </div>

                          <div className="mt-6">
                            <p className="tracking-[0.25em] text-2xl font-semibold">
                              {order.cardNumber}
                            </p>

                            <div className="mt-4 flex justify-between text-(--text-color)/70">
                              <span>Expiry: {order.expiryDate}</span>
                              <span>Visa</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-8">
                {/* Delivery */}
                <div className="bg-(--bg-accent)/10 rounded-3xl p-6 border border-(--text-color)/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-5">
                    <Truck className="w-6 h-6 text-(--text-color)" />
                    <h2 className="text-2xl font-semibold">Delivery Details</h2>
                  </div>

                  <div className="bg-(--text-color)/5 rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="w-5 h-5 text-(--bg-accent)" />

                      <div>
                        <p className="text-(--text-color)/55 text-sm">
                          Estimated Delivery
                        </p>

                        <p className="text-xl font-semibold mt-1">
                          {format(deliveryDate, "dd-MMM-yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-(--text-color)/10">
                      <div className="flex justify-between text-(--text-color)/70">
                        <span>Shipping Method</span>
                        <span>Standard Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-(--bg-accent)/10 rounded-3xl p-6 border border-(--text-color)/5 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-(--text-color)/70">
                      <span>Subtotal</span>
                      <span>PKR {Number(order.total).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-(--text-color)/70">
                      <span>Shipping</span>
                      {Number(order.shipCharges) === 0 ? (
                        <span className="text-green-600 font-bold uppercase tracking-wide text-xs sm:text-sm bg-green-500/10 px-2 py-0.5 rounded-md">
                          Free
                        </span>
                      ) : (
                        <span>
                          PKR {Number(shippingCharges).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="border-t border-(--text-color)/10 pt-4 flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span>
                        PKR{" "}
                        {(
                          Number(order.total) + Number(order.shipCharges)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    {order.authUser !== null &&
                      order.authUser === order.user_id && (
                        <NavLink
                          to={"/dashboard/order"}
                          className="w-full bg-(--bg-accent)/20 text-(--text-color) hover:bg-(--bg-accent) flex items-center justify-center gap-2 transition-all duration-300 py-4 rounded-2xl font-bold text-lg cursor-pointer"
                        >
                          View Orders{" "}
                          <ExternalLink size={20} strokeWidth={2.5} />
                        </NavLink>
                      )}
                    <NavLink
                      to={"/store/shirt"}
                      className="w-full bg-(--text-color) text-(--background) hover:bg-(--bg-accent) flex items-center justify-center gap-2 transition-all duration-300 py-4 rounded-2xl font-bold text-lg cursor-pointer"
                    >
                      Continue Shopping <Handbag />
                    </NavLink>
                  </div>

                  <p className="text-center text-(--text-color)/50 text-sm mt-5">
                    A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-(--text-color)/5 rounded-2xl p-4 border border-(--text-color)/5">
      <p className="text-(--text-color)/50 text-sm">{label}</p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}

export default OrderSuccess;
