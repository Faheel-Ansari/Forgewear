import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Check,
  CircleOff,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { BaseURL } from "../../../api/axios";
import { SortBtn } from "../../../index";

function ProductTile({
  id,
  image = "",
  title = "",
  newPrice = "0",
  sizes = [],
  tags = [],
  avail = "",
  productStatus = "",
  method,
  stock = false,
  status = false,
  isLoading
}) {
  return (
    <div className="group relative overflow-hidden p-4 sm:p-5 md:px-8 border border-(--text-color)/10 hover:border-(--bg-accent)/20 bg-gradient-to-r from-(--text-color)/2 to-transparent rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 shadow-md backdrop-blur-lg transition-all duration-300">
      {/* Left Section (Image & Details Group) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-default w-full md:w-auto">
        {/* Product Image Thumbnail Wrapper */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-(--background)/10 border border-(--text-color)/5 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          {image !== "" && (
            <img
              src={`${BaseURL}/uploads/productImages/${image}`}
              className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
              alt={title}
            />
          )}
        </div>

        {/* Information Column */}
        <div className="flex flex-col items-start justify-center gap-3 sm:gap-4 w-full">
          <div className="space-y-1 sm:space-y-1.5">
            {/* Product Tags */}
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-(--bg-accent)/85 leading-none">
              {tags.length > 0 &&
                tags.map((tag, idx) =>
                  tags.length - 1 === idx ? tag.value : tag.value + " • ",
                )}
            </p>

            {/* Product Title */}
            <h1 className="text-base sm:text-lg md:text-xl font-bold first-letter:uppercase lowercase leading-tight text-(--text-color) transition-colors duration-300 group-hover:text-(--bg-accent)">
              {title !== "" && title}
            </h1>

            {/* Price & Sizes metadata row */}
            <div className="text-(--text-color)/70 flex items-center justify-start gap-4 sm:gap-6 flex-wrap">
              <p className="text-xs sm:text-sm font-semibold text-(--text-color)/90">
                PKR {newPrice !== "0" && Number(newPrice).toLocaleString()}
              </p>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {sizes.length > 0 &&
                  sizes.map((e, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs font-semibold uppercase bg-(--text-color)/5 px-1.5 py-0.5 rounded border border-(--text-color)/10"
                    >
                      {e.value}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Dynamic Status Badges (Pill Capsules) */}
          <div className="flex flex-wrap items-center gap-2">
            {status &&
              (productStatus !== "" && productStatus ? (
                <span className="text-(--bg-accent) bg-(--bg-accent)/10 border border-(--bg-accent)/20 px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 select-none">
                  <span className="animate-pulse">•</span> Enabled
                </span>
              ) : (
                <span className="text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 select-none">
                  <span>•</span> Disabled
                </span>
              ))}

            {stock &&
              (avail !== "" && avail ? (
                <span className="text-(--bg-accent) bg-(--bg-accent)/10 border border-(--bg-accent)/20 px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 select-none">
                  <span className="animate-pulse">•</span> In-Stock
                </span>
              ) : (
                <span className="text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 select-none">
                  <span>•</span> Out-of-Stock
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Right Section (Buttons Action Group) */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-start sm:justify-end border-t border-(--text-color)/5 pt-3 md:pt-0 md:border-0">
        {status &&
          (productStatus !== "" && productStatus ? (
            <SortBtn
              method={method}
              isLoading={isLoading}
              id={id}
              icon={<CircleOff size={16} strokeWidth={2.5} />}
              text={"Disable"}
              status={false}
            />
          ) : (
            <SortBtn
              method={method}
              isLoading={isLoading}
              id={id}
              icon={<Check size={16} strokeWidth={2.5} />}
              text={"Enable"}
              status={true}
            />
          ))}
        {stock &&
          (avail !== "" && avail ? (
            <SortBtn
              method={method}
              isLoading={isLoading}
              id={id}
              icon={<PackageX size={16} strokeWidth={2.5} />}
              text={"Mark as Out of Stock"}
              status={false}
            />
          ) : (
            <SortBtn
              method={method}
              isLoading={isLoading}
              id={id}
              icon={<PackageCheck size={16} strokeWidth={2.5} />}
              text={"Mark as In Stock"}
              status={true}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductTile;
