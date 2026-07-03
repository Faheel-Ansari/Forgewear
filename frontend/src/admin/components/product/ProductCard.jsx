import { ExternalLink, SquarePen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BaseURL } from "../../../api/axios";

function ProductCard({
  id,
  image,
  title,
  productTags,
  newPrice,
  isNew,
  toggleViewProduct,
  getSelectedProduct,
  category,
  isDeleteSelected,
  setItemsToDelete,
  itemsToDelete,
}) {
  const setItemsToDeleteArray = () => {
    if (itemsToDelete.includes(id)) {
      const newItems = itemsToDelete.filter((item) => item !== id);
      setItemsToDelete(newItems);
    } else {
      setItemsToDelete((prev) => [...prev, id]);
    }
  };
  return (
    <div
      onClick={() => {
        if (isDeleteSelected) setItemsToDeleteArray();
      }}
      className={`group relative overflow-hidden p-4 sm:p-5 w-full sm:w-[260px] lg:w-[280px] h-[400px] sm:h-[450px] rounded-[2rem] backdrop-blur-lg flex flex-col justify-between transition-all duration-300 ${
        itemsToDelete.includes(id)
          ? "border-2 border-(--bg-accent) shadow-[0_0_20px_rgba(var(--bg-accent),0.15)] bg-(--text-color)/8"
          : "border border-(--text-color)/12 bg-gradient-to-b from-(--text-color)/3 to-(--text-color)/1 hover:border-(--bg-accent)/40 hover:shadow-2xl hover:bg-(--text-color)/6"
      }`}
    >
      {/* Selection Overlay */}
      {isDeleteSelected && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-end p-4 hover:bg-(--background)/20 cursor-pointer transition-colors ease-out duration-300 z-10">
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center rounded-full border-2 transition-all duration-300 ${
              itemsToDelete.includes(id)
                ? "border-(--bg-accent) bg-(--bg-accent) shadow-[0_0_10px_rgba(var(--bg-accent),0.4)]"
                : "border-(--text-color)/30 bg-(--background)/90"
            }`}
          >
            <div
              className={`${
                itemsToDelete.includes(id)
                  ? "bg-(--background) scale-100"
                  : "scale-0"
              } w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-transform duration-300`}
            ></div>
          </div>
        </div>
      )}

      {/* New Badge (Sleek Pill Design) */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 justify-center z-10">
        {isNew && (
          <span className="cursor-default inline-block bg-(--bg-accent) text-(--background) font-black tracking-wider uppercase px-2.5 py-1 text-center text-[10px] sm:text-xs rounded-full shadow-sm">
            New
          </span>
        )}
      </div>

      {/* Image Container with Soft Backdrop Accent */}
      <div className="h-[52%] w-full bg-gradient-to-b from-(--text-color)/5 to-transparent rounded-2xl flex justify-center items-center overflow-hidden mb-3 relative">
        <img
          src={`${BaseURL}/uploads/productImages/${image}`}
          className="max-w-[80%] max-h-[85%] object-contain transition-all duration-500 ease-out group-hover:scale-108 group-hover:-rotate-2"
          alt={title}
        />
      </div>

      {/* Details Container */}
      <div className="h-[48%] flex flex-col justify-between pb-1">
        {/* Product Info Block */}
        <div className="space-y-1 sm:space-y-1.5">
          <p className="text-(--bg-accent)/80 text-[7px] sm:text-[10px] font-bold uppercase tracking-widest opacity-95">
            {productTags.length > 0
              ? productTags.map((tag, idx) =>
                  productTags.length - 1 === idx
                    ? tag.value
                    : tag.value + " • ",
                )
              : ""}
          </p>
          <p
            className="line-clamp-2 font-bold text-sm sm:text-base lg:text-lg leading-snug first-letter:uppercase lowercase text-(--text-color) transition-colors duration-300 group-hover:text-(--bg-accent)"
            title={title}
          >
            {title}
          </p>
        </div>

        {/* Price & Primary/Secondary Button Row */}
        <div className="space-y-3">
          <p className="text-base sm:text-lg lg:text-xl font-black text-(--text-color)/90 tracking-tight">
            PKR {newPrice.toLocaleString()}
          </p>

          <div className="flex justify-between items-center gap-2">
            {/* View Button (Secondary Outline Button) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleViewProduct();
                getSelectedProduct(id);
              }}
              disabled={isDeleteSelected}
              className={`w-[47%] py-1.5 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl border flex justify-center items-center gap-1.5 transition-all duration-300 active:scale-95 ${
                isDeleteSelected
                  ? "border-(--text-color)/20 text-(--text-color)/40 cursor-not-allowed bg-transparent"
                  : "border-(--text-color)/25 text-(--text-color) bg-transparent hover:border-(--bg-accent) hover:text-(--bg-accent) hover:bg-(--bg-accent)/5 cursor-pointer"
              }`}
            >
              View <ExternalLink size={13} strokeWidth={2.5} />
            </button>

            {/* Edit Button (Primary Filled Button) */}
            {isDeleteSelected ? (
              <button
                disabled
                className="w-[47%] py-1.5 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl bg-(--text-color)/30 text-(--background)/50 cursor-not-allowed flex justify-center items-center gap-1.5"
              >
                Edit <SquarePen size={13} strokeWidth={2.5} />
              </button>
            ) : (
              <NavLink
                to={`/dashboard/product/${category}/edit/${id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-[47%] bg-(--text-color) text-(--background) py-1.5 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl hover:bg-(--bg-accent) hover:text-(--background) cursor-pointer transition-all duration-300 active:scale-95 flex justify-center items-center gap-1.5 shadow-sm"
              >
                Edit <SquarePen size={13} strokeWidth={2.5} />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
