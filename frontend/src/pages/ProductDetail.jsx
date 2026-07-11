import {
  Detail,
  FAQ,
  Loading,
  Pagination,
  ReviewCard,
  SearchCard,
  SizeModal,
  SwiperCard,
  SwiperSlider,
  WriteReview,
} from "../index";
import { useSearchCard, switchSearchTab } from "../components/store/searchTab";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import api from "../api/axios";
import {
  setData,
  setError,
  setErrorSingle,
  setIsAvailable,
  setLoading,
  setLoadingSingle,
} from "../redux-toolkit/features/StoreSlice";
import { FilePenLine, Frown, Search, Star } from "lucide-react";
import { useFetchData } from "../components/store/fetchData";
import { useAddToCart } from "../components/cart/addToCart";
import { usePagination } from "../components/store/pagination";

function ProductDetail({
  page,
  setCartID,
  cartID,
  setCartSize,
  cartSize,
  setCartColor,
  cartColor,
  setCartColorIndex,
  cartColorIndex,
  addToCart,
  cartItems,
}) {
  const dispatch = useDispatch();
  const { id, tab } = useParams();

  const allData = useSelector((state) => state.store.data);

  const loadingSingle = useSelector((state) => state.store.loadingSingle);
  const errorSingle = useSelector((state) => state.store.errorSingle);
  const loading = useSelector((state) => state.store.loading);
  const error = useSelector((state) => state.store.error);
  const isAvailable = useSelector((state) => state.store.isAvailable);
  const reviewsCount = useSelector((state) => state.review.reviewsCount);
  const reviews = useSelector((state) => state.review.reviews);
  const images = useSelector((state) => state.media.images);
  
  const { searchTab, setActiveSearchTab } = switchSearchTab();
  const { searchCardArr } = useSearchCard(images);

  const perPage = 20;

  const { fetchData } = useFetchData();
  const { handlePageChange, paginationData } = usePagination(tab, page);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sizeHelpShow, setSizeHelpShow] = useState(false);
  const [isAddToCartActive, setIsAddToCartActive] = useState(null);
  const [toggleWriteReview, setToggleWriteReview] = useState(false);
  const [toggleReviewGradient, setToggleReviewGradient] = useState(false);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [isVerifiedToWriteReview, setIsVerifiedToWriteReview] = useState(false);

  const fetchSingleData = async () => {
    dispatch(setErrorSingle(false));
    dispatch(setLoadingSingle(true));
    try {
      const res = await api.get(`/${tab}/${id}/single`);
      
      if (res.data.status === true) {
        const product = res.data.singleProduct;
        const parsedProduct = {
          ...product,
          tags: JSON.parse(product.tags),
          sizes: JSON.parse(product.sizes),
          colors: JSON.parse(product.colors),
          oldPrice:
            JSON.parse(product.oldPrice) === null
              ? null
              : Number(product.oldPrice),
          newPrice: Number(product.newPrice),
          isNew: JSON.parse(product.isNew),
          avail: JSON.parse(product.avail),
        };
        setSelectedProduct(parsedProduct);
      }
    } catch (error) {
      dispatch(setErrorSingle(true));
    } finally {
      dispatch(setLoadingSingle(false));
    }
  };

  const verifyToWriteReview = async () => {
    try {
      const res = await api.get(`/review/verification/${id}`);
      
      if (res.data.status) {
        setIsVerifiedToWriteReview(true);
      } else {
        setIsVerifiedToWriteReview(false);
      }
    } catch (error) {
      if (error.response.data.status === false) {
        setIsVerifiedToWriteReview(false);
      }
    }
  };

  useEffect(() => {
    setIsAddToCartActive(null);
  }, [cartItems]);

  useEffect(() => {
    fetchSingleData();
    verifyToWriteReview();
  }, [id, tab]);

  useEffect(() => {
    fetchData(tab, page, perPage, {});
  }, []);

  useEffect(() => {
    if (reviewsCount > 0) {
      const totalRating = reviews.reduce(
        (acc, item) => acc + Number(item.rating),
        0,
      );
      setToggleReviewGradient(true);
      setRatingAverage(totalRating / Number(reviewsCount));
    } else {
      setRatingAverage(0);
      setToggleReviewGradient(false);
    }
  }, [reviews]);

  const toggleSizeHelp = () => {
    setSizeHelpShow((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-(--background) text-(--text-color)">
      {/* Inline Styles to guarantee scrollbar hiding across all client browsers cleanly */}
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

      {/* Sticky Subcategory Horizontal Panel - Scalable across laptop, tablet & mobile */}
      <div className="w-full flex items-center justify-center sticky z-5 top-20 bg-(--background)/60 left-0 backdrop-blur-xl border-b border-(--text-color)/5">
        <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 flex items-center justify-start lg:justify-center xl:justify-evenly gap-3 overflow-x-auto py-3 lg:py-5 scrollbar-none">
          {searchCardArr.map((e, idx) => (
            <div key={idx} className="flex-shrink-0">
              <SearchCard
                page={page}
                name={e.name}
                imagePath={e.imagePath}
                tabName={e.tabName}
                setActiveSearchTab={setActiveSearchTab}
                searchTab={searchTab}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Detail Section */}
      {loadingSingle ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : errorSingle ? (
        <div className="text-(--text-color)/60 h-[40vh] w-full flex items-center justify-center gap-3 text-lg sm:text-xl font-bold tracking-wide">
          <Frown size={28} strokeWidth={2.5} />
          Something went wrong!
        </div>
      ) : (
        selectedProduct && (
          <Detail
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
            productTags={selectedProduct.tags}
            desc={selectedProduct.desc}
            oldPrice={selectedProduct.oldPrice}
            newPrice={selectedProduct.newPrice}
            colors={selectedProduct.colors}
            sizes={selectedProduct.sizes}
            category={selectedProduct.category}
            slug={selectedProduct.slug}
            isNew={selectedProduct.isNew}
            avail={selectedProduct.avail}
            reviewsCount={reviewsCount}
            rating={ratingAverage.toFixed(1)}
            toggleSizeHelp={toggleSizeHelp}
          />
        )
      )}

      <AnimatePresence mode="wait">
        {sizeHelpShow && <SizeModal toggleSizeHelp={toggleSizeHelp} />}
      </AnimatePresence>

      {/* Related Products Showcase Grid - Secure columns for mobile, tablet, and laptop */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-8 sm:gap-12 my-16 sm:my-24 lg:my-32">
        <div className="border-b border-(--text-color)/5 pb-4">
          <h1 className="capitalize text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-left">
            More related products
          </h1>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="py-16 flex justify-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-(--text-color)/60 py-16 w-full flex items-center justify-center gap-3 text-lg sm:text-xl font-bold tracking-wide">
              <Frown size={28} strokeWidth={2.5} />
              Something went wrong!
            </div>
          ) : !isAvailable ? (
            <div className="text-(--text-color)/60 py-16 w-full flex items-center justify-center gap-3 text-lg sm:text-xl font-bold tracking-wide">
              <Search size={28} strokeWidth={2.5} />
              No product found!
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 py-5 w-full">
              {allData?.length > 0 &&
                allData.map((e, idx) => (
                  <div
                    key={idx}
                    className="w-full transition-all duration-300 hover:-translate-y-1"
                  >
                    <SwiperCard
                      page={page}
                      id={e.id}
                      image={e.color0image0}
                      productTags={e.tags}
                      title={e.title}
                      category={tab}
                      slug={e.slug}
                      sizes={e.sizes}
                      colors={e.colors}
                      oldPrice={e.oldPrice}
                      newPrice={e.newPrice}
                      isNew={e.isNew}
                      avail={e.avail}
                      setCartSize={setCartSize}
                      cartSize={cartSize}
                      setCartID={setCartID}
                      cartID={cartID}
                      isAddToCartActive={isAddToCartActive}
                      setIsAddToCartActive={setIsAddToCartActive}
                      addToCart={addToCart}
                      cartColor={cartColor}
                      cartColorIndex={cartColorIndex}
                      cartItems={cartItems}
                      setCartColor={setCartColor}
                      setCartColorIndex={setCartColorIndex}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Clean Centered Pagination controls */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={paginationData?.current_page}
            lastPage={paginationData?.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Client Reviews Section Panel */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 max-h-[70vh] md:max-h-[60vh] relative flex flex-col gap-6 sm:gap-8 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--text-color)/5 pb-4">
          <h4 className="text-xl sm:text-2xl font-black flex flex-wrap items-center gap-3 tracking-tight">
            Reviews {Number(reviewsCount)?.toLocaleString() || 0}{" "}
            <span className="flex items-center gap-1 font-semibold text-sm sm:text-lg text-(--text-color)/60">
              ({ratingAverage.toFixed(1)}{" "}
              <Star
                stroke="#fbbf24"
                fill="#fbbf24"
                className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
              />
              )
            </span>
          </h4>
          {isVerifiedToWriteReview && (
            <button
              onClick={() => setToggleWriteReview(true)}
              className="w-full sm:w-auto bg-(--bg-accent) text-(--background) hover:bg-(--text-color) px-4 py-2.5 sm:py-2 flex items-center justify-center gap-2 font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              <FilePenLine size={16} strokeWidth={2.5} />
              Write a Review
            </button>
          )}
        </div>
        <div className="overflow-y-auto pr-1">
          <ReviewCard id={id} />
        </div>
        {toggleReviewGradient && (
          <div
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
            className="w-full h-20 sm:h-24 absolute bottom-0 left-0 z-2 pointer-events-none"
          ></div>
        )}
        <AnimatePresence mode="wait">
          {toggleWriteReview && (
            <WriteReview id={id} setToggleWriteReview={setToggleWriteReview} />
          )}
        </AnimatePresence>
      </div>

      {/* FAQ Panel */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mb-20 sm:mb-28">
        <FAQ />
      </div>
    </div>
  );
}

export default ProductDetail;
