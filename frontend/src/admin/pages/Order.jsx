import {
  ArrowLeft,
  Ban,
  Check,
  CircleCheckBig,
  CircleDollarSign,
  CircleOff,
  DollarSign,
  Frown,
  Hourglass,
  LayoutList,
  List,
  Package,
  Search,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/product/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsAvailable,
  setLoading,
  setOrder,
  setPaginationData,
} from "../../redux-toolkit/features/OrderSlice";
import {
  Loading,
  OrderDetailsDrawer,
  Pagination,
  PaymentDrawer,
  ShippingDrawer,
} from "../../index";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function Order() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  const loading = useSelector((state) => state.order.loading);
  const isAvailable = useSelector((state) => state.order.isAvailable);
  const error = useSelector((state) => state.order.error);

  const orders = useSelector((state) => state.order.orders);
  const paginationData = useSelector((state) => state.order.paginationData);

  const perPage = 20;

  const [isActive, setIsActive] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const searchOrder = async (pageNo) => {
    const formattedQuery = searchValue.trim();

    if (formattedQuery === "") return;

    if (orders.length <= 0) return;

    dispatch(setLoading(true));

    setIsActive(null);

    const query = `/admin/order/search?query=${formattedQuery}&perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setOrder([]));
      } else {
        dispatch(setOrder(res.data.orders));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchOrders = async (perPage, pageNo = 1) => {
    const query =
      role === "admin"
        ? `/admin/order?perPage=${perPage}&page=${pageNo}`
        : `/user/order?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);
      
      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setOrder([]));
      } else {
        dispatch(setOrder(res.data.orders));
        dispatch(setPaginationData(res.data.pagination));
        setTotalRevenue(res.data.stats?.totalRevenue ?? 0);
        setPendingCount(res.data.stats?.pendingCount ?? 0);
        setDeliveredCount(res.data.stats?.deliveredCount ?? 0);
        setCancelledCount(res.data.stats?.cancelledCount ?? 0);
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchPendingOrders = async (perPage, pageNo = 1) => {
    const query = `/admin/order/pending?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setOrder([]));
      } else {
        dispatch(setOrder(res.data.orders));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchDeliveredOrders = async (perPage, pageNo = 1) => {
    const query = `/admin/order/delivered?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setOrder([]));
      } else {
        dispatch(setOrder(res.data.orders));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCancelledOrders = async (perPage, pageNo = 1) => {
    const query = `/admin/order/cancelled?perPage=${perPage}&page=${pageNo}`;

    try {
      dispatch(setError(false));
      dispatch(setLoading(true));

      const res = await api.get(query);

      if (res.data.status === false) {
        dispatch(setIsAvailable(false));
        dispatch(setOrder([]));
      } else {
        dispatch(setOrder(res.data.orders));
        dispatch(setPaginationData(res.data.pagination));
        dispatch(setIsAvailable(true));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeOrderStatus = async (id) => {
    try {
      const res = await api.get(`/admin/order/status/${id}`);

      if (res.data.status) {
        toast.success("Status changed successfully.");
        fetchOrders(perPage, currentPageNo);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const getSelectedOrder = (id) => {
    if (selectedOrder?.id === id) return;
    const filteredOrder = orders.filter((item) => item.id === id);
    setSelectedOrder(filteredOrder[0]);
  };

  const filterOrders = () => {
    if (isActive === null) return;

    if (isActive === 1) {
      fetchOrders(perPage);
    } else if (isActive === 2) {
      fetchPendingOrders(perPage);
    } else if (isActive === 3) {
      fetchDeliveredOrders(perPage);
    } else {
      fetchCancelledOrders(perPage);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const res = await api.put(`/admin/order/cancel/${id}`);
      if (res.data.status) {
        toast.success("Order cancelled successfully.");
        fetchOrders(perPage);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    filterOrders();
  }, [isActive]);

  const handlePageChange = (targetPageNo) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageNo(targetPageNo);

    if (isActive === 1) {
      fetchOrders(perPage, targetPageNo);
    } else if (isActive === 2) {
      fetchPendingOrders(perPage, targetPageNo);
    } else if (isActive === 3) {
      fetchDeliveredOrders(perPage, targetPageNo);
    } else {
      searchOrder(targetPageNo);
    }
  };

  return (
    <div className="relative pb-20 min-h-full overflow-hidden backdrop-blur-lg">
      <AnimatePresence mode="wait">
        {drawerOpen !== null && drawerOpen === `shipping${selectedOrder.id}` ? (
          <ShippingDrawer order={selectedOrder} setDrawerOpen={setDrawerOpen} />
        ) : drawerOpen !== null &&
          drawerOpen === `payment${selectedOrder.id}` ? (
          <PaymentDrawer order={selectedOrder} setDrawerOpen={setDrawerOpen} />
        ) : (
          drawerOpen !== null &&
          drawerOpen === `order${selectedOrder.id}` && (
            <OrderDetailsDrawer
              order={selectedOrder}
              setDrawerOpen={setDrawerOpen}
            />
          )
        )}
      </AnimatePresence>

      {/* RESPONSIVE HEADER ROW */}
      <div className="pb-6 sm:pb-8 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 border-b border-(--text-color)/20">
        <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold cursor-default">
          Order Details
        </h2>

        {/* Navigation Filters & Search bar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full xl:w-auto">
          <button
            onClick={() => setIsActive(1)}
            className={`${
              isActive === 1
                ? "bg-(--bg-accent) text-(--background)"
                : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
            } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
          >
            <List size={18} strokeWidth={2.5} className="sm:scale-110" /> All
            Orders
          </button>
          {role === "admin" && (
            <>
              <button
                onClick={() => setIsActive(2)}
                className={`${
                  isActive === 2
                    ? "bg-(--bg-accent) text-(--background)"
                    : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
                } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
              >
                <Hourglass
                  size={18}
                  strokeWidth={2.5}
                  className="sm:scale-110"
                />{" "}
                Pending
              </button>
              <button
                onClick={() => setIsActive(3)}
                className={`${
                  isActive === 3
                    ? "bg-(--bg-accent) text-(--background)"
                    : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
                } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
              >
                <CircleCheckBig
                  size={18}
                  strokeWidth={2.5}
                  className="sm:scale-110"
                />{" "}
                Delivered
              </button>

              <button
                onClick={() => setIsActive(4)}
                className={`${
                  isActive === 4
                    ? "bg-(--bg-accent) text-(--background)"
                    : "bg-(--text-color)/15 hover:bg-(--text-color) text-(--text-color)"
                } hover:text-(--background) cursor-pointer backdrop-blur-lg px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300`}
              >
                <Ban size={18} strokeWidth={2.5} className="sm:scale-110" />{" "}
                Cancelled
              </button>
            </>
          )}

          {/* Search Input */}
          <div className="flex-grow sm:flex-grow-0 w-full sm:w-64 flex justify-between items-center border border-(--text-color) focus-within:border-(--bg-accent) overflow-hidden transition-all duration-300 rounded-xl bg-(--background)/10">
            <input
              type="search"
              placeholder="Search by orderID..."
              className="flex-1 min-w-0 p-2.5 focus:outline-none text-sm sm:text-base"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <button
              onClick={searchOrder}
              className="flex justify-center items-center py-3.5 px-3 hover:bg-(--bg-accent) cursor-pointer hover:text-(--background) transition-colors duration-300 text-(--text-color) shrink-0"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ADMIN STATISTICS GRID */}
      <div className="mt-8">
        {role === "admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <DollarSign size={18} />
                Total Revenue
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                PKR {totalRevenue?.toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-400/10 border border-orange-400/20 text-orange-400 p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <Hourglass size={18} /> Pending Orders
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {pendingCount?.toLocaleString()}
              </p>
            </div>
            <div className="bg-(--bg-accent)/10 border border-(--bg-accent)/20 text-(--bg-accent) p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <CircleCheckBig size={18} /> Delivered
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {deliveredCount?.toLocaleString()}
              </p>
            </div>
            <div className="bg-red-400/15 border border-red-400/20 text-red-400 p-4 sm:p-6 rounded-2xl shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg flex items-center gap-2 font-medium">
                <Ban size={18} /> Cancelled
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2">
                {cancelledCount?.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* RESPONSIVE TABLE WRAPPER */}
        <div className="overflow-x-auto rounded-2xl mt-8 sm:mt-10 border border-(--text-color)/20">
          <table className="w-full border-collapse text-left">
            {/* TABLE HEAD */}
            <thead className="bg-(--text-color)/10 text-xs sm:text-sm">
              <tr>
                <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                  Order ID
                </th>
                <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                  Date
                </th>
                {role === "admin" && (
                  <>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                      Customer
                    </th>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                      Email
                    </th>
                    <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                      Contact
                    </th>
                  </>
                )}
                <th className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                  Total
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Status
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Shipping
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Payment
                </th>
                <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                  Order
                </th>
                {role === "admin" && (
                  <th className="p-3 sm:p-4 font-semibold text-center whitespace-nowrap">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="text-xs sm:text-sm">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-12">
                    <div className="flex items-center justify-center">
                      <Loading />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-12 text-center text-lg sm:text-xl lg:text-2xl font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Frown size={24} strokeWidth={3} />
                      <span>Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              ) : !isAvailable ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-12 text-center text-lg sm:text-xl lg:text-2xl font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Search size={24} strokeWidth={3} />
                      <span>No Order found!</span>
                    </div>
                  </td>
                </tr>
              ) : (
                orders &&
                orders.map((item) => (
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
                    {role === "admin" && (
                      <>
                        <td className="p-3 sm:p-4 capitalize whitespace-nowrap">
                          {item.shipFirstName} {item.shipLastName}
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          +92 {item.contact}
                        </td>
                      </>
                    )}
                    <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                      PKR{" "}
                      {(
                        Number(item.total) + Number(item.shipCharges)
                      )?.toLocaleString()}
                    </td>

                    {/* Status Column */}
                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center">
                        {item.status === "pending" ? (
                          <button
                            onClick={() => {
                              if (role === "user") return;
                              changeOrderStatus(item.id);
                            }}
                            className={`${
                              role === "admin"
                                ? "bg-orange-400/15 hover:bg-orange-400/70 hover:text-(--text-color) cursor-pointer"
                                : ""
                            } px-2.5 py-1 flex items-center text-orange-400 gap-1.5 font-bold rounded-lg transition-colors duration-200 text-xs sm:text-sm`}
                          >
                            <Hourglass size={14} strokeWidth={3} /> Pending
                          </button>
                        ) : item.status === "delivered" ? (
                          <button className="px-2.5 py-1 flex items-center gap-1.5 font-bold rounded-lg text-(--bg-accent) text-xs sm:text-sm bg-transparent border-0 cursor-default">
                            <CircleCheckBig size={14} /> Delivered
                          </button>
                        ) : (
                          <button className="px-2.5 py-1 flex items-center gap-1.5 font-bold rounded-lg text-red-400 text-xs sm:text-sm bg-transparent border-0 cursor-default">
                            <Ban size={14} /> Cancelled
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Drawers Actions */}
                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          getSelectedOrder(item.id);
                          setDrawerOpen((prev) =>
                            prev === `shipping${item.id}`
                              ? null
                              : `shipping${item.id}`,
                          );
                        }}
                        className="px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/70 hover:text-(--text-color) transition-colors duration-200 cursor-pointer"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          getSelectedOrder(item.id);
                          setDrawerOpen((prev) =>
                            prev === `payment${item.id}`
                              ? null
                              : `payment${item.id}`,
                          );
                        }}
                        className="px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/70 hover:text-(--text-color) transition-colors duration-200 cursor-pointer"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          getSelectedOrder(item.id);
                          setDrawerOpen((prev) =>
                            prev === `order${item.id}`
                              ? null
                              : `order${item.id}`,
                          );
                        }}
                        className="px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg bg-(--bg-accent)/15 text-(--bg-accent) hover:bg-(--bg-accent)/70 hover:text-(--text-color) transition-colors duration-200 cursor-pointer"
                      >
                        View
                      </button>
                    </td>

                    {role === "admin" && (
                      <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                        <div className="inline-flex justify-center">
                          <button
                            disabled={item.status !== "pending"}
                            onClick={() => {
                              if (item.status !== "pending") return;
                              cancelOrder(item.id);
                            }}
                            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${item.status === "pending" ? "bg-red-400/15 text-red-400 hover:bg-red-400/70 hover:text-white cursor-pointer" : "bg-gray-400/15 text-gray-400 cursor-not-allowed"} transition-colors duration-200 text-xs font-semibold sm:text-sm`}
                          >
                            <Ban size={14} /> Cancel
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESPONSIVE PAGINATION */}
      {orders.length > 0 && (
        <div className="w-full flex justify-center sm:justify-end mt-8 sm:mt-12">
          <div className="w-full sm:w-auto max-w-md">
            <Pagination
              currentPage={paginationData?.current_page}
              lastPage={paginationData?.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
