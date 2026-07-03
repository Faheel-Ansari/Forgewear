import { Route, Routes } from "react-router-dom";
import {
  Product,
  ProductCategory,
  Dashboard,
  AddEditProduct,
  ManageStock,
  StockCategory,
  ManageStatus,
  StatusCategory,
  AdminFAQs,
  AddEditFAQ,
  Profile,
  Order,
  Review,
  MediaLibrary,
} from "../../index";

function MainContent() {
  return (
    <div className="mb-12 w-full flex-1 overflow-y-auto lg:flex-grow lg:w-[calc(100%-16rem)] backdrop-blur-lg lg:h-[calc(100vh-94px)] lg:overflow-y-auto text-(--text-color)">
      {/* Inline Styles to guarantee scrollbar hiding inside dashboard pages if needed */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />

      {/* Responsive Inner Spacing Container */}
      <div className="p-3 sm:p-6 lg:p-8 h-full">
        <Routes>
          <Route path={"/"} element={<Dashboard />} />

          {/* Profile */}
          <Route path={"/profile"} element={<Profile />} />

          {/* Products */}
          <Route path={"/product"} element={<Product />} />
          <Route path={"product/:category"} element={<ProductCategory />} />
          <Route
            path={"product/:category/:mode/"}
            element={<AddEditProduct />}
          />
          <Route
            path={"product/:category/:mode/:id"}
            element={<AddEditProduct />}
          />

          {/* Stock */}
          <Route path={"/stock"} element={<ManageStock />} />
          <Route path={"stock/:category"} element={<StockCategory />} />

          {/* Status */}
          <Route path={"/status"} element={<ManageStatus />} />
          <Route path={"status/:category"} element={<StatusCategory />} />

          {/* Order */}
          <Route path={"/order"} element={<Order />} />

          {/* Review */}
          <Route path={"/review"} element={<Review />} />

          {/* Media Library */}
          <Route path={"/media/library"} element={<MediaLibrary />} />

          {/* FAQs */}
          <Route path={"/faq"} element={<AdminFAQs />} />
          <Route path={"faq/:mode"} element={<AddEditFAQ />} />
          <Route path={"faq/:mode/:id"} element={<AddEditFAQ />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainContent;
