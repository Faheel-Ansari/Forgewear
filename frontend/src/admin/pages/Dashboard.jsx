import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  DollarSign,
  MessageSquare,
  Lock,
  PackageX,
  Ban,
  Shirt,
  Footprints,
  Layers,
  Tag,
  Scissors,
  TrendingUp,
  Hourglass,
  ShoppingBag,
  Handbag,
  ExternalLink,
  CircleCheckBig,
  Search,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useThemeToggle } from "../../components/navbar/theme";
import { useSelector } from "react-redux";
import { shippingChargesSchema } from "../../schema/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { currentTheme } = useThemeToggle();
  const role = useSelector((state) => state.auth.role);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [userOrderData, setUserOrderData] = useState([]);
  const [shippingCharges, setShippingCharges] = useState(0);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shippingChargesSchema),
    defaultValues: {
      charges: 0,
    },
  });

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

  const fetchOrderData = async () => {
    try {
      const res = await api.get("/admin/dashboard/order");
      console.log(res);

      if (res.data.status) {
        setRecentOrders(res.data.orders);
        setOrderData(res.data.chartData);
        setTotalRevenue(res.data.totalRevenue ?? 0);
        setUserOrderData(res.data.userOrders);
      } else {
        setRecentOrders([]);
      }
    } catch (error) {
      setRecentOrders([]);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await api.get("/admin/dashboard/products");
      if (res.data.status) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  const fetchReviewData = async () => {
    try {
      const res = await api.get("/admin/dashboard/review");
      if (res.data.status) {
        setReviews(res.data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      setReviews([]);
    }
  };

  const userTotalSpending = userOrderData?.reduce(
    (acc, item) => acc + (Number(item.total) + Number(item.shipCharges)),
    0,
  );

  const pendingOrders = recentOrders?.filter(
    (item) => item.status === "pending",
  );

  const userPendingOrders = userOrderData?.filter(
    (item) => item.status === "pending",
  );

  const userDeliveredOrders = userOrderData?.filter(
    (item) => item.status === "delivered",
  );

  const productStats = {
    outOfStock: 0,
    disabledProducts: 0,
    shirts: 0,
    pants: 0,
    hoodies: 0,
    jackets: 0,
    shoes: 0,
  };

  products?.forEach((item) => {
    if (JSON.parse(item?.avail) === false) {
      productStats.outOfStock++;
    }

    if (JSON.parse(item.status) === false) {
      productStats.disabledProducts++;
    }

    switch (item.category) {
      case "shirt":
        productStats.shirts++;
        break;

      case "pant":
        productStats.pants++;
        break;

      case "hoodie":
        productStats.hoodies++;
        break;

      case "jacket":
        productStats.jackets++;
        break;

      case "shoes":
        productStats.shoes++;
        break;

      default:
        break;
    }
  });

  useEffect(() => {
    reset({
      charges: shippingCharges,
    });
  }, [shippingCharges, reset]);

  useEffect(() => {
    fetchOrderData();
    fetchProductData();
    fetchReviewData();
    fetchShippingCharges();
  }, []);
  console.log(typeof(totalRevenue));

  // Grouping metrics for better visual hierarchy
  const businessMetrics = [
    {
      title: "Total Revenue",
      value: `PKR ${totalRevenue?.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/30",
      cardBG: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Pending Orders",
      value: pendingOrders?.length,
      icon: Hourglass,
      color: "text-orange-400",
      bg: "bg-orange-400/30",
      cardBG: "bg-orange-400/20",
      border: "border-orange-400/20",
    },
    {
      title: "Out of Stock",
      value: productStats?.outOfStock?.toLocaleString(),
      icon: PackageX,
      color: "text-red-400",
      bg: "bg-red-400/30",
      cardBG: "bg-red-400/20",
      border: "border-red-400/20",
    },
    {
      title: "Disabled Products",
      value: productStats?.disabledProducts?.toLocaleString(),
      icon: Ban,
      color: "text-slate-400",
      bg: "bg-slate-400/30",
      cardBG: "bg-slate-400/10",
      border: "border-slate-400/20",
    },
  ];

  const userBusinessMetrics = [
    {
      title: "Total Spending",
      value: `PKR ${userTotalSpending?.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/30",
      cardBG: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Total Orders",
      value: userOrderData?.length?.toLocaleString(),
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-400/30",
      cardBG: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      title: "Pending Orders",
      value: userPendingOrders?.length?.toLocaleString(),
      icon: Hourglass,
      color: "text-orange-400",
      bg: "bg-orange-400/30",
      cardBG: "bg-orange-400/20",
      border: "border-orange-400/20",
    },
    {
      title: "Delivered Orders",
      value: userDeliveredOrders?.length?.toLocaleString(),
      icon: Hourglass,
      color: "text-(--bg-accent)",
      bg: "bg-(--bg-accent)/30",
      cardBG: "bg-(--bg-accent)/10",
      border: "border-(--bg-accent)/20",
    },
  ];

  const inventoryMetrics = [
    {
      title: "Shirts",
      value: productStats?.shirts?.toLocaleString(),
      icon: Shirt,
      color: "text-blue-400",
      bg: "bg-blue-400/30",
      cardBG: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      title: "Pants",
      value: productStats?.pants?.toLocaleString(),
      icon: Scissors,
      color: "text-indigo-400",
      bg: "bg-indigo-400/30",
      cardBG: "bg-indigo-400/10",
      border: "border-indigo-400/20",
    },
    {
      title: "Hoodies",
      value: productStats?.hoodies?.toLocaleString(),
      icon: Tag,
      color: "text-purple-400",
      bg: "bg-purple-400/30",
      cardBG: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      title: "Jackets",
      value: productStats?.jackets?.toLocaleString(),
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-400/30",
      cardBG: "bg-cyan-400/10",
      border: "border-cyan-400/20",
    },
    {
      title: "Shoes",
      value: productStats?.shoes?.toLocaleString(),
      icon: Footprints,
      color: "text-orange-400",
      bg: "bg-orange-400/30",
      cardBG: "bg-orange-400/20",
      border: "border-orange-400/20",
    },
  ];

  const reviewMetrics = [
    {
      title: "Total Reviews",
      value: reviews?.length?.toLocaleString(),
      icon: MessageSquare,
      color: "text-teal-400",
      bg: "bg-teal-400/30",
      cardBG: "bg-teal-400/10",
      border: "border-teal-400/20",
    },
    {
      title: "Private Reviews",
      value: reviews?.filter((item) => item.status === "private")?.length,
      icon: Lock,
      color: "text-orange-400",
      bg: "bg-orange-400/30",
      cardBG: "bg-orange-400/20",
      border: "border-orange-400/20",
    },
  ];

  // Reusable Widget Component
  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    bg,
    cardBG,
    border,
  }) => (
    <div
      className={`${cardBG} p-6 rounded-3xl border ${border} shadow-xl flex items-center space-x-4`}
    >
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <p className={`text-sm font-medium `}>{title}</p>
        <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
      </div>
    </div>
  );

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("charges", Number(data.charges));
    try {
      const res = await api.post("/admin/shipcharges", formData);

      if (res.data.status === true) {
        toast.success(res.data.message);
        fetchShippingCharges();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* SECTION 1: Business Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {role === "admin"
          ? businessMetrics.map((stat, idx) => <StatCard key={idx} {...stat} />)
          : userBusinessMetrics.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
      </div>

      {role === "admin" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GRAPH SECTION */}
          <div className="h-[320px] sm:h-[380px] lg:h-[45vh] lg:col-span-2 bg-(--text-color)/5 p-4 sm:p-6 rounded-3xl border border-(--text-color)/20 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold">Order Overview</h3>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={orderData}>
                  <defs>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={
                          currentTheme === "LIGHT" ? "#264040" : "#eef6f6"
                        }
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          currentTheme === "LIGHT" ? "#264040" : "#eef6f6"
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="2 10"
                    vertical={false}
                    stroke={currentTheme === "LIGHT" ? "#264040" : "#eef6f6"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: currentTheme === "LIGHT" ? "#264040" : "#eef6f6",
                      fontSize: 11,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: currentTheme === "LIGHT" ? "#264040" : "#eef6f6",
                      fontSize: 11,
                    }}
                    dx={-10}
                    tickCount={20}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor:
                        currentTheme === "LIGHT" ? "#264040" : "#eef6f6",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{
                      color: currentTheme === "LIGHT" ? "#eef6f6" : "#264040",
                    }}
                    labelStyle={{
                      color: currentTheme === "LIGHT" ? "#eef6f6" : "#264040",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke={currentTheme === "LIGHT" ? "#264040" : "#eef6f6"}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SECTION 2: Engagement / Reviews / Actions */}
          <div className="bg-(--bg-accent)/10 min-h-[400px] lg:h-[45vh] p-4 sm:p-6 rounded-3xl border border-(--bg-accent)/20 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold">
                {role === "admin" ? "Customer Feedback" : "Quick Actions"}
              </h3>
              <div className="space-y-3">
                {reviewMetrics.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>
            </div>

            {/* Recent Orders Table (Mini) */}
            <div className="flex-1 h-full overflow-hidden flex flex-col">
              <h3 className="text-sm sm:text-md font-bold mb-3">
                Action Needed
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {recentOrders
                  .filter((o) => o.status === "pending")
                  .map((order, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between pb-2 border-b border-(--text-color)/20 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          {order.id}
                        </p>
                        <p className="text-[11px] sm:text-xs text-(--text-color)/60 truncate">
                          {order.shipFirstName + " " + order.shipLastName}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-orange-400/20 text-orange-400 shrink-0">
                        {order.status}
                      </span>
                    </div>
                  ))}
                {recentOrders
                  .filter((o) => o.status === "pending")
                  .map((order, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between pb-2 border-b border-(--text-color)/20 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          {order.id}
                        </p>
                        <p className="text-[11px] sm:text-xs text-(--text-color)/60 truncate">
                          {order.shipFirstName + " " + order.shipLastName}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-orange-400/20 text-orange-400 shrink-0">
                        {order.status}
                      </span>
                    </div>
                  ))}
                {recentOrders
                  .filter((o) => o.status === "pending")
                  .map((order, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between pb-2 border-b border-(--text-color)/20 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          {order.id}
                        </p>
                        <p className="text-[11px] sm:text-xs text-(--text-color)/60 truncate">
                          {order.shipFirstName + " " + order.shipLastName}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-orange-400/20 text-orange-400 shrink-0">
                        {order.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular User Order Table */
        <div className="mt-8 sm:mt-12">
          <h1 className="text-lg sm:text-xl font-bold">Recent Orders</h1>
          {userOrderData.length <= 0 ? (
            <div className="flex items-center justify-center gap-3">
              <Search size={24} strokeWidth={3} />
              <span>No Order found!</span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl mt-4 border border-(--text-color)/20">
              <table className="w-full border-collapse text-left min-w-[600px]">
                {/* TABLE HEAD */}
                <thead className="bg-(--text-color)/10 text-xs sm:text-sm">
                  <tr>
                    <th className="p-3 sm:p-4 font-semibold">Order ID</th>
                    <th className="p-3 sm:p-4 font-semibold">Date</th>
                    <th className="p-3 sm:p-4 font-semibold">Total</th>
                    <th className="p-3 sm:p-4 font-semibold text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody className="text-xs sm:text-sm">
                  {userOrderData &&
                    userOrderData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-(--text-color)/10 hover:bg-(--text-color)/5 transition"
                      >
                        <td className="p-3 sm:p-4 font-extrabold whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          {item.created_at}
                        </td>
                        <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                          PKR{" "}
                          {(
                            Number(item.total) + Number(item.shipCharges)
                          ).toLocaleString()}
                        </td>
                        <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                          <div className="inline-flex items-center justify-center">
                            {item.status === "pending" ? (
                              <p className="px-2.5 py-1 flex items-center text-orange-400 gap-1.5 font-bold rounded-lg text-xs sm:text-sm">
                                <Hourglass size={16} strokeWidth={3} /> Pending
                              </p>
                            ) : (
                              <p className="px-2.5 py-1 flex items-center gap-1.5 font-bold rounded-lg text-(--bg-accent) text-xs sm:text-sm">
                                <CircleCheckBig size={16} /> Delivered
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: Inventory Breakdown */}
      {role === "admin" && (
        <div className="pt-2">
          <h3 className="text-base sm:text-lg font-bold mb-4">
            Inventory Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {inventoryMetrics.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      )}
      {role === "admin" && (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-3 mt-12"
          >
            <p className="font-bold text-lg">Set Shipping Charges : </p>
            <input
              type="number"
              {...register("charges")}
              className="w-20 bg-(--text-color)/10 p-2 outline-0 rounded-lg"
            />
            <button
              type="submit"
              className="bg-(--bg-accent)/20 text-(--bg-accent) px-4 py-2 rounded-lg font-bold"
            >
              Save
            </button>
          </form>
          {errors.charges?.message && (
            <p className="text-xs text-red-400 mt-1">
              {errors.charges?.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
