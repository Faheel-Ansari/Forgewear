function StaticField({
  register,
  labelID,
  labelName,
  name,
  type,
  inputWidth,
  errors = {},
  category = "",
}) {
  return (
    <>
      <div className="">
        <label htmlFor={labelID} className="font-bold">
          {labelName}
          {name === "oldPrice" ? (
            <span className="text-sm font-semibold"> (optional)</span>
          ) : (
            ""
          )}
        </label>
      </div>
      <div className={`mt-4 ${inputWidth}`}>
        <input
          type={type}
          name={name}
          {...register(name)}
          id={labelID}
          placeholder={
            name === "title"
              ? "Enter your product title here..."
              : name === "category"
                ? category
                : name === "oldPrice"
                  ? "eg: 1200, 2300..."
                  : "eg: 1000, 2000..."
          }
          readOnly={!!category}
          onChange={(e) => {
            !!category ? (e.target.value = category) : "";
          }}
          onKeyDown={(e) => {
            if (
              (name === "oldPrice" || name === "newPrice") &&
              ["e", "E", "+", "-", "."].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
          min={type === "number" ? 1 : null}
          className={`w-full outline outline-(--text-color)/50 focus:outline-(--bg-accent) py-1.5 px-3 rounded-lg ${errors[name]?.message ? "outline-red-400 text-red-400" : ""}`}
        />
      </div>
    </>
  );
}

export default StaticField;
