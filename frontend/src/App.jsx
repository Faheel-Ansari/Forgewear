import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  About,
  Contact,
  Footer,
  Home,
  Navbar,
  Store,
  Cursor,
  ScrolToTop,
  Login,
  ProductDetail,
  AdminDashboard,
  Signup,
  ProtectedRoute,
  Dashboard,
  Cart,
  Sale,
  Checkout,
  OrderSuccess,
  MainLoading,
} from "./index.js";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Toaster } from "react-hot-toast";
import { useAddToCart } from "./components/cart/addToCart.js";
import api from "./api/axios.js";
import { useDispatch } from "react-redux";
import { setImages } from "./redux-toolkit/features/MediaSlice.js";

function App() {
  const dispatch = useDispatch();
  const lenisRef = useRef();
  const location = useLocation();

  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isHome = location.pathname.endsWith('/');
  
  const verifyUser = async () => {
    try {
      // getCSRF();
      const res = await api.get("/user/verify");
      if (res.data.status === true) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time);
    }

    const rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const fetchMediaLibrary = async () => {
    try {
      const res = await api.get("/media/library");
      if (res.data.status) {
        dispatch(setImages(res.data.images));
      } else {
        dispatch(setImages({}));
      }
    } catch (error) {
      dispatch(setImages({}));
    } finally {
      setTimeout(() => {
        setIsMediaLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    verifyUser();
  },[isDashboard, isHome]);

  useEffect(() => {
    fetchMediaLibrary();
  }, [dispatch]);

  useEffect(() => {
    if (isMediaLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight =
        "var(--removed-body-scrollbar-width, 0px)";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    };
  }, [isMediaLoading]);


  const {
    cartID,
    setCartID,
    cartSize,
    setCartSize,
    cartItems,
    cartColor,
    setCartColor,
    cartColorIndex,
    setCartColorIndex,
    setCartQuantity,
    addToCart,
  } = useAddToCart();

  return (
    <>
      <AnimatePresence mode="wait">
        {isMediaLoading && <MainLoading />}
      </AnimatePresence>

      <ReactLenis
        root
        options={{
          duration: 2.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 0.7,
          smoothWheel: true,
          allowNestedScroll: true,
        }}
      >
        <ScrolToTop />
        <motion.main className="min-h-screen relative bg-(--background) text-(--text-color) flex flex-col justify-between w-full transition-colors ease-out duration-500">
          <Toaster position="top-center" />
          <Cursor />
          {!isDashboard && (
            <>
              <Navbar isLoggedIn={isLoggedIn} />
            </>
          )}
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <Home
                  isMediaLoading={isMediaLoading}
                  cartID={cartID}
                  setCartID={setCartID}
                  cartSize={cartSize}
                  setCartSize={setCartSize}
                  cartColor={cartColor}
                  setCartColor={setCartColor}
                  cartColorIndex={cartColorIndex}
                  setCartColorIndex={setCartColorIndex}
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/store/:tab"
              element={
                <Store
                  cartID={cartID}
                  setCartID={setCartID}
                  cartSize={cartSize}
                  setCartSize={setCartSize}
                  cartColor={cartColor}
                  setCartColor={setCartColor}
                  cartColorIndex={cartColorIndex}
                  setCartColorIndex={setCartColorIndex}
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/store/:tab/:id/:slug"
              element={
                <ProductDetail
                  page={"store"}
                  cartID={cartID}
                  setCartID={setCartID}
                  cartSize={cartSize}
                  setCartSize={setCartSize}
                  cartColor={cartColor}
                  setCartColor={setCartColor}
                  cartColorIndex={cartColorIndex}
                  setCartColorIndex={setCartColorIndex}
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/sale/:tab"
              element={
                <Sale
                  cartID={cartID}
                  setCartID={setCartID}
                  cartSize={cartSize}
                  setCartSize={setCartSize}
                  cartColor={cartColor}
                  setCartColor={setCartColor}
                  cartColorIndex={cartColorIndex}
                  setCartColorIndex={setCartColorIndex}
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/sale/:tab/:id/:slug"
              element={
                <ProductDetail
                  page={"sale"}
                  cartID={cartID}
                  setCartID={setCartID}
                  cartSize={cartSize}
                  setCartSize={setCartSize}
                  cartColor={cartColor}
                  setCartColor={setCartColor}
                  cartColorIndex={cartColorIndex}
                  setCartColorIndex={setCartColorIndex}
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderID" element={<OrderSuccess />} />
          </Routes>
          {!isDashboard && <Footer isLoggedIn={isLoggedIn} />}
        </motion.main>
      </ReactLenis>
    </>
  );
}

export default App;
