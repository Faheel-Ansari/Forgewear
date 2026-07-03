import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  Loading,
  Pagination,
  ProductCard,
  ProductModal,
  SearchBar,
} from "../../index";
import {
  ArrowLeft,
  Check,
  CircleOff,
  Frown,
  PackageCheck,
  PackageX,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import {
  setData,
  setError,
  setIsAvailable,
  setLoading,
} from "../../redux-toolkit/features/StoreSlice";
import { useFetchData } from "../components/product/fetchData";

function ProductCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.store.data);
  const paginationData = useSelector((state) => state.store.paginationData);

  const [isActive, setIsActive] = useState(1);
  const loading = useSelector((state) => state.store.loading);
  const isAvailable = useSelector((state) => state.store.isAvailable);
  const error = useSelector((state) => state.store.error);

  const perPage = 20;

  const [isDeleteSelected, setIsDeleteSelected] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const [viewProduct, setViewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formattedQuery, setFormattedQuery] = useState("");

  const { fetchData } = useFetchData();
  const stockMap = {
    1: "instock",
    2: "outstock",
    3: "disabled",
  };

  const toggleViewProduct = () => {
    setViewProduct((prev) => !prev);
  };
  const getSelectedProduct = async (id) => {
    dispatch(setError(false));
    try {
      const res = await api.get(`/admin/${category}/${id}/single`);
      setSelectedProduct(res.data.singleProduct);
    } catch (error) {
      dispatch(setError(true));
    }
  };

  const deleteAll = async (items) => {
    try {
      const res = await api.delete(`/admin/product/${category}`, {
        data: items,
      });

      if (res.data.isID === false) {
        toast.error(res.data.message);
      }
      if (res.data.status === true) {
        fetchData(category, stockMap[isActive], perPage, "", currentPageNo);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (isActive !== null) {
      fetchData(category, stockMap[isActive], perPage);
    }
  }, [category, isActive]);

  useEffect(() => {
    return () => {
      dispatch(setData([]));
    };
  }, []);

  const handlePageChange = (targetPageNo) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageNo(targetPageNo);

    if (isActive !== null) {
      fetchData(category, stockMap[isActive], perPage, "", targetPageNo);
    } else {
      fetchData(category, "search", perPage, formattedQuery, targetPageNo);
    }
  };

  return (
    <div className="w-full pb-20 min-h-full">
      <AnimatePresence mode="wait">
        {selectedProduct && viewProduct && (
          <ProductModal
            imagesForColor1={[
              selectedProduct.color0image0,
              selectedProduct.color0image1,
              selectedProduct.color0image2,
              selectedProduct.color0image3,
            ]}
            imagesForColor2={[
              selectedProduct.color1image0,
              selectedProduct.color1image1,
              selectedProduct.color1image2,
              selectedProduct.color1image3,
            ]}
            imagesForColor3={[
              selectedProduct.color2image0,
              selectedProduct.color2image1,
              selectedProduct.color2image2,
              selectedProduct.color2image3,
            ]}
            imagesForColor4={[
              selectedProduct.color3image0,
              selectedProduct.color3image1,
              selectedProduct.color3image2,
              selectedProduct.color3image3,
            ]}
            id={selectedProduct.id}
            title={selectedProduct.title}
            productTags={JSON.parse(selectedProduct.tags)}
            desc={selectedProduct.desc}
            oldPrice={JSON.parse(selectedProduct.oldPrice)}
            newPrice={selectedProduct.newPrice}
            colors={JSON.parse(selectedProduct.colors)}
            sizes={JSON.parse(selectedProduct.sizes)}
            category={selectedProduct.category}
            slug={selectedProduct.slug}
            isNew={JSON.parse(selectedProduct.isNew)}
            toggleViewProduct={toggleViewProduct}
            viewProduct={viewProduct}
          />
        )}
      </AnimatePresence>

      {/* RESPONSIVE HEADER CONTAINER */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 pb-6 sm:pb-8 backdrop-blur-lg border-b border-(--text-color)/20">
        {/* Left Side Group (Back, Tabs & Search) */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 lg:gap-8 w-full xl:w-auto">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <NavLink
              to={`/dashboard/product`}
              className="hover:text-(--bg-accent) transition-colors ease-in-out duration-300"
            >
              <ArrowLeft size={32} strokeWidth={3} className="sm:scale-125" />
            </NavLink>

            {/* Status Filter Tabs */}
            <div
              onClick={() => {
                if (isDeleteSelected) return;
                setIsActive(1);
              }}
              className={`p-3 sm:p-4 font-semibold text-sm sm:text-base opacity-60 flex items-center gap-2 rounded-2xl sm:rounded-3xl transition-all ${
                isActive === 1
                  ? `${isDeleteSelected ? "bg-(--bg-accent)/50 cursor-not-allowed" : ""} bg-(--bg-accent) opacity-100 text-(--background)`
                  : "bg-none"
              } ${isDeleteSelected ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`}
            >
              <PackageCheck size={20} className="sm:scale-110" /> In-Stock
            </div>
            <div
              onClick={() => {
                if (isDeleteSelected) return;
                setIsActive(2);
              }}
              className={`p-3 sm:p-4 font-semibold text-sm sm:text-base opacity-70 flex items-center gap-2 rounded-2xl sm:rounded-3xl transition-all ${
                isActive === 2
                  ? `${isDeleteSelected ? "bg-(--bg-accent)/50 cursor-not-allowed" : ""} bg-(--bg-accent) opacity-100 text-(--background)`
                  : "bg-none"
              } ${isDeleteSelected ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`}
            >
              <PackageX size={20} className="sm:scale-110" /> Out of Stock
            </div>
            <div
              onClick={() => {
                if (isDeleteSelected) return;
                setIsActive(3);
              }}
              className={`p-3 sm:p-4 font-semibold text-sm sm:text-base opacity-70 flex items-center gap-2 rounded-2xl sm:rounded-3xl transition-all ${
                isActive === 3
                  ? `${isDeleteSelected ? "bg-(--bg-accent)/50 cursor-not-allowed" : ""} bg-(--bg-accent) opacity-100 text-(--background)`
                  : "bg-none"
              } ${isDeleteSelected ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`}
            >
              <CircleOff size={18} className="sm:scale-110" /> Disabled
            </div>
          </div>

          {/* Searchbar Container */}
          <div className="w-full lg:w-72 xl:w-80">
            <SearchBar
              isDeleteSelected={isDeleteSelected}
              setIsActive={setIsActive}
              setFormattedQuery={setFormattedQuery}
              fetchData={fetchData}
              category={category}
              perPage={perPage}
            />
          </div>
        </div>

        {/* Right Side Group (Action Buttons) */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap w-full xl:w-auto justify-start sm:justify-end">
          {isDeleteSelected ? (
            <>
              <button
                onClick={() => {
                  setIsDeleteSelected(false);
                  setItemsToDelete([]);
                }}
                className="py-2.5 px-4 sm:py-3 sm:px-5 font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg bg-(--bg-accent) text-(--background) hover:bg-(--bg-accent)/80 flex justify-center items-center gap-1.5 cursor-pointer transition-colors ease-in-out duration-300 backdrop-blur-lg"
              >
                <span className="text-red-400">
                  <X size={20} strokeWidth={3} />
                </span>{" "}
                Cancel
              </button>
              <button
                onClick={() => deleteAll(itemsToDelete)}
                disabled={itemsToDelete.length <= 0}
                className={`${
                  itemsToDelete.length <= 0
                    ? "bg-(--text-color)/25 text-(--background) cursor-not-allowed"
                    : "bg-red-400 hover:bg-red-400/80 text-(--background) cursor-pointer"
                } py-2.5 px-4 sm:py-3 sm:px-5 font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg flex justify-center items-center gap-1.5 transition-colors ease-in-out duration-300 backdrop-blur-lg`}
              >
                <Trash2 size={18} strokeWidth={2.5} /> Delete{" "}
                {`(${itemsToDelete.length})`}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsDeleteSelected(true)}
              className="py-2.5 px-4 sm:py-3 sm:px-5 font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg bg-(--text-color)/20 flex justify-center items-center gap-1.5 hover:bg-(--bg-accent)/30 cursor-pointer transition-colors ease-in-out duration-300 backdrop-blur-lg"
            >
              <Check size={20} strokeWidth={2.5} /> Select
            </button>
          )}

          {isDeleteSelected ? (
            <div
              className={`py-2.5 px-4 sm:py-3 sm:px-5 font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg ${
                isDeleteSelected
                  ? "bg-(--text-color)/20 text-(--background) cursor-not-allowed"
                  : "border border-(--bg-accent) hover:bg-(--bg-accent) hover:text-(--background) cursor-pointer"
              } flex items-center justify-center gap-1 transition-colors ease-in-out duration-300 backdrop-blur-lg`}
            >
              <Plus size={20} strokeWidth={2.5} /> Add Product
            </div>
          ) : (
            <NavLink
              to={`/dashboard/product/${category}/add`}
              className="py-2.5 px-4 sm:py-3 sm:px-5 font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg border border-(--bg-accent) bg-(--bg-accent)/20 hover:bg-(--bg-accent) hover:text-(--background) flex items-center justify-center gap-1 cursor-pointer transition-colors ease-in-out duration-300 backdrop-blur-lg"
            >
              <Plus size={20} strokeWidth={2.5} /> Add Product
            </NavLink>
          )}
        </div>
      </div>

      {/* RESPONSIVE PRODUCT CARD GRID */}
      <div className="h-full pt-8 sm:pt-12 flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8 cursor-default">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="h-full w-full pt-12 flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold">
            <Frown size={28} strokeWidth={3} />
            Something went wrong!
          </div>
        ) : !isAvailable ? (
          <div className="h-full w-full pt-12 flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold">
            <Search size={28} strokeWidth={3} /> No product found!
          </div>
        ) : (
          data.length > 0 &&
          data.map((e) => (
            <ProductCard
              key={e.id}
              id={e.id}
              image={e.color0image0}
              productTags={e.tags}
              newPrice={e.newPrice}
              title={e.title}
              isNew={e.isNew}
              toggleViewProduct={toggleViewProduct}
              getSelectedProduct={getSelectedProduct}
              category={category}
              isDeleteSelected={isDeleteSelected}
              itemsToDelete={itemsToDelete}
              setItemsToDelete={setItemsToDelete}
            />
          ))
        )}
      </div>

      {/* RESPONSIVE PAGINATION CONTAINER */}
      {data.length > 0 && (
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

export default ProductCategory;
