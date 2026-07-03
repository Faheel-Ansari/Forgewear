import {
  FAQ,
  Loading,
  Pagination,
  SearchCard,
  StoreFilter,
  SwiperCard,
} from "../index";
import { useSearchCard, switchSearchTab } from "../components/store/searchTab";
import { switchFilterTab } from "../components/store/FilterTab";
import { useDispatch, useSelector } from "react-redux";
import api, { BaseURL } from "../api/axios";
import {
  setData,
  setError,
  setIsAvailable,
  setLoading,
} from "../redux-toolkit/features/StoreSlice";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Frown, Search } from "lucide-react";
import { useAddToCart } from "../components/cart/addToCart";
import { useFetchData } from "../components/store/fetchData";
import { useFilter } from "../components/store/filter";
import { usePagination } from "../components/store/pagination";

function Store({
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
  const { tab } = useParams();

  const images = useSelector((state) => state.media.images);
  const data = useSelector((state) => state.store.data);

  const error = useSelector((state) => state.store.error);
  const loading = useSelector((state) => state.store.loading);
  const isAvailable = useSelector((state) => state.store.isAvailable);

  const { setActiveSearchTab, searchTab } = switchSearchTab();
  const { searchCardArr } = useSearchCard(images);

  const perPage = 20;

  const { filterTab: sizeTab, setActiveFilterTab: setActiveSizeTab } =
    switchFilterTab();
  const { filterTab: availableTab, setActiveFilterTab: setActiveAvailableTab } =
    switchFilterTab();
  const { filterTab: sortTab, setActiveFilterTab: setActiveSortTab } =
    switchFilterTab();

  const [filterPrice, setFilterPrice] = useState(0);

  const filters = {
    size: sizeTab,
    stock: availableTab,
    sort: sortTab,
    price: filterPrice,
  };

  const { fetchData } = useFetchData();
  const { handlePageChange, paginationData } = usePagination(
    tab,
    "store",
    perPage,
    filters,
  );

  const { filter } = useFilter();

  const [isAddToCartActive, setIsAddToCartActive] = useState(null);

  useEffect(() => {
    setIsAddToCartActive(null);
  }, [cartItems]);

  useEffect(() => {
    setActiveSearchTab(tab);
    fetchData(tab, "store", perPage);

    return () => {
      dispatch(setData([]));
    };
  }, [tab]);

  return (
    <div className="w-full flex flex-col items-center bg-(--background) text-(--text-color)">
      {/* Inline Styles to guarantee scrollbar hiding on category sliders */}
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

      {/* Sticky Subcategory Tabs with Horizontal Swipe Fallback */}
      <div className="w-full flex items-center justify-center sticky top-20 z-10 bg-(--background)/50 left-0 backdrop-blur-lg border-b border-(--text-color)/5">
        <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 flex items-center justify-start lg:justify-between xl:justify-evenly gap-3 overflow-x-auto py-3 lg:py-5 scrollbar-none">
          {searchCardArr.map((e, idx) => (
            <div key={idx} className="flex-shrink-0">
              <SearchCard
                page={"store"}
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

      {/* Main Catalogue Section: Filter Sidebar & Product Grid */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between items-start mt-8">
        {/* Left Column: Filter Panel (Full width on mobile/tablet, compact on desktop) */}
        <div className="w-full lg:w-[24%] xl:w-[20%] flex-shrink-0">
          <StoreFilter
            availableTab={availableTab}
            filterPrice={filterPrice}
            sizeTab={sizeTab}
            sortTab={sortTab}
            setActiveSizeTab={setActiveSizeTab}
            setActiveAvailableTab={setActiveAvailableTab}
            setActiveSortTab={setActiveSortTab}
            setFilterPrice={setFilterPrice}
            filter={filter}
            filters={filters}
            page={"store"}
            perPage={perPage}
            tab={tab}
          />
        </div>

        {/* Right Column: Product Grid Catalogue */}
        <div className="w-full lg:w-[74%] xl:w-[78%] py-4 lg:py-16">
          {loading ? (
            <div className="py-16 flex justify-center items-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-(--text-color)/60 py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
              <Frown size={28} strokeWidth={2.5} />
              Something went wrong!
            </div>
          ) : !isAvailable ? (
            <div className="text-(--text-color)/60 py-16 w-full flex flex-col items-center justify-center gap-3 text-xl sm:text-2xl font-bold tracking-wide">
              <Search size={28} strokeWidth={2.5} />
              No product found!
            </div>
          ) : (
            /* Highly responsive CSS Grid */
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
              {data?.length > 0 &&
                data.map((e) => (
                  <div
                    key={e.id}
                    className="w-full transition-transform duration-300 hover:-translate-y-1"
                  >
                    <SwiperCard
                      page={"store"}
                      id={e.id}
                      image={e.color0image0}
                      productTags={e.tags}
                      title={e.title}
                      slug={e.slug}
                      category={e.category}
                      sizes={e.sizes}
                      colors={e.colors}
                      oldPrice={e.oldPrice}
                      newPrice={e.newPrice}
                      isNew={e.isNew}
                      avail={e.avail}
                      setCartID={setCartID}
                      cartID={cartID}
                      setCartSize={setCartSize}
                      cartSize={cartSize}
                      setCartColor={setCartColor}
                      cartColor={cartColor}
                      setCartColorIndex={setCartColorIndex}
                      cartColorIndex={cartColorIndex}
                      addToCart={addToCart}
                      cartItems={cartItems}
                      isAddToCartActive={isAddToCartActive}
                      setIsAddToCartActive={setIsAddToCartActive}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Section - Aligns underneath the catalogue grid on desktop */}
      {data.length > 0 && (
        <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto flex justify-center lg:justify-end pb-12 mt-4">
          <div className="w-full lg:w-[74%] xl:w-[78%] flex justify-center">
            <Pagination
              currentPage={paginationData?.current_page}
              lastPage={paginationData?.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      {/* FAQ Panel */}
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 mx-auto mt-12 sm:mt-16 pb-20">
        <FAQ />
      </div>
    </div>
  );
}

export default Store;
