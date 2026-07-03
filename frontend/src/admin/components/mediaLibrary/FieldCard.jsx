import React from "react";

function FieldCard({ mainHeading, fieldArr = [], register, errors }) {
  return (
    <div className="bg-(--bg-accent)/5 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-start justify-center gap-4 sm:gap-5 w-full">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-(--text-color)">
        • {mainHeading}
      </h1>

      {/* RESPONSIVE GRID INSTEAD OF HORIZONTAL FLEX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mt-2">
        {fieldArr.map((e, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-(--text-color)/5 border border-(--text-color)/5 rounded-2xl flex flex-col gap-2.5 sm:gap-3 w-full"
          >
            <label
              htmlFor={e.name}
              className="font-semibold text-sm sm:text-base text-(--text-color)/90"
            >
              {e.title}:
            </label>
            <input
              type="file"
              id={e.name}
              {...register(e.name)}
              className={`w-full py-2 px-3 text-xs sm:text-sm bg-(--background) rounded-lg cursor-pointer focus:outline-(--bg-accent) outline-2 ${
                errors[e.name]
                  ? "outline outline-red-400/50"
                  : "outline outline-(--text-color)/30 focus:outline-(--bg-accent)"
              }`}
            />
            {errors[e.name]?.message && (
              <p className="text-xs text-red-400 mt-1">
                {errors[e.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldCard;
